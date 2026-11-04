import { company } from "@content/company";
import styles from "./Wordmark.module.css";

export function Wordmark() {
  return (
    <span className={styles.wordmark} translate="no">
      <span className={styles.ar}>{company.publicName.ar}</span>
      <span className={`ltr-isolate ${styles.en}`} aria-hidden="true">
        {company.publicName.enLatin}
      </span>
    </span>
  );
}
