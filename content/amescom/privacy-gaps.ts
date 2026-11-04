/**
 * Private tracker. Do not render this file, or the S1 privacy template, on the site.
 * Source template contains placeholders and features that are not in launch scope.
 */

export const privacyGaps = {
  sourceTemplate: "S1 Privacy — do not publish verbatim",
  blockers: [
    {
      id: "P-entity",
      question: "Q31",
      item: "Legal entity that operates the site (Arabic and English).",
    },
    {
      id: "P-updated",
      question: "Q31",
      item: "Last-updated date for the notice.",
    },
    {
      id: "P-purposes",
      question: "Q31",
      item: "Actual processing purposes matching live forms only (contact, maybe help/careers).",
    },
    {
      id: "P-processors",
      question: "Q08, Q09",
      item: "Hosting, email/CRM/helpdesk providers and storage locations.",
    },
    {
      id: "P-retention",
      question: "Q31, Q29",
      item: "Enquiry retention and unsuccessful-application retention periods.",
    },
    {
      id: "P-deletion",
      question: "Q31",
      item: "Contact for access/correction/deletion requests.",
    },
    {
      id: "P-uploads",
      question: "Q28",
      item: "Whether CVs or support attachments are processed at all.",
    },
  ],
  outOfScopeUntilSelected: [
    "Newsletter subscription (S1 mentions it; P-09 default is none).",
    "Advertising cookies and traffic analytics (P-09).",
    "Demo / quote / job-title fields beyond the agreed contact form.",
    "Portfolio, LinkedIn and skills fields from the S1 privacy draft (careers uses the minimal set).",
    "Automatic browsing-data collection statements until a tracker is approved.",
    "Source wording that data transfer 'cannot be 100% guaranteed' as a liability dump — legal owner to rewrite.",
  ],
  draftPublicStatement:
    "A privacy page exists only after these gaps are filled and the owner approves the text. Until then the route is held.",
  launchBlocker: {
    id: "LB-privacy",
    status: "blocking-launch",
    summary:
      "No approved privacy notice (Q31). The source template must not be published. Indexing stays off until this is public.",
  },
  currentOperations: [
    "No analytics, advertising tags, newsletters, chat widgets or tracking cookies are installed (P-09, Q32 unanswered).",
    "Contact and help forms use a local mock or disabled adapter; no live email/CRM/helpdesk provider is configured (Q09).",
    "Mock acceptances may be written to a local gitignored file for tests; production send is disabled.",
    "Attachments and CV upload are disabled (FR-07 / Q28).",
    "No public careers application form (Q29).",
    "Server logs record enquiry kind, id and mode only — not names, emails or message bodies.",
  ],
};

export const privacyHeldCopy = {
  title: { ar: "سياسة الخصوصية" },
  lead: {
    ar: "لم تُعتمد سياسة خصوصية بعد. هذه الصفحة ليست إشعاراً قانونياً، ولا نعرض هنا مسودة المصدر ولا أي حقول غير مكتملة.",
  },
  tracking: {
    ar: "هذه المعاينة لا تستخدم أدوات تحليل أو إعلانات أو ملفات تعريف ارتباط للتتبع.",
  },
  forms: {
    ar: "نماذج الاتصال والمساعدة في المعاينة تُحفظ محلياً للاختبار أو تُعطَّل، ولا تُرسل إلى أنظمة أميسكوم حتى يُعتمد مسار استلام.",
  },
  uploads: {
    ar: "رفع الملفات غير متاح. لا توجد استمارة توظيف عامة حالياً.",
  },
  blocker: {
    ar: "لا يمكن نشر الموقع للعامة قبل اعتماد نص سياسة الخصوصية من الجهة المالكة.",
  },
  contact: { ar: "لأسئلة حول البيانات في هذه المعاينة، راسل" },
};
