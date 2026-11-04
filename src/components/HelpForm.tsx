"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { formCopy, helpForm, type HelpType } from "@content/forms";
import { navigableProducts } from "@content/products";
import type { Locale } from "@content/types";
import { Button } from "./Button";
import { Honeypot } from "./forms/Honeypot";
import { SelectField } from "./forms/SelectField";
import { TextArea } from "./forms/TextArea";
import { TextInput } from "./forms/TextInput";
import { postEnquiry } from "@/lib/forms/client";
import { FIELD_LIMITS } from "@/lib/forms/limits";
import { fieldErrorMessage, noticeForMode, resultMessage } from "@/lib/forms/messages";
import type { EnquiryKind, FieldErrorCode, FormMode, SubmitResult } from "@/lib/forms/types";
import styles from "./ContactForm.module.css";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  version: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

export function HelpForm({
  locale,
  mode,
  helpType,
}: {
  locale: Locale;
  mode: FormMode;
  helpType: HelpType;
}) {
  const products = navigableProducts();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: "",
    version: "",
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  const selectedProduct = useMemo(
    () => products.find((item) => item.id === values.product),
    [products, values.product],
  );

  function setField<K extends keyof FormState>(name: K, value: FormState[K]) {
    setValues((current) => ({ ...current, [name]: value }));
    setResult(null);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const honeypot = new FormData(event.currentTarget).get("website");
    setPending(true);
    setErrors({});
    const next = await postEnquiry({
      kind: helpType.id as EnquiryKind,
      ...values,
      website: typeof honeypot === "string" ? honeypot : "",
    });
    setPending(false);
    setResult(next);
    if (next.status === "validation") {
      const nextErrors: Errors = {};
      for (const [field, code] of Object.entries(next.fields)) {
        nextErrors[field as keyof FormState] = fieldErrorMessage(code as FieldErrorCode, locale);
      }
      setErrors(nextErrors);
      queueMicrotask(() => {
        formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
      });
    }
  }

  const statusText = pending
    ? formCopy.pending[locale]
    : result
      ? resultMessage(result, locale)
      : "";
  const statusTone =
    result && ["failed", "spam", "rate-limited", "validation", "attachments-disabled"].includes(result.status)
      ? "error"
      : "info";

  return (
    <form
      ref={formRef}
      className={styles.form}
      noValidate
      onSubmit={onSubmit}
      aria-busy={pending}
    >
      <p className={styles.notice}>{noticeForMode(mode, locale)}</p>
      <p className={styles.context}>
        نوع الطلب: {helpType.label[locale]}
        {selectedProduct ? (
          <>
            {" — "}
            المنتج: <span className="ltr-isolate">{selectedProduct.name}</span>
          </>
        ) : null}
      </p>
      <input type="hidden" name="helpType" value={helpType.id} />
      <Honeypot />

      <TextInput
        id="help-name"
        locale={locale}
        label={helpForm.fields[0].label[locale]}
        required
        name="name"
        autoComplete="name"
        maxLength={FIELD_LIMITS.name}
        value={values.name}
        error={errors.name}
        onChange={(event) => setField("name", event.target.value)}
      />
      <TextInput
        id="help-company"
        locale={locale}
        label={helpForm.fields[1].label[locale]}
        required
        name="company"
        autoComplete="organization"
        maxLength={FIELD_LIMITS.company}
        value={values.company}
        error={errors.company}
        onChange={(event) => setField("company", event.target.value)}
      />
      <TextInput
        id="help-email"
        locale={locale}
        label={helpForm.fields[2].label[locale]}
        required
        name="email"
        type="email"
        autoComplete="email"
        isolateLtr
        maxLength={FIELD_LIMITS.email}
        value={values.email}
        error={errors.email}
        onChange={(event) => setField("email", event.target.value)}
      />
      <TextInput
        id="help-phone"
        locale={locale}
        label={helpForm.fields[3].label[locale]}
        optional
        name="phone"
        autoComplete="tel"
        isolateLtr
        maxLength={FIELD_LIMITS.phone}
        value={values.phone}
        onChange={(event) => setField("phone", event.target.value)}
      />
      <SelectField
        id="help-product"
        locale={locale}
        label={helpForm.fields[5].label[locale]}
        optional
        isolateLtr
        name="product"
        value={values.product}
        error={errors.product}
        onChange={(event) => setField("product", event.target.value)}
        options={[
          { value: "", label: "—" },
          ...products.map((item) => ({ value: item.id, label: item.name })),
        ]}
      />
      <TextInput
        id="help-version"
        locale={locale}
        label={helpForm.fields[6].label[locale]}
        optional
        name="version"
        isolateLtr
        maxLength={FIELD_LIMITS.version}
        value={values.version}
        error={errors.version}
        onChange={(event) => setField("version", event.target.value)}
      />
      <TextArea
        id="help-message"
        locale={locale}
        label={helpType.messageLabel[locale]}
        hint={helpType.messageHint[locale]}
        required
        name="message"
        maxLength={FIELD_LIMITS.message}
        value={values.message}
        error={errors.message}
        onChange={(event) => setField("message", event.target.value)}
      />

      <p className="muted">{formCopy.attachmentDisabled[locale]}</p>
      <p className="muted">{formCopy.attachmentGuidance[locale]}</p>

      {statusText ? (
        <div className={styles.status} role="status" aria-live="polite" data-tone={statusTone}>
          {statusText}
        </div>
      ) : (
        <div className="visually-hidden" role="status" aria-live="polite" />
      )}

      <Button type="submit" variant="primary" disabled={pending}>
        {pending ? formCopy.pending[locale] : formCopy.submit[locale]}
      </Button>
    </form>
  );
}
