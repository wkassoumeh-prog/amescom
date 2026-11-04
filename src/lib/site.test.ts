import { describe, expect, it } from "vitest";
import { indexingEnabled, robotsDocument, siteOrigin } from "./site";
import { organizationJsonLd, productJsonLd } from "./structured-data";
import { products } from "@content/products";

describe("indexing and robots", () => {
  it("keeps indexing off in preview even if the indexing flag is set", () => {
    expect(
      indexingEnabled({
        AMESCOM_INDEXING: "public",
        AMESCOM_CONTENT_MODE: "preview",
      }),
    ).toBe(false);
  });

  it("keeps indexing off in production until the privacy notice is public", () => {
    expect(
      indexingEnabled({
        AMESCOM_INDEXING: "public",
        AMESCOM_CONTENT_MODE: "production",
      }),
    ).toBe(false);
  });

  it("disallows all crawlers while indexing is off", () => {
    const robots = robotsDocument({});
    expect(robots.rules).toEqual({ userAgent: "*", disallow: "/" });
    expect("sitemap" in robots).toBe(false);
  });

  it("emits no sitemap URLs while indexing is off", async () => {
    const { default: sitemap } = await import("@/app/sitemap");
    expect(await sitemap()).toEqual([]);
  });

  it("uses the documented site origin by default", () => {
    expect(siteOrigin({})).toBe("https://www.amescom.com");
  });

  it("accepts an origin override without a trailing slash", () => {
    expect(siteOrigin({ AMESCOM_SITE_URL: "https://example.test/" })).toBe(
      "https://example.test",
    );
  });
});

describe("structured data", () => {
  it("describes only visible organization facts", () => {
    const data = JSON.stringify(organizationJsonLd("https://www.amescom.com"));
    expect(data).toContain("Amescom");
    expect(data).toContain("أميسكوم");
    expect(data).toContain("info@amescom.com");
    expect(data).not.toContain("2004");
    expect(data).not.toContain("facebook");
    expect(data).not.toContain("FRONA");
  });

  it("describes FRONA as an included Amescom product", () => {
    const frona = products.find((item) => item.id === "frona-oprisk");
    expect(frona).toBeTruthy();
    if (!frona) return;
    expect(productJsonLd(frona, "ar")).toMatchObject({
      name: "FRONA",
      provider: { name: "Amescom" },
    });
  });

  it("describes a listed product without offers or unconfirmed facts", () => {
    const archive = products.find((item) => item.id === "archive");
    expect(archive).toBeTruthy();
    if (!archive) return;
    const data = JSON.stringify(productJsonLd(archive, "ar", "https://www.amescom.com"));
    expect(data).toContain("AMESCOM ARCHIVE");
    expect(data).not.toContain("offers");
    expect(data).not.toContain("FRONA");
    expect(data).not.toContain("2004");
  });
});
