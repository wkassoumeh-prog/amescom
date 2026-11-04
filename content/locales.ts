import type { Locale, LocalizedText, PublicationStatus } from './types.ts';

export const defaultLocale: Locale = 'ar';

/** Locales with routes. Add 'en' only after English content is approved (decision P-02). */
export const enabledLocales: readonly Locale[] = ['ar'];

export const localeSettings: Record<Locale, { lang: string; dir: 'rtl' | 'ltr'; label: string }> = {
  ar: { lang: 'ar', dir: 'rtl', label: 'العربية' },
  en: { lang: 'en', dir: 'ltr', label: 'English' },
};

/**
 * Resolves visitor text for a locale. Throws instead of falling back so a
 * missing translation fails the build rather than showing mixed-language pages.
 */
export function text(value: LocalizedText, locale: Locale): string {
  if (!enabledLocales.includes(locale)) {
    throw new Error(`Locale "${locale}" is not enabled`);
  }
  const resolved = value[locale];
  if (!resolved || !resolved.trim()) {
    throw new Error(`Missing "${locale}" text: ${value.ar.slice(0, 40)}`);
  }
  return resolved;
}

/** Production output includes only owner-approved content. */
export function isPublishable(status: PublicationStatus): boolean {
  return status === 'approved';
}

/** The private preview may show anything except unfinished drafts. */
export function isPreviewable(status: PublicationStatus): boolean {
  return status !== 'draft';
}
