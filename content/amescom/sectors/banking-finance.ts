import type { SectorContent } from "../types";

export const bankingFinance: SectorContent = {
  id: "banking-finance",
  slug: "banking-finance",
  publication: {
    status: "draft",
    includeInNavigation: true,
    includeInSitemap: false,
    includeInPreview: true,
  },
  name: { ar: "المصارف والشركات المالية" },
  summary: {
    ar: "استرجاع الوثائق ووضوح الموافقات بما يدعم التحضير للتدقيق — دون الادعاء بموافقة جهة رقابية.",
  },
  productIds: ["archive", "workflow", "frona-oprisk"],
  useCases: [
    {
      id: "document-retrieval",
      kind: "proposed-example",
      claimIds: ["C02", "C15"],
      title: { ar: "الوثائق والعقود" },
      body: {
        ar: "تنظيم العقود والمراسلات والمستندات التشغيلية والبحث فيها عبر AMESCOM ARCHIVE.",
      },
    },
    {
      id: "approvals",
      kind: "proposed-example",
      claimIds: ["C03", "C15"],
      title: { ar: "مسارات الاعتماد" },
      body: {
        ar: "تمرير المراجعات والاعتمادات بين الأقسام عبر AMESCOM Workflow مع تتبع المسؤول عن كل خطوة.",
      },
    },
    {
      id: "risk-visibility",
      kind: "proposed-example",
      claimIds: ["C05", "C15"],
      title: { ar: "المخاطر والضوابط" },
      body: {
        ar: "توثيق المخاطر التشغيلية وربطها بالضوابط والتقارير الإدارية عبر FRONA.",
      },
    },
  ],
  caveats: {
    ar: [
      "هذه أمثلة تطبيق مقترحة، وليست دراسات عملاء منشورة.",
      "لا ندّعي موافقة جهة رقابية أو ضمان الامتثال التنظيمي.",
    ],
  },
};
