import React, { useState } from 'react';
import { X, Bot, Send, Sparkles, User as UserIcon } from 'lucide-react';
import { askCoachApi } from '../../services/api';
import { BusinessIdea } from '../../types';

interface AiCoachModalProps {
  isOpen: boolean;
  idea: BusinessIdea | null;
  onClose: () => void;
}

export const AiCoachModal: React.FC<AiCoachModalProps> = ({ isOpen, idea, onClose }) => {
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<{ sender: 'user' | 'coach'; text: string }[]>([
    {
      sender: 'coach',
      text: `Hello! I am your AI Business Coach. I've reviewed your business idea: "${idea?.title || 'Startup Concept'}". What specific strategic questions can I help answer today?`
    }
  ]);
  const [isAsking, setIsAsking] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || isAsking) return;

    const userText = question;
    setQuestion('');
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setIsAsking(true);

    try {
      const reply = await askCoachApi(idea?.id || 'demo', userText);
      setMessages(prev => [...prev, { sender: 'coach', text: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'coach', text: 'Focus on customer interviews and testing pricing before building full software features.' }]);
    } finally {
      setIsAsking(false);
    }
  };

  const quickPrompts = [
    "How can I reduce my startup cost?",
    "Who are my biggest potential competitors?",
    "How can I acquire my first 100 customers?",
    "What should my MVP contain?"
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg h-full glass-card bg-slate-900 border-l border-slate-800 flex flex-col justify-between p-6 space-y-4 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">AI Business Coach</h3>
              <p className="text-[11px] text-slate-400 truncate max-w-xs">{idea?.title || 'Idea Advisor'}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {messages.map((m, i) => (
            <div key={i} className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              {m.sender === 'coach' && (
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
              )}
              <div className={`p-3.5 rounded-2xl text-xs leading-relaxed max-w-xs sm:max-w-md ${
                m.sender === 'user' ? 'bg-indigo-600 text-white rounded-tr-none' : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none'
              }`}>
                {m.text}
              </div>
            </div>
          ))}

          {isAsking && (
            <div className="flex items-center gap-2 text-xs text-indigo-400">
              <Bot className="w-4 h-4 animate-spin" /> Thinking...
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="flex overflow-x-auto gap-2 py-1">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => setQuestion(qp)}
              className="px-2.5 py-1 rounded-full bg-slate-950 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-300 whitespace-nowrap"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="relative pt-2 border-t border-slate-800">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask your AI coach a question..."
            className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={isAsking || !question.trim()}
            className="absolute right-2 top-4 p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white disabled:opacity-50 transition-colors"
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
