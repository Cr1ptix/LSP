
export interface Activity {
  id: string;
  name: string;
  category: 'Heist' | 'Business' | 'Passive' | 'Contact Mission';
  baseHourlyProfit: number;
  setupTime: number; // in minutes
  executionTime: number; // in minutes
  difficulty: 'Easy' | 'Medium' | 'Hard';
  description: string;
  requirements?: string[];
  instructions?: string[];
  specialTips?: string;
}

export interface WeeklyBonus {
  activityId: string;
  multiplier: number; // e.g., 2 for 2x Money
}

export interface EventWeekData {
  title: string;
  dateRange: string;
  bonuses: WeeklyBonus[];
  discounts: string[];
  summary: string;
  sources: { title: string; uri: string }[];
}

export interface CalculatedActivity extends Activity {
  currentHourlyProfit: number;
  isBonusActive: boolean;
  multiplier: number;
  totalTime: number;
}
