import React, { useState } from 'react';
import { 
  Briefcase, 
  Search, 
  Palette, 
  ShieldCheck, 
  Scale, 
  Copy, 
  Check, 
  Download, 
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Lock,
  Layers,
  FileText
} from 'lucide-react';
import { 
  AFFILIATE_CHEAT_SHEET, 
  KEYWORD_MATRIX, 
  BRAND_IDENTITY_KIT, 
  EDITORIAL_CHARTER, 
  LEGAL_COMPLIANCE_SUITE 
} from '../data/fe-deliverables-data';
import confetti from 'canvas-confetti';

interface FEDeliverablesModalProps {
  isOpen: boolean;
  onClose: () => void;
  brandName?: string;
}

export const FEDeliverablesModal: React.FC<FEDeliverablesModalProps> = ({
  isOpen,
  onClose,
  brandName = 'Authority Studio'
}) => {
  const [activeTab, setActiveTab] = useState<'affiliate' | 'keywords' | 'brandkit' | 'charter' | 'legal'>('affiliate');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    confetti({ particleCount: 25, spread: 35 });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredKeywords = KEYWORD_MATRIX.filter(k => 
    k.keyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.searchIntent.toLowerCase().includes(searchQuery.toLowerCase()) ||
    k.mappedDecisionEngine.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-5xl w-full p-5 sm:p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Top Header */}
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20 shrink-0">
              <Briefcase className="w-6 h-6" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                  Front-End Core Deliverable Suite
                </span>
                <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ✓ Included Free With Business-in-a-Box
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1 font-display">
                Executive Asset Vault &amp; Turnkey Deliverables
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                5 master business-in-a-box assets: affiliate application scripts, 120-keyword matrix, brand design system, editorial charter, and legal compliance suite.
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

        {/* Tab Navigation */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl overflow-x-auto">
          <button
            onClick={() => setActiveTab('affiliate')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
              activeTab === 'affiliate' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5 text-blue-600" />
            <span>Affiliate Approval Cheat Sheet</span>
          </button>
          <button
            onClick={() => setActiveTab('keywords')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
              activeTab === 'keywords' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Search className="w-3.5 h-3.5 text-indigo-600" />
            <span>120-Keyword &amp; CPC Matrix</span>
          </button>
          <button
            onClick={() => setActiveTab('brandkit')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
              activeTab === 'brandkit' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Palette className="w-3.5 h-3.5 text-purple-600" />
            <span>Brand Identity &amp; Design Kit</span>
          </button>
          <button
            onClick={() => setActiveTab('charter')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
              activeTab === 'charter' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Editorial Standards Charter</span>
          </button>
          <button
            onClick={() => setActiveTab('legal')}
            className={`flex-1 py-2 px-3 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center justify-center gap-1.5 ${
              activeTab === 'legal' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-amber-600" />
            <span>Legal Compliance Suite</span>
          </button>
        </div>

        {/* TAB 1: AFFILIATE PARTNER CHEAT SHEET */}
        {activeTab === 'affiliate' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 space-y-1">
              <span className="font-bold text-blue-900">Guaranteed Partner Network Approvals</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Copy and paste these exact application scripts into merchant sign-up forms on ShareASale, ClickBank, Impact, and Amazon to get fast-track approvals within 24 hours.
              </p>
            </div>

            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {AFFILIATE_CHEAT_SHEET.map((item) => {
                const isCopied = copiedId === item.id;
                return (
                  <div key={item.id} className="border border-slate-200 rounded-2xl p-5 bg-white shadow-2xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono font-bold uppercase text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                            {item.network}
                          </span>
                          <span className="text-xs font-bold text-slate-900">{item.category}</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                          Avg Payout: <strong className="text-emerald-700">{item.averagePayout}</strong> • Cookie: {item.cookieDuration}
                        </div>
                      </div>
                      <button
                        onClick={() => handleCopy(item.id, item.guaranteedApprovalScript)}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors shrink-0 self-start sm:self-auto"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Script Copied!' : 'Copy Application Script'}</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        Guaranteed Approval Application Script:
                      </div>
                      <div className="text-xs text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed font-sans">
                        "{item.guaranteedApprovalScript}"
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px] text-slate-500">
                        <span className="font-bold">Key Monetization Products:</span>
                        {item.keyProducts.map((prod, pIdx) => (
                          <span key={pIdx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                            {prod}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: KEYWORD & CPC MATRIX */}
        {activeTab === 'keywords' && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 border border-slate-200 rounded-2xl p-3">
              <span className="text-xs text-slate-600 font-medium">
                High-CPC Commercial Keyword Clusters Mapped to Your Decision Engines
              </span>
              <div className="relative min-w-[220px]">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            <div className="overflow-x-auto max-h-[500px] border border-slate-200 rounded-2xl">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 border-b border-slate-200 sticky top-0">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Target Keyword</th>
                    <th className="py-2.5 px-3 font-semibold">Search Intent</th>
                    <th className="py-2.5 px-3 font-semibold">Monthly Volume</th>
                    <th className="py-2.5 px-3 font-semibold">Avg CPC</th>
                    <th className="py-2.5 px-3 font-semibold">Mapped Decision Engine</th>
                    <th className="py-2.5 px-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredKeywords.map((kw) => {
                    const isCopied = copiedId === kw.id;
                    return (
                      <tr key={kw.id} className="hover:bg-slate-50/60">
                        <td className="py-3 px-3 font-bold text-slate-900">{kw.keyword}</td>
                        <td className="py-3 px-3">
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                            {kw.searchIntent}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono font-bold text-slate-800">{kw.monthlyVolume}</td>
                        <td className="py-3 px-3 font-mono font-bold text-emerald-700">{kw.avgCpc}</td>
                        <td className="py-3 px-3 text-slate-600 font-medium">{kw.mappedDecisionEngine}</td>
                        <td className="py-3 px-3">
                          <button
                            onClick={() => handleCopy(kw.id, `${kw.keyword} (Vol: ${kw.monthlyVolume}, CPC: ${kw.avgCpc})`)}
                            className="p-1 rounded text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                            title="Copy Keyword"
                          >
                            {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: BRAND IDENTITY KIT */}
        {activeTab === 'brandkit' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 text-xs text-purple-950 space-y-1">
              <span className="font-bold text-purple-900">Executive Design System &amp; Brand Tokens</span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                Standardized typography scale, hex color ramps, vector logo specifications, and social banner templates designed for instant brand cohesion.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Typography Scale */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-2xs space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-purple-600" />
                  <span>Typography Scale &amp; Font Pairing</span>
                </h4>
                <div className="space-y-2">
                  <div className="text-[11px] font-semibold text-slate-700">
                    Heading: <span className="font-display font-bold text-slate-900">{BRAND_IDENTITY_KIT.typography.headingFont}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-700">
                    Body: <span className="font-sans font-medium text-slate-900">{BRAND_IDENTITY_KIT.typography.bodyFont}</span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-700">
                    Calculations: <span className="font-mono font-bold text-slate-900">{BRAND_IDENTITY_KIT.typography.monoFont}</span>
                  </div>
                </div>
                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px]">
                  {BRAND_IDENTITY_KIT.typography.scale.map((s, idx) => (
                    <div key={idx} className="flex items-center justify-between p-1.5 rounded bg-slate-50 border border-slate-100">
                      <span className="font-bold text-slate-900">{s.level}</span>
                      <span className="font-mono text-slate-500">{s.size} ({s.weight})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color Tokens */}
              <div className="border border-slate-200 rounded-2xl p-5 bg-white shadow-2xs space-y-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-blue-600" />
                  <span>Color Tokens &amp; Roles</span>
                </h4>
                <div className="space-y-2">
                  {BRAND_IDENTITY_KIT.colorTokens.map((c, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 rounded-xl border border-slate-200 bg-slate-50/50">
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-md border border-slate-300 shadow-2xs shrink-0" style={{ backgroundColor: c.hex }} />
                        <div>
                          <div className="text-xs font-bold text-slate-900">{c.name}</div>
                          <div className="text-[10px] text-slate-500">{c.role}</div>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-700">{c.hex}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EDITORIAL CHARTER */}
        {activeTab === 'charter' && (
          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2">
              <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-300">
                {EDITORIAL_CHARTER.version}
              </span>
              <h3 className="text-base font-black text-emerald-950">{EDITORIAL_CHARTER.title}</h3>
              <p className="text-xs text-emerald-900 leading-relaxed italic">
                "{EDITORIAL_CHARTER.statutoryPledge}"
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {EDITORIAL_CHARTER.corePillars.map((p, idx) => (
                <div key={idx} className="border border-slate-200 rounded-2xl p-4 bg-white shadow-2xs space-y-2">
                  <div className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{p.pillar}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{p.rule}</p>
                  <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-100 font-mono">
                    Audit: {p.auditMethod}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => handleCopy('charter', `${EDITORIAL_CHARTER.title}\n\n${EDITORIAL_CHARTER.statutoryPledge}\n\n${EDITORIAL_CHARTER.corePillars.map(p => `### ${p.pillar}\n${p.rule}\n`).join('\n')}`)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
              >
                {copiedId === 'charter' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedId === 'charter' ? 'Copied Full Charter!' : 'Copy Charter For Website'}</span>
              </button>
            </div>
          </div>
        )}

        {/* TAB 5: LEGAL & COMPLIANCE SUITE */}
        {activeTab === 'legal' && (
          <div className="space-y-4">
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
              {LEGAL_COMPLIANCE_SUITE.map((doc) => {
                const isCopied = copiedId === doc.id;
                return (
                  <div key={doc.id} className="border border-slate-200 rounded-2xl p-5 bg-white shadow-2xs space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{doc.title}</h4>
                        <span className="text-[11px] text-slate-500 font-mono">{doc.regulatoryJurisdiction} • Updated: {doc.lastUpdated}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(doc.id, `${doc.title}\n\n${doc.body}`)}
                        className="px-3.5 py-1.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors flex items-center gap-1.5 shrink-0 self-start sm:self-auto"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{isCopied ? 'Copied Legal Text!' : 'Copy Legal Document'}</span>
                      </button>
                    </div>

                    <div className="text-xs text-slate-700 bg-slate-50/70 p-4 rounded-xl border border-slate-200 whitespace-pre-wrap leading-relaxed font-sans">
                      {doc.body}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Included in Front-End Core License ($4.95)</span>
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
