import Link from "next/link";
import { company } from "@content/company";
import { helpHub, helpTypes } from "@content/forms";
import type { Locale } from "@content/types";
import { parseLocale } from "@/lib/locale";
import { metaFor } from "@/lib/pages";
import styles from "./help.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  return metaFor(`/${locale}/help`, locale);
}

export default async function HelpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale: Locale = parseLocale((await params).locale);

  return (
    <section className="section">
      <div className="container measure">
        <h1>{helpHub.title[locale]}</h1>
        <p className={styles.lead}>{helpHub.summary[locale]}</p>
        <p className="muted">{helpHub.noHelpdesk[locale]}</p>
        <ul className={styles.stack}>
          {helpTypes.map((item) => (
            <li key={item.id} className={styles.stackItem}>
              <Link href={`/${locale}/help/${item.slug}`}>
                <span className={styles.name}>{item.label[locale]}</span>
                <p className="muted">{item.summary[locale]}</p>
              </Link>
            </li>
          ))}
        </ul>
        <p>
          البريد الإلكتروني:{" "}
          <a className="ltr-isolate" href={`mailto:${company.email}`}>
            {company.email}
          </a>
        </p>
      </div>
    </section>
  );
}
