import type { LocalizedText, ProductId, PublicationStatus, SectorId } from './types.ts';

/** Route keys are locale-independent; hrefs are built as `/${locale}${path}`. */
export type RouteKey =
  | 'home'
  | 'products'
  | 'sectors'
  | 'about'
  | 'contact'
  | 'help'
  | 'help-support'
  | 'help-feature-request'
  | 'help-report-issue'
  | 'careers'
  | 'privacy'
  | `product:${ProductId}`
  | `sector:${SectorId}`;

export type RouteDefinition = {
  path: string;
  status: PublicationStatus;
  /** Requirement or decision governing the route. */
  ref: string;
  notes?: string;
};

export const staticRoutes: Record<Exclude<RouteKey, `product:${string}` | `sector:${string}`>, RouteDefinition> = {
  home: { path: '', status: 'in-review', ref: 'FR-01' },
  products: { path: '/products', status: 'in-review', ref: 'FR-02' },
  sectors: { path: '/sectors', status: 'in-review', ref: 'FR-03' },
  about: { path: '/about', status: 'in-review', ref: 'FR-01' },
  contact: { path: '/contact', status: 'in-review', ref: 'FR-04, A-02' },
  help: { path: '/help', status: 'in-review', ref: 'FR-05', notes: 'Submission conditional on Q09/Q27.' },
  'help-support': { path: '/help/support', status: 'in-review', ref: 'FR-05' },
  'help-feature-request': { path: '/help/feature-request', status: 'in-review', ref: 'FR-05' },
  'help-report-issue': { path: '/help/report-issue', status: 'in-review', ref: 'FR-05' },
  careers: { path: '/careers', status: 'draft', ref: 'FR-06', notes: 'No vacancies or confirmed general-application route (Q29).' },
  privacy: { path: '/privacy', status: 'draft', ref: 'FR-10', notes: 'Launch blocker until approved privacy text exists (Q31).' },
};

export const productPath = (slug: string) => `/products/${slug}`;
export const sectorPath = (slug: string) => `/sectors/${slug}`;

/** Primary action on every page (decision A-02). */
export const primaryCta = {
  label: { ar: 'اتصل بنا' } satisfies LocalizedText,
  route: 'contact' as const,
};

export const secondaryCta = {
  label: { ar: 'استكشف المنتجات' } satisfies LocalizedText,
  route: 'products' as const,
};

/** Header items. Product and sector children are generated from publishable content. */
export const headerNav: { label: LocalizedText; route: RouteKey; children?: 'products' | 'sectors' }[] = [
  { label: { ar: 'المنتجات' }, route: 'products', children: 'products' },
  { label: { ar: 'القطاعات' }, route: 'sectors', children: 'sectors' },
  { label: { ar: 'المساعدة' }, route: 'help' },
];

export const footerNav: { title: LocalizedText; items: { label: LocalizedText; route: RouteKey }[] | 'products' | 'sectors' }[] = [
  { title: { ar: 'المنتجات' }, items: 'products' },
  { title: { ar: 'القطاعات' }, items: 'sectors' },
  {
    title: { ar: 'الشركة' },
    items: [
      { label: { ar: 'من نحن' }, route: 'about' },
      { label: { ar: 'اتصل بنا' }, route: 'contact' },
      { label: { ar: 'التوظيف' }, route: 'careers' },
      { label: { ar: 'سياسة الخصوصية' }, route: 'privacy' },
    ],
  },
  {
    title: { ar: 'المساعدة' },
    items: [
      { label: { ar: 'الدعم الفني' }, route: 'help-support' },
      { label: { ar: 'طلب إضافة ميزة' }, route: 'help-feature-request' },
      { label: { ar: 'الإبلاغ عن مشكلة' }, route: 'help-report-issue' },
    ],
  },
];

export const navLabels = {
  skipToContent: { ar: 'انتقل إلى المحتوى الرئيسي' } satisfies LocalizedText,
  mainNav: { ar: 'القائمة الرئيسية' } satisfies LocalizedText,
  footerNav: { ar: 'روابط الموقع' } satisfies LocalizedText,
  openMenu: { ar: 'فتح القائمة' } satisfies LocalizedText,
  closeMenu: { ar: 'إغلاق القائمة' } satisfies LocalizedText,
  allProducts: { ar: 'جميع المنتجات' } satisfies LocalizedText,
  allSectors: { ar: 'جميع القطاعات' } satisfies LocalizedText,
  home: { ar: 'الصفحة الرئيسية' } satisfies LocalizedText,
  /** Rendered with the current year by the component. */
  copyright: { ar: 'أميسكوم. جميع الحقوق محفوظة.' } satisfies LocalizedText,
};
