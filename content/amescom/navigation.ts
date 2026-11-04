import type { Localized, NavItem } from "./types";

export const primaryCta = {
  href: "/ar/contact",
  label: { ar: "اتصل بنا" } satisfies Localized<string>,
};

export const secondaryCta = {
  href: "/ar/products",
  label: { ar: "استكشف المنتجات" } satisfies Localized<string>,
};

const previewOnly = {
  status: "draft" as const,
  includeInNavigation: true,
  includeInSitemap: false,
  includeInPreview: true,
};

const utilityDraft = {
  status: "draft" as const,
  includeInNavigation: true,
  includeInSitemap: false,
  includeInPreview: true,
};

export const headerNav: NavItem[] = [
  {
    id: "products",
    href: "/ar/products",
    label: { ar: "المنتجات" },
    publication: previewOnly,
    children: [
      {
        id: "archive",
        href: "/ar/products/archive",
        label: { ar: "AMESCOM ARCHIVE" },
        publication: previewOnly,
      },
      {
        id: "workflow",
        href: "/ar/products/workflow",
        label: { ar: "AMESCOM Workflow" },
        publication: previewOnly,
      },
      {
        id: "clinical-pro",
        href: "/ar/products/clinical-pro",
        label: { ar: "AMESCOM Clinical PRO" },
        publication: previewOnly,
      },
      {
        id: "frona-oprisk",
        href: "/ar/products/frona-oprisk",
        label: { ar: "FRONA" },
        publication: previewOnly,
      },
    ],
  },
  {
    id: "sectors",
    href: "/ar/sectors",
    label: { ar: "القطاعات" },
    publication: previewOnly,
    children: [
      {
        id: "banking-finance",
        href: "/ar/sectors/banking-finance",
        label: { ar: "المصارف والشركات المالية" },
        publication: previewOnly,
      },
      {
        id: "insurance",
        href: "/ar/sectors/insurance",
        label: { ar: "التأمين" },
        publication: previewOnly,
      },
      {
        id: "healthcare",
        href: "/ar/sectors/healthcare",
        label: { ar: "المراكز الطبية والعيادات" },
        publication: previewOnly,
      },
      {
        id: "industry",
        href: "/ar/sectors/industry",
        label: { ar: "المؤسسات الصناعية" },
        publication: previewOnly,
      },
    ],
  },
  {
    id: "help",
    href: "/ar/help",
    label: { ar: "المساعدة" },
    publication: utilityDraft,
  },
];

export const footerNav: NavItem[] = [
  {
    id: "about",
    href: "/ar/about",
    label: { ar: "من نحن" },
    publication: previewOnly,
  },
  {
    id: "contact",
    href: "/ar/contact",
    label: { ar: "اتصل بنا" },
    publication: {
      status: "draft",
      includeInNavigation: true,
      includeInSitemap: false,
      includeInPreview: true,
    },
  },
  {
    id: "careers",
    href: "/ar/careers",
    label: { ar: "التوظيف" },
    publication: utilityDraft,
  },
  {
    id: "privacy",
    href: "/ar/privacy",
    label: { ar: "سياسة الخصوصية" },
    publication: {
      status: "held",
      includeInNavigation: false,
      includeInSitemap: false,
      includeInPreview: true,
    },
  },
];

export const skipLinkLabel: Localized<string> = { ar: "تخطّي إلى المحتوى" };
