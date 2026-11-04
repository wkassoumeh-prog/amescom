import type { ProductContent } from "@content/types";
import styles from "./ProductDiagram.module.css";

type DiagramProps = {
  titleId: string;
  descId: string;
};

function ArchiveDiagram({ titleId, descId }: DiagramProps) {
  return (
    <svg
      className={styles.svg}
      viewBox="0 0 480 300"
      width="480"
      height="300"
      direction="rtl"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
    >
      <title id={titleId}>دورة الوثيقة من الالتقاط إلى البحث</title>
      <desc id={descId}>
        رسم توضيحي لأربع خطوات: التقاط الوثيقة، التعرّف على النص، التصنيف، ثم البحث. ليس لقطة من برنامج.
      </desc>
      <rect x="8" y="8" width="464" height="284" rx="16" fill="#F7F8FA" stroke="#E3E7EB" />
      <path
        d="M118 118h52M210 118h52M302 118h52"
        fill="none"
        stroke="#145DA0"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g>
        <rect x="36" y="64" width="82" height="108" rx="8" fill="#fff" stroke="#E3E7EB" />
        <rect x="48" y="80" width="58" height="6" rx="3" fill="#145DA0" />
        <rect x="48" y="96" width="46" height="5" rx="2" fill="#E3E7EB" />
        <rect x="48" y="110" width="52" height="5" rx="2" fill="#E3E7EB" />
        <rect x="48" y="124" width="40" height="5" rx="2" fill="#E3E7EB" />
        <text x="77" y="204" textAnchor="middle" className={styles.label}>
          التقاط
        </text>
      </g>
      <g>
        <rect x="128" y="64" width="82" height="108" rx="8" fill="#fff" stroke="#E3E7EB" />
        <rect x="140" y="88" width="58" height="10" rx="3" fill="#EDF4FC" stroke="#145DA0" />
        <rect x="144" y="108" width="28" height="6" rx="2" fill="#145DA0" />
        <rect x="176" y="108" width="18" height="6" rx="2" fill="#E3E7EB" />
        <rect x="144" y="122" width="40" height="6" rx="2" fill="#E3E7EB" />
        <text x="169" y="204" textAnchor="middle" className={styles.label}>
          تعرّف
        </text>
      </g>
      <g>
        <rect x="220" y="64" width="82" height="108" rx="8" fill="#fff" stroke="#E3E7EB" />
        <rect x="232" y="82" width="58" height="18" rx="4" fill="#EDF4FC" />
        <rect x="232" y="106" width="58" height="18" rx="4" fill="#fff" stroke="#E3E7EB" />
        <rect x="232" y="130" width="58" height="18" rx="4" fill="#fff" stroke="#E3E7EB" />
        <text x="261" y="204" textAnchor="middle" className={styles.label}>
          تصنيف
        </text>
      </g>
      <g>
        <rect x="312" y="64" width="132" height="108" rx="8" fill="#fff" stroke="#E3E7EB" />
        <circle cx="338" cy="108" r="14" fill="none" stroke="#145DA0" strokeWidth="3" />
        <path d="M348 118l16 16" stroke="#145DA0" strokeWidth="3" strokeLinecap="round" />
        <rect x="372" y="96" width="52" height="8" rx="4" fill="#E3E7EB" />
        <rect x="372" y="112" width="40" height="6" rx="3" fill="#EDF4FC" />
        <text x="378" y="204" textAnchor="middle" className={styles.label}>
          بحث
        </text>
      </g>
    </svg>
  );
}

function WorkflowDiagram({ titleId, descId }: DiagramProps) {
  return (
    <svg
      className={styles.svg}
      viewBox="0 0 480 300"
      width="480"
      height="300"
      direction="rtl"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
    >
      <title id={titleId}>مسار المراجعة والاعتماد مع تفرّع</title>
      <desc id={descId}>
        رسم توضيحي لطلب يمر بمراجعة ثم يتفرع إلى اعتماد أو إعادة. ليس لقطة من واجهة البرنامج.
      </desc>
      <rect x="8" y="8" width="464" height="284" rx="16" fill="#F7F8FA" stroke="#E3E7EB" />
      <path
        d="M156 118h48M252 90h48M252 160h48"
        fill="none"
        stroke="#145DA0"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M228 118c0-28 8-40 24-40M228 118c0 28 8 40 24 40" fill="none" stroke="#145DA0" strokeWidth="3" />
      <g>
        <rect x="40" y="78" width="116" height="80" rx="10" fill="#fff" stroke="#E3E7EB" />
        <circle cx="68" cy="118" r="10" fill="#EDF4FC" stroke="#145DA0" />
        <rect x="88" y="110" width="52" height="8" rx="4" fill="#E3E7EB" />
        <text x="98" y="192" textAnchor="middle" className={styles.label}>
          طلب
        </text>
      </g>
      <g>
        <rect x="204" y="78" width="72" height="80" rx="10" fill="#fff" stroke="#145DA0" />
        <rect x="218" y="106" width="44" height="8" rx="4" fill="#145DA0" />
        <rect x="218" y="122" width="32" height="6" rx="3" fill="#E3E7EB" />
        <text x="240" y="192" textAnchor="middle" className={styles.label}>
          مراجعة
        </text>
      </g>
      <g>
        <rect x="300" y="40" width="132" height="64" rx="10" fill="#fff" stroke="#E3E7EB" />
        <circle cx="324" cy="72" r="9" fill="#145DA0" />
        <rect x="342" y="66" width="68" height="8" rx="4" fill="#EDF4FC" />
        <text x="366" y="128" textAnchor="middle" className={styles.label}>
          اعتماد
        </text>
      </g>
      <g>
        <rect x="300" y="148" width="132" height="64" rx="10" fill="#fff" stroke="#E3E7EB" />
        <circle cx="324" cy="180" r="9" fill="#EDF4FC" stroke="#145DA0" />
        <rect x="342" y="174" width="56" height="8" rx="4" fill="#E3E7EB" />
        <text x="366" y="240" textAnchor="middle" className={styles.label}>
          إعادة
        </text>
      </g>
    </svg>
  );
}

function ClinicalDiagram({ titleId, descId }: DiagramProps) {
  return (
    <svg
      className={styles.svg}
      viewBox="0 0 480 300"
      width="480"
      height="300"
      direction="rtl"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
    >
      <title id={titleId}>وحدات المركز الطبي حول ملف المريض</title>
      <desc id={descId}>
        رسم توضيحي يربط الاستقبال والعيادات والمخبر والأشعة بملف مريض واحد. ليس لقطة من برنامج.
      </desc>
      <rect x="8" y="8" width="464" height="284" rx="16" fill="#F7F8FA" stroke="#E3E7EB" />
      <path
        d="M240 96v20M168 150h48M264 150h48M240 184v20"
        stroke="#145DA0"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <g>
        <rect x="178" y="116" width="124" height="68" rx="12" fill="#fff" stroke="#145DA0" />
        <text x="240" y="156" textAnchor="middle" className={styles.label}>
          ملف المريض
        </text>
      </g>
      <g>
        <rect x="168" y="32" width="144" height="64" rx="10" fill="#fff" stroke="#E3E7EB" />
        <text x="240" y="70" textAnchor="middle" className={styles.label}>
          استقبال
        </text>
      </g>
      <g>
        <rect x="36" y="118" width="124" height="64" rx="10" fill="#fff" stroke="#E3E7EB" />
        <text x="98" y="156" textAnchor="middle" className={styles.label}>
          عيادات
        </text>
      </g>
      <g>
        <rect x="320" y="118" width="124" height="64" rx="10" fill="#fff" stroke="#E3E7EB" />
        <text x="382" y="156" textAnchor="middle" className={styles.label}>
          مخبر
        </text>
      </g>
      <g>
        <rect x="168" y="204" width="144" height="64" rx="10" fill="#fff" stroke="#E3E7EB" />
        <text x="240" y="242" textAnchor="middle" className={styles.label}>
          أشعة
        </text>
      </g>
    </svg>
  );
}

function FronaDiagram({ titleId, descId }: DiagramProps) {
  return (
    <svg
      className={styles.svg}
      viewBox="0 0 480 300"
      width="480"
      height="300"
      direction="rtl"
      role="img"
      aria-labelledby={`${titleId} ${descId}`}
    >
      <title id={titleId}>دورة إدارة المخاطر التشغيلية</title>
      <desc id={descId}>
        رسم توضيحي يربط ملف المخاطر بالقياس والتوصيات والتقارير. ليس لقطة من برنامج.
      </desc>
      <rect x="8" y="8" width="464" height="284" rx="16" fill="#F7F8FA" stroke="#E3E7EB" />
      <circle cx="240" cy="150" r="54" fill="none" stroke="#145DA0" strokeWidth="3" strokeDasharray="6 8" />
      <rect x="196" y="126" width="88" height="48" rx="10" fill="#fff" stroke="#145DA0" />
      <text x="240" y="156" textAnchor="middle" className={styles.label}>
        مخاطر
      </text>
      <g>
        <rect x="48" y="40" width="128" height="64" rx="10" fill="#fff" stroke="#E3E7EB" />
        <rect x="64" y="64" width="96" height="8" rx="4" fill="#145DA0" />
        <text x="112" y="128" textAnchor="middle" className={styles.label}>
          ملف
        </text>
      </g>
      <g>
        <rect x="304" y="40" width="128" height="64" rx="10" fill="#fff" stroke="#E3E7EB" />
        <rect x="320" y="58" width="96" height="6" rx="3" fill="#E3E7EB" />
        <rect x="320" y="72" width="64" height="6" rx="3" fill="#EDF4FC" />
        <text x="368" y="128" textAnchor="middle" className={styles.label}>
          قياس
        </text>
      </g>
      <g>
        <rect x="48" y="196" width="128" height="64" rx="10" fill="#fff" stroke="#E3E7EB" />
        <rect x="64" y="220" width="40" height="16" rx="4" fill="#EDF4FC" />
        <rect x="112" y="220" width="48" height="16" rx="4" fill="#E3E7EB" />
        <text x="112" y="284" textAnchor="middle" className={styles.label}>
          توصيات
        </text>
      </g>
      <g>
        <rect x="304" y="196" width="128" height="64" rx="10" fill="#fff" stroke="#E3E7EB" />
        <rect x="320" y="216" width="96" height="8" rx="4" fill="#145DA0" />
        <rect x="320" y="232" width="72" height="6" rx="3" fill="#E3E7EB" />
        <text x="368" y="284" textAnchor="middle" className={styles.label}>
          تقارير
        </text>
      </g>
    </svg>
  );
}

const captions: Record<ProductContent["id"], string> = {
  archive: "رسم توضيحي لدورة الوثيقة من الالتقاط إلى البحث. ليس لقطة من واجهة البرنامج.",
  workflow: "رسم توضيحي لمسار المراجعة والاعتماد مع تفرّع. ليس لقطة من واجهة البرنامج.",
  "clinical-pro": "رسم توضيحي لوحدات المركز الطبي حول ملف المريض. ليس لقطة من واجهة البرنامج.",
  "frona-oprisk": "رسم توضيحي لدورة إدارة المخاطر التشغيلية. ليس لقطة من واجهة البرنامج.",
};

export function ProductDiagram({ product }: { product: ProductContent }) {
  const titleId = `${product.id}-diagram-title`;
  const descId = `${product.id}-diagram-desc`;
  const ids = { titleId, descId };

  return (
    <figure className={styles.figure}>
      {product.id === "archive" ? <ArchiveDiagram {...ids} /> : null}
      {product.id === "workflow" ? <WorkflowDiagram {...ids} /> : null}
      {product.id === "clinical-pro" ? <ClinicalDiagram {...ids} /> : null}
      {product.id === "frona-oprisk" ? <FronaDiagram {...ids} /> : null}
      <figcaption className={styles.caption}>{captions[product.id]}</figcaption>
    </figure>
  );
}
