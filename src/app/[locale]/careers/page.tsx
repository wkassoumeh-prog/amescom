import { careersForm, careersPage, formCopy } from "@content/forms";
import { company } from "@content/company";
import type { Locale } from "@content/types";
import { parseLocale } from "@/lib/locale";
import { metaFor } from "@/lib/pages";
import styles from "../help/help.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  return metaFor(`/${locale}/careers`, locale);
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale: Locale = parseLocale((await params).locale);
  const vacancies = careersForm.vacancies;
  const generalOpen = careersForm.generalApplicationConfirmed;

  return (
    <section className="section">
      <div className="container measure">
        <h1>{careersPage.title[locale]}</h1>
        <p className={styles.lead}>{careersPage.summary[locale]}</p>

        {vacancies.length > 0 ? (
          <ul className={styles.stack}>
            {vacancies.map((vacancy) => (
              <li key={vacancy.id} className={styles.stackItem}>
                <span className={styles.name}>{vacancy.title[locale]}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>{careersForm.emptyState[locale]}</p>
        )}

        {generalOpen ? (
          <p>يمكن إرسال طلب اهتمام عام عبر الحقول المعتمدة عندما يُفعَّل مسار التقديم.</p>
        ) : null}

        <h2>حقول التقديم لاحقاً</h2>
        <p className="muted">
          لا يُعرض نموذج تقديم الآن لأنه لا توجد شواغر معلنة ولا مسار تقديم عام مؤكَّد. إذا فُتح باب التقديم ستُطلب هذه الحقول فقط.
        </p>
        <ul className={styles.fieldList}>
          {careersForm.fields.map((field) => (
            <li key={field.name}>
              {field.label[locale]}
              {field.required ? null : ` (${formCopy.optionalMark[locale]})`}
            </li>
          ))}
        </ul>
        <p className="muted">{careersPage.noDob[locale]}</p>
        <p className="muted">{formCopy.attachmentDisabled[locale]}</p>
        <p>
          للاستفسار العام يمكن الكتابة إلى{" "}
          <a className="ltr-isolate" href={`mailto:${company.email}`}>
            {company.email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
