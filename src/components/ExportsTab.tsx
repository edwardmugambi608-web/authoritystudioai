import React, { useState } from 'react';
import { 
  Download, 
  FileArchive, 
  FileCode, 
  FileText, 
  Check, 
  Sparkles, 
  CheckCircle2,
  FolderArchive
} from 'lucide-react';
import { BusinessWorkspace } from '../types/authority';
import { generateBusinessInABoxZip, generateStandaloneWebsiteHtml } from '../services/export-service';
import confetti from 'canvas-confetti';

interface ExportsTabProps {
  workspace: BusinessWorkspace;
}

export const ExportsTab: React.FC<ExportsTabProps> = ({ workspace }) => {
  const [isExportingZip, setIsExportingZip] = useState(false);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  const handleDownloadZip = async () => {
    setIsExportingZip(true);
    try {
      const blob = await generateBusinessInABoxZip(workspace);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${workspace.brandProfile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-business-in-a-box.zip`;
      a.click();
      URL.revokeObjectURL(url);
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
      setExportSuccess('Full Business-in-a-Box ZIP package compiled and downloaded!');
      setTimeout(() => setExportSuccess(null), 3500);
    } catch (e: any) {
      console.error(e);
    } finally {
      setIsExportingZip(false);
    }
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
    confetti({ particleCount: 40, spread: 45 });
    setExportSuccess('Static 11-page HTML website compiled and downloaded!');
    setTimeout(() => setExportSuccess(null), 3500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <FolderArchive className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Business-in-a-Box & Multi-Format Exporter
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Export standalone offline archives, single-file HTML websites, and content libraries for <strong className="text-slate-800">{workspace.name}</strong>.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleDownloadZip}
            disabled={isExportingZip}
            className="px-5 py-2.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xs transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isExportingZip ? 'Packaging ZIP...' : 'Download Full ZIP Bundle'}</span>
          </button>
        </div>
      </div>

      {exportSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 text-xs flex items-center gap-2 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{exportSuccess}</span>
        </div>
      )}

      {/* Export Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Full ZIP Package */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <FileArchive className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Complete Business-in-a-Box ZIP</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Contains all 40 markdown guides, 8 micro-tools JSON definitions, manifest.json, playbook.md, and autoresponder sequences.
            </p>
          </div>
          <button 
            onClick={handleDownloadZip}
            disabled={isExportingZip}
            className="w-full py-2.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-2xs transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download All Assets (.ZIP)</span>
          </button>
        </div>

        {/* Standalone HTML Website */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <FileCode className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Single-File Static HTML Website</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Standalone responsive website with embedded Tailwind styling and JavaScript. Ready to host on Cloudflare Pages, Netlify, or Apache.
            </p>
          </div>
          <button 
            onClick={handleDownloadHtml}
            className="w-full py-2.5 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-2xs transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Static HTML</span>
          </button>
        </div>

        {/* JSON Manifest */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Raw JSON Architecture Manifest</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Export the complete relational schema including brand tokens, audience profiles, and monetization offers for programmatic API import.
            </p>
          </div>
          <button 
            onClick={() => {
              const blob = new Blob([JSON.stringify(workspace, null, 2)], { type: 'application/json' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `${workspace.nichePackageId || 'workspace'}-manifest.json`;
              a.click();
              URL.revokeObjectURL(url);
            }}
            className="w-full py-2.5 text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Raw Manifest (.JSON)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
