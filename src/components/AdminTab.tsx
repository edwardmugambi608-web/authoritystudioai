import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ExternalLink, 
  Copy, 
  Check, 
  Sparkles, 
  Key, 
  Radio, 
  Layers, 
  Building2, 
  Cloud, 
  MapPin, 
  Calendar, 
  RefreshCw, 
  Sliders, 
  ShieldCheck, 
  Edit2, 
  Save, 
  X,
  Zap,
  Globe,
  Vault,
  Server,
  Lock,
  ArrowRight
} from 'lucide-react';
import { store, PRODUCT_CONFIGS } from '../services/store';
import { ProductTier } from '../types/authority';
import confetti from 'canvas-confetti';

interface AdminTabProps {
  onOpenAuditModal: () => void;
  onSelectSuite: (suite: ProductTier) => void;
}

interface FunnelItem {
  tier: ProductTier | 'TRAFFIC_VAULT';
  label: string;
  badge: string;
  price: string;
  accessCode: string;
  defaultSalesUrl: string;
  icon: React.ElementType;
}

export const AdminTab: React.FC<AdminTabProps> = ({
  onOpenAuditModal,
  onSelectSuite
}) => {
  const currentPlan = store.getPlan();
  const currentUser = store.getCurrentUser();
  const hasTrafficVault = store.hasTrafficVaultBump();
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [editingTier, setEditingTier] = useState<ProductTier | string | null>(null);
  const [editUrlInput, setEditUrlInput] = useState('');

  // Delivery URL editing state in table
  const [editingDeliveryTier, setEditingDeliveryTier] = useState<ProductTier | string | null>(null);
  const [editDeliveryInput, setEditDeliveryInput] = useState('');

  // Dedicated Bump Card editing state
  const [isEditingBumpSales, setIsEditingBumpSales] = useState(false);
  const [bumpSalesInput, setBumpSalesInput] = useState('');
  const [isEditingBumpDelivery, setIsEditingBumpDelivery] = useState(false);
  const [bumpDeliveryInput, setBumpDeliveryInput] = useState('');

  // Base App Domain setting (e.g. Render app or custom domain)
  const [baseAppUrlInput, setBaseAppUrlInput] = useState(store.getBaseAppUrl());
  const [isEditingBaseUrl, setIsEditingBaseUrl] = useState(false);
  const [baseUrlSavedToast, setBaseUrlSavedToast] = useState(false);

  const isVipUnlocked = currentPlan === 'ULTIMATE' && hasTrafficVault;

  const funnelItems: FunnelItem[] = [
    {
      tier: 'CORE',
      label: 'Authority Studio AI (Front End)',
      badge: 'FE • 5 Niches',
      price: '$4.95',
      accessCode: 'core',
      defaultSalesUrl: 'https://authority-studio.web.app',
      icon: Zap
    },
    {
      tier: 'TRAFFIC_VAULT',
      label: 'FE Order Bump: 24-Hour Fast-Traffic & Brand Sponsorship Vault',
      badge: 'FE Bump • $14.05 Upgrade',
      price: '$14.05',
      accessCode: 'traffic-vault',
      defaultSalesUrl: 'https://authority-studio.web.app/traffic-vault',
      icon: Vault
    },
    {
      tier: 'EXTENDED',
      label: 'Business Builder (OTO 1)',
      badge: 'OTO 1 • 10 Niches',
      price: '$47',
      accessCode: 'builder',
      defaultSalesUrl: 'https://authority-studio.web.app/extended',
      icon: Radio
    },
    {
      tier: 'PRO',
      label: 'Expansion Studio Pro (OTO 2)',
      badge: 'OTO 2 • 10 Niches',
      price: '$67',
      accessCode: 'pro',
      defaultSalesUrl: 'https://authority-studio.web.app/pro',
      icon: Layers
    },
    {
      tier: 'ULTIMATE',
      label: 'Commercial Empire Ultimate (OTO 3)',
      badge: 'OTO 3 • 24 Niches • Agency',
      price: '$97',
      accessCode: 'agency',
      defaultSalesUrl: 'https://authority-studio.web.app/ultimate',
      icon: Building2
    }
  ];

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(id);
    confetti({ particleCount: 30, spread: 45 });
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleStartEdit = (item: FunnelItem) => {
    setEditingTier(item.tier);
    setEditUrlInput(store.getSalesUrl(item.tier) || item.defaultSalesUrl);
  };

  const handleSaveEdit = (tier: ProductTier | string) => {
    if (editUrlInput.trim()) {
      store.setSalesUrl(tier, editUrlInput.trim());
    }
    setEditingTier(null);
  };

  const handleStartDeliveryEdit = (item: FunnelItem) => {
    setEditingDeliveryTier(item.tier);
    setEditDeliveryInput(store.getDeliveryUrl(item.tier));
  };

  const handleSaveDeliveryEdit = (tier: ProductTier | string) => {
    if (editDeliveryInput.trim()) {
      store.setDeliveryUrl(tier, editDeliveryInput.trim());
    }
    setEditingDeliveryTier(null);
  };

  // Dedicated Bump editing handlers
  const handleStartBumpSalesEdit = () => {
    setBumpSalesInput(store.getSalesUrl('TRAFFIC_VAULT') || 'https://authority-studio.web.app/traffic-vault');
    setIsEditingBumpSales(true);
  };

  const handleSaveBumpSalesEdit = () => {
    if (bumpSalesInput.trim()) {
      store.setSalesUrl('TRAFFIC_VAULT', bumpSalesInput.trim());
      confetti({ particleCount: 30, spread: 45 });
    }
    setIsEditingBumpSales(false);
  };

  const handleStartBumpDeliveryEdit = () => {
    setBumpDeliveryInput(store.getDeliveryUrl('TRAFFIC_VAULT'));
    setIsEditingBumpDelivery(true);
  };

  const handleSaveBumpDeliveryEdit = () => {
    if (bumpDeliveryInput.trim()) {
      store.setDeliveryUrl('TRAFFIC_VAULT', bumpDeliveryInput.trim());
      confetti({ particleCount: 30, spread: 45 });
    }
    setIsEditingBumpDelivery(false);
  };

  const handleSaveBaseAppUrl = () => {
    if (baseAppUrlInput.trim()) {
      store.setBaseAppUrl(baseAppUrlInput.trim());
      setIsEditingBaseUrl(false);
      setBaseUrlSavedToast(true);
      confetti({ particleCount: 40, spread: 50 });
      setTimeout(() => setBaseUrlSavedToast(false), 2500);
    }
  };

  const handleResetBaseAppUrlToOrigin = () => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      setBaseAppUrlInput(origin);
      store.setBaseAppUrl(origin);
      setIsEditingBaseUrl(false);
    }
  };

  const handleTestDelivery = (codeOrKey: string) => {
    const res = store.unlockBySecretKey(codeOrKey);
    if (res.success) {
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-in fade-in duration-150 pb-12">
      
      {/* Top Banner: Admin Header */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono text-xs font-bold tracking-wide">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>WarriorPlus Launch Command Center</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-display">
              Funnel Hosting &amp; Delivery Matrix
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Configure your Render app URL, edit dedicated Firebase sales page links, copy 1-click WarriorPlus delivery URLs, and toggle free VIP access for your founder account.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                if (isVipUnlocked) {
                  store.adminResetToCore();
                  onSelectSuite('CORE');
                } else {
                  store.adminUnlockAllTiers();
                  onSelectSuite('ULTIMATE');
                  confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
                }
              }}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all flex items-center gap-2 ${
                isVipUnlocked
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-400/40 ring-2 ring-emerald-400/20'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>{isVipUnlocked ? '✓ Admin VIP Mode Active (All Unlocked)' : 'Activate Founder VIP (Unlock All Free)'}</span>
            </button>

            <button
              onClick={() => {
                store.adminResetToCore();
                onSelectSuite('CORE');
              }}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-all flex items-center gap-2"
              title="Switch to standard Front-End buyer view"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
              <span>Switch to FE View</span>
            </button>
          </div>
        </div>
      </div>

      {/* Global App Domain Setting Card (Render / Custom Domain) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
              <Server className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
                <span>App Hosting Domain (Render / Custom Domain)</span>
                <span className="text-[10px] font-mono font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full border border-indigo-200/60">
                  Global Setting
                </span>
              </h2>
              <p className="text-xs text-slate-500">
                Where Authority Studio is deployed (e.g. Render, Railway, or custom domain). All WarriorPlus delivery URLs update dynamically.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isEditingBaseUrl ? (
              <button
                onClick={() => {
                  setBaseAppUrlInput(store.getBaseAppUrl());
                  setIsEditingBaseUrl(true);
                }}
                className="px-3 py-1.5 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Base URL</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={handleSaveBaseAppUrl}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center gap-1.5 shadow-2xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Domain</span>
                </button>
                <button
                  onClick={() => setIsEditingBaseUrl(false)}
                  className="px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {isEditingBaseUrl ? (
          <div className="space-y-2 pt-1">
            <label className="block text-xs font-bold text-slate-700">
              Enter your live Render app URL or custom domain:
            </label>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="url"
                value={baseAppUrlInput}
                onChange={e => setBaseAppUrlInput(e.target.value)}
                placeholder="https://authority-app.onrender.com"
                className="w-full px-3 py-2 text-xs font-mono border border-blue-400 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white"
                autoFocus
              />
              <button
                onClick={handleResetBaseAppUrlToOrigin}
                type="button"
                className="w-full sm:w-auto px-3 py-2 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors whitespace-nowrap"
              >
                Use Current Browser Domain
              </button>
            </div>
            <p className="text-[11px] text-slate-400 font-mono">
              Example: https://authority-app.onrender.com or https://app.authoritystudio.com (no trailing slash)
            </p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold text-slate-600">Active Delivery Base:</span>
              <strong className="font-mono text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                {store.getBaseAppUrl()}
              </strong>
            </div>
            {baseUrlSavedToast && (
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 animate-in fade-in">
                ✓ Base Domain Saved &amp; Links Updated!
              </span>
            )}
          </div>
        )}
      </div>

      {/* Admin Plan View Switcher & Bump Quick Toggle Strip */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2 font-display">
              <Sliders className="w-4 h-4 text-blue-600" />
              <span>Customer Account Tier View</span>
            </h2>
            <p className="text-xs text-slate-500">
              Switch active view to experience what a customer on each specific tier sees inside the app:
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-slate-500">
            Current Active View: <span className="text-blue-600 uppercase font-black">{currentPlan}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {funnelItems.filter(item => item.tier !== 'TRAFFIC_VAULT').map(item => {
            const isActive = currentPlan === item.tier;
            const isUnlocked = store.hasAccessToTier(item.tier as ProductTier);
            const Icon = item.icon;

            return (
              <button
                key={item.tier}
                onClick={() => {
                  store.setPlan(item.tier as ProductTier);
                  if (item.tier === 'CORE' || item.tier === 'EXTENDED' || item.tier === 'PRO' || item.tier === 'ULTIMATE') {
                    onSelectSuite(item.tier as ProductTier);
                  }
                }}
                className={`flex flex-col items-start p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-50 border-blue-500 ring-2 ring-blue-500/20 text-blue-900'
                    : isUnlocked
                    ? 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-800'
                    : 'bg-white border-dashed border-slate-200 hover:border-slate-300 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {isActive && <Check className="w-3.5 h-3.5 text-blue-600" />}
                </div>
                <div className="text-xs font-bold truncate w-full">{item.label}</div>
                <div className="text-[10px] text-slate-500">{item.price}</div>
              </button>
            );
          })}
        </div>

        {/* FE Order Bump Quick Toggle Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 rounded-xl border bg-slate-50 border-slate-200 gap-3 text-xs">
          <div className="flex items-center gap-2.5">
            <Vault className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900">FE Order Bump ($14.05): Traffic &amp; Sponsorship Vault</span>
                <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-800 px-2 py-0.2 rounded">
                  Cart Total $19.00
                </span>
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Current State: {hasTrafficVault ? <strong className="text-emerald-700 font-bold">✓ Unlocked &amp; Accessible</strong> : <span className="text-amber-700 font-semibold">🔒 Locked Behind Paywall (Non-Buyer State)</span>}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              if (hasTrafficVault) {
                if (currentUser) {
                  currentUser.hasTrafficVaultBump = false;
                  localStorage.setItem('auth_studio_active_user', JSON.stringify(currentUser));
                  store.unlockBump('traffic_vault');
                  currentUser.hasTrafficVaultBump = false;
                  localStorage.setItem('auth_studio_active_user', JSON.stringify(currentUser));
                }
              } else {
                store.unlockBump('traffic_vault');
                confetti({ particleCount: 70, spread: 60 });
              }
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              hasTrafficVault 
                ? 'bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200' 
                : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xs'
            }`}
          >
            {hasTrafficVault ? 'Set Bump to Locked State' : 'Activate Bump Access ($14.05)'}
          </button>
        </div>
      </div>

      {/* HIGHLIGHTED DEDICATED CARD: WARRIORPLUS FE ORDER BUMP ($14.05) SETUP */}
      <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-emerald-950/20 border-2 border-emerald-500/40 relative overflow-hidden space-y-6">
        <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5 relative z-10">
          <div className="flex items-center gap-3">
            <span className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 flex items-center justify-center font-bold shadow-inner shrink-0">
              <Vault className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/30 text-emerald-200 border border-emerald-400/40">
                  Required for WarriorPlus FE Setup
                </span>
                <span className="text-[10px] font-mono font-bold bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                  $14.05 Order Bump &bull; $19.00 Cart Total
                </span>
              </div>
              <h2 className="text-base sm:text-xl font-black text-white font-display mt-1">
                FE Order Bump: 24-Hour Fast-Traffic &amp; Brand Sponsorship Vault
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleTestDelivery('traffic-vault')}
              className="px-4 py-2 text-xs font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-md"
              title="Open instant unlock in browser"
            >
              <Zap className="w-4 h-4 text-slate-950" />
              <span>1-Click Bump Instant Access</span>
            </button>
          </div>
        </div>

        {/* URLs Side-by-Side with Monospace boxes & Editable Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          
          {/* Box 1: Sales Page web.app link (Editable) */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 uppercase font-mono tracking-wider">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>1. Bump Web Page URL (Sales Pitch)</span>
              </span>
              
              <div className="flex items-center gap-1.5">
                {!isEditingBumpSales ? (
                  <>
                    <button
                      onClick={handleStartBumpSalesEdit}
                      className="text-[11px] font-bold text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3 text-emerald-300" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => copyToClipboard(store.getSalesUrl('TRAFFIC_VAULT') || 'https://authority-studio.web.app/traffic-vault', 'bump-sales')}
                      className="text-[11px] font-bold text-slate-900 bg-white hover:bg-emerald-50 px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {copiedUrl === 'bump-sales' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedUrl === 'bump-sales' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleSaveBumpSalesEdit}
                      className="text-[11px] font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-3 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                    >
                      <Save className="w-3 h-3" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => setIsEditingBumpSales(false)}
                      className="text-[11px] font-bold text-slate-300 hover:text-white bg-white/10 px-2 py-1 rounded-lg transition-all cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {isEditingBumpSales ? (
              <div className="space-y-1.5">
                <input
                  type="url"
                  value={bumpSalesInput}
                  onChange={e => setBumpSalesInput(e.target.value)}
                  placeholder="https://authority-studio.web.app/traffic-vault"
                  className="w-full px-3 py-2 text-xs font-mono bg-slate-950 border border-emerald-400 rounded-xl text-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  autoFocus
                />
                <p className="text-[10px] text-emerald-200/70 font-mono">
                  Custom sales page pitch URL for your order bump product.
                </p>
              </div>
            ) : (
              <div className="bg-slate-950/80 border border-white/10 rounded-xl p-3 flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-emerald-200 truncate select-all">
                  {store.getSalesUrl('TRAFFIC_VAULT') || 'https://authority-studio.web.app/traffic-vault'}
                </span>
                <a
                  href={store.getSalesUrl('TRAFFIC_VAULT') || 'https://authority-studio.web.app/traffic-vault'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-emerald-400 hover:text-white transition-colors shrink-0"
                  title="Open sales page in new tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            <p className="text-[11px] text-slate-300 leading-relaxed">
              👉 Paste into WarriorPlus &gt; Bump Product &gt; <strong>&ldquo;Sales Page URL&rdquo;</strong> field.
            </p>
          </div>

          {/* Box 2: Delivery URL (Editable) */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5 uppercase font-mono tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>2. Bump Delivery URL (Access Link)</span>
              </span>

              <div className="flex items-center gap-1.5">
                {!isEditingBumpDelivery ? (
                  <>
                    <button
                      onClick={handleStartBumpDeliveryEdit}
                      className="text-[11px] font-bold text-slate-200 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Edit2 className="w-3 h-3 text-emerald-300" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => copyToClipboard(store.getDeliveryUrl('TRAFFIC_VAULT'), 'bump-delivery')}
                      className="text-[11px] font-bold text-slate-900 bg-emerald-400 hover:bg-emerald-300 px-3 py-1 rounded-lg transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                    >
                      {copiedUrl === 'bump-delivery' ? <Check className="w-3.5 h-3.5 text-emerald-800" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedUrl === 'bump-delivery' ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={handleSaveBumpDeliveryEdit}
                      className="text-[11px] font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 px-3 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer shadow-xs"
                    >
                      <Save className="w-3 h-3" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => setIsEditingBumpDelivery(false)}
                      className="text-[11px] font-bold text-slate-300 hover:text-white bg-white/10 px-2 py-1 rounded-lg transition-all cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {isEditingBumpDelivery ? (
              <div className="space-y-1.5">
                <input
                  type="url"
                  value={bumpDeliveryInput}
                  onChange={e => setBumpDeliveryInput(e.target.value)}
                  placeholder={store.getBaseAppUrl() + '/?access=traffic-vault'}
                  className="w-full px-3 py-2 text-xs font-mono bg-slate-950 border border-emerald-400 rounded-xl text-emerald-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  autoFocus
                />
                <p className="text-[10px] text-emerald-200/70 font-mono">
                  Custom instant-delivery access URL for your order bump buyers.
                </p>
              </div>
            ) : (
              <div className="bg-slate-950/80 border border-white/10 rounded-xl p-3 flex items-center justify-between gap-2">
                <span className="font-mono text-xs text-emerald-300 truncate select-all font-semibold">
                  {store.getDeliveryUrl('TRAFFIC_VAULT')}
                </span>
                <a
                  href={store.getDeliveryUrl('TRAFFIC_VAULT')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-emerald-400 hover:text-white transition-colors shrink-0"
                  title="Open delivery link in browser"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            )}

            <p className="text-[11px] text-slate-300 leading-relaxed">
              👉 Paste into WarriorPlus &gt; Bump Product &gt; <strong>&ldquo;Delivery Page / URL&rdquo;</strong> field.
            </p>
          </div>

        </div>

        {/* Step-by-Step WarriorPlus Order Bump Setup Instructions */}
        <div className="p-4 rounded-2xl bg-black/30 border border-white/10 text-xs text-slate-200 space-y-2 relative z-10">
          <div className="font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>How to Configure this Order Bump inside WarriorPlus (3-Step Checklist):</span>
          </div>
          <ol className="list-decimal list-inside space-y-1 text-slate-300 pl-1 text-[11.5px] leading-relaxed">
            <li>In <strong>WarriorPlus &gt; Vendors &gt; Products</strong>, create a new product named <em>&ldquo;Authority Studio AI - Traffic &amp; Sponsorship Vault&rdquo;</em> set to <strong>$14.05</strong>.</li>
            <li>Paste the <strong>Bump Web Page URL</strong> above into &ldquo;Sales Page&rdquo; and the <strong>Bump Delivery URL</strong> into &ldquo;Delivery Page / URL&rdquo;.</li>
            <li>Open your Main Front-End Product ($4.95), scroll down to <strong>Order Bump</strong>, toggle it <strong>ON</strong>, and select this product. WarriorPlus will automatically show the checkbox on checkout totaling <strong>$19.00</strong> and deliver instant access upon payment!</li>
          </ol>
        </div>

      </div>

      {/* WarriorPlus Delivery Matrix Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2 font-display">
              <Globe className="w-4 h-4 text-emerald-600" />
              <span>WarriorPlus Products, Sales Pages &amp; 1-Click Delivery Links</span>
            </h2>
            <p className="text-xs text-slate-500">
              Paste these exact URLs into your WarriorPlus product dashboard. When customers click &ldquo;Access Purchase&rdquo; on WarriorPlus, they land on your delivery link and unlock instantly.
            </p>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          {funnelItems.map(item => {
            const Icon = item.icon;
            const salesUrl = store.getSalesUrl(item.tier) || item.defaultSalesUrl;
            const deliveryUrl = store.getDeliveryUrl(item.tier);
            const isEditing = editingTier === item.tier;
            const isCopied = copiedUrl === item.tier;
            const isBump = item.tier === 'TRAFFIC_VAULT';

            return (
              <div 
                key={item.tier} 
                className={`p-5 transition-colors space-y-4 ${
                  isBump ? 'bg-emerald-50/50 border-l-4 border-l-emerald-500' : 'hover:bg-slate-50/50'
                }`}
              >
                
                {/* Product Title Strip */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center font-bold">
                      <Icon className="w-4 h-4 text-slate-700" />
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{item.label}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200/60">
                          {item.badge}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        Launch Price: <strong className="text-slate-800">{item.price}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleTestDelivery(item.accessCode)}
                      className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                      title="Open instant link unlock in browser"
                    >
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Instant 1-Click Access</span>
                    </button>
                  </div>
                </div>

                {/* Grid: Column 1 Sales Page (.web.app on Firebase) + Column 2 WarriorPlus Delivery URL (Render / Live Domain) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                  
                  {/* Column 1: Dedicated Sales Page (Firebase Hosting) */}
                  <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                      <span className="flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-blue-600" />
                        <span>Dedicated Sales Page URL (Firebase)</span>
                      </span>
                      {!isEditing ? (
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="text-[10px] text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
                        >
                          <Edit2 className="w-2.5 h-2.5" /> Edit Page URL
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => handleSaveEdit(item.tier)}
                            className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 cursor-pointer"
                          >
                            <Save className="w-2.5 h-2.5" /> Save
                          </button>
                          <button
                            onClick={() => setEditingTier(null)}
                            className="text-[10px] text-slate-400 hover:text-slate-600 cursor-pointer"
                          >
                            <X className="w-2.5 h-2.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {isEditing ? (
                      <input
                        type="url"
                        value={editUrlInput}
                        onChange={e => setEditUrlInput(e.target.value)}
                        className="w-full px-2.5 py-1.5 text-xs border border-blue-400 rounded-lg bg-white text-slate-900 font-mono"
                        autoFocus
                      />
                    ) : (
                      <div className="flex items-center justify-between gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-slate-200">
                        <span className="text-[11px] font-mono text-slate-700 truncate select-all">
                          {salesUrl}
                        </span>
                        <a
                          href={salesUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 text-slate-400 hover:text-blue-600 transition-colors shrink-0"
                          title="Open sales page in new tab"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    )}
                    <p className="text-[10px] text-slate-400">
                      The URL entered into WarriorPlus Product Setup &gt; Sales Page field.
                    </p>
                  </div>

                  {/* Column 2: WarriorPlus Direct Delivery Link */}
                  {(() => {
                    const isEditingDelivery = editingDeliveryTier === item.tier;

                    return (
                      <div className="p-3.5 bg-emerald-50/70 border border-emerald-200/80 rounded-xl space-y-2">
                        <div className="flex items-center justify-between text-[11px] font-bold text-emerald-950">
                          <span className="flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                            <span>WarriorPlus Direct Delivery URL</span>
                          </span>
                          
                          <div className="flex items-center gap-2">
                            {!isEditingDelivery ? (
                              <button
                                onClick={() => handleStartDeliveryEdit(item)}
                                className="text-[10px] text-emerald-800 hover:text-emerald-950 font-semibold flex items-center gap-1 cursor-pointer"
                              >
                                <Edit2 className="w-2.5 h-2.5" /> Edit Delivery Link
                              </button>
                            ) : (
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => handleSaveDeliveryEdit(item.tier)}
                                  className="text-[10px] text-emerald-800 font-bold flex items-center gap-0.5 cursor-pointer"
                                >
                                  <Save className="w-2.5 h-2.5" /> Save
                                </button>
                                <button
                                  onClick={() => setEditingDeliveryTier(null)}
                                  className="text-[10px] text-emerald-700 hover:text-emerald-900 cursor-pointer"
                                >
                                  <X className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            )}

                            <button
                              onClick={() => copyToClipboard(deliveryUrl, item.tier)}
                              className="text-[10px] text-emerald-700 hover:text-emerald-950 font-bold flex items-center gap-1 bg-white/80 px-2 py-0.5 rounded border border-emerald-300 cursor-pointer"
                            >
                              {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                              <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>
                        </div>

                        {isEditingDelivery ? (
                          <input
                            type="url"
                            value={editDeliveryInput}
                            onChange={e => setEditDeliveryInput(e.target.value)}
                            className="w-full px-2.5 py-1.5 text-xs border border-emerald-400 rounded-lg bg-white text-emerald-950 font-mono"
                            autoFocus
                          />
                        ) : (
                          <div className="flex items-center justify-between gap-2 bg-white px-2.5 py-1.5 rounded-lg border border-emerald-200">
                            <span className="text-[11px] font-mono text-emerald-900 truncate select-all font-semibold">
                              {deliveryUrl}
                            </span>
                            <a
                              href={deliveryUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 text-emerald-600 hover:text-emerald-800 transition-colors shrink-0"
                              title="Open delivery link in new tab"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                        <p className="text-[10px] text-emerald-700/80">
                          Paste into WarriorPlus &gt; &ldquo;Delivery Page / URL&rdquo;. Silently unlocks access on customer arrival.
                        </p>
                      </div>
                    );
                  })()}

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Technical Catalog Verification Audit Section */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5 max-w-xl">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm sm:text-base font-black text-slate-900 font-display">
              Technical Catalog Verification &amp; Asset Audit Suite
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Verify the mathematical integrity, article counts, formula deterministic execution, and deliverable numbers across all 24 niches (1,800+ assets, 192 interactive tools, 264 pages).
          </p>
        </div>

        <button
          onClick={onOpenAuditModal}
          className="px-5 py-3 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Launch Full Catalog Audit</span>
        </button>
      </div>

    </div>
  );
};
