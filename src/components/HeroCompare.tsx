"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type HeroMediaMode = "video" | "image";

type HeroCompareValue = {
  mode: HeroMediaMode;
  toggle: () => void;
};

const HeroCompareContext = createContext<HeroCompareValue | null>(null);

export function HeroCompareProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<HeroMediaMode>("video");
  const value = useMemo<HeroCompareValue>(
    () => ({
      mode,
      toggle: () => setMode((current) => (current === "video" ? "image" : "video")),
    }),
    [mode],
  );

  return <HeroCompareContext.Provider value={value}>{children}</HeroCompareContext.Provider>;
}

const fallback: HeroCompareValue = {
  mode: "video",
  toggle: () => {},
};

export function useHeroCompare(): HeroCompareValue {
  return useContext(HeroCompareContext) ?? fallback;
}
