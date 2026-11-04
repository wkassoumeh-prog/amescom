import type { LocalizedText } from './types.ts';

export type FieldId =
  | 'name'
  | 'company'
  | 'email'
  | 'phone'
  | 'product'
  | 'sector'
  | 'version'
  | 'message'
  | 'steps'
  | 'position'
  | 'qualification'
  | 'cv'
  | 'attachments';

export const fieldLabels: Record<FieldId, LocalizedText> = {
  name: { ar: 'الاسم' },
  company: { ar: 'الشركة' },
  email: { ar: 'البريد الإلكتروني' },
  phone: { ar: 'رقم الهاتف' },
  product: { ar: 'المنتج' },
  sector: { ar: 'القطاع' },
  version: { ar: 'إصدار النظام' },
  message: { ar: 'الرسالة' },
  steps: { ar: 'خطوات ظهور المشكلة' },
  position: { ar: 'الوظيفة أو مجال الاهتمام' },
  qualification: { ar: 'المؤهل العلمي والخبرة' },
  cv: { ar: 'السيرة الذاتية' },
  attachments: { ar: 'المرفقات' },
};

export const fieldHints: Partial<Record<FieldId, LocalizedText>> = {
  version: { ar: 'إن كنت تعرفه.' },
  steps: { ar: 'صف ما قمت به قبل ظهور المشكلة وما ظهر لك.' },
  product: { ar: 'اختر المنتج إن كان استفسارك يتعلق بمنتج محدد.' },
};

export const fieldErrors = {
  nameRequired: { ar: 'يرجى إدخال الاسم.' },
  companyRequired: { ar: 'يرجى إدخال اسم الشركة.' },
  emailRequired: { ar: 'يرجى إدخال البريد الإلكتروني.' },
  emailInvalid: { ar: 'يرجى إدخال بريد إلكتروني صحيح.' },
  phoneInvalid: { ar: 'يرجى إدخال رقم هاتف صحيح.' },
  productRequired: { ar: 'يرجى اختيار المنتج.' },
  messageRequired: { ar: 'يرجى كتابة رسالتك.' },
  messageTooLong: { ar: 'تجاوزت الرسالة الحد الأقصى المسموح به لعدد الأحرف.' },
  stepsRequired: { ar: 'يرجى وصف خطوات ظهور المشكلة.' },
  positionRequired: { ar: 'يرجى تحديد الوظيفة أو مجال الاهتمام.' },
  qualificationRequired: { ar: 'يرجى إدخال المؤهل العلمي والخبرة.' },
} satisfies Record<string, LocalizedText>;

export const formText = {
  required: { ar: '(مطلوب)' },
  optional: { ar: '(اختياري)' },
  productUnspecified: { ar: 'غير محدد' },
  submit: { ar: 'إرسال الطلب' },
  pending: { ar: 'جارٍ إرسال طلبك…' },
  validationSummary: { ar: 'يرجى مراجعة الحقول الموضّحة وإكمال المعلومات المطلوبة.' },
  /** Only after confirmed server/provider acceptance (FR-04). */
  success: { ar: 'تم استلام طلبك بنجاح. سيتواصل معك فريق أميسكوم عبر بيانات التواصل التي أدخلتها.' },
  /** Shown only if the backend actually returns a reference. */
  reference: { ar: 'رقم الطلب:' },
  failure: { ar: 'تعذّر إرسال طلبك الآن. يرجى المحاولة مجدداً أو التواصل معنا عبر البريد الإلكتروني.' },
  rateLimited: { ar: 'تلقّينا عدداً كبيراً من المحاولات. يرجى الانتظار قليلاً ثم المحاولة مجدداً.' },
  /** Development preview only; never shown in production. */
  previewOnly: { ar: 'نسخة معاينة: لا يُرسل هذا النموذج أي بيانات.' },
  /** Production fallback while no submission destination is configured (decision P-12). */
  unavailable: { ar: 'استقبال الطلبات عبر الموقع غير متاح حالياً. يمكنك مراسلتنا مباشرة عبر البريد الإلكتروني.' },
  attachmentsUnavailable: { ar: 'إرفاق الملفات غير متاح حالياً عبر الموقع.' },
  attachmentGuidance: {
    ar: 'يرجى عدم إرفاق كلمات مرور أو بيانات مرضى أو معلومات سرية غير ضرورية لمعالجة الطلب.',
  },
  /** Final wording depends on the approved privacy notice (Q31). */
  privacyNote: { ar: 'باستخدامك هذا النموذج، توافق على معالجة بياناتك للرد على طلبك وفق سياسة الخصوصية.' },
  privacyLinkLabel: { ar: 'سياسة الخصوصية' },
} satisfies Record<string, LocalizedText>;

type FieldRule = { id: FieldId; required: boolean; maxLength?: number };

/**
 * Field sets per form. Attachment/CV fields stay disabled until FR-07 controls
 * and a destination are configured.
 */
export const forms = {
  contact: {
    ref: 'FR-04',
    fields: [
      { id: 'name', required: true, maxLength: 120 },
      { id: 'company', required: true, maxLength: 160 },
      { id: 'email', required: true, maxLength: 254 },
      { id: 'phone', required: false, maxLength: 32 },
      { id: 'product', required: false },
      { id: 'sector', required: false },
      { id: 'message', required: true, maxLength: 4000 },
    ] satisfies FieldRule[],
    attachments: false,
  },
  support: {
    ref: 'FR-05',
    fields: [
      { id: 'name', required: true, maxLength: 120 },
      { id: 'company', required: true, maxLength: 160 },
      { id: 'email', required: true, maxLength: 254 },
      { id: 'phone', required: false, maxLength: 32 },
      { id: 'product', required: true },
      { id: 'version', required: false, maxLength: 64 },
      { id: 'message', required: true, maxLength: 4000 },
    ] satisfies FieldRule[],
    attachments: false,
  },
  'feature-request': {
    ref: 'FR-05',
    fields: [
      { id: 'name', required: true, maxLength: 120 },
      { id: 'company', required: true, maxLength: 160 },
      { id: 'email', required: true, maxLength: 254 },
      { id: 'phone', required: false, maxLength: 32 },
      { id: 'product', required: true },
      { id: 'message', required: true, maxLength: 4000 },
    ] satisfies FieldRule[],
    attachments: false,
  },
  'report-issue': {
    ref: 'FR-05',
    fields: [
      { id: 'name', required: true, maxLength: 120 },
      { id: 'company', required: true, maxLength: 160 },
      { id: 'email', required: true, maxLength: 254 },
      { id: 'phone', required: false, maxLength: 32 },
      { id: 'product', required: true },
      { id: 'version', required: false, maxLength: 64 },
      { id: 'message', required: true, maxLength: 4000 },
      { id: 'steps', required: true, maxLength: 4000 },
    ] satisfies FieldRule[],
    attachments: false,
  },
  /** No date of birth (decision P-10). */
  careers: {
    ref: 'FR-06',
    fields: [
      { id: 'name', required: true, maxLength: 120 },
      { id: 'email', required: true, maxLength: 254 },
      { id: 'phone', required: false, maxLength: 32 },
      { id: 'position', required: true, maxLength: 160 },
      { id: 'qualification', required: true, maxLength: 2000 },
      { id: 'cv', required: false },
    ] satisfies FieldRule[],
    attachments: false,
  },
};

export const helpTypeLabels = {
  support: { ar: 'الدعم الفني' },
  'feature-request': { ar: 'طلب إضافة ميزة' },
  'report-issue': { ar: 'الإبلاغ عن مشكلة' },
} satisfies Record<string, LocalizedText>;
