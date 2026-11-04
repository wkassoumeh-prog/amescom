import { mkdir, appendFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";
import type { FormMode, SanitizedEnquiry } from "./types";

export type AdapterResult =
  | { ok: true; id: string }
  | { ok: false; reason: "disabled" | "failed" };

export interface SubmissionAdapter {
  readonly id: FormMode;
  submit(enquiry: SanitizedEnquiry): Promise<AdapterResult>;
}

export function createDisabledAdapter(): SubmissionAdapter {
  return {
    id: "disabled",
    async submit() {
      return { ok: false, reason: "disabled" };
    },
  };
}

export function createMockAdapter(options?: {
  fail?: boolean;
  persist?: boolean;
  filePath?: string;
}): SubmissionAdapter {
  const accepted: string[] = [];
  return {
    id: "mock",
    async submit(enquiry) {
      if (options?.fail) return { ok: false, reason: "failed" };
      const id = randomUUID();
      accepted.push(id);
      if (options?.persist) {
        const filePath = options.filePath ?? join(process.cwd(), ".data", "enquiries.jsonl");
        await mkdir(dirname(filePath), { recursive: true });
        const line = JSON.stringify({
          id,
          kind: enquiry.kind,
          product: enquiry.product,
          sector: enquiry.sector,
          createdAt: new Date().toISOString(),
          name: enquiry.name,
          company: enquiry.company,
          email: enquiry.email,
          phone: enquiry.phone,
          version: enquiry.version,
          message: enquiry.message,
        });
        await appendFile(filePath, `${line}\n`, "utf8");
      }
      return { ok: true, id };
    },
  };
}

export function adapterFor(mode: FormMode, options?: { fail?: boolean }): SubmissionAdapter {
  if (mode === "disabled") return createDisabledAdapter();
  return createMockAdapter({ persist: true, fail: options?.fail });
}

/** Safe log payload: never includes names, emails or message bodies. */
export function loggableAcceptance(kind: string, id: string, mode: FormMode) {
  return { event: "enquiry.accepted", kind, id, mode };
}
