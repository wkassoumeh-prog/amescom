import { company } from "@content/company";
import { privacyHeldCopy } from "@content/privacy-gaps";
import type { Locale } from "@content/types";
import { parseLocale } from "@/lib/locale";
import { metaFor } from "@/lib/pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  return metaFor(`/${locale}/privacy`, locale);
}

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale: Locale = parseLocale((await params).locale);

  return (
    <section className="section">
      <div className="container measure">
        <h1>{privacyHeldCopy.title[locale]}</h1>
        <p>{privacyHeldCopy.lead[locale]}</p>
        <p>{privacyHeldCopy.tracking[locale]}</p>
        <p>{privacyHeldCopy.forms[locale]}</p>
        <p>{privacyHeldCopy.uploads[locale]}</p>
        <p>
          <strong>{privacyHeldCopy.blocker[locale]}</strong>
        </p>
        <p>
          {privacyHeldCopy.contact[locale]}{" "}
          <a className="ltr-isolate" href={`mailto:${company.email}`}>
            {company.email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
