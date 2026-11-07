"use client";

import { useRef, useState, type ReactNode } from "react";
import { Button } from "@/components/Button";
import styles from "./ArchiveAssetBoard.module.css";
import archive from "./ArchiveExperience.module.css";
import {
  ArchiveStamp,
  FileCard,
  PaperSheet,
  archiveKit,
  type ArchiveKind,
  type ArchivePlace,
} from "./ArchivePieces";

const sheetFiles: Record<ArchivePlace, { filename: string; label: string }> = {
  back: { filename: "sheet-procurement.png", label: "ورقة سياسة المشتريات" },
  mid: { filename: "sheet-minutes.png", label: "ورقة محضر الاجتماع" },
  front: { filename: "sheet-contract.png", label: "ورقة عقد توريد" },
};

const cardFiles: Record<ArchivePlace, { filename: string; label: string }> = {
  back: { filename: "card-procurement-doc.png", label: "بطاقة سياسة المشتريات" },
  mid: { filename: "card-minutes-pdf.png", label: "بطاقة محضر الاجتماع" },
  front: { filename: "card-contract-pdf.png", label: "بطاقة عقد توريد" },
};

let fontCSS: Promise<string> | null = null;

function blobToDataURL(blob: Blob) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });
}

function keepFace(family: string, weight: string, range: string) {
  const arabic = /U\+0?600/i.test(range);
  const latin = /U\+0{0,4}-00FF/i.test(range) || /U\+0000-00FF/i.test(range);
  if (family === "Noto Sans Arabic" && ["400", "600", "700"].includes(weight)) return arabic;
  if (family === "Inter" && ["600", "700"].includes(weight)) return latin || range.length === 0;
  return false;
}

function archiveFontCSS() {
  if (!fontCSS) {
    fontCSS = buildFontCSS().catch((error) => {
      fontCSS = null;
      throw error;
    });
  }
  return fontCSS;
}

async function buildFontCSS() {
  await document.fonts.ready;
  const faces: string[] = [];

  for (const sheet of document.styleSheets) {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      continue;
    }

    for (const rule of rules) {
      if (rule.type !== CSSRule.FONT_FACE_RULE) continue;
      const style = (rule as CSSStyleRule).style;
      const family = style.fontFamily.replace(/['"]/g, "");
      const weight = style.fontWeight;
      const range = style.getPropertyValue("unicode-range");
      if (!keepFace(family, weight, range)) continue;

      const src = style.getPropertyValue("src");
      const match = /url\(["']?([^"')]+)/.exec(src);
      if (!match) continue;

      const url = new URL(match[1], sheet.href ?? location.href).href;
      const response = await fetch(url);
      if (!response.ok) continue;
      const dataUrl = await blobToDataURL(await response.blob());
      faces.push(
        `@font-face{font-family:${style.fontFamily};font-style:${style.fontStyle || "normal"};font-weight:${weight};font-display:swap;src:url("${dataUrl}") format("woff2");${range ? `unicode-range:${range};` : ""}}`,
      );
    }
  }

  if (faces.length === 0) {
    throw new Error("Missing fonts");
  }

  return faces.join("\n");
}

async function savePng(node: HTMLElement, filename: string, pixelRatio: number) {
  const { toPng } = await import("html-to-image");
  const dataUrl = await toPng(node, {
    pixelRatio,
    fontEmbedCSS: await archiveFontCSS(),
    cacheBust: false,
  });
  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = filename;
  link.click();
}

function AssetMeta({
  label,
  filename,
  disabled,
  onSave,
}: {
  label: string;
  filename: string;
  disabled: boolean;
  onSave: () => void;
}) {
  return (
    <div className={styles.meta}>
      <div>
        <b>{label}</b>
        <small>{filename}</small>
      </div>
      <Button type="button" variant="secondary" disabled={disabled} onClick={onSave}>
        تنزيل PNG
      </Button>
    </div>
  );
}

export function ArchiveAssetBoard() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  async function downloadNode(node: HTMLElement | null, filename: string, pixelRatio: number) {
    if (!node) return;
    setPending(true);
    setMessage(null);
    try {
      await savePng(node, filename, pixelRatio);
      setMessage({ tone: "ok", text: `حُفظ ${filename}` });
    } catch {
      setMessage({ tone: "error", text: "تعذّر إنشاء الصورة. أعد المحاولة." });
    } finally {
      setPending(false);
    }
  }

  async function downloadAll() {
    const nodes = [...(rootRef.current?.querySelectorAll<HTMLElement>("[data-asset]") ?? [])];
    if (nodes.length === 0) return;
    setPending(true);
    setMessage(null);
    try {
      for (const node of nodes) {
        const filename = node.dataset.filename;
        if (!filename) continue;
        await savePng(node, filename, Number(node.dataset.ratio || "2"));
        await new Promise((resolve) => setTimeout(resolve, 350));
      }
      setMessage({ tone: "ok", text: `حُفظت ${nodes.length} صور.` });
    } catch {
      setMessage({ tone: "error", text: "تعذّر حفظ إحدى الصور. جرّب التنزيل الفردي." });
    } finally {
      setPending(false);
    }
  }

  return (
    <div className={`${styles.board} container`} ref={rootRef}>
      <div className={styles.heading}>
        <div>
          <span className={styles.kicker}>ARCHIVE</span>
          <h1>مكوّنات الفيديو</h1>
          <p className={styles.intro}>
            كل قطعة وحدها، بالشكل المستخدم في صفحة الأرشيف. القطع المنفصلة تُحفظ بخلفية شفافة،
            ولقطتا البداية والنهاية بخلفية فاتحة ومقاس 16:9.
          </p>
          <p className={styles.status} data-tone={message?.tone} role="status">
            {message?.text}
          </p>
        </div>
        <Button type="button" disabled={pending} onClick={downloadAll}>
          تنزيل كل الصور
        </Button>
      </div>

      <h2>الورق والملفات</h2>
      <div className={styles.grid}>
        {archiveKit.map((item) => (
          <Piece
            key={item.place}
            filename={sheetFiles[item.place].filename}
            label={sheetFiles[item.place].label}
            disabled={pending}
            onSave={(node) => downloadNode(node, sheetFiles[item.place].filename, 3)}
          >
            <PaperSheet
              className={styles.flatSheet}
              place={item.place}
              title={item.paperTitle}
              stamped={item.stamped}
            />
          </Piece>
        ))}
        <Piece
          filename="stamp-archived.png"
          label="ختم مؤرشف"
          disabled={pending}
          onSave={(node) => downloadNode(node, "stamp-archived.png", 3)}
        >
          <div className={styles.stampWell}>
            <ArchiveStamp />
          </div>
        </Piece>
        {archiveKit.map((item) => (
          <FilePiece
            key={item.place}
            item={item}
            disabled={pending}
            onSave={(node) => downloadNode(node, cardFiles[item.place].filename, 3)}
          />
        ))}
      </div>

      <h2>لقطات التحويل</h2>
      <div className={styles.scenes}>
        <Scene
          filename="scene-paper-stack.png"
          label="قبل: كومة الورق"
          disabled={pending}
          onSave={(node) => downloadNode(node, "scene-paper-stack.png", 2)}
        >
          <div className={`${archive.heroArt} ${styles.paperArt}`} aria-hidden="true">
            {archiveKit.map((item) => (
              <PaperSheet
                key={item.place}
                decorative
                place={item.place}
                title={item.paperTitle}
                stamped={item.stamped}
              />
            ))}
          </div>
        </Scene>
        <Scene
          filename="scene-digital-files.png"
          label="بعد: الملفات الرقمية"
          disabled={pending}
          onSave={(node) => downloadNode(node, "scene-digital-files.png", 2)}
        >
          <div className={styles.digitalStack}>
            {archiveKit.map((item) => (
              <FileCard
                key={item.place}
                className={styles.sceneCard}
                decorative
                place={item.place}
                name={item.fileName}
                note={item.note}
                kind={item.kind}
              />
            ))}
          </div>
        </Scene>
      </div>
    </div>
  );
}

function Piece({
  filename,
  label,
  disabled,
  onSave,
  children,
}: {
  filename: string;
  label: string;
  disabled: boolean;
  onSave: (node: HTMLElement | null) => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <article className={styles.piece}>
      <div className={styles.checker}>
        <div
          ref={ref}
          className={styles.shot}
          data-asset=""
          data-filename={filename}
          data-ratio="3"
        >
          {children}
        </div>
      </div>
      <AssetMeta label={label} filename={filename} disabled={disabled} onSave={() => onSave(ref.current)} />
    </article>
  );
}

function FilePiece({
  item,
  disabled,
  onSave,
}: {
  item: { place: ArchivePlace; fileName: string; note: string; kind: ArchiveKind };
  disabled: boolean;
  onSave: (node: HTMLElement | null) => void;
}) {
  const file = cardFiles[item.place];
  return (
    <Piece filename={file.filename} label={file.label} disabled={disabled} onSave={onSave}>
      <FileCard
        className={styles.flatCard}
        place={item.place}
        name={item.fileName}
        note={item.note}
        kind={item.kind}
      />
    </Piece>
  );
}

function Scene({
  filename,
  label,
  disabled,
  onSave,
  children,
}: {
  filename: string;
  label: string;
  disabled: boolean;
  onSave: (node: HTMLElement | null) => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <article className={styles.sceneBlock}>
      <div className={styles.sceneScroller}>
        <div ref={ref} className={styles.scene} data-asset="" data-filename={filename} data-ratio="2">
          {children}
        </div>
      </div>
      <AssetMeta label={label} filename={filename} disabled={disabled} onSave={() => onSave(ref.current)} />
    </article>
  );
}
