import Link from "next/link";
import { company } from "@content/company";
import { formCopy } from "@content/forms";
import type { Locale, NavItem } from "@content/types";
import styles from "./Footer.module.css";

type FooterProps = {
  locale: Locale;
  products: NavItem[];
  companyLinks: NavItem[];
  help?: NavItem;
};

export function Footer({ locale, products, companyLinks, help }: FooterProps) {
  const privacy = companyLinks.find((item) => item.id === "privacy");
  const otherCompany = companyLinks.filter((item) => item.id !== "privacy");

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div>
          <p className={styles.name}>{company.publicName.ar}</p>
          <p className={styles.blurb}>{company.aboutOpening[locale]}</p>
          <p className={styles.contact}>
            <a className="ltr-isolate" href={`mailto:${company.email}`}>
              {company.email}
            </a>
            <br />
            <a className="ltr-isolate" href={company.phoneHref} dir="ltr">
              {company.phoneDisplay}
            </a>
            <br />
            <span>{company.city[locale]}</span>
          </p>
        </div>

        <nav aria-label="المنتجات">
          <h2 className={styles.heading}>المنتجات</h2>
          <ul>
            {products.map((item) => (
              <li key={item.id}>
                <Link href={item.href} className="ltr-isolate">
                  {item.label[locale]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="الشركة">
          <h2 className={styles.heading}>الشركة</h2>
          <ul>
            {otherCompany.map((item) => (
              <li key={item.id}>
                <Link href={item.href}>{item.label[locale]}</Link>
              </li>
            ))}
            {help ? (
              <li>
                <Link href={help.href}>{help.label[locale]}</Link>
              </li>
            ) : null}
            {privacy ? (
              <li>
                <Link href={privacy.href}>{formCopy.privacyLinkLabel[locale]}</Link>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
      <div className={`container ${styles.copy}`}>
        <p>© {company.publicName.enLatin}</p>
      </div>
    </footer>
  );
}
