# /ui-redesign — Land Connect Frontend Redesign Pipeline

> Type /ui-redesign in Antigravity to run all 5 stages.
> Frontend only. No backend files touched.
> Agent reads each stage output before proceeding to the next.

// turbo

---

## Pre-flight

Before Stage 1, open and read these files using the editor:
- `src/styles.css`
- `src/components/site-chrome.tsx`
- `src/components/listing-card.tsx`
- `src/components/global-enquiry.tsx`
- `src/routes/listings.index.tsx`
- `src/routes/listings.$id.tsx`

Confirm in chat: which files were found, how many lines each, and the current styling taxonomy of brand colors.

---

## Stage 1 — UI Audit (Frontend Code)

**Read**: All core pages and layout headers.
**Write**: `outputs/01_ui_audit.md`

### What to audit in the code

* **Contrast & Color Tokens Audit**:
  * Scan `src/styles.css` and components for hardcoded Hex colors or arbitrary Tailwind values (e.g. `bg-[#1B2A4A]`).
  * Check if brand variables are standardized as OKLCH CSS variables.
  * Identify elements (like Discover More grey labels) where text has low contrast ratios against dark backgrounds.
* **Badges & Visual Spacing Audit**:
  * Inspect the spacing, height, and paddings of homepage floating pills. Identify if excess py-paddings create layout blocks.
  * Audit empty-looking placeholder buttons and assess if they lack media context.
* **Mobile Sticky Congestion Audit**:
  * Scan bottom fixed containers inside mobile viewports. Check if `sticky-contact.tsx` elements clash or overlap with primary conversion buttons or WhatsApp launchers.
* **Empty search & slider boundaries**:
  * Investigate if category filters force hard limits on max price budget bounds, causing empty listing states.

### Required Output Structure
```
# 01 — Land Connect UI Audit

## Executive Summary
## Color & Typography Contrast Findings
## Visual Spacing & Badge Density Findings
## Mobile Overlay Congestion Findings
## Price Bound Slider Scale Findings
## Prioritized Fix List
[Ranked: CRITICAL → HIGH → MEDIUM → LOW]
```

---

## Stage 2 — UX Strategy (Frontend Logic Only)

**Read**: `outputs/01_ui_audit.md`
**Write**: `outputs/02_ux_strategy.md`

### What to produce

* **Expectation Realignment Strategy**:
  * Refine generic actions (like "Contact Us") into conversion-centric triggers ("Enquire now").
* **Smart Filter & Slider Logic**:
  * Create auto-calculation strategies to compute price ceilings depending on the highest catalog listing per active category.
  * Detail auto price clamping side-effects.
* **De-congest mobile overlays**:
  * Plan mobile z-index priorities and scroll visibility behaviors.
* **Bespoke horizontal swipes**:
  * Outline layout transitions from grid wraps to swipable ribbon sliders on viewports `< 640px`.

### Required Output Structure
```
# 02 — Land Connect UX Strategy

## UX Strategy Overview
## Conversion Tagline Improvements
## Dynamic Category Slider Boundaries
## Mobile Overlays Hierarchy
## Swipe Ribbon Interactions
## Recommended UX Priorities
```

---

## Stage 3 — Visual Redesign Direction

**Read**: `outputs/02_ux_strategy.md`
**Write**: `outputs/03_visual_tokens.md`
**Modify**: `src/styles.css` (custom transitions and focus systems)

### What to produce

* **Premium Button Spring Curves**:
  * Standardize cubic-bezier transition curves in `.btn-notched` and `.btn-notched-filled`.
  * Inject elegant micro-animations and focus highlights.
* **Grid and Border Layout rules**:
  * Enforce `rounded-3xl` card contours, `border-slate-100` editorial panels, and thin shadow specifications.

### Required Output Structure
```
# 03 — Visual Redesign Tokens

## Visual Design Philosophy
## Standardized Transition parameters
## Border-Radius & Outline highlights
## Style Sheet Modifications list
```

---

## Stage 4 — Component Execution Plan

**Read**: `outputs/03_visual_tokens.md` and `outputs/02_ux_strategy.md`
**Write**: `outputs/04_change_plan.md`
**Modify**: Core `src/` pages and components (`site-chrome.tsx`, `listing-card.tsx`, `global-enquiry.tsx`, `listings.index.tsx`, `listings.$id.tsx`)

### What to execute

1. **Floating Navigation Header** (`site-chrome.tsx`):
   * Upgrade navigation links to horizontal translation springs (`hover:-translate-y-0.5 transform transition-all duration-300`).
   * Port header contact anchors to `.btn-notched-filled` pill designs.
2. **Editorial Grid Card** (`listing-card.tsx`):
   * Convert body wrapper to `rounded-3xl border border-slate-100 hover:-translate-y-1 hover:shadow-elevated transition-all duration-300`.
3. **Spacious Enquiry modal** (`global-enquiry.tsx`):
   * Broaden spacing values to `space-y-4`, round options to `rounded-xl`, and expand active outline glows to `focus:ring-2 focus:ring-accent`.
4. **Touch-Swipe mobile ribbon & dynamic budget ceilings** (`listings.index.tsx`):
   * Transform category wrapper to touch swipe ribbons.
   * Auto-adjust price slider limits dynamically using category listings highest value thresholds.
5. **Specification Zebra tables** (`listings.$id.tsx`):
   * Redesign spec grids into premium data cards featuring alternating white and slate-50 rows.

### Required Output Structure
```
# 04 — Land Connect Execution Plan

## Header navigation updates
## Grid Listing Card refactoring
## Enquiry Modal input polish
## Dynamic slider ceiling execution
## Zebra Specs table implementation
## Modified Files list
```

---

## Stage 5 — Final UX Review

**Read**: `outputs/04_change_plan.md`
**Write**: `outputs/05_final_review.md`

### What to verify

* Run a full project production-grade compilation loop:
  ```bash
  npm run build
  ```
* Verify that no typescript compiler breaks, CSS anomalies, or bundler warnings exist.
* Test responsive screen flows and verify floating anchors don't overlap under landscape mobile constraints.

### Required Output Structure
```
# 05 — Final Redesign QA Validation

## Build compilation results
## Responsive Multi-device validations
## QA checklist compliance report
## Release readiness declaration
```
