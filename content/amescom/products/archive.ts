import type { ProductContent } from "../types";

export const archive: ProductContent = {
  id: "archive",
  slug: "archive",
  publication: {
    status: "draft",
    includeInNavigation: true,
    includeInSitemap: false,
    includeInPreview: true,
  },
  name: "AMESCOM ARCHIVE",
  tagline: { ar: "النظام الذكي لإدارة الوثائق والأرشفة الإلكترونية" },
  summary: {
    ar: "أرشفة إلكترونية وتنظيم للوثائق، مع البحث والتعرّف الضوئي على النصوص العربية وإدارة الإصدارات والصلاحيات.",
  },
  audience: {
    ar: "المؤسسات التي تحتاج إلى حفظ الوثائق واسترجاعها وتتبع من اطّلع عليها أو عدّلها.",
  },
  problem: {
    ar: "تخزين الملفات وحده لا يكفي: تحتاج المؤسسة إلى فهم الوثائق وحمايتها والوصول إليها عند الحاجة.",
  },
  featureGroups: [
    {
      id: "ocr",
      claimIds: ["C02"],
      title: { ar: "التقاط الوثائق والتعرّف الضوئي على النصوص العربية" },
      body: {
        ar: "محرك مخصّص لقراءة الوثائق الممسوحة ضوئياً باللغة العربية واستخراج النص لتحويل الصور إلى محتوى قابل للبحث.",
      },
    },
    {
      id: "organization",
      claimIds: ["C02"],
      title: { ar: "التصنيف والإصدارات والمرفقات" },
      body: {
        ar: "تصنيف الوثائق والتعرّف على أنواعها، مع إدارة الإصدارات وربط المرفقات الرقمية الداعمة.",
      },
    },
    {
      id: "search",
      claimIds: ["C02"],
      title: { ar: "البحث في الوثائق" },
      body: {
        ar: "البحث بالكلمات المفتاحية أو بالنصوص الواردة داخل المستندات لاسترجاع الوثيقة المطلوبة.",
      },
    },
    {
      id: "access",
      claimIds: ["C02"],
      title: { ar: "الصلاحيات وسجل العمليات" },
      body: {
        ar: "صلاحيات وصول تحدّد ما يمكن لكل مستخدم عرضه أو تعديله، مع سجل للعمليات مثل الاستعراض والتعديل والطباعة وإدارة الإصدارات.",
      },
    },
  ],
  sectorIds: ["banking-finance", "insurance", "healthcare", "industry"],
  claimIds: ["C02"],
  mediaIds: ["M02", "M13"],
  ctaHref: "/ar/contact?product=archive",
};
