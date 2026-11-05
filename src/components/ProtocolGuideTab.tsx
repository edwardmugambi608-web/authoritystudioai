import React, { useState } from 'react';
import { 
  BookOpen, 
  Zap, 
  Radio, 
  Layers, 
  Building2, 
  CheckCircle2, 
  ArrowRight, 
  Globe, 
  Cpu, 
  FileText, 
  Mail, 
  DollarSign, 
  Download, 
  ShieldCheck, 
  Compass, 
  Repeat, 
  Users, 
  Award, 
  MapPin, 
  Calendar,
  Sparkles,
  Check,
  ExternalLink,
  ChevronRight,
  Target,
  TrendingUp
} from 'lucide-react';
import { ProductTier } from '../types/authority';
import { store } from '../services/store';

interface ProtocolGuideTabProps {
  activeSuite: ProductTier;
  onNavigateTab: (tab: any) => void;
  onOpenUpgradeWall?: (tier?: ProductTier, featureName?: string) => void;
}

export const ProtocolGuideTab: React.FC<ProtocolGuideTabProps> = ({
  activeSuite,
  onNavigateTab,
  onOpenUpgradeWall
}) => {
  const [selectedSuiteView, setSelectedSuiteView] = useState<ProductTier>(activeSuite);

  // Sync if parent changes
  React.useEffect(() => {
    setSelectedSuiteView(activeSuite);
  }, [activeSuite]);

  const tiers: { id: ProductTier; label: string; badge: string; icon: React.ElementType; color: string }[] = [
    { id: 'CORE', label: 'Front-End (FE Core)', badge: '$4.95 • 5 Niches', icon: Zap, color: 'text-blue-600 bg-blue-50 border-blue-200' },
    { id: 'EXTENDED', label: 'Business Builder (OTO 1)', badge: '$47 • Live Domains & Paywalls', icon: Radio, color: 'text-indigo-600 bg-indigo-50 border-indigo-200' },
    { id: 'PRO', label: 'Expansion Studio (OTO 2)', badge: '$67 • 10 Businesses & Cloner', icon: Layers, color: 'text-purple-600 bg-purple-50 border-purple-200' },
    { id: 'ULTIMATE', label: 'Commercial Empire (OTO 3)', badge: '$97 • Agency & 24 Niches', icon: Building2, color: 'text-amber-600 bg-amber-50 border-amber-200' }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-16 animate-in fade-in duration-200">
      
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl shadow-blue-900/10 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-200 text-xs font-mono font-bold tracking-wide uppercase">
            <BookOpen className="w-3.5 h-3.5 text-blue-300" />
            <span>Operational Architecture &amp; Execution Protocols</span>
          </div>
          
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight font-display text-white">
            Comprehensive System Guide
          </h1>
          
          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal">
            Understand exactly what is happening behind the scenes, how each tool functions, and follow foolproof step-by-step instructions to take your authority properties from setup to revenue.
          </p>
        </div>

        {/* Tier Selector Navigation Bar */}
        <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-2">
          {tiers.map(t => {
            const isSelected = selectedSuiteView === t.id;
            const isUnlocked = store.hasAccessToTier(t.id);
            const Icon = t.icon;

            return (
              <button
                key={t.id}
                onClick={() => setSelectedSuiteView(t.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white text-slate-900 border-white shadow-lg shadow-black/20 font-bold'
                    : 'bg-white/10 text-white/80 border-white/10 hover:bg-white/15 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-blue-300'}`} />
                  {isUnlocked ? (
                    <span className="text-[10px] font-mono font-bold text-emerald-400">UNLOCKED</span>
                  ) : (
                    <span className="text-[10px] font-mono font-bold text-amber-300">UPGRADE</span>
                  )}
                </div>
                <div className="text-xs font-bold truncate">{t.label}</div>
                <div className="text-[10px] opacity-75 truncate">{t.badge}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Dynamic Content based on selected suite view */}
      {selectedSuiteView === 'CORE' && (
        <CoreGuideView onNavigateTab={onNavigateTab} />
      )}

      {selectedSuiteView === 'EXTENDED' && (
        <ExtendedGuideView 
          onNavigateTab={onNavigateTab} 
          onOpenUpgradeWall={onOpenUpgradeWall} 
        />
      )}

      {selectedSuiteView === 'PRO' && (
        <ProGuideView 
          onNavigateTab={onNavigateTab} 
          onOpenUpgradeWall={onOpenUpgradeWall} 
        />
      )}

      {selectedSuiteView === 'ULTIMATE' && (
        <UltimateGuideView 
          onNavigateTab={onNavigateTab} 
          onOpenUpgradeWall={onOpenUpgradeWall} 
        />
      )}

    </div>
  );
};

/* =========================================================================
   1. FRONT-END (CORE) GUIDE VIEW
   ========================================================================= */
const CoreGuideView: React.FC<{ onNavigateTab: (tab: any) => void }> = ({ onNavigateTab }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      
      {/* Overview Banner */}
      <div className="bg-white border border-blue-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </span>
          <div>
            <h2 className="text-xl font-black text-slate-900 font-display">
              Front-End (FE Core): How the 5-Step System Works
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Entry Price: $4.95 &bull; Includes 5 Evergreen Niches &bull; 11 Turnkey Pages Each &bull; 8 Interactive Decision Engines
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
          <p className="font-semibold text-slate-900">
            💡 What is happening behind the scenes in plain English?
          </p>
          <p>
            When you select one of the 5 unlocked evergreen niches (Solar ROI, Remote Work, Keto/Wellness, AI Automation, Real Estate), Authority Studio instantly binds the workspace to a complete, pre-engineered authority property. 
            Unlike static website builders or generic AI chatbots, Authority Studio delivers <strong>interactive proprietary decision engines</strong> (such as solar payback calculators, metabolic macros calculators, and ergonomic cost auditors) whose mathematical formulas execute deterministically directly in the user&rsquo;s browser.
          </p>
          <p>
            The entire asset bundle (11 responsive pages, formulas, styling, lead capture forms, and email followup sequences) is completely self-contained and exportable as a clean, static <strong>Business-in-a-Box ZIP</strong>. You can host it on any web host, static server, GitHub Pages, or Netlify with zero database setup required.
          </p>
        </div>
      </div>

      {/* Primary Desired Outcome Card */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-blue-100 text-[11px] font-mono font-bold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5 text-blue-200" />
            <span>The Exact Desired Outcome You Are Building Toward</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
            Launch a Live Turnkey Niche Property &amp; Capture Email Leads in Under 24 Hours
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 leading-relaxed max-w-3xl">
            The specific business outcome of Front-End Core is taking you from ground zero to owning a fully functional 11-page authority niche website with interactive decision engines, an active lead magnet opt-in, and an automated 5-day email sequence—downloadable as an independent ZIP with 100% code ownership and zero ongoing subscriptions.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="bg-white/10 border border-white/15 rounded-xl p-3">
              <div className="text-[10px] font-mono text-blue-200 font-bold uppercase">Milestone 1</div>
              <div className="text-xs font-bold text-white mt-0.5">Activate 1 of 5 Niches</div>
              <div className="text-[11px] text-blue-100/80">Loads all 11 pages &amp; tools</div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-3">
              <div className="text-[10px] font-mono text-blue-200 font-bold uppercase">Milestone 2</div>
              <div className="text-xs font-bold text-white mt-0.5">Interactive AI Tools</div>
              <div className="text-[11px] text-blue-100/80">Interactive user calculations</div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-3">
              <div className="text-[10px] font-mono text-blue-200 font-bold uppercase">Milestone 3</div>
              <div className="text-xs font-bold text-white mt-0.5">Deploy Lead Funnel</div>
              <div className="text-[11px] text-blue-100/80">Automated 5-email sequence</div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-3">
              <div className="text-[10px] font-mono text-blue-200 font-bold uppercase">Milestone 4</div>
              <div className="text-xs font-bold text-white mt-0.5">Export Business ZIP</div>
              <div className="text-[11px] text-blue-100/80">Deploy to any web host</div>
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Execution Protocol */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-black text-slate-900 font-display flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-blue-600" />
          <span>The Foolproof 5-Step Launch Protocol (How to Reach Your Outcome)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Step 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-mono font-bold text-xs">
                Step 1 &bull; 2 Minutes
              </span>
              <button 
                onClick={() => onNavigateTab('niches')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                Go to Niches <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <h4 className="text-sm font-bold text-slate-900">Choose Your High-Demand Niche</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Navigate to the <strong>Niche Selector</strong>. Choose from Solar Payback, Remote Work Ergonomics, Keto Nutrition, AI Automation, or Commercial Real Estate. Click &ldquo;Activate Workspace&rdquo; to load all 11 pages and decision tools for that niche.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-mono font-bold text-xs">
                Step 2 &bull; 3 Minutes
              </span>
              <button 
                onClick={() => onNavigateTab('website')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                View Website <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <h4 className="text-sm font-bold text-slate-900">Preview Your 11-Page Turnkey Website</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Open the <strong>Website Preview</strong> tab. Switch between Desktop, Tablet, and Mobile viewports. Test the navigation bar, hero callouts, responsive typography, and embedded interactive tools.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-mono font-bold text-xs">
                Step 3 &bull; 2 Minutes
              </span>
              <button 
                onClick={() => onNavigateTab('tools')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                Run AI Tools <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <h4 className="text-sm font-bold text-slate-900">Run the Interactive AI Tools</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Go to the <strong>Interactive AI Tools</strong> tab. Slide the inputs, enter numbers, and watch the real-time calculations output ROI, payback timelines, and actionable recommendations. These tools generate 4x higher dwell time than basic blogs.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-mono font-bold text-xs">
                Step 4 &bull; 1 Minute
              </span>
              <button 
                onClick={() => onNavigateTab('lead_magnet')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                Inspect Leads <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
            <h4 className="text-sm font-bold text-slate-900">Inspect the Lead Magnet &amp; Email Funnel</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Open the <strong>Lead Magnet &amp; Email Funnel</strong> tab. Review the pre-written authority playbook and 5 high-converting follow-up emails designed to build trust and pitch affiliate programs automatically.
            </p>
          </div>

        </div>

        {/* Final Step: Step 5 Full Width */}
        <div className="bg-gradient-to-r from-blue-50 via-sky-50 to-white border border-blue-200 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-md bg-blue-600 text-white font-mono font-bold text-[11px]">
                Step 5 &bull; Instant Delivery
              </span>
              <h4 className="text-sm font-bold text-slate-900">Export Your Complete Business-in-a-Box ZIP</h4>
            </div>
            <p className="text-xs text-slate-600 max-w-xl">
              Go to the <strong>ZIP Exporter</strong>. Download the production-ready `.zip` archive containing all 11 HTML pages, inline Tailwind styling, JavaScript calculations, email copy, and media assets ready to publish anywhere.
            </p>
          </div>

          <button
            onClick={() => onNavigateTab('exports')}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-md flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Open ZIP Exporter</span>
          </button>
        </div>
      </div>

      {/* Directory of FE Tools & Features */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <h3 className="text-base font-black text-slate-900 font-display">
          Everything Included in Front-End Core
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>11 Responsive Pages</span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Homepage, About, Micro-Tools hub, 3 Article pages, Lead Magnet landing, Terms, Privacy, and Contact.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>8 Decision Engines</span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Interactive ROI calculators, assessment quizzes, and decision matrices that keep visitors engaged.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-blue-600" />
              <span>6 Authority Articles</span>
            </div>
            <p className="text-slate-500 text-[11px]">
              2,000+ words of peer-reviewed evergreen content optimized for Google search snippets and indexing.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-blue-600" />
              <span>Lead Playbook &amp; 5 Emails</span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Turnkey opt-in incentive and a pre-written 5-day welcome and monetization email sequence.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Download className="w-3.5 h-3.5 text-blue-600" />
              <span>1-Click ZIP Exporter</span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Zero lock-in. Download raw, pristine HTML, CSS, and JS ready for cPanel, Vercel, Netlify, or Hostinger.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
            <div className="font-bold text-slate-900 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              <span>5 Evergreen Niches</span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Solar, Remote Work, Keto Wellness, AI Business, and Commercial Real Estate with instant switching.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};

/* =========================================================================
   2. OTO 1 (BUSINESS BUILDER) GUIDE VIEW
   ========================================================================= */
const ExtendedGuideView: React.FC<{ 
  onNavigateTab: (tab: any) => void;
  onOpenUpgradeWall?: (tier?: ProductTier, featureName?: string) => void;
}> = ({ onNavigateTab, onOpenUpgradeWall }) => {
  const isUnlocked = store.hasAccessToTier('EXTENDED');

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      
      {/* Overview Banner */}
      <div className="bg-white border border-indigo-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-200 flex items-center justify-center font-bold">
              <Radio className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-black text-slate-900 font-display">
                OTO 1: Business Builder &bull; Live Operations Guide
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Unlock Price: $47 &bull; Live Domains &bull; Web Publishing &bull; $19 Decision Engine Paywalls &bull; 10 Niches
              </p>
            </div>
          </div>

          {!isUnlocked && onOpenUpgradeWall && (
            <button
              onClick={() => onOpenUpgradeWall('EXTENDED', 'Business Builder Edition')}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-all"
            >
              Unlock Business Builder ($47)
            </button>
          )}
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
          <p className="font-semibold text-slate-900">
            💡 What is happening behind the scenes in plain English?
          </p>
          <p>
            While the Front-End edition gives you the downloadable code and local preview, <strong>Business Builder takes your business live on the actual Internet</strong>. It manages your custom root domain (e.g., <code>yourdomain.com</code>), provisions automatic SSL encryption certificates, and connects your authority site directly to monetization networks (ClickBank, WarriorPlus, Amazon Associates, and Stripe).
          </p>
          <p>
            Most importantly, Business Builder adds the <strong>$19 Decision Engine Paywall Gate</strong>: visitors can use 3 preview calculations for free, but must enter their email or pay $19 to download their customized executive report, creating an immediate recurring micro-cashflow stream.
          </p>
        </div>
      </div>

      {/* Primary Desired Outcome Card */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-800 to-purple-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-indigo-100 text-[11px] font-mono font-bold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5 text-indigo-200" />
            <span>The Exact Desired Outcome You Are Building Toward</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
            Put Your Business on a Live Custom Domain &amp; Monetize Decision Engine Paywalls
          </h3>
          <p className="text-xs sm:text-sm text-indigo-100 leading-relaxed max-w-3xl">
            The specific business outcome of OTO 1 (Business Builder) is taking your site live on the open web under your own custom branded domain with automated SSL, wiring high-paying affiliate tracking codes into every article, and engaging the $19 decision engine paywall to generate direct instant revenue from visitors seeking specialized reports.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="bg-white/10 border border-white/15 rounded-xl p-3">
              <div className="text-[10px] font-mono text-indigo-200 font-bold uppercase">Milestone 1</div>
              <div className="text-xs font-bold text-white mt-0.5">Connect Root Domain</div>
              <div className="text-[11px] text-indigo-100/80">Auto SSL in 15 minutes</div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-3">
              <div className="text-[10px] font-mono text-indigo-200 font-bold uppercase">Milestone 2</div>
              <div className="text-xs font-bold text-white mt-0.5">Route Affiliate Offers</div>
              <div className="text-[11px] text-indigo-100/80">ClickBank, Amazon, Stripe</div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-3">
              <div className="text-[10px] font-mono text-indigo-200 font-bold uppercase">Milestone 3</div>
              <div className="text-xs font-bold text-white mt-0.5">Arm $19 Tool Paywall</div>
              <div className="text-[11px] text-indigo-100/80">Direct micro-transaction sales</div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-3">
              <div className="text-[10px] font-mono text-indigo-200 font-bold uppercase">Milestone 4</div>
              <div className="text-xs font-bold text-white mt-0.5">30-Day Launch Matrix</div>
              <div className="text-[11px] text-indigo-100/80">Daily organic traffic steps</div>
            </div>
          </div>
        </div>
      </div>

      {/* Step-by-Step Execution Checklist */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-black text-slate-900 font-display flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-indigo-600" />
          <span>The Business Builder Live Operations Roadmap (How to Reach Your Outcome)</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2.5">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-mono font-bold text-xs">
              Step 1: Domain Mapping
            </span>
            <h4 className="text-sm font-bold text-slate-900">Bind Your Custom Domain &amp; SSL</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Open <strong>Custom Domains &amp; SSL</strong>. Enter your domain name (e.g., <code>mysolarroi.com</code>). Follow the 2-minute DNS setup instructions to point your CNAME record. SSL will automatically secure the site within 15 minutes.
            </p>
            <button 
              onClick={() => onNavigateTab('operations')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer pt-1"
            >
              Open Domain Command &rarr;
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2.5">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-mono font-bold text-xs">
              Step 2: Affiliate Hub
            </span>
            <h4 className="text-sm font-bold text-slate-900">Inject High-Paying Affiliate Links</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Open the <strong>Monetization &amp; Affiliate Hub</strong>. Paste your affiliate tracking IDs into the designated sponsor slots. The engine automatically replaces placeholder links across all 11 pages and calculators with your live commissions.
            </p>
            <button 
              onClick={() => onNavigateTab('monetization')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer pt-1"
            >
              Open Affiliate Hub &rarr;
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2.5">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-mono font-bold text-xs">
              Step 3: Paywall Activation
            </span>
            <h4 className="text-sm font-bold text-slate-900">Turn on $19 Decision Engine Paywalls</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Navigate to <strong>Decision Engines</strong>. Toggle on &ldquo;Monetization Paywall&rdquo;. Choose between Lead Capture Gate (email required after 2 calculations) or Instant Stripe Checkout ($19 for full unlocked PDF audit).
            </p>
            <button 
              onClick={() => onNavigateTab('tools')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer pt-1"
            >
              Configure Paywalls &rarr;
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2.5">
            <span className="px-2.5 py-1 rounded-lg bg-indigo-50 text-indigo-700 font-mono font-bold text-xs">
              Step 4: Launch Matrix
            </span>
            <h4 className="text-sm font-bold text-slate-900">Execute the 30-Day Rapid Launch Roadmap</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Open the <strong>30-Day Launch Roadmap</strong> tab. Check off daily milestones for Days 1 through 30 covering forum outreach, Reddit value posts, organic backlinking, and directory submissions.
            </p>
            <button 
              onClick={() => onNavigateTab('launch_plan')}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 cursor-pointer pt-1"
            >
              Open Launch Roadmap &rarr;
            </button>
          </div>

        </div>
      </div>

    </div>
  );
};

/* =========================================================================
   3. OTO 2 (EXPANSION STUDIO) GUIDE VIEW
   ========================================================================= */
const ProGuideView: React.FC<{ 
  onNavigateTab: (tab: any) => void;
  onOpenUpgradeWall?: (tier?: ProductTier, featureName?: string) => void;
}> = ({ onNavigateTab, onOpenUpgradeWall }) => {
  const isUnlocked = store.hasAccessToTier('PRO');

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      
      {/* Overview Banner */}
      <div className="bg-white border border-purple-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 border border-purple-200 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-black text-slate-900 font-display">
                OTO 2: Expansion Studio &bull; Portfolio &amp; Traffic Scaling
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Unlock Price: $67 &bull; 10 Simultaneous Businesses &bull; 1-Click Business Cloner &bull; 1-into-7 Content Repurposing
              </p>
            </div>
          </div>

          {!isUnlocked && onOpenUpgradeWall && (
            <button
              onClick={() => onOpenUpgradeWall('PRO', 'Expansion Studio Pro')}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-all"
            >
              Unlock Expansion Studio ($67)
            </button>
          )}
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
          <p className="font-semibold text-slate-900">
            💡 What is happening behind the scenes in plain English?
          </p>
          <p>
            Once you have 1 profitable authority site running, the fastest path to $10,000/month is <strong>horizontal expansion across multiple niches</strong>. Expansion Studio upgrades your account to hold 10 completely independent, active business workspaces in parallel.
          </p>
          <p>
            It also introduces the <strong>1-into-7 Algorithmic Content Repurposing Engine</strong>: take any single authority article in your library, click &ldquo;Repurpose&rdquo;, and the system automatically reformats it into 7 viral distribution formats (LinkedIn Slide Carousels, Twitter/X Educational Threads, Instagram Reel Scripts, TikTok Hooks, YouTube Video Storyboards, PDF Summary Guides, and Email Newsletters).
          </p>
        </div>
      </div>

      {/* Primary Desired Outcome Card */}
      <div className="bg-gradient-to-r from-purple-800 via-purple-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-purple-100 text-[11px] font-mono font-bold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5 text-purple-200" />
            <span>The Exact Desired Outcome You Are Building Toward</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
            Scale to a 10-Property Portfolio &amp; Drive Free Organic Traffic Across 7 Channels
          </h3>
          <p className="text-xs sm:text-sm text-purple-100 leading-relaxed max-w-3xl">
            The specific business outcome of OTO 2 (Expansion Studio) is multiplying your authority footprint by managing up to 10 independent brand properties simultaneously, instantly cloning winning sites into profitable sub-niches, and transforming each authority article into 7 viral distribution formats (LinkedIn carousels, X threads, TikTok/Reel scripts, YouTube storyboards, and PDFs) for sustained traffic.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="bg-white/10 border border-white/15 rounded-xl p-3">
              <div className="text-[10px] font-mono text-purple-200 font-bold uppercase">Milestone 1</div>
              <div className="text-xs font-bold text-white mt-0.5">10-Brand Portfolio</div>
              <div className="text-[11px] text-purple-100/80">Parallel brand operations</div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-3">
              <div className="text-[10px] font-mono text-purple-200 font-bold uppercase">Milestone 2</div>
              <div className="text-xs font-bold text-white mt-0.5">1-Click Property Cloner</div>
              <div className="text-[11px] text-purple-100/80">Clone winners into sub-niches</div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-3">
              <div className="text-[10px] font-mono text-purple-200 font-bold uppercase">Milestone 3</div>
              <div className="text-xs font-bold text-white mt-0.5">1-into-7 Repurposing</div>
              <div className="text-[11px] text-purple-100/80">Social, video &amp; PDF carousels</div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-3">
              <div className="text-[10px] font-mono text-purple-200 font-bold uppercase">Milestone 4</div>
              <div className="text-xs font-bold text-white mt-0.5">Bulk ZIP Exporter</div>
              <div className="text-[11px] text-purple-100/80">Export all 10 sites in one file</div>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Breakdown */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-black text-slate-900 font-display flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-purple-600" />
          <span>Core Scaling Modules (How to Reach Your Outcome)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Layers className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">10-Business Portfolio Dashboard</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Manage up to 10 active brand properties from a single control cockpit. Monitor visitor metrics, lead counts, active tools, and export states across multiple niches without logging in and out.
          </p>
          <button 
            onClick={() => onNavigateTab('portfolio')}
            className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 cursor-pointer"
          >
            Open Portfolio &rarr;
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Repeat className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">1-Click Turnkey Business Cloner</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Duplicate any high-performing authority property into a new sub-niche or localized territory in 1 click. Retains custom color schemes and layout tweaks while generating fresh domain bindings.
          </p>
          <button 
            onClick={() => onNavigateTab('cloner')}
            className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 cursor-pointer"
          >
            Open Cloner Tool &rarr;
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-slate-900">1-into-7 Traffic Repurposing</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Turn every piece of content into 7 traffic magnets. Copy ready-to-post carousels, video scripts, and threads that link back to your decision engines, driving organic viral traffic on autopilot.
          </p>
          <button 
            onClick={() => onNavigateTab('repurposing')}
            className="text-xs font-bold text-purple-600 hover:text-purple-700 flex items-center gap-1 cursor-pointer"
          >
            Open Repurposing &rarr;
          </button>
        </div>

        </div>
      </div>

    </div>
  );
};

/* =========================================================================
   4. OTO 3 (COMMERCIAL EMPIRE) GUIDE VIEW
   ========================================================================= */
const UltimateGuideView: React.FC<{ 
  onNavigateTab: (tab: any) => void;
  onOpenUpgradeWall?: (tier?: ProductTier, featureName?: string) => void;
}> = ({ onNavigateTab, onOpenUpgradeWall }) => {
  const isUnlocked = store.hasAccessToTier('ULTIMATE');

  return (
    <div className="space-y-8 animate-in fade-in duration-150">
      
      {/* Overview Banner */}
      <div className="bg-white border border-amber-100 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 border border-amber-200 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-xl font-black text-slate-900 font-display">
                OTO 3: Commercial Empire &bull; Agency Licensing &amp; Client SOWs
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Unlock Price: $97 &bull; Full Agency Reseller Rights &bull; 24 Niche Master Vault &bull; $3,500 Client Contracts &amp; Review Portals
              </p>
            </div>
          </div>

          {!isUnlocked && onOpenUpgradeWall && (
            <button
              onClick={() => onOpenUpgradeWall('ULTIMATE', 'Commercial Empire Ultimate')}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs cursor-pointer transition-all"
            >
              Unlock Commercial Empire ($97)
            </button>
          )}
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl text-xs sm:text-sm text-slate-700 leading-relaxed space-y-2">
          <p className="font-semibold text-slate-900">
            💡 What is happening behind the scenes in plain English?
          </p>
          <p>
            Commercial Empire transforms you from an individual affiliate into a <strong>high-ticket digital agency</strong>. Local businesses, dentists, solar contractors, accountants, and brokers desperately need interactive websites that capture qualified leads, but custom agency development typically costs them $10,000+.
          </p>
          <p>
            With Commercial Empire, you hold the legal reseller certificate and Statement of Work (SOW) agreements to sell complete turnkey properties to paying business clients for <strong>$3,500 to $5,000 upfront</strong>, plus a <strong>$500/month recurring maintenance retainer</strong>. You invite clients into white-labeled review portals with zero Authority Studio branding visible.
          </p>
        </div>
      </div>

      {/* Primary Desired Outcome Card */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-800 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-amber-100 text-[11px] font-mono font-bold uppercase tracking-wider">
            <Target className="w-3.5 h-3.5 text-amber-200" />
            <span>The Exact Desired Outcome You Are Building Toward</span>
          </div>
          <h3 className="text-lg sm:text-2xl font-black text-white tracking-tight">
            Close High-Ticket Agency Clients at $3,500 – $5,000 Upfront + $500/Month Retainers
          </h3>
          <p className="text-xs sm:text-sm text-amber-100 leading-relaxed max-w-3xl">
            The specific business outcome of OTO 3 (Commercial Empire) is operating a profitable high-ticket agency: licensing and deploying turnkey authority properties to local business owners, contractors, and corporate clients with legally binding reseller certificates, white-labeled client review portals, and access to all 24 high-margin niche vaults.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <div className="bg-white/10 border border-white/15 rounded-xl p-3">
              <div className="text-[10px] font-mono text-amber-200 font-bold uppercase">Milestone 1</div>
              <div className="text-xs font-bold text-white mt-0.5">White-Label Portals</div>
              <div className="text-[11px] text-amber-100/80">Invite clients to test &amp; review</div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-3">
              <div className="text-[10px] font-mono text-amber-200 font-bold uppercase">Milestone 2</div>
              <div className="text-xs font-bold text-white mt-0.5">Agency Certificate</div>
              <div className="text-[11px] text-amber-100/80">Verifiable commercial rights</div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-3">
              <div className="text-[10px] font-mono text-amber-200 font-bold uppercase">Milestone 3</div>
              <div className="text-xs font-bold text-white mt-0.5">Master 24-Niche Vault</div>
              <div className="text-[11px] text-amber-100/80">1,800+ assets &amp; 192 engines</div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-3">
              <div className="text-[10px] font-mono text-amber-200 font-bold uppercase">Milestone 4</div>
              <div className="text-xs font-bold text-white mt-0.5">Local &amp; Event Kits</div>
              <div className="text-[11px] text-amber-100/80">Target local businesses &amp; expos</div>
            </div>
          </div>
        </div>
      </div>

      {/* The 4 Core Agency Pillars */}
      <div className="space-y-4">
        <h3 className="text-base sm:text-lg font-black text-slate-900 font-display flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-amber-600" />
          <span>Agency Execution Pillars (How to Reach Your Outcome)</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2.5">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber-600" />
            <h4 className="text-sm font-bold text-slate-900">Client Workspaces &amp; Review Portals</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Create dedicated sub-accounts for your clients. Generate private preview review links where clients can test their site, approve content, and request revisions with all software branding removed.
          </p>
          <button 
            onClick={() => onNavigateTab('client_portals')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
          >
            Open Client Portals &rarr;
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2.5">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-600" />
            <h4 className="text-sm font-bold text-slate-900">Commercial Reseller License Certificate</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Download your personalized, verifiable commercial agency certificate. Attach it to your client proposals and enterprise contracts as proof of licensed digital asset deployment rights.
          </p>
          <button 
            onClick={() => onNavigateTab('license')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
          >
            View License Certificate &rarr;
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2.5">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-600" />
            <h4 className="text-sm font-bold text-slate-900">Local &amp; Event Marketing Funnel Kits</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Deploy hyper-localized niche properties tailored for geographic markets (e.g. &ldquo;Denver Solar Payback Portal&rdquo;, &ldquo;Austin Remote Work Ergonomics&rdquo;) and recurring seasonal event guides.
          </p>
          <button 
            onClick={() => onNavigateTab('local_event')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
          >
            Open Local &amp; Event Kits &rarr;
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-2.5">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-amber-600" />
            <h4 className="text-sm font-bold text-slate-900">24-Niche Master Empire Vault</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Unlock the entire 24-niche catalog (1,800+ assets, 192 interactive tools, 264 pages). Pitch any client in any industry — from dental implants to EV fleet charging — in 60 seconds flat.
          </p>
          <button 
            onClick={() => onNavigateTab('niches')}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
          >
            Explore Master 24 Niches &rarr;
          </button>
        </div>

        </div>
      </div>

    </div>
  );
};
