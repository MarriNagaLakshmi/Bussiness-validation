import React from 'react';
import { 
  BarChart3, 
  Sparkles, 
  TrendingUp, 
  ShieldAlert, 
  PlusCircle, 
  Star, 
  Trash2, 
  Share2, 
  Eye, 
  Award,
  Calendar,
  Layers
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  BarChart, 
  Bar 
} from 'recharts';
import { useIdea } from '../../context/IdeaContext';
import { BusinessIdea } from '../../types';

interface DashboardOverviewProps {
  onNewAnalysis: () => void;
  onSelectIdea: (idea: BusinessIdea) => void;
  onCompareSelect: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNewAnalysis,
  onSelectIdea,
  onCompareSelect
}) => {
  const { ideas } = useIdea();

  const totalIdeas = ideas.length;
  const totalScoreSum = ideas.reduce((acc, i) => acc + (i.score || 0), 0);
  const averageScore = totalIdeas > 0 ? Math.round(totalScoreSum / totalIdeas) : 0;
  const bestIdea = ideas.length > 0 ? [...ideas].sort((a, b) => (b.score || 0) - (a.score || 0))[0] : null;

  // Chart data formatting
  const chartData = ideas.slice(0, 7).reverse().map((item, idx) => ({
    name: item.title.length > 15 ? item.title.substring(0, 15) + '...' : item.title,
    score: item.score || 80,
    market: item.analysisResult?.market_score || 85,
    risk: item.analysisResult?.risk_score || 35
  }));

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Founder Validation Dashboard</h1>
          <p className="text-xs text-slate-400">Track and compare AI analysis metrics across all your startup concepts</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onCompareSelect}
            className="px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            📊 Compare Ideas
          </button>
          <button
            onClick={onNewAnalysis}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" /> Validate New Idea
          </button>
        </div>
      </div>

      {/* Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">Total Ideas Analyzed</span>
            <BarChart3 className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-3xl font-extrabold text-white font-heading">{totalIdeas}</p>
          <p className="text-[11px] text-slate-400">Multi-LLM reports generated</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">Average Score</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-white font-heading">{averageScore} <span className="text-xs font-normal text-slate-400">/ 100</span></p>
          <p className="text-[11px] text-emerald-400 font-semibold">High potential average</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">Best Performing Idea</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-lg font-bold text-white truncate">{bestIdea ? bestIdea.title : 'N/A'}</p>
          <p className="text-[11px] text-slate-400 font-mono">Score: {bestIdea?.score || 0}/100 ({bestIdea?.recommendation || 'N/A'})</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-800 space-y-2">
          <div className="flex justify-between items-center text-slate-400">
            <span className="text-xs font-semibold">Saved Reports</span>
            <Layers className="w-4 h-4 text-sky-400" />
          </div>
          <p className="text-3xl font-extrabold text-white font-heading">{ideas.filter(i => i.isSaved).length}</p>
          <p className="text-[11px] text-slate-400">Available for PDF export</p>
        </div>

      </div>

      {/* Analytics Visual Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Score History Chart */}
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-indigo-400" /> Idea Score & Market Potential History
            </h3>
            <span className="text-[10px] text-slate-400">Last 7 Analyses</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="marketColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} domain={[0, 100]} tickLine={false} />
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '11px' }} />
                <Area type="monotone" dataKey="score" stroke="#6366f1" fillOpacity={1} fill="url(#scoreColor)" name="Overall Score" />
                <Area type="monotone" dataKey="market" stroke="#10b981" fillOpacity={1} fill="url(#marketColor)" name="Market Score" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Level Distribution Bar */}
        <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" /> Calculated Startup Risk Levels
            </h3>
            <span className="text-[10px] text-slate-400">0 = Low Risk, 100 = High Risk</span>
          </div>

          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                <YAxis stroke="#64748b" fontSize={10} domain={[0, 100]} tickLine={false} />
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="risk" fill="#f59e0b" radius={[6, 6, 0, 0]} name="Risk Level" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* Saved Analyses Table */}
      <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-bold text-white">Recent Idea Validations</h3>
          <span className="text-xs text-slate-400">{ideas.length} Ideas Saved</span>
        </div>

        {ideas.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <Sparkles className="w-8 h-8 text-indigo-400 mx-auto" />
            <p className="text-sm text-slate-300 font-bold">No validated business ideas yet</p>
            <p className="text-xs text-slate-400">Click "Validate New Idea" above to run your first AI analysis.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
                  <th className="pb-3 px-2">Business Idea</th>
                  <th className="pb-3 px-2">Industry</th>
                  <th className="pb-3 px-2">Score</th>
                  <th className="pb-3 px-2">AI Verdict</th>
                  <th className="pb-3 px-2">Created</th>
                  <th className="pb-3 px-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {ideas.map(item => (
                  <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-2">
                      <div className="font-bold text-white hover:text-indigo-400 cursor-pointer" onClick={() => onSelectIdea(item)}>
                        {item.title}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-xs">{item.description}</div>
                    </td>
                    <td className="py-3.5 px-2">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                        {item.industry}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 font-mono font-bold text-sm text-white">
                      {item.score}/100
                    </td>
                    <td className="py-3.5 px-2">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        item.recommendation === 'BUILD' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        item.recommendation === 'VALIDATE FURTHER' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                        'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {item.recommendation}
                      </span>
                    </td>
                    <td className="py-3.5 px-2 text-slate-400 text-[11px]">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-2 text-right">
                      <button
                        onClick={() => onSelectIdea(item)}
                        className="px-3 py-1 rounded bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 text-xs font-semibold border border-indigo-500/30 transition-colors inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> View Report
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};
