import React, { useState } from 'react';
import { Compass, Sparkles, TrendingUp, Flame, ArrowRight } from 'lucide-react';

interface ExploreIdeasProps {
  onSelectSampleIdea: (sample: any) => void;
}

export const ExploreIdeas: React.FC<ExploreIdeasProps> = ({ onSelectSampleIdea }) => {
  const [selectedCat, setSelectedCat] = useState<string>('All');

  const categories = ['All', 'AI & ML', 'SaaS', 'FinTech', 'AgriTech', 'HealthTech', 'E-commerce', 'ClimateTech'];

  const samples = [
    {
      id: 'sample-1',
      title: 'Farm2Table AI Direct Farmer Marketplace',
      category: 'AgriTech',
      description: 'AI platform connecting organic farmers directly with urban restaurants to cut distributor markup.',
      score: 84,
      market: '$18B SAM',
      difficulty: 'Medium',
      investment: '$25,000',
      trending: true
    },
    {
      id: 'sample-2',
      title: 'CodeGenie Automated Vulnerability Auditor',
      category: 'AI & ML',
      description: 'Continuous devsecops code auditing agent for GitHub enterprise repositories.',
      score: 88,
      market: '$42B TAM',
      difficulty: 'Hard',
      investment: '$40,000',
      trending: true
    },
    {
      id: 'sample-3',
      title: 'PaySwift Cross-Border Micro Payments',
      category: 'FinTech',
      description: 'Stablecoin settlement rails for freelancer payouts with zero forex fees.',
      score: 81,
      market: '$120B TAM',
      difficulty: 'Hard',
      investment: '$75,000',
      trending: false
    },
    {
      id: 'sample-4',
      title: 'NutriFit AI Personalized Meal Prep',
      category: 'HealthTech',
      description: 'AI meal plan generator synced with local dark kitchen delivery networks.',
      score: 79,
      market: '$9B SAM',
      difficulty: 'Easy',
      investment: '$15,000',
      trending: true
    }
  ];

  const filtered = selectedCat === 'All' ? samples : samples.filter(s => s.category.includes(selectedCat.split(' ')[0]));

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          <Compass className="w-6 h-6 text-sky-400" /> Explore Validated Business Ideas
        </h1>
        <p className="text-xs text-slate-400">Discover pre-analyzed business concepts, market trends, and startup feasibility scores</p>
      </div>

      {/* Category Pills */}
      <div className="flex overflow-x-auto gap-2 pb-1">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setSelectedCat(c)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCat === c ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(item => (
          <div key={item.id} className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4 hover:border-indigo-500/40 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">{item.category}</span>
                <h3 className="text-lg font-bold text-white mt-0.5">{item.title}</h3>
              </div>
              {item.trending && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400" /> Trending
                </span>
              )}
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-[11px]">
              <div>
                <span className="text-slate-500 block">AI Score</span>
                <span className="font-mono font-bold text-emerald-400 text-sm">{item.score}/100</span>
              </div>
              <div>
                <span className="text-slate-500 block">Market</span>
                <span className="font-semibold text-slate-200">{item.market}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Est. Investment</span>
                <span className="font-semibold text-slate-200">{item.investment}</span>
              </div>
            </div>

            <button
              onClick={() => onSelectSampleIdea(item)}
              className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-indigo-600 text-slate-200 hover:text-white border border-slate-800 transition-colors flex items-center justify-center gap-1.5"
            >
              Explore Full Report <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
