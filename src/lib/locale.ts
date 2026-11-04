import { notFound } from "next/navigation";
import { DEFAULT_LOCALE, LOCALES, type Locale } from "@content/types";

export { DEFAULT_LOCALE, LOCALES, type Locale };

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function parseLocale(value: string): Locale {
  if (!isLocale(value)) notFound();
  return value;
}

export function directionFor(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function localePath(locale: Locale, path = ""): string {
  const suffix = path.replace(/^\/+/, "");
  return suffix ? `/${locale}/${suffix}` : `/${locale}`;
}
