import type { Localized } from "./types";

export interface PageMeta {
  route: string;
  publication: "draft" | "held" | "public";
  title: Localized<string>;
  description: Localized<string>;
}

export const siteName = {
  ar: "أميسكوم",
  latin: "Amescom",
};

export const pages: PageMeta[] = [
  {
    route: "/ar",
    publication: "draft",
    title: { ar: "أميسكوم — حلول برمجية للمؤسسات" },
    description: {
      ar: "حلول أميسكوم للأرشفة ومسارات العمل وإدارة المراكز الطبية والمخاطر التشغيلية. تواصل معنا لمناقشة احتياج مؤسستك.",
    },
  },
  {
    route: "/ar/products",
    publication: "draft",
    title: { ar: "المنتجات — أميسكوم" },
    description: {
      ar: "تعرّف على AMESCOM ARCHIVE وWorkflow وClinical PRO وFRONA واختر ما يناسب عملك.",
    },
  },
  {
    route: "/ar/products/archive",
    publication: "draft",
    title: { ar: "AMESCOM ARCHIVE — أميسكوم" },
    description: {
      ar: "أرشفة إلكترونية وبحث وتعرّف ضوئي على النصوص العربية وإدارة صلاحيات الوثائق.",
    },
  },
  {
    route: "/ar/products/workflow",
    publication: "draft",
    title: { ar: "AMESCOM Workflow — أميسكوم" },
    description: {
      ar: "أتمتة مسارات المراجعة والاعتماد مع إشعارات وتقارير وسجل تدقيق.",
    },
  },
  {
    route: "/ar/products/clinical-pro",
    publication: "draft",
    title: { ar: "AMESCOM Clinical PRO — أميسكوم" },
    description: {
      ar: "إدارة الاستقبال والعيادات والمخبر والأشعة مع ملف مريض موحّد وتقارير إدارية.",
    },
  },
  {
    route: "/ar/products/frona-oprisk",
    publication: "draft",
    title: { ar: "FRONA — أميسكوم" },
    description: {
      ar: "إدارة المخاطر التشغيلية وتقييم الضوابط ومتابعة المؤشرات والتقارير.",
    },
  },
  {
    route: "/ar/sectors",
    publication: "draft",
    title: { ar: "القطاعات — أميسكوم" },
    description: {
      ar: "حلول أميسكوم للمصارف والتأمين والمراكز الطبية والمؤسسات الصناعية.",
    },
  },
  {
    route: "/ar/sectors/banking-finance",
    publication: "draft",
    title: { ar: "المصارف والشركات المالية — أميسكوم" },
    description: {
      ar: "تنظيم الوثائق ومسارات الاعتماد بما يدعم التحضير للتدقيق في المؤسسات المالية.",
    },
  },
  {
    route: "/ar/sectors/insurance",
    publication: "draft",
    title: { ar: "التأمين — أميسكوم" },
    description: {
      ar: "تنظيم وثائق التأمين وملفات المطالبات ومسارات المراجعة.",
    },
  },
  {
    route: "/ar/sectors/healthcare",
    publication: "draft",
    title: { ar: "المراكز الطبية والعيادات — أميسكوم" },
    description: {
      ar: "تشغيل المراكز الطبية عبر Clinical PRO مع أرشفة وموافقات عند الحاجة.",
    },
  },
  {
    route: "/ar/sectors/industry",
    publication: "draft",
    title: { ar: "المؤسسات الصناعية — أميسكوم" },
    description: {
      ar: "تنظيم عقود التوريد وأوامر الشراء وسجلات الجودة ومسارات الاعتماد.",
    },
  },
  {
    route: "/ar/about",
    publication: "draft",
    title: { ar: "من نحن — أميسكوم" },
    description: {
      ar: "أميسكوم شركة حلول معلوماتية متكاملة تقدّم تطبيقات مرنة للمؤسسات.",
    },
  },
  {
    route: "/ar/contact",
    publication: "draft",
    title: { ar: "اتصل بنا — أميسكوم" },
    description: {
      ar: "نموذج استفسار أميسكوم. الاسم والشركة والبريد الإلكتروني والرسالة مطلوبة.",
    },
  },
  {
    route: "/ar/help",
    publication: "draft",
    title: { ar: "المساعدة — أميسكوم" },
    description: {
      ar: "الدعم الفني وطلب إضافة ميزة والإبلاغ عن مشكلة.",
    },
  },
  {
    route: "/ar/help/support",
    publication: "draft",
    title: { ar: "الدعم الفني — أميسكوم" },
    description: { ar: "طلب دعم فني لمنتجات أميسكوم." },
  },
  {
    route: "/ar/help/feature-request",
    publication: "draft",
    title: { ar: "طلب إضافة ميزة — أميسكوم" },
    description: { ar: "اقترح ميزة جديدة على منتجات أميسكوم." },
  },
  {
    route: "/ar/help/report-issue",
    publication: "draft",
    title: { ar: "الإبلاغ عن مشكلة — أميسكوم" },
    description: { ar: "أبلغ عن مشكلة في أحد أنظمة أميسكوم." },
  },
  {
    route: "/ar/careers",
    publication: "draft",
    title: { ar: "التوظيف — أميسكوم" },
    description: { ar: "الفرص الوظيفية في أميسكوم." },
  },
  {
    route: "/ar/privacy",
    publication: "held",
    title: { ar: "سياسة الخصوصية — أميسكوم" },
    description: {
      ar: "كيف تتعامل أميسكوم مع البيانات المرسلة عبر الموقع.",
    },
  },
];

export function productionMetadata(): PageMeta[] {
  return pages.filter((page) => page.publication === "public");
}
