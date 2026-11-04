import { contactForm, formCopy } from "@content/forms";
import { navigableProducts } from "@content/products";
import type { Locale } from "@content/types";
import Link from "next/link";
import { Button } from "@/components/Button";
import { SelectField } from "@/components/forms/SelectField";
import { TextArea } from "@/components/forms/TextArea";
import { TextInput } from "@/components/forms/TextInput";
import { parseLocale } from "@/lib/locale";
import styles from "./preview.module.css";

export const metadata = {
  title: { absolute: "معاينة التصميم — أميسكوم" },
  robots: { index: false, follow: false },
  referrer: "no-referrer" as const,
};

export default async function DesignPreviewPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale: Locale = parseLocale((await params).locale);
  const products = navigableProducts();

  return (
    <>
      <div className="preview-banner">
        <div className="container">
          هذه معاينة خاصة لأساس التصميم. ليست الصفحة الرئيسية، ولن تُفهرس.
        </div>
      </div>

      <section className="section">
        <div className="container measure">
          <h1>أساس تصميم أميسكوم</h1>
          <p className="muted">
            هوية نصية مؤقتة إلى أن يصل ملف الشعار الأصلي. الألوان والخطوط أدناه مقترحة من
            دليل التصميم وليست معيار علامة مسجّلاً بعد.
          </p>
        </div>
      </section>

      <section className="section surface">
        <div className="container">
          <h2>الألوان</h2>
          <ul className={styles.swatches}>
            <Swatch name="خلفية" value="#FFFFFF" />
            <Swatch name="سطح" value="#F7F8FA" />
            <Swatch name="نص" value="#17191C" />
            <Swatch name="ثانوي" value="#505862" />
            <Swatch name="خط" value="#E3E7EB" />
            <Swatch name="أزرق" value="#145DA0" on="#FFFFFF" />
            <Swatch name="أزرق داكن" value="#104A80" on="#FFFFFF" />
            <Swatch name="سطح أزرق" value="#EDF4FC" />
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>النصوص</h2>
          <p className={styles.sampleH1}>عنوان رئيسي للنظام</p>
          <p className={styles.sampleH2}>عنوان قسم يوضح المنتج</p>
          <p className={styles.sampleH3}>مجموعة قدرات</p>
          <p>
            نقدّم حلولاً برمجية بواجهات واضحة. البريد{" "}
            <span className="ltr-isolate">info@amescom.com</span> والهاتف{" "}
            <span className="ltr-isolate" dir="ltr">
              +963 11 33 44 805
            </span>{" "}
            يُعرضان باتجاه اليسار حتى داخل الفقرة العربية.
          </p>
          <p>
            اسم المنتج{" "}
            <span className="ltr-isolate">AMESCOM ARCHIVE</span> يبقى باللاتينية دون قصّ
            للحروف العربية حوله.
          </p>
        </div>
      </section>

      <section className="section surface">
        <div className="container">
          <h2>الأزرار والروابط</h2>
          <div className={styles.row}>
            <Button href="/ar/contact" variant="primary">
              اتصل بنا
            </Button>
            <Button href="/ar/products" variant="secondary">
              استكشف المنتجات
            </Button>
            <Button type="button" variant="ghost">
              إجراء ثانوي
            </Button>
            <Link href="/ar/about">رابط نصي إلى من نحن</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>النموذج</h2>
          <p className="muted">{formCopy.mockNotice[locale]}</p>
          <form className={styles.form} noValidate>
            {contactForm.fields
              .filter((field) => field.name !== "product" && field.name !== "sector")
              .map((field) =>
                field.name === "message" ? (
                  <TextArea
                    key={field.name}
                    id={`preview-${field.name}`}
                    locale={locale}
                    label={field.label[locale]}
                    required={field.required}
                    optional={!field.required}
                    name={field.name}
                  />
                ) : (
                  <TextInput
                    key={field.name}
                    id={`preview-${field.name}`}
                    locale={locale}
                    label={field.label[locale]}
                    required={field.required}
                    optional={!field.required}
                    name={field.name}
                    type={field.inputMode === "email" ? "email" : "text"}
                    autoComplete={field.autocomplete}
                    inputMode={field.inputMode}
                    isolateLtr={field.dir === "ltr"}
                  />
                ),
              )}
            <SelectField
              id="preview-product"
              locale={locale}
              label="المنتج"
              optional
              isolateLtr
              options={[
                { value: "", label: "—" },
                ...products.map((product) => ({
                  value: product.id,
                  label: product.name,
                })),
              ]}
            />
            <p className={styles.errorSample} id="preview-sample-error">
              مثال رسالة تحقق: يرجى إدخال البريد الإلكتروني.
            </p>
            <Button type="button" variant="primary">
              {formCopy.submit[locale]}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}

function Swatch({ name, value, on }: { name: string; value: string; on?: string }) {
  return (
    <li className={styles.swatch}>
      <span
        className={styles.chip}
        style={{ background: value, color: on ?? "#17191C" }}
        aria-hidden="true"
      />
      <span>
        {name}
        <br />
        <span className="ltr-isolate muted">
          {value}
        </span>
      </span>
    </li>
  );
}
