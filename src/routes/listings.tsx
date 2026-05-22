import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, MapIcon } from "lucide-react";
import { listings, type LandType } from "@/lib/listings";
import { ListingCard } from "@/components/listing-card";

export const Route = createFileRoute("/listings")({
  head: () => ({
    meta: [
      { title: "All Land Listings — Terraline" },
      { name: "description", content: "Filter verified land listings by location, price, size, type, road access and ownership." },
    ],
  }),
  component: ListingsPage,
});

const types: LandType[] = ["Residential", "Commercial", "Agricultural", "Investment"];

function ListingsPage() {
  const [type, setType] = useState<LandType | "All">("All");
  const [city, setCity] = useState("All");
  const [maxPrice, setMaxPrice] = useState(500);
  const [onlyAvailable, setOnlyAvailable] = useState(true);
  const [ownership, setOwnership] = useState<"All" | "Freehold" | "Leasehold">("All");

  const cities = useMemo(() => ["All", ...Array.from(new Set(listings.map((l) => l.city)))], []);

  const filtered = listings.filter((l) =>
    (type === "All" || l.type === type) &&
    (city === "All" || l.city === city) &&
    l.priceLakh <= maxPrice &&
    (!onlyAvailable || l.status === "Available") &&
    (ownership === "All" || l.ownership === ownership)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold sm:text-4xl">Land for sale</h1>
          <p className="mt-1 text-muted-foreground">{filtered.length} verified listings</p>
        </div>
        <Link to="/map" className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium hover:bg-secondary">
          <MapIcon className="h-4 w-4" /> Map view
        </Link>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px,1fr]">
        {/* Filters */}
        <aside className="rounded-2xl border border-border bg-card p-5 shadow-card lg:sticky lg:top-20 lg:self-start">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </h2>

          <div className="mt-5 space-y-5 text-sm">
            <div>
              <p className="mb-2 font-medium">Land type</p>
              <div className="flex flex-wrap gap-2">
                {["All", ...types].map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t as LandType | "All")}
                    className={`rounded-full border px-3 py-1.5 text-xs transition ${
                      type === t ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-secondary"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-2 font-medium">City</p>
              <select value={city} onChange={(e) => setCity(e.target.value)} className="h-10 w-full rounded-md border border-input bg-background px-3">
                {cities.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <p className="font-medium">Max price</p>
                <span className="text-xs text-muted-foreground">₹{maxPrice} L</span>
              </div>
              <input
                type="range" min={20} max={500} step={10} value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="mt-2 w-full accent-primary"
              />
            </div>

            <div>
              <p className="mb-2 font-medium">Ownership</p>
              <div className="flex gap-2">
                {(["All", "Freehold", "Leasehold"] as const).map((o) => (
                  <button
                    key={o}
                    onClick={() => setOwnership(o)}
                    className={`rounded-full border px-3 py-1.5 text-xs ${
                      ownership === o ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background hover:bg-secondary"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input type="checkbox" checked={onlyAvailable} onChange={(e) => setOnlyAvailable(e.target.checked)} className="h-4 w-4 accent-primary" />
              Available only
            </label>
          </div>
        </aside>

        {/* Results */}
        <div className="grid gap-6 sm:grid-cols-2">
          {filtered.length === 0 ? (
            <div className="col-span-full rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
              No listings match these filters yet. Try widening your search.
            </div>
          ) : (
            filtered.map((l) => <ListingCard key={l.id} l={l} />)
          )}
        </div>
      </div>
    </div>
  );
}
