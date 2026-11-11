"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useHeroCompare } from "@/components/HeroCompare";
import styles from "./HomeExperience.module.css";

export type HomeSlide = {
  src: string;
  alt: string;
  position?: string;
};

const VIDEO_START_SECONDS = 1;
/** Matches HomeExperience mobile layout; hero video is desktop-only. */
const HERO_VIDEO_MIN_WIDTH_MQ = "(min-width: 701px)";

function useHeroVideoViewport(): boolean {
  const [eligible, setEligible] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(HERO_VIDEO_MIN_WIDTH_MQ);
    const sync = () => setEligible(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return eligible;
}

export function HomeHero({
  slides,
  videoSrc,
  children,
}: {
  slides: HomeSlide[];
  videoSrc?: string;
  children: ReactNode;
}) {
  const { mode } = useHeroCompare();
  const videoViewport = useHeroVideoViewport();
  const framed = Boolean(videoSrc) && mode === "video" && videoViewport;
  const [copyReady, setCopyReady] = useState(false);
  const revealCopy = useCallback(() => setCopyReady(true), []);

  useEffect(() => {
    if (!framed) {
      setCopyReady(true);
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setCopyReady(reduce);
  }, [framed, videoSrc]);

  return (
    <section
      className={[
        styles.hero,
        styles.heroShell,
        framed ? styles.heroFramed : "",
        copyReady ? styles.heroCopyReady : "",
      ]
        .filter(Boolean)
        .join(" ")}
      aria-labelledby="home-heading"
    >
      <div className={styles.heroStage}>
        <HomeHeroMedia
          slides={slides}
          videoSrc={videoSrc}
          onEnded={revealCopy}
          allowVideo={videoViewport}
        />
        <div className={styles.heroShade} />
        {children}
      </div>
    </section>
  );
}

export function HomeHeroMedia({
  slides,
  videoSrc,
  onEnded,
  allowVideo = true,
}: {
  slides: HomeSlide[];
  videoSrc?: string;
  onEnded?: () => void;
  /** When false (e.g. narrow screens), slideshow images are used instead of video. */
  allowVideo?: boolean;
}) {
  const { mode } = useHeroCompare();
  const showVideo = Boolean(videoSrc) && mode === "video" && allowVideo;
  const videoRef = useRef<HTMLVideoElement>(null);
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
    if (showVideo || reduceMotion || slides.length < 2) return;
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, 7000);
    return () => window.clearInterval(timer);
  }, [reduceMotion, showVideo, slides.length]);

  useEffect(() => {
    const video = videoRef.current;
    if (!showVideo || !video) return;

    let cancelled = false;
    let removeFinish = () => {};

    const begin = () => {
      if (cancelled) return;
      const duration = video.duration;
      const start = Number.isFinite(duration)
        ? Math.min(VIDEO_START_SECONDS, Math.max(0, duration - 0.05))
        : VIDEO_START_SECONDS;
      const finish = () => {
        if (cancelled || !Number.isFinite(video.duration) || video.currentTime < video.duration - 0.2) return;
        onEnded?.();
      };
      video.addEventListener("ended", finish);
      removeFinish = () => video.removeEventListener("ended", finish);
      if (Math.abs(video.currentTime - start) > 0.05) video.currentTime = start;
      video.play().catch((error: unknown) => {
        if (cancelled || (error instanceof DOMException && error.name === "AbortError")) return;
        onEnded?.();
      });
    };

    if (video.readyState >= 1) begin();
    else video.addEventListener("loadedmetadata", begin);

    return () => {
      cancelled = true;
      video.removeEventListener("loadedmetadata", begin);
      removeFinish();
      video.pause();
    };
  }, [onEnded, showVideo, videoSrc]);

  return (
    <div className={styles.heroMedia} aria-hidden="true">
      {showVideo && videoSrc ? (
        <video
          ref={videoRef}
          className={styles.heroVideo}
          src={`${videoSrc}#t=${VIDEO_START_SECONDS}`}
          autoPlay
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
        />
      ) : (
        slides.map((slide, slideIndex) => (
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
        ))
      )}
    </div>
  );
}
