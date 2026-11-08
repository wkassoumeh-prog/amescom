import { Amiri, El_Messiri, Inter, Noto_Sans_Arabic } from "next/font/google";
import type { ReactNode } from "react";
import { siteName } from "@content/metadata";
import { DEFAULT_LOCALE, directionFor } from "@/lib/locale";
import { indexingEnabled, siteOrigin } from "@/lib/site";
import "./globals.css";

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-arabic",
});

const amiri = Amiri({
  subsets: ["arabic"],
  weight: ["400", "700"],
  display: "swap",
  preload: false,
  variable: "--font-amiri",
});

const elMessiri = El_Messiri({
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-display-face",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-latin",
});

const index = indexingEnabled();

export const metadata = {
  metadataBase: new URL(siteOrigin()),
  title: {
    default: siteName.ar,
    template: `%s — ${siteName.ar}`,
  },
  robots: { index, follow: index },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={DEFAULT_LOCALE}
      dir={directionFor(DEFAULT_LOCALE)}
      data-scroll-behavior="smooth"
      className={`${notoSansArabic.variable} ${amiri.variable} ${elMessiri.variable} ${inter.variable}`}
    >
      <body className={notoSansArabic.className}>{children}</body>
    </html>
  );
}
