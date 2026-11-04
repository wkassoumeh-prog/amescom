import styles from "./HeroDiagram.module.css";

/** Original explanatory diagram. Not product UI. */
export function HeroDiagram() {
  return (
    <figure className={styles.figure}>
      <svg
        className={styles.svg}
        viewBox="0 0 480 320"
        width="480"
        height="320"
        direction="rtl"
        role="img"
        aria-labelledby="hero-diagram-title hero-diagram-desc"
      >
        <title id="hero-diagram-title">مسار من الوثيقة إلى القرار</title>
        <desc id="hero-diagram-desc">
          رسم توضيحي لثلاثة أعمال: تنظيم الوثائق، مرور الموافقات، وتشغيل العيادة. ليس لقطة من برنامج.
        </desc>
        <rect x="8" y="8" width="464" height="304" rx="16" fill="#F7F8FA" stroke="#E3E7EB" />
        <path
          d="M86 92h92c18 0 28 12 28 28v80c0 16 10 28 28 28h92"
          fill="none"
          stroke="#145DA0"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <g>
          <rect x="40" y="48" width="120" height="88" rx="10" fill="#fff" stroke="#E3E7EB" />
          <rect x="56" y="64" width="88" height="8" rx="4" fill="#145DA0" />
          <rect x="56" y="80" width="72" height="6" rx="3" fill="#E3E7EB" />
          <rect x="56" y="94" width="80" height="6" rx="3" fill="#E3E7EB" />
          <text x="100" y="152" textAnchor="middle" className={styles.label}>
            أرشفة
          </text>
        </g>
        <g>
          <rect x="180" y="116" width="120" height="88" rx="10" fill="#fff" stroke="#E3E7EB" />
          <circle cx="208" cy="148" r="8" fill="#EDF4FC" stroke="#145DA0" />
          <circle cx="240" cy="148" r="8" fill="#EDF4FC" stroke="#145DA0" />
          <circle cx="272" cy="148" r="8" fill="#145DA0" />
          <path d="M216 148h16M248 148h16" stroke="#145DA0" strokeWidth="2" />
          <text x="240" y="220" textAnchor="middle" className={styles.label}>
            اعتماد
          </text>
        </g>
        <g>
          <rect x="320" y="176" width="120" height="88" rx="10" fill="#fff" stroke="#E3E7EB" />
          <rect x="336" y="196" width="40" height="48" rx="6" fill="#EDF4FC" />
          <rect x="384" y="196" width="40" height="22" rx="6" fill="#E3E7EB" />
          <rect x="384" y="222" width="40" height="22" rx="6" fill="#E3E7EB" />
          <text x="380" y="288" textAnchor="middle" className={styles.label}>
            عيادة
          </text>
        </g>
      </svg>
      <figcaption className={styles.caption}>
        رسم توضيحي لمسار العمل، وليس لقطة من واجهة البرنامج.
      </figcaption>
    </figure>
  );
}
