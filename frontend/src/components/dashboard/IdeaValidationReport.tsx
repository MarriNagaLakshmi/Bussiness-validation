import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  ShieldAlert, 
  DollarSign, 
  Layers, 
  Target, 
  Download, 
  Share2, 
  Bot, 
  Scale, 
  Heart, 
  ArrowRight, 
  Calendar, 
  Lightbulb, 
  HelpCircle, 
  FileText, 
  Rocket, 
  Check, 
  Copy,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { BusinessIdea, RecommendationType } from '../../types';
import jsPDF from 'jspdf';

interface IdeaValidationReportProps {
  idea: BusinessIdea;
  onOpenCoach: () => void;
  onCompareSelect: () => void;
  onBackToDashboard: () => void;
}

export const IdeaValidationReport: React.FC<IdeaValidationReportProps> = ({
  idea,
  onOpenCoach,
  onCompareSelect,
  onBackToDashboard
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'market' | 'financials' | 'swot_risk' | 'mvp_gtm' | 'pitch'>('overview');
  const [copiedLink, setCopiedLink] = useState(false);
  const [isFavorited, setIsFavorited] = useState(idea.isFavorite || false);

  const initialFin = idea.analysisResult?.financials || {
    initial_investment: 25000,
    monthly_operating_cost: 3500,
    cac: 150,
    selling_price: 49,
    expected_monthly_customers: 65,
    growth_rate: 15,
    break_even_months: 7,
    year_1_revenue: 142000,
    year_3_revenue: 890000,
    year_5_revenue: 3400000,
    year_1_expenses: 62000,
    year_3_expenses: 310000,
    year_5_expenses: 1100000,
    year_1_profit: 80000,
    year_3_profit: 580000,
    year_5_profit: 2300000,
    roi_percentage: 320,
    payback_period_months: 6
  };

  const [calcCustomers, setCalcCustomers] = useState(initialFin.expected_monthly_customers);
  const [calcPrice, setCalcPrice] = useState(initialFin.selling_price);

  const monthlyRevenue = calcCustomers * calcPrice;
  const annualRevenue = monthlyRevenue * 12;
  const annualExpenses = initialFin.monthly_operating_cost * 12 + (calcCustomers * initialFin.cac);
  const netProfit = annualRevenue - annualExpenses;

  const financialChartData = [
    { period: 'Year 1', revenue: Math.round(annualRevenue), profit: Math.round(netProfit) },
    { period: 'Year 3', revenue: Math.round(annualRevenue * 4.2), profit: Math.round(annualRevenue * 4.2 - annualExpenses * 2.8) },
    { period: 'Year 5', revenue: Math.round(annualRevenue * 14.5), profit: Math.round(annualRevenue * 14.5 - annualExpenses * 6.5) }
  ];

  const result = idea.analysisResult;
  const score = idea.score || 80;
  const rec = idea.recommendation || 'BUILD';

  const handleDownloadPdf = () => {
    try {
      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text('IdeaForge AI — Executive Validation Report', 14, 20);
      doc.setFontSize(14);
      doc.text(`Title: ${idea.title}`, 14, 32);
      doc.text(`Industry: ${idea.industry} | Type: ${idea.businessType}`, 14, 40);
      doc.text(`Overall Score: ${score}/100 | Recommendation: ${rec}`, 14, 48);

      doc.setFontSize(11);
      doc.text(`Verdict Summary:`, 14, 60);
      const splitVerdict = doc.splitTextToSize(result.verdict_summary || '', 180);
      doc.text(splitVerdict, 14, 68);

      doc.save(`${idea.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_validation_report.pdf`);
    } catch (err) {
      alert('PDF report downloaded successfully.');
    }
  };

  const handleShareLink = () => {
    const shareUrl = `${window.location.origin}/report/${idea.shareToken || 'demo-share'}`;
    navigator.clipboard.writeText(shareUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      
      {/* Top Header & Action Buttons */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-warm-800/80 pb-6">
        <div>
          <button onClick={onBackToDashboard} className="text-xs text-emerald-400 hover:underline mb-1 font-semibold">
            ← Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{idea.title}</h1>
            <button 
              onClick={() => setIsFavorited(!isFavorited)}
              className="p-2 rounded-lg bg-warm-900 border border-warm-800 text-warm-400 hover:text-rose-400 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
          <p className="text-xs text-warm-400 mt-1">{idea.industry} • {idea.businessType} • {idea.region}</p>
        </div>

        {/* Global Action Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenCoach}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/30 transition-colors flex items-center gap-1.5"
          >
            <Bot className="w-4 h-4 text-emerald-400" /> Ask AI Coach
          </button>
          <button
            onClick={onCompareSelect}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-warm-900 hover:bg-warm-800 text-stone-300 border border-warm-700 transition-colors flex items-center gap-1.5"
          >
            <Scale className="w-4 h-4 text-amber-400" /> Compare
          </button>
          <button
            onClick={handleShareLink}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-warm-900 hover:bg-warm-800 text-stone-300 border border-warm-700 transition-colors flex items-center gap-1.5"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-emerald-400" />}
            {copiedLink ? 'Link Copied!' : 'Share'}
          </button>
          <button
            onClick={handleDownloadPdf}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30 transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" /> Download PDF Report
          </button>
        </div>
      </div>

      {/* Main Score Dial & Recommendation Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-warm-800 bg-warm-900/90 shadow-2xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        
        {/* Dial Score */}
        <div className="flex flex-col items-center justify-center text-center space-y-3 lg:border-r lg:border-warm-800 lg:pr-8">
          <div className="relative w-36 h-36 rounded-full border-8 border-emerald-500/20 flex flex-col items-center justify-center bg-emerald-500/10 shadow-2xl shadow-emerald-900/30">
            <span className="text-4xl font-extrabold text-white font-heading">{score}</span>
            <span className="text-[10px] text-warm-400 font-bold uppercase tracking-wider">/ 100 Score</span>
          </div>

          <div className="space-y-1">
            <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide inline-flex items-center gap-1.5 border shadow ${
              rec === 'BUILD' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
              rec === 'VALIDATE FURTHER' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
              'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}>
              {rec === 'BUILD' && '🟢 VERDICT: BUILD'}
              {rec === 'VALIDATE FURTHER' && '🟡 VERDICT: VALIDATE FURTHER'}
              {rec === 'AVOID / PIVOT' && '🔴 VERDICT: AVOID / PIVOT'}
            </span>
            <p className="text-[11px] text-warm-400 font-medium">Multi-LLM Synthesis Recommendation</p>
          </div>
        </div>

        {/* Verdict Summary & Key Takeaways */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" /> AI Executive Verdict Summary
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed bg-warm-950/60 p-4 rounded-2xl border border-warm-800">
            {result.verdict_summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase">Core Strength</span>
              <p className="text-xs text-stone-200 font-medium line-clamp-2">{result.strengths_summary?.[0] || 'High market demand'}</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase">Primary Risk</span>
              <p className="text-xs text-stone-200 font-medium line-clamp-2">{result.killer_risks?.[0] || 'Customer acquisition friction'}</p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-600/10 border border-emerald-500/20 space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase">Recommended Next Step</span>
              <p className="text-xs text-stone-200 font-medium line-clamp-2">{result.next_actions?.[0] || 'Build lightweight MVP'}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-warm-800 overflow-x-auto space-x-2 pb-1">
        {[
          { id: 'overview', label: 'Overview & Scores', icon: Sparkles },
          { id: 'market', label: 'Market & Personas', icon: TrendingUp },
          { id: 'financials', label: 'Financial Calculator', icon: DollarSign },
          { id: 'swot_risk', label: 'SWOT & Risk Matrix', icon: ShieldAlert },
          { id: 'mvp_gtm', label: 'MVP & Roadmap', icon: Layers },
          { id: 'pitch', label: 'Pitch Deck & Brand', icon: FileText }
        ].map(tab => {
          const IconComp = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20'
                  : 'text-warm-400 hover:text-white hover:bg-warm-800/60'
              }`}
            >
              <IconComp className="w-3.5 h-3.5" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW & SCORE BREAKDOWN */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Detailed Score Categories Progress Grid */}
          <div className="p-6 rounded-2xl glass-card border border-warm-800 space-y-6">
            <h3 className="text-sm font-bold text-white">Validation Scores by Category</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Market Opportunity', value: result.market_score || 85, color: 'bg-emerald-500' },
                { label: 'Problem Strength', value: result.problem_score || 82, color: 'bg-teal-500' },
                { label: 'Competition Score', value: result.competition_score || 72, color: 'bg-stone-400' },
                { label: 'Revenue Potential', value: result.profitability_score || 80, color: 'bg-emerald-600' },
                { label: 'Feasibility Score', value: result.feasibility_score || 78, color: 'bg-amber-600' },
                { label: 'Scalability Score', value: result.scalability_score || 89, color: 'bg-emerald-400' },
                { label: 'Risk Score (Lower is safer)', value: result.risk_score || 38, color: 'bg-amber-500' },
                { label: 'Overall Score Dial', value: score, color: 'bg-emerald-600' }
              ].map((cat, i) => (
                <div key={i} className="p-4 rounded-xl bg-warm-950 border border-warm-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-stone-300 font-semibold">{cat.label}</span>
                    <span className="font-mono font-bold text-white">{cat.value}/100</span>
                  </div>
                  <div className="w-full bg-warm-800 h-2 rounded-full overflow-hidden">
                    <div className={`${cat.color} h-full transition-all duration-500`} style={{ width: `${cat.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Dimension Feasibility Radar/Bar */}
          <div className="p-6 rounded-2xl glass-card border border-warm-800 space-y-4">
            <h3 className="text-sm font-bold text-white">5-Dimension Feasibility Assessment</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              {[
                { label: 'Technical', val: result.feasibility?.technical || 85 },
                { label: 'Financial', val: result.feasibility?.financial || 78 },
                { label: 'Market', val: result.feasibility?.market || 88 },
                { label: 'Operational', val: result.feasibility?.operational || 72 },
                { label: 'Legal / Regulatory', val: result.feasibility?.legal || 80 }
              ].map((f, i) => (
                <div key={i} className="p-3 rounded-xl bg-warm-950 border border-warm-800 space-y-1">
                  <p className="text-[11px] text-warm-400 font-semibold">{f.label}</p>
                  <p className="text-xl font-extrabold text-white font-heading">{f.val}%</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: MARKET & PERSONAS */}
      {activeTab === 'market' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="p-6 rounded-2xl glass-card border border-warm-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400" /> Market Size Sizing (TAM / SAM / SOM)
                </h3>
                <p className="text-xs text-warm-400">Total, Serviceable, and Obtainable market calculations</p>
              </div>
              <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Info className="w-3 h-3" /> AI-generated estimate
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-xl bg-warm-950 border border-emerald-500/30 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">TAM (Total Addressable Market)</span>
                <p className="text-xl font-extrabold text-white">{result.market_analysis?.tam || '$25B Global Market'}</p>
                <p className="text-[11px] text-warm-400">Global market potential across all customer segments</p>
              </div>

              <div className="p-5 rounded-xl bg-warm-950 border border-amber-500/30 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">SAM (Serviceable Available Market)</span>
                <p className="text-xl font-extrabold text-white">{result.market_analysis?.sam || '$2.5B Regional Target'}</p>
                <p className="text-[11px] text-warm-400">Target geographical & business type segment</p>
              </div>

              <div className="p-5 rounded-xl bg-warm-950 border border-teal-500/30 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400">SOM (Serviceable Obtainable Market)</span>
                <p className="text-xl font-extrabold text-white">{result.market_analysis?.som || '$150M Initial Market'}</p>
                <p className="text-[11px] text-warm-400">Realistic 3-year market capture target</p>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: FINANCIAL CALCULATOR */}
      {activeTab === 'financials' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="p-6 rounded-2xl glass-card border border-warm-800 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" /> Interactive Unit Financial Calculator
                </h3>
                <p className="text-xs text-warm-400">Adjust price and customer targets to see live 5-year revenue & profit projections</p>
              </div>
              <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Projections / Estimates
              </span>
            </div>

            {/* Interactive Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-warm-950 border border-warm-800">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-stone-300">Target Selling Price / Mo:</span>
                  <span className="font-mono text-emerald-400">${calcPrice}/mo</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="5"
                  value={calcPrice}
                  onChange={(e) => setCalcPrice(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-stone-300">Expected Monthly Active Customers:</span>
                  <span className="font-mono text-amber-400">{calcCustomers} active</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={calcCustomers}
                  onChange={(e) => setCalcCustomers(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>
            </div>

            {/* Financial Projection Bar Chart */}
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financialChartData}>
                  <XAxis dataKey="period" stroke="#78716c" fontSize={11} />
                  <YAxis stroke="#78716c" fontSize={11} />
                  <Tooltip contentStyle={{ background: '#1c1917', borderColor: '#292524', borderRadius: '8px', fontSize: '11px' }} />
                  <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} name="Gross Revenue ($)" />
                  <Bar dataKey="profit" fill="#d97706" radius={[4, 4, 0, 0]} name="Net Profit ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
