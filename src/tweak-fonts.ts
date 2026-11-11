import type { TweakFont } from "@/tweak";

/** Families already loaded by the site. Add a row after the page loads the font. */
export const amescomTweakFonts: TweakFont[] = [
  { label: "El Messiri", family: "var(--font-display-face), sans-serif" },
  { label: "Noto Sans Arabic", family: "var(--font-arabic), sans-serif" },
  { label: "Amiri", family: "var(--font-amiri), serif" },
  { label: "Inter", family: "var(--font-latin), sans-serif" },
  { label: "Dubai", family: '"Dubai", sans-serif' },
];
