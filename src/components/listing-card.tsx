import { Link } from "@tanstack/react-router";
import { MapPin, Maximize2, BadgeCheck, ChevronLeft, ChevronRight } from "lucide-react";
import { type Listing, formatPrice, isBuiltProperty } from "@/lib/listings";

// Realistic Chennai monthly rental estimation based on purchase price (approx 3% yield)
export function getMonthlyRent(priceLakh: number): string {
  const annualRent = priceLakh * 100000 * 0.03;
  const monthly = Math.round(annualRent / 12);
  
  if (monthly >= 100000) {
    const lakhVal = (monthly / 100000).toFixed(1).replace(/\.0$/, "");
    return `₹${lakhVal} Lakh / mo`;
  }
  return `₹${monthly.toLocaleString()} / mo`;
}

interface ListingCardProps {
  l: Listing;
  rentMode?: boolean;
  onMouseEnter?: () => void;
}

export function ListingCard({ l, rentMode = false, onMouseEnter }: ListingCardProps) {
  const sold = l.status === "Sold";
  
  return (
    <Link
      to="/listings/$id"
      params={{ id: l.id }}
      onMouseEnter={onMouseEnter}
      className="group block overflow-hidden rounded-3xl border border-slate-100 bg-card shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 ease-out hover:border-accent/60"
    >
      {/* Photo Frame Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={l.image}
          alt={l.title}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-[800ms] ease-out group-hover:scale-105 ${
            sold ? "grayscale" : ""
          }`}
        />
        
        {/* Photo Navigation Overlay Arrows (Minimalist Agency Style) */}
        <div className="absolute inset-x-3 top-1/2 z-10 flex -translate-y-1/2 justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-background/90 text-foreground border border-border/40 hover:bg-background transition shadow-sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className="flex h-7 w-7 items-center justify-center rounded-full bg-background/90 text-foreground border border-border/40 hover:bg-background transition shadow-sm"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Absolute Tags */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5 z-10">
          {/* New Listing Tag / Status Tag */}
          <span className="rounded bg-background/95 border border-border/40 px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase text-foreground shadow-sm">
            {rentMode ? "For Rent" : "New Listing"}
          </span>
          {l.verified && (
            <span className="inline-flex items-center gap-0.5 rounded bg-accent/95 px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase text-accent-foreground shadow-sm">
              <BadgeCheck className="h-3 w-3" /> Lawyer Vetted
            </span>
          )}
        </div>

        {sold && (
          <div className="absolute inset-0 grid place-items-center bg-foreground/20 z-10">
            <span className="rounded bg-destructive px-3 py-1 text-xs font-bold tracking-widest text-destructive-foreground uppercase shadow-md">
              SOLD
            </span>
          </div>
        )}
        {l.status === "Reserved" && (
          <span className="absolute right-3 top-3 rounded bg-amber-500 border border-amber-600/20 px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase text-white shadow-sm z-10">
            Reserved
          </span>
        )}
      </div>

      {/* Card Info Details */}
      <div className="p-5 flex flex-col gap-3">
        <div>
          {/* Price Tag in Bold (Large, High Contrast) */}
          <p className="font-display text-2xl font-bold text-foreground tracking-tight">
            {rentMode ? getMonthlyRent(l.priceLakh) : formatPrice(l.priceLakh, true)}
          </p>
          
          {/* Address Title in Gray */}
          <h3 className="font-sans text-sm font-semibold text-foreground/90 mt-1.5 truncate group-hover:text-primary transition-colors">
            {l.title}
          </h3>
          
          <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground font-medium truncate">
            <MapPin className="h-3.5 w-3.5 text-accent shrink-0" /> {l.location}, {l.city}
          </p>
        </div>

        {/* Bottom Specs Info */}
        <div className="flex items-center justify-between pt-2 border-t border-border/50 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
          <span className="flex items-center gap-1">
            <Maximize2 className="h-3 w-3 shrink-0 text-accent/80" /> {l.areaLabel.split(" (")[0]}
          </span>
          
          <div className="text-right font-semibold text-foreground/90">
            {isBuiltProperty(l.category) && l.bedrooms ? (
              <span>
                {l.bedrooms} BHK · {l.bathrooms} Bath · Active
              </span>
            ) : (
              <span>
                {l.roadAccess.split(" road")[0]} · Active
              </span>
            )}
          </div>
        </div>

        {/* Enquire Now CTA — always visible, navigates to detail page */}
        {!sold && (
          <div className="pt-1 select-none">
            <span className="w-full inline-flex items-center justify-center btn-notched-filled text-[10px] py-2">
              <span>View Details &rarr;</span>
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}
