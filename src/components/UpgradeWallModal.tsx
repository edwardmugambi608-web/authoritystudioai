import React from 'react';
import { 
  Sparkles, 
  ExternalLink, 
  Check, 
  Lock, 
  Radio,
  Layers,
  Building2,
  Cloud,
  MapPin,
  Calendar,
  Award
} from 'lucide-react';
import { ProductTier } from '../types/authority';
import { PRODUCT_CONFIGS, store } from '../services/store';

interface UpgradeWallModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetTier?: ProductTier;
  featureName?: string;
}

interface UpgradeItem {
  tier: ProductTier;
  name: string;
  badge: string;
  price: string;
  tagline: string;
  features: string[];
  defaultSalesUrl: string;
  icon: React.ElementType;
}

export const UpgradeWallModal: React.FC<UpgradeWallModalProps> = ({
  isOpen,
  onClose,
  targetTier,
  featureName
}) => {
  const currentPlan = store.getPlan();
  const currentPlanConfig = PRODUCT_CONFIGS[currentPlan] || PRODUCT_CONFIGS.CORE;

  if (!isOpen) return null;

  // Full catalog of official commercial upgrades (NEVER includes CORE / Front End)
  const allUpgrades: UpgradeItem[] = [
    {
      tier: 'EXTENDED',
      name: 'Business Builder (Extended OTO 1)',
      badge: '10 Niches • Live Domains',
      price: '$47',
      tagline: 'Expand from 5 to 10 niches with custom domains, live site publishing, and paid tool paywalls.',
      features: [
        '10 Profitable Niche Blueprints',
        'Custom Domain Mapping & Live Site Publishing',
        '600+ Prepared Authority Content Assets',
        '80 Interactive Micro-Tools & 110 Website Pages',
        'Paid Tool Paywall ($19 access) with Stripe/PayPal',
        '1-Click Authority Business Cloner'
      ],
      defaultSalesUrl: 'https://authority-studio.web.app/extended',
      icon: Radio
    },
    {
      tier: 'PRO',
      name: 'Expansion Studio Pro (OTO 2)',
      badge: '1-into-7 Traffic Engine',
      price: '$67',
      tagline: 'Automatically transform any authority article into 7 high-traffic distribution formats.',
      features: [
        '1-into-7 Content Repurposing Engine',
        'Article-to-PDF / eBook Guide Generator',
        'Social Media Multi-Post Suites (10 posts per article)',
        'Carousel Slides & Short-Video Script Generator',
        '30-Day Multi-Channel Launch Campaign Exporter',
        'Pinterest Viral Pin Title & Description Suite'
      ],
      defaultSalesUrl: 'https://authority-studio.web.app/pro',
      icon: Layers
    },
    {
      tier: 'ULTIMATE',
      name: 'Commercial Empire Ultimate (OTO 3)',
      badge: '24 Niches • Agency Rights',
      price: '$97',
      tagline: 'Unlock all 24 profitable niches, 1,800+ assets, 192 tools, and client agency delivery portals.',
      features: [
        'All 24 Profitable Niches Library Unlocked',
        '1,800+ Ready-to-Publish Articles & Guides',
        '192 Interactive AI Tools & 264 Pages',
        'Client Delivery Portals & Collaboration Review',
        'White-Label Agency Branding (Zero Authority Studio watermarks)',
        'Commercial Agency Reseller License Certificate'
      ],
      defaultSalesUrl: 'https://authority-studio.web.app/ultimate',
      icon: Building2
    }
  ];

  // Filter out the user's current plan AND any tier they already own!
  // The Upgrade Wall ONLY displays products the user does NOT have.
  const availableUpgrades = allUpgrades.filter(upgrade => {
    if (upgrade.tier === currentPlan) return false;
    return !store.hasAccessToTier(upgrade.tier);
  });

  // If a specific target tier was requested (e.g. user clicked a locked feature), pin it to top
  const sortedUpgrades = [...availableUpgrades].sort((a, b) => {
    if (targetTier && a.tier === targetTier) return -1;
    if (targetTier && b.tier === targetTier) return 1;
    return 0;
  });

  const isFullyUpgraded = sortedUpgrades.length === 0;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header: Clean, clear explanation */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 shrink-0">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </span>
            <div>
              <div className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider">
                Official Commercial Upgrades
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                Expand Your Authority Business
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Current active plan: <strong className="text-slate-800">{currentPlanConfig.name}</strong>. Choose an upgrade below to unlock higher tiers.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 text-sm font-bold flex items-center justify-center transition-colors shrink-0"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Locked Feature Notice (if opened from a specific locked tool/tab) */}
        {featureName && (
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-2xl text-xs text-amber-900 flex items-center gap-2.5">
            <Lock className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>{featureName}</strong> requires an upgraded edition. Review the available options below.
            </span>
          </div>
        )}

        {/* State A: User owns all available editions */}
        {isFullyUpgraded ? (
          <div className="p-8 text-center bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-base font-black text-emerald-950">
              All Upgrades Active &amp; Unlocked!
            </h3>
            <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
              Your account has full access to all 24 niches, 1,800+ assets, 192 interactive micro-tools, traffic repurposing, and commercial agency client licensing.
            </p>
          </div>
        ) : (
          /* State B: Display ONLY unpurchased upgrades in a clear, clean grid */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Available Upgrades &amp; OTO Editions ({sortedUpgrades.length})
              </h3>
              <span className="text-[10px] font-mono text-slate-400">
                Direct Official Sales Pages
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedUpgrades.map(upgrade => {
                const Icon = upgrade.icon;
                const isTarget = targetTier === upgrade.tier;
                const salesUrl = store.getSalesUrl(upgrade.tier) || upgrade.defaultSalesUrl;

                return (
                  <div 
                    key={upgrade.tier}
                    className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 ${
                      isTarget 
                        ? 'bg-blue-50/50 border-blue-400 ring-2 ring-blue-500/20 shadow-md' 
                        : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div className="space-y-3">
                      
                      {/* Card Title & Pricing */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 shrink-0">
                            <Icon className="w-4 h-4 text-slate-700" />
                          </span>
                          <div>
                            <h4 className="text-xs font-black text-slate-900 leading-tight">
                              {upgrade.name}
                            </h4>
                            <div className="text-[10px] font-mono text-blue-600 font-bold mt-0.5">
                              {upgrade.price} <span className="text-slate-400 font-normal">one-time</span>
                            </div>
                          </div>
                        </div>

                        {isTarget && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-600 text-white font-bold shrink-0">
                            Recommended
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-slate-600 leading-relaxed">
                        {upgrade.tagline}
                      </p>

                      {/* Deliverables Checklist */}
                      <div className="space-y-1.5 pt-1 border-t border-slate-100">
                        {upgrade.features.slice(0, 4).map((feat, i) => (
                          <div key={i} className="text-[11px] text-slate-600 flex items-start gap-1.5">
                            <Check className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                            <span className="leading-tight">{feat}</span>
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* Dedicated Order Page Link Button */}
                    <div className="pt-2 border-t border-slate-100">
                      <a
                        href={salesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-slate-950 hover:bg-slate-800 text-white shadow-xs transition-all flex items-center justify-center gap-1.5 text-center"
                      >
                        <span>Upgrade ({upgrade.price})</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
