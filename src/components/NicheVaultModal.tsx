import React, { useState } from 'react';
import { 
  Vault, 
  Search, 
  Sparkles, 
  Check, 
  ExternalLink,
  Tag,
  ArrowRight
} from 'lucide-react';
import { allNichePackages } from '../data/niches';
import { getNicheMarketDossier } from '../data/market-niche-intel';

interface NicheVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NicheVaultModal: React.FC<NicheVaultModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  if (!isOpen) return null;

  const filtered = allNichePackages.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tagline.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 text-white flex items-center justify-center font-bold shadow-md shadow-amber-500/20 shrink-0">
              <Vault className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[10px] font-mono font-bold text-amber-600 uppercase tracking-wider block">
                Bonus Catalog & Market Vault
              </span>
              <h2 className="text-xl font-black text-slate-900 tracking-tight">
                Niche Launch Vault: Verified Market Intelligence
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Every market audited with real search volume, Google commercial CPC rates, and verified case study run-rates.
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-lg font-bold px-2 py-1 cursor-pointer">
            ✕
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input 
            type="text"
            placeholder="Search profitable niches by keyword, industry, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Niche List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-96 overflow-y-auto pr-1">
          {filtered.map(pkg => {
            const dossier = getNicheMarketDossier(pkg.id, pkg.name, pkg.category);
            return (
              <div key={pkg.id} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-amber-300 transition-all space-y-2">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="uppercase text-amber-600 font-bold">{pkg.category}</span>
                  <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {dossier.caseStudy.provenMonthlyRevenue}
                  </span>
                </div>
                <h3 className="text-xs font-bold text-slate-900">{pkg.name}</h3>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">{pkg.tagline}</p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>CPC: <strong className="text-slate-700">{dossier.marketMetrics.averageCommercialCpc.split(' ')[0]} – {dossier.marketMetrics.averageCommercialCpc.split(' ')[2]}</strong></span>
                  <span>{dossier.marketMetrics.monthlySearchVolume.split(' ')[0]} searches/mo</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Showing {filtered.length} audited turnkey niche blueprints</span>
          <button onClick={onClose} className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 cursor-pointer">
            Close Vault
          </button>
        </div>
      </div>
    </div>
  );
};
