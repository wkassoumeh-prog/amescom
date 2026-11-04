import type { Claim } from "./types";

/**
 * Private claim register. Approval flags stay out of the visitor UI.
 * Public copy may only use claims whose approval is not `held-omit`.
 */
export const claims: Claim[] = [
  {
    id: "C01",
    kind: "company-fact",
    productIds: [],
    versionScope: "company",
    summary: "Amescom founded in 2004.",
    evidence: [{ source: "S1", locator: "About" }],
    approval: "pending",
    publicWordingAr: "تأسست أميسكوم عام 2004.",
    notes: "Suitable after owner confirmation (Q21). Used in About only when confirmed.",
  },
  {
    id: "C02",
    kind: "supplied-description",
    productIds: ["archive"],
    versionScope: "unspecified",
    summary:
      "ARCHIVE: Arabic OCR, document recognition/classification, versioning, attachments, keyword and full-text search, access controls, encryption, activity audit.",
    evidence: [{ source: "S2", locator: "p2" }],
    approval: "pending",
    publicWordingAr:
      "أرشفة إلكترونية وتنظيم للوثائق، مع البحث والتعرّف الضوئي على النصوص العربية وإدارة الإصدارات والصلاحيات وسجل العمليات.",
    notes: "No invented accuracy rate. Keep scoped to ARCHIVE only.",
  },
  {
    id: "C03",
    kind: "supplied-description",
    productIds: ["workflow"],
    versionScope: "unspecified",
    summary:
      "Workflow: visual drag-and-drop approvals, branching, assignment, document storage/search, email and in-app notifications, time/bottleneck reports, audit trail, integration with ERP/CRM/accounting.",
    evidence: [
      { source: "S4", locator: "p1–2" },
      { source: "S4", locator: "p3 implementation steps" },
    ],
    approval: "pending",
    publicWordingAr:
      "نظّم مسارات المراجعة والاعتماد، وتابع المهام والمستندات بين أقسام مؤسستك، مع إشعارات وتقارير وسجل تدقيق.",
    notes: "Named ERP/CRM products are unspecified; keep generic. Signing method unconfirmed.",
  },
  {
    id: "C04",
    kind: "supplied-description",
    productIds: ["clinical-pro"],
    versionScope: "unspecified",
    summary:
      "Clinical PRO modules: reception/queues, clinics, medical laboratory, radiology/panorama; unified patient file; department links; management reports on performance, revenue and patient movement.",
    evidence: [
      { source: "S3", locator: "p2–3" },
      { source: "S3", locator: "p4 suitability" },
    ],
    approval: "pending",
    publicWordingAr:
      "منصة لإدارة الاستقبال والعيادات والمخبر والأشعة، مع ملف موحّد للمريض وتقارير تدعم الإدارة.",
    notes: "Do not add online booking, insurance, HL7/FHIR/DICOM or patient portal.",
  },
  {
    id: "C05",
    kind: "supplied-description",
    productIds: ["frona-oprisk"],
    versionScope: "unspecified",
    summary:
      "FRONA: operational-risk profiles, inherent/residual risk, control gaps, recommendations, suggestions, governance reports, RCSA, risk-based audit, operational events/losses, KRIs, configurable matrices, multilingual/multicurrency, PDF/Excel/Word reports.",
    evidence: [
      { source: "S5", locator: "pp1–7 visual review" },
      { source: "S1", locator: "Products navigation" },
    ],
    approval: "pending",
    publicWordingAr:
      "أدوات لإدارة المخاطر التشغيلية وتقييم الضوابط ومتابعة المؤشرات والتقارير.",
    notes:
      "The owner explicitly requests FRONA in the Amescom product lineup (2026-11-04). Use the name FRONA; S5 third-party branding remains excluded.",
  },
  {
    id: "C06",
    kind: "security-compliance",
    productIds: ["archive"],
    versionScope: "unspecified",
    summary:
      "ISO/IEC 27001 alignment, AES-256 at rest, TLS 1.3 in transit, RBAC/ABAC, immutable logs even for administrators.",
    evidence: [
      { source: "S2", locator: "pp3–4" },
      { source: "S1", locator: "sector pages (repeated)" },
    ],
    approval: "held-omit",
    notes:
      "Alignment is not certification. Needs product/version/deployment evidence (Q13). Do not copy onto other products.",
  },
  {
    id: "C07",
    kind: "quantitative",
    productIds: ["archive"],
    versionScope: "unspecified",
    summary: "Sub-second search regardless of data size / millions of documents in seconds.",
    evidence: [
      { source: "S2", locator: "p4" },
      { source: "S2", locator: "p2 search blurb" },
      { source: "S1", locator: "sector pages" },
    ],
    approval: "held-omit",
    notes: "Omit absolute/speed wording until benchmarks exist. Public copy may say documents can be searched.",
  },
  {
    id: "C08",
    kind: "quantitative",
    productIds: ["workflow"],
    versionScope: "unspecified",
    summary: "Up to 80% reduction in document-cycle time.",
    evidence: [{ source: "S4", locator: "p3" }],
    approval: "held-omit",
    notes: "Omit unless a publishable measurement supports it (Q15).",
  },
  {
    id: "C09",
    kind: "supplied-description",
    productIds: ["archive"],
    versionScope: "unspecified",
    summary:
      "Advanced historical/complex Arabic OCR (Ruq'ah, Naskh, old/overlapping print) and fully automatic extraction without human review.",
    evidence: [
      { source: "S2", locator: "p4" },
      { source: "S1", locator: "sector pages" },
    ],
    approval: "held-omit",
    notes: "Confirm supported inputs, limits and review steps before detailed claims (Q11).",
  },
  {
    id: "C10",
    kind: "vendor-relationship",
    productIds: [],
    versionScope: "services",
    summary: "Information-security services including ESET antivirus and firewalls.",
    evidence: [{ source: "S1", locator: "Services" }],
    approval: "pending",
    publicWordingAr:
      "أنظمة أمن المعلومات، بما فيها النظام المضاد للفيروسات من شركة ESET وأجهزة جدران الحماية.",
    notes:
      "A-05 allows the ESET name. Do not claim partner/reseller status or use the ESET logo until confirmed (Q22).",
  },
  {
    id: "C11",
    kind: "security-compliance",
    productIds: ["frona-oprisk"],
    versionScope: "unspecified",
    summary:
      "FRONA can link risk files to Basel Committee operational-event classifications and business lines.",
    evidence: [{ source: "S5", locator: "p3" }],
    approval: "held-omit",
    notes: "Hold Basel-related mappings until Q18. Do not imply regulatory approval.",
  },
  {
    id: "C12",
    kind: "quantitative",
    productIds: ["workflow"],
    versionScope: "unspecified",
    summary: "Automated processes eliminate errors; GPS-like tracking metaphor.",
    evidence: [{ source: "S4", locator: "p1 and p3" }],
    approval: "held-omit",
    notes: "Absolute error-elimination language omitted. GPS metaphor not used in public copy.",
  },
  {
    id: "C13",
    kind: "company-fact",
    productIds: [],
    versionScope: "company",
    summary: "Public contact: info@amescom.com, +963 11 33 44 805, Damascus, www.amescom.com.",
    evidence: [
      { source: "S1", locator: "Contact/footer" },
      { source: "S2", locator: "p1" },
      { source: "S3", locator: "p1" },
    ],
    approval: "pending",
    publicWordingAr:
      "البريد الإلكتروني: info@amescom.com — الهاتف: ‎+963 11 33 44 805 — دمشق، سورية.",
    notes: "Q21 must confirm current details and whether a street address is published.",
  },
  {
    id: "C14",
    kind: "company-fact",
    productIds: [],
    versionScope: "company",
    summary: "Facebook page https://www.facebook.com/AMeSCom/",
    evidence: [{ source: "S1", locator: "footer" }],
    approval: "pending",
    notes: "A-05 allows the Facebook name. Confirm it is the official current profile (Q21) before linking.",
  },
  {
    id: "C15",
    kind: "proposed-use-case",
    productIds: ["archive", "workflow", "frona-oprisk"],
    versionScope: "unspecified",
    summary: "Banking/insurance/industry mappings from S1 sector copy.",
    evidence: [{ source: "S1", locator: "Sectors" }],
    approval: "pending",
    notes:
      "S1 repeats ARCHIVE OCR/security across sectors. Public sector pages use proposed examples, not packaged-solution claims, until Q20.",
  },
];

export const claimsById = Object.fromEntries(
  claims.map((claim) => [claim.id, claim]),
) as Record<string, Claim>;

export function publicClaimIds(): string[] {
  return claims
    .filter((claim) => claim.approval !== "held-omit")
    .map((claim) => claim.id);
}
