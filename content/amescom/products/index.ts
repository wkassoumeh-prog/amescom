import type { Localized, ProductContent } from "../types";
import { archive } from "./archive";
import { clinicalPro } from "./clinical-pro";
import { fronaOprisk } from "./frona-oprisk";
import { workflow } from "./workflow";

export const productsOverview = {
  title: { ar: "المنتجات" } satisfies Localized<string>,
  summary: {
    ar: "كل منتج يؤدي عملاً مختلفاً: أرشفة الوثائق، مسارات الاعتماد، تشغيل المركز الطبي، أو إدارة المخاطر التشغيلية. اختر المنتج ثم تواصل معنا لمناقشة احتياج مؤسستك.",
  } satisfies Localized<string>,
};

export const productPageCopy = {
  heldNotice: { ar: "مسودة خاصة. غير مدرجة في التصفح العام." },
  audienceLabel: { ar: "لمن هذا المنتج" },
  problemTitle: { ar: "المشكلة التي يعالجها" },
  featuresTitle: { ar: "القدرات" },
  sectorsTitle: { ar: "قطاعات ذات صلة" },
  proposedNote: {
    ar: "الربط أدناه أمثلة تطبيق مقترحة، وليست دراسات عملاء منشورة.",
  },
  allProducts: { ar: "كل المنتجات" },
} as const;

export const products: ProductContent[] = [
  archive,
  workflow,
  clinicalPro,
  fronaOprisk,
];

export const productsById = {
  archive,
  workflow,
  "clinical-pro": clinicalPro,
  "frona-oprisk": fronaOprisk,
} as const;

export function previewProducts(): ProductContent[] {
  return products.filter((product) => product.publication.includeInPreview);
}

export function navigableProducts(): ProductContent[] {
  return products.filter(
    (product) =>
      product.publication.status !== "held" &&
      product.publication.includeInNavigation,
  );
}

export function productionProducts(): ProductContent[] {
  return products.filter((product) => product.publication.status === "public");
}

export function productBySlug(slug: string): ProductContent | undefined {
  return products.find((product) => product.slug === slug);
}
