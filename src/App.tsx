import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar, TabKey } from './components/Sidebar';
import { DashboardTab } from './components/DashboardTab';
import { LaunchPlanTab } from './components/LaunchPlanTab';
import { WebsitePreviewTab } from './components/WebsitePreviewTab';
import { MicroToolsTab } from './components/MicroToolsTab';
import { ContentLibraryTab } from './components/ContentLibraryTab';
import { LeadMagnetTab } from './components/LeadMagnetTab';
import { MonetizationTab } from './components/MonetizationTab';
import { ExportsTab } from './components/ExportsTab';
import { OperationsTab } from './components/OperationsTab';
import { PortfolioTab } from './components/PortfolioTab';
import { CommercialTab } from './components/CommercialTab';
import { CatalogAuditModal } from './components/CatalogAuditModal';
import { CreateBusinessModal } from './components/CreateBusinessModal';
import { AuthModal } from './components/AuthModal';
import { UpgradeWallModal } from './components/UpgradeWallModal';
import { NicheSelectionHub } from './components/NicheSelectionHub';
import { SecretDeliveryModal } from './components/SecretDeliveryModal';
import { NicheVaultModal } from './components/NicheVaultModal';
import { TrafficVaultModal } from './components/TrafficVaultModal';
import { FEDeliverablesModal } from './components/FEDeliverablesModal';
import { LoginPage } from './components/LoginPage';
import { AdminTab } from './components/AdminTab';
import { ProtocolGuideTab } from './components/ProtocolGuideTab';
import { RepurposingModal } from './components/RepurposingModal';
import { store, PRODUCT_CONFIGS } from './services/store';
import { ProductTier, BusinessWorkspace, ContentAsset } from './types/authority';
import { generateBusinessInABoxZip } from './services/export-service';
import { LayoutDashboard, Compass, Wrench, FileText, Menu as MenuIcon, ArrowLeft, Monitor, Sparkles, Plus, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

const TAB_NAME_MAP: Record<TabKey, string> = {
  dashboard: 'Executive Dashboard',
  guide: 'Quickstart Protocol',
  launch_plan: '7-Day Launch Checklist',
  website: 'Live Website Preview',
  tools: 'Interactive AI Tools',
  content: 'Content Library & Guides',
  lead_magnet: 'Lead Magnet Playbook',
  monetization: 'Monetization & Partners',
  exports: 'Download Business ZIP',
  operations: 'Operations & Scaling',
  portfolio: 'Multi-Business Portfolio',
  commercial: 'Commercial Agency Studio',
  niches: 'Niche Selection Vault',
  admin: 'Funnel Access Matrix',
  catalog_audit: 'Verification Audit',
  repurposing: '1-into-7 Content Multiplier',
  cloner: '1-Click Business Cloner',
  client_portals: 'Client Portals',
  license: 'Whitelabel Agency License',
  local_event: 'Local & Event Packages'
};

export default function App() {
  const [, setTick] = useState(0);

  // Subscribe to reactive store
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setTick(t => t + 1);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const activeWorkspace = store.getActiveWorkspace();
  const currentPlan = store.getPlan();
  const hasChosenInitialNiche = store.getHasChosenInitialNiche();

  // Active Product Suite State (CORE | EXTENDED | PRO | ULTIMATE)
  const [activeSuite, setActiveSuite] = useState<ProductTier>('CORE');

  // Navigation tab state
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');

  // Deep linking selections
  const [selectedToolSlug, setSelectedToolSlug] = useState<string | undefined>();
  const [selectedAssetSlug, setSelectedAssetSlug] = useState<string | undefined>();

  // OTO Launcher deep links & modals
  const [repurposingModalOpen, setRepurposingModalOpen] = useState(false);
  const [repurposingAsset, setRepurposingAsset] = useState<ContentAsset | null>(null);
  const [portfolioOpenClone, setPortfolioOpenClone] = useState(false);
  const [commercialSubSection, setCommercialSubSection] = useState<'clients' | 'license' | 'local_package' | 'event_package'>('clients');

  // Modals & Navigation state
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [nicheHubOpen, setNicheHubOpen] = useState(false);
  const [vaultModalOpen, setVaultModalOpen] = useState(false);
  const [trafficVaultOpen, setTrafficVaultOpen] = useState(false);
  const [feDeliverablesOpen, setFeDeliverablesOpen] = useState(false);
  const [upgradeWallOpen, setUpgradeWallOpen] = useState(false);
  const [upgradeWallTargetTier, setUpgradeWallTargetTier] = useState<ProductTier>('EXTENDED');
  const [upgradeWallFeature, setUpgradeWallFeature] = useState<string | undefined>();

  // Secret Delivery Modal state
  const [deliveredTier, setDeliveredTier] = useState<ProductTier | string | null>(null);

  // Detect instant delivery URLs on page load (e.g. ?access=traffic-vault, ?access=builder, ?delivery=...)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const searchParams = new URLSearchParams(window.location.search);
    const accessParam = searchParams.get('access') || searchParams.get('delivery');
    const path = window.location.pathname.toLowerCase();

    let keyToRedeem: string | null = null;

    if (accessParam) {
      keyToRedeem = accessParam;
    } else if (path.includes('/delivery/traffic') || path.includes('/traffic-vault')) {
      keyToRedeem = 'traffic-vault';
    } else if (path.includes('/delivery/extended') || path.includes('/extended')) {
      keyToRedeem = 'builder';
    } else if (path.includes('/delivery/pro') || path.includes('/pro')) {
      keyToRedeem = 'pro';
    } else if (path.includes('/delivery/ultimate') || path.includes('/ultimate')) {
      keyToRedeem = 'agency';
    } else if (path.includes('/delivery/cloud') || path.includes('/cloud')) {
      keyToRedeem = 'cloud';
    } else if (path.includes('/delivery/local') || path.includes('/local')) {
      keyToRedeem = 'local';
    } else if (path.includes('/delivery/event') || path.includes('/event')) {
      keyToRedeem = 'event';
    }

    if (keyToRedeem) {
      const res = store.unlockBySecretKey(keyToRedeem);
      if (res.success && res.tier) {
        setDeliveredTier(res.tier);
        confetti({ particleCount: 150, spread: 90, origin: { y: 0.5 } });
        // Clean URL cleanly without reloading page
        if (window.history && window.history.replaceState) {
          const cleanUrl = window.location.pathname;
          window.history.replaceState({}, document.title, cleanUrl);
        }
      }
    }
  }, []);

  // Quick ZIP export from header
  const handleQuickExportZip = async () => {
    if (!activeWorkspace) return;
    try {
      const blob = await generateBusinessInABoxZip(activeWorkspace);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeWorkspace.brandProfile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-business-in-a-box.zip`;
      a.click();
      URL.revokeObjectURL(url);
      confetti({ particleCount: 75, spread: 65, origin: { y: 0.6 } });
    } catch (e) {
      console.error(e);
    }
  };

  // Tab navigation history for seamless back button support
  const [navHistory, setNavHistory] = useState<TabKey[]>(['dashboard']);

  const handleGoBack = () => {
    if (navHistory.length > 1) {
      const nextHistory = [...navHistory];
      nextHistory.pop(); // remove current
      const prevTab = nextHistory[nextHistory.length - 1] || 'dashboard';
      setNavHistory(nextHistory);
      setActiveTab(prevTab);
    } else {
      setActiveTab('dashboard');
    }
  };

  const handleNavigateToTool = (slug: string) => {
    setSelectedToolSlug(slug);
    setNavHistory(prev => [...prev, 'tools']);
    setActiveTab('tools');
    setMobileMenuOpen(false);
  };

  const handleNavigateToContent = (slug: string) => {
    setSelectedAssetSlug(slug);
    setNavHistory(prev => [...prev, 'content']);
    setActiveTab('content');
    setMobileMenuOpen(false);
  };

  const handleOpenUpgradeWall = (tier?: ProductTier, featureName?: string) => {
    setUpgradeWallTargetTier(tier || store.getNextUpgradeTier() || 'EXTENDED');
    setUpgradeWallFeature(featureName);
    setUpgradeWallOpen(true);
  };

  const handleSelectTab = (tab: TabKey) => {
    setMobileMenuOpen(false);
    if (tab === 'catalog_audit') {
      setAuditModalOpen(true);
      return;
    }
    if (tab === 'repurposing') {
      if (activeWorkspace && activeWorkspace.contentAssets && activeWorkspace.contentAssets.length > 0) {
        setRepurposingAsset(activeWorkspace.contentAssets[0]);
      }
      setRepurposingModalOpen(true);
      return;
    }
    if (tab === 'cloner') {
      setPortfolioOpenClone(true);
      setActiveTab('portfolio');
      return;
    }
    if (tab === 'client_portals') {
      setCommercialSubSection('clients');
      setActiveTab('commercial');
      return;
    }
    if (tab === 'license') {
      setCommercialSubSection('license');
      setActiveTab('commercial');
      return;
    }
    if (tab === 'local_event') {
      setCommercialSubSection('local_package');
      setActiveTab('commercial');
      return;
    }
    if (tab !== 'portfolio') {
      setPortfolioOpenClone(false);
    }
    setNavHistory(prev => prev[prev.length - 1] === tab ? prev : [...prev, tab]);
    setActiveTab(tab);
  };

  const currentUser = store.getCurrentUser();

  if (!currentUser) {
    return <LoginPage onLoginSuccess={() => setTick(t => t + 1)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8fbff] via-white to-[#edf5ff] bg-ambient-light flex flex-col font-sans text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden w-full max-w-full">
      
      {/* 3-Zone Top Bar */}
      <Header
        activeWorkspace={activeWorkspace}
        currentPlan={currentPlan}
        activeSuite={activeSuite}
        onSelectSuite={(suite) => setActiveSuite(suite)}
        onOpenCreateModal={() => setCreateModalOpen(true)}
        onOpenUpgradeWall={(tier, feature) => handleOpenUpgradeWall(tier, feature)}
        onOpenAuditModal={() => setAuditModalOpen(true)}
        onOpenAuthModal={() => setAuthModalOpen(true)}
        onOpenNicheHub={() => handleSelectTab('niches')}
        onOpenVaultModal={() => setVaultModalOpen(true)}
        onQuickExportZip={handleQuickExportZip}
        onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
        isMobileMenuOpen={mobileMenuOpen}
        onNavigateTab={(tab) => handleSelectTab(tab as TabKey)}
        onOpenTrafficVault={() => setTrafficVaultOpen(true)}
      />

      {/* Main Body with Docked Left Sidebar on Desktop & Dynamic Content Canvas */}
      <div className="flex-1 flex w-full relative min-w-0">
        <Sidebar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          currentPlan={currentPlan}
          activeSuite={activeSuite}
          onSelectSuite={(suite) => {
            setActiveSuite(suite);
            store.setPlan(suite);
          }}
          onUpgradePrompt={(feat, tier) => handleOpenUpgradeWall(tier, feat)}
          onOpenVaultModal={() => setVaultModalOpen(true)}
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          onOpenCreateModal={() => {
            setMobileMenuOpen(false);
            setCreateModalOpen(true);
          }}
        />

        {/* Main Content Canvas */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden pb-12">
        
        {/* Universal Sticky Breadcrumb & Back Bar (Available when off Dashboard) */}
        {activeTab !== 'dashboard' && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 sm:px-4 sm:py-2.5 shadow-2xs">
            <div className="flex items-center gap-2 sm:gap-2.5 text-xs">
              <button
                onClick={handleGoBack}
                className="flex items-center gap-1.5 font-bold text-slate-800 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-xl transition-all border border-slate-200/80 cursor-pointer shadow-2xs"
                title="Go back to previous screen"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>&larr; Back</span>
              </button>

              <span className="text-slate-300">/</span>

              <button
                onClick={() => handleSelectTab('dashboard')}
                className="font-semibold text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
              >
                Dashboard
              </button>

              <span className="text-slate-300">/</span>

              <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px] font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200/60">
                {TAB_NAME_MAP[activeTab] || activeTab}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {activeTab !== 'website' && (
                <button
                  onClick={() => handleSelectTab('website')}
                  className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-600 bg-slate-100 hover:bg-blue-50 px-3 py-1.5 rounded-xl transition-colors border border-slate-200/80 cursor-pointer"
                >
                  <Monitor className="w-3.5 h-3.5 text-blue-500" />
                  <span>Website Preview</span>
                </button>
              )}
              <button
                onClick={() => handleSelectTab('dashboard')}
                className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-xl transition-colors border border-slate-200/80 cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-slate-500" />
                <span>Dashboard</span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'admin' && (
          <AdminTab
            onOpenAuditModal={() => setAuditModalOpen(true)}
            onSelectSuite={setActiveSuite}
          />
        )}

        {activeTab === 'guide' && (
          <ProtocolGuideTab
            activeSuite={activeSuite}
            onNavigateTab={handleSelectTab}
            onOpenUpgradeWall={(tier, feat) => handleOpenUpgradeWall(tier, feat)}
          />
        )}

        {activeTab === 'niches' && (
          <NicheSelectionHub
            onNicheActivated={() => {
              setActiveTab('dashboard');
            }}
            onOpenUpgradeWall={(tier, feat) => handleOpenUpgradeWall(tier, feat)}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardTab
            workspace={activeWorkspace}
            currentPlan={currentPlan}
            activeSuite={activeSuite}
            onSelectSuite={setActiveSuite}
            onNavigateTab={handleSelectTab}
            onOpenAuditModal={() => setAuditModalOpen(true)}
            onExportZip={handleQuickExportZip}
            onOpenTrafficVault={() => setTrafficVaultOpen(true)}
            onOpenFEDeliverables={() => setFeDeliverablesOpen(true)}
            onOpenRepurposing={(asset) => {
              setRepurposingAsset(asset);
              setRepurposingModalOpen(true);
            }}
          />
        )}

        {activeTab !== 'niches' && activeTab !== 'dashboard' && activeTab !== 'admin' && activeTab !== 'guide' && activeWorkspace && (
          <>

              {activeTab === 'launch_plan' && (
                <LaunchPlanTab
                  workspace={activeWorkspace}
                  onNavigateTab={handleSelectTab}
                />
              )}

              {activeTab === 'website' && (
                <WebsitePreviewTab
                  workspace={activeWorkspace}
                  onNavigateToTool={handleNavigateToTool}
                  onNavigateToContent={handleNavigateToContent}
                  onNavigateTab={(tab) => handleSelectTab(tab as TabKey)}
                />
              )}

              {activeTab === 'tools' && (
                <MicroToolsTab
                  workspace={activeWorkspace}
                  initialToolSlug={selectedToolSlug}
                  onNavigateTab={(tab) => handleSelectTab(tab as TabKey)}
                />
              )}

              {activeTab === 'content' && (
                <ContentLibraryTab
                  workspace={activeWorkspace}
                  initialAssetSlug={selectedAssetSlug}
                  onOpenRepurposing={(asset) => {
                    setRepurposingAsset(asset);
                    setRepurposingModalOpen(true);
                  }}
                  onNavigateTab={(tab) => handleSelectTab(tab as TabKey)}
                />
              )}

              {activeTab === 'lead_magnet' && (
                <LeadMagnetTab
                  workspace={activeWorkspace}
                />
              )}

              {activeTab === 'monetization' && (
                <MonetizationTab
                  workspace={activeWorkspace}
                />
              )}

              {activeTab === 'exports' && (
                <ExportsTab
                  workspace={activeWorkspace}
                />
              )}

              {activeTab === 'operations' && (
                <OperationsTab
                  workspace={activeWorkspace}
                  currentPlan={currentPlan}
                  onNavigateTab={(tab) => handleSelectTab(tab as TabKey)}
                  onNavigateToContent={handleNavigateToContent}
                  onNavigateToTool={handleNavigateToTool}
                />
              )}

              {activeTab === 'portfolio' && (
                <PortfolioTab
                  currentPlan={currentPlan}
                  initialOpenClone={portfolioOpenClone}
                  onOpenCreateModal={() => setCreateModalOpen(true)}
                  onSelectWorkspace={() => {
                    setPortfolioOpenClone(false);
                    setActiveTab('dashboard');
                  }}
                />
              )}

              {activeTab === 'commercial' && (
                <CommercialTab
                  currentPlan={currentPlan}
                  activeWorkspace={activeWorkspace}
                  initialSubSection={commercialSubSection}
                />
              )}
            </>
          )}

        {/* Empty State Prompt when clicking property tabs before generating a business */}
        {activeTab !== 'niches' && activeTab !== 'dashboard' && activeTab !== 'admin' && activeTab !== 'guide' && !activeWorkspace && (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto space-y-5 shadow-xs my-8">
            <div className="w-16 h-16 rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
              <Sparkles className="w-8 h-8 text-blue-600" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                No Authority Business Generated Yet
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
                You haven't generated a business property yet. Pick a niche and click Launch on the Executive Dashboard to deploy all 8 micro-tools, 40 articles, and 11 pages.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => handleSelectTab('dashboard')}
                className="px-6 py-3 text-xs font-black text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Launch Business on Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCreateModalOpen(true)}
                className="px-5 py-3 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Open Setup Wizard</span>
              </button>
            </div>
          </div>
        )}
        </main>
      </div>

      {/* Frictionless User Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Commercial Upgrade Wall Modal (Links to Firebase web.app + Instant Secret Key simulation) */}
      <UpgradeWallModal
        isOpen={upgradeWallOpen}
        onClose={() => setUpgradeWallOpen(false)}
        targetTier={upgradeWallTargetTier}
        featureName={upgradeWallFeature}
      />

      {/* Secret Product Delivery Modal */}
      {deliveredTier && (
        <SecretDeliveryModal
          isOpen={!!deliveredTier}
          onClose={() => setDeliveredTier(null)}
          unlockedTier={deliveredTier}
          onNavigateToTab={(t) => handleSelectTab(t as TabKey)}
          onOpenUpgradeWall={(tier, feat) => handleOpenUpgradeWall(tier, feat)}
          onOpenTrafficVault={() => setTrafficVaultOpen(true)}
        />
      )}

      {/* 24-Hour Fast-Traffic & Brand Sponsorship Vault Modal ($14.05 FE Order Bump) */}
      <TrafficVaultModal
        isOpen={trafficVaultOpen}
        onClose={() => setTrafficVaultOpen(false)}
      />

      {/* Front-End Executive Deliverables Vault Modal (5 Core Deliverables) */}
      <FEDeliverablesModal
        isOpen={feDeliverablesOpen}
        onClose={() => setFeDeliverablesOpen(false)}
        brandName={activeWorkspace?.name}
      />

      {/* Niche Launch Vault Bump Modal */}
      <NicheVaultModal
        isOpen={vaultModalOpen}
        onClose={() => setVaultModalOpen(false)}
      />

      {/* Automated Catalog Verification Modal */}
      <CatalogAuditModal
        isOpen={auditModalOpen}
        onClose={() => setAuditModalOpen(false)}
      />

      {/* Step-by-Step Business Setup Wizard Modal */}
      <CreateBusinessModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onBusinessCreated={(newWsId) => {
          store.setActiveWorkspace(newWsId);
          setActiveTab('dashboard');
        }}
      />

      {/* 1-into-7 Traffic Repurposing Engine Modal */}
      {activeWorkspace && activeWorkspace.contentAssets && activeWorkspace.contentAssets.length > 0 && (
        <RepurposingModal
          isOpen={repurposingModalOpen}
          onClose={() => setRepurposingModalOpen(false)}
          workspace={activeWorkspace}
          asset={repurposingAsset || activeWorkspace.contentAssets[0]}
          onOpenUpgradeWall={(tier, feat) => handleOpenUpgradeWall(tier, feat)}
        />
      )}

    </div>
  );
}
