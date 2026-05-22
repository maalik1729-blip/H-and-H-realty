import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, BadgeCheck, FileCheck2, Phone, MessageCircle, Calendar, Download, Maximize2, Route as RouteIcon, Building2, Play } from "lucide-react";
import { listings, type Listing } from "@/lib/listings";

export const Route = createFileRoute("/listings/$id")({
  loader: ({ params }): Listing => {
    const l = listings.find((x) => x.id === params.id);
    if (!l) throw notFound();
    return l;
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: `${loaderData.title} in ${loaderData.location} — Terraline` },
      { name: "description", content: `${loaderData.areaLabel} ${loaderData.type.toLowerCase()} land at ${loaderData.location}, ${loaderData.city}. ₹${loaderData.priceLakh}L. Verified title.` },
      { property: "og:image", content: loaderData.image },
    ] : [],
  }),
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl">Listing not found</h1>
      <p className="mt-2 text-muted-foreground">It may have been sold or removed.</p>
      <Link to="/listings" className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm text-primary-foreground">Browse listings</Link>
    </div>
  ),
  component: Detail,
});

function Detail() {
  const l = Route.useLoaderData();
  const [sent, setSent] = useState(false);
  const whatsapp = `https://wa.me/919876543210?text=${encodeURIComponent(`Hi, I'm interested in ${l.title} (${l.id})`)}`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <nav className="text-sm text-muted-foreground">
        <Link to="/" className="hover:text-primary">Home</Link> / <Link to="/listings" className="hover:text-primary">Listings</Link> / <span className="text-foreground">{l.id}</span>
      </nav>

      {/* Gallery */}
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <div className="md:col-span-2 overflow-hidden rounded-2xl">
          <img src={l.image} alt={l.title} className="h-[280px] w-full object-cover md:h-[460px]" />
        </div>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-1">
          <img src={l.image} alt="" className="h-[140px] w-full rounded-2xl object-cover md:h-[225px]" />
          <div className="relative h-[140px] overflow-hidden rounded-2xl bg-foreground md:h-[225px]">
            <img src={l.image} alt="" className="h-full w-full object-cover opacity-60" />
            <button className="absolute inset-0 grid place-items-center text-background">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-background/90 text-primary">
                <Play className="h-6 w-6 fill-current" />
              </span>
            </button>
            <span className="absolute bottom-2 left-2 rounded bg-foreground/80 px-2 py-0.5 text-xs text-background">Drone tour</span>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr,360px]">
        {/* Left content */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium">{l.type}</span>
            {l.verified && (
              <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <BadgeCheck className="h-3.5 w-3.5" /> Title verified
              </span>
            )}
            {l.rera && <span className="rounded-full bg-secondary px-3 py-1 text-xs">RERA: {l.rera}</span>}
          </div>

          <h1 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">{l.title}</h1>
          <p className="mt-2 flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-4 w-4" /> {l.location}, {l.city}
          </p>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-5 sm:grid-cols-4">
            {[
              { i: Maximize2, k: "Area", v: l.areaLabel },
              { i: RouteIcon, k: "Road", v: l.roadAccess },
              { i: Building2, k: "Ownership", v: l.ownership },
              { i: FileCheck2, k: "Status", v: l.status },
            ].map((s) => (
              <div key={s.k}>
                <s.i className="h-4 w-4 text-primary" />
                <dt className="mt-2 text-xs text-muted-foreground">{s.k}</dt>
                <dd className="text-sm font-medium">{s.v}</dd>
              </div>
            ))}
          </dl>

          <section className="mt-8">
            <h2 className="font-display text-xl font-semibold">About this plot</h2>
            <p className="mt-3 text-muted-foreground leading-relaxed">{l.description}</p>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {l.highlights.map((h) => (
                <li key={h} className="flex items-center gap-2 text-sm">
                  <BadgeCheck className="h-4 w-4 text-primary" /> {h}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold">Legal & documents</h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {[
                "Mother deed verified",
                "Encumbrance certificate clear",
                "Khata & mutation done",
                "DTCP / RERA approved",
                "Tax paid up to date",
                "Bank loan eligible",
              ].map((d) => (
                <div key={d} className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm">
                  <BadgeCheck className="h-4 w-4 text-success" /> {d}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold">Nearby landmarks</h2>
            <ul className="mt-3 divide-y divide-border rounded-2xl border border-border bg-card">
              {l.nearby.map((n) => (
                <li key={n.name} className="flex items-center justify-between px-5 py-3 text-sm">
                  <span>{n.name}</span>
                  <span className="text-muted-foreground">{n.distance}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="font-display text-xl font-semibold">Location</h2>
            <div className="mt-3 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Plot location"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${l.lng - 0.05}%2C${l.lat - 0.05}%2C${l.lng + 0.05}%2C${l.lat + 0.05}&layer=mapnik&marker=${l.lat}%2C${l.lng}`}
                className="h-full w-full"
                loading="lazy"
              />
            </div>
          </section>
        </div>

        {/* Sticky CTA rail */}
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <p className="text-xs text-muted-foreground">Asking price</p>
            <p className="font-display text-3xl font-semibold">₹{l.priceLakh} Lakh</p>
            {l.pricePerSqft && <p className="text-xs text-muted-foreground">₹{l.pricePerSqft.toLocaleString()}/sqft</p>}

            <div className="mt-5 grid gap-2">
              <a href="tel:+919876543210" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
                <Phone className="h-4 w-4" /> Call agent
              </a>
              <a href={whatsapp} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3 text-sm font-medium text-whatsapp-foreground hover:opacity-90">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
              <Link to="/contact" className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-medium hover:bg-secondary">
                <Calendar className="h-4 w-4" /> Book site visit
              </Link>
              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm hover:bg-secondary">
                <Download className="h-4 w-4" /> Download brochure
              </button>
            </div>

            <div className="mt-6 flex items-center gap-3 border-t border-border pt-5">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground font-display">RK</div>
              <div className="text-sm">
                <p className="font-medium">Rajiv Krishnan</p>
                <p className="text-muted-foreground">Senior Land Advisor · 12 yrs</p>
              </div>
            </div>
          </div>

          {/* Inquiry form */}
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="mt-4 rounded-2xl border border-border bg-card p-6 shadow-card"
          >
            <h3 className="font-display text-lg font-semibold">Quick inquiry</h3>
            {sent ? (
              <p className="mt-3 rounded-lg bg-success/10 px-4 py-3 text-sm text-success">
                Thanks — our advisor will call you within 30 minutes.
              </p>
            ) : (
              <div className="mt-4 space-y-3">
                <input required placeholder="Your name" className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm" />
                <input required type="tel" placeholder="Phone number" className="h-11 w-full rounded-md border border-input bg-background px-3 text-sm" />
                <textarea rows={3} placeholder="When would you like to visit?" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" />
                <button className="h-11 w-full rounded-xl bg-primary text-sm font-medium text-primary-foreground hover:opacity-90">Request callback</button>
                <p className="text-[11px] text-muted-foreground">By submitting you agree to be contacted by Terraline.</p>
              </div>
            )}
          </form>
        </aside>
      </div>
    </div>
  );
}
