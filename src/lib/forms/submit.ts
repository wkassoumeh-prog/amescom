import { adapterFor, type SubmissionAdapter } from "./adapter";
import { RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from "./limits";
import { formMode } from "./mode";
import {
  duplicateKey,
  isDuplicate,
  isRateLimited,
  recordAttempt,
  recordDuplicate,
  type TimestampStore,
} from "./stores";
import type { FormMode, SubmitResult } from "./types";
import { hasDisallowedAttachments, isHoneypotTriggered, validateEnquiry } from "./validate";

const rateStore: TimestampStore = new Map();
const duplicateStore: TimestampStore = new Map();

export type SubmitDeps = {
  mode?: FormMode;
  adapter?: SubmissionAdapter;
  rateStore?: TimestampStore;
  duplicateStore?: TimestampStore;
  now?: number;
  rateMax?: number;
  rateWindowMs?: number;
};

export async function submitEnquiry(
  raw: unknown,
  ip: string,
  deps: SubmitDeps = {},
): Promise<SubmitResult> {
  const mode = deps.mode ?? formMode();
  const rates = deps.rateStore ?? rateStore;
  const duplicates = deps.duplicateStore ?? duplicateStore;
  const now = deps.now ?? Date.now();
  const adapter = deps.adapter ?? adapterFor(mode);

  if (hasDisallowedAttachments(raw)) {
    return { status: "attachments-disabled" };
  }

  if (isHoneypotTriggered(raw)) {
    return { status: "spam" };
  }

  const parsed = validateEnquiry(raw);
  if (!parsed.ok) {
    return { status: "validation", fields: parsed.fields };
  }

  if (
    isRateLimited(
      rates,
      ip,
      now,
      deps.rateWindowMs ?? RATE_LIMIT_WINDOW_MS,
      deps.rateMax ?? RATE_LIMIT_MAX,
    )
  ) {
    return { status: "rate-limited" };
  }
  recordAttempt(rates, ip, now);

  const key = duplicateKey(parsed.value);
  if (isDuplicate(duplicates, key, now)) {
    return { status: "duplicate" };
  }

  let delivered;
  try {
    delivered = await adapter.submit(parsed.value);
  } catch {
    return { status: "failed" };
  }
  if (!delivered.ok) {
    if (delivered.reason === "disabled") return { status: "disabled" };
    return { status: "failed" };
  }

  recordDuplicate(duplicates, key, now);
  return { status: "accepted", id: delivered.id, mode: "mock" };
}
