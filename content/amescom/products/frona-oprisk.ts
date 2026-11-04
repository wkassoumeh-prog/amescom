import type { ProductContent } from "../types";

/** FRONA is included in the product lineup at the owner's explicit request. */
export const fronaOprisk: ProductContent = {
  id: "frona-oprisk",
  slug: "frona-oprisk",
  publication: {
    status: "draft",
    includeInNavigation: true,
    includeInSitemap: false,
    includeInPreview: true,
  },
  name: "FRONA",
  nameAr: "فرونا",
  tagline: { ar: "إدارة المخاطر التشغيلية والحوكمة والرقابة" },
  summary: {
    ar: "أدوات لإدارة المخاطر التشغيلية وتقييم الضوابط ومتابعة المؤشرات والتقارير.",
  },
  audience: {
    ar: "المؤسسات التي تحتاج إلى توثيق المخاطر والضوابط ومتابعتها عبر الويب، بما فيها المصارف والتأمين والصناعة.",
  },
  problem: {
    ar: "إدارة المخاطر التشغيلية تتشتت بين ملفات وجداول، فيصعب قياس الفجوات ومتابعة التوصيات.",
  },
  featureGroups: [
    {
      id: "profiles",
      claimIds: ["C05"],
      title: { ar: "ملف المخاطر" },
      body: {
        ar: "تعريف المخاطر والإجراءات الرقابية وربطها بالوظائف والمنتجات، مع مصفوفات مخاطر قابلة للاختيار حسب مستويات التأثير وأنواع الأصول.",
      },
    },
    {
      id: "measurement",
      claimIds: ["C05"],
      title: { ar: "القياس والفجوات" },
      body: {
        ar: "قياس المخاطر الكامنة والمتبقية والقيم المستهدفة والفجوات الحالية والحقيقية والمتوقعة ونقاط الضعف ونسبة المساهمة في الفجوة.",
      },
    },
    {
      id: "recommendations",
      claimIds: ["C05"],
      title: { ar: "التوصيات والمقترحات" },
      body: {
        ar: "قياس أثر التوصيات المعتمدة ومتابعة تطبيقها، مع آلية لاقتراحات المستخدمين ودراسة أثر التعديلات على البيئة الرقابية.",
      },
    },
    {
      id: "governance",
      claimIds: ["C05"],
      title: { ar: "الحوكمة والتقييم الذاتي" },
      body: {
        ar: "تقارير لمجلس الإدارة والإدارة التنفيذية والجهات الرقابية، ونموذج لملف مخاطر المنشأة، وتقييم ذاتي للضوابط مع تذكير بمواعيد الفحوصات.",
      },
    },
    {
      id: "audit-events",
      claimIds: ["C05"],
      title: { ar: "التدقيق والأحداث التشغيلية" },
      body: {
        ar: "تدقيق مبني على المخاطر، وجمع وتحليل الأحداث التشغيلية والخسائر وإعادة تقييم ملفات المخاطر للوحدات.",
      },
    },
    {
      id: "kri-reporting",
      claimIds: ["C05"],
      title: { ar: "المؤشرات والتقارير" },
      body: {
        ar: "مؤشرات مخاطر رئيسية مع إشعارات عند تجاوز الحد المقبول، ومصفوفات 3×3 أو 4×4 أو 5×5، وتقارير PDF وExcel وWord، ودعم تعدد اللغات والعملات.",
      },
    },
  ],
  sectorIds: ["banking-finance", "insurance", "industry"],
  claimIds: ["C05"],
  mediaIds: ["M13"],
  ctaHref: "/ar/contact?product=frona-oprisk",
};
