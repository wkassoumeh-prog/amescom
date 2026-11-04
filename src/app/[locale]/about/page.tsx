import { aboutPage } from "@content/about";
import { company } from "@content/company";
import { primaryCta } from "@content/navigation";
import type { Locale } from "@content/types";
import { Button } from "@/components/Button";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { parseLocale } from "@/lib/locale";
import { contactHref, metaFor } from "@/lib/pages";
import { photos } from "@/lib/visuals";
import homeStyles from "../home.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  return metaFor(`/${locale}/about`, locale);
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale: Locale = parseLocale((await params).locale);
  const opening =
    company.foundedYearStatus === "owner-confirmed"
      ? aboutPage.foundedLine.confirmed[locale]
      : aboutPage.foundedLine.pending[locale];

  return (
    <>
      <section className="section">
        <div className="container">
          <Reveal kind="hero" className="measure">
            <h1>{aboutPage.title[locale]}</h1>
            <p className={homeStyles.lead}>{opening}</p>
            <p>{aboutPage.body[locale]}</p>
          </Reveal>
          <Reveal kind="single" className={homeStyles.followMedia}>
            <Photo asset={photos.about} />
          </Reveal>
        </div>
      </section>

      <section className="section surface">
        <Reveal kind="stagger" className={`container ${homeStyles.strengths}`}>
          <div>
            <h2>{aboutPage.missionLabel[locale]}</h2>
            <p className="muted">{company.mission[locale]}</p>
          </div>
          <div>
            <h2>{aboutPage.visionLabel[locale]}</h2>
            <p className="muted">{company.vision[locale]}</p>
          </div>
        </Reveal>
      </section>

      <section className="section" aria-labelledby="about-services">
        <div className="container">
          <Reveal kind="single">
            <h2 id="about-services">{aboutPage.servicesLabel[locale]}</h2>
          </Reveal>
          <Reveal kind="stagger" className={homeStyles.strengths}>
            {company.services.map((item) => (
              <div key={item.id}>
                <h3>{item.title[locale]}</h3>
                <p className="muted">{item.body[locale]}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section surface">
        <Reveal kind="single" className="container measure">
          <p>{aboutPage.contactInvite[locale]}</p>
          <div className={homeStyles.actions}>
            <Button href={contactHref(locale)} variant="primary">
              {primaryCta.label[locale]}
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  );
}
