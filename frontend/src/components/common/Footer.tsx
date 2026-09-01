import React from 'react';
import { Sparkles, Shield, Cpu, Zap, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-warm-950 border-t border-warm-900 pt-12 pb-8 text-warm-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-warm-900">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-bold text-lg text-white">IdeaForge AI</span>
            </div>
            <p className="text-xs leading-relaxed text-warm-400">
              The AI Business Idea Validation Platform helping entrepreneurs make data-driven decisions on market feasibility, competition, unit economics, and growth risk.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="https://github.com/MarriNagaLakshmi/Bussiness-validation" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-warm-900 hover:bg-warm-800 text-stone-300 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-warm-900 hover:bg-warm-800 text-stone-300 hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-warm-900 hover:bg-warm-800 text-stone-300 hover:text-white transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Features */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">Validation Engine</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">AI TAM/SAM/SOM Calculator</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Competitor Intelligence Grid</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">5-Year Unit Financial Model</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">2x2 SWOT & Risk Matrix</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">MVP Prioritization & Roadmap</a></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">Entrepreneur Tools</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Brand Name Generator</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Pitch Deck Generator</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">AI Business Coach</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Customer Validation Questions</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">PDF Executive Reports</a></li>
            </ul>
          </div>

          {/* Col 4: AI & Deployment Badges */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-200">Production Infrastructure</h4>
            <div className="space-y-2">
              <div className="p-2.5 rounded-lg bg-warm-900/80 border border-warm-800 text-[11px] flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-stone-300">
                  <Cpu className="w-3.5 h-3.5 text-emerald-400" /> Multi-LLM Layer
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">Gemini / GPT-4o</span>
              </div>
              <div className="p-2.5 rounded-lg bg-warm-900/80 border border-warm-800 text-[11px] flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-stone-300">
                  <Zap className="w-3.5 h-3.5 text-amber-400" /> Vercel Serverless
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">24/7 Live</span>
              </div>
              <div className="p-2.5 rounded-lg bg-warm-900/80 border border-warm-800 text-[11px] flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-stone-300">
                  <Shield className="w-3.5 h-3.5 text-stone-400" /> GitHub Repository
                </span>
                <span className="text-[10px] text-warm-400 font-mono">v1.0.0</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-warm-500">
          <p>© 2026 IdeaForge AI Platform. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 text-[11px]">
            ⚠️ AI-generated market estimates & financial projections contain inherent model uncertainty and are intended for validation guidance.
          </p>
        </div>
      </div>
    </footer>
  );
};
