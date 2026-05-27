# H and H Realty — Frontend Redesign Agent Identity

## Scope: Frontend Only
Do NOT touch: wrangler.jsonc, package-lock.json, bun.lock,
any database files, backend server engines, or server routers.
Every change is strictly inside `src/` only.

---

## Tech Stack (Confirmed from codebase)
- **Framework**: TanStack Start (React 19) + TanStack Router (file-based routing)
- **Styling**: Tailwind CSS v4 + custom OKLCH CSS variables in `src/styles.css`
- **Components**: Radix UI primitives + bespoke H&H custom layouts
- **Animation**: Native CSS transitions + subtle responsive spring scales
- **Icons**: Lucide React
- **i18n**: Custom `useLanguage()` hook — bilingual EN / Tamil (TA)
- **Path alias**: `@` → `src/`

## Confirmed Route Files
- `src/routes/index.tsx`              → Homepage (Hero slider, trust strip, ticker, bento grid, featured marquee, popular locations, Why Us)
- `src/routes/listings.index.tsx`     → Listings Catalog (filter card, category badges, buy/rent/sell tabs, sell form, dynamic price slider)
- `src/routes/listings.$id.tsx`       → Property Detail Page (gallery, spec table, amenities, legal docs, quick inquiry sidebar)
- `src/routes/contact.tsx`            → Contact & Site Visit Booking (form, office info, map)
- `src/routes/blog.tsx`               → Guides & Our Story
- `src/routes/map.tsx`                → Interactive Plot Map
- `src/routes/admin.tsx`              → Admin Property Insertion Dashboard

## Confirmed Component Files
- `src/components/site-chrome.tsx`     → SiteHeader + SiteFooter
- `src/components/listing-card.tsx`    → Property listing card (image, price, specs, CTA)
- `src/components/global-enquiry.tsx`  → Floating enquiry button + modal form
- `src/components/sticky-contact.tsx`  → Mobile sticky bottom bar (Call / WhatsApp / Book)

## Confirmed Utility Files
- `src/lib/listings.ts`              → Listings data, types, formatPrice, isBuiltProperty
- `src/lib/contact-info.ts`          → Centralised CONTACT constants + whatsappUrl helper
- `src/context/language-context.tsx` → Language toggle context (EN/TA)

## Confirmed Audit Findings (from outputs/)
1. **global-enquiry.tsx handleSubmit not async** — form silently fakes submission, no Formspree call fires.
2. **Hardcoded phone in index.tsx CTA** — `+91 98765 43210` hardcoded, violates contact-info centralisation rule.
3. **listings.$id.tsx quick inquiry missing name attrs** — inputs have no `name` attribute for FormData.
4. **site-chrome.tsx "Resources" heading English-only** — no Tamil translation in footer column 3.

---

## Brand Constraints (Non-Negotiable)
- **Primary (H&H Navy)**: `oklch(0.23 0.065 250)` — matches signature logo
- **Accent (Clean Azure Blue)**: `oklch(0.52 0.22 262)` — highlights CTAs and conversion buttons
- **Success**: `oklch(0.60 0.16 150)` — available/verified status badges
- **WhatsApp**: `#25D366` — fixed brand green
- **Design Tokens**: All brand color variants MUST use CSS custom properties in `src/styles.css`.
- **High-Trust Signals**: Lawyer title verification, DTCP/RERA approvals, Patta/EC badges are non-negotiable.
- **Bilingual**: Every user-facing string must have both an EN and TA variant.

## Target Audience
- Chennai home buyers, plot investors, and renters (30–60 age range)
- 55–65% mobile traffic across diverse Android viewport sizes
- High focus on legal vetting, trust signals, and transaction security
- Expects direct pricing, fast load times, and Tamil-language support

## Output Folder
All generated documentation goes to `outputs/` as markdown files.
Document every `src/` file changed in `outputs/change_log.md`.

---

## Workflow Trigger
Place this folder in the project root.
Type in Antigravity chat:
```
/hnh-redesign
```
This runs all 5 stages sequentially, frontend only.
Individual stages: `/hnh-audit` `/hnh-strategy` `/hnh-tokens` `/hnh-fixes` `/hnh-review`
