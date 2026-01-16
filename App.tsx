
import React, { useState, useEffect, useMemo } from 'react';
import { 
  TrendingUp, 
  Clock, 
  DollarSign, 
  Calendar, 
  Tag, 
  ExternalLink, 
  ChevronRight,
  ShieldAlert,
  Loader2,
  RefreshCw,
  Info,
  Filter,
  ListOrdered,
  X,
  CheckCircle2,
  ChevronDown,
  Target,
  Zap
} from 'lucide-react';
import { ACTIVITIES } from './constants.tsx';
import { EventWeekData, CalculatedActivity } from './types.ts';
import { fetchCurrentEventWeek } from './services/geminiService.ts';

const formatProfit = (amount: number): string => {
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(1).replace(/\.0$/, '')} Mil`;
  }
  return `${(amount / 1000).toFixed(0)}K`;
};

const formatDuration = (minutes: number): string => {
  if (minutes >= 60) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}m` : `${h}h`;
  }
  return `${minutes}m`;
};

const CATEGORIES = ['All', 'Heist', 'Business', 'Passive', 'Contact Mission'];
const LIMITS = [5, 10, 15, 25];

const ActivityDetailModal: React.FC<{ 
  activity: CalculatedActivity | null, 
  onClose: () => void 
}> = ({ activity, onClose }) => {
  if (!activity) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-[2.5rem] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-300">
        
        <div className="p-8 border-b border-zinc-900 bg-zinc-900/50 flex items-start justify-between shrink-0">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="px-3 py-1 bg-green-500/10 text-green-500 text-[10px] font-black rounded-full uppercase tracking-widest border border-green-500/20">
                {activity.category}
              </span>
              <span className={`px-3 py-1 text-[10px] font-black rounded-full uppercase tracking-widest border ${
                activity.difficulty === 'Easy' ? 'bg-green-500/5 text-green-400 border-green-500/10' :
                activity.difficulty === 'Medium' ? 'bg-yellow-500/5 text-yellow-400 border-yellow-500/10' :
                'bg-red-500/5 text-red-400 border-red-500/10'
              }`}>
                {activity.difficulty} DIFF
              </span>
            </div>
            <h2 className="text-3xl font-black gta-font tracking-tight uppercase text-white leading-none">{activity.name}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-full transition-colors text-zinc-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-10 custom-scrollbar">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6 bg-zinc-900/30 rounded-3xl border border-zinc-800/50">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Est. Profit</p>
              <p className="text-xl font-black font-mono text-green-500">${formatProfit(activity.currentHourlyProfit)}/hr</p>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Runtime</p>
              <p className="text-xl font-black font-mono text-zinc-200">~{formatDuration(activity.totalTime)}</p>
            </div>
            <div className="hidden sm:block space-y-1">
              <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Bonus</p>
              <p className={`text-xl font-black font-mono ${activity.isBonusActive ? 'text-green-500' : 'text-zinc-600'}`}>
                {activity.multiplier}X
              </p>
            </div>
          </div>

          <section>
            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center mb-4">
              <Target className="w-4 h-4 mr-2 text-zinc-500" /> Operational Requirements
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activity.requirements?.map((req, i) => (
                <li key={i} className="flex items-start p-4 bg-zinc-900/50 border border-zinc-800/50 rounded-2xl group hover:border-zinc-700 transition-colors">
                  <CheckCircle2 className="w-4 h-4 mr-3 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors">{req}</span>
                </li>
              )) || <p className="text-zinc-600 text-xs">No specific requirements found.</p>}
            </ul>
          </section>

          <section>
            <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center mb-4">
              <Zap className="w-4 h-4 mr-2 text-zinc-500" /> Step-By-Step Intel
            </h3>
            <div className="space-y-4">
              {activity.instructions?.map((step, i) => (
                <div key={i} className="flex space-x-4">
                  <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0 text-xs font-black text-zinc-400 border border-zinc-700">
                    {i + 1}
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed pt-1">
                    {step}
                  </p>
                </div>
              )) || <p className="text-zinc-600 text-xs">Awaiting strategic intelligence...</p>}
            </div>
          </section>

          {activity.specialTips && (
            <section className="p-6 bg-green-500/5 border border-green-500/20 rounded-3xl">
              <h3 className="text-[10px] font-black text-green-500 uppercase tracking-[0.2em] mb-3 flex items-center">
                <ShieldAlert className="w-3.5 h-3.5 mr-2" /> Professional Tip
              </h3>
              <p className="text-sm text-zinc-300 italic leading-relaxed">
                "{activity.specialTips}"
              </p>
            </section>
          )}

          <div className="pt-6 border-t border-zinc-900 text-[10px] font-bold text-zinc-600 uppercase tracking-widest text-center">
            Last Intelligence update: 2025 • Compiled via LSProfit AI
          </div>
        </div>
      </div>
    </div>
  );
};

const ProfitMaster: React.FC = () => {
  const [eventData, setEventData] = useState<EventWeekData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [fetchTime, setFetchTime] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [displayLimit, setDisplayLimit] = useState<number>(10);
  const [selectedActivity, setSelectedActivity] = useState<CalculatedActivity | null>(null);

  const loadData = async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchCurrentEventWeek();
      setEventData(data);
      setFetchTime(new Date().toLocaleTimeString());
    } catch (err) {
      console.error("Failed to load event data", err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const topActivities = useMemo(() => {
    if (!eventData) return [];

    const calculated: CalculatedActivity[] = ACTIVITIES.map(activity => {
      const bonus = eventData.bonuses.find(b => 
        b.activityId.toLowerCase().includes(activity.id.toLowerCase()) || 
        activity.id.toLowerCase().includes(b.activityId.toLowerCase())
      );
      const multiplier = bonus ? bonus.multiplier : 1;
      return {
        ...activity,
        currentHourlyProfit: activity.baseHourlyProfit * multiplier,
        isBonusActive: multiplier > 1,
        multiplier,
        totalTime: activity.setupTime + activity.executionTime
      };
    });

    return calculated
      .filter(a => selectedCategory === 'All' || a.category === selectedCategory)
      .sort((a, b) => b.currentHourlyProfit - a.currentHourlyProfit)
      .slice(0, displayLimit);
  }, [eventData, selectedCategory, displayLimit]);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
        <div className="text-center">
          <p className="text-zinc-200 font-bold text-lg gta-font tracking-widest uppercase">Initializing Interface</p>
          <p className="text-zinc-500 text-sm animate-pulse">Scanning Rockstar Newswire via Gemini AI...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 pb-20">
      {selectedActivity && (
        <ActivityDetailModal 
          activity={selectedActivity} 
          onClose={() => setSelectedActivity(null)} 
        />
      )}

      <header className="sticky top-0 z-50 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center font-black text-black text-xl gta-font shadow-lg shadow-green-600/20">
              $
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight gta-font leading-none uppercase">LS<span className="text-green-500">PROFIT</span></h1>
              <p className="text-[10px] text-zinc-500 font-bold tracking-tighter uppercase opacity-70">Strategic Intelligence Unit</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:block text-right">
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Last Intel Sync</p>
              <p className="text-xs font-mono text-green-500">{fetchTime}</p>
            </div>
            <button 
              onClick={loadData}
              disabled={isRefreshing}
              className="flex items-center space-x-2 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 px-4 py-2 rounded-full transition-all border border-zinc-700 text-sm font-bold"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">{isRefreshing ? 'Syncing...' : 'Sync Intel'}</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-3xl p-8 relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-green-500 text-black text-[10px] font-black rounded uppercase tracking-widest">
                  LIVE UPDATES ACTIVE
                </span>
                <span className="flex items-center text-zinc-400 text-sm font-medium">
                  <Calendar className="w-4 h-4 mr-2" />
                  {eventData?.dateRange}
                </span>
              </div>
              <h2 className="text-4xl font-black mb-4 gta-font tracking-tight leading-tight uppercase text-white">
                {eventData?.title}
              </h2>
              <p className="text-zinc-400 mb-8 max-w-3xl text-lg leading-relaxed">
                {eventData?.summary}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-zinc-950/40 p-5 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
                  <h3 className="text-xs font-black text-green-500 uppercase mb-4 flex items-center tracking-widest">
                    <TrendingUp className="w-4 h-4 mr-2" /> Weekly Multipliers
                  </h3>
                  <ul className="space-y-3">
                    {eventData?.bonuses.length ? eventData?.bonuses.map((b, i) => {
                      const activity = ACTIVITIES.find(a => 
                        a.id.toLowerCase().includes(b.activityId.toLowerCase()) || 
                        b.activityId.toLowerCase().includes(a.id.toLowerCase())
                      );
                      return (
                        <li key={i} className="flex items-center justify-between group">
                          <span className="text-zinc-300 font-medium group-hover:text-white transition-colors">
                            {activity?.name || b.activityId.replace(/-/g, ' ')}
                          </span>
                          <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-xs font-black border border-green-500/20 rounded">
                            {b.multiplier}X
                          </span>
                        </li>
                      );
                    }) : <li className="text-zinc-600 text-xs italic">No active multipliers detected.</li>}
                  </ul>
                </div>
                <div className="bg-zinc-950/40 p-5 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
                  <h3 className="text-xs font-black text-orange-400 uppercase mb-4 flex items-center tracking-widest">
                    <Tag className="w-4 h-4 mr-2" /> High-Value Discounts
                  </h3>
                  <ul className="space-y-3">
                    {eventData?.discounts.length ? eventData?.discounts.slice(0, 4).map((d, i) => (
                      <li key={i} className="text-sm text-zinc-400 flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span className="truncate">{d}</span>
                      </li>
                    )) : <li className="text-zinc-600 text-xs italic">Check in-game for unlisted deals.</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col shadow-xl">
            <h3 className="text-sm font-black text-zinc-500 uppercase tracking-widest mb-6 flex items-center">
              <Info className="w-4 h-4 mr-2" /> Intelligence Sources
            </h3>
            <div className="space-y-2 flex-1 overflow-y-auto max-h-[400px] pr-1 custom-scrollbar">
              {eventData?.sources && eventData.sources.length > 0 ? (
                eventData.sources.map((source, i) => (
                  <a 
                    key={i} 
                    href={source.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-2xl bg-zinc-950/50 hover:bg-zinc-800 border border-zinc-800/50 transition-all group"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-zinc-200 group-hover:text-green-400 transition-colors truncate">
                        {source.title.replace(/GTA Online Weekly Update|New Weekly Update/gi, '').trim() || 'Rockstar Intel'}
                      </p>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-700 group-hover:text-green-500 ml-3 transition-colors shrink-0" />
                  </a>
                ))
              ) : (
                <div className="text-center py-12 px-4">
                  <p className="text-zinc-600 text-xs italic">No external links verified for this cycle.</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <section>
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h2 className="text-3xl font-black gta-font tracking-tight uppercase text-white">THE <span className="text-green-500">PROFIT INDEX</span></h2>
                <p className="text-zinc-500 text-sm font-medium mt-1">Real-time analysis of the most lucrative activities.</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex flex-col space-y-2">
                  <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">
                    <Filter className="w-3 h-3 inline mr-1" /> Category
                  </label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-zinc-950 border border-zinc-800 text-zinc-200 text-xs font-bold px-4 py-2.5 rounded-xl outline-none min-w-[160px]"
                  >
                    {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}s</option>)}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {topActivities.map((activity, index) => (
              <div 
                key={activity.id}
                onClick={() => setSelectedActivity(activity)}
                className={`group relative bg-zinc-900 border ${activity.isBonusActive ? 'border-green-500/40 shadow-lg' : 'border-zinc-800'} rounded-[2rem] p-6 hover:border-zinc-600 transition-all cursor-pointer`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                  <div className="flex items-center space-x-6">
                    <div className={`w-16 h-16 flex items-center justify-center rounded-2xl text-2xl font-black ${index === 0 ? 'bg-green-500 text-black shadow-lg' : 'bg-zinc-800 text-zinc-400'}`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-white group-hover:text-green-400 transition-colors uppercase gta-font tracking-tight">{activity.name}</h3>
                      <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 mt-2 inline-block">
                        {activity.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2">Efficiency Rating</span>
                      <span className={`text-3xl font-black font-mono ${activity.isBonusActive ? 'text-green-500' : 'text-zinc-100'}`}>
                        ${formatProfit(activity.currentHourlyProfit)}<span className="text-sm font-bold text-zinc-600">/hr</span>
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest mb-2">Time to Payout</span>
                      <div className="flex items-center text-zinc-300">
                        <Clock className="w-4 h-4 mr-3 text-zinc-600" />
                        <span className="text-xl font-black font-mono">{formatDuration(activity.totalTime)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:block">
                    <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center group-hover:bg-green-500 transition-all">
                       <ChevronRight className="w-6 h-6 text-zinc-600 group-hover:text-black" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="max-w-7xl mx-auto px-4 py-12 border-t border-zinc-900 text-center text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
        LSProfit Intelligence Unit • Data Powered by Gemini Vision • Established 2025
      </footer>
    </div>
  );
};

export default ProfitMaster;
