import styles from "./Wordmark.module.css";

const LOGO_SRC = "/media/amescom-logo.svg";
const LOGO_WIDTH = 809;
const LOGO_HEIGHT = 137;

export function Wordmark() {
  return (
    <span className={styles.wordmark} translate="no">
      <img
        className={styles.logo}
        src={LOGO_SRC}
        alt=""
        width={LOGO_WIDTH}
        height={LOGO_HEIGHT}
        decoding="async"
        fetchPriority="high"
      />
    </span>
  );
}
