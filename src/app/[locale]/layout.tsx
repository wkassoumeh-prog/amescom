import type { ReactNode } from "react";
import { SiteChrome } from "@/components/SiteChrome";
import { LOCALES, parseLocale, type Locale } from "@/lib/locale";

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const locale: Locale = parseLocale((await params).locale);

  return <SiteChrome locale={locale}>{children}</SiteChrome>;
}
