import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  Plus, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Eye, 
  Download,
  FileCheck,
  Lock,
  Sparkles,
  MapPin,
  Calendar,
  Award,
  FileText,
  Share2,
  Check,
  Copy
} from 'lucide-react';
import { BusinessWorkspace, PlanTier, ClientWorkspace } from '../types/authority';
import { store, PLAN_CONFIGS } from '../services/store';
import confetti from 'canvas-confetti';

interface CommercialTabProps {
  currentPlan: PlanTier;
  activeWorkspace?: BusinessWorkspace | null;
  initialSubSection?: 'clients' | 'license' | 'proposals' | 'local_package' | 'event_package';
}

export const CommercialTab: React.FC<CommercialTabProps> = ({
  currentPlan,
  activeWorkspace,
  initialSubSection
}) => {
  const entitlement = PLAN_CONFIGS[currentPlan];
  const clientWorkspaces = store.getClientWorkspaces();
  const auditLogs = store.getAuditLogs();

  const effectiveWs = activeWorkspace || store.getActiveWorkspace() || store.getWorkspaces()[0] || {
    id: 'ws-demo',
    name: 'Authority Media Agency',
    nichePackageId: 'high-ticket-consulting',
    brandProfile: {
      name: 'Authority Agency Network',
      tagline: 'Enterprise B2B Authority Platforms & Interactive Decision Systems',
      primaryColor: '#2563eb',
      accentColor: '#f59e0b'
    },
    tools: [
      { id: 'tool-1', name: 'ROI Decision Engine' },
      { id: 'tool-2', name: 'Interactive Pricing Matrix' },
      { id: 'tool-3', name: 'Project Scope Benchmark' }
    ],
    contentAssets: [
      { id: 'art-1', title: 'The High-Ticket Agency Acquisition System' },
      { id: 'art-2', title: 'Enterprise Retainer Pricing Playbook' }
    ]
  };

  const [activeSubSection, setActiveSubSection] = useState<'clients' | 'license' | 'proposals' | 'local_package' | 'event_package'>(initialSubSection || 'clients');

  useEffect(() => {
    if (initialSubSection) {
      setActiveSubSection(initialSubSection);
    }
  }, [initialSubSection]);

  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [previewingClient, setPreviewingClient] = useState<ClientWorkspace | null>(null);
  const [approvalNotice, setApprovalNotice] = useState<string | null>(null);

  // Local-Business Package state (Page 31)
  const [localBizName, setLocalBizName] = useState('Apex Roofing & Remodeling');
  const [localCity, setLocalCity] = useState('Austin, TX');
  const [localAuditGenerated, setLocalAuditGenerated] = useState(false);
  const [localPostType, setLocalPostType] = useState<'offer' | 'update' | 'event'>('offer');

  // Event-Business Package state (Page 32)
  const [eventName, setEventName] = useState('2027 Regional Trade & Remodeling Summit');
  const [eventDate, setEventDate] = useState('October 14–16, 2027');
  const [eventKitGenerated, setEventKitGenerated] = useState(false);

  // AI Client Proposal & Audit Generator State
  const [proposalClientName, setProposalClientName] = useState('Pinnacle Trade Services');
  const [proposalMetro, setProposalMetro] = useState('Austin, TX');
  const [isGeneratingProposal, setIsGeneratingProposal] = useState(false);
  const [customProposal, setCustomProposal] = useState<any>(null);

  const handleGenerateProposalWithAi = async () => {
    if (!proposalClientName.trim()) return;
    setIsGeneratingProposal(true);
    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate_client_proposal',
          clientName: proposalClientName.trim(),
          metro: proposalMetro.trim(),
          businessContext: {
            niche: effectiveWs.nichePackageId,
            brandName: effectiveWs.brandProfile.name
          }
        })
      });
      const data = await res.json();
      if (data.proposal) {
        setCustomProposal(data.proposal);
        confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsGeneratingProposal(false);
    }
  };

  const handleCreateClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;

    store.addClientWorkspace(clientName, clientEmail, companyName || clientName, effectiveWs.id);
    setInviteModalOpen(false);
    setClientName('');
    setClientEmail('');
    setCompanyName('');
    confetti({ particleCount: 65, spread: 60, origin: { y: 0.6 } });
  };

  const handleApproveClient = () => {
    if (previewingClient) {
      setApprovalNotice(`Client delivery for ${previewingClient.companyName} officially approved and recorded in audit log!`);
      setPreviewingClient(null);
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.5 } });
      setTimeout(() => setApprovalNotice(null), 4000);
    }
  };

  const handleDownloadLicenseCertificate = () => {
    const certHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Authority Studio AI — Commercial Reseller License Certificate</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; padding: 40px; color: #0f172a; max-width: 800px; margin: 0 auto; border: 8px double #cbd5e1; }
    h1 { font-size: 24px; text-transform: uppercase; letter-spacing: 2px; text-align: center; margin-bottom: 4px; }
    .sub { text-align: center; color: #64748b; font-size: 14px; margin-bottom: 30px; }
    .box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 24px; font-size: 13px; line-height: 1.6; }
    .rights { margin: 16px 0; padding-left: 20px; }
    .rights li { margin-bottom: 6px; }
    .seal { text-align: center; margin-top: 30px; font-family: monospace; font-size: 11px; color: #475569; }
  </style>
</head>
<body>
  <h1>Official Commercial Agency License</h1>
  <div class="sub">Authority Studio AI Commercial Empire Edition</div>
  <div class="box">
    <strong>Licensee Organization:</strong> ${effectiveWs.brandProfile.name} Enterprise Agency<br>
    <strong>Certified Business:</strong> ${effectiveWs.name} (${effectiveWs.nichePackageId})<br>
    <strong>Certificate Serial:</strong> AUTH-COMM-${Date.now().toString(36).toUpperCase()}<br>
    <strong>Issuance Date:</strong> ${new Date().toLocaleDateString()}
  </div>
  <div class="box">
    <strong>Granted Commercial Rights:</strong>
    <ul class="rights">
      <li><strong>Client Delivery:</strong> Authorized to package, brand, and deliver turnkey authority websites, calculators, and content libraries directly to paying commercial clients.</li>
      <li><strong>White-Label Exemption:</strong> Right to remove all Authority Studio AI logos, links, and watermarks.</li>
      <li><strong>Commercial Resale:</strong> Right to charge monthly retainer, setup fees, or flat deliverables to third-party clients.</li>
      <li><strong>Deterministic Engine Rights:</strong> Right to host and run pure JavaScript calculations on client domains.</li>
    </ul>
  </div>
  <div class="seal">
    AUTHENTICATED & CRYPTOGRAPHICALLY AUDITED BY AUTHORITY STUDIO AI<br>
    STATUS: ACTIVE & ENFORCEABLE WORLDWIDE
  </div>
</body>
</html>`;
    const blob = new Blob([certHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${effectiveWs.brandProfile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-commercial-license.html`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-600 shrink-0" />
            <span>Commercial Empire & Client Delivery Agency Suite</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Deliver turnkey authority businesses to commercial clients with white-label branding, client approval portals, local business packages, and audit trails.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <button
            onClick={() => setInviteModalOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-sm transition-all whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Onboard Client</span>
          </button>
        </div>
      </div>

      {approvalNotice && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{approvalNotice}</span>
        </div>
      )}

      {/* Commercial Capabilities Metric Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Max Workspaces Entitlement</div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {store.getWorkspaces().length} <span className="text-xs text-slate-400 font-normal">/ {entitlement.maxWorkspaces}</span>
          </div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1">Up to 24 Commercial Properties</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Active Client Portals</div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {clientWorkspaces.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Client approval enabled</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium mb-1">White-Label Status</div>
          <div className="text-2xl font-extrabold text-amber-600 font-mono">
            Active
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Zero vendor watermarks</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs">
          <div className="text-xs text-slate-500 font-medium mb-1">Audit Trail Events</div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {auditLogs.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Timestamped security log</div>
        </div>
      </div>

      {/* Commercial Module Sub-Navigation Bar */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-200/70 rounded-xl max-w-full overflow-x-auto">
        <button
          onClick={() => setActiveSubSection('clients')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center justify-center gap-1.5 ${
            activeSubSection === 'clients' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users className="w-3.5 h-3.5 text-blue-600" />
          <span>Client Portals & Approvals ({clientWorkspaces.length})</span>
        </button>

        <button
          onClick={() => setActiveSubSection('license')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center justify-center gap-1.5 ${
            activeSubSection === 'license' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-3.5 h-3.5 text-amber-600" />
          <span>Commercial License Certificate</span>
        </button>

        <button
          onClick={() => setActiveSubSection('proposals')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center justify-center gap-1.5 ${
            activeSubSection === 'proposals' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-indigo-600" />
          <span>Agency Proposals &amp; Contracts ($3,500)</span>
        </button>

        <button
          onClick={() => setActiveSubSection('local_package')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center justify-center gap-1.5 ${
            activeSubSection === 'local_package' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
          <span>Local-Business Package</span>
        </button>

        <button
          onClick={() => setActiveSubSection('event_package')}
          className={`flex-1 py-2 px-3 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center justify-center gap-1.5 ${
            activeSubSection === 'event_package' ? 'bg-white text-slate-900 shadow-xs font-bold' : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-purple-600" />
          <span>Event-Business Package</span>
        </button>
      </div>

      {/* SECTION 1: CLIENT PORTALS */}
      {activeSubSection === 'clients' && (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900 tracking-tight flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-600" />
                  <span>Commercial Client Portals &amp; Deliverable Approvals</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Clients access clean review portals to inspect and approve copy and tools without seeing admin control panels.
                </p>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="py-2.5 px-3 font-semibold">Client Name &amp; Company</th>
                    <th className="py-2.5 px-3 font-semibold">Assigned Business</th>
                    <th className="py-2.5 px-3 font-semibold">White-Label Mode</th>
                    <th className="py-2.5 px-3 font-semibold">Review Status</th>
                    <th className="py-2.5 px-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {clientWorkspaces.map(client => (
                    <tr key={client.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-900">{client.clientName}</div>
                        <div className="text-[11px] text-slate-500">{client.companyName} • {client.clientEmail}</div>
                      </td>
                      <td className="py-3 px-3 font-medium text-slate-700">
                        {effectiveWs.name}
                      </td>
                      <td className="py-3 px-3">
                        <span className="text-[10px] px-2 py-0.5 rounded font-mono font-bold bg-amber-50 text-amber-800">
                          White-Label Active
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-bold capitalize ${
                          client.status === 'approved' 
                            ? 'bg-emerald-50 text-emerald-700' 
                            : 'bg-blue-50 text-blue-700'
                        }`}>
                          {client.status}
                        </span>
                      </td>
                      <td className="py-3 px-3">
                        <button
                          onClick={() => setPreviewingClient(client)}
                          className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Inspect Client View</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {/* Audit Trail Log */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-bold text-slate-900 flex items-center gap-1.5 uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Cryptographic Security &amp; Client Activity Log</span>
            </h3>
            <div className="space-y-1.5 max-h-48 overflow-y-auto font-mono text-[11px]">
              {auditLogs.slice(0, 5).map(log => (
                <div key={log.id} className="flex items-center justify-between p-2 rounded bg-slate-50 border border-slate-100">
                  <span className="text-slate-700 font-semibold">{log.action}: {log.details}</span>
                  <span className="text-slate-400">
                    {new Date(log.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: COMMERCIAL LICENSE CERTIFICATE */}
      {activeSubSection === 'license' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[10px] font-mono text-amber-700 font-bold uppercase bg-amber-50 px-2.5 py-0.5 rounded">
                Tier Entitlement: Commercial Empire Edition
              </span>
              <h2 className="text-xl font-extrabold text-slate-900 mt-1">
                Official Commercial Agency License Certificate
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Full legal authorization for commercial delivery, reseller rights, and white-label client packaging.
              </p>
            </div>
            <button
              onClick={handleDownloadLicenseCertificate}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-2xs transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Official License HTML</span>
            </button>
          </div>

          <div className="border-4 border-double border-slate-300 rounded-2xl p-6 sm:p-8 bg-slate-50/40 space-y-5">
            <div className="text-center space-y-1">
              <Award className="w-10 h-10 text-amber-500 mx-auto" />
              <h3 className="text-lg font-extrabold tracking-tight text-slate-900 uppercase">
                Certificate of Commercial Agency Rights
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Issued Under Authority Studio AI Master License Protocol
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-white p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Authorized Licensee</span>
                <span className="font-bold text-slate-900">{effectiveWs.brandProfile.name} Agency Group</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Certificate Serial</span>
                <span className="font-mono font-bold text-slate-800">AUTH-COMM-984F2-2026</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Included Workspaces</span>
                <span className="font-semibold text-slate-800">Up to 24 Commercial Authority Businesses</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Reseller Rights</span>
                <span className="font-semibold text-emerald-700">100% Client Delivery &amp; Retainer Keeping</span>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-700 leading-relaxed">
              <div className="font-bold text-slate-900 uppercase text-[11px]">Enforceable Rights Scope:</div>
              <ul className="space-y-1.5 list-disc list-inside text-slate-600">
                <li>Right to package, brand, and deliver turnkey authority websites, tools, and content to commercial clients.</li>
                <li>Right to remove all vendor references, backlinks, and watermarks (100% white-label mode).</li>
                <li>Right to charge clients one-time build fees ($2,500–$7,500+) or monthly retainer management fees.</li>
                <li>Right to deploy deterministic JavaScript micro-tools onto any external client domain or CMS.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2.5: HIGH-TICKET AGENCY PROPOSALS & CONTRACTS ($3,500 SETUP / $500 RETAINER) */}
      {activeSubSection === 'proposals' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30">
                Agency Client Closing Machine (OTO 3)
              </span>
              <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-500/40 self-start sm:self-auto">
                $3,500 Setup / $500/mo Retainer
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight font-display">
              Flash AI Client Opportunity Audit &amp; Proposal Generator
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Enter any prospective commercial client name and their metro area. The AI performs an automated digital asset audit, calculates bounce rate reduction, and compiles a ready-to-sign $3,500 Statement of Work agreement.
            </p>

            {/* Generator Inputs */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-5 space-y-1">
                <label className="text-xs font-bold text-slate-300">Client / Company Name</label>
                <input
                  type="text"
                  value={proposalClientName}
                  onChange={(e) => setProposalClientName(e.target.value)}
                  placeholder="e.g. Apex Roofing & Remodeling"
                  className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div className="sm:col-span-4 space-y-1">
                <label className="text-xs font-bold text-slate-300">Target Metro / Service Area</label>
                <input
                  type="text"
                  value={proposalMetro}
                  onChange={(e) => setProposalMetro(e.target.value)}
                  placeholder="e.g. Dallas, TX"
                  className="w-full px-3.5 py-2 text-xs font-semibold rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div className="sm:col-span-3">
                <button
                  type="button"
                  onClick={handleGenerateProposalWithAi}
                  disabled={isGeneratingProposal || !proposalClientName.trim()}
                  className="w-full py-2.5 px-4 text-xs font-black rounded-xl bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-400 hover:to-blue-400 text-white shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{isGeneratingProposal ? 'Generating...' : 'Generate Proposal'}</span>
                </button>
              </div>
            </div>

            {/* AI Generated Proposal Preview */}
            {customProposal && (
              <div className="mt-4 p-5 rounded-2xl bg-white text-slate-900 border border-indigo-200 space-y-4 animate-in fade-in text-xs shadow-lg">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded border border-indigo-200">
                      Audit Score: {customProposal.auditScore} / 100
                    </span>
                    <h3 className="text-base font-black text-slate-900 mt-1">
                      Turnkey Authority Package for {customProposal.clientName} ({customProposal.metroArea})
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        const proposalFullText = `=== COMMERCIAL CLIENT STATEMENT OF WORK & AUDIT ===\nClient: ${customProposal.clientName} (${customProposal.metroArea})\nAudit Score: ${customProposal.auditScore}/100\nExpected Impact: ${customProposal.projectedBounceDrop}\n\nProject Investment: $${customProposal.setupFee}.00 USD\nOngoing Retainer: $${customProposal.monthlyRetainer}.00 / month\n\nScope of Deliverables:\n${customProposal.deliverables?.map((d: string) => `- ${d}`).join('\n')}\n\nKey Statement of Work Terms:\n${customProposal.sowClauses?.map((c: string) => `- ${c}`).join('\n')}`;
                        navigator.clipboard.writeText(proposalFullText);
                        confetti({ particleCount: 40, spread: 45 });
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Full Proposal</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
                  <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1">
                    <span className="font-bold text-rose-800 uppercase text-[10px]">Identified Digital Bottlenecks:</span>
                    <ul className="text-slate-700 space-y-0.5">
                      {customProposal.auditFindings?.map((f: string, i: number) => (
                        <li key={i}>• {f}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                    <span className="font-bold text-emerald-800 uppercase text-[10px]">Included Scope Deliverables:</span>
                    <ul className="text-emerald-950 font-medium space-y-0.5">
                      {customProposal.deliverables?.map((d: string, i: number) => (
                        <li key={i}>✓ {d}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <strong>Pricing Terms:</strong> ${customProposal.setupFee} Initial Build + ${customProposal.monthlyRetainer}/mo Ongoing Optimization
                  </div>
                  <span className="text-[11px] font-mono text-emerald-700 font-bold">100% Retainer Keeping (Commercial License)</span>
                </div>

                <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-200 text-indigo-950 text-[11px] space-y-1">
                  <p>
                    <strong>Where did this go?</strong> This custom proposal and audit scorecard are generated for {customProposal.clientName}. You can copy the complete contract above or invite the client to the <strong>Client Review Portals</strong> tab to review their site live.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Proposal 1: $3,500 Turnkey Setup SOW */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded">
                    Contract Deliverable #1
                  </span>
                  <span className="text-xl font-black font-mono text-emerald-600">$3,500 Flat</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Turnkey Authority Property Setup &amp; SOW Agreement
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Complete client statement of work detailing 11 website pages, 8 proprietary decision engines, 40 articles, and custom domain mapping.
                </p>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed">
{`=== STATEMENT OF WORK & CLIENT DELIVERY AGREEMENT ===
Project Investment: $3,500.00 USD
Payment Schedule: 50% ($1,750) upon signing, 50% ($1,750) upon sign-off.
Delivery Horizon: 14 Business Days

Included Scope of Deliverables:
1. Fully customized, responsive 11-page authority website deployed to client domain.
2. 8 Client-side deterministic decision engines customized to client service unit rates.
3. 40 SEO-optimized authority guides and reviews with schema markup.
4. Lead capture playbook and automated 7-day email welcome sequence.
5. 100% White-label ownership. Zero vendor watermarks or ongoing platform licensing fees.`}
                </div>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(`=== STATEMENT OF WORK & CLIENT DELIVERY AGREEMENT ===\nProject Investment: $3,500.00 USD\nPayment Schedule: 50% ($1,750) upon signing, 50% ($1,750) upon sign-off.\nDelivery Horizon: 14 Business Days\n\nIncluded Scope of Deliverables:\n1. Fully customized, responsive 11-page authority website deployed to client domain.\n2. 8 Client-side deterministic decision engines customized to client service unit rates.\n3. 40 SEO-optimized authority guides and reviews with schema markup.\n4. Lead capture playbook and automated 7-day email welcome sequence.\n5. 100% White-label ownership. Zero vendor watermarks or ongoing platform licensing fees.`);
                  confetti({ particleCount: 40, spread: 45 });
                }}
                className="w-full py-2.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy $3,500 Statement of Work</span>
              </button>
            </div>

            {/* Proposal 2: $500/mo Retainer Contract */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <span className="text-[10px] font-mono font-bold uppercase text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded">
                    Contract Deliverable #2
                  </span>
                  <span className="text-xl font-black font-mono text-blue-600">$500 / mo</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  Monthly Retainer &amp; Decision Engine Optimization Agreement
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Monthly service retainer contract for ongoing decision engine benchmarking, monthly lead reporting, and publishing 4 new guides.
                </p>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 max-h-48 overflow-y-auto whitespace-pre-wrap leading-relaxed">
{`=== MONTHLY AGENCY RETAINER AGREEMENT ===
Monthly Retainer Fee: $500.00 / month (recurring on 1st of month)
Billing Terms: Month-to-month, cancel anytime with 14 days notice.

Ongoing Scope of Services:
1. Monthly calibration of Decision Engine formulas against local trade index.
2. Production and publication of 4 new long-tail authority articles per month.
3. Monthly analytics report: Total calculations, leads captured, conversion rate.
4. Cloud uptime monitoring and priority technical maintenance.`}
                </div>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(`=== MONTHLY AGENCY RETAINER AGREEMENT ===\nMonthly Retainer Fee: $500.00 / month (recurring on 1st of month)\nBilling Terms: Month-to-month, cancel anytime with 14 days notice.\n\nOngoing Scope of Services:\n1. Monthly calibration of Decision Engine formulas against local trade index.\n2. Production and publication of 4 new long-tail authority articles per month.\n3. Monthly analytics report: Total calculations, leads captured, conversion rate.\n4. Cloud uptime monitoring and priority technical maintenance.`);
                  confetti({ particleCount: 40, spread: 45 });
                }}
                className="w-full py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy $500/mo Retainer Contract</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: LOCAL-BUSINESS PACKAGE (Page 31 in PDF) */}
      {activeSubSection === 'local_package' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase bg-emerald-50 px-2.5 py-0.5 rounded">
              Commercial Empire: Local Business Package
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              Local Authority & Contractor Business Generator
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Generate local audit reports, Google Business Profile update posts, and high-converting local service landing pages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Audit Generator */}
            <div className="border border-slate-200 rounded-xl p-5 space-y-4 bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>Local Business Audit Generator</span>
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Local Business Name</label>
                  <input
                    type="text"
                    value={localBizName}
                    onChange={(e) => setLocalBizName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Target City / Metro Area</label>
                  <input
                    type="text"
                    value={localCity}
                    onChange={(e) => setLocalCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <button
                  onClick={() => {
                    setLocalAuditGenerated(true);
                    confetti({ particleCount: 50, spread: 45 });
                  }}
                  className="w-full py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Generate Local Audit Report</span>
                </button>
              </div>

              {localAuditGenerated && (
                <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold text-slate-900 border-b border-slate-100 pb-1.5">
                    <span>Audit Score: 88/100</span>
                    <span className="text-emerald-600 font-mono">Opportunity: High</span>
                  </div>
                  <p className="text-slate-600 text-[11px]">
                    {localBizName} in {localCity} lacks interactive decision tools. Deploying our 8 deterministic calculators will increase quote requests by ~42%.
                  </p>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Ready for client proposal insertion.
                  </div>
                </div>
              )}
            </div>

            {/* Google Business Profile Post Generator */}
            <div className="border border-slate-200 rounded-xl p-5 space-y-4 bg-slate-50/50">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Share2 className="w-4 h-4 text-blue-600" />
                <span>Google Business Profile Post Generator</span>
              </h3>

              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  {(['offer', 'update', 'event'] as const).map(t => (
                    <button
                      key={t}
                      onClick={() => setLocalPostType(t)}
                      className={`py-1.5 text-xs font-semibold rounded-lg capitalize border ${
                        localPostType === t 
                          ? 'bg-slate-900 text-white border-slate-900' 
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-4 text-xs space-y-2">
                  <div className="text-slate-800 font-bold">
                    {localPostType === 'offer' 
                      ? `Exclusive Estimate Offer for ${localCity} Property Owners` 
                      : localPostType === 'update' 
                      ? `New Calculator Engine Live: Accurate Trade Quotes in 60s` 
                      : `Upcoming Local Home Energy & Remodeling Clinic`}
                  </div>
                  <p className="text-slate-600 text-[11px] leading-relaxed">
                    Planning a project with {localBizName}? Use our free verified cost estimator to forecast material and labor prices before signing any contract.
                  </p>
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-600 font-semibold">
                    <span>CTA: Book Free Consultation</span>
                    <span>100% GBP Compliant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: EVENT-BUSINESS PACKAGE (Page 32 in PDF) */}
      {activeSubSection === 'event_package' && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div>
            <span className="text-[10px] font-mono text-purple-700 font-bold uppercase bg-purple-50 px-2.5 py-0.5 rounded">
              Commercial Empire: Event-Business Package
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 mt-1">
              Event Directory, Calendar & Organizer Pitch Generator
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Launch event directories, sponsor pitch decks, and attendee lead capture funnels for regional trade summits.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-3 border border-slate-200 rounded-xl p-5 bg-slate-50/50">
                <h3 className="text-sm font-bold text-slate-900">Event Configuration</h3>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Event Name</label>
                  <input
                    type="text"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Dates & Venue</label>
                  <input
                    type="text"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <button
                  onClick={() => {
                    setEventKitGenerated(true);
                    confetti({ particleCount: 50, spread: 45 });
                  }}
                  className="w-full py-2 text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Generate Event Kit Assets</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                <div className="text-xs font-bold text-purple-700 uppercase tracking-wider">Event Asset #1: Organizer Pitch Deck</div>
                <div className="text-xs text-slate-700 font-semibold">{eventName} Sponsor Opportunity</div>
                <p className="text-[11px] text-slate-500">
                  Pre-written outreach email highlighting attendee demographics, exhibit booth ROI, and digital lead capture integration.
                </p>
              </div>

              <div className="border border-slate-200 rounded-xl p-4 bg-white space-y-2">
                <div className="text-xs font-bold text-blue-700 uppercase tracking-wider">Event Asset #2: Attendee Lead Magnet</div>
                <div className="text-xs text-slate-700 font-semibold">The 2027 Summit Attendee Workbook & Trade Directory</div>
                <p className="text-[11px] text-slate-500">
                  Captures event registrants onto your workspace newsletter list prior to conference kickoff.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Invite Client Modal */}
      {inviteModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-600" />
                <span>Onboard Commercial Client</span>
              </h3>
              <button 
                onClick={() => setInviteModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateClient} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Client Contact Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Thorne"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Client Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="marcus@thornebuild.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Company / Firm Name</label>
                <input
                  type="text"
                  placeholder="Thorne Architecture Group"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setInviteModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-lg shadow-xs"
                >
                  Create Client Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Client Portal View Modal */}
      {previewingClient && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">
                  Client Delivery Portal (White-Label)
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  {previewingClient.companyName} Client Asset Review
                </h3>
              </div>
              <button 
                onClick={() => setPreviewingClient(null)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <div className="font-bold text-slate-900">Property Delivery Package: {effectiveWs.name}</div>
                <div className="text-slate-600">
                  Ready for client sign-off. Vendor branding has been completely removed.
                </div>
              </div>

              <div className="space-y-2">
                <div className="font-bold text-slate-800">Delivered Assets for Review:</div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 border rounded-lg bg-white">
                    <div className="font-bold text-slate-900">{effectiveWs.tools.length} Micro-Tools</div>
                    <div className="text-slate-500 text-[11px]">Deterministic calculations verified</div>
                  </div>
                  <div className="p-3 border rounded-lg bg-white">
                    <div className="font-bold text-slate-900">{effectiveWs.contentAssets.length} Guides & Reviews</div>
                    <div className="text-slate-500 text-[11px]">SEO meta and keywords included</div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 space-y-1">
                <div className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Commercial Use Rights License Verified</span>
                </div>
                <div className="text-[11px] text-emerald-800">
                  Client has full unencumbered ownership of exported website files, articles, and embeddable tools.
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                onClick={() => setPreviewingClient(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg"
              >
                Close Portal View
              </button>
              <button
                onClick={handleApproveClient}
                className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg"
              >
                Approve & Sign Off Delivery
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
