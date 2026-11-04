import type { MetadataRoute } from "next";
import { products } from "@content/products";
import { productionSitemapPages } from "@/lib/publication";
import { indexingEnabled, siteOrigin } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!indexingEnabled()) return [];

  const origin = siteOrigin();
  return productionSitemapPages()
    .filter((page) => {
      const product = products.find((item) => page.route === `/ar/products/${item.slug}`);
      if (!product) return true;
      return product.publication.status === "public" && product.publication.includeInSitemap;
    })
    .map((page) => ({
      url: `${origin}${page.route}`,
    }));
}
