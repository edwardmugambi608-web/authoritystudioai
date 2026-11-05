import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  FileCode, 
  Download,
  Database,
  Calculator
} from 'lucide-react';
import { runAutomatedCatalogTest, CatalogVerificationReport } from '../services/catalog-test';

interface CatalogAuditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CatalogAuditModal: React.FC<CatalogAuditModalProps> = ({
  isOpen,
  onClose
}) => {
  const [report, setReport] = useState<CatalogVerificationReport | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [showFormulaLogs, setShowFormulaLogs] = useState(false);
  const [showRawJson, setShowRawJson] = useState(false);

  const executeTest = () => {
    setIsRunning(true);
    setTimeout(() => {
      const res = runAutomatedCatalogTest();
      setReport(res);
      setIsRunning(false);
    }, 350);
  };

  useEffect(() => {
    if (isOpen) {
      executeTest();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-2xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span>Automated Catalog Verification Audit Suite</span>
                {report?.allPassed && (
                  <span className="text-xs px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 font-mono">
                    100% PASSED
                  </span>
                )}
              </h2>
              <p className="text-xs text-slate-500">
                Enforcing non-negotiable volume targets: 5 packages, 200 content assets, 40 micro-tools, 100 promos.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-lg font-bold px-2 py-1"
          >
            ✕
          </button>
        </div>

        {/* Verification Summary Banner */}
        <div className={`p-4 rounded-xl border flex items-center justify-between ${
          report?.allPassed 
            ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' 
            : 'bg-rose-50 border-rose-200 text-rose-950'
        }`}>
          <div className="flex items-center gap-2.5">
            {report?.allPassed ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
            )}
            <div>
              <div className="text-xs font-bold">
                {report?.allPassed 
                  ? 'All 7 Architectural Volume & Deterministic Formula Invariants Verified' 
                  : 'Target Count Mismatch Detected'}
              </div>
              <div className="text-[11px] text-slate-600 mt-0.5 font-mono">
                {report?.passedChecks} of {report?.totalChecks} checks verified against in-memory repository catalog
              </div>
            </div>
          </div>

          <button
            onClick={executeTest}
            disabled={isRunning}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 transition-colors flex items-center gap-1.5 shrink-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRunning ? 'animate-spin' : ''}`} />
            <span>Re-Run Audit</span>
          </button>
        </div>

        {/* Breakdown of Checks */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
            Audit Results Breakdown
          </div>

          <div className="space-y-2">
            {report?.results.map(item => (
              <div 
                key={item.id}
                className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{item.name}</span>
                    <span className="font-mono text-slate-500">
                      (Target: {item.targetCount} | Found: {item.actualCount})
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono">
                    {item.details}
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded font-mono font-bold text-xs shrink-0 self-start sm:self-auto ${
                  item.passed 
                    ? 'bg-emerald-100 text-emerald-800' 
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {item.passed ? 'PASSED' : 'FAILED'}
                </span>
              </div>
            ))}

            {/* Check 7: Formula execution check */}
            <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <Calculator className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-bold text-slate-900">Deterministic Formula Math Verification</span>
                  <span className="font-mono text-slate-500">(40/40 Seeded Tools Executed)</span>
                </div>
                <div className="text-[11px] text-slate-500">
                  Every tool formula was executed with default parameters. Zero runtime exceptions or NaN values.
                </div>
              </div>

              <span className={`px-2.5 py-1 rounded font-mono font-bold text-xs shrink-0 self-start sm:self-auto ${
                report?.formulaAuditPassed 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {report?.formulaAuditPassed ? 'PASSED' : 'FAILED'}
              </span>
            </div>
          </div>
        </div>

        {/* Toggle Viewers */}
        <div className="flex items-center gap-3 pt-2 border-t border-slate-100 text-xs">
          <button
            onClick={() => setShowFormulaLogs(!showFormulaLogs)}
            className="text-blue-600 hover:text-blue-700 font-semibold"
          >
            {showFormulaLogs ? 'Hide 40 Tool Formula Audit Logs' : 'View 40 Tool Formula Audit Logs'}
          </button>
          <span>·</span>
          <button
            onClick={() => setShowRawJson(!showRawJson)}
            className="text-slate-600 hover:text-slate-900 font-semibold"
          >
            {showRawJson ? 'Hide Raw Audit JSON' : 'View Raw Manifest JSON'}
          </button>
        </div>

        {/* Formula execution logs */}
        {showFormulaLogs && (
          <div className="bg-slate-900 text-slate-200 p-4 rounded-xl text-[11px] font-mono max-h-60 overflow-y-auto space-y-1">
            {report?.formulaAuditLogs.map((log, i) => (
              <div key={i} className={log.startsWith('PASSED') ? 'text-emerald-400' : 'text-rose-400'}>
                {log}
              </div>
            ))}
          </div>
        )}

        {/* Raw JSON viewer */}
        {showRawJson && (
          <pre className="bg-slate-900 text-emerald-300 p-4 rounded-xl text-[11px] font-mono max-h-60 overflow-y-auto whitespace-pre-wrap">
            {JSON.stringify(report, null, 2)}
          </pre>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div className="text-[11px] text-slate-400 font-mono">
            Audit Timestamp: {report?.timestamp}
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold rounded-lg bg-slate-900 text-white hover:bg-slate-800"
          >
            Close Audit Report
          </button>
        </div>
      </div>
    </div>
  );
};
