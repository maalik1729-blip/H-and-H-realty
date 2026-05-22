import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground font-display text-lg">T</span>
          <span className="font-display text-xl font-semibold text-foreground">Terraline</span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-foreground/80 md:flex">
          <Link to="/" activeOptions={{ exact: true }} activeProps={{ className: "text-primary" }} className="hover:text-primary">Home</Link>
          <Link to="/listings" activeProps={{ className: "text-primary" }} className="hover:text-primary">Listings</Link>
          <Link to="/map" activeProps={{ className: "text-primary" }} className="hover:text-primary">Map</Link>
          <Link to="/blog" activeProps={{ className: "text-primary" }} className="hover:text-primary">Insights</Link>
          <Link to="/contact" activeProps={{ className: "text-primary" }} className="hover:text-primary">Contact</Link>
          <Link to="/admin" activeProps={{ className: "text-primary" }} className="hover:text-primary">Admin</Link>
        </nav>
        <Link
          to="/contact"
          className="hidden md:inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
        >
          Book site visit
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground font-display text-lg">T</span>
            <span className="font-display text-xl font-semibold">Terraline</span>
          </div>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Verified land. Honest pricing. Every plot we list is title-checked and ready to register.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/listings" className="hover:text-primary">All listings</Link></li>
            <li><Link to="/map" className="hover:text-primary">Map view</Link></li>
            <li><Link to="/blog" className="hover:text-primary">Insights</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Land types</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Residential plots</li>
            <li>Commercial land</li>
            <li>Agricultural farmland</li>
            <li>Investment parcels</li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5" /> 14 Lavelle Road, Bengaluru 560001</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> +91 98765 43210</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@terraline.in</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Terraline Land Holdings. All rights reserved.
      </div>
    </footer>
  );
}
