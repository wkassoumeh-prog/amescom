"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import styles from "./HomeProductExplorer.module.css";

type Product = { id: string; name: string; href: string };
type ProductId = "archive" | "workflow" | "clinical-pro" | "frona-oprisk";
const copy: Record<ProductId, { name: string; purpose: string; title: string; text: string }> = {
  archive: { name: "ARCHIVE", purpose: "إدارة الوثائق", title: "تذكّر المعلومة.\nودع الأرشيف يجدها.", text: "من الوثيقة الممسوحة إلى نص قابل للبحث. نظّم الملفات والمرفقات، واحتفظ بتاريخ كل إصدار." },
  workflow: { name: "Workflow", purpose: "مسارات العمل", title: "كل خطوة واضحة.\nوكل مهمة في مسارها.", text: "صمّم مسارات المراجعة والاعتماد، وحدّد المسؤوليات وتابع انتقال المستندات بين أقسام مؤسستك." },
  "clinical-pro": { name: "Clinical PRO", purpose: "المراكز الطبية", title: "أقسام متعددة.\nوملف واحد للمريض.", text: "اربط الاستقبال والعيادات والمخبر والأشعة، لتصل المعلومات إلى كل قسم حسب الصلاحيات." },
  "frona-oprisk": { name: "FRONA", purpose: "المخاطر التشغيلية", title: "انظر إلى المخاطر.\nبصورة أوضح.", text: "اربط المخاطر بالضوابط، وتابع التقييمات ومؤشرات المخاطر والتوصيات في سياق واحد." },
};

function Icon({ kind, className }: { kind: ProductId | "search" | "arrow" | "check"; className?: string }) {
  const paths = {
    archive: <><rect x="4" y="5" width="16" height="15" rx="2" /><path d="M3 5h18M9 10h6M9 14h6M8 2h8" /></>,
    workflow: <><rect x="2" y="3" width="6" height="6" rx="1" /><rect x="16" y="15" width="6" height="6" rx="1" /><path d="M8 6h7a4 4 0 0 1 4 4v5M16 12l3 3 3-3M5 9v9h11" /></>,
    "clinical-pro": <><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M12 7v10M7 12h10" /></>,
    "frona-oprisk": <><path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z" /><path d="M7 14v-3m5 3V7m5 7V9" /></>,
    search: <><circle cx="10" cy="10" r="6" /><path d="m15 15 6 6" /></>,
    arrow: <path d="M20 12H4m6-6-6 6 6 6" />,
    check: <path d="m5 12 4 4L19 6" />,
  };
  return <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[kind]}</svg>;
}

const sampleDocuments = [
  { title: "عقد توريد أجهزة", type: "PDF", text: "توريد أجهزة حاسوب وتجهيزات مكتبية.", department: "المشتريات" },
  { title: "فاتورة تجهيزات المكتب", type: "PDF", text: "تجهيزات ومستلزمات العمل اليومية.", department: "المالية" },
  { title: "خطة تنفيذ المشروع", type: "DOC", text: "خطوات التنفيذ وتوزيع المسؤوليات.", department: "الإدارة" },
];

function ArchiveScene() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(sampleDocuments[0].title);
  const found = sampleDocuments.filter((doc) => `${doc.title} ${doc.text}`.includes(query.trim()));
  const active = found.find((doc) => doc.title === selected) ?? found[0];
  return <div className={styles.archiveScene}>
    <Image className={styles.archivePhoto} src="/media/archive-brochure/cover.jpg" alt="صورة من كتيّب ARCHIVE لرقمنة المستندات" width={978} height={1304} sizes="(max-width: 600px) 140px, 180px" />
    <div className={styles.library}>
      <div className={styles.libraryTitle}><Icon kind="archive" /><b>مكتبة الوثائق</b><span>مثال</span></div>
      <label className={styles.search}><Icon kind="search" /><input aria-label="ابحث في الوثائق التوضيحية" placeholder="جرّب البحث عن «حاسوب»" value={query} onChange={(event) => setQuery(event.target.value)} /></label>
      <div className={styles.documentList}>
        {found.map((doc) => <button key={doc.title} type="button" aria-pressed={active?.title === doc.title} onClick={() => setSelected(doc.title)}><span className={styles.fileType}>{doc.type}</span><span><b>{doc.title}</b><small>{doc.department}</small></span><Icon kind="arrow" /></button>)}
        {!found.length && <div className={styles.empty}><p>لا توجد وثيقة بهذه الكلمة.</p><button type="button" onClick={() => setQuery("")}>عرض جميع الوثائق</button></div>}
      </div>
      <p className={styles.documentText} role="status">{active ? active.text : "جرّب كلمة أخرى أو امسح البحث."}</p>
    </div>
  </div>;
}

function WorkflowScene() {
  const [step, setStep] = useState(0);
  const steps = ["المراجعة", "الاعتماد", "الأرشفة"];
  const descriptions = ["الوثيقة لدى الفريق المختص للمراجعة.", "الوثيقة لدى المسؤول لاتخاذ قرار الاعتماد.", "اكتمل المسار وحُفظت الوثيقة في الأرشيف."];
  return <div className={styles.workflowScene}><div className={styles.screenshotFrame}><div><span /><b>مصمّم مسارات العمل</b></div><Image src="/media/home-brochure/workflow.png" width={1428} height={652} alt="لقطة مصمّم مسارات الاعتماد من كتيّب AMESCOM Workflow" sizes="(max-width: 700px) 85vw, 600px" /></div><div className={styles.workflowSteps}>{steps.map((label, i) => <button key={label} type="button" aria-pressed={step === i} onClick={() => setStep(i)}><span>{i + 1}</span>{label}{i < 2 && <Icon kind="arrow" />}</button>)}</div><p className={styles.sceneStatus} role="status">{descriptions[step]}</p></div>;
}

function ClinicalScene() {
  const [department, setDepartment] = useState(0);
  const departments = ["الاستقبال", "العيادات", "المخبر", "الأشعة"];
  const descriptions = ["المواعيد والدور، منذ أول زيارة.", "الزيارات والمعلومات في ملف المريض.", "طلبات التحاليل ونتائجها مرتبطة بالملف.", "طلبات التصوير ونتائجها في سياق واحد."];
  return <div className={styles.clinicalScene}><Image src="/media/home-brochure/clinical.jpg" alt="رسم من كتيّب Clinical PRO يوضّح ترابط أقسام المركز الطبي" width={1440} height={1076} sizes="(max-width: 700px) 85vw, 600px" /><div className={styles.clinicalControls}><div>{departments.map((label, i) => <button key={label} type="button" aria-pressed={department === i} onClick={() => setDepartment(i)}>{label}</button>)}</div><p role="status"><Icon kind="check" />{descriptions[department]}</p></div></div>;
}

function RiskScene() {
  const [selected, setSelected] = useState({ probability: 2, impact: 2 });
  const levels = ["منخفض", "متوسط", "مرتفع"];
  const severity = selected.probability * selected.impact;
  return <div className={styles.riskScene}><div className={styles.riskIntro}><Icon kind="frona-oprisk" /><div><b>مصفوفة المخاطر</b><small>اختر خلية لاستكشاف التقييم</small></div></div><div className={styles.matrixLayout}><span className={styles.verticalLabel}>الاحتمال</span><div><div className={styles.matrix}>{[3, 2, 1].flatMap((probability) => [1, 2, 3].map((impact) => { const score = probability * impact; return <button key={`${probability}-${impact}`} type="button" data-level={score > 5 ? "high" : score > 2 ? "medium" : "low"} aria-label={`احتمال ${levels[probability - 1]}، أثر ${levels[impact - 1]}`} aria-pressed={selected.probability === probability && selected.impact === impact} onClick={() => setSelected({ probability, impact })}>{selected.probability === probability && selected.impact === impact ? <Icon kind="check" /> : <span>{score}</span>}</button>; }))}</div><div className={styles.axis}><span>منخفض</span><b>الأثر</b><span>مرتفع</span></div></div><div className={styles.riskResult} role="status"><span data-level={severity > 5 ? "high" : severity > 2 ? "medium" : "low"} /><b>{severity > 5 ? "أولوية مرتفعة" : severity > 2 ? "أولوية متوسطة" : "أولوية منخفضة"}</b><p>احتمال {levels[selected.probability - 1]}<br />أثر {levels[selected.impact - 1]}</p><small>تقييم توضيحي</small></div></div></div>;
}

export function HomeProductExplorer({ products }: { products: Product[] }) {
  const available = products.filter((product): product is Product & { id: ProductId } => product.id in copy);
  const [activeId, setActiveId] = useState<string>(available.some((product) => product.id === "archive") ? "archive" : available[0]?.id ?? "");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const active = available.find((product) => product.id === activeId) ?? available[0];
  if (!active) return null;
  const activeCopy = copy[active.id];
  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowLeft") next = (index + 1) % available.length;
    else if (event.key === "ArrowRight") next = (index - 1 + available.length) % available.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = available.length - 1;
    else return;
    event.preventDefault(); setActiveId(available[next].id); tabs.current[next]?.focus();
  }
  return <div className={styles.explorer}>
    <div className={styles.tabs} role="tablist" aria-label="استكشف منتجات أميسكوم" dir="rtl">{available.map((product, index) => <button key={product.id} ref={(node) => { tabs.current[index] = node; }} id={`${uid}-tab-${product.id}`} role="tab" type="button" aria-selected={active.id === product.id} aria-controls={`${uid}-panel`} tabIndex={active.id === product.id ? 0 : -1} onKeyDown={(event) => onTabKey(event, index)} onClick={() => setActiveId(product.id)}><Icon kind={product.id} /><span><b dir="ltr">{copy[product.id].name}</b><small>{copy[product.id].purpose}</small></span></button>)}</div>
    <div id={`${uid}-panel`} className={styles.panel} role="tabpanel" aria-labelledby={`${uid}-tab-${active.id}`} tabIndex={0}>
      <div className={styles.panelCopy} key={`copy-${active.id}`}><h3>{activeCopy.title.split("\n").map((line, index) => <span key={line}>{line}{index === 0 && <br />}</span>)}</h3><p>{activeCopy.text}</p><Link href={active.href}>استكشف {activeCopy.name}<Icon kind="arrow" /></Link></div>
      <div className={styles.scene} key={active.id}>{active.id === "archive" ? <ArchiveScene /> : active.id === "workflow" ? <WorkflowScene /> : active.id === "clinical-pro" ? <ClinicalScene /> : <RiskScene />}</div>
    </div>
    <p className={styles.caption}>الصور من كتيّبات أميسكوم. العينات التفاعلية توضيحية لشرح الفكرة وليست واجهات الأنظمة الفعلية.</p>
  </div>;
}
