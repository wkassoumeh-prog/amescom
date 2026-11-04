import type { ProductContent } from "../types";

export const workflow: ProductContent = {
  id: "workflow",
  slug: "workflow",
  publication: {
    status: "draft",
    includeInNavigation: true,
    includeInSitemap: false,
    includeInPreview: true,
  },
  name: "AMESCOM Workflow",
  tagline: { ar: "إدارة الدورة المستندية وأتمتة المراجعات والاعتمادات" },
  summary: {
    ar: "نظّم مسارات المراجعة والاعتماد، وتابع المهام والمستندات بين أقسام مؤسستك.",
  },
  audience: {
    ar: "الإدارات التي تعتمد على الموافقات المتسلسلة وتحتاج إلى وضوح المسؤوليات دون ضياع الملفات.",
  },
  problem: {
    ar: "المستندات تتأخر على المكاتب، ولا يتضح أين توقفت أو من المسؤول عنها الآن.",
  },
  featureGroups: [
    {
      id: "designer",
      claimIds: ["C03"],
      title: { ar: "تصميم مسارات الموافقة" },
      body: {
        ar: "تصميم مسارات الاعتماد بالسحب والإفلات: تحديد المستخدمين والترتيب وشروط التفرّع والصلاحيات دون معرفة برمجية.",
      },
    },
    {
      id: "notifications",
      claimIds: ["C03"],
      title: { ar: "المهام والإشعارات" },
      body: {
        ar: "تذكير تلقائي بالمهام الواجبة، مع إشعارات عبر البريد الإلكتروني والتطبيق.",
      },
    },
    {
      id: "repository",
      claimIds: ["C03"],
      title: { ar: "حفظ المستندات والبحث" },
      body: {
        ar: "مكان واحد لتصنيف المستندات وحفظها والبحث عنها عبر عوامل تصفية.",
      },
    },
    {
      id: "reports",
      claimIds: ["C03"],
      title: { ar: "التقارير والمتابعة" },
      body: {
        ar: "تقارير عن متوسط وقت الإنجاز ونقاط الاختناق وإنتاجية الخطوات، مع سجل تدقيق لكل تغيير.",
      },
    },
    {
      id: "integrations",
      claimIds: ["C03"],
      title: { ar: "التكامل مع أنظمة العمل" },
      body: {
        ar: "قابلية التكامل مع أنظمة تخطيط الموارد (ERP) وإدارة علاقات العملاء (CRM) وبرامج المحاسبة. أسماء الموصلات الجاهزة غير مؤكدة بعد.",
      },
    },
  ],
  sectorIds: ["banking-finance", "insurance", "industry"],
  claimIds: ["C03"],
  mediaIds: ["M07", "M08", "M13"],
  ctaHref: "/ar/contact?product=workflow",
};
