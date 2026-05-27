# 04 — H and H Realty Component Execution Plan (v2)

## Summary

Stage 4 applies targeted code fixes to 4 source files based on the v2 audit findings. No CSS changes required (v1 tokens confirmed complete in Stage 3).

---

## Fix 1: `global-enquiry.tsx` — Async Formspree Submission (🔴 CRITICAL)

**File**: `src/components/global-enquiry.tsx`
**Lines**: 66–73

**Problem**: `handleSubmit` is synchronous — immediately sets `submitted = true` without calling Formspree API. The `isSubmitting` and `submitError` states exist in code but are never activated.

**Fix**:
- Convert `handleSubmit` to `async`
- Add `setIsSubmitting(true)` before fetch
- POST to `https://formspree.io/f/${VITE_FORMSPREE_ENQUIRY}`
- On success: `setSubmitted(true)`
- On error: `setSubmitError(localized error message)`
- Graceful degradation: if env var absent, silently succeed
- Finally: `setIsSubmitting(false)`

---

## Fix 2: `index.tsx` — Hardcoded Phone in CTA (🔴 CRITICAL)

**File**: `src/routes/index.tsx`
**Lines**: 690–694

**Problem**: CTA section `<a href="tel:+919876543210">` and visible text `+91 98765 43210` are hardcoded. Violates centralised contact-info rule.

**Fix**:
- Import `CONTACT` from `@/lib/contact-info`
- Replace `href="tel:+919876543210"` with `href={`tel:${CONTACT.phoneRaw}`}`
- Replace `+91 98765 43210` text with `{CONTACT.phone}`

---

## Fix 3: `listings.$id.tsx` — Quick Inquiry `name` Attributes (🟠 HIGH)

**File**: `src/routes/listings.$id.tsx`
**Lines**: 632–652

**Problem**: Controlled inputs (name, phone, textarea) lack `name` attributes. Formspree JSON body is constructed manually so this doesn't break submission, but native FormData compatibility and autocomplete hints are lost.

**Fix**:
- Add `name="name"` to full name input
- Add `name="phone"` to phone input
- Add `name="message"` to textarea

---

## Fix 4: `site-chrome.tsx` — Bilingual "Resources" Heading (🟡 MEDIUM)

**File**: `src/components/site-chrome.tsx`
**Lines**: ~289

**Problem**: Footer "Resources" column heading is English-only string. Violates bilingual rule.

**Fix**:
- Replace hardcoded "Resources" with `{language === "en" ? "Resources" : "ஆதாரங்கள்"}`

---

## Execution Order

1. `global-enquiry.tsx` — async Formspree (most impactful fix)
2. `index.tsx` — CONTACT import + CTA fix
3. `listings.$id.tsx` — name attributes
4. `site-chrome.tsx` — bilingual heading

## Files Changed

| File | Type | Lines Modified |
|------|------|----------------|
| `src/components/global-enquiry.tsx` | Bug fix | 66–73 |
| `src/routes/index.tsx` | Bug fix | 1, 690–694 |
| `src/routes/listings.$id.tsx` | Enhancement | 632–652 |
| `src/components/site-chrome.tsx` | Enhancement | ~289 |
