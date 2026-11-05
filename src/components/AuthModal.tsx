import React, { useState } from 'react';
import { User, Lock, Mail, ShieldCheck, LogOut, CheckCircle2 } from 'lucide-react';
import { store, PRODUCT_CONFIGS } from '../services/store';
import confetti from 'canvas-confetti';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const currentUser = store.getCurrentUser();
  const [usernameInput, setUsernameInput] = useState(currentUser?.username || '');
  const [passwordInput, setPasswordInput] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;

    const res = store.loginOrRegister(usernameInput, passwordInput);
    if (res.success) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      setStatusMessage(
        res.isNewUser
          ? `Welcome! Account created and signed in as ${res.user.username}.`
          : `Welcome back, ${res.user.username}!`
      );
      setTimeout(() => {
        setStatusMessage(null);
        onClose();
      }, 900);
    }
  };

  const handleLogout = () => {
    store.logout();
    setStatusMessage('You have logged out.');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              <User className="w-4 h-4" />
            </span>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {currentUser ? 'User Account & Profile' : 'Sign In to Authority Studio AI'}
              </h3>
              <p className="text-[11px] text-slate-500">
                Frictionless single-step access. Login auto-registers new users.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {statusMessage && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Current User Info Card */}
        {currentUser && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Current User</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-100 text-blue-700">
                {PRODUCT_CONFIGS[currentUser.tier]?.name || currentUser.tier}
              </span>
            </div>
            <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              <span>{currentUser.username}</span>
            </div>
            <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60 flex items-center justify-between">
              <span>Unlocked Tiers: {currentUser.unlockedTiers.join(', ')}</span>
              {currentUser.hasNicheVaultBump && (
                <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded font-medium">Vault Bump Active</span>
              )}
            </div>
          </div>
        )}

        {/* Login / Switch Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Username or Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                required
                value={usernameInput}
                onChange={e => setUsernameInput(e.target.value)}
                placeholder="your.email@authoritystudio.com"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 bg-white"
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              No separate sign up required. Entering your email immediately registers or retrieves your workspace.
            </p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="password"
                value={passwordInput}
                onChange={e => setPasswordInput(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-slate-900 bg-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <button
              type="submit"
              className="flex-1 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{currentUser ? 'Switch / Save Profile' : 'Sign In / Register'}</span>
            </button>

            {currentUser && (
              <button
                type="button"
                onClick={handleLogout}
                className="px-3 py-2 text-xs font-semibold text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}
          </div>
        </form>

        <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
          <strong>WarriorPlus Seamless Identity:</strong> Your account secures your active property setups, customer leads, and customized content assets across browser sessions.
        </div>
      </div>
    </div>
  );
};
