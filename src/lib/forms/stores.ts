import { createHash } from "node:crypto";
import { DUPLICATE_WINDOW_MS, RATE_LIMIT_MAX, RATE_LIMIT_WINDOW_MS } from "./limits";
import type { SanitizedEnquiry } from "./types";

export type TimestampStore = Map<string, number[]>;

export function duplicateKey(enquiry: SanitizedEnquiry): string {
  return createHash("sha256")
    .update(`${enquiry.kind}|${enquiry.email}|${enquiry.message}`)
    .digest("hex");
}

export function isRateLimited(
  store: TimestampStore,
  ip: string,
  now = Date.now(),
  windowMs = RATE_LIMIT_WINDOW_MS,
  max = RATE_LIMIT_MAX,
): boolean {
  const recent = (store.get(ip) ?? []).filter((stamp) => now - stamp < windowMs);
  store.set(ip, recent);
  return recent.length >= max;
}

export function recordAttempt(store: TimestampStore, ip: string, now = Date.now()): void {
  const recent = store.get(ip) ?? [];
  recent.push(now);
  store.set(ip, recent);
}

export function isDuplicate(
  store: TimestampStore,
  key: string,
  now = Date.now(),
  windowMs = DUPLICATE_WINDOW_MS,
): boolean {
  const recent = (store.get(key) ?? []).filter((stamp) => now - stamp < windowMs);
  store.set(key, recent);
  return recent.length > 0;
}

export function recordDuplicate(store: TimestampStore, key: string, now = Date.now()): void {
  const recent = store.get(key) ?? [];
  recent.push(now);
  store.set(key, recent);
}
