import type { Localized, ConfirmationStatus } from "./types";

export interface CompanyContent {
  publicName: { ar: string; enLatin: string };
  legalNameAr: string | null;
  foundedYear: number | null;
  foundedYearStatus: ConfirmationStatus;
  city: Localized<string>;
  streetAddress: string | null;
  email: string;
  phoneDisplay: string;
  phoneHref: string;
  website: string;
  hours: string | null;
  social: { id: string; label: string; href: string; status: ConfirmationStatus }[];
  mission: Localized<string>;
  vision: Localized<string>;
  aboutOpening: Localized<string>;
  aboutBody: Localized<string>;
  services: {
    id: string;
    title: Localized<string>;
    body: Localized<string>;
    claimIds: string[];
  }[];
  strengths: { id: string; title: Localized<string>; body: Localized<string> }[];
  confirmationNotes: string[];
}

export const company: CompanyContent = {
  publicName: { ar: "أميسكوم", enLatin: "Amescom" },
  legalNameAr: null,
  foundedYear: 2004,
  foundedYearStatus: "pending",
  city: { ar: "دمشق، سورية" },
  streetAddress: null,
  email: "info@amescom.com",
  phoneDisplay: "+963 11 33 44 805",
  phoneHref: "tel:+963113344805",
  website: "https://www.amescom.com",
  hours: null,
  social: [
    {
      id: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/AMeSCom/",
      status: "pending",
    },
  ],
  mission: {
    ar: "تطوير تطبيقات متكاملة ومرنة تلبي احتياجات العملاء، وتعزّز كفاءة العمليات التشغيلية وتدعم اتخاذ القرار.",
  },
  vision: {
    ar: "إدارة فعّالة للمؤسسات عبر تطبيقات متكاملة ومرنة تسهم في كفاءة العاملين وتحسين أداء العمل.",
  },
  aboutOpening: {
    ar: "أميسكوم شركة حلول معلوماتية متكاملة، تقدّم تطبيقات مرنة للمؤسسات والشركات لدعم كفاءة العمليات واتخاذ القرار.",
  },
  aboutBody: {
    ar: "تشمل خبرتها تطبيقات للمحاسبة والمبيعات والمشتريات والمخزون والتعليم، إضافة إلى إدارة قواعد البيانات وأنظمة التشغيل. فريق العمل يسعى إلى برمجيات عالية الجودة وفق احتياجات كل مؤسسة.",
  },
  services: [
    {
      id: "software",
      title: { ar: "حلول برمجية" },
      body: { ar: "حلول برمجية متكاملة بواجهات ويب وتطبيقات للموبايل." },
      claimIds: [],
    },
    {
      id: "infrastructure",
      title: { ar: "البنية التحتية والسحابة" },
      body: {
        ar: "بناء منظومات بنية تحتية للمؤسسات، بما فيها البيئات الافتراضية وأنظمة التشغيل والأنظمة السحابية.",
      },
      claimIds: [],
    },
    {
      id: "security",
      title: { ar: "أمن المعلومات" },
      body: {
        ar: "أنظمة أمن المعلومات، بما فيها النظام المضاد للفيروسات من شركة ESET وأجهزة جدران الحماية.",
      },
      claimIds: ["C10"],
    },
    {
      id: "networks",
      title: { ar: "الشبكات" },
      body: { ar: "حلول شبكات محلية LAN وشبكات بعيدة WAN." },
      claimIds: [],
    },
  ],
  strengths: [
    {
      id: "usable",
      title: { ar: "واجهات واضحة" },
      body: {
        ar: "حلول جاهزة للتشغيل بواجهات واضحة وتجربة استخدام مبسّطة، تقلّل وقت التدريب وتساعد الفرق على العمل بسرعة.",
      },
    },
    {
      id: "configurable",
      title: { ar: "مرونة التخصيص" },
      body: {
        ar: "يمكن تكييف سير العمل والصلاحيات والنماذج والتقارير بما يتوافق مع هيكل المؤسسة وسياساتها.",
      },
    },
    {
      id: "sectors",
      title: { ar: "خبرة قطاعية" },
      body: {
        ar: "خبرة في تطوير أنظمة للمؤسسات الصناعية والبنوك وشركات التأمين والصرافة والحوالات والمراكز الطبية.",
      },
    },
    {
      id: "improvement",
      title: { ar: "تطوير مستمر" },
      body: {
        ar: "نتواصل مع عملائنا ونحلّل ملاحظاتهم لتطوير الأنظمة وإضافة تحسينات تواكب تطور الأعمال.",
      },
    },
  ],
  confirmationNotes: [
    "Do not publish foundedYear until foundedYearStatus is owner-confirmed.",
    "Do not invent staff counts, office street address, partner badges or biographies.",
    "Show social links only when status is owner-confirmed.",
    "Services list is from S1; Q22 must confirm they are all still offered.",
  ],
};
