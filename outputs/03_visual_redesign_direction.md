# Visual Design Philosophy

Our visual design system for **Land Connect** is guided by a premium, clean, high-contrast, editorial layout inspired by Stripe and Linear. We combine absolute clarity with high-end real estate aesthetics. 

The focus is to showcase property values with micro-animations, glassmorphic accents, generous breathing room (whitespace), and a structured color taxonomy that elevates trust and readability.

---

# Typography Recommendations

We utilize a dual-font structure to balance editorial premium aesthetics with rapid-scanning utility:
1. **Display Typeface (Fraunces)**: Used exclusively for core brand declarations, large section headers, and testimonials to inject luxury branding.
2. **Sans Typeface (Inter)**: Used for body text, interactive filters, labels, stats grids, and listing cards to maximize speed of comprehension and visual modernism.

### CSS Declaration updates:
* Large Titles: `font-display font-bold tracking-tight text-white`
* Reading Body: `font-sans leading-relaxed text-muted-foreground`
* Action Labels: `font-sans font-extrabold uppercase tracking-widest text-xs`

---

# Layout System

We adopt a strict grid system anchored on a max-width container (`max-w-7xl mx-auto px-4 md:px-8`).
* **Grid Spacing**: Use standard multiples of 4px/8px for all layout paddings and gutters (`gap-4`, `gap-6`, `gap-8`, `gap-12`).
* **Pill Container Layout**: The main hero asymmetric pill container utilizes absolute positioning for background ambient glow and illustration layers, keeping layout dimensions stable across viewports.

---

# Color Hierarchy

We leverage modern OKLCH color coordinates defined in [styles.css](file:///d:/land-connect/src/styles.css) to generate high-fidelity, vibrant, brand-coherent layouts:
* **Primary (Deep H&H Navy)**: `oklch(0.23 0.065 250)` – provides structural depth, background masks, and corporate trust.
* **Secondary (Slate Off-White)**: `oklch(0.96 0.008 240)` – provides card backdrops and container borders.
* **Accent (Clean Azure Blue)**: `oklch(0.60 0.16 240)` – highlights critical taglines, interactive pills, active filters, and primary CTAs.
* **Background (Slate Off-White Base)**: `oklch(0.99 0.004 240)`.

---

# Navigation Redesign

The header navigation ([site-chrome.tsx](file:///d:/land-connect/src/components/site-chrome.tsx)) transitions from static items to high-contrast glassmorphic elements:
* **Styling**: `bg-background/80 backdrop-blur-md border-b border-border/40 sticky top-0 z-50`.
* **CTAs**: Replace secondary links with notched transparent capsules (`btn-notched`), and primary callouts with filled, glowing buttons (`btn-notched-filled`).

---

# Dashboard Redesign

The listings catalog dashboard is visual-first:
* **Filter Bar**: Consolidate category selection into a single row of modern horizontal badge selectors.
* **Layout Split**: Split catalog layout: Left column remains listing cards, right column anchors the dynamic map preview with 380px/480px height limit.

---

# Card Component Redesign

The `ListingCard` component is redesigned to feel like an editorial real estate publication:
* **Container**: `rounded-3xl border border-slate-100 bg-card overflow-hidden transition-all duration-300 hover:shadow-elevated hover:-translate-y-1`.
* **Details Layout**: Place lawyer verification badges in high-contrast blue dots overlayed directly on the property image top-left, and title/price layout neatly stacked below the graphic.

---

# Table Redesign

For property details or price index lists:
* **Background**: Clean white with border-less headers.
* **Row Hover States**: Apply subtle transition transitions (`hover:bg-slate-50/80 duration-150`).
* **Borders**: Thin cool gray borders (`border-slate-100`).

---

# Form Redesign

The inputs inside the global enquiry overlay:
* **Input Fields**: Focus on rounded inputs (`rounded-xl border border-slate-200 px-4 py-3 focus:ring-2 focus:ring-accent focus:border-accent-hover transition-all bg-slate-50/50`).
* **Spacing**: Increase line gaps to `space-y-4` to prevent visual compression.

---

# Button System

We maintain a strict and cohesive button taxonomy:
1. **Primary Callouts**: Notched filled azure capsule (`.btn-notched-filled`) featuring hover translation `hover:-translate-y-0.5` and dynamic shadow.
2. **Secondary/Filters**: Glassmorphic frosted selectors (`bg-white/5 border-white/10 hover:bg-white/10 text-white` for dark containers, and `bg-background border-border hover:bg-slate-50 text-foreground` for light pages).

---

# Mobile-first Design Adjustments

* **Swipe Containers**: Convert multi-column badge grids into smooth horizontal overflow wrappers (`overflow-x-auto scrollbar-none flex-nowrap`).
* **Spacing contraction**: Automatically scale padding from `p-16` on desktop to `p-6` on mobile screens inside container blocks.

---

# UI Consistency Rules

1. **Card Radius Consistency**: Standardize on `rounded-3xl` for property/listings cards, and `rounded-[40px] md:rounded-[60px]` for main landing masks.
2. **Focus State Enforcements**: All buttons and text inputs MUST highlight with `focus-visible:ring-2 focus-visible:ring-accent`.

---

# Visual Simplification Opportunities

* **Remove unnecessary borders**: Rely on light background depth contrasts (`bg-slate-50`) instead of dark structural borders.
* **Simplify badge layout**: Use simple text labels with colored indicator dots instead of high-bordered heavy badges inside grid lists.
