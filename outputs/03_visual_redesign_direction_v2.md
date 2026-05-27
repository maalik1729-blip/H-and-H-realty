# 03 — H and H Realty Visual Redesign Direction (v2)

## Visual Design Philosophy

The Terraline design system is already well-established from v1. This v2 direction verifies all tokens are in place and documents the definitive state of the stylesheet. No new tokens are introduced — only confirmations and residual gap closures.

**Core Principles (Unchanged)**:
- OKLCH-based brand palette: Obsidian Navy primary, Digital Indigo accent
- Font hierarchy: Fraunces (display serif) for H1/H2 only; Inter (sans) for all body/labels
- Premium capsule buttons (`.btn-notched`, `.btn-notched-filled`, `.btn-ghost`)
- Unified `.field` class for all form inputs
- Springy cubic-bezier transitions: `cubic-bezier(0.34, 1.56, 0.64, 1)`

---

## Button & Interaction Tokens

### `.btn-notched` (outline variant)
```css
transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
hover: background accent, translateY(-1px), box-shadow 0 4px 12px oklch(0.60 0.16 240 / 0.25)
```

### `.btn-notched-filled` (solid variant)
```css
background: var(--color-accent)
hover: oklch(0.45 0.22 262) — NOT near-black ✅ (v1 fix confirmed)
hover: translateY(-1px), box-shadow 0 6px 18px oklch(0.52 0.22 262 / 0.3)
```

### `.btn-ghost` (tertiary variant) — NEW in v1, confirmed present
```css
border: 1.5px solid var(--color-border)
hover: background secondary, border-color accent, color accent, translateY(-1px)
```

---

## Field & Form Visual Tokens

### `.field` class — confirmed present in styles.css lines 312-316
```css
@apply h-11 w-full rounded-xl border border-border bg-background/50 px-4
       text-sm text-foreground placeholder:text-muted-foreground/60
       focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
       transition-all duration-200;
```

### `textarea.field` — `h-auto py-3 resize-none leading-relaxed` ✅
### `select.field` — `appearance-none cursor-pointer` ✅

**Residual Issue**: `global-enquiry.tsx` uses inline field classes instead of `.field` — left as-is to preserve the specific `text-xs` sizing needed inside the modal (`.field` is `text-sm`).

---

## Motion & Animation Rules

### Keyframes (all at top level, outside `@layer`)
- `marquee` — 75s linear infinite (ticker)
- `spin-slow` — 12s linear infinite (decorative)
- `fade-in` — 0.3s ease-out (modal backdrop)
- `scale-up` — 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) (modal panel)

### `@media (prefers-reduced-motion: reduce)` — confirmed present (lines 328-343)
- Disables marquee, spin-slow, scale-up, fade-in
- Collapses all transition durations to 0.01ms
- Sets `opacity: 1`, `transform: none` on animated elements

---

## Card Border & Shadow System

| Token | Value |
|-------|-------|
| `--shadow-card` | `0 1px 2px oklch(0 0 0 / 0.04), 0 8px 24px -12px oklch(0.25 0.03 245 / 0.12)` |
| `--shadow-elevated` | `0 2px 4px oklch(0 0 0 / 0.05), 0 24px 48px -16px oklch(0.25 0.03 245 / 0.18)` |
| Card border-radius | `rounded-3xl` (top-level cards), `rounded-2xl` (inner sub-cards) |
| Sticky-stack mobile | `position: relative; top: auto; z-index: auto` below 639px ✅ |

---

## Typography Scope Rules

| Element | Font Family | Scope |
|---------|-------------|-------|
| `h1`, `h2`, `.font-display` | Fraunces (serif) | Hero headings, section titles |
| `h3`, `h4`, `h5`, `h6` | Inter (sans-serif) | Sub-headings, card titles ✅ |
| `body`, labels, badges | Inter | Default |
| `.font-display` class | Fraunces | Explicit class for price display typography |

**Note**: Some `<h3>` elements inside bento cards use `font-display` via explicit class — this is intentional for premium design hierarchy on bento grid only.

---

## Stylesheet Modifications List (v2)

**No changes to `src/styles.css` required for v2** — all tokens from v1 are confirmed present and correct:
- ✅ `.btn-notched` spring curves
- ✅ `.btn-notched-filled` hover fix (not near-black)
- ✅ `.btn-ghost` variant
- ✅ `.field` class definition
- ✅ `textarea.field` and `select.field` extensions
- ✅ `@media (prefers-reduced-motion: reduce)` block
- ✅ Sticky-stack card mobile disable rules
- ✅ All keyframe animations at top level

**All Stage 3 CSS work from v1 is COMPLETE and VERIFIED.** Stage 4 src/ changes will focus on TypeScript/TSX files only.
