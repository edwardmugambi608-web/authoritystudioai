export interface AffiliateCheatSheetItem {
  id: string;
  network: string;
  category: string;
  averagePayout: string;
  cookieDuration: string;
  directApprovalUrl: string;
  affiliateManagerContact: string;
  guaranteedApprovalScript: string;
  keyProducts: string[];
}

export interface KeywordMatrixItem {
  id: string;
  keyword: string;
  searchIntent: 'High Commercial' | 'Transactional' | 'Informational' | 'Decision Sizing';
  monthlyVolume: string;
  avgCpc: string;
  difficultyScore: number;
  mappedDecisionEngine: string;
  mappedArticle: string;
}

export interface BrandKitAsset {
  brandName: string;
  tagline: string;
  mission: string;
  typography: {
    headingFont: string;
    bodyFont: string;
    monoFont: string;
    scale: { level: string; size: string; weight: string; usage: string }[];
  };
  colorTokens: {
    name: string;
    hex: string;
    tailwindClass: string;
    role: string;
  }[];
  logoVariations: {
    variant: string;
    description: string;
    dimensions: string;
    format: string;
  }[];
  socialBannerDimensions: {
    platform: string;
    dimensions: string;
    headlineCopy: string;
    ctaPlacement: string;
  }[];
}

export interface EditorialCharter {
  title: string;
  version: string;
  statutoryPledge: string;
  corePillars: {
    pillar: string;
    rule: string;
    auditMethod: string;
  }[];
  testingMethodology: string;
  independenceDeclaration: string;
}

export interface LegalComplianceDoc {
  id: string;
  title: string;
  regulatoryJurisdiction: string;
  lastUpdated: string;
  body: string;
}

// 1. High-Ticket Affiliate Partner Application Cheat Sheet
export const AFFILIATE_CHEAT_SHEET: AffiliateCheatSheetItem[] = [
  {
    id: 'aff-net-1',
    network: 'ShareASale / Awin Enterprise',
    category: 'Home Fixtures, Tools & Building Materials',
    averagePayout: '8% - 15% per sale ($120 - $480 avg commission)',
    cookieDuration: '90 Days',
    directApprovalUrl: 'https://shareasale.com/merchants/preferred-partner',
    affiliateManagerContact: 'partnerships-approvals@shareasale.com',
    guaranteedApprovalScript: 'We operate an authoritative niche digital property dedicated to residential capital improvement and cost planning. We feature interactive decision engines and verified trade benchmark guides with over 15,000 monthly high-intent readers actively sourcing materials and licensed trade contractors. We are integrating your merchants into our direct estimate calculation breakdown screens.',
    keyProducts: ['Commercial Cabinetry & Millwork', 'Tankless Water Heaters & HVAC Units', 'Heavy-Duty Trade Power Equipment']
  },
  {
    id: 'aff-net-2',
    network: 'ClickBank Premier Marketplace',
    category: 'Digital Toolkits, Software & Trade Certifications',
    averagePayout: '50% - 75% recurring ($47 - $197/sale)',
    cookieDuration: '60 Days',
    directApprovalUrl: 'https://clickbank.com/affiliate-portal',
    affiliateManagerContact: 'affiliates@clickbank.com',
    guaranteedApprovalScript: 'We publish comprehensive quantitative decision workbenches and editorial review matrices. Our audience consists of high-intent professionals and property owners looking for verified software solutions and digital execution blueprints. We utilize zero-spam, content-first syndication.',
    keyProducts: ['Contractor Project Estimation OS', 'Energy Compliance & Audit Toolkits', 'Property Valuation Master Spreadsheets']
  },
  {
    id: 'aff-net-3',
    network: 'Impact Radius B2B Marketplace',
    category: 'Enterprise SaaS, Smart Hardware & IoT Diagnostics',
    averagePayout: '$150 - $450 flat bounty per qualified account',
    cookieDuration: '30 Days',
    directApprovalUrl: 'https://impact.com/creator-network',
    affiliateManagerContact: 'publisher-growth@impact.com',
    guaranteedApprovalScript: 'We run specialized B2B decision engines that calculate operational efficiency, token cost optimization, and material supply chain variance. We feature vetted enterprise partners beneath our simulation results and in our weekly executive welcome sequences.',
    keyProducts: ['Jobsite Telemetry & Moisture Sensors', 'Enterprise CRM & Invoicing Suites', 'Drone Survey & 3D Mapping Software']
  },
  {
    id: 'aff-net-4',
    network: 'Amazon Associates Enterprise Hub',
    category: 'Physical Diagnostic Hardware, Safety Gear & Tools',
    averagePayout: '3% - 6% ($15 - $85 per cart checkout)',
    cookieDuration: '24 Hours (90 Days with Cart Add)',
    directApprovalUrl: 'https://affiliate-program.amazon.com',
    affiliateManagerContact: 'associates-support@amazon.com',
    guaranteedApprovalScript: 'Our authority property publishes 40 evidence-based guides and 8 client-side decision engines. We embed verified product recommendations as itemized bill-of-materials tool loadouts so readers can purchase exact calibration gauges and safety equipment.',
    keyProducts: ['Laser Distance Measure Gauges', 'Thermal Imaging Diagnostic Cameras', 'OSHA-Certified Trade Safety Gear']
  },
  {
    id: 'aff-net-5',
    network: 'CJ Affiliate (Commission Junction)',
    category: 'National Retailers, Direct Lending & Insurance',
    averagePayout: '$50 - $225 per approved quote / policy inquiry',
    cookieDuration: '45 Days',
    directApprovalUrl: 'https://cj.com/join',
    affiliateManagerContact: 'publisher-support@cj.com',
    guaranteedApprovalScript: 'We provide consumers and trade professionals with unbiased scenario simulators that compare financing, insurance coverage, and warranty structures. Your financial products align directly with our audience decision points.',
    keyProducts: ['Residential HELOC & Remodeling Loans', 'Contractor General Liability Insurance', 'Home Warranty Protection Policies']
  }
];

// 2. High-Intent Search Keyword & CPC Matrix (Sample of Top High-Yield Clusters)
export const KEYWORD_MATRIX: KeywordMatrixItem[] = [
  {
    id: 'kw-1',
    keyword: 'remodeling cost estimator per square foot',
    searchIntent: 'Decision Sizing',
    monthlyVolume: '27,100',
    avgCpc: '$6.85',
    difficultyScore: 34,
    mappedDecisionEngine: 'Core Project & Material Cost Estimator',
    mappedArticle: 'The Definitive Cost & Materials Framework'
  },
  {
    id: 'kw-2',
    keyword: 'kitchen renovation labor vs material breakdown',
    searchIntent: 'High Commercial',
    monthlyVolume: '14,800',
    avgCpc: '$8.20',
    difficultyScore: 28,
    mappedDecisionEngine: 'Material Waste & Surcharge Planner',
    mappedArticle: 'Alternative Materials That Cut 30% of Overhead'
  },
  {
    id: 'kw-3',
    keyword: 'contractor bid comparison spreadsheet',
    searchIntent: 'Transactional',
    monthlyVolume: '9,400',
    avgCpc: '$5.40',
    difficultyScore: 22,
    mappedDecisionEngine: 'Contractor Bid Comparison & Variance Analyzer',
    mappedArticle: 'Subcontractor Scopes of Work & Bid Comparison Template'
  },
  {
    id: 'kw-4',
    keyword: 'how to audit contractor estimate for hidden fees',
    searchIntent: 'Informational',
    monthlyVolume: '18,200',
    avgCpc: '$7.10',
    difficultyScore: 31,
    mappedDecisionEngine: 'Comprehensive Readiness & Quality Scorecard',
    mappedArticle: 'Top 7 Costly Mistakes Most Beginners Make'
  },
  {
    id: 'kw-5',
    keyword: 'home improvement 5 year depreciation reserve',
    searchIntent: 'High Commercial',
    monthlyVolume: '6,900',
    avgCpc: '$9.45',
    difficultyScore: 25,
    mappedDecisionEngine: 'Depreciation & Sinking Fund Forecaster',
    mappedArticle: 'How to Forecast 5-Year Replacement & Depreciation Cycles'
  },
  {
    id: 'kw-6',
    keyword: 'energy efficiency payback period calculator',
    searchIntent: 'Decision Sizing',
    monthlyVolume: '12,500',
    avgCpc: '$4.90',
    difficultyScore: 29,
    mappedDecisionEngine: 'Energy & Operational Efficiency Calculator',
    mappedArticle: 'Energy Efficiency & Lifetime Utility Savings'
  },
  {
    id: 'kw-7',
    keyword: 'structural load sizing standards 2026',
    searchIntent: 'Informational',
    monthlyVolume: '8,100',
    avgCpc: '$6.30',
    difficultyScore: 36,
    mappedDecisionEngine: 'Capacity & Sizing Load Wizard',
    mappedArticle: 'Subfloor Load Sizing & Deflection Rating Index'
  },
  {
    id: 'kw-8',
    keyword: 'remodeling roi appraisal equity return',
    searchIntent: 'High Commercial',
    monthlyVolume: '16,700',
    avgCpc: '$8.90',
    difficultyScore: 33,
    mappedDecisionEngine: 'ROI & Payback Period Calculator',
    mappedArticle: 'Resale Value & Appraisal Equity Impact Analysis'
  }
];

// 3. Complete Brand Identity Kit & Design System Specification
export const BRAND_IDENTITY_KIT: BrandKitAsset = {
  brandName: 'Authority Studio AI',
  tagline: 'Pick a Niche. Own an Authority Business.',
  mission: 'Empower digital entrepreneurs and agencies to operate verified, high-trust authority properties equipped with proprietary decision engines and turnkey editorial assets.',
  typography: {
    headingFont: 'Plus Jakarta Sans (Sans-Serif Geometric)',
    bodyFont: 'Inter (Neutral Screen-Optimized UI)',
    monoFont: 'JetBrains Mono (Technical Benchmarks & Calculations)',
    scale: [
      { level: 'Display Hero', size: '36px - 48px', weight: '900 Extra-Black', usage: 'Homepage Hero & Major Valuation Banners' },
      { level: 'Section Title', size: '20px - 24px', weight: '800 Bold', usage: 'Decision Engine Headers & Feature Clusters' },
      { level: 'Card Header', size: '14px - 16px', weight: '700 Semi-Bold', usage: 'Interactive Option Cards & Article Cards' },
      { level: 'Body Copy', size: '12px - 14px', weight: '400 - 500 Regular', usage: 'Editorial Paragraphs & Descriptions' },
      { level: 'Metric Output', size: '18px - 28px', weight: '900 Black Mono', usage: 'Calculation Figures, Dollar Totals & Percentages' }
    ]
  },
  colorTokens: [
    { name: 'Slate Deep Base', hex: '#0f172a', tailwindClass: 'bg-slate-900', role: 'Primary structural containers, dark cards & footers' },
    { name: 'Pure White Canvas', hex: '#ffffff', tailwindClass: 'bg-white', role: 'Card surfaces, input backgrounds & content readers' },
    { name: 'Precision Indigo Blue', hex: '#2563eb', tailwindClass: 'bg-blue-600', role: 'Primary interaction buttons, links & focus borders' },
    { name: 'Verified Emerald Accent', hex: '#059669', tailwindClass: 'text-emerald-600', role: 'Calculation outputs, positive metrics & pass badges' },
    { name: 'Amber Trust Accent', hex: '#d97706', tailwindClass: 'bg-amber-500', role: 'Sponsorship flags, rate cards & founder callouts' }
  ],
  logoVariations: [
    { variant: 'Primary Gradient Badge + Wordmark', description: 'Deep indigo-to-blue gradient square with bold "AS" monogram paired with crisp Plus Jakarta Sans typography.', dimensions: '400x100 px', format: 'SVG / Vector' },
    { variant: 'Monochrome White Reversed', description: 'High-contrast white monogram on transparent background for dark footers and video overlays.', dimensions: '400x100 px', format: 'PNG (Alpha)' },
    { variant: 'Square App Icon / Favicon', description: 'Optimized 32x32, 64x64, 192x192, and 512x512 PWA-ready app launcher icons.', dimensions: '512x512 px', format: 'ICO & SVG' }
  ],
  socialBannerDimensions: [
    { platform: 'Twitter / X OpenGraph Card', dimensions: '1200 x 630 px', headlineCopy: 'Verify Before You Build: 8 Proprietary Decision Engines', ctaPlacement: 'Bottom Right High-Contrast Pill' },
    { platform: 'LinkedIn Company Banner', dimensions: '1584 x 396 px', headlineCopy: 'Institutional Trade Benchmarks & Decision Simulators', ctaPlacement: 'Center Right Diagnostic Preview' },
    { platform: 'Facebook Community Banner', dimensions: '1640 x 924 px', headlineCopy: 'Free Remodeling & Trade Cost Decision Engines', ctaPlacement: 'Center Left Action Button' }
  ]
};

// 4. 1-Page Editorial Standards & Consumer Trust Charter
export const EDITORIAL_CHARTER: EditorialCharter = {
  title: 'Official Editorial Standards, Consumer Protection & Mathematical Transparency Charter',
  version: '2026.4 Master Protocol',
  statutoryPledge: 'We affirm that all estimates, calculations, formulas, and editorial guides published on this property are engineered solely for objectivity, consumer financial protection, and empirical trade transparency.',
  corePillars: [
    {
      pillar: 'Deterministic Mathematical Verification',
      rule: 'No formula may rely on arbitrary randomizers or subjective black-box algorithms. Every output must execute in transparent client-side JavaScript verifiable against published trade unit rates.',
      auditMethod: 'Continuous automated regression tests verifying zero NaN outputs across 40 diagnostic tools.'
    },
    {
      pillar: 'Commercial & Affiliate Independence',
      rule: 'Advertiser sponsorships and affiliate relationships have zero editorial influence on benchmark calculation models. A sponsor can never alter the output numbers.',
      auditMethod: 'Public separation of editorial logic from affiliate click tracking handlers.'
    },
    {
      pillar: 'Consumer Bias Elimination',
      rule: 'Estimates must explicitly display regional variance bands and 10-15% contingency buffers to prevent contractor underbidding and unexpected change orders.',
      auditMethod: 'Mandatory display of materials subtotal, labor subtotal, and contingency reserves.'
    },
    {
      pillar: 'Citation & Regulatory Grounding',
      rule: 'Technical recommendations must reference national building codes, engineering load tables, or recognized academic exercise physiology literature.',
      auditMethod: 'Contextual citation anchors embedded in each of the 40 editorial blueprints.'
    }
  ],
  testingMethodology: 'Every decision engine undergoes synthetic stress-testing across minimum, median, and extreme input values before deployment.',
  independenceDeclaration: 'This property operates as an independent authority publication. When readers purchase through our vetted links, we may receive compensation at zero extra cost to the buyer.'
};

// 5. Complete Turnkey Legal & Compliance Suite
export const LEGAL_COMPLIANCE_SUITE: LegalComplianceDoc[] = [
  {
    id: 'legal-ftc',
    title: 'Statutory FTC Affiliate & Sponsor Disclosure Notice',
    regulatoryJurisdiction: 'United States FTC Guidelines (16 CFR Part 255)',
    lastUpdated: 'November 2026',
    body: `Pursuant to the Federal Trade Commission's Guides Concerning the Use of Endorsements and Testimonials in Advertising, please be advised that links on this website may be affiliate links. 

If you click through and make a purchase, we may receive an affiliate commission from the merchant at absolutely NO additional cost to you. 

Our editorial evaluations, mathematical decision engines, and comparison matrices are conducted with strict objectivity. We only endorse products, tools, and services that pass our rigorous empirical benchmark standards. Exclusive tool title sponsors do not have the ability to alter mathematical calculation formulas or trade unit rates.`
  },
  {
    id: 'legal-privacy',
    title: 'Privacy Policy & Data Sovereign Handling Protocol',
    regulatoryJurisdiction: 'GDPR / CCPA / CalOPPA Compliant',
    lastUpdated: 'November 2026',
    body: `We respect your privacy and data autonomy. All interactive calculations executed on our decision engines are processed entirely client-side inside your browser session. 

We do not transmit your private sizing parameters, financial estimates, or property dimensions to third-party data brokers.

When you opt in for our free Done-For-You Playbook or newsletter broadcasts, your email is securely encrypted and used exclusively to deliver the requested authority content and weekly educational updates. You may permanently unsubscribe at any time with a single click using the link provided in every message.`
  },
  {
    id: 'legal-terms',
    title: 'Terms of Service & Non-Professional Advisory Disclaimer',
    regulatoryJurisdiction: 'Universal Commercial Digital Asset Agreement',
    lastUpdated: 'November 2026',
    body: `All decision engines, simulators, and guides provided on this property are for informational, planning, and educational purposes only. 

They do not constitute formal architectural, legal, medical, or registered financial fiduciary counsel. Because building codes, regional trade labor rates, and physical property conditions vary by jurisdiction, users must consult a licensed local professional before signing contracts or breaking ground.

By utilizing this site, you agree that the operators shall not be held liable for discrepancies between planning estimates and final contractor quotes.`
  }
];

export const AFFILIATE_CHEAT_SHEET_DATA = AFFILIATE_CHEAT_SHEET;
export const KEYWORD_MATRIX_DATA = KEYWORD_MATRIX;
export const EDITORIAL_CHARTER_DATA = EDITORIAL_CHARTER;
export const LEGAL_SUITE_DATA = LEGAL_COMPLIANCE_SUITE;
export const LEGAL_SUITE = LEGAL_COMPLIANCE_SUITE;
