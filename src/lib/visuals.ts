export type VisualAsset = {
  src: string;
  alt: string;
  caption: string;
};

const photoCaption =
  "صورة توضيحية أُعدّت للموقع، وليست لمقر أميسكوم أو لواجهة البرنامج.";

const diagramCaption =
  "مخطط توضيحي لمسار العمل، وليس لقطة من واجهة البرنامج.";

export const photos = {
  hero: {
    src: "/media/hero-paper-light.jpg",
    alt: "أوراق أرشيفية شبه شفافة تحت ضوء أزرق، صورة توضيحية",
    caption: photoCaption,
  },
  about: {
    src: "/media/about-workspace.jpg",
    alt: "طاولة اجتماعات فارغة في ضوء النهار، صورة توضيحية",
    caption: photoCaption,
  },
  products: {
    archive: {
      src: "/media/product-archive.jpg",
      alt: "رفوف ملفات ووثائق في غرفة حفظ، صورة توضيحية",
      caption: photoCaption,
    },
    workflow: {
      src: "/media/product-workflow.jpg",
      alt: "مجلدات مرتبة على مكتب للمراجعة والاعتماد، صورة توضيحية",
      caption: photoCaption,
    },
    "clinical-pro": {
      src: "/media/product-clinical.jpg",
      alt: "ممر عيادة فارغ، صورة توضيحية",
      caption: photoCaption,
    },
  },
  sectors: {
    "banking-finance": {
      src: "/media/sector-banking.jpg",
      alt: "مكتب عمليات مالية مع ملفات منظمة، صورة توضيحية",
      caption: photoCaption,
    },
    insurance: {
      src: "/media/sector-insurance.jpg",
      alt: "ملفات وثائق على طاولة خشبية، صورة توضيحية",
      caption: photoCaption,
    },
    healthcare: {
      src: "/media/sector-healthcare.jpg",
      alt: "استقبال عيادة فارغ، صورة توضيحية",
      caption: photoCaption,
    },
    industry: {
      src: "/media/sector-industry.jpg",
      alt: "ورشة صناعية فارغة مع مخططات تقنية، صورة توضيحية",
      caption: photoCaption,
    },
  },
} as const satisfies Record<string, VisualAsset | Record<string, VisualAsset>>;

export const diagrams = {
  hero: {
    src: "/diagrams/hero-lifecycle.svg",
    alt: "مخطط من الأرشفة إلى الاعتماد ثم تشغيل العيادة",
    caption: diagramCaption,
  },
  archive: {
    src: "/diagrams/archive-cycle.svg",
    alt: "مخطط التقاط الوثيقة ثم التعرّف والتصنيف والبحث",
    caption: diagramCaption,
  },
  workflow: {
    src: "/diagrams/workflow-routing.svg",
    alt: "مخطط طلب يمر بمراجعة ثم اعتماد أو إعادة",
    caption: diagramCaption,
  },
  "clinical-pro": {
    src: "/diagrams/clinical-modules.svg",
    alt: "مخطط وحدات المركز الطبي حول ملف المريض",
    caption: diagramCaption,
  },
  engagement: {
    src: "/diagrams/engagement.svg",
    alt: "مخطط من مناقشة الاحتياج إلى اختيار الحل ثم التنفيذ",
    caption: diagramCaption,
  },
} satisfies Record<string, VisualAsset>;

export function productPhoto(id: string): VisualAsset | undefined {
  if (id === "archive" || id === "workflow" || id === "clinical-pro") {
    return photos.products[id];
  }
  return undefined;
}

export function productDiagram(id: string): VisualAsset | undefined {
  if (id === "archive" || id === "workflow" || id === "clinical-pro") {
    return diagrams[id];
  }
  return undefined;
}

export function sectorPhoto(id: string): VisualAsset | undefined {
  if (
    id === "banking-finance" ||
    id === "insurance" ||
    id === "healthcare" ||
    id === "industry"
  ) {
    return photos.sectors[id];
  }
  return undefined;
}
