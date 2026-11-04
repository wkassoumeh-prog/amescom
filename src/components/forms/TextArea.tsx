import type { TextareaHTMLAttributes } from "react";
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
} & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id">;

export function TextArea({
  id,
  label,
  locale,
  required,
  optional,
  hint,
  error,
  className,
  ...inputProps
}: Props) {
  const describedBy = describedByFromField(id, hint, error);

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
      <textarea
        id={id}
        className={[fieldStyles.control, fieldStyles.textarea, className]
          .filter(Boolean)
          .join(" ")}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        {...inputProps}
      />
    </Field>
  );
}
