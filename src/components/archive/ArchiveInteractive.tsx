"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./ArchiveExperience.module.css";

const documents = [
  { id: "01", title: "عقد توريد أجهزة", category: "عقود", department: "المشتريات", type: "PDF", text: "توريد أجهزة حاسوب وتجهيزات مكتبية وفق المواصفات المعتمدة.", version: "03" },
  { id: "02", title: "فاتورة تجهيزات المكتب", category: "فواتير", department: "المالية", type: "PDF", text: "فاتورة مشتريات تتضمن تجهيزات المكتب ومستلزمات العمل.", version: "01" },
  { id: "03", title: "مراسلة اعتماد مشروع", category: "مراسلات", department: "الإدارة", type: "DOC", text: "مراسلة داخلية بخصوص اعتماد خطة تنفيذ المشروع ومتابعة مراحله.", version: "02" },
  { id: "04", title: "عقد خدمات الصيانة", category: "عقود", department: "المشتريات", type: "PDF", text: "اتفاقية لتنظيم خدمات الصيانة والمتابعة الدورية للتجهيزات.", version: "02" },
];
const categories = ["الكل", "عقود", "فواتير", "مراسلات"];

export function ArchiveMotion() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-archive-reveal]");
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.setAttribute("data-visible", "true"); observer.unobserve(entry.target); } });
    }, { threshold: .12 });
    nodes.forEach((node) => { node.setAttribute("data-motion-ready", "true"); observer.observe(node); });
    return () => { observer.disconnect(); nodes.forEach((node) => node.removeAttribute("data-motion-ready")); };
  }, []);
  return null;
}

export function ArchiveDemo() {
  const [category, setCategory] = useState("الكل");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("01");
  const [view, setView] = useState<"content" | "history">("content");
  const searchRef = useRef<HTMLInputElement>(null);
  const normalize = (value: string) => value.replace(/[أإآ]/g, "ا").replace(/[ًٌٍَُِّْ]/g, "").toLowerCase();
  const filtered = documents.filter((doc) => (category === "الكل" || category === doc.category) && normalize(`${doc.title} ${doc.text} ${doc.department}`).includes(normalize(query.trim())));
  const active = filtered.find((doc) => doc.id === selected) ?? filtered[0];

  return (
    <div className={styles.workbench}>
      <div className={styles.windowBar}><span><i /><i /><i /></span><b dir="ltr">AMESCOM ARCHIVE</b><small>مثال تفاعلي</small></div>
      <div className={styles.demoBody}>
        <aside className={styles.demoSidebar}><div className={styles.workspaceName}><span className={styles.miniMark}>A</span><b>مساحة الوثائق</b></div><p>مكتبة المؤسسة</p><div className={styles.filterList} aria-label="تصفية الوثائق">{categories.map((item, i) => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}><span aria-hidden="true">{i === 0 ? "▦" : "▤"}</span>{item}<small>{i === 0 ? "4" : i === 1 ? "2" : "1"}</small></button>)}</div><div className={styles.sidebarBottom}><span aria-hidden="true">◉</span> وثائق مترابطة. عمل أوضح.</div></aside>
        <div className={styles.documentArea}><div className={styles.demoTitle}><h3>كل ما تحتاجه، هنا.</h3><span>مكتبة تجريبية</span></div><label className={styles.search}><span aria-hidden="true">⌕</span><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث عن عقد، فاتورة، أو كلمة داخل وثيقة…" aria-label="البحث في الوثائق التجريبية" />{query && <button type="button" aria-label="مسح البحث" onClick={() => { setQuery(""); searchRef.current?.focus(); }}>×</button>}</label><div className={styles.resultsHeader}><span>الوثيقة</span><span role="status">{filtered.length} نتائج</span></div><div className={styles.documentList}>{filtered.map((doc) => <button className={styles.documentRow} type="button" key={doc.id} aria-pressed={active?.id === doc.id} onClick={() => { setSelected(doc.id); setView("content"); }}><span className={styles.fileIcon} data-kind={doc.type}>{doc.type}</span><span><b>{doc.title}</b><small>{doc.department} · {doc.category}</small></span><span className={styles.rowArrow} aria-hidden="true">↗</span></button>)}{filtered.length === 0 && <div className={styles.empty}><b>لم نجد وثيقة بهذه الكلمة.</b><p>جرّب «عقد» أو «تجهيزات»، أو اختر تصنيفاً آخر.</p><button type="button" onClick={() => { setQuery(""); setCategory("الكل"); }}>عرض جميع الوثائق</button></div>}</div><p className={styles.searchHint}><span aria-hidden="true">✦</span> جرّب «حاسوب» للبحث داخل محتوى الوثيقة.</p></div>
        <aside className={styles.documentPreview} aria-label="تفاصيل الوثيقة"><div className={styles.previewSwitcher}><button type="button" aria-pressed={view === "content"} onClick={() => setView("content")}>المحتوى</button><button type="button" aria-pressed={view === "history"} onClick={() => setView("history")}>الإصدارات</button></div>{active ? <div key={`${active.id}-${view}`} className={styles.previewContent}>{view === "content" ? <><div className={styles.previewPaper}><span dir="ltr">AMESCOM · DOCUMENT</span><h4>{active.title}</h4><p>{active.text}</p><div className={styles.paperLines} aria-hidden="true"><i /><i /><i /></div><div className={styles.paperStamp}>نسخة توضيحية</div></div><div className={styles.previewMeta}><span>القسم</span><b>{active.department}</b><span>الإصدار</span><b dir="ltr">v.{active.version}</b></div></> : <div className={styles.demoHistory}><b>تاريخ الوثيقة</b><p>الإصدار الحالي <span dir="ltr">v.{active.version}</span></p><div><span>●</span><p>آخر نسخة محفوظة<small>المحتوى والمرفقات الحالية</small></p></div><div><span>○</span><p>إضافة الوثيقة<small>بداية سجل الإصدارات</small></p></div></div>}</div> : <p className={styles.previewEmpty}>تظهر تفاصيل الوثيقة هنا عند وجود نتيجة.</p>}</aside>
      </div>
    </div>
  );
}
