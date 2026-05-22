import { Link } from "@tanstack/react-router";
import { MapPin, Maximize2, BadgeCheck } from "lucide-react";
import type { Listing } from "@/lib/listings";

export function ListingCard({ l }: { l: Listing }) {
  const sold = l.status === "Sold";
  return (
    <Link
      to="/listings/$id"
      params={{ id: l.id }}
      className="group block overflow-hidden rounded-2xl border border-border bg-card shadow-card transition hover:shadow-elevated"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={l.image}
          alt={l.title}
          loading="lazy"
          className={`h-full w-full object-cover transition duration-700 group-hover:scale-105 ${sold ? "grayscale" : ""}`}
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <span className="rounded-full bg-background/95 px-2.5 py-1 text-xs font-medium text-foreground">
            {l.type}
          </span>
          {l.verified && (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/95 px-2.5 py-1 text-xs font-medium text-primary-foreground">
              <BadgeCheck className="h-3 w-3" /> Verified
            </span>
          )}
        </div>
        {sold && (
          <div className="absolute inset-0 grid place-items-center bg-foreground/30">
            <span className="rounded-md bg-destructive px-3 py-1 text-sm font-semibold text-destructive-foreground">SOLD</span>
          </div>
        )}
        {l.status === "Reserved" && (
          <span className="absolute right-3 top-3 rounded-full bg-warning px-2.5 py-1 text-xs font-medium text-warning-foreground">
            Reserved
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-foreground">{l.title}</h3>
        <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {l.location}, {l.city}
        </p>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="font-display text-2xl font-semibold text-foreground">₹{l.priceLakh} L</p>
            {l.pricePerSqft && (
              <p className="text-xs text-muted-foreground">₹{l.pricePerSqft.toLocaleString()}/sqft</p>
            )}
          </div>
          <div className="text-right">
            <p className="flex items-center justify-end gap-1 text-sm font-medium text-foreground">
              <Maximize2 className="h-3.5 w-3.5" /> {l.areaLabel}
            </p>
            <p className="text-xs text-muted-foreground">{l.roadAccess}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
