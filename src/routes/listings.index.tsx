import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { SlidersHorizontal, Map as MapIcon, Grid as GridIcon, Search, BadgeCheck, CheckCircle2, ChevronRight, UploadCloud, X, Home, Building2, TreePine, LayoutGrid, ChevronDown } from "lucide-react";
import {
  listings,
  type PropertyCategory,
  type PropertyType,
  formatPrice,
} from "@/lib/listings";
import { ListingCard } from "@/components/listing-card";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { z } from "zod";

const listingsSearchSchema = z.object({
  category: z
    .enum(["Plots / Land", "Villas & Homes", "Apartments", "Farmhouses", "Commercial", "All"])
    .optional()
    .catch("All"),
  type: z.string().optional().catch("All"),
  location: z.string().optional().catch("All"),
  price: z.number().optional().catch(1000),
  available: z.boolean().optional().catch(true),
  ownership: z.enum(["All", "Freehold", "Leasehold"]).optional().catch("All"),
  q: z.string().optional().catch(""),
  purpose: z.enum(["buy", "rent", "sell"]).optional().catch("buy"),
});

const PROPERTY_TYPES_12 = [
  "Single Family",
  "Condominium",
  "Townhouse",
  "Co-Op",
  "Condop",
  "Apartment",
  "Multi-Family",
  "Land",
  "Commercial",
  "Farm",
  "Mobile/Manufactured",
  "Timeshare",
];

const matchesTypesFilter = (listingType: string, listingCategory: string, selected: string[]): boolean => {
  if (selected.length === 0) return false;
  return selected.some((sel) => {
    switch (sel) {
      case "Single Family":
        return ["Villa", "House", "Bungalow", "Duplex House", "Cottage"].includes(listingType);
      case "Condominium":
        return ["Apartment / Flat", "Penthouse"].includes(listingType);
      case "Townhouse":
        return ["Row House"].includes(listingType);
      case "Apartment":
        return ["Apartment / Flat", "Penthouse"].includes(listingType);
      case "Multi-Family":
        return ["Duplex House", "Row House"].includes(listingType);
      case "Land":
        return ["Residential Plot", "Investment Parcel", "Commercial Land", "Agricultural Farmland"].includes(listingType) || listingCategory === "Plots / Land";
      case "Commercial":
        return ["Commercial Land"].includes(listingType) || listingCategory === "Commercial";
      case "Farm":
        return ["Farmhouse", "Agricultural Farmland"].includes(listingType) || listingCategory === "Farmhouses";
      default:
        return false;
    }
  });
};

export const Route = createFileRoute("/listings/")({
  validateSearch: (search) => listingsSearchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "Browse Verified Properties & Plots near Chennai — H and H Realty" },
      {
        name: "description",
        content:
          "Search lawyer-vetted plots, luxury villas, bungalows, and apartments in Chennai. Filter by location, price, and type on our interactive split map engine.",
      },
    ],
  }),
  component: ListingsPage,
});

function ListingsPage() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();

  // Scroll tracking to synchronize layout offsets with the main header's visibility
  const [headerVisible, setHeaderVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  // Property Types Dropdown State
  const [selectedTypes, setSelectedTypes] = useState<string[]>(PROPERTY_TYPES_12);
  const [isTypeDropdownOpen, setIsTypeDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const difference = prevScrollPos - currentScrollPos;
      
      // Threshold: only trigger if scroll is > 5px or near the very top
      if (Math.abs(difference) > 5 || currentScrollPos < 10) {
        setHeaderVisible(difference > 0 || currentScrollPos < 10);
      }
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  // Core Purpose state matching The Agency (Buy | Rent | Sell), synchronized with URL search parameter
  const searchPurpose = search.purpose || "buy";
  const [purpose, setPurpose] = useState<"buy" | "rent" | "sell">(searchPurpose);

  useEffect(() => {
    setPurpose(searchPurpose);
  }, [searchPurpose]);

  // Image upload states for Sell page
  const [uploadedImages, setUploadedImages] = useState<{ name: string; size: string; preview: string }[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const newImages = filesArray.map((file) => ({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
        preview: URL.createObjectURL(file),
      }));
      setUploadedImages((prev) => [...prev, ...newImages].slice(0, 5));
    }
  };

  const removeUploadedImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };



  // 1. Restrict properties exclusively to Plots, Villas, Apartments, and Farmhouses (No Commercial)
  const restrictedListings = useMemo(() => {
    return listings;
  }, []);

  const category = search.category || "All";
  const type = search.type || "All";
  const location = search.location || "All";
  const maxPrice = search.price ?? 1000;
  const onlyAvailable = search.available ?? true;
  const ownership = search.ownership || "All";

  const dynamicMaxCeiling = useMemo(() => {
    const listForCategory = restrictedListings.filter(
      (l) => category === "All" || l.category === category
    );
    if (listForCategory.length === 0) return 1000;
    const maxVal = Math.max(...listForCategory.map((l) => l.priceLakh));
    return Math.min(1000, Math.ceil(maxVal / 50) * 50);
  }, [category, restrictedListings]);

  useEffect(() => {
    if (maxPrice > dynamicMaxCeiling) {
      updateSearch({ price: dynamicMaxCeiling });
    }
  }, [category, dynamicMaxCeiling]);

  // Search input state
  const [searchQuery, setSearchQuery] = useState(search.q || "");

  // Sell Form States
  const [sellFormSubmitted, setSellFormSubmitted] = useState(false);
  const [sellFormData, setSellFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    propertyType: "Plot / Land",
    address: "",
    size: "",
    message: "",
  });

  // Unique Locality / Area mapping
  const locations = useMemo(() => {
    return ["All", ...Array.from(new Set(restrictedListings.map((l) => l.location)))];
  }, [restrictedListings]);

  // Update search URL parameters
  const updateSearch = (updates: Partial<z.infer<typeof listingsSearchSchema>>) => {
    navigate({
      search: (prev) => {
        const next = { ...prev, ...updates };
        if (next.q === "") delete next.q;
        if (next.type === "All") delete next.type;
        if (next.location === "All") delete next.location;
        if (next.category === "All") delete next.category;
        if (next.ownership === "All") delete next.ownership;
        return next;
      },
      replace: true,
    });
  };

  const handleCategoryChange = (newCat: PropertyCategory | "All") => {
    updateSearch({
      category: newCat,
      type: "All",
    });
  };

  // Filter listings dynamically based on categories, budget, and types
  const filtered = useMemo(() => {
    return restrictedListings.filter((l) => {
      // If Purpose is 'rent', exclude raw plots since raw land isn't usually rented
      if (purpose === "rent" && l.category === "Plots / Land") return false;

      const matchesCategory = category === "All" || l.category === category;
      const matchesType = type === "All" || l.type === type;
      const matchesType12 = matchesTypesFilter(l.type, l.category, selectedTypes);
      const matchesLocation = location === "All" || l.location === location;
      
      // If rent, price threshold is scaled differently, but for base catalog filter:
      const matchesPrice = l.priceLakh <= maxPrice;
      const matchesAvailability = !onlyAvailable || l.status === "Available";
      const matchesOwnership = ownership === "All" || l.ownership === ownership;

      const matchesSearch =
        !searchQuery ||
        l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.description.toLowerCase().includes(searchQuery.toLowerCase());

      return (
        matchesCategory &&
        matchesType &&
        matchesType12 &&
        matchesLocation &&
        matchesPrice &&
        matchesAvailability &&
        matchesOwnership &&
        matchesSearch
      );
    });
  }, [restrictedListings, category, type, selectedTypes, location, maxPrice, onlyAvailable, ownership, searchQuery, purpose]);



  const getSubtypesForCategory = (cat: typeof category): PropertyType[] => {
    switch (cat) {
      case "Plots / Land":
        return ["Residential Plot", "Agricultural Farmland", "Investment Parcel"];
      case "Villas & Homes":
        return ["House", "Villa", "Bungalow", "Duplex House", "Row House", "Cottage"];
      case "Apartments":
        return ["Apartment / Flat", "Penthouse"];
      case "Farmhouses":
        return ["Farmhouse"];
      default:
        return [];
    }
  };

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSellFormSubmitted(true);
  };

  const renderFilterContent = () => (
    <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-end text-xs font-sans">
      {/* 1. Keyword search */}
      <div className="flex flex-col gap-2">
        <label className="font-bold tracking-wider uppercase text-foreground/75 text-[10px]">Keywords</label>
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              updateSearch({ q: e.target.value });
            }}
            placeholder="e.g. ECR Beach, Villa..."
            className="h-11 w-full rounded-xl border border-border bg-background/50 pl-10 pr-4 text-xs focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition text-foreground placeholder:text-muted-foreground/60"
          />
          <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground/50" />
        </div>
      </div>

      {/* 2. Type select dropdown */}
      <div className="flex flex-col gap-2">
        <label className="font-bold tracking-wider uppercase text-foreground/75 text-[10px]">Property Type</label>
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsTypeDropdownOpen(!isTypeDropdownOpen)}
            className="h-11 w-full flex items-center justify-between rounded-xl border border-border bg-background/50 px-4 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition cursor-pointer"
          >
            <span>Type ({selectedTypes.length})</span>
            <ChevronDown className="h-4 w-4 text-muted-foreground/50 shrink-0 ml-1" />
          </button>

          {isTypeDropdownOpen && (
            <>
              {/* Overlay to close on outside click */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsTypeDropdownOpen(false)}
              />
              {/* Dropdown container */}
              <div className="absolute left-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-elevated p-4 z-50 animate-scale-up space-y-4 max-h-[400px] overflow-y-auto">
                <div className="space-y-2.5">
                  {PROPERTY_TYPES_12.map((t) => {
                    const isChecked = selectedTypes.includes(t);
                    return (
                      <label
                        key={t}
                        className="flex items-center gap-3 cursor-pointer select-none group py-0.5 text-foreground hover:text-primary transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {
                            if (isChecked) {
                              setSelectedTypes(selectedTypes.filter((x) => x !== t));
                            } else {
                              setSelectedTypes([...selectedTypes, t]);
                            }
                          }}
                          className="hidden"
                        />
                        <div
                          className={`h-4 w-4 rounded flex items-center justify-center border transition-all ${
                            isChecked
                              ? "bg-accent border-accent text-accent-foreground"
                              : "border-muted-foreground/40 group-hover:border-accent/50 bg-background"
                          }`}
                        >
                          {isChecked && (
                            <svg
                              className="h-2.5 w-2.5 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                            </svg>
                          )}
                        </div>
                        <span className="text-xs font-sans text-foreground/90 font-medium">
                          {t}
                        </span>
                      </label>
                    );
                  })}
                </div>

                <div className="flex justify-end pt-2 border-t border-border/50">
                  <button
                    type="button"
                    onClick={() => setIsTypeDropdownOpen(false)}
                    className="bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer"
                  >
                    DONE
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 3. Locality select */}
      <div className="flex flex-col gap-2">
        <label className="font-bold tracking-wider uppercase text-foreground/75 text-[10px]">Locality</label>
        <div className="relative">
          <select
            value={location}
            onChange={(e) => updateSearch({ location: e.target.value })}
            className="h-11 w-full appearance-none rounded-xl border border-border bg-background/50 pl-4 pr-10 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition cursor-pointer"
          >
            {locations.map((loc) => (
              <option key={loc} value={loc} className="bg-card text-foreground">
                {loc === "All" ? "All Areas" : loc}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
        </div>
      </div>

      {/* 4. Ownership select */}
      <div className="flex flex-col gap-2">
        <label className="font-bold tracking-wider uppercase text-foreground/75 text-[10px]">Ownership</label>
        <div className="relative">
          <select
            value={ownership}
            onChange={(e) => updateSearch({ ownership: e.target.value as any })}
            className="h-11 w-full appearance-none rounded-xl border border-border bg-background/50 pl-4 pr-10 text-xs font-medium text-foreground focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition cursor-pointer"
          >
            <option value="All" className="bg-card text-foreground">All Ownerships</option>
            <option value="Freehold" className="bg-card text-foreground">Freehold</option>
            <option value="Leasehold" className="bg-card text-foreground">Leasehold</option>
          </select>
          <ChevronDown className="absolute right-3.5 top-3.5 h-4 w-4 text-muted-foreground/50 pointer-events-none" />
        </div>
      </div>

      {/* 5. Price range slider */}
      <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-foreground/75">
          <span>Max Budget</span>
          <span className="text-accent font-bold bg-accent/10 px-2.5 py-0.5 rounded border border-accent/20">{formatPrice(maxPrice, true)}</span>
        </div>
        <div className="flex items-center h-11">
          <input
            type="range"
            min={20}
            max={dynamicMaxCeiling}
            step={20}
            value={maxPrice}
            onChange={(e) => updateSearch({ price: Number(e.target.value) })}
            className="w-full accent-accent h-1.5 rounded-full bg-border/60 cursor-pointer"
          />
        </div>
      </div>

      {/* 6. Clear filters button */}
      <div className="flex items-end h-11">
        <button
          onClick={() => {
            updateSearch({
              category: "All",
              type: "All",
              location: "All",
              price: 1000,
              available: true,
              ownership: "All",
              q: "",
            });
            setSearchQuery("");
            setSelectedTypes(PROPERTY_TYPES_12);
          }}
          className="h-11 w-full rounded-xl text-[10px] font-bold tracking-widest uppercase text-muted-foreground hover:text-accent hover:bg-accent/15 border border-border hover:border-accent/30 bg-background/50 transition duration-200 cursor-pointer flex items-center justify-center gap-1.5"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );

  const categoriesList = [
    { value: "All", label: "All Types", icon: <LayoutGrid className="h-4 w-4" /> },
    { value: "Plots / Land", label: "Plots & Lands", icon: <MapIcon className="h-4 w-4" /> },
    { value: "Villas & Homes", label: "Villas & Homes", icon: <Home className="h-4 w-4" /> },
    { value: "Apartments", label: "Apartments", icon: <Building2 className="h-4 w-4" /> },
    { value: "Farmhouses", label: "Farmhouses", icon: <TreePine className="h-4 w-4" /> },
  ] as const;

  return (
    <div className="bg-background min-h-screen">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden bg-primary pt-28 pb-12 md:pt-36 md:pb-16 text-primary-foreground border-b border-border/10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-accent/25 via-primary to-primary-dark opacity-95" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3 text-left">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/30 px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              Verified Catalog
            </span>
            <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-white leading-none">
              Explore Premium Properties
            </h1>
            <p className="text-sm text-white/70 max-w-xl leading-relaxed font-sans">
              Discover title-vetted land parcels, luxury villas, modern apartments, and green farmhouses in the most sought-after locations.
            </p>
          </div>
          
          {/* Purpose Tabs (Buy / Rent / Sell) */}
          <div className="flex rounded-full bg-white/5 backdrop-blur-md p-1 border border-white/10 shrink-0 self-center md:self-end">
            {[
              { value: "buy", label: "Buy" },
              { value: "rent", label: "Rent" },
              { value: "sell", label: "Sell" },
            ].map((t) => {
              const isActive = purpose === t.value;
              return (
                <button
                  key={t.value}
                  onClick={() => {
                    setPurpose(t.value as "buy" | "rent" | "sell");
                    updateSearch({ purpose: t.value as any });
                  }}
                  className={`rounded-full px-6 py-2.5 text-[11px] font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-accent text-accent-foreground shadow-lg scale-105"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Filter Section */}
      {purpose !== "sell" && (
        <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8">
          {/* Glassmorphic Filter Card */}
          <div className="rounded-2xl border border-border/80 bg-card/85 backdrop-blur-lg p-6 shadow-elevated space-y-6">
            
            {/* Category visual badge selectors */}
            <div className="flex flex-col gap-2 pb-4 border-b border-border/50">
              <span className="font-bold tracking-wider uppercase text-foreground/60 text-[10px] select-none">Property Category</span>
              <div className="flex flex-nowrap md:flex-wrap gap-2.5 overflow-x-auto scrollbar-none pb-1">
                {categoriesList.map((cat) => {
                  const isActive = category === cat.value;
                  return (
                    <button
                      key={cat.value}
                      onClick={() => handleCategoryChange(cat.value as any)}
                      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer border ${
                        isActive
                          ? "bg-accent border-accent text-accent-foreground shadow-md scale-105 font-bold"
                          : "bg-background/40 hover:bg-background/80 border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {cat.icon}
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rest of filters */}
            {renderFilterContent()}
          </div>
        </div>
      )}

      {/* Main Contents */}
      {purpose === "sell" ? (
        /* SELL VIEW (Elegant Agency Form layout) */
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:py-24">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 border border-accent/25 px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Sell with H and H Realty
            </span>
            <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
              List Your Property With Experts
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans">
              Connect with our elite team of real estate attorneys and land advisors. We offer full legal verification, aerial drone photography, and direct connections to high-intent buyers.
            </p>
          </div>

          {sellFormSubmitted ? (
            <div className="rounded-2xl border border-accent/30 bg-accent/5 p-10 text-center shadow-elevated animate-scale-up space-y-6 max-w-xl mx-auto">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-success/15 border border-success/30 text-success">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground">Listing Request Received</h3>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                Thank you! Our Land Attorney and Lead Advisor will review your submission and contact you within 30 minutes to schedule a site inspection and legal verification.
              </p>
              <button
                onClick={() => {
                  setSellFormSubmitted(false);
                  setSellFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    propertyType: "Plot / Land",
                    address: "",
                    size: "",
                    message: "",
                  });
                  setUploadedImages([]);
                }}
                className="rounded-xl bg-accent px-8 py-3 text-xs font-bold uppercase tracking-widest text-accent-foreground hover:bg-accent/90 transition shadow-md cursor-pointer"
              >
                Submit Another Property
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSellSubmit}
              className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-6 shadow-elevated md:p-10 text-xs font-sans space-y-8"
            >
              <div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Listing Information Form
                </h3>
                <p className="text-[11px] text-muted-foreground mt-1">Please provide accurate owner and property details to initiate legal checks.</p>
              </div>
              
              <div className="space-y-6">
                {/* Section 1: Owner Contact */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-accent border-b border-border pb-1.5">
                    1. Contact Information
                  </h4>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold tracking-wider uppercase text-foreground/80 text-[10px]">First Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Rajiv"
                        value={sellFormData.firstName}
                        onChange={(e) => setSellFormData({ ...sellFormData, firstName: e.target.value })}
                        className="h-11 w-full rounded-xl border border-border bg-background px-4 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition text-foreground placeholder:text-muted-foreground/40 text-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold tracking-wider uppercase text-foreground/80 text-[10px]">Last Name</label>
                      <input
                        required
                        type="text"
                        placeholder="Krishnan"
                        value={sellFormData.lastName}
                        onChange={(e) => setSellFormData({ ...sellFormData, lastName: e.target.value })}
                        className="h-11 w-full rounded-xl border border-border bg-background px-4 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition text-foreground placeholder:text-muted-foreground/40 text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold tracking-wider uppercase text-foreground/80 text-[10px]">Email Address</label>
                      <input
                        required
                        type="email"
                        placeholder="rajiv@email.com"
                        value={sellFormData.email}
                        onChange={(e) => setSellFormData({ ...sellFormData, email: e.target.value })}
                        className="h-11 w-full rounded-xl border border-border bg-background px-4 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition text-foreground placeholder:text-muted-foreground/40 text-xs"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold tracking-wider uppercase text-foreground/80 text-[10px]">Phone Number</label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={sellFormData.phone}
                        onChange={(e) => setSellFormData({ ...sellFormData, phone: e.target.value })}
                        className="h-11 w-full rounded-xl border border-border bg-background px-4 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition text-foreground placeholder:text-muted-foreground/40 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Property details */}
                <div className="space-y-4 pt-4">
                  <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-accent border-b border-border pb-1.5">
                    2. Property Details
                  </h4>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold tracking-wider uppercase text-foreground/80 text-[10px]">Property Type</label>
                      <div className="relative">
                        <select
                          value={sellFormData.propertyType}
                          onChange={(e) => setSellFormData({ ...sellFormData, propertyType: e.target.value })}
                          className="h-11 w-full appearance-none rounded-xl border border-border bg-background px-4 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition text-foreground cursor-pointer text-xs"
                        >
                          <option>Plot / Land</option>
                          <option>Villa / House</option>
                          <option>Apartment / Flat</option>
                          <option>Farmhouse / Cottage</option>
                        </select>
                        <ChevronDown className="absolute right-3.5 top-3.5 h-4.5 w-4.5 text-muted-foreground/60 pointer-events-none" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="font-bold tracking-wider uppercase text-foreground/80 text-[10px]">Area / Size</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. 2400 sqft (1 Ground)"
                        value={sellFormData.size}
                        onChange={(e) => setSellFormData({ ...sellFormData, size: e.target.value })}
                        className="h-11 w-full rounded-xl border border-border bg-background px-4 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition text-foreground placeholder:text-muted-foreground/40 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold tracking-wider uppercase text-foreground/80 text-[10px]">Property Address & Locality</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. No 14 Gandhi Street, Tambaram West, Chennai"
                      value={sellFormData.address}
                      onChange={(e) => setSellFormData({ ...sellFormData, address: e.target.value })}
                      className="h-11 w-full rounded-xl border border-border bg-background px-4 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition text-foreground placeholder:text-muted-foreground/40 text-xs"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-bold tracking-wider uppercase text-foreground/80 text-[10px]">Key Highlights & Description</label>
                    <textarea
                      rows={4}
                      placeholder="e.g. East facing corner plot inside gated layouts, clear title deeds, nearby schools..."
                      value={sellFormData.message}
                      onChange={(e) => setSellFormData({ ...sellFormData, message: e.target.value })}
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent transition text-foreground placeholder:text-muted-foreground/40 text-xs"
                    />
                  </div>
                </div>

                {/* Section 3: Media Upload */}
                <div className="space-y-4 pt-4">
                  <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-accent border-b border-border pb-1.5">
                    3. Media Upload
                  </h4>
                  <div className="flex flex-col gap-2.5">
                    <label className="font-bold tracking-wider uppercase text-foreground/80 text-[10px]">Upload Photos (Optional)</label>
                    
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-border/80 hover:border-accent/40 bg-background/30 hover:bg-background/70 transition rounded-xl p-8 cursor-pointer select-none text-center gap-2 group">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <UploadCloud className="h-9 w-9 text-muted-foreground/60 group-hover:text-accent transition duration-200" />
                      <div className="space-y-1 mt-1">
                        <p className="font-bold text-foreground/90 text-xs">Click to upload photos</p>
                        <p className="text-muted-foreground text-[10px]">Support PNG, JPG, JPEG up to 5 photos (Max 5MB each)</p>
                      </div>
                    </label>

                    {uploadedImages.length > 0 && (
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-3">
                        {uploadedImages.map((img, idx) => (
                          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-border bg-muted shadow-sm group animate-scale-up">
                            <img src={img.preview} alt={img.name} className="h-full w-full object-cover" />
                            <button
                              type="button"
                              onClick={() => removeUploadedImage(idx)}
                              className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-black/85 text-white p-1 rounded-full shadow-md transition cursor-pointer"
                            >
                              <X className="h-3 w-3" />
                            </button>
                            <div className="absolute inset-x-0 bottom-0 bg-black/50 px-2 py-1 text-[8px] text-white truncate font-medium">
                              {img.name}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border/50">
                <button
                  type="submit"
                  className="w-full inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold tracking-widest uppercase hover:bg-accent/90 hover:scale-[1.01] transition-all duration-200 cursor-pointer shadow-md"
                >
                  Submit Property Details <ChevronRight className="h-4.5 w-4.5" />
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        /* Grid list only (No Map) */
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-6">
          {filtered.length > 0 && (
            <div className="flex items-center justify-between border-b border-border/40 pb-4">
              <h3 className="font-sans text-xs font-bold uppercase tracking-widest text-muted-foreground select-none">
                Showing {filtered.length} Lawyer-Vetted {filtered.length === 1 ? "Listing" : "Listings"} in Chennai
              </h3>
            </div>
          )}
          
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border/80 p-12 text-center text-muted-foreground select-none max-w-lg mx-auto mt-12 bg-card shadow-sm">
              <MapIcon className="mx-auto h-12 w-12 text-muted-foreground/45 mb-3" />
              <p className="text-lg font-medium text-foreground">No Properties Found</p>
              <p className="text-xs mt-1 leading-normal max-w-sm mx-auto">
                We currently listed no {category === "All" ? "" : category} matching these precise price margins in your selected locality. Try clearing filters.
              </p>
              <button
                onClick={() => {
                  updateSearch({
                    category: "All",
                    type: "All",
                    location: "All",
                    price: 1000,
                    available: true,
                    ownership: "All",
                    q: "",
                  });
                  setSearchQuery("");
                  setSelectedTypes(PROPERTY_TYPES_12);
                }}
                className="mt-6 inline-flex rounded-xl bg-accent px-6 py-2.5 text-[10px] font-bold uppercase tracking-wider text-accent-foreground hover:bg-accent/95 shadow cursor-pointer transition active:scale-95"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 self-start animate-fade-in">
              {filtered.map((l) => (
                <ListingCard
                  key={l.id}
                  l={l}
                  rentMode={purpose === "rent"}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
