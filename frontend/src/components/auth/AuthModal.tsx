import React, { useState } from 'react';
import { X, Sparkles, Mail, Lock, User as UserIcon, Globe, Briefcase } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, initialMode, onClose, onSuccess }) => {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [country, setCountry] = useState('United States');
  const [industry, setIndustry] = useState('AI & Machine Learning');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      if (mode === 'login') {
        await login(email || 'demo@ideaforge.ai', password || 'password123');
      } else if (mode === 'signup') {
        await register({ name, email, password, country, industry });
      } else {
        alert('Password reset instructions sent to your email.');
        setMode('login');
        setIsSubmitting(false);
        return;
      }
      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || 'Authentication error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-warm-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-2xl glass-card bg-warm-900 border border-warm-800 shadow-2xl space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg text-warm-400 hover:text-white hover:bg-warm-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">
            {mode === 'login' && 'Welcome Back to IdeaForge AI'}
            {mode === 'signup' && 'Create Your Founder Account'}
            {mode === 'forgot' && 'Reset Your Password'}
          </h3>
          <p className="text-xs text-warm-400">
            {mode === 'login' && 'Sign in to access your validated business reports'}
            {mode === 'signup' && 'Start validating business ideas with AI market intelligence'}
            {mode === 'forgot' && 'Enter your registered email to receive reset instructions'}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-400">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {mode === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-stone-300">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-warm-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-warm-950 border border-warm-800 text-xs text-white placeholder-warm-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-stone-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-warm-500 absolute left-3 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="founder@startup.com"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-warm-950 border border-warm-800 text-xs text-white placeholder-warm-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-stone-300">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] text-emerald-400 hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-warm-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-warm-950 border border-warm-800 text-xs text-white placeholder-warm-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-300">Country</label>
                <input
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-warm-950 border border-warm-800 text-xs text-white"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-stone-300">Industry</label>
                <select
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-warm-950 border border-warm-800 text-xs text-white"
                >
                  <option value="AI & Machine Learning">AI & Machine Learning</option>
                  <option value="SaaS">SaaS & Enterprise</option>
                  <option value="FinTech">FinTech</option>
                  <option value="AgriTech">AgriTech</option>
                  <option value="HealthTech">HealthTech</option>
                  <option value="E-commerce">E-commerce / D2C</option>
                </select>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {isSubmitting ? 'Processing...' : mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Instructions'}
          </button>
        </form>

        {/* Footer switch */}
        <div className="text-center text-xs text-warm-400 pt-2 border-t border-warm-800">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setMode('signup')} className="text-emerald-400 font-bold hover:underline">
                Sign Up Free
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button onClick={() => setMode('login')} className="text-emerald-400 font-bold hover:underline">
                Log In
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
};
