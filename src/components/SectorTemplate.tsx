import Link from "next/link";
import { primaryCta } from "@content/navigation";
import { sectorPageCopy } from "@content/sectors";
import type { Locale, SectorContent } from "@content/types";
import { Button } from "@/components/Button";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { contactHref } from "@/lib/pages";
import { sectorPhoto } from "@/lib/visuals";
import { mappedSectorProducts, publicSectorUseCases } from "@/lib/sector-view";
import homeStyles from "@/app/[locale]/home.module.css";
import styles from "@/app/[locale]/sectors/sector.module.css";

export function SectorTemplate({
  sector,
  locale,
}: {
  sector: SectorContent;
  locale: Locale;
}) {
  const copy = sectorPageCopy;
  const useCases = publicSectorUseCases(sector, locale);
  const products = mappedSectorProducts(sector);
  const leadProductId = sector.id === "healthcare" ? "clinical-pro" : products[0]?.id;
  const photo = sectorPhoto(sector.id);

  return (
    <>
      <section className="section">
        <div className="container">
          <Reveal kind="hero" className="measure">
            <h1>{sector.name[locale]}</h1>
            <p className={styles.lead}>{sector.summary[locale]}</p>
            <div className={styles.actions}>
              <Button href={contactHref(locale, { sector: sector.id })} variant="primary">
                {primaryCta.label[locale]}
              </Button>
              <Button href={`/${locale}/sectors`} variant="secondary">
                {copy.allSectors[locale]}
              </Button>
            </div>
          </Reveal>
          {photo ? (
            <Reveal kind="single" className={homeStyles.followMedia}>
              <Photo asset={photo} />
            </Reveal>
          ) : null}
        </div>
      </section>

      <section className="section surface" aria-labelledby="tasks-heading">
        <div className="container">
          <h2 id="tasks-heading">{copy.tasksTitle[locale]}</h2>
          <p className="muted measure">{copy.proposedNote[locale]}</p>
          <ul className={styles.taskList}>
            {useCases.map((useCase) => (
              <li key={useCase.id} className={styles.task}>
                <span className={styles.kind}>
                  {useCase.kind === "proposed-example"
                    ? copy.proposedLabel[locale]
                    : copy.suppliedLabel[locale]}
                </span>
                <h3>{useCase.title[locale]}</h3>
                <p className="muted">{useCase.body[locale]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {products.length > 0 ? (
        <section className="section" aria-labelledby="sector-products-heading">
          <div className="container">
            <h2 id="sector-products-heading">{copy.productsTitle[locale]}</h2>
            <ul className={styles.productList}>
              {products.map((product) => (
                <li
                  key={product.id}
                  className={product.id === leadProductId ? styles.leadProduct : undefined}
                >
                  <Link href={`/${locale}/products/${product.slug}`}>
                    <span className={`ltr-isolate ${styles.name}`}>{product.name}</span>
                    <p className="muted">{product.summary[locale]}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <section className="section surface" aria-labelledby="caveats-heading">
        <div className="container">
          <h2 id="caveats-heading">{copy.caveatsTitle[locale]}</h2>
          <ul className={styles.caveatList}>
            {sector.caveats[locale].map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <div className={styles.actions}>
            <Button href={contactHref(locale, { sector: sector.id })} variant="primary">
              {primaryCta.label[locale]}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
