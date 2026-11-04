import type { SectorContent } from "../types";

export const industry: SectorContent = {
  id: "industry",
  slug: "industry",
  publication: {
    status: "draft",
    includeInNavigation: true,
    includeInSitemap: false,
    includeInPreview: true,
  },
  name: { ar: "المؤسسات الصناعية" },
  summary: {
    ar: "تنظيم عقود التوريد وأوامر الشراء وسجلات الجودة والصيانة ومسارات الاعتماد — دون نظام تصنيع أو تخطيط موارد كامل.",
  },
  productIds: ["archive", "workflow", "frona-oprisk"],
  useCases: [
    {
      id: "procurement-docs",
      kind: "proposed-example",
      claimIds: ["C02", "C15"],
      title: { ar: "عقود التوريد والجودة" },
      body: {
        ar: "أرشفة عقود الموردين وأوامر الشراء وتقارير الجودة وشهادات المطابقة وسجلات الصيانة عبر AMESCOM ARCHIVE.",
      },
    },
    {
      id: "purchase-approvals",
      kind: "proposed-example",
      claimIds: ["C03", "C15"],
      title: { ar: "اعتمادات الشراء" },
      body: {
        ar: "تمرير طلبات وأوامر الشراء بين المشتريات والمخازن والجودة والمالية عبر AMESCOM Workflow.",
      },
    },
    {
      id: "ops-risk",
      kind: "proposed-example",
      claimIds: ["C05", "C15"],
      title: { ar: "المخاطر التشغيلية" },
      body: {
        ar: "توثيق المخاطر التشغيلية المرتبطة بالعمليات والمنتجات عبر FRONA.",
      },
    },
  ],
  caveats: {
    ar: [
      "هذه ليست منصة تنفيذ تصنيع أو نظام تخطيط موارد أو تحكم صناعي.",
      "أمثلة الوثائق مأخوذة من مسودة المحتوى، وليست دراسات عملاء.",
    ],
  },
};
