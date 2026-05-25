# Header Changes

* **Current Issue**: The header in [site-chrome.tsx](file:///d:/land-connect/src/components/site-chrome.tsx) has fixed dark borders that stand out against modern light page transitions, reducing visual premium feel.
* **Redesign Goal**: Convert the header into a clean, floating glassmorphic bar that blends seamlessly with page content.
* **Exact UI Changes**: Apply `bg-background/80 backdrop-blur-md border-b border-border/40 sticky top-0 z-50` to the header wrapper.
* **Interaction Improvements**: Header menu items shift upwards by `1px` on hover with a smooth transition.
* **Responsive Behavior**: Collapses into a clean mobile hamburger menu overlay with smooth slide-in animations.

---

# Sidebar Changes

* **Current Issue**: Left listing filters take up too much vertical space, compressing listing card grids on tablet layouts.
* **Redesign Goal**: Streamline filter stacking and make sidebar components collapsable or toggleable.
* **Exact UI Changes**: Wrap secondary filters inside an absolute sidebar sheet using `@/components/ui/sheet` triggers.
* **Responsive Behavior**: Completely hidden on screens `< 1024px` in favor of a bottom action filter bar.

---

# Navigation Improvements

* **Current Issue**: Quick links between sections feel static.
* **Redesign Goal**: Animate page jumps with active state indicators under tab anchors.
* **Exact UI Changes**: Inject `transition-all duration-300 relative after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-0 after:bg-accent hover:after:w-full`.

---

# Dashboard Card Changes

* **Current Issue**: The card design in [listing-card.tsx](file:///d:/land-connect/src/components/listing-card.tsx) has low-contrast location icons and plain, flat borders.
* **Redesign Goal**: Elevate the card design to feel editorial, clean, and highly structured.
* **Exact UI Changes**: 
  * Update card body classes to `rounded-3xl border border-slate-100 bg-card overflow-hidden transition-all duration-300 hover:shadow-elevated hover:-translate-y-1`.
  * Highlight "₹ L" price tag using a distinct high-contrast weight and size layout.
* **Interaction Improvements**: Highlight corresponding map connectivity marker when hovering a card element.

---

# Table Improvements

* **Current Issue**: Detail specification grids inside [listings.$id.tsx](file:///d:/land-connect/src/routes/listings.$id.tsx) feel standard and raw.
* **Redesign Goal**: Introduce a light, modern specs board.
* **Exact UI Changes**: Replace raw border grids with a stripped layout utilizing alternating row colors (`even:bg-slate-50/50`) and clean slate typography.

---

# Form Improvements

* **Current Issue**: Form inputs inside [global-enquiry.tsx](file:///d:/land-connect/src/components/global-enquiry.tsx) are visually compressed with high border weights.
* **Redesign Goal**: Implement a high-end, spacious lead-generation input flow.
* **Exact UI Changes**: Apply a spacious padding profile (`px-4 py-3`) and a premium focus outline (`focus:ring-2 focus:ring-accent focus:border-accent bg-slate-50/50`).

---

# Button System Improvements

* **Current Issue**: Button components are inconsistent in border and transition parameters.
* **Redesign Goal**: Standardize buttons around `.btn-notched` and `.btn-notched-filled` classes in [styles.css](file:///d:/land-connect/src/styles.css).
* **Exact UI Changes**: Incorporate H&H premium Azure shadows (`oklch(0.60 0.16 240 / 0.2)`) and micro-hover translations (`hover:-translate-y-0.5`).

---

# Modal Improvements

* **Current Issue**: Opening modals triggers a heavy, instant black mask that blocks full layout context.
* **Redesign Goal**: Smooth glassmorphic backdrop reveal.
* **Exact UI Changes**: Apply `bg-black/40 backdrop-blur-sm transition-all duration-300` as the primary overlay mask.

---

# Empty State Improvements

* **Current Issue**: Clean screen resets wipe out typed values harshly.
* **Redesign Goal**: Retain partial parameters with clean, illustrative guides.
* **Exact UI Changes**: Display detailed empty-state alerts showing property suggestions in other locations close to their original price limits.

---

# Error State Improvements

* **Current Issue**: Errors display in plain alert boxes.
* **Redesign Goal**: Provide premium, context-specific solutions with auto-fallback buttons.
* **Exact UI Changes**: Introduce clean card error notifications with dedicated reset hooks.

---

# Responsive Design Tasks

1. **Horizontal Ribbon Swiping**: Convert staircase badges inside home pages to responsive horizontally-scrollable swipe modules on mobile viewports.
2. **Dynamic Height Compensation**: Automatically adjust hero heights and paddings (`p-8 md:p-16`) based on client device size.

---

# Mobile Interaction Improvements

* **Prevent Overlay Congestion**: Coordinate overlapping sticky items. Hide main floating buttons (`Enquire now` / WhatsApp icon) automatically whenever a user inputs text or scrolls through active listings details.

---

# Frontend Handoff Notes

* **Z-Index Layering Rule**:
  * Navigation Header: `z-50`
  * Floating Lead Drawer (Enquire now modal): `z-50`
  * Ambient Back Glow Layer: `z-0`
  * Interlocking Back text: `z-[-10]`
* **Styling Coordinates**: All custom brand variants MUST reference CSS custom properties defined in `:root` of `styles.css`.

---

# Component Priority Order

1. **Header/Navigation Bar** (`site-chrome.tsx`) – Establish premium site anchor.
2. **Floating "Enquire now" action block** (`global-enquiry.tsx`) – Secure clean lead path.
3. **Card Redesigns** (`listing-card.tsx`) – Improve listing scanning.
4. **Map Pane Coordination** (`location-connectivity-map.tsx`) – Refine spatial exploration.
