import type { SectorContent } from "../types";

export const insurance: SectorContent = {
  id: "insurance",
  slug: "insurance",
  publication: {
    status: "draft",
    includeInNavigation: true,
    includeInSitemap: false,
    includeInPreview: true,
  },
  name: { ar: "التأمين" },
  summary: {
    ar: "تنظيم وثائق التأمين وملفات المطالبات ومسارات المراجعة، مع تمييز ذلك عن نظام إدارة وثائق أو مطالبات متكامل.",
  },
  productIds: ["archive", "workflow", "frona-oprisk"],
  useCases: [
    {
      id: "policy-docs",
      kind: "proposed-example",
      claimIds: ["C02", "C15"],
      title: { ar: "وثائق التأمين والملفات" },
      body: {
        ar: "أرشفة وثائق التأمين والعقود والملاحق والتقارير المرتبطة بالمطالبات عبر AMESCOM ARCHIVE.",
      },
    },
    {
      id: "claim-handoffs",
      kind: "proposed-example",
      claimIds: ["C03", "C15"],
      title: { ar: "تسليم المراجعة والاعتماد" },
      body: {
        ar: "تنظيم مسار الملف بين الاستلام والمراجعة والاعتماد عبر AMESCOM Workflow. هذا ليس نظام اكتتاب أو تسوية مطالبات متكاملاً.",
      },
    },
    {
      id: "operational-risk",
      kind: "proposed-example",
      claimIds: ["C05", "C15"],
      title: { ar: "المخاطر التشغيلية" },
      body: {
        ar: "متابعة المخاطر التشغيلية والضوابط في بيئة التأمين عبر FRONA.",
      },
    },
  ],
  caveats: {
    ar: [
      "أميسكوم لا تقدّم هنا منصة إدارة وثائق تأمين أو معالجة مطالبات كاملة.",
      "أمثلة الاستخدام مقترحة حتى تتوفر حالات عملاء قابلة للنشر.",
    ],
  },
};
