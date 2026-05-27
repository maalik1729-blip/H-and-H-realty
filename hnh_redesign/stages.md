# Individual Stage Commands — H and H Realty Redesign

---

# /hnh-audit
// turbo
Load GEMINI.md for context. Load project-rules.md for constraints.
Read all core source files: `src/styles.css`, `src/components/site-chrome.tsx`,
`src/components/listing-card.tsx`, `src/components/global-enquiry.tsx`,
`src/components/sticky-contact.tsx`, `src/routes/index.tsx`,
`src/routes/listings.index.tsx`, `src/routes/listings.$id.tsx`, `src/routes/contact.tsx`.
Run Stage 1 from ui-redesign.md only.
Write `outputs/01_ui_audit.md`.
Confirm in chat: files read, key findings count by severity.

---

# /hnh-strategy
// turbo
Load GEMINI.md. Read `outputs/01_ui_audit.md` (halt if missing).
Run Stage 2 from ui-redesign.md only.
Write `outputs/02_ux_improvement_strategy.md`.
Confirm in chat: files read, strategies documented, top priority fix.

---

# /hnh-tokens
// turbo
Load GEMINI.md.
Read `outputs/01_ui_audit.md` and `outputs/02_ux_improvement_strategy.md` (halt if missing).
Run Stage 3 from ui-redesign.md only.
Write `outputs/03_visual_redesign_direction.md`.
Write updated `src/styles.css` with upgraded button spring cubic-bezier curves,
`.field` class definition, `@media (prefers-reduced-motion)` block, and sticky-stack mobile fix.
Confirm in chat: files read, CSS changes made, design token count.

---

# /hnh-fixes
// turbo
Load GEMINI.md.
Read `outputs/03_visual_redesign_direction.md` and `outputs/02_ux_improvement_strategy.md` (halt if missing).
Run Stage 4 from ui-redesign.md only.
Write `outputs/04_component_execution_plan.md`.
Modify actual `src/` files as specified:
- `src/components/listing-card.tsx`
- `src/components/site-chrome.tsx`
- `src/components/global-enquiry.tsx`
- `src/components/sticky-contact.tsx`
- `src/routes/index.tsx`
- `src/routes/listings.index.tsx`
- `src/routes/listings.$id.tsx`
- `src/routes/contact.tsx`
Confirm in chat: files modified, key fixes applied, any blockers.

---

# /hnh-review
// turbo
Load GEMINI.md. Read `outputs/04_component_execution_plan.md` (halt if missing).
Run Stage 5 from ui-redesign.md only.
Write `outputs/05_final_ux_review.md`.
Run build validation: `npm run build` — confirm zero TypeScript compile errors.
Confirm in chat: build result, responsive checks passed, release-ready Y/N.
