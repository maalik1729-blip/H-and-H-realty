# H and H Realty — Project Documentation

Complete documentation for the H and H Realty real estate platform.

---

## Quick Start

### Prerequisites
- **Bun** v1.0+ ([installation guide](https://bun.sh))
- **Node.js** v18+ (for compatibility)
- **Git** for version control

### Installation

1. Navigate to project:
```bash
cd "H and H Realty"
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
copy .env.example .env
# Edit .env with your actual values
```

4. Start development server:
```bash
bun run dev
```

5. Open browser to `http://localhost:3000`

---

## Project Overview

H and H Realty is a modern, bilingual (English/Tamil) real estate platform built for the Chennai market. The platform focuses on transparency, legal verification, and user trust.

### Key Features
- 🏠 Property listings with advanced filtering
- 🗺️ Interactive plot maps and location connectivity
- 📊 Financial ROI calculator for investment analysis
- 🎥 Scroll-triggered video reveals and 3D visualizations
- 📱 Mobile-first responsive design
- 🌐 Bilingual support (English/Tamil)
- ✅ Trust signals (lawyer verification, DTCP/RERA badges)
- 📞 Multiple contact channels (phone, WhatsApp, forms)

---

## Tech Stack

### Core
- **Framework**: TanStack Start (React 19) + TanStack Router
- **TypeScript** for type safety
- **Bun** as package manager and runtime

### Styling & UI
- **Tailwind CSS v4** with custom OKLCH color system
- **Radix UI** primitives for accessible components
- **shadcn/ui** component library
- **Lucide React** for icons
- **Framer Motion** for advanced animations

### Data & Forms
- **React Hook Form** for form management
- **Zod** for schema validation
- **Formspree** for form submissions
- **Recharts** for data visualization

### Maps & Visualization
- **Leaflet** for interactive maps
- Custom 3D plot visualizer

---

## Project Structure

```
H and H Realty/
├── src/
│   ├── routes/                    # File-based routing
│   │   ├── index.tsx             # Homepage
│   │   ├── listings.index.tsx    # Listings catalog
│   │   ├── listings.$id.tsx      # Property detail page
│   │   ├── contact.tsx           # Contact page
│   │   ├── blog.tsx              # Blog/guides
│   │   ├── map.tsx               # Interactive map
│   │   └── admin.tsx             # Admin dashboard
│   ├── components/               # React components
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── site-chrome.tsx       # Header/footer
│   │   ├── listing-card.tsx      # Property card
│   │   ├── global-enquiry.tsx    # Enquiry modal
│   │   ├── sticky-contact.tsx    # Mobile contact bar
│   │   └── ...                   # Feature components
│   ├── lib/                      # Utilities
│   │   ├── listings.ts           # Property data & helpers
│   │   ├── contact-info.ts       # Contact constants
│   │   └── utils.ts              # General utilities
│   ├── context/                  # React contexts
│   │   └── language-context.tsx  # i18n context
│   ├── assets/                   # Images & media
│   └── styles.css                # Global styles & tokens
├── public/                       # Static assets
├── outputs/                      # Documentation & audits
├── hnh_redesign/                 # Redesign workflow docs
├── .env.example                  # Environment variables template
└── package.json                  # Dependencies & scripts
```

---

## Available Scripts

```bash
# Development
bun run dev              # Start dev server with hot reload

# Production
bun run build            # Build for production
bun run preview          # Preview production build

# Code Quality
bun run lint             # Run ESLint
bun run format           # Format with Prettier

# Deployment
bun run deploy           # Deploy to Cloudflare Pages
```

---

## Environment Variables

Required environment variables (see `.env.example`):

```bash
# Formspree Form IDs
VITE_FORMSPREE_CONTACT_ID=your_contact_form_id
VITE_FORMSPREE_ENQUIRY_ID=your_enquiry_form_id
VITE_FORMSPREE_SELL_ID=your_sell_form_id

# Contact Information
VITE_CONTACT_PHONE=+919876543210
VITE_CONTACT_EMAIL=hello@hnhrealty.in
VITE_CONTACT_ADDRESS=123 Anna Salai, Chennai
VITE_WHATSAPP_NUMBER=919876543210
```

---

## Development Workflow

### 1. Create Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Changes
- Only modify files in `src/` directory
- Follow bilingual pattern (EN/TA)
- Use TypeScript
- Test at multiple breakpoints

### 3. Test Locally
```bash
bun run dev
# Test at: 375px, 390px, 412px, 768px, 1280px
```

### 4. Build Check
```bash
bun run build
# Ensure no TypeScript errors
```

### 5. Commit & Push
```bash
git add .
git commit -m "feat: your feature description"
git push origin feature/your-feature-name
```

---

## Key Development Patterns

### Bilingual Content
Always provide both English and Tamil translations:

```tsx
import { useLanguage } from "@/context/language-context";

const { language } = useLanguage();

<h1>
  {language === "en" 
    ? "Find Your Dream Property" 
    : "உங்கள் கனவு சொத்தை கண்டறியவும்"}
</h1>
```

### Contact Information
Always use centralized contact constants:

```tsx
import { CONTACT, whatsappUrl } from "@/lib/contact-info";

<a href={`tel:${CONTACT.phone}`}>{CONTACT.phone}</a>
<a href={whatsappUrl("Hello, I'm interested")}>WhatsApp</a>
```

### Form Handling
Use async Formspree integration with proper states:

```tsx
const [isSubmitting, setIsSubmitting] = useState(false);
const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  try {
    const formData = new FormData(e.currentTarget);
    const endpoint = import.meta.env.VITE_FORMSPREE_CONTACT_ID;
    
    if (endpoint) {
      const res = await fetch(`https://formspree.io/f/${endpoint}`, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      });
      
      setStatus(res.ok ? "success" : "error");
    } else {
      setStatus("success"); // Graceful degradation
    }
  } catch {
    setStatus("error");
  } finally {
    setIsSubmitting(false);
  }
};
```

---

## Documentation Files

- **GEMINI.md** - Agent identity and project context
- **project-rules.md** - Coding standards and rules
- **stages.md** - Development stage workflows
- **ui-redesign.md** - UI redesign pipeline documentation

---

## Important Rules

### ✅ DO
- Write mobile-first responsive code
- Provide bilingual content (EN/TA)
- Use centralized contact info
- Add accessibility attributes
- Test at multiple breakpoints
- Use TypeScript types
- Follow existing patterns

### ❌ DON'T
- Modify files outside `src/`
- Hardcode contact information
- Use English-only text
- Add new dependencies without approval
- Ignore TypeScript errors
- Skip accessibility
- Use inline styles

---

## Troubleshooting

### Build Fails
```bash
bun run build
# Check TypeScript errors and fix
```

### Styles Not Working
- Ensure using `className` (not `class`)
- Check Tailwind class names
- Verify custom properties in `src/styles.css`

### Forms Not Submitting
- Check `.env` has Formspree IDs
- Verify inputs have `name` attributes
- Check browser console for errors

---

## Resources

### Documentation
- [TanStack Start](https://tanstack.com/start)
- [TanStack Router](https://tanstack.com/router)
- [Tailwind CSS](https://tailwindcss.com)
- [Radix UI](https://www.radix-ui.com)
- [shadcn/ui](https://ui.shadcn.com)

### Tools
- [Bun Documentation](https://bun.sh/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref)

---

## Support

For questions or issues:
1. Check documentation files (GEMINI.md, project-rules.md)
2. Review existing code for patterns
3. Check `outputs/` folder for audit reports
4. Ask in team chat or create an issue

---

**Last Updated**: May 27, 2026
**Version**: 1.0.0
