import type { LocalizedText } from './types.ts';

export const home = {
  hero: {
    title: { ar: 'أنظمة برمجية تدعم التحول الرقمي في مؤسستك' } satisfies LocalizedText,
    /** Used while FRONA is not publishable. */
    body: {
      ar: 'من إدارة الوثائق ومسارات العمل إلى تشغيل المراكز الطبية، تساعدك حلول أميسكوم على تنظيم المعلومات وتبسيط العمليات ودعم اتخاذ القرار.',
    } satisfies LocalizedText,
    /** Used only once FRONA is publishable. */
    bodyWithRisk: {
      ar: 'من إدارة الوثائق ومسارات العمل إلى تشغيل المراكز الطبية وإدارة المخاطر، تساعدك حلول أميسكوم على تنظيم المعلومات وتبسيط العمليات ودعم اتخاذ القرار.',
    } satisfies LocalizedText,
  },
  products: {
    title: { ar: 'منتجاتنا' } satisfies LocalizedText,
    body: { ar: 'لكل منتج دور واضح في تنظيم عمل مؤسستك.' } satisfies LocalizedText,
    linkLabel: { ar: 'تعرّف على المنتج' } satisfies LocalizedText,
  },
  sectors: {
    title: { ar: 'حلول حسب القطاع' } satisfies LocalizedText,
    body: { ar: 'اختر قطاعك لتتعرّف على الحلول التي تناسب طبيعة عملك.' } satisfies LocalizedText,
    linkLabel: { ar: 'استكشف القطاع' } satisfies LocalizedText,
  },
  services: {
    title: { ar: 'خدمات تقنية للمؤسسات' } satisfies LocalizedText,
    body: { ar: 'إلى جانب منتجاتنا، نقدّم خدمات في تطوير البرمجيات والبنية التحتية وأمن المعلومات والشبكات.' } satisfies LocalizedText,
    linkLabel: { ar: 'تعرّف على خدماتنا' } satisfies LocalizedText,
  },
  engagement: {
    title: { ar: 'كيف نبدأ معك' } satisfies LocalizedText,
    claimIds: ['P-ENGAGEMENT'],
    steps: [
      {
        title: { ar: 'نتعرّف على احتياجاتك' } satisfies LocalizedText,
        body: { ar: 'نناقش معك طبيعة عملك والتحديات التي تواجهها.' } satisfies LocalizedText,
      },
      {
        title: { ar: 'نقترح الحل المناسب' } satisfies LocalizedText,
        body: { ar: 'نحدد المنتج أو الخدمة الأنسب لاحتياجات مؤسستك.' } satisfies LocalizedText,
      },
      {
        title: { ar: 'نتفق على خطة التنفيذ' } satisfies LocalizedText,
        body: { ar: 'نتفق معك على نطاق العمل ومراحل التنفيذ.' } satisfies LocalizedText,
      },
    ],
  },
  closing: {
    title: { ar: 'لنتحدث عن احتياجات مؤسستك' } satisfies LocalizedText,
    body: { ar: 'أخبرنا عن عملك، وسيتواصل معك فريق أميسكوم لمناقشة الحل المناسب.' } satisfies LocalizedText,
  },
};

export const productsPage = {
  title: { ar: 'منتجات أميسكوم' } satisfies LocalizedText,
  intro: {
    ar: 'أنظمة لإدارة الوثائق ومسارات العمل وتشغيل المراكز الطبية، يمكن تكييفها وفق احتياجات مؤسستك.',
  } satisfies LocalizedText,
  sections: {
    features: { ar: 'أبرز الإمكانات' } satisfies LocalizedText,
    audience: { ar: 'لمن هذا المنتج' } satisfies LocalizedText,
    benefits: { ar: 'ما الذي يقدمه لمؤسستك' } satisfies LocalizedText,
    gettingStarted: { ar: 'كيف تبدأ' } satisfies LocalizedText,
    sectors: { ar: 'القطاعات المناسبة' } satisfies LocalizedText,
    contact: { ar: 'هل تريد معرفة المزيد عن هذا المنتج؟' } satisfies LocalizedText,
  },
  illustrationLabel: { ar: 'رسم توضيحي' } satisfies LocalizedText,
};

export const sectorsPage = {
  title: { ar: 'القطاعات' } satisfies LocalizedText,
  intro: { ar: 'حلول تساعد كل قطاع على تنظيم وثائقه وعملياته وفق طبيعة عمله.' } satisfies LocalizedText,
  sections: {
    useCases: { ar: 'كيف تساعدك حلولنا' } satisfies LocalizedText,
    products: { ar: 'المنتجات المرتبطة' } satisfies LocalizedText,
  },
  /** Shown near use cases: they are explanatory, not customer stories. */
  useCaseNote: { ar: 'أمثلة توضيحية على استخدام منتجاتنا في هذا القطاع.' } satisfies LocalizedText,
};

export const aboutPage = {
  title: { ar: 'من نحن' } satisfies LocalizedText,
  servicesIntro: { ar: 'نقدّم للمؤسسات خدمات تقنية تكمّل منتجاتنا البرمجية.' } satisfies LocalizedText,
  closing: { ar: 'هل تبحث عن حل لمؤسستك؟ تواصل معنا.' } satisfies LocalizedText,
};

export const contactPage = {
  title: { ar: 'اتصل بنا' } satisfies LocalizedText,
  intro: {
    ar: 'أرسل لنا استفسارك عن منتجاتنا أو خدماتنا، وسيتواصل معك فريق أميسكوم.',
  } satisfies LocalizedText,
  productContext: { ar: 'استفسار عن:' } satisfies LocalizedText,
  directTitle: { ar: 'وسائل التواصل' } satisfies LocalizedText,
  emailLabel: { ar: 'البريد الإلكتروني' } satisfies LocalizedText,
  phoneLabel: { ar: 'الهاتف' } satisfies LocalizedText,
  locationLabel: { ar: 'الموقع' } satisfies LocalizedText,
};

export const helpPage = {
  title: { ar: 'المساعدة' } satisfies LocalizedText,
  intro: { ar: 'اختر نوع طلبك ليصل إلى الفريق المختص.' } satisfies LocalizedText,
  types: {
    support: {
      title: { ar: 'الدعم الفني' } satisfies LocalizedText,
      body: { ar: 'للمساعدة في استخدام أحد أنظمتنا أو حل مشكلة تواجهك.' } satisfies LocalizedText,
    },
    'feature-request': {
      title: { ar: 'طلب إضافة ميزة' } satisfies LocalizedText,
      body: { ar: 'لاقتراح ميزة جديدة أو تحسين على أحد أنظمتنا.' } satisfies LocalizedText,
    },
    'report-issue': {
      title: { ar: 'الإبلاغ عن مشكلة' } satisfies LocalizedText,
      body: { ar: 'للإبلاغ عن عطل أو خطأ في أحد أنظمتنا.' } satisfies LocalizedText,
    },
  },
};

export const careersPage = {
  title: { ar: 'التوظيف' } satisfies LocalizedText,
  /** Draft: publish only with a confirmed vacancy or general-application route (Q29). */
  intro: {
    ar: 'نرحب بانضمام أصحاب الكفاءات إلى فريق أميسكوم.',
  } satisfies LocalizedText,
};
