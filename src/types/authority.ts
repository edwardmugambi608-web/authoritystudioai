export type ProductTier = 
  | 'CORE'        // Authority Studio AI ($4.95 Front-End Tripwire)
  | 'EXTENDED'    // Authority Studio AI Extended ($47)
  | 'PRO'         // Authority Studio AI Pro ($67)
  | 'ULTIMATE'    // Authority Studio AI Ultimate ($97)
  | 'CLOUD'       // Authority Cloud ($297/yr)
  | 'LOCAL'       // Local Authority Studio ($247)
  | 'EVENT'       // Local Event Studio ($247)
  // Legacy aliases for backward compatibility:
  | 'FE' 
  | 'OTO_1' 
  | 'OTO_2' 
  | 'OTO_3';

export type PlanTier = ProductTier;

export interface AuthUser {
  id: string;
  username: string;
  tier: ProductTier;
  unlockedTiers: ProductTier[];
  hasNicheVaultBump?: boolean;
  hasTrafficVaultBump?: boolean; // $14.05 FE Order Bump
  hasBrandKitBump?: boolean;
  hasSalesKitBump?: boolean;
  createdAt: string;
}

export interface PlanEntitlement {
  tier: ProductTier;
  name: string;
  tagline: string;
  price: string;
  checkoutUrl: string;
  secretDeliveryKey: string;
  nextTier?: ProductTier;
  maxWorkspaces: number;
  availableNiches: number;
  canPublish: boolean;
  canConnectDomain: boolean;
  canCaptureLeads: boolean;
  canSellPaidTools: boolean;
  canCloneBusiness: boolean;
  canManagePortfolio: boolean;
  canClientDeliver: boolean;
  whiteLabelExport: boolean;
  clientWorkspaces: boolean;
  teamPermissions: boolean;
}

export type BusinessStatus = 'draft' | 'preview' | 'published' | 'archived';

export interface AudienceProfile {
  targetPersona: string;
  corePainPoints: string[];
  primaryDesires: string[];
  objections: string[];
  toneAndVoice: string;
}

export interface BrandProfile {
  name: string;
  tagline: string;
  mission: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontHeading: string;
  fontBody: string;
  logoText: string;
}

export type BusinessModelType = 
  | 'affiliate_authority' 
  | 'digital_product_hub' 
  | 'lead_generation_agency' 
  | 'hybrid_monetized'
  | 'micro_tool_saas'
  | 'directory_reviews'
  | 'digital_product_vault';

export interface OfferLink {
  id: string;
  name: string;
  type: 'affiliate' | 'own_digital_product' | 'consulting' | 'sponsor';
  url: string;
  payoutNote: string;
  badge: string;
  description: string;
  isPaidAccess?: boolean;
  price?: number;
}

export interface MonetizationMap {
  primaryModel: BusinessModelType;
  offers: OfferLink[];
  affiliateDisclosures: string;
  primaryCtaHeadline: string;
  primaryCtaSubheadline: string;
}

export type ContentType = 'article' | 'review' | 'comparison' | 'faq' | 'guide' | 'resource';
export type AssetStatus = 'blueprint' | 'draft' | 'approved' | 'published';

export interface ContentAsset {
  id: string;
  blueprintId: string;
  nicheId: string;
  type: ContentType;
  title: string;
  slug: string;
  category: string;
  readingTimeMinutes: number;
  excerpt: string;
  body: string;
  status: AssetStatus;
  targetKeyword: string;
  metaDescription: string;
  relatedToolId?: string;
  ctaOfferId?: string;
  disclaimer?: string;
  updatedAt: string;
  isAiCustomized?: boolean;
}

export type ToolType = 
  | 'calculator' 
  | 'estimator' 
  | 'planner' 
  | 'checklist' 
  | 'scorecard' 
  | 'quiz' 
  | 'generator' 
  | 'decision_wizard';

export interface ToolInputConfig {
  id: string;
  label: string;
  type: 'number' | 'select' | 'radio' | 'slider' | 'checkbox';
  defaultValue: any;
  min?: number;
  max?: number;
  step?: number;
  unit?: string;
  options?: { label: string; value: any; description?: string }[];
  helperText?: string;
}

export interface ToolDefinition {
  id: string;
  nicheId: string;
  slug: string;
  title: string;
  type: ToolType;
  summary: string;
  inputs: ToolInputConfig[];
  resultMetrics: {
    key: string;
    label: string;
    format: 'currency' | 'number' | 'percentage' | 'text' | 'score' | 'grade';
    highlight?: boolean;
  }[];
  ctaHeadline: string;
  ctaSubheadline: string;
  ctaButtonText: string;
  ctaOfferId?: string;
  disclaimer: string;
  visibility: 'public' | 'private' | 'paid';
  price?: number;
  status: 'draft' | 'approved' | 'published';
  logicVersion: string;
}

export interface LeadMagnet {
  id: string;
  nicheId: string;
  title: string;
  format: 'PDF Checklist' | 'Action Playbook' | 'Executive Toolkit' | 'Interactive Spreadsheet';
  hook: string;
  deliverableSummary: string;
  bulletPoints: string[];
  ctaText: string;
  downloadUrl: string;
  contentBody: string;
}

export interface EmailMessage {
  day: number;
  subject: string;
  previewText: string;
  purpose: string;
  bodyText: string;
  ctaText: string;
  ctaUrl: string;
}

export interface EmailSequence {
  id: string;
  nicheId: string;
  name: string;
  emails: EmailMessage[];
}

export interface PromotionAsset {
  id: string;
  nicheId: string;
  channel: 'LinkedIn' | 'Twitter/X' | 'Newsletter' | 'Instagram/Pinterest' | 'Pinterest/Instagram';
  title: string;
  hook: string;
  body: string;
  callToAction: string;
  tags: string[];
}

export interface BusinessPage {
  id: string;
  slug: string;
  title: string;
  pageType: 'home' | 'tools' | 'content' | 'lead_magnet' | 'reviews' | 'about' | 'privacy';
  blocks: PageBlock[];
}

export interface PageBlock {
  id: string;
  type: 
    | 'navigation' 
    | 'hero' 
    | 'feature_tool_grid' 
    | 'article_list' 
    | 'review_card' 
    | 'comparison_table' 
    | 'cta' 
    | 'lead_form' 
    | 'newsletter_form' 
    | 'download_card' 
    | 'faq' 
    | 'footer';
  title?: string;
  subtitle?: string;
  data: Record<string, any>;
}

export interface NichePackage {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description?: string;
  category: string;
  marketOverview: string;
  monetizationAngles: string[];
  audienceDefaults: AudienceProfile;
  brandDefaults: BrandProfile;
  monetizationDefaults: MonetizationMap;
  contentBlueprints: ContentAsset[];
  toolBlueprints: ToolDefinition[];
  leadMagnet: LeadMagnet;
  emailSequence: EmailSequence;
  promotionBlueprints: PromotionAsset[];
}

export interface BusinessWorkspace {
  id: string;
  organizationId: string;
  name: string;
  nichePackageId: string;
  businessModel: BusinessModelType;
  status: BusinessStatus;
  brandProfile: BrandProfile;
  audienceProfile: AudienceProfile;
  monetizationMap: MonetizationMap;
  contentAssets: ContentAsset[];
  tools: ToolDefinition[];
  leadMagnet: LeadMagnet;
  emailSequence: EmailSequence;
  promotionAssets: PromotionAsset[];
  customDomain?: string;
  isPublished: boolean;
  publishedUrl?: string;
  createdAt: string;
  updatedAt: string;
  clientWorkspaceId?: string;
}

export interface SubscriberLead {
  id: string;
  workspaceId: string;
  email: string;
  name?: string;
  leadMagnetId: string;
  createdAt: string;
  status: 'active' | 'unsubscribed';
  source: string;
}

export interface CustomerOrder {
  id: string;
  workspaceId: string;
  customerEmail: string;
  itemName: string;
  itemType: 'tool' | 'download' | 'bundle';
  amount: number;
  orderBumpIncluded: boolean;
  status: 'completed' | 'refunded';
  createdAt: string;
}

export interface AnalyticsEvent {
  id: string;
  workspaceId: string;
  type: 'page_view' | 'tool_calc' | 'lead_optin' | 'affiliate_click' | 'purchase';
  targetSlug: string;
  label: string;
  timestamp: string;
  revenue?: number;
}

export interface ClientWorkspace {
  id: string;
  clientName: string;
  clientEmail: string;
  companyName: string;
  workspaceId: string;
  status: 'invited' | 'active' | 'reviewing' | 'approved';
  canEditCopy: boolean;
  whiteLabelMode: boolean;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  workspaceId: string;
  action: string;
  actor: string;
  details: string;
  timestamp: string;
}

export interface BrandDnaProfile {
  manifesto: string;
  positioningStatement: string;
  targetAvatar: string;
  coreFears: string[];
  coreDesires: string[];
  objectionsToCounter: string[];
  voiceRules: string[];
}

export interface ClientProposalDoc {
  id: string;
  clientName: string;
  targetDomain: string;
  metroArea: string;
  auditScore: number;
  auditFindings: string[];
  projectedBounceDrop: string;
  setupFee: number;
  monthlyRetainer: number;
  sowClauses: string[];
  deliverables: string[];
  generatedAt: string;
}

export interface SeoHealthReport {
  assetId: string;
  title: string;
  freshnessScore: number;
  staleItems: string[];
  newKeywords: string[];
  refreshedBody?: string;
  lastAudited: string;
}

