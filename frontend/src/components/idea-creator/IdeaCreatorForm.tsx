import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  HelpCircle, 
  Zap, 
  Brain, 
  FileText, 
  DollarSign, 
  Users, 
  Briefcase, 
  ShieldAlert,
  Loader2
} from 'lucide-react';
import { analyzeIdeaApi } from '../../services/api';
import { useIdea } from '../../context/IdeaContext';
import confetti from 'canvas-confetti';

interface IdeaCreatorFormProps {
  onAnalysisCompleted: () => void;
}

export const IdeaCreatorForm: React.FC<IdeaCreatorFormProps> = ({ onAnalysisCompleted }) => {
  const { addIdeaToList } = useIdea();
  const [step, setStep] = useState<number>(1);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [progressStepIndex, setProgressStepIndex] = useState<number>(0);
  const [error, setError] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    industry: 'AI & Machine Learning',
    region: 'North America & Global',
    targetMarket: 'Small to Medium Businesses',
    businessType: 'SaaS',
    stage: 'Concept / Validation',
    targetCustomer: '',
    problemSeverity: 'High - Critical operational friction',
    switchMotivation: '10x faster execution and 50% lower cost',
    problemFrequency: 'Daily',
    revenueModel: 'Subscription',
    pricingModel: 'Tiered Monthly',
    expectedPrice: '$49/month',
    customerAcquisition: 'Digital Direct & Content SEO',
    distribution: 'Web SaaS Platform',
    budget: '$25,000',
    teamSize: '2 Founders (Tech + Sales)',
    techSkills: 'Full-Stack Software Development',
    timeline: '3 Months to MVP Launch',
    competitors: 'Legacy manual tools, traditional consulting',
    traction: '10 customer interviews completed'
  });

  const businessTypes = [
    'SaaS', 'Marketplace', 'E-commerce', 'Mobile App', 'AI Product', 
    'FinTech', 'EdTech', 'HealthTech', 'AgriTech', 'B2B', 'B2C', 'D2C', 'Service', 'Other'
  ];

  const industries = [
    'AI & Machine Learning', 'Software & SaaS', 'FinTech & Finance', 
    'AgriTech & Food', 'HealthTech & Wellness', 'EdTech & Learning', 
    'E-commerce & Logistics', 'ClimateTech & Sustainability', 'Creator Economy'
  ];

  const revenueModels = [
    'Subscription', 'Commission', 'Advertisement', 'Freemium', 
    'One-time purchase', 'Marketplace fee', 'Licensing', 'Usage-based', 'Other'
  ];

  const progressSteps = [
    'Understanding your business idea',
    'Identifying target customer personas',
    'Evaluating TAM / SAM / SOM market opportunity',
    'Analyzing competitor matrix & positioning',
    'Estimating 5-year unit financial projections',
    'Evaluating 9-category risk matrix & feasibility',
    'Synthesizing MVP features & launch strategy',
    'Preparing final AI recommendation & score dial'
  ];

  // Quick Preset Sample Templates
  const applyPreset = (presetType: 'farm' | 'ai' | 'fintech') => {
    if (presetType === 'farm') {
      setFormData({
        title: 'Farm2Table AI Direct Marketplace',
        description: 'An AI-powered B2B platform connecting regional organic farmers directly with restaurants and commercial kitchens to cut middleman margins and optimize daily deliveries.',
        industry: 'AgriTech & Food',
        region: 'United States & India',
        targetMarket: 'Organic restaurants & commercial kitchens',
        businessType: 'Marketplace',
        stage: 'Concept / Validation',
        targetCustomer: 'Restaurant head chefs & organic farm owners',
        problemSeverity: 'High - 40% margin loss to distributors',
        switchMotivation: 'Fresher produce and 20% lower procurement costs',
        problemFrequency: 'Daily ordering cycles',
        revenueModel: 'Commission',
        pricingModel: '5% transaction fee + $99/mo analytics',
        expectedPrice: '$99/month',
        customerAcquisition: 'Field sales & farm co-ops',
        distribution: 'Web & Mobile App',
        budget: '$25,000',
        teamSize: '3 Founders',
        techSkills: 'Full-Stack Web & AI Routing',
        timeline: '4 Months',
        competitors: 'Traditional wholesale food distributors',
        traction: '15 pilot LOIs signed'
      });
    } else if (presetType === 'ai') {
      setFormData({
        title: 'CodeGenie AI Code Auditor',
        description: 'An automated AI platform that continuously scans enterprise software repositories for security vulnerabilities, compliance bugs, and technical debt before deployment.',
        industry: 'AI & Machine Learning',
        region: 'Global',
        targetMarket: 'Software Engineering Teams & CTOs',
        businessType: 'SaaS',
        stage: 'MVP Prototype',
        targetCustomer: 'Lead Software Architects & DevOps Leads',
        problemSeverity: 'Critical - Security compliance breaches',
        switchMotivation: 'Automated 100% repo audit in seconds vs manual review',
        problemFrequency: 'Every pull request',
        revenueModel: 'Subscription',
        pricingModel: 'Per seat / repository',
        expectedPrice: '$199/month',
        customerAcquisition: 'GitHub Marketplace & Tech Twitter',
        distribution: 'Cloud SaaS API',
        budget: '$40,000',
        teamSize: '2 Founders',
        techSkills: 'Deep Learning & Systems Security',
        timeline: '2 Months',
        competitors: 'SonarQube, Snyk, manual peer review',
        traction: '50 GitHub waitlist signups'
      });
    }
  };

  const handleNext = () => {
    if (step === 1 && (!formData.title || !formData.description)) {
      setError('Please provide an idea title and description.');
      return;
    }
    setError('');
    setStep(prev => prev + 1);
  };

  const handleBack = () => setStep(prev => Math.max(1, prev - 1));

  const handleAnalyzeSubmit = async () => {
    setIsAnalyzing(true);
    setProgressStepIndex(0);

    // Simulate multi-step progress bar animation
    const interval = setInterval(() => {
      setProgressStepIndex(prev => {
        if (prev < progressSteps.length - 1) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 1200);

    try {
      const newIdea = await analyzeIdeaApi(formData);
      clearInterval(interval);
      addIdeaToList(newIdea);
      
      // Trigger celebration confetti
      try {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      } catch (e) {}

      onAnalysisCompleted();
    } catch (err: any) {
      clearInterval(interval);
      setIsAnalyzing(false);
      setError(err.message || 'AI Analysis Engine failed. Please try again.');
    }
  };

  if (isAnalyzing) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 text-center space-y-8 animate-fadeIn">
        <div className="relative w-24 h-24 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
          <Brain className="w-10 h-10 text-indigo-400 animate-pulse" />
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-extrabold text-white">AI Validation Engine Operating...</h2>
          <p className="text-sm text-slate-400">Synthesizing market signals, financial unit economics, and risk matrix</p>
        </div>

        {/* Animated Progress Steps List */}
        <div className="max-w-md mx-auto rounded-2xl glass-card border border-slate-800 p-6 space-y-3 text-left">
          {progressSteps.map((stepText, idx) => {
            const isDone = idx < progressStepIndex;
            const isCurrent = idx === progressStepIndex;
            return (
              <div key={idx} className="flex items-center space-x-3 text-xs">
                {isDone ? (
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold">
                    ✓
                  </div>
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-indigo-400 animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-slate-800 text-slate-600 flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </div>
                )}
                <span className={isDone ? 'text-slate-200 font-semibold' : isCurrent ? 'text-indigo-300 font-bold' : 'text-slate-500'}>
                  {stepText}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Wizard Header */}
      <div className="mb-8 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Step {step} of 5</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              {step === 1 && 'Basic Business Concept'}
              {step === 2 && 'Customer & Problem Context'}
              {step === 3 && 'Business & Revenue Model'}
              {step === 4 && 'Resources, Team & Traction'}
              {step === 5 && 'Review & Trigger AI Engine'}
            </h1>
          </div>

          {/* Quick Presets */}
          <div className="hidden sm:flex items-center space-x-2">
            <span className="text-[11px] text-slate-400 font-medium">Quick Preset:</span>
            <button
              onClick={() => applyPreset('farm')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors"
            >
              🌱 AgriTech Demo
            </button>
            <button
              onClick={() => applyPreset('ai')}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] text-slate-300 transition-colors"
            >
              🤖 Code AI Demo
            </button>
          </div>
        </div>

        {/* Step Progress Bar */}
        <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden flex">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className={`h-full flex-1 transition-all duration-300 ${
                i <= step ? 'bg-gradient-to-r from-indigo-500 to-sky-400' : 'bg-slate-800'
              }`}
            ></div>
          ))}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-400 flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Step Contents */}
      <div className="p-6 sm:p-8 rounded-2xl glass-card bg-slate-900/90 border border-slate-800 space-y-6">
        
        {/* STEP 1: Basic Idea */}
        {step === 1 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">Business Idea Title *</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. An AI platform that connects farmers directly with restaurants"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">Detailed Description *</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Explain what the product does, what friction it solves, and how users interact with it..."
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">Industry</label>
                <select
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                >
                  {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">Business Type</label>
                <select
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                >
                  {businessTypes.map(bt => <option key={bt} value={bt}>{bt}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">Target Region / Country</label>
                <input
                  type="text"
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  placeholder="e.g. North America, India, Global"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">Current Stage</label>
                <select
                  value={formData.stage}
                  onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                >
                  <option value="Concept / Validation">Concept / Validation</option>
                  <option value="MVP Prototype">MVP Prototype</option>
                  <option value="Early Traction">Early Traction / Beta</option>
                  <option value="Scaling Existing Business">Scaling Existing Business</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Customer & Problem */}
        {step === 2 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">Who is the target customer?</label>
              <input
                type="text"
                value={formData.targetCustomer}
                onChange={(e) => setFormData({ ...formData, targetCustomer: e.target.value })}
                placeholder="e.g. Organic restaurant head chefs, CTOs of mid-size tech companies"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">What specific problem are they facing?</label>
              <textarea
                rows={3}
                value={formData.problemSeverity}
                onChange={(e) => setFormData({ ...formData, problemSeverity: e.target.value })}
                placeholder="Describe the severity, wasted time, or financial cost of their current problem..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">Why would they switch to your solution?</label>
                <input
                  type="text"
                  value={formData.switchMotivation}
                  onChange={(e) => setFormData({ ...formData, switchMotivation: e.target.value })}
                  placeholder="e.g. 50% lower cost, 10x faster execution"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">Problem Frequency</label>
                <select
                  value={formData.problemFrequency}
                  onChange={(e) => setFormData({ ...formData, problemFrequency: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                >
                  <option value="Daily">Daily Workflow Friction</option>
                  <option value="Weekly">Weekly Task</option>
                  <option value="Monthly">Monthly Expense</option>
                  <option value="Occasional">Occasional / One-time</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Business Model & Pricing */}
        {step === 3 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">Primary Revenue Model</label>
                <select
                  value={formData.revenueModel}
                  onChange={(e) => setFormData({ ...formData, revenueModel: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                >
                  {revenueModels.map(rm => <option key={rm} value={rm}>{rm}</option>)}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">Target Pricing / Customer</label>
                <input
                  type="text"
                  value={formData.expectedPrice}
                  onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                  placeholder="e.g. $49/month, $500 one-time, 5% commission"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">Customer Acquisition Channel</label>
                <input
                  type="text"
                  value={formData.customerAcquisition}
                  onChange={(e) => setFormData({ ...formData, customerAcquisition: e.target.value })}
                  placeholder="e.g. SEO, Cold Email, Google Ads, Partnerships"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">Product Distribution Channel</label>
                <input
                  type="text"
                  value={formData.distribution}
                  onChange={(e) => setFormData({ ...formData, distribution: e.target.value })}
                  placeholder="e.g. Web SaaS Platform, iOS/Android App"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Resources & Team */}
        {step === 4 && (
          <div className="space-y-5 animate-fadeIn">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">Estimated Startup Budget</label>
                <input
                  type="text"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  placeholder="e.g. $10,000, $50,000"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-200">Team Size & Capability</label>
                <input
                  type="text"
                  value={formData.teamSize}
                  onChange={(e) => setFormData({ ...formData, teamSize: e.target.value })}
                  placeholder="e.g. Solo founder, 2 Technical Co-founders"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">Known Competitors</label>
              <input
                type="text"
                value={formData.competitors}
                onChange={(e) => setFormData({ ...formData, competitors: e.target.value })}
                placeholder="e.g. Legacy distributors, Sysco, local co-ops"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-200">Existing Traction (if any)</label>
              <input
                type="text"
                value={formData.traction}
                onChange={(e) => setFormData({ ...formData, traction: e.target.value })}
                placeholder="e.g. 15 customer LOIs signed, $2,000 pre-orders"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white"
              />
            </div>
          </div>
        )}

        {/* STEP 5: Summary & Trigger */}
        {step === 5 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-bold text-indigo-400 tracking-wide">{formData.industry} • {formData.businessType}</span>
                  <h3 className="text-lg font-extrabold text-white">{formData.title}</h3>
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {formData.expectedPrice}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{formData.description}</p>
              
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-900 text-[11px]">
                <div><span className="text-slate-500">Region:</span> <span className="text-slate-300 font-semibold">{formData.region}</span></div>
                <div><span className="text-slate-500">Revenue:</span> <span className="text-slate-300 font-semibold">{formData.revenueModel}</span></div>
                <div><span className="text-slate-500">Budget:</span> <span className="text-slate-300 font-semibold">{formData.budget}</span></div>
                <div><span className="text-slate-500">Team:</span> <span className="text-slate-300 font-semibold">{formData.teamSize}</span></div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-indigo-600/10 border border-indigo-500/30 text-xs text-indigo-300 space-y-1">
              <p className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-400" /> Ready for AI Synthesis Engine
              </p>
              <p className="text-slate-400">
                Clicking analyze will run 50+ market signals, compute TAM/SAM/SOM estimates, generate personas, financial unit models, risk grids, and MVP roadmaps.
              </p>
            </div>
          </div>
        )}

        {/* Wizard Navigation Footer Buttons */}
        <div className="pt-4 flex items-center justify-between border-t border-slate-800">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : <div></div>}

          {step < 5 ? (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all flex items-center gap-1.5"
            >
              Next Step <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleAnalyzeSubmit}
              className="px-8 py-3.5 rounded-xl text-sm font-extrabold bg-gradient-to-r from-indigo-600 to-sky-500 hover:from-indigo-500 hover:to-sky-400 text-white shadow-xl shadow-indigo-600/40 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              🔍 ANALYZE MY IDEA
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
