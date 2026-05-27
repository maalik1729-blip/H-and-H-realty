import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, Shield, Eye, Lock, Users, FileText, Bell, Phone, Mail, MapPin } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — H and H Realty Chennai" },
      {
        name: "description",
        content:
          "Read the Privacy Policy of H and H Realty. Understand how we collect, use, and protect your personal information when you interact with our real estate services.",
      },
    ],
  }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-primary pt-20 sm:pt-28 pb-12 md:pt-36 md:pb-16 text-primary-foreground border-b border-border/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/25 via-primary to-primary-dark opacity-95" />
        
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-left space-y-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-xs font-bold uppercase tracking-wider transition mb-3 group"
          >
            <ChevronLeft className="h-3.5 w-3.5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/30 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Legal Policy
            </span>
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white leading-none">
            Privacy Policy
          </h1>
          <p className="text-sm text-white/70 max-w-xl leading-relaxed font-sans">
            Your Privacy is Our Priority · Last Updated: May 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-10 text-sm text-foreground leading-relaxed">

        {/* Intro */}
        <div className="rounded-2xl bg-accent/8 border border-accent/20 p-6">
          <p className="text-foreground/80 leading-relaxed">
            At <strong className="text-foreground">H and H Realty</strong>, we value the trust you place in us when you explore or purchase property through our platform. Protecting your personal information is as important to us as ensuring the quality and transparency of every listing we present. This Privacy Policy explains what information we collect, how we use it, how we safeguard it, and your rights when engaging with our real estate services — whether online, in-person, or via our advisors.
          </p>
        </div>

        {/* Section helper component */}
        {[
          {
            icon: Eye,
            title: "Information We Collect",
            content: (
              <div className="space-y-3">
                <p>When you interact with H and H Realty, we may collect the following:</p>
                <ul className="space-y-2 pl-4">
                  {[
                    "Full Name and Contact Details (phone, email)",
                    "Billing and Correspondence Address",
                    "Property Preferences and Search History on our platform",
                    "Enquiry and Site Visit Request Details",
                    "Payment Information (processed via secure third-party gateways — we do not store card or UPI details)",
                    "Wholesale / Investor Account Information (for B2B and bulk-plot clients)",
                    "Device and Browser Data (for website analytics and performance)",
                    "Cookies and Tracking Data (to improve user experience)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground italic text-xs">We collect only the information necessary to provide you with safe, reliable, and efficient service.</p>
              </div>
            ),
          },
          {
            icon: FileText,
            title: "Why We Collect Your Information",
            content: (
              <div className="space-y-2">
                <p>We use your data solely for legitimate real estate business purposes, including:</p>
                <ul className="space-y-2 pl-4 mt-2">
                  {[
                    "Processing site visit bookings and property enquiries",
                    "Connecting you with our senior land advisors and legal consultants",
                    "Sending property alerts, new listings, and price updates (only if you opt in)",
                    "Managing your account and purchase history",
                    "Coordinating legal documentation, title verifications, and RERA registrations",
                    "Providing personalised property recommendations based on your search preferences",
                    "Meeting regulatory, legal, and tax compliance requirements",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ),
          },
          {
            icon: Lock,
            title: "How We Protect Your Information",
            content: (
              <div className="space-y-2">
                <p>We implement strict technical and organisational measures to keep your data secure:</p>
                <div className="grid sm:grid-cols-2 gap-3 mt-3">
                  {[
                    { t: "SSL Encryption", d: "All online interactions are encrypted end-to-end" },
                    { t: "Secure Payment Processing", d: "Via PCI-DSS compliant payment gateways" },
                    { t: "Firewall & Access Controls", d: "On all servers and internal systems" },
                    { t: "Restricted Staff Access", d: "Only authorised advisors can access your data" },
                    { t: "Regular Security Reviews", d: "Periodic audits of privacy and security practices" },
                    { t: "No Data Selling", d: "We never sell or rent your information to third parties" },
                  ].map((item, i) => (
                    <div key={i} className="rounded-xl border border-border bg-secondary/40 p-3">
                      <p className="font-semibold text-foreground text-xs">{item.t}</p>
                      <p className="text-muted-foreground text-xs mt-0.5">{item.d}</p>
                    </div>
                  ))}
                </div>
              </div>
            ),
          },
          {
            icon: Users,
            title: "Third-Party Sharing",
            content: (
              <div className="space-y-2">
                <p>We do <strong>not</strong> sell or rent your personal information. Data may be shared only with:</p>
                <ul className="space-y-2 pl-4 mt-2">
                  {[
                    "Legal partners and advocates (for property title verification and registration)",
                    "Survey and inspection teams (for drone tours and site verification services)",
                    "Bank and loan partners (for pre-approved financing assistance)",
                    "Payment processors (for secure transaction completion)",
                    "Government or regulatory authorities (only when legally required)",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ),
          },
          {
            icon: Bell,
            title: "Your Rights & Choices",
            content: (
              <div className="space-y-2">
                <p>As our valued client, you have the right to:</p>
                <ul className="space-y-2 pl-4 mt-2">
                  {[
                    "Access the personal data we hold about you",
                    "Request corrections or updates to your information",
                    "Ask for deletion of your data (subject to legal obligations)",
                    "Withdraw consent from promotional communications at any time",
                    "Raise concerns about data misuse or handling",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-muted-foreground text-xs mt-3 italic">We aim to process all verified requests within 30 days.</p>
              </div>
            ),
          },
        ].map((section, idx) => (
          <section key={idx} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                <section.icon className="h-4.5 w-4.5 text-primary" />
              </div>
              <h2 className="font-display text-xl font-bold text-foreground">{section.title}</h2>
            </div>
            <div className="pl-4 sm:pl-12 text-muted-foreground">{section.content}</div>
          </section>
        ))}

        {/* Policy Updates */}
        <section className="rounded-2xl border border-border bg-secondary/30 p-6 space-y-2">
          <h2 className="font-display text-lg font-bold text-foreground">Policy Updates</h2>
          <p className="text-muted-foreground">
            This Privacy Policy may be updated periodically to reflect changes in law, technology, or business practices. Updates will always be posted on our website with a revised "Last Updated" date. Continued use of our services after changes implies acceptance of the revised policy.
          </p>
        </section>

        {/* Contact */}
        <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-foreground">Contact Us</h2>
          <p className="text-muted-foreground">For privacy questions, data access requests, or concerns, please contact:</p>
          <div className="space-y-2 text-sm">
            <p className="font-bold text-foreground text-base">H and H Realty Chennai</p>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary shrink-0" />
              <span>No. 45, OMR Road, Sholinganallur, Chennai, Tamil Nadu 600119</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Phone className="h-4 w-4 text-primary shrink-0" />
              <a href="tel:+919876543210" className="hover:text-primary transition">+91 98765 43210</a>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Mail className="h-4 w-4 text-primary shrink-0" />
              <a href="mailto:hello@hnhrealty.in" className="hover:text-primary transition">hello@hnhrealty.in</a>
            </div>
          </div>
        </section>

        {/* Copyright */}
        <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border/50">
          © {new Date().getFullYear()} H and H Realty Chennai. All Rights Reserved.
        </div>

        {/* Back Button */}
        <div className="flex justify-center pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-bold tracking-wider uppercase text-primary-foreground hover:opacity-90 shadow transition hover:scale-[1.02]"
          >
            <ChevronLeft className="h-4 w-4" /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
