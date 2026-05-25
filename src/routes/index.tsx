import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Search,
  MapPin,
  ShieldCheck,
  FileCheck2,
  Sparkles,
  TrendingUp,
  Phone,
  ArrowRight,
  Star,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import hero from "@/assets/hero-land.jpg";
import gatedCommunityPlot from "@/assets/gated-community-plot.png";
import residentialPlotGround from "@/assets/residential-plot-ground.png";
import residential from "@/assets/plot-residential.jpg";
import commercial from "@/assets/plot-commercial.jpg";
import agricultural from "@/assets/plot-agricultural.jpg";
import investment from "@/assets/plot-investment.jpg";
import luxuryVilla from "@/assets/luxury-villa.png";
import modernApartment from "@/assets/modern-apartment.png";
import farmhouseImg from "@/assets/farmhouse.png";
import buildingIllustration from "@/assets/buildingIllustration.png";

// New Slider Assets
import indoor from "@/assets/indoor.png";
import interior from "@/assets/interior.png";
import land from "@/assets/land.png";
import villa from "@/assets/villa.jpg";
import apartrments from "@/assets/apartrments.png";
import farm from "@/assets/farm.png";
import plot from "@/assets/plot.png";

import { listings, popularLocations, testimonials } from "@/lib/listings";
import { ListingCard } from "@/components/listing-card";
import { PlotLayoutVisualizer } from "@/components/plot-layout-visualizer";
import { FinancialRoiCalculator } from "@/components/financial-roi-calculator";

const SLIDER_IMAGES = [
  { img: land, title: "Premium Chennai Plots & Lands", desc: "Title-vetted, CMDA/DTCP approved layout parcels ready for immediate registration." },
  { img: villa, title: "Architectural Masterpiece Villas", desc: "Elite residential structures built with premium luxury specifications." },
  { img: apartrments, title: "Modern High-Rise Apartments", desc: "Sleek metropolitan residences situated in sought-after urban corridors." },
  { img: farmhouseImg, title: "Scenic Weekend Farmhouses", desc: "Organic, eco-friendly farms and green weekend getaways." },
  { img: farm, title: "Agricultural Farmlands", desc: "Fertile soils and highly sustainable farm fields." },
  { img: interior, title: "Bespoke Interior Craftsmanship", desc: "High-fidelity modern interior furnishing and elegant layouts." },
  { img: indoor, title: "Premium Indoor Living", desc: "State-of-the-art home comfort, smart security, and modern ease." },
  { img: plot, title: "Elite Vetted Plot Layouts", desc: "Exclusive CMDA & DTCP approved community layouts across high-growth corridors." },
];

// Import Accordion
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Animated Counter component that starts counting from 0 when it scrolls into view
function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let startTime: number | null = null;
          const duration = 3600; // 3.6s duration

          const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // easeOutExpo
            const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
            setCount(easeProgress * value);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.1 },
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [value]);

  return (
    <span ref={elementRef} className="font-tabular-nums">
      {prefix}
      {count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {suffix}
    </span>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "H and H Realty Chennai — Verified Plots, Villas & Apartments" },
      {
        name: "description",
        content:
          "Browse verified residential plots, premium villas, apartments, and land near Chennai. Featuring ECR, OMR, Tambaram and GST Road. Verified titles & registration support.",
      },
      { property: "og:title", content: "H and H Realty Chennai — Verified Properties & Lands" },
      {
        property: "og:description",
        content:
          "Verified properties near Chennai. Honest pricing. Every listing title-checked and ready to register.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const [q, setQ] = useState("");
  const [heroPurpose, setHeroPurpose] = useState<"buy" | "rent" | "sell">("buy");
  const navigate = Route.useNavigate();
  const featured = listings.filter((l) => l.status !== "Sold").slice(0, 10);

  // Hero Background Image Slider State
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Testimonial Carousel State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Why Us Horizontal Sticky Scroll Section States
  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const containerHeight = rect.height;
      const windowHeight = window.innerHeight;
      const totalScroll = containerHeight - windowHeight;
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScroll));
      setScrollProgress(progress);
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    
    // Initial check
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const activeFeatureIndex = Math.min(3, Math.floor(scrollProgress * 4));
  return (
    <div>
      {/* HERO SECTION - REDESIGNED AS AN ULTRA-PREMIUM CINEMATIC IMAGE SLIDER */}
      <section className="relative isolate overflow-hidden bg-[oklch(0.96_0.012_240)] pt-44 pb-16 px-4 sm:px-6 lg:px-8">
        
        {/* Interlocking background watermark */}
        <div className="absolute inset-x-0 top-32 flex justify-center pointer-events-none select-none z-[-10]">
          <h1 className="font-display font-black text-[12vw] leading-none tracking-tighter text-primary/12 uppercase whitespace-nowrap">
            LAND CONNECT
          </h1>
        </div>

        <div className="mx-auto max-w-7xl relative z-10 mt-6">
          
          {/* Main Slider Container */}
          <div className="w-full rounded-[40px] md:rounded-[60px] relative overflow-hidden flex flex-col lg:flex-row items-stretch justify-between gap-12 p-8 md:p-16 min-h-[500px] md:min-h-[580px] shadow-elevated bg-slate-950">
            
            {/* Cinematic Sliding Background Images Layer */}
            <div className="absolute inset-0 z-0">
              {SLIDER_IMAGES.map((slide, idx) => {
                const isActive = idx === currentImageIndex;
                return (
                  <div
                    key={idx}
                    className={`absolute inset-0 transition-all duration-[1200ms] ease-in-out transform ${
                      isActive ? "opacity-100 scale-100" : "opacity-0 scale-105 pointer-events-none"
                    }`}
                  >
                    <img
                      src={slide.img}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                );
              })}
              {/* Slate gradient dark overlay to guarantee extreme legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-slate-950/30 z-10" />
            </div>

            {/* Left Column: Wording & Direct Conversion anchors (z-20) */}
            <div className="w-full lg:w-[48%] flex flex-col justify-between gap-8 z-20 relative">
              <div className="flex flex-col gap-3">
                <span className="text-[11px] uppercase tracking-widest text-accent font-extrabold font-sans">
                  Buy • Sell • Rent
                </span>
                <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.15] text-white tracking-tight">
                  Premium Plots, Villas, Apartments &amp; Farmhouses near Chennai
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed font-sans max-w-lg mt-1">
                  Browse title-vetted land layouts, luxurious architectural villas, and green weekend estates listed directly by owners. 
                </p>
              </div>

              {/* CTAs and trust indicators */}
              <div className="flex flex-col gap-6">
                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/listings"
                    className="inline-flex btn-notched-filled text-[10px] py-3 px-8 shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <span>Browse Catalog &rarr;</span>
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex btn-notched text-[10px] py-3 px-8 border-white/20 text-white hover:bg-white hover:text-slate-950 transition-all duration-300 shadow-md"
                  >
                    <span>Book Site Visit &rarr;</span>
                  </Link>
                </div>

                {/* Elegant Trust badges row */}
                <div className="flex flex-wrap gap-3 select-none">
                  {[
                    "100% Lawyer Vetted",
                    "DTCP & RERA Approved",
                    "Complete Patta Support",
                  ].map((badge, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-3 py-1.5 text-[9px] font-bold text-white shadow-sm"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                      {badge}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Slide detail context & Manual Nav arrows */}
            <div className="w-full lg:w-[48%] flex flex-col items-center lg:items-end justify-between self-stretch z-20 text-center lg:text-right py-4 lg:py-0 relative">
              
              {/* Dynamic Slide Info overlay */}
              <div className="hidden lg:flex flex-col items-end gap-2 bg-slate-950/40 backdrop-blur-sm p-6 rounded-3xl border border-white/5 max-w-sm transition-all duration-500 animate-fade-in">
                <span className="text-[10px] uppercase tracking-widest text-accent font-extrabold font-sans">
                  Active Highlight
                </span>
                <h3 className="font-display text-lg font-bold text-white leading-tight">
                  {SLIDER_IMAGES[currentImageIndex].title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {SLIDER_IMAGES[currentImageIndex].desc}
                </p>
              </div>

              {/* Slider Manual Controls & Dot Indicators */}
              <div className="flex items-center gap-4 mt-8 lg:mt-0 select-none">
                {/* Arrow Left */}
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/10 hover:bg-white text-white hover:text-slate-950 transition duration-300 cursor-pointer shadow-md"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                
                {/* Dots indicator */}
                <div className="flex gap-2">
                  {SLIDER_IMAGES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentImageIndex ? "w-6 bg-accent" : "w-2 bg-white/30"
                      }`}
                    />
                  ))}
                </div>

                {/* Arrow Right */}
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % SLIDER_IMAGES.length)}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/10 hover:bg-white text-white hover:text-slate-950 transition duration-300 cursor-pointer shadow-md"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>

            </div>

          </div>

          {/* Quick categories navigation columns (4 columns bottom grid matching reference layout) */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Metropolitan Icons",
                desc: "Residences set within the world's most dynamic city skylines.",
                link: { category: "Apartments" as const },
              },
              {
                title: "Seaside Sanctuaries",
                desc: "Private villas and retreats along pristine coastlines.",
                link: { category: "Villas & Homes" as const },
              },
              {
                title: "Mountain Escapes",
                desc: "Exclusive chalets and estates nestled in breathtaking landscapes.",
                link: { category: "Farmhouses" as const },
              },
              {
                title: "Historic Charm",
                desc: "Timeless properties within cultural capitals and heritage districts.",
                link: { category: "Plots / Land" as const },
              },
            ].map((cat, idx) => (
              <Link
                key={idx}
                to="/listings"
                search={cat.link}
                className="group p-6 rounded-3xl bg-white border border-slate-200/80 hover:border-accent shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[140px]"
              >
                <div>
                  <h3 className="font-display text-lg font-bold text-primary group-hover:text-accent transition-colors duration-300">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed font-sans">
                    {cat.desc}
                  </p>
                </div>
                <div className="mt-4 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-accent font-sans">
                  <span>Explore Now</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 text-sm md:grid-cols-4 sm:px-6 lg:px-8">
          {[
            { i: ShieldCheck, t: "TNRERA/DTCP registered" },
            { i: FileCheck2, t: "Title-verified by lawyers" },
            { i: Sparkles, t: "Drone tour for every listing" },
            { i: TrendingUp, t: "Bank loan assistance" },
          ].map((b) => (
            <div key={b.t} className="flex items-center gap-3 text-foreground">
              <b.i className="h-5 w-5 text-primary" />
              <span className="font-semibold">{b.t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE VERIFICATION TICKER MARQUEE */}
      <section className="bg-transparent text-foreground py-3.5 overflow-hidden border-y border-border/70 select-none">
        <div className="flex w-full overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-[10px] font-bold tracking-widest uppercase">
            {[
              "ECR Road: 4 BHK Villa Title Search Cleared",
              "Tambaram West: Plot registration support completed",
              "GST Road Corridor: 2.5 Grounds Commercial Land DTCP approved",
              "Oragadam Hub: Investment parcel legal due-diligence report ready",
              "Velachery & Adyar: 112 Active verification files logged",
              "Sriperumbudur: 1 Acre Farmland Patta transfer completed",
              "Neelankarai: Ocean Breeze Villa RERA registration certified",
              "Perungudi: WTC suites lawyer-vetted papers delivered",
            ].map((text, idx) => (
              <span key={idx} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-foreground/80 font-bold tracking-wide">{text}</span>
                <span className="rounded bg-accent/15 px-2 py-0.5 text-[9px] font-extrabold text-accent border border-accent/25">
                  LATEST LOG
                </span>
              </span>
            ))}
            {/* Duplicate for infinite loop */}
            {[
              "ECR Road: 4 BHK Villa Title Search Cleared",
              "Tambaram West: Plot registration support completed",
              "GST Road Corridor: 2.5 Grounds Commercial Land DTCP approved",
              "Oragadam Hub: Investment parcel legal due-diligence report ready",
              "Velachery & Adyar: 112 Active verification files logged",
              "Sriperumbudur: 1 Acre Farmland Patta transfer completed",
              "Neelankarai: Ocean Breeze Villa RERA registration certified",
              "Perungudi: WTC suites lawyer-vetted papers delivered",
            ].map((text, idx) => (
              <span key={`dup-${idx}`} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-foreground/80 font-bold tracking-wide">{text}</span>
                <span className="rounded bg-accent/15 px-2 py-0.5 text-[9px] font-extrabold text-accent border border-accent/25">
                  LATEST LOG
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO GRID - PROPERTY TYPES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-background border-b border-border/40">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">Categories</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Explore Property Types in Chennai
          </h2>
          <p className="mt-3 text-muted-foreground">
            Whether you are looking to build your dream home on a verified plot, move into a premium
            villa, buy a high-rise apartment, or relax in a farmhouse, we have you covered.
          </p>
        </div>

        <div className="mt-12 grid gap-6 grid-cols-1 md:grid-cols-12">
          {/* Bento Card 1: Plots & Land */}
          <Link
            to="/listings"
            search={{ category: "Plots / Land", type: "All" }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-8 shadow-card hover:shadow-elevated hover:border-primary/50 transition-all duration-300 md:col-span-8 md:h-[380px] cursor-pointer"
          >
            <div className="flex flex-col md:flex-row gap-6 h-full justify-between">
              <div className="flex flex-col justify-between md:w-1/2">
                <div>
                  <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent mb-4">
                    Highly Demanded
                  </span>
                  <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    Plots & Land
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Verified residential, commercial, and agricultural plots near Tambaram, ECR, OMR
                    and GST Road. Ideal for immediate construction or high-growth investment.
                  </p>
                </div>
                <div className="mt-6 md:mt-0 flex items-center gap-4">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {listings.filter((l) => l.category === "Plots / Land").length} Properties
                  </span>
                  <span className="text-xs font-semibold text-primary group-hover:underline flex items-center gap-1">
                    Explore Plots <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
              <div className="relative md:w-1/2 aspect-[16/10] md:aspect-auto h-full rounded-2xl overflow-hidden bg-muted">
                <img
                  src={residential}
                  alt="Plots & Land"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </div>
          </Link>

          {/* Bento Card 2: Premium Villas */}
          <Link
            to="/listings"
            search={{ category: "Villas & Homes", type: "Villa" }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-8 shadow-card hover:shadow-elevated hover:border-primary/50 transition-all duration-300 md:col-span-4 md:row-span-2 md:h-full cursor-pointer"
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary mb-4">
                  Luxury Living
                </span>
                <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  Premium Villas
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Independent luxury villas with private gardens, swimming pools, and architectural
                  designs on ECR and in peaceful suburban Chennai.
                </p>
              </div>
              <div className="my-6 aspect-[16/10] md:aspect-[4/3] rounded-2xl overflow-hidden bg-muted">
                <img
                  src={luxuryVilla}
                  alt="Premium Villas"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {listings.filter((l) => l.type === "Villa").length} Properties
                </span>
                <span className="text-xs font-semibold text-primary group-hover:underline flex items-center gap-1">
                  View Villas <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Link>

          {/* Bento Card 3: Modern Apartments */}
          <Link
            to="/listings"
            search={{ category: "Apartments", type: "Apartment / Flat" }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-8 shadow-card hover:shadow-elevated hover:border-primary/50 transition-all duration-300 md:col-span-5 md:h-[380px] cursor-pointer"
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <span className="inline-block rounded-full bg-muted px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-4">
                  Urban Lifestyle
                </span>
                <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  Modern Apartments
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Premium apartments and high-rise flats in OMR, Medavakkam, and top IT corridors.
                  Features clubhouse, power backup, and gated security.
                </p>
              </div>
              <div className="my-4 aspect-[16/10] md:aspect-[2/1] rounded-2xl overflow-hidden bg-muted">
                <img
                  src={modernApartment}
                  alt="Modern Apartments"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {listings.filter((l) => l.type === "Apartment / Flat").length} Properties
                </span>
                <span className="text-xs font-semibold text-primary group-hover:underline flex items-center gap-1">
                  Explore Apartments <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Link>

          {/* Bento Card 4: Scenic Farmhouses */}
          <Link
            to="/listings"
            search={{ category: "Farmhouses", type: "Farmhouse" }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-6 md:p-8 shadow-card hover:shadow-elevated hover:border-primary/50 transition-all duration-300 md:col-span-3 md:h-[380px] cursor-pointer"
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent mb-4">
                  Weekend Retreat
                </span>
                <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  Scenic Farmhouses
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Serene weekend getaways and farmhouses on ECR or suburban Chennai. Clear titles
                  and peaceful setups.
                </p>
              </div>
              <div className="my-4 aspect-[16/10] md:aspect-[2/1] rounded-2xl overflow-hidden bg-muted">
                <img
                  src={farmhouseImg}
                  alt="Scenic Farmhouses"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {listings.filter((l) => l.type === "Farmhouse").length} Properties
                </span>
                <span className="text-xs font-semibold text-primary group-hover:underline flex items-center gap-1">
                  View Farmhouses <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-16 md:py-24 bg-background overflow-hidden">
        {/* Header container */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-accent">Featured</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Hand-picked properties this week
            </h2>
          </div>
          <Link
            to="/listings"
            className="text-sm font-semibold text-primary hover:underline whitespace-nowrap"
          >
            View all
          </Link>
        </div>

        {/* Marquee container */}
        <div className="relative w-full overflow-hidden select-none py-4">
          {/* Gradient overlay for premium fade effects */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-24 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-24 bg-gradient-to-l from-background via-background/80 to-transparent" />
          
          <div className="flex w-full overflow-hidden">
            <div className="animate-marquee flex items-stretch gap-6 px-6" style={{ animationDuration: "50s" }}>
              {featured.map((l) => (
                <div key={l.id} className="w-[280px] sm:w-[320px] md:w-[350px] shrink-0 flex">
                  <ListingCard l={l} />
                </div>
              ))}
              {/* Duplicate for infinite loop */}
              {featured.map((l) => (
                <div key={`dup-${l.id}`} className="w-[280px] sm:w-[320px] md:w-[350px] shrink-0 flex">
                  <ListingCard l={l} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PlotLayoutVisualizer />

      {/* POPULAR LOCATIONS */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-sm font-medium uppercase tracking-wider text-accent">
              Popular locations
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Where buyers are looking
            </h2>
            <p className="mt-3 text-muted-foreground">
              Explore listings across Chennai's highest growth corridors and established residential
              hubs.
            </p>
          </div>

          <div className="relative flex flex-col gap-8 md:gap-12 pb-16">
            {popularLocations.map((loc, index) => {
              const scale = 1 - (popularLocations.length - 1 - index) * 0.015;
              return (
                <div
                  key={loc.name}
                  className="sticky-stack-card w-full rounded-3xl overflow-hidden shadow-elevated border border-border bg-card group transition hover:border-primary/20"
                  style={
                    {
                      "--index": index,
                      transform: `scale(${scale})`,
                      transformOrigin: "top center",
                      transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
                    } as React.CSSProperties
                  }
                >
                  <Link
                    to="/listings"
                    search={{ location: loc.name }}
                    className="flex flex-col md:flex-row h-full min-h-[220px] md:min-h-[260px] cursor-pointer"
                  >
                    {/* Text Content */}
                    <div className="flex-1 p-8 md:p-10 flex flex-col justify-between bg-card text-foreground">
                      <div>
                        <span className="inline-block rounded bg-accent/15 border border-accent/25 px-2.5 py-0.5 text-[9px] font-bold tracking-widest uppercase text-accent mb-3">
                          Chennai Growth Corridor
                        </span>
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {loc.name}
                        </h3>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-3">
                          Discover legal-vetted plots, premium independent villas, and high-rise apartments in {loc.name}. Featuring direct highway access, premium amenities, and reliable groundwater.
                        </p>
                      </div>
                      <div className="mt-6 md:mt-0 flex items-center justify-between border-t border-border/60 pt-4 md:border-t-0 md:pt-0">
                        <span className="rounded bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
                          {loc.count} Active Properties
                        </span>
                        <span className="text-xs font-semibold text-primary group-hover:underline flex items-center gap-1.5">
                          Explore Locality{" "}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                    {/* Image */}
                    <div className="w-full md:w-2/5 relative h-48 md:h-auto overflow-hidden">
                      <img
                        src={loc.image}
                        alt={loc.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-card via-transparent to-transparent z-10" />
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <FinancialRoiCalculator />

      {/* WHY US - HORIZONTAL STICKY SCROLL SECTION (DESKTOP ONLY) */}
      <section ref={sectionRef} className="hidden lg:block relative h-[250vh] border-b border-border/40">
        <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden bg-background">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-between">
            
            {/* Left side text column */}
            <div className="lg:w-[35%] shrink-0 text-left space-y-4">
              <p className="text-sm font-medium uppercase tracking-wider text-accent select-none">
                Why H and H Realty
              </p>
              <h2 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
                Buying Chennai property shouldn't feel risky.
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                We started H and H Realty after watching too many buyers get burned by fake titles,
                unapproved layouts, and hidden broker charges. Every plot, villa, and home we list is
                lawyer-checked, drone-toured, and backed by a clear paper trail.
              </p>
              <div className="pt-2">
                <Link
                  to="/listings"
                  className="inline-flex items-center justify-center btn-notched-filled text-xs py-3 px-6"
                >
                  <span>See verified listings &rarr;</span>
                </Link>
              </div>
            </div>

            {/* Right side horizontal sliding track */}
            <div className="lg:w-[60%] w-full overflow-hidden py-8 relative">
              {/* Fade masks */}
              <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-r from-background to-transparent hidden lg:block" />
              <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 bg-gradient-to-l from-background to-transparent hidden lg:block" />

              <div
                style={{
                  transform: `translateX(-${scrollProgress * (windowWidth < 1024 ? 75 : 55)}%)`,
                }}
                className="flex gap-6 transition-transform duration-300 ease-out w-fit px-4 lg:px-12"
              >
                {[
                  {
                    t: "Legal due diligence",
                    d: "Patta, Chitta, parent deeds, and EC verified by local real estate attorneys. We check histories for at least 30 years to guarantee zero litigation.",
                  },
                  {
                    t: "Drone + ground tour",
                    d: "Aerial video and on-site walkthrough for every property listing. Inspect boundaries, road layouts, and nearby markers from your screen.",
                  },
                  {
                    t: "Transparent pricing",
                    d: "No hidden charges. The price you see is direct from builders or owners. Any registry and stamp duties are listed clearly upfront.",
                  },
                  {
                    t: "Loan support",
                    d: "Pre-approved financing partners ready when you are. Fast track your documentation check with leading public & private banks.",
                  },
                ].map((b, idx) => {
                  const isActive = idx === activeFeatureIndex;
                  return (
                    <div
                      key={b.t}
                      onClick={() => {
                        if (!sectionRef.current) return;
                        const rect = sectionRef.current.getBoundingClientRect();
                        const parentTop = window.scrollY + rect.top;
                        const totalScroll = rect.height - window.innerHeight;
                        const targetScroll = parentTop + (idx / 3) * totalScroll;
                        window.scrollTo({
                          top: targetScroll,
                          behavior: "smooth",
                        });
                      }}
                      className={`w-[280px] sm:w-[350px] shrink-0 rounded-3xl border p-8 shadow-card transition-all duration-500 cursor-pointer select-none ${
                        isActive
                          ? "bg-card border-accent opacity-100 scale-[1.02] shadow-elevated"
                          : "bg-card/45 border-border/40 opacity-40 scale-[0.98] blur-[0.4px] hover:opacity-75 hover:scale-[1.0]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className={`font-display text-lg sm:text-xl font-bold transition-colors duration-500 ${isActive ? "text-primary" : "text-foreground/80"}`}>{b.t}</h3>
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-xs tracking-wider transition-colors duration-500 ${
                            isActive ? "bg-accent text-accent-foreground shadow-sm animate-pulse" : "bg-muted text-muted-foreground"
                          }`}
                        >
                          0{idx + 1}
                        </div>
                      </div>
                      <p className={`text-xs sm:text-sm leading-relaxed transition-colors duration-500 ${isActive ? "text-muted-foreground" : "text-muted-foreground/60"}`}>{b.d}</p>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* WHY US - NATIVE TOUCH-SWIPING GRID (MOBILE/TABLET ONLY) */}
      <section className="block lg:hidden bg-background py-16 px-4 sm:px-6 border-b border-border/40">
        <div className="mx-auto max-w-3xl flex flex-col gap-10">
          
          {/* Left side text column (Mobile) */}
          <div className="text-left space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-accent select-none">
              Why H and H Realty
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-foreground">
              Buying Chennai property shouldn't feel risky.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              We started H and H Realty after watching too many buyers get burned by fake titles,
              unapproved layouts, and hidden broker charges. Every plot, villa, and home we list is
              lawyer-checked, drone-toured, and backed by a clear paper trail.
            </p>
            <div className="pt-2">
              <Link
                to="/listings"
                className="inline-flex items-center justify-center btn-notched-filled text-[10px] py-2.5 px-6"
              >
                <span>See verified listings &rarr;</span>
              </Link>
            </div>
          </div>

          {/* Right side horizontal sliding track (Swipeable on Mobile) */}
          <div className="w-full">
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory px-2 -mx-2">
              {[
                {
                  t: "Legal due diligence",
                  d: "Patta, Chitta, parent deeds, and EC verified by local real estate attorneys. We check histories for at least 30 years to guarantee zero litigation.",
                },
                {
                  t: "Drone + ground tour",
                  d: "Aerial video and on-site walkthrough for every property listing. Inspect boundaries, road layouts, and nearby markers from your screen.",
                },
                {
                  t: "Transparent pricing",
                  d: "No hidden charges. The price you see is direct from builders or owners. Any registry and stamp duties are listed clearly upfront.",
                },
                {
                  t: "Loan support",
                  d: "Pre-approved financing partners ready when you are. Fast track your documentation check with leading public & private banks.",
                },
              ].map((b, idx) => (
                <div
                  key={b.t}
                  className="w-[280px] sm:w-[320px] shrink-0 rounded-2xl border border-border/80 bg-card p-6 shadow-card snap-align-start transition"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-display text-base font-bold text-primary">{b.t}</h3>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full font-bold text-[10px] tracking-wider bg-accent/10 text-accent border border-accent/20">
                      0{idx + 1}
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-muted-foreground">{b.d}</p>
                </div>
              ))}
            </div>
            {/* Visual indicator for horizontal swipeability */}
            <p className="text-[10px] text-center text-muted-foreground/60 font-medium tracking-wider uppercase mt-3 animate-pulse">
              ← Swipe to view more →
            </p>
          </div>

        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">Buyer stories</p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold sm:text-4xl">
            People we helped buy land with confidence.
          </h2>

          <div className="mt-12 relative max-w-4xl mx-auto overflow-hidden">
            {/* Track container */}
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.name} className="w-full shrink-0 px-2 sm:px-4">
                  <figure className="relative overflow-hidden rounded-3xl bg-background/5 p-8 sm:p-12 backdrop-blur ring-1 ring-background/10 flex flex-col justify-between min-h-[320px] sm:min-h-[280px]">
                    {/* Decorative background double quote mark */}
                    <div className="absolute -top-6 -left-4 text-white/5 font-display text-[15rem] leading-none pointer-events-none select-none">
                      “
                    </div>
                    <div className="relative z-10">
                      <div className="flex gap-1 text-accent mb-6">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-current" />
                        ))}
                      </div>
                      <blockquote className="mt-4 font-display italic text-lg sm:text-xl md:text-2xl leading-relaxed text-white">
                        "{t.quote}"
                      </blockquote>
                    </div>
                    <figcaption className="mt-8 text-sm sm:text-base text-primary-foreground/80 border-t border-white/10 pt-6 relative z-10">
                      <span className="font-semibold text-white">{t.name}</span> · {t.role}
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white transition duration-300 cursor-pointer shadow-sm hover:scale-105"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-500 cursor-pointer ${
                    idx === activeTestimonial ? "w-8 bg-accent" : "w-2.5 bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white transition duration-300 cursor-pointer shadow-sm hover:scale-105"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* LEGAL FAQ ACCORDION SECTION */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-b border-border/40">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">FAQ</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            Legal Due Diligence & Buying Process
          </h2>
          <p className="mt-3 text-muted-foreground font-medium">
            Transparent answers to common questions about purchasing land, villas, or flats near
            Chennai.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full mt-8 divide-y divide-border/60">
          {[
            {
              q: "What is a Patta, and why is it important in Chennai?",
              a: "A Patta is a government record proving land ownership. In Chennai, we verify that the Patta is registered in the seller's name, has no encumbrances, and that the survey number perfectly matches the title deed.",
            },
            {
              q: "What is an Encumbrance Certificate (EC), and how many years do you verify?",
              a: "A EC lists all registered transactions (mortgages, sales, leases) on a property. We verify the EC at the sub-registrar office for at least 30 years to check for past transactions, disputes, or liabilities.",
            },
            {
              q: "Are the villas, apartments, and layouts TNRERA approved?",
              a: "Yes. Every built property listed (Villas, Apartments) and plotting layout has DTCP (Directorate of Town and Country Planning) or CMDA (Chennai Metropolitan Development Authority) approval and is registered under TNRERA where applicable.",
            },
            {
              q: "Do you offer legal and registration assistance?",
              a: "Absolutely. We provide legal title reports prepared by independent property lawyers. We also coordinate site measurements, stamp duty estimations, and guide you through the registration process at the Sub-Registrar's Office.",
            },
            {
              q: "Are there any hidden agent/brokerage charges?",
              a: "No. H and H Realty prides itself on 100% price transparency. The pricing shown is set direct-from-owner or builder. There are zero hidden brokerage markups. Any government taxes or registry fees are estimated upfront.",
            },
          ].map((faq, idx) => (
            <AccordionItem key={idx} value={`faq-${idx}`} className="border-none py-2.5">
              <AccordionTrigger className="text-base font-semibold hover:no-underline hover:text-primary transition-colors py-4 font-sans text-left">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-sm pt-2 pb-4 font-sans max-w-3xl">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-secondary p-10 md:p-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">
                Find your dream home or plot this weekend.
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Book a free site visit and we'll arrange transport, property walk-through, and legal
                Q&A with our local advisors.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center btn-notched-filled text-xs py-3 px-6"
              >
                <span>Book site visit</span>
              </Link>
              <a
                href="tel:+919876543210"
                className="inline-flex items-center justify-center gap-2 btn-notched text-xs py-3 px-6"
              >
                <Phone className="h-4 w-4 shrink-0 relative z-10" /> <span>+91 98765 43210</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
