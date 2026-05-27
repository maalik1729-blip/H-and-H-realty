# Final UX Review Summary

This document is the quality-gate review for the **H and H Realty** redesign. It cross-references the planned improvements from `04_component_execution_plan.md` against risk categories, then provides concrete QA checklists for accessibility, mobile testing, and release readiness.

The goal: **no open P0 issue should survive to production.** P1 issues must have a clear sprint timeline. P2+ may be deferred with documented acceptance.

---

# Remaining UX Risks

### 🔴 Risk 1: Forms Have No Actual Backend Submission
**Affects:** `global-enquiry.tsx`, `contact.tsx`, Sell form in `listings.index.tsx`

All three forms call `e.preventDefault()` and set a local `sent` state. No data is ever transmitted to the business. Every lead capture on the current site is silently discarded.

**Pre-launch requirement:**
- Integrate with a form endpoint: Formspree, Netlify Forms, or a custom Hono API route via `src/server.ts` (already in the stack).
- Add a `Loader2` spinner on the submit button during async call.
- Show a proper error state if submission fails.

**Risk if not fixed:** Every enquiry form submission generates zero leads. Business damage: total.

---

### 🔴 Risk 2: Fake reCAPTCHA Still Present
**Affects:** `global-enquiry.tsx` lines 40–56

The simulated CAPTCHA uses Google's official reCAPTCHA logo with a 1.2s `setTimeout` mock. Tech-literate users will recognise it immediately. The lack of real bot protection means the form backend (once integrated) will receive 100% unfiltered spam.

**Pre-launch requirement:** Integrate `react-google-recaptcha` with a real site key. Verify the token server-side before accepting submission.

---

### 🔴 Risk 3: Contact Page Forms Are Visually Broken
**Affects:** `contact.tsx` — `.field` CSS class is never defined in `styles.css`

Every `<input>`, `<select>`, and `<textarea>` on the contact page uses `className="field"`. The class does not exist. The contact page currently renders completely unstyled browser-default form elements.

**Pre-launch requirement:** Define `.field` in `styles.css @layer components` as specified in `04_component_execution_plan.md`.

---

### 🔴 Risk 4: Placeholder Contact Data Remains Live
**Affects:** `site-chrome.tsx` lines 322–328

`+91 98765 43210` and `hello@hnhrealty.in` are visible in the footer. Users who call this number reach a random stranger. Users who email get a bounce or unmonitored inbox.

**Pre-launch requirement:** Replace with real, monitored business contact information before any traffic reaches the site.

---

### 🟠 Risk 5: Mobile Enquiry Path Is Broken
**Affects:** `global-enquiry.tsx` — `hidden md:flex` hides the floating Enquire Now button on all mobile devices.

Mobile users have only the StickyContact bar's "Book Visit" link, which routes to `/contact` — a separate page. The fastest lead path is completely mobile-invisible.

**Target sprint:** Sprint 1.

---

### 🟠 Risk 6: Deceptive Photo Navigation Affordance
**Affects:** `listing-card.tsx` lines 47–68

Hover-visible `ChevronLeft` / `ChevronRight` buttons appear on listing cards but do nothing. Users click them expecting a photo gallery. This is a broken-by-design affordance that erodes trust.

**Target sprint:** Sprint 1 — remove buttons entirely until multi-image support is implemented.

---

### 🟡 Risk 7: Category Switch Flash-of-Zero-Results
**Affects:** `listings.index.tsx` — `dynamicMaxCeiling` recalculation lag on category switch causes a brief zero-result render before the price ceiling adjusts.

**Target sprint:** Sprint 2 — synchronous price reset + loading skeleton.

---

### 🟡 Risk 8: No Sort Functionality on Listings Page
**Affects:** `listings.index.tsx` — listings render in static `lib/listings.ts` order. No price, recency, or verification-status sort exists.

**Target sprint:** Sprint 3.

---

# Accessibility Risks

### 🔴 1. Contact Form Has No Label/Input Association
**File:** `contact.tsx` — `Field` component renders labels without `htmlFor`/`id` binding.

Screen readers cannot associate labels with inputs. WCAG 2.1 SC 1.3.1 (Level A) failure.

**Fix:** `React.useId()` in `Field` component, bind to both `<label htmlFor>` and `<input id>`.

---

### 🔴 2. Enquiry Modal Has No Focus Trap
**File:** `global-enquiry.tsx` — background page is fully tab-navigable while modal is open.

WCAG 2.1 Level A failure. Focus leaks out of the modal to background page elements.

**Fix:** `document.body.style.overflow = "hidden"` + focus moves to first input on open + Tab key trapped within modal container.

---

### 🟠 3. Price Range Slider Has No Screen Reader Metadata
**File:** `listings.index.tsx` lines 415–418

```tsx
// Missing: aria-label, aria-valuemin, aria-valuemax, aria-valuenow
<input type="range" min={20} max={dynamicMaxCeiling} ... />
```

**Fix:**
```tsx
<input
  type="range"
  aria-label={language === "en" ? "Maximum budget in Lakhs" : "அதிகபட்ச பட்ஜெட் லட்சத்தில்"}
  aria-valuemin={20}
  aria-valuemax={dynamicMaxCeiling}
  aria-valuenow={maxPrice}
  ...
/>
```

---

### 🟠 4. Live Ticker Announces Duplicate Content to Screen Readers
**File:** `index.tsx` — the marquee duplicates all ticker items for infinite scroll. Screen readers will read every item twice.

**Fix:** Add `aria-hidden="true"` to all duplicate ticker node elements. Wrap the ticker in:
```tsx
<section aria-label="Recent property verifications">
```

---

### 🟠 5. Custom Checkbox Filter Has No ARIA Role
**File:** `listings.index.tsx` lines 334–355

The custom checkbox hides the native `<input type="checkbox" className="hidden">` and uses a styled `<div>`. The div has no `role="checkbox"` or `aria-checked` attribute.

**Fix:** Either use the native `<input type="checkbox">` styled via CSS (not hidden), or add `role="checkbox"` and `aria-checked={isChecked}` to the custom div.

---

### 🟡 6. `prefers-reduced-motion` Not Respected
**File:** `styles.css` — `animate-marquee`, `animate-spin-slow`, `animate-scale-up` have no reduced-motion override.

**Fix:**
```css
@media (prefers-reduced-motion: reduce) {
  .animate-marquee, .animate-spin-slow {
    animation: none !important;
  }
  .animate-scale-up, .animate-fade-in {
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }
  * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
```

---

### 🟡 7. Listing Card Images Have Minimal Alt Text
**File:** `listing-card.tsx` — `alt={l.title}` provides only the property title. Insufficient context for screen reader users browsing a list.

**Fix:**
```tsx
alt={`${l.title} in ${l.location}, ${l.city} — ${l.areaLabel}`}
```

---

# Responsive Design Risks

### 🟠 1. Header Logo Overflow on 640–768px (Android Landscape)
**File:** `site-chrome.tsx` — negative margin math `-my-[40px]` (mobile) / `-my-[90px]` (md+) has no `sm:` breakpoint. Devices at 640–767px use the mobile negative margin with the `h-[120px]` logo, creating vertical overflow.

**Testing device:** Samsung Galaxy S23 in landscape (720×360 logical px).

**Fix:** Eliminate negative margins entirely — control logo via `h-10 md:h-12` as specified in `04_component_execution_plan.md`.

---

### 🟠 2. Filter Panel Blocks All Listings on Mobile
**File:** `listings.index.tsx` — `grid-cols-1` stacking creates 5+ full scroll heights before the first listing card appears on a 375px viewport.

**Testing device:** iPhone SE (375×667px), iPhone 12 (390×844px).

**Fix:** Mobile filter bottom-sheet pattern as specified in `04_component_execution_plan.md`.

---

### 🟡 3. Sticky-Stack Location Cards Are Untappable on Small Screens
**File:** `index.tsx` — `--index * 16px` sticky offset exposes only 16px of each stacked card. 16px is below WCAG's 44px minimum touch target.

**Fix:** Disable sticky stacking on `< 640px` (set `position: relative; top: auto` via `@media` override).

---

### 🟡 4. Map Component Dominates Mobile Detail Page
**File:** `listings.$id.tsx` — `LocationConnectivityMap` renders at ~500px default height on mobile. Users must scroll ~600px past the map to reach the enquiry form.

**Fix:** `max-h-[280px] overflow-hidden` wrapper on mobile with an "Expand Map" toggle.

---

### 🟡 5. Bento Grid Cards Have No Minimum Mobile Height
**File:** `index.tsx` — bento cards use only `md:h-[380px]`. On mobile, height is determined by content alone, causing image compression as low as ~180px.

**Fix:** Add `min-h-[260px]` to all bento card elements.

---

# Interaction Consistency

### Verified Consistent ✅
- Card hover: `hover:-translate-y-1` — consistent across `listing-card.tsx`, bento cards, location stack cards.
- Purpose tab highlighting: `buy`/`rent`/`sell` pills correctly activate.
- Language toggle: `t()` calls update correctly across all visible text.
- Lazy loading: `loading="lazy"` present on most listing images.

### Inconsistencies to Fix 🔴

| Inconsistency | Files | Fix |
|---------------|-------|-----|
| `btn-notched-filled:hover` turns near-black (unexpected) | `styles.css` | Fix hover background to darker accent |
| `text-[10px]` on some CTAs, `text-xs` on others | `listing-card.tsx`, `site-chrome.tsx` | Standardize to `text-xs` (12px) minimum |
| Some `<Link>` elements use `hover:underline`, others `hover:opacity-90` | Multiple files | Standardize to `hover:text-accent` for inline text links |
| Spec/feature icons: mix of `text-primary`, `text-accent`, `text-muted-foreground` | `listings.$id.tsx` | All spec icons → `text-accent` |

---

# Edge Cases

### 1. Property Image 404 — No `onError` Handler
**Files:** `listing-card.tsx`, `listings.$id.tsx` — no fallback when image URL returns 404.

**Fix:**
```tsx
<img
  src={l.image}
  alt={...}
  onError={(e) => {
    e.currentTarget.src = "/placeholder-property.jpg";
    e.currentTarget.onerror = null;
  }}
/>
```
Ensure `/public/placeholder-property.jpg` exists as a branded fallback.

---

### 2. Language Toggle Does Not Update `<title>` Post-Load
The TanStack Router `head()` generates `<title>` at route load time. If the user switches language after load, `document.title` stays in the original language.

**Fix:** Add `useEffect` in each route component:
```tsx
useEffect(() => {
  document.title = `${l.title} in ${l.location} — H and H Realty`;
}, [language]);
```

---

### 3. Sold/Reserved Listings Still Show Active Enquiry Form
**File:** `listings.$id.tsx` — properties with `status: "Sold"` are accessible via direct URL and render the full enquiry form.

**Fix:** When `l.status === "Sold"` or `"Reserved"`, disable the form and show:
"This property is no longer available. View similar properties below." + related listings grid.

---

### 4. Filter URL State With Invalid Enum Values
**File:** `listings.index.tsx` — if a user navigates to `/listings?category=InvalidValue`, the zod schema silently defaults to `"All"` but throws a console error.

**Fix:** Add `.catch()` to enum schema defaults to suppress parse noise:
```ts
category: propertyCategories.catch("All").default("All"),
```

---

# Performance Considerations

### 🟠 1. No `debounce` on Search Input
**File:** `listings.index.tsx` lines 281–285 — `updateSearch()` fires on every keystroke, triggering a URL navigate + full filter recalculation on each character typed.

**Fix:** Wrap `updateSearch({ q: e.target.value })` in a 300ms debounce. Keep `setSearchQuery` instant for visual feedback.

---

### 🟠 2. Marquee Duplicates Add Render Weight
**File:** `index.tsx` — featured listings marquee renders each `ListingCard` twice (16+ card renders, 16+ image requests).

**Fix:** Limit the featured marquee to a maximum of 6 items, duplicated to 12. Or use a CSS-only repeat approach without DOM duplication.

---

### 🟡 3. No `width`/`height` on Listing Card Images
Listing card `<img>` elements have no explicit `width` and `height` attributes, causing Cumulative Layout Shift (CLS) as images load.

**Fix:** Add `width={350} height={263}` matching the `aspect-[4/3]` container ratio.

---

### 🟡 4. Large Components Not Lazily Imported
`PlotLayoutVisualizer` and `LocationConnectivityMap` are large interactive components imported statically on the homepage and detail page. They run their initialization code even if a user never scrolls to them.

**Fix:** Use `React.lazy()` + `<Suspense>` with an `IntersectionObserver` trigger.

---

# UX QA Checklist

**Sprint 0 — Pre-Launch Blockers**
- [ ] Real form submission backend integrated for all 3 forms
- [ ] Fake reCAPTCHA replaced with real Google reCAPTCHA v2/v3
- [ ] `.field` CSS class defined in `styles.css`
- [ ] Real phone number and email in `site-chrome.tsx` footer
- [ ] Photo navigation arrows removed from `listing-card.tsx`

**Sprint 1**
- [ ] Enquire Now button visible on mobile (`hidden md:flex` → `flex`)
- [ ] WhatsApp button visible on mobile
- [ ] Body scroll lock on enquiry modal open
- [ ] Auto-focus on first form input when modal opens
- [ ] `aria-label` added to Enquire Now floating button

**Sprint 2**
- [ ] Property context pre-populated in enquiry modal
- [ ] Mobile filter bottom sheet implemented
- [ ] Category tab strip above filter panel on listings page
- [ ] Sticky active filter summary bar
- [ ] Isolated search query reset (preserves other filters)

**Sprint 3**
- [ ] Logo negative margin refactored to controlled sizing
- [ ] `prefers-reduced-motion` CSS block added
- [ ] Spec grid icons changed from `text-primary` to `text-accent`
- [ ] `btn-notched-filled` hover color fixed to darker accent
- [ ] `btn-ghost` variant added to `styles.css`

**Sprint 4**
- [ ] Breadcrumb navigation on listing detail pages
- [ ] Sort controls on listings page
- [ ] Tamil font (Noto Sans Tamil) loaded via Google Fonts
- [ ] `min` date constraint on contact form date picker
- [ ] `onError` image fallback on all listing card and detail images

---

# Accessibility QA Checklist

| Check | WCAG SC | Status | File |
|-------|---------|--------|------|
| Form labels programmatically associated | 1.3.1 (A) | ❌ Failing | `contact.tsx` |
| Modal focus trapped on open | 2.1.2 (A) | ❌ Failing | `global-enquiry.tsx` |
| Price slider has `aria-label`/`valuemin`/`max`/`now` | 1.3.1 (A) | ❌ Failing | `listings.index.tsx` |
| Custom checkboxes have `role`/`aria-checked` | 4.1.2 (A) | ❌ Failing | `listings.index.tsx` |
| Ticker duplicates hidden from screen readers | 1.3.1 (A) | ❌ Failing | `index.tsx` |
| Enquire Now button has `aria-label` | 4.1.2 (A) | ❌ Failing | `global-enquiry.tsx` |
| Images have descriptive alt text | 1.1.1 (A) | 🟡 Partial | `listing-card.tsx` |
| Focus rings visible on all interactive elements | 2.4.7 (AA) | 🟡 Partial | Multiple files |
| Colour contrast ≥ 4.5:1 on body text | 1.4.3 (AA) | 🟡 Borderline | `styles.css` muted-foreground |
| Reduced motion respected | 2.3.3 (AAA) | ❌ Failing | `styles.css` |

---

# Mobile Testing Checklist

| Device / Scenario | Test | Status |
|-------------------|------|--------|
| iPhone SE (375px) — homepage | No horizontal overflow | ⚠️ Test Required |
| iPhone SE — listings page | First listing card visible without scrolling | ❌ Failing (filter tower) |
| iPhone 12 (390px) — enquiry modal | Modal usable, keyboard doesn't overlap form | ⚠️ Test Required |
| iPhone 12 — StickyContact bar | Anchored above iOS home indicator | ✅ Code checks out |
| Android (360px, Chrome) — floating buttons | No z-index conflicts | ⚠️ Test Required |
| Samsung S23 landscape (720px) — header | Logo not overflowing header | ❌ Failing (negative margin) |
| iPad landscape (1024px) — bento grid | Aspect ratios maintained | ⚠️ Test Required |
| All devices — hamburger menu | Dismisses on outside tap + Escape key | ✅ Code implemented |
| All devices — marquee | Pauses on hover; stops on reduced-motion | ❌ No reduced-motion support |

---

# User Testing Checklist

| Task | Target User | Success Metric | Status |
|------|-------------|----------------|--------|
| Find a plot under ₹50L near ECR | First-time buyer | Complete in < 45 seconds | ⚠️ Not tested |
| Submit an enquiry for a specific villa | Mobile user | Complete in < 60 seconds | ❌ Blocked (button hidden on mobile) |
| Book a site visit via contact form | Non-technical user | Form submits successfully | ❌ Blocked (unstyled inputs + no backend) |
| Toggle to Tamil and use the app fully | Tamil-speaking user | No rendering errors | ⚠️ Requires Tamil device font |
| Recover from a zero-results filter state | Any user | Recover without back button | ⚠️ Not tested |
| Navigate from Google to a listing detail | Organic search user | Find contact info within 30s | ⚠️ No breadcrumb trail |

---

# Release Readiness Evaluation

| Category | Status | Details |
|----------|--------|---------|
| **Core Functionality (Form Backend)** | 🔴 Not Ready | All 3 forms submit to nowhere |
| **Trust Foundation** | 🔴 Not Ready | Fake CAPTCHA + placeholder contact data |
| **Contact Page UI** | 🔴 Not Ready | `.field` class undefined — all inputs unstyled |
| **Mobile Lead Path** | 🔴 Not Ready | Primary CTA hidden on all mobile devices |
| **Visual Design** | 🟡 Partial | Strong foundation; icon color + button hover fixes pending |
| **Accessibility** | 🔴 Failing | 6 WCAG Level A failures outstanding |
| **Performance** | 🟡 Acceptable | No debounce; duplicate marquee DOM; fixable post-launch |
| **SEO** | 🟡 Partial | Route-level head meta correct; no JSON-LD BreadcrumbList schema |
| **Content** | 🟡 Partial | US-centric property types; EHO badge; placeholder data |

## Release Decision

**🔴 DO NOT LAUNCH until the following 5 items are resolved:**

1. **Form backend** — connect all 3 forms to a real endpoint
2. **Real reCAPTCHA** — remove the simulated CAPTCHA
3. **Define `.field` CSS class** — contact page is visually broken
4. **Real phone/email in footer** — placeholder data is trust-destroying
5. **Mobile Enquire Now visibility** — hidden primary CTA = zero mobile leads

After these 5 P0 items are resolved, the site is ready for a soft launch to a limited audience. All remaining items can be addressed in post-launch sprints.

---

# Developer Implementation Notes

## Quick Wins (< 1 hour each)
- Define `.field` in `styles.css` — 10 lines of CSS
- Add `min` to contact form date input — 1 line
- Fix `btn-notched-filled` hover color — 3 lines of CSS
- Remove photo nav arrows from `listing-card.tsx` — delete ~25 lines
- Change `hidden md:flex` → `flex` on Enquire Now — 1 word change
- Add `aria-label` to Enquire Now button — 1 attribute
- Add `aria-hidden="true"` to marquee duplicate nodes — 1 attribute per item
- Add `body.style.overflow = "hidden"` on modal open — 4 lines
- Add `aria-valuemin/max/now` to price slider — 3 attributes

## Medium Complexity (2–4 hours each)
- Mobile filter bottom sheet
- Property context pre-population in enquiry modal
- Category tab strip on listings page
- Sticky active filter summary bar
- `prefers-reduced-motion` CSS block + test

## High Complexity (requires planning)
- Real backend form submission (architecture + API key management)
- Real reCAPTCHA integration (Google API keys + server-side token verification)
- Multi-image listing support (data model change in `lib/listings.ts` + UI carousel)
- Tamil font strategy + QA on physical Tamil-language Android devices
- JSON-LD schema markup for SEO (BreadcrumbList, RealEstateListing, LocalBusiness)
