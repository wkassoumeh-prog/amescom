export const ENQUIRY_KINDS = [
  "contact",
  "support",
  "feature-request",
  "report-issue",
] as const;

export type EnquiryKind = (typeof ENQUIRY_KINDS)[number];

export type EnquiryInput = {
  kind: EnquiryKind;
  name: string;
  company: string;
  email: string;
  phone?: string;
  product?: string;
  sector?: string;
  version?: string;
  message: string;
  website?: string;
  attachments?: unknown;
};

export type FieldErrorCode = "required" | "invalid-email" | "too-long" | "unknown-value";

export type SubmitResult =
  | { status: "accepted"; id: string; mode: "mock" }
  | { status: "validation"; fields: Partial<Record<string, FieldErrorCode>> }
  | { status: "rate-limited" }
  | { status: "duplicate" }
  | { status: "disabled" }
  | { status: "failed" }
  | { status: "spam" }
  | { status: "attachments-disabled" };

export type SanitizedEnquiry = {
  kind: EnquiryKind;
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  sector: string;
  version: string;
  message: string;
};

export type FormMode = "mock" | "disabled";
