"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { primaryCta } from "@content/navigation";
import type { Locale, NavItem } from "@content/types";
import { Button } from "./Button";
import { useHeroCompare } from "./HeroCompare";
import { CaretIcon, CloseIcon, MenuIcon } from "./Icons";
import { Wordmark } from "./Wordmark";
import styles from "./Header.module.css";

type HeaderProps = {
  locale: Locale;
  items: NavItem[];
};

function visibleFocusable(root: HTMLElement): HTMLElement[] {
  return [...root.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")].filter(
    (element) => element.offsetParent !== null,
  );
}

export function Header({ locale, items }: HeaderProps) {
  const pathname = usePathname();
  const heroCompare = useHeroCompare();
  const isHome = pathname === `/${locale}` || pathname === `/${locale}/`;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [menuPath, setMenuPath] = useState(pathname);
  const navRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  if (pathname !== menuPath) {
    setMenuPath(pathname);
    setMobileOpen(false);
    setOpenMenu(null);
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        if (mobileOpen) {
          setMobileOpen(false);
          menuButtonRef.current?.focus();
        }
      }
    }

    function onPointer(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    }

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const header = navRef.current;
    if (!header) return;

    const panel = header.querySelector<HTMLElement>("[data-mobile-panel]");
    const firstInPanel = panel?.querySelector<HTMLElement>("a[href], button:not([disabled])");
    firstInPanel?.focus();

    function onTab(event: KeyboardEvent) {
      if (event.key !== "Tab" || !header) return;
      const list = visibleFocusable(header);
      if (list.length === 0) return;
      const first = list[0];
      const last = list[list.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    }

    header.addEventListener("keydown", onTab);
    return () => header.removeEventListener("keydown", onTab);
  }, [mobileOpen]);

  return (
    <header className={styles.header} ref={navRef}>
      <div className={`container ${styles.bar}`}>
        <Link
          href={`/${locale}`}
          className={styles.brand}
          aria-label={locale === "ar" ? "أميسكوم، الصفحة الرئيسية" : "Amescom home"}
        >
          <Wordmark />
        </Link>

        <nav className={styles.desktop} aria-label={locale === "ar" ? "التنقل الرئيسي" : "Main"}>
          {items.map((item) =>
            item.children?.length ? (
              <Disclosure
                key={item.id}
                item={item}
                locale={locale}
                open={openMenu === item.id}
                onToggle={() => setOpenMenu(openMenu === item.id ? null : item.id)}
                onClose={() => setOpenMenu(null)}
              />
            ) : (
              <Link key={item.id} href={item.href} className={styles.navLink}>
                {item.label[locale]}
              </Link>
            ),
          )}
        </nav>

        <div className={styles.actions}>
          {isHome ? (
            <button
              type="button"
              className={styles.compare}
              onClick={heroCompare.toggle}
              aria-pressed={heroCompare.mode === "image"}
            >
              {heroCompare.mode === "video" ? "الصورة" : "الفيديو"}
            </button>
          ) : null}
          <Button href={primaryCta.href} variant="primary" className={styles.cta}>
            {primaryCta.label[locale]}
          </Button>
          <button
            ref={menuButtonRef}
            type="button"
            className={styles.menuButton}
            aria-expanded={mobileOpen}
            aria-controls={panelId}
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span className="visually-hidden">
              {mobileOpen ? "إغلاق القائمة" : "فتح القائمة"}
            </span>
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className={styles.mobile} id={panelId} data-mobile-panel>
          <nav className="container" aria-label="التنقل للجوال">
            {items.map((item) => (
              <div key={item.id} className={styles.mobileGroup}>
                <Link
                  href={item.href}
                  className={styles.mobileParent}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label[locale]}
                </Link>
                {item.children?.length ? (
                  <ul className={styles.mobileList}>
                    {item.children.map((child) => (
                      <li key={child.id}>
                        <Link href={child.href} onClick={() => setMobileOpen(false)}>
                          {child.label[locale]}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
            <Button href={primaryCta.href} variant="primary">
              {primaryCta.label[locale]}
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function Disclosure({
  item,
  locale,
  open,
  onToggle,
  onClose,
}: {
  item: NavItem;
  locale: Locale;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const id = useId();

  return (
    <div
      className={styles.disclosure}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          onClose();
        }
      }}
    >
      <button
        type="button"
        className={styles.navButton}
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
      >
        {item.label[locale]}
        <span className={styles.caret}>
          <CaretIcon />
        </span>
      </button>
      {open ? (
        <ul className={styles.menu} id={id}>
          <li>
            <Link href={item.href} onClick={onClose}>
              {locale === "ar" ? "كل " : "All "}
              {item.label[locale]}
            </Link>
          </li>
          {item.children?.map((child) => (
            <li key={child.id}>
              <Link
                href={child.href}
                className={item.id === "products" ? "ltr-isolate" : undefined}
                translate={item.id === "products" ? "no" : undefined}
                onClick={onClose}
              >
                {child.label[locale]}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
