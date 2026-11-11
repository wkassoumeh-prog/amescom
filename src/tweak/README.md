# Tweak

A floating type inspector. Copy this folder into a React app and mount it once.

```tsx
import { Tweak } from "./tweak";

export function App() {
  return (
    <>
      {children}
      <Tweak />
    </>
  );
}
```

It renders in development only. Pass `enabled` to force it on or off.

## Fonts

```tsx
<Tweak
  fonts={[
    { label: "El Messiri", family: "var(--font-display-face), sans-serif" },
    { label: "Dubai", family: '"Dubai", sans-serif' },
  ]}
/>
```

`label` is the name in the list. `family` is written onto the element you selected. The page has to load that font first, or the browser falls back.

Without `fonts`, the list is system families plus any family already exposed by `document.fonts`. The field also accepts a name you type.

In this project, load a new face in `src/app/layout.tsx` (or a `@font-face` in `src/app/globals.css`), then add a row to `src/tweak-fonts.ts`.

## Controls

Drag the title bar. The position is remembered in this browser.

Select, then click text. Escape leaves select mode, and links do not navigate while you are selecting. Drag the Size label to scrub. Copy CSS copies `font-family`, `font-size`, and `color`. Reset clears that element.

Collapse leaves a Tweak button. Alt+Shift+T hides the tool and shows it again.

Tweaks are inline styles stored in this browser. They are not written into source files.
