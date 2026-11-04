import { pages, siteName } from "@content/metadata";
import type { Locale } from "@content/types";
import { absoluteUrl, indexingEnabled } from "./site";

export function metaFor(route: string, locale: Locale) {
  const page = pages.find((item) => item.route === route);
  const title = page?.title[locale] ?? siteName.ar;
  const description = page?.description[locale];
  const canonical = absoluteUrl(route);
  const index = indexingEnabled() && page?.publication === "public";

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical,
    },
    robots: { index, follow: index },
    openGraph: {
      type: "website" as const,
      locale: locale === "ar" ? "ar_SY" : "en_US",
      url: canonical,
      siteName: siteName.ar,
      title,
      description,
    },
  };
}

export function contactHref(
  locale: Locale,
  context?: { product?: string; sector?: string },
): string {
  const params = new URLSearchParams();
  if (context?.product) params.set("product", context.product);
  if (context?.sector) params.set("sector", context.sector);
  const query = params.toString();
  return query ? `/${locale}/contact?${query}` : `/${locale}/contact`;
}
