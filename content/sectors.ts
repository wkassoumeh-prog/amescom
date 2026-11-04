import type { Sector } from './types.ts';

/**
 * Use cases are proposed applications of each product's own supplied
 * capabilities (claim P-SECTOR-USE). ARCHIVE capabilities stay attached to
 * ARCHIVE use cases; they are not attributed to other products.
 */
export const sectors: Sector[] = [
  {
    id: 'banking-finance',
    slug: 'banking-finance',
    status: 'in-review',
    title: { ar: 'المصارف والمؤسسات المالية' },
    summary: { ar: 'أرشفة الوثائق المصرفية وتنظيم الموافقات ومتابعة المخاطر والضوابط.' },
    intro: {
      ar: 'تتعامل المصارف والمؤسسات المالية مع كمّ كبير من الوثائق والموافقات، وتحتاج إلى معرفة من اطّلع على كل ملف ومن اعتمده. تساعد حلول أميسكوم على أرشفة الوثائق وتنظيم مسارات المراجعة والاعتماد والاستعداد للتدقيق.',
    },
    useCases: [
      {
        id: 'retrieval',
        title: { ar: 'استرجاع الوثائق المصرفية' },
        body: {
          ar: 'أرشفة العقود والمراسلات والمستندات الممسوحة ضوئياً وتحويلها إلى محتوى قابل للبحث، مع صلاحيات تحدد من يمكنه الاطلاع على كل وثيقة.',
        },
        productIds: ['archive'],
        kind: 'proposed',
        claimIds: ['P-SECTOR-USE', 'C02-ocr', 'C02-search', 'C02-access'],
      },
      {
        id: 'approval-accountability',
        title: { ar: 'مساءلة واضحة في الموافقات' },
        body: {
          ar: 'تنظيم مسارات اعتماد الطلبات والمستندات بين الأقسام، مع سجل يوضح من راجع كل خطوة ومن اعتمدها.',
        },
        productIds: ['workflow'],
        kind: 'proposed',
        claimIds: ['P-SECTOR-USE', 'C03-designer', 'C03-access-audit'],
      },
      {
        id: 'risk-controls',
        title: { ar: 'متابعة المخاطر والضوابط' },
        body: {
          ar: 'توثيق المخاطر التشغيلية وربطها بالإجراءات الرقابية، ومتابعة مؤشرات المخاطر والأحداث والخسائر التشغيلية.',
        },
        productIds: ['frona-oprisk'],
        kind: 'proposed',
        claimIds: ['P-SECTOR-USE', 'C05-risk-profile', 'C05-kri', 'C05-audit-events'],
      },
      {
        id: 'audit-readiness',
        title: { ar: 'الاستعداد للتدقيق' },
        body: {
          ar: 'سجلات وتقارير توضح تاريخ العمليات على الوثائق والمستندات، تسهّل عمل فرق التدقيق الداخلي والخارجي.',
        },
        productIds: ['archive', 'workflow'],
        kind: 'proposed',
        claimIds: ['P-SECTOR-USE', 'C02-reports', 'C03-access-audit'],
      },
    ],
    productIds: ['archive', 'workflow', 'frona-oprisk'],
  },
  {
    id: 'insurance',
    slug: 'insurance',
    status: 'in-review',
    title: { ar: 'شركات التأمين' },
    summary: { ar: 'تنظيم وثائق التأمين وملفات المطالبات ومتابعة مراحل مراجعتها واعتمادها.' },
    intro: {
      ar: 'تتراكم في شركات التأمين وثائق التأمين وملفات المطالبات والعقود وملحقاتها، وتمر بمراحل مراجعة واعتماد بين أقسام متعددة. تساعد حلول أميسكوم على تنظيم هذه الوثائق ومتابعة مسارها.',
    },
    useCases: [
      {
        id: 'documents',
        title: { ar: 'تنظيم وثائق التأمين وملفات المطالبات' },
        body: {
          ar: 'أرشفة وثائق التأمين وملفات المطالبات والعقود والتقارير المرفقة بها، والبحث فيها بالكلمات المفتاحية وبالنصوص الواردة داخلها.',
        },
        productIds: ['archive'],
        kind: 'proposed',
        claimIds: ['P-SECTOR-USE', 'C02-classify', 'C02-search'],
      },
      {
        id: 'review-handoffs',
        title: { ar: 'متابعة مسار المراجعة والاعتماد' },
        body: {
          ar: 'تنظيم مسار الملف من الاستلام إلى المراجعة والاعتماد ثم الأرشفة، وتحسين التنسيق بين أقسام الاكتتاب والمطالبات والشؤون القانونية والمالية.',
        },
        productIds: ['workflow'],
        kind: 'proposed',
        claimIds: ['P-SECTOR-USE', 'C03-designer', 'C03-lifecycle', 'C03-notifications'],
      },
      {
        id: 'risk-oversight',
        title: { ar: 'الرقابة على المخاطر التشغيلية' },
        body: {
          ar: 'توثيق المخاطر التشغيلية وربطها بالضوابط، ومتابعة الالتزام بالسياسات الداخلية عبر التقييم الذاتي والمؤشرات.',
        },
        productIds: ['frona-oprisk'],
        kind: 'proposed',
        claimIds: ['P-SECTOR-USE', 'C05-risk-profile', 'C05-governance-rcsa', 'C05-kri'],
      },
    ],
    productIds: ['archive', 'workflow', 'frona-oprisk'],
    boundary: {
      ar: 'تركّز هذه الحلول على إدارة الوثائق ومسارات العمل، وتعمل إلى جانب أنظمة إصدار وثائق التأمين ومعالجة المطالبات المعتمدة لديكم، ولا تحلّ محلّها.',
    },
  },
  {
    id: 'healthcare',
    slug: 'healthcare',
    status: 'in-review',
    title: { ar: 'المراكز الطبية والعيادات' },
    summary: { ar: 'إدارة الاستقبال والعيادات والمخبر والأشعة في منصة واحدة مع ملف موحّد للمريض.' },
    intro: {
      ar: 'يحتاج المركز الطبي إلى تنسيق يومي بين الاستقبال والعيادات والمخبر والأشعة. يجمع AMESCOM Clinical PRO هذه الأقسام في منصة واحدة، مع ملف موحّد لكل مريض وتقارير تدعم الإدارة.',
    },
    useCases: [
      {
        id: 'reception',
        title: { ar: 'تنظيم الاستقبال والمواعيد' },
        body: { ar: 'جدولة المواعيد وإدارة الدور لتخفيف الازدحام في الاستقبال وتنظيم يوم العمل.' },
        productIds: ['clinical-pro'],
        kind: 'proposed',
        claimIds: ['P-SECTOR-USE', 'C04-reception'],
      },
      {
        id: 'patient-file',
        title: { ar: 'ملف موحّد للمريض' },
        body: {
          ar: 'زيارات المريض ونتائج تحاليله وصور أشعته في ملف واحد، يطّلع عليه كل قسم حسب صلاحياته.',
        },
        productIds: ['clinical-pro'],
        kind: 'proposed',
        claimIds: ['P-SECTOR-USE', 'C04-patient-file'],
      },
      {
        id: 'departments',
        title: { ar: 'ربط العيادات بالمخبر والأشعة' },
        body: { ar: 'تنتقل طلبات التحاليل والأشعة ونتائجها بين الأقسام إلكترونياً دون أوراق.' },
        productIds: ['clinical-pro'],
        kind: 'proposed',
        claimIds: ['P-SECTOR-USE', 'C04-lab', 'C04-imaging'],
      },
      {
        id: 'management',
        title: { ar: 'تقارير للإدارة' },
        body: { ar: 'متابعة الأداء والإيرادات وحركة المرضى عبر لوحات متابعة وتقارير.' },
        productIds: ['clinical-pro'],
        kind: 'proposed',
        claimIds: ['P-SECTOR-USE', 'C04-reports'],
      },
      {
        id: 'archive-complement',
        title: { ar: 'أرشفة الوثائق الإدارية' },
        body: {
          ar: 'يمكن استخدام AMESCOM ARCHIVE حلاً مكمّلاً لأرشفة الوثائق الورقية والإدارية للمركز في أرشيف رقمي قابل للبحث.',
        },
        productIds: ['archive'],
        kind: 'proposed',
        claimIds: ['P-SECTOR-USE', 'C02-ocr', 'C02-search'],
      },
    ],
    productIds: ['clinical-pro', 'archive'],
  },
  {
    id: 'industry',
    slug: 'industry',
    status: 'in-review',
    title: { ar: 'المؤسسات الصناعية' },
    summary: { ar: 'أرشفة عقود التوريد وسجلات الجودة والصيانة وتنظيم اعتماد أوامر الشراء.' },
    intro: {
      ar: 'في المؤسسات الصناعية تتوالد الوثائق والموافقات بسرعة: عقود التوريد، وأوامر الشراء، وتقارير الجودة، وسجلات الصيانة، وشهادات المطابقة. تساعد حلول أميسكوم على تنظيم هذه الوثائق ومتابعة اعتمادها بين الأقسام.',
    },
    useCases: [
      {
        id: 'records',
        title: { ar: 'أرشيف رقمي للعقود وسجلات الجودة والصيانة' },
        body: {
          ar: 'تحويل أرشيف المؤسسة من عقود وأوامر شراء وتقارير جودة وسجلات صيانة إلى أرشيف رقمي منظم وقابل للبحث.',
        },
        productIds: ['archive'],
        kind: 'proposed',
        claimIds: ['P-SECTOR-USE', 'C02-ocr', 'C02-classify', 'C02-search'],
      },
      {
        id: 'purchase-approvals',
        title: { ar: 'اعتماد الطلبات وأوامر الشراء' },
        body: {
          ar: 'تنظيم مسار الطلب أو أمر الشراء بين المشتريات والمخازن والإنتاج والجودة والمالية، من الإنشاء إلى الاعتماد والأرشفة.',
        },
        productIds: ['workflow'],
        kind: 'proposed',
        claimIds: ['P-SECTOR-USE', 'C03-designer', 'C03-lifecycle'],
      },
      {
        id: 'sensitive-information',
        title: { ar: 'ضبط الوصول إلى المعلومات الحساسة' },
        body: {
          ar: 'صلاحيات تحدد من يمكنه الاطلاع على المخططات ومواصفات المنتجات وعقود الموردين أو تعديلها.',
        },
        productIds: ['archive'],
        kind: 'proposed',
        claimIds: ['P-SECTOR-USE', 'C02-access'],
      },
      {
        id: 'operational-risk',
        title: { ar: 'متابعة المخاطر التشغيلية' },
        body: {
          ar: 'توثيق المخاطر التشغيلية وربطها بالضوابط، وتسجيل الأحداث التشغيلية وتحليل أسبابها.',
        },
        productIds: ['frona-oprisk'],
        kind: 'proposed',
        claimIds: ['P-SECTOR-USE', 'C05-risk-profile', 'C05-audit-events'],
      },
    ],
    productIds: ['archive', 'workflow', 'frona-oprisk'],
    boundary: {
      ar: 'تركّز هذه الحلول على الوثائق ومسارات الاعتماد، ولا تشمل أنظمة تخطيط موارد المؤسسة أو إدارة الإنتاج أو التحكم الصناعي.',
    },
  },
];

export const sectorsById = new Map(sectors.map((sector) => [sector.id, sector]));
