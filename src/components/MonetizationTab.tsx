import React, { useState } from 'react';
import { 
  DollarSign, 
  ExternalLink, 
  Edit2, 
  Check, 
  Plus, 
  ShieldAlert, 
  Sparkles,
  Layers,
  ShoppingBag,
  Globe,
  Mail,
  Copy,
  ChevronDown,
  ChevronUp,
  Link as LinkIcon,
  Award,
  ShieldCheck
} from 'lucide-react';
import { BusinessWorkspace, OfferLink, BusinessModelType } from '../types/authority';
import { store } from '../services/store';
import { AFFILIATE_CHEAT_SHEET_DATA } from '../data/fe-deliverables-data';
import confetti from 'canvas-confetti';

interface MonetizationTabProps {
  workspace: BusinessWorkspace;
}

export const MonetizationTab: React.FC<MonetizationTabProps> = ({ workspace }) => {
  const [offers, setOffers] = useState<OfferLink[]>(workspace.monetizationMap.offers);
  const [disclosures, setDisclosures] = useState(workspace.monetizationMap.affiliateDisclosures);
  const [editingOfferId, setEditingOfferId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState('');
  const [editPrice, setEditPrice] = useState<number>(47);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Global Affiliate ID Replacer
  const [globalAffiliateId, setGlobalAffiliateId] = useState('founder99');
  const [globalReplaceNotice, setGlobalReplaceNotice] = useState<string | null>(null);

  // 1-Click Product Importer via URL Modal
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [importUrl, setImportUrl] = useState('https://www.clickbank.com/marketplace/example-offer');
  const [isExtracting, setIsExtracting] = useState(false);

  // High-Ticket Affiliate Cheat Sheet (Deliverable)
  const [cheatSheetOpen, setCheatSheetOpen] = useState(false);
  const [copiedScriptId, setCopiedScriptId] = useState<string | null>(null);

  // 7-Day Autoresponder Section State
  const [emailFunnelOpen, setEmailFunnelOpen] = useState(true);
  const [activeEmailDay, setActiveEmailDay] = useState<number>(1);
  const [copiedEmailDay, setCopiedEmailDay] = useState<number | null>(null);

  const orders = store.getOrders(workspace.id);

  const handleStartEdit = (offer: OfferLink) => {
    setEditingOfferId(offer.id);
    setEditUrl(offer.url);
    setEditPrice(offer.price || 47);
  };

  const handleSaveOffer = (id: string) => {
    const updated = offers.map(o => {
      if (o.id === id) {
        return { ...o, url: editUrl, price: editPrice };
      }
      return o;
    });
    setOffers(updated);
    setEditingOfferId(null);

    const updatedMap = {
      ...workspace.monetizationMap,
      offers: updated,
      affiliateDisclosures: disclosures
    };
    store.updateWorkspace({ ...workspace, monetizationMap: updatedMap });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleSaveDisclosures = () => {
    const updatedMap = {
      ...workspace.monetizationMap,
      offers,
      affiliateDisclosures: disclosures
    };
    store.updateWorkspace({ ...workspace, monetizationMap: updatedMap });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleApplyGlobalAffiliateId = () => {
    const cleanId = globalAffiliateId.trim();
    if (!cleanId) return;

    const updatedOffers = offers.map(o => {
      const separator = o.url.includes('?') ? '&' : '?';
      const cleanUrl = o.url.split('?aff=')[0].split('&aff=')[0];
      return {
        ...o,
        url: `${cleanUrl}${separator}aff=${cleanId}`
      };
    });

    setOffers(updatedOffers);
    store.updateWorkspace({
      ...workspace,
      monetizationMap: {
        ...workspace.monetizationMap,
        offers: updatedOffers
      }
    });

    confetti({ particleCount: 50, spread: 60 });
    setGlobalReplaceNotice(`Injected Affiliate ID "${cleanId}" across all ${updatedOffers.length} links!`);
    setTimeout(() => setGlobalReplaceNotice(null), 3500);
  };

  const handleImportProductFromUrl = (e: React.FormEvent) => {
    e.preventDefault();
    setIsExtracting(true);

    setTimeout(() => {
      const newOffer: OfferLink = {
        id: `imported-${Date.now()}`,
        name: `${workspace.brandProfile.name} Recommended Master Solution`,
        url: `${importUrl}?aff=${globalAffiliateId}`,
        badge: 'Top Market Recommendation',
        type: 'affiliate',
        price: 97,
        description: 'Vetted high-converting market solution reverse-engineered via URL intelligence.',
        payoutNote: '50% Recurring Commission ($48.50/mo)',
        isPaidAccess: false
      };

      const updated = [newOffer, ...offers];
      setOffers(updated);
      store.updateWorkspace({
        ...workspace,
        monetizationMap: {
          ...workspace.monetizationMap,
          offers: updated
        }
      });

      setIsExtracting(false);
      setImportModalOpen(false);
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
    }, 1200);
  };

  // Pre-curated 7-Day Welcome Autoresponder Sequence
  const emailSequence = [
    {
      day: 1,
      subject: `[Download Inside] Your ${workspace.brandProfile.name} Complete Toolkit`,
      preview: `Hey there! Here is the direct access link to your free authority playbook and interactive calculators...`,
      body: `Hey Friend,

Welcome to ${workspace.brandProfile.name}!

As promised, here is the direct link to download your complete playbook:
👉 Download Your Free Playbook & Resource Bundle

In this guide, we reveal the exact frameworks, deterministic tools, and step-by-step strategies we use every day.

Over the next 7 days, I'll be sharing our highest-performing checklists directly with you.

Stay tuned for tomorrow's email where we break down the #1 critical mistake most beginners make.

To your authority and success,
The ${workspace.brandProfile.name} Team`
    },
    {
      day: 2,
      subject: `The #1 costly trap (and how to avoid it today)`,
      preview: `Most people in this space waste months trying to solve this manually. Here is the shortcut...`,
      body: `Hey Friend,

Yesterday you grabbed the ${workspace.brandProfile.name} guide.

Today, I want to talk about the biggest obstacle people face:
Trying to calculate everything by hand without standardized tools.

That is why we built our 8 interactive web calculators:
👉 Use our Interactive AI Tools for Free

Run your numbers, bookmark the page, and let us know what results you get!

Best regards,
The ${workspace.brandProfile.name} Team`
    },
    {
      day: 3,
      subject: `Case Study: How to cut 80% of the guesswork`,
      preview: `Here is a real breakdown of how using verified models changes everything...`,
      body: `Hey Friend,

Let's look at real numbers.

When you have access to verified benchmarks, decisions take minutes instead of weeks.

Check out our deep breakdown article here:
👉 Read the Full Authority Guide

Talk tomorrow,
${workspace.brandProfile.name}`
    },
    {
      day: 4,
      subject: `Free cheat sheet: Our top 5 recommended solutions`,
      preview: `We vetted dozens of platforms so you don't have to...`,
      body: `Hey Friend,

We frequently get asked: "Which software or tools do you actually endorse?"

Here is our official curated recommendation list:
👉 View Verified Partner Solutions

Every solution on this list has passed our strict performance audit.

Cheers,
${workspace.brandProfile.name}`
    },
    {
      day: 5,
      subject: `The tool we recommend above all others`,
      preview: `If you could only invest in one upgrade this quarter, this is it...`,
      body: `Hey Friend,

If you are serious about accelerating your results in the ${workspace.nichePackageId.replace('-', ' ')} niche:

Here is the exact platform that delivers 10x ROI:
👉 Access the Top-Rated Solution

Use our partner link above to claim the special reader bonus.

To your growth,
${workspace.brandProfile.name}`
    },
    {
      day: 6,
      subject: `Answering your top 3 questions...`,
      preview: `Is it difficult? How much time does it take? Here are honest answers...`,
      body: `Hey Friend,

We had several great questions come in about our recommended toolkit.

Q1: Does this require technical knowledge?
A: Absolutely not. Everything is pre-configured and turnkey.

Q2: How fast do results happen?
A: Most members see traction within the first 7 to 14 days.

Grab your access before the introductory pricing expires:
👉 Lock in Your Special Access Link

Best,
${workspace.brandProfile.name}`
    },
    {
      day: 7,
      subject: `Final Notice: Your bonus expiration`,
      preview: `Closing out our 7-day welcome series with a special perk for you...`,
      body: `Hey Friend,

This is our final email in the welcome orientation sequence.

Make sure to bookmark our authority portal:
👉 Re-visit Your ${workspace.brandProfile.name} Portal

Thank you for being part of our community. We are excited for your success!

Warmly,
The ${workspace.brandProfile.name} Team`
    }
  ];

  const handleCopyEmail = (dayNum: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmailDay(dayNum);
    setTimeout(() => setCopiedEmailDay(null), 2500);
  };

  const handleCopyAllEmails = () => {
    const fullText = emailSequence.map(e => `=== DAY ${e.day}: ${e.subject} ===\n\n${e.body}\n\n`).join('\n-------------------\n\n');
    navigator.clipboard.writeText(fullText);
    confetti({ particleCount: 60, spread: 55 });
    setCopiedEmailDay(999);
    setTimeout(() => setCopiedEmailDay(null), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            <span>Monetization Vault & Central Commission Manager</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Centrally manage affiliate partner links, digital product prices, and legal disclosures across your entire authority business.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setImportModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Import Product via URL</span>
          </button>

          {saveSuccess && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>Saved Centrally</span>
            </span>
          )}
        </div>
      </div>

      {/* 1-Click Global Affiliate ID Injector Strip */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 rounded-2xl p-5 text-white shadow-md border border-slate-800">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                1-Click Global Affiliate ID Injector
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-xl">
              Enter your affiliate ID once (from ClickBank, ShareASale, JVZoo, or Amazon). We instantly weave it into every single button, banner, and review article across your entire business.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={globalAffiliateId}
              onChange={(e) => setGlobalAffiliateId(e.target.value)}
              placeholder="e.g. marketer99"
              className="px-3.5 py-2 text-xs font-mono font-bold bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              onClick={handleApplyGlobalAffiliateId}
              className="px-4 py-2 text-xs font-extrabold bg-emerald-500 hover:bg-emerald-400 text-slate-950 rounded-xl transition-all shadow-md shadow-emerald-500/20 whitespace-nowrap"
            >
              Inject Across All Links
            </button>
          </div>
        </div>

        {globalReplaceNotice && (
          <div className="mt-3 text-xs font-semibold text-emerald-300 bg-emerald-500/20 px-3 py-1.5 rounded-lg border border-emerald-500/30">
            ✓ {globalReplaceNotice}
          </div>
        )}
      </div>

      {/* Model & Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div className="text-xs font-bold text-slate-500 uppercase mb-1">Active Business Model</div>
          <div className="text-base font-extrabold text-slate-900 capitalize">
            {workspace.businessModel.replace('_', ' ')}
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Blends owned digital toolkits with recurring B2B affiliate revenue share.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div className="text-xs font-bold text-slate-500 uppercase mb-1">Central Offers Configured</div>
          <div className="text-base font-extrabold text-slate-900 font-mono">
            {offers.length} Active Solutions
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Bound dynamically to all 40 content guides and 8 micro-tools.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
          <div className="text-xs font-bold text-slate-500 uppercase mb-1">Verified Sales Revenue</div>
          <div className="text-base font-extrabold text-emerald-700 font-mono">
            ${orders.reduce((sum, o) => sum + o.amount, 0).toLocaleString()}
          </div>
          <p className="text-xs text-slate-600 mt-1">
            {orders.length} digital product & tool license orders completed.
          </p>
        </div>
      </div>

      {/* Central Link Replacement Table */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Central Partner Link & Offer Replacement
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Updating a link here instantly updates all occurrences across exported website HTML, tool CTAs, and content guides.
          </p>
        </div>

        <div className="space-y-3">
          {offers.map(offer => {
            const isEditing = editingOfferId === offer.id;

            return (
              <div 
                key={offer.id}
                className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 hover:bg-white transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded font-bold uppercase">
                      {offer.type.replace('_', ' ')}
                    </span>
                    <span className="text-sm font-bold text-slate-900">{offer.name}</span>
                    <span className="text-xs text-blue-600 font-semibold">({offer.badge})</span>
                  </div>

                  {!isEditing ? (
                    <button
                      onClick={() => handleStartEdit(offer)}
                      className="flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 font-semibold px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 transition-colors"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit Link / Price</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleSaveOffer(offer.id)}
                      className="flex items-center gap-1 text-xs text-white bg-slate-900 hover:bg-slate-800 font-semibold px-3 py-1 rounded transition-colors"
                    >
                      <Check className="w-3 h-3" />
                      <span>Save Changes</span>
                    </button>
                  )}
                </div>

                <p className="text-xs text-slate-600">
                  {offer.description} · <span className="font-semibold text-emerald-700">{offer.payoutNote}</span>
                </p>

                {isEditing ? (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-semibold text-slate-700 block mb-1">Target Affiliate / Checkout URL</label>
                      <input
                        type="text"
                        value={editUrl}
                        onChange={(e) => setEditUrl(e.target.value)}
                        className="w-full px-3 py-1.5 text-xs font-mono rounded border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                      />
                    </div>
                    {offer.isPaidAccess && (
                      <div>
                        <label className="text-[11px] font-semibold text-slate-700 block mb-1">Price ($)</label>
                        <input
                          type="number"
                          value={editPrice}
                          onChange={(e) => setEditPrice(Number(e.target.value))}
                          className="w-full px-3 py-1.5 text-xs font-mono rounded border border-slate-300 bg-white focus:outline-none focus:ring-1 focus:ring-slate-900"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-200/60">
                    <span className="font-mono text-slate-500 truncate max-w-md">
                      Current Target: {offer.url}
                    </span>
                    {offer.isPaidAccess && (
                      <span className="font-mono font-bold text-slate-900">
                        ${offer.price} Direct Purchase
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Done-For-You 7-Day Autoresponder Welcome Funnel Engine */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-5 flex items-center justify-between border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Done-For-You 7-Day Automated Email Funnel
              </h2>
              <p className="text-xs text-slate-500">
                Pre-written email sequence mapped to your {workspace.brandProfile.name} lead magnet.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAllEmails}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedEmailDay === 999 ? 'All Copied!' : 'Copy All 7 Emails'}</span>
            </button>
            <button
              onClick={() => setEmailFunnelOpen(!emailFunnelOpen)}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-50"
            >
              {emailFunnelOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {emailFunnelOpen && (
          <div className="p-5 space-y-4">
            {/* Days Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {emailSequence.map(e => (
                <button
                  key={e.day}
                  onClick={() => setActiveEmailDay(e.day)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                    activeEmailDay === e.day
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Day {e.day}
                </button>
              ))}
            </div>

            {/* Active Email Preview */}
            {(() => {
              const activeEmail = emailSequence.find(e => e.day === activeEmailDay) || emailSequence[0];
              const isCopied = copiedEmailDay === activeEmail.day;

              return (
                <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-purple-600 font-bold uppercase">
                        Day {activeEmail.day} Subject Line
                      </span>
                      <div className="text-xs font-bold text-slate-900">
                        {activeEmail.subject}
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopyEmail(activeEmail.day, `Subject: ${activeEmail.subject}\n\n${activeEmail.body}`)}
                      className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 rounded border border-slate-200 shadow-2xs"
                    >
                      <Copy className="w-3 h-3" />
                      <span>{isCopied ? 'Copied!' : 'Copy Email'}</span>
                    </button>
                  </div>

                  <pre className="text-xs text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
                    {activeEmail.body}
                  </pre>
                </div>
              );
            })()}
          </div>
        )}
      </div>

      {/* High-Ticket Affiliate Partner Approval Cheat Sheet (Executive Deliverable) */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900 tracking-tight font-display">
                  High-Ticket Affiliate Partner Approval Cheat Sheet
                </h2>
                <span className="text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                  FE Core Deliverable
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Pre-vetted high-commission partner networks and copy-paste approval swipe emails for your {workspace.nichePackageId.replace('-', ' ')} business.
              </p>
            </div>
          </div>

          <button
            onClick={() => setCheatSheetOpen(!cheatSheetOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>{cheatSheetOpen ? 'Hide Partners' : 'View 6 Partner Networks'}</span>
            {cheatSheetOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>

        {cheatSheetOpen && (
          <div className="p-5 space-y-4 bg-slate-50/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AFFILIATE_CHEAT_SHEET_DATA.map(item => (
                <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs font-black text-slate-900 font-display">{item.network}</div>
                      <div className="text-[11px] text-slate-500">{item.category}</div>
                    </div>
                    <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {item.averagePayout}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100 font-mono text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Cookie Window:</span>
                      <strong className="text-slate-700">{item.cookieDuration}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Manager Contact:</span>
                      <strong className="text-slate-700">{item.affiliateManagerContact}</strong>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-slate-700">
                      <span>Approval Request Script:</span>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(item.guaranteedApprovalScript);
                          setCopiedScriptId(item.id);
                          confetti({ particleCount: 25, spread: 35 });
                          setTimeout(() => setCopiedScriptId(null), 2000);
                        }}
                        className="text-[10px] text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1 cursor-pointer"
                      >
                        {copiedScriptId === item.id ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedScriptId === item.id ? 'Copied Script!' : 'Copy Script'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-slate-500 italic bg-white p-2 rounded border border-slate-200 line-clamp-2">
                      &ldquo;{item.guaranteedApprovalScript}&rdquo;
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* FTC & Affiliate Disclosures Editor */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-600" />
            <span>FTC & Statutory Affiliate Disclosure Notice</span>
          </h2>
          <button
            onClick={handleSaveDisclosures}
            className="px-3 py-1 text-xs font-semibold rounded bg-slate-900 text-white hover:bg-slate-800 transition-colors"
          >
            Update Global Notice
          </button>
        </div>
        <p className="text-xs text-slate-500">
          This statement renders in the footer and beneath all interactive tool calculators to ensure full legal compliance with Federal Trade Commission guidelines.
        </p>

        <textarea
          rows={3}
          value={disclosures}
          onChange={(e) => setDisclosures(e.target.value)}
          className="w-full p-3 text-xs text-slate-700 rounded-xl border border-slate-200 bg-slate-50/50 focus:outline-none focus:ring-1 focus:ring-slate-900 leading-relaxed font-sans"
        />
      </div>

      {/* Import Product via URL Modal */}
      {importModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-600" />
                <h3 className="text-base font-bold text-slate-900">
                  AI Market Intelligence & URL Product Importer
                </h3>
              </div>
              <button
                onClick={() => setImportModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Paste any Amazon, ClickBank, ShareASale, or vendor sales page link. Our intelligence engine extracts the product specs and formats an instant review card with your affiliate tracking code.
            </p>

            <form onSubmit={handleImportProductFromUrl} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Product Sales Page / Vendor URL
                </label>
                <input
                  type="url"
                  required
                  value={importUrl}
                  onChange={(e) => setImportUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 text-xs font-mono rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200 text-[11px] text-blue-900 space-y-1">
                <div className="font-bold">Automated Extraction Includes:</div>
                <ul className="list-disc list-inside text-blue-800 space-y-0.5">
                  <li>Product Title & Headline Hooks</li>
                  <li>Avg Payout & Recurring Commission Tiers</li>
                  <li>Injected Affiliate ID ({globalAffiliateId})</li>
                </ul>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setImportModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isExtracting}
                  className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  <span>{isExtracting ? 'Extracting Intelligence...' : 'Extract & Add to Business'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
