export const FIELD_LIMITS = {
  name: 120,
  company: 160,
  email: 254,
  phone: 32,
  message: 4000,
  version: 40,
  product: 64,
  sector: 64,
  kind: 32,
  website: 200,
} as const;

export const RATE_LIMIT_WINDOW_MS = 60_000;
export const RATE_LIMIT_MAX = 5;
export const DUPLICATE_WINDOW_MS = 10 * 60_000;
