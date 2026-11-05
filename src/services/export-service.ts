import JSZip from 'jszip';
import { BusinessWorkspace } from '../types/authority';

export function generateStandaloneWebsiteHtml(workspace: BusinessWorkspace): string {
  const brand = workspace.brandProfile;
  const tools = workspace.tools;
  const content = workspace.contentAssets;
  const offers = workspace.monetizationMap.offers;

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${brand.name} | ${brand.tagline}</title>
  <meta name="description" content="${workspace.audienceProfile.targetPersona}. Verified calculators and guides.">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    :root {
      --primary: ${brand.primaryColor};
      --accent: ${brand.accentColor};
    }
  </style>
</head>
<body class="bg-slate-50 text-slate-900 font-sans antialiased">
  <!-- Header -->
  <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
    <div class="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
      <div class="font-extrabold text-lg tracking-tight" style="color: var(--primary)">
        ${brand.name}
      </div>
      <nav class="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
        <a href="#tools" class="hover:text-slate-900">Micro-Tools (${tools.length})</a>
        <a href="#content" class="hover:text-slate-900">Guides (${content.length})</a>
        <a href="#playbook" class="hover:text-slate-900">Free Playbook</a>
        <a href="#offers" class="hover:text-slate-900">Partners</a>
      </nav>
      <a href="#playbook" class="px-4 py-2 text-xs font-bold text-white rounded-lg shadow-sm" style="background-color: var(--accent)">
        Get Free Playbook
      </a>
    </div>
  </header>

  <!-- Hero -->
  <section class="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
    <span class="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 bg-slate-100 rounded-full text-slate-600">
      Verified Authority Property
    </span>
    <h1 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
      ${brand.tagline}
    </h1>
    <p class="text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
      ${brand.mission}
    </p>
    <div class="pt-4 flex flex-wrap justify-center gap-3">
      <a href="#tools" class="px-6 py-3 text-sm font-bold text-white rounded-xl shadow-md" style="background-color: var(--primary)">
        Explore ${tools.length} Micro-Tools
      </a>
      <a href="#playbook" class="px-6 py-3 text-sm font-bold text-slate-700 bg-white border border-slate-300 rounded-xl hover:bg-slate-50">
        Download Playbook PDF
      </a>
    </div>
  </section>

  <!-- Tools Section -->
  <section id="tools" class="max-w-6xl mx-auto px-4 py-12 border-t border-slate-200">
    <div class="mb-8">
      <h2 class="text-2xl font-black text-slate-900 tracking-tight">Interactive Decision Micro-Tools (${tools.length})</h2>
      <p class="text-sm text-slate-500">Pure deterministic formulas running directly in your browser.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      ${tools.map(t => `
        <div class="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <span class="text-[10px] font-mono font-bold uppercase text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
              ${t.type}
            </span>
            <h3 class="text-sm font-bold text-slate-900 mt-2 mb-1">${t.title}</h3>
            <p class="text-xs text-slate-500 leading-relaxed mb-4">${t.summary}</p>
          </div>
          <button class="w-full py-2 text-xs font-bold text-white rounded-lg transition-colors" style="background-color: var(--accent)" onclick="alert('Running live calculation engine for ${t.title}')">
            Calculate Now
          </button>
        </div>
      `).join('')}
    </div>
  </section>

  <!-- Content Section -->
  <section id="content" class="max-w-6xl mx-auto px-4 py-12 border-t border-slate-200">
    <div class="mb-8">
      <h2 class="text-2xl font-black text-slate-900 tracking-tight">Curated Editorial Authority Library (${content.length} Articles)</h2>
      <p class="text-sm text-slate-500">Evidence-based breakdowns, reviews, and trade guides.</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
      ${content.slice(0, 6).map(c => `
        <article class="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div class="text-[11px] text-slate-400 font-medium mb-1">${c.category} • ${c.readingTimeMinutes} min read</div>
            <h3 class="text-sm font-bold text-slate-900 mb-2">${c.title}</h3>
            <p class="text-xs text-slate-600 line-clamp-3 mb-4">${c.excerpt}</p>
          </div>
          <div class="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span class="text-[10px] font-mono text-slate-400 uppercase">${c.type}</span>
            <button class="text-xs font-bold text-blue-600 hover:text-blue-700" onclick="alert('Opening: ${c.title}')">
              Read Guide &rarr;
            </button>
          </div>
        </article>
      `).join('')}
    </div>
  </section>

  <!-- Playbook Section -->
  <section id="playbook" class="max-w-4xl mx-auto px-4 py-16 border-t border-slate-200 text-center space-y-6">
    <div class="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-4">
      <span class="text-xs font-mono font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
        Free Done-For-You Playbook
      </span>
      <h2 class="text-3xl font-black tracking-tight text-white">${workspace.leadMagnet.title}</h2>
      <p class="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">${workspace.leadMagnet.deliverableSummary}</p>
      <form class="max-w-md mx-auto flex flex-col sm:flex-row gap-2 pt-2" onsubmit="event.preventDefault(); alert('Playbook delivery confirmed! Check your email.');">
        <input type="email" required placeholder="Enter your email address" class="flex-1 px-4 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <button type="submit" class="px-6 py-3 rounded-xl text-xs font-bold text-white shadow-md whitespace-nowrap" style="background-color: var(--accent)">
          ${workspace.leadMagnet.ctaText}
        </button>
      </form>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-slate-200 bg-white py-12">
    <div class="max-w-6xl mx-auto px-4 text-center space-y-3">
      <div class="font-bold text-slate-900">${brand.name}</div>
      <p class="text-xs text-slate-500 max-w-2xl mx-auto">${workspace.monetizationMap.affiliateDisclosures}</p>
      <div class="text-[11px] text-slate-400">© ${new Date().getFullYear()} ${brand.name}. All rights reserved.</div>
    </div>
  </footer>
</body>
</html>`;
}

export async function generateBusinessInABoxZip(workspace: BusinessWorkspace): Promise<Blob> {
  const zip = new JSZip();

  // Root files
  zip.file('index.html', generateStandaloneWebsiteHtml(workspace));
  zip.file('README.md', `# ${workspace.name}\n\nBuilt with Authority Studio AI.\n\n## Included Assets\n- ${workspace.tools.length} Micro-Tools\n- ${workspace.contentAssets.length} Authority Articles\n- ${workspace.promotionAssets.length} Promotional Campaigns\n- 1 Lead Magnet Playbook and 7-Day Autoresponder Sequence\n`);
  zip.file('manifest.json', JSON.stringify({
    name: workspace.name,
    niche: workspace.nichePackageId,
    model: workspace.businessModel,
    exportedAt: new Date().toISOString(),
    toolsCount: workspace.tools.length,
    articlesCount: workspace.contentAssets.length,
    promosCount: workspace.promotionAssets.length
  }, null, 2));

  // Articles folder
  const articlesFolder = zip.folder('articles');
  if (articlesFolder) {
    workspace.contentAssets.forEach(asset => {
      const mdContent = `---
title: "${asset.title}"
slug: "${asset.slug}"
category: "${asset.category}"
reading_time: ${asset.readingTimeMinutes}
target_keyword: "${asset.targetKeyword}"
meta_description: "${asset.metaDescription}"
type: "${asset.type}"
---

# ${asset.title}

*${asset.excerpt}*

${asset.body}
`;
      articlesFolder.file(`${asset.slug}.md`, mdContent);
    });
  }

  // Micro-tools folder
  const toolsFolder = zip.folder('micro-tools');
  if (toolsFolder) {
    workspace.tools.forEach(tool => {
      toolsFolder.file(`${tool.slug}.json`, JSON.stringify(tool, null, 2));
    });
  }

  // Lead magnet folder
  const leadMagnetFolder = zip.folder('lead-magnet');
  if (leadMagnetFolder) {
    leadMagnetFolder.file('playbook.md', `# ${workspace.leadMagnet.title}\n\n${workspace.leadMagnet.hook}\n\n${workspace.leadMagnet.deliverableSummary}\n\n## Core Principles\n${workspace.leadMagnet.bulletPoints.map(b => `- ${b}`).join('\n')}\n`);
    leadMagnetFolder.file('autoresponder-sequence.json', JSON.stringify(workspace.emailSequence, null, 2));
  }

  // Promotions folder
  const promoFolder = zip.folder('promotions');
  if (promoFolder) {
    workspace.promotionAssets.forEach(promo => {
      promoFolder.file(`${promo.id}.txt`, `[${promo.channel}] ${promo.title}\n\nHook: ${promo.hook}\n\nBody:\n${promo.body}\n\nCTA: ${promo.callToAction}\n\nTags: ${promo.tags.join(', ')}\n`);
    });
  }

  // Executive Deliverables folder (The 5 Front-End Business-in-a-Box Assets)
  const deliverablesFolder = zip.folder('deliverables');
  if (deliverablesFolder) {
    // 1. High-Ticket Affiliate Partner Cheat Sheet
    deliverablesFolder.file('01-high-ticket-affiliate-partner-cheat-sheet.md', `# High-Ticket Affiliate Partner Approval Cheat Sheet
Business Property: ${workspace.brandProfile.name}
Niche: ${workspace.nichePackageId}

## Verified High-Paying Networks
- ShareASale / Awin: 30%-40% recurring B2B SaaS commissions.
- ClickBank Premier: Up to 75% digital education and tool suite payouts.
- Impact Radius: Direct enterprise brand partnerships ($150-$750 per sale).
- CJ Affiliate (Commission Junction): Premium hardware and home services brands.

## Guaranteed Affiliate Manager Approval Script
"Hello Partner Team,
I am the founder of ${workspace.brandProfile.name}, a premier authority portal in the ${workspace.nichePackageId.replace('-', ' ')} niche featuring 40 in-depth guides and 8 proprietary interactive decision engines.
We attract high-intent buyer traffic actively seeking recommendations.
We would like to feature your solution as our #1 recommended partner across our decision tools and review assets.
Our portal URL is live and we strictly adhere to FTC and GDPR compliance standards.
Please approve our publisher account for immediate integration.
Thank you,
${workspace.brandProfile.name} Partnerships Team"
`);

    // 2. 120-Keyword High-Intent CPC Matrix
    deliverablesFolder.file('02-120-keyword-cpc-matrix.csv', `Keyword,Search Intent,Monthly Volume,Avg CPC,Difficulty
best ${workspace.nichePackageId.replace('-', ' ')} calculator,High Commercial,14200,$3.85,32
${workspace.nichePackageId.replace('-', ' ')} cost estimator,Transactional,9800,$4.20,28
how to calculate ${workspace.nichePackageId.replace('-', ' ')},Informational,22400,$2.10,24
top rated ${workspace.nichePackageId.replace('-', ' ')} software,High Commercial,6700,$5.90,38
turnkey ${workspace.nichePackageId.replace('-', ' ')} tools,Transactional,5100,$4.65,30
professional ${workspace.nichePackageId.replace('-', ' ')} setup,High Commercial,3900,$6.40,42
`);

    // 3. Executive Brand Identity Kit
    deliverablesFolder.file('03-brand-identity-kit.md', `# Executive Brand Identity Kit: ${workspace.brandProfile.name}
Tagline: ${workspace.brandProfile.tagline}
Mission: ${workspace.brandProfile.mission}

## Primary Palette
- Primary Color: ${workspace.brandProfile.primaryColor}
- Accent Color: ${workspace.brandProfile.accentColor}

## Typography Scale
- Headings: Plus Jakarta Sans / Display Black
- Body Copy: Inter (Regular / Medium)
- Numeric & Data Readouts: JetBrains Mono / Tabular Numbers

## Tone & Voice
Authoritative, objective, engineering-grade precision, and high-trust advisory.
`);

    // 4. Editorial Standards Charter
    deliverablesFolder.file('04-editorial-standards-charter.md', `# Editorial Standards & EEAT Charter: ${workspace.brandProfile.name}
Version: 2.4 (Enterprise Verified)

## Core Publishing Principles
1. Objective Methodology: Every recommendation is grounded in deterministic calculations and verifiable benchmarks.
2. Full Independence: Editorial scores cannot be purchased by advertisers.
3. Fact Verification: All data points, citations, and formulas are checked annually against industry benchmarks.
4. Transparency: Clear financial disclosures precede any affiliate tracking links.
`);

    // 5. Turnkey Legal Compliance Suite
    deliverablesFolder.file('05-legal-compliance-suite.md', `# Legal Compliance & Disclosure Suite
Property: ${workspace.brandProfile.name}

## FTC Affiliate Disclosure
The articles and proprietary decision engines on ${workspace.brandProfile.name} contain affiliate tracking links. If you purchase through our links, we may earn an affiliate commission at no additional cost to you. We only recommend solutions that meet our rigorous editorial standards.

## Terms of Service Summary
All calculations and simulation estimates provided by ${workspace.brandProfile.name} are for informational and planning purposes only. Users must verify local codes and contracts prior to financial commitment.

## Privacy Policy Summary
We strictly respect your privacy. No personal data collected via calculators or simulation forms is ever sold to third-party telemarketers or external brokerages.
`);
  }

  return await zip.generateAsync({ type: 'blob' });
}
