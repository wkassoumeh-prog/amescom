import type { Metadata } from "next";
import { ArchiveAssetBoard } from "@/components/archive/ArchiveAssetBoard";

export const metadata: Metadata = {
  title: { absolute: "مكوّنات ARCHIVE — أميسكوم" },
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function ComponentsPage() {
  return (
    <>
      <div className="preview-banner">
        <div className="container">صفحة خاصة لتصدير مكوّنات ARCHIVE. ليست للزوار، ولن تُفهرس.</div>
      </div>
      <ArchiveAssetBoard />
    </>
  );
}
