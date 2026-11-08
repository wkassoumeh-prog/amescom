"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type HeroFontPreviewMode = "default" | "amiri" | "dubai";

type HeroFontPreviewValue = {
  font: HeroFontPreviewMode;
  setFont: (font: HeroFontPreviewMode) => void;
};

const HeroFontPreviewContext = createContext<HeroFontPreviewValue | null>(null);

export function HeroFontPreviewProvider({ children }: { children: ReactNode }) {
  const [font, setFont] = useState<HeroFontPreviewMode>("default");
  const value = useMemo<HeroFontPreviewValue>(() => ({ font, setFont }), [font]);

  return <HeroFontPreviewContext.Provider value={value}>{children}</HeroFontPreviewContext.Provider>;
}

const fallback: HeroFontPreviewValue = {
  font: "default",
  setFont: () => {},
};

export function useHeroFontPreview(): HeroFontPreviewValue {
  return useContext(HeroFontPreviewContext) ?? fallback;
}
