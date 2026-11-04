"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { contactForm, formCopy } from "@content/forms";
import { navigableProducts } from "@content/products";
import { previewSectors } from "@content/sectors";
import type { Locale } from "@content/types";
import { Button } from "./Button";
import { Honeypot } from "./forms/Honeypot";
import { SelectField } from "./forms/SelectField";
import { TextArea } from "./forms/TextArea";
import { TextInput } from "./forms/TextInput";
import { postEnquiry } from "@/lib/forms/client";
import { FIELD_LIMITS } from "@/lib/forms/limits";
import { fieldErrorMessage, noticeForMode, resultMessage } from "@/lib/forms/messages";
import type { FieldErrorCode, FormMode, SubmitResult } from "@/lib/forms/types";
import styles from "./ContactForm.module.css";

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  product: string;
  sector: string;
  message: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

export function ContactForm({
  locale,
  mode,
  initialProduct = "",
  initialSector = "",
}: {
  locale: Locale;
  mode: FormMode;
  initialProduct?: string;
  initialSector?: string;
}) {
  const products = navigableProducts();
  const sectors = previewSectors();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    product: initialProduct,
    sector: initialSector,
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  const selectedProduct = useMemo(
    () => products.find((item) => item.id === values.product),
    [products, values.product],
  );
  const selectedSector = useMemo(
    () => sectors.find((item) => item.id === values.sector),
    [sectors, values.sector],
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
      kind: "contact",
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
      {selectedProduct || selectedSector ? (
        <p className={styles.context}>
          {selectedProduct ? (
            <>
              المنتج:{" "}
              <span className="ltr-isolate">{selectedProduct.name}</span>
            </>
          ) : null}
          {selectedProduct && selectedSector ? " — " : null}
          {selectedSector ? <>القطاع: {selectedSector.name[locale]}</> : null}
        </p>
      ) : null}

      <Honeypot />

      <TextInput
        id="contact-name"
        locale={locale}
        label={contactForm.fields[0].label[locale]}
        required
        name="name"
        autoComplete="name"
        maxLength={FIELD_LIMITS.name}
        value={values.name}
        error={errors.name}
        onChange={(event) => setField("name", event.target.value)}
      />
      <TextInput
        id="contact-company"
        locale={locale}
        label={contactForm.fields[1].label[locale]}
        required
        name="company"
        autoComplete="organization"
        maxLength={FIELD_LIMITS.company}
        value={values.company}
        error={errors.company}
        onChange={(event) => setField("company", event.target.value)}
      />
      <TextInput
        id="contact-email"
        locale={locale}
        label={contactForm.fields[2].label[locale]}
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
        id="contact-phone"
        locale={locale}
        label={contactForm.fields[3].label[locale]}
        optional
        name="phone"
        autoComplete="tel"
        isolateLtr
        maxLength={FIELD_LIMITS.phone}
        value={values.phone}
        onChange={(event) => setField("phone", event.target.value)}
      />
      <SelectField
        id="contact-product"
        locale={locale}
        label={contactForm.fields[4].label[locale]}
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
      <SelectField
        id="contact-sector"
        locale={locale}
        label={contactForm.fields[5].label[locale]}
        optional
        name="sector"
        value={values.sector}
        error={errors.sector}
        onChange={(event) => setField("sector", event.target.value)}
        options={[
          { value: "", label: "—" },
          ...sectors.map((item) => ({ value: item.id, label: item.name[locale] })),
        ]}
      />
      <TextArea
        id="contact-message"
        locale={locale}
        label={contactForm.fields[6].label[locale]}
        required
        name="message"
        maxLength={FIELD_LIMITS.message}
        value={values.message}
        error={errors.message}
        onChange={(event) => setField("message", event.target.value)}
      />

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
