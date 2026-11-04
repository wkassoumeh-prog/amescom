"use client";

import { useEffect, useState, type ReactNode } from "react";
import styles from "./WorkflowPreview.module.css";

export type WorkflowSceneId = "designer" | "notifications" | "repository" | "reports";

type NodeId = "doc" | "pending" | "review" | "accepted" | "closed" | "rejected" | "ineligible";

type Tone = "purple" | "magenta" | "green" | "red" | "crimson";

const emphasis: Record<WorkflowSceneId, NodeId[] | null> = {
  designer: null,
  notifications: ["pending", "review"],
  repository: ["doc", "closed"],
  reports: ["accepted", "rejected", "ineligible"],
};

const notes: Record<NodeId, string> = {
  doc: "تبدأ الوثيقة هنا بعد استكمال بياناتها.",
  pending: "تبقى معلّقة حتى تكتمل البيانات المطلوبة.",
  review: "تصل المهمة إلى رئيس القسم للمراجعة.",
  accepted: "بعد القبول تنتقل الوثيقة إلى الأرشفة.",
  closed: "حالة نهائية: أُرشفت الوثيقة.",
  rejected: "حالة نهائية: رُفضت الوثيقة.",
  ineligible: "غير مرشّحة، وتُعاد لاستكمال البيانات.",
};

const nodes: Array<{
  id: NodeId;
  title: string;
  tone: Tone;
  x: number;
  y: number;
  w: number;
  h: number;
  final?: boolean;
  checked?: boolean;
}> = [
  { id: "pending", title: "معلق", tone: "purple", x: 18.2, y: 14, w: 15, h: 21, final: true },
  { id: "review", title: "رئيس القسم", tone: "magenta", x: 50.5, y: 20, w: 15, h: 21 },
  { id: "accepted", title: "مقبول", tone: "green", x: 68.6, y: 3, w: 14.2, h: 19, final: true, checked: true },
  { id: "closed", title: "مغلقة", tone: "crimson", x: 85.6, y: 3, w: 13, h: 19, final: true, checked: true },
  { id: "rejected", title: "مرفوضة", tone: "red", x: 68.6, y: 36.5, w: 14.2, h: 19, final: true },
  { id: "ineligible", title: "غير المرشحة", tone: "green", x: 18.2, y: 62.5, w: 15.4, h: 20, final: true },
];

const edges: Array<{ d: string; label: string; x: number; y: number }> = [
  { d: "M 15.4 34.8 C 17.4 34.8, 16.6 24.5, 18.2 24.5", label: "إكمال", x: 11.8, y: 26.2 },
  { d: "M 33.2 24.5 C 40 24.5, 43 30.5, 50.5 30.5", label: "إرسال إلى القسم", x: 41.8, y: 21.6 },
  { d: "M 65.5 26.2 C 67.4 22, 67.2 12.5, 68.6 12.5", label: "قبول", x: 62.4, y: 12.4 },
  { d: "M 82.8 12.5 L 85.6 12.5", label: "أرشفة", x: 84.2, y: 25.5 },
  { d: "M 65.5 35.5 C 67.2 38, 67, 46, 68.6 46", label: "رفض", x: 64.6, y: 43.2 },
  { d: "M 58 41 C 58 60, 40 70, 33.6 72.5", label: "إعلان", x: 50.5, y: 64 },
  { d: "M 25.7 35 L 25.7 62.5", label: "يرجى استكمال البيانات", x: 42, y: 47 },
];

export function WorkflowPreview({ scene }: { scene: WorkflowSceneId }) {
  const [selected, setSelected] = useState<NodeId | null>(null);
  const [scale, setScale] = useState(1);
  const [hint, setHint] = useState(false);
  const focused = selected ? [selected] : emphasis[scene];

  useEffect(() => {
    setSelected(null);
  }, [scene]);

  function hot(id: NodeId) {
    return !focused || focused.includes(id);
  }

  return (
    <div className={styles.app}>
      <header className={styles.chrome} dir="rtl">
        <div className={styles.brand} dir="ltr">
          <span className={styles.mark} aria-hidden="true">
            <i />
            <i />
          </span>
          AMeSCom
        </div>
        <p className={styles.chromeNav}>
          <span>مسارات الوثائق</span>
          <span>الوثائق</span>
          <span>الإعدادات</span>
        </p>
        <div className={styles.chromeEnd}>
          <span className={styles.chromeIcon} aria-hidden="true">
            <CalendarIcon />
          </span>
          <span className={styles.chromeIcon} aria-hidden="true">
            <GearIcon />
          </span>
          <span className={styles.chromeIcon} aria-hidden="true">
            <UserIcon />
          </span>
          <span className={styles.create}>
            <PlusIcon />
            إنشاء
          </span>
        </div>
      </header>

      <div className={styles.stepper} dir="rtl">
        <small>أنواع الوثائق</small>
        <div className={styles.steps}>
          <span>
            المواصفات <b>1</b>
          </span>
          <span data-current="true">
            مسار الوثيقة <b>2</b>
          </span>
          <span>
            الإجراءات <b>3</b>
          </span>
        </div>
      </div>

      <div className={styles.board}>
        <div className={styles.scroller}>
        <div className={styles.diagram} data-focus={focused ? "on" : "off"} style={{ transform: `scale(${scale})` }}>
          <svg className={styles.wires} viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {edges.map((edge) => (
              <path key={edge.label} d={edge.d} vectorEffect="non-scaling-stroke" />
            ))}
          </svg>

          <button
            type="button"
            className={styles.start}
            style={{ left: "1.4%", top: "30%", width: "14%", height: "9.5%" }}
            aria-pressed={selected === "doc"}
            aria-label="بداية المسار: استكمال البيانات"
            onClick={() => setSelected((current) => (current === "doc" ? null : "doc"))}
            data-hot={hot("doc") ? "true" : "false"}
          >
            <StarIcon />
            <UserIcon />
          </button>

          <button
            type="button"
            className={styles.doc}
            style={{ left: "1.4%", top: "43%", width: "14%", height: "16%" }}
            aria-pressed={selected === "doc"}
            onClick={() => setSelected((current) => (current === "doc" ? null : "doc"))}
            data-hot={hot("doc") ? "true" : "false"}
          >
            <span className={styles.docIcon} aria-hidden="true">
              <DocIcon />
            </span>
            <span>
              <b>استكمال البيانات</b>
              <small>مدخل المسار</small>
            </span>
          </button>

          {nodes.map((node) => (
            <button
              key={node.id}
              type="button"
              className={styles.node}
              data-tone={node.tone}
              data-hot={hot(node.id) ? "true" : "false"}
              style={{ left: `${node.x}%`, top: `${node.y}%`, width: `${node.w}%`, height: `${node.h}%` }}
              aria-pressed={selected === node.id}
              onClick={() => setSelected((current) => (current === node.id ? null : node.id))}
            >
              <span className={styles.nodeHead}>
                <span className={styles.nodeTools}>
                  <TrashIcon />
                  <LinkIcon />
                  {node.final && (
                    <span className={styles.badge}>
                      {node.checked && <CheckIcon />}
                      حالة نهائية
                    </span>
                  )}
                </span>
                <span className={styles.nodeTitle}>{node.title}</span>
              </span>
              <span className={styles.nodeBody} aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
            </button>
          ))}

          {edges.map((edge) => (
            <span key={edge.label} className={styles.edgeLabel} style={{ left: `${edge.x}%`, top: `${edge.y}%` }}>
              {edge.label}
            </span>
          ))}
        </div>
        </div>

        <div className={styles.dock}>
          <button type="button" aria-expanded={hint} onClick={() => setHint((open) => !open)}>
            <HelpIcon />
            <span className={styles.sr}>شرح المثال</span>
          </button>
          <button type="button" aria-label="تصغير" disabled={scale <= 0.88} onClick={() => setScale((value) => Math.max(0.88, Number((value - 0.12).toFixed(2))))}>
            <MinusIcon />
          </button>
          <button type="button" aria-label="تكبير" disabled={scale >= 1.12} onClick={() => setScale((value) => Math.min(1.12, Number((value + 0.12).toFixed(2))))}>
            <PlusIcon />
          </button>
          <button type="button" aria-label="إعادة المقاس" onClick={() => setScale(1)}>
            <SearchIcon />
          </button>
        </div>

        <p className={styles.status} role="status">
          {hint && !selected ? "مثال توضيحي. اختر أي خطوة لمعرفة دورها في المسار." : selected ? notes[selected] : ""}
        </p>
      </div>
    </div>
  );
}

function Svg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

function StarIcon() {
  return (
    <Svg>
      <path d="M12 3.5 14.1 8.8 19.8 9.2 15.4 13l1.4 5.5L12 15.8 7.2 18.5 8.6 13 4.2 9.2 9.9 8.8 12 3.5Z" />
    </Svg>
  );
}

function UserIcon() {
  return (
    <Svg>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.5 19.2c1.2-2.8 3.4-4.2 6.5-4.2s5.3 1.4 6.5 4.2" />
    </Svg>
  );
}

function GearIcon() {
  return (
    <Svg>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18" />
    </Svg>
  );
}

function CalendarIcon() {
  return (
    <Svg>
      <rect x="4" y="5.5" width="16" height="14" rx="2" />
      <path d="M8 3.8v3.2M16 3.8v3.2M4 10h16" />
    </Svg>
  );
}

function PlusIcon() {
  return (
    <Svg>
      <path d="M12 6v12M6 12h12" />
    </Svg>
  );
}

function MinusIcon() {
  return (
    <Svg>
      <path d="M6 12h12" />
    </Svg>
  );
}

function TrashIcon() {
  return (
    <Svg>
      <path d="M5 8h14M9 8V5.8h6V8M8 8l.7 10h6.6L16 8" />
    </Svg>
  );
}

function LinkIcon() {
  return (
    <Svg>
      <path d="M10 13.5 8.6 14.9a3.2 3.2 0 0 1-4.5-4.5L6.5 8M14 10.5l1.4-1.4a3.2 3.2 0 0 1 4.5 4.5L17.5 16" />
      <path d="M9 15.2 15 9" />
    </Svg>
  );
}

function CheckIcon() {
  return (
    <Svg>
      <path d="M5 12.5 9.2 17 19 7" />
    </Svg>
  );
}

function DocIcon() {
  return (
    <Svg>
      <path d="M7 3.8h7l4 4V20H7V3.8Z" />
      <path d="M14 3.8V8h4M9.5 12.5h5M9.5 16h5" />
    </Svg>
  );
}

function HelpIcon() {
  return (
    <Svg>
      <circle cx="12" cy="12" r="8" />
      <path d="M9.5 9.5a2.5 2.5 0 1 1 3.3 2.4c-.7.3-1.3.9-1.3 1.7V14" />
      <path d="M12 17.2h.1" />
    </Svg>
  );
}

function SearchIcon() {
  return (
    <Svg>
      <circle cx="11" cy="11" r="5.5" />
      <path d="M15.5 15.5 20 20" />
    </Svg>
  );
}
