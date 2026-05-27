# /hnh-redesign — H and H Realty Frontend Redesign Pipeline

> Type `/hnh-redesign` in Windsurf / Cascade to run all 5 stages.
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
- `src/components/sticky-contact.tsx`
- `src/routes/index.tsx`
- `src/routes/listings.index.tsx`
- `src/routes/listings.$id.tsx`
- `src/routes/contact.tsx`
- `src/lib/contact-info.ts`

Confirm in chat: which files were found, line count per file, and the current OKLCH brand color taxonomy in `src/styles.css`.

---

## Stage 1 — UI Audit (Frontend Code)

**Read**: All core pages, layout components, and `src/styles.css`.  
**Write**: `outputs/01_ui_audit.md`

### What to audit in the code

* **Contrast & Color Token Audit**:
  * Scan `src/styles.css` for hardcoded hex or arbitrary Tailwind values deviating from OKLCH variables.
  * Check all visible text for contrast ratio compliance (WCAG AA minimum 4.5:1 for body, 3:1 for large text).
  * Flag `text-muted-foreground` elements on dark backgrounds for contrast deprivation.

* **ARIA & Accessibility Audit**:
  * Scan all interactive elements (buttons, links, inputs, sliders) for missing `aria-label` or `aria-labelledby`.
  * Check marquee/ticker duplicates for missing `aria-hidden="true"`.
  * Verify `<form>` elements have associated `<label>` elements with proper `htmlFor` / `id` pairs or implicit wrapping.
  * Check custom checkboxes and toggles for `role`, `aria-checked`, `aria-expanded` states.

* **Mobile CTA & Overlay Audit**:
  * Scan bottom-fixed containers (`sticky-contact.tsx`, `global-enquiry.tsx`) for z-index conflicts and viewport overflow on Android landscape (360×720 and 375×667).
  * Identify any floating buttons that are hidden on mobile (`hidden md:flex`) but serve as primary conversion triggers.

* **Form Integrity Audit**:
  * Check all `<form>` elements: do submit handlers do real async work or just `e.preventDefault()`?
  * Verify all `<input>` / `<select>` / `<textarea>` elements have `name` attributes for FormData compatibility.
  * Check for missing `min` on date inputs to prevent past-date selection.
  * Verify error and loading states are handled on submit buttons.

* **Listing Status Logic Audit**:
  * Confirm enquiry / quick-inquiry forms are hidden on Sold and Reserved properties.
  * Confirm gallery images have `onError` fallback handlers.
  * Audit the price slider: does the max ceiling auto-update when category changes?

* **Bilingual Coverage Audit**:
  * Scan all user-facing strings for missing Tamil (`TA`) fallback.
  * Check `t()` calls that fall through to undefined without a fallback string.

### Required Output Structure
```
# 01 — H and H Realty UI Audit

## Executive Summary
## Color & Typography Contrast Findings
## ARIA & Accessibility Findings
## Mobile Overlay & CTA Visibility Findings
## Form Integrity Findings
## Listing Status Logic Findings
## Bilingual Coverage Findings
## Prioritized Fix List
[Ranked: CRITICAL → HIGH → MEDIUM → LOW]
```

---

## Stage 2 — UX Strategy (Frontend Logic Only)

**Read**: `outputs/01_ui_audit.md`  
**Write**: `outputs/02_ux_improvement_strategy.md`

### What to produce

* **Conversion Funnel Strategy**:
  * Refine generic actions (e.g. "Contact Us") into conversion-centric triggers ("Book Free Site Visit").
  * Identify where users are most likely to drop off and propose micro-copy improvements.

* **Smart Filter & Slider Logic**:
  * Design dynamic price ceiling auto-calculation based on the highest-priced listing in the active category.
  * Detail auto-clamping behaviour when a user's selected price exceeds the new ceiling.
  * Plan a "No results" state with actionable suggestions (reset filters, browse all).

* **Mobile Overlay Hierarchy**:
  * Define z-index layers: sticky bar → WhatsApp float → enquiry modal → site header.
  * Plan which CTAs are visible at which breakpoints without overlap.

* **Form Submission UX**:
  * Define loading → success → error state transitions for all 4 forms (enquiry modal, contact page, sell form, detail quick inquiry).
  * Define graceful degradation: when Formspree env var is absent, show success without network call.

* **Trust Signal Placement**:
  * Identify optimal positions for "Lawyer Vetted", "DTCP Approved", "RERA Registered" badges.
  * Propose consistent display of trust metrics across listing cards, detail pages, and the homepage.

### Required Output Structure
```
# 02 — H and H Realty UX Improvement Strategy

## UX Strategy Overview
## Conversion Trigger Improvements
## Dynamic Category Slider Boundaries
## Mobile Overlay Hierarchy Plan
## Form Submission State Design
## Trust Signal Placement Strategy
## Recommended UX Priorities
```

---

## Stage 3 — Visual Redesign Direction

**Read**: `outputs/02_ux_improvement_strategy.md`  
**Write**: `outputs/03_visual_redesign_direction.md`  
**Modify**: `src/styles.css`

### What to produce

* **Button Spring Curves**:
  * Standardize cubic-bezier transition curves in `.btn-notched` and `.btn-notched-filled`.
  * Add micro-animation hover lift (`hover:-translate-y-0.5`) and focus highlight rings.

* **Field & Form Tokens**:
  * Define `.field` class in `src/styles.css` as a single source for input height, border, bg, focus ring.
  * Ensure `select.field` inherits the same appearance.

* **Motion Preferences**:
  * Add `@media (prefers-reduced-motion: reduce)` block to `src/styles.css` disabling all keyframe animations.

* **Card & Layout Rules**:
  * Enforce `rounded-2xl` / `rounded-3xl` card contours, `border-border` editorial panels, `shadow-card` / `shadow-elevated` depth system.
  * Define sticky-stack card disable rules on mobile (`position:static` below `sm:`).

* **Typography Scale**:
  * Confirm `font-display` (serif) is scoped to hero headings only — not `h3` or smaller.
  * Define `font-sans` as default for body, labels, badges, and card sub-headings.

### Required Output Structure
```
# 03 — H and H Realty Visual Redesign Direction

## Visual Design Philosophy
## Button & Interaction Tokens
## Field & Form Visual Tokens
## Motion & Animation Rules
## Card Border & Shadow System
## Typography Scope Rules
## Stylesheet Modifications List
```

---

## Stage 4 — Component Execution Plan

**Read**: `outputs/03_visual_redesign_direction.md` and `outputs/02_ux_improvement_strategy.md`  
**Write**: `outputs/04_component_execution_plan.md`  
**Modify**: Core `src/` pages and components

### What to execute

1. **`src/styles.css`**:
   * Fix `.btn-notched-filled` hover colour (prevent near-black state).
   * Add `.btn-ghost` variant.
   * Define `.field` class for all form inputs.
   * Fix `h3` font to `font-sans` (remove display font bleed).
   * Add `@media (prefers-reduced-motion: reduce)` block.
   * Disable sticky-stack cards on mobile.

2. **`src/components/listing-card.tsx`**:
   * Remove fake photo navigation arrows (ChevronLeft / ChevronRight).
   * Add gradient overlay on listing image for text legibility.
   * Fix "Active" badge label → "Available".
   * Fix CTA button font size to `text-[11px]`.
   * Add `aria-label` to the wrapping `<Link>`.
   * Improve `alt` text to include location context.

3. **`src/components/global-enquiry.tsx`**:
   * Make Enquire Now and WhatsApp float buttons visible on all screen sizes (remove `hidden md:flex`).
   * Add body scroll lock when modal is open (`document.body.style.overflow`).
   * Auto-focus first input on modal open.
   * Add `aria-label` to trigger button.
   * Implement real async Formspree submission with loading and error states.
   * Source WhatsApp URL from `src/lib/contact-info.ts`.

4. **`src/components/sticky-contact.tsx`**:
   * Replace hardcoded phone / WhatsApp URLs with `CONTACT` constants from `src/lib/contact-info.ts`.

5. **`src/components/site-chrome.tsx`**:
   * Add `sm:` breakpoint to logo negative margin to fix Android landscape overflow (640–767px).
   * Replace hardcoded phone / email in footer with `CONTACT` constants.

6. **`src/routes/index.tsx`**:
   * Add `aria-label="Recent property verifications"` to ticker `<section>`.
   * Add `aria-hidden="true"` to duplicate ticker items.

7. **`src/routes/listings.index.tsx`**:
   * Add `aria-label`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow` to price range slider.
   * Make `handleSellSubmit` async with Formspree integration, loading and error states.
   * Add `Loader2` spinner and `disabled` state to sell form submit button.

8. **`src/routes/listings.$id.tsx`**:
   * Hide quick inquiry form on Sold / Reserved listings — replace with "Browse Similar" CTA.
   * Add `onError` fallback to gallery main image.
   * Improve gallery `alt` text to include `location` and `city`.
   * Make detail page quick inquiry form async with Formspree.
   * Replace hardcoded phone / WhatsApp with `CONTACT` constants.

9. **`src/routes/contact.tsx`**:
   * Add `name` attributes to all form inputs for `FormData` compatibility.
   * Add `min` date constraint on date picker to block past dates.
   * Remove redundant inline `<style>` tag (`.field` now defined globally).
   * Make form `onSubmit` async with Formspree integration, loading and error states.
   * Replace hardcoded contact info with `CONTACT` constants.

10. **`src/lib/contact-info.ts`** *(new file)*:
    * Export `CONTACT` object sourcing phone, email, and address from `VITE_*` env vars with fallbacks.
    * Export `whatsappUrl(message)` helper.

### Required Output Structure
```
# 04 — H and H Realty Component Execution Plan

## styles.css updates
## listing-card.tsx refactoring
## global-enquiry.tsx improvements
## sticky-contact.tsx updates
## site-chrome.tsx fixes
## index.tsx accessibility fixes
## listings.index.tsx form & slider updates
## listings.$id.tsx detail page fixes
## contact.tsx form improvements
## New utility files
## Modified Files List
```

---

## Stage 5 — Final UX Review

**Read**: `outputs/04_component_execution_plan.md`  
**Write**: `outputs/05_final_ux_review.md`

### What to verify

* Run a full production-grade compilation:
  ```bash
  npm run build
  ```
* Verify zero TypeScript compiler errors, CSS anomalies, or bundler warnings.
* Confirm all 4 forms have async Formspree wiring and graceful fallback.
* Confirm `src/lib/contact-info.ts` is the only source of phone / email / WhatsApp across all files.
* Confirm Sold / Reserved listings do not display an active enquiry form.
* Confirm ticker duplicates carry `aria-hidden="true"`.
* Confirm submit buttons show spinner during async submission.
* Test responsive layouts at 375px (iPhone SE), 390px (iPhone 14), 412px (Pixel 7), 768px (iPad), 1280px (Desktop).
* Verify floating buttons do not overlap on landscape mobile (667px height or less).

### Required Output Structure
```
# 05 — H and H Realty Final UX Review

## Build Compilation Results
## Form Submission Verification (all 4 forms)
## ARIA & Accessibility Checklist
## Contact Info Centralisation Audit
## Responsive Multi-device Validation
## Mobile Overlay Conflict Check
## QA Checklist Compliance Report
## Release Readiness Declaration
```
