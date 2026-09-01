import React, { useState } from 'react';
import { 
  Sparkles, 
  BarChart3, 
  PlusCircle, 
  Compass, 
  ShieldCheck, 
  Globe, 
  Sun, 
  Moon, 
  LogOut, 
  Bell, 
  Check, 
  Scale
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { LanguageCode } from '../../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAuthModal: (mode: 'login' | 'signup') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, openAuthModal }) => {
  const { user, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const languages: { code: LanguageCode; label: string }[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'te', label: 'తెలుగు (Telugu)' },
    { code: 'ta', label: 'தமிழ் (Tamil)' },
    { code: 'kn', label: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ml', label: 'മലയാളം (Malayalam)' }
  ];

  return (
    <header className="sticky top-0 z-50 glass-card bg-warm-950/90 border-b border-warm-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('landing')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-amber-600 p-0.5 shadow-md shadow-emerald-900/30 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-warm-950 rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-xl tracking-tight text-stone-100 flex items-center gap-1.5">
              IdeaForge <span className="px-1.5 py-0.5 rounded text-[10px] uppercase tracking-wider bg-emerald-500/15 text-emerald-300 font-sans border border-emerald-500/30">AI</span>
            </span>
            <span className="text-[10px] text-warm-400 font-medium tracking-wide -mt-1">Business Idea Validation</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {isAuthenticated && (
            <>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'dashboard' ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40' : 'text-stone-300 hover:text-white hover:bg-warm-800/50'
                }`}
              >
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                {t('dashboard')}
              </button>

              <button
                onClick={() => setActiveTab('create')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'create' ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40' : 'text-stone-300 hover:text-white hover:bg-warm-800/50'
                }`}
              >
                <PlusCircle className="w-4 h-4 text-amber-500" />
                {t('newAnalysis')}
              </button>

              <button
                onClick={() => setActiveTab('compare')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activeTab === 'compare' ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40' : 'text-stone-300 hover:text-white hover:bg-warm-800/50'
                }`}
              >
                <Scale className="w-4 h-4 text-stone-400" />
                {t('compareIdeas')}
              </button>
            </>
          )}

          <button
            onClick={() => setActiveTab('explore')}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'explore' ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40' : 'text-stone-300 hover:text-white hover:bg-warm-800/50'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            {t('exploreIdeas')}
          </button>

          {isAuthenticated && (
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                activeTab === 'admin' ? 'bg-emerald-600/20 text-emerald-300 border border-emerald-500/40' : 'text-stone-300 hover:text-white hover:bg-warm-800/50'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              {t('adminPanel')}
            </button>
          )}
        </nav>

        {/* Right Tools */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="p-2 rounded-xl text-warm-400 hover:text-white hover:bg-warm-800/60 transition-colors flex items-center gap-1 text-xs"
              title="Select Language"
            >
              <Globe className="w-4 h-4 text-emerald-400" />
              <span className="uppercase font-semibold text-[11px] text-stone-300">{language}</span>
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-xl glass-card bg-warm-900 border border-warm-800 shadow-2xl py-1 z-50">
                {languages.map(l => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setLangDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs text-stone-300 hover:bg-emerald-600/20 hover:text-white flex items-center justify-between"
                  >
                    <span>{l.label}</span>
                    {language === l.code && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-warm-400 hover:text-white hover:bg-warm-800/60 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-500" />}
          </button>

          {/* User Auth Buttons or Profile Dropdown */}
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-warm-800/60 transition-colors border border-warm-800"
              >
                <img
                  src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150'}
                  alt={user?.name}
                  className="w-7 h-7 rounded-lg object-cover ring-2 ring-emerald-500/40"
                />
                <span className="hidden sm:inline-block text-xs font-semibold text-stone-200">{user?.name}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {user?.subscriptionTier || 'PRO'}
                </span>
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl glass-card bg-warm-900 border border-warm-800 shadow-2xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-warm-800">
                    <p className="text-xs font-bold text-white">{user?.name}</p>
                    <p className="text-[11px] text-warm-400 truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab('dashboard');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-stone-300 hover:bg-warm-800/80 flex items-center gap-2"
                  >
                    <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                    My Dashboard
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setProfileDropdownOpen(false);
                      setActiveTab('landing');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 mt-1 border-t border-warm-800/60"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-400" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => openAuthModal('login')}
                className="px-3.5 py-2 text-xs font-semibold text-stone-300 hover:text-white transition-colors"
              >
                {t('login')}
              </button>
              <button
                onClick={() => openAuthModal('signup')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-900/30 transition-all hover:scale-105"
              >
                {t('signup')}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
