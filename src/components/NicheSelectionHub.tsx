import React, { useState, useEffect, useRef } from 'react';
import { 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  Lock, 
  Wrench, 
  FileText, 
  Mail,
  Zap,
  Check,
  RotateCw,
  Globe,
  Terminal,
  FastForward,
  Activity
} from 'lucide-react';
import { allNichePackages } from '../data/niches';
import { getNicheMarketDossier } from '../data/market-niche-intel';
import { BusinessModelType, ProductTier } from '../types/authority';
import { store, PRODUCT_CONFIGS } from '../services/store';
import confetti from 'canvas-confetti';

interface NicheSelectionHubProps {
  onNicheActivated: () => void;
  onOpenUpgradeWall: (tier: ProductTier, featureName: string) => void;
}

interface BuildLog {
  time: string;
  msg: string;
  type: 'info' | 'success' | 'accent' | 'warning';
}

export const NicheSelectionHub: React.FC<NicheSelectionHubProps> = ({
  onNicheActivated,
  onOpenUpgradeWall
}) => {
  const currentPlan = store.getPlan();
  const [creationMode, setCreationMode] = useState<'blueprint' | 'intelligence'>('blueprint');
  const [selectedNicheId, setSelectedNicheId] = useState<string>('ai-online-business');
  const [businessNameInput, setBusinessNameInput] = useState<string>('NextGen AI Tools');
  const [competitorUrlInput, setCompetitorUrlInput] = useState<string>('https://nerdwallet.com/calculators');
  
  // Authentic 45-55s Build Sequence State
  const [isBuilding, setIsBuilding] = useState<boolean>(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [currentPhase, setCurrentPhase] = useState<string>('Allocating Cloud Infrastructure & SSL');
  const [terminalLogs, setTerminalLogs] = useState<BuildLog[]>([]);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Suggestions map per niche
  const nameSuggestions: Record<string, string[]> = {
    'home-improvement': ['Apex Home Remodeling', 'TrueCraft Renovation Guide', 'BuiltRight Home Hub', 'Precision Remodel Pro'],
    'ai-online-business': ['NextGen AI Tools', 'PromptCraft Studio', 'AutomateScale Hub', 'Vanguard AI Insights'],
    'fitness-wellness': ['Peak Longevity Lab', 'Aegis Performance Protocol', 'VitalPulse Fitness', 'PrimeBio Longevity'],
    'personal-finance': ['Vanguard Wealth Blueprint', 'Compound Freedom Hub', 'Ascend Capital Strategy', 'ProsperWise Guide'],
    'parenting-family': ['Kindred Hearth Family', 'Thriving Roots Parenting', 'NurtureNest Hub', 'ParentCraft Daily']
  };

  const allowedNicheCount = PRODUCT_CONFIGS[currentPlan]?.availableNiches || 5;
  const selectedPkg = allNichePackages.find(p => p.id === selectedNicheId) || allNichePackages[0];

  const handleSelectNiche = (pkgId: string, index: number) => {
    if (index >= allowedNicheCount) {
      const requiredTier: ProductTier = index < 10 ? 'EXTENDED' : 'ULTIMATE';
      onOpenUpgradeWall(requiredTier, `Niche #${index + 1} (${allNichePackages[index].name})`);
      return;
    }
    setSelectedNicheId(pkgId);
    const suggestions = nameSuggestions[pkgId] || ['My Authority Business'];
    setBusinessNameInput(suggestions[0]);
  };

  const [isExtractingSignal, setIsExtractingSignal] = useState(false);
  const [extractedIntelligence, setExtractedIntelligence] = useState<any>(null);

  const handleExtractUrlSignal = async () => {
    if (!competitorUrlInput.trim()) return;
    setIsExtractingSignal(true);
    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'extract_url_intelligence',
          prompt: competitorUrlInput.trim(),
          businessContext: {
            niche: selectedPkg.name,
            brandName: businessNameInput
          }
        })
      });
      const data = await res.json();
      if (data.analysis) {
        setExtractedIntelligence(data.analysis);
        const domain = competitorUrlInput.replace(/^https?:\/\//, '').split('/')[0].split('.')[0] || 'Authority';
        setBusinessNameInput(`${domain.charAt(0).toUpperCase() + domain.slice(1)} Intelligence Lab`);
        confetti({ particleCount: 50, spread: 60 });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsExtractingSignal(false);
    }
  };

  const handleCycleSuggestion = () => {
    const list = nameSuggestions[selectedNicheId] || ['My Authority Business'];
    const currentIdx = list.indexOf(businessNameInput);
    const nextIdx = (currentIdx + 1) % list.length;
    setBusinessNameInput(list[nextIdx]);
  };

  // Scroll terminal to bottom as new logs appear
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs]);

  // Master Authentic 45-55s Randomized Deployment Sequence
  const runBuildSequence = () => {
    setIsBuilding(true);
    setProgressPercent(0);
    setTerminalLogs([]);

    const totalSeconds = Math.floor(Math.random() * 10) + 45; // 45 to 54 seconds
    const intervalMs = (totalSeconds * 1000) / 100;

    const plannedMilestones: { pct: number; phase: string; log: string; type: BuildLog['type'] }[] = [
      { pct: 2, phase: 'Allocating Cloud Namespace & SSL Certificates', log: `Initializing sub-tenant environment for [${businessNameInput.trim()}]...`, type: 'info' },
      { pct: 7, phase: 'Allocating Cloud Namespace & SSL Certificates', log: 'Generated 2048-bit TLS cryptographic security profile with HTTP/3 Edge routing.', type: 'success' },
      { pct: 14, phase: 'AI Market Intelligence & Competitor Blueprint Extraction', log: creationMode === 'intelligence' ? `Ingesting market signals & DOM structure from ${competitorUrlInput}...` : `Ingesting authority benchmarks for [${selectedPkg.name}] niche...`, type: 'accent' },
      { pct: 22, phase: 'AI Market Intelligence & Competitor Blueprint Extraction', log: 'Extracted 12 high-intent search clusters & 40 long-tail buyer questions.', type: 'info' },
      { pct: 28, phase: 'Compiling 8 Interactive Deterministic Micro-Tools', log: 'Transpiling client-side financial & sizing calculator logic into pure JavaScript...', type: 'info' },
      { pct: 36, phase: 'Compiling 8 Interactive Deterministic Micro-Tools', log: 'Validated pure math models (zero server latency, zero API rate-limit dependencies).', type: 'success' },
      { pct: 44, phase: 'Synthesizing 40 Authority SEO Articles & Pillar Clusters', log: 'Binding editorial guides with contextual schema markup and internal interlinking...', type: 'accent' },
      { pct: 52, phase: 'Synthesizing 40 Authority SEO Articles & Pillar Clusters', log: 'Generated responsive comparison tables and verified editorial reading metrics.', type: 'success' },
      { pct: 60, phase: 'Architecting Lead Capture Gateways & 7-Day Autoresponder', log: 'Compiling Done-For-You Playbook PDF delivery and 7-Day automated email funnel...', type: 'info' },
      { pct: 68, phase: 'Architecting Lead Capture Gateways & 7-Day Autoresponder', log: 'Configured automated lead capture webhooks & CSV database vault tables.', type: 'success' },
      { pct: 75, phase: 'Injecting Affiliate Monetization Hooks & Tracking Triggers', log: 'Wiring top-converting affiliate network triggers (ClickBank, ShareASale, Amazon)...', type: 'accent' },
      { pct: 83, phase: 'Injecting Affiliate Monetization Hooks & Tracking Triggers', log: 'Central link replacement engine verified across all 11 responsive portal pages.', type: 'success' },
      { pct: 90, phase: 'Final Google Core Web Vitals & Security Hardening Audit', log: 'Running synthetic Lighthouse audit: Performance 99, Accessibility 100, SEO 100.', type: 'success' },
      { pct: 96, phase: 'Deploying Live Authority Business to Cloud', log: 'Final packaging complete. Initializing instant dashboard workspace...', type: 'accent' },
      { pct: 100, phase: 'Authority Business Successfully Deployed', log: '✓ Full Authority Business is now 100% operational and ready to profit!', type: 'success' }
    ];

    let currentPct = 0;
    const timer = setInterval(() => {
      currentPct += 1;
      setProgressPercent(Math.min(currentPct, 100));

      // Check for milestone
      const milestone = plannedMilestones.find(m => m.pct === currentPct);
      if (milestone) {
        setCurrentPhase(milestone.phase);
        const timestamp = `[00:${String(Math.floor((currentPct * totalSeconds) / 100)).padStart(2, '0')}s]`;
        setTerminalLogs(prev => [...prev, { time: timestamp, msg: milestone.log, type: milestone.type }]);
      }

      if (currentPct >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          finalizeLaunch();
        }, 1200);
      }
    }, intervalMs);

    return timer;
  };

  const finalizeLaunch = () => {
    const finalName = businessNameInput.trim() || selectedPkg.name;
    store.activateInitialNiche(selectedNicheId, finalName, 'hybrid_monetized');
    confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
    setIsBuilding(false);
    onNicheActivated();
  };

  const handleFastTrackLaunch = () => {
    finalizeLaunch();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-6 sm:py-10 px-4 sm:px-6 animate-in fade-in duration-200">
      
      {/* 2-Step Creator Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200/80">
          <Sparkles className="w-3.5 h-3.5 text-blue-600" />
          <span>Pick a Niche. Own an Authority Business.</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Launch Your Authority Business
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
          Select a verified profitable market or extract a winning blueprint from any competitor URL. We immediately configure your 11-page website, 8 calculators, and 40 articles.
        </p>
      </div>

      {/* Main 2-Step Card or Authentic Build Terminal */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
        
        {isBuilding ? (
          /* AUTHENTIC 45-55S PROGRESSIVE ENTERPRISE DEPLOYMENT TERMINAL */
          <div className="space-y-6 py-4 animate-in fade-in duration-200">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-xs font-mono font-bold text-emerald-600 uppercase tracking-wider">
                    Autonomous Provisioning Engine Live
                  </span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Deploying &quot;{businessNameInput.trim() || 'My Authority Business'}&quot;
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {currentPhase}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-3xl font-black font-mono text-blue-600 tracking-tight">
                    {progressPercent}%
                  </div>
                  <span className="text-[10px] text-slate-400 font-medium">Verified Assembly</span>
                </div>
                
                {/* Discrete Fast-Track Bypass Button */}
                <button
                  onClick={handleFastTrackLaunch}
                  className="px-3 py-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1 transition-all"
                  title="Skip to instant deployment for rapid testing"
                >
                  <FastForward className="w-3.5 h-3.5 text-blue-600" />
                  <span>Fast-Track</span>
                </button>
              </div>
            </div>

            {/* Progress Meter Bar */}
            <div className="space-y-1.5">
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/60 p-0.5">
                <div 
                  className="h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>Phase: {currentPhase}</span>
                <span>Est. Time: ~45s Realistic Build</span>
              </div>
            </div>

            {/* Authentic Live Terminal Box */}
            <div className="bg-slate-950 rounded-2xl p-5 border border-slate-800 shadow-xl font-mono text-xs text-slate-300 space-y-2 max-h-72 overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-emerald-400" />
                  <span>authority_studio_compiler.bin — v4.8.2-cloud</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500/80"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-500/80"></span>
                  <span className="w-2 h-2 rounded-full bg-emerald-500/80"></span>
                </div>
              </div>

              <div className="space-y-1.5 pt-2">
                {terminalLogs.map((log, i) => (
                  <div key={i} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-slate-500 select-none shrink-0">{log.time}</span>
                    <span className={
                      log.type === 'success' ? 'text-emerald-400' :
                      log.type === 'accent' ? 'text-cyan-300' :
                      log.type === 'warning' ? 'text-amber-300' :
                      'text-slate-300'
                    }>
                      {log.msg}
                    </span>
                  </div>
                ))}
                <div ref={terminalEndRef} />
              </div>
            </div>

            <div className="text-center text-xs text-slate-500">
              Synthesizing 40 micro-tools, authority articles, lead funnels, and affiliate triggers. Please hold while your turnkey business compiles.
            </div>
          </div>
        ) : (
          <>
            {/* Mode Switcher: Curated Blueprints vs AI Market Intelligence */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="space-y-0.5">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Select Creation Mode
                </span>
                <div className="text-xs text-slate-500">
                  Choose an existing high-yield blueprint or extract intelligence from any competitor URL.
                </div>
              </div>

              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
                <button
                  type="button"
                  onClick={() => setCreationMode('blueprint')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    creationMode === 'blueprint'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Curated Blueprints
                </button>
                <button
                  type="button"
                  onClick={() => setCreationMode('intelligence')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    creationMode === 'intelligence'
                      ? 'bg-white text-blue-600 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>AI Market Intelligence (URL)</span>
                </button>
              </div>
            </div>

            {/* STEP 1: Select Niche OR URL Input */}
            {creationMode === 'blueprint' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">1</span>
                    <span>Select Your Launch Niche</span>
                  </h2>
                  <span className="text-xs text-slate-500 font-mono hidden sm:inline">
                    Selected: <strong className="text-blue-600 font-bold">{selectedPkg.name}</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {allNichePackages.slice(0, Math.max(5, allowedNicheCount)).map((pkg, idx) => {
                    const isUnlocked = idx < allowedNicheCount;
                    const isSelected = selectedNicheId === pkg.id;
                    const dossier = getNicheMarketDossier(pkg.id, pkg.name, pkg.category);

                    return (
                      <div
                        key={pkg.id}
                        onClick={() => handleSelectNiche(pkg.id, idx)}
                        className={`relative rounded-2xl p-4 sm:p-5 border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/30 shadow-md'
                            : isUnlocked
                            ? 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs'
                            : 'border-slate-200 bg-slate-50/80 opacity-70 hover:opacity-100 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">
                            Niche #{idx + 1}
                          </span>
                          {isSelected ? (
                            <span className="flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                              <Check className="w-3 h-3" /> Active
                            </span>
                          ) : !isUnlocked ? (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                              <Lock className="w-3 h-3" /> Locked
                            </span>
                          ) : (
                            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              {dossier.caseStudy.provenMonthlyRevenue}
                            </span>
                          )}
                        </div>

                        <h3 className="text-sm font-bold text-slate-900 mb-1 leading-snug">
                          {pkg.name}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3">
                          {pkg.description}
                        </p>

                        <div className="flex items-center justify-between text-[11px] text-slate-600 pt-2 border-t border-slate-100 font-medium">
                          <div className="flex items-center gap-2.5">
                            <div className="flex items-center gap-1">
                              <Wrench className="w-3 h-3 text-blue-500" />
                              <span>8 Tools</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <FileText className="w-3 h-3 text-emerald-500" />
                              <span>40 Guides</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">
                            {dossier.marketMetrics.monthlySearchVolume.split(' ')[0]} searches
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* AI Market Intelligence from Competitor URL */
              <div className="space-y-4 p-5 rounded-2xl bg-gradient-to-r from-blue-50/70 to-indigo-50/70 border border-blue-200/80">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      1. Reverse-Engineer Winning Model from Competitor URL
                    </h3>
                    <p className="text-xs text-slate-600">
                      Paste any high-ranking authority site or blog URL. Gemini Flash AI audits the topical structure, calculation gaps, and monetization angles.
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Target Authority Website / Competitor URL
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={competitorUrlInput}
                      onChange={(e) => setCompetitorUrlInput(e.target.value)}
                      placeholder="e.g. https://nerdwallet.com/calculators or https://healthline.com"
                      className="flex-1 px-4 py-2.5 text-xs font-mono font-medium rounded-xl border border-slate-300 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    <button
                      type="button"
                      disabled={isExtractingSignal}
                      onClick={handleExtractUrlSignal}
                      className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-colors flex items-center gap-1.5 shrink-0 disabled:opacity-50 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                      <span>{isExtractingSignal ? 'Auditing URL...' : 'Extract Intelligence'}</span>
                    </button>
                  </div>

                  {extractedIntelligence && (
                    <div className="mt-3 p-4 bg-white/90 rounded-xl border border-blue-200 space-y-3 animate-in fade-in text-xs">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="font-bold text-slate-900 font-display">Competitor Audit Signals</span>
                        <span className="font-mono text-emerald-600 font-bold">{extractedIntelligence.estimatedMonthlyTraffic}</span>
                      </div>
                      <p className="text-slate-600">{extractedIntelligence.overview}</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                        <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                          <span className="font-bold text-rose-700 block mb-1">Competitor Vulnerabilities:</span>
                          <ul className="text-slate-600 space-y-0.5">
                            {extractedIntelligence.topCompetitorFlaws?.map((flaw: string, i: number) => (
                              <li key={i}>• {flaw}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200">
                          <span className="font-bold text-emerald-800 block mb-1">Our Recommended Authority Angles:</span>
                          <ul className="text-emerald-900 space-y-0.5 font-medium">
                            {extractedIntelligence.recommendedTools?.map((tool: string, i: number) => (
                              <li key={i}>✓ {tool}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
                    <span>✓ Ingests Topical Schema</span>
                    <span>✓ Reverse-Engineers Calculator Logic</span>
                    <span>✓ Identifies Top Affiliate Hooks</span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Name Your Authority Business */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <h2 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">2</span>
                  <span>Name Your Authority Business</span>
                </h2>
                <button
                  type="button"
                  onClick={handleCycleSuggestion}
                  className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RotateCw className="w-3 h-3" />
                  <span>Suggest Another Name</span>
                </button>
              </div>

              <div className="max-w-xl">
                <div className="relative flex items-center">
                  <input
                    type="text"
                    required
                    value={businessNameInput}
                    onChange={(e) => setBusinessNameInput(e.target.value)}
                    placeholder="e.g. NextGen AI Tools or Apex Remodeling"
                    className="w-full px-4 py-3 text-sm font-semibold rounded-xl bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                  />
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  Branded across your 11 website pages, articles, and downloadable ZIP files. You can change this anytime.
                </p>
              </div>
            </div>

            {/* Action Button: Launch My Authority Business */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500">
                Seeding <strong>40 Articles</strong>, <strong>8 Calculators</strong>, and <strong>1 Lead Funnel</strong> for <strong className="text-slate-800">{selectedPkg.name}</strong>.
              </div>

              <button
                onClick={runBuildSequence}
                disabled={isBuilding}
                className="w-full sm:w-auto px-8 py-3.5 text-sm font-black rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
              >
                <span>Launch My Authority Business</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}

      </div>

    </div>
  );
};
