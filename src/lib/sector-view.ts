import { claimsById } from "@content/claims";
import type { Locale, ProductContent, SectorContent, SectorUseCase } from "@content/types";
import { listedProducts } from "@/lib/publication";

export function publicSectorUseCases(
  sector: SectorContent,
  locale: Locale,
): SectorUseCase[] {
  const fronaListed = listedProducts().some((product) => product.id === "frona-oprisk");
  return sector.useCases.filter((useCase) => {
    if (useCase.claimIds.some((id) => claimsById[id]?.approval === "held-omit")) {
      return false;
    }
    if (!fronaListed && (useCase.claimIds.includes("C05") || /FRONA/.test(useCase.body[locale]))) {
      return false;
    }
    return true;
  });
}

export function mappedSectorProducts(sector: SectorContent): ProductContent[] {
  const listed = listedProducts();
  return sector.productIds
    .map((id) => listed.find((product) => product.id === id))
    .filter((product): product is ProductContent => Boolean(product));
}
