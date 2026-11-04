"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import home from "@/components/home/HomeProductStage.module.css";
import { WorkflowPreview, type WorkflowSceneId } from "./WorkflowPreview";
import styles from "./WorkflowPreview.module.css";

const scenes: Record<WorkflowSceneId, { name: string; purpose: string; title: string; text: string }> = {
  designer: {
    name: "المسارات",
    purpose: "تصميم الاعتماد",
    title: "صمّم مسار الموافقة.\nبالسحب والإفلات.",
    text: "تحديد المستخدمين والترتيب وشروط التفرّع والصلاحيات دون معرفة برمجية.",
  },
  notifications: {
    name: "المهام",
    purpose: "إشعارات المتابعة",
    title: "المهمة تصل لصاحبها.\nفي وقتها.",
    text: "تذكير تلقائي بالمهام الواجبة، مع إشعارات عبر البريد الإلكتروني والتطبيق.",
  },
  repository: {
    name: "المستندات",
    purpose: "حفظ وبحث",
    title: "مكان واحد للملف.\nوسبيل واضح لإيجاده.",
    text: "تصنيف المستندات وحفظها والبحث عنها عبر عوامل تصفية.",
  },
  reports: {
    name: "التقارير",
    purpose: "متابعة الإنجاز",
    title: "اعرف أين يتأخر العمل.\nومن أين يتحرّك.",
    text: "تقارير عن متوسط وقت الإنجاز ونقاط الاختناق وإنتاجية الخطوات، مع سجل تدقيق لكل تغيير.",
  },
};

const order: WorkflowSceneId[] = ["designer", "notifications", "repository", "reports"];

export function WorkflowSceneStage() {
  const [activeId, setActiveId] = useState<WorkflowSceneId>("designer");
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const copy = scenes[activeId];
  const playing = !paused && !reduceMotion;

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;
    const timer = window.setInterval(() => {
      setActiveId((current) => order[(order.indexOf(current) + 1) % order.length]);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [paused, reduceMotion]);

  function selectScene(id: WorkflowSceneId) {
    setActiveId(id);
    setPaused(true);
  }

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === "ArrowLeft") next = (index + 1) % order.length;
    else if (event.key === "ArrowRight") next = (index - 1 + order.length) % order.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = order.length - 1;
    else return;
    event.preventDefault();
    selectScene(order[next]);
    tabs.current[next]?.focus();
  }

  return (
    <div className={home.stage} onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocusCapture={() => setPaused(true)}>
      <div className={styles.frame} id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${activeId}`}>
        <WorkflowPreview scene={activeId} />
        <div className={styles.copy} key={activeId}>
          <h3>
            {copy.title.split("\n").map((line, index) => (
              <span key={line}>
                {line}
                {index === 0 && <br />}
              </span>
            ))}
          </h3>
          <p>{copy.text}</p>
        </div>
      </div>

      <div className={home.tabs} role="tablist" aria-label="قدرات AMESCOM Workflow" dir="rtl">
        {order.map((id, index) => (
          <button
            key={id}
            ref={(node) => {
              tabs.current[index] = node;
            }}
            id={`${uid}-tab-${id}`}
            role="tab"
            type="button"
            aria-selected={activeId === id}
            aria-controls={`${uid}-panel`}
            tabIndex={activeId === id ? 0 : -1}
            onKeyDown={(event) => onTabKey(event, index)}
            onClick={() => selectScene(id)}
          >
            <b>{scenes[id].name}</b>
            <small>{scenes[id].purpose}</small>
            <span className={home.meter} data-playing={playing && activeId === id ? "on" : "off"} />
          </button>
        ))}
      </div>
      <p className={home.caption}>مثال توضيحي لمصمم المسارات، لشرح الفكرة فقط، وليس واجهة النظام الفعلية.</p>
    </div>
  );
}
