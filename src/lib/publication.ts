import { pages, type PageMeta } from "@content/metadata";
import { previewProducts, productionProducts } from "@content/products";
import { previewSectors, productionSectors } from "@content/sectors";
import type { ProductContent, Publication, SectorContent } from "@content/types";

export type ContentMode = "preview" | "production";

/** Preview is the default. Production emits only `public` content. */
export function contentMode(): ContentMode {
  return process.env.AMESCOM_CONTENT_MODE === "production" ? "production" : "preview";
}

export function canRenderPublication(publication: Publication): boolean {
  if (contentMode() === "production") {
    return publication.status === "public";
  }
  return publication.includeInPreview;
}

export function listedProducts(): ProductContent[] {
  if (contentMode() === "production") {
    return productionProducts().filter((product) => product.publication.includeInNavigation);
  }
  return previewProducts().filter(
    (product) =>
      product.publication.includeInNavigation && product.publication.status !== "held",
  );
}

export function routableProducts(): ProductContent[] {
  return contentMode() === "production" ? productionProducts() : previewProducts();
}

export function listedSectors(): SectorContent[] {
  if (contentMode() === "production") {
    return productionSectors().filter((sector) => sector.publication.includeInNavigation);
  }
  return previewSectors().filter((sector) => sector.publication.includeInNavigation);
}

export function routableSectors(): SectorContent[] {
  return contentMode() === "production" ? productionSectors() : previewSectors();
}

export function productionSitemapPages(): PageMeta[] {
  return pages.filter((page) => page.publication === "public");
}
