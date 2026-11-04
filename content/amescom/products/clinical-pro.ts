import type { ProductContent } from "../types";

export const clinicalPro: ProductContent = {
  id: "clinical-pro",
  slug: "clinical-pro",
  publication: {
    status: "draft",
    includeInNavigation: true,
    includeInSitemap: false,
    includeInPreview: true,
  },
  name: "AMESCOM Clinical PRO",
  tagline: { ar: "نظام متكامل لإدارة المراكز والعيادات الطبية" },
  summary: {
    ar: "منصة لإدارة الاستقبال والعيادات والمخبر والأشعة، مع ملف موحّد للمريض وتقارير تدعم الإدارة.",
  },
  audience: {
    ar: "العيادات الفردية والمراكز الطبية التي تريد ربط الاستقبال والعيادات والمخبر والأشعة في منصة واحدة.",
  },
  problem: {
    ar: "العمل على أنظمة منفصلة يكرّر بيانات المريض ويبطئ وصول الطلبات والنتائج بين الأقسام.",
  },
  featureGroups: [
    {
      id: "reception",
      claimIds: ["C04"],
      title: { ar: "الاستقبال والدور والمواعيد" },
      body: {
        ar: "جدولة المواعيد وإدارة الدور لتنظيم العمل اليومي في الاستقبال.",
      },
    },
    {
      id: "clinics",
      claimIds: ["C04"],
      title: { ar: "العيادات وملف المريض" },
      body: {
        ar: "ملف واحد لكل مريض يضم زياراته ونتائج تحاليله وصور أشعته، متاح لكل قسم حسب الصلاحيات.",
      },
    },
    {
      id: "lab",
      claimIds: ["C04"],
      title: { ar: "مخبر التحاليل الطبية" },
      body: {
        ar: "ربط طلبات المخبر بنتائجها ضمن مسار المركز، دون إضافة بروتوكولات أجهزة غير مؤكدة.",
      },
    },
    {
      id: "imaging",
      claimIds: ["C04"],
      title: { ar: "الأشعة والبانوراما" },
      body: {
        ar: "إدارة طلبات الأشعة والبانوراما وربطها بملف المريض وبالعيادات.",
      },
    },
    {
      id: "reports",
      claimIds: ["C04"],
      title: { ar: "تقارير الإدارة" },
      body: {
        ar: "لوحات متابعة وتقارير عن الأداء والإيرادات وحركة المرضى لدعم قرار الإدارة.",
      },
    },
  ],
  sectorIds: ["healthcare"],
  claimIds: ["C04"],
  mediaIds: ["M04", "M13"],
  ctaHref: "/ar/contact?product=clinical-pro",
};
