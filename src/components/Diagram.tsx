import type { VisualAsset } from "@/lib/visuals";
import styles from "./Diagram.module.css";

export function Diagram({ asset }: { asset: VisualAsset }) {
  return (
    <figure className={styles.figure}>
      {/* SVG illustrations are not optimized by next/image. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className={styles.image} src={asset.src} alt={asset.alt} width="800" height="420" />
      <figcaption className={styles.caption}>{asset.caption}</figcaption>
    </figure>
  );
}
