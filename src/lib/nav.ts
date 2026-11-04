import type { Locale } from "@content/types";
import type { NavItem } from "@content/types";

export function visibleNav(
  items: NavItem[],
  mode: "preview" | "production",
): NavItem[] {
  return items
    .filter((item) =>
      mode === "production"
        ? item.publication.status === "public" && item.publication.includeInNavigation
        : item.publication.includeInPreview && item.publication.includeInNavigation,
    )
    .map((item) => ({
      ...item,
      children: item.children ? visibleNav(item.children, mode) : undefined,
    }));
}

export function footerItems(items: NavItem[], mode: "preview" | "production"): NavItem[] {
  return items.filter((item) =>
    mode === "production"
      ? item.publication.status === "public"
      : item.publication.includeInPreview,
  );
}

export function label(item: { label: Record<Locale, string> }, locale: Locale): string {
  return item.label[locale];
}
