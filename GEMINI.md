# H and H Realty — Frontend Development Agent Identity

## Scope: Frontend Only
Do NOT touch: wrangler.jsonc, package-lock.json, bun.lock,
any database files, backend server engines, or server routers.
Every change is strictly inside `src/` only.

---

## Tech Stack (Confirmed from codebase)
- **Framework**: TanStack Start (React 19) + TanStack Router (file-based routing)
- **Styling**: Tailwind CSS v4 + custom OKLCH CSS variables in `src/styles.css`
- **Components**: Radix UI primitives + shadcn/ui + custom H&H layouts
- **Animation**: Native CSS transitions + Framer Motion
- **Icons**: Lucide React
- **i18n**: Custom `useLanguage()` hook — bilingual EN / Tamil (TA)
- **Path alias**: `@` → `src/`
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts for data visualization
- **Maps**: Leaflet for interactive maps

## Confirmed Route Files
- `src/routes/index.tsx`              → Homepage (Hero slider, trust strip, ticker, bento grid, featured marquee, popular locations, Why Us)
- `src/routes/listings.index.tsx`     → Listings Catalog (filter card, category badges, buy/rent/sell tabs, sell form, dynamic price slider)
- `src/routes/listings.$id.tsx`       → Property Detail Page (gallery, spec table, amenities, legal docs, quick inquiry sidebar)
- `src/routes/contact.tsx`            → Contact & Site Visit Booking (form, office info, map)
- `src/routes/blog.tsx`               → Guides & Our Story
- `src/routes/map.tsx`                → Interactive Plot Map
- `src/routes/admin.tsx`              → Admin Property Insertion Dashboard

## Confirmed Component Files
- `src/components/site-chrome.tsx`                → SiteHeader + SiteFooter
- `src/components/listing-card.tsx`               → Property listing card (image, price, specs, CTA)
- `src/components/global-enquiry.tsx`             → Floating enquiry button + modal form
- `src/components/sticky-contact.tsx`             → Mobile sticky bottom bar (Call / WhatsApp / Book)
- `src/components/financial-roi-calculator.tsx`   → ROI and investment calculator
- `src/components/location-connectivity-map.tsx`  → Interactive location map with connectivity
- `src/components/plot-layout-visualizer.tsx`     → 3D plot layout visualization
- `src/components/scroll-video-reveal.tsx`        → Scroll-triggered video reveal animation

## Confirmed Utility Files
- `src/lib/listings.ts`              → Listings data, types, formatPrice, isBuiltProperty
- `src/lib/contact-info.ts`          → Centralised CONTACT constants + whatsappUrl helper
- `src/context/language-context.tsx` → Language toggle context (EN/TA)

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
Type in Kiro chat:
```
@GEMINI.md
```
This loads the agent identity and project context.
