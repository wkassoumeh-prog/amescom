/**
 * Amescom content model. Arabic lives in `ar` keys only.
 * Do not add empty `en` strings — missing locales must not emit pages.
 */

export type Locale = "ar";

export type Localized<T> = Record<Locale, T>;

export type PublicationStatus = "public" | "draft" | "held";

export type ConfirmationStatus =
  | "owner-confirmed"
  | "pending"
  | "held-omit"
  | "proposed";

export type ClaimKind =
  | "company-fact"
  | "supplied-description"
  | "proposed-use-case"
  | "quantitative"
  | "security-compliance"
  | "vendor-relationship";

export type MediaKind =
  | "logo"
  | "real-ui-screenshot"
  | "likely-real-ui"
  | "illustration"
  | "diagram"
  | "photo"
  | "brochure"
  | "source-branding";

export type SourceId = "S1" | "S2" | "S3" | "S4" | "S5" | "blueprint" | "owner" | "original";

export interface EvidenceRef {
  source: SourceId;
  locator: string;
  note?: string;
}

export interface Publication {
  status: PublicationStatus;
  includeInNavigation: boolean;
  includeInSitemap: boolean;
  includeInPreview: boolean;
}

export interface Claim {
  id: string;
  kind: ClaimKind;
  productIds: string[];
  versionScope: string;
  summary: string;
  evidence: EvidenceRef[];
  approval: ConfirmationStatus;
  publicWordingAr?: string;
  notes: string;
}

export interface MediaItem {
  id: string;
  kind: MediaKind;
  source: EvidenceRef;
  description: string;
  altAr: string;
  usageRights: "unknown" | "pending-original" | "do-not-publish" | "approved";
  sensitiveDataCheck: "not-applicable" | "unverified" | "synthetic-required";
  publication: PublicationStatus;
  notes: string;
}

export interface FeatureGroup {
  id: string;
  claimIds: string[];
  title: Localized<string>;
  body: Localized<string>;
}

export interface ProductContent {
  id: "archive" | "workflow" | "clinical-pro" | "frona-oprisk";
  slug: string;
  publication: Publication;
  name: string;
  nameAr?: string;
  tagline: Localized<string>;
  summary: Localized<string>;
  audience: Localized<string>;
  problem: Localized<string>;
  featureGroups: FeatureGroup[];
  sectorIds: string[];
  claimIds: string[];
  mediaIds: string[];
  ctaHref: string;
  brochureMediaId?: string;
}

export interface SectorUseCase {
  id: string;
  kind: "supplied-description" | "proposed-example";
  claimIds: string[];
  title: Localized<string>;
  body: Localized<string>;
}

export interface SectorContent {
  id: string;
  slug: string;
  publication: Publication;
  name: Localized<string>;
  summary: Localized<string>;
  productIds: string[];
  useCases: SectorUseCase[];
  caveats: Localized<string[]>;
}

export interface NavItem {
  id: string;
  href: string;
  label: Localized<string>;
  publication: Publication;
  children?: NavItem[];
}

export function canEmitPublic(publication: Publication): boolean {
  return (
    publication.status === "public" &&
    publication.includeInNavigation
  );
}

export function canEmitPreview(publication: Publication): boolean {
  return publication.includeInPreview;
}

export const LOCALES: readonly Locale[] = ["ar"] as const;
export const DEFAULT_LOCALE: Locale = "ar";
