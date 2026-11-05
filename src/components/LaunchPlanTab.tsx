import React, { useState } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Download,
  Share2,
  FileText,
  Wrench,
  DollarSign
} from 'lucide-react';
import { BusinessWorkspace } from '../types/authority';
import confetti from 'canvas-confetti';

interface LaunchPlanTabProps {
  workspace: BusinessWorkspace;
  onNavigateTab: (tab: any) => void;
}

export const LaunchPlanTab: React.FC<LaunchPlanTabProps> = ({ workspace, onNavigateTab }) => {
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({
    'step-1': true,
    'step-2': true,
    'step-3': false,
  });

  const toggleStep = (id: string) => {
    setCompletedSteps(prev => {
      const next = { ...prev, [id]: !prev[id] };
      if (next[id]) {
        confetti({ particleCount: 30, spread: 45 });
      }
      return next;
    });
  };

  const weeks = [
    {
      week: 1,
      title: 'Week 1: Brand & Foundation Verification',
      focus: 'Setup your brand assets, verify your 8 micro-tools, and configure legal disclosures.',
      tasks: [
        { id: 'w1-1', title: 'Verify business brand name and color palette tokens', done: true, targetTab: 'website' },
        { id: 'w1-2', title: 'Verify the 8 interactive AI tools for formula accuracy', done: true, targetTab: 'tools' },
        { id: 'w1-3', title: 'Review FTC statutory affiliate disclosure statements', done: true, targetTab: 'monetization' }
      ]
    },
    {
      week: 2,
      title: 'Week 2: Editorial Library & Content Interlinking',
      focus: 'Audit your 40 authority articles and ensure contextual links point to signature tools.',
      tasks: [
        { id: 'w2-1', title: 'Select 5 cornerstone guides for initial social and search syndication', done: false, targetTab: 'content' },
        { id: 'w2-2', title: 'Verify companion tool bindings inside article body paragraphs', done: false, targetTab: 'content' },
        { id: 'w2-3', title: 'Download article markdown files for backup and offline review', done: false, targetTab: 'exports' }
      ]
    },
    {
      week: 3,
      title: 'Week 3: Lead Magnet & 7-Day Autoresponder Funnel',
      focus: 'Configure your free playbook download and hook your automated welcome email sequence.',
      tasks: [
        { id: 'w3-1', title: 'Review the Done-For-You Playbook PDF delivery hook and bullet points', done: false, targetTab: 'lead_magnet' },
        { id: 'w3-2', title: 'Copy the 7-day automated email welcome sequence into your autoresponder', done: false, targetTab: 'monetization' },
        { id: 'w3-3', title: 'Verify email capture opt-in forms on the homepage and tools page', done: false, targetTab: 'website' }
      ]
    },
    {
      week: 4,
      title: 'Week 4: Monetization, Traffic Syndication & Public Launch',
      focus: 'Inject partner affiliate IDs, activate the $19 paid tool paywall, and execute the 24-hour traffic checklist.',
      tasks: [
        { id: 'w4-1', title: 'Inject global affiliate tracking IDs across all 40 guides and tools', done: false, targetTab: 'monetization' },
        { id: 'w4-2', title: 'Execute the 24-Hour Rapid Traffic Syndication Checklist (Reddit, Quora, LinkedIn)', done: false, targetTab: 'dashboard' },
        { id: 'w4-3', title: 'Review internal analytics for unique visitors and conversion rates', done: false, targetTab: 'dashboard' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Calendar className="w-5 h-5" />
            </span>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              30-Day Launch Roadmap & Milestone Checklist
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Systematic schedule to take <strong className="text-slate-800">{workspace.name}</strong> from blueprint to active traffic and monetization.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigateTab('exports')}
            className="px-4 py-2 text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Roadmap</span>
          </button>
        </div>
      </div>

      {/* 4-Week Timeline */}
      <div className="space-y-4">
        {weeks.map((w) => (
          <div key={w.week} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full">
                  Phase {w.week}
                </span>
                <h2 className="text-base font-bold text-slate-900 mt-1">{w.title}</h2>
                <p className="text-xs text-slate-500 mt-0.5">{w.focus}</p>
              </div>
            </div>

            <div className="space-y-2">
              {w.tasks.map((task) => {
                const isDone = completedSteps[task.id] ?? task.done;
                return (
                  <div 
                    key={task.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      isDone 
                        ? 'bg-emerald-50/40 border-emerald-200 text-emerald-950' 
                        : 'bg-slate-50/60 border-slate-200 text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => toggleStep(task.id)}
                        className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                          isDone ? 'bg-emerald-600 text-white' : 'border-2 border-slate-300 bg-white hover:border-slate-400'
                        }`}
                      >
                        {isDone && <CheckCircle2 className="w-4 h-4 text-white" />}
                      </button>
                      <span className={`text-xs font-medium ${isDone ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        {task.title}
                      </span>
                    </div>

                    <button 
                      onClick={() => onNavigateTab(task.targetTab)}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 shrink-0 ml-2"
                    >
                      <span>Jump</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
