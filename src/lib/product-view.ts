import { claimsById } from "@content/claims";
import { mediaById } from "@content/media";
import { previewSectors } from "@content/sectors";
import type {
  Claim,
  FeatureGroup,
  Locale,
  MediaItem,
  ProductContent,
  SectorContent,
  SectorUseCase,
} from "@content/types";

function claimAllowed(id: string): boolean {
  return claimsById[id]?.approval !== "held-omit";
}

export function visibleFeatureGroups(product: ProductContent): FeatureGroup[] {
  return product.featureGroups.filter((group) => group.claimIds.every(claimAllowed));
}

export function relatedSectors(
  product: ProductContent,
  locale: Locale,
): { sector: SectorContent; useCases: SectorUseCase[] }[] {
  const productClaims = new Set(product.claimIds);

  return previewSectors()
    .filter((sector) => product.sectorIds.includes(sector.id) && sector.publication.includeInPreview)
    .map((sector) => ({
      sector,
      useCases: sector.useCases.filter((useCase) => {
        if (!useCase.claimIds.every(claimAllowed)) return false;
        if (!useCase.claimIds.some((id) => productClaims.has(id))) return false;
        if (product.id !== "frona-oprisk") {
          if (useCase.claimIds.includes("C05")) return false;
          if (/FRONA/.test(useCase.body[locale])) return false;
        }
        return true;
      }),
    }))
    .filter((entry) => entry.useCases.length > 0);
}

export function approvedBrochure(product: ProductContent): MediaItem | null {
  if (!product.brochureMediaId) return null;
  const item = mediaById[product.brochureMediaId];
  if (!item) return null;
  if (item.usageRights !== "approved" || item.publication !== "public") return null;
  return item;
}

export function confirmedTechnicalClaims(product: ProductContent): Claim[] {
  return product.claimIds
    .map((id) => claimsById[id])
    .filter(
      (claim): claim is Claim =>
        Boolean(claim) &&
        claim.kind === "security-compliance" &&
        claim.approval === "owner-confirmed",
    );
}
