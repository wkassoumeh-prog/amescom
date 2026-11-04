export type Locale = 'ar' | 'en';

/** Visitor-facing text. Arabic is required; other locales only once reviewed. */
export type LocalizedText = { ar: string; en?: string };

/**
 * draft: being written, preview only.
 * in-review: complete draft awaiting owner approval, preview only.
 * approved: may be emitted into production output.
 * held: deliberately withheld by an owner decision, private preview only.
 */
export type PublicationStatus = 'draft' | 'in-review' | 'approved' | 'held';

/**
 * pending: supplied by a source, awaiting owner/product confirmation.
 * approved: confirmed for publication.
 * held: withheld pending a specific owner decision.
 * excluded: must not appear in any visitor-facing text.
 */
export type ApprovalState = 'pending' | 'approved' | 'held' | 'excluded';

export type SourceId = 'S1' | 'S2' | 'S3' | 'S4' | 'S5';

export type Evidence = {
  source: SourceId;
  /** PDF page numbers, or the S1 section heading. */
  location: string;
};

export type ProductId = 'archive' | 'workflow' | 'clinical-pro' | 'frona-oprisk';
export type SectorId = 'banking-finance' | 'insurance' | 'healthcare' | 'industry';

export type Claim = {
  id: string;
  /** Products the claim applies to; `company` for company-wide statements. */
  scope: ProductId[] | 'company';
  /** Product version / edition / deployment the claim is valid for. */
  versionScope: string;
  /** supplied: described in a source. proposed: editorial use case or wording. */
  kind: 'supplied' | 'proposed';
  summary: string;
  evidence: Evidence[];
  approval: ApprovalState;
  owner: 'business-owner' | 'product-owner' | 'legal';
  questions: string[];
  notes?: string;
};

export type FeatureGroup = {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
  claimIds: string[];
};

export type Product = {
  id: ProductId;
  slug: string;
  status: PublicationStatus;
  /** Latin product name, rendered with LTR isolation inside Arabic text. */
  name: string;
  nameVariants?: string[];
  tagline: LocalizedText;
  summary: LocalizedText;
  intro: LocalizedText;
  audience: { text: LocalizedText; claimIds: string[] };
  featureGroups: FeatureGroup[];
  benefits?: { text: LocalizedText; claimIds: string[] }[];
  gettingStarted?: { title: LocalizedText; body: LocalizedText; claimIds: string[] }[];
  sectorIds: SectorId[];
  mediaIds: string[];
  /** Only set once publication rights and a current file are confirmed. */
  brochure: null | { file: string; language: Locale; sizeBytes: number };
};

export type UseCase = {
  id: string;
  title: LocalizedText;
  body: LocalizedText;
  /** Hidden automatically when none of these products is publishable. */
  productIds: ProductId[];
  /** Proposed application of supplied capabilities, not a customer story. */
  kind: 'proposed';
  claimIds: string[];
};

export type Sector = {
  id: SectorId;
  slug: string;
  status: PublicationStatus;
  title: LocalizedText;
  summary: LocalizedText;
  intro: LocalizedText;
  useCases: UseCase[];
  /** Ordered: the first product leads the page. */
  productIds: ProductId[];
  boundary?: LocalizedText;
};

export type MediaItem = {
  id: string;
  source: SourceId | 'original' | 'owner-supplied';
  location: string;
  description: string;
  classification:
    | 'illustration'
    | 'real-ui-probable'
    | 'real-ui-confirmed'
    | 'logo'
    | 'qr-code'
    | 'diagram-to-create'
    | 'non-amescom-branding';
  usageRights: 'unknown' | 'confirmed' | 'not-permitted';
  sensitiveDataCheck: 'not-checked' | 'synthetic' | 'contains-sample-data' | 'not-applicable';
  status: 'excluded' | 'requested' | 'to-create' | 'in-review' | 'approved';
  alt: LocalizedText | null;
  notes?: string;
};
