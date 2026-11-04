import Link from "next/link";
import { sectorsOverview } from "@content/sectors";
import type { Locale } from "@content/types";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { parseLocale } from "@/lib/locale";
import { metaFor } from "@/lib/pages";
import { listedSectors } from "@/lib/publication";
import { mappedSectorProducts } from "@/lib/sector-view";
import { sectorPhoto } from "@/lib/visuals";
import homeStyles from "../home.module.css";
import styles from "./sector.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  return metaFor(`/${locale}/sectors`, locale);
}

export default async function SectorsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale: Locale = parseLocale((await params).locale);
  const sectors = listedSectors();

  return (
    <section className="section">
      <div className="container">
        <Reveal kind="hero">
          <h1>{sectorsOverview.title[locale]}</h1>
          <p className={`${styles.lead} measure`}>{sectorsOverview.summary[locale]}</p>
        </Reveal>
        <Reveal kind="stagger" as="ul" className={homeStyles.sectorGrid}>
          {sectors.map((sector) => {
            const products = mappedSectorProducts(sector);
            const photo = sectorPhoto(sector.id);
            return (
              <li key={sector.id}>
                <Link href={`/${locale}/sectors/${sector.slug}`} className={homeStyles.sectorCard}>
                  {photo ? (
                    <Photo
                      asset={photo}
                      zoom
                      ratio="4 / 3"
                      sizes="(min-width: 80rem) 36rem, 100vw"
                    />
                  ) : null}
                  <h2>{sector.name[locale]}</h2>
                  <p className="muted">{sector.summary[locale]}</p>
                  {products.length > 0 ? (
                    <p className={styles.productNames}>
                      {products.map((product, index) => (
                        <span key={product.id}>
                          {index > 0 ? "، " : null}
                          <span className="ltr-isolate">{product.name}</span>
                        </span>
                      ))}
                    </p>
                  ) : null}
                </Link>
              </li>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
