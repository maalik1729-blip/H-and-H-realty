import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, FileText, Home, CreditCard, ShieldCheck, AlertTriangle, Gavel, Phone, Mail, MapPin } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — H and H Realty Chennai" },
      {
        name: "description",
        content:
          "Read the Terms & Conditions of H and H Realty. Understand the rules and obligations that govern all property enquiries, site visits, purchases, and services.",
      },
    ],
  }),
  component: TermsConditions,
});

function TermsConditions() {
  const sections = [
    {
      icon: Home,
      num: "01",
      title: "General Use of Website & Services",
      content: [
        "By visiting our website or engaging with H and H Realty's services, you confirm that you are at least 18 years of age, or using our services under the supervision of a parent or legal guardian.",
        "You agree to provide accurate, complete, and up-to-date details when submitting enquiries, booking site visits, or requesting documentation.",
        "Any misuse, fraudulent activity, impersonation, or violation of these terms may result in immediate suspension of access to our services.",
        "We reserve the right to modify, update, or discontinue any part of our services at any time without prior notice.",
      ],
    },
    {
      icon: Home,
      num: "02",
      title: "Property Listings & Pricing",
      content: [
        "H and H Realty specialises in verified residential plots, premium villas, apartments, farmhouses, and commercial land parcels in and around Chennai.",
        "All property descriptions, dimensions, pricing, and location data are provided in good faith and verified to the best of our ability. Minor variations may exist due to municipal re-measurement, legal revisions, or updates from builders.",
        "Prices are listed in Indian Rupees (INR ₹) and are indicative at the time of listing. Pricing may change based on market conditions, builder revisions, or government policy.",
        "We reserve the right to correct errors in listings, descriptions, or pricing and may withdraw listings without notice. Enquiries affected by corrections will be informed promptly.",
      ],
    },
    {
      icon: ShieldCheck,
      num: "03",
      title: "Site Visits & Enquiries",
      content: [
        "Site visit bookings are subject to availability of the property and our advisor team.",
        "We offer one complimentary site visit per property per registered client. Additional visits may be arranged upon request.",
        "You agree not to contact sellers, builders, or landowners directly to bypass our facilitation service. Such actions may result in forfeiture of legal assistance and verified title support.",
        "Enquiry information you share will be treated as confidential and used solely to match you with appropriate properties and advisors.",
      ],
    },
    {
      icon: CreditCard,
      num: "04",
      title: "Payments & Booking Tokens",
      content: [
        "Booking tokens or earnest money deposits are payable as agreed between the buyer, seller, and H and H Realty at the time of deal confirmation.",
        "We accept UPI, NEFT/RTGS, demand drafts, and card payments via PCI-DSS compliant gateways.",
        "H and H Realty does not store your payment credentials or card details.",
        "All payment acknowledgements and receipts will be issued digitally within 24 hours of confirmation.",
        "In the event of transaction errors or duplicate charges, please contact our support team immediately for prompt resolution.",
      ],
    },
    {
      icon: FileText,
      num: "05",
      title: "Legal Documentation & Title Verification",
      content: [
        "H and H Realty facilitates title verification, DTCP/TNRERA approvals, encumbrance certificate reviews, and patta transfer assistance through empanelled legal partners.",
        "While we exercise utmost diligence in legal verification, buyers are encouraged to independently verify all documents through their own legal counsel before finalising any purchase.",
        "We do not guarantee legal outcomes in disputed properties. Our role is to facilitate, verify, and assist — not to act as a legal authority.",
        "Registration assistance and stamp duty calculations are advisory in nature; official figures are subject to the applicable government rates at the time of registration.",
      ],
    },
    {
      icon: AlertTriangle,
      num: "06",
      title: "Customer Responsibilities",
      content: [
        "By engaging with H and H Realty, you agree not to provide false or incomplete personal or financial details.",
        "You agree not to misuse our brand name, property images, floor plans, or content for unauthorised commercial purposes.",
        "You agree not to share our exclusive listing details, price sheets, or advisor contacts publicly without written permission.",
        "Fraudulent claims, chargebacks without basis, or attempts to defraud sellers through our platform may result in legal action.",
      ],
    },
    {
      icon: ShieldCheck,
      num: "07",
      title: "Intellectual Property",
      content: [
        "All product images, drone footage, architectural renders, floor plans, content, brand elements, and website designs are the intellectual property of H and H Realty.",
        "Property images and 3D visualisations from builders are used with permission and belong to their respective creators.",
        "Unauthorised reproduction, distribution, or use of any content from this platform is strictly prohibited and may constitute an infringement of intellectual property laws.",
      ],
    },
    {
      icon: AlertTriangle,
      num: "08",
      title: "Limitation of Liability",
      content: [
        "H and H Realty shall not be liable for delays in property registration caused by government offices, court orders, or administrative backlogs.",
        "We are not responsible for post-sale disputes between buyers and sellers arising from undisclosed encumbrances or family claims not surfaced during our verification.",
        "Our liability for any claim is strictly limited to the documented service fees paid to H and H Realty for the specific transaction in question.",
        "We make no warranties, express or implied, about investment returns, capital appreciation, or rental income of any listed property.",
      ],
    },
    {
      icon: Gavel,
      num: "09",
      title: "Governing Law & Jurisdiction",
      content: [
        "These Terms & Conditions are governed by the laws of India, specifically applicable to the State of Tamil Nadu.",
        "Any disputes arising from the use of our services shall fall under the jurisdiction of courts in Chennai, Tamil Nadu.",
        "We encourage resolution of disputes through mutual discussion and mediation before resorting to legal proceedings.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-primary pt-20 sm:pt-28 pb-10 md:pt-36 md:pb-16 text-primary-foreground border-b border-border/10">
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
              Legal Terms
            </span>
          </div>
          <h1 className="font-display text-[clamp(2rem,5vw+0.5rem,3.25rem)] font-bold tracking-tight text-white leading-tight">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-white/70 max-w-xl leading-relaxed font-sans">
            Please read these terms carefully before using our services · Last Updated: May 2025
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 py-10 sm:py-12 sm:px-6 lg:px-8 space-y-10">
        {/* Intro */}
        <div className="rounded-2xl bg-accent/8 border border-accent/20 p-5 sm:p-6 text-sm leading-relaxed text-foreground/80">
          Welcome to <strong className="text-foreground">H and H Realty</strong>. By accessing our website, booking a site visit, submitting an enquiry, or engaging with our real estate advisory services, you agree to comply with and be bound by the following Terms &amp; Conditions. These terms govern all property searches, enquiries, visits, and transactions facilitated by H and H Realty Chennai. If you do not agree with these terms, we request you to discontinue using our services.
        </div>

        {/* Sections */}
        {sections.map((section, idx) => (
          <section key={idx} className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                <section.icon className="h-4.5 w-4.5 text-primary" />
              </div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-foreground">
                <span className="text-muted-foreground font-sans text-sm mr-2">{section.num}.</span>
                {section.title}
              </h2>
            </div>
            <ul className="pl-0 sm:pl-12 space-y-2.5">
              {section.content.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
            {idx < sections.length - 1 && (
              <div className="border-b border-border/50 mt-6" />
            )}
          </section>
        ))}

        {/* Contact */}
        <section className="rounded-2xl border border-primary/20 bg-primary/5 p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-foreground">10. Contact Us</h2>
          <p className="text-sm text-muted-foreground">For assistance or queries regarding these Terms &amp; Conditions, please contact:</p>
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
