import type { Localized } from "./types";

export type FieldName =
  | "name"
  | "company"
  | "email"
  | "phone"
  | "message"
  | "product"
  | "sector"
  | "version"
  | "position"
  | "qualification"
  | "helpType";

export interface FormField {
  name: FieldName;
  required: boolean;
  label: Localized<string>;
  autocomplete?: string;
  inputMode?: "email" | "tel" | "text";
  dir?: "ltr" | "auto";
}

const name: FormField = {
  name: "name",
  required: true,
  label: { ar: "الاسم" },
  autocomplete: "name",
};
const company: FormField = {
  name: "company",
  required: true,
  label: { ar: "الشركة" },
  autocomplete: "organization",
};
const email: FormField = {
  name: "email",
  required: true,
  label: { ar: "البريد الإلكتروني" },
  autocomplete: "email",
  inputMode: "email",
  dir: "ltr",
};
const phoneOptional: FormField = {
  name: "phone",
  required: false,
  label: { ar: "رقم الهاتف" },
  autocomplete: "tel",
  inputMode: "tel",
  dir: "ltr",
};
const message: FormField = {
  name: "message",
  required: true,
  label: { ar: "الرسالة" },
};
const product: FormField = {
  name: "product",
  required: false,
  label: { ar: "المنتج" },
};
const sector: FormField = {
  name: "sector",
  required: false,
  label: { ar: "القطاع" },
};

export const formCopy = {
  submit: { ar: "إرسال الطلب" },
  pending: { ar: "جارٍ إرسال طلبك…" },
  validation: { ar: "يرجى مراجعة الحقول الموضّحة وإكمال المعلومات المطلوبة." },
  invalidEmail: { ar: "يرجى إدخال بريد إلكتروني صالح." },
  tooLong: { ar: "النص أطول من الحد المسموح." },
  unknownValue: { ar: "القيمة المختارة غير معروفة." },
  success: {
    ar: "تم استلام طلبك بنجاح. سيتواصل معك فريق أميسكوم عبر بيانات التواصل التي أدخلتها.",
  },
  mockAccepted: {
    ar: "تم قبول الطلب في وضع الاختبار المحلي. لم يُرسل إلى أميسكوم، ولا يعني ذلك أن أحداً في الشركة اطّلع عليه.",
  },
  failure: {
    ar: "تعذّر إرسال طلبك الآن. يرجى المحاولة مجدداً أو التواصل معنا عبر البريد الإلكتروني.",
  },
  rateLimited: {
    ar: "وصلت إلى حد الطلبات المسموح به حالياً. يرجى الانتظار ثم المحاولة مجدداً.",
  },
  duplicate: {
    ar: "يبدو أن هذا الطلب أُرسل للتو. لم يُرسل مرة أخرى.",
  },
  disabled: {
    ar: "الإرسال عبر الموقع غير مفعّل حالياً. يرجى التواصل عبر البريد الإلكتروني أو الهاتف.",
  },
  mockNotice: {
    ar: "وضع الاختبار المحلي: الطلبات تُحفظ هنا للاختبار ولا تُرسل إلى أميسكوم.",
  },
  disabledNotice: {
    ar: "الإرسال عبر الموقع متوقف حتى يُحدَّد مسار استلام معتمد. استخدم البريد الإلكتروني أو الهاتف.",
  },
  attachmentDisabled: {
    ar: "رفع الملفات غير متاح حالياً. يمكن إرسال المرفقات عبر البريد الإلكتروني بعد التنسيق معنا.",
  },
  attachmentGuidance: {
    ar: "يرجى عدم إرفاق كلمات مرور أو بيانات مرضى أو معلومات سرية غير ضرورية لمعالجة الطلب.",
  },
  privacyLinkLabel: { ar: "سياسة الخصوصية" },
  optionalMark: { ar: "اختياري" },
};

export const contactForm = {
  id: "contact",
  destination: "/ar/contact",
  fields: [name, company, email, phoneOptional, product, sector, message],
  attachmentsEnabled: false,
  contextQueryKeys: ["product", "sector"] as const,
};

export const helpTypes = [
  {
    id: "support",
    slug: "support",
    label: { ar: "الدعم الفني" },
    href: "/ar/help/support",
    summary: {
      ar: "اطلب مساعدة في تشغيل منتج قائم تستخدمه مؤسستك. لا يُنشأ رقم تذكرة من الموقع، ولا يُوعد بزمن رد.",
    },
    messageLabel: { ar: "الرسالة" },
    messageHint: {
      ar: "صف ما تحاول إنجازه وما الذي يحدث بدلاً من ذلك.",
    },
  },
  {
    id: "feature-request",
    slug: "feature-request",
    label: { ar: "طلب إضافة ميزة" },
    href: "/ar/help/feature-request",
    summary: {
      ar: "اقترح ميزة أو تحسيناً على أحد أنظمة أميسكوم. هذا المسار منفصل عن الإبلاغ عن خلل.",
    },
    messageLabel: { ar: "اقتراح الميزة" },
    messageHint: {
      ar: "صف الاحتياج وما الذي سيتيحه التحسين لفريقك.",
    },
  },
  {
    id: "report-issue",
    slug: "report-issue",
    label: { ar: "الإبلاغ عن مشكلة" },
    href: "/ar/help/report-issue",
    summary: {
      ar: "أبلغ عن مشكلة في النظام مع ما يكفي من التفاصيل لإعادة النظر فيها. لا تتبّع حالة البلاغ من الموقع.",
    },
    messageLabel: { ar: "وصف المشكلة" },
    messageHint: {
      ar: "اذكر خطوات إعادة الإنتاج إن أمكن، دون إرفاق بيانات مرضى أو معلومات سرية.",
    },
  },
] as const;

export type HelpType = (typeof helpTypes)[number];

export const helpForm = {
  id: "help",
  fields: [
    name,
    company,
    email,
    phoneOptional,
    {
      name: "helpType" as const,
      required: true,
      label: { ar: "نوع الطلب" },
    },
    { ...product, required: false },
    {
      name: "version" as const,
      required: false,
      label: { ar: "إصدار النظام" },
      dir: "ltr" as const,
    },
    message,
  ],
  attachmentsEnabled: false,
};

export const careersForm = {
  id: "careers",
  fields: [
    name,
    { ...email, required: true },
    phoneOptional,
    {
      name: "position" as const,
      required: true,
      label: { ar: "الوظيفة أو مجال الاهتمام" },
    },
    {
      name: "qualification" as const,
      required: true,
      label: { ar: "المؤهل أو الخبرة" },
    },
  ],
  attachmentsEnabled: false,
  omitDateOfBirth: true,
  vacancies: [] as { id: string; title: Localized<string> }[],
  generalApplicationConfirmed: false,
  emptyState: {
    ar: "لا توجد شواغر معلنة حالياً. إذا فُتح باب للتقديم العام لاحقاً سيظهر هنا.",
  },
};

export const helpHub = {
  title: { ar: "المساعدة" },
  summary: {
    ar: "اختر نوع الطلب المناسب. الدعم الفني وطلب إضافة ميزة والإبلاغ عن مشكلة مسارات منفصلة. لا يوجد مكتب مساعدة مرتبط من الموقع، ولا يُطلب تسجيل دخول.",
  },
  noHelpdesk: {
    ar: "لم يُعتمد ربط بمنصة دعم خارجية. يمكن أيضاً الكتابة إلى البريد الإلكتروني أدناه.",
  },
};

export const careersPage = {
  title: { ar: "التوظيف" },
  summary: {
    ar: "نعرض هنا الشواغر المعلنة فقط، أو مسار تقديم عام إذا أُكِّد. لا ننشر وظائف غير موجودة.",
  },
  noDob: {
    ar: "لا نطلب تاريخ الميلاد في طلبات التوظيف.",
  },
};
