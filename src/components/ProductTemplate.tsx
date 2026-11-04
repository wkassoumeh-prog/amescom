import Link from "next/link";
import { primaryCta } from "@content/navigation";
import { productPageCopy } from "@content/products";
import type { Locale, ProductContent } from "@content/types";
import { Button } from "@/components/Button";
import { Diagram } from "@/components/Diagram";
import { ProductDiagram } from "@/components/diagrams/ProductDiagram";
import { JsonLd } from "@/components/JsonLd";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { contactHref } from "@/lib/pages";
import { productDiagram, productPhoto } from "@/lib/visuals";
import { productJsonLd } from "@/lib/structured-data";
import {
  approvedBrochure,
  confirmedTechnicalClaims,
  relatedSectors,
  visibleFeatureGroups,
} from "@/lib/product-view";
import styles from "@/app/[locale]/products/product.module.css";

export function ProductTemplate({
  product,
  locale,
}: {
  product: ProductContent;
  locale: Locale;
}) {
  const features = visibleFeatureGroups(product);
  const sectors = relatedSectors(product, locale);
  const brochure = approvedBrochure(product);
  const technical = confirmedTechnicalClaims(product);
  const copy = productPageCopy;
  const photo = productPhoto(product.id);
  const diagram = productDiagram(product.id);

  return (
    <>
      <JsonLd data={productJsonLd(product, locale)} />
      <section className="section">
        <div className={`container ${styles.hero}`}>
          <Reveal kind="hero">
            {product.publication.status === "held" ? (
              <p className={styles.held}>{copy.heldNotice[locale]}</p>
            ) : null}
            <p className={`ltr-isolate ${styles.productName}`}>{product.name}</p>
            <h1>{product.tagline[locale]}</h1>
            <p className={styles.lead}>{product.summary[locale]}</p>
            <p>
              <strong>{copy.audienceLabel[locale]}: </strong>
              {product.audience[locale]}
            </p>
            <div className={styles.actions}>
              <Button href={contactHref(locale, { product: product.id })} variant="primary">
                {primaryCta.label[locale]}
              </Button>
              <Button href={`/${locale}/products`} variant="secondary">
                {copy.allProducts[locale]}
              </Button>
            </div>
          </Reveal>
          <Reveal kind="single" className={styles.visual}>
            {photo ? <Photo asset={photo} /> : null}
            {diagram ? <Diagram asset={diagram} /> : <ProductDiagram product={product} />}
          </Reveal>
        </div>
      </section>

      <section className="section surface">
        <div className="container measure">
          <h2>{copy.problemTitle[locale]}</h2>
          <p>{product.problem[locale]}</p>
        </div>
      </section>

      <section className="section" aria-labelledby="features-heading">
        <div className="container">
          <h2 id="features-heading">{copy.featuresTitle[locale]}</h2>
          <ul className={styles.featureList}>
            {features.map((group) => (
              <li key={group.id} className={styles.feature}>
                <h3>{group.title[locale]}</h3>
                <p className="muted">{group.body[locale]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {sectors.length > 0 ? (
        <section className="section surface" aria-labelledby="sectors-heading">
          <div className="container">
            <h2 id="sectors-heading">{copy.sectorsTitle[locale]}</h2>
            <p className="muted measure">{copy.proposedNote[locale]}</p>
            <ul className={styles.sectorList}>
              {sectors.map(({ sector, useCases }) => (
                <li key={sector.id}>
                  <h3>
                    <Link href={`/${locale}/sectors/${sector.slug}`}>{sector.name[locale]}</Link>
                  </h3>
                  <ul className={styles.useCases}>
                    {useCases.map((useCase) => (
                      <li key={useCase.id}>
                        <strong>{useCase.title[locale]}</strong>
                        <p className="muted">{useCase.body[locale]}</p>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {technical.length > 0 ? (
        <section className="section">
          <div className="container measure">
            <h2>معلومات تقنية</h2>
            <ul>
              {technical.map((claim) => (
                <li key={claim.id}>{claim.publicWordingAr}</li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {brochure ? (
        <section className="section">
          <div className="container measure">
            <h2>تنزيل</h2>
            <p className="muted">{brochure.altAr}</p>
          </div>
        </section>
      ) : null}

      <section className="section">
        <div className="container measure">
          <div className={styles.actions}>
            <Button href={contactHref(locale, { product: product.id })} variant="primary">
              {primaryCta.label[locale]}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
