import { notFound } from "next/navigation";
import { pages } from "@content/metadata";
import { sectorBySlug } from "@content/sectors";
import { SectorTemplate } from "@/components/SectorTemplate";
import { parseLocale } from "@/lib/locale";
import { metaFor } from "@/lib/pages";
import { canRenderPublication, contentMode, routableSectors } from "@/lib/publication";

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return routableSectors().map((sector) => ({ locale: "ar", slug: sector.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale: localeParam, slug } = await params;
  const locale = parseLocale(localeParam);
  const sector = sectorBySlug(slug);
  if (!sector || !canRenderPublication(sector.publication)) notFound();

  const route = `/${locale}/sectors/${sector.slug}`;
  const page = pages.find((item) => item.route === route);
  if (contentMode() === "production" && page?.publication !== "public") notFound();

  return metaFor(route, locale);
}

export default async function SectorPage({ params }: { params: Promise<Params> }) {
  const { locale: localeParam, slug } = await params;
  const locale = parseLocale(localeParam);
  const sector = sectorBySlug(slug);
  if (!sector || !canRenderPublication(sector.publication)) notFound();

  return <SectorTemplate sector={sector} locale={locale} />;
}
