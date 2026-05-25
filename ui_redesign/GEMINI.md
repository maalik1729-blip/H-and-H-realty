# Land Connect Frontend UI Redesign — Agent Identity

## Scope: Frontend Only
Do NOT touch: wrangler.jsonc, package-lock.json, bun.lock,
any database files, backend server engines, or server routers.
Every change is strictly inside src/ only.

---

## Tech Stack (Confirmed from codebase)
- **Framework**: TanStack Start (React 19) + TanStack Router (file-based routing)
- **Styling**: Tailwind CSS v4 + custom OKLCH CSS variables in `src/styles.css`
- **Components**: Radix UI primitives + bespoke Chennai custom layouts
- **Animation**: Native CSS transitions + subtle responsive spring scales
- **Icons**: Lucide React
- **Path alias**: `@` → `src/`

## Confirmed Route Files
- `src/routes/index.tsx`         → Homepage (Hero section, building illustration popout, trust stripes)
- `src/routes/listings.index.tsx`→ Listings Catalog (Glassmorphic filter card, property type dropdowns, split grid-map panels)
- `src/routes/listings.$id.tsx`  → Property Detail Page (alternating spec tables, nearby landmarks, gallery grids)
- `src/routes/admin.tsx`         → Admin Property Insertion Dashboard
- `src/routes/blog.tsx`          → Guides & Company Story blog list
- `src/routes/contact.tsx`       → Form submission support page
- `src/routes/map.tsx`           → Interactive plot map exploration page

## Confirmed Problems (from live site audit)
1. **Contrast Deprivation**: Muted text on dark panels (like `text-slate-400` in "Discover More") is hard to read against navy gradients.
2. **Dense Floating badge stack**: Homepage floating pills have high visual vertical density due to spacious paddings.
3. **Empty Action Box Placeholder**: The "Discover More" link box lacks media context, resembling an empty or missing asset block.
4. **Mobile CTA bottom bar congestion**: Sticky contact overlays overlap floating buttons and WhatsApp selectors on smaller viewports.
5. **Rigid Budget Slider scale**: Price filters remain capped at 1000 Lakh even when browsing low-price properties, leading to empty result states.

---

## Brand Constraints (Non-Negotiable)
- **Primary (H&H Navy)**: `oklch(0.23 0.065 250)` (matches signature logo)
- **Accent (Clean Azure Blue)**: `oklch(0.60 0.16 240)` (highlights tags and conversion buttons)
- **Design Tokens**: Every brand color variant MUST leverage CSS custom properties in `src/styles.css`.
- **High-Trust Signals**: Preserving lawyer title verification metrics and DTCP/RERA approvals is essential.

## Target Audience
- Chennai home buyers, plot investors, and renters (30-60 age range)
- 50-60% mobile traffic, with highly diverse viewport sizes
- High focus on legal vetting and transaction security
- Expects direct pricing and fast loading speed

## Output Folder
All generated/modified files go to their correct `src/` paths.
Document every file changed in `outputs/change_log.md`.

---

## Workflow Trigger
Place this folder in the project root.
Type in Antigravity chat:
```
/ui-redesign
```
This runs all 5 stages sequentially, frontend only.
Individual stages: `/ui-audit` `/ux-strategy` `/visual-tokens` `/component-fixes` `/ux-review`
