import type { LocalizedText, ProductId, SectorId } from './types.ts';

export const siteMetadata = {
  siteName: { ar: 'أميسكوم' } satisfies LocalizedText,
  /** `%s` is replaced with the page title. */
  titleTemplate: { ar: '%s | أميسكوم' } satisfies LocalizedText,
  defaultDescription: {
    ar: 'أميسكوم: أنظمة برمجية للمؤسسات لإدارة الوثائق ومسارات العمل وتشغيل المراكز الطبية، وخدمات في البنية التحتية وأمن المعلومات والشبكات.',
  } satisfies LocalizedText,
  /** Preview deployments stay noindex (NFR-04). */
  previewNoindex: true,
};

type PageMeta = { title: LocalizedText; description: LocalizedText; claimIds?: string[] };

export const pageMetadata: Record<string, PageMeta> = {
  home: {
    title: { ar: 'أنظمة برمجية للمؤسسات' },
    description: {
      ar: 'حلول أميسكوم لإدارة الوثائق والأرشفة الإلكترونية ومسارات العمل وإدارة المراكز الطبية. تواصل معنا لاختيار الحل المناسب لمؤسستك.',
    },
  },
  products: {
    title: { ar: 'المنتجات' },
    description: {
      ar: 'تعرّف على منتجات أميسكوم: AMESCOM ARCHIVE وAMESCOM Workflow وAMESCOM Clinical PRO.',
    },
  },
  sectors: {
    title: { ar: 'القطاعات' },
    description: {
      ar: 'حلول أميسكوم للمصارف وشركات التأمين والمراكز الطبية والمؤسسات الصناعية.',
    },
  },
  about: {
    title: { ar: 'من نحن' },
    description: {
      ar: 'أميسكوم شركة حلول معلوماتية تأسست عام 2004، تطوّر تطبيقات للمؤسسات وتقدّم خدمات في البنية التحتية وأمن المعلومات والشبكات.',
    },
    claimIds: ['C01', 'C19'],
  },
  contact: {
    title: { ar: 'اتصل بنا' },
    description: { ar: 'تواصل مع فريق أميسكوم للاستفسار عن منتجاتنا وخدماتنا.' },
  },
  help: {
    title: { ar: 'المساعدة' },
    description: { ar: 'اطلب الدعم الفني، أو اقترح ميزة جديدة، أو أبلغ عن مشكلة في أحد أنظمة أميسكوم.' },
  },
  'help-support': {
    title: { ar: 'الدعم الفني' },
    description: { ar: 'أرسل طلب دعم فني لأحد أنظمة أميسكوم.' },
  },
  'help-feature-request': {
    title: { ar: 'طلب إضافة ميزة' },
    description: { ar: 'اقترح ميزة جديدة أو تحسيناً على أحد أنظمة أميسكوم.' },
  },
  'help-report-issue': {
    title: { ar: 'الإبلاغ عن مشكلة' },
    description: { ar: 'أبلغ فريق أميسكوم عن عطل أو خطأ في أحد أنظمتها.' },
  },
  careers: {
    title: { ar: 'التوظيف' },
    description: { ar: 'فرص العمل لدى أميسكوم.' },
  },
  privacy: {
    title: { ar: 'سياسة الخصوصية' },
    description: { ar: 'كيف تتعامل أميسكوم مع البيانات التي ترسلها عبر موقعها.' },
  },
};

export const productMetadata: Record<ProductId, PageMeta> = {
  archive: {
    title: { ar: 'AMESCOM ARCHIVE لإدارة الوثائق والأرشفة الإلكترونية' },
    description: {
      ar: 'أرشفة إلكترونية للوثائق مع التعرّف الضوئي على النصوص العربية، والبحث في النصوص، وإدارة الإصدارات والصلاحيات وسجل العمليات.',
    },
  },
  workflow: {
    title: { ar: 'AMESCOM Workflow لإدارة الدورة المستندية' },
    description: {
      ar: 'صمّم مسارات المراجعة والاعتماد، وتابع المهام والمستندات بين الأقسام، مع إشعارات وتقارير وسجل تدقيق.',
    },
  },
  'clinical-pro': {
    title: { ar: 'AMESCOM Clinical PRO لإدارة المراكز والعيادات الطبية' },
    description: {
      ar: 'منصة واحدة لإدارة الاستقبال والعيادات والمخبر والأشعة، مع ملف موحّد للمريض وتقارير للإدارة.',
    },
  },
  'frona-oprisk': {
    title: { ar: 'FRONA لإدارة المخاطر التشغيلية' },
    description: {
      ar: 'إدارة المخاطر التشغيلية والضوابط والتقييم الذاتي ومؤشرات المخاطر الرئيسية والتقارير.',
    },
  },
};

export const sectorMetadata: Record<SectorId, PageMeta> = {
  'banking-finance': {
    title: { ar: 'حلول المصارف والمؤسسات المالية' },
    description: { ar: 'أرشفة الوثائق المصرفية وتنظيم مسارات الاعتماد والاستعداد للتدقيق مع حلول أميسكوم.' },
  },
  insurance: {
    title: { ar: 'حلول شركات التأمين' },
    description: { ar: 'تنظيم وثائق التأمين وملفات المطالبات ومتابعة مراحل مراجعتها واعتمادها.' },
  },
  healthcare: {
    title: { ar: 'حلول المراكز الطبية والعيادات' },
    description: { ar: 'إدارة الاستقبال والعيادات والمخبر والأشعة مع AMESCOM Clinical PRO.' },
  },
  industry: {
    title: { ar: 'حلول المؤسسات الصناعية' },
    description: { ar: 'أرشفة العقود وسجلات الجودة والصيانة وتنظيم اعتماد أوامر الشراء.' },
  },
};
