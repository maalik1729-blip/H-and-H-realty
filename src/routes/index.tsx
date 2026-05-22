import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search, MapPin, ShieldCheck, FileCheck2, Sparkles, TrendingUp, Phone, ArrowRight, Star } from "lucide-react";
import hero from "@/assets/hero-land.jpg";
import { listings, popularLocations, testimonials } from "@/lib/listings";
import { ListingCard } from "@/components/listing-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Terraline — Verified Land for Sale: Plots, Farmland & Commercial" },
      { name: "description", content: "Browse title-checked residential plots, commercial land, farmland and investment parcels. Drone tours, legal verification, end-to-end registration support." },
      { property: "og:title", content: "Terraline — Verified Land for Sale" },
      { property: "og:description", content: "Verified land. Honest pricing. Every plot title-checked and ready to register." },
    ],
  }),
  component: Home,
});

function Home() {
  const [q, setQ] = useState("");
  const featured = listings.filter((l) => l.status !== "Sold").slice(0, 4);

  return (
    <div>
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="Aerial view of plotted land at golden hour" width={1920} height={1280} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-foreground/70 via-foreground/45 to-foreground/70" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-36 lg:px-8">
          <div className="max-w-3xl text-background">
            <span className="inline-flex items-center gap-2 rounded-full border border-background/30 bg-background/10 px-3 py-1 text-xs font-medium backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" /> 100% title-verified listings
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
              Land you can <em className="italic text-accent">trust</em>.<br />Plots ready to register.
            </h1>
            <p className="mt-5 max-w-xl text-base text-background/85 sm:text-lg">
              Hand-picked residential, commercial, agricultural and investment land — with clear titles, drone tours, and zero broker games.
            </p>

            {/* Search */}
            <form
              onSubmit={(e) => { e.preventDefault(); window.location.href = `/listings?q=${encodeURIComponent(q)}`; }}
              className="mt-8 flex flex-col gap-2 rounded-2xl bg-background p-2 shadow-elevated sm:flex-row"
            >
              <div className="flex flex-1 items-center gap-2 px-3">
                <MapPin className="h-5 w-5 text-primary" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search by city, locality or land type"
                  className="h-12 w-full bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none"
                />
              </div>
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 font-medium text-primary-foreground hover:opacity-90">
                <Search className="h-4 w-4" /> Search
              </button>
            </form>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/listings" className="inline-flex items-center gap-2 rounded-full bg-background px-5 py-2.5 text-sm font-medium text-foreground hover:bg-background/90">
                Explore lands <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-background/40 bg-transparent px-5 py-2.5 text-sm font-medium text-background hover:bg-background/10">
                Book a site visit
              </Link>
            </div>

            <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 text-background">
              {[
                { k: "1,200+", v: "Verified plots" },
                { k: "₹480 Cr", v: "Transacted" },
                { k: "4.9★", v: "Buyer rating" },
              ].map((s) => (
                <div key={s.v}>
                  <dt className="font-display text-2xl font-semibold">{s.k}</dt>
                  <dd className="text-xs text-background/75">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 text-sm md:grid-cols-4 sm:px-6 lg:px-8">
          {[
            { i: ShieldCheck, t: "RERA-registered" },
            { i: FileCheck2, t: "Title-verified by lawyers" },
            { i: Sparkles, t: "Drone tour for every plot" },
            { i: TrendingUp, t: "Bank loan assistance" },
          ].map((b) => (
            <div key={b.t} className="flex items-center gap-3 text-foreground">
              <b.i className="h-5 w-5 text-primary" />
              <span className="font-medium">{b.t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-accent">Featured</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Hand-picked plots this week</h2>
          </div>
          <Link to="/listings" className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((l) => <ListingCard key={l.id} l={l} />)}
        </div>
      </section>

      {/* POPULAR LOCATIONS */}
      <section className="bg-secondary/40 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">Popular locations</p>
          <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">Where buyers are looking</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popularLocations.map((loc) => (
              <Link
                key={loc.name}
                to="/listings"
                search={{ city: loc.name } as never}
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl"
              >
                <img src={loc.image} alt={loc.name} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute bottom-5 left-5 text-background">
                  <h3 className="font-display text-2xl font-semibold">{loc.name}</h3>
                  <p className="text-sm text-background/85">{loc.count} listings</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-24 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-accent">Why Terraline</p>
            <h2 className="mt-2 font-display text-3xl font-semibold sm:text-4xl">
              Buying land shouldn't feel risky.
            </h2>
            <p className="mt-4 max-w-lg text-muted-foreground">
              We started Terraline after watching too many first-time buyers get burned by fake titles,
              hidden encumbrances and disappearing brokers. Every plot we list is lawyer-checked, drone-toured
              and backed by a clear paper trail.
            </p>
            <Link to="/listings" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90">
              See verified plots <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { t: "Legal due diligence", d: "Title, EC, mutation, conversion — all verified before listing." },
              { t: "Drone + ground tour", d: "Aerial video and on-site walkthrough for every plot." },
              { t: "Transparent pricing", d: "No hidden charges. The price you see is the price you pay." },
              { t: "Loan support", d: "Pre-approved financing partners ready when you are." },
            ].map((b) => (
              <div key={b.t} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <h3 className="font-display text-lg font-semibold">{b.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-wider text-accent">Buyer stories</p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-semibold sm:text-4xl">
            People we helped buy land with confidence.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="rounded-2xl bg-background/5 p-6 backdrop-blur ring-1 ring-background/10">
                <div className="flex gap-1 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" />)}
                </div>
                <blockquote className="mt-4 text-lg leading-relaxed">"{t.quote}"</blockquote>
                <figcaption className="mt-5 text-sm text-primary-foreground/80">
                  <span className="font-semibold text-primary-foreground">{t.name}</span> · {t.role}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-secondary p-10 md:p-16">
          <div className="grid items-center gap-8 lg:grid-cols-[1.4fr,1fr]">
            <div>
              <h2 className="font-display text-3xl font-semibold sm:text-4xl">Find your plot this weekend.</h2>
              <p className="mt-3 max-w-xl text-muted-foreground">
                Book a free site visit and we'll arrange transport, plot walk-through and legal Q&A — no commitment needed.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90">
                Book site visit
              </Link>
              <a href="tel:+919876543210" className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-background/80">
                <Phone className="h-4 w-4" /> +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
