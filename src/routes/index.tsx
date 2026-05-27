import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/context/language-context";
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
})

function Home() {
  const featured = listings.filter((l) => l.status !== "Sold").slice(0, 10);
  const { language, t } = useLanguage();

  return (
    <div>
      <HeroSection />

      {/* TRUST STRIP */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 text-sm sm:grid-cols-4 sm:px-6 lg:px-8">
          {[
            { i: ShieldCheck, t: t("trust.registered") },
            { i: FileCheck2, t: t("trust.verified") },
            { i: Sparkles, t: t("trust.drone") },
            { i: TrendingUp, t: t("trust.loan") },
          ].map((b) => (
            <div key={b.t} className="flex items-center gap-3 text-foreground">
              <b.i className="h-5 w-5 text-primary" />
              <span className="font-semibold">{b.t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* LIVE VERIFICATION TICKER MARQUEE */}
      <section aria-label="Recent property verifications" className="bg-transparent text-foreground py-3.5 overflow-hidden border-y border-border/70 select-none">
        <div className="flex w-full overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex items-center gap-12 text-[10px] font-bold tracking-widest uppercase">
            {(language === "en" ? [
              "ECR Road: 4 BHK Villa Title Search Cleared",
              "Tambaram West: Plot registration support completed",
              "GST Road Corridor: 2.5 Grounds Commercial Land DTCP approved",
              "Oragadam Hub: Investment parcel legal due-diligence report ready",
              "Velachery & Adyar: 112 Active verification files logged",
              "Sriperumbudur: 1 Acre Farmland Patta transfer completed",
              "Neelankarai: Ocean Breeze Villa RERA registration certified",
              "Perungudi: WTC suites lawyer-vetted papers delivered",
            ] : [
              "ஈசிஆர் சாலை: 4 BHK வில்லா பத்திரம் சரிபார்க்கப்பட்டது",
              "தாம்பரம் மேற்கு: மனை பதிவு வெற்றிகரமாக முடிந்தது",
              "ஜிஎஸ்டி சாலை: 2.5 கிரவுண்ட் வணிக நிலம் DTCP அங்கீகரிக்கப்பட்டது",
              "ஒரகடம் ஹப்: முதலீட்டு நில சட்டபூர்வ அறிக்கை தயார்",
              "வேளச்சேரி & அடையார்: 112 செயலில் உள்ள சரிபார்ப்பு கோப்புகள் பதிவாகியுள்ளன",
              "ஸ்ரீபெரும்புதூர்: 1 ஏக்கர் விவசாய நில பட்டா மாற்றம் முடிந்தது",
              "நீலாங்கரை: ஓஷன் பிரீஸ் வில்லா RERA பதிவு சான்றளிக்கப்பட்டது",
              "பெருங்குடி: WTC அடுக்குமாடி வழக்கறிஞரால் சரிபார்க்கப்பட்ட ஆவணங்கள் வழங்கப்பட்டன",
            ]).map((text, idx) => (
              <span key={idx} className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-foreground/80 font-bold tracking-wide">{text}</span>
                <span className="rounded bg-accent/15 px-2 py-0.5 text-[9px] font-extrabold text-accent border border-accent/25">
                  {language === "en" ? "LATEST LOG" : "புதிய தகவல்"}
                </span>
              </span>
            ))}
            {/* Duplicate for infinite loop */}
            {(language === "en" ? [
              "ECR Road: 4 BHK Villa Title Search Cleared",
              "Tambaram West: Plot registration support completed",
              "GST Road Corridor: 2.5 Grounds Commercial Land DTCP approved",
              "Oragadam Hub: Investment parcel legal due-diligence report ready",
              "Velachery & Adyar: 112 Active verification files logged",
              "Sriperumbudur: 1 Acre Farmland Patta transfer completed",
              "Neelankarai: Ocean Breeze Villa RERA registration certified",
              "Perungudi: WTC suites lawyer-vetted papers delivered",
            ] : [
              "ஈசிஆர் சாலை: 4 BHK வில்லா பத்திரம் சரிபார்க்கப்பட்டது",
              "தாம்பரம் மேற்கு: மனை பதிவு வெற்றிகரமாக முடிந்தது",
              "ஜிஎஸ்டி சாலை: 2.5 கிரவுண்ட் வணிக நிலம் DTCP அங்கீகரிக்கப்பட்டது",
              "ஒரகடம் ஹப்: முதலீட்டு நில சட்டபூர்வ அறிக்கை தயார்",
              "வேளச்சேரி & அடையார்: 112 செயலில் உள்ள சரிபார்ப்பு கோப்புகள் பதிவாகியுள்ளன",
              "ஸ்ரீபெரும்புதூர்: 1 ஏக்கர் விவசாய நில பட்டா மாற்றம் முடிந்தது",
              "நீலாங்கரை: ஓஷன் பிரீஸ் வில்லா RERA பதிவு சான்றளிக்கப்பட்டது",
              "பெருங்குடி: WTC அடுக்குமாடி வழக்கறிஞரால் சரிபார்க்கப்பட்ட ஆவணங்கள் வழங்கப்பட்டன",
            ]).map((text, idx) => (
              <span key={`dup-${idx}`} aria-hidden="true" className="flex items-center gap-3">
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-foreground/80 font-bold tracking-wide">{text}</span>
                <span className="rounded bg-accent/15 px-2 py-0.5 text-[9px] font-extrabold text-accent border border-accent/25">
                  {language === "en" ? "LATEST LOG" : "புதிய தகவல்"}
                </span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* BENTO GRID - PROPERTY TYPES */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 bg-background border-b border-border/40">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            {language === "en" ? "Categories" : "வகைகள்"}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            {t("bento.title")}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {t("bento.desc")}
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
                    {language === "en" ? "Highly Demanded" : "அதிக தேவை உள்ளது"}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {t("bento.plots")}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {t("bento.plotsDesc")}
                  </p>
                </div>
                <div className="mt-6 md:mt-0 flex items-center gap-4">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {listings.filter((l) => l.category === "Plots / Land").length} {language === "en" ? "Properties" : "சொத்துக்கள்"}
                  </span>
                  <span className="text-xs font-semibold text-primary group-hover:underline flex items-center gap-1">
                    {language === "en" ? "Explore Plots" : "நிலங்களை காண்க"} <ArrowRight className="h-3.5 w-3.5" />
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
                  {language === "en" ? "Luxury Living" : "ஆடம்பர வாழ்க்கை"}
                </span>
                <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {t("bento.villas")}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {t("bento.villasDesc")}
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
                  {listings.filter((l) => l.type === "Villa").length} {language === "en" ? "Properties" : "சொத்துக்கள்"}
                </span>
                <span className="text-xs font-semibold text-primary group-hover:underline flex items-center gap-1">
                  {language === "en" ? "View Villas" : "வில்லாக்களை காண்க"} <ArrowRight className="h-3.5 w-3.5" />
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
                  {language === "en" ? "Urban Lifestyle" : "நகர்ப்புற வாழ்க்கை"}
                </span>
                <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {t("bento.apartments")}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {t("bento.apartmentsDesc")}
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
                  {listings.filter((l) => l.type === "Apartment / Flat").length} {language === "en" ? "Properties" : "சொத்துக்கள்"}
                </span>
                <span className="text-xs font-semibold text-primary group-hover:underline flex items-center gap-1">
                  {language === "en" ? "Explore Apartments" : "அடுக்குமாடிகளை காண்க"} <ArrowRight className="h-3.5 w-3.5" />
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
                  {language === "en" ? "Weekend Retreat" : "வார இறுதி ஓய்விடம்"}
                </span>
                <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {t("bento.farmhouses")}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {t("bento.farmhousesDesc")}
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
                  {listings.filter((l) => l.type === "Farmhouse").length} {language === "en" ? "Properties" : "சொத்துக்கள்"}
                </span>
                <span className="text-xs font-semibold text-primary group-hover:underline flex items-center gap-1">
                  {language === "en" ? "View Farmhouses" : "பண்ணை வீடுகளை காண்க"} <ArrowRight className="h-3.5 w-3.5" />
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
            <p className="text-sm font-medium uppercase tracking-wider text-accent">
              {language === "en" ? "Featured" : "சிறப்பு அம்சங்கள்"}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              {t("featured.title")}
            </h2>
          </div>
          <Link
            to="/listings"
            className="text-sm font-semibold text-primary hover:underline whitespace-nowrap"
          >
            {t("featured.viewAll")}
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
              {language === "en" ? "Popular locations" : "பிரபலமான இடங்கள்"}
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              {language === "en" ? "Where buyers are looking" : "வாங்குபவர்கள் தேடும் இடங்கள்"}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {language === "en" 
                ? "Explore listings across Chennai's highest growth corridors and established residential hubs."
                : "சென்னையின் அதிவேக வளர்ச்சிப் பகுதிகள் மற்றும் குடியிருப்பு மையங்களில் உள்ள சொத்துக்களை ஆராயுங்கள்."}
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
                          {language === "en" ? "Chennai Growth Corridor" : "சென்னை வளர்ச்சி பகுதி"}
                        </span>
                        <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {loc.name}
                        </h3>
                        <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-2 md:line-clamp-3">
                          {language === "en" 
                            ? `Discover legal-vetted plots, premium independent villas, and high-rise apartments in ${loc.name}. Featuring direct highway access, premium amenities, and reliable groundwater.`
                            : `${loc.name} இல் சரிபார்க்கப்பட்ட நிலங்கள், பிரீமியம் தனித்தனி வில்லாக்கள் மற்றும் அடுக்குமாடி குடியிருப்புகளைக் கண்டறியுங்கள். நேரடி நெடுஞ்சாலை அணுகல், பிரீமியம் வசதிகள் மற்றும் சிறந்த நிலத்தடி நீர் வசதியுடன்.`}
                        </p>
                      </div>
                      <div className="mt-6 md:mt-0 flex items-center justify-between border-t border-border/60 pt-4 md:border-t-0 md:pt-0">
                        <span className="rounded bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
                          {loc.count} {language === "en" ? "Active Properties" : "செயலில் உள்ள சொத்துக்கள்"}
                        </span>
                        <span className="text-xs font-semibold text-primary group-hover:underline flex items-center gap-1.5">
                          {language === "en" ? "Explore Locality" : "பகுதியை ஆராயுங்கள்"}{" "}
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

      <WhyUsSection />

      {/* WHY US - NATIVE TOUCH-SWIPING GRID (MOBILE/TABLET ONLY) */}
      <section className="block lg:hidden bg-background py-16 px-4 sm:px-6 border-b border-border/40">
        <div className="mx-auto max-w-3xl flex flex-col gap-10">
          
          {/* Left side text column (Mobile) */}
          <div className="text-left space-y-4">
            <p className="text-xs font-bold uppercase tracking-widest text-accent select-none">
              {language === "en" ? "Why H and H Realty" : "ஏன் H and H Realty"}
            </p>
            <h2 className="font-display text-3xl font-bold leading-tight text-foreground">
              {language === "en" ? "Buying Chennai property shouldn't feel risky." : "சென்னை சொத்து வாங்குவது ஆபத்தானதாக இருக்கக்கூடாது."}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              {language === "en"
                ? "We started H and H Realty after watching too many buyers get burned by fake titles, unapproved layouts, and hidden broker charges. Every plot, villa, and home we list is lawyer-checked, drone-toured, and backed by a clear paper trail."
                : "போலி பத்திரங்கள் மற்றும் மறைமுக தரகு கட்டணங்களால் வாங்குபவர்கள் ஏமாறுவதைத் தடுத்திட H and H Realty-ஐத் தொடங்கினோம். நாங்கள் பட்டியலிடும் ஒவ்வொரு நிலமும், வில்லாவும் சட்டப்பூர்வமாக சரிபார்க்கப்பட்டு, ட்ரோன் தணிக்கை செய்யப்பட்டுள்ளது."}
            </p>
            <div className="pt-2">
              <Link
                to="/listings"
                className="inline-flex items-center justify-center btn-notched-filled text-[10px] py-2.5 px-6"
              >
                <span>{language === "en" ? "See verified listings" : "சரிபார்க்கப்பட்ட பட்டியல்களைக் காண்க"} &rarr;</span>
              </Link>
            </div>
          </div>

          {/* Right side horizontal sliding track (Swipeable on Mobile) */}
          <div className="w-full">
            <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-none snap-x snap-mandatory px-2 -mx-2">
              {[
                {
                  t: language === "en" ? "Legal due diligence" : "சட்டபூர்வ சரிபார்ப்பு",
                  d: language === "en" 
                    ? "Patta, Chitta, parent deeds, and EC verified by local real estate attorneys. We check histories for at least 30 years to guarantee zero litigation."
                    : "பட்டா, சிட்டா, தாய் பத்திரம் மற்றும் வில்லங்கச் சான்றிதழ் ஆகியவை உள்ளூர் ரியல் எஸ்டேட் வழக்கறிஞர்களால் சரிபார்க்கப்படுகின்றன. 30 ஆண்டுகால வரலாறுகளை நாங்கள் சரிபார்க்கிறோம்.",
                },
                {
                  t: language === "en" ? "Drone + ground tour" : "ட்ரோன் + நேரடி தணிக்கை",
                  d: language === "en"
                    ? "Aerial video and on-site walkthrough for every property listing. Inspect boundaries, road layouts, and nearby markers from your screen."
                    : "ஒவ்வொரு சொத்து பட்டியலுக்கும் வான்வழி வீடியோ மற்றும் நேரடி தணிக்கை. எல்லைகள், சாலைகள் மற்றும் அடையாளங்களை உங்கள் திரையிலிருந்து சரிபார்க்கவும்.",
                },
                {
                  t: language === "en" ? "Transparent pricing" : "வெளிப்படையான விலை",
                  d: language === "en"
                    ? "No hidden charges. The price you see is direct from builders or owners. Any registry and stamp duties are listed clearly upfront."
                    : "மறைமுக கட்டணங்கள் இல்லை. நீங்கள் பார்க்கும் விலை நேரடியாக உருவாக்குபவர்கள் அல்லது உரிமையாளர்களிடமிருந்து பெறப்பட்டது.",
                },
                {
                  t: language === "en" ? "Loan support" : "வங்கி கடன் உதவி",
                  d: language === "en"
                    ? "Pre-approved financing partners ready when you are. Fast track your documentation check with leading public & private banks."
                    : "முன்னணி பொது மற்றும் தனியார் வங்கிகளுடன் உங்கள் ஆவணச் சரிபார்ப்பை விரைவாக முடித்து கடன் பெற உதவுகிறோம்.",
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
              {language === "en" ? "← Swipe to view more →" : "← மேலும் காண ஸ்வைப் செய்யவும் →"}
            </p>
          </div>

        </div>
      </section>

      <TestimonialsSection />

      {/* LEGAL FAQ ACCORDION SECTION */}
      <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 md:py-24 lg:px-8 border-b border-border/40">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">
            {language === "en" ? "FAQ" : "கேள்வி பதில்"}
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
            {t("faq.title")}
          </h2>
          <p className="mt-3 text-muted-foreground font-medium">
            {t("faq.subtitle")}
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full mt-8 divide-y divide-border/60">
          {[
            {
              q: language === "en" ? "What is a Patta, and why is it important in Chennai?" : "பட்டா என்றால் என்ன, அது சென்னையில் ஏன் முக்கியமானது?",
              a: language === "en"
                ? "A Patta is a government record proving land ownership. In Chennai, we verify that the Patta is registered in the seller's name, has no encumbrances, and that the survey number perfectly matches the title deed."
                : "பட்டா என்பது நிலத்தின் உரிமையை நிரூபிக்கும் அரசு ஆவணமாகும். சென்னையில், பட்டா விற்பனையாளரின் பெயரில் உள்ளதா, வில்லங்கங்கள் ஏதும் இல்லை என்பதை உறுதிசெய்கிறோம்.",
            },
            {
              q: language === "en" ? "What is an Encumbrance Certificate (EC), and how many years do you verify?" : "வில்லங்கச் சான்றிதழ் (EC) என்றால் என்ன, எத்தனை ஆண்டுகள் சரிபார்க்கிறீர்கள்?",
              a: language === "en"
                ? "A EC lists all registered transactions (mortgages, sales, leases) on a property. We verify the EC at the sub-registrar office for at least 30 years to check for past transactions, disputes, or liabilities."
                : "வில்லங்கச் சான்றிதழ் என்பது ஒரு சொத்தின் மீதான அனைத்துப் பதிவுகளையும் (கடன், விற்பனை, குத்தகை) பட்டியலிடுகிறது. 30 ஆண்டுகால EC-ஐ நாங்கள் சரிபார்க்கிறோம்.",
            },
            {
              q: language === "en" ? "Are the villas, apartments, and layouts TNRERA approved?" : "வில்லாக்கள், அடுக்குமாடி குடியிருப்புகள் மற்றும் நிலங்கள் TNRERA அங்கீகரிக்கப்பட்டதா?",
              a: language === "en"
                ? "Yes. Every built property listed (Villas, Apartments) and plotting layout has DTCP (Directorate of Town and Country Planning) or CMDA (Chennai Metropolitan Development Authority) approval and is registered under TNRERA where applicable."
                : "ஆம். பட்டியலிடப்பட்டுள்ள ஒவ்வொரு சொத்தும் மற்றும் நிலமும் DTCP அல்லது CMDA அங்கீகாரம் மற்றும் TNRERA பதிவு ஆகியவற்றைக் கொண்டுள்ளது.",
            },
            {
              q: language === "en" ? "Do you offer legal and registration assistance?" : "சட்ட மற்றும் பதிவு உதவிகளை வழங்குகிறீர்களா?",
              a: language === "en"
                ? "Absolutely. We provide legal title reports prepared by independent property lawyers. We also coordinate site measurements, stamp duty estimations, and guide you through the registration process at the Sub-Registrar's Office."
                : "நிச்சயமாக. தனிப்பட்ட சொத்து வழக்கறிஞர்களால் தயாரிக்கப்பட்ட சட்ட அறிக்கைகளை நாங்கள் வழங்குகிறோம். மேலும் சார்பதிவாளர் அலுவலகப் பதிவு வரை முழுமையாக உதவுகிறோம்.",
            },
            {
              q: language === "en" ? "Are there any hidden agent/brokerage charges?" : "மறைமுக தரகு அல்லது ஏஜென்ட் கட்டணங்கள் ஏதேனும் உண்டா?",
              a: language === "en"
                ? "No. H and H Realty prides itself on 100% price transparency. The pricing shown is set direct-from-owner or builder. There are zero hidden brokerage markups. Any government taxes or registry fees are estimated upfront."
                : "இல்லை. H and H Realty 100% விலை வெளிப்படைத்தன்மையில் பெருமை கொள்கிறது. விலையானது நேரடியாக உரிமையாளர் அல்லது உருவாக்குநரால் நிர்ணயிக்கப்பட்டது.",
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
        <div className="overflow-hidden rounded-3xl bg-secondary p-6 sm:p-10 md:p-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">
                {language === "en" ? "Find your dream home or plot this weekend." : "இந்த வார இறுதியில் உங்கள் கனவு இல்லம் அல்லது நிலத்தைக் கண்டறியுங்கள்."}
              </h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                {language === "en" 
                  ? "Book a free site visit and we'll arrange transport, property walk-through, and legal Q&A with our local advisors."
                  : "இலவச தளம் பார்வையிட முன்பதிவு செய்யுங்கள். போக்குவரத்து மற்றும் சட்ட தணிக்கை ஆலோசனைகளை நாங்கள் ஏற்பாடு செய்வோம்."}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center btn-notched-filled text-xs py-3 px-6"
              >
                <span>{language === "en" ? "Book site visit" : "தளத்தை பார்வையிட"}</span>
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

// ==========================================
// Isolated Sub-components for Peak Performance
// ==========================================

function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % SLIDER_IMAGES.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-[oklch(0.96_0.012_240)] pt-14 sm:pt-24 pb-16 px-0">
      
      {/* Main Slider Container - Full Bleed Viewport Width */}
      <div className="w-full relative overflow-hidden flex flex-col items-center justify-center min-h-[580px] md:min-h-[680px] shadow-elevated bg-slate-950">
        
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
                  alt={t(`slider.title.${idx}`)}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
          {/* Slate gradient dark overlay to guarantee extreme legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/65 to-slate-950/35 z-10" />
        </div>

        {/* Inner Content Grid - Aligned perfectly with max-w-7xl coordinates */}
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 relative z-20 flex flex-col lg:flex-row items-stretch justify-between gap-12 py-16 md:py-24">
          
          {/* Left Column: Wording & Direct Conversion anchors */}
          <div className="w-full lg:w-[48%] flex flex-col justify-between gap-8 z-20 relative">
            <div className="flex flex-col gap-3">
              <span className="text-[11px] uppercase tracking-widest text-accent font-extrabold font-sans">
                {t("hero.subtitle")}
              </span>
              <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] text-white tracking-tight">
                {t("hero.title")}
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans max-w-lg mt-2">
                {t("hero.desc")}
              </p>
            </div>

            {/* CTAs and trust indicators */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/listings"
                  className="inline-flex btn-notched-filled text-[10px] py-3.5 px-8 shadow-lg hover:scale-105 transition-all duration-300 animate-pulse-subtle"
                >
                  <span>{t("hero.browse")} &rarr;</span>
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex btn-notched text-[10px] py-3.5 px-8 border-white/20 text-white hover:bg-white hover:text-slate-950 transition-all duration-300 shadow-md"
                >
                  <span>{t("hero.bookVisit")} &rarr;</span>
                </Link>
              </div>

              {/* Elegant Trust badges row */}
              <div className="flex flex-wrap gap-3 select-none">
                {[
                  t("hero.vetted"),
                  t("hero.approved"),
                  t("hero.patta"),
                ].map((badge, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md px-3.5 py-2 text-[9px] font-bold text-white shadow-sm"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    {badge}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Slide detail context & Manual Nav arrows */}
          <div className="w-full lg:w-[48%] flex flex-col items-center lg:items-end justify-between self-stretch z-20 text-center lg:text-right py-2 lg:py-0 relative">
            
            {/* Dynamic Slide Info overlay */}
            <div className="hidden lg:flex flex-col items-end gap-2 bg-slate-950/40 backdrop-blur-sm p-8 rounded-3xl border border-white/5 max-w-sm transition-all duration-500 animate-fade-in self-end my-auto">
              <span className="text-[10px] uppercase tracking-widest text-accent font-extrabold font-sans">
                {t("hero.activeHighlight")}
              </span>
              <h3 className="font-display text-xl font-bold text-white leading-tight">
                {t(`slider.title.${currentImageIndex}`)}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {t(`slider.desc.${currentImageIndex}`)}
              </p>
            </div>

            {/* Slider Manual Controls & Dot Indicators */}
            <div className="flex items-center gap-4 mt-4 lg:mt-0 select-none self-center lg:self-end">
              {/* Arrow Left */}
              <button
                onClick={() => setCurrentImageIndex((prev) => (prev - 1 + SLIDER_IMAGES.length) % SLIDER_IMAGES.length)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 border border-white/10 hover:bg-white text-white hover:text-slate-950 transition duration-300 cursor-pointer shadow-md"
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
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 border border-white/10 hover:bg-white text-white hover:text-slate-950 transition duration-300 cursor-pointer shadow-md"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Quick categories navigation columns (constrained to standard page container limits) */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: t("categories.metro.title"),
              desc: t("categories.metro.desc"),
              link: { category: "Apartments" as const },
            },
            {
              title: t("categories.seaside.title"),
              desc: t("categories.seaside.desc"),
              link: { category: "Villas & Homes" as const },
            },
            {
              title: t("categories.mountain.title"),
              desc: t("categories.mountain.desc"),
              link: { category: "Farmhouses" as const },
            },
            {
              title: t("categories.historic.title"),
              desc: t("categories.historic.desc"),
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
                <span>{t("hero.exploreNow")}</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

    </section>
  );
}

function WhyUsSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

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
    <section ref={sectionRef} className="hidden lg:block relative h-[250vh] border-b border-border/40">
      <div className="sticky top-0 flex h-screen w-full items-center overflow-hidden bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row gap-12 lg:gap-16 items-center justify-between">
          
          {/* Left side text column */}
          <div className="lg:w-[35%] shrink-0 text-left space-y-4">
            <p className="text-sm font-medium uppercase tracking-wider text-accent select-none">
              {t("whyUs.badge")}
            </p>
            <h2 className="font-display text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              {t("whyUs.title")}
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              {t("whyUs.desc")}
            </p>
            <div className="pt-2">
              <Link
                to="/listings"
                className="inline-flex items-center justify-center btn-notched-filled text-xs py-3 px-6"
              >
                <span>{t("whyUs.cta")} &rarr;</span>
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
                  t: t("whyUs.card.title.0"),
                  d: t("whyUs.card.desc.0"),
                },
                {
                  t: t("whyUs.card.title.1"),
                  d: t("whyUs.card.desc.1"),
                },
                {
                  t: t("whyUs.card.title.2"),
                  d: t("whyUs.card.desc.2"),
                },
                {
                  t: t("whyUs.card.title.3"),
                  d: t("whyUs.card.desc.3"),
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
  );
}

function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { t } = useLanguage();

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

  return (
    <section className="bg-primary text-primary-foreground py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-medium uppercase tracking-wider text-accent">{t("testimonials.badge")}</p>
        <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold sm:text-4xl">
          {t("testimonials.title")}
        </h2>

        <div className="mt-12 relative max-w-4xl mx-auto overflow-hidden">
          {/* Track container */}
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
          >
            {testimonials.map((tItem, idx) => (
              <div key={tItem.name} className="w-full shrink-0 px-2 sm:px-4">
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
                      "{t(`testimonials.quote.${idx}`)}"
                    </blockquote>
                  </div>
                  <figcaption className="mt-8 text-sm sm:text-base text-primary-foreground/80 border-t border-white/10 pt-6 relative z-10">
                    <span className="font-semibold text-white">{tItem.name}</span> · {t(`testimonials.role.${idx}`)}
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
            aria-label={t("testimonials.prev")}
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
            aria-label={t("testimonials.next")}
            className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white transition duration-300 cursor-pointer shadow-sm hover:scale-105"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
