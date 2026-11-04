import { company } from "@content/company";
import type { Locale, ProductContent } from "@content/types";
import { siteOrigin } from "./site";

export function organizationJsonLd(origin = siteOrigin()) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: company.publicName.enLatin,
    alternateName: company.publicName.ar,
    url: origin,
    email: company.email,
    telephone: company.phoneDisplay,
    address: {
      "@type": "PostalAddress",
      addressLocality: "دمشق",
      addressCountry: "SY",
    },
  };
}

export function productJsonLd(
  product: ProductContent,
  locale: Locale,
  origin = siteOrigin(),
) {
  if (product.publication.status === "held") return null;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: product.name,
    description: product.summary[locale],
    url: `${origin}/ar/products/${product.slug}`,
    applicationCategory: "BusinessApplication",
    provider: {
      "@type": "Organization",
      name: company.publicName.enLatin,
      alternateName: company.publicName.ar,
      url: origin,
    },
  };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
