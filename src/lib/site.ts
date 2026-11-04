import { company } from "@content/company";
import { pages } from "@content/metadata";

/**
 * Preview stays noindex until all of: production content mode, explicit
 * indexing flag, and an approved public privacy notice (Q31).
 */
type Env = Record<string, string | undefined>;

export function indexingEnabled(env: Env = process.env): boolean {
  if (env.AMESCOM_INDEXING !== "public") return false;
  if (env.AMESCOM_CONTENT_MODE !== "production") return false;
  const privacy = pages.find((page) => page.route === "/ar/privacy");
  return privacy?.publication === "public";
}

export function siteOrigin(env: Env = process.env): string {
  const fromEnv = env.AMESCOM_SITE_URL?.trim();
  const raw = fromEnv && fromEnv.length > 0 ? fromEnv : company.website;
  return raw.replace(/\/$/, "");
}

export function absoluteUrl(pathname: string, env: Env = process.env): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${siteOrigin(env)}${path}`;
}

export function robotsDocument(env: Env = process.env) {
  if (!indexingEnabled(env)) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/ar/design-preview", "/api/"],
    },
    sitemap: `${siteOrigin(env)}/sitemap.xml`,
  };
}
