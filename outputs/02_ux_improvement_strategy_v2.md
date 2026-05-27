# 02 — H and H Realty UX Improvement Strategy (v2)

## UX Strategy Overview

Based on the v2 audit, three critical issues remain from the v1 run:
1. `global-enquiry.tsx` — `handleSubmit` is synchronous (fake form submission)
2. `index.tsx` — hardcoded contact info in CTA section
3. `listings.$id.tsx` — missing `name` attributes on quick inquiry inputs

The v2 strategy focuses on closing these gaps and standardising all 4 forms for production-grade async Formspree submission.

---

## Conversion Trigger Improvements

### Current State
- CTA in `index.tsx` uses "Book site visit" (good) but phone anchor hardcodes `+91 98765 43210`.
- Enquire Now float button opens a modal that **silently fakes submission** — no Formspree call ever fires.

### Proposed Fix
1. Replace hardcoded phone with `CONTACT.phone` and `CONTACT.phoneRaw` from `@/lib/contact-info`.
2. Wire `global-enquiry.tsx` `handleSubmit` to `VITE_FORMSPREE_ENQUIRY` env var.
3. Set `isSubmitting = true` → show spinner → on success `setSubmitted(true)` → on error `setSubmitError(msg)`.

### Micro-copy Improvements
| Location | Current | Improved |
|----------|---------|----------|
| Nav CTA | "Contact us ↗" | "Book Free Visit ↗" |
| Enquiry modal submit | "Submit Inquiry" | "Send Enquiry Now" |
| Detail page quick inquiry | "Request callback" | "Book Site Visit" |
| Sticky bar | "Book visit" | "Book Free Visit" |

---

## Dynamic Category Slider Boundaries

### Already Implemented (v1)
- `dynamicMaxCeiling` in `listings.index.tsx` computes from the highest-priced listing in active category.
- Auto-clamping via `useEffect` when `maxPrice > dynamicMaxCeiling`.
- Default ceiling: 1000 Lakh (₹10 Cr) for "All" category.

### No Changes Required
The slider is correctly dynamic. ✅

---

## Mobile Overlay Hierarchy Plan

### Z-index Layers (confirmed from source)
| Layer | Element | z-index |
|-------|---------|---------|
| 1 | Sticky contact bar | z-50 |
| 2 | Site header | z-40 |
| 3 | Enquire Now float | z-40 |
| 4 | WhatsApp float | z-40 |
| 5 | Enquiry modal | z-50 |
| 6 | Mobile nav drawer | z-30 (behind header) |

### Issue
Enquire Now float (`bottom-20`) sits above the sticky bar (`bottom-0`, height ~56px). On landscape 667px, this is acceptable. No overlap conflict.

### Recommended
Add `pb-[env(safe-area-inset-bottom)]` to WhatsApp and Enquire buttons for iPhone notch safety. Already present on sticky bar via `style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}`.

---

## Form Submission State Design

### 4 Forms — Required States

| Form | File | Env Var | Loading State | Error State | Success State |
|------|------|---------|---------------|-------------|---------------|
| Global Enquiry | global-enquiry.tsx | VITE_FORMSPREE_ENQUIRY | `isSubmitting` spinner on button | `submitError` text | `submitted = true` view |
| Contact/Site Visit | contact.tsx | VITE_FORMSPREE_CONTACT | `isSubmitting` + Loader2 | `submitError` text | `sent = true` view |
| Sell Form | listings.index.tsx | VITE_FORMSPREE_SELL | `isSellSubmitting` + Loader2 | `sellSubmitError` text | `sellFormSubmitted = true` view |
| Quick Inquiry | listings.$id.tsx | VITE_FORMSPREE_CONTACT | add `isSubmitting` + Loader2 | add error display | `sent = true` view |

### Graceful Degradation Rule
When env var is absent → silently succeed (no network call) → show success. ✅ Already implemented in contact.tsx and listings.index.tsx. Must be applied to global-enquiry.tsx.

---

## Trust Signal Placement Strategy

### Identified Trust Signals
- "Lawyer Vetted" (BadgeCheck) — on listing cards, on detail page gallery badge, and in quick inquiry sidebar trust badges
- "DTCP Approved" — in footer EHO strip and FAQ section
- "TNRERA Registered" — in listing specs (RERA field)
- "Title Verified" — in listing detail sidebar trust badges
- "30-Year Due Diligence" — in ticker marquee, FAQ, and WhyUs section

### Recommended Placements (Unchanged from v1)
1. **Listing Cards**: Lawyer Vetted badge ✅ already shown
2. **Detail Page**: Trust badges in right rail (Title Verified, Legal Ready, Bank Loan OK) ✅
3. **Home CTA**: Add "Lawyer Vetted · DTCP Approved · RERA Registered" trust line below CTA buttons
4. **Contact Page**: Keep "Free consultation" badge in hero

---

## Recommended UX Priorities (v2)

1. 🔴 **Wire global-enquiry.tsx to Formspree** — this is the primary enquiry CTA across all pages
2. 🔴 **Fix hardcoded contact in index.tsx** — contact centralisation rule violation
3. 🟠 **Add `name` attributes to quick inquiry inputs** — data completeness
4. 🟡 **Bilingual "Resources" footer heading**
5. 🟢 **Micro-copy improvements** — convert "Contact Us" to "Book Free Visit" site-wide
