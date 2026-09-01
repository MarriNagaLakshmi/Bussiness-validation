import React, { useState } from 'react';
import { Scale, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';
import { useIdea } from '../../context/IdeaContext';
import { BusinessIdea } from '../../types';

export const IdeaComparison: React.FC = () => {
  const { ideas } = useIdea();
  const [selectedIds, setSelectedIds] = useState<string[]>(ideas.slice(0, 3).map(i => i.id));

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 2) setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      if (selectedIds.length < 4) setSelectedIds([...selectedIds, id]);
    }
  };

  const comparedIdeas = selectedIds.map(id => ideas.find(i => i.id === id)).filter(Boolean) as BusinessIdea[];
  const recommendedIdea = comparedIdeas.length > 0 ? [...comparedIdeas].sort((a, b) => (b.score || 0) - (a.score || 0))[0] : null;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn">
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
          <Scale className="w-6 h-6 text-amber-400" /> Side-by-Side Idea Comparison
        </h1>
        <p className="text-xs text-warm-400">Select 2 to 4 saved ideas to evaluate metrics and discover the top recommended startup venture</p>
      </div>

      {/* Select Box Bar */}
      <div className="p-4 rounded-2xl glass-card border border-warm-800 space-y-2">
        <span className="text-xs font-bold text-white">Select Ideas to Compare (2 - 4):</span>
        <div className="flex flex-wrap gap-2 pt-1">
          {ideas.map(item => {
            const isSel = selectedIds.includes(item.id);
            return (
              <button
                key={item.id}
                onClick={() => toggleSelect(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1.5 ${
                  isSel ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500' : 'bg-warm-950 text-warm-400 border-warm-800 hover:text-white'
                }`}
              >
                {isSel && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                <span>{item.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Top Winner Card */}
      {recommendedIdea && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/10 via-emerald-600/20 to-amber-500/10 border border-amber-500/30 space-y-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider">🏆 Top Recommended Venture</span>
          </div>
          <h3 className="text-xl font-extrabold text-white">{recommendedIdea.title}</h3>
          <p className="text-xs text-stone-300">
            "{recommendedIdea.title}" outperforms with an overall score of <span className="font-bold text-emerald-400">{recommendedIdea.score}/100</span> ({recommendedIdea.recommendation}). It offers superior market growth potential and manageable operational risk.
          </p>
        </div>
      )}

      {/* Comparison Table */}
      <div className="p-6 rounded-2xl glass-card border border-warm-800 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-warm-800 text-warm-400 uppercase font-semibold">
              <th className="pb-3 px-3">Metric</th>
              {comparedIdeas.map(item => (
                <th key={item.id} className="pb-3 px-3 text-white font-bold">{item.title}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-warm-800/60 text-stone-300">
            <tr>
              <td className="py-3 px-3 font-bold text-warm-400">Industry</td>
              {comparedIdeas.map(i => <td key={i.id} className="py-3 px-3">{i.industry}</td>)}
            </tr>
            <tr>
              <td className="py-3 px-3 font-bold text-warm-400">Overall Score</td>
              {comparedIdeas.map(i => (
                <td key={i.id} className="py-3 px-3 font-mono font-bold text-emerald-400 text-sm">{i.score}/100</td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-3 font-bold text-warm-400">AI Recommendation</td>
              {comparedIdeas.map(i => (
                <td key={i.id} className="py-3 px-3 font-bold text-emerald-400">{i.recommendation}</td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-3 font-bold text-warm-400">Market Potential</td>
              {comparedIdeas.map(i => <td key={i.id} className="py-3 px-3 font-mono">{i.analysisResult?.market_score || 85}/100</td>)}
            </tr>
            <tr>
              <td className="py-3 px-3 font-bold text-warm-400">Estimated Budget</td>
              {comparedIdeas.map(i => <td key={i.id} className="py-3 px-3">{i.budget || '$25,000'}</td>)}
            </tr>
            <tr>
              <td className="py-3 px-3 font-bold text-warm-400">5-Yr Revenue Projection</td>
              {comparedIdeas.map(i => (
                <td key={i.id} className="py-3 px-3 font-mono text-emerald-400 font-bold">
                  ${(i.analysisResult?.financials?.year_5_revenue || 3400000).toLocaleString()}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-3 font-bold text-warm-400">Startup Risk Level</td>
              {comparedIdeas.map(i => <td key={i.id} className="py-3 px-3 text-amber-400">{i.analysisResult?.risk_score || 38}/100 Risk</td>)}
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};
