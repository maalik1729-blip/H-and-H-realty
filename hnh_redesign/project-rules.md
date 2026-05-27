# Agent Rules — H and H Realty Frontend Redesign

## Scope Enforcement (Highest Priority)
- **NEVER modify**: wrangler.jsonc, package-lock.json, bun.lock, tsconfig.json, eslint.config.js, or any file outside `src/`.
- **NEVER add new npm packages** — work with existing Radix, Lucide, and Tailwind structures.
- **NEVER modify** the `outputs/` folder contents from a previous stage run — append a `_v2` suffix if re-running a stage.
- **ALL changes** are strictly inside `src/` only.

## Code Rules
- **TypeScript only** — no raw `.js` files inside `src/`.
- **Tailwind classes only** for styling — avoid `style={}` unless Tailwind cannot represent the dynamic property (e.g. dynamic animation durations set via JS).
- **Use CSS custom properties** (`var(--color-accent)`) in `src/styles.css` as the single source of truth for brand colors.
- **Do not introduce** new component libraries — rely on Radix UI primitives and existing custom-built components.
- **No `@ts-ignore`** additions under any circumstances.

## Bilingual Rule
- Every user-facing string rendered in JSX **must** have both an `EN` and `TA` (Tamil) variant via `language === "en" ? "..." : "..."` or the `t()` translation hook.
- Never add English-only copy to a visible UI element.

## Quality Rules
- **Dynamic Price slider bounds** must update dynamically depending on the selected category.
- **All buttons** must standardise around `.btn-notched`, `.btn-notched-filled`, or `.btn-ghost` for visual cohesion.
- **Touch targets**: all mobile interactive elements must meet `min-h-[44px]` or `min-h-11`.
- **ARIA compliance**: every interactive element must have an accessible label; decorative duplicates must carry `aria-hidden="true"`.
- **Sold/Reserved properties**: enquiry forms must be replaced with a "Browse Similar" CTA.

## Form Rules
- All forms must be wired to Formspree via `import.meta.env.VITE_FORMSPREE_*` environment variables.
- If the env var is absent, the form silently succeeds (graceful degradation) — never throw an uncaught error.
- Submit buttons must show a `Loader2` spinner and `disabled` state during async submission.
- All inputs that submit via `FormData` must carry a `name` attribute.

## Contact Info Rule
- Phone numbers, email addresses, and WhatsApp URLs **must** be sourced exclusively from `src/lib/contact-info.ts`.
- Never hardcode `+91 98765 43210` or `hello@hnhrealty.in` directly in component files.

## Communication Rules
- **After each stage**, post a 3-line summary in chat:
  * Line 1: Files read
  * Line 2: Files written / modified
  * Line 3: Top finding or blocker
- If a required file from a previous stage is missing: **HALT** and ask the user to run the required stage first.
- Never silently skip a planned visual upgrade.

## Output Rules
- `outputs/` folder: markdown files only — no source code snippets as standalone files.
- `src/` changes: fully functioning TypeScript / TSX only.
- Document every `src/` file modified in `outputs/change_log.md`:
  * Format: `[date] | [file path] | [what changed]`
