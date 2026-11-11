"use client";

import { useEffect, useId, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  applyOverride,
  clearTypography,
  cssPath,
  elementFromPath,
  elementLabel,
  quoteFamily,
  readTypography,
  rectOf,
  targetElement,
  toHex,
  type ElementBox,
  type TypeOverride,
} from "./dom";
import styles from "./Tweak.module.css";
import {
  defaultStorageKey,
  deleteOverride,
  loadCollapsed,
  loadOverrides,
  loadPosition,
  saveCollapsed,
  saveOverride,
  savePosition,
  type PanelPosition,
} from "./storage";

export type TweakFont = {
  label: string;
  family: string;
};

export type TweakProps = {
  fonts?: TweakFont[];
  enabled?: boolean;
  storageKey?: string;
};

const SYSTEM_FONTS: TweakFont[] = [
  { label: "System UI", family: "system-ui, sans-serif" },
  { label: "Georgia", family: "Georgia, serif" },
  { label: "Palatino", family: '"Palatino Linotype", Palatino, serif' },
  { label: "Segoe UI", family: '"Segoe UI", sans-serif' },
  { label: "Tahoma", family: "Tahoma, sans-serif" },
  { label: "Times New Roman", family: '"Times New Roman", serif' },
  { label: "Courier New", family: '"Courier New", monospace' },
  { label: "Arial", family: "Arial, sans-serif" },
];

function subscribeNoop() {
  return () => {};
}

function clampPosition(x: number, y: number, width: number): PanelPosition {
  return {
    x: Math.min(Math.max(x, 12 - width + 72), window.innerWidth - 64),
    y: Math.min(Math.max(y, 8), Math.max(8, window.innerHeight - 48)),
  };
}

function TweakApp({ fonts, storageKey }: { fonts: TweakFont[]; storageKey: string }) {
  const ready = useSyncExternalStore(subscribeNoop, () => true, () => false);
  const familyId = useId();
  const sizeId = useId();
  const colorId = useId();
  const listId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const selectedPathRef = useRef<string | null>(null);
  const familyRef = useRef("");
  const filteringRef = useRef(false);
  const draggedRef = useRef(false);
  const copiedTimer = useRef(0);

  const [hidden, setHidden] = useState(false);
  const [collapsed, setCollapsed] = useState<boolean | null>(null);
  const [pos, setPos] = useState<PanelPosition | null>(null);
  const [selecting, setSelecting] = useState(false);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [selectedBox, setSelectedBox] = useState<ElementBox | null>(null);
  const [hoverBox, setHoverBox] = useState<ElementBox | null>(null);
  const [hoverPath, setHoverPath] = useState<string | null>(null);
  const [label, setLabel] = useState<{ tag: string; text: string } | null>(null);
  const [family, setFamily] = useState("");
  const [size, setSize] = useState(16);
  const [color, setColor] = useState("#17191c");
  const [hexDraft, setHexDraft] = useState("#17191c");
  const [familyOpen, setFamilyOpen] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [discovered, setDiscovered] = useState<TweakFont[]>([]);
  const [copied, setCopied] = useState(false);

  const options = useMemo(() => {
    const seenFamilies = new Set<string>();
    const seenLabels = new Set<string>();
    const all: TweakFont[] = [];
    const push = (font: TweakFont) => {
      const familyKey = font.family.replace(/\s+/g, " ").trim().toLowerCase();
      const labelKey = font.label.trim().toLowerCase();
      if (!familyKey || seenFamilies.has(familyKey) || seenLabels.has(labelKey)) return;
      seenFamilies.add(familyKey);
      seenLabels.add(labelKey);
      all.push(font);
    };
    fonts.forEach(push);
    discovered.forEach(push);
    SYSTEM_FONTS.forEach(push);
    if (!filtering) return all;
    const query = family.trim().toLowerCase();
    if (!query) return all;
    return all.filter(
      (font) => font.label.toLowerCase().includes(query) || font.family.toLowerCase().includes(query),
    );
  }, [discovered, family, filtering, fonts]);

  const highlighted = Math.min(highlight, Math.max(options.length - 1, 0));

  function remember(path: string, override: TypeOverride) {
    const element = elementFromPath(path);
    if (!element) return;
    const previous = loadOverrides(storageKey)[path] ?? {};
    const next = { ...previous, ...override };
    applyOverride(element, next);
    saveOverride(path, next, storageKey);
  }

  function syncFrom(element: HTMLElement) {
    const snapshot = readTypography(element);
    familyRef.current = snapshot.family;
    filteringRef.current = false;
    setFamily(snapshot.family);
    setSize(snapshot.size);
    setColor(snapshot.color);
    setHexDraft(snapshot.color);
    setLabel(elementLabel(element));
    setSelectedBox(rectOf(element));
    setFiltering(false);
    setFamilyOpen(false);
  }

  function commitSize(next: number) {
    const path = selectedPathRef.current;
    if (!path || !Number.isFinite(next)) return;
    const clamped = Math.min(400, Math.max(8, Math.round(next)));
    setSize(clamped);
    remember(path, { size: `${clamped}px` });
  }

  function commitColor(next: string) {
    const path = selectedPathRef.current;
    const hex = toHex(next);
    setColor(hex);
    setHexDraft(hex);
    if (path && /^#[0-9a-f]{6}$/.test(hex)) remember(path, { color: hex });
  }

  function commitFamily(next: string) {
    const value = next.trim();
    if (!value || !selectedPath) return;
    setFamily(value);
    setFiltering(false);
    setFamilyOpen(false);
    remember(selectedPath, { family: value });
  }

  function resetElement() {
    filteringRef.current = false;
    const path = selectedPathRef.current;
    if (!path) return;
    const element = elementFromPath(path);
    if (element) clearTypography(element);
    deleteOverride(path, storageKey);
    if (element) syncFrom(element);
  }

  async function copyCss() {
    const path = selectedPathRef.current;
    const element = path ? elementFromPath(path) : null;
    const snapshot = element ? readTypography(element) : { family, size, color };
    const css = `font-family: ${snapshot.family};\nfont-size: ${snapshot.size}px;\ncolor: ${snapshot.color};`;
    const copyWithTextarea = () => {
      const area = document.createElement("textarea");
      area.value = css;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.append(area);
      area.select();
      document.execCommand("copy");
      area.remove();
    };
    try {
      if (!navigator.clipboard?.writeText) throw new Error("clipboard unavailable");
      await Promise.race([
        navigator.clipboard.writeText(css),
        new Promise<never>((_, reject) => {
          window.setTimeout(() => reject(new Error("clipboard timeout")), 500);
        }),
      ]);
    } catch {
      copyWithTextarea();
    }
    setCopied(true);
    window.clearTimeout(copiedTimer.current);
    copiedTimer.current = window.setTimeout(() => setCopied(false), 1500);
  }

  function beginDrag(event: React.PointerEvent<HTMLElement>, ignoreButtons = true) {
    if (event.button !== 0 || !pos) return;
    const target = event.target;
    if (ignoreButtons && target instanceof Element && target.closest("button, input, textarea, a")) return;
    event.preventDefault();
    const startX = event.clientX;
    const startY = event.clientY;
    const originX = pos.x;
    const originY = pos.y;
    const width = rootRef.current?.offsetWidth ?? 300;
    draggedRef.current = false;
    let moved = false;
    const handle = event.currentTarget;
    handle.setPointerCapture(event.pointerId);

    const move = (pointer: PointerEvent) => {
      if (Math.abs(pointer.clientX - startX) + Math.abs(pointer.clientY - startY) > 3) moved = true;
      setPos(clampPosition(originX + pointer.clientX - startX, originY + pointer.clientY - startY, width));
    };
    const end = (pointer: PointerEvent) => {
      draggedRef.current = moved;
      const next = clampPosition(originX + pointer.clientX - startX, originY + pointer.clientY - startY, width);
      setPos(next);
      savePosition(next, storageKey);
      handle.removeEventListener("pointermove", move);
      handle.removeEventListener("pointerup", end);
      handle.removeEventListener("pointercancel", end);
    };
    handle.addEventListener("pointermove", move);
    handle.addEventListener("pointerup", end);
    handle.addEventListener("pointercancel", end);
  }

  useEffect(() => {
    selectedPathRef.current = selectedPath;
  }, [selectedPath]);

  useEffect(() => {
    familyRef.current = family;
    filteringRef.current = filtering;
  }, [family, filtering]);

  useEffect(() => {
    const update = () => {
      const found: TweakFont[] = [];
      const seen = new Set<string>();
      document.fonts.forEach((face) => {
        const name = face.family.replace(/^['"]|['"]$/g, "").trim();
        const key = name.toLowerCase();
        if (!name || seen.has(key) || name.startsWith("__") || /fallback$/i.test(name)) return;
        seen.add(key);
        found.push({ label: name, family: quoteFamily(name) });
      });
      found.sort((a, b) => a.label.localeCompare(b.label));
      setDiscovered(found);
    };
    update();
    let cancel = false;
    void document.fonts.ready.then(() => {
      if (!cancel) update();
    });
    return () => {
      cancel = true;
    };
  }, []);

  useEffect(() => {
    const apply = () => {
      const overrides = loadOverrides(storageKey);
      for (const [path, override] of Object.entries(overrides)) {
        const element = elementFromPath(path);
        if (element) applyOverride(element, override);
      }
      const path = selectedPathRef.current;
      const selected = path ? elementFromPath(path) : null;
      setSelectedBox((current) => {
        if (!selected) return null;
        const next = rectOf(selected);
        if (
          current &&
          current.top === next.top &&
          current.left === next.left &&
          current.width === next.width &&
          current.height === next.height
        ) {
          return current;
        }
        return next;
      });
      if (selected) {
        const nextLabel = elementLabel(selected);
        setLabel((current) =>
          current && current.tag === nextLabel.tag && current.text === nextLabel.text ? current : nextLabel,
        );
      } else if (path) {
        setLabel(null);
      }
    };
    apply();
    let timer = 0;
    const observer = new MutationObserver((records) => {
      const relevant = records.some((record) => {
        const node = record.target instanceof Element ? record.target : record.target.parentElement;
        return !node?.closest("[data-tweak-root]");
      });
      if (!relevant) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(apply, 50);
    });
    observer.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
      attributeFilter: ["style"],
    });
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [storageKey]);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-tweak-selecting", selecting && !hidden);
    return () => document.documentElement.removeAttribute("data-tweak-selecting");
  }, [hidden, selecting]);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.altKey && event.shiftKey && event.code === "KeyT") {
        event.preventDefault();
        setHidden((value) => !value);
        setSelecting(false);
        return;
      }
      if (event.key === "Escape") {
        setSelecting(false);
        setFamilyOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!selecting || hidden) return;

    let lastPath = "";
    const onMove = (event: MouseEvent) => {
      const element = targetElement(event.target);
      if (!element) {
        if (!lastPath) return;
        lastPath = "";
        setHoverBox(null);
        setHoverPath(null);
        return;
      }
      const path = cssPath(element);
      if (path === lastPath) return;
      lastPath = path;
      setHoverPath(path);
      setHoverBox(rectOf(element));
    };
    const onClick = (event: MouseEvent) => {
      const element = targetElement(event.target);
      if (!element) return;
      event.preventDefault();
      event.stopPropagation();
      const path = cssPath(element);
      selectedPathRef.current = path;
      setSelectedPath(path);
      const snapshot = readTypography(element);
      familyRef.current = snapshot.family;
      filteringRef.current = false;
      setFamily(snapshot.family);
      setSize(snapshot.size);
      setColor(snapshot.color);
      setHexDraft(snapshot.color);
      setLabel(elementLabel(element));
      setSelectedBox(rectOf(element));
      setFiltering(false);
      setFamilyOpen(false);
    };
    document.addEventListener("mousemove", onMove, true);
    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("mousemove", onMove, true);
      document.removeEventListener("click", onClick, true);
    };
  }, [hidden, selecting]);

  useEffect(() => {
    if (!selectedPath) return;
    const update = () => {
      const element = elementFromPath(selectedPath);
      setSelectedBox(element ? rectOf(element) : null);
    };
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [selectedPath]);

  useEffect(() => {
    const item = listRef.current?.querySelector('[data-highlight="true"]');
    item?.scrollIntoView({ block: "nearest" });
  }, [familyOpen, highlighted]);

  useEffect(() => () => window.clearTimeout(copiedTimer.current), []);

  useEffect(() => {
    function onResize() {
      const width = rootRef.current?.offsetWidth ?? 300;
      setPos((current) => (current ? clampPosition(current.x, current.y, width) : current));
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (ready && pos === null) {
    setPos(
      loadPosition(storageKey) ?? {
        x: Math.max(16, window.innerWidth - 308),
        y: 88,
      },
    );
  }
  if (ready && collapsed === null) setCollapsed(loadCollapsed(storageKey));

  if (!ready || hidden || !pos || collapsed === null) return null;

  const selected = Boolean(selectedPath);
  const showHover = selecting && hoverBox && hoverPath !== selectedPath;

  return (
    <>
      <div
        ref={rootRef}
        className={collapsed ? `${styles.root} ${styles.collapsed}` : styles.root}
        style={{ left: pos.x, top: pos.y }}
        data-tweak-root=""
        dir="ltr"
        role="region"
        aria-label="Tweak"
      >
        {collapsed ? (
          <button
            type="button"
            className={styles.launcher}
            onPointerDown={(event) => beginDrag(event, false)}
            onClick={() => {
              if (draggedRef.current) {
                draggedRef.current = false;
                return;
              }
              setCollapsed(false);
              saveCollapsed(false, storageKey);
            }}
          >
            <span className={styles.grip} aria-hidden="true" />
            Tweak
          </button>
        ) : (
          <>
            <header className={styles.handle} onPointerDown={(event) => beginDrag(event)}>
              <span className={styles.grip} aria-hidden="true" />
              <p className={styles.title}>Tweak</p>
              <button
                type="button"
                className={styles.iconButton}
                aria-label="Collapse"
                onClick={() => {
                  setCollapsed(true);
                  saveCollapsed(true, storageKey);
                  setSelecting(false);
                }}
              >
                –
              </button>
            </header>
            <div className={styles.body}>
              <button
                type="button"
                className={styles.selectButton}
                aria-pressed={selecting}
                onClick={() => setSelecting((value) => !value)}
              >
                {selecting ? "Selecting" : "Select text"}
              </button>
              <p className={styles.hint}>
                {selecting ? "Click text on the page. Escape leaves select mode." : "Choose an element, then edit its type."}
              </p>
              {label && (
                <div className={styles.element}>
                  <span className={styles.tag}>{label.tag}</span>
                  {label.text && <p className={styles.elementText}>{label.text}</p>}
                </div>
              )}
              <div className={styles.specimen} style={{ fontFamily: family || "inherit", fontSize: `${Math.min(Math.max(size, 16), 28)}px`, color }} dir="auto">
                Aa أ ب
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor={familyId}>
                  Family
                </label>
                <input
                  id={familyId}
                  className={styles.input}
                  role="combobox"
                  aria-autocomplete="list"
                  aria-expanded={familyOpen}
                  aria-controls={listId}
                  value={family}
                  disabled={!selected}
                  spellCheck={false}
                  autoCapitalize="off"
                  placeholder="Font family"
                  onFocus={() => {
                    if (!selected) return;
                    setFamilyOpen(true);
                    setFiltering(false);
                    setHighlight(0);
                  }}
                  onBlur={() => {
                    window.setTimeout(() => {
                      if (rootRef.current?.contains(document.activeElement)) return;
                      const nextFamily = familyRef.current.trim();
                      const dirty = filteringRef.current;
                      setFamilyOpen(false);
                      filteringRef.current = false;
                      setFiltering(false);
                      if (dirty && selectedPathRef.current && nextFamily) remember(selectedPathRef.current, { family: nextFamily });
                    }, 0);
                  }}
                  onChange={(event) => {
                    familyRef.current = event.target.value;
                    filteringRef.current = true;
                    setFamily(event.target.value);
                    setFamilyOpen(true);
                    setFiltering(true);
                    setHighlight(0);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      setFamilyOpen(true);
                      setHighlight((value) => Math.min(value + 1, options.length - 1));
                    } else if (event.key === "ArrowUp") {
                      event.preventDefault();
                      setFamilyOpen(true);
                      setHighlight((value) => Math.max(value - 1, 0));
                    } else if (event.key === "Enter") {
                      event.preventDefault();
                      const chosen = familyOpen ? options[highlighted] : undefined;
                      commitFamily(chosen?.family ?? family);
                    } else if (event.key === "Escape") {
                      event.stopPropagation();
                      setFamilyOpen(false);
                    }
                  }}
                />
                {familyOpen && selected && (
                  <ul ref={listRef} id={listId} className={styles.list} role="listbox" aria-label="Font families">
                    {options.length === 0 ? (
                      <li className={styles.emptyOption}>No matching family. Press Enter to use this name.</li>
                    ) : (
                      options.map((font, index) => (
                        <li key={`${font.label}:${font.family}`}>
                          <button
                            type="button"
                            role="option"
                            className={styles.option}
                            style={{ fontFamily: font.family }}
                            aria-selected={font.family === family}
                            data-highlight={index === highlighted ? "true" : "false"}
                            onMouseEnter={() => setHighlight(index)}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => commitFamily(font.family)}
                          >
                            {font.label}
                          </button>
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>
              <div className={styles.field}>
                <div className={styles.sizeHead}>
                  <label
                    className={styles.scrub}
                    htmlFor={sizeId}
                    onPointerDown={(event) => {
                      if (!selectedPathRef.current || event.button !== 0) return;
                      event.preventDefault();
                      const startX = event.clientX;
                      const startSize = size;
                      const handle = event.currentTarget;
                      handle.setPointerCapture(event.pointerId);
                      const move = (pointer: PointerEvent) => commitSize(startSize + (pointer.clientX - startX) / 2);
                      const end = () => {
                        handle.removeEventListener("pointermove", move);
                        handle.removeEventListener("pointerup", end);
                      };
                      handle.addEventListener("pointermove", move);
                      handle.addEventListener("pointerup", end);
                    }}
                  >
                    Size
                  </label>
                  <input
                    id={sizeId}
                    className={styles.number}
                    type="number"
                    min={8}
                    max={400}
                    value={size}
                    disabled={!selected}
                    onChange={(event) => commitSize(Number(event.target.value))}
                  />
                </div>
                <input
                  className={styles.range}
                  type="range"
                  min={8}
                  max={Math.max(160, size)}
                  value={Math.min(Math.max(size, 8), Math.max(160, size))}
                  aria-label="Font size"
                  disabled={!selected}
                  onChange={(event) => commitSize(Number(event.target.value))}
                />
              </div>
              <div className={styles.field}>
                <label className={styles.fieldLabel} htmlFor={colorId}>
                  Color
                </label>
                <div className={styles.colorRow}>
                  <label className={styles.swatch} style={{ background: color }}>
                    <span className={styles.srOnly}>Open color picker</span>
                    <input
                      id={colorId}
                      type="color"
                      value={/^#[0-9a-f]{6}$/i.test(color) ? color : "#17191c"}
                      disabled={!selected}
                      onChange={(event) => commitColor(event.target.value)}
                    />
                  </label>
                  <input
                    className={styles.hex}
                    value={hexDraft}
                    disabled={!selected}
                    spellCheck={false}
                    aria-label="Hex color"
                    onChange={(event) => {
                      const next = event.target.value;
                      setHexDraft(next);
                      if (/^#?[0-9a-f]{6}$/i.test(next.trim())) commitColor(next.trim().startsWith("#") ? next.trim() : `#${next.trim()}`);
                    }}
                    onBlur={() => {
                      if (/^#?[0-9a-f]{6}$/i.test(hexDraft.trim())) commitColor(hexDraft.trim());
                      else setHexDraft(color);
                    }}
                  />
                </div>
              </div>
            </div>
            <footer className={styles.footer}>
              <div className={styles.actions}>
                <button type="button" className={styles.textButton} disabled={!selected} onClick={resetElement}>
                  Reset
                </button>
                <button type="button" className={styles.textButton} disabled={!selected} onClick={() => void copyCss()}>
                  {copied ? "Copied" : "Copy CSS"}
                </button>
              </div>
              <p className={styles.shortcut}>Alt+Shift+T hides this panel.</p>
            </footer>
          </>
        )}
      </div>
      <div className={styles.overlay} data-tweak-root="" aria-hidden="true">
        {showHover && <div className={styles.hoverBox} style={hoverBox} />}
        {selectedBox && label && (
          <div className={styles.selectedBox} style={selectedBox}>
            <span className={styles.selectedTag} style={selectedBox.top < 22 ? { top: 0 } : { top: "-1.15rem" }}>
              {label.tag}
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export function Tweak({ fonts = [], enabled, storageKey = defaultStorageKey }: TweakProps) {
  const active = enabled ?? process.env.NODE_ENV !== "production";
  if (!active) return null;
  return <TweakApp fonts={fonts} storageKey={storageKey} />;
}
