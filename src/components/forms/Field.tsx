import type { ReactNode } from "react";
import { formCopy } from "@content/forms";
import type { Locale } from "@content/types";
import styles from "./Field.module.css";

type FieldProps = {
  id: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  locale: Locale;
  children: ReactNode;
};

export function Field({
  id,
  label,
  required,
  optional,
  hint,
  error,
  locale,
  children,
}: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        <span>{label}</span>
        {optional ? (
          <span className={styles.optional}>{formCopy.optionalMark[locale]}</span>
        ) : null}
        {required ? (
          <span className="visually-hidden"> ({locale === "ar" ? "مطلوب" : "required"})</span>
        ) : null}
      </label>
      <div data-describedby={describedBy}>{children}</div>
      {hint ? (
        <p className={styles.hint} id={hintId}>
          {hint}
        </p>
      ) : null}
      {error ? (
        <p className={styles.error} id={errorId} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function describedByFromField(id: string, hint?: string, error?: string): string | undefined {
  const ids = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean);
  return ids.length ? ids.join(" ") : undefined;
}
