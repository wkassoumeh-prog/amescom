import type { SectorContent } from "../types";

export const healthcare: SectorContent = {
  id: "healthcare",
  slug: "healthcare",
  publication: {
    status: "draft",
    includeInNavigation: true,
    includeInSitemap: false,
    includeInPreview: true,
  },
  name: { ar: "المراكز الطبية والعيادات" },
  summary: {
    ar: "تشغيل الاستقبال والعيادات والمخبر والأشعة عبر Clinical PRO، مع أرشفة وموافقات حيث يلزم — دون ادعاءات علاجية ودون استقبال ملفات مرضى عبر الموقع.",
  },
  productIds: ["clinical-pro", "archive", "workflow"],
  useCases: [
    {
      id: "centre-operations",
      kind: "supplied-description",
      claimIds: ["C04"],
      title: { ar: "تشغيل المركز الطبي" },
      body: {
        ar: "AMESCOM Clinical PRO يجمع الاستقبال والدور والعيادات والمخبر والأشعة في منصة واحدة مع ملف مريض موحّد وتقارير إدارية.",
      },
    },
    {
      id: "records-archive",
      kind: "proposed-example",
      claimIds: ["C02", "C15"],
      title: { ar: "أرشفة الوثائق الإدارية" },
      body: {
        ar: "يمكن استخدام AMESCOM ARCHIVE لتنظيم الوثائق الإدارية والملفات غير المرتبطة مباشرة بتشغيل العيادة اليومي، عند الحاجة.",
      },
    },
    {
      id: "internal-approvals",
      kind: "proposed-example",
      claimIds: ["C03", "C15"],
      title: { ar: "اعتمادات داخلية" },
      body: {
        ar: "AMESCOM Workflow قد يُستخدم لمسارات اعتماد إدارية داخل المركز، وهو منفصل عن Clinical PRO حتى يُؤكَّد التكامل.",
      },
    },
  ],
  caveats: {
    ar: [
      "لا ندّعي تحسين التشخيص أو النتائج السريرية.",
      "الموقع التسويقي لا يستقبل سجلات مرضى ولا يوفّر بوابة للمرضى.",
      "لا تُنسَب قدرات التعرّف الضوئي أو تشفير ARCHIVE إلى Clinical PRO.",
    ],
  },
};
