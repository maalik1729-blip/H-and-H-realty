import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import {
  MapPin,
  BadgeCheck,
  FileCheck2,
  Phone,
  MessageCircle,
  Calendar,
  Maximize2,
  Route as RouteIcon,
  Building2,
  Play,
  Armchair,
  Home as HomeIcon,
  ChevronLeft,
  Star,
  ShieldCheck,
  Share2,
  Heart,
  ArrowRight,
  CheckCircle2,
  Landmark,
  TreePine,
  Zap,
  Droplets,
} from "lucide-react";
import {
  listings,
  type Listing,
  formatPrice,
  PROPERTY_TYPE_DESCRIPTIONS,
  isBuiltProperty,
  testimonials,
} from "@/lib/listings";
import LocationConnectivityMap from "@/components/location-connectivity-map";

export const Route = createFileRoute("/listings/$id")({
  loader: ({ params }): Listing => {
    const l = listings.find((x) => x.id === params.id);
    if (!l) throw notFound();
    return l;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} in ${loaderData.location} — H and H Realty Chennai` },
          {
            name: "description",
            content: `${loaderData.areaLabel} ${loaderData.type.toLowerCase()} at ${loaderData.location}, ${loaderData.city}. Price: ${formatPrice(loaderData.priceLakh)}. Verified title. Legal documentation ready.`,
          },
          { property: "og:image", content: loaderData.image },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-secondary">
        <HomeIcon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h1 className="font-display text-3xl font-bold">Property Not Found</h1>
      <p className="mt-3 text-muted-foreground">
        This listing may have been sold, reserved, or removed. Browse our other verified properties.
      </p>
      <Link
        to="/listings"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition"
      >
        <ArrowRight className="h-4 w-4" /> Browse All Properties
      </Link>
    </div>
  ),
  component: Detail,
});

function Detail() {
  const l = Route.useLoaderData() as Listing;
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);
  const whatsapp = `https://wa.me/919876543210?text=${encodeURIComponent(
    `Hi H&H Realty, I'm interested in ${l.title} (ID: ${l.id}) at ${l.location}. Please share more details.`
  )}`;

  // Related properties (same city, different id, max 3)
  const related = listings
    .filter((x) => x.city === l.city && x.id !== l.id && x.status !== "Sold")
    .slice(0, 3);

  // Build specs
  const specs = [
    { icon: Maximize2, label: "Area", value: l.areaLabel.split(" (")[0] },
    {
      icon: RouteIcon,
      label: isBuiltProperty(l.category) ? "Furnishing" : "Road Access",
      value: isBuiltProperty(l.category) ? l.furnishing || "Semi-Furnished" : l.roadAccess,
    },
    { icon: Building2, label: "Ownership", value: l.ownership },
    { icon: FileCheck2, label: "Status", value: l.status },
    { icon: Landmark, label: "Type", value: l.type },
    { icon: ShieldCheck, label: "Title", value: l.verified ? "Verified ✓" : "Under Review" },
  ];

  if (isBuiltProperty(l.category)) {
    if (l.bedrooms) specs.push({ icon: HomeIcon, label: "Bedrooms", value: `${l.bedrooms} BHK` });
    if (l.bathrooms) specs.push({ icon: Armchair, label: "Bathrooms", value: `${l.bathrooms} Bath` });
    if (l.floors) specs.push({ icon: Building2, label: "Floors", value: `${l.floors} Floors` });
  }

  const amenities = [
    { icon: Zap, label: "24/7 Electricity" },
    { icon: Droplets, label: "Water Supply" },
    { icon: TreePine, label: "Green Cover" },
    { icon: ShieldCheck, label: "Gated Security" },
    { icon: RouteIcon, label: "Road Access" },
    { icon: Landmark, label: "Bank Loan Ready" },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* ── Breadcrumb ── */}
      <div className="mx-auto max-w-7xl px-4 pt-24 md:pt-28 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition">Home</Link>
            <span>/</span>
            <Link to="/listings" className="hover:text-primary transition">Properties</Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-[200px]">{l.title}</span>
          </nav>
          <Link
            to="/listings"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition font-medium"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Properties
          </Link>
        </div>
      </div>

      {/* ── Gallery ── */}
      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <div className="grid gap-3 md:grid-cols-3 rounded-3xl overflow-hidden">
          {/* Main image */}
          <div className="md:col-span-2 relative overflow-hidden rounded-2xl group">
            <img
              src={l.image}
              alt={l.title}
              className="h-[280px] w-full object-cover md:h-[480px] transition-transform duration-700 group-hover:scale-[1.02]"
            />
            {/* Status overlay */}
            {l.status === "Sold" && (
              <div className="absolute inset-0 grid place-items-center bg-foreground/50">
                <span className="rounded-full bg-destructive px-6 py-2 text-sm font-bold tracking-widest text-white uppercase shadow-lg">
                  SOLD
                </span>
              </div>
            )}
            {/* Badges */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-background/95 border border-border/40 px-3 py-1 text-[10px] font-bold tracking-wider uppercase shadow-sm">
                New Listing
              </span>
              {l.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-accent px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-accent-foreground shadow-sm">
                  <BadgeCheck className="h-3 w-3" /> Lawyer Vetted
                </span>
              )}
            </div>
            {/* Share & Save */}
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                type="button"
                onClick={() => setSaved((v) => !v)}
                className={`flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition ${saved ? "bg-destructive border-destructive text-white" : "bg-background/90 border-border/40 text-foreground hover:bg-background"}`}
              >
                <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
              </button>
              <button
                type="button"
                onClick={() => navigator.share?.({ title: l.title, url: window.location.href })}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-background/90 border border-border/40 text-foreground hover:bg-background shadow-sm transition"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Side thumbnails */}
          <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={l.image}
                alt={`${l.title} view 2`}
                className="h-[130px] w-full object-cover md:h-[233px] hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-foreground cursor-pointer group">
              <img
                src={l.image}
                alt={`${l.title} drone view`}
                className="h-[130px] w-full object-cover md:h-[233px] opacity-60 group-hover:opacity-50 transition"
              />
              <div className="absolute inset-0 grid place-items-center">
                <div className="flex flex-col items-center gap-2">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-background/90 text-primary shadow-lg">
                    <Play className="h-6 w-6 fill-current" />
                  </span>
                  <span className="rounded-full bg-foreground/80 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-background">
                    Drone Tour
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Quick CTA Bar (hidden on lg where sidebar is visible) ── */}
      <div className="lg:hidden mx-auto max-w-7xl px-4 pt-5 sm:px-6">
        <div className="grid grid-cols-2 gap-3">
          <a
            href="tel:+919876543210"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition shadow-sm"
          >
            <Phone className="h-4 w-4" /> Call Agent
          </a>
          <a
            href={whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3 text-sm font-bold text-whatsapp-foreground hover:opacity-90 transition shadow-sm"
          >
            <MessageCircle className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>

      {/* ── Main Content Grid ── */}
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">

          {/* ── LEFT COLUMN ── */}
          <div className="space-y-10">

            {/* Title + Price block */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="rounded-full bg-secondary border border-border/50 px-3 py-1 text-xs font-semibold text-foreground/80">
                    {l.type}
                  </span>
                  {l.rera && (
                    <span className="rounded-full bg-secondary border border-border/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                      RERA: {l.rera}
                    </span>
                  )}
                  {l.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-accent/15 border border-accent/30 px-3 py-1 text-xs font-semibold text-accent">
                      <ShieldCheck className="h-3.5 w-3.5" /> Title Verified
                    </span>
                  )}
                </div>
                <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl text-foreground">
                  {l.title}
                </h1>
                <p className="mt-2 flex items-center gap-1.5 text-muted-foreground text-sm">
                  <MapPin className="h-4 w-4 text-accent shrink-0" />
                  {l.location}, {l.city}
                </p>
              </div>
              <div className="shrink-0 text-right sm:text-left">
                <p className="font-display text-3xl font-bold text-foreground">
                  {formatPrice(l.priceLakh)}
                </p>
                {l.pricePerSqft && (
                  <p className="text-xs text-muted-foreground mt-1">
                    ₹{l.pricePerSqft.toLocaleString()} / sqft
                  </p>
                )}
              </div>
            </div>

            {/* Specs grid */}
            <div className="rounded-3xl border border-slate-100 bg-card overflow-hidden shadow-card">
              <div className="bg-slate-50/75 border-b border-slate-100 px-6 py-4">
                <h2 className="font-sans text-[11px] font-extrabold text-foreground uppercase tracking-widest">
                  Property Specifications
                </h2>
              </div>
              <div className="divide-y divide-slate-100">
                {specs.map((s, i) => (
                  <div key={i} className={`flex items-center justify-between px-6 py-3.5 text-xs ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                    <div className="flex items-center gap-2">
                      <s.icon className="h-4 w-4 text-accent shrink-0" />
                      <span className="font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
                        {s.label}
                      </span>
                    </div>
                    <span className="font-semibold text-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* About this property */}
            <section>
              <div className="rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 mb-5 flex items-start gap-3">
                <BadgeCheck className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <p className="text-sm text-foreground font-medium leading-relaxed">
                  {PROPERTY_TYPE_DESCRIPTIONS[l.type]}
                </p>
              </div>
              <h2 className="font-display text-2xl font-bold text-foreground">About This Property</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{l.description}</p>
              <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                {l.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-foreground">
                    <CheckCircle2 className="h-4 w-4 text-accent shrink-0" /> {h}
                  </li>
                ))}
              </ul>
            </section>

            {/* Amenities */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {amenities.map((a, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground"
                  >
                    <a.icon className="h-4 w-4 text-accent shrink-0" />
                    {a.label}
                  </div>
                ))}
              </div>
            </section>

            {/* Legal Documents */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Legal &amp; Documents
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  "Mother deed — 30-year verified",
                  "Encumbrance certificate (EC) clear",
                  "Patta & mutation completed",
                  "DTCP / TNRERA approved layout",
                  "Property tax paid up to date",
                  "Bank loan eligibility certificate",
                ].map((d) => (
                  <div
                    key={d}
                    className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium"
                  >
                    <BadgeCheck className="h-4 w-4 text-success shrink-0" /> {d}
                  </div>
                ))}
              </div>
            </section>

            {/* Nearby Landmarks */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Nearby Landmarks
              </h2>
              <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-card">
                {l.nearby.map((n, i) => (
                  <div
                    key={n.name}
                    className={`flex items-center justify-between px-5 py-3.5 text-sm ${i !== l.nearby.length - 1 ? "border-b border-border/60" : ""}`}
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5 text-accent shrink-0" />
                      <span className="font-medium text-foreground">{n.name}</span>
                    </div>
                    <span className="text-muted-foreground font-medium text-xs bg-secondary rounded-full px-2.5 py-1">
                      {n.distance}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Location Map */}
            <section>
              <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                Location &amp; Connectivity
              </h2>
              <LocationConnectivityMap
                lat={l.lat}
                lng={l.lng}
                title={l.title}
                location={l.location}
                city={l.city}
                image={l.image}
                category={l.category}
              />
            </section>

            {/* Testimonials mini-strip */}
            {testimonials.length > 0 && (
              <section>
                <h2 className="font-display text-2xl font-bold text-foreground mb-5">
                  What Our Buyers Say
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {testimonials.slice(0, 2).map((t, i) => (
                    <div key={i} className="rounded-2xl border border-border bg-card p-5 shadow-card">
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="h-3.5 w-3.5 fill-accent text-accent" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed italic">
                        "{t.quote}"
                      </p>
                      <div className="mt-4 flex items-center gap-2.5">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                          {t.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{t.name}</p>
                          <p className="text-xs text-muted-foreground">{t.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* ── RIGHT COLUMN — Sticky CTA Rail ── */}
          <aside className="lg:sticky lg:top-24 lg:self-start space-y-4">

            {/* Price card */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-elevated">
              <div className="flex items-start justify-between mb-1">
                <div>
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                    Asking Price
                  </p>
                  <p className="font-display text-3xl font-bold text-foreground mt-1">
                    {formatPrice(l.priceLakh)}
                  </p>
                  {l.pricePerSqft && (
                    <p className="text-xs text-muted-foreground mt-1">
                      ₹{l.pricePerSqft.toLocaleString()} / sqft
                    </p>
                  )}
                </div>
                {l.status !== "Sold" && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-success/10 border border-success/20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-success">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    Available
                  </span>
                )}
              </div>

              <div className="mt-5 grid gap-2.5">
                <a
                  href="tel:+919876543210"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3.5 text-sm font-bold text-primary-foreground hover:opacity-90 transition shadow-sm"
                >
                  <Phone className="h-4 w-4" /> Call Agent Now
                </a>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3.5 text-sm font-bold text-whatsapp-foreground hover:opacity-90 transition shadow-sm"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Now
                </a>
                <button
                  type="button"
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("open-global-enquiry", {
                        detail: { propertyType: l.category },
                      })
                    );
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 btn-notched-filled text-xs py-3.5"
                >
                  <Calendar className="h-4 w-4 shrink-0 relative z-10" /> <span>Request Details</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.dispatchEvent(
                      new CustomEvent("open-global-enquiry", {
                        detail: { propertyType: l.category },
                      })
                    );
                  }}
                  className="w-full inline-flex items-center justify-center gap-2 btn-notched text-xs py-3.5"
                >
                  <span>Book Free Site Visit</span>
                </button>
              </div>

              {/* Agent card */}
              <div className="mt-5 flex items-center gap-3 border-t border-border pt-5">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg font-bold shrink-0">
                  RK
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">Rajiv Krishnan</p>
                  <p className="text-xs text-muted-foreground">Senior Land Advisor · 12 yrs</p>
                  <div className="flex items-center gap-0.5 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-accent text-accent" />
                    ))}
                    <span className="text-[10px] text-muted-foreground ml-1">5.0</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Inquiry form */}
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-lg font-bold text-foreground">Quick Inquiry</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Our advisor will call back within 30 minutes.
              </p>
              {sent ? (
                <div className="mt-4 rounded-xl bg-success/10 border border-success/20 px-4 py-4 text-center">
                  <CheckCircle2 className="h-8 w-8 text-success mx-auto mb-2" />
                  <p className="text-sm font-bold text-foreground">Request Sent!</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Rajiv Krishnan will call you shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                  className="mt-4 space-y-3"
                >
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                  <input
                    required
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone number"
                    className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40"
                  />
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="When would you like to visit?"
                    className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none"
                  />
                  <button
                    type="submit"
                    className="h-11 w-full rounded-xl bg-primary text-sm font-bold text-primary-foreground hover:bg-accent hover:text-accent-foreground transition cursor-pointer"
                  >
                    Request Callback
                  </button>
                  <p className="text-[10px] text-muted-foreground text-center">
                    By submitting you agree to be contacted by H and H Realty.
                  </p>
                </form>
              )}
            </div>

            {/* Trust badges */}
            <div className="rounded-2xl border border-border bg-secondary/30 p-4">
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label: "Title Verified", icon: ShieldCheck },
                  { label: "Legal Ready", icon: FileCheck2 },
                  { label: "Bank Loan OK", icon: Landmark },
                ].map((b, i) => (
                  <div key={i} className="flex flex-col items-center gap-1.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
                      <b.icon className="h-5 w-5 text-accent" />
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground leading-tight">
                      {b.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* ── Related Properties ── */}
        {related.length > 0 && (
          <section className="mt-20 pt-10 border-t border-border">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-3xl font-bold text-foreground">
                Similar Properties in {l.city}
              </h2>
              <Link
                to="/listings"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:opacity-80 transition"
              >
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to="/listings/$id"
                  params={{ id: r.id }}
                  className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-card hover:shadow-elevated hover:border-accent/40 transition-all duration-300"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    <img
                      src={r.image}
                      alt={r.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {r.verified && (
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded bg-accent/95 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-accent-foreground">
                        <BadgeCheck className="h-3 w-3" /> Lawyer Vetted
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <p className="font-display text-xl font-bold text-foreground">
                      {formatPrice(r.priceLakh, true)}
                    </p>
                    <h3 className="mt-1 text-sm font-semibold text-foreground/90 group-hover:text-primary transition truncate">
                      {r.title}
                    </h3>
                    <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 text-accent shrink-0" /> {r.location}, {r.city}
                    </p>
                    <span className="mt-3 block w-full rounded-xl bg-accent py-2 text-center text-[11px] font-bold uppercase tracking-wider text-accent-foreground group-hover:bg-accent/90 transition">
                      View Details
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="mt-6 text-center sm:hidden">
              <Link
                to="/listings"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-secondary transition"
              >
                View All Properties <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
