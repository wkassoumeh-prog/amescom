import styles from "./ArchiveExperience.module.css";

export type ArchivePlace = "back" | "mid" | "front";
export type ArchiveKind = "DOC" | "PDF";

export const archiveKit: readonly {
  place: ArchivePlace;
  paperTitle: string;
  fileName: string;
  note: string;
  kind: ArchiveKind;
  stamped: boolean;
}[] = [
  {
    place: "back",
    paperTitle: "سياسة المشتريات",
    fileName: "سياسة المشتريات.doc",
    note: "مصنّفة. قابلة للبحث. في مكانها.",
    kind: "DOC",
    stamped: false,
  },
  {
    place: "mid",
    paperTitle: "محضر الاجتماع",
    fileName: "محضر الاجتماع.pdf",
    note: "مصنّف. قابل للبحث. في مكانه.",
    kind: "PDF",
    stamped: false,
  },
  {
    place: "front",
    paperTitle: "عقد توريد",
    fileName: "عقد توريد.pdf",
    note: "مصنّف. قابل للبحث. في مكانه.",
    kind: "PDF",
    stamped: true,
  },
];

function classes(...names: Array<string | undefined>) {
  return names.filter(Boolean).join(" ");
}

export function PaperSheet({
  place,
  title,
  stamped = false,
  decorative = false,
  className,
}: {
  place: ArchivePlace;
  title: string;
  stamped?: boolean;
  decorative?: boolean;
  className?: string;
}) {
  return (
    <div
      className={classes(styles.sheet, className)}
      data-sheet={place}
      aria-hidden={decorative || undefined}
    >
      <span>{title}</span>
      <i />
      <i />
      <i />
      {stamped ? <em className={styles.stamp}>مؤرشف</em> : null}
    </div>
  );
}

export function FileCard({
  place,
  name,
  note,
  kind,
  decorative = false,
  className,
}: {
  place: ArchivePlace;
  name: string;
  note: string;
  kind: ArchiveKind;
  decorative?: boolean;
  className?: string;
}) {
  return (
    <div
      className={classes(styles.floatingDocument, className)}
      data-place={place}
      aria-hidden={decorative || undefined}
    >
      <span className={styles.fileIcon} data-kind={kind === "DOC" ? "DOC" : undefined}>
        {kind}
      </span>
      <div>
        <b>{name}</b>
        <small>{note}</small>
      </div>
      <span className={styles.check}>✓</span>
    </div>
  );
}

export function ArchiveStamp({ className }: { className?: string }) {
  return <em className={classes(styles.stamp, className)}>مؤرشف</em>;
}
