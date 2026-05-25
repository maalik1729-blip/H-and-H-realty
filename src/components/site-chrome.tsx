import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, Linkedin, ArrowRight, Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { useLanguage } from "@/context/language-context";

const NAV_LINKS = [
  { to: "/", label: "Home", exact: true },
  { to: "/blog", label: "Our Story", exact: false },
  { to: "/listings", label: "Properties", exact: false },
  { to: "/map", label: "Communities", exact: false },
] as const;

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  
  const location = useLocation();
  const path = location.pathname;

  // Detect pages that feature a deep navy bg-primary header banner at the top
  const hasDarkHeader = 
    path === "/listings" || 
    path === "/listings/" || 
    path === "/contact" || 
    path === "/blog" || 
    path === "/privacy" || 
    path === "/terms";

  // When transparent at the top over a dark header, use light slate text; otherwise use dark slate text
  const isDarkBackground = !scrolled && hasDarkHeader;

  const linkColorClass = isDarkBackground 
    ? "text-slate-200 hover:text-white" 
    : "text-slate-800 hover:text-accent";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-40 w-full border-b transition-all duration-300 ${
        scrolled 
          ? "bg-[oklch(0.96_0.012_240)]/90 backdrop-blur-md shadow-sm border-slate-200/40 py-3" 
          : "bg-transparent border-transparent py-5"
      }`}>
        <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group shrink-0 select-none hover:opacity-90 transition duration-200" onClick={() => setMobileOpen(false)}>
            <img
              src={logo}
              alt="H&H Realty Logo"
              className={`w-auto transition-all duration-300 ${
                isDarkBackground ? "brightness-0 invert" : ""
              }`}
              style={{
                height: "220px",
                marginTop: "-90px",
                marginBottom: "-90px",
                mixBlendMode: isDarkBackground ? "normal" : "multiply",
                maxHeight: "none",
              }}
            />
          </Link>

          {/* Desktop Nav in Sentence-Case with Dynamic Readability */}
          <nav className="hidden items-center gap-8 text-[13px] font-semibold md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={link.exact ? { exact: true } : undefined}
                activeProps={{ className: "text-accent font-bold" }}
                className={`transition-all duration-300 font-sans tracking-wide hover:-translate-y-0.5 inline-block transform ${linkColorClass}`}
              >
                {link.label === "Home" ? t("nav.home") : 
                 link.label === "Our Story" ? t("nav.ourStory") : 
                 link.label === "Properties" ? t("nav.properties") : 
                 link.label === "Communities" ? t("nav.communities") : 
                 link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Capsule + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            {/* Language Switcher Button */}
            <button
              onClick={toggleLanguage}
              type="button"
              title={language === "en" ? "Switch to Tamil / தமிழுக்கு மாற்றவும்" : "Switch to English / ஆங்கிலத்திற்கு மாற்றவும்"}
              className={`hidden md:flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all duration-300 shadow-sm cursor-pointer select-none active:scale-95 ${
                isDarkBackground
                  ? "bg-white/15 text-white border-white/25 hover:bg-white/30 hover:border-white/35"
                  : "bg-slate-100 hover:bg-slate-200/80 border-slate-200/80 text-slate-800"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full bg-accent ${language === "ta" ? "animate-pulse" : ""}`} />
              <span>{language === "en" ? "தமிழ்" : "English"}</span>
            </button>

            <Link
              to="/contact"
              className="hidden md:inline-flex btn-notched-filled text-[10px] py-2 shadow-md hover:scale-[1.02]"
            >
              <span>{t("nav.contactUs")} &nbsp;↗</span>
            </Link>

            {/* Hamburger — mobile only with dynamic theme colors */}
            <button
              type="button"
              aria-label="Toggle mobile menu"
              onClick={() => setMobileOpen((v) => !v)}
              className={`md:hidden flex h-9 w-9 items-center justify-center rounded-full border transition-colors shadow-sm ${
                isDarkBackground 
                  ? "bg-white/10 text-white border-white/20 hover:bg-white/20" 
                  : "bg-white/80 text-slate-800 border-slate-200 hover:bg-slate-100 hover:text-accent"
              }`}
            >
              {mobileOpen ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Slide-Down Nav Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-30 md:hidden" onClick={() => setMobileOpen(false)}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-foreground/20 backdrop-blur-sm" />
          {/* Panel - positioned right under the transparent header */}
          <div className="absolute top-20 left-0 right-0 px-4">
            <nav
              className="w-full bg-background border border-border/80 shadow-elevated rounded-3xl px-6 py-6 flex flex-col gap-4 animate-scale-up"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Mobile Language Toggle */}
              <div className="flex items-center justify-between py-2 border-b border-border/50">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Language / மொழி</span>
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/5 px-4 py-1.5 text-xs font-bold text-accent shadow-sm"
                >
                  <span className={`w-1.5 h-1.5 rounded-full bg-accent ${language === "ta" ? "animate-pulse" : ""}`} />
                  <span>{language === "en" ? "தமிழ்" : "English"}</span>
                </button>
              </div>

              {NAV_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  activeOptions={link.exact ? { exact: true } : undefined}
                  activeProps={{ className: "text-accent font-bold bg-accent/5 pl-3 py-2 rounded-xl" }}
                  className="text-base font-bold uppercase tracking-widest text-foreground hover:text-accent transition-colors pl-1 py-1.5"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label === "Home" ? t("nav.home") : 
                   link.label === "Our Story" ? t("nav.ourStory") : 
                   link.label === "Properties" ? t("nav.properties") : 
                   link.label === "Communities" ? t("nav.communities") : 
                   link.label}
                </Link>
              ))}
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="text-base font-bold uppercase tracking-widest text-slate-500 hover:text-accent pl-1 py-1.5"
              >
                {t("nav.adminPanel")}
              </Link>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 inline-flex btn-notched-filled text-[10px] py-2.5 justify-center"
              >
                <span>{t("nav.contactUs")} &nbsp;↗</span>
              </Link>
              {/* Tagline in drawer */}
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent text-center pt-3 border-t border-border/50">
                {language === "en" ? "Trust | Value | Future" : "நம்பிக்கை | மதிப்பு | எதிர்காலம்"}
              </p>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

export function SiteFooter() {
  const { t } = useLanguage();
  return (
    <footer className="mt-24 border-t border-border bg-secondary/35">
      {/* Upper Main Footer Grid */}
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {/* Brand Info */}
        <div className="space-y-3">
          <Link to="/" className="flex items-center group select-none hover:opacity-90 transition duration-200">
            <img
              src={logo}
              alt="H&H Realty Logo"
              className="w-auto"
              style={{
                height: "240px",
                marginTop: "-100px",
                marginBottom: "-100px",
                mixBlendMode: "multiply",
                maxHeight: "none",
              }}
            />
          </Link>
          {/* Tagline */}
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-accent">
            {t("footer.tagline")}
          </p>
          <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
            {t("footer.desc")}
          </p>
          {/* Premium Circular Social Icons */}
          <div className="flex items-center gap-3 pt-1">
            {[
              { i: Facebook, l: "https://facebook.com" },
              { i: Twitter, l: "https://twitter.com" },
              { i: Instagram, l: "https://instagram.com" },
              { i: Youtube, l: "https://youtube.com" },
              { i: Linkedin, l: "https://linkedin.com" },
            ].map((s, idx) => (
              <a
                key={idx}
                href={s.l}
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-background border border-border/80 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200"
              >
                <s.i className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2: Discover Categories */}
        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase text-foreground mb-4">{t("bento.properties")}</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/listings" search={{ category: "Plots / Land" }} className="text-muted-foreground hover:text-accent transition">
                {t("bento.plots")}
              </Link>
            </li>
            <li>
              <Link to="/listings" search={{ category: "Villas & Homes" }} className="text-muted-foreground hover:text-accent transition">
                {t("bento.villas")}
              </Link>
            </li>
            <li>
              <Link to="/listings" search={{ category: "Apartments" }} className="text-muted-foreground hover:text-accent transition">
                {t("bento.apartments")}
              </Link>
            </li>
            <li>
              <Link to="/listings" search={{ category: "Farmhouses" }} className="text-muted-foreground hover:text-accent transition">
                {t("bento.farmhouses")}
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Resources & Tools */}
        <div>
          <h4 className="text-xs font-bold tracking-widest uppercase text-foreground mb-4">Resources</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/listings" className="text-muted-foreground hover:text-accent transition">
                Browse Properties
              </Link>
            </li>
            <li>
              <Link to="/map" className="text-muted-foreground hover:text-accent transition">
                Interactive Plot Map
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-muted-foreground hover:text-accent transition">
                Buyer Guides &amp; Safety Help
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-muted-foreground hover:text-accent transition">
                Book a Free Site Visit
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact & Newsletter */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold tracking-widest uppercase text-foreground">{t("footer.getInTouch")}</h4>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-accent shrink-0" />
              <span>{t("footer.address")}</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent shrink-0" />
              <a href="tel:+919876543210" className="hover:text-accent transition">+91 98765 43210</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent shrink-0" />
              <a href="mailto:hello@hnhrealty.in" className="hover:text-accent transition">hello@hnhrealty.in</a>
            </li>
          </ul>

          {/* Join The Club */}
          <div className="pt-2">
            <h5 className="text-[10px] font-bold tracking-widest uppercase text-foreground mb-2">{t("footer.joinClub")}</h5>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center border-b border-border/80 py-1">
              <input
                type="email"
                placeholder={t("footer.emailPlaceholder")}
                required
                className="w-full bg-transparent text-xs text-foreground placeholder:text-muted-foreground/60 focus:outline-none"
              />
              <button type="submit" className="text-muted-foreground hover:text-accent transition ml-2 cursor-pointer">
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>
            <p className="text-[9px] text-muted-foreground/75 mt-1">{t("footer.joinDesc")}</p>
          </div>
        </div>
      </div>

      {/* Middle Equal Housing Opportunity Stripe */}
      <div className="border-t border-border/40 bg-secondary/5 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center sm:text-left flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground leading-relaxed">
          <p className="max-w-3xl">
            H and H Realty fully supports the Equal Housing Opportunity laws. Every listing showcased undergoes a stringent 30-year lawyer due diligence audit, Patta/Chitta authentication, DTCP / CMDA approval verification, and TNRERA registration screening.
          </p>
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background font-bold text-[10px]">
            EHO
          </div>
        </div>
      </div>

      {/* Lower Legal & Copyright Strip */}
      <div className="border-t border-border/60 bg-secondary/20 py-6 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <Link to="/privacy" className="hover:text-accent transition">Privacy Policy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-accent transition">Terms &amp; Conditions</Link>
          </div>
          <div>
            © {new Date().getFullYear()} {t("footer.rights")}
          </div>
        </div>
      </div>
    </footer>
  );
}
