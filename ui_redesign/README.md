# Land Connect UI Redesign — Antigravity Workflow

Frontend-only redesign pipeline. No backend or server changes.

---

## Setup (One Time)

1. Copy this entire `ui_redesign/` folder into the root of the
   Land Connect project:

   ```
   land-connect/
   ├── ui_redesign/        ← drop here
   ├── src/
   ├── package.json
   └── ...
   ```

2. Open the land-connect folder as a Workspace in Antigravity.

3. Antigravity will auto-load `GEMINI.md` and `.agent/` context rules from `ui_redesign/`.

---

## How to Run

Full pipeline (all 5 stages, no interruptions):
```
/ui-redesign
```

Individual stages (run in order):
```
/ui-audit          ← reads src/ code, writes outputs/01_ui_audit.md
/ux-strategy       ← reads audit, writes outputs/02_ux_strategy.md
/visual-tokens     ← writes outputs/03_visual_tokens.md + updates src/styles.css
/component-fixes   ← modifies actual src/ files, writes outputs/04_change_plan.md
/ux-review         ← verifies all changes, opens browser at 375px
```

---

## What Gets Changed

| Stage | Output docs | Actual src/ changes |
|-------|-------------|---------------------|
| 1 — Audit | outputs/01_ui_audit.md | None |
| 2 — Strategy | outputs/02_ux_strategy.md | None |
| 3 — Tokens | outputs/03_visual_tokens.md | src/styles.css (upgraded button springs) |
| 4 — Fixes | outputs/04_change_plan.md | src/components/listing-card.tsx (rounded-3xl, editorial) |
| | | src/components/site-chrome.tsx (glassmorphic nav, CTA caps) |
| | | src/components/global-enquiry.tsx (input rings, space-y-4) |
| | | src/routes/listings.index.tsx (horizontal scroll category, dynamic budget ceil) |
| | | src/routes/listings.$id.tsx (alternating specifications table rows) |
| 5 — Review | outputs/05_final_review.md | None (verification only) |

---

## What Does NOT Get Changed

- wrangler.jsonc
- package-lock.json
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

If build passes → share outputs/05_final_review.md for sign-off.
If build fails → share the error with the agent to initiate hotfixes.
