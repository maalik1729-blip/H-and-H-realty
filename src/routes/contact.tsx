import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, Phone, Mail, MessageCircle, Calendar, Loader2 } from "lucide-react";
import LocationConnectivityMap from "@/components/location-connectivity-map";
import { useLanguage } from "@/context/language-context";
import { CONTACT, whatsappUrl } from "@/lib/contact-info";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { language, t } = useLanguage();
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden bg-primary pt-28 pb-12 md:pt-36 md:pb-16 text-primary-foreground border-b border-border/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/25 via-primary to-primary-dark opacity-95" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-left space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/30 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            {t("contact.badge")}
          </span>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white leading-none">
            {t("contact.title")}
          </h1>
          <p className="text-sm text-white/70 max-w-xl leading-relaxed font-sans">
            {t("contact.desc")}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

      <div className="mt-10 grid gap-8 md:grid-cols-[1.1fr_1fr]">
        {/* Form */}
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setIsSubmitting(true);
            setSubmitError("");
            try {
              const formId = import.meta.env.VITE_FORMSPREE_CONTACT as string | undefined;
              if (formId) {
                const res = await fetch(`https://formspree.io/f/${formId}`, {
                  method: "POST",
                  body: new FormData(e.currentTarget),
                });
                if (!res.ok) throw new Error("Submission failed");
              }
              setSent(true);
            } catch {
              setSubmitError(
                language === "en"
                  ? "Submission failed. Please call us directly."
                  : "சமர்ப்பிப்பு தோல்வியடைந்தது. நேரடியாக அழைக்கவும்."
              );
            } finally {
              setIsSubmitting(false);
            }
          }}
          className="rounded-2xl border border-border bg-card p-6 shadow-card md:p-8"
        >
          <h2 className="font-display text-xl font-semibold">{t("contact.formTitle")}</h2>
          {sent ? (
            <div className="mt-4 rounded-xl bg-success/10 p-6 text-center">
              <p className="font-display text-lg text-success">{t("contact.successTitle")}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("contact.successDesc")}
              </p>
            </div>
          ) : (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field label={t("contact.fullName")}>
                <input name="fullName" required className="field" placeholder={language === "en" ? "e.g. Ananya Rao" : "எ.கா. அனன்யா ராவ்"} />
              </Field>
              <Field label={t("contact.phone")}>
                <input name="phone" required type="tel" className="field" placeholder="+91 9xxxxxxxxx" />
              </Field>
              <Field label={t("contact.email")}>
                <input name="email" type="email" className="field" placeholder="you@email.com" />
              </Field>
              <Field label={t("contact.interestedIn")}>
                <select name="interestedIn" className="field">
                  <option>{language === "en" ? "Residential Plot" : "குடியிருப்பு மனை"}</option>
                  <option>{language === "en" ? "Commercial Land" : "வணிக நிலம்"}</option>
                  <option>{language === "en" ? "Villa / Bungalow" : "வில்லா / பங்களா"}</option>
                  <option>{language === "en" ? "Apartment / Flat" : "அடுக்குமாடி குடியிருப்பு"}</option>
                  <option>{language === "en" ? "Farmhouse / Cottage" : "பண்ணை வீடு / சிறிய இல்லம்"}</option>
                  <option>{language === "en" ? "Investment Parcel" : "முதலீட்டு நிலம்"}</option>
                </select>
              </Field>
              <Field label={t("contact.preferredDate")}>
                <input name="preferredDate" type="date" className="field" min={new Date().toISOString().split("T")[0]} />
              </Field>
              <Field label={t("contact.timeSlot")}>
                <select name="timeSlot" className="field">
                  <option>{language === "en" ? "Morning (9 – 12)" : "காலை (9 - 12)"}</option>
                  <option>{language === "en" ? "Afternoon (12 – 4)" : "மதியம் (12 - 4)"}</option>
                  <option>{language === "en" ? "Evening (4 – 7)" : "மாலை (4 - 7)"}</option>
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label={t("contact.message")}>
                  <textarea
                    name="message"
                    rows={4}
                    className="field"
                    placeholder={language === "en" ? "Any specific plot or area in mind?" : "குறிப்பிட்ட மனை அல்லது பகுதி ஏதேனும் உள்ளதா?"}
                  />
                </Field>
              </div>
              {submitError && (
                <p className="sm:col-span-2 text-xs text-destructive font-medium">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="sm:col-span-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Calendar className="h-4 w-4" />}
                {isSubmitting ? (language === "en" ? "Booking..." : "பதிவு செய்யப்படுகிறது...") : t("contact.confirm")}
              </button>
            </div>
          )}
        </form>

        {/* Side info */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <h3 className="font-display text-lg font-semibold">{t("contact.reachUs")}</h3>
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
                <a href={`tel:${CONTACT.phoneRaw}`} className="hover:underline">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-primary" />
                <a href={`mailto:${CONTACT.email}`} className="hover:underline">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="h-5 w-5 text-whatsapp" />
                <a href={whatsappUrl(language === "en" ? "Hi H&H Realty, I'd like to enquire about your properties." : "வணக்கம், H&H Realty சொத்துகள் பற்றி தகவல் வேண்டும்.")} className="hover:underline">
                  {language === "en" ? "WhatsApp chat" : "வாட்ஸ்அப் அரட்டை"}
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
            <h3 className="font-display text-lg font-semibold">{language === "en" ? "Office hours" : "அலுவலக நேரம்"}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {language === "en" ? "Mon – Sat · 9:30 AM to 7:00 PM" : "திங்கள் - சனி · காலை 9:30 முதல் மாலை 7:00 வரை"}
              <br />
              {language === "en" ? "Sunday by appointment" : "ஞாயிறு - முன்பதிவு மூலம் மட்டும்"}
            </p>
          </div>
        </div>
      </div>

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
