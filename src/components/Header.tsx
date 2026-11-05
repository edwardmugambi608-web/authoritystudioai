import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  ShieldCheck, 
  Plus, 
  Menu, 
  X, 
  User, 
  Compass, 
  Zap, 
  Vault, 
  Key,
  LogOut,
  Lock,
  Building2,
  Layers,
  Radio,
  ShieldAlert
} from 'lucide-react';
import { store, PRODUCT_CONFIGS, isAdminUser } from '../services/store';
import { ProductTier, BusinessWorkspace } from '../types/authority';

interface HeaderProps {
  activeWorkspace?: BusinessWorkspace;
  currentPlan: ProductTier;
  activeSuite: ProductTier;
  onSelectSuite: (suite: ProductTier) => void;
  onOpenCreateModal: () => void;
  onOpenUpgradeWall: (tier?: ProductTier, featureName?: string) => void;
  onOpenAuditModal: () => void;
  onOpenAuthModal: () => void;
  onOpenNicheHub: () => void;
  onOpenVaultModal: () => void;
  onQuickExportZip: () => void;
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
  onNavigateTab?: (tab: string) => void;
  onOpenTrafficVault?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeWorkspace,
  currentPlan,
  activeSuite,
  onSelectSuite,
  onOpenCreateModal,
  onOpenUpgradeWall,
  onOpenAuditModal,
  onOpenAuthModal,
  onOpenNicheHub,
  onOpenVaultModal,
  onQuickExportZip,
  onToggleMobileMenu,
  isMobileMenuOpen,
  onNavigateTab,
  onOpenTrafficVault
}) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [wsDropdownOpen, setWsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const workspaces = store.getWorkspaces();
  const currentUser = store.getCurrentUser();
  const entitlement = PRODUCT_CONFIGS[currentPlan] || PRODUCT_CONFIGS.CORE;
  const nextUpgradeTier = store.getNextUpgradeTier();

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProfileDropdownOpen(false);
        setWsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const suites: { id: ProductTier; name: string; icon: React.ElementType }[] = [
    { id: 'CORE', name: 'Authority Studio', icon: Zap },
    { id: 'EXTENDED', name: 'Business Builder', icon: Radio },
    { id: 'PRO', name: 'Expansion Studio', icon: Layers },
    { id: 'ULTIMATE', name: 'Commercial Empire', icon: Building2 }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 transition-all shadow-sm shadow-slate-900/5 w-full">
      <div className="w-full px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Custom Stylized Brand Lockup - Always anchored to far left */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <img 
            src="/logo-icon.png" 
            alt="Authority Studio AI Emblem" 
            className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 object-contain shrink-0 drop-shadow-xs" 
          />
          <img 
            src="/logo-text.png" 
            alt="Authority Studio AI" 
            className="h-5 sm:h-6 md:h-7 w-auto object-contain drop-shadow-xs" 
          />
        </div>

        {/* Center: Product Suite Switcher (Desktop - Only shown when user has 2+ unlocked plans) */}
        {(() => {
          const unlockedSuites = suites.filter(s => store.hasAccessToTier(s.id));
          if (unlockedSuites.length <= 1) return null;

          return (
            <div className="hidden xl:flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 gap-1">
              {unlockedSuites.map(suite => {
                const isActive = activeSuite === suite.id;
                const Icon = suite.icon;

                return (
                  <button
                    key={suite.id}
                    onClick={() => onSelectSuite(suite.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-white text-blue-600 shadow-xs font-bold'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                    }`}
                    title={`Switch to ${suite.name}`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-600' : 'text-slate-500'}`} />
                    <span>{suite.name}</span>
                  </button>
                );
              })}
            </div>
          );
        })()}

        {/* Right: Quick ZIP Export + Single Clean Profile Avatar Dropdown */}
        <div className="flex items-center gap-2 shrink-0" ref={dropdownRef}>
          
          {/* Active Workspace Selector or Launch Button (Desktop) */}
          {workspaces.length > 0 ? (
            <div className="relative hidden lg:block">
              <button
                onClick={() => setWsDropdownOpen(!wsDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 rounded-lg transition-colors border border-slate-200 whitespace-nowrap text-xs cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                <span className="max-w-[130px] truncate">{activeWorkspace?.name || 'My Business'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              </button>

              {wsDropdownOpen && (
                <div className="absolute right-0 mt-1 w-60 bg-white border border-slate-200 rounded-xl shadow-xl py-1 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                    My Authority Businesses ({workspaces.length})
                  </div>
                  {workspaces.map(ws => (
                    <button
                      key={ws.id}
                      onClick={() => {
                        store.setActiveWorkspace(ws.id);
                        setWsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-50 ${
                        ws.id === activeWorkspace?.id ? 'bg-slate-100 font-bold text-slate-900' : 'text-slate-700'
                      }`}
                    >
                      <span className="truncate">{ws.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal shrink-0">{ws.nichePackageId}</span>
                    </button>
                  ))}
                  <div className="border-t border-slate-100 mt-1 pt-1 px-1">
                    <button
                      onClick={() => {
                        setWsDropdownOpen(false);
                        onOpenCreateModal();
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-blue-600 hover:bg-blue-50 rounded-lg font-medium flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Launch New Authority Business</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenCreateModal}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-200 text-xs cursor-pointer shadow-2xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Launch Business</span>
            </button>
          )}

          {/* Unified Profile Avatar Button */}
          <div className="relative">
            <button
              onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white flex items-center justify-center font-bold text-xs shadow-md border-2 border-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
              title="Account, Upgrades & Settings"
              aria-label="User Account Menu"
            >
              {currentUser ? (
                currentUser.username.charAt(0).toUpperCase()
              ) : (
                <User className="w-4 h-4" />
              )}
            </button>

            {/* Profile Dropdown Menu */}
            {profileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100 text-xs">
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-slate-100 space-y-1">
                  <div className="font-bold text-slate-900 truncate">
                    {currentUser?.username || 'Guest Founder'}
                  </div>
                  <div className="flex items-center gap-1.5 pt-0.5">
                    <span className="inline-block px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/80 font-mono text-[10px] font-bold">
                      {entitlement.name.replace('Authority Studio AI ', '')} Edition
                    </span>
                  </div>
                </div>

                {/* Direct Upgrade Button (If higher tier available) */}
                {nextUpgradeTier && (
                  <div className="p-2 border-b border-slate-100">
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenUpgradeWall(nextUpgradeTier, PRODUCT_CONFIGS[nextUpgradeTier].name);
                      }}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold transition-all shadow-md shadow-blue-500/20"
                    >
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-amber-300" />
                        <span>Upgrade to {PRODUCT_CONFIGS[nextUpgradeTier].name.replace('Authority Studio AI ', '')}</span>
                      </div>
                      <span className="text-[11px] font-mono bg-white/20 px-1.5 py-0.5 rounded">
                        {PRODUCT_CONFIGS[nextUpgradeTier].price}
                      </span>
                    </button>
                  </div>
                )}

                {/* Account Actions */}
                <div className="p-1 space-y-0.5">
                  {store.hasTrafficVaultBump() && onOpenTrafficVault && (
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onOpenTrafficVault();
                      }}
                      className="w-full text-left px-3 py-2 text-slate-800 hover:bg-slate-50 rounded-lg flex items-center justify-between transition-colors font-medium"
                    >
                      <div className="flex items-center gap-2">
                        <Vault className="w-4 h-4 text-emerald-600" />
                        <span>Traffic &amp; Sponsorship Vault</span>
                      </div>
                      <span className="text-[9px] font-mono font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                        ✓ VIP Active
                      </span>
                    </button>
                  )}

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onOpenAuthModal();
                    }}
                    className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-400" />
                    <span>Account Settings &amp; Profile</span>
                  </button>

                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      onOpenVaultModal();
                    }}
                    className="w-full text-left px-3 py-2 text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-lg flex items-center gap-2 transition-colors"
                  >
                    <Vault className="w-4 h-4 text-amber-500" />
                    <span>150 Niche Launch Vault</span>
                  </button>

                  {isAdminUser(currentUser?.username) && onNavigateTab && (
                    <button
                      onClick={() => {
                        setProfileDropdownOpen(false);
                        onNavigateTab('admin');
                      }}
                      className="w-full text-left px-3 py-2 text-amber-700 hover:bg-amber-50 rounded-lg flex items-center gap-2 font-bold transition-colors"
                    >
                      <ShieldAlert className="w-4 h-4 text-amber-600" />
                      <span>WarriorPlus Admin Hub</span>
                    </button>
                  )}
                </div>

                {/* Sign Out */}
                <div className="border-t border-slate-100 p-1 mt-1">
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false);
                      store.logout();
                    }}
                    className="w-full text-left px-3 py-2 text-rose-600 hover:bg-rose-50 rounded-lg flex items-center gap-2 font-semibold transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    <span>Sign Out of Studio</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Relocated Menu / Sidebar Toggle Button (Far Right, directly next to Profile Avatar) */}
          <button
            onClick={onToggleMobileMenu}
            className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/80 hover:bg-blue-100 hover:text-blue-700 flex items-center justify-center transition-all shadow-2xs hover:scale-105 active:scale-95 shrink-0"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4 text-blue-700" /> : <Menu className="w-4 h-4 text-blue-700" />}
          </button>
        </div>

      </div>
    </header>
  );
};
