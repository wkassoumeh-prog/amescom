"use client";

import { useEffect } from "react";

/** Enables motion CSS only after JS is available, so content stays visible without it. */
export function MotionRoot() {
  useEffect(() => {
    document.documentElement.classList.add("js-motion");
  }, []);

  return null;
}
