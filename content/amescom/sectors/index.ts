import { productsById } from "../products";
import type { ProductContent, SectorContent } from "../types";
import { bankingFinance } from "./banking-finance";
import { healthcare } from "./healthcare";
import { industry } from "./industry";
import { insurance } from "./insurance";

export const sectors: SectorContent[] = [
  bankingFinance,
  insurance,
  healthcare,
  industry,
];

export const sectorsById = {
  "banking-finance": bankingFinance,
  insurance,
  healthcare,
  industry,
} as const;

export function previewSectors(): SectorContent[] {
  return sectors.filter((sector) => sector.publication.includeInPreview);
}

export function productionSectors(): SectorContent[] {
  return sectors.filter((sector) => sector.publication.status === "public");
}

export function sectorProducts(
  sector: SectorContent,
  mode: "preview" | "production",
): ProductContent[] {
  return sector.productIds
    .map((id) => productsById[id as keyof typeof productsById])
    .filter((product): product is ProductContent => Boolean(product))
    .filter((product) =>
      mode === "production"
        ? product.publication.status === "public"
        : product.publication.includeInPreview,
    );
}

export function sectorBySlug(slug: string): SectorContent | undefined {
  return sectors.find((sector) => sector.slug === slug);
}

export const sectorsOverview = {
  title: { ar: "قطاعات نخدمها" },
  summary: {
    ar: "نربط احتياج كل قطاع بالمنتجات المناسبة له. الربط أدناه مقترح للمراجعة حتى تتوفر حالات استخدام مؤكدة.",
  },
};

export const sectorPageCopy = {
  tasksTitle: { ar: "مهام هذا القطاع" },
  productsTitle: { ar: "المنتجات ذات الصلة" },
  caveatsTitle: { ar: "حدود الوصف" },
  proposedLabel: { ar: "مثال توضيحي" },
  suppliedLabel: { ar: "من وصف المنتج" },
  proposedNote: {
    ar: "حالات الاستخدام أدناه أمثلة تطبيق مقترحة، وليست دراسات عملاء منشورة، ما لم يُذكر أنها من وصف المنتج.",
  },
  allSectors: { ar: "كل القطاعات" },
} as const;
