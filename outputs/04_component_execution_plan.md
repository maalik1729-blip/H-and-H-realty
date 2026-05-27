# Header Changes

**File:** `src/components/site-chrome.tsx`

## Current Issue
Logo uses `h-[120px] md:h-[220px]` with `-my-[40px] md:-my-[90px]` negative margins. This causes header height to vary unpredictably between breakpoints. The pre-scroll `py-5` → post-scroll `py-3` transition causes a 8px layout shift that moves page content. Mobile drawer is hardcoded at `top-20`.

## Redesign Goal
Stable, predictable header height across all devices. Clean glassmorphic scroll transition without content shift.

## Exact UI Changes

**Logo fix:**
```tsx
// REMOVE: h-[120px] md:h-[220px] -my-[40px] md:-my-[90px]
// REPLACE WITH:
className="h-10 md:h-12 w-auto object-contain transition-opacity duration-200"
style={{ mixBlendMode: isDarkBackground ? "normal" : "multiply" }}
```

**Header wrapper fix:**
```tsx
// REMOVE: py-5 / py-3 conditional
// REPLACE WITH: uniform py-3 in both states
className={`fixed top-0 left-0 right-0 z-40 w-full border-b transition-all duration-300 py-3 ${
  scrolled
    ? "bg-background/95 backdrop-blur-md shadow-sm border-border/50"
    : "bg-transparent border-transparent"
}`}
```

**Mobile drawer fix — change `top-20` to dynamic:**
```tsx
// REMOVE: top-20 (hardcoded)
// REPLACE WITH: top-[56px] (matches uniform py-3 header = ~56px height)
<div className="absolute top-[56px] left-0 right-0 px-4">
```

**Active nav link underline:**
```tsx
activeProps={{
  className: "text-accent font-bold relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-0.5 after:bg-accent after:rounded-full"
}}
className="relative transition-all duration-300 font-sans tracking-wide hover:-translate-y-0.5 inline-block transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm ${linkColorClass}"
```

## Interaction Improvements
- Remove `hover:opacity-90` on the logo link — replace with `hover:scale-[1.02] transition-transform`.
- Add `focus-visible:ring-2 focus-visible:ring-accent` to all nav `<Link>` elements for keyboard navigation.

## Responsive Behavior
- Mobile: Logo `h-9`, CTA button hidden, hamburger visible.
- SM (640px+): No change.
- MD (768px+): Logo `h-12`, full nav visible, hamburger hidden.

---

# Sidebar Changes

**File:** `src/routes/listings.index.tsx`

## Current Issue
The filter panel uses `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6`. On mobile, all 5–6 filter controls stack vertically into a filter tower that occupies 3+ full screens before the first listing card is visible.

## Redesign Goal
Desktop: compact inline filter panel. Mobile: hidden by default, accessible via a bottom-sheet trigger.

## Exact UI Changes

**Add a mobile filter trigger button** (above the listing grid, mobile only):
```tsx
<div className="md:hidden flex items-center justify-between mb-4">
  <span className="text-sm font-semibold text-foreground">
    {filtered.length} {language === "en" ? "Properties" : "சொத்துக்கள்"}
  </span>
  <Sheet>
    <SheetTrigger asChild>
      <button className="btn-ghost text-xs py-2 px-4 flex items-center gap-2">
        <SlidersHorizontal className="h-3.5 w-3.5" />
        {language === "en" ? "Filters" : "வடிகட்டி"}
        {activeFilterCount > 0 && (
          <span className="bg-accent text-accent-foreground rounded-full h-4 w-4 text-[10px] flex items-center justify-center font-bold">
            {activeFilterCount}
          </span>
        )}
      </button>
    </SheetTrigger>
    <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
      {/* Same filter controls rendered in 2-col layout */}
      <div className="grid gap-4 grid-cols-2 p-6">
        {renderFilterContent()}
      </div>
      <div className="px-6 pb-6">
        <button onClick={() => {/* close sheet */}} className="btn-notched-filled w-full">
          {language === "en" ? `Show ${filtered.length} Properties` : `${filtered.length} சொத்துக்களைக் காட்டு`}
        </button>
      </div>
    </SheetContent>
  </Sheet>
</div>
```

**Hide inline filter panel on mobile:**
```tsx
<div className="hidden md:block ...">
  {renderFilterContent()}
</div>
```

## Responsive Behavior
- `< 768px`: Inline filter panel hidden. Filter sheet trigger visible.
- `>= 768px`: Inline filter panel visible. Sheet trigger hidden.

---

# Navigation Improvements

**Files:** `src/components/site-chrome.tsx`, `src/routes/listings.index.tsx`

## Category Tab Strip on Listings Page
**Current Issue:** Category filtering is one of 6 controls in the filter grid — it has no visual prominence as the primary browsing dimension.

**Exact UI Changes** — Add above the filter panel in `listings.index.tsx`:
```tsx
<div className="flex gap-2 overflow-x-auto scrollbar-none pb-1 -mx-1 px-1">
  {(["All", "Plots / Land", "Villas & Homes", "Apartments", "Farmhouses"] as const).map((cat) => (
    <button
      key={cat}
      onClick={() => handleCategoryChange(cat)}
      className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200 ${
        category === cat
          ? "bg-accent text-accent-foreground border-accent shadow-sm"
          : "bg-background text-foreground border-border hover:border-accent/50 hover:bg-secondary/50"
      }`}
    >
      {cat === "All" ? (language === "en" ? "All Types" : "அனைத்தும்") : cat}
    </button>
  ))}
</div>
```

## Active Filter Summary Bar (Sticky)
**Current Issue:** No persistent filter state reminder after scrolling.

**Exact UI Changes** — Add as a `position: sticky` bar below the main header (`top-[56px]`, `z-30`):
```tsx
{(category !== "All" || location !== "All" || searchQuery || maxPrice < dynamicMaxCeiling) && scrollY > 200 && (
  <div className="sticky top-[56px] z-30 bg-background/95 backdrop-blur-sm border-b border-border/60 py-2 px-4">
    <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto scrollbar-none">
      <span className="text-[11px] text-muted-foreground font-medium shrink-0">Active:</span>
      {category !== "All" && <FilterChip label={category} onRemove={() => handleCategoryChange("All")} />}
      {location !== "All" && <FilterChip label={location} onRemove={() => updateSearch({ location: "All" })} />}
      {searchQuery && <FilterChip label={`"${searchQuery}"`} onRemove={() => { setSearchQuery(""); updateSearch({ q: "" }); }} />}
    </div>
  </div>
)}
```

---

# Dashboard Card Changes

**File:** `src/components/listing-card.tsx`

## Current Issue
1. Non-functional `ChevronLeft`/`ChevronRight` arrows appear on hover but do nothing.
2. Bottom specs row shows "Active" as a status label — meaningless.
3. "View Details →" button uses `text-[10px]` — too small.
4. No gradient overlay on image for improved badge legibility.

## Exact UI Changes

**Remove fake photo navigation arrows (lines 47–68):**
```tsx
// DELETE the entire "Photo Navigation Overlay Arrows" block
// The div with opacity-0 group-hover:opacity-100 containing both ChevronLeft and ChevronRight buttons
```

**Add image gradient overlay** (inside the `relative aspect-[4/3]` div, after the `<img>`):
```tsx
<div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
```

**Fix bottom specs row** — replace "Active"/"செயலில்" with "Available"/"கிடைக்கிறது":
```tsx
// BEFORE
{language === "en" ? "Active" : "செயலில்"}

// AFTER
{language === "en" ? "Available" : "கிடைக்கிறது"}
```

**Fix CTA button font size:**
```tsx
// BEFORE
className="w-full inline-flex items-center justify-center btn-notched-filled text-[10px] py-2"

// AFTER
className="w-full inline-flex items-center justify-center btn-notched-filled text-xs py-2.5"
```

**Add `aria-label` to the card link:**
```tsx
<Link
  to="/listings/$id"
  params={{ id: l.id }}
  aria-label={`View details for ${l.title} in ${l.location} — ${formatPrice(l.priceLakh, true)}`}
  ...
>
```

## Interaction Improvements
- Hover: `hover:-translate-y-1` is already correct.
- Add `focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2` to the Link wrapper.

## Responsive Behavior
- Card width in grid: `w-full` (full column in grid).
- Card in marquee: `w-[280px] sm:w-[320px] md:w-[360px]` — increase md width slightly for better readability.

---

# Table Improvements

**File:** `src/routes/listings.$id.tsx`

## Current Issue
The property specs grid renders as icon+label+value rows in a grid. Icons use `text-primary` (near-black), labels and values have similar weights making the two-column distinction unclear.

## Exact UI Changes

Find the specs grid render and update icon and typography classes:
```tsx
// BEFORE icon class pattern
<spec.icon className="h-4 w-4 text-primary shrink-0" />

// AFTER
<spec.icon className="h-4 w-4 text-accent shrink-0" />
```

For spec rows, update to use alternating background:
```tsx
// BEFORE: flat grid cells
<div key={spec.label} className="flex items-center gap-2.5 p-3 rounded-xl bg-secondary/30">

// AFTER: two-column table with clear label/value distinction
<div key={spec.label} className="flex items-center justify-between py-3 px-4 even:bg-secondary/20 border-b border-border/40 last:border-0">
  <div className="flex items-center gap-2.5">
    <spec.icon className="h-4 w-4 text-accent shrink-0" />
    <span className="text-xs font-medium text-muted-foreground">{spec.label}</span>
  </div>
  <span className="text-sm font-semibold text-foreground">{spec.value}</span>
</div>
```

Wrap the entire spec section in `rounded-2xl border border-border overflow-hidden`.

---

# Form Improvements

## Global Enquiry Form (`src/components/global-enquiry.tsx`)

### 1. Fix Consent Text Size
```tsx
// BEFORE
<span className="text-[9px] leading-relaxed text-muted-foreground/80 font-medium">

// AFTER
<span className="text-[11px] leading-relaxed text-muted-foreground/80 font-medium">
```

### 2. Fix Form Spacing
```tsx
// BEFORE
<form onSubmit={handleSubmit} className="space-y-5">
  <div className="space-y-4">

// AFTER
<form onSubmit={handleSubmit} className="space-y-6">
  <div className="space-y-5">
```

### 3. Add Property Context Card (when modal is triggered from a listing)
Extend `formData` state:
```tsx
const [formData, setFormData] = useState({
  name: "",
  phone: "",
  email: "",
  propertyType: "Type",
  propertyId: "",
  propertyTitle: "",
  propertyLocation: "",
  propertyPrice: "",
  authorized: true,
});
```

Update the `handleOpenEvent` handler:
```tsx
const handleOpenEvent = (e: Event) => {
  const customEvent = e as CustomEvent;
  if (customEvent.detail) {
    setFormData((prev) => ({
      ...prev,
      propertyType: customEvent.detail.propertyType || prev.propertyType,
      propertyId: customEvent.detail.propertyId || "",
      propertyTitle: customEvent.detail.propertyTitle || "",
      propertyLocation: customEvent.detail.propertyLocation || "",
      propertyPrice: customEvent.detail.propertyPrice || "",
    }));
  }
  setIsOpen(true);
};
```

Add property context card in the form (between the header and form fields):
```tsx
{formData.propertyTitle && (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border/80">
    <div className="h-12 w-12 rounded-lg bg-muted shrink-0 overflow-hidden">
      {/* Property thumbnail if available */}
    </div>
    <div className="min-w-0">
      <p className="text-xs font-bold text-foreground truncate">{formData.propertyTitle}</p>
      <p className="text-[11px] text-muted-foreground truncate">{formData.propertyLocation}</p>
      {formData.propertyPrice && (
        <p className="text-xs font-bold text-accent mt-0.5">{formData.propertyPrice}</p>
      )}
    </div>
  </div>
)}
```

### 4. Make Enquire Now Button Visible on Mobile
```tsx
// BEFORE
className="hidden md:flex fixed bottom-36 right-6 md:bottom-24 z-40 ..."

// AFTER — always visible, compact on mobile
className="flex fixed z-40 items-center gap-2 bg-accent text-accent-foreground 
           hover:bg-accent/90 cursor-pointer shadow-elevated rounded-full 
           transition-all duration-300 hover:scale-105 group select-none border border-white/10
           bottom-20 right-4 md:bottom-24 md:right-6
           h-12 w-12 md:h-auto md:w-auto md:px-5 md:py-3.5 justify-center"
```

On mobile, show only the icon. On desktop, show icon + text:
```tsx
<svg ...className="h-5 w-5 shrink-0" />
<span className="hidden md:inline text-[11px] font-bold tracking-wider uppercase">
  {language === "en" ? "Enquire now" : "விசாரிக்க"}
</span>
```

## Contact Form (`src/routes/contact.tsx`)

### Define `.field` CSS Class
Add to `src/styles.css` inside `@layer components`:
```css
.field {
  @apply h-11 w-full rounded-xl border border-border bg-background/50 px-4
         text-sm text-foreground placeholder:text-muted-foreground/60
         focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent
         transition-all duration-200;
}
textarea.field {
  @apply h-auto py-3 resize-none leading-relaxed;
}
select.field {
  @apply appearance-none cursor-pointer;
}
```

### Fix Label/Input Association in `Field` component
```tsx
// Find the Field component in contact.tsx and update:
function Field({ label, children }: { label: string; children: React.ReactElement }) {
  const id = React.useId();
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-wider text-foreground/75">
        {label}
      </label>
      {React.cloneElement(children, { id })}
    </div>
  );
}
```

### Add `min` Date Constraint
```tsx
// BEFORE
<input type="date" className="field" />

// AFTER
<input
  type="date"
  className="field"
  min={new Date().toISOString().split("T")[0]}
/>
```

---

# Button System Improvements

**File:** `src/styles.css`

## Exact UI Changes

### 1. Fix `btn-notched-filled` Hover Color
```css
/* BEFORE */
.btn-notched-filled:hover,
.btn-notched-filled:focus-visible {
  background: var(--color-primary);       /* ← near-black, unexpected */
  color: var(--color-primary-foreground);
  ...
}

/* AFTER */
.btn-notched-filled:hover,
.btn-notched-filled:focus-visible {
  background: oklch(0.45 0.22 262);       /* ← darker accent, same hue */
  color: var(--color-accent-foreground);
  transform: translateY(-1px);
  box-shadow: 0 6px 18px oklch(0.52 0.22 262 / 0.3);
}
```

### 2. Add `btn-ghost` Variant
```css
.btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 9px 20px;
  color: var(--color-foreground);
  font-weight: 600;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  background: transparent;
  border: 1.5px solid var(--color-border);
  border-radius: 9999px;
  transition: all 0.2s ease;
  cursor: pointer;
  outline: none;
}
.btn-ghost:hover,
.btn-ghost:focus-visible {
  background: var(--color-secondary);
  border-color: var(--color-accent);
  color: var(--color-accent);
  transform: translateY(-1px);
}
```

### 3. Set Minimum Font Size on All Buttons
```css
.btn-notched,
.btn-notched-filled,
.btn-ghost {
  font-size: 0.75rem;  /* 12px — minimum accessible button label size */
}
```

---

# Modal Improvements

**File:** `src/components/global-enquiry.tsx`

## Current Issue
Modal overlay is `bg-black/60 backdrop-blur-sm` — correct. However, modal has no focus trap (background tab-navigable while modal is open), and `document.body` remains scrollable during modal open state.

## Exact UI Changes

### Body Scroll Lock
```tsx
// Add to useEffect watching isOpen:
useEffect(() => {
  if (isOpen) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
  return () => { document.body.style.overflow = ""; };
}, [isOpen]);
```

### Auto-Focus First Input on Open
```tsx
// Add ref to first input
const firstInputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  if (isOpen && firstInputRef.current) {
    setTimeout(() => firstInputRef.current?.focus(), 50);
  }
}, [isOpen]);

// Add ref to Name input
<input ref={firstInputRef} required type="text" ... />
```

### Add `aria-label` to Floating Button
```tsx
// BEFORE
<button onClick={() => setIsOpen(true)} className="...">

// AFTER
<button
  onClick={() => setIsOpen(true)}
  aria-label={language === "en" ? "Open property enquiry form" : "சொத்து விசாரணை படிவத்தை திறக்க"}
  className="..."
>
```

---

# Empty State Improvements

**File:** `src/routes/listings.index.tsx`

## Current Issue
When filters return 0 results, users see a basic "No properties found" message with only a "Reset All Filters" button.

## Exact UI Changes

Find the empty state render and replace with a more contextual empty state:
```tsx
{filtered.length === 0 && (
  <div className="col-span-full py-20 flex flex-col items-center gap-6 text-center">
    <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center">
      <Search className="h-7 w-7 text-muted-foreground" />
    </div>
    <div className="space-y-2 max-w-md">
      <h3 className="font-display text-xl font-bold text-foreground">
        {language === "en" ? "No properties found" : "சொத்துக்கள் எதுவும் கிடைக்கவில்லை"}
      </h3>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {language === "en"
          ? "Try adjusting your filters — remove the location filter or increase your budget to see more results."
          : "உங்கள் வடிகட்டிகளை சரிசெய்யவும் — இடம் வடிகட்டியை அகற்றவும் அல்லது பட்ஜெட்டை அதிகரிக்கவும்."}
      </p>
    </div>
    <div className="flex flex-wrap gap-3 justify-center">
      {searchQuery && (
        <button
          onClick={() => { setSearchQuery(""); updateSearch({ q: "" }); }}
          className="btn-ghost text-xs py-2 px-4"
        >
          {language === "en" ? "Clear search text" : "தேடல் உரையை அழிக்கவும்"}
        </button>
      )}
      <button
        onClick={() => navigate({ search: () => ({}) })}
        className="btn-notched-filled text-xs py-2.5 px-6"
      >
        {language === "en" ? "Reset all filters" : "அனைத்து வடிகட்டிகளையும் மீட்டமைக்கவும்"}
      </button>
    </div>
  </div>
)}
```

---

# Error State Improvements

**File:** `src/routes/listings.$id.tsx` (`notFoundComponent`)

## Current Issue
The `notFoundComponent` renders a centered div with a `HomeIcon` and basic text. No breadcrumb, no related suggestions, no contact fallback.

## Exact UI Changes
```tsx
notFoundComponent: () => (
  <div className="mx-auto max-w-2xl px-6 py-24 text-center">
    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary border border-border">
      <HomeIcon className="h-8 w-8 text-muted-foreground" />
    </div>
    <h1 className="font-display text-3xl font-bold">Property Not Found</h1>
    <p className="mt-3 text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
      This listing may have been sold, reserved, or removed from our catalog.
      Browse verified alternatives below.
    </p>
    <div className="mt-8 flex flex-wrap gap-3 justify-center">
      <Link to="/listings" className="btn-notched-filled text-xs py-2.5 px-6">
        Browse All Properties
      </Link>
      <a
        href="tel:+919876543210"
        className="btn-ghost text-xs py-2.5 px-6 flex items-center gap-2"
      >
        <Phone className="h-3.5 w-3.5" /> Call Us
      </a>
    </div>
  </div>
),
```

---

# Responsive Design Tasks

## Task 1: `prefers-reduced-motion` Support
**File:** `src/styles.css`

Add at the end of the file:
```css
@media (prefers-reduced-motion: reduce) {
  .animate-marquee,
  .animate-spin-slow {
    animation: none !important;
  }
  .animate-scale-up,
  .animate-fade-in {
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

## Task 2: Sticky-Stack Cards Mobile Offset Fix
**File:** `src/styles.css`

```css
/* EXISTING */
.sticky-stack-card {
  top: calc(4rem + var(--index) * 16px);
}

/* ADD mobile override */
@media (max-width: 640px) {
  .sticky-stack-card {
    position: relative;  /* disable sticky stacking on mobile */
    top: auto;
  }
}
```

## Task 3: Bento Cards Minimum Height on Mobile
**File:** `src/routes/index.tsx`

On each bento card Link element, add `min-h-[260px]` to mobile sizing:
```tsx
className="... min-h-[260px] md:h-[380px] ..."
```

---

# Mobile Interaction Improvements

## Floating Button Z-Index and Spacing Fix
**File:** `src/components/global-enquiry.tsx`

**Enquire Now button final positioning:**
```tsx
// Desktop + Mobile unified positioning
className="flex fixed z-40 items-center justify-center gap-2 bg-accent text-accent-foreground 
           hover:bg-accent/90 shadow-elevated rounded-full 
           transition-all duration-300 hover:scale-105 cursor-pointer select-none 
           border border-white/10
           bottom-20 right-4           /* mobile: above StickyContact bar */
           md:bottom-24 md:right-6    /* desktop: above WhatsApp button */
           h-12 w-12                  /* mobile: icon-only pill */
           md:h-auto md:w-auto md:px-5 md:py-3.5  /* desktop: labeled pill */"
```

**WhatsApp button adjusted positioning:**
```tsx
// BEFORE
className="hidden md:flex fixed bottom-20 right-6 md:bottom-6 z-40 ..."

// AFTER — visible on mobile, positioned above Enquire Now
className="flex fixed z-40 h-12 w-12 items-center justify-center rounded-full bg-whatsapp 
           text-white shadow-elevated hover:scale-105 active:scale-95 transition-all 
           duration-200 cursor-pointer
           bottom-[88px] right-4    /* mobile: 72px (sticky bar) + 16px gap */
           md:bottom-6 md:right-6  /* desktop */"
```

---

# Frontend Handoff Notes

## Z-Index Layer Map
| Layer | z-index | Component |
|-------|---------|-----------|
| Background ambient glow | `z-0` | Hero section background elements |
| Page content | `z-10` | Normal content flow |
| Sticky filter summary bar | `z-30` | `listings.index.tsx` sticky bar |
| Mobile nav backdrop | `z-30` | `site-chrome.tsx` mobile overlay |
| Header | `z-40` | `site-chrome.tsx` fixed header |
| Floating Enquire Now | `z-40` | `global-enquiry.tsx` floating button |
| Floating WhatsApp | `z-40` | `global-enquiry.tsx` WhatsApp button |
| StickyContact bar | `z-50` | `sticky-contact.tsx` |
| Enquiry modal | `z-50` | `global-enquiry.tsx` modal overlay |
| Mobile nav drawer panel | within `z-30` backdrop | `site-chrome.tsx` |

## CSS Custom Property Usage Rule
All color values MUST use `var(--color-*)` or Tailwind theme tokens. Never hardcode hex or rgba. Exception: OKLCH values in `styles.css` token definitions themselves.

## Animation Naming Convention
All custom animations defined in `styles.css` must have a corresponding `prefers-reduced-motion: reduce` override. New animations must be added to both the keyframe definition AND the reduced-motion override block.

## Form Submission Note
Currently all forms (`global-enquiry.tsx`, `contact.tsx`, sell form in `listings.index.tsx`) call `e.preventDefault()` and manage local state only — no actual backend submission. Before launch: integrate with a form backend (Formspree, Netlify Forms, or a custom API endpoint). Add a loading state (`Loader2 spin`) on the submit button during async submission.

---

# Component Priority Order

| Order | Component | File | Sprint | Reason |
|-------|-----------|------|--------|--------|
| 1 | Define `.field` CSS class | `styles.css` | 1 | Contact page is completely unstyled |
| 2 | Make Enquire Now mobile-visible | `global-enquiry.tsx` | 1 | Highest revenue impact |
| 3 | Fix placeholder phone/email | `site-chrome.tsx` | 1 | Trust-critical |
| 4 | Remove fake photo nav arrows | `listing-card.tsx` | 1 | Deceptive UI |
| 5 | Body scroll lock on modal | `global-enquiry.tsx` | 2 | Accessibility |
| 6 | Pre-populate enquiry with property context | `global-enquiry.tsx` | 2 | Lead quality |
| 7 | Add `aria-label` to Enquire Now button | `global-enquiry.tsx` | 2 | Accessibility |
| 8 | Mobile filter bottom sheet | `listings.index.tsx` | 2 | Mobile UX |
| 9 | Category tab strip | `listings.index.tsx` | 2 | Discoverability |
| 10 | Fix label/input association in contact form | `contact.tsx` | 2 | Accessibility |
| 11 | Fix logo negative margin | `site-chrome.tsx` | 3 | Layout stability |
| 12 | Sticky active filter bar | `listings.index.tsx` | 3 | UX |
| 13 | `prefers-reduced-motion` CSS | `styles.css` | 3 | Accessibility |
| 14 | Spec grid icon color fix (`text-accent`) | `listings.$id.tsx` | 3 | Visual consistency |
| 15 | Button hover color fix | `styles.css` | 3 | Visual consistency |
| 16 | `btn-ghost` variant | `styles.css` | 3 | Component system |
| 17 | Add `min` to date input | `contact.tsx` | 4 | UX correctness |
| 18 | `prefers-reduced-motion` for sticky stack | `styles.css` | 4 | Accessibility |
| 19 | Breadcrumb on detail pages | `listings.$id.tsx` | 4 | SEO/UX |
| 20 | Tamil font loading via Google Fonts | `index.html` / `styles.css` | 4 | Localization |
