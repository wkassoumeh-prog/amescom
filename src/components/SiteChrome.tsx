import { footerNav, headerNav } from "@content/navigation";
import type { Locale } from "@content/types";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { JsonLd } from "./JsonLd";
import { MotionRoot } from "./MotionRoot";
import { SkipLink } from "./SkipLink";
import { footerItems, visibleNav } from "@/lib/nav";
import { contentMode } from "@/lib/publication";
import { organizationJsonLd } from "@/lib/structured-data";

export function SiteChrome({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  const mode = contentMode();
  const headerItems = visibleNav(headerNav, mode);
  const companyLinks = footerItems(footerNav, mode);
  const productParent = headerItems.find((item) => item.id === "products");
  const help = headerItems.find((item) => item.id === "help");

  return (
    <>
      <MotionRoot />
      <JsonLd data={organizationJsonLd()} />
      <SkipLink locale={locale} />
      <Header locale={locale} items={headerItems} />
      <main id="main" className="site-main">
        {children}
      </main>
      <Footer
        locale={locale}
        products={productParent?.children ?? []}
        companyLinks={companyLinks}
        help={help}
      />
    </>
  );
}
