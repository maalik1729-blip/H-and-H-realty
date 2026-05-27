# 01 — H and H Realty UI Audit (v2)

## Executive Summary

Full read of 9 source files: `src/styles.css` (344 lines), `src/components/site-chrome.tsx` (379 lines), `src/components/listing-card.tsx` (133 lines), `src/components/global-enquiry.tsx` (322 lines), `src/components/sticky-contact.tsx` (39 lines), `src/routes/index.tsx` (1134 lines), `src/routes/listings.index.tsx` (869 lines), `src/routes/listings.$id.tsx` (755 lines), `src/routes/contact.tsx` (210 lines).

Previous v1 run was **Complete**. This v2 re-audit captures the current state post-v1 improvements and identifies any residual issues.

---

## Color & Typography Contrast Findings

### ✅ OKLCH Token System — CLEAN
- All brand colors in `:root` use OKLCH: `--primary: oklch(0.18 0.015 240)`, `--accent: oklch(0.52 0.22 262)`, etc.
- No hardcoded hex or raw Tailwind arbitrary color values found in `styles.css`.
- `@theme inline` correctly maps CSS vars to Tailwind color tokens.

### ⚠️ MEDIUM — Hardcoded phone in `index.tsx` (CTA section, line ~692-694)
```tsx
href="tel:+919876543210"  // hardcoded — must use CONTACT.phoneRaw
+91 98765 43210           // hardcoded — must use CONTACT.phone
```
This violates the contact-info centralisation rule.

### ✅ Typography scope — CORRECT
- `h1`, `h2`, `.font-display` → `var(--font-display)` (Fraunces serif)
- `h3`, `h4`, `h5`, `h6` → `var(--font-sans)` (Inter)
- Body → `var(--font-sans)` via `body { font-family: var(--font-sans) }`

### ✅ Contrast — ADEQUATE
- Primary text `oklch(0.22 0.02 240)` on `oklch(0.99 0.003 240)` background ≈ high contrast (>7:1)
- Accent `oklch(0.52 0.22 262)` on white foreground passes AA

---

## ARIA & Accessibility Findings

### ✅ FIXED (v1) — Ticker duplicate aria-hidden
- Lines 223: `<span key={`dup-${idx}`} aria-hidden="true"` — correctly applied to duplicate ticker items.

### ✅ FIXED (v1) — Price slider ARIA attributes
- `listings.index.tsx` lines 446–449: `aria-label`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow` all present on range input.

### ✅ FIXED (v1) — Global enquiry trigger aria-label
- `global-enquiry.tsx` line 96: `aria-label` present on Enquire Now button.

### ⚠️ MEDIUM — WhatsApp anchor in global-enquiry.tsx missing aria-label for screen readers
- Line 306: `aria-label="Chat on WhatsApp"` ✅ present — OK.

### ⚠️ LOW — `listings.$id.tsx` quick inquiry form inputs missing `name` attributes
- Lines 632–652: name/phone/textarea inputs controlled via state, but have no `name` attribute for FormData compatibility.

### ⚠️ LOW — Contact page `Field` wrapper uses implicit label association
- `contact.tsx` line 202–208: `<label>` wraps children but no explicit `htmlFor`/`id` pair. Radix/native behavior OK but suboptimal.

---

## Mobile Overlay & CTA Visibility Findings

### ✅ FIXED (v1) — Enquire Now visible on all sizes
- `global-enquiry.tsx` lines 97–99: button uses `bottom-20 right-4 h-12 w-12` on mobile and `md:bottom-24 md:right-6 md:h-auto` on desktop. No `hidden md:flex` — correct.

### ✅ FIXED (v1) — WhatsApp button visible on all sizes
- Lines 307–309: `bottom-[88px] right-4 h-11 w-11` on mobile. No hidden class.

### ✅ FIXED (v1) — Body scroll lock implemented
- `global-enquiry.tsx` lines 45–55: `document.body.style.overflow = "hidden"` on modal open, restored on close.

### ✅ FIXED (v1) — First-input auto-focus on modal open
- Line 48: `setTimeout(() => firstInputRef.current?.focus(), 50)`.

### ⚠️ LOW — Sticky contact bar z-index vs floating buttons
- `sticky-contact.tsx`: `z-50` on sticky bar.
- `global-enquiry.tsx` Enquire button: `z-40`, WhatsApp: `z-40`.
- Modal: `z-50`. No overlap conflict observed, but on landscape 667px the floating enquire button (`bottom-20`) and sticky bar (`bottom-0`) may stack tightly.

---

## Form Integrity Findings

### ✅ FIXED (v1) — contact.tsx async Formspree integration
- Lines 51–74: async `onSubmit`, `VITE_FORMSPREE_CONTACT` env var checked, `setSent(true)` on success, error state shown.
- `Loader2` spinner during submit, `disabled` state on button.

### ✅ FIXED (v1) — contact.tsx `name` attributes
- All inputs: `name="fullName"`, `name="phone"`, `name="email"`, `name="interestedIn"`, `name="preferredDate"`, `name="timeSlot"`, `name="message"` — all present.

### ✅ FIXED (v1) — contact.tsx date `min` constraint
- Line 107: `min={new Date().toISOString().split("T")[0]}` — blocks past dates.

### ✅ FIXED (v1) — listings.index.tsx sell form async Formspree
- Lines 269–293: `handleSellSubmit` is async, uses `VITE_FORMSPREE_SELL`, loading/error states present.

### ⚠️ HIGH — listings.$id.tsx quick inquiry: NO `name` attributes on inputs
- The form uses controlled state (lines 82–84: `name`, `phone`, `message`) but inputs have no `name` attribute. If Formspree receives `FormData`, fields won't be labelled.

### ⚠️ MEDIUM — global-enquiry.tsx: handleSubmit is NOT async — fake Formspree call missing
- Line 66–73: `handleSubmit` is synchronous — `setSubmitted(true)` immediately without Formspree API call.
- `isSubmitting` state exists but is never set to `true` during form submit.

---

## Listing Status Logic Findings

### ✅ FIXED (v1) — Sold/Reserved quick inquiry hidden in listings.$id.tsx
- Lines 586–602: when `l.status === "Sold" || l.status === "Reserved"`, a "Browse Listings" CTA replaces the form.

### ✅ FIXED (v1) — Gallery image onError fallback in listings.$id.tsx
- Line 181: `onError={(e) => { e.currentTarget.src = "/placeholder-property.jpg"; e.currentTarget.onerror = null; }}`

### ✅ listing-card.tsx — onError fallback present
- Lines 44–47: `onError` handler redirects to `/placeholder-property.jpg`.

### ✅ Dynamic price slider ceiling auto-updates
- `listings.index.tsx` lines 155–162: `dynamicMaxCeiling` computed via `useMemo` based on active category.
- Lines 164–168: `useEffect` clamps `maxPrice` when ceiling drops.

---

## Bilingual Coverage Findings

### ✅ All core UI strings use `language === "en" ? "..." : "..."` or `t()` calls
- Site chrome, listing card, global enquiry, sticky contact, contact page all bilingual.

### ⚠️ LOW — `index.tsx` CTA section line ~692: hardcoded English phone string in `<a>` href and text
- `href="tel:+919876543210"` and `+91 98765 43210` visible text — not bilingual-safe and not from CONTACT.

### ⚠️ LOW — `site-chrome.tsx` "Resources" column header (line 289) is English-only
- `<h4>Resources</h4>` — no Tamil translation.

---

## Prioritized Fix List

### 🔴 CRITICAL
1. `global-enquiry.tsx` — `handleSubmit` must be async with real Formspree call and loading/error state.
2. `index.tsx` — hardcoded `+91 98765 43210` phone in CTA must use `CONTACT.phone` / `CONTACT.phoneRaw`.

### 🟠 HIGH
3. `listings.$id.tsx` — quick inquiry inputs need `name` attributes for FormData.

### 🟡 MEDIUM
4. `site-chrome.tsx` footer "Resources" heading needs Tamil translation.
5. `global-enquiry.tsx` — WhatsApp button URL should use `whatsappUrl()` helper consistently.

### 🟢 LOW
6. `contact.tsx` — `Field` labels could use explicit `htmlFor`/`id` for better screen reader support.
7. Mobile landscape floating button proximity — add extra `mb-safe` offset logic if needed.
