# H and H Realty UI Redesign — Antigravity Workflow

Frontend-only redesign pipeline. No backend or server changes.

---

## Setup (One Time)

1. Copy this entire `hnh_redesign/` folder into the root of the
   H and H Realty project:

   ```
   H and H Realty/
   ├── hnh_redesign/        ← place here
   ├── src/
   ├── package.json
   └── ...
   ```

2. Open the project folder as a Workspace in Antigravity.

3. Antigravity will auto-load `GEMINI.md` context rules from `hnh_redesign/`.

---

## How to Run

Full pipeline (all 5 stages, no interruptions):
```
/hnh-redesign
```

Individual stages (run in order):
```
/hnh-audit       ← reads src/ code, writes outputs/01_ui_audit.md
/hnh-strategy    ← reads audit, writes outputs/02_ux_improvement_strategy.md
/hnh-tokens      ← writes outputs/03_visual_redesign_direction.md + updates src/styles.css
/hnh-fixes       ← modifies actual src/ files, writes outputs/04_component_execution_plan.md
/hnh-review      ← verifies all changes + runs npm run build
```

---

## What Gets Changed

| Stage | Output docs | Actual src/ changes |
|-------|-------------|---------------------|
| 1 — Audit | outputs/01_ui_audit.md | None |
| 2 — Strategy | outputs/02_ux_improvement_strategy.md | None |
| 3 — Tokens | outputs/03_visual_redesign_direction.md | src/styles.css (button springs, .field class, motion prefs) |
| 4 — Fixes | outputs/04_component_execution_plan.md | src/components/global-enquiry.tsx (async Formspree) |
| | | src/components/listing-card.tsx (badge, ARIA, gradient overlay) |
| | | src/components/site-chrome.tsx (contact constants, bilingual footer) |
| | | src/components/sticky-contact.tsx (CONTACT constants) |
| | | src/routes/index.tsx (CONTACT constants in CTA) |
| | | src/routes/listings.index.tsx (dynamic slider, sell form async) |
| | | src/routes/listings.$id.tsx (name attrs, Sold form gate) |
| | | src/routes/contact.tsx (name attrs, date min, async form) |
| | | src/lib/contact-info.ts (centralised CONTACT + whatsappUrl) |
| 5 — Review | outputs/05_final_ux_review.md | None (verification only) |

---

## What Does NOT Get Changed

- wrangler.jsonc
- package-lock.json
- bun.lock
- tsconfig.json
- eslint.config.js
- Any database files
- Any file outside src/

---

## After the Pipeline

Run in terminal to confirm no errors:
```
npm run build
```

If build passes → share outputs/05_final_ux_review.md for sign-off.
If build fails → share the error with the agent to initiate hotfixes.
