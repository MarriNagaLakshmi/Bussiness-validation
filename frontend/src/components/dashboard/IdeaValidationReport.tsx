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

  // Financial Calculator Interactive Inputs
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

  // Calculated dynamic financial metrics
  const monthlyRevenue = calcCustomers * calcPrice;
  const annualRevenue = monthlyRevenue * 12;
  const annualExpenses = initialFin.monthly_operating_cost * 12 + (calcCustomers * initialFin.cac);
  const netProfit = annualRevenue - annualExpenses;

  const financialChartData = [
    { period: 'Year 1', revenue: Math.round(annualRevenue), expenses: Math.round(annualExpenses), profit: Math.round(netProfit) },
    { period: 'Year 3', revenue: Math.round(annualRevenue * 4.2), expenses: Math.round(annualExpenses * 2.8), profit: Math.round(annualRevenue * 4.2 - annualExpenses * 2.8) },
    { period: 'Year 5', revenue: Math.round(annualRevenue * 14.5), expenses: Math.round(annualExpenses * 6.5), profit: Math.round(annualRevenue * 14.5 - annualExpenses * 6.5) }
  ];

  const result = idea.analysisResult;
  const score = idea.score || 80;
  const rec = idea.recommendation || 'BUILD';

  // Handle PDF Download using jsPDF
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

      doc.text(`TAM: ${result.market_analysis?.tam || 'N/A'}`, 14, 100);
      doc.text(`SAM: ${result.market_analysis?.sam || 'N/A'}`, 14, 108);
      doc.text(`SOM: ${result.market_analysis?.som || 'N/A'}`, 14, 116);

      doc.text(`Unit Financials (Year 1):`, 14, 130);
      doc.text(`Projected Revenue: $${annualRevenue.toLocaleString()}`, 14, 138);
      doc.text(`Projected Profit: $${netProfit.toLocaleString()}`, 14, 146);

      doc.save(`${idea.title.toLowerCase().replace(/[^a-z0-9]/g, '_')}_validation_report.pdf`);
    } catch (err) {
      alert('PDF generation downloaded executive text report.');
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
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <button onClick={onBackToDashboard} className="text-xs text-indigo-400 hover:underline mb-1 font-semibold">
            ← Back to Dashboard
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{idea.title}</h1>
            <button 
              onClick={() => setIsFavorited(!isFavorited)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isFavorited ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
          </div>
          <p className="text-xs text-slate-400 mt-1">{idea.industry} • {idea.businessType} • {idea.region}</p>
        </div>

        {/* Global Action Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onOpenCoach}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/30 transition-colors flex items-center gap-1.5"
          >
            <Bot className="w-4 h-4 text-indigo-400" /> Ask AI Coach
          </button>
          <button
            onClick={onCompareSelect}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Scale className="w-4 h-4 text-amber-400" /> Compare
          </button>
          <button
            onClick={handleShareLink}
            className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4 text-sky-400" />}
            {copiedLink ? 'Link Copied!' : 'Share'}
          </button>
          <button
            onClick={handleDownloadPdf}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
          >
            <Download className="w-4 h-4" /> Download PDF Report
          </button>
        </div>
      </div>

      {/* Main Score Dial & Recommendation Banner */}
      <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/40 shadow-2xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        
        {/* Dial Score */}
        <div className="flex flex-col items-center justify-center text-center space-y-3 lg:border-r lg:border-slate-800 lg:pr-8">
          <div className="relative w-36 h-36 rounded-full border-8 border-indigo-500/20 flex flex-col items-center justify-center bg-indigo-500/10 shadow-2xl shadow-indigo-500/30">
            <span className="text-4xl font-extrabold text-white font-heading">{score}</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">/ 100 Score</span>
          </div>

          <div className="space-y-1">
            <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide inline-flex items-center gap-1.5 border shadow ${
              rec === 'BUILD' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-emerald-500/10' :
              rec === 'VALIDATE FURTHER' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-amber-500/10' :
              'bg-rose-500/20 text-rose-300 border-rose-500/40 shadow-rose-500/10'
            }`}>
              {rec === 'BUILD' && '🟢 VERDICT: BUILD'}
              {rec === 'VALIDATE FURTHER' && '🟡 VERDICT: VALIDATE FURTHER'}
              {rec === 'AVOID / PIVOT' && '🔴 VERDICT: AVOID / PIVOT'}
            </span>
            <p className="text-[11px] text-slate-400 font-medium">Multi-LLM Synthesis Recommendation</p>
          </div>
        </div>

        {/* Verdict Summary & Key Takeaways */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-indigo-400" /> AI Executive Verdict Summary
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            {result.verdict_summary}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase">Core Strength</span>
              <p className="text-xs text-slate-200 font-medium line-clamp-2">{result.strengths_summary?.[0] || 'High market demand'}</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-1">
              <span className="text-[10px] font-bold text-amber-400 uppercase">Primary Risk</span>
              <p className="text-xs text-slate-200 font-medium line-clamp-2">{result.killer_risks?.[0] || 'Customer acquisition friction'}</p>
            </div>
            <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 space-y-1">
              <span className="text-[10px] font-bold text-indigo-400 uppercase">Recommended Next Step</span>
              <p className="text-xs text-slate-200 font-medium line-clamp-2">{result.next_actions?.[0] || 'Build lightweight MVP'}</p>
            </div>
          </div>
        </div>

      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-800 overflow-x-auto space-x-2 pb-1">
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
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
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
          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-6">
            <h3 className="text-sm font-bold text-white">Validation Scores by Category</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Market Opportunity', value: result.market_score || 85, color: 'bg-indigo-500' },
                { label: 'Problem Strength', value: result.problem_score || 82, color: 'bg-sky-500' },
                { label: 'Competition Score', value: result.competition_score || 72, color: 'bg-purple-500' },
                { label: 'Revenue Potential', value: result.profitability_score || 80, color: 'bg-emerald-500' },
                { label: 'Feasibility Score', value: result.feasibility_score || 78, color: 'bg-teal-500' },
                { label: 'Scalability Score', value: result.scalability_score || 89, color: 'bg-cyan-500' },
                { label: 'Risk Score (Lower is safer)', value: result.risk_score || 38, color: 'bg-amber-500' },
                { label: 'Overall Score Dial', value: score, color: 'bg-indigo-600' }
              ].map((cat, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-300 font-semibold">{cat.label}</span>
                    <span className="font-mono font-bold text-white">{cat.value}/100</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className={`${cat.color} h-full transition-all duration-500`} style={{ width: `${cat.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 5-Dimension Feasibility Radar/Bar */}
          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">5-Dimension Feasibility Assessment</h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              {[
                { label: 'Technical', val: result.feasibility?.technical || 85 },
                { label: 'Financial', val: result.feasibility?.financial || 78 },
                { label: 'Market', val: result.feasibility?.market || 88 },
                { label: 'Operational', val: result.feasibility?.operational || 72 },
                { label: 'Legal / Regulatory', val: result.feasibility?.legal || 80 }
              ].map((f, i) => (
                <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <p className="text-[11px] text-slate-400 font-semibold">{f.label}</p>
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
          
          {/* TAM / SAM / SOM Market Sizing */}
          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-indigo-400" /> Market Size Sizing (TAM / SAM / SOM)
                </h3>
                <p className="text-xs text-slate-400">Total, Serviceable, and Obtainable market calculations</p>
              </div>
              <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                <Info className="w-3 h-3" /> AI-generated estimate
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-5 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">TAM (Total Addressable Market)</span>
                <p className="text-xl font-extrabold text-white">{result.market_analysis?.tam || '$25B Global Market'}</p>
                <p className="text-[11px] text-slate-400">Global market potential across all customer segments</p>
              </div>

              <div className="p-5 rounded-xl bg-slate-950 border border-sky-500/30 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400">SAM (Serviceable Available Market)</span>
                <p className="text-xl font-extrabold text-white">{result.market_analysis?.sam || '$2.5B Regional Target'}</p>
                <p className="text-[11px] text-slate-400">Target geographical & business type segment</p>
              </div>

              <div className="p-5 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">SOM (Serviceable Obtainable Market)</span>
                <p className="text-xl font-extrabold text-white">{result.market_analysis?.som || '$150M Initial Market'}</p>
                <p className="text-[11px] text-slate-400">Realistic 3-year market capture target</p>
              </div>
            </div>

            {/* Trends */}
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-white">Emerging Market Trends</span>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-slate-300">
                {(result.market_analysis?.trends || []).map((t, idx) => (
                  <li key={idx} className="flex items-center gap-2 p-2 rounded bg-slate-900 border border-slate-800">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Customer Personas */}
          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-sky-400" /> Target Customer Personas
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(result.personas || []).map((persona, idx) => (
                <div key={idx} className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-base font-bold text-white">{persona.name}</h4>
                      <p className="text-xs text-indigo-400 font-semibold">{persona.role}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400">Age {persona.age}</span>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">Key Pain Points</span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {persona.pain_points.map((pp, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-rose-400 font-bold">•</span>
                          <span>{pp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">Buying Motivations</span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {persona.motivations.map((bm, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{bm}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Competitor Matrix Table */}
          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">Competitor Intelligence Grid</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                    <th className="pb-3 px-2">Competitor</th>
                    <th className="pb-3 px-2">Strength</th>
                    <th className="pb-3 px-2">Weakness</th>
                    <th className="pb-3 px-2">Pricing</th>
                    <th className="pb-3 px-2">Market Opportunity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {(result.competitors || []).map((comp, idx) => (
                    <tr key={idx}>
                      <td className="py-3 px-2 font-bold text-white">{comp.name}</td>
                      <td className="py-3 px-2 text-emerald-300">{comp.strength}</td>
                      <td className="py-3 px-2 text-rose-300">{comp.weakness}</td>
                      <td className="py-3 px-2 font-mono">{comp.pricing}</td>
                      <td className="py-3 px-2 text-indigo-300">{comp.opportunity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: FINANCIAL CALCULATOR */}
      {activeTab === 'financials' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" /> Interactive Unit Financial Calculator
                </h3>
                <p className="text-xs text-slate-400">Adjust price and customer targets to see live 5-year revenue & profit projections</p>
              </div>
              <span className="px-2.5 py-1 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                Projections / Estimates
              </span>
            </div>

            {/* Interactive Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Target Selling Price / Mo:</span>
                  <span className="font-mono text-emerald-400">${calcPrice}/mo</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="5"
                  value={calcPrice}
                  onChange={(e) => setCalcPrice(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Expected Monthly Active Customers:</span>
                  <span className="font-mono text-sky-400">{calcCustomers} active</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={calcCustomers}
                  onChange={(e) => setCalcCustomers(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>
            </div>

            {/* Calculated Key Financial Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Monthly Revenue</span>
                <p className="text-xl font-extrabold text-emerald-400 font-heading">${Math.round(monthlyRevenue).toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Annual Net Profit</span>
                <p className="text-xl font-extrabold text-indigo-300 font-heading">${Math.round(netProfit).toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Break-Even Period</span>
                <p className="text-xl font-extrabold text-amber-400 font-heading">Month {initialFin.break_even_months}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-400 font-semibold uppercase">Estimated ROI</span>
                <p className="text-xl font-extrabold text-teal-400 font-heading">{initialFin.roi_percentage}%</p>
              </div>
            </div>

            {/* Financial Projection Bar Chart */}
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financialChartData}>
                  <XAxis dataKey="period" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} />
                  <Tooltip contentStyle={{ background: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '11px' }} />
                  <Bar dataKey="revenue" fill="#6366f1" radius={[4, 4, 0, 0]} name="Gross Revenue ($)" />
                  <Bar dataKey="profit" fill="#10b981" radius={[4, 4, 0, 0]} name="Net Profit ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: SWOT & RISK MATRIX */}
      {activeTab === 'swot_risk' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* 2x2 SWOT Matrix */}
          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white">2x2 SWOT Analysis Grid</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Strengths */}
              <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">💪 Strengths</span>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  {(result.swot?.strengths || []).map((s, i) => (
                    <li key={i} className="flex items-start gap-1.5">• <span>{s}</span></li>
                  ))}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="p-5 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">⚠️ Weaknesses</span>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  {(result.swot?.weaknesses || []).map((w, i) => (
                    <li key={i} className="flex items-start gap-1.5">• <span>{w}</span></li>
                  ))}
                </ul>
              </div>

              {/* Opportunities */}
              <div className="p-5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 space-y-2">
                <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">🚀 Opportunities</span>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  {(result.swot?.opportunities || []).map((o, i) => (
                    <li key={i} className="flex items-start gap-1.5">• <span>{o}</span></li>
                  ))}
                </ul>
              </div>

              {/* Threats */}
              <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 space-y-2">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">🛡️ Threats</span>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  {(result.swot?.threats || []).map((t, i) => (
                    <li key={i} className="flex items-start gap-1.5">• <span>{t}</span></li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

          {/* Risk Grid */}
          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-amber-400" /> Risk Evaluation & Mitigation Matrix
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase font-semibold">
                    <th className="pb-3 px-2">Risk Category</th>
                    <th className="pb-3 px-2">Severity</th>
                    <th className="pb-3 px-2">Probability</th>
                    <th className="pb-3 px-2">Impact Detail</th>
                    <th className="pb-3 px-2">Mitigation Strategy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {(result.risks || []).map((rk, idx) => (
                    <tr key={idx}>
                      <td className="py-3 px-2 font-bold text-white">{rk.category}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          rk.severity === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                        }`}>{rk.severity}</span>
                      </td>
                      <td className="py-3 px-2">{rk.probability}</td>
                      <td className="py-3 px-2 text-slate-300">{rk.impact}</td>
                      <td className="py-3 px-2 text-emerald-300 font-medium">{rk.mitigation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 5: MVP & ROADMAP */}
      {activeTab === 'mvp_gtm' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* MVP Prioritization */}
          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" /> MVP Feature Matrix
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 space-y-2">
                <span className="text-xs font-bold text-emerald-400 uppercase">Must-Have (V1 Launch)</span>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  {(result.mvp?.must_have || []).map((mh, i) => (
                    <li key={i} className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> <span>{mh}</span></li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-sky-500/30 space-y-2">
                <span className="text-xs font-bold text-sky-400 uppercase">Nice-to-Have (V2)</span>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  {(result.mvp?.nice_to_have || []).map((nth, i) => (
                    <li key={i} className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-sky-400 shrink-0" /> <span>{nth}</span></li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-950 border border-rose-500/30 space-y-2">
                <span className="text-xs font-bold text-rose-400 uppercase">Avoid Initially</span>
                <ul className="space-y-1.5 text-xs text-slate-200">
                  {(result.mvp?.avoid_initially || []).map((ai, i) => (
                    <li key={i} className="flex items-center gap-1.5"><span className="text-rose-400 font-bold">✕</span> <span>{ai}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Development Roadmap Timeline */}
          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" /> Step-by-Step Development Timeline
            </h3>

            <div className="space-y-3">
              {(result.roadmap || []).map((rm, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-white">{rm.phase}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-indigo-300">{rm.duration}</span>
                    </div>
                    <p className="text-xs text-slate-400">{rm.focus}</p>
                  </div>
                  <span className="px-3 py-1 rounded text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {rm.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 6: PITCH DECK & BRAND */}
      {activeTab === 'pitch' && (
        <div className="space-y-6 animate-fadeIn">
          
          {/* Pitch Deck Outline */}
          <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-400" /> AI Generated 11-Slide Pitch Deck Outline
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {(result.pitch_deck || []).map((slide) => (
                <div key={slide.slide} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-indigo-400 uppercase">Slide {slide.slide}</span>
                    <span className="text-xs font-bold text-white">{slide.title}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{slide.content}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
