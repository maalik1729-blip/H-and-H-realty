import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { listings, formatPrice } from "@/lib/listings";
import LocationConnectivityMap from "@/components/location-connectivity-map";

export const Route = createFileRoute("/map")({
  head: () => ({ meta: [{ title: "Map View — H and H Realty Chennai" }] }),
  component: MapView,
});

function MapView() {
  const [active, setActive] = useState(listings[0].id);
  const sel = listings.find((l) => l.id === active)!;

  // bounding box across listings
  const lats = listings.map((l) => l.lat);
  const lngs = listings.map((l) => l.lng);
  const bbox = `${Math.min(...lngs) - 0.3}%2C${Math.min(...lats) - 0.3}%2C${Math.max(...lngs) + 0.3}%2C${Math.max(...lats) + 0.3}`;

  return (
    <div className="mx-auto max-w-7xl px-4 pt-24 md:pt-28 pb-8 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold">Map view</h1>
      <p className="mt-1 text-muted-foreground">
        Hover a card to highlight the plot — click to view details.
      </p>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_380px]">
        <div className="sticky top-[68px] lg:relative lg:top-0 z-20 self-start">
          <LocationConnectivityMap
            id={sel.id}
            lat={sel.lat}
            lng={sel.lng}
            title={sel.title}
            location={sel.location}
            city={sel.city}
            image={sel.image}
            category={sel.category}
            showHeading={false}
          />
        </div>
        <div className="grid gap-3 lg:max-h-[640px] lg:overflow-y-auto lg:pr-2">
          {listings.map((l) => (
            <button
              key={l.id}
              onMouseEnter={() => setActive(l.id)}
              onClick={() => setActive(l.id)}
              className={`flex gap-3 rounded-xl border bg-card p-3 text-left transition ${
                active === l.id
                  ? "border-primary shadow-card"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <img src={l.image} alt="" className="h-20 w-24 shrink-0 rounded-lg object-cover" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-base font-semibold">{l.title}</p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" /> {l.location}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-semibold">{formatPrice(l.priceLakh, true)}</span>
                  <Link
                    to="/listings/$id"
                    params={{ id: l.id }}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    View
                  </Link>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
