import type { TypeOverride } from "./dom";

export type PanelPosition = { x: number; y: number };

type Stored = {
  position?: PanelPosition;
  collapsed?: boolean;
  overrides?: Record<string, TypeOverride>;
};

export const defaultStorageKey = "tweak:v1";

function read(key: string): Stored {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Stored;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function write(key: string, next: Stored): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(next));
  } catch {
    // Private mode or a full quota. The live edit still applies for this page view.
  }
}

function sanitizeOverride(value: unknown): TypeOverride | null {
  if (!value || typeof value !== "object") return null;
  const record = value as TypeOverride;
  const override: TypeOverride = {};
  if (typeof record.family === "string" && record.family.trim()) override.family = record.family;
  if (typeof record.size === "string" && record.size.trim()) override.size = record.size;
  if (typeof record.color === "string" && record.color.trim()) override.color = record.color;
  return override;
}

export function loadPosition(key: string): PanelPosition | null {
  const position = read(key).position;
  if (!position || !Number.isFinite(position.x) || !Number.isFinite(position.y)) return null;
  return { x: position.x, y: position.y };
}

export function savePosition(position: PanelPosition, key: string): void {
  write(key, { ...read(key), position });
}

export function loadCollapsed(key: string): boolean {
  return read(key).collapsed === true;
}

export function saveCollapsed(collapsed: boolean, key: string): void {
  write(key, { ...read(key), collapsed });
}

export function loadOverrides(key: string): Record<string, TypeOverride> {
  const overrides = read(key).overrides;
  if (!overrides || typeof overrides !== "object") return {};
  const safe: Record<string, TypeOverride> = {};
  for (const [path, value] of Object.entries(overrides)) {
    const override = sanitizeOverride(value);
    if (override && (override.family || override.size || override.color)) safe[path] = override;
  }
  return safe;
}

export function saveOverride(path: string, override: TypeOverride, key: string): void {
  const stored = read(key);
  write(key, { ...stored, overrides: { ...stored.overrides, [path]: override } });
}

export function deleteOverride(path: string, key: string): void {
  const stored = read(key);
  const overrides = { ...stored.overrides };
  delete overrides[path];
  write(key, { ...stored, overrides });
}
