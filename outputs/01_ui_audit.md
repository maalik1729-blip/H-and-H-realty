# Executive Summary

This audit is a deep, code-sourced UI/UX analysis of the **H and H Realty** web application — a premium Chennai real estate portal for verified plots, villas, apartments, and farmhouses. The review is grounded in actual component behaviour across `site-chrome.tsx`, `global-enquiry.tsx`, `listing-card.tsx`, `listings.index.tsx`, `listings.$id.tsx`, `contact.tsx`, `index.tsx`, and `styles.css`.

The application has a strong visual foundation — a dual-font system (`Fraunces` + `Inter`), a cohesive OKLCH color palette, and animated marquees — but carries significant usability debt across filter logic, mobile layout, interaction feedback, accessibility, and trust signalling. These issues directly reduce lead quality and conversion for a business where user confidence and clarity of information are paramount.

**Severity legend:** 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Low

---

# Major UX Problems

### 🔴 1. Filter State Is Not Persisted Across Category Switches
**File:** `listings.index.tsx` — `handleCategoryChange()` at line 207 resets `type` to `"All"` on every category switch but does NOT reset the price slider. When a user browses Plots (max ₹80L) then switches to Villas (avg ₹2Cr+), the price ceiling auto-corrects via `dynamicMaxCeiling`, but there is a visual lag — the slider briefly shows an impossible low cap, producing a flash of 0 results. This is catastrophic for trust and browsing confidence.

**Why it matters:** A zero-results flash triggers users to believe the platform has no inventory in that category. Bounce risk is high.

### 🔴 2. The Sell Flow Is a Dead End
**File:** `listings.index.tsx` — the `purpose === "sell"` tab renders only a basic form with no confirmation of what happens after submission, no SLA, no trust signal, and no callback promise. By contrast, the Buy tab has rich filters, a map, and card browsing. The asymmetry communicates that sellers are an afterthought.

**Why it matters:** Seller acquisition is as critical as buyer acquisition for a two-sided marketplace. The abandoned Sell UX kills this funnel entirely.

### 🟠 3. Global Enquiry Modal Has Zero Property Context
**File:** `global-enquiry.tsx` — the floating "Enquire now" button opens a generic modal with no pre-populated property reference. A `CustomEvent` system exists (`open-global-enquiry`) that can pass `propertyType`, but it only passes the category — not the property ID, title, price, or location. Agents receiving leads cannot immediately understand what a user was interested in.

**Why it matters:** Lead quality drops significantly when the inquiry is decontextualized. Sales team efficiency suffers.

### 🟠 4. No Active Filter Breadcrumb / Persistent Filter Summary
**File:** `listings.index.tsx` — when a user has applied 4–5 filters and scrolls down 30+ listing cards, there is no persistent reminder of their active filters. The filter panel is above the fold and scrolls away. There is no sticky filter summary bar below the header.

**Why it matters:** Low-attention users forget their constraints. They see listings outside their budget or category and lose trust in the results.

### 🟡 5. The Enquire Now Button Is Hidden on Mobile
**File:** `global-enquiry.tsx` line 79 — the floating "Enquire now" pill has `hidden md:flex`, making it invisible on mobile. Mobile users rely entirely on the `StickyContact` bottom bar. But that bar's "Book visit" CTA links to `/contact` (a full page with a form), not the quick enquiry modal. The fastest conversion path is mobile-invisible.

**Why it matters:** The majority of Indian real estate browsing happens on mobile. Hiding the primary lead CTA on mobile is a direct revenue loss.

---

# Major UI Problems

### 🔴 1. Logo Sizing Creates Unpredictable Header Height
**File:** `site-chrome.tsx` lines 59–66 — the logo uses `h-[120px] md:h-[220px]` with negative margins `-my-[40px] md:-my-[90px]` to compensate for its large natural dimensions. This relies on precise negative margin math that breaks on mid-range tablet viewports (768–900px) where the logo overflows the header container and bleeds into page content below the sticky bar.

**Why it matters:** A broken header on tablet destroys first impressions and professionalism.

### 🔴 2. Contact Form Inputs Use an Unstyled `.field` Class
**File:** `contact.tsx` lines 64–99 — all form inputs use `className="field"`, but this CSS class is never defined in `styles.css`. This means inputs on the contact page inherit only default browser styling — unstyled, inconsistent across Chrome/Firefox/Safari, and visually mismatched against the rest of the design system.

**Why it matters:** The contact page is the final conversion step. Broken form styling destroys trust at the most critical moment.

### 🟠 3. Photo Navigation Arrows Are Non-Functional Decorations
**File:** `listing-card.tsx` lines 48–67 — both `ChevronLeft` and `ChevronRight` buttons call `e.preventDefault(); e.stopPropagation()` and do nothing else. They render on hover, suggesting multi-photo browsing capability, but clicking them does nothing. There is only one `src` image per listing.

**Why it matters:** Deceptive affordances shatter user trust. Users expect a photo carousel, click it, nothing happens, and they feel misled.

### 🟠 4. Footer Social Links Point to Generic Homepages
**File:** `site-chrome.tsx` lines 239–255 — all five social icons link to generic platform homepages (`https://facebook.com`, `https://twitter.com`, etc.) instead of H&H Realty's actual social profiles. For a trust-driven real estate brand, placeholder social links communicate that the business is not legitimate or active online.

**Why it matters:** Social proof is a critical trust signal in real estate. Dead placeholder links reverse this.

### 🟡 5. Phone Number and Email Are Placeholder Values
**File:** `site-chrome.tsx` line 323 — `+91 98765 43210` and `hello@hnhrealty.in` are clearly placeholder data. If these are not updated before launch, users who call or email get no response, instantly destroying trust.

### 🟡 6. WhatsApp Button Disappears on Mobile
**File:** `global-enquiry.tsx` line 280 — the WhatsApp floating button also has `hidden md:flex`. The only mobile WhatsApp access is through the `StickyContact` bar. However, `sticky-contact.tsx` uses `MessageCircle` icon (not the official WhatsApp icon) for the WhatsApp action, reducing recognition.

---

# User Friction Points

### 🔴 1. Search Resets All Filters on Typo Correction
**File:** `listings.index.tsx` lines 192–205 — the `updateSearch()` function updates URL params in real-time as the user types. If a user types a bad query, the only recovery path shown to them (when results are zero) is a "Reset All Filters" button. This wipes all filters — including category, price, and location — not just the text query. Complete reset fatigue is a known conversion killer.

### 🟠 2. Property Type Dropdown Has 12 US-Centric Options
**File:** `listings.index.tsx` line 29–42 — `PROPERTY_TYPES_12` lists options like "Co-Op", "Condop", "Timeshare", and "Mobile/Manufactured" which are irrelevant to the Chennai real estate market. These create confusion for Indian buyers who have no frame of reference for these terms.

### 🟠 3. Sell Form Has No Validation Feedback
**File:** `listings.index.tsx` — the sell listing form uses `required` attributes on HTML inputs but has no inline validation messages. If a user submits with a missing phone number, the browser native validation popup appears — which is visually jarring and breaks the premium feel.

### 🟡 4. Contact Page Date Picker Has No Constraints
**File:** `contact.tsx` line 83 — the preferred date `<input type="date">` has no `min` attribute, allowing users to select past dates. Selecting a past date and submitting creates a confusing confirmation experience.

### 🟡 5. Listing Detail Page Has No Breadcrumb Navigation
**File:** `listings.$id.tsx` — there is a `ChevronLeft` back button but no breadcrumb trail. Users arriving from Google search directly to a detail page have no contextual navigation path to explore similar listings or return to the category they were in.

---

# Visual Hierarchy Problems

### 🟠 1. Trust Strip Icons Are All `text-primary` (Near-Black)
**File:** `index.tsx` line 165 — the 4 trust badges (TNRERA Registered, Lawyer-Verified, Drone Surveyed, Loan Support) all use `text-primary` for their icons, which is `oklch(0.18 0.015 240)` — essentially near-black on a white card. This makes these trust signals blend into the background text rather than standing out as positive social proof.

### 🟠 2. Featured Listings Section Has No Static Fallback
**File:** `index.tsx` lines 419–439 — featured listings are displayed in an auto-scrolling marquee. There is no static grid fallback. Users who prefer to scan listings without animation (reduced-motion preference, older devices) get a perpetually moving element with no pause/stop control other than CSS hover.

### 🟡 3. Bento Grid Aspect Ratios Are Fragile on iPad Landscape
**File:** `index.tsx` lines 249–395 — the bento grid uses `md:col-span-8`, `md:col-span-4`, `md:col-span-5`, `md:col-span-3` in a 12-column grid. On 768px tablets (iPad), these collapse to full-width stacked cards, which is correct. But at 900px–1024px (a common iPad landscape), the 12-column grid activates but images lose their aspect ratios, creating tall compressed cards.

### 🟡 4. Section Headers All Follow Identical Pattern — No Typographic Rhythm
Every section on the homepage uses the exact same three-part header pattern: `text-accent label → font-display h2 → text-muted-foreground paragraph`. While visually consistent, this creates monotony. There is no visual differentiation between primary, secondary, and tertiary sections.

---

# Typography Problems

### 🟠 1. `font-display` Applied to `h1`, `h2`, `h3` Globally
**File:** `styles.css` lines 111–117 — the global `h1, h2, h3, .font-display` rule applies `Fraunces` to ALL heading elements. This means utility headings inside filter panels, card specs rows, and form labels also inherit the serif display font — degrading scannability in data-dense contexts.

### 🟠 2. `text-[9px]` and `text-[10px]` Are Used Excessively
Multiple components use sub-11px font sizes: `global-enquiry.tsx` consent text is `text-[9px]`, `site-chrome.tsx` CTA button is `text-[10px]`, listing card CTA is `text-[10px]`. These sizes fail WCAG 2.1 AA legibility requirements, particularly on low-DPI Android screens.

### 🟡 3. Tagline Uses `tracking-[0.3em]` on a 10px Font
**File:** `site-chrome.tsx` line 200 and `site-chrome.tsx` line 231 — `text-[10px] tracking-[0.3em]` creates extreme letter spacing at a tiny size. While premium in aesthetic, this becomes nearly illegible at sub-retina screen densities.

### 🟡 4. Tamil Text Has No Font Fallback Stack Optimization
**File:** `styles.css` line 47 — the `--font-sans` stack is `"Inter", ui-sans-serif, system-ui, sans-serif`. Tamil (`ta`) script renders correctly only if the OS provides a suitable Tamil Unicode font (Latha, Noto Sans Tamil). There is no explicit Tamil font loading strategy via `@font-face` or Google Fonts import.

---

# Accessibility Problems

### 🔴 1. Contact Form Inputs Have No Programmatic Labels
**File:** `contact.tsx` lines 64–99 — all `<input>` and `<select>` fields inside the contact form are wrapped in a `Field` component that renders a visual label, but the input elements have no `id` attribute and the label has no `htmlFor` binding. Screen readers cannot associate the label with the input.

### 🔴 2. Fake reCAPTCHA Has No Real Bot Protection
**File:** `global-enquiry.tsx` lines 40–56 — the CAPTCHA uses a simulated 1.2-second `setTimeout` to show a checkmark. It uses the real reCAPTCHA logo but is not connected to Google's reCAPTCHA API. This means: (a) bots can easily submit the form, (b) users who recognize the fake CAPTCHA lose trust instantly, and (c) it exposes the business to spam lead abuse.

### 🟠 3. No `aria-label` on Icon-Only Interactive Elements
**File:** `site-chrome.tsx` line 125 — the hamburger button has `aria-label="Toggle mobile menu"` ✅. But photo navigation buttons in `listing-card.tsx` lines 48–67 have no `aria-label` at all. The floating WhatsApp button in `global-enquiry.tsx` line 279 has `aria-label="Chat on WhatsApp"` ✅, but the "Enquire now" floating button at line 77 has no `aria-label`.

### 🟠 4. No `prefers-reduced-motion` Respect
**File:** `styles.css` — the `animate-marquee` (75s loop), `animate-spin-slow` (12s spin), and `animate-scale-up` animations have no `@media (prefers-reduced-motion: reduce)` override. Users with vestibular disorders or motion sensitivity are forced into constantly animating elements.

### 🟠 5. Price Range Slider Has No Accessible Label or Value Announcement
**File:** `listings.index.tsx` lines 415–418 — the `<input type="range">` slider has no `aria-label`, no `aria-valuemin`, `aria-valuemax`, or `aria-valuenow` announcement for screen reader users.

### 🟡 6. Modal Scroll Trap Not Enforced
**File:** `global-enquiry.tsx` line 99–104 — when the enquiry modal is open, the background page is still scrollable. Focus is not trapped inside the modal. A screen reader or keyboard user can tab through background page elements while the modal is visually open — a WCAG 2.1 level A failure.

---

# Mobile Responsiveness Problems

### 🔴 1. Logo Negative Margin Math Is Fragile
**File:** `site-chrome.tsx` line 59 — `-my-[40px]` on mobile, `-my-[90px]` on md+. On devices between 640–768px (common Android landscape), the intermediate breakpoint clips the logo against the nav bar, causing a visual overflow that breaks the header layout.

### 🟠 2. Filter Panel (6-Column Grid) Collapses to 1 Column on Mobile
**File:** `listings.index.tsx` line 273 — `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6`. On mobile, all 5+ filter controls stack vertically, creating a massive filter tower that takes up 3–4 full mobile screens before the first listing card appears. Users must scroll past the entire filter panel just to see properties.

### 🟠 3. Sticky-Stack Location Cards Collapse Poorly on Mobile
**File:** `index.tsx` lines 461–521 — the sticky-stack popular location cards use `--index` CSS variables for `top` offsets (`calc(4rem + var(--index) * 16px)`). On mobile, with a smaller viewport, the stacking creates a cramped bottom strip where only 16px of each card is visible — near-unusable for tapping.

### 🟡 4. Bento Cards Lack Minimum Touch Target Height on Mobile
**File:** `index.tsx` — bento category cards on mobile (`md:h-[380px]`) have no explicit mobile height, relying on `flex-col justify-between` to set natural height. With short text content, cards can be as small as 200px — fine visually but image aspect ratios compress and text truncates.

### 🟡 5. Listing Detail Map Is Full-Height on Mobile
**File:** `listings.$id.tsx` — the `LocationConnectivityMap` component renders at its default height on all screens. On mobile, this can take up an entire viewport, requiring significant scrolling past it to reach the contact form — the primary conversion element.

---

# Cognitive Load Analysis

### 🟠 1. Three Competing CTAs in the Same Screen Area on Desktop
On the listings detail page, users simultaneously see: a floating "Enquire now" pill (bottom-right), a sticky WhatsApp float (bottom-right, above enquiry), and an inline contact form in the right column. Three parallel inquiry paths with no clear hierarchy create decision paralysis.

### 🟠 2. The Marquee Ticker Adds Visual Noise Without User Value
**File:** `index.tsx` lines 172–233 — the live verification ticker marquee scrolls 8 items of legal activity data (e.g., "ECR Road: 4 BHK Villa Title Search Cleared"). While compelling as trust signals, the 75-second infinite scroll at `text-[10px]` forces users to either actively read small fast-moving text or visually block it. There is no way to pause, read all, or interact with these items.

### 🟡 3. `PROPERTY_TYPES_12` Checkbox Dropdown Presents 12 Items Simultaneously
**File:** `listings.index.tsx` lines 313–355 — the property type filter dropdown shows all 12 types pre-selected with individual checkboxes in a 400px scroll container. Presenting 12 options simultaneously (many irrelevant to the Indian market) causes immediate cognitive overload for non-technical users.

### 🟡 4. Overlapping Sections Create Unclear Page Structure
The homepage has 12+ distinct sections: Hero → Trust Strip → Marquee → Bento Grid → Featured Marquee → Plot Visualizer → Popular Locations → ROI Calculator → Why Us (desktop) → Why Us (mobile) → Testimonials → FAQ. This length is appropriate for SEO, but lacks visual breathing room between sections — most use `py-16` which creates a continuous scroll with no clear chapter breaks.

---

# Trust & Clarity Issues

### 🔴 1. Fake reCAPTCHA Is a Trust Liability
As noted in Accessibility, the simulated reCAPTCHA using the official Google logo without actual integration is misleading. Informed users will immediately recognize the fake — this damages brand credibility severely for a business asking users to share phone numbers and personal data.

### 🟠 2. "100% Lawyer-Vetted" Claim Has No Supporting Evidence
The `BadgeCheck` "Lawyer Vetted" badge on listing cards (`listing-card.tsx` line 79) is a visual claim only. There is no link to actual verification documents, no certifying body name, no downloadable report. For a high-value purchase decision (₹30L–₹5Cr+), unsubstantiated claims increase skepticism rather than confidence.

### 🟠 3. TNRERA Registration Number Is Not Shown Per Listing
The trust strip on the homepage mentions TNRERA approval, but individual listing cards and detail pages do not show actual TNRERA registration numbers. Buyers legally need this number to verify listings on the TNRERA portal themselves.

### 🟠 4. "Equal Housing Opportunity" Stripe References Concepts Not Applicable in India
**File:** `site-chrome.tsx` lines 352–360 — the EHO (Equal Housing Opportunity) badge in the footer is a US regulatory concept. Using it on an Indian real estate portal creates confusion and may signal to informed users that the brand has not localized its legal compliance framework properly.

### 🟡 5. Phone / Email in Footer Are Clearly Placeholder
**File:** `site-chrome.tsx` lines 322–328 — `+91 98765 43210` and `hello@hnhrealty.in` are standard Indian placeholder numbers. Publishing a non-functional phone number is a severe trust failure for a lead-generation business.

---

# Recommended Priority Fixes

| Priority | Fix | Component |
|----------|-----|-----------|
| 🔴 P0 | Replace fake reCAPTCHA with real Google reCAPTCHA v2 or v3 | `global-enquiry.tsx` |
| 🔴 P0 | Fix `.field` CSS class — define it in `styles.css` or replace with explicit Tailwind classes | `contact.tsx`, `styles.css` |
| 🔴 P0 | Remove non-functional photo nav arrows OR implement actual multi-image carousel | `listing-card.tsx` |
| 🔴 P0 | Update placeholder phone/email to real business data | `site-chrome.tsx` |
| 🔴 P1 | Add Enquire Now button visibility on mobile (remove `hidden md:flex`) | `global-enquiry.tsx` |
| 🟠 P1 | Pre-populate enquiry modal with property ID, title, and location | `global-enquiry.tsx`, `listings.$id.tsx` |
| 🟠 P1 | Add sticky active filter summary bar below header on listings page | `listings.index.tsx` |
| 🟠 P1 | Add `@media (prefers-reduced-motion)` to all CSS animations | `styles.css` |
| 🟠 P1 | Replace US-centric PROPERTY_TYPES_12 with India-relevant property sub-types | `listings.index.tsx` |
| 🟠 P2 | Fix label/input association in contact form (`htmlFor` + `id`) | `contact.tsx` |
| 🟠 P2 | Refactor logo sizing to avoid fragile negative-margin math | `site-chrome.tsx` |
| 🟠 P2 | Replace EHO badge with TNRERA and CMDA compliance statement | `site-chrome.tsx` |
| 🟡 P2 | Add `aria-label` to floating Enquire Now button | `global-enquiry.tsx` |
| 🟡 P2 | Add `aria-label`, `aria-valuemin/max/now` to price range slider | `listings.index.tsx` |
| 🟡 P3 | Load Tamil font explicitly via `@font-face` or Google Fonts | `styles.css` |
| 🟡 P3 | Add `min` attribute to date picker in contact form | `contact.tsx` |
| 🟡 P3 | Reduce `tracking-[0.3em]` on sub-11px text | `site-chrome.tsx` |
