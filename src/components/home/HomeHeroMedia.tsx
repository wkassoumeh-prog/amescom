"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./HomeExperience.module.css";

export type HomeSlide = {
  src: string;
  alt: string;
  position?: string;
};

export function HomeHeroMedia({ slides }: { slides: HomeSlide[] }) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reduceMotion || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [reduceMotion, slides.length]);

  return (
    <div className={styles.heroMedia} aria-hidden="true">
      {slides.map((slide, slideIndex) => (
        <Image
          key={slide.src}
          className={`${styles.heroSlide} ${slideIndex === index ? styles.heroSlideActive : ""}`}
          src={slide.src}
          alt=""
          fill
          sizes="100vw"
          style={slide.position ? { objectPosition: slide.position } : undefined}
          priority={slideIndex === 0}
        />
      ))}
    </div>
  );
}
