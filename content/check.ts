/**
 * Content integrity check. Run: `node content/check.ts`
 * Fails on untraceable or excluded claims, cross-product claim leakage,
 * disallowed wording, missing translations and broken references.
 */
import { claimsById } from './claims.ts';
import { company } from './company.ts';
import { forms, fieldErrors, fieldHints, fieldLabels, formText, helpTypeLabels } from './forms.ts';
import { enabledLocales, text } from './locales.ts';
import { mediaById } from './media.ts';
import { pageMetadata, productMetadata, sectorMetadata, siteMetadata } from './metadata.ts';
import { footerNav, headerNav, navLabels, primaryCta, secondaryCta } from './navigation.ts';
import { aboutPage, careersPage, contactPage, helpPage, home, productsPage, sectorsPage } from './pages.ts';
import { products, productsById } from './products.ts';
import { sectors } from './sectors.ts';
import type { ProductId } from './types.ts';

const errors: string[] = [];
const fail = (message: string) => errors.push(message);

// Visitor-facing content trees (claims and media notes are private and excluded).
const visitorContent: Record<string, unknown> = {
  company,
  products,
  sectors,
  home,
  productsPage,
  sectorsPage,
  aboutPage,
  contactPage,
  helpPage,
  careersPage,
  headerNav,
  footerNav,
  navLabels,
  primaryCta,
  secondaryCta,
  fieldLabels,
  fieldHints,
  fieldErrors,
  formText,
  helpTypeLabels,
  forms,
  siteMetadata,
  pageMetadata,
  productMetadata,
  sectorMetadata,
};

// Wording that must never reach visitors (claims C06–C09, C14, C16–C18, source placeholders).
const disallowed: [RegExp, string][] = [
  [/ISO/i, 'certification/alignment claim (C06)'],
  [/AES|TLS|RBAC|ABAC/, 'security specification (C06)'],
  [/غير قابلة للتعديل|تمنع تعديل/, 'immutable logs (C06)'],
  [/أجزاء من الثانية|ملايين|فائق السرعة|في ثوانٍ|في ثوان/, 'speed/volume claim (C07)'],
  [/80|٨٠/, '80% claim (C08)'],
  [/دون تدخل بشري|الرقعة|النسخ والخطوط/, 'advanced OCR / automatic extraction (C09)'],
  [/القضاء على الأخطاء|يضمن تنفيذ/, 'error elimination (C17)'],
  [/بازل|Basel/i, 'Basel mapping (C15)'],
  [/شريك|partner/i, 'partner status (C10)'],
  [/\[|\]|مثلاً:|أدخل التاريخ/, 'source template placeholder'],
  [/Medicare|Payer/i, 'billing/insurance imagery text'],
  [/TBD|coming soon|قريباً/i, 'unfinished-content marker'],
  // Non-Amescom brand found in S5 (decision A-01); encoded to avoid reproducing it.
  [new RegExp(atob('aWNlYmVyZw=='), 'i'), 'non-Amescom branding (A-01)'],
];

const fronaOwnedPaths = [/^products\[3\]/, /^productMetadata\.frona-oprisk/, /^sectors\[\d+\]\.useCases\[\d+\]/];

function walk(node: unknown, path: string, visit: (value: string, path: string) => void) {
  if (Array.isArray(node)) {
    node.forEach((item, index) => walk(item, `${path}[${index}]`, visit));
  } else if (node && typeof node === 'object') {
    const record = node as Record<string, unknown>;
    if (typeof record.ar === 'string') {
      for (const locale of enabledLocales) {
        try {
          text(record as { ar: string }, locale);
        } catch (error) {
          fail(`${path}: ${(error as Error).message}`);
        }
      }
      visit(record.ar, path);
      if (typeof record.en === 'string') visit(record.en, `${path}.en`);
      return;
    }
    for (const [key, value] of Object.entries(record)) walk(value, path ? `${path}.${key}` : key, visit);
  }
}

for (const [root, tree] of Object.entries(visitorContent)) {
  walk(tree, root, (value, path) => {
    for (const [pattern, reason] of disallowed) {
      if (pattern.test(value)) fail(`${path}: disallowed wording — ${reason}: "${value.slice(0, 60)}"`);
    }
    if (/FRONA/.test(value) && !fronaOwnedPaths.some((owned) => owned.test(path))) {
      fail(`${path}: FRONA mentioned outside FRONA-gated content`);
    }
  });
}

// Claim traceability and scoping.
function checkClaims(ids: string[], where: string, allowedProducts: ProductId[] | 'company', ownerStatus?: string) {
  if (ids.length === 0) fail(`${where}: no claim reference`);
  for (const id of ids) {
    const claim = claimsById.get(id);
    if (!claim) {
      fail(`${where}: unknown claim ${id}`);
      continue;
    }
    if (claim.approval === 'excluded') fail(`${where}: references excluded claim ${id}`);
    if (claim.approval === 'held' && ownerStatus !== 'held') fail(`${where}: held claim ${id} in non-held content`);
    if (claim.scope !== 'company') {
      const allowed = allowedProducts === 'company' ? [] : allowedProducts;
      if (!claim.scope.some((productId) => allowed.includes(productId))) {
        fail(`${where}: claim ${id} (${claim.scope.join(',')}) is not scoped to ${allowed.join(',') || 'company'}`);
      }
    }
  }
}

for (const product of products) {
  const where = `product ${product.id}`;
  checkClaims(product.audience.claimIds, `${where} audience`, [product.id], product.status);
  for (const group of product.featureGroups) checkClaims(group.claimIds, `${where} ${group.id}`, [product.id], product.status);
  product.benefits?.forEach((b, i) => checkClaims(b.claimIds, `${where} benefit ${i}`, [product.id], product.status));
  product.gettingStarted?.forEach((s, i) => checkClaims(s.claimIds, `${where} step ${i}`, [product.id], product.status));
  for (const mediaId of product.mediaIds) {
    const item = mediaById.get(mediaId);
    if (!item) fail(`${where}: unknown media ${mediaId}`);
    else if (item.status === 'excluded') fail(`${where}: references excluded media ${mediaId}`);
  }
  for (const sectorId of product.sectorIds) {
    const sector = sectors.find((s) => s.id === sectorId);
    if (!sector) fail(`${where}: unknown sector ${sectorId}`);
    else if (!sector.productIds.includes(product.id)) fail(`${where}: sector ${sectorId} does not list this product`);
  }
}

for (const sector of sectors) {
  for (const productId of sector.productIds) {
    const product = productsById.get(productId);
    if (!product) fail(`sector ${sector.id}: unknown product ${productId}`);
    else if (!product.sectorIds.includes(sector.id)) fail(`sector ${sector.id}: product ${productId} does not list this sector`);
  }
  for (const useCase of sector.useCases) {
    const where = `sector ${sector.id} use case ${useCase.id}`;
    const held = useCase.productIds.every((id) => productsById.get(id)?.status === 'held');
    checkClaims(useCase.claimIds, where, useCase.productIds, held ? 'held' : sector.status);
    for (const productId of useCase.productIds) {
      if (!sector.productIds.includes(productId)) fail(`${where}: product ${productId} not mapped to sector`);
    }
  }
  if (!sector.useCases.some((u) => u.productIds.some((id) => productsById.get(id)?.status !== 'held'))) {
    fail(`sector ${sector.id}: no use case remains once held products are hidden`);
  }
}

for (const item of company.strengths.items) checkClaims(item.claimIds, `strength ${item.id}`, 'company');
checkClaims(company.about.openingClaimIds, 'about opening', 'company');
checkClaims(company.about.experienceClaimIds, 'about experience', 'company');
checkClaims(company.services.claimIds, 'services', 'company');
checkClaims(home.engagement.claimIds, 'home engagement', 'company');
for (const [key, meta] of Object.entries(pageMetadata)) {
  if (meta.claimIds) checkClaims(meta.claimIds, `metadata ${key}`, 'company');
}

// Owner decisions.
const frona = productsById.get('frona-oprisk');
if (frona?.status !== 'held') fail('FRONA must stay held until availability is confirmed (A-04)');
if (new Set(products.map((p) => p.slug)).size !== products.length) fail('duplicate product slugs');
if (new Set(sectors.map((s) => s.slug)).size !== sectors.length) fail('duplicate sector slugs');
for (const [formId, form] of Object.entries(forms)) {
  if (form.attachments) fail(`form ${formId}: attachments enabled before FR-07 controls exist`);
}
if (forms.careers.fields.some((f) => (f.id as string) === 'dateOfBirth')) fail('careers: date of birth not permitted (P-10)');

if (errors.length > 0) {
  console.error(`Content check failed (${errors.length}):\n- ${errors.join('\n- ')}`);
  throw new Error('content check failed');
}
console.log(
  `Content check passed: ${products.length} products, ${sectors.length} sectors, ${claimsById.size} claims, ${mediaById.size} media items.`,
);
