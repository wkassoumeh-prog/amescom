"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowIcon } from "@/components/Icons";
import styles from "./HomeProductStage.module.css";

type Product = { id: string; name: string; href: string };
type ProductId = "archive" | "workflow" | "clinical-pro" | "frona-oprisk";

const scenes: Record<
  ProductId,
  {
    name: string;
    purpose: string;
    title: string;
    text: string;
    src: string;
    alt: string;
    position: string;
  }
> = {
  archive: {
    name: "ARCHIVE",
    purpose: "إدارة الوثائق",
    title: "تذكّر المعلومة.\nودع الأرشيف يجدها.",
    text: "من الوثيقة الممسوحة إلى نص قابل للبحث. نظّم الملفات والمرفقات، واحتفظ بتاريخ كل إصدار.",
    src: "/media/archive-brochure/cover.jpg",
    alt: "تصوّر من كتيّب ARCHIVE لرقمنة المستندات في بيئة تقنية",
    position: "52% 58%",
  },
  workflow: {
    name: "Workflow",
    purpose: "مسارات العمل",
    title: "كل خطوة واضحة.\nوكل مهمة في مسارها.",
    text: "صمّم مسارات المراجعة والاعتماد، وحدّد المسؤوليات وتابع انتقال المستندات بين أقسام مؤسستك.",
    src: "/media/home-brochure/tech-apps-hero.jpg",
    alt: "شاشات تطبيقات برمجية لمسارات العمل والتحليل، صورة توضيحية",
    position: "55% 48%",
  },
  "clinical-pro": {
    name: "Clinical PRO",
    purpose: "المراكز الطبية",
    title: "أقسام متعددة.\nوملف واحد للمريض.",
    text: "اربط الاستقبال والعيادات والمخبر والأشعة، لتصل المعلومات إلى كل قسم حسب الصلاحيات.",
    src: "/media/home-brochure/clinical-staff.jpg",
    alt: "طبيب يستخدم تطبيقاً طبياً على لوحي في مركز رعاية، من كتيّب Clinical PRO",
    position: "18% 42%",
  },
  "frona-oprisk": {
    name: "FRONA",
    purpose: "المخاطر التشغيلية",
    title: "انظر إلى المخاطر.\nبصورة أوضح.",
    text: "اربط المخاطر بالضوابط، وتابع التقييمات ومؤشرات المخاطر والتوصيات في سياق واحد.",
    src: "/media/home-brochure/frona-tech.jpg",
    alt: "لوح يعرض تصوّراً تقنياً لإدارة المخاطر من كتيّب FRONA",
    position: "48% 46%",
  },
};

export function HomeProductStage({ products }: { products: Product[] }) {
  const available = products.filter((product): product is Product & { id: ProductId } => product.id in scenes);
  const [activeId, setActiveId] = useState<string>(
    available.some((product) => product.id === "archive") ? "archive" : (available[0]?.id ?? ""),
  );
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const active = available.find((product) => product.id === activeId) ?? available[0];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const productIds = available.map((product) => product.id).join(",");

  useEffect(() => {
    const ids = productIds.split(",").filter(Boolean);
    if (paused || reduceMotion || ids.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveId((current) => {
        const index = ids.indexOf(current);
        return ids[(index + 1) % ids.length] ?? current;
      });
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion, productIds]);

  if (!active) return null;
  const copy = scenes[active.id];
  const playing = !paused && !reduceMotion;

  function selectProduct(id: string) {
    setActiveId(id);
    setPaused(true);
  }

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowLeft") next = (index + 1) % available.length;
    else if (event.key === "ArrowRight") next = (index - 1 + available.length) % available.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = available.length - 1;
    else return;
    event.preventDefault();
    selectProduct(available[next].id);
    tabs.current[next]?.focus();
  }

  return (
    <div
      className={styles.stage}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
    >
      <div className={styles.frame} id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${active.id}`}>
        {available.map((product) => {
          const scene = scenes[product.id];
          const isActive = product.id === active.id;
          return (
            <Image
              key={product.id}
              className={`${styles.photo} ${isActive ? styles.photoActive : ""}`}
              src={scene.src}
              alt={isActive ? scene.alt : ""}
              fill
              sizes="(max-width: 700px) 92vw, 1120px"
              style={{ objectPosition: scene.position }}
              priority={product.id === "archive"}
            />
          );
        })}
        <div className={styles.shade} />
        <div className={styles.copy} key={active.id}>
          <h3>
            {copy.title.split("\n").map((line, index) => (
              <span key={line}>
                {line}
                {index === 0 && <br />}
              </span>
            ))}
          </h3>
          <p>{copy.text}</p>
          <Link href={active.href}>
            استكشف {copy.name}
            <ArrowIcon />
          </Link>
        </div>
      </div>

      <div className={styles.tabs} role="tablist" aria-label="استكشف منتجات أميسكوم" dir="rtl">
        {available.map((product, index) => (
          <button
            key={product.id}
            ref={(node) => {
              tabs.current[index] = node;
            }}
            id={`${uid}-tab-${product.id}`}
            role="tab"
            type="button"
            aria-selected={active.id === product.id}
            aria-controls={`${uid}-panel`}
            tabIndex={active.id === product.id ? 0 : -1}
            onKeyDown={(event) => onTabKey(event, index)}
            onClick={() => selectProduct(product.id)}
          >
            <b dir="ltr">{scenes[product.id].name}</b>
            <small>{scenes[product.id].purpose}</small>
            <span className={styles.meter} data-playing={playing && active.id === product.id ? "on" : "off"} />
          </button>
        ))}
      </div>
      <p className={styles.caption}>
        الصور من كتيّبات أميسكوم ومن مشاهد تقنية أُعدّت للموقع. ليست لقطات من واجهات الأنظمة الفعلية.
      </p>
    </div>
  );
}
