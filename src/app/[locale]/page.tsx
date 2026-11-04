import { HomeExperience } from "@/components/home/HomeExperience";
import { parseLocale } from "@/lib/locale";
import { metaFor } from "@/lib/pages";
import { listedProducts, listedSectors } from "@/lib/publication";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = parseLocale((await params).locale);
  return metaFor(`/${locale}`, locale);
}

export default async function HomePage({ params }: Props) {
  const locale = parseLocale((await params).locale);
  const products = listedProducts().map((product) => ({
    id: product.id,
    name: product.name,
    href: `/${locale}/products/${product.slug}`,
  }));
  const sectors = listedSectors().map((sector) => ({
    id: sector.id,
    name: sector.name[locale],
    href: `/${locale}/sectors/${sector.slug}`,
  }));
  return <HomeExperience products={products} sectors={sectors} />;
}
