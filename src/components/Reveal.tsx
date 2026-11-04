"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealKind = "single" | "stagger" | "hero";

export function Reveal({
  kind = "single",
  className,
  children,
  as: Tag = "div",
}: {
  kind?: RevealKind;
  className?: string;
  children: ReactNode;
  as?: "div" | "section" | "ul";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || kind === "hero") {
      const frame = requestAnimationFrame(() => node.classList.add("is-in"));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-in");
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [kind]);

  return (
    <Tag
      ref={(node: HTMLElement | null) => {
        ref.current = node;
      }}
      data-reveal={kind}
      className={className}
    >
      {children}
    </Tag>
  );
}
