import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Copy, 
  Plus, 
  ArrowRight, 
  ExternalLink, 
  Download, 
  Check, 
  Sparkles, 
  Search, 
  Globe,
  Palette,
  Type,
  FileText,
  Wrench,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { BusinessWorkspace, PlanTier } from '../types/authority';
import { store, PLAN_CONFIGS } from '../services/store';
import { allNichePackages } from '../data/niches';
import confetti from 'canvas-confetti';

interface PortfolioTabProps {
  currentPlan: PlanTier;
  onOpenCreateModal: () => void;
  onSelectWorkspace: (id: string) => void;
  initialOpenClone?: boolean;
}

export const PortfolioTab: React.FC<PortfolioTabProps> = ({
  currentPlan,
  onOpenCreateModal,
  onSelectWorkspace,
  initialOpenClone
}) => {
  const workspaces = store.getWorkspaces();
  const activeWorkspace = store.getActiveWorkspace();
  const entitlement = PLAN_CONFIGS[currentPlan];

  const [cloneModalOpen, setCloneModalOpen] = useState(false);
  const [sourceWsId, setSourceWsId] = useState(activeWorkspace?.id || workspaces[0]?.id || '');
  const [cloneName, setCloneName] = useState('');
  const [cloneNicheId, setCloneNicheId] = useState('ai-online-business');
  const [cloneError, setCloneError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Brand Expansion Studio state (Page 24 in PDF)
  const [brandVoicePreset, setBrandVoicePreset] = useState<'authoritative' | 'conversational' | 'technical' | 'pragmatic'>('authoritative');
  const [generatorKeyword, setGeneratorKeyword] = useState('Sustainable Solar Remodeling');
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [bulkExportNotice, setBulkExportNotice] = useState<string | null>(null);
  const [clonedNotice, setClonedNotice] = useState<{ id: string; name: string } | null>(null);

  const handleOpenClone = (wsId: string) => {
    setSourceWsId(wsId);
    const source = workspaces.find(w => w.id === wsId);
    setCloneName(source ? `${source.name} (Clone)` : 'New Authority Business');
    setCloneModalOpen(true);
    setCloneError('');
  };

  useEffect(() => {
    if (initialOpenClone) {
      const targetId = activeWorkspace?.id || workspaces[0]?.id;
      if (targetId) {
        handleOpenClone(targetId);
      }
    }
  }, [initialOpenClone]);

  const handleExecuteClone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cloneName) return;

    const res = store.cloneWorkspace(sourceWsId, cloneName, cloneNicheId);
    if (!res.success) {
      setCloneError(res.error || 'Failed to clone business');
      return;
    }

    setCloneModalOpen(false);
    confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
    if (res.workspace) {
      setClonedNotice({ id: res.workspace.id, name: res.workspace.name });
    }
  };

  const [isGeneratingBrands, setIsGeneratingBrands] = useState(false);

  const handleGenerateBrandNames = async () => {
    const kw = generatorKeyword.trim() || 'Authority Venture';
    setIsGeneratingBrands(true);
    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate_brand_names',
          prompt: `Generate 4 sophisticated, high-trust brand names for an authority property in "${kw}".`,
          businessContext: { niche: kw }
        })
      });
      const data = await res.json();
      if (data.text) {
        const lines = data.text.split('\n')
          .map((l: string) => l.replace(/^[0-9.-]+\s*/, '').replace(/[*_#]/g, '').trim())
          .filter((l: string) => l.length > 3 && l.length < 50);
        if (lines.length > 0) {
          setGeneratedNames(lines.slice(0, 4));
        } else {
          setGeneratedNames([
            `The ${kw.split(' ')[0]} Blueprint Co.`,
            `Verified ${kw} Insights`,
            `${kw.split(' ')[0]} Authority Systems`,
            `Apex ${kw.split(' ')[0]} Solutions`
          ]);
        }
      }
      confetti({ particleCount: 40, spread: 45 });
    } catch {
      const kwClean = kw.split(' ')[0] || 'Venture';
      setGeneratedNames([
        `The ${kwClean} Blueprint Co.`,
        `Verified ${kw} Insights`,
        `${kwClean} Authority Systems`,
        `Apex ${kwClean} Lab`
      ]);
    } finally {
      setIsGeneratingBrands(false);
    }
  };

  const handleBulkExport = () => {
    const bundle = {
      exportTimestamp: new Date().toISOString(),
      portfolioCount: workspaces.length,
      properties: workspaces.map(w => ({
        id: w.id,
        name: w.name,
        niche: w.nichePackageId,
        toolsCount: w.tools.length,
        contentCount: w.contentAssets.length,
        brand: w.brandProfile
      }))
    };
    const blob = new Blob([JSON.stringify(bundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `authority-portfolio-master-export-${workspaces.length}-businesses.json`;
    a.click();
    URL.revokeObjectURL(url);
    setBulkExportNotice(`Master export for all ${workspaces.length} businesses downloaded!`);
    setTimeout(() => setBulkExportNotice(null), 3500);
  };

  const filteredWorkspaces = workspaces.filter(w => 
    w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    w.nichePackageId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600 shrink-0" />
            <span>Expansion Studio — Multi-Business Portfolio & Scale Engine</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage up to {entitlement.maxWorkspaces} independent authority businesses with business cloning, brand voice presets, and bulk portfolio exports.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <button
            onClick={handleBulkExport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Bulk Portfolio Export</span>
          </button>
          <button
            onClick={onOpenCreateModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-all whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Business</span>
          </button>
        </div>
      </div>

      {bulkExportNotice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{bulkExportNotice}</span>
        </div>
      )}

      {clonedNotice && (
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 border border-indigo-500/40 text-white p-5 rounded-2xl shadow-md space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                <Copy className="w-4 h-4" />
              </span>
              <div>
                <span className="text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  New Property Provisioned
                </span>
                <h3 className="text-sm font-bold text-white mt-0.5">
                  Successfully Cloned: "{clonedNotice.name}"
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  store.setActiveWorkspace(clonedNotice.id);
                  onSelectWorkspace(clonedNotice.id);
                }}
                className="px-4 py-2 text-xs font-black bg-indigo-500 hover:bg-indigo-400 text-white rounded-xl shadow transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Switch to This Property Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setClonedNotice(null)}
                className="px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl transition-colors cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>

          <div className="text-xs text-slate-300 space-y-1">
            <p>
              <strong>Where did this go?</strong> Saved as an independent entity in your multi-brand portfolio database with 8 niche decision engines, 40 articles, and custom assets.
            </p>
            <p className="text-[11px] text-slate-400">
              You can switch between all your active businesses anytime using the workspace dropdown in the top header, or by clicking any property card below.
            </p>
          </div>
        </div>
      )}

      {/* Search & Stats Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search portfolio by name or niche..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Showing {filteredWorkspaces.length} of {workspaces.length} properties ({entitlement.maxWorkspaces} max in tier)
        </div>
      </div>

      {/* Portfolio Workspaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkspaces.length === 0 && (
          <div className="col-span-full bg-white border border-dashed border-slate-300 rounded-2xl p-8 text-center space-y-3">
            <Layers className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-800">No properties in portfolio yet</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Click "Create Business" above to generate your first authority business or clone an existing business once generated.
            </p>
            <button
              onClick={onOpenCreateModal}
              className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all cursor-pointer inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Your First Business</span>
            </button>
          </div>
        )}
        {filteredWorkspaces.map(ws => {
          const isActive = ws.id === activeWorkspace?.id;
          const pkg = allNichePackages.find(p => p.id === ws.nichePackageId);

          return (
            <div 
              key={ws.id} 
              className={`border rounded-2xl p-5 bg-white flex flex-col justify-between transition-all ${
                isActive 
                  ? 'border-indigo-600 ring-2 ring-indigo-100 shadow-sm' 
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    {ws.nichePackageId}
                  </span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold capitalize ${
                    ws.status === 'published' 
                      ? 'bg-emerald-50 text-emerald-700' 
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {ws.status}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-1 leading-snug">
                  {ws.name}
                </h3>
                <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                  {ws.brandProfile.mission}
                </p>

                {/* Counts Bar */}
                <div className="grid grid-cols-3 gap-2 py-2 border-y border-slate-100 text-center text-xs mb-4">
                  <div>
                    <div className="text-slate-400 text-[10px]">Tools</div>
                    <div className="font-mono font-bold text-slate-900">{ws.tools.length}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Articles</div>
                    <div className="font-mono font-bold text-slate-900">{ws.contentAssets.length}</div>
                  </div>
                  <div>
                    <div className="text-slate-400 text-[10px]">Promos</div>
                    <div className="font-mono font-bold text-slate-900">{ws.promotionAssets.length}</div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      store.setActiveWorkspace(ws.id);
                      onSelectWorkspace(ws.id);
                    }}
                    className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-slate-900 text-white font-bold' 
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isActive ? 'Active Workspace' : 'Open Workspace'}
                  </button>

                  <button
                    onClick={() => handleOpenClone(ws.id)}
                    className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-600"
                    title="Clone Business to New Niche"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Brand Expansion Studio (Page 24 in PDF) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <div>
          <span className="text-[10px] font-mono uppercase bg-indigo-50 text-indigo-700 font-bold px-2.5 py-0.5 rounded">
            Expansion Studio: Brand Scaling Engine
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 mt-1">
            Brand Identity Presets & Sub-Brand Name Generator
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure tonal presets and instantly generate high-trust brand names for expansion businesses across your portfolio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Brand Voice Presets */}
          <div className="border border-slate-200 rounded-xl p-5 space-y-3 bg-slate-50/50">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Type className="w-3.5 h-3.5 text-indigo-600" />
              <span>Brand Voice & Positioning Presets</span>
            </h3>

            <div className="space-y-2">
              {[
                { id: 'authoritative' as const, name: 'Authoritative Industry Leader', desc: 'Direct, confident, benchmark-grounded tone for premium buyers.' },
                { id: 'conversational' as const, name: 'Conversational Advisor', desc: 'Friendly, accessible peer-to-peer coaching with zero gatekeeping.' },
                { id: 'technical' as const, name: 'Data-Driven Technical Engineer', desc: 'Precise metrics, formula breakdowns, and trade standard code references.' },
                { id: 'pragmatic' as const, name: 'Direct Pragmatic Coach', desc: 'Action-first, zero-fluff frameworks engineered for fast execution.' },
              ].map(vp => (
                <label 
                  key={vp.id}
                  onClick={() => setBrandVoicePreset(vp.id)}
                  className={`p-3 rounded-lg border block cursor-pointer transition-all ${
                    brandVoicePreset === vp.id
                      ? 'bg-white border-indigo-500 shadow-2xs ring-1 ring-indigo-200'
                      : 'bg-white/60 border-slate-200 hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">{vp.name}</span>
                    {brandVoicePreset === vp.id && (
                      <Check className="w-3.5 h-3.5 text-indigo-600" />
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">{vp.desc}</p>
                </label>
              ))}
            </div>
          </div>

          {/* Sub-Brand & Tagline Generator */}
          <div className="border border-slate-200 rounded-xl p-5 space-y-4 bg-slate-50/50">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-indigo-600" />
              <span>Niche Name & Tagline Generator</span>
            </h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Target Sub-Niche or Keyword</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={generatorKeyword}
                    onChange={(e) => setGeneratorKeyword(e.target.value)}
                    placeholder="e.g. Sustainable Solar Remodeling"
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleGenerateBrandNames}
                    disabled={isGeneratingBrands}
                    className="px-3.5 py-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center gap-1 shrink-0 cursor-pointer disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>{isGeneratingBrands ? 'Thinking...' : 'AI Generate'}</span>
                  </button>
                </div>
              </div>

              {generatedNames.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-200">
                  <div className="text-[11px] font-bold text-slate-700">Generated High-Trust Candidate Names:</div>
                  {generatedNames.map((name, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900">{name}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(name);
                          confetti({ particleCount: 30, spread: 35 });
                        }}
                        className="text-[10px] font-semibold text-indigo-600 hover:text-indigo-800"
                      >
                        Copy
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="pt-2 text-[11px] text-slate-500">
                Generated brand kits include typography pairing: Plus Jakarta Sans (Headings) + Inter / JetBrains Mono (Calculators).
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clone Business Modal */}
      {cloneModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Copy className="w-4 h-4 text-indigo-600" />
                <span>Clone Business Property (OTO 2)</span>
              </h3>
              <button 
                onClick={() => setCloneModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleExecuteClone} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">New Business Name</label>
                <input
                  type="text"
                  required
                  value={cloneName}
                  onChange={(e) => setCloneName(e.target.value)}
                  placeholder="e.g. Algorithmic Growth Studio"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Target Niche Substitution</label>
                <select
                  value={cloneNicheId}
                  onChange={(e) => setCloneNicheId(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                >
                  {allNichePackages.map(pkg => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} ({pkg.category})
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-slate-500 mt-1">
                  Cloning populates target niche’s dedicated 40 content assets and 8 deterministic tools.
                </p>
              </div>

              {cloneError && (
                <div className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-lg border border-rose-200">
                  {cloneError}
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCloneModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs"
                >
                  Clone Authority Business Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
