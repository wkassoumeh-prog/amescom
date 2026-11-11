export type TypeOverride = {
  family?: string;
  size?: string;
  color?: string;
};

export type TypeSnapshot = {
  family: string;
  size: number;
  color: string;
};

export type ElementBox = {
  top: number;
  left: number;
  width: number;
  height: number;
};

const SKIPPED = new Set(["SCRIPT", "STYLE", "NOSCRIPT", "HEAD", "HTML", "BODY"]);

export function normalize(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function isInsideTweak(node: EventTarget | null): boolean {
  return node instanceof Element && Boolean(node.closest("[data-tweak-root]"));
}

export function targetElement(target: EventTarget | null): HTMLElement | null {
  if (!(target instanceof Element) || isInsideTweak(target)) return null;
  let node: Element | null = target;
  while (node && !(node instanceof HTMLElement)) node = node.parentElement;
  if (!(node instanceof HTMLElement) || SKIPPED.has(node.tagName) || isInsideTweak(node)) return null;
  return node;
}

/** Stable CSS path used to find the same element again after a client navigation. */
export function cssPath(element: Element): string {
  const parts: string[] = [];
  let node: Element | null = element;
  while (node && node !== document.body && node !== document.documentElement) {
    let part = node.tagName.toLowerCase();
    if (node.id) {
      parts.unshift(`${part}#${CSS.escape(node.id)}`);
      break;
    }
    const parent = node.parentElement;
    if (parent) {
      const sameTag = Array.from(parent.children).filter((child) => child.tagName === node!.tagName);
      if (sameTag.length > 1) part += `:nth-of-type(${sameTag.indexOf(node) + 1})`;
    }
    parts.unshift(part);
    node = node.parentElement;
  }
  return parts.join(" > ");
}

export function elementFromPath(path: string): HTMLElement | null {
  if (!path) return null;
  try {
    const found = document.querySelector(path);
    return found instanceof HTMLElement && !isInsideTweak(found) ? found : null;
  } catch {
    return null;
  }
}

export function toHex(color: string): string {
  const value = color.trim().toLowerCase();
  if (/^#[0-9a-f]{6}$/.test(value)) return value;
  if (/^#[0-9a-f]{3}$/.test(value)) {
    return `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`;
  }
  const match = value.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/);
  if (!match) return "#17191c";
  const channel = (channelValue: string) =>
    Math.max(0, Math.min(255, Math.round(Number(channelValue))))
      .toString(16)
      .padStart(2, "0");
  return `#${channel(match[1])}${channel(match[2])}${channel(match[3])}`;
}

export function readTypography(element: HTMLElement): TypeSnapshot {
  const computed = getComputedStyle(element);
  const inlineFamily = normalize(element.style.getPropertyValue("font-family"));
  const size = Number.parseFloat(computed.fontSize);
  return {
    family: inlineFamily || computed.fontFamily,
    size: Number.isFinite(size) ? Math.round(size) : 16,
    color: toHex(computed.color),
  };
}

export function applyOverride(element: HTMLElement, override: TypeOverride): void {
  if (override.family) {
    const family = normalize(override.family);
    if (normalize(element.style.getPropertyValue("font-family")) !== family) {
      element.style.setProperty("font-family", family);
    }
  }
  if (override.size && element.style.getPropertyValue("font-size").trim() !== override.size) {
    element.style.setProperty("font-size", override.size);
  }
  if (override.color) {
    const color = override.color.toLowerCase();
    if (element.style.getPropertyValue("color").trim().toLowerCase() !== color) {
      element.style.setProperty("color", color);
    }
  }
}

export function clearTypography(element: HTMLElement): void {
  element.style.removeProperty("font-family");
  element.style.removeProperty("font-size");
  element.style.removeProperty("color");
}

export function rectOf(element: Element): ElementBox {
  const rect = element.getBoundingClientRect();
  return { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
}

export function elementLabel(element: Element): { tag: string; text: string } {
  const text = (element.textContent ?? "").replace(/\s+/g, " ").trim();
  return { tag: element.tagName.toLowerCase(), text: text.slice(0, 80) };
}

export function quoteFamily(name: string): string {
  const trimmed = name.trim().replace(/^['"]|['"]$/g, "");
  if (!trimmed) return name.trim();
  return /\s/.test(trimmed) ? `"${trimmed}"` : trimmed;
}
