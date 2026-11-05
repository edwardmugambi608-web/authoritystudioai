import React, { useState } from 'react';
import { 
  User, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';
import { store } from '../services/store';
import confetti from 'canvas-confetti';

interface LoginPageProps {
  onLoginSuccess: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const username = usernameInput.trim();
    if (!username) {
      setErrorMessage('Please enter your username.');
      return;
    }

    if (passwordInput.length < 4) {
      setErrorMessage('Password must be at least 4 characters.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = store.loginOrRegister(username, passwordInput);
      setIsLoading(false);

      if (res.success) {
        confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
        setSuccessMessage(
          res.isNewUser
            ? `Welcome to Authority Studio AI, ${res.user.username}!`
            : `Welcome back, ${res.user.username}!`
        );
        setTimeout(() => {
          onLoginSuccess();
        }, 450);
      } else {
        setErrorMessage(res.error || 'Invalid credentials. Please try again.');
      }
    }, 250);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100/70 via-sky-50 to-white text-slate-900 flex flex-col items-center justify-center p-4 sm:p-6 font-sans antialiased selection:bg-blue-600 selection:text-white relative overflow-hidden">
      
      {/* Soft Ambient Radial Blur */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-6 text-center">
        
        {/* Brand Header with Stylized Emblem & Custom Logo Wordmark */}
        <div className="space-y-3 flex flex-col items-center">
          <img 
            src="/logo-icon.png" 
            alt="Authority Studio AI Emblem" 
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain mx-auto drop-shadow-md" 
          />
          <img 
            src="/logo-text.png" 
            alt="Authority Studio AI" 
            className="h-8 sm:h-9 w-auto object-contain drop-shadow-xs" 
          />
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Pick a Niche. Own an Authority Business.
          </p>
        </div>

        {/* Clean Centered White Card */}
        <div className="bg-white/95 border border-blue-100/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-900/5 backdrop-blur-xl text-left space-y-5">
          
          {/* Error / Success Notifications */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <span className="font-bold text-rose-500">&times;</span>
              <span>{errorMessage}</span>
            </div>
          )}
          {successMessage && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Form: Username and Password Only */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full pl-9 pr-3.5 py-2.5 text-xs font-medium rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-10 py-2.5 text-xs font-medium rounded-xl bg-slate-50/80 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <span>{isLoading ? 'Accessing Studio...' : 'Access Studio'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

        </div>

        {/* Footer */}
        <p className="text-[11px] text-slate-400">
          &copy; {new Date().getFullYear()} Authority Studio AI. All rights reserved.
        </p>

      </div>
    </div>
  );
};
