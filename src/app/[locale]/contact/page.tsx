import Link from "next/link";
import { company } from "@content/company";
import { formCopy } from "@content/forms";
import type { Locale } from "@content/types";
import { ContactForm } from "@/components/ContactForm";
import { Photo } from "@/components/Photo";
import { Reveal } from "@/components/Reveal";
import { formMode } from "@/lib/forms/mode";
import { parseLocale } from "@/lib/locale";
import { metaFor } from "@/lib/pages";
import { photos } from "@/lib/visuals";
import homeStyles from "../home.module.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  return metaFor(`/${locale}/contact`, locale);
}

export default async function ContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ product?: string; sector?: string }>;
}) {
  const locale: Locale = parseLocale((await params).locale);
  const query = await searchParams;
  const mode = formMode();

  return (
    <section className="section">
      <div className="container">
        <Reveal kind="hero" className="measure">
          <h1>اتصل بنا</h1>
          <p className={homeStyles.lead}>
            {mode === "disabled"
              ? "الإرسال عبر الموقع غير مفعّل حالياً. يمكنكم استخدام النموذج للتجربة أو التواصل عبر البريد والهاتف."
              : "أرسل استفسارك عبر النموذج. في وضع الاختبار المحلي لن يُرسل الطلب إلى أميسكوم."}
          </p>
          <p>
            يمكنك أيضاً الكتابة إلى{" "}
            <a className="ltr-isolate" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            {" "}أو الاتصال على{" "}
            <a className="ltr-isolate" href={company.phoneHref} dir="ltr">
              {company.phoneDisplay}
            </a>
            . {company.city[locale]}
          </p>
        </Reveal>
        <Reveal kind="single" className={homeStyles.followMedia}>
          <Photo asset={photos.about} />
        </Reveal>
        <Reveal kind="single" className={homeStyles.followMedia}>
          <ContactForm
            locale={locale}
            mode={mode}
            initialProduct={query.product ?? ""}
            initialSector={query.sector ?? ""}
          />
          <p className="muted">
            <Link href={`/${locale}/privacy`}>{formCopy.privacyLinkLabel[locale]}</Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
