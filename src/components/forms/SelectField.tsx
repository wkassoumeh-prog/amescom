import type { SelectHTMLAttributes } from "react";
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
  options: { value: string; label: string }[];
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "id">;

export function SelectField({
  id,
  label,
  locale,
  required,
  optional,
  hint,
  error,
  isolateLtr,
  options,
  className,
  ...selectProps
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
      <select
        id={id}
        className={[fieldStyles.control, isolateLtr ? "ltr-isolate" : "", className]
          .filter(Boolean)
          .join(" ")}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        dir={isolateLtr ? "ltr" : undefined}
        {...selectProps}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </Field>
  );
}
