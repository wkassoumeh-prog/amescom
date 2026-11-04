import { notFound } from "next/navigation";
import { pages } from "@content/metadata";
import { productBySlug } from "@content/products";
import { ArchiveExperience } from "@/components/archive/ArchiveExperience";
import { ProductTemplate } from "@/components/ProductTemplate";
import { WorkflowExperience } from "@/components/workflow/WorkflowExperience";
import { parseLocale } from "@/lib/locale";
import { metaFor } from "@/lib/pages";
import { canRenderPublication, contentMode, routableProducts } from "@/lib/publication";

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return routableProducts().map((product) => ({ locale: "ar", slug: product.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale: localeParam, slug } = await params;
  const locale = parseLocale(localeParam);
  const product = productBySlug(slug);
  if (!product || !canRenderPublication(product.publication)) notFound();

  const route = `/${locale}/products/${product.slug}`;
  const page = pages.find((item) => item.route === route);
  if (contentMode() === "production" && page?.publication !== "public") notFound();

  return metaFor(route, locale);
}

export default async function ProductPage({ params }: { params: Promise<Params> }) {
  const { locale: localeParam, slug } = await params;
  const locale = parseLocale(localeParam);
  const product = productBySlug(slug);
  if (!product || !canRenderPublication(product.publication)) notFound();

  if (product.id === "archive") return <ArchiveExperience />;
  if (product.id === "workflow") return <WorkflowExperience />;
  return <ProductTemplate product={product} locale={locale} />;
}
