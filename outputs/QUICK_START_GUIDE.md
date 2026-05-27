# H and H Realty — Quick Start Guide

Get your project running in 5 minutes!

---

## ⚡ Quick Setup

### 1. Install Dependencies
```bash
cd "H and H Realty"
bun install
```

### 2. Set Up Environment Variables
```bash
# Copy example file
copy .env.example .env

# Edit .env and add your values
notepad .env
```

**Required variables**:
```bash
# Get these from formspree.io (create free account)
VITE_FORMSPREE_ENQUIRY=your_enquiry_form_id
VITE_FORMSPREE_CONTACT=your_contact_form_id
VITE_FORMSPREE_SELL=your_sell_form_id

# Your business contact info
VITE_PHONE=+91 98765 43210
VITE_PHONE_RAW=919876543210
VITE_EMAIL=hello@hnhrealty.in
```

### 3. Start Development Server
```bash
bun run dev
```

### 4. Open Browser
Navigate to: `http://localhost:3000`

---

## 🎯 What You'll See

### Homepage
- Hero section with property slider
- Trust metrics strip
- Live verification ticker
- Bento grid (property categories)
- Featured properties marquee
- Plot layout visualizer
- Popular locations
- ROI calculator
- Why choose us section
- Testimonials

### Listings Page
- Advanced filters (category, price, location, type)
- Buy/Rent/Sell tabs
- Property grid with cards
- Dynamic price slider

### Property Detail Page
- Image gallery
- Property specs
- Amenities
- Legal documents
- Quick inquiry form
- Similar properties

### Other Pages
- Contact page with form
- Interactive map
- Blog/guides
- Admin dashboard

---

## 🔧 Common Commands

```bash
# Development
bun run dev              # Start dev server
bun run build            # Build for production
bun run preview          # Preview production build

# Code Quality
bun run lint             # Run ESLint
bun run format           # Format with Prettier

# Deployment
bun run deploy           # Deploy to Cloudflare Pages
```

---

## 📱 Test Responsive Design

Open DevTools and test at these breakpoints:
- **375px** - iPhone SE
- **390px** - iPhone 14
- **412px** - Pixel 7
- **768px** - iPad
- **1280px** - Desktop

---

## 🌐 Test Bilingual Support

Click the **TA | EN** toggle in the header to switch between Tamil and English.

All UI text should translate instantly!

---

## 📝 Test Forms

### Global Enquiry Form
1. Click floating "Enquire Now" button (bottom-right)
2. Fill in form
3. Click Submit
4. Should see success message (if Formspree ID is set)

### Contact Form
1. Go to `/contact` page
2. Fill in form
3. Submit
4. Check for success message

### Sell Property Form
1. Go to `/listings` page
2. Click "Sell" tab
3. Fill in form
4. Submit

---

## 🐛 Troubleshooting

### Dev Server Won't Start
```bash
# Clear cache and reinstall
rm -rf node_modules
rm bun.lock
bun install
bun run dev
```

### Build Fails
```bash
# Check for TypeScript errors
bun run build

# Fix errors in reported files
```

### Forms Don't Submit
1. Check `.env` has Formspree IDs
2. Verify IDs are correct (no quotes, just the ID)
3. Check browser console for errors
4. Verify inputs have `name` attributes

### Images Not Loading
1. Check image path is correct
2. Verify image exists in `src/assets/`
3. Use proper import: `import img from "@/assets/image.png"`

### Styles Not Applying
1. Ensure using `className` (not `class`)
2. Check Tailwind class names are correct
3. Verify custom properties in `src/styles.css`

---

## 📚 Key Files to Know

### Routes (Pages)
- `src/routes/index.tsx` - Homepage
- `src/routes/listings.index.tsx` - Listings catalog
- `src/routes/listings.$id.tsx` - Property detail
- `src/routes/contact.tsx` - Contact page

### Components
- `src/components/site-chrome.tsx` - Header & footer
- `src/components/listing-card.tsx` - Property card
- `src/components/global-enquiry.tsx` - Enquiry modal
- `src/components/sticky-contact.tsx` - Mobile contact bar

### Utilities
- `src/lib/listings.ts` - Property data
- `src/lib/contact-info.ts` - Contact constants
- `src/context/language-context.tsx` - Bilingual support

### Styles
- `src/styles.css` - Global styles & design tokens

---

## 🎨 Design System

### Colors
```css
/* Primary - H&H Navy */
bg-primary text-primary-foreground

/* Accent - Azure Blue */
bg-accent text-accent-foreground

/* Success - Green */
bg-success text-success-foreground
```

### Buttons
```tsx
<button className="btn-notched-filled">Primary CTA</button>
<button className="btn-notched">Secondary</button>
<button className="btn-ghost">Subtle</button>
```

### Form Inputs
```tsx
<input className="field" type="text" name="name" />
<select className="field" name="type">...</select>
```

---

## 🚀 Next Steps

1. **Add Real Formspree IDs** - Forms will work
2. **Add More Properties** - Expand inventory
3. **Replace Images** - Use real property photos
4. **Test Everything** - All features and pages
5. **Deploy** - Go live!

---

## 💡 Pro Tips

### Bilingual Pattern
```tsx
import { useLanguage } from "@/context/language-context";

const { language } = useLanguage();

<h1>
  {language === "en" 
    ? "Find Your Dream Property" 
    : "உங்கள் கனவு சொத்தை கண்டறியவும்"}
</h1>
```

### Contact Info Pattern
```tsx
import { CONTACT, whatsappUrl } from "@/lib/contact-info";

<a href={`tel:${CONTACT.phone}`}>Call Us</a>
<a href={whatsappUrl("I'm interested")}>WhatsApp</a>
```

### Form Pattern
```tsx
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  const formData = new FormData(e.currentTarget);
  const endpoint = import.meta.env.VITE_FORMSPREE_CONTACT;
  
  if (endpoint) {
    await fetch(`https://formspree.io/f/${endpoint}`, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" }
    });
  }
  
  setIsSubmitting(false);
};
```

---

## 📞 Need Help?

1. Check `README.md` for full documentation
2. Check `GEMINI.md` for project context
3. Check `project-rules.md` for coding standards
4. Check `outputs/REBUILD_STATUS.md` for current status

---

**Happy Building!** 🎉
