# Visual Design Philosophy

H and H Realty already has the bones of a premium design system: OKLCH color tokens, a dual-font pairing (`Fraunces` + `Inter`), `rounded-3xl` card geometry, and `shadow-elevated` depth. The redesign direction does **not** tear this down — it refines, tightens, and elevates it.

Reference quality targets: **Linear** (interaction precision), **Stripe** (trust through clarity), **99acres/NoBroker** (Indian real estate readability), **Housing.com** (card density + mobile-first layout).

The core visual problem is not the aesthetic — it is **inconsistency**. Components use conflicting radii, color roles are overloaded (primary is used for both backgrounds and interactive text), font assignments bleed from display to utility contexts, and spacing is arbitrarily chosen. This document standardizes the system.

---

# Typography Recommendations

## Current State (Problems)
- **`styles.css` lines 111–117**: `h1, h2, h3` globally map to `Fraunces`. This means filter panel headings, form section titles, card spec labels — all render in a serif display face. This degrades scannability in data-dense contexts.
- Sub-11px font sizes (`text-[9px]`, `text-[10px]`) appear across CTAs, consent text, and taglines. These fail readability on low-DPI Android screens.
- `tracking-[0.3em]` on `text-[10px]` taglines creates extreme visual fragmentation at small sizes.

## Recommended Type System

### Font Role Assignments
| Role | Font | Weight | Size | Tracking | Usage |
|------|------|--------|------|----------|-------|
| Brand Display | Fraunces | 700 | 3xl–6xl | `-0.02em` | Hero titles, section H1/H2, testimonial quotes |
| UI Heading | Inter | 600 | base–xl | `-0.01em` | Card titles, form section headers, filter panel headings |
| Body | Inter | 400 | sm (14px) | `0` | Descriptions, paragraphs, listing body text |
| Caption / Label | Inter | 700 | xs (12px) | `0.05em` | Filter labels, spec row labels, badge text |
| Micro | Inter | 600 | 11px (min) | `0.03em` | Legal fine print, footer links — never go below 11px |
| CTA | Inter | 700 | 12px | `0.08em uppercase` | Button labels |

### Implementation Change in `styles.css`
```css
/* BEFORE — too broad */
h1, h2, h3, .font-display {
  font-family: var(--font-display);
}

/* AFTER — targeted */
h1, h2, .font-display {
  font-family: var(--font-display);
}
h3, h4, h5, h6 {
  font-family: var(--font-sans);
  font-weight: 600;
}
```

### Tamil Font Loading
Add to `index.html` or via `@import` in `styles.css`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;600;700&display=swap" rel="stylesheet" />
```
Update `--font-sans`: `"Inter", "Noto Sans Tamil", ui-sans-serif, system-ui, sans-serif`

---

# Layout System

## Current State (Problems)
- No standardized section spacing. Mix of `py-16`, `py-24`, `py-12`, `py-8` with no rhythm.
- `max-w-7xl` used universally — some content sections (testimonials, ROI calculator) benefit from tighter `max-w-5xl` or `max-w-4xl` to improve reading line length.
- The listings page filter panel uses a `lg:grid-cols-6` layout that has no `xl:` override — at 1440px+ screens, 6 narrow columns create visually cramped, unreadable filter controls.

## Recommended Layout Tokens

### Section Spacing Scale
| Context | Class | px Value |
|---------|-------|----------|
| Page section (full) | `py-20 md:py-28` | 80–112px |
| Section sub-block | `py-12 md:py-16` | 48–64px |
| Card internal padding | `p-5 md:p-6` | 20–24px |
| Form group spacing | `space-y-4` | 16px |
| Filter bar internal | `gap-4 lg:gap-5` | 16–20px |

### Container Width Hierarchy
```
max-w-7xl — full catalog, bento grid, footer
max-w-5xl — popular locations, Why Us
max-w-4xl — testimonials, FAQ, blog intro
max-w-2xl — forms, modal content, confirmation messages
```

### Filter Panel at Large Viewports
Change `lg:grid-cols-6` to `xl:grid-cols-6 lg:grid-cols-3` with a "More Filters" expand button for the secondary controls (Ownership, Property Type).

---

# Color Hierarchy

## Current Token Audit

The existing OKLCH tokens in `styles.css` are well-structured. The problems are in **usage patterns**, not the tokens themselves.

| Token | Value | Correct Role | Current Misuse |
|-------|-------|-------------|----------------|
| `--primary` | `oklch(0.18 0.015 240)` | Backgrounds, heavy containers | Used as icon color, text color, badge color — creates near-invisible dark-on-dark |
| `--accent` | `oklch(0.52 0.22 262)` | CTAs, interactive highlights, verified badges | Correct when used; underused in trust signals |
| `--muted-foreground` | `oklch(0.48 0.02 240)` | Body text on light BG | Acceptable contrast (~4.2:1 on white — borderline AA) |
| `--border` | `oklch(0.92 0.005 240)` | Borders | Correct |
| `--success` | `oklch(0.60 0.15 150)` | Verified/success states | Correct |

## Recommended Color Role Rules

### Rule 1: Primary = Background Only
`bg-primary`, `text-primary-foreground` — never `text-primary` for interactive elements or icons.

### Rule 2: Accent = All Interactive Signals
Replace all `text-primary` icon/badge/count usages with `text-accent`:
- Trust strip icons → `text-accent`
- Category bento count badges → `bg-accent/10 text-accent border border-accent/20`
- Active filter chips → `bg-accent text-accent-foreground`
- "Lawyer Vetted" badge → keep `bg-accent/95` (already correct in `listing-card.tsx`)

### Rule 3: Muted-Foreground Minimum Contrast Fix
Current `oklch(0.48 0.02 240)` on `oklch(0.99 0.003 240)` background = ~4.2:1 contrast. This passes AA but fails AAA.
**Recommendation:** Bump to `oklch(0.40 0.02 240)` for body text and `oklch(0.44 0.02 240)` for secondary labels to reliably exceed 4.5:1.

### Rule 4: Add a Warm Accent for Urgency/Scarcity
Current palette has no warm signal. Add:
```css
--color-urgency: oklch(0.72 0.18 55);   /* Warm amber */
--color-urgency-foreground: oklch(0.22 0.04 55);
```
Use for "Reserved" badges, "Only 2 left" scarcity notices, price reduction tags.

---

# Navigation Redesign

## Current State (`site-chrome.tsx`)
- Logo uses `h-[120px] md:h-[220px]` with `-my-[40px] md:-my-[90px]` negative margins — fragile and device-dependent.
- Scroll transition from transparent to `bg-[oklch(0.96_0.012_240)]/90` is correct behavior but the fixed `py-5` → `py-3` transition creates a visible header height jump that shifts page content.
- Mobile drawer renders at `top-20` fixed — this hardcoded value breaks when header height changes.

## Recommended Navigation Design

### Header Height Stabilization
Replace negative-margin logo approach with a controlled flex container:
```tsx
// Replace large negative-margin logo with a size-controlled version
<img
  src={logo}
  alt="H&H Realty"
  className="h-10 md:h-12 w-auto object-contain transition-all duration-300"
/>
```
- Eliminates negative margin overflow on all breakpoints.
- Header height becomes predictable: `py-3 = 48px header` at all scroll states (remove `py-5` pre-scroll).

### Scroll Behavior Refinement
- Keep `bg-transparent border-transparent` pre-scroll on dark header pages.
- On scroll: `bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm`.
- Remove the `py-3` / `py-5` vertical padding change — uniform `py-3` prevents content shift.

### Active Nav Link Indicator
Add an underline indicator to the active nav link:
```tsx
activeProps={{
  className: "text-accent font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-accent after:rounded-full"
}}
// + add relative positioning to the Link
className="relative transition-all duration-300 ..."
```

---

# Dashboard Redesign

## Listings Page (`listings.index.tsx`)

### Category Tab Strip (Replaces Top of Filter Panel)
Replace the category filter buried inside the filter grid with a prominent horizontal tab strip immediately below the hero banner, before the filter panel:

```
[ All ]  [ Plots / Land ]  [ Villas & Homes ]  [ Apartments ]  [ Farmhouses ]
```
- Each tab: `px-4 py-2 rounded-full text-sm font-semibold border`
- Active: `bg-accent text-accent-foreground border-accent shadow-sm`
- Inactive: `bg-background text-foreground border-border hover:border-accent/40`

This pattern (used by Airbnb, Housing.com, NoBroker) is immediately intuitive to Indian real estate users.

### Filter Panel Compaction
- Move category selector out of the filter grid (into the tab strip above).
- Filter grid becomes 5 controls → fits `lg:grid-cols-5` with better visual width balance.
- Add a `xl:grid-cols-5` explicit variant.

### Results Count + Sort Bar
Add a slim row between the filter panel and the listing grid:
```
Showing 24 properties  ·  [Sort by: Newest ▾]  ·  [Grid View | Map View]
```

---

# Card Component Redesign

## Current State (`listing-card.tsx`)
The card design is solid: `rounded-3xl`, `shadow-card`, `hover:shadow-elevated`, `hover:-translate-y-1`. The issues are:
1. Photo nav arrows appear on hover but are non-functional.
2. Price uses `font-display` (Fraunces) — correct.
3. Bottom spec row truncates `roadAccess` with `.split(" road")[0]` which shows "30ft" as "30ft" — fine, but inconsistent for built properties showing "BHK · Bath · Active" where "Active" is meaningless labeling.
4. "View Details →" CTA at `text-[10px]` is too small for a primary action.

## Recommended Card Redesign

### Photo Frame
- Remove non-functional `ChevronLeft`/`ChevronRight` arrows entirely until multi-image support is implemented.
- Add a subtle gradient overlay at the bottom of the image: `from-black/40 to-transparent` for better badge contrast.
- Move "New Listing" and "Lawyer Vetted" badges to image overlay, but add the gradient to ensure they remain legible.

### Specs Row
Replace the ambiguous "Active" label with a more meaningful availability signal:
```tsx
// BEFORE
<span>30ft · Active</span>

// AFTER
<span>30ft Road · Available</span>   // for plots
<span>3 BHK · 2 Bath · Freehold</span>  // for built properties
```

### CTA Button
Change `text-[10px]` to `text-xs` (12px) for the "View Details →" button. 12px is the accepted minimum for interactive labels.

### Card Width on Marquee
The marquee card width (`w-[280px] sm:w-[320px] md:w-[350px]`) is well-sized but the marquee animation duration (`50s`) makes reading the listing title and price in motion difficult. Add `animation-play-state: paused` on hover (already present via `.animate-marquee:hover`) — ensure this CSS applies to the parent, not the card.

---

# Table Redesign

## Property Specs Table (`listings.$id.tsx`)
The spec grid (Area, Road Access, Ownership, Legal Status, etc.) renders as a grid of icon+label+value rows.

### Recommended Spec Grid Design
```
┌─────────────────────┬──────────────────────┐
│ 📐 Area             │ 1,800 sq ft          │
├─────────────────────┼──────────────────────┤
│ 🛣️ Road Access      │ 30ft BT Road         │
├─────────────────────┼──────────────────────┤
│ 🏛️ Ownership        │ Freehold             │
├─────────────────────┼──────────────────────┤
│ ✅ Legal Status     │ Clear Title          │
└─────────────────────┴──────────────────────┘
```
- Background: `bg-secondary/30` alternating rows (`even:bg-background`)
- Borders: `border-b border-border/50` (no vertical borders)
- Label column: `text-muted-foreground text-xs font-medium w-1/2`
- Value column: `text-foreground text-sm font-semibold`
- Icon: `text-accent` (not `text-primary`)

---

# Form Redesign

## Global Enquiry Modal (`global-enquiry.tsx`)

### Property Context Card (New Addition)
At the top of the form (when triggered from a listing), show:
```
┌─────────────────────────────────────────────┐
│ [Thumbnail 60x60] │ ECR Beach Villa         │
│                   │ Sholinganallur, Chennai  │
│                   │ ₹ 85 Lakhs              │
└─────────────────────────────────────────────┘
```
Class: `flex items-center gap-3 p-3 rounded-xl bg-secondary/50 border border-border mb-4`

### Input Styling Standardization
All inputs currently use `h-11 rounded-xl border border-border bg-background/50` — this is correct. The gap issue is form spacing is `space-y-4` (16px), which creates visual compression. Increase to `space-y-5` (20px).

### Consent Text Size Fix
`text-[9px]` → `text-[11px]` minimum. Legal consent text must be readable.

## Contact Form (`contact.tsx`)
Define the `.field` class properly:
```css
/* In styles.css @layer components */
.field {
  @apply h-11 w-full rounded-xl border border-border bg-background/50 px-4 
         text-sm text-foreground placeholder:text-muted-foreground/60 
         focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent 
         transition-all duration-200;
}
textarea.field {
  @apply h-auto py-3 resize-none;
}
select.field {
  @apply appearance-none cursor-pointer;
}
```

---

# Button System

## Current System Assessment
The `.btn-notched` and `.btn-notched-filled` classes in `styles.css` are well-designed. The issues:
- `btn-notched-filled:hover` changes color to `--primary` (near-black) — unexpected darkening. Users expect a brightness shift, not a full color swap.
- `text-[10px]` sizing on buttons inside `site-chrome.tsx` and `listing-card.tsx` is too small.
- No `btn-ghost` variant for secondary/tertiary actions (currently done with ad-hoc classes).

## Recommended Button System

```css
/* Fix hover color for filled button */
.btn-notched-filled:hover,
.btn-notched-filled:focus-visible {
  background: oklch(from var(--color-accent) calc(l - 0.07) c h);  /* Darker accent, not primary */
  color: var(--color-accent-foreground);
  transform: translateY(-1px);
  box-shadow: 0 6px 18px oklch(0.52 0.22 262 / 0.3);
}

/* Add ghost variant */
.btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 9px 20px;
  color: var(--color-foreground);
  font-weight: 600;
  background: transparent;
  border: 1.5px solid var(--color-border);
  border-radius: 9999px;
  transition: all 0.2s ease;
  cursor: pointer;
}
.btn-ghost:hover {
  background: var(--color-secondary);
  border-color: var(--color-accent/40);
  transform: translateY(-1px);
}

/* Fix minimum font size */
.btn-notched, .btn-notched-filled, .btn-ghost {
  font-size: 0.75rem;  /* 12px minimum */
  letter-spacing: 0.05em;
}
```

---

# Mobile-first Design Adjustments

## Priority Adjustments

### 1. StickyContact Bar Height
**File:** `sticky-contact.tsx` — `min-h-11` (44px) is correct for touch targets. But on iOS with home bar, `env(safe-area-inset-bottom)` is already applied correctly. No change needed.

### 2. Hero Section Mobile Height
The hero section should explicitly set `min-h-[80vh] md:min-h-[90vh]` instead of relying on content height. This ensures the hero fills the mobile viewport without overflow.

### 3. Bento Grid Mobile Stacking
Add minimum heights to mobile bento cards to prevent collapsed images:
```tsx
className="... min-h-[280px] md:h-[380px]"
```

### 4. Listing Card Grid on Mobile
On the listings page, change from `grid-cols-1 sm:grid-cols-2` to:
- Mobile portrait: `grid-cols-1` (full width cards, easier reading)
- Mobile landscape / SM: `grid-cols-2` (compact comparison)
- MD: `grid-cols-2` or `grid-cols-3` depending on sidebar presence
- Filter bottom sheet leaves full width for the grid

### 5. Floating Button Stack Reorganization (Mobile)
```
Bottom bar (StickyContact): z-50, h-14, fixed bottom-0
Enquire Now icon (mobile): z-45, h-12 w-12, fixed bottom-16 right-4
WhatsApp icon: z-45, h-12 w-12, fixed bottom-30 right-4
```
Vertical spacing: 8px between each floating element, each offset from the StickyContact bar height.

---

# UI Consistency Rules

### 1. Border Radius Hierarchy
| Element | Radius |
|---------|--------|
| Property cards, bento cards | `rounded-3xl` (24px) |
| Modal containers | `rounded-3xl` (24px) |
| Buttons (pill) | `rounded-full` (9999px) |
| Input fields | `rounded-xl` (12px) |
| Badges / chips | `rounded-full` (9999px) |
| Small tags (e.g., "New Listing") | `rounded` (6px) |
| Tables / spec grids | `rounded-2xl` (16px) container |
| Tooltips | `rounded-lg` (8px) |

**Never mix** `rounded-2xl` and `rounded-3xl` on the same card family.

### 2. Icon Sizing Hierarchy
| Context | Size |
|---------|------|
| Navigation icons | `h-4 w-4` |
| Card spec icons | `h-3.5 w-3.5` |
| Trust strip icons | `h-5 w-5` |
| CTA button icons | `h-4 w-4` |
| Floating action icons | `h-5 w-5` |

### 3. Focus State Rule
All interactive elements MUST have:
```css
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2
```
Add `focus-visible:ring-offset-background` for correct ring color on light backgrounds.

### 4. Hover Translation Consistency
All cards and buttons must use the same scale: `hover:-translate-y-0.5` (2px) for buttons, `hover:-translate-y-1` (4px) for cards. Never use `hover:scale-105` on text-containing elements (causes layout shift).

---

# Visual Simplification Opportunities

### 1. Remove Decorative Animation From the Verification Ticker
The marquee ticker at `text-[10px]` scrolling at 75s is impossible to read. Options:
- **Simplify:** Replace with a static 2×4 grid of recent verifications on desktop, hidden on mobile.
- **Or improve:** Slow to 120s, increase to `text-xs`, add a "Pause" button.

### 2. Consolidate the Dual "Why Us" Sections
The homepage has both a desktop `WhyUsSection` component AND a mobile-only swipeable cards version (lines 529–617 of `index.tsx`). This duplicates content and adds page weight. Replace with a single responsive implementation.

### 3. Reduce EHO Footer Block to a Single Compliance Line
The EHO "Equal Housing Opportunity" stripe occupies an entire page-width section. Replace with a single compliance text line in the lower footer strip.

### 4. Simplify Compliance Badges to Text Ribbons
Replace the blocky "EHO" square badge in the footer with:
```
TNRERA · DTCP · CMDA · Anti-Benami Compliant
```
As a simple `text-[10px] text-muted-foreground` inline row.
