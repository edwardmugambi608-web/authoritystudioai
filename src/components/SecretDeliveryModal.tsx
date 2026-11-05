import React from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Radio, 
  Building2, 
  Zap,
  Vault
} from 'lucide-react';
import { ProductTier } from '../types/authority';
import { PRODUCT_CONFIGS } from '../services/store';

interface SecretDeliveryModalProps {
  isOpen: boolean;
  onClose: () => void;
  unlockedTier: ProductTier | string | null;
  onNavigateToTab: (tab: string) => void;
  onOpenUpgradeWall: (tier: ProductTier, featureName?: string) => void;
  onOpenTrafficVault?: () => void;
}

export const SecretDeliveryModal: React.FC<SecretDeliveryModalProps> = ({
  isOpen,
  onClose,
  unlockedTier,
  onNavigateToTab,
  onOpenUpgradeWall,
  onOpenTrafficVault
}) => {
  if (!isOpen || !unlockedTier) return null;

  const isTrafficVault = unlockedTier === 'TRAFFIC_VAULT' || unlockedTier === 'auth_traffic_vault_secret';
  const tierConfig = (!isTrafficVault && unlockedTier in PRODUCT_CONFIGS) 
    ? PRODUCT_CONFIGS[unlockedTier as ProductTier] 
    : null;

  const title = isTrafficVault 
    ? '24-Hour Fast-Traffic & Brand Sponsorship Vault'
    : tierConfig?.name || unlockedTier;

  const description = isTrafficVault
    ? 'Your $14.05 FE Order Bump has been permanently unlocked! You now have lifetime access to 50 organic traffic swipes, 10 affiliate email broadcasts, rate cards, and the 24-hour syndication checklist.'
    : tierConfig?.tagline || 'Your product tier has been cryptographically verified and permanently activated on your account.';

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-150">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20">
          {isTrafficVault ? <Vault className="w-8 h-8" /> : <Sparkles className="w-8 h-8 text-amber-200" />}
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            WarriorPlus Instant Delivery Verified
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {title} Unlocked!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-md mx-auto">
            {description}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-left text-xs">
          <div className="font-bold text-slate-800 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Permanent Lifetime Access Applied</span>
          </div>
          <p className="text-slate-500 leading-relaxed text-[11px]">
            Your access key has been validated. You can access your unlocked deliverables anytime from your dashboard or account menu.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {isTrafficVault ? (
            <button
              onClick={() => {
                onClose();
                if (onOpenTrafficVault) onOpenTrafficVault();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
            >
              <span>Open Traffic & Sponsorship Vault</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                onNavigateToTab('dashboard');
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Access Your Authority Studio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
