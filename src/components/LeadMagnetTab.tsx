import React, { useState } from 'react';
import { 
  Mail, 
  FileText, 
  Download, 
  Check, 
  Copy, 
  Sparkles, 
  CheckCircle2,
  Users,
  Send
} from 'lucide-react';
import { BusinessWorkspace } from '../types/authority';
import confetti from 'canvas-confetti';

interface LeadMagnetTabProps {
  workspace: BusinessWorkspace;
}

export const LeadMagnetTab: React.FC<LeadMagnetTabProps> = ({ workspace }) => {
  const lm = workspace.leadMagnet;
  const seq = workspace.emailSequence;
  const [copiedDay, setCopiedDay] = useState<number | null>(null);
  const [copiedPlaybook, setCopiedPlaybook] = useState(false);

  const handleCopyEmail = (day: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedDay(day);
    setTimeout(() => setCopiedDay(null), 2000);
  };

  const handleDownloadPlaybook = () => {
    const md = `# ${lm.title}\n\n*${lm.hook}*\n\n${lm.deliverableSummary}\n\n## Core Implementation Checkpoints:\n${lm.bulletPoints.map(b => `- ${b}`).join('\n')}\n\n## Complete Guide Blueprint:\n${lm.contentBody}\n`;
    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${workspace.brandProfile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-playbook.md`;
    a.click();
    URL.revokeObjectURL(url);
    setCopiedPlaybook(true);
    confetti({ particleCount: 50, spread: 50 });
    setTimeout(() => setCopiedPlaybook(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Mail className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Lead Magnet & Automated Email Funnel Studio
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Done-for-you lead capture playbook and multi-day nurturing autoresponder for <strong className="text-slate-800">{workspace.name}</strong>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleDownloadPlaybook}
            className="px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{copiedPlaybook ? 'Downloaded Playbook!' : 'Download Playbook'}</span>
          </button>
        </div>
      </div>

      {/* Grid: Playbook Overview Card + Autoresponder Sequence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Playbook Blueprint Card */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
              {lm.format}
            </span>
            <h2 className="text-lg font-bold text-slate-900 leading-snug">{lm.title}</h2>
            <p className="text-xs text-slate-600 italic">"{lm.hook}"</p>
            <p className="text-xs text-slate-500 leading-relaxed">{lm.deliverableSummary}</p>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <div className="text-xs font-bold text-slate-800">What's Inside This Playbook:</div>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {lm.bulletPoints.map((bp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{bp}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500 border-t border-slate-100">
              <span>Delivery Format: Markdown / PDF</span>
              <span className="font-bold text-emerald-600 font-mono">100% Turnkey</span>
            </div>
          </div>
        </div>

        {/* Email Sequence Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Welcome & Conversion Email Sequence ({seq.emails.length} Emails)
                </h3>
                <p className="text-xs text-slate-500">Pre-written emails ready to copy into ConvertKit, Mailchimp, or ActiveCampaign.</p>
              </div>
            </div>

            <div className="space-y-3">
              {seq.emails.map((email) => {
                const isCopied = copiedDay === email.day;
                return (
                  <div key={email.day} className="border border-slate-200 rounded-xl p-4 bg-slate-50/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase text-purple-600 bg-white border border-purple-200 px-2 py-0.5 rounded">
                        Day {email.day} Broadcast
                      </span>
                      <button 
                        onClick={() => handleCopyEmail(email.day, `Subject: ${email.subject}\n\n${email.bodyText}`)}
                        className="text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 px-2.5 py-1 rounded flex items-center gap-1"
                      >
                        {isCopied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{isCopied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <div className="text-xs font-bold text-slate-900">{email.subject}</div>
                    <p className="text-[11px] text-slate-500">{email.previewText}</p>
                    <div className="text-xs text-slate-700 bg-white p-3 rounded-lg border border-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                      {email.bodyText}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
