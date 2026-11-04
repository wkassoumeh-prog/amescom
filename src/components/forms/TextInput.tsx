import type { InputHTMLAttributes } from "react";
import fieldStyles from "./Field.module.css";
import { Field, describedByFromField } from "./Field";
import type { Locale } from "@content/types";

type Props = {
  id: string;
  label: string;
  locale: Locale;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  error?: string;
  isolateLtr?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "id">;

export function TextInput({
  id,
  label,
  locale,
  required,
  optional,
  hint,
  error,
  isolateLtr,
  className,
  spellCheck,
  type,
  ...inputProps
}: Props) {
  const describedBy = describedByFromField(id, hint, error);
  const disableSpell = type === "email" || type === "tel";

  return (
    <Field
      id={id}
      label={label}
      locale={locale}
      required={required}
      optional={optional}
      hint={hint}
      error={error}
    >
      <input
        id={id}
        type={type}
        className={[fieldStyles.control, isolateLtr ? "ltr-isolate" : "", className]
          .filter(Boolean)
          .join(" ")}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        dir={isolateLtr ? "ltr" : undefined}
        spellCheck={disableSpell ? false : spellCheck}
        {...inputProps}
      />
    </Field>
  );
}
