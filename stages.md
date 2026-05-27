# Development Stages — H and H Realty

Individual stage commands and workflows for H and H Realty development.

---

## Stage 1: Project Setup

### Goal
Set up development environment and verify all dependencies.

### Tasks
1. Install Bun runtime
2. Clone repository
3. Install dependencies: `bun install`
4. Copy `.env.example` to `.env`
5. Configure environment variables
6. Start dev server: `bun run dev`
7. Verify app loads at `http://localhost:3000`

### Verification
- [ ] Dev server starts without errors
- [ ] Homepage loads correctly
- [ ] No console errors
- [ ] Hot reload works

---

## Stage 2: Component Development

### Goal
Build or modify React components following project standards.

### Tasks
1. Read `GEMINI.md` for project context
2. Read `project-rules.md` for coding standards
3. Identify component location in `src/components/`
4. Implement component with TypeScript
5. Add bilingual support (EN/TA)
6. Add accessibility attributes
7. Test at multiple breakpoints

### Verification
- [ ] Component renders correctly
- [ ] Bilingual text works
- [ ] Responsive at all breakpoints
- [ ] Accessibility attributes present
- [ ] TypeScript compiles without errors

---

## Stage 3: Route/Page Development

### Goal
Create or modify page routes following file-based routing.

### Tasks
1. Identify route file in `src/routes/`
2. Implement page component
3. Add SEO meta tags
4. Implement bilingual content
5. Add proper heading hierarchy
6. Test navigation
7. Test responsive layout

### Verification
- [ ] Route accessible via URL
- [ ] Page renders correctly
- [ ] Navigation works
- [ ] SEO tags present
- [ ] Responsive layout works
- [ ] Bilingual content displays

---

## Stage 4: Form Integration

### Goal
Implement forms with Formspree integration and validation.

### Tasks
1. Create form component
2. Add form inputs with `name` attributes
3. Implement Formspree submission
4. Add loading state with spinner
5. Add success/error states
6. Add validation (React Hook Form + Zod)
7. Add bilingual labels and messages
8. Test submission flow

### Verification
- [ ] Form submits to Formspree
- [ ] Loading state shows during submission
- [ ] Success message displays
- [ ] Error handling works
- [ ] Validation works
- [ ] Bilingual labels present

---

## Stage 5: Styling & Theming

### Goal
Apply consistent styling using Tailwind and custom CSS variables.

### Tasks
1. Review `src/styles.css` for color tokens
2. Use Tailwind utility classes
3. Apply brand colors from CSS variables
4. Use standard button classes (`.btn-notched`, `.btn-notched-filled`, `.btn-ghost`)
5. Ensure mobile-first responsive design
6. Test dark mode (if applicable)
7. Verify color contrast (WCAG AA)

### Verification
- [ ] Styles match brand guidelines
- [ ] Colors use CSS variables
- [ ] Responsive at all breakpoints
- [ ] Color contrast meets WCAG AA
- [ ] No inline styles used

---

## Stage 6: Accessibility Audit

### Goal
Ensure WCAG 2.1 AA compliance across the application.

### Tasks
1. Add ARIA labels to interactive elements
2. Ensure proper heading hierarchy (h1 → h2 → h3)
3. Add alt text to all images
4. Verify keyboard navigation
5. Check color contrast ratios
6. Test with screen reader
7. Add focus indicators
8. Ensure touch targets are 44x44px minimum

### Verification
- [ ] All interactive elements have ARIA labels
- [ ] Heading hierarchy is correct
- [ ] All images have descriptive alt text
- [ ] Keyboard navigation works
- [ ] Color contrast meets 4.5:1 (text) and 3:1 (large text)
- [ ] Focus indicators visible
- [ ] Touch targets meet minimum size

---

## Stage 7: Performance Optimization

### Goal
Optimize application performance and bundle size.

### Tasks
1. Implement lazy loading for images
2. Add code splitting for routes
3. Optimize images (WebP format)
4. Minimize bundle size
5. Add loading states
6. Implement debouncing for search inputs
7. Measure Core Web Vitals

### Verification
- [ ] Images lazy load
- [ ] Routes code-split
- [ ] Bundle size optimized
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1

---

## Stage 8: Testing & QA

### Goal
Comprehensive testing across devices and browsers.

### Tasks
1. Test at breakpoints: 375px, 390px, 412px, 768px, 1280px
2. Test in Chrome, Firefox, Safari, Edge
3. Test all forms (contact, enquiry, sell)
4. Test navigation and routing
5. Test bilingual toggle
6. Test contact methods (phone, WhatsApp, email)
7. Run build: `bun run build`
8. Fix any TypeScript errors

### Verification
- [ ] Responsive at all breakpoints
- [ ] Works in all browsers
- [ ] All forms submit successfully
- [ ] Navigation works correctly
- [ ] Language toggle works
- [ ] Contact methods work
- [ ] Build succeeds without errors

---

## Stage 9: Documentation

### Goal
Document changes and update project documentation.

### Tasks
1. Update `outputs/change_log.md` with changes
2. Document new components in code comments
3. Update README.md if needed
4. Add JSDoc comments to functions
5. Document any new environment variables
6. Update component usage examples

### Verification
- [ ] Change log updated
- [ ] Code comments added
- [ ] README updated (if needed)
- [ ] JSDoc comments present
- [ ] Environment variables documented

---

## Stage 10: Deployment

### Goal
Deploy application to production (Cloudflare Pages).

### Tasks
1. Run final build: `bun run build`
2. Test production build: `bun run preview`
3. Verify environment variables in Cloudflare dashboard
4. Deploy: `bun run deploy`
5. Verify deployment URL
6. Test production site
7. Monitor for errors

### Verification
- [ ] Build succeeds
- [ ] Preview works correctly
- [ ] Environment variables set in Cloudflare
- [ ] Deployment succeeds
- [ ] Production site loads
- [ ] No console errors in production
- [ ] All features work in production

---

## Quick Stage Reference

| Stage | Command | Output |
|-------|---------|--------|
| Setup | `bun install && bun run dev` | Dev server running |
| Component | Modify `src/components/` | New/updated component |
| Route | Modify `src/routes/` | New/updated page |
| Form | Add Formspree integration | Working form |
| Styling | Update `src/styles.css` | Styled components |
| Accessibility | Add ARIA attributes | WCAG AA compliant |
| Performance | Optimize assets | Faster load times |
| Testing | `bun run build` | No errors |
| Documentation | Update `outputs/` | Updated docs |
| Deployment | `bun run deploy` | Live site |

---

## Stage Workflow Tips

### Before Starting Any Stage
1. Read `GEMINI.md` for project context
2. Read `project-rules.md` for coding standards
3. Pull latest changes: `git pull origin main`
4. Create feature branch: `git checkout -b feature/stage-name`

### During Stage
1. Follow bilingual pattern for all text
2. Use centralized contact info
3. Test at multiple breakpoints
4. Add accessibility attributes
5. Use TypeScript types

### After Completing Stage
1. Run build: `bun run build`
2. Fix any errors
3. Test in browser
4. Commit changes: `git commit -m "feat: stage description"`
5. Push: `git push origin feature/stage-name`
6. Create pull request

---

**Note**: Stages can be executed in order or individually based on project needs.
