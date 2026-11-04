import { products } from "@content/products";
import { sectors } from "@content/sectors";
import { FIELD_LIMITS } from "./limits";
import { ENQUIRY_KINDS, type EnquiryInput, type FieldErrorCode, type SanitizedEnquiry } from "./types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PRODUCT_IDS = new Set(products.map((item) => item.id));
const SECTOR_IDS = new Set(sectors.map((item) => item.id));

function trim(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function tooLong(value: string, max: number): boolean {
  return value.length > max;
}

export function validateEnquiry(raw: unknown):
  | { ok: true; value: SanitizedEnquiry }
  | { ok: false; fields: Partial<Record<string, FieldErrorCode>> } {
  const input = (raw ?? {}) as EnquiryInput;
  const fields: Partial<Record<string, FieldErrorCode>> = {};

  const kind = trim(input.kind);
  const name = trim(input.name);
  const company = trim(input.company);
  const email = trim(input.email);
  const phone = trim(input.phone);
  const product = trim(input.product);
  const sector = trim(input.sector);
  const version = trim(input.version);
  const message = trim(input.message);
  const website = trim(input.website);

  if (!ENQUIRY_KINDS.includes(kind as EnquiryInput["kind"])) {
    fields.kind = "unknown-value";
  } else if (tooLong(kind, FIELD_LIMITS.kind)) {
    fields.kind = "too-long";
  }

  if (!name) fields.name = "required";
  else if (tooLong(name, FIELD_LIMITS.name)) fields.name = "too-long";

  if (!company) fields.company = "required";
  else if (tooLong(company, FIELD_LIMITS.company)) fields.company = "too-long";

  if (!email) fields.email = "required";
  else if (tooLong(email, FIELD_LIMITS.email) || !EMAIL_PATTERN.test(email)) {
    fields.email = "invalid-email";
  }

  if (tooLong(phone, FIELD_LIMITS.phone)) fields.phone = "too-long";
  if (tooLong(version, FIELD_LIMITS.version)) fields.version = "too-long";
  if (tooLong(website, FIELD_LIMITS.website)) fields.website = "too-long";

  if (product && !PRODUCT_IDS.has(product as typeof products[number]["id"])) {
    fields.product = "unknown-value";
  }
  if (sector && !SECTOR_IDS.has(sector)) fields.sector = "unknown-value";

  if (!message) fields.message = "required";
  else if (tooLong(message, FIELD_LIMITS.message)) fields.message = "too-long";

  if (Object.keys(fields).length > 0) return { ok: false, fields };

  return {
    ok: true,
    value: {
      kind: kind as SanitizedEnquiry["kind"],
      name,
      company,
      email,
      phone,
      product,
      sector,
      version,
      message,
    },
  };
}

export function isHoneypotTriggered(raw: unknown): boolean {
  const input = (raw ?? {}) as EnquiryInput;
  return trim(input.website).length > 0;
}

export function hasDisallowedAttachments(raw: unknown): boolean {
  const input = (raw ?? {}) as EnquiryInput;
  if (input.attachments == null) return false;
  if (Array.isArray(input.attachments)) return input.attachments.length > 0;
  return Boolean(input.attachments);
}
