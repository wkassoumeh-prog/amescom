import type { LocalizedText } from './types.ts';

/** Mixed-direction values: render inside an LTR-isolated element (`<bdi dir="ltr">`). */
type LtrValue = { display: string; href: string; dir: 'ltr' };

export const company = {
  /** Sole public identity (decision A-01). Legal name still to be confirmed (Q21). */
  name: { ar: 'أميسكوم', en: 'Amescom' } satisfies LocalizedText,
  latinName: 'Amescom',
  legalName: null as LocalizedText | null,
  founded: { year: 2004, claimId: 'C01' },

  contact: {
    approval: 'pending' as const,
    questions: ['Q21'],
    email: { display: 'info@amescom.com', href: 'mailto:info@amescom.com', dir: 'ltr' } satisfies LtrValue,
    phone: { display: '+963 11 33 44 805', href: 'tel:+963113344805', dir: 'ltr' } satisfies LtrValue,
    website: { display: 'www.amescom.com', href: 'https://www.amescom.com', dir: 'ltr' } satisfies LtrValue,
    location: { ar: 'دمشق، سوريا' } satisfies LocalizedText,
    /** No street address published until supplied (Q21). */
    address: null as LocalizedText | null,
    hours: null as LocalizedText | null,
  },

  social: [
    {
      id: 'facebook',
      label: { ar: 'صفحة أميسكوم على فيسبوك' } satisfies LocalizedText,
      href: 'https://www.facebook.com/AMeSCom/',
      approval: 'pending' as const,
      notes: 'Name permitted (A-05). Confirm the page is current and official (Q21).',
    },
  ],

  about: {
    opening: {
      ar: 'تأسست أميسكوم عام 2004 لتقديم حلول معلوماتية للمؤسسات والشركات، وتطوير تطبيقات مرنة تلبي احتياجات العمل وتدعم كفاءة العمليات.',
    } satisfies LocalizedText,
    openingClaimIds: ['C01'],
    experience: {
      ar: 'قدّمت أميسكوم تطبيقات لإدارة مؤسسات تختلف في حجمها ومتطلباتها، في مجالات تشمل المحاسبة والمبيعات والمشتريات والمخزون والمنشآت التعليمية، إضافة إلى حلول لإدارة قواعد البيانات وأنظمة التشغيل.',
    } satisfies LocalizedText,
    experienceClaimIds: ['C11'],
    vision: {
      title: { ar: 'رؤيتنا' } satisfies LocalizedText,
      body: {
        ar: 'نؤمن بأن الإدارة الفعّالة للمؤسسات تتطلب تطبيقات متكاملة ومرنة، تعزز كفاءة العاملين وتحسّن أداء العمل.',
      } satisfies LocalizedText,
    },
    mission: {
      title: { ar: 'مهمتنا' } satisfies LocalizedText,
      body: {
        ar: 'تطوير تطبيقات متكاملة ومرنة تلبي احتياجات العملاء، وتعزز كفاءة العمليات التشغيلية، وتدعم اتخاذ القرار بفعالية.',
      } satisfies LocalizedText,
    },
  },

  services: {
    title: { ar: 'خدماتنا' } satisfies LocalizedText,
    claimIds: ['C19'],
    items: [
      {
        id: 'software',
        title: { ar: 'الحلول البرمجية' } satisfies LocalizedText,
        body: { ar: 'حلول برمجية متكاملة بواجهات ويب وتطبيقات للهواتف المحمولة.' } satisfies LocalizedText,
      },
      {
        id: 'infrastructure',
        title: { ar: 'البنية التحتية والأنظمة السحابية' } satisfies LocalizedText,
        body: {
          ar: 'بناء البنية التحتية للمؤسسات، بما في ذلك البيئات الافتراضية وأنظمة التشغيل والأنظمة السحابية.',
        } satisfies LocalizedText,
      },
      {
        id: 'security',
        title: { ar: 'أمن المعلومات' } satisfies LocalizedText,
        body: {
          ar: 'أنظمة أمن المعلومات، بما فيها برامج مكافحة الفيروسات من ESET وأجهزة جدران الحماية.',
        } satisfies LocalizedText,
      },
      {
        id: 'networks',
        title: { ar: 'الشبكات' } satisfies LocalizedText,
        body: { ar: 'حلول الشبكات المحلية (LAN) والشبكات الواسعة (WAN).' } satisfies LocalizedText,
      },
    ],
  },

  strengths: {
    title: { ar: 'لماذا أميسكوم' } satisfies LocalizedText,
    items: [
      {
        id: 'usability',
        title: { ar: 'واجهات واضحة وسهلة الاستخدام' } satisfies LocalizedText,
        body: {
          ar: 'أنظمة مؤسسية بواجهات واضحة وتجربة استخدام مبسطة، تسهّل تدريب فرق العمل وتساعدها على إنجاز مهامها.',
        } satisfies LocalizedText,
        claimIds: ['C13'],
      },
      {
        id: 'configurable',
        title: { ar: 'مرونة في التخصيص' } satisfies LocalizedText,
        body: {
          ar: 'يمكن تكييف مسارات العمل والصلاحيات والنماذج والتقارير بما يتوافق مع هيكل المؤسسة وسياساتها واحتياجاتها التشغيلية.',
        } satisfies LocalizedText,
        claimIds: ['C13'],
      },
      {
        id: 'sector-experience',
        title: { ar: 'خبرة في قطاعات متعددة' } satisfies LocalizedText,
        body: {
          ar: 'طوّرنا أنظمة للشركات الصناعية والمصارف وشركات التأمين وشركات الصرافة والحوالات والمراكز الطبية، ما يمنحنا فهماً عملياً لاحتياجات كل قطاع.',
        } satisfies LocalizedText,
        claimIds: ['C12'],
      },
      {
        id: 'continuous-improvement',
        title: { ar: 'تطوير مستمر' } satisfies LocalizedText,
        body: {
          ar: 'نتابع ملاحظات عملائنا ومتطلباتهم الجديدة، ونطوّر أنظمتنا بتحسينات وميزات تواكب تطور الأعمال والتقنيات.',
        } satisfies LocalizedText,
        claimIds: ['C13'],
      },
    ],
  },
};
