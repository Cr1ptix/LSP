
import { GoogleGenAI, Type } from "@google/genai";
import { EventWeekData } from "../types.ts";

// Safeguard against undefined process in browser
const API_KEY = (window as any).process?.env?.API_KEY || "";
const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function fetchCurrentEventWeek(): Promise<EventWeekData> {
  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  const prompt = `Search for the absolute latest GTA Online Weekly Update. 
  Today's date is ${dateString}. 
  Focus ONLY on news from the current week (most updates happen on Thursdays). 
  Look for 2x/3x Cash/RP bonuses on businesses, heists, or contact missions.
  Identify the top vehicle or property discounts.
  Identify the current podium vehicle and prize ride if possible.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const sources = groundingChunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({
        title: chunk.web.title || "External Source",
        uri: chunk.web.uri,
      }));

    const extractionPrompt = `Based on the following search results about the LATEST GTA Online event week:
    "${text}"
    
    Extract the details into this exact JSON format. 
    Map bonuses to these internal IDs where appropriate: cayo-perico, diamond-casino, acid-lab, nightclub, bunker-stock, cluckin-bell, dr-dre-contract, hsw-races.

    JSON Structure:
    {
      "title": "Short catchy title of the update",
      "dateRange": "e.g., May 15 - May 21",
      "bonuses": [{"activityId": "string", "multiplier": number}],
      "discounts": ["string"],
      "summary": "2-3 sentence overview of why this week is good or bad for money."
    }`;

    const extractionResponse = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: extractionPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            dateRange: { type: Type.STRING },
            bonuses: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  activityId: { type: Type.STRING },
                  multiplier: { type: Type.NUMBER }
                },
                required: ["activityId", "multiplier"]
              }
            },
            discounts: { type: Type.ARRAY, items: { type: Type.STRING } },
            summary: { type: Type.STRING }
          },
          required: ["title", "dateRange", "bonuses", "discounts", "summary"]
        }
      }
    });

    const data = JSON.parse(extractionResponse.text);
    return {
      ...data,
      sources: sources.slice(0, 5)
    };
  } catch (error) {
    console.error("Error fetching event week data:", error);
    return {
      title: "Weekly Update Status Unknown",
      dateRange: "Current Cycle",
      bonuses: [
        { activityId: 'acid-lab', multiplier: 2 },
        { activityId: 'cluckin-bell', multiplier: 1 }
      ],
      discounts: ["Check Rockstar Newswire for official list"],
      summary: "Interface connection interrupted. Displaying default high-efficiency targets.",
      sources: []
    };
  }
}
