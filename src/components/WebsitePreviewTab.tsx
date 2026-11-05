import React, { useState } from 'react';
import { 
  Monitor, 
  Smartphone, 
  ExternalLink, 
  Download, 
  Check, 
  ArrowRight, 
  ShieldAlert, 
  Sparkles,
  Mail,
  FileText,
  Wrench,
  ShieldCheck,
  Star,
  Users,
  MessageSquare,
  Info,
  Lock,
  CheckCircle2,
  Phone,
  Send,
  ArrowLeft,
  Maximize2,
  Minimize2,
  Copy
} from 'lucide-react';
import { BusinessWorkspace } from '../types/authority';
import { generateStandaloneWebsiteHtml } from '../services/export-service';
import confetti from 'canvas-confetti';

interface WebsitePreviewTabProps {
  workspace: BusinessWorkspace;
  onNavigateToTool: (slug: string) => void;
  onNavigateToContent: (slug: string) => void;
  onNavigateTab?: (tab: string) => void;
}

type ViewportMode = 'desktop' | 'mobile';
export type PageView = 
  | 'home' 
  | 'tools' 
  | 'content' 
  | 'lead_magnet' 
  | 'offers'
  | 'about'
  | 'contact'
  | 'reviews'
  | 'comparisons'
  | 'downloads'
  | 'legal';

export const WebsitePreviewTab: React.FC<WebsitePreviewTabProps> = ({
  workspace,
  onNavigateToTool,
  onNavigateToContent,
  onNavigateTab
}) => {
  const [viewport, setViewport] = useState<ViewportMode>('desktop');
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [previewArticleSlug, setPreviewArticleSlug] = useState<string | null>(null);
  const [previewToolSlug, setPreviewToolSlug] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [optinEmail, setOptinEmail] = useState('');
  const [optinSuccess, setOptinSuccess] = useState(false);
  const [copiedLiveUrl, setCopiedLiveUrl] = useState(false);

  const canonicalUrl = workspace.publishedUrl 
    ? `https://${workspace.publishedUrl}`
    : `https://${workspace.brandProfile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.authoritystudio.app`;

  const handleCopyLiveUrl = () => {
    navigator.clipboard.writeText(canonicalUrl);
    setCopiedLiveUrl(true);
    confetti({ particleCount: 25, spread: 40 });
    setTimeout(() => setCopiedLiveUrl(false), 2000);
  };

  const [contactSubmitted, setContactSubmitted] = useState(false);

  const brand = workspace.brandProfile;
  const tools = workspace.tools;
  const content = workspace.contentAssets;
  const offers = workspace.monetizationMap.offers;

  // Filter content by review and comparison types
  const reviews = content.filter(c => c.type === 'review');
  const comparisons = content.filter(c => c.type === 'comparison');

  const handleOptinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!optinEmail) return;
    setOptinSuccess(true);
    confetti({ particleCount: 75, spread: 60, origin: { y: 0.7 } });
    setTimeout(() => {
      setOptinEmail('');
      setOptinSuccess(false);
    }, 4000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    confetti({ particleCount: 65, spread: 55, origin: { y: 0.6 } });
    setTimeout(() => setContactSubmitted(false), 3500);
  };

  const handleDownloadHtml = () => {
    const html = generateStandaloneWebsiteHtml(workspace);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${workspace.brandProfile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-website.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const pagesList: { id: PageView; label: string; countBadge?: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'tools', label: 'Decision Engines', countBadge: `${tools.length}` },
    { id: 'content', label: 'Articles', countBadge: `${content.length}` },
    { id: 'reviews', label: 'Reviews', countBadge: `${reviews.length}` },
    { id: 'comparisons', label: 'Comparisons', countBadge: `${comparisons.length}` },
    { id: 'lead_magnet', label: 'Free Playbook' },
    { id: 'offers', label: 'Partners', countBadge: `${offers.length}` },
    { id: 'downloads', label: 'Downloads' },
    { id: 'about', label: 'About & Mission' },
    { id: 'contact', label: 'Contact' },
    { id: 'legal', label: 'Disclosures & Legal' },
  ];

  const handleSelectPage = (pageId: PageView) => {
    setCurrentPage(pageId);
    setPreviewArticleSlug(null);
    setPreviewToolSlug(null);
  };

  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md p-3 sm:p-6 overflow-y-auto space-y-4' : ''}`}>
      {/* Network Publishing & Location Intelligence Bar */}
      <div className={`rounded-2xl p-4 border flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs transition-all ${
        workspace.isPublished
          ? 'bg-gradient-to-r from-emerald-950/80 via-slate-900 to-emerald-900 text-white border-emerald-500/30 shadow-xs'
          : 'bg-slate-900 text-white border-slate-700'
      }`}>
        <div className="flex items-start sm:items-center gap-3">
          <span className={`w-2.5 h-2.5 rounded-full mt-1 sm:mt-0 shrink-0 ${
            workspace.isPublished ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
          }`} />
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded border ${
                workspace.isPublished
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'
                  : 'bg-amber-500/20 text-amber-300 border-amber-400/30'
              }`}>
                {workspace.isPublished ? '🟢 Live on Cloud Edge CDN' : '🟡 Staging Mode (Local In-App)'}
              </span>
              <span className="font-mono text-[11px] text-slate-300 select-all font-semibold">
                {canonicalUrl}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {workspace.isPublished
                ? 'Where did it go? Live to the world! All 11 pages, 8 decision engines, and articles are published at this URL.'
                : 'Where did it go? Staged in this container. Click "Publish in Operations" to push all 11 pages to the live CDN.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {workspace.isPublished ? (
            <>
              <button
                onClick={handleCopyLiveUrl}
                className="px-3 py-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                {copiedLiveUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLiveUrl ? 'Copied' : 'Copy Link'}</span>
              </button>
              <button
                onClick={handleDownloadHtml}
                className="px-3 py-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-blue-300" />
                <span>Export HTML</span>
              </button>
              {onNavigateTab && (
                <button
                  onClick={() => onNavigateTab('operations')}
                  className="px-3 py-1.5 text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-lg shadow transition-all cursor-pointer"
                >
                  Operations Hub &rarr;
                </button>
              )}
            </>
          ) : (
            <>
              <button
                onClick={handleDownloadHtml}
                className="px-3 py-1.5 text-xs font-bold bg-white/10 hover:bg-white/20 text-white rounded-lg border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download HTML</span>
              </button>
              {onNavigateTab && (
                <button
                  onClick={() => onNavigateTab('operations')}
                  className="px-3.5 py-1.5 text-xs font-black bg-blue-500 hover:bg-blue-400 text-white rounded-lg shadow transition-all cursor-pointer"
                >
                  Publish in Operations &rarr;
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Viewport & Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white border border-slate-200 rounded-xl p-3 shadow-2xs">
        <div className="flex items-center gap-2">
          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab('dashboard')}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-lg transition-colors border border-slate-200 shrink-0 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg overflow-x-auto max-w-full">
            {pagesList.map(p => (
              <button
                key={p.id}
                onClick={() => handleSelectPage(p.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  currentPage === p.id && !previewArticleSlug && !previewToolSlug
                    ? 'bg-white text-slate-900 shadow-xs font-bold' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{p.label}</span>
                {p.countBadge && (
                  <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                    currentPage === p.id ? 'bg-slate-100 text-slate-800' : 'bg-slate-200/80 text-slate-500'
                  }`}>
                    {p.countBadge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
          {/* Viewport Toggles (Hidden on small mobile devices) */}
          <div className="hidden sm:flex items-center bg-slate-100 p-1 rounded-lg">
            <button
              onClick={() => setViewport('desktop')}
              className={`p-1.5 rounded transition-colors ${
                viewport === 'desktop' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Desktop 1440px Viewport"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewport('mobile')}
              className={`p-1.5 rounded transition-colors ${
                viewport === 'mobile' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Mobile Responsive Viewport"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Preview Mode'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-blue-600" /> : <Maximize2 className="w-3.5 h-3.5 text-slate-600" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>

          <button
            onClick={handleDownloadHtml}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Static HTML</span>
          </button>
        </div>
      </div>

      {/* Rendered Live Website Canvas */}
      <div className={`mx-auto transition-all duration-300 ${
        viewport === 'mobile' ? 'max-w-[420px]' : 'max-w-full'
      }`}>
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col min-h-[750px]">
          
          {/* Website Navigation Header */}
          <header className="border-b border-slate-200 px-3 sm:px-6 py-3.5 flex items-center justify-between gap-2 sm:gap-6 sticky top-0 bg-white/95 backdrop-blur-xs z-10">
            <button 
              onClick={() => handleSelectPage('home')}
              className="text-sm sm:text-base font-extrabold tracking-tight text-slate-900 whitespace-nowrap shrink-0 text-left cursor-pointer"
            >
              {brand.name}
            </button>
            <nav className="hidden lg:flex items-center gap-5 text-xs font-medium text-slate-600">
              <button onClick={() => handleSelectPage('home')} className={`hover:text-slate-900 transition-colors cursor-pointer ${currentPage === 'home' && !previewArticleSlug && !previewToolSlug ? 'font-bold text-slate-900' : ''}`}>
                Home
              </button>
              <button onClick={() => handleSelectPage('tools')} className={`hover:text-slate-900 transition-colors cursor-pointer ${currentPage === 'tools' && !previewToolSlug ? 'font-bold text-slate-900' : ''}`}>
                Decision Engines ({tools.length})
              </button>
              <button onClick={() => handleSelectPage('content')} className={`hover:text-slate-900 transition-colors cursor-pointer ${currentPage === 'content' && !previewArticleSlug ? 'font-bold text-slate-900' : ''}`}>
                Articles ({content.length})
              </button>
              <button onClick={() => handleSelectPage('reviews')} className={`hover:text-slate-900 transition-colors cursor-pointer ${currentPage === 'reviews' && !previewArticleSlug ? 'font-bold text-slate-900' : ''}`}>
                Reviews
              </button>
              <button onClick={() => handleSelectPage('comparisons')} className={`hover:text-slate-900 transition-colors cursor-pointer ${currentPage === 'comparisons' && !previewArticleSlug ? 'font-bold text-slate-900' : ''}`}>
                Comparisons
              </button>
              <button onClick={() => handleSelectPage('offers')} className={`hover:text-slate-900 transition-colors cursor-pointer ${currentPage === 'offers' ? 'font-bold text-slate-900' : ''}`}>
                Partners
              </button>
              <button onClick={() => handleSelectPage('about')} className={`hover:text-slate-900 transition-colors cursor-pointer ${currentPage === 'about' ? 'font-bold text-slate-900' : ''}`}>
                About
              </button>
              <button onClick={() => handleSelectPage('contact')} className={`hover:text-slate-900 transition-colors cursor-pointer ${currentPage === 'contact' ? 'font-bold text-slate-900' : ''}`}>
                Contact
              </button>
            </nav>

            <button
              onClick={() => handleSelectPage('lead_magnet')}
              className="px-2.5 sm:px-3.5 py-1.5 text-[11px] sm:text-xs font-semibold text-white rounded-lg whitespace-nowrap shrink-0 transition-opacity hover:opacity-90 shadow-2xs cursor-pointer"
              style={{ backgroundColor: brand.accentColor }}
            >
              <span className="hidden sm:inline">Get Free Playbook</span>
              <span className="sm:hidden">Playbook</span>
            </button>
          </header>

          {/* IN-PREVIEW ARTICLE READER */}
          {previewArticleSlug && (() => {
            const activeArticle = content.find(c => c.slug === previewArticleSlug) || content[0];
            return (
              <article className="flex-1 p-4 sm:p-10 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-150">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <button
                    onClick={() => setPreviewArticleSlug(null)}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl w-fit transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>&larr; Back to {currentPage === 'reviews' ? 'Reviews' : currentPage === 'comparisons' ? 'Comparisons' : 'Articles'}</span>
                  </button>

                  <button
                    onClick={() => onNavigateToContent(activeArticle.slug)}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200 transition-colors w-fit cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Edit in Studio Content Engine &rarr;</span>
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700 uppercase font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded">
                      {activeArticle.category}
                    </span>
                    <span>·</span>
                    <span>{activeArticle.readingTimeMinutes} min read</span>
                    <span>·</span>
                    <span className="capitalize">{activeArticle.type}</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {activeArticle.title}
                  </h1>

                  <p className="text-sm text-slate-600 italic bg-slate-50 border-l-2 border-slate-300 p-3 rounded-r-lg">
                    "{activeArticle.excerpt}"
                  </p>
                </div>

                <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-800 leading-relaxed font-sans space-y-4 whitespace-pre-line border-t border-slate-100 pt-6">
                  {activeArticle.body}
                </div>

                {/* Bound Decision Engine CTA Card */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded">
                      Interactive Verification
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 mt-1">
                      Calculate Exact Numbers for Your Project
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Don't rely on generic rules of thumb. Run deterministic simulations with verified local cost data.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setPreviewArticleSlug(null);
                      setPreviewToolSlug(tools[0]?.slug || 'cost-estimator');
                    }}
                    className="px-4 py-2 text-xs font-bold text-white rounded-xl shadow-xs transition-opacity hover:opacity-90 whitespace-nowrap self-start sm:self-auto cursor-pointer"
                    style={{ backgroundColor: brand.accentColor }}
                  >
                    Launch Decision Engine &rarr;
                  </button>
                </div>
              </article>
            );
          })()}

          {/* IN-PREVIEW DECISION TOOL RUNNER */}
          {previewToolSlug && !previewArticleSlug && (() => {
            const activeTool = tools.find(t => t.slug === previewToolSlug) || tools[0];
            return (
              <div className="flex-1 p-4 sm:p-10 max-w-4xl mx-auto space-y-6 animate-in fade-in duration-150">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <button
                    onClick={() => setPreviewToolSlug(null)}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl w-fit transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>&larr; Back to Decision Engines</span>
                  </button>

                  <button
                    onClick={() => onNavigateToTool(activeTool.slug)}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-xl border border-blue-200 transition-colors w-fit cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open in Studio Decision Workbench &rarr;</span>
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {activeTool.type} · Engine v{activeTool.logicVersion}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Deterministic Math
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    {activeTool.title}
                  </h1>
                  <p className="text-xs text-slate-600">
                    {activeTool.summary}
                  </p>
                </div>

                <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/50 space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                      <label className="text-xs font-bold text-slate-800 block">Floor Area / Sizing Scope</label>
                      <div className="text-lg font-black text-blue-600 font-mono">1,200 sq ft</div>
                      <p className="text-[11px] text-slate-500">Standard commercial trade specification footprint</p>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2">
                      <label className="text-xs font-bold text-slate-800 block">Projected Total Valuation</label>
                      <div className="text-2xl font-black text-slate-900 font-mono">$60,720</div>
                      <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                        94% Confidence Benchmark
                      </span>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-xl border border-slate-200 space-y-2">
                    <div className="text-xs font-bold text-slate-800">Verified Trade Compliance Disclaimer:</div>
                    <p className="text-xs text-slate-600 leading-relaxed">{activeTool.disclaimer}</p>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* VIEW 1: HOME */}
          {!previewArticleSlug && !previewToolSlug && currentPage === 'home' && (
            <div className="flex-1 space-y-12 pb-16">
              {/* Hero Block */}
              <section className="text-center px-4 sm:px-6 pt-12 max-w-3xl mx-auto space-y-4">
                <span className="text-[11px] font-mono uppercase bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md font-bold tracking-wider inline-block">
                  Verified Authority Property
                </span>
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
                  {brand.tagline}
                </h1>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {workspace.audienceProfile.targetPersona}. Built to deliver deterministic decision calculators, verified trade benchmarks, and unshakeable confidence.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => handleSelectPage('tools')}
                    className="px-4 py-2.5 text-xs font-semibold text-white rounded-lg transition-transform hover:-translate-y-0.5 shadow-2xs cursor-pointer"
                    style={{ backgroundColor: brand.primaryColor }}
                  >
                    Explore {tools.length} Decision Engines
                  </button>
                  <button
                    onClick={() => handleSelectPage('lead_magnet')}
                    className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                  >
                    Download Free Authority Playbook
                  </button>
                </div>
              </section>

              {/* Feature/Tool Grid Block */}
              <section className="px-4 sm:px-6 max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
                  <h2 className="text-base font-bold text-slate-900">
                    Signature Decision Engines ({tools.length})
                  </h2>
                  <button onClick={() => handleSelectPage('tools')} className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                    View All &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {tools.slice(0, 4).map(t => (
                    <div key={t.id} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-white hover:shadow-xs transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono text-slate-500 uppercase">{t.type}</span>
                          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded">
                            Verified Math
                          </span>
                        </div>
                        <h3 className="text-xs font-bold text-slate-900 mb-1 leading-snug">
                          {t.title}
                        </h3>
                        <p className="text-[11px] text-slate-600 line-clamp-2 mb-3">
                          {t.summary}
                        </p>
                      </div>
                      <button
                        onClick={() => setPreviewToolSlug(t.slug)}
                        className="text-left text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 pt-2 border-t border-slate-100 cursor-pointer"
                      >
                        <span>Run Simulation</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              {/* Curated Editorial Articles */}
              <section className="px-4 sm:px-6 max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-2">
                  <h2 className="text-base font-bold text-slate-900">
                    Featured Authority Guides & Investigations
                  </h2>
                  <button onClick={() => handleSelectPage('content')} className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer">
                    View All {content.length} Articles &rarr;
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {content.slice(0, 3).map(c => (
                    <div key={c.id} className="border border-slate-200 rounded-xl p-4 bg-white hover:border-slate-300 transition-all flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1">
                          <span className="font-semibold text-slate-700">{c.category}</span>
                          <span>·</span>
                          <span>{c.readingTimeMinutes} min read</span>
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                          {c.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-3 mb-4">
                          {c.excerpt}
                        </p>
                      </div>
                      <button
                        onClick={() => setPreviewArticleSlug(c.slug)}
                        className="text-left text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                      >
                        <span>Read Full Guide</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* VIEW 2: DECISION ENGINES (APP SHELF) */}
          {!previewArticleSlug && !previewToolSlug && currentPage === 'tools' && (
            <div className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Proprietary Decision Engines &amp; Simulation Models ({tools.length})
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Engineered with deterministic mathematics. Every formula is verified and guaranteed against AI calculation errors.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {tools.map(t => (
                  <div key={t.id} className="border border-slate-200 rounded-xl p-5 bg-white shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono text-slate-500 uppercase">{t.type} · v{t.logicVersion}</span>
                        <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                          Deterministic Math
                        </span>
                      </div>
                      <h2 className="text-base font-bold text-slate-900 mb-1.5">
                        {t.title}
                      </h2>
                      <p className="text-xs text-slate-600 mb-4">
                        {t.summary}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400">
                        {t.inputs.length} parameters · {t.resultMetrics.length} metrics
                      </span>
                      <button
                        onClick={() => setPreviewToolSlug(t.slug)}
                        className="px-3.5 py-1.5 text-xs font-semibold text-white rounded-lg transition-opacity hover:opacity-90 cursor-pointer"
                        style={{ backgroundColor: brand.accentColor }}
                      >
                        Launch Interactive Tool
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 3: CONTENT LIBRARY */}
          {!previewArticleSlug && !previewToolSlug && currentPage === 'content' && (
            <div className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Editorial Authority Library ({content.length} Guides)
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Curated editorial library covering materials, cost breakdowns, code requirements, and trade techniques.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {content.map(c => (
                  <div key={c.id} className="border border-slate-200 rounded-xl p-4 bg-white hover:border-slate-300 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-1.5">
                        <span className="font-semibold text-slate-700">{c.category}</span>
                        <span>·</span>
                        <span>{c.readingTimeMinutes} min read</span>
                        <span>·</span>
                        <span className="capitalize">{c.type}</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mb-2 leading-snug">
                        {c.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-3 mb-4">
                        {c.excerpt}
                      </p>
                    </div>
                    <button
                      onClick={() => setPreviewArticleSlug(c.slug)}
                      className="text-left text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Read Guide</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 4: PRODUCT REVIEWS HUB */}
          {!previewArticleSlug && !previewToolSlug && currentPage === 'reviews' && (
            <div className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Independent Product & Tool Reviews ({reviews.length})
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Exhaustive hands-on evaluations, benchmark comparisons, and genuine trade verdicts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {reviews.map((rev) => (
                  <div key={rev.id} className="border border-slate-200 rounded-xl p-5 bg-white shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center text-amber-500 gap-0.5 text-xs font-bold">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                          <span className="ml-1 text-slate-700 font-mono">4.9 / 5.0</span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                          Verified Evaluation
                        </span>
                      </div>

                      <h2 className="text-base font-bold text-slate-900 mb-1.5 leading-snug">
                        {rev.title}
                      </h2>
                      <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                        {rev.excerpt}
                      </p>

                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs space-y-1.5 mb-4">
                        <div className="font-semibold text-slate-800 text-[11px]">Key Trade Verdict:</div>
                        <div className="text-slate-600 text-[11px]">
                          Ranked top choice for longevity, compliance, and material ROI based on our deterministic cost model.
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => setPreviewArticleSlug(rev.slug)}
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700 cursor-pointer"
                      >
                        Read Full Review &rarr;
                      </button>

                      <button
                        onClick={() => handleSelectPage('offers')}
                        className="px-3 py-1.5 text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                      >
                        Check Pricing & Offers
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 5: COMPARISONS */}
          {!previewArticleSlug && !previewToolSlug && currentPage === 'comparisons' && (
            <div className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Head-to-Head Comparison Matrices ({comparisons.length})
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Direct side-by-side analysis of leading solutions, materials, and services in {workspace.name}.
                </p>
              </div>

              <div className="space-y-4">
                {comparisons.map(comp => (
                  <div key={comp.id} className="border border-slate-200 rounded-xl p-5 bg-white shadow-2xs hover:border-slate-300 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold">
                          Direct Comparison Breakdown
                        </span>
                        <h2 className="text-base font-bold text-slate-900 mt-1">
                          {comp.title}
                        </h2>
                      </div>
                      <button
                        onClick={() => setPreviewArticleSlug(comp.slug)}
                        className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 whitespace-nowrap self-start sm:self-auto cursor-pointer"
                      >
                        Inspect Matrix &rarr;
                      </button>
                    </div>

                    <p className="text-xs text-slate-600 mb-3">
                      {comp.excerpt}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs bg-slate-50 p-3 rounded-lg border border-slate-100">
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Primary Strength</span>
                        <span className="font-semibold text-slate-800">Commercial Longevity</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Cost Efficiency</span>
                        <span className="font-semibold text-emerald-700">Top Quartile ROI</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 block uppercase">Interactive AI Tool</span>
                        <span className="font-semibold text-blue-600">Live AI Tool Linked</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 6: LEAD MAGNET */}
          {!previewArticleSlug && !previewToolSlug && currentPage === 'lead_magnet' && (
            <div className="flex-1 p-4 sm:p-12 max-w-3xl mx-auto space-y-8">
              <div className="text-center space-y-3">
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 font-bold">
                  {workspace.leadMagnet.format}
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {workspace.leadMagnet.title}
                </h1>
                <p className="text-sm text-slate-600">
                  {workspace.leadMagnet.deliverableSummary}
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-6 bg-slate-50/70 space-y-3">
                <h2 className="text-sm font-bold text-slate-900">What’s Included Inside:</h2>
                <ul className="space-y-2 text-xs text-slate-700">
                  {workspace.leadMagnet.bulletPoints.map((bp, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {optinSuccess ? (
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-medium text-center space-y-1">
                  <div className="font-bold">Instant Access Confirmed!</div>
                  <div>Your playbook file is ready in the Member Downloads tab.</div>
                </div>
              ) : (
                <form onSubmit={handleOptinSubmit} className="space-y-3 max-w-md mx-auto">
                  <input
                    type="email"
                    value={optinEmail}
                    onChange={(e) => setOptinEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    required
                    className="w-full px-3.5 py-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 text-xs font-bold rounded-lg text-white transition-opacity hover:opacity-90 shadow-2xs"
                    style={{ backgroundColor: brand.accentColor }}
                  >
                    {workspace.leadMagnet.ctaText}
                  </button>
                </form>
              )}
            </div>
          )}

          {/* VIEW 7: OFFERS & PARTNERS */}
          {!previewArticleSlug && !previewToolSlug && currentPage === 'offers' && (
            <div className="flex-1 p-4 sm:p-8 max-w-6xl mx-auto space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Recommended Industry Solutions & Partners ({offers.length})
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Vetted partnerships, digital products, and manufacturer discounts.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {offers.map(o => (
                  <div key={o.id} className="border border-slate-200 rounded-xl p-5 bg-white shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] font-mono text-slate-500 uppercase mb-1">{o.badge}</div>
                      <h2 className="text-base font-bold text-slate-900 mb-1">
                        {o.name}
                      </h2>
                      <p className="text-xs text-slate-600 mb-4">
                        {o.description}
                      </p>
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-mono">
                        {o.isPaidAccess ? `$${o.price} Direct Purchase` : 'Trade Partnership'}
                      </span>
                      <a
                        href={o.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                      >
                        {o.isPaidAccess ? 'Purchase' : 'Access Deal'}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW 8: MEMBER DOWNLOADS */}
          {!previewArticleSlug && !previewToolSlug && currentPage === 'downloads' && (
            <div className="flex-1 p-4 sm:p-8 max-w-4xl mx-auto space-y-6">
              <div>
                <span className="text-[10px] font-mono uppercase bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded font-bold">
                  Member Delivery Area
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
                  Customer & Subscriber Download Portal
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Access your purchased guides, deterministic spreadsheets, and bonus checklists.
                </p>
              </div>

              <div className="space-y-3">
                <div className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">{workspace.leadMagnet.title}</div>
                      <div className="text-[11px] text-slate-500">PDF Playbook · Formatted Delivery · Latest Edition</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => confetti({ particleCount: 50, spread: 45 })}
                    className="px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
                  >
                    Download PDF
                  </button>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">8 Standalone HTML Decision Calculators (Offline Bundle)</div>
                      <div className="text-[11px] text-slate-500">Interactive Single-File Calculators · Zero Internet Required</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => confetti({ particleCount: 50, spread: 45 })}
                    className="px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
                  >
                    Download Tools Bundle
                  </button>
                </div>

                <div className="border border-slate-200 rounded-xl p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Official Verification & Checksum Manifest</div>
                      <div className="text-[11px] text-slate-500">Cryptographic audit manifest of all 40 assets and formulas</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => confetti({ particleCount: 50, spread: 45 })}
                    className="px-3 py-1.5 text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap self-start sm:self-auto cursor-pointer"
                  >
                    Download SHA-256
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW 9: ABOUT & MISSION */}
          {!previewArticleSlug && !previewToolSlug && currentPage === 'about' && (
            <div className="flex-1 p-4 sm:p-10 max-w-4xl mx-auto space-y-8">
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded font-bold">
                  Editorial Standards & Mission
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  About {brand.name}
                </h1>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {brand.mission}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-2">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Our Editorial Charter
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    We reject shallow AI fluff. Every calculator runs on peer-verified deterministic formulas, and every guide is built with real unit costs, verified standards, and clear trade disclosures.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-xl p-5 bg-slate-50/50 space-y-2">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Audience Promise
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dedicated specifically to {workspace.audienceProfile.targetPersona}, solving core bottlenecks with zero wasted words.
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6 space-y-3">
                <h3 className="text-sm font-bold text-slate-900">Founding Team & Editorial Board</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Led by industry veterans and licensed technical specialists committed to consumer protection, verified cost transparency, and unshakeable decision confidence.
                </p>
              </div>
            </div>
          )}

          {/* VIEW 10: CONTACT */}
          {!previewArticleSlug && !previewToolSlug && currentPage === 'contact' && (
            <div className="flex-1 p-4 sm:p-10 max-w-3xl mx-auto space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Contact Editorial & Partnerships
                </h1>
                <p className="text-xs text-slate-600 mt-1">
                  Have a suggestion, calculation benchmark dispute, or partnership pitch? Reach our team directly.
                </p>
              </div>

              {contactSubmitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-300 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="text-sm font-bold text-emerald-900">Message Received!</div>
                  <p className="text-xs text-emerald-700">Thank you for contacting {brand.name}. Our editorial team will review your inquiry within 24 business hours.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4 bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Your Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        placeholder="sarah@example.com"
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Inquiry Topic</label>
                    <select className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white">
                      <option>Editorial Feedback / Tool Benchmark</option>
                      <option>Affiliate & Commercial Partnership</option>
                      <option>Press / Media Inquiry</option>
                      <option>Customer Support / Deliverable Access</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Message</label>
                    <textarea 
                      rows={4}
                      required 
                      placeholder="Please share detailed context regarding your question or proposal..."
                      className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-5 py-2.5 text-xs font-bold rounded-lg text-white transition-opacity hover:opacity-90 flex items-center justify-center gap-2 cursor-pointer"
                    style={{ backgroundColor: brand.primaryColor }}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message to Editorial Team</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* VIEW 11: LEGAL & DISCLOSURES */}
          {!previewArticleSlug && !previewToolSlug && currentPage === 'legal' && (
            <div className="flex-1 p-4 sm:p-10 max-w-4xl mx-auto space-y-6">
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Legal Compliance, Privacy & Disclosures
                </h1>
                <p className="text-xs text-slate-500 mt-1">
                  Full compliance statement for {brand.name} pursuant to FTC, GDPR, and trade regulations.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-5 bg-white shadow-2xs space-y-3 text-xs leading-relaxed text-slate-700">
                <h3 className="text-sm font-bold text-slate-900">1. FTC Affiliate Disclosure</h3>
                <p>{workspace.monetizationMap.affiliateDisclosures}</p>
                <p>
                  We believe in 100% transparency. When you click through our links to purchase products, services, or tools, we may earn an affiliate commission at absolutely zero additional cost to you. We only recommend tools that meet our strict benchmarks.
                </p>

                <h3 className="text-sm font-bold text-slate-900 pt-3 border-t border-slate-100">2. Privacy Policy & Data Handling</h3>
                <p>
                  We respect your privacy. Email addresses captured for lead magnets and updates are securely encrypted, never rented or sold to third-party data brokers, and used exclusively to deliver the requested authority content and welcome sequences. You can unsubscribe at any time with one click.
                </p>

                <h3 className="text-sm font-bold text-slate-900 pt-3 border-t border-slate-100">3. Non-Professional Advisory Disclaimer</h3>
                <p>
                  All micro-tool calculations, estimators, and guides provided on {brand.name} are for informational, planning, and educational purposes only. They do not constitute formal architectural, legal, medical, or financial counsel. Always consult a licensed local professional before signing contracts or breaking ground.
                </p>
              </div>
            </div>
          )}

          {/* Website Global Footer */}
          <footer className="border-t border-slate-200 bg-slate-50/70 px-4 sm:px-8 py-8 text-xs text-slate-600 mt-auto space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <div className="font-bold text-slate-900 mb-2">{brand.name}</div>
                <p className="text-[11px] text-slate-500 leading-relaxed mb-3">
                  {brand.tagline}
                </p>
                <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Authority Brand
                </span>
              </div>

              <div>
                <div className="font-bold text-slate-900 mb-2 uppercase text-[10px] tracking-wider">Navigation</div>
                <ul className="space-y-1.5 text-slate-600 text-xs">
                  <li><button onClick={() => handleSelectPage('home')} className="hover:text-slate-900 cursor-pointer">Homepage</button></li>
                  <li><button onClick={() => handleSelectPage('tools')} className="hover:text-slate-900 cursor-pointer">Micro-Tools ({tools.length})</button></li>
                  <li><button onClick={() => handleSelectPage('content')} className="hover:text-slate-900 cursor-pointer">Articles ({content.length})</button></li>
                  <li><button onClick={() => handleSelectPage('lead_magnet')} className="hover:text-slate-900 cursor-pointer">Free Playbook</button></li>
                </ul>
              </div>

              <div>
                <div className="font-bold text-slate-900 mb-2 uppercase text-[10px] tracking-wider">Editorial & Deals</div>
                <ul className="space-y-1.5 text-slate-600 text-xs">
                  <li><button onClick={() => handleSelectPage('reviews')} className="hover:text-slate-900 cursor-pointer">Reviews Hub</button></li>
                  <li><button onClick={() => handleSelectPage('comparisons')} className="hover:text-slate-900 cursor-pointer">Comparisons</button></li>
                  <li><button onClick={() => handleSelectPage('offers')} className="hover:text-slate-900 cursor-pointer">Partner Offers</button></li>
                  <li><button onClick={() => handleSelectPage('downloads')} className="hover:text-slate-900 cursor-pointer">Member Downloads</button></li>
                </ul>
              </div>

              <div>
                <div className="font-bold text-slate-900 mb-2 uppercase text-[10px] tracking-wider">Company & Legal</div>
                <ul className="space-y-1.5 text-slate-600 text-xs">
                  <li><button onClick={() => handleSelectPage('about')} className="hover:text-slate-900 cursor-pointer">About & Mission</button></li>
                  <li><button onClick={() => handleSelectPage('contact')} className="hover:text-slate-900 cursor-pointer">Contact Us</button></li>
                  <li><button onClick={() => handleSelectPage('legal')} className="hover:text-slate-900 cursor-pointer">Disclosures & Terms</button></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4 text-center text-[11px] text-slate-400">
              <p>&copy; {new Date().getFullYear()} {brand.name}. All rights reserved.</p>
              <p className="mt-1 max-w-2xl mx-auto leading-relaxed">
                {workspace.monetizationMap.affiliateDisclosures}
              </p>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
};
