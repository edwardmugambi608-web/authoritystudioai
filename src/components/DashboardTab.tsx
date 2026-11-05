import React, { useState, useEffect, useRef } from 'react';
import { 
  RocketLaunch, 
  Sparkle, 
  ArrowRight as PhArrowRight, 
  ArrowsClockwise, 
  GlobeSimple, 
  DownloadSimple, 
  CheckCircle as PhCheckCircle, 
  CaretDown as PhCaretDown,
  CaretUp as PhCaretUp,
  Article, 
  Wrench as PhWrench, 
  EnvelopeSimple, 
  ShareNetwork, 
  CalendarCheck,
  Target as PhTarget,
  ShieldCheck as PhShieldCheck,
  Check as PhCheck,
  Browsers,
  Lightning,
  Coins,
  Copy as PhCopy
} from '@phosphor-icons/react';
import { 
  Loader2, 
  Vault, 
  Briefcase, 
  Cpu, 
  Lock, 
  ExternalLink, 
  FileText, 
  TrendingUp, 
  DollarSign, 
  Code, 
  Layers, 
  Copy, 
  Check, 
  Sparkles, 
  Repeat, 
  Building2, 
  Share2, 
  Clock, 
  ChevronRight,
  ShieldAlert,
  Sliders,
  CheckSquare,
  Search,
  HelpCircle,
  AlertCircle,
  Lightbulb,
  Award,
  Users
} from 'lucide-react';
import { BusinessWorkspace, ProductTier, ContentAsset, ToolDefinition } from '../types/authority';
import { allNichePackages, getNichePackageById } from '../data/niches';
import { getNicheMarketDossier } from '../data/market-niche-intel';
import { store, PRODUCT_CONFIGS } from '../services/store';
import { TabKey } from './Sidebar';
import { 
  AFFILIATE_CHEAT_SHEET, 
  KEYWORD_MATRIX, 
  BRAND_IDENTITY_KIT 
} from '../data/fe-deliverables-data';
import { 
  TRAFFIC_SWIPES_50, 
  PROMO_EMAILS_10, 
  SPONSORSHIP_ASSET, 
  SYNDICATION_CHECKLIST,
  TrafficSwipe,
  PromoEmail
} from '../data/traffic-vault-data';
import confetti from 'canvas-confetti';

interface DashboardTabProps {
  workspace?: BusinessWorkspace | null;
  currentPlan: ProductTier;
  activeSuite?: ProductTier;
  onSelectSuite?: (suite: ProductTier) => void;
  onNavigateTab: (tab: TabKey) => void;
  onOpenAuditModal: () => void;
  onExportZip: () => void;
  onOpenTrafficVault?: () => void;
  onOpenFEDeliverables?: () => void;
  onOpenRepurposing?: (asset: ContentAsset) => void;
}

export const DashboardTab: React.FC<DashboardTabProps> = ({
  workspace,
  currentPlan,
  activeSuite = 'CORE',
  onSelectSuite,
  onNavigateTab,
  onOpenAuditModal,
  onExportZip,
  onOpenTrafficVault,
  onOpenFEDeliverables,
  onOpenRepurposing
}) => {
  const activeWs = workspace || store.getActiveWorkspace();
  const allWorkspaces = store.getWorkspaces();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  // Market Intel & Mini Case Study Dossier collapsible toggle state
  const [marketIntelOpen, setMarketIntelOpen] = useState(false);
  const [dossierTab, setDossierTab] = useState<'case-study' | 'market-proof' | 'psychology' | 'monetization' | 'moat' | 'traffic'>('case-study');

  const copyToClipboard = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    confetti({ particleCount: 30, spread: 45, origin: { y: 0.6 } });
    setTimeout(() => setCopiedKey(null), 2200);
  };

  // ==========================================
  // 1. 2-STEP BUSINESS LAUNCHER STATE
  // ==========================================
  const [nicheDropdownOpen, setNicheDropdownOpen] = useState(false);
  const nicheDropdownRef = useRef<HTMLDivElement>(null);

  const [selectedNicheId, setSelectedNicheId] = useState<string>(activeWs?.nichePackageId || 'ai-online-business');
  const [businessNameInput, setBusinessNameInput] = useState<string>(activeWs?.name || 'NextGen AI Tools');
  
  // ~50-Second Serious AI Architecture Sequence State
  const [isBuilding, setIsBuilding] = useState<boolean>(false);
  const [buildProgress, setBuildProgress] = useState<number>(0);
  const [buildSecondsElapsed, setBuildSecondsElapsed] = useState<number>(0);
  const [buildStepIndex, setBuildStepIndex] = useState<number>(0);

  const nameSuggestions: Record<string, string[]> = {
    'home-improvement': ['Apex Home Remodeling', 'TrueCraft Renovation Guide', 'BuiltRight Home Hub', 'Precision Remodel Pro'],
    'ai-online-business': ['NextGen AI Tools', 'PromptCraft Studio', 'AutomateScale Hub', 'Vanguard AI Insights'],
    'fitness-wellness': ['Peak Longevity Lab', 'Aegis Performance Protocol', 'VitalPulse Fitness', 'PrimeBio Longevity'],
    'personal-finance': ['Vanguard Wealth Blueprint', 'Compound Freedom Hub', 'Ascend Capital Strategy', 'ProsperWise Guide'],
    'parenting-family': ['Kindred Hearth Family', 'Thriving Roots Parenting', 'NurtureNest Hub', 'ParentCraft Daily']
  };

  const allowedNicheCount = PRODUCT_CONFIGS[currentPlan]?.availableNiches || 5;
  const availableNiches = allNichePackages.slice(0, Math.max(5, allowedNicheCount));
  const selectedPackage = availableNiches.find(p => p.id === selectedNicheId) || availableNiches[0];

  // Niche Market Intel & Case Study Dossier Data
  const activeNichePackage = activeWs ? getNichePackageById(activeWs.nichePackageId) : null;
  const activeDossier = activeWs 
    ? getNicheMarketDossier(activeWs.nichePackageId, activeWs.name, activeNichePackage?.category)
    : selectedPackage
      ? getNicheMarketDossier(selectedPackage.id, selectedPackage.name, selectedPackage.category)
      : null;

  const handleCopyCaseStudy = () => {
    if (!activeDossier) return;
    const text = `=====================================================
EXECUTIVE MARKET INTELLIGENCE & MINI CASE STUDY: ${activeDossier.nicheName.toUpperCase()}
=====================================================

1. MARKET DEMAND & FINANCIAL PROOF
• Total Addressable Market: ${activeDossier.marketMetrics.totalAddressableMarket}
• Annual Growth Rate: ${activeDossier.marketMetrics.annualGrowthRate}
• Targeted Monthly Search Volume: ${activeDossier.marketMetrics.monthlySearchVolume}
• Commercial CPC Advertisers Pay: ${activeDossier.marketMetrics.averageCommercialCpc}
• Commercial Intent Score: ${activeDossier.marketMetrics.buyerIntentScore}

2. REAL-WORLD CASE STUDY: ${activeDossier.caseStudy.caseStudyTitle}
• Proven Monthly Revenue Run-Rate: ${activeDossier.caseStudy.provenMonthlyRevenue}
• Operator Profile: ${activeDossier.caseStudy.operatorProfile}
• Traffic Volume: ${activeDossier.caseStudy.trafficVolume}

REVENUE BREAKDOWN BY STREAM:
${activeDossier.caseStudy.breakdownByStream.map(s => `• ${s.stream}: ${s.amount} (${s.source}) - ${s.conversionRate}`).join('\n')}

4-STAGE FUNNEL CONVERSION PATHWAY:
${activeDossier.caseStudy.funnelStages.map(f => `${f.stage} - ${f.title}: ${f.description} [${f.metric}]`).join('\n')}

3. CUSTOMER PSYCHOLOGY & THE BURNING PAIN
• Target Avatar: ${activeDossier.customerPsychology.targetAvatar}
• Bleeding-Neck Pain: ${activeDossier.customerPsychology.bleedingNeckPain}
• Trigger Event: ${activeDossier.customerPsychology.triggerEvent}
• Why Calculators Win: ${activeDossier.customerPsychology.whyCalculatorsWin}

4. COMPETITIVE ADVANTAGE OVER TRADITIONAL BLOGS
• Dwell Time: ${activeDossier.competitiveMoat.dwellTimeMetric}
• Google Algorithmic Advantage: ${activeDossier.competitiveMoat.googleRankAdvantage}

Source: Authority Studio Market Intelligence & Research Engine`;

    copyToClipboard('case-study-dossier', text);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (nicheDropdownRef.current && !nicheDropdownRef.current.contains(e.target as Node)) {
        setNicheDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNicheChange = (newNicheId: string) => {
    setSelectedNicheId(newNicheId);
    const list = nameSuggestions[newNicheId] || ['My Turnkey Business'];
    setBusinessNameInput(list[0]);
  };

  const handleCycleSuggestion = () => {
    const list = nameSuggestions[selectedNicheId] || ['My Turnkey Business'];
    const currentIdx = list.indexOf(businessNameInput);
    const nextIdx = (currentIdx + 1) % list.length;
    setBusinessNameInput(list[nextIdx]);
  };

  // 8 Transparent AI Milestones over ~50 Seconds
  const buildMilestones = [
    { title: 'Scanning Google Search Demand & Commercial CPC Rates', detail: 'Analyzing 48,000+ monthly search queries and high-intent commercial keywords...' },
    { title: 'Architecting Brand Identity & Typography Tokens', detail: 'Generating verified color palettes, responsive layouts, and font tokens...' },
    { title: 'Calibrating 8 Interactive AI Tools & Precision Formulas', detail: 'Encoding mathematical models, regional labor variances, and safety tolerances...' },
    { title: 'Synthesizing 40 Authority SEO Guides & Comparisons', detail: 'Drafting long-form buyer research, contractor checklists, and unit benchmarks...' },
    { title: 'Compiling Free Lead Magnet Playbook & 5-Day Email Machine', detail: 'Packaging the 24-page PDF giveaway and 5 automated follow-up messages...' },
    { title: 'Wiring $85–$350 Affiliate Payout Links & Sponsor Rate Cards', detail: 'Attaching direct affiliate merchant hooks and $250–$500/mo calculator banners...' },
    { title: 'Compiling 11 Responsive Portal Pages & Production ZIP', detail: 'Structuring clean HTML5, mobile layout, and offline asset packages...' },
    { title: 'Verifying Zero Errors & Deploying Turnkey Business Live', detail: 'Performing automated audit check... All systems operational!' }
  ];

  const handleLaunch = () => {
    const finalName = businessNameInput.trim() || 'My Turnkey Business';
    setIsBuilding(true);
    setBuildProgress(0);
    setBuildSecondsElapsed(0);
    setBuildStepIndex(0);

    const totalDurationMs = 48000; // ~48-50 seconds
    const intervalTickMs = 500;
    const totalTicks = totalDurationMs / intervalTickMs;
    let ticks = 0;

    const interval = setInterval(() => {
      ticks += 1;
      const progressPercent = Math.min(99, Math.round((ticks / totalTicks) * 100));
      const seconds = Math.min(48, Math.round((ticks * intervalTickMs) / 1000));
      
      setBuildProgress(progressPercent);
      setBuildSecondsElapsed(seconds);

      const stepIdx = Math.min(
        buildMilestones.length - 1, 
        Math.floor((ticks / totalTicks) * buildMilestones.length)
      );
      setBuildStepIndex(stepIdx);

      if (ticks >= totalTicks) {
        clearInterval(interval);
        setBuildProgress(100);
        setTimeout(() => {
          store.activateInitialNiche(selectedNicheId, finalName, 'hybrid_monetized');
          confetti({ particleCount: 160, spread: 100, origin: { y: 0.5 } });
          setIsBuilding(false);
        }, 800);
      }
    }, intervalTickMs);
  };

  // ==========================================
  // 2. INTERACTIVE AI TOOLS SANDBOX STATE (FE)
  // ==========================================
  const activeTools = activeWs?.tools || selectedPackage?.toolBlueprints || [];
  const [selectedToolIndex, setSelectedToolIndex] = useState<number>(0);
  const currentTool = activeTools[selectedToolIndex] || activeTools[0];

  // Sandbox inputs
  const [sandboxArea, setSandboxArea] = useState<number>(1450);
  const [sandboxGrade, setSandboxGrade] = useState<'budget' | 'standard' | 'premium'>('standard');
  const [sandboxRegional, setSandboxRegional] = useState<number>(1.15);

  const gradeMultiplier = sandboxGrade === 'budget' ? 0.75 : sandboxGrade === 'premium' ? 1.5 : 1.0;
  const rawMaterials = Math.round(sandboxArea * 26 * gradeMultiplier * sandboxRegional);
  const tradeLabor = Math.round(sandboxArea * 20 * gradeMultiplier * sandboxRegional);
  const contingency = Math.round((rawMaterials + tradeLabor) * 0.10);
  const totalCalculated = rawMaterials + tradeLabor + contingency;
  const readinessScore = Math.min(99, Math.round(88 + ((sandboxArea * 3) % 11)));

  // ==========================================
  // 3. 1-INTO-7 REPURPOSING STATE (OTO 1)
  // ==========================================
  const activeArticles = activeWs?.contentAssets || [];
  const [repurposeArticleIndex, setRepurposeArticleIndex] = useState<number>(0);
  const [repurposeFormat, setRepurposeFormat] = useState<
    'linkedin' | 'twitter' | 'youtube' | 'email' | 'reddit' | 'infographic' | 'press'
  >('linkedin');

  const selectedRepurposeArticle = activeArticles[repurposeArticleIndex] || activeArticles[0];

  const getRepurposePreview = () => {
    const title = selectedRepurposeArticle?.title || 'Authority Guide';
    const cleanTitle = title.replace(/^[^:]+:\s*/, '');

    switch (repurposeFormat) {
      case 'linkedin':
        return `📊 SLIDE CAROUSEL BRIEF: ${cleanTitle}\n\nSlide 1 (Hook): Why 85% of people overpay for ${cleanTitle} (and the exact numbers they miss).\nSlide 2 (Mistake): Trusting contractor guesswork instead of mathematical unit standards.\nSlide 3 (The Formula): Base materials + local labor index + 10% safety buffer.\nSlide 4 (Action): Run your exact numbers through our interactive AI tool.\nSlide 5 (CTA): Link in comments to download the free 24-page playbook.`;
      case 'twitter':
        return `🧵 1/7: Most people get ripped off because they don't know the baseline formula for ${cleanTitle}.\n\nHere is the exact cost breakdown you need before signing any quotes 🧵👇\n\n2/7: Rule #1: Never accept a lump-sum bid without itemized unit allowances.\n3/7: Raw materials account for roughly 55% of the total budget.\n4/7: Always allocate a 10% contingency for structural surprises.\n5/7: Run your numbers directly in our free interactive AI tool.\n6/7: Bookmark this thread for your next project.\n7/7: Download the complete playbook for free: [Link]`;
      case 'youtube':
        return `🎬 60-SECOND SHORTS / REEL SCRIPT: ${cleanTitle}\n\n[0-3s HOOK]: "Stop! Before you spend a single dollar on ${cleanTitle}, watch this."\n[3-15s PROBLEM]: "Contractors love charging a 40% markup on standard materials. Here is how you spot it in 30 seconds."\n[15-40s SOLUTION]: "Step 1: Get the square footage. Step 2: Multiply by our verified trade index. Step 3: Add exactly 10% for freight and buffer."\n[40-60s CTA]: "Don't guess. Use our free interactive AI tool linked in the bio right now."`;
      case 'email':
        return `Subject: The math behind ${cleanTitle} (avoid this 40% mistake)\n\nHey friend,\n\nWhen most people start looking into ${cleanTitle}, they assume the first quote they receive is the industry standard.\n\nIt almost never is.\n\nWe just published a verified trade breakdown that reveals the exact unit rates, labor indexes, and material allowances for 2026.\n\n👉 Click here to calculate your numbers in our free interactive AI tool: [Link]\n\nTo your success,\n${activeWs?.name || 'Authority Team'}`;
      case 'reddit':
        return `r/HomeImprovement - Helpful Answer on ${cleanTitle}\n\n"Saw a lot of people asking about fair pricing for this. Here's the verified breakdown we use to audit bids:\n\n- Baseline material allowance: $26-$38 per unit\n- Certified trade labor: $20-$32 per unit\n- Buffer factor: 10% mandatory\n\nI built a free interactive AI tool that calculates this without any vendor markup if anyone wants to run their specs: [Link]. Hope it helps someone save money!"`;
      case 'infographic':
        return `📌 INFOGRAPHIC BULLET POINTS: ${cleanTitle}\n\n• Pillar 1: 55% Raw Material Allocation\n• Pillar 2: 35% Certified Trade Labor Allowance\n• Pillar 3: 10% Mandatory Structural Contingency Buffer\n• Average Consumer Savings with Pre-Planning: $3,200\n• Verified Benchmark Source: 2026 Trade Quality Index`;
      case 'press':
        return `FOR IMMEDIATE RELEASE\n\n${activeWs?.name || 'Authority Studio'} Announces Turnkey AI Decision Suite for ${cleanTitle}\n\nNew interactive web tools and verified trade guides empower consumers and commercial buyers to audit pricing benchmarks with zero vendor markup.`;
      default:
        return '';
    }
  };

  // ==========================================
  // 4. TRAFFIC SWIPES FILTER (OTO 1)
  // ==========================================
  const [trafficFilter, setTrafficFilter] = useState<'All' | 'Reddit' | 'Quora' | 'LinkedIn' | 'Facebook Groups'>('All');
  const filteredSwipes = TRAFFIC_SWIPES_50.filter(s => trafficFilter === 'All' || s.platform === trafficFilter).slice(0, 4);

  // 24-Hour Checklist state
  const [checklistState, setChecklistState] = useState<Record<number, boolean>>({ 0: true, 1: true });

  // ==========================================
  // 5. 1-CLICK CLONER STATE (OTO 2)
  // ==========================================
  const [cloneTargetNiche, setCloneTargetNiche] = useState<string>('home-improvement');
  const [cloneNameInput, setCloneNameInput] = useState<string>('Apex Home Remodeling Pro');
  const [isCloning, setIsCloning] = useState<boolean>(false);
  const [cloneProgress, setCloneProgress] = useState<number>(0);

  const handleCloneBusiness = () => {
    setIsCloning(true);
    setCloneProgress(0);

    const interval = setInterval(() => {
      setCloneProgress(prev => {
        if (prev >= 95) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 1200);

    setTimeout(() => {
      clearInterval(interval);
      store.activateInitialNiche(cloneTargetNiche, cloneNameInput, 'hybrid_monetized');
      setIsCloning(false);
      confetti({ particleCount: 120, spread: 80 });
    }, 14000); // 14 seconds serious cloning sequence
  };

  // ==========================================
  // 6. CLIENT PROPOSAL GENERATOR (OTO 3)
  // ==========================================
  const [clientCompanyInput, setClientCompanyInput] = useState('Apex Roofing & Remodeling');
  const [clientContactInput, setClientContactInput] = useState('David Miller');
  const [clientCityInput, setClientCityInput] = useState('Austin, TX');
  const [proposalRate, setProposalRate] = useState<number>(2500);

  const generatedProposalText = `COMMERCIAL CLIENT PROPOSAL: TURNKEY AUTHORITY HUB & AI TOOLS

Client: ${clientContactInput} (${clientCompanyInput})
Location: ${clientCityInput}
Investment Package: $${proposalRate.toLocaleString()} Setup + Hosting

DELIVERABLES INCLUDED:
1. Complete 11-Page Responsive Authority Website with Branded Identity
2. 8 Interactive AI Sizing & Cost Calculators (Built specifically for ${clientCityInput} customers)
3. 40 High-Ranking SEO Pillar Guides for Google Search Lead Generation
4. High-Converting Lead Magnet Playbook & 5-Day Automated Email Sequence
5. 100% Commercial Resell & Exclusive Local Territory License

ESTIMATED VALUE: $8,500 | CLIENT RATE: $${proposalRate.toLocaleString()}`;

  // Current view suite: uses currentPlan or activeSuite
  const currentViewTier = activeSuite || currentPlan;

  return (
    <div className="space-y-8 sm:space-y-10 animate-in fade-in duration-150 max-w-full overflow-x-hidden">
      
      {/* ============================================================== */}
      {/* 1. TOP 2-STEP BUSINESS LAUNCHER (PERMANENTLY AT THE TOP) */}
      {/* ============================================================== */}
      <div className="bg-gradient-to-br from-white via-white to-blue-50/30 border border-slate-200/90 border-t-2 border-t-blue-600 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-visible space-y-6 z-20">
        
        {/* Launcher Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 shrink-0">
              <RocketLaunch weight="duotone" className="w-5 h-5 text-white" />
            </span>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-display">
                {activeWs ? 'Launch Another Turnkey Business' : 'Pick a Niche. Launch Your Turnkey Business.'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {activeWs ? 'Deploy an additional business or switch target markets in seconds.' : 'Select a profitable market and enter your business name below.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50/90 text-blue-700 border border-blue-200/70 text-xs font-bold font-mono">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              AI Engine Ready
            </span>
          </div>
        </div>

        {/* The 2-Step Creator Inputs OR Serious ~50-Second AI Console */}
        <div className="pt-4 border-t border-slate-100 space-y-5 animate-in fade-in duration-150">
          {isBuilding ? (
            /* The Serious ~50-Second AI Architecture Console */
            <div className="py-8 px-6 sm:px-10 text-center space-y-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 max-w-xl mx-auto space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-mono font-bold">
                  <Cpu className="w-3.5 h-3.5 text-blue-400 animate-spin" />
                  <span>Deep AI Architecture Engine Active</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
                  Building Your Turnkey Business: {businessNameInput}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-400">
                  {buildMilestones[buildStepIndex].detail}
                </p>

                {/* Progress Bar & Countdown Meter */}
                <div className="pt-2 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-blue-400 font-bold">
                      {buildProgress}% Complete
                    </span>
                    <span className="text-slate-400">
                      Elapsed: <strong className="text-white">{buildSecondsElapsed}s</strong> / ~48s (Deep AI Synthesis)
                    </span>
                  </div>

                  <div className="h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${buildProgress}%` }}
                    />
                  </div>
                </div>

                {/* 8 Live Transparent Milestones */}
                <div className="pt-4 text-left grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-48 overflow-y-auto">
                  {buildMilestones.map((m, idx) => {
                    const isDone = idx < buildStepIndex;
                    const isCurrent = idx === buildStepIndex;

                    return (
                      <div 
                        key={idx}
                        className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs transition-all ${
                          isDone 
                            ? 'bg-slate-900/90 border-emerald-500/40 text-emerald-300' 
                            : isCurrent 
                              ? 'bg-blue-950/80 border-blue-500/50 text-white font-bold ring-1 ring-blue-500/30' 
                              : 'bg-slate-900/40 border-slate-800 text-slate-500'
                        }`}
                      >
                        {isDone ? (
                          <PhCheckCircle weight="fill" className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : isCurrent ? (
                          <Loader2 className="w-4 h-4 text-blue-400 animate-spin shrink-0" />
                        ) : (
                          <span className="w-4 h-4 rounded-full border border-slate-700 text-[10px] font-mono flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                        )}
                        <span className="truncate">{m.title}</span>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-end">
              {/* Step 1: Niche Selector Dropdown */}
              <div className="md:col-span-5 space-y-2 relative" ref={nicheDropdownRef}>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 font-display">
                    Step 1: Select Your Market ({allowedNicheCount} Available)
                  </label>
                  <span className="text-[10px] font-medium text-slate-400 font-mono">Turnkey Niche</span>
                </div>

                <button
                  type="button"
                  onClick={() => setNicheDropdownOpen(!nicheDropdownOpen)}
                  className="w-full px-4 py-3 text-xs font-semibold rounded-xl border border-slate-300 bg-white text-slate-900 hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all flex items-center justify-between text-left shadow-2xs cursor-pointer min-h-[44px]"
                  aria-haspopup="listbox"
                  aria-expanded={nicheDropdownOpen}
                >
                  <div className="min-w-0 pr-2">
                    <div className="font-bold text-slate-900 truncate">
                      {selectedPackage ? selectedPackage.name : 'Select a Market'}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono truncate mt-0.5">
                      {selectedPackage?.category || 'Turnkey'} &bull; 8 AI Tools &bull; 40 Authority Guides
                    </div>
                  </div>
                  <PhCaretDown weight="bold" className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${nicheDropdownOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>

                {nicheDropdownOpen && (
                  <div className="absolute left-0 top-full mt-2 w-full bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 max-h-72 overflow-y-auto animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-2.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <span>Available Markets ({availableNiches.length})</span>
                      <span className="text-blue-600 font-mono font-bold">Turnkey Ready</span>
                    </div>
                    <div className="divide-y divide-slate-100">
                      {availableNiches.map(pkg => {
                        const isSelected = pkg.id === selectedNicheId;
                        return (
                          <button
                            key={pkg.id}
                            type="button"
                            onClick={() => {
                              handleNicheChange(pkg.id);
                              setNicheDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-left transition-colors flex items-center justify-between gap-3 cursor-pointer ${
                              isSelected 
                                ? 'bg-blue-50/90 text-blue-950 font-bold' 
                                : 'hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className="min-w-0">
                              <div className={`text-xs ${isSelected ? 'font-black text-blue-900' : 'font-bold text-slate-800'}`}>
                                {pkg.name}
                              </div>
                              <div className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                                {pkg.category} &bull; 8 AI Tools &bull; 40 Guides
                              </div>
                            </div>
                            {isSelected && (
                              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                                <PhCheck weight="bold" className="w-3 h-3" />
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setMarketIntelOpen(true);
                    setDossierTab('case-study');
                  }}
                  className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer pt-0.5"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>Inspect Market Proof &amp; Case Study for {selectedPackage ? selectedPackage.name : 'this niche'}</span>
                </button>
              </div>

              {/* Step 2: Business Name Input */}
              <div className="md:col-span-4 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 font-display">
                    Step 2: Business Name
                  </label>
                  <button
                    type="button"
                    onClick={handleCycleSuggestion}
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ArrowsClockwise weight="bold" className="w-3.5 h-3.5" />
                    <span>Suggest Name</span>
                  </button>
                </div>
                <input
                  type="text"
                  required
                  value={businessNameInput}
                  onChange={(e) => setBusinessNameInput(e.target.value)}
                  placeholder="e.g. NextGen AI Tools"
                  className="w-full px-4 py-3 text-xs font-semibold rounded-xl border border-slate-300 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-2xs min-h-[44px]"
                />
              </div>

              {/* Step 3: Launch Button */}
              <div className="md:col-span-3">
                <button
                  onClick={handleLaunch}
                  disabled={isBuilding}
                  className="w-full py-3 px-4 text-xs font-black rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-500 hover:via-indigo-500 hover:to-blue-600 text-white shadow-md shadow-indigo-500/20 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer font-display tracking-tight min-h-[44px]"
                >
                  <span>Launch Business</span>
                  <RocketLaunch weight="bold" className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* ============================================================== */}
      {/* 2. ZERO STATE (SHOWN ONLY IF NO BUSINESS IS GENERATED YET) */}
      {/* ============================================================== */}
      {!activeWs && (
        <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
              Clean Canvas &bull; 0 Businesses Active
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight font-display">
              No Business Launched Yet
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Pick your target market above and click <strong>Launch Business</strong> to deploy your complete website, 8 AI tools, and 40 guides in seconds.
            </p>
          </div>

          {/* 4 Infrastructure Pillar Preview Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                8
              </div>
              <h3 className="text-xs font-bold text-slate-900 font-display">Interactive AI Tools</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Smart calculation models with live sliders and instant browser results.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                40
              </div>
              <h3 className="text-xs font-bold text-slate-900 font-display">Authority SEO Guides</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Comprehensive articles, buyer comparisons, and price breakdowns.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                11
              </div>
              <h3 className="text-xs font-bold text-slate-900 font-display">Responsive Website Pages</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Home, AI tools hub, articles directory, comparisons, free playbook, and legal pages.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs">
                🎁
              </div>
              <h3 className="text-xs font-bold text-slate-900 font-display">Lead Playbook & Emails</h3>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Pre-written lead magnet playbook and 5-day automated welcome email sequence.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 3. ACTIVE BUSINESS MISSION CONTROL HEADER */}
      {/* ============================================================== */}
      {activeWs && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-white via-white to-blue-50/25 border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-mono">
                  <span className="font-bold text-blue-600 uppercase tracking-wider">
                    {activeWs.nichePackageId.replace('-', ' ')}
                  </span>
                  <span>&bull;</span>
                  <span className="capitalize">{activeWs.businessModel.replace('_', ' ')}</span>
                  <span>&bull;</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-600 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Live & Fully Operational
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-display">
                  {activeWs.name}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {activeWs.brandProfile.mission || 'Complete turnkey authority business loaded with 40 articles, 8 interactive AI tools, and an 11-page website.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 shrink-0">
                <button
                  onClick={() => onNavigateTab('website')}
                  className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl transition-all shadow-2xs hover:-translate-y-0.5 font-display min-h-[44px]"
                >
                  <Browsers weight="duotone" className="w-4 h-4 text-blue-600" />
                  <span>View 11-Page Website</span>
                </button>
                <button
                  onClick={() => onNavigateTab('tools')}
                  className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/90 rounded-xl transition-all shadow-2xs hover:-translate-y-0.5 font-display min-h-[44px]"
                >
                  <Cpu className="w-4 h-4 text-blue-600" />
                  <span>Run 8 AI Tools</span>
                </button>
                <button
                  onClick={onExportZip}
                  className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-slate-950 hover:bg-slate-800 rounded-xl shadow-sm transition-all hover:-translate-y-0.5 font-display min-h-[44px]"
                >
                  <DownloadSimple weight="bold" className="w-4 h-4" />
                  <span>Download Business ZIP</span>
                </button>
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* 3B. COMPREHENSIVE MARKET NICHE INTEL & MINI CASE STUDY DOSSIER */}
          {/* ============================================================== */}
          {activeDossier && (
            <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-sm transition-all">
              {/* Collapsible Trigger Header */}
              <button
                type="button"
                onClick={() => setMarketIntelOpen(!marketIntelOpen)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-slate-50/80 transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 shrink-0 group-hover:scale-105 transition-transform">
                    <Lightbulb className="w-5 h-5 text-amber-300" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm sm:text-base font-black text-slate-900 font-display">
                        Market Niche Intel &amp; Real-World Case Study: Proof Without Doubt
                      </span>
                      <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                        {activeDossier.caseStudy.provenMonthlyRevenue} Verified Model
                      </span>
                      <span className="hidden md:inline-flex text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        {activeDossier.marketMetrics.monthlySearchVolume.split(' ')[0]} Searches/mo
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-3xl">
                      Exhaustive commercial audit: Verified search demand, high-CPC metrics, customer psychology triggers, unit economics, and the exact 4-stage funnel proving why this business succeeds.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-400 shrink-0 pl-3">
                  <span className="text-xs font-mono font-bold hidden sm:inline text-blue-600 group-hover:text-blue-700">
                    {marketIntelOpen ? 'Close Dossier' : 'Inspect Case Study & Proof'}
                  </span>
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    {marketIntelOpen ? (
                      <PhCaretUp weight="bold" className="w-4 h-4" />
                    ) : (
                      <PhCaretDown weight="bold" className="w-4 h-4" />
                    )}
                  </div>
                </div>
              </button>

              {/* Dossier Expanded Contents */}
              {marketIntelOpen && (
                <div className="border-t border-slate-100 animate-in fade-in duration-200 divide-y divide-slate-100">
                  
                  {/* Top Key Metric Bar (Proof at a Glance) */}
                  <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-blue-950 text-white p-5 sm:p-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      
                      {/* Metric 1: Total Market */}
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                          Total Addressable Market
                        </span>
                        <div className="text-base sm:text-lg font-black text-white font-display">
                          {activeDossier.marketMetrics.totalAddressableMarket.split(' ')[0]} {activeDossier.marketMetrics.totalAddressableMarket.split(' ')[1]}
                        </div>
                        <div className="text-[11px] font-medium text-emerald-400">
                          {activeDossier.marketMetrics.annualGrowthRate}
                        </div>
                      </div>

                      {/* Metric 2: Monthly Search Demand */}
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                          Verified Search Demand
                        </span>
                        <div className="text-base sm:text-lg font-black text-white font-display">
                          {activeDossier.marketMetrics.monthlySearchVolume.split(' ')[0]}
                        </div>
                        <div className="text-[11px] font-medium text-blue-300">
                          Across 40 Pillar Keywords
                        </div>
                      </div>

                      {/* Metric 3: Commercial CPC Advertisers Pay */}
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                          Google Commercial CPC
                        </span>
                        <div className="text-base sm:text-lg font-black text-amber-300 font-display">
                          {activeDossier.marketMetrics.averageCommercialCpc.split(' ')[0]} – {activeDossier.marketMetrics.averageCommercialCpc.split(' ')[2]}
                        </div>
                        <div className="text-[11px] font-medium text-slate-300">
                          High Commercial Intent
                        </div>
                      </div>

                      {/* Metric 4: Case Study Proven Run-Rate */}
                      <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 space-y-1">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                          Proven Case Study Run-Rate
                        </span>
                        <div className="text-base sm:text-lg font-black text-emerald-400 font-display">
                          {activeDossier.caseStudy.provenMonthlyRevenue.split(' ')[0]}
                        </div>
                        <div className="text-[11px] font-medium text-slate-300">
                          {activeDossier.caseStudy.trafficVolume.split(' ')[0]} Mo. Visitors
                        </div>
                      </div>

                    </div>

                    {/* Executive Summary Paragraph & Copy Button */}
                    <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <p className="text-slate-300 leading-relaxed max-w-4xl">
                        <strong className="text-white">Executive Thesis:</strong> {activeDossier.executiveSummary}
                      </p>
                      <button
                        type="button"
                        onClick={handleCopyCaseStudy}
                        className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors shadow-sm cursor-pointer self-start sm:self-auto"
                      >
                        <Copy className="w-3.5 h-3.5" />
                        <span>{copiedKey === 'case-study-dossier' ? 'Copied Full Dossier!' : 'Copy Executive Dossier'}</span>
                      </button>
                    </div>
                  </div>

                  {/* 6 Sub-Navigation Dossier Tabs */}
                  <div className="px-5 pt-3 bg-slate-50/70 border-b border-slate-200/80 overflow-x-auto scrollbar-none">
                    <div className="flex items-center gap-1.5 min-w-max pb-3">
                      {[
                        { key: 'case-study', label: '1. Real-World Case Study', icon: FileText },
                        { key: 'market-proof', label: '2. Market Demand & CPC Proof', icon: TrendingUp },
                        { key: 'psychology', label: '3. Customer Psychology', icon: Users },
                        { key: 'monetization', label: '4. Monetization & Unit Economics', icon: DollarSign },
                        { key: 'moat', label: '5. Competitive Moat (Old vs New)', icon: PhShieldCheck },
                        { key: 'traffic', label: '6. 7-Day Traffic Launch', icon: RocketLaunch }
                      ].map(tab => {
                        const isActive = dossierTab === tab.key;
                        const IconComponent = tab.icon;
                        return (
                          <button
                            key={tab.key}
                            type="button"
                            onClick={() => setDossierTab(tab.key as any)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                              isActive
                                ? 'bg-white text-blue-900 border border-slate-200/90 shadow-2xs'
                                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                            }`}
                          >
                            <IconComponent className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                            <span>{tab.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* TAB 1: REAL-WORLD MINI CASE STUDY */}
                  {dossierTab === 'case-study' && (
                    <div className="p-6 sm:p-8 space-y-6">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-white to-blue-50/80 border border-emerald-200/80">
                        <div className="space-y-1">
                          <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                            Verified Commercial Model
                          </span>
                          <h3 className="text-base sm:text-lg font-black text-slate-900 font-display">
                            {activeDossier.caseStudy.caseStudyTitle}
                          </h3>
                          <p className="text-xs text-slate-600">
                            <strong>Operator Profile:</strong> {activeDossier.caseStudy.operatorProfile} &bull; <strong>Traffic Scale:</strong> {activeDossier.caseStudy.trafficVolume}
                          </p>
                        </div>
                        <div className="text-left lg:text-right shrink-0">
                          <div className="text-2xl font-black font-mono text-emerald-700">
                            {activeDossier.caseStudy.provenMonthlyRevenue}
                          </div>
                          <span className="text-[11px] text-slate-500 font-medium">Net Monthly Run-Rate</span>
                        </div>
                      </div>

                      {/* The 4 Funnel Stages */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                          The 4-Stage Conversion &amp; Cashflow Funnel
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                          {activeDossier.caseStudy.funnelStages.map((stage, idx) => (
                            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2 relative">
                              <div className="flex items-center justify-between">
                                <span className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 font-mono text-xs font-bold flex items-center justify-center">
                                  {idx + 1}
                                </span>
                                <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                                  {stage.metric}
                                </span>
                              </div>
                              <h5 className="text-xs font-bold text-slate-900 font-display">
                                {stage.title}
                              </h5>
                              <p className="text-[11px] text-slate-600 leading-relaxed">
                                {stage.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Revenue Streams Breakdown */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                          Verified Revenue Stream Breakdown ({activeDossier.caseStudy.provenMonthlyRevenue})
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          {activeDossier.caseStudy.breakdownByStream.map((stream, idx) => (
                            <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-900 font-display">
                                  {stream.stream}
                                </span>
                                <span className="text-sm font-black font-mono text-emerald-600">
                                  {stream.amount}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed">
                                <strong>Partner Source:</strong> {stream.source}
                              </p>
                              <div className="text-[11px] text-blue-700 font-mono bg-blue-50/70 px-2.5 py-1 rounded-lg border border-blue-100">
                                📈 <strong>Conversion Metric:</strong> {stream.conversionRate}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Case Study Key Takeaway */}
                      <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-amber-950 font-display">The Definitive Takeaway</span>
                          <p className="text-xs text-amber-900 leading-relaxed">
                            {activeDossier.caseStudy.keyTakeaway}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: MARKET DEMAND & SEARCH PROOF */}
                  {dossierTab === 'market-proof' && (
                    <div className="p-6 sm:p-8 space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                            Total Addressable Market Sizing
                          </span>
                          <h4 className="text-lg font-black text-slate-900 font-display">
                            {activeDossier.marketMetrics.totalAddressableMarket}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Expanding at a compounding <strong>{activeDossier.marketMetrics.annualGrowthRate}</strong>. Influx of capital into this vertical guarantees massive, sustained commercial advertiser demand.
                          </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                            Search Demand Across 40 Pillar Keywords
                          </span>
                          <h4 className="text-lg font-black text-slate-900 font-display">
                            {activeDossier.marketMetrics.monthlySearchVolume}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            These are high-intent searchers actively looking for cost calculations, specifications, and purchase comparisons—not casual window shoppers.
                          </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                            Google Commercial Cost-Per-Click (CPC)
                          </span>
                          <h4 className="text-lg font-black text-amber-600 font-display">
                            {activeDossier.marketMetrics.averageCommercialCpc}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Google Ads data confirms companies pay up to {activeDossier.marketMetrics.averageCommercialCpc.split(' ')[2]} for a single click in this category. Our organic authority site captures this exact high-value traffic for free.
                          </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                            Competitor Vulnerabilities
                          </span>
                          <h4 className="text-lg font-black text-rose-600 font-display">
                            {activeDossier.marketMetrics.competitionVulnerability}
                          </h4>
                          <p className="text-xs text-slate-600 leading-relaxed">
                            Incumbent blogs rely on slow, wall-of-text WordPress templates. Visitors bounce within 40 seconds. Our 8 interactive AI tools give your property an unassailable engagement advantage.
                          </p>
                        </div>
                      </div>

                      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 leading-relaxed flex items-center gap-3">
                        <PhShieldCheck weight="bold" className="w-5 h-5 text-blue-600 shrink-0" />
                        <div>
                          <strong>Verified Buyer Intent Rating: {activeDossier.marketMetrics.buyerIntentScore}</strong>. Over 90% of searches in this market represent transactional research directly preceding a commercial checkout or contract signature.
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 3: CUSTOMER PSYCHOLOGY & BURNING PAIN */}
                  {dossierTab === 'psychology' && (
                    <div className="p-6 sm:p-8 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-900 font-display">
                            <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-mono">1</span>
                            <span>Target Customer Avatar</span>
                          </div>
                          <p className="text-xs font-bold text-slate-800">
                            {activeDossier.customerPsychology.targetAvatar}
                          </p>
                          <p className="text-xs text-slate-500">
                            <strong>Budget Profile:</strong> {activeDossier.customerPsychology.householdIncomeOrBudget}
                          </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-rose-950 font-display">
                            <span className="w-5 h-5 rounded-md bg-rose-200 text-rose-800 flex items-center justify-center text-[10px] font-mono">2</span>
                            <span>The &quot;Bleeding-Neck&quot; Pain Point</span>
                          </div>
                          <p className="text-xs text-rose-900 leading-relaxed">
                            {activeDossier.customerPsychology.bleedingNeckPain}
                          </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-amber-950 font-display">
                            <span className="w-5 h-5 rounded-md bg-amber-200 text-amber-800 flex items-center justify-center text-[10px] font-mono">3</span>
                            <span>The Urgent Trigger Event</span>
                          </div>
                          <p className="text-xs text-amber-900 leading-relaxed">
                            {activeDossier.customerPsychology.triggerEvent}
                          </p>
                        </div>

                        <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-2">
                          <div className="flex items-center gap-2 text-xs font-bold text-emerald-950 font-display">
                            <span className="w-5 h-5 rounded-md bg-emerald-200 text-emerald-800 flex items-center justify-center text-[10px] font-mono">4</span>
                            <span>Why Interactive Calculators Demolish Doubt</span>
                          </div>
                          <p className="text-xs text-emerald-900 leading-relaxed">
                            {activeDossier.customerPsychology.whyCalculatorsWin}
                          </p>
                        </div>
                      </div>

                      {/* Objections Handled */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                          How This Website Neutralizes the 2 Critical Customer Objections
                        </h4>
                        <div className="space-y-3">
                          {activeDossier.customerPsychology.objectionsResolved.map((item, idx) => (
                            <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1.5">
                              <div className="flex items-center gap-2 text-xs font-bold text-rose-700">
                                <span>❓ Buyer Objection:</span>
                                <span>&quot;{item.objection}&quot;</span>
                              </div>
                              <div className="flex items-start gap-2 text-xs text-slate-700 pl-4 border-l-2 border-emerald-500">
                                <span className="font-bold text-emerald-700 shrink-0">✓ How We Solve It:</span>
                                <span>{item.howOurSiteSolvesIt}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 4: MONETIZATION & UNIT ECONOMICS */}
                  {dossierTab === 'monetization' && (
                    <div className="p-6 sm:p-8 space-y-6">
                      {/* Top Affiliate Programs */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                            High-Paying Affiliate Programs in This Niche
                          </h4>
                          <span className="text-[11px] text-slate-400 font-mono">Pre-Configured Hooks</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                          {activeDossier.monetizationProof.primaryAffiliatePrograms.map((prog, idx) => (
                            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                              <span className="text-xs font-bold text-slate-900 block font-display truncate">
                                {prog.name}
                              </span>
                              <div className="space-y-1 text-xs">
                                <div className="text-emerald-700 font-bold font-mono">
                                  {prog.averagePayout}
                                </div>
                                <div className="text-slate-500 text-[11px]">
                                  {prog.commissionRate}
                                </div>
                                <div className="text-[10px] text-slate-400 font-mono">
                                  Cookie: {prog.cookieDuration}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Unit Economics Matrix */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                            Lead Value (CPL)
                          </span>
                          <div className="text-base font-black text-slate-900 font-display">
                            {activeDossier.monetizationProof.leadGenValuePerLead}
                          </div>
                          <p className="text-[11px] text-slate-500">
                            Paid by verified local businesses or SaaS providers per quote request.
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                            Tool Sponsorship Rate Card
                          </span>
                          <div className="text-base font-black text-slate-900 font-display">
                            {activeDossier.monetizationProof.toolSponsorRateCard}
                          </div>
                          <p className="text-[11px] text-slate-500">
                            Monthly flat recurring sponsorship fee per calculator banner.
                          </p>
                        </div>

                        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
                          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                            Digital Product Margin
                          </span>
                          <div className="text-base font-black text-emerald-600 font-display">
                            {activeDossier.monetizationProof.digitalProductPricing}
                          </div>
                          <p className="text-[11px] text-slate-500">
                            100% net margin on the included PDF playbook and Excel templates.
                          </p>
                        </div>
                      </div>

                      {/* Monthly Revenue Ramp */}
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                          Realistic 12-Month Revenue Scaling Horizon
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                          {activeDossier.monetizationProof.monthlyRevenueRamp.map((ramp, idx) => (
                            <div key={idx} className="p-4 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/40 border border-slate-200 space-y-2">
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-blue-900 font-display">{ramp.phase}</span>
                                <span className="text-[10px] font-mono font-bold text-slate-500">{ramp.timeline}</span>
                              </div>
                              <div className="text-lg font-black font-mono text-emerald-600">
                                {ramp.expectedRevenue}
                              </div>
                              <p className="text-[11px] text-slate-600 leading-snug">
                                {ramp.focus}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 5: COMPETITIVE MOAT (OLD VS NEW) */}
                  {dossierTab === 'moat' && (
                    <div className="p-6 sm:p-8 space-y-6">
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                          The Head-to-Head Comparison: Why Legacy Sites Lose &amp; Authority Studio Wins
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          
                          {/* The Old Way */}
                          <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-3">
                            <div className="flex items-center gap-2 text-rose-900 font-bold font-display text-xs">
                              <span className="w-5 h-5 rounded-full bg-rose-200 text-rose-800 flex items-center justify-center font-bold text-[10px]">&times;</span>
                              <span>The Old Way (Legacy WordPress Blogs)</span>
                            </div>
                            <ul className="space-y-2 text-xs text-rose-950">
                              {activeDossier.competitiveMoat.oldWayFlaws.map((flaw, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-rose-500 font-bold">&times;</span>
                                  <span className="leading-snug">{flaw}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="pt-2 border-t border-rose-200 text-[11px] font-mono text-rose-800">
                              Average Dwell Time: <strong>38 seconds (82% bounce rate)</strong>
                            </div>
                          </div>

                          {/* The Authority Studio Way */}
                          <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
                            <div className="flex items-center gap-2 text-emerald-900 font-bold font-display text-xs">
                              <span className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center font-bold text-[10px]">&check;</span>
                              <span>The Authority Studio Way (Interactive Turnkey Hub)</span>
                            </div>
                            <ul className="space-y-2 text-xs text-emerald-950">
                              {activeDossier.competitiveMoat.authorityStudioAdvantage.map((adv, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <span className="text-emerald-600 font-bold">&check;</span>
                                  <span className="leading-snug">{adv}</span>
                                </li>
                              ))}
                            </ul>
                            <div className="pt-2 border-t border-emerald-200 text-[11px] font-mono text-emerald-800">
                              Average Dwell Time: <strong>{activeDossier.competitiveMoat.dwellTimeMetric}</strong>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Google RankBrain Moat */}
                      <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900 to-indigo-950 text-white space-y-2">
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-300 font-mono">
                          <Cpu className="w-4 h-4 text-blue-400" />
                          <span>The Google RankBrain Algorithmic Moat</span>
                        </div>
                        <p className="text-xs text-slate-200 leading-relaxed">
                          {activeDossier.competitiveMoat.googleRankAdvantage} When visitors spend over 4 minutes dragging sliders, adjusting inputs, and calculating benchmarks, search engines categorize the property as the ultimate authoritative source, boosting organic rankings across all 40 pillar guides.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* TAB 6: 7-DAY TRAFFIC LAUNCH BLUEPRINT */}
                  {dossierTab === 'traffic' && (
                    <div className="p-6 sm:p-8 space-y-6">
                      {/* Subreddits & Quora */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                          <span className="text-xs font-bold text-slate-900 font-display flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                            <span>Target Reddit Communities ({activeDossier.nicheName})</span>
                          </span>
                          <ul className="space-y-1.5 text-xs text-slate-700">
                            {activeDossier.trafficActivation.primarySubreddits.map((sub, idx) => (
                              <li key={idx} className="p-2 rounded-xl bg-white border border-slate-200/80 font-mono text-[11px] font-bold text-slate-800 flex items-center justify-between">
                                <span>{sub}</span>
                                <span className="text-blue-600 font-normal">Active Audience</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                          <span className="text-xs font-bold text-slate-900 font-display flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            <span>High-Traffic Quora Query Clusters</span>
                          </span>
                          <ul className="space-y-1.5 text-xs text-slate-700">
                            {activeDossier.trafficActivation.quoraQueryClusters.map((q, idx) => (
                              <li key={idx} className="p-2 rounded-xl bg-white border border-slate-200/80 text-[11px] text-slate-700 leading-snug">
                                &quot;{q}&quot;
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Social Repurposing Hooks */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                          Pre-Tested Social Media Hooks for X &amp; LinkedIn Carousels
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                          {activeDossier.trafficActivation.socialHooks.map((hook, idx) => (
                            <div key={idx} className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200/70 space-y-2">
                              <span className="text-[10px] font-mono font-bold text-blue-700">Hook #{idx + 1}</span>
                              <p className="text-xs text-slate-800 font-medium leading-relaxed">
                                &quot;{hook}&quot;
                              </p>
                              <button
                                type="button"
                                onClick={() => copyToClipboard(`hook-${idx}`, hook)}
                                className="text-[11px] text-blue-600 hover:text-blue-700 font-bold flex items-center gap-1 cursor-pointer"
                              >
                                <Copy className="w-3 h-3" />
                                <span>{copiedKey === `hook-${idx}` ? 'Copied!' : 'Copy Hook'}</span>
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Fast-Track Action Steps */}
                      <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 font-mono">
                          <RocketLaunch weight="bold" className="w-4 h-4" />
                          <span>4-Day Fast-Track Launch Protocol</span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                          {activeDossier.trafficActivation.fastTrackActionSteps.map((step, idx) => (
                            <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
                              <span className="text-emerald-400 font-bold font-mono text-[10px]">Step {idx + 1}</span>
                              <p className="text-slate-300 leading-snug">{step}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ============================================================== */}
      {/* 4. WHAT YOUR BUSINESS IS WORTH (FINANCIAL DOLLARS & AUDIT) */}
      {/* ============================================================== */}
      {activeWs && (
        <div className="bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/20 rounded-3xl p-6 sm:p-8 border border-blue-200/80 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-blue-100 gap-4">
            <div>
              <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider block">
                Audited Commercial Valuation &amp; Financial Health
              </span>
              <h2 className="text-base sm:text-lg font-black text-slate-900 tracking-tight mt-0.5 font-display">
                What Your Business Is Worth
              </h2>
            </div>
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={onOpenAuditModal}
                className="text-xs font-mono bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 shadow-2xs transition-all cursor-pointer"
              >
                <PhShieldCheck weight="bold" className="w-4 h-4 text-emerald-600" />
                <span>View Verification Audit</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-5">
            {/* Tile 1: Business Valuation */}
            <div className="bg-white/95 border border-blue-100 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-1.5 hover:border-emerald-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 font-display">Estimated Valuation</span>
                <span className="text-[9px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">Audited</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-600 tabular-nums tracking-tight">
                $5,850 – $11,200
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">Based on 40 SEO guides, 8 AI tools &amp; website IP</p>
            </div>

            {/* Tile 2: Monthly Affiliate Potential */}
            <div className="bg-white/95 border border-blue-100 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-1.5 hover:border-blue-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 font-display">Monthly Affiliate Potential</span>
                <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200/60">5 Offers</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-blue-600 tabular-nums tracking-tight">
                $1,250 – $3,800/mo
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">Pre-wired affiliate payouts paying $85–$350 per sale</p>
            </div>

            {/* Tile 3: AI Tool Sponsorship Earning */}
            <div className="bg-white/95 border border-blue-100 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-1.5 hover:border-amber-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 font-display">Sponsorship Potential</span>
                <span className="text-[9px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200/60">8 Tools</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-amber-600 tabular-nums tracking-tight">
                $250 – $500/mo
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">Rate card value to sponsor banners on your AI tools</p>
            </div>

            {/* Tile 4: Audience Lead Equity */}
            <div className="bg-white/95 border border-blue-100 rounded-2xl p-4 sm:p-5 shadow-2xs space-y-1.5 hover:border-indigo-300 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-600 font-display">Audience Lead Equity</span>
                <span className="text-[9px] font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200/60">Funnel Live</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono text-indigo-600 tabular-nums tracking-tight">
                $1,050+
              </div>
              <p className="text-[11px] text-slate-500 leading-snug">Built from your free playbook &amp; 5-day email machine</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* 5. YOUR BUSINESS ARSENAL (AUDITED INVENTORY BAR) */}
      {/* ============================================================== */}
      {activeWs && (() => {
        const isUltimate = currentPlan === 'ULTIMATE';
        const isExtendedOrPro = currentPlan === 'EXTENDED' || currentPlan === 'PRO';
        const totalNiches = isUltimate ? 24 : isExtendedOrPro ? 10 : 5;

        return (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <div>
                <h2 className="text-sm font-black text-slate-900 tracking-tight font-display">
                  Your Turnkey Business Arsenal ({totalNiches} Niches Unlocked)
                </h2>
                <p className="text-xs text-slate-500">
                  Ready-to-use digital assets deployed for this business and available across your account.
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200 self-start sm:self-auto">
                {currentPlan} Plan Edition
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {/* Card 1: Interactive AI Tools */}
              <div 
                onClick={() => onNavigateTab('tools')}
                className="bg-white border border-slate-200/90 hover:border-blue-400 rounded-2xl p-4 sm:p-5 shadow-2xs cursor-pointer transition-all hover:shadow-xs group hover:-translate-y-0.5 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-0.5">
                  <span className="font-semibold text-slate-500 font-mono text-[11px]">Smart Tools</span>
                  <Cpu className="w-4 h-4 text-slate-400 group-hover:text-blue-600 transition-colors" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight tabular-nums">
                  8 Tools
                </div>
                <div className="text-xs font-bold text-slate-800 leading-tight font-display">
                  Interactive AI Tools
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold pt-0.5 flex items-center gap-1 font-mono">
                  <PhCheckCircle weight="fill" className="w-3.5 h-3.5" /> Live Production Ready
                </div>
              </div>

              {/* Card 2: Authority SEO Guides */}
              <div 
                onClick={() => onNavigateTab('content')}
                className="bg-white border border-slate-200/90 hover:border-indigo-400 rounded-2xl p-4 sm:p-5 shadow-2xs cursor-pointer transition-all hover:shadow-xs group hover:-translate-y-0.5 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-0.5">
                  <span className="font-semibold text-slate-500 font-mono text-[11px]">Google SEO</span>
                  <Article weight="duotone" className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-colors" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight tabular-nums">
                  40 Guides
                </div>
                <div className="text-xs font-bold text-slate-800 leading-tight font-display">
                  Authority SEO Guides
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold pt-0.5 flex items-center gap-1 font-mono">
                  <PhCheckCircle weight="fill" className="w-3.5 h-3.5" /> Complete Text Ready
                </div>
              </div>

              {/* Card 3: Website Pages */}
              <div 
                onClick={() => onNavigateTab('website')}
                className="bg-white border border-slate-200/90 hover:border-blue-400 rounded-2xl p-4 sm:p-5 shadow-2xs cursor-pointer transition-all hover:shadow-xs group hover:-translate-y-0.5 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-0.5">
                  <span className="font-semibold text-slate-500 font-mono text-[11px]">Website Architecture</span>
                  <Browsers weight="duotone" className="w-4 h-4 text-slate-400 group-hover:text-sky-600 transition-colors" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight tabular-nums">
                  11 Pages
                </div>
                <div className="text-xs font-bold text-slate-800 leading-tight font-display">
                  Website Pages Ready
                </div>
                <div className="text-[10px] text-blue-600 font-semibold pt-0.5 flex items-center gap-1 font-mono">
                  <PhCheck weight="bold" className="w-3.5 h-3.5" /> View Live Website
                </div>
              </div>

              {/* Card 4: Lead Magnet Playbook & Emails */}
              <div 
                onClick={() => onNavigateTab('lead_magnet')}
                className="bg-white border border-slate-200/90 hover:border-violet-400 rounded-2xl p-4 sm:p-5 shadow-2xs cursor-pointer transition-all hover:shadow-xs group hover:-translate-y-0.5 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-0.5">
                  <span className="font-semibold text-slate-500 font-mono text-[11px]">Email Funnel</span>
                  <EnvelopeSimple weight="duotone" className="w-4 h-4 text-slate-400 group-hover:text-violet-600 transition-colors" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight tabular-nums">
                  1 Playbook
                </div>
                <div className="text-xs font-bold text-slate-800 leading-tight font-display">
                  Lead Magnet &amp; 5 Emails
                </div>
                <div className="text-[10px] text-emerald-600 font-semibold pt-0.5 flex items-center gap-1 font-mono">
                  <PhCheckCircle weight="fill" className="w-3.5 h-3.5" /> 5-Day Autoresponder
                </div>
              </div>

              {/* Card 5: Social Traffic Posts */}
              <div 
                onClick={() => onNavigateTab('content')}
                className="bg-white border border-slate-200/90 hover:border-emerald-400 rounded-2xl p-4 sm:p-5 shadow-2xs cursor-pointer transition-all hover:shadow-xs group col-span-2 sm:col-span-1 hover:-translate-y-0.5 space-y-1.5"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-0.5">
                  <span className="font-semibold text-slate-500 font-mono text-[11px]">Social Traffic</span>
                  <ShareNetwork weight="duotone" className="w-4 h-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono tracking-tight tabular-nums">
                  100 Posts
                </div>
                <div className="text-xs font-bold text-slate-800 leading-tight font-display">
                  Social Promo Posts
                </div>
                <div className="text-[10px] text-blue-600 font-semibold pt-0.5 flex items-center gap-1 font-mono">
                  <PhCheck weight="bold" className="w-3.5 h-3.5" /> Copy &amp; Paste
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ============================================================== */}
      {/* 6. DEDICATED TIER WORKSPACE (NO INTRUSIVE TABS - 100% PURE WORKSPACE) */}
      {/* ============================================================== */}
      {activeWs && (
        <div className="space-y-6 pt-2">

          {/* ========================================================== */}
          {/* VIEW A: FE (CORE) DASHBOARD WORKSPACE */}
          {/* ========================================================== */}
          {currentViewTier === 'CORE' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              
              {/* Module 1: Interactive AI Tools Workstation (Run Live Calculations) */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider block">
                      Live AI Tool Workstation
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-display">
                      Interactive AI Tools Workstation
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Run calculations on any of your 8 smart AI tools with live sliders and grab the ready-to-embed code.
                    </p>
                  </div>

                  {/* Tool Selector Dropdown */}
                  <div className="flex items-center gap-2">
                    <select
                      value={selectedToolIndex}
                      onChange={(e) => setSelectedToolIndex(Number(e.target.value))}
                      className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      {activeTools.map((t, idx) => (
                        <option key={t.id || idx} value={idx}>
                          Tool #{idx + 1}: {t.title || `AI Tool ${idx + 1}`}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Sandbox Workstation */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Left Controls */}
                  <div className="lg:col-span-7 space-y-5 bg-slate-50 p-5 sm:p-6 rounded-2xl border border-slate-200/80">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700 font-display">{currentTool?.title || 'Smart Cost & Sizing Tool'}</span>
                      <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">Formula Verified</span>
                    </div>

                    {/* Slider 1: Sizing */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-slate-600">Project Sizing / Volume:</span>
                        <span className="font-mono font-bold text-slate-900">{sandboxArea.toLocaleString()} sq ft</span>
                      </div>
                      <input 
                        type="range"
                        min="400"
                        max="5000"
                        step="50"
                        value={sandboxArea}
                        onChange={(e) => setSandboxArea(Number(e.target.value))}
                        className="w-full accent-blue-600 cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>400 sq ft</span>
                        <span>2,500 sq ft</span>
                        <span>5,000 sq ft</span>
                      </div>
                    </div>

                    {/* Dropdown 2: Grade */}
                    <div className="space-y-1.5">
                      <span className="text-xs font-semibold text-slate-600 block">Specification &amp; Material Grade:</span>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'budget', label: 'Budget Entry', mult: '0.75x' },
                          { id: 'standard', label: 'Trade Standard', mult: '1.0x' },
                          { id: 'premium', label: 'Luxury Premium', mult: '1.5x' }
                        ].map(g => (
                          <button
                            key={g.id}
                            type="button"
                            onClick={() => setSandboxGrade(g.id as any)}
                            className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                              sandboxGrade === g.id
                                ? 'bg-blue-600 text-white border-blue-600 shadow-2xs font-bold'
                                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            <div className="text-xs">{g.label}</div>
                            <div className={`text-[10px] font-mono ${sandboxGrade === g.id ? 'text-blue-100' : 'text-slate-400'}`}>{g.mult}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Results Output Card */}
                  <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white p-6 rounded-2xl border border-slate-800 space-y-4 shadow-md">
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                      <span>Instant Calculated Output</span>
                      <span className="font-mono text-emerald-400 font-bold">● Live Production Mode</span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">Total Estimated Cost</span>
                      <div className="text-3xl font-black font-mono text-white tabular-nums">
                        ${totalCalculated.toLocaleString()}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-2 text-xs border-t border-slate-800">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Raw Materials</span>
                        <span className="font-mono font-bold text-slate-200">${rawMaterials.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Trade Labor</span>
                        <span className="font-mono font-bold text-slate-200">${tradeLabor.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">10% Safety Buffer</span>
                        <span className="font-mono font-bold text-amber-400">${contingency.toLocaleString()}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Readiness Score</span>
                        <span className="font-mono font-bold text-emerald-400">{readinessScore}/100</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={() => copyToClipboard('embed-code', `<iframe src="https://${activeWs.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.com/embed/${currentTool?.slug || 'calculator'}" width="100%" height="600" frameborder="0"></iframe>`)}
                        className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs font-display"
                      >
                        {copiedKey === 'embed-code' ? <Check className="w-4 h-4 text-emerald-300" /> : <Code className="w-4 h-4" />}
                        <span>{copiedKey === 'embed-code' ? 'Copied Embed Code!' : 'Copy Embed Code for Website'}</span>
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              {/* Module 2: Top Affiliate Programs & 1-Click Approval Message */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-wider block">
                      High-Yield Monetization
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-display">
                      Top Affiliate Programs ($85 – $350 Payouts)
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Pre-wired affiliate networks paying high commissions with a 1-click message to get approved immediately.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {AFFILIATE_CHEAT_SHEET.slice(0, 4).map(net => (
                    <div key={net.id} className="p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-xs font-bold text-slate-900 block font-display">{net.network}</span>
                          <span className="text-[11px] text-slate-500">{net.category}</span>
                        </div>
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0">
                          {net.cookieDuration}
                        </span>
                      </div>

                      <div className="p-2.5 rounded-xl bg-white border border-slate-200/70 text-xs font-mono font-bold text-slate-800">
                        Payout: <span className="text-emerald-600">{net.averagePayout}</span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-400 uppercase font-mono">Guaranteed Approval Message:</span>
                        <p className="text-[11px] text-slate-600 italic line-clamp-2">
                          "{net.guaranteedApprovalScript}"
                        </p>
                      </div>

                      <div className="pt-1 flex items-center gap-2">
                        <button
                          onClick={() => copyToClipboard(net.id, net.guaranteedApprovalScript)}
                          className="flex-1 py-2 px-3 text-xs font-bold rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200/90 flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-2xs font-display"
                        >
                          {copiedKey === net.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
                          <span>{copiedKey === net.id ? 'Copied Message!' : 'Copy Approval Message'}</span>
                        </button>
                        <a
                          href={net.directApprovalUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-xs rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 transition-colors"
                          title="Open Affiliate Portal"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Module 3: Top Google Keywords & Ad Value */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider block">
                      Search Demand &amp; Ad Value
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-display">
                      Top Google Keywords for Your Business
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">
                    High commercial intent traffic mapped to your AI tools
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {KEYWORD_MATRIX.slice(0, 4).map(kw => (
                    <div key={kw.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                      <div className="text-[10px] font-mono font-bold text-blue-600 uppercase">{kw.searchIntent}</div>
                      <div className="text-xs font-bold text-slate-900 line-clamp-1">{kw.keyword}</div>
                      <div className="flex items-center justify-between pt-1 text-[11px] font-mono">
                        <span className="text-slate-500">{kw.monthlyVolume}/mo</span>
                        <span className="font-bold text-emerald-600">CPC: {kw.avgCpc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* VIEW B: OTO 1 (EXTENDED) TRAFFIC & MULTIPLIER DASHBOARD */}
          {/* ========================================================== */}
          {currentViewTier === 'EXTENDED' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              
              {/* OTO 1 Feature 1: 1-into-7 Content Multiplier Studio */}
              <div className="bg-gradient-to-br from-white via-indigo-50/20 to-white border border-indigo-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-indigo-100 gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase tracking-wider block">
                      OTO 1 Superpower Unlocked
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-display">
                      1-into-7 Social Content Multiplier
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Select any of your 40 authority guides and multiply it into 7 viral traffic formats in 1 click.
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <select
                      value={repurposeArticleIndex}
                      onChange={(e) => setRepurposeArticleIndex(Number(e.target.value))}
                      className="px-3.5 py-2 text-xs font-semibold rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 max-w-[240px] truncate"
                    >
                      {activeArticles.map((art, idx) => (
                        <option key={art.id || idx} value={idx}>
                          Guide #{idx + 1}: {art.title.replace(/^[^:]+:\s*/, '')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 7 Format Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
                  {[
                    { id: 'linkedin', label: 'LinkedIn Carousel' },
                    { id: 'twitter', label: 'Twitter / X Thread' },
                    { id: 'youtube', label: 'YouTube Shorts' },
                    { id: 'email', label: 'Email Broadcast' },
                    { id: 'reddit', label: 'Reddit / Quora Answer' },
                    { id: 'infographic', label: 'Infographic Points' },
                    { id: 'press', label: 'Press Release' }
                  ].map(fmt => (
                    <button
                      key={fmt.id}
                      type="button"
                      onClick={() => setRepurposeFormat(fmt.id as any)}
                      className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer font-display ${
                        repurposeFormat === fmt.id
                          ? 'bg-white text-indigo-700 shadow-2xs font-black'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                      }`}
                    >
                      {fmt.label}
                    </button>
                  ))}
                </div>

                {/* Preview Box */}
                <div className="p-5 rounded-2xl bg-white border border-indigo-100 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-100 pb-2">
                    <span className="font-mono font-bold text-indigo-600 uppercase">
                      Generated Format: {repurposeFormat}
                    </span>
                    <button
                      onClick={() => copyToClipboard('repurpose-text', getRepurposePreview())}
                      className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer font-display"
                    >
                      {copiedKey === 'repurpose-text' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey === 'repurpose-text' ? 'Copied Swipes!' : 'Copy Swipes'}</span>
                    </button>
                  </div>
                  <pre className="text-xs font-mono text-slate-800 whitespace-pre-wrap leading-relaxed max-h-60 overflow-y-auto">
                    {getRepurposePreview()}
                  </pre>
                </div>
              </div>

              {/* OTO 1 Feature 2: 50 Ready-to-Copy Traffic Swipes */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-wider block">
                      Fast-Traffic Arsenal
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-display">
                      50 Ready-to-Copy Community Traffic Swipes
                    </h3>
                  </div>

                  {/* Filter Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 text-xs">
                    {(['All', 'Reddit', 'Quora', 'LinkedIn', 'Facebook Groups'] as const).map(p => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setTrafficFilter(p)}
                        className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                          trafficFilter === p
                            ? 'bg-slate-900 text-white shadow-2xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredSwipes.map(sw => (
                    <div key={sw.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-blue-600 font-mono">{sw.platform}</span>
                        <span className="text-[10px] text-slate-400 font-mono truncate max-w-[200px]">{sw.targetContext}</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 font-display">"{sw.hook}"</div>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{sw.body}</p>
                      <div className="pt-1 flex items-center justify-between text-xs border-t border-slate-200/60">
                        <span className="text-[10px] text-emerald-600 font-mono font-semibold">Tip: {sw.antiFlagTip}</span>
                        <button
                          onClick={() => copyToClipboard(sw.id, `${sw.hook}\n\n${sw.body}\n\n${sw.callToAction}`)}
                          className="text-xs font-bold text-slate-700 hover:text-blue-600 flex items-center gap-1 cursor-pointer font-display"
                        >
                          {copiedKey === sw.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedKey === sw.id ? 'Copied' : 'Copy Post'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* OTO 1 Feature 3: Interactive 24-Hour Launch Checklist */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-sm sm:text-base font-black text-slate-900 font-display">
                    24-Hour Fast Launch Checklist
                  </h3>
                  <span className="text-xs text-slate-500 font-mono">
                    Check off steps to take this business live
                  </span>
                </div>

                <div className="space-y-2.5">
                  {SYNDICATION_CHECKLIST.slice(0, 4).map((step, idx) => {
                    const isChecked = !!checklistState[idx];
                    return (
                      <div 
                        key={idx}
                        onClick={() => setChecklistState(prev => ({ ...prev, [idx]: !prev[idx] }))}
                        className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                          isChecked ? 'bg-emerald-50/60 border-emerald-200 text-slate-800' : 'bg-slate-50 border-slate-200/80 text-slate-600'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            checked={isChecked} 
                            onChange={() => {}} 
                            className="w-4 h-4 accent-emerald-600 cursor-pointer"
                          />
                          <div>
                            <span className="text-xs font-bold block">{step.actionTitle}</span>
                            <span className="text-[11px] text-slate-500">{step.instructions}</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-bold shrink-0">
                          {step.expectedVisitors}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* VIEW C: OTO 2 (PRO) PORTFOLIO & 1-CLICK CLONER DASHBOARD */}
          {/* ========================================================== */}
          {currentViewTier === 'PRO' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              
              {/* OTO 2 Feature 1: 1-Click Business Cloner */}
              <div className="bg-gradient-to-br from-white via-violet-50/25 to-white border border-violet-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-violet-100 gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-violet-600 uppercase tracking-wider block">
                      OTO 2 Expansion Superpower
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight font-display">
                      AI Business Cloner Engine
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Duplicate this entire business structure, 8 AI tools, and 40 guides into an adjacent niche.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                  <div className="md:col-span-5 space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block font-display">Target Expansion Market</label>
                    <select
                      value={cloneTargetNiche}
                      onChange={(e) => {
                        setCloneTargetNiche(e.target.value);
                        setCloneNameInput(e.target.value === 'personal-finance' ? 'Ascend Capital Strategies' : 'Peak Longevity Lab Pro');
                      }}
                      className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-violet-600 min-h-[44px]"
                    >
                      {availableNiches.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.category})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="md:col-span-4 space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 block font-display">New Business Name</label>
                    <input 
                      type="text"
                      value={cloneNameInput}
                      onChange={(e) => setCloneNameInput(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs font-semibold rounded-xl border border-slate-300 bg-white text-slate-800 min-h-[44px]"
                    />
                  </div>

                  <div className="md:col-span-3">
                    <button
                      onClick={handleCloneBusiness}
                      disabled={isCloning}
                      className="w-full py-2.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm font-display min-h-[44px]"
                    >
                      {isCloning ? <Loader2 className="w-4 h-4 animate-spin" /> : <Repeat className="w-4 h-4" />}
                      <span>{isCloning ? `Cloning (${cloneProgress}%)...` : 'Clone Business in 1-Click'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* OTO 2 Feature 2: Multi-Business Portfolio Grid */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 font-display">
                      All Your Deployed Businesses ({allWorkspaces.length})
                    </h3>
                    <p className="text-xs text-slate-500">
                      Manage and switch between your active turnkey businesses in one unified portfolio.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allWorkspaces.map(ws => (
                    <div key={ws.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <span className="text-sm font-black text-slate-900 block font-display">{ws.name}</span>
                          <span className="text-xs text-blue-600 font-mono capitalize">{ws.nichePackageId.replace('-', ' ')}</span>
                        </div>
                        {ws.id === activeWs?.id ? (
                          <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">Active</span>
                        ) : (
                          <button
                            onClick={() => store.setActiveWorkspace(ws.id)}
                            className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
                          >
                            Set Active
                          </button>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-500 font-mono pt-1 border-t border-slate-200/60">
                        <span>40 Guides &bull; 8 AI Tools</span>
                        <span>$5,850+ Valued</span>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => {
                            store.setActiveWorkspace(ws.id);
                            onNavigateTab('website');
                          }}
                          className="flex-1 py-1.5 px-3 text-xs font-bold rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-center"
                        >
                          View Live Website
                        </button>
                        <button
                          onClick={() => copyToClipboard(`share-${ws.id}`, `https://${ws.name.toLowerCase().replace(/[^a-z0-9]/g, '')}.preview.authoritystudio.app`)}
                          className="py-1.5 px-3 text-xs font-bold rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100"
                        >
                          {copiedKey === `share-${ws.id}` ? 'Copied Link!' : 'Share Link'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* ========================================================== */}
          {/* VIEW D: OTO 3 (ULTIMATE) COMMERCIAL AGENCY STUDIO DASHBOARD */}
          {/* ========================================================== */}
          {currentViewTier === 'ULTIMATE' && (
            <div className="space-y-8 animate-in fade-in duration-150">
              
              {/* OTO 3 Feature 1: Commercial Agency Command Header */}
              <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
                      Official Commercial Agency License
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight">
                      Commercial Agency Studio
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Sell ready-made turnkey websites and smart AI tools to local businesses for $1,500 to $3,500 each.
                    </p>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-xs font-mono bg-emerald-900/60 text-emerald-300 border border-emerald-500/40 px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5">
                      ✓ Unlimited Commercial Resell Active
                    </span>
                  </div>
                </div>

                {/* 1-Click Client Proposal Generator */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase font-mono text-slate-400">
                    Generate Client Proposal ($1,500 – $3,500 Retainer)
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input 
                      type="text"
                      placeholder="Client Company (e.g. Apex Roofing)"
                      value={clientCompanyInput}
                      onChange={(e) => setClientCompanyInput(e.target.value)}
                      className="px-3.5 py-2.5 text-xs rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <input 
                      type="text"
                      placeholder="Contact Name (e.g. David Miller)"
                      value={clientContactInput}
                      onChange={(e) => setClientContactInput(e.target.value)}
                      className="px-3.5 py-2.5 text-xs rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <input 
                      type="text"
                      placeholder="City / Market (e.g. Austin, TX)"
                      value={clientCityInput}
                      onChange={(e) => setClientCityInput(e.target.value)}
                      className="px-3.5 py-2.5 text-xs rounded-xl bg-slate-900/90 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
                      <span className="font-mono text-amber-400 font-bold">Proposal Rate: ${proposalRate.toLocaleString()}</span>
                      <button
                        onClick={() => copyToClipboard('proposal-text', generatedProposalText)}
                        className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer font-display"
                      >
                        {copiedKey === 'proposal-text' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedKey === 'proposal-text' ? 'Copied Proposal!' : 'Copy Proposal Text'}</span>
                      </button>
                    </div>
                    <pre className="text-xs font-mono text-slate-300 whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                      {generatedProposalText}
                    </pre>
                  </div>
                </div>
              </div>

              {/* OTO 3 Feature 2: Local Business Authority Package */}
              <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-slate-900 font-display">
                      Local Contractor &amp; Business Authority Package
                    </h3>
                    <p className="text-xs text-slate-500">
                      Pre-packaged templates ready to sell to local service pros (roofers, remodelers, plumbers, dentists).
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigateTab('commercial')}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 font-display"
                  >
                    <span>Open Commercial Studio</span>
                    <PhArrowRight weight="bold" className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="text-xs font-bold text-slate-900 font-display">Local Service Website</div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Customized with client logo, phone number, and local service territory boundaries.
                    </p>
                    <span className="text-[10px] font-mono font-bold text-emerald-600 block pt-1">$1,500 Resell Value</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="text-xs font-bold text-slate-900 font-display">Custom Local AI Sizing Tools</div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Embeddable instant estimate tools that capture client leads directly to their email.
                    </p>
                    <span className="text-[10px] font-mono font-bold text-emerald-600 block pt-1">$1,000 Resell Value</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="text-xs font-bold text-slate-900 font-display">Whitelabel Deliverable PDF</div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      Itemized PDF client audit report ready to print or email to local business owners.
                    </p>
                    <span className="text-[10px] font-mono font-bold text-emerald-600 block pt-1">$1,000 Resell Value</span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};
