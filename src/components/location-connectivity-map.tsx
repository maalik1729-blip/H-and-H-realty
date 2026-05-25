import { useState, useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { Star, ExternalLink, Navigation, Info, Plus, Minus, Maximize2, MapPin } from "lucide-react";
import { isBuiltProperty, type PropertyCategory } from "@/lib/listings";

interface LocationConnectivityMapProps {
  id?: string;
  lat: number;
  lng: number;
  title: string;
  location: string;
  city: string;
  image?: string;
  category?: PropertyCategory;
  rating?: number;
  reviewsCount?: number;
  address?: string;
  showHeading?: boolean;
}

export function getRealisticAddress(location: string, title: string, city: string = "Chennai"): string {
  const locMap: Record<string, string> = {
    "Tambaram West": "18/35 Gandhi Road, Near Krishna Nagar, West Tambaram, Chennai, Tamil Nadu 600045",
    "Akkarai, ECR": "Lot 5, Sea Cliff Conclave, J-Street, Akkarai, East Coast Road, Chennai, Tamil Nadu 600119",
    "Sholinganallur, OMR": "Block B, Elcot Avenue, Near IT Park, Sholinganallur, Chennai, Tamil Nadu 600119",
    "Mahabalipuram Outskirts": "Survey No. 204, East Coast Road, Near Tiger Cave, Mahabalipuram, Tamil Nadu 603104",
    "Adyar": "15, Sardar Patel Road, Kasturba Nagar, Adyar, Chennai, Tamil Nadu 600020",
    "Medavakkam": "4B, Vadakkupattu Main Road, Near Lake Park, Medavakkam, Chennai, Tamil Nadu 600100",
    "Perumbakkam": "8/12, Nookampalayam Link Road, Perumbakkam, Chennai, Tamil Nadu 600100",
    "Kovalam, ECR": "22, Surf School Avenue, Kovalam Beach, Chennai, Tamil Nadu 603112",
    "Velachery": "Penthouse B, 100 Feet Bypass Road, Near Phoenix Mall, Velachery, Chennai, Tamil Nadu 600042",
    "GST Road, Urapakkam": "Survey No. 42/1, GST Road, Near Kilambakkam Bus Terminus, Urapakkam, Tamil Nadu 603210",
    "Sriperumbudur Outskirts": "No. 88, Chennai-Bangalore Highway, Sriperumbudur, Tamil Nadu 602105",
    "Oragadam Industrial Corridor": "Plot 4, SIPCOT Industrial Growth Center, Oragadam, Tamil Nadu 602105",
    "Neelankarai, ECR": "35, Kapaleeshwarar Nagar, 4th South Cross St, Neelankarai, Chennai, Tamil Nadu 600115",
    "Perungudi, OMR": "Flat 14A, World Trade Center Tower, Perungudi, Chennai, Tamil Nadu 600096",
  };

  const matched = Object.keys(locMap).find(
    (k) =>
      location.toLowerCase().includes(k.toLowerCase()) ||
      k.toLowerCase().includes(location.toLowerCase())
  );
  if (matched) return locMap[matched];

  return `No. 12, Main Road, ${location}, ${city}, Tamil Nadu 600100`;
}

export default function LocationConnectivityMap({
  id,
  lat,
  lng,
  title,
  location,
  city,
  image,
  category = "Plots / Land",
  rating = 5.0,
  reviewsCount = 1,
  address,
  showHeading = true,
}: LocationConnectivityMapProps) {
  const [zoomOffset, setZoomOffset] = useState(0.015);

  const fullAddress = useMemo(() => {
    if (address) return address;
    return getRealisticAddress(location, title, city);
  }, [address, location, title, city]);

  const googleMapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${title}, ${location}, Chennai`
  )}`;
  const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

  const bbox = useMemo(() => {
    const minLng = lng - zoomOffset;
    const maxLng = lng + zoomOffset;
    const minLat = lat - zoomOffset;
    const maxLat = lat + zoomOffset;
    return `${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}`;
  }, [lat, lng, zoomOffset]);

  const handleZoomIn = () => {
    setZoomOffset((prev) => Math.max(0.002, prev * 0.6));
  };

  const handleZoomOut = () => {
    setZoomOffset((prev) => Math.min(0.1, prev * 1.6));
  };

  return (
    <div className="w-full">
      {showHeading && (
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground">
            Location & Connectivity
          </h2>
          <p className="mt-2 text-sm text-muted-foreground font-sans">
            {location} — One of Chennai's most connected{" "}
            {isBuiltProperty(category) ? "neighborhoods" : "corridors"}
          </p>
        </div>
      )}

      {/* Map Card Wrapper */}
      <div className="relative aspect-[16/9] w-full min-h-[380px] md:min-h-[480px] overflow-hidden rounded-2xl border border-border bg-muted shadow-card select-none group">
        {/* Core Interactive Map Frame */}
        <iframe
          title={`Map showing location of ${title}`}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`}
          className="absolute inset-0 h-full w-full border-none transition-all duration-300 filter saturate-[0.85] contrast-[0.95]"
          loading="lazy"
        />

        {/* Floating Glass Search & Rating Card (Top-Left) */}
        <div className="absolute top-4 left-4 z-10 w-[calc(100%-2rem)] max-w-[340px] rounded-xl border border-border/80 bg-background/95 p-4 shadow-elevated backdrop-blur-md transition-all duration-300 hover:shadow-2xl hover:bg-background sm:w-auto">
          <div className="flex gap-4 items-start justify-between">
            <div className="min-w-0 flex-1">
              <h3 className="font-sans text-sm font-semibold tracking-tight text-foreground truncate">
                {title}
              </h3>
              <p className="mt-1 text-[11px] font-medium leading-relaxed text-muted-foreground line-clamp-2">
                {fullAddress}
              </p>
              
              {/* Rating & Review Info */}
              <div className="mt-2.5 flex items-center gap-1.5 text-xs">
                <span className="font-bold text-foreground">{rating.toFixed(1)}</span>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 fill-current ${
                        i < Math.floor(rating) ? "text-amber-500" : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <a
                  href={googleMapsSearchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-primary hover:underline hover:text-primary/80 transition ml-0.5"
                >
                  ({reviewsCount} {reviewsCount === 1 ? "review" : "reviews"})
                </a>
                <Info className="h-3.5 w-3.5 text-muted-foreground/40 ml-1 cursor-pointer hover:text-muted-foreground/60 transition" />
              </div>
            </div>

            {/* Premium Action Icon Controls */}
            <div className="flex gap-2 shrink-0 ml-1">
              {/* Open in external window or details page */}
              {id ? (
                <Link
                  to="/listings/$id"
                  params={{ id: id }}
                  title="View Property Details"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-background text-muted-foreground hover:bg-secondary hover:text-foreground shadow-sm transition-all duration-200"
                >
                  <ExternalLink className="h-4 w-4" />
                </Link>
              ) : (
                <a
                  href={googleMapsSearchUrl}
                  target="_blank"
                  rel="noreferrer"
                  title="View on Google Maps"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/80 bg-background text-muted-foreground hover:bg-secondary hover:text-foreground shadow-sm transition-all duration-200"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {/* Navigate / Get Directions */}
              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noreferrer"
                title="Get Directions"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground hover:opacity-90 shadow-sm hover:shadow transition-all duration-200"
              >
                <Navigation className="h-4 w-4 rotate-[45deg] translate-y-[-0.5px] translate-x-[0.5px]" />
              </a>
            </div>
          </div>
        </div>

        {/* Floating Mini Thumbnail Property Card (Bottom-Left) */}
        {image && (
          <div className="absolute bottom-4 left-4 z-10 hidden items-center gap-3 rounded-lg border border-border bg-background p-2.5 shadow-card transition-all duration-300 hover:shadow-lg sm:flex max-w-[280px]">
            <img
              src={image}
              alt=""
              className="h-10 w-12 shrink-0 rounded object-cover border border-border bg-muted"
            />
            <div className="min-w-0 flex-1">
              <p className="font-sans text-[11px] font-semibold text-foreground truncate">
                {title}
              </p>
              <p className="flex items-center gap-0.5 text-[9px] font-medium text-muted-foreground mt-0.5">
                <MapPin className="h-2.5 w-2.5 text-primary shrink-0" />
                <span className="truncate">{location}, Chennai</span>
              </p>
            </div>
          </div>
        )}

        {/* Map Control Buttons (Mock Zoom Stack, Bottom-Right) */}
        <div className="absolute right-4 bottom-10 z-10 flex flex-col gap-1 rounded-lg border border-border/80 bg-background/95 p-1 shadow-elevated backdrop-blur-sm">
          <button
            onClick={handleZoomIn}
            title="Zoom In"
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted text-foreground transition"
          >
            <Plus className="h-4 w-4" />
          </button>
          <div className="h-px bg-border/80 w-6 mx-auto" />
          <button
            onClick={handleZoomOut}
            title="Zoom Out"
            className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-muted text-foreground transition"
          >
            <Minus className="h-4 w-4" />
          </button>
        </div>

        {/* Google Maps Styled Copyright & Action Bar (Bottom-Right Panel) */}
        <div className="absolute bottom-0 right-0 z-10 flex flex-wrap items-center gap-x-2 bg-background/80 backdrop-blur-[2px] px-2 py-0.5 text-[9px] text-muted-foreground/80 border-t border-l border-border/30 rounded-tl shadow-sm select-none font-sans font-medium">
          <button className="hover:text-foreground transition cursor-pointer">Keyboard shortcuts</button>
          <span>•</span>
          <span>Map data ©2026</span>
          <span>•</span>
          <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer" className="hover:underline hover:text-foreground transition">Terms of Use</a>
          <span>•</span>
          <a href="https://www.openstreetmap.org" target="_blank" rel="noreferrer" className="hover:underline hover:text-foreground transition">Report a map error</a>
        </div>
      </div>
    </div>
  );
}
