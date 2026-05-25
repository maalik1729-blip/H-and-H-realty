import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, Calendar } from "lucide-react";
import LocationConnectivityMap from "@/components/location-connectivity-map";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Site Visit Booking — H and H Realty Chennai" },
      {
        name: "description",
        content: "Book a free site visit, request a callback or reach our office in Chennai.",
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden bg-primary pt-28 pb-12 md:pt-36 md:pb-16 text-primary-foreground border-b border-border/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/25 via-primary to-primary-dark opacity-95" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/30 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Get In Touch
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white leading-none">
            Talk to a Land Advisor
          </h1>
          <p className="text-sm text-white/70 max-w-xl leading-relaxed font-sans">
            Book a free site visit or ask any legal/property question. Typical response in under 30 minutes during business hours.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

      <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_1fr]">
        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
          className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8"
        >
          <h2 className="font-display text-xl font-semibold">Book a site visit</h2>
          {sent ? (
            <div className="mt-4 rounded-xl bg-success/10 p-6 text-center">
              <p className="font-display text-lg text-success">Site visit requested</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Our advisor will WhatsApp you the meeting point and time.
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label="Full name">
                <input required className="field" placeholder="e.g. Ananya Rao" />
              </Field>
              <Field label="Phone">
                <input required type="tel" className="field" placeholder="+91 9xxxxxxxxx" />
              </Field>
              <Field label="Email">
                <input type="email" className="field" placeholder="you@email.com" />
              </Field>
              <Field label="Interested in">
                <select className="field">
                  <option>Residential Plot</option>
                  <option>Commercial Land</option>
                  <option>Villa / Bungalow</option>
                  <option>Apartment / Flat</option>
                  <option>Farmhouse / Cottage</option>
                  <option>Investment Parcel</option>
                </select>
              </Field>
              <Field label="Preferred date">
                <input type="date" className="field" />
              </Field>
              <Field label="Time slot">
                <select className="field">
                  <option>Morning (9 – 12)</option>
                  <option>Afternoon (12 – 4)</option>
                  <option>Evening (4 – 7)</option>
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Message">
                  <textarea
                    rows={4}
                    className="field"
                    placeholder="Any specific plot or area in mind?"
                  />
                </Field>
              </div>
              <button className="sm:col-span-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground hover:opacity-90">
                <Calendar className="h-4 w-4" /> Confirm site visit
              </button>
            </div>
          )}
        </form>

        {/* Side info */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-display text-lg font-semibold">Reach us directly</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary" />
                <span>
                  No. 45, OMR Road,
                  <br /> Sholinganallur, Chennai 600119
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-primary" />
                <a href="tel:+919876543210" className="hover:underline">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href="mailto:hello@hnhrealty.in" className="hover:underline">
                  hello@hnhrealty.in
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-whatsapp" />
                <a href="https://wa.me/919876543210" className="hover:underline">
                  WhatsApp chat
                </a>
              </li>
            </ul>
          </div>

          <LocationConnectivityMap
            lat={12.9010}
            lng={80.2279}
            title="H and H Realty Chennai Headquarters"
            location="Sholinganallur"
            city="Chennai"
            address="No. 45, OMR Road, Sholinganallur, Chennai, Tamil Nadu 600119"
            rating={4.9}
            reviewsCount={184}
            showHeading={false}
          />

          <div className="rounded-2xl border border-border bg-secondary/60 p-6">
            <h3 className="font-display text-lg font-semibold">Office hours</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Mon – Sat · 9:30 AM to 7:00 PM
              <br />
              Sunday by appointment
            </p>
          </div>
        </div>
      </div>

      <style>{`.field{height:44px;width:100%;border-radius:0.5rem;border:1px solid var(--input);background:var(--background);padding:0 0.75rem;font-size:0.875rem;color:var(--foreground)} textarea.field{height:auto;padding:0.5rem 0.75rem}`}</style>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}
