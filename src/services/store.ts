import { 
  ProductTier, 
  PlanTier, 
  PlanEntitlement, 
  BusinessWorkspace, 
  SubscriberLead, 
  CustomerOrder, 
  AnalyticsEvent, 
  ClientWorkspace, 
  AuditLog, 
  BusinessModelType,
  AuthUser,
  ToolDefinition 
} from '../types/authority';
import { 
  feNichePackages, 
  coreNichePackages, 
  extendedNichePackages, 
  allNichePackages, 
  getNichePackageById 
} from '../data/niches';

export const PRODUCT_CONFIGS: Record<ProductTier, PlanEntitlement> = {
  CORE: {
    tier: 'CORE',
    name: 'Authority Studio AI',
    tagline: 'Pick a niche and create a complete authority business property.',
    price: '$4.95',
    checkoutUrl: 'https://authority-studio.web.app/core',
    secretDeliveryKey: 'auth_core_access_secret',
    nextTier: 'EXTENDED',
    maxWorkspaces: 1,
    availableNiches: 5,
    canPublish: false,
    canConnectDomain: false,
    canCaptureLeads: true,
    canSellPaidTools: false,
    canCloneBusiness: false,
    canManagePortfolio: false,
    canClientDeliver: false,
    whiteLabelExport: false,
    clientWorkspaces: false,
    teamPermissions: false
  },
  EXTENDED: {
    tier: 'EXTENDED',
    name: 'Authority Studio AI Extended',
    tagline: 'Expand to 10 niches and turn the property into an operational business.',
    price: '$47',
    checkoutUrl: 'https://authority-studio.web.app/extended',
    secretDeliveryKey: 'auth_ext_secret_access',
    nextTier: 'PRO',
    maxWorkspaces: 10,
    availableNiches: 10,
    canPublish: true,
    canConnectDomain: true,
    canCaptureLeads: true,
    canSellPaidTools: true,
    canCloneBusiness: true,
    canManagePortfolio: true,
    canClientDeliver: false,
    whiteLabelExport: false,
    clientWorkspaces: false,
    teamPermissions: false
  },
  PRO: {
    tier: 'PRO',
    name: 'Authority Studio AI Pro',
    tagline: 'Repurpose content into 7 traffic formats, carousels, video scripts, and sales materials.',
    price: '$67',
    checkoutUrl: 'https://authority-studio.web.app/pro',
    secretDeliveryKey: 'auth_pro_secret_access',
    nextTier: 'ULTIMATE',
    maxWorkspaces: 10,
    availableNiches: 10,
    canPublish: true,
    canConnectDomain: true,
    canCaptureLeads: true,
    canSellPaidTools: true,
    canCloneBusiness: true,
    canManagePortfolio: true,
    canClientDeliver: false,
    whiteLabelExport: true,
    clientWorkspaces: false,
    teamPermissions: false
  },
  ULTIMATE: {
    tier: 'ULTIMATE',
    name: 'Authority Studio AI Ultimate',
    tagline: 'Scale to 24 niches, 1,800+ assets, client delivery portals, and commercial agency licensing.',
    price: '$97',
    checkoutUrl: 'https://authority-studio.web.app/ultimate',
    secretDeliveryKey: 'auth_ult_secret_access',
    // Ultimate is the top tier, no next core tier!
    maxWorkspaces: 24,
    availableNiches: 24,
    canPublish: true,
    canConnectDomain: true,
    canCaptureLeads: true,
    canSellPaidTools: true,
    canCloneBusiness: true,
    canManagePortfolio: true,
    canClientDeliver: true,
    whiteLabelExport: true,
    clientWorkspaces: true,
    teamPermissions: true
  },
  CLOUD: {
    tier: 'CLOUD',
    name: 'Authority Cloud',
    tagline: 'Fully managed cloud infrastructure, hosting, deployment assistance, and backups.',
    price: '$297/yr',
    checkoutUrl: 'https://authority-studio.web.app/cloud',
    secretDeliveryKey: 'auth_cloud_secret_access',
    maxWorkspaces: 24,
    availableNiches: 24,
    canPublish: true,
    canConnectDomain: true,
    canCaptureLeads: true,
    canSellPaidTools: true,
    canCloneBusiness: true,
    canManagePortfolio: true,
    canClientDeliver: true,
    whiteLabelExport: true,
    clientWorkspaces: true,
    teamPermissions: true
  },
  LOCAL: {
    tier: 'LOCAL',
    name: 'Local Authority Studio',
    tagline: 'Build and deliver marketing authority assets for local business clients.',
    price: '$247',
    checkoutUrl: 'https://authority-studio.web.app/local',
    secretDeliveryKey: 'auth_local_secret_access',
    maxWorkspaces: 24,
    availableNiches: 24,
    canPublish: true,
    canConnectDomain: true,
    canCaptureLeads: true,
    canSellPaidTools: true,
    canCloneBusiness: true,
    canManagePortfolio: true,
    canClientDeliver: true,
    whiteLabelExport: true,
    clientWorkspaces: true,
    teamPermissions: true
  },
  EVENT: {
    tier: 'EVENT',
    name: 'Local Event Studio',
    tagline: 'Create authority sites, directories, sponsor pitch decks, and attendee funnels for events.',
    price: '$247',
    checkoutUrl: 'https://authority-studio.web.app/event',
    secretDeliveryKey: 'auth_event_secret_access',
    maxWorkspaces: 24,
    availableNiches: 24,
    canPublish: true,
    canConnectDomain: true,
    canCaptureLeads: true,
    canSellPaidTools: true,
    canCloneBusiness: true,
    canManagePortfolio: true,
    canClientDeliver: true,
    whiteLabelExport: true,
    clientWorkspaces: true,
    teamPermissions: true
  },
  // Legacy aliases
  FE: {
    tier: 'CORE',
    name: 'Authority Studio AI',
    tagline: 'Pick a niche and create a complete authority business property foundation.',
    price: '$4.95',
    checkoutUrl: 'https://authority-studio.web.app/core',
    secretDeliveryKey: 'auth_core_access_secret',
    nextTier: 'EXTENDED',
    maxWorkspaces: 1,
    availableNiches: 5,
    canPublish: false,
    canConnectDomain: false,
    canCaptureLeads: true,
    canSellPaidTools: false,
    canCloneBusiness: false,
    canManagePortfolio: false,
    canClientDeliver: false,
    whiteLabelExport: false,
    clientWorkspaces: false,
    teamPermissions: false
  },
  OTO_1: {
    tier: 'EXTENDED',
    name: 'Authority Studio AI Extended',
    tagline: 'Make the business fully operational with custom domains, publishing, email, and sales.',
    price: '$47',
    checkoutUrl: 'https://authority-studio.web.app/extended',
    secretDeliveryKey: 'auth_ext_secret_access',
    nextTier: 'PRO',
    maxWorkspaces: 10,
    availableNiches: 10,
    canPublish: true,
    canConnectDomain: true,
    canCaptureLeads: true,
    canSellPaidTools: true,
    canCloneBusiness: true,
    canManagePortfolio: true,
    canClientDeliver: false,
    whiteLabelExport: false,
    clientWorkspaces: false,
    teamPermissions: false
  },
  OTO_2: {
    tier: 'PRO',
    name: 'Authority Studio AI Pro',
    tagline: 'Turn site content into promotional campaigns, carousels, video scripts, and sales materials.',
    price: '$67',
    checkoutUrl: 'https://authority-studio.web.app/pro',
    secretDeliveryKey: 'auth_pro_secret_access',
    nextTier: 'ULTIMATE',
    maxWorkspaces: 10,
    availableNiches: 10,
    canPublish: true,
    canConnectDomain: true,
    canCaptureLeads: true,
    canSellPaidTools: true,
    canCloneBusiness: true,
    canManagePortfolio: true,
    canClientDeliver: false,
    whiteLabelExport: true,
    clientWorkspaces: false,
    teamPermissions: false
  },
  OTO_3: {
    tier: 'ULTIMATE',
    name: 'Authority Studio AI Ultimate',
    tagline: 'Commercial client delivery, white-label exports, up to 24 workspaces & client portals.',
    price: '$97',
    checkoutUrl: 'https://authority-studio.web.app/ultimate',
    secretDeliveryKey: 'auth_ult_secret_access',
    maxWorkspaces: 24,
    availableNiches: 24,
    canPublish: true,
    canConnectDomain: true,
    canCaptureLeads: true,
    canSellPaidTools: true,
    canCloneBusiness: true,
    canManagePortfolio: true,
    canClientDeliver: true,
    whiteLabelExport: true,
    clientWorkspaces: true,
    teamPermissions: true
  }
};

export const PLAN_CONFIGS = PRODUCT_CONFIGS;

const STORAGE_KEYS = {
  USER: 'auth_studio_active_user',
  USERS_DB: 'auth_studio_users_db',
  PLAN: 'auth_studio_current_plan',
  WORKSPACES: 'auth_studio_workspaces',
  ACTIVE_WS_ID: 'auth_studio_active_workspace_id',
  SUBSCRIBERS: 'auth_studio_subscribers',
  ORDERS: 'auth_studio_orders',
  ANALYTICS: 'auth_studio_analytics',
  CLIENT_WORKSPACES: 'auth_studio_clients',
  AUDIT_LOGS: 'auth_studio_audit_logs',
  HAS_CHOSEN_NICHE: 'auth_studio_niche_selected',
  PENDING_DELIVERIES: 'auth_studio_pending_deliveries',
  CUSTOM_SALES_URLS: 'auth_studio_custom_sales_urls',
  BASE_APP_URL: 'auth_studio_base_app_url',
  CUSTOM_DELIVERY_URLS: 'auth_studio_custom_delivery_urls'
};

export function isAdminUser(emailOrUsername?: string | null): boolean {
  if (!emailOrUsername) return false;
  const clean = emailOrUsername.trim().toLowerCase();
  const adminIdentities = [
    'edward5036',
    'edwardmugambi545@gmail.com',
    'edwardmugambi60@gmail.com',
    'e3185728@gmail.com'
  ];
  return adminIdentities.includes(clean);
}

export function createWorkspaceFromNiche(
  nicheId: string,
  businessName: string,
  businessModel: BusinessModelType = 'hybrid_monetized'
): BusinessWorkspace {
  const pkg = getNichePackageById(nicheId) || feNichePackages[0];
  const workspaceId = `ws-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

  const contentAssets = pkg.contentBlueprints.map(asset => ({
    ...asset,
    id: `${workspaceId}-${asset.id}`,
    updatedAt: new Date().toISOString().split('T')[0]
  }));

  const tools = pkg.toolBlueprints.map(tool => ({
    ...tool,
    id: `${workspaceId}-${tool.id}`
  }));

  const brandProfile = {
    ...pkg.brandDefaults,
    name: businessName || pkg.brandDefaults.name,
    logoText: businessName || pkg.brandDefaults.logoText
  };

  return {
    id: workspaceId,
    organizationId: 'org-default',
    name: businessName || pkg.brandDefaults.name,
    nichePackageId: pkg.id,
    businessModel,
    status: 'draft',
    brandProfile,
    audienceProfile: { ...pkg.audienceDefaults },
    monetizationMap: { ...pkg.monetizationDefaults, primaryModel: businessModel },
    contentAssets,
    tools,
    leadMagnet: { ...pkg.leadMagnet },
    emailSequence: { ...pkg.emailSequence },
    promotionAssets: [...pkg.promotionBlueprints],
    isPublished: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

class AuthorityStore {
  private currentUser: AuthUser | null = null;
  private currentPlan: ProductTier = 'CORE';
  private workspaces: BusinessWorkspace[] = [];
  private activeWorkspaceId: string = '';
  private subscribers: SubscriberLead[] = [];
  private orders: CustomerOrder[] = [];
  private analytics: AnalyticsEvent[] = [];
  private clientWorkspaces: ClientWorkspace[] = [];
  private auditLogs: AuditLog[] = [];
  private listeners: Set<() => void> = new Set();
  private hasChosenInitialNiche: boolean = false;

  constructor() {
    this.init();
  }

  private init() {
    if (typeof window === 'undefined') return;

    // Load active user session (no auto-login, arrives at LoginPage)
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed && parsed.id && parsed.id !== 'usr-founder' && parsed.username !== 'founder@authoritystudio.com') {
          this.currentUser = parsed;
          if (this.currentUser) {
            this.currentPlan = this.currentUser.tier || 'CORE';
          }
        } else {
          // Clear legacy placeholder founder session so arrival is always at login page
          this.currentUser = null;
          localStorage.removeItem(STORAGE_KEYS.USER);
        }
      } catch {
        this.currentUser = null;
        localStorage.removeItem(STORAGE_KEYS.USER);
      }
    } else {
      // Arriving visitors start unauthenticated on LoginPage
      this.currentUser = null;
    }

    // Check if user has chosen niche
    const hasChosen = localStorage.getItem(STORAGE_KEYS.HAS_CHOSEN_NICHE);
    this.hasChosenInitialNiche = hasChosen === 'true';

    // Load Workspaces - Strictly NO default business until one is generated by user
    const isUserGenerated = localStorage.getItem('auth_studio_user_generated') === 'true';
    const storedWs = localStorage.getItem(STORAGE_KEYS.WORKSPACES);
    if (storedWs && isUserGenerated) {
      try {
        const parsed = JSON.parse(storedWs);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Permanently purge any old dummy placeholders
          this.workspaces = parsed.filter(w => w.name !== 'Craft & Foundation Studio');
        }
      } catch {}
    }

    if (this.workspaces.length === 0) {
      // Clean slate: no default business until user explicitly generates one
      this.workspaces = [];
      this.activeWorkspaceId = '';
      this.hasChosenInitialNiche = false;
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_WS_ID);
      localStorage.setItem(STORAGE_KEYS.HAS_CHOSEN_NICHE, 'false');
    } else {
      const savedActiveId = localStorage.getItem(STORAGE_KEYS.ACTIVE_WS_ID);
      this.activeWorkspaceId = savedActiveId && this.workspaces.some(w => w.id === savedActiveId)
        ? savedActiveId
        : this.workspaces[0]?.id || '';
      this.hasChosenInitialNiche = true;
    }

    // Load Subscribers (only when workspace exists)
    const savedSubs = localStorage.getItem(STORAGE_KEYS.SUBSCRIBERS);
    if (savedSubs && this.workspaces.length > 0) {
      try { this.subscribers = JSON.parse(savedSubs); } catch {}
    } else {
      this.subscribers = [];
      localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(this.subscribers));
    }

    // Load Orders (only when workspace exists)
    const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (savedOrders && this.workspaces.length > 0) {
      try { this.orders = JSON.parse(savedOrders); } catch {}
    } else {
      this.orders = [];
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(this.orders));
    }

    // Load Analytics
    const savedAnalytics = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    if (savedAnalytics) {
      try { this.analytics = JSON.parse(savedAnalytics); } catch {}
    }

    // Load Clients
    const savedClients = localStorage.getItem(STORAGE_KEYS.CLIENT_WORKSPACES);
    if (savedClients) {
      try { this.clientWorkspaces = JSON.parse(savedClients); } catch {}
    } else {
      this.clientWorkspaces = [
        {
          id: 'cl-1',
          clientName: 'Marcus Thorne',
          clientEmail: 'marcus@thornebuild.com',
          companyName: 'Thorne Architecture Group',
          workspaceId: this.activeWorkspaceId,
          status: 'reviewing',
          canEditCopy: true,
          whiteLabelMode: true,
          createdAt: new Date(Date.now() - 86400000 * 5).toISOString()
        }
      ];
      localStorage.setItem(STORAGE_KEYS.CLIENT_WORKSPACES, JSON.stringify(this.clientWorkspaces));
    }

    // Load Audit Logs
    const savedLogs = localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS);
    if (savedLogs) {
      try { this.auditLogs = JSON.parse(savedLogs); } catch {}
    }
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(fn => fn());
  }

  // --- Pending Delivery Queue (WarriorPlus ?delivery=... for pre-login buyers) ---
  public getPendingDeliveries(): ProductTier[] {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PENDING_DELIVERIES);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  public queueDeliveryTier(tier: ProductTier) {
    if (typeof window === 'undefined') return;
    const current = this.getPendingDeliveries();
    if (!current.includes(tier)) {
      current.push(tier);
      localStorage.setItem(STORAGE_KEYS.PENDING_DELIVERIES, JSON.stringify(current));
    }
  }

  public clearPendingDeliveries(): ProductTier[] {
    if (typeof window === 'undefined') return [];
    const pending = this.getPendingDeliveries();
    localStorage.removeItem(STORAGE_KEYS.PENDING_DELIVERIES);
    return pending;
  }

  // --- Custom Sales Page URLs (Editable in Admin Panel) ---
  public getSalesUrl(tier: ProductTier | string): string {
    if (typeof window === 'undefined') {
      if (tier === 'TRAFFIC_VAULT' || tier === 'traffic-vault' || tier === 'auth_traffic_vault_secret') {
        return 'https://authority-studio.web.app/traffic-vault';
      }
      return PRODUCT_CONFIGS[tier as ProductTier]?.checkoutUrl || '';
    }
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_SALES_URLS);
      if (stored) {
        const map = JSON.parse(stored);
        if (map[tier]) return map[tier];
      }
    } catch {}
    if (tier === 'TRAFFIC_VAULT' || tier === 'traffic-vault' || tier === 'auth_traffic_vault_secret') {
      return 'https://authority-studio.web.app/traffic-vault';
    }
    return PRODUCT_CONFIGS[tier as ProductTier]?.checkoutUrl || '';
  }

  // --- Base App URL Configuration (for Render & Custom Domains) ---
  public getBaseAppUrl(): string {
    if (typeof window === 'undefined') return 'https://authority-studio.web.app';
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BASE_APP_URL);
      if (stored && stored.trim()) return stored.trim().replace(/\/+$/, '');
      if (window.location.origin && !window.location.origin.includes('localhost')) {
        return window.location.origin.replace(/\/+$/, '');
      }
    } catch {}
    return 'https://authority-studio.web.app';
  }

  public setBaseAppUrl(url: string) {
    if (typeof window === 'undefined') return;
    try {
      const clean = url.trim().replace(/\/+$/, '');
      localStorage.setItem(STORAGE_KEYS.BASE_APP_URL, clean);
      this.addAuditLog('DOMAIN_CONFIG', `Updated base app URL to ${clean}`);
      this.notify();
    } catch {}
  }

  // --- 1-Click WarriorPlus Delivery Link Generator ---
  public getDeliveryUrl(target: ProductTier | 'TRAFFIC_VAULT' | string): string {
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_DELIVERY_URLS);
        if (stored) {
          const map = JSON.parse(stored);
          if (map[target] && map[target].trim()) return map[target].trim();
        }
      } catch {}
    }

    const base = this.getBaseAppUrl();
    const cleanTarget = String(target).toUpperCase();

    if (cleanTarget === 'TRAFFIC_VAULT' || cleanTarget === 'TRAFFIC-VAULT' || cleanTarget === 'AUTH_TRAFFIC_VAULT_SECRET') {
      return `${base}/?access=traffic-vault`;
    }
    if (cleanTarget === 'CORE' || cleanTarget === 'FE' || cleanTarget === 'AUTH_CORE_ACCESS_SECRET') {
      return `${base}/?access=core`;
    }
    if (cleanTarget === 'EXTENDED' || cleanTarget === 'BUILDER' || cleanTarget === 'AUTH_EXT_SECRET_ACCESS') {
      return `${base}/?access=builder`;
    }
    if (cleanTarget === 'PRO' || cleanTarget === 'AUTH_PRO_SECRET_ACCESS') {
      return `${base}/?access=pro`;
    }
    if (cleanTarget === 'ULTIMATE' || cleanTarget === 'AGENCY' || cleanTarget === 'AUTH_ULT_SECRET_ACCESS') {
      return `${base}/?access=agency`;
    }
    return `${base}/?access=${cleanTarget.toLowerCase()}`;
  }

  public setDeliveryUrl(target: ProductTier | 'TRAFFIC_VAULT' | string, url: string) {
    if (typeof window === 'undefined') return;
    try {
      let map: Record<string, string> = {};
      const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_DELIVERY_URLS);
      if (stored) map = JSON.parse(stored);
      if (url.trim()) {
        map[target] = url.trim();
      } else {
        delete map[target];
      }
      localStorage.setItem(STORAGE_KEYS.CUSTOM_DELIVERY_URLS, JSON.stringify(map));
      this.addAuditLog('DELIVERY_CONFIG', `Updated custom delivery URL for ${target} to ${url.trim()}`);
      this.notify();
    } catch {}
  }

  public setSalesUrl(tier: ProductTier | string, url: string) {
    if (typeof window === 'undefined') return;
    try {
      let map: Record<string, string> = {};
      const stored = localStorage.getItem(STORAGE_KEYS.CUSTOM_SALES_URLS);
      if (stored) map = JSON.parse(stored);
      if (url.trim()) {
        map[tier] = url.trim();
      } else {
        delete map[tier];
      }
      localStorage.setItem(STORAGE_KEYS.CUSTOM_SALES_URLS, JSON.stringify(map));
      this.notify();
    } catch {}
  }

  // --- Frictionless Authentication Engine ("Login-as-Registration") ---
  public getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  public loginOrRegister(username: string, password?: string): { success: boolean; user: AuthUser; isNewUser: boolean; error?: string } {
    const cleanUsername = username.trim().toLowerCase();
    if (!cleanUsername) return { success: false, user: this.currentUser!, isNewUser: false, error: 'Please enter a username.' };

    // Block generic admin or root logins completely
    if (cleanUsername === 'admin' || cleanUsername === 'root') {
      return { success: false, user: this.currentUser!, isNewUser: false, error: 'Invalid username or password.' };
    }

    // Master Admin Protection: edward5036 requires exact password '81039@'
    if (cleanUsername === 'edward5036') {
      if (password !== '81039@') {
        return { success: false, user: this.currentUser!, isNewUser: false, error: 'Incorrect credentials for administrator.' };
      }
    }

    let usersDb: Record<string, AuthUser> = {};
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USERS_DB);
      if (stored) usersDb = JSON.parse(stored);
    } catch {}

    let user = usersDb[cleanUsername];
    let isNewUser = false;

    if (!user) {
      // Auto-register new user
      isNewUser = true;
      user = {
        id: `usr-${Date.now()}`,
        username: cleanUsername,
        tier: cleanUsername === 'edward5036' ? 'ULTIMATE' : 'CORE',
        unlockedTiers: cleanUsername === 'edward5036'
          ? ['CORE', 'EXTENDED', 'PRO', 'ULTIMATE', 'CLOUD', 'LOCAL', 'EVENT']
          : ['CORE'],
        hasNicheVaultBump: true,
        hasBrandKitBump: cleanUsername === 'edward5036',
        hasSalesKitBump: cleanUsername === 'edward5036',
        createdAt: new Date().toISOString()
      };
      usersDb[cleanUsername] = user;
    } else if (cleanUsername === 'edward5036') {
      // Ensure master admin has all suites unlocked
      user.tier = 'ULTIMATE';
      user.unlockedTiers = ['CORE', 'EXTENDED', 'PRO', 'ULTIMATE', 'CLOUD', 'LOCAL', 'EVENT'];
      user.hasBrandKitBump = true;
      user.hasSalesKitBump = true;
    }

    // Automatically apply any queued deliveries from WarriorPlus ?delivery=...
    const pending = this.clearPendingDeliveries();
    if (pending.length > 0) {
      pending.forEach(t => {
        if (!user.unlockedTiers.includes(t)) {
          user.unlockedTiers.push(t);
        }
      });
      const ladder: ProductTier[] = ['CORE', 'EXTENDED', 'PRO', 'ULTIMATE'];
      let highestTier = user.tier;
      user.unlockedTiers.forEach(t => {
        if (ladder.indexOf(t) > ladder.indexOf(highestTier)) {
          highestTier = t;
        }
      });
      user.tier = highestTier;
    }

    usersDb[cleanUsername] = user;
    localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(usersDb));

    this.currentUser = user;
    this.currentPlan = user.tier;
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.PLAN, user.tier);

    this.addAuditLog('AUTH_LOGIN', `User "${cleanUsername}" logged in (${isNewUser ? 'New Account Registered' : 'Existing Account'})`);
    this.notify();

    return { success: true, user, isNewUser };
  }

  public logout() {
    this.currentUser = null;
    localStorage.removeItem(STORAGE_KEYS.USER);
    this.notify();
  }

  // --- Plan & Upgrade Management ---
  public getPlan(): ProductTier {
    return this.currentPlan;
  }

  public setPlan(tier: ProductTier) {
    this.currentPlan = tier;
    if (this.currentUser) {
      this.currentUser.tier = tier;
      if (!this.currentUser.unlockedTiers.includes(tier)) {
        this.currentUser.unlockedTiers.push(tier);
      }
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(this.currentUser));
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.USERS_DB);
        if (stored) {
          const db = JSON.parse(stored);
          if (db[this.currentUser.username]) {
            db[this.currentUser.username] = this.currentUser;
            localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(db));
          }
        }
      } catch {}
    }
    localStorage.setItem(STORAGE_KEYS.PLAN, tier);
    this.addAuditLog('PLAN_SWITCH', `Switched active plan tier to ${tier}`);
    this.notify();
  }

  public hasAccessToTier(tier: ProductTier): boolean {
    if (!this.currentUser) return tier === 'CORE';
    if (this.currentUser.unlockedTiers.includes(tier)) return true;

    // Hierarchy fallback
    const hierarchy: ProductTier[] = ['CORE', 'EXTENDED', 'PRO', 'ULTIMATE'];
    const currentIdx = hierarchy.indexOf(this.currentPlan);
    const targetIdx = hierarchy.indexOf(tier);
    return currentIdx >= targetIdx && targetIdx !== -1;
  }

  public getNextUpgradeTier(): ProductTier | null {
    const ladder: ProductTier[] = ['CORE', 'EXTENDED', 'PRO', 'ULTIMATE'];
    const idx = ladder.indexOf(this.currentPlan);
    if (idx === -1 || idx >= ladder.length - 1) return null;
    return ladder[idx + 1];
  }

  // --- 1-Click Product Delivery Redemption (via URL link or token) ---
  public unlockBySecretKey(keyOrCode: string): { success: boolean; tier?: ProductTier | string; message: string } {
    if (!keyOrCode) return { success: false, message: 'Missing access key.' };
    const raw = keyOrCode.trim();
    const clean = raw.toLowerCase().replace(/[^a-z0-9_-]/g, '');

    // Check FE Order Bump ($14.05): 24-Hour Fast-Traffic & Brand Sponsorship Vault
    if (
      clean === 'traffic-vault' || 
      clean === 'traffic_vault' || 
      clean === 'trafficvault' || 
      clean === 'vault' || 
      clean === 'auth_traffic_vault_secret' || 
      clean.includes('traffic')
    ) {
      this.unlockBump('traffic_vault');
      return {
        success: true,
        tier: 'TRAFFIC_VAULT',
        message: 'Congratulations! 24-Hour Fast-Traffic & Brand Sponsorship Vault ($14.05 FE Bump) has been permanently unlocked.'
      };
    }

    // Direct mapping for clean access tokens (e.g. ?access=core, ?access=builder, ?access=pro, ?access=agency)
    const codeMap: Record<string, ProductTier> = {
      'core': 'CORE',
      'fe': 'CORE',
      'auth_core_access_secret': 'CORE',
      'builder': 'EXTENDED',
      'extended': 'EXTENDED',
      'auth_ext_secret_access': 'EXTENDED',
      'pro': 'PRO',
      'auth_pro_secret_access': 'PRO',
      'agency': 'ULTIMATE',
      'ultimate': 'ULTIMATE',
      'auth_ult_secret_access': 'ULTIMATE',
      'cloud': 'CLOUD',
      'auth_cloud_secret_access': 'CLOUD',
      'local': 'LOCAL',
      'auth_local_secret_access': 'LOCAL',
      'event': 'EVENT',
      'auth_event_secret_access': 'EVENT'
    };

    if (codeMap[clean]) {
      const targetTier = codeMap[clean];
      if (this.currentUser) {
        this.unlockTierForUser(targetTier);
      } else {
        this.queueDeliveryTier(targetTier);
      }
      return {
        success: true,
        tier: targetTier,
        message: `Congratulations! ${PRODUCT_CONFIGS[targetTier]?.name || targetTier} has been verified and permanently activated.`
      };
    }

    for (const [tier, config] of Object.entries(PRODUCT_CONFIGS)) {
      if (config.secretDeliveryKey === raw || config.secretDeliveryKey.toLowerCase() === clean) {
        const prodTier = tier as ProductTier;
        if (this.currentUser) {
          this.unlockTierForUser(prodTier);
        } else {
          this.queueDeliveryTier(prodTier);
        }
        return {
          success: true,
          tier: prodTier,
          message: `Congratulations! ${config.name} has been verified and permanently unlocked.`
        };
      }
    }
    return { success: false, message: 'Invalid or expired delivery link.' };
  }

  public unlockTierForUser(tier: ProductTier) {
    if (this.currentUser) {
      if (!this.currentUser.unlockedTiers.includes(tier)) {
        this.currentUser.unlockedTiers.push(tier);
      }
      this.currentUser.tier = tier;
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(this.currentUser));
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.USERS_DB);
        if (stored) {
          const db = JSON.parse(stored);
          if (db[this.currentUser.username]) {
            db[this.currentUser.username] = this.currentUser;
            localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(db));
          }
        }
      } catch {}
    } else {
      this.queueDeliveryTier(tier);
    }
    this.currentPlan = tier;
    localStorage.setItem(STORAGE_KEYS.PLAN, tier);
    this.addAuditLog('TIER_UNLOCKED', `Unlocked ${PRODUCT_CONFIGS[tier]?.name || tier}`);
    this.notify();
  }

  // --- Admin-Only Testing & Switcher Controls ---
  public adminUnlockAllTiers() {
    const allTiers: ProductTier[] = ['CORE', 'EXTENDED', 'PRO', 'ULTIMATE', 'CLOUD', 'LOCAL', 'EVENT'];
    if (this.currentUser) {
      this.currentUser.unlockedTiers = allTiers;
      this.currentUser.tier = 'ULTIMATE';
      this.currentUser.hasTrafficVaultBump = true;
      this.currentUser.hasNicheVaultBump = true;
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(this.currentUser));
    }
    this.currentPlan = 'ULTIMATE';
    localStorage.setItem(STORAGE_KEYS.PLAN, 'ULTIMATE');
    this.addAuditLog('ADMIN_UNLOCK_ALL', 'Admin unlocked all product tiers & traffic vault bump for active account');
    this.notify();
  }

  public adminResetToCore() {
    if (this.currentUser) {
      this.currentUser.unlockedTiers = ['CORE'];
      this.currentUser.tier = 'CORE';
      this.currentUser.hasTrafficVaultBump = false;
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(this.currentUser));
    }
    this.currentPlan = 'CORE';
    localStorage.setItem(STORAGE_KEYS.PLAN, 'CORE');
    this.addAuditLog('ADMIN_RESET_CORE', 'Admin reset account to Core edition only');
    this.notify();
  }

  public unlockBump(bump: 'niche_vault' | 'traffic_vault' | 'brand_kit' | 'sales_kit') {
    if (this.currentUser) {
      if (bump === 'niche_vault') this.currentUser.hasNicheVaultBump = true;
      if (bump === 'traffic_vault') this.currentUser.hasTrafficVaultBump = true;
      if (bump === 'brand_kit') this.currentUser.hasBrandKitBump = true;
      if (bump === 'sales_kit') this.currentUser.hasSalesKitBump = true;
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(this.currentUser));
      try {
        const stored = localStorage.getItem(STORAGE_KEYS.USERS_DB);
        if (stored) {
          const db = JSON.parse(stored);
          if (db[this.currentUser.username]) {
            db[this.currentUser.username] = this.currentUser;
            localStorage.setItem(STORAGE_KEYS.USERS_DB, JSON.stringify(db));
          }
        }
      } catch {}
      this.addAuditLog('BUMP_UNLOCKED', `Unlocked bump: ${bump}`);
      this.notify();
    }
  }

  public hasTrafficVaultBump(): boolean {
    return !!this.currentUser?.hasTrafficVaultBump;
  }

  // --- Niche Selection & Onboarding ---
  public getHasChosenInitialNiche(): boolean {
    return this.hasChosenInitialNiche;
  }

  public setHasChosenInitialNiche(val: boolean) {
    this.hasChosenInitialNiche = val;
    localStorage.setItem(STORAGE_KEYS.HAS_CHOSEN_NICHE, String(val));
    this.notify();
  }

  public activateInitialNiche(nicheId: string, businessName: string, businessModel: BusinessModelType = 'affiliate_authority') {
    const ws = createWorkspaceFromNiche(nicheId, businessName, businessModel);
    ws.status = 'preview';
    this.workspaces = [ws, ...this.workspaces.filter(w => w.nichePackageId !== nicheId)];
    this.activeWorkspaceId = ws.id;
    this.hasChosenInitialNiche = true;
    localStorage.setItem('auth_studio_user_generated', 'true');
    localStorage.setItem(STORAGE_KEYS.HAS_CHOSEN_NICHE, 'true');
    this.saveWorkspaces();
    localStorage.setItem(STORAGE_KEYS.ACTIVE_WS_ID, ws.id);
    this.addAuditLog('NICHE_ACTIVATED', `Activated new authority property: "${businessName}" (${nicheId})`);
    this.notify();
    return ws;
  }

  // --- Workspaces ---
  public getWorkspaces(): BusinessWorkspace[] {
    return this.workspaces;
  }

  public getActiveWorkspace(): BusinessWorkspace | undefined {
    if (this.workspaces.length === 0) return undefined;
    return this.workspaces.find(w => w.id === this.activeWorkspaceId) || this.workspaces[0];
  }

  public resetToNoBusiness() {
    this.workspaces = [];
    this.activeWorkspaceId = '';
    this.hasChosenInitialNiche = false;
    this.subscribers = [];
    this.orders = [];
    localStorage.removeItem('auth_studio_user_generated');
    localStorage.removeItem(STORAGE_KEYS.WORKSPACES);
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_WS_ID);
    localStorage.setItem(STORAGE_KEYS.HAS_CHOSEN_NICHE, 'false');
    localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify([]));
    this.notify();
  }

  public setActiveWorkspace(id: string) {
    if (this.workspaces.some(w => w.id === id)) {
      this.activeWorkspaceId = id;
      localStorage.setItem(STORAGE_KEYS.ACTIVE_WS_ID, id);
      this.notify();
    }
  }

  public createWorkspace(name: string, nichePackageId: string, businessModel: BusinessModelType = 'hybrid_monetized'): { success: boolean; error?: string; workspace?: BusinessWorkspace } {
    const entitlement = PRODUCT_CONFIGS[this.currentPlan] || PRODUCT_CONFIGS.CORE;
    if (this.workspaces.length >= entitlement.maxWorkspaces) {
      return {
        success: false,
        error: `Your current plan (${entitlement.name}) permits a maximum of ${entitlement.maxWorkspaces} property workspaces. Upgrade to create more.`
      };
    }

    const ws = createWorkspaceFromNiche(nichePackageId, name, businessModel);
    this.workspaces.push(ws);
    this.activeWorkspaceId = ws.id;
    this.hasChosenInitialNiche = true;
    localStorage.setItem('auth_studio_user_generated', 'true');
    localStorage.setItem(STORAGE_KEYS.HAS_CHOSEN_NICHE, 'true');
    this.saveWorkspaces();
    localStorage.setItem(STORAGE_KEYS.ACTIVE_WS_ID, ws.id);
    this.addAuditLog('WORKSPACE_CREATED', `Created new authority business property: "${name}" (${nichePackageId})`);
    this.notify();
    return { success: true, workspace: ws };
  }

  public cloneWorkspace(sourceId: string, newName: string, targetNicheId?: string): { success: boolean; error?: string; workspace?: BusinessWorkspace } {
    const entitlement = PRODUCT_CONFIGS[this.currentPlan] || PRODUCT_CONFIGS.CORE;
    if (!entitlement.canCloneBusiness) {
      return {
        success: false,
        error: `Business cloning requires Authority Studio AI Extended or higher.`
      };
    }

    if (this.workspaces.length >= entitlement.maxWorkspaces) {
      return {
        success: false,
        error: `Maximum property limit (${entitlement.maxWorkspaces}) reached on ${entitlement.name}.`
      };
    }

    const source = this.workspaces.find(w => w.id === sourceId);
    if (!source) return { success: false, error: 'Source workspace not found' };

    const nicheToUse = targetNicheId || source.nichePackageId;
    const cloned = createWorkspaceFromNiche(nicheToUse, newName, source.businessModel);
    cloned.status = 'draft';

    this.workspaces.push(cloned);
    localStorage.setItem('auth_studio_user_generated', 'true');
    this.saveWorkspaces();
    this.addAuditLog('WORKSPACE_CLONED', `Cloned "${source.name}" into "${newName}" with niche "${nicheToUse}"`);
    this.notify();
    return { success: true, workspace: cloned };
  }

  public updateWorkspaceBrand(wsId: string, updates: Partial<BusinessWorkspace['brandProfile']>) {
    const ws = this.workspaces.find(w => w.id === wsId);
    if (!ws) return;
    ws.brandProfile = { ...ws.brandProfile, ...updates };
    ws.updatedAt = new Date().toISOString();
    this.saveWorkspaces();
    this.addAuditLog('BRAND_UPDATED', `Updated brand profile for "${ws.name}"`);
    this.notify();
  }

  public updateWorkspace(wsIdOrWs: string | BusinessWorkspace, maybeUpdates?: Partial<BusinessWorkspace>) {
    if (typeof wsIdOrWs === 'string') {
      const ws = this.workspaces.find(w => w.id === wsIdOrWs);
      if (!ws) return;
      if (maybeUpdates) Object.assign(ws, maybeUpdates);
      ws.updatedAt = new Date().toISOString();
    } else if (wsIdOrWs && typeof wsIdOrWs === 'object') {
      const idx = this.workspaces.findIndex(w => w.id === wsIdOrWs.id);
      if (idx !== -1) {
        this.workspaces[idx] = { ...wsIdOrWs, updatedAt: new Date().toISOString() };
      }
    }
    this.saveWorkspaces();
    this.notify();
  }

  public addCustomTool(wsId: string, tool: ToolDefinition) {
    const ws = this.workspaces.find(w => w.id === wsId);
    if (!ws) return;
    const exists = ws.tools.some(t => t.id === tool.id || t.slug === tool.slug);
    if (!exists) {
      ws.tools.unshift(tool);
    } else {
      const idx = ws.tools.findIndex(t => t.id === tool.id || t.slug === tool.slug);
      ws.tools[idx] = tool;
    }
    ws.updatedAt = new Date().toISOString();
    this.saveWorkspaces();
    this.addAuditLog('TOOL_CREATED', `Compiled new custom micro-tool: "${tool.title}"`);
    this.notify();
  }

  public updateContentAsset(wsId: string, updatedAsset: any) {
    const ws = this.workspaces.find(w => w.id === wsId);
    if (!ws) return;
    const idx = ws.contentAssets.findIndex(a => a.id === updatedAsset.id);
    if (idx !== -1) {
      ws.contentAssets[idx] = updatedAsset;
    } else {
      ws.contentAssets.push(updatedAsset);
    }
    ws.updatedAt = new Date().toISOString();
    this.saveWorkspaces();
    this.notify();
  }

  public updateContentAssetBody(wsId: string, assetId: string, newBody: string, isAiCustomized: boolean = true) {
    const ws = this.workspaces.find(w => w.id === wsId);
    if (!ws) return;
    const asset = ws.contentAssets.find(a => a.id === assetId);
    if (!asset) return;
    asset.body = newBody;
    asset.isAiCustomized = isAiCustomized;
    asset.updatedAt = new Date().toISOString().split('T')[0];
    ws.updatedAt = new Date().toISOString();
    this.saveWorkspaces();
    this.addAuditLog('CONTENT_CUSTOMIZED', `Customized asset "${asset.title}" in "${ws.name}"`);
    this.notify();
  }

  public publishWorkspace(wsId: string, customDomain?: string): { success: boolean; error?: string } {
    const entitlement = PRODUCT_CONFIGS[this.currentPlan] || PRODUCT_CONFIGS.CORE;
    if (!entitlement.canPublish) {
      return { success: false, error: 'Publishing requires Authority Studio AI Extended or higher.' };
    }

    const ws = this.workspaces.find(w => w.id === wsId);
    if (!ws) return { success: false, error: 'Workspace not found' };

    ws.isPublished = true;
    ws.status = 'published';
    if (customDomain) ws.customDomain = customDomain;
    ws.publishedUrl = customDomain ? `https://${customDomain}` : `https://${ws.brandProfile.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.authoritystudio.app`;
    ws.updatedAt = new Date().toISOString();
    this.saveWorkspaces();
    this.addAuditLog('WORKSPACE_PUBLISHED', `Published "${ws.name}" to ${ws.publishedUrl}`);
    this.notify();
    return { success: true };
  }

  public unpublishWorkspace(wsId: string) {
    const ws = this.workspaces.find(w => w.id === wsId);
    if (!ws) return;
    ws.isPublished = false;
    ws.status = 'preview';
    ws.updatedAt = new Date().toISOString();
    this.saveWorkspaces();
    this.addAuditLog('WORKSPACE_UNPUBLISHED', `Unpublished "${ws.name}"`);
    this.notify();
  }

  public addSubscriber(
    wsId: string, 
    email: string, 
    name?: string, 
    leadMagnetIdOrSource: string = 'lead-magnet-primary',
    sourceParam?: string
  ): SubscriberLead {
    const leadMagnetId = sourceParam ? leadMagnetIdOrSource : 'lead-magnet-primary';
    const source = sourceParam || (leadMagnetIdOrSource.includes('Form') || leadMagnetIdOrSource.includes('Opt-in') ? leadMagnetIdOrSource : 'Website Opt-in');

    const newSub: SubscriberLead = {
      id: `sub-${Date.now()}`,
      workspaceId: wsId,
      email,
      name,
      leadMagnetId,
      createdAt: new Date().toISOString(),
      status: 'active',
      source
    };
    this.subscribers.unshift(newSub);
    localStorage.setItem(STORAGE_KEYS.SUBSCRIBERS, JSON.stringify(this.subscribers));
    this.trackEvent(wsId, 'lead_optin', 'lead-magnet', `Captured subscriber: ${email}`);
    this.addAuditLog('SUBSCRIBER_CAPTURED', `Captured lead "${email}" for workspace`);
    this.notify();
    return newSub;
  }

  public getSubscribers(wsId?: string): SubscriberLead[] {
    if (!wsId) return this.subscribers;
    return this.subscribers.filter(s => s.workspaceId === wsId);
  }

  public addOrder(wsId: string, customerEmail: string, itemName: string, amount: number, orderBump: boolean = false): CustomerOrder {
    const newOrder: CustomerOrder = {
      id: `ord-${Date.now()}`,
      workspaceId: wsId,
      customerEmail,
      itemName,
      itemType: 'bundle',
      amount,
      orderBumpIncluded: orderBump,
      status: 'completed',
      createdAt: new Date().toISOString()
    };
    this.orders.unshift(newOrder);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(this.orders));
    this.trackEvent(wsId, 'purchase', 'checkout', `Sale: ${itemName}`, amount);
    this.addAuditLog('ORDER_COMPLETED', `Received $${amount} payment from "${customerEmail}" for "${itemName}"`);
    this.notify();
    return newOrder;
  }

  public getOrders(wsId?: string): CustomerOrder[] {
    if (!wsId) return this.orders;
    return this.orders.filter(o => o.workspaceId === wsId);
  }

  public trackEvent(workspaceId: string, type: AnalyticsEvent['type'], targetSlug: string, label: string, revenue?: number) {
    const ev: AnalyticsEvent = {
      id: `ev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      workspaceId,
      type,
      targetSlug,
      label,
      timestamp: new Date().toISOString(),
      revenue
    };
    this.analytics.unshift(ev);
    if (this.analytics.length > 500) this.analytics = this.analytics.slice(0, 500);
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(this.analytics));
    this.notify();
  }

  public getAnalytics(wsId?: string): AnalyticsEvent[] {
    if (!wsId) return this.analytics;
    return this.analytics.filter(a => a.workspaceId === wsId);
  }

  public getClientWorkspaces(): ClientWorkspace[] {
    return this.clientWorkspaces;
  }

  public addClientWorkspace(clientName: string, clientEmail: string, companyName: string, workspaceId: string) {
    const client: ClientWorkspace = {
      id: `cl-${Date.now()}`,
      clientName,
      clientEmail,
      companyName,
      workspaceId,
      status: 'reviewing',
      canEditCopy: true,
      whiteLabelMode: true,
      createdAt: new Date().toISOString()
    };
    this.clientWorkspaces.unshift(client);
    localStorage.setItem(STORAGE_KEYS.CLIENT_WORKSPACES, JSON.stringify(this.clientWorkspaces));
    this.addAuditLog('CLIENT_INVITED', `Invited client "${clientName}" (${companyName}) for delivery`);
    this.notify();
    return client;
  }

  public getAuditLogs(wsId?: string): AuditLog[] {
    if (!wsId) return this.auditLogs;
    return this.auditLogs.filter(l => l.workspaceId === wsId);
  }

  private addAuditLog(action: string, details: string) {
    const log: AuditLog = {
      id: `log-${Date.now()}`,
      workspaceId: this.activeWorkspaceId,
      action,
      actor: this.currentUser ? this.currentUser.username : 'User',
      details,
      timestamp: new Date().toISOString()
    };
    this.auditLogs.unshift(log);
    if (this.auditLogs.length > 200) this.auditLogs = this.auditLogs.slice(0, 200);
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(this.auditLogs));
  }

  private saveWorkspaces() {
    localStorage.setItem(STORAGE_KEYS.WORKSPACES, JSON.stringify(this.workspaces));
  }

  public resetAllToDefault() {
    localStorage.clear();
    this.currentUser = {
      id: 'usr-default',
      username: 'edwardmugambi60@gmail.com',
      tier: 'CORE',
      unlockedTiers: ['CORE'],
      hasNicheVaultBump: true,
      hasBrandKitBump: false,
      hasSalesKitBump: false,
      createdAt: new Date().toISOString()
    };
    this.currentPlan = 'CORE';
    this.hasChosenInitialNiche = false;
    const initial = createWorkspaceFromNiche('home-improvement', 'Craft & Foundation Studio', 'hybrid_monetized');
    this.workspaces = [initial];
    this.activeWorkspaceId = initial.id;
    this.subscribers = [];
    this.orders = [];
    this.analytics = [];
    this.clientWorkspaces = [];
    this.auditLogs = [];
    this.notify();
  }
}

export const store = new AuthorityStore();
