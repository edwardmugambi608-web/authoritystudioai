import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  FileText, 
  Share2, 
  Video, 
  Mail, 
  Copy, 
  Check, 
  Download, 
  CheckCheck,
  Zap,
  Lock,
  ArrowRight,
  TrendingUp,
  Megaphone
} from 'lucide-react';
import { BusinessWorkspace, ContentAsset, ProductTier } from '../types/authority';
import { store, PRODUCT_CONFIGS } from '../services/store';
import confetti from 'canvas-confetti';

interface RepurposingModalProps {
  isOpen: boolean;
  onClose: () => void;
  workspace?: BusinessWorkspace | null;
  asset?: ContentAsset | null;
  onOpenUpgradeWall: (tier: ProductTier, featureName: string) => void;
}

export const RepurposingModal: React.FC<RepurposingModalProps> = ({
  isOpen,
  onClose,
  workspace,
  asset,
  onOpenUpgradeWall
}) => {
  const isProActive = store.hasAccessToTier('PRO');
  const [activeFormat, setActiveFormat] = useState<'pdf' | 'social' | 'carousel' | 'video' | 'newsletter' | 'pinterest' | 'ads'>('pdf');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!isOpen) return null;

  const effectiveWorkspace = workspace || {
    id: 'ws-demo',
    nicheId: 'high-ticket-consulting',
    brandProfile: {
      name: 'Authority Media Lab',
      tagline: 'High-Ticket Client Acquisition & Interactive Decision Systems',
      primaryColor: '#2563eb',
      accentColor: '#f59e0b'
    },
    audienceProfile: {
      targetPersona: 'Enterprise Directors & B2B Consultants',
      painPoints: ['High client acquisition costs', 'Generic content fatigue', 'Inconsistent pipeline'],
      monetizationAngle: 'High-Ticket Retainers & Interactive Tool Paywalls'
    },
    publishedUrl: 'https://authoritystudio.app',
    contentAssets: []
  };

  const effectiveAsset: ContentAsset = asset || (workspace?.contentAssets && workspace.contentAssets.length > 0 ? workspace.contentAssets[0] : {
    id: 'repurpose-demo',
    blueprintId: 'bp-demo',
    nicheId: 'high-ticket-consulting',
    type: 'guide',
    slug: 'authority-scaling-framework',
    status: 'published',
    metaDescription: '7 Levers to High-Ticket Client Acquisition',
    title: 'The 2026 Authority Scaling Framework: 7 Levers to High-Ticket Client Acquisition',
    category: 'guide',
    targetKeyword: 'B2B Client Acquisition & Interactive Funnels',
    excerpt: 'A comprehensive trade audit analyzing how top-tier boutique agencies replace unpredictable cold outreach with automated interactive decision engines and verified benchmark calculators.',
    body: 'Modern B2B decision-makers no longer respond to generic pitch decks. By embedding verifiable calculation tools, cost estimators, and ROI audit frameworks directly into your authority content hub, organic traffic converts into pre-sold discovery calls with zero sales friction.',
    updatedAt: new Date().toISOString(),
    readingTimeMinutes: 7,
    relatedToolId: 'Enterprise ROI Calculator'
  });

  if (!isProActive) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
        <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-[10px] font-mono uppercase font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              Feature Locked
            </span>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕</button>
          </div>
          <div className="text-center space-y-3 py-2">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 mx-auto flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Expansion Studio Pro Required
            </h3>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              The 1-into-7 Traffic Repurposing &amp; Ad Creative Engine (Article &rarr; PDF Guide, Social Posts, Carousel, Video Script, Newsletter, Pinterest, and Paid Ad Suite) requires <strong>Expansion Studio Pro ($67)</strong>.
            </p>
          </div>
          <div className="pt-2 flex items-center justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg">
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenUpgradeWall('PRO', '1-into-7 Traffic Repurposing Engine');
              }}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs flex items-center gap-1.5"
            >
              <span>Unlock Expansion Studio ($67)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleCopy = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    confetti({ particleCount: 25, spread: 35 });
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const brand = effectiveWorkspace.brandProfile.name;
  const persona = effectiveWorkspace.audienceProfile.targetPersona;

  const pdfGuideText = `# ${effectiveAsset.title}\n*Official Comprehensive Implementation Blueprint*\nPublished by ${brand} for ${persona}\n\n## Executive Summary\n${effectiveAsset.excerpt}\n\n## Strategic Framework\n${effectiveAsset.body}\n\n---\n**Action Checklist:**\n1. Audit current specifications against target parameters.\n2. Leverage the companion decision engine: ${effectiveAsset.relatedToolId || 'Interactive Decision Engine'}.\n3. Download the full resource kit at ${effectiveWorkspace.publishedUrl || 'https://authoritystudio.app'}.\n\n© ${new Date().getFullYear()} ${brand}. All Rights Reserved.`;

  const socialPosts = [
    `1/5: Most people get "${effectiveAsset.targetKeyword}" completely backwards. Here is the framework that actually works for ${persona} 👇`,
    `2/5: The core mistake? Trying to solve it without understanding: "${effectiveAsset.excerpt.substring(0, 120)}..."`,
    `3/5: Key Rule: Look at the direct tradeoff between immediate output and compounding results. Real authority properties win by standardizing the workflow.`,
    `4/5: We built a dedicated Decision Engine inside ${brand} that computes these exact thresholds in under 10 seconds.`,
    `5/5: Read our full in-depth review & grab the free blueprint: ${effectiveAsset.title} at ${effectiveWorkspace.brandProfile.name}!`
  ];

  const carouselSlides = [
    { slide: 1, title: effectiveAsset.title, sub: `A 60-second diagnostic breakdown by ${brand}` },
    { slide: 2, title: 'The Common Pitfall', sub: effectiveAsset.excerpt },
    { slide: 3, title: 'The 3 Non-Negotiable Rules', sub: 'Precision specs, verified trade benchmarks, and continuous operational review.' },
    { slide: 4, title: 'Pro Recommendation', sub: `Never deploy without checking the companion decision engine simulation.` },
    { slide: 5, title: 'Get the Free Checklist', sub: `Save this post and visit ${brand} for the full step-by-step breakdown.` }
  ];

  const videoScript = `[SCENE 1 - 0:00 - HOOK & CUE]
Visual: Creator points to camera with high-contrast text overlay: "Stop guessing your ${effectiveAsset.targetKeyword}."
Audio Voiceover: "If you're a ${persona}, you are probably overpaying by at least 25% on this exact step."

[SCENE 2 - 0:15 - THE PROBLEM]
Visual: Screen recording showing messy spreadsheets or conflicting contractor bids.
Audio Voiceover: "${effectiveAsset.excerpt}"

[SCENE 3 - 0:35 - THE 3-STEP SOLUTION]
Visual: Cut to live demonstration of the ${brand} Decision Engine. Sliders adjusting in real time.
Audio Voiceover: "Here's the 3-step blueprint we use at ${brand}: First, audit your baseline numbers. Second, calculate your variance using our free Decision Engine. Third, lock in your contingency reserve."

[SCENE 4 - 0:50 - CALL TO ACTION]
Visual: Creator points to bio link / comment section.
Audio Voiceover: "Tap the link in bio to run your numbers for free on our Decision Engine and download the 2026 playbook!"`;

  const newsletterBroadcast = `Subject: The real truth about ${effectiveAsset.targetKeyword}\nPreview: Why standard advice fails for ${persona}\n\nHi {{first_name}},\n\nOver the past month, we've reviewed dozens of approaches to ${effectiveAsset.targetKeyword}.\n\nHere's what our verified data shows:\n\n${effectiveAsset.excerpt}\n\nIn our newest benchmark breakdown: "${effectiveAsset.title}", we walk through the exact mathematical models and real-world results.\n\n👉 Read the complete breakdown here: [Link]\n\nP.S. Don't forget to run your numbers through our companion Decision Engine!\n\nBest,\n${brand} Team`;

  const pinterestText = `Pin Title: The Ultimate ${effectiveAsset.targetKeyword} Blueprint for ${persona}\nPin Description: Learn how to execute ${effectiveAsset.targetKeyword} with precision. Get the step-by-step framework, comparison data, and companion Decision Engines at ${brand}.\nHashtags: #${effectiveAsset.targetKeyword.replace(/[^a-zA-Z0-9]/g, '')} #${brand.replace(/[^a-zA-Z0-9]/g, '')} #AuthorityGuide`;

  const paidAdSuite = `=== FACEBOOK / INSTAGRAM FEED AD COPY ===
Primary Text:
Planning a ${effectiveAsset.targetKeyword} project? Don't sign a single contract or spend a dime until you run your numbers through our free Decision Engine.

Most quotes secretly bake in 30% padding. Our free tool gives you the exact raw materials vs. labor breakdown in 10 seconds.

Headline: Free 2026 ${effectiveAsset.targetKeyword} Decision Engine
Newsfeed Description: Verified trade math • 100% Client-side privacy • Zero email gate.
Call to Action: Try Tool / Learn More

=== GOOGLE SEARCH ADS (RESPONSIVE AD PACK) ===
Headlines (30 char max):
- 2026 ${effectiveAsset.targetKeyword.substring(0, 20)}
- Free Project Decision Engine
- Verified Cost & Materials
- Accurate Trade Estimates

Descriptions (90 char max):
- Stop guessing your project costs. Run verified trade calculations in 10 seconds.
- Free interactive Decision Engine. Real regional labor rates & raw material allowances.`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </span>
            <div>
              <div className="text-[10px] font-mono text-blue-600 uppercase font-bold tracking-wider">
                Expansion Studio Pro (OTO 2)
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                1-into-7 Multi-Channel Traffic &amp; Video Studio
              </h2>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg font-bold px-2 py-1">✕</button>
        </div>

        {/* Source Asset Indicator */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 flex items-center justify-between">
          <span className="truncate"><strong>Source Guide:</strong> {effectiveAsset.title}</span>
          <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded font-bold uppercase">{effectiveAsset.category}</span>
        </div>

        {/* Format Selector Pills */}
        <div className="flex flex-wrap gap-1.5 border-b border-slate-100 pb-3 text-xs">
          <button
            onClick={() => setActiveFormat('pdf')}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors ${
              activeFormat === 'pdf' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>PDF Guide / eBook</span>
          </button>
          <button
            onClick={() => setActiveFormat('social')}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors ${
              activeFormat === 'social' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>10-Part Social Campaign</span>
          </button>
          <button
            onClick={() => setActiveFormat('carousel')}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors ${
              activeFormat === 'carousel' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Carousel Slides</span>
          </button>
          <button
            onClick={() => setActiveFormat('video')}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors ${
              activeFormat === 'video' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>60s Video Storyboard</span>
          </button>
          <button
            onClick={() => setActiveFormat('newsletter')}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors ${
              activeFormat === 'newsletter' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Newsletter Broadcast</span>
          </button>
          <button
            onClick={() => setActiveFormat('pinterest')}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors ${
              activeFormat === 'pinterest' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pinterest Pins</span>
          </button>
          <button
            onClick={() => setActiveFormat('ads')}
            className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors ${
              activeFormat === 'ads' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'
            }`}
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>Paid Ad Creative Suite</span>
          </button>
        </div>

        {/* Content Viewer based on active format */}
        <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
          {activeFormat === 'pdf' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Downloadable PDF Guide / Whitepaper</span>
                <button
                  onClick={() => handleCopy('pdf', pdfGuideText)}
                  className="px-3 py-1 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center gap-1"
                >
                  {copiedKey === 'pdf' ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'pdf' ? 'Copied' : 'Copy Guide Text'}</span>
                </button>
              </div>
              <pre className="text-xs font-mono text-slate-700 bg-white p-3.5 rounded-xl border border-slate-200 overflow-x-auto whitespace-pre-wrap max-h-72">
                {pdfGuideText}
              </pre>
            </div>
          )}

          {activeFormat === 'social' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Twitter/LinkedIn Thread &amp; Social Posts</span>
                <button
                  onClick={() => handleCopy('social', socialPosts.join('\n\n'))}
                  className="px-3 py-1 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center gap-1"
                >
                  {copiedKey === 'social' ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'social' ? 'Copied All' : 'Copy All Posts'}</span>
                </button>
              </div>
              <div className="space-y-2">
                {socialPosts.map((post, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-700">
                    {post}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeFormat === 'carousel' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Instagram &amp; LinkedIn 5-Slide Carousel</span>
                <button
                  onClick={() => handleCopy('carousel', JSON.stringify(carouselSlides, null, 2))}
                  className="px-3 py-1 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center gap-1"
                >
                  {copiedKey === 'carousel' ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'carousel' ? 'Copied' : 'Copy Slides'}</span>
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {carouselSlides.map(slide => (
                  <div key={slide.slide} className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
                    <div className="text-[10px] font-mono font-bold text-blue-600 uppercase">Slide {slide.slide}</div>
                    <div className="text-xs font-bold text-slate-900">{slide.title}</div>
                    <div className="text-[11px] text-slate-500">{slide.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeFormat === 'video' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">60-Second Video Storyboard (TikTok, Reels, Shorts)</span>
                <button
                  onClick={() => handleCopy('video', videoScript)}
                  className="px-3 py-1 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center gap-1"
                >
                  {copiedKey === 'video' ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'video' ? 'Copied' : 'Copy Storyboard'}</span>
                </button>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed font-sans">
                {videoScript}
              </div>
            </div>
          )}

          {activeFormat === 'newsletter' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Email Newsletter Broadcast</span>
                <button
                  onClick={() => handleCopy('newsletter', newsletterBroadcast)}
                  className="px-3 py-1 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center gap-1"
                >
                  {copiedKey === 'newsletter' ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'newsletter' ? 'Copied' : 'Copy Broadcast'}</span>
                </button>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed font-sans">
                {newsletterBroadcast}
              </div>
            </div>
          )}

          {activeFormat === 'pinterest' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Pinterest Title &amp; Description Pack</span>
                <button
                  onClick={() => handleCopy('pinterest', pinterestText)}
                  className="px-3 py-1 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center gap-1"
                >
                  {copiedKey === 'pinterest' ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'pinterest' ? 'Copied' : 'Copy Pins'}</span>
                </button>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed font-sans">
                {pinterestText}
              </div>
            </div>
          )}

          {activeFormat === 'ads' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">Paid Ad Creative Suite (Meta &amp; Google Ads)</span>
                <button
                  onClick={() => handleCopy('ads', paidAdSuite)}
                  className="px-3 py-1 text-xs font-semibold bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-100 flex items-center gap-1"
                >
                  {copiedKey === 'ads' ? <CheckCheck className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedKey === 'ads' ? 'Copied' : 'Copy All Ad Copy'}</span>
                </button>
              </div>
              <div className="p-4 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed font-mono">
                {paidAdSuite}
              </div>
            </div>
          )}
        </div>

        {/* Action-to-Result Intelligence Footer */}
        <div className="p-3.5 bg-blue-50/70 border border-blue-200/80 rounded-2xl text-xs space-y-1">
          <div className="font-bold text-blue-950 flex items-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>Where do these repurposed assets go?</span>
          </div>
          <p className="text-[11px] text-blue-900/90 leading-relaxed">
            All 7 formats are generated from <strong>"{effectiveAsset.title}"</strong> and prepared for 1-click clipboard copy. Paste directly into LinkedIn, Twitter/X, Substack, Canva, or Meta Ads Manager. The original source article remains preserved in your <strong>Content Library</strong>.
          </p>
        </div>

        <div className="flex items-center justify-end pt-2 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
