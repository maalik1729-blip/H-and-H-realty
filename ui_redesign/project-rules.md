# Agent Rules — Land Connect Frontend Redesign

## Scope Enforcement (Highest Priority)
- **NEVER modify**: wrangler.jsonc, package-lock.json, bun.lock, tsconfig.json, eslint.config.js, or any file outside `src/`.
- **NEVER add new npm packages** — work with existing components and styling structures.
- **NEVER modify** the `outputs/` folder contents from a previous stage run (append a `_v2` suffix if re-running).
- **ALL changes** are strictly inside `src/` only.

## Code Rules
- **TypeScript only** — no raw `.js` files inside `src/`.
- **Tailwind classes only** for styling — avoid inline `style={}` objects unless Tailwind cannot represent the dynamic property (e.g. dynamic animation durations).
- **Use CSS custom properties** (`var(--color-accent)`) in `src/styles.css` as the single source of truth for brand colors.
- **Do not introduce** new component libraries — rely on Radix and custom-built primitives.

## Quality Rules
- **Every change** must be TypeScript-valid — no `@ts-ignore` additions.
- **Dynamic Price slider bounds** must update dynamically depending on the selected categories to avoid empty catalog states.
- **All buttons** must standardise around H&H custom notched rules (`.btn-notched`, `.btn-notched-filled`) to ensure visual cohesion.
- **Touch targets**: all mobile interactive buttons must have a height profile of at least `min-h-[40px]` or `min-h-11` to prevent misclicks.

## Communication Rules
- **After each stage**, post a 3-line summary in chat:
  * Line 1: Files read
  * Line 2: Files written/modified
  * Line 3: Top finding or blocker
- If a required file from a previous stage is missing: **HALT** and ask the user to execute the required stage command first.
- Never silently skip a planned visual upgrade.

## Output Rules
- **outputs/ folder**: markdown files only, no source code files.
- **src/ changes**: fully functioning TypeScript/TSX code only.
- Document every `src/` file modified in `outputs/change_log.md`:
  * Format: `[timestamp] | [file path] | [what changed]`
