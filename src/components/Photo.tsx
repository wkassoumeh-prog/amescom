import Image from "next/image";
import type { VisualAsset } from "@/lib/visuals";
import styles from "./Photo.module.css";

export function Photo({
  asset,
  priority = false,
  zoom = false,
  sizes = "(min-width: 80rem) 72rem, 100vw",
  ratio = "16 / 9",
  className,
}: {
  asset: VisualAsset;
  priority?: boolean;
  zoom?: boolean;
  sizes?: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <figure className={[styles.figure, className].filter(Boolean).join(" ")}>
      <div
        className={[styles.frame, zoom ? styles.zoom : null].filter(Boolean).join(" ")}
        style={{ aspectRatio: ratio }}
      >
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes={sizes}
          priority={priority}
        />
      </div>
      <figcaption className={styles.caption}>{asset.caption}</figcaption>
    </figure>
  );
}
