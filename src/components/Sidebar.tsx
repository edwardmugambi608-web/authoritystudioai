import { 
  LayoutDashboard, 
  Globe, 
  Wrench, 
  FileText, 
  Mail, 
  DollarSign, 
  Download, 
  Radio, 
  Layers, 
  Building2, 
  X, 
  Compass, 
  LogOut, 
  Zap, 
  Repeat, 
  Calendar, 
  Share2,
  ShieldAlert,
  Users,
  Award,
  MapPin,
  Cpu,
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { ProductTier } from '../types/authority';
import { PRODUCT_CONFIGS, store, isAdminUser } from '../services/store';

export type TabKey = 
  | 'dashboard' 
  | 'guide'
  | 'niches'
  | 'launch_plan'
  | 'website' 
  | 'tools' 
  | 'content' 
  | 'lead_magnet' 
  | 'monetization' 
  | 'exports' 
  | 'operations' 
  | 'portfolio' 
  | 'commercial' 
  | 'cloner'
  | 'repurposing'
  | 'client_portals'
  | 'license'
  | 'local_event'
  | 'catalog_audit'
  | 'admin';

interface SidebarProps {
  activeTab: TabKey;
  onSelectTab: (tab: TabKey) => void;
  currentPlan: ProductTier;
  activeSuite: ProductTier;
  onSelectSuite: (suite: ProductTier) => void;
  onUpgradePrompt: (featureName: string, requiredTier: ProductTier) => void;
  onOpenVaultModal?: () => void;
  isOpen?: boolean;
  onClose?: () => void;
  onOpenCreateModal?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  currentPlan,
  activeSuite,
  onSelectSuite,
  onUpgradePrompt,
  onOpenVaultModal,
  isOpen = false,
  onClose,
  onOpenCreateModal
}) => {
  const currentUser = store.getCurrentUser();
  const nextUpgradeTier = store.getNextUpgradeTier();
  const isAdmin = isAdminUser(currentUser?.username);

  interface NavItemDef {
    id: TabKey;
    label: string;
    icon: React.ElementType;
    badge?: string;
    requiresTier?: ProductTier;
    isLocked?: boolean;
  }

  // Suite title definitions (clean, professional in-app titles without "Plan" or "OTO")
  const suiteMeta: Record<ProductTier, { name: string; tagline: string }> = {
    CORE: { name: 'Authority Studio AI', tagline: 'Turnkey AI Business Platform' },
    EXTENDED: { name: 'Business Builder', tagline: 'Traffic & Content Operations' },
    PRO: { name: 'Expansion Studio', tagline: 'Portfolio Scaling & Cloner' },
    ULTIMATE: { name: 'Commercial Empire', tagline: 'Commercial Agency Licensing' },
    CLOUD: { name: 'Authority Cloud', tagline: 'Managed Cloud Infrastructure' },
    LOCAL: { name: 'Local Authority Studio', tagline: 'Local Business Marketing' },
    EVENT: { name: 'Local Event Studio', tagline: 'Event Funnels & Directories' },
    FE: { name: 'Authority Studio AI', tagline: 'Turnkey AI Business Platform' },
    OTO_1: { name: 'Business Builder', tagline: 'Traffic & Content Operations' },
    OTO_2: { name: 'Expansion Studio', tagline: 'Portfolio Scaling & Cloner' },
    OTO_3: { name: 'Commercial Empire', tagline: 'Commercial Agency Licensing' }
  };

  const currentMeta = suiteMeta[activeSuite] || suiteMeta.CORE;

  const suiteOptions: { id: ProductTier; label: string; icon: React.ElementType }[] = [
    { id: 'CORE', label: 'Authority Studio', icon: Zap },
    { id: 'EXTENDED', label: 'Business Builder', icon: Radio },
    { id: 'PRO', label: 'Expansion Studio', icon: Layers },
    { id: 'ULTIMATE', label: 'Commercial Empire', icon: Building2 }
  ];

  // Clean, focused navigation
  let primaryNavItems: NavItemDef[] = [];

  if (activeSuite === 'CORE') {
    primaryNavItems = [
      { id: 'dashboard', label: 'Master Business Overview', icon: LayoutDashboard },
      { id: 'niches', label: 'Select Niche Market', icon: Compass },
      { id: 'website', label: 'Preview Authority Website', icon: Globe },
      { id: 'tools', label: 'Interactive AI Tools', icon: Cpu },
      { id: 'content', label: 'Publish Authority Articles', icon: FileText },
      { id: 'lead_magnet', label: 'Capture Lead Funnel', icon: Mail },
      { id: 'exports', label: 'Export Business Files', icon: Download }
    ];
  } else if (activeSuite === 'EXTENDED') {
    primaryNavItems = [
      { id: 'operations', label: 'Connect Custom Domain', icon: Radio },
      { id: 'website', label: 'Publish Live Website', icon: Globe },
      { id: 'monetization', label: 'Route Affiliate Offers', icon: DollarSign },
      { id: 'launch_plan', label: 'Execute Launch Roadmap', icon: Calendar },
      { id: 'tools', label: 'Monetize AI Tools', icon: Cpu },
      { id: 'dashboard', label: 'Return Home Hub', icon: LayoutDashboard }
    ];
  } else if (activeSuite === 'PRO') {
    primaryNavItems = [
      { id: 'portfolio', label: 'Manage All Businesses', icon: Layers },
      { id: 'cloner', label: 'Clone Turnkey Business', icon: Repeat },
      { id: 'repurposing', label: 'Repurpose Viral Content', icon: Share2 },
      { id: 'exports', label: 'Bulk Export Files', icon: Download },
      { id: 'dashboard', label: 'Return Home Hub', icon: LayoutDashboard }
    ];
  } else {
    // ULTIMATE
    primaryNavItems = [
      { id: 'commercial', label: 'Scale Agency Empire', icon: Building2 },
      { id: 'client_portals', label: 'Review Client Portals', icon: Users },
      { id: 'niches', label: 'Unlock Master Vault', icon: Compass },
      { id: 'license', label: 'Verify Agency Certificate', icon: Award },
      { id: 'local_event', label: 'Deploy Local Kits', icon: MapPin },
      { id: 'dashboard', label: 'Return Home Hub', icon: LayoutDashboard }
    ];
  }

  // Exclusive Admin Navigation (Placed before Guide so Guide is strictly last above upgrade)
  if (isAdmin) {
    primaryNavItems.push({
      id: 'admin',
      label: 'Manage Admin Funnel',
      icon: ShieldAlert,
      badge: 'Admin'
    });
  }

  // Comprehensive Guide - Placed as the LAST nav item right above the Upgrade button
  const guideLabels: Record<ProductTier, string> = {
    CORE: 'Quickstart System Guide',
    EXTENDED: 'Builder Action Guide',
    PRO: 'Scaling Action Guide',
    ULTIMATE: 'Empire Operating Guide',
    CLOUD: 'Cloud System Guide',
    LOCAL: 'Local System Guide',
    EVENT: 'Event System Guide',
    FE: 'Quickstart System Guide',
    OTO_1: 'Builder Action Guide',
    OTO_2: 'Scaling Action Guide',
    OTO_3: 'Empire Operating Guide'
  };

  primaryNavItems.push({
    id: 'guide',
    label: guideLabels[activeSuite] || 'Quickstart System Guide',
    icon: BookOpen
  });

  const handleItemClick = (item: NavItemDef, isMobile = false) => {
    if (item.isLocked && item.requiresTier) {
      onUpgradePrompt(item.label, item.requiresTier);
    } else {
      onSelectTab(item.id);
      if (isMobile && onClose) onClose();
    }
  };

  const renderNavBody = (isMobile: boolean) => (
    <>
      <div className="space-y-2.5">
        {/* Top Header of Sidebar: Blue edition badge only */}
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200/80 rounded-md shadow-xs">
            {currentMeta.name.replace('Authority Studio AI ', '')} Edition
          </span>

          {isMobile && (
            <button 
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
              aria-label="Close menu"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Switcher: ONLY displayed if user owns 2 or more unlocked suites */}
        {(() => {
          const unlockedSuites = suiteOptions.filter(suite => store.hasAccessToTier(suite.id));
          if (unlockedSuites.length <= 1) return null;

          return (
            <div className="space-y-1">
              <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block px-1">
                Switch Active Suite
              </span>
              <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200/80">
                {unlockedSuites.map(suite => {
                  const isActive = activeSuite === suite.id;
                  const Icon = suite.icon;

                  return (
                    <button
                      key={suite.id}
                      onClick={() => {
                        onSelectSuite(suite.id);
                        if (suite.id === 'CORE') onSelectTab('dashboard');
                        else if (suite.id === 'EXTENDED') onSelectTab('operations');
                        else if (suite.id === 'PRO') onSelectTab('portfolio');
                        else if (suite.id === 'ULTIMATE') onSelectTab('commercial');
                        if (isMobile && onClose) onClose();
                      }}
                      className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-[11px] font-bold transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm shadow-blue-500/25'
                          : 'text-slate-600 hover:text-blue-700 hover:bg-slate-200/70'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      <span className="truncate">{suite.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })()}

        {/* Navigation Items (Never collapses on desktop click!) */}
        <nav className="space-y-0.5 pt-0.5">
          <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block px-1 mb-1">
            Navigation
          </span>

          {primaryNavItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            const isLocked = item.isLocked;
            const isItemAdmin = item.id === 'admin';

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item, isMobile)}
                className={`group relative w-full flex items-center justify-between px-2.5 py-2 rounded-xl transition-all duration-200 text-left outline-hidden ${
                  isActive
                    ? isItemAdmin 
                      ? 'bg-gradient-to-r from-amber-600 to-amber-700 text-white shadow-md shadow-amber-600/25 border border-amber-500'
                      : 'bg-gradient-to-r from-blue-600 via-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/25 border border-blue-500'
                    : isLocked
                    ? 'text-slate-400 hover:bg-slate-50 border border-transparent'
                    : isItemAdmin
                    ? 'text-amber-800 bg-amber-50/50 hover:bg-amber-100/70 border border-amber-200/70'
                    : 'text-slate-700 hover:text-blue-900 hover:bg-blue-50/70 border border-transparent hover:border-blue-200/70'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                      isActive
                        ? 'bg-white/20 text-white shadow-xs backdrop-blur-xs'
                        : isLocked
                        ? 'bg-slate-100 text-slate-400'
                        : isItemAdmin
                        ? 'bg-amber-100 text-amber-700 group-hover:bg-amber-200/80 group-hover:scale-105'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-blue-100/90 group-hover:text-blue-600 group-hover:scale-105'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" />
                  </div>

                  <span className={`text-xs font-bold truncate leading-tight tracking-tight ${
                    isActive ? 'text-white' : isItemAdmin ? 'text-amber-900' : 'text-slate-800 group-hover:text-blue-950'
                  }`}>
                    {item.label}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0 ml-1.5">
                  {item.badge && (
                    <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded-md tracking-wider uppercase transition-colors ${
                      isActive 
                        ? 'bg-white text-blue-700 shadow-xs' 
                        : isItemAdmin
                        ? 'bg-amber-200 text-amber-900'
                        : 'bg-slate-100 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}

                  {!isActive && !isLocked && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-blue-500 transition-all shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Dedicated Upgrade Item (If higher tier available) */}
        {nextUpgradeTier && (
          <div className="pt-0.5">
            <button
              onClick={() => {
                onUpgradePrompt(PRODUCT_CONFIGS[nextUpgradeTier].name, nextUpgradeTier);
                if (isMobile && onClose) onClose();
              }}
              className="w-full flex items-center justify-between p-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:from-blue-500 hover:to-indigo-500 transition-all"
            >
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-300" />
                <span>Upgrade Edition</span>
              </div>
              <span className="text-[10px] font-mono bg-white/20 px-1.5 py-0.5 rounded">
                {PRODUCT_CONFIGS[nextUpgradeTier].price}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Bottom of Sidebar: Clean User Identity & Sign Out (anchored at bottom) */}
      <div className="pt-3 border-t border-slate-100 text-xs space-y-1 mt-auto">
        <div className="flex items-center justify-between px-1 py-0.5 text-slate-700">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-[10px] shrink-0 shadow-xs">
              {(currentUser?.username || 'F').charAt(0).toUpperCase()}
            </div>
            <div className="truncate">
              <div className="text-[11px] font-bold text-slate-900 truncate">
                {currentUser?.username || 'Founder'}
              </div>
              {isAdmin && (
                <span className="text-[8px] font-mono font-bold text-amber-600 uppercase">
                  Admin Verified
                </span>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            if (isMobile && onClose) onClose();
            store.logout();
          }}
          className="w-full flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors text-left cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5 text-rose-500" />
          <span>Sign Out</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar: Flows naturally with page content, scrolling in unison with dashboard */}
      <aside className="hidden lg:flex flex-col justify-between w-72 shrink-0 border-r border-slate-200 bg-white p-3 sm:p-3.5 self-stretch">
        {renderNavBody(false)}
      </aside>

      {/* Mobile Slide-In Sidebar: Positioned strictly below the top nav bar (top-16) */}
      <div 
        className={`lg:hidden fixed top-16 inset-x-0 bottom-0 z-50 flex transition-all duration-500 ${
          isOpen ? 'pointer-events-auto visible' : 'pointer-events-none invisible'
        }`}
      >
        {/* Backdrop below top-16 with smooth fade */}
        <div 
          className={`fixed top-16 inset-x-0 bottom-0 bg-slate-950/50 backdrop-blur-xs transition-opacity duration-500 ease-out ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={onClose}
          aria-label="Close navigation"
        />

        {/* Drawer below top-16 with smooth, weighted slide-in and slide-out from left */}
        <aside 
          style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
          className={`relative w-76 max-w-[85vw] bg-white h-full shadow-2xl p-3 sm:p-3.5 overflow-y-auto z-10 flex flex-col justify-between border-r border-slate-200 transform transition-transform duration-500 ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {renderNavBody(true)}
        </aside>
      </div>
    </>
  );
};
