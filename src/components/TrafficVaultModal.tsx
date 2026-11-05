import React, { useState } from 'react';
import { store } from '../services/store';
import { 
  Vault, 
  Share2, 
  Mail, 
  DollarSign, 
  CheckSquare, 
  Copy, 
  Check, 
  Search, 
  Sparkles, 
  ExternalLink,
  ShieldCheck,
  Send,
  Download,
  CheckCircle2,
  Filter,
  Lock,
  ArrowRight
} from 'lucide-react';
import { 
  TRAFFIC_SWIPES_50, 
  PROMO_EMAILS_10, 
  SPONSORSHIP_ASSET, 
  SYNDICATION_CHECKLIST,
  TrafficSwipe,
  PromoEmail
} from '../data/traffic-vault-data';
import confetti from 'canvas-confetti';

interface TrafficVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TrafficVaultModal: React.FC<TrafficVaultModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'swipes' | 'emails' | 'sponsorship' | 'checklist'>('swipes');
  const [swipePlatform, setSwipePlatform] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [checklistCompleted, setChecklistCompleted] = useState<Record<number, boolean>>({});

  // AI Traffic & Sponsorship Generators
  const [customSwipes, setCustomSwipes] = useState<TrafficSwipe[]>([]);
  const [isGeneratingSwipe, setIsGeneratingSwipe] = useState(false);
  const [swipeTopicPrompt, setSwipeTopicPrompt] = useState('');

  // AI Sponsor Pitch Matchmaker
  const [targetVendorInput, setTargetVendorInput] = useState('Buildertrend Software');
  const [isGeneratingPitch, setIsGeneratingPitch] = useState(false);
  const [generatedPitchData, setGeneratedPitchData] = useState<any>(null);

  if (!isOpen) return null;

  const isUnlocked = store.hasTrafficVaultBump();
  const salesUrl = store.getSalesUrl('TRAFFIC_VAULT');

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    confetti({ particleCount: 25, spread: 35 });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleChecklist = (index: number) => {
    setChecklistCompleted(prev => {
      const next = { ...prev, [index]: !prev[index] };
      if (next[index]) {
        confetti({ particleCount: 40, spread: 50 });
      }
      return next;
    });
  };

  // If locked, render the high-converting paywall screen
  if (!isUnlocked) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-3 sm:p-4">
        <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center justify-center font-bold shadow-xs shrink-0">
                <Lock className="w-6 h-6" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                    WarriorPlus FE Order Bump Upgrade
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    $14.05 One-Time
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1 font-display">
                  24-Hour Fast-Traffic &amp; Brand Sponsorship Vault
                </h2>
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

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            The complete fast-traffic syndication engine designed to send your first wave of qualified visitors to your authority decision engines within 24 hours of launch, plus charge brands $250–$500/month in tool sponsorships.
          </p>

          {/* 4 Feature Deliverables */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Share2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>50 Organic Traffic Swipes</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Ready-to-post discussion hooks, problem-solver answers, and case studies for Reddit, Quora, LinkedIn, Twitter/X, and niche communities.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <Mail className="w-4 h-4 text-purple-600 shrink-0" />
                <span>10 Affiliate Promo Broadcasts</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                High-converting email swipes with 3 subject lines each, formatted for WarriorPlus, ClickBank, and high-ticket SaaS affiliate programs.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <DollarSign className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Sponsorship Pitch Kit</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Itemized rate card ($250–$500/mo) and cold email outreach scripts to monetize your free decision engines with recurring brand sponsors.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <CheckSquare className="w-4 h-4 text-blue-600 shrink-0" />
                <span>24-Hour Syndication Checklist</span>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Hour-by-hour launch day action plan to syndicate your content across 8 channels and generate qualified inbound traffic on day one.
              </p>
            </div>
          </div>

          {/* Pricing & Upgrade CTA */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                Launch Special Offer
              </div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                $14.05 <span className="text-xs font-normal text-slate-500">one-time launch access</span>
              </div>
              <div className="text-[11px] text-emerald-700 font-medium">
                Includes all 50 swipes, 10 promo emails, and rate card kit
              </div>
            </div>

            <a
              href={salesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2 text-center"
            >
              <span>Unlock Traffic Vault ($14.05)</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Reassurance Note */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
            <p className="text-[11px] text-slate-500">
              💡 <strong>Already purchased on WarriorPlus?</strong> Open the instant access link from your WarriorPlus purchase receipt to automatically activate your vault.
            </p>
          </div>

        </div>
      </div>
    );
  }

  const handleGenerateSwipe = async () => {
    if (!swipeTopicPrompt.trim()) return;
    setIsGeneratingSwipe(true);
    try {
      const activeWs = store.getActiveWorkspace();
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate_forum_swipes',
          platform: swipePlatform === 'all' ? 'Reddit' : swipePlatform,
          toolName: activeWs?.tools[0]?.title || 'Decision Cost Estimator',
          businessContext: {
            niche: activeWs?.nichePackageId || 'home-improvement',
            brandName: activeWs?.brandProfile.name || 'Authority Studio'
          }
        })
      });
      const data = await res.json();
      if (data.swipes && Array.isArray(data.swipes)) {
        const newItems: TrafficSwipe[] = data.swipes.map((s: any, idx: number) => ({
          id: `ai-swipe-${Date.now()}-${idx}`,
          platform: s.platform || 'Reddit',
          targetContext: s.targetContext || swipeTopicPrompt,
          hook: s.hook,
          body: s.body,
          callToAction: s.callToAction,
          antiFlagTip: s.antiFlagTip || 'Provide high-value domain specifics before sharing the tool.'
        }));
        setCustomSwipes(prev => [...newItems, ...prev]);
        setSwipeTopicPrompt('');
        confetti({ particleCount: 60, spread: 65 });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingSwipe(false);
    }
  };

  const handleGenerateSponsorPitch = async () => {
    if (!targetVendorInput.trim()) return;
    setIsGeneratingPitch(true);
    try {
      const activeWs = store.getActiveWorkspace();
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate_client_proposal',
          clientName: targetVendorInput.trim(),
          metro: 'National Digital Distribution',
          businessContext: {
            niche: activeWs?.nichePackageId || 'general',
            brandName: activeWs?.brandProfile.name || 'Authority Studio'
          }
        })
      });
      const data = await res.json();
      if (data.proposal) {
        setGeneratedPitchData(data.proposal);
        confetti({ particleCount: 50, spread: 60 });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingPitch(false);
    }
  };

  // Filter swipes including custom AI generated ones
  const filteredSwipes = [...customSwipes, ...TRAFFIC_SWIPES_50].filter(s => {
    const matchesPlatform = swipePlatform === 'all' || s.platform === swipePlatform;
    const matchesSearch = s.hook.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.targetContext.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.body.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesSearch;
  });

  // Filter emails
  const filteredEmails = PROMO_EMAILS_10.filter(e => {
    return e.network.toLowerCase().includes(searchQuery.toLowerCase()) ||
           e.subjectLines.some(s => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
           e.body.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-5xl w-full p-5 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-bold shadow-md shadow-emerald-500/20 shrink-0">
              <Vault className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Exclusive $14.05 FE Order Bump Vault
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ✓ Verified VIP Unlocked
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1 font-display">
                24-Hour Fast-Traffic &amp; Brand Sponsorship Vault
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                50 plug-and-play organic traffic swipes, 10 affiliate email broadcasts, calculator sponsorship rate cards, and rapid syndication checklist.
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

        {/* Segmented Tab Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl overflow-x-auto">
          <button
            onClick={() => setActiveTab('swipes')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-2 ${
              activeTab === 'swipes' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Share2 className="w-4 h-4 text-emerald-600" />
            <span>50 Traffic Swipes ({TRAFFIC_SWIPES_50.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('emails')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-2 ${
              activeTab === 'emails' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Mail className="w-4 h-4 text-purple-600" />
            <span>10 Affiliate Promo Emails</span>
          </button>
          <button
            onClick={() => setActiveTab('sponsorship')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-2 ${
              activeTab === 'sponsorship' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <DollarSign className="w-4 h-4 text-amber-600" />
            <span>Sponsorship Rate Card & Pitch</span>
          </button>
          <button
            onClick={() => setActiveTab('checklist')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-2 ${
              activeTab === 'checklist' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckSquare className="w-4 h-4 text-blue-600" />
            <span>24-Hour Traffic Checklist</span>
          </button>
        </div>

        {/* TAB 1: 50 ORGANIC TRAFFIC SWIPES */}
        {activeTab === 'swipes' && (
          <div className="space-y-4">
            {/* AI Custom Swipe Generator Bar */}
            <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 text-white rounded-2xl p-4 sm:p-5 border border-emerald-800/80 shadow-md space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-emerald-500/20 text-emerald-300">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-black text-white font-display">
                    Flash AI Community Infiltration &amp; Swipe Generator
                  </span>
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-900/60 px-2 py-0.5 rounded border border-emerald-500/40 self-start sm:self-auto">
                  Zero-Flag Contextual Framing
                </span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={swipeTopicPrompt}
                  onChange={(e) => setSwipeTopicPrompt(e.target.value)}
                  placeholder="e.g. Someone asking why kitchen bids are so high in r/HomeImprovement..."
                  className="flex-1 px-3.5 py-2 text-xs font-medium bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <button
                  type="button"
                  onClick={handleGenerateSwipe}
                  disabled={isGeneratingSwipe || !swipeTopicPrompt.trim()}
                  className="px-4 py-2 text-xs font-black bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  <span>{isGeneratingSwipe ? 'Drafting Post...' : 'Generate Live Swipe'}</span>
                </button>
              </div>
            </div>

            {/* Search and Platform Filter Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-3">
              <div className="flex items-center gap-1.5 overflow-x-auto">
                {['all', 'Reddit', 'Quora', 'LinkedIn', 'Facebook Groups', 'Niche Forums'].map((plat) => (
                  <button
                    key={plat}
                    onClick={() => setSwipePlatform(plat)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-lg capitalize transition-colors whitespace-nowrap ${
                      swipePlatform === plat
                        ? 'bg-slate-900 text-white shadow-2xs'
                        : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {plat === 'all' ? `All Channels (${filteredSwipes.length})` : plat}
                  </button>
                ))}
              </div>
              <div className="relative min-w-[220px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter swipes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            {/* Swipe List */}
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              <div className="text-[11px] font-semibold text-slate-400 flex items-center justify-between px-1">
                <span>Showing {filteredSwipes.length} plug-and-play organic promotion swipes</span>
                <span className="font-mono text-emerald-600">Zero-Flag Anti-Spam Architecture</span>
              </div>

              {filteredSwipes.map((swipe, idx) => {
                const isCopied = copiedId === swipe.id;
                const fullText = `${swipe.hook}\n\n${swipe.body}\n\n${swipe.callToAction}`;
                return (
                  <div key={swipe.id} className="border border-slate-200 rounded-2xl p-5 bg-white hover:border-slate-300 transition-all space-y-3 shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {swipe.platform} #{idx + 1}
                        </span>
                        <span className="text-xs font-bold text-slate-700 truncate max-w-md">
                          Context: {swipe.targetContext}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(swipe.id, fullText)}
                        className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-lg bg-slate-900 hover:bg-slate-800 text-white transition-colors shrink-0 self-start sm:self-auto"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Copied Full Swipe!' : '1-Click Copy Swipe'}</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-black text-slate-900 leading-snug">
                        "{swipe.hook}"
                      </div>
                      <p className="text-xs text-slate-600 whitespace-pre-wrap leading-relaxed font-sans bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                        {swipe.body}
                      </p>
                      <div className="text-xs font-semibold text-blue-600 bg-blue-50/60 p-2.5 rounded-lg border border-blue-100">
                        <strong>CTA:</strong> {swipe.callToAction}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-amber-800 bg-amber-50/60 p-2 rounded-lg border border-amber-100">
                      <span className="font-semibold">🛡️ Anti-Flag Rule:</span>
                      <span className="truncate ml-2">{swipe.antiFlagTip}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: 10 HIGH-CONVERTING AFFILIATE PROMO EMAILS */}
        {activeTab === 'emails' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-purple-50/80 border border-purple-200 rounded-2xl p-4 text-xs text-purple-950">
              <div className="space-y-0.5">
                <span className="font-bold">Pre-Written Affiliate Broadcast Sequences</span>
                <p className="text-[11px] text-purple-800">
                  Tailored to top networks (ClickBank, ShareASale, Amazon, JVZoo, Direct SaaS). Replace placeholders with your links and broadcast.
                </p>
              </div>
              <button
                onClick={() => {
                  const allText = PROMO_EMAILS_10.map(e => `[${e.network}] Subject Lines:\n${e.subjectLines.map(s => `- ${s}`).join('\n')}\n\nBody:\n${e.body}\n\n`).join('-------------------------\n\n');
                  handleCopy('all-emails', allText);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white transition-colors shrink-0 flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedId === 'all-emails' ? 'All 10 Copied!' : 'Copy All 10 Emails'}</span>
              </button>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {filteredEmails.map((email, idx) => {
                const isCopied = copiedId === email.id;
                const fullEmail = `Subject Options:\n${email.subjectLines.join('\n')}\n\nPreview Text: ${email.previewText}\n\nBody:\n${email.body}`;
                return (
                  <div key={email.id} className="border border-slate-200 rounded-2xl p-5 bg-white shadow-2xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                          {email.network} • Email #{idx + 1}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          Audience: {email.targetAudience}
                        </span>
                      </div>
                      <button
                        onClick={() => handleCopy(email.id, fullEmail)}
                        className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors shrink-0 self-start sm:self-auto"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Copied Email!' : 'Copy Broadcast'}</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Subject Line Options (Choose One):
                      </div>
                      <div className="space-y-1">
                        {email.subjectLines.map((sub, sIdx) => (
                          <div key={sIdx} className="text-xs font-bold text-slate-900 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                            • {sub}
                          </div>
                        ))}
                      </div>

                      <div className="text-[11px] text-slate-500 pt-1">
                        <strong>Preview Text:</strong> {email.previewText}
                      </div>

                      <div className="text-xs text-slate-700 bg-slate-50/60 p-4 rounded-xl border border-slate-200 whitespace-pre-wrap leading-relaxed font-sans">
                        {email.body}
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-100 font-mono">
                      Recommended Send Timing: {email.recommendedTiming}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: SPONSORSHIP RATE CARD & COLD OUTREACH PITCH SCRIPT */}
        {activeTab === 'sponsorship' && (
          <div className="space-y-6">
            {/* AI Sponsor Matchmaker Card */}
            <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 text-white rounded-2xl p-5 border border-amber-500/30 shadow-lg space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="p-1 rounded-lg bg-amber-500/20 text-amber-300">
                    <Sparkles className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-black text-white font-display">
                    Flash AI Personalized Sponsor Pitch Matchmaker
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30 self-start sm:self-auto">
                  $250 - $500/mo Monetization
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enter any vendor, software company, or manufacturer in your niche. The AI calculates their Google Ads acquisition savings and drafts an executive cold pitch for an exclusive calculator title sponsorship.
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={targetVendorInput}
                  onChange={(e) => setTargetVendorInput(e.target.value)}
                  placeholder="e.g. DeWalt Tools or Buildertrend Project Software"
                  className="flex-1 px-3.5 py-2 text-xs font-medium bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  type="button"
                  onClick={handleGenerateSponsorPitch}
                  disabled={isGeneratingPitch || !targetVendorInput.trim()}
                  className="px-4 py-2 text-xs font-black bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 rounded-xl transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                  <span>{isGeneratingPitch ? 'Drafting Custom Pitch...' : 'Generate Sponsor Pitch'}</span>
                </button>
              </div>

              {generatedPitchData && (
                <div className="p-4 bg-white text-slate-900 rounded-xl border border-amber-300 space-y-2 text-xs animate-in fade-in">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="font-bold font-display text-slate-900">Custom Sponsor Pitch for {generatedPitchData.clientName}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy('custom-pitch', `Subject: Exclusive decision engine sponsorship for ${generatedPitchData.clientName}\n\nHi Partnerships Team,\n\nWe feature verified decision calculators for our niche audience. Sponsoring our calculator gives ${generatedPitchData.clientName} 100% share of voice at a flat $250/mo.\n\nProjected Deliverables:\n${generatedPitchData.deliverables?.join('\n')}`)}
                      className="px-2.5 py-1 text-[11px] font-bold text-amber-800 bg-amber-50 hover:bg-amber-100 rounded border border-amber-200 cursor-pointer"
                    >
                      {copiedId === 'custom-pitch' ? 'Copied Pitch!' : 'Copy Pitch'}
                    </button>
                  </div>
                  <div className="text-[11px] text-slate-600">
                    <strong>Value Angle:</strong> {generatedPitchData.projectedBounceDrop}
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700">
                    Suggested Rate: ${generatedPitchData.setupFee || 250}/mo Title Placement
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 text-amber-950 space-y-2">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-amber-600" />
                <h3 className="text-base font-black text-amber-900">
                  {SPONSORSHIP_ASSET.rateCard.headline}
                </h3>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Direct advertiser sponsorships pay $250 - $500/mo flat fee per calculator. Use this pre-written rate card and cold outreach pitch script to monetize immediately with niche software vendors and local contractors.
              </p>
            </div>

            {/* Rate Card Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {SPONSORSHIP_ASSET.rateCard.tiers.map((tier, idx) => (
                <div key={idx} className="border border-slate-200 rounded-2xl p-5 bg-white shadow-2xs flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                      Tier {idx + 1}
                    </span>
                    <h4 className="text-sm font-black text-slate-900 leading-snug">{tier.name}</h4>
                    <div className="text-2xl font-black font-mono text-emerald-600">{tier.price}</div>
                    <div className="text-[11px] text-slate-500 font-mono">Estimated Traffic: {tier.monthlyImpressions}</div>

                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <div className="text-[10px] font-bold text-slate-400 uppercase">Included Placements:</div>
                      {tier.placements.map((p, pIdx) => (
                        <div key={pIdx} className="text-xs text-slate-600 flex items-start gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                    <strong>Deliverables:</strong> {tier.deliverables}
                  </div>
                </div>
              ))}
            </div>

            {/* Cold Outreach Pitch Scripts */}
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-wide">
                  Cold Outreach Pitch Scripts & Follow-Up Sequences
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {SPONSORSHIP_ASSET.coldOutreachTemplates.map((template, tIdx) => {
                  const isCopied = copiedId === `pitch-${tIdx}`;
                  return (
                    <div key={tIdx} className="border border-slate-200 rounded-2xl p-5 bg-white shadow-2xs space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <div>
                          <span className="text-[10px] font-mono font-bold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            Pitch Template #{tIdx + 1}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 mt-1">{template.name}</h4>
                          <span className="text-[10px] text-slate-400 block">Target: {template.targetRecipient}</span>
                        </div>
                        <button
                          onClick={() => handleCopy(`pitch-${tIdx}`, `Subject: ${template.subject}\n\n${template.body}\n\n=== FOLLOW UP ===\n\n${template.followUpBody}`)}
                          className="px-3 py-1 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors flex items-center gap-1 shrink-0"
                        >
                          {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                          <span>{isCopied ? 'Copied!' : 'Copy Script'}</span>
                        </button>
                      </div>

                      <div className="space-y-2">
                        <div className="text-xs font-bold text-slate-800 bg-slate-50 p-2 rounded-lg border border-slate-200">
                          Subject: {template.subject}
                        </div>
                        <div className="text-xs text-slate-700 bg-slate-50/60 p-3 rounded-xl border border-slate-200 whitespace-pre-wrap leading-relaxed font-sans max-h-48 overflow-y-auto">
                          {template.body}
                        </div>
                        <div className="text-[11px] font-bold text-slate-500 pt-1">
                          Follow-Up Message (Send 3 Days Later):
                        </div>
                        <div className="text-xs text-slate-600 bg-slate-50/40 p-2.5 rounded-lg border border-slate-100 whitespace-pre-wrap leading-relaxed font-sans">
                          {template.followUpBody}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 24-HOUR RAPID TRAFFIC SYNDICATION CHECKLIST */}
        {activeTab === 'checklist' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 text-blue-950 space-y-2">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-black text-blue-900">
                  The 24-Hour 100-Visitor Syndication Protocol
                </h3>
              </div>
              <p className="text-xs text-blue-800 leading-relaxed">
                Step-by-step roadmap to get your first 100 targeted visitors in the first 24 hours of launching your authority business. Complete each milestone in order.
              </p>
            </div>

            <div className="space-y-3">
              {SYNDICATION_CHECKLIST.map((step, idx) => {
                const isChecked = checklistCompleted[idx] || false;
                return (
                  <div
                    key={idx}
                    className={`border rounded-2xl p-5 transition-all flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${
                      isChecked ? 'bg-emerald-50/50 border-emerald-200 text-emerald-950' : 'bg-white border-slate-200 hover:border-slate-300 shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <button
                        onClick={() => toggleChecklist(idx)}
                        className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors mt-0.5 shrink-0 ${
                          isChecked ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300 bg-white hover:border-slate-400'
                        }`}
                      >
                        {isChecked && <Check className="w-4 h-4 text-white" />}
                      </button>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                            {step.hourWindow}
                          </span>
                          <span className="text-xs font-mono font-bold text-slate-400">
                            Channel: {step.channel}
                          </span>
                        </div>
                        <h4 className={`text-sm font-bold ${isChecked ? 'line-through text-slate-400' : 'text-slate-900'}`}>
                          {step.actionTitle}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                          {step.instructions}
                        </p>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1 shrink-0 text-right">
                      <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                        {step.expectedVisitors}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-400">
                        {step.verificationBadge}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Permanent Lifetime Access Unlocked • FE Order Bump ($14.05)</span>
          <button 
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors"
          >
            Close Vault
          </button>
        </div>
      </div>
    </div>
  );
};
