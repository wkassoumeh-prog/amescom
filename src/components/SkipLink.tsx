import { skipLinkLabel } from "@content/navigation";
import type { Locale } from "@content/types";

export function SkipLink({ locale }: { locale: Locale }) {
  return (
    <a className="skip-link" href="#main">
      {skipLinkLabel[locale]}
    </a>
  );
}
