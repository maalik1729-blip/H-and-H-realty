import { MessageCircle, Phone } from "lucide-react";

export function StickyContact() {
  return (
    <>
      {/* Desktop floating WhatsApp */}
      <a
        href="https://wa.me/919876543210?text=Hi%20Terraline%2C%20I%27m%20interested%20in%20a%20plot"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-50 hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-whatsapp-foreground shadow-elevated transition hover:scale-105"
      >
        <MessageCircle className="h-6 w-6" />
      </a>

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-3 border-t border-border bg-background/95 backdrop-blur md:hidden">
        <a href="tel:+919876543210" className="flex flex-col items-center justify-center gap-0.5 py-2.5 text-xs font-medium text-foreground">
          <Phone className="h-4 w-4" /> Call
        </a>
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center justify-center gap-0.5 bg-whatsapp py-2.5 text-xs font-medium text-whatsapp-foreground"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
        <a href="/contact" className="flex flex-col items-center justify-center gap-0.5 bg-primary py-2.5 text-xs font-medium text-primary-foreground">
          Book visit
        </a>
      </div>
    </>
  );
}
