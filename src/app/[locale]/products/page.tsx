import Link from "next/link";
import { primaryCta } from "@content/navigation";
import { productsOverview } from "@content/products";
import type { Locale } from "@content/types";
import { Button } from "@/components/Button";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { parseLocale } from "@/lib/locale";
import { contactHref, metaFor } from "@/lib/pages";
import { listedProducts } from "@/lib/publication";
import { productPhoto } from "@/lib/visuals";
import homeStyles from "../home.module.css";
import styles from "./product.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  return metaFor(`/${locale}/products`, locale);
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale: Locale = parseLocale((await params).locale);
  const products = listedProducts();

  return (
    <>
      <section className="section">
        <div className="container">
          <Reveal kind="hero">
            <h1>{productsOverview.title[locale]}</h1>
            <p className={`${styles.lead} measure`}>{productsOverview.summary[locale]}</p>
          </Reveal>
          <Reveal kind="stagger" as="ul" className={homeStyles.stack}>
            {products.map((product) => {
              const photo = productPhoto(product.id);
              return (
                <li key={product.id}>
                  <Link
                    href={`/${locale}/products/${product.slug}`}
                    className={homeStyles.productCard}
                  >
                    {photo ? <Photo asset={photo} zoom /> : null}
                    <h2>
                      <span className={`ltr-isolate ${homeStyles.name}`}>{product.name}</span>
                    </h2>
                    <p className={styles.job}>{product.tagline[locale]}</p>
                    <p className="muted measure">{product.summary[locale]}</p>
                  </Link>
                </li>
              );
            })}
          </Reveal>
          <div className={styles.actions}>
            <Button href={contactHref(locale)} variant="primary">
              {primaryCta.label[locale]}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
