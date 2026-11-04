import Link from "next/link";
import { notFound } from "next/navigation";
import { company } from "@content/company";
import { formCopy, helpHub, helpTypes } from "@content/forms";
import type { Locale } from "@content/types";
import { HelpForm } from "@/components/HelpForm";
import { formMode } from "@/lib/forms/mode";
import { parseLocale } from "@/lib/locale";
import { metaFor } from "@/lib/pages";
import styles from "../help.module.css";

type Params = { locale: string; type: string };

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return helpTypes.map((item) => ({ locale: "ar", type: item.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { locale: localeParam, type } = await params;
  const locale = parseLocale(localeParam);
  const item = helpTypes.find((help) => help.slug === type);
  if (!item) notFound();
  return metaFor(`/${locale}/help/${item.slug}`, locale);
}

export default async function HelpTypePage({ params }: { params: Promise<Params> }) {
  const { locale: localeParam, type } = await params;
  const locale: Locale = parseLocale(localeParam);
  const item = helpTypes.find((help) => help.slug === type);
  if (!item) notFound();
  const mode = formMode();

  return (
    <section className="section">
      <div className="container">
        <div className="measure">
          <h1>{item.label[locale]}</h1>
          <p className={styles.lead}>{item.summary[locale]}</p>
          <p className="muted">{helpHub.noHelpdesk[locale]}</p>
          <p>
            يمكنك أيضاً الكتابة إلى{" "}
            <a className="ltr-isolate" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            .
          </p>
        </div>
        <HelpForm locale={locale} mode={mode} helpType={item} />
        <p className="muted">
          <Link href={`/${locale}/help`}>كل أنواع المساعدة</Link>
          {" · "}
          <Link href={`/${locale}/privacy`}>{formCopy.privacyLinkLabel[locale]}</Link>
        </p>
      </div>
    </section>
  );
}
