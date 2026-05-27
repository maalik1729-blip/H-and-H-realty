# Agent Rules — H and H Realty Frontend Development

## Scope Enforcement (Highest Priority)
- **NEVER modify**: wrangler.jsonc, package-lock.json, bun.lock, tsconfig.json, eslint.config.js, or any file outside `src/`.
- **NEVER add new npm packages** without explicit approval — work with existing Radix, Lucide, shadcn/ui, and Tailwind structures.
- **NEVER modify** the `outputs/` folder contents from a previous stage run — append a `_v2` suffix if re-running a stage.
- **ALL changes** are strictly inside `src/` only unless explicitly requested otherwise.

## Code Rules
- **TypeScript only** — no raw `.js` files inside `src/`.
- **Tailwind classes only** for styling — avoid `style={}` unless Tailwind cannot represent the dynamic property (e.g. dynamic animation durations set via JS).
- **Use CSS custom properties** (`var(--color-accent)`) in `src/styles.css` as the single source of truth for brand colors.
- **Do not introduce** new component libraries — rely on Radix UI primitives, shadcn/ui components, and existing custom-built components.
- **No `@ts-ignore`** additions under any circumstances — fix the underlying type issue instead.
- **Use proper TypeScript types** — avoid `any` type, prefer explicit interfaces and types.

## Bilingual Rule
- Every user-facing string rendered in JSX **must** have both an `EN` and `TA` (Tamil) variant via `language === "en" ? "..." : "..."` or the `t()` translation hook.
- Never add English-only copy to a visible UI element.
- All form labels, buttons, error messages, and success messages must be bilingual.

## Quality Rules
- **Dynamic Price slider bounds** must update dynamically depending on the selected category.
- **All buttons** must standardise around `.btn-notched`, `.btn-notched-filled`, or `.btn-ghost` for visual cohesion.
- **Touch targets**: all mobile interactive elements must meet `min-h-[44px]` or `min-h-11`.
- **ARIA compliance**: every interactive element must have an accessible label; decorative duplicates must carry `aria-hidden="true"`.
- **Sold/Reserved properties**: enquiry forms must be replaced with a "Browse Similar" CTA.
- **Image optimization**: all images must have proper `alt` text and loading strategies (lazy loading for below-fold images).

## Form Rules
- All forms must be wired to Formspree via `import.meta.env.VITE_FORMSPREE_*` environment variables.
- If the env var is absent, the form silently succeeds (graceful degradation) — never throw an uncaught error.
- Submit buttons must show a `Loader2` spinner and `disabled` state during async submission.
- All inputs that submit via `FormData` must carry a `name` attribute.
- Use React Hook Form + Zod for form validation when building new forms.
- Display clear error messages for validation failures in both EN and TA.

## Contact Info Rule
- Phone numbers, email addresses, and WhatsApp URLs **must** be sourced exclusively from `src/lib/contact-info.ts`.
- Never hardcode `+91 98765 43210` or `hello@hnhrealty.in` directly in component files.
- All contact information must be environment-variable driven with fallbacks.

## Responsive Design Rules
- **Mobile-first approach**: design for mobile (375px) first, then scale up.
- **Breakpoints**: Follow Tailwind's default breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px).
- **Test viewports**: 375px (iPhone SE), 390px (iPhone 14), 412px (Pixel 7), 768px (iPad), 1280px (Desktop).
- **Touch-friendly**: all interactive elements must be at least 44x44px on mobile.
- **No horizontal scroll**: ensure content fits within viewport at all breakpoints.

## Accessibility Rules (WCAG 2.1 AA Compliance)
- **Color contrast**: minimum 4.5:1 for normal text, 3:1 for large text (18px+ or 14px+ bold).
- **Keyboard navigation**: all interactive elements must be keyboard accessible (Tab, Enter, Space, Escape).
- **Screen reader support**: proper ARIA labels, roles, and live regions.
- **Focus indicators**: visible focus states on all interactive elements.
- **Alt text**: descriptive alt text for all images (not just "property image").
- **Form labels**: all form inputs must have associated labels.
- **Semantic HTML**: use proper heading hierarchy (h1 → h2 → h3), landmarks (nav, main, footer).

## Communication Rules
- **After each significant change**, post a brief summary in chat:
  * Files modified
  * Key changes made
  * Any issues or blockers encountered
- If a required file from a previous stage is missing: **HALT** and ask the user to run the required stage first.
- Never silently skip a planned feature or fix.
- Ask for clarification when requirements are ambiguous.

## Output Rules
- `outputs/` folder: markdown files only — no source code snippets as standalone files.
- `src/` changes: fully functioning TypeScript / TSX only.
- Document every `src/` file modified in `outputs/change_log.md`:
  * Format: `[date] | [file path] | [what changed]`
- Include before/after comparisons for significant UI changes.

## Git Commit Rules
- **Commit messages**: use conventional commits format (feat:, fix:, docs:, style:, refactor:, test:, chore:).
- **Atomic commits**: one logical change per commit.
- **No broken commits**: every commit should build successfully.
- **Branch naming**: use descriptive branch names (feature/add-roi-calculator, fix/mobile-menu-overflow).

## Security Rules
- **No secrets in code**: all sensitive data must be in environment variables.
- **Input validation**: validate and sanitize all user inputs.
- **XSS prevention**: use React's built-in XSS protection, avoid dangerouslySetInnerHTML.
- **HTTPS only**: all external resources must be loaded over HTTPS.
- **Dependencies**: keep dependencies up to date, audit for vulnerabilities regularly.
