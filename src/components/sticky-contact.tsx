import { MessageCircle, Phone } from "lucide-react";

export function StickyContact() {
  return (
    <>


      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 grid grid-cols-3 border-t border-border bg-background/95 backdrop-blur md:hidden">
        <a
          href="tel:+919876543210"
          className="min-h-11 flex flex-col items-center justify-center gap-0.5 py-3 text-xs font-medium text-foreground"
        >
          <Phone className="h-4 w-4" /> Call
        </a>
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noreferrer"
          className="min-h-11 flex flex-col items-center justify-center gap-0.5 bg-whatsapp py-3 text-xs font-medium text-whatsapp-foreground"
        >
          <MessageCircle className="h-4 w-4" /> WhatsApp
        </a>
        <a
          href="/contact"
          className="min-h-11 flex flex-col items-center justify-center gap-0.5 bg-accent py-3 text-xs font-medium text-accent-foreground"
        >
          Book visit
        </a>
      </div>
    </>
  );
}
