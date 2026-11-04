import Link from "next/link";

export const metadata = {
  title: { absolute: "الصفحة غير موجودة — أميسكوم" },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main id="main" className="container section measure">
      <h1>الصفحة غير موجودة</h1>
      <p>تعذّر العثور على هذه الصفحة. يمكنك العودة إلى الصفحة الرئيسية.</p>
      <p>
        <Link href="/ar">الصفحة الرئيسية</Link>
      </p>
    </main>
  );
}
