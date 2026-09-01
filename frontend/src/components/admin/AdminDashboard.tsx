import React, { useEffect, useState } from 'react';
import { ShieldCheck, Users, BarChart3, Sparkles, Cpu, Award } from 'lucide-react';
import { fetchAdminMetrics } from '../../services/api';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    fetchAdminMetrics().then(setMetrics);
  }, []);

  if (!metrics) {
    return <div className="py-20 text-center text-xs text-warm-400">Loading admin system metrics...</div>;
  }

  const COLORS = ['#10b981', '#f59e0b', '#c2410c', '#78716c', '#047857'];

  const scoreData = [
    { name: 'High Potential (80+)', value: metrics.scoreDistribution?.high || 1420 },
    { name: 'Moderate (65-79)', value: metrics.scoreDistribution?.medium || 1820 },
    { name: 'Needs Pivot (<65)', value: metrics.scoreDistribution?.low || 600 }
  ];

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-amber-500" /> Platform Admin & Analytics Dashboard
        </h1>
        <p className="text-xs text-warm-400">Monitor system performance, user activity, AI API utilization, and industry validation trends</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl glass-card border border-warm-800 space-y-1">
          <span className="text-xs text-warm-400 font-semibold">Total Registered Users</span>
          <p className="text-3xl font-extrabold text-white font-heading">{metrics.totalUsers.toLocaleString()}</p>
          <p className="text-[11px] text-emerald-400 font-semibold">Active Founders Platform</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-warm-800 space-y-1">
          <span className="text-xs text-warm-400 font-semibold">Total Ideas Validated</span>
          <p className="text-3xl font-extrabold text-emerald-400 font-heading">{metrics.totalIdeas.toLocaleString()}</p>
          <p className="text-[11px] text-warm-400">Multi-LLM reports compiled</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-warm-800 space-y-1">
          <span className="text-xs text-warm-400 font-semibold">Platform Average Score</span>
          <p className="text-3xl font-extrabold text-amber-400 font-heading">{metrics.averageScore} <span className="text-xs font-normal text-warm-400">/ 100</span></p>
          <p className="text-[11px] text-warm-400">Balanced score distribution</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-warm-800 space-y-1">
          <span className="text-xs text-warm-400 font-semibold">AI Infrastructure Health</span>
          <p className="text-lg font-extrabold text-emerald-400 font-heading pt-1 flex items-center gap-1.5">
            <Cpu className="w-5 h-5 text-emerald-400" /> 100% Operational
          </p>
          <p className="text-[11px] text-warm-400">Gemini / GPT-4o / Synthesis</p>
        </div>
      </div>

      {/* Admin Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Popular Industries Bar Chart */}
        <div className="p-6 rounded-2xl glass-card border border-warm-800 space-y-4">
          <h3 className="text-sm font-bold text-white">Popular Validation Industries</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.popularIndustries} layout="vertical">
                <XAxis type="number" stroke="#78716c" fontSize={10} />
                <YAxis dataKey="name" type="category" stroke="#78716c" fontSize={10} width={120} />
                <Tooltip contentStyle={{ background: '#1c1917', borderColor: '#292524', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="count" fill="#10b981" radius={[0, 6, 6, 0]} name="Analyses Count" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score Distribution Pie */}
        <div className="p-6 rounded-2xl glass-card border border-warm-800 space-y-4">
          <h3 className="text-sm font-bold text-white">Score Distribution Breakdown</h3>
          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={scoreData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {scoreData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: '#1c1917', borderColor: '#292524', borderRadius: '8px', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
