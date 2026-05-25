import residential from "@/assets/plot-residential.jpg";
import commercial from "@/assets/plot-commercial.jpg";
import agricultural from "@/assets/plot-agricultural.jpg";
import investment from "@/assets/plot-investment.jpg";
import luxuryVilla from "@/assets/luxury-villa.png";
import modernApartment from "@/assets/modern-apartment.png";
import farmhouseImg from "@/assets/farmhouse.png";
import modernBungalow from "@/assets/modern-bungalow.png";
import duplexHouse from "@/assets/duplex-house.png";
import rowHouses from "@/assets/row-houses.png";
import beachCottage from "@/assets/beach-cottage.png";
import penthouse from "@/assets/penthouse.png";

export type PropertyCategory =
  | "Plots / Land"
  | "Villas & Homes"
  | "Apartments"
  | "Farmhouses"
  | "Commercial";

export function isBuiltProperty(category: PropertyCategory): boolean {
  return category === "Villas & Homes" || category === "Apartments" || category === "Farmhouses";
}

export type LandType =
  | "Residential Plot"
  | "Commercial Land"
  | "Agricultural Farmland"
  | "Investment Parcel";

export type BuiltType =
  | "House"
  | "Villa"
  | "Apartment / Flat"
  | "Farmhouse"
  | "Bungalow"
  | "Duplex House"
  | "Row House"
  | "Cottage"
  | "Penthouse";

export type PropertyType = LandType | BuiltType;

export interface Listing {
  id: string;
  title: string;
  category: PropertyCategory;
  type: PropertyType;
  location: string;
  city: string;
  priceLakh: number; // in lakhs
  pricePerSqft?: number;
  areaSqft: number;
  areaLabel: string;
  roadAccess: string;
  ownership: "Freehold" | "Leasehold";
  status: "Available" | "Sold" | "Reserved";
  verified: boolean;
  rera?: string;
  image: string;
  highlights: string[];
  nearby: { name: string; distance: string }[];
  description: string;
  lat: number;
  lng: number;
  // Built Property specific fields
  bedrooms?: number;
  bathrooms?: number;
  floors?: number;
  furnishing?: "Unfurnished" | "Semi-Furnished" | "Fully-Furnished";
}

export const PROPERTY_TYPE_DESCRIPTIONS: Record<PropertyType, string> = {
  "Residential Plot": "Plotted land ready for residential construction.",
  "Commercial Land": "Zoned land ideal for retail, office, or industrial use.",
  "Agricultural Farmland": "Fertile cultivation land with water and electricity.",
  "Investment Parcel": "High-growth potential land in upcoming development corridors.",
  House: "Independent residential home.",
  Villa: "Premium independent house, usually with more space, garden, and luxury design.",
  "Apartment / Flat": "Unit inside a building.",
  Farmhouse: "House built on agricultural or countryside land.",
  Bungalow: "Spacious single-family house, often one or two floors.",
  "Duplex House": "House with two connected floors.",
  "Row House": "Houses built in a connected row with similar design.",
  Cottage: "Small countryside or holiday-style house.",
  Penthouse: "Luxury apartment on the top floor of a building.",
};

export const listings: Listing[] = [
  {
    id: "GR-101",
    title: "Gated Residential Plot",
    category: "Plots / Land",
    type: "Residential Plot",
    location: "Tambaram West",
    city: "Chennai",
    priceLakh: 68,
    pricePerSqft: 3777,
    areaSqft: 1800,
    areaLabel: "1,800 sqft (0.75 Ground)",
    roadAccess: "30 ft tar road",
    ownership: "Freehold",
    status: "Available",
    verified: true,
    rera: "TN/01/Layout/9482/2025",
    image: residential,
    highlights: ["Gated layout", "Clear title & EC", "Corner plot", "Bank loan approved"],
    nearby: [
      { name: "Tambaram Railway Station", distance: "3.5 km" },
      { name: "Madras Christian College", distance: "4.0 km" },
      { name: "Hindu Mission Hospital", distance: "3.0 km" },
    ],
    description:
      "A premium east-facing residential plot in a fully developed gated community in Tambaram West. Features concrete roads, streetlights, underground drainage, and a sweet groundwater connection.",
    lat: 12.9229,
    lng: 80.1275,
  },
  {
    id: "VL-201",
    title: "Luxury Beachside Villa",
    category: "Villas & Homes",
    type: "Villa",
    location: "Akkarai, ECR",
    city: "Chennai",
    priceLakh: 420,
    pricePerSqft: 10500,
    areaSqft: 4000,
    areaLabel: "4,000 sqft built-up",
    roadAccess: "40 ft wide road",
    ownership: "Freehold",
    status: "Available",
    verified: true,
    image: luxuryVilla,
    highlights: [
      "Sea View",
      "Private Swimming Pool",
      "Landscaped Garden",
      "Premium Italian Marble",
    ],
    nearby: [
      { name: "Akkarai Beach", distance: "0.2 km" },
      { name: "VGP Universal Kingdom", distance: "1.5 km" },
      { name: "Sholinganallur Junction", distance: "4.5 km" },
    ],
    description:
      "An exquisite 4 BHK luxury villa in Akkarai on the ECR scenic corridor. Built with high-end specifications, featuring a private swimming pool, landscaped lawn, elevator, and modular kitchen.",
    lat: 12.8942,
    lng: 80.2458,
    bedrooms: 4,
    bathrooms: 4,
    floors: 2,
    furnishing: "Semi-Furnished",
  },
  {
    id: "AP-301",
    title: "Premium High-Rise Apartment",
    category: "Apartments",
    type: "Apartment / Flat",
    location: "Sholinganallur, OMR",
    city: "Chennai",
    priceLakh: 115,
    pricePerSqft: 6760,
    areaSqft: 1700,
    areaLabel: "1,700 sqft built-up",
    roadAccess: "Direct main road access",
    ownership: "Freehold",
    status: "Available",
    verified: true,
    rera: "TN/29/Building/1102/2024",
    image: modernApartment,
    highlights: ["3 BHK unit", "Clubhouse & Gym", "100% Power Backup", "Near IT Parks"],
    nearby: [
      { name: "ELCOT SEZ IT Park", distance: "1.2 km" },
      { name: "TIDEL Park", distance: "8.5 km" },
      { name: "Global Hospital", distance: "3.0 km" },
    ],
    description:
      "Modern 3 BHK apartment in a premium gated high-rise society. Located in the heart of OMR's IT hub, offering top-tier amenities including swimming pool, club house, gym, and 24/7 high-level security.",
    lat: 12.901,
    lng: 80.2279,
    bedrooms: 3,
    bathrooms: 3,
    floors: 1,
    furnishing: "Semi-Furnished",
  },
  {
    id: "FM-401",
    title: "Countryside Farmhouse",
    category: "Farmhouses",
    type: "Farmhouse",
    location: "Mahabalipuram Outskirts",
    city: "Chennai",
    priceLakh: 260,
    areaSqft: 10890,
    areaLabel: "0.25 Acre (10,890 sqft)",
    roadAccess: "20 ft mud road",
    ownership: "Freehold",
    status: "Available",
    verified: true,
    image: farmhouseImg,
    highlights: [
      "Organic Fruit Orchard",
      "Private Plunge Pool",
      "Fenced Boundary",
      "Sweet water borewell",
    ],
    nearby: [
      { name: "Mahabalipuram Shore Temple", distance: "8.0 km" },
      { name: "ECR Beach Road", distance: "1.5 km" },
      { name: "Intercontinental Resort", distance: "5.0 km" },
    ],
    description:
      "Charming 2 BHK weekend farmhouse built on a fertile quarter-acre plot of land. Comes with a private plunge pool, fruit-yielding trees (mango, coconut, chickoo), drip irrigation, and a rustic design ideal for weekend getaways.",
    lat: 12.6208,
    lng: 80.1948,
    bedrooms: 2,
    bathrooms: 2,
    floors: 1,
    furnishing: "Fully-Furnished",
  },
  {
    id: "BG-501",
    title: "Spacious Single-Family Bungalow",
    category: "Villas & Homes",
    type: "Bungalow",
    location: "Adyar",
    city: "Chennai",
    priceLakh: 850,
    pricePerSqft: 18888,
    areaSqft: 4500,
    areaLabel: "4,500 sqft built-up",
    roadAccess: "33 ft tar road",
    ownership: "Freehold",
    status: "Available",
    verified: true,
    image: modernBungalow,
    highlights: ["Posh Locality", "Independent Plot", "Vaastu Compliant", "3 Car Parking Slots"],
    nearby: [
      { name: "Adyar Depot", distance: "0.8 km" },
      { name: "Elliot's Beach Besant Nagar", distance: "2.2 km" },
      { name: "Fortis Malar Hospital", distance: "1.5 km" },
    ],
    description:
      "Stately 5 BHK independent bungalow in a highly peaceful, upscale residential street in Adyar. Built on a freehold plot with excellent ventilation, large balconies, family rooms, and independent power/water utilities.",
    lat: 13.0063,
    lng: 80.2567,
    bedrooms: 5,
    bathrooms: 5,
    floors: 2,
    furnishing: "Unfurnished",
  },
  {
    id: "DP-601",
    title: "Contemporary Duplex House",
    category: "Villas & Homes",
    type: "Duplex House",
    location: "Medavakkam",
    city: "Chennai",
    priceLakh: 135,
    pricePerSqft: 6750,
    areaSqft: 2000,
    areaLabel: "2,000 sqft built-up",
    roadAccess: "30 ft tar road",
    ownership: "Freehold",
    status: "Available",
    verified: true,
    image: duplexHouse,
    highlights: [
      "Wooden Internal Staircase",
      "Modular Kitchen",
      "Private Terrace",
      "Covered Car Park",
    ],
    nearby: [
      { name: "Medavakkam Junction", distance: "1.0 km" },
      { name: "Velachery Metro Station", distance: "5.5 km" },
      { name: "Nanmangalam Forest Park", distance: "2.0 km" },
    ],
    description:
      "Stunning 3 BHK duplex house with an open-to-sky courtyard, modern glass fittings, separate dining area, and independent terrace. Ideal for family living in a rapidly developing neighborhood.",
    lat: 12.9172,
    lng: 80.1921,
    bedrooms: 3,
    bathrooms: 3,
    floors: 2,
    furnishing: "Semi-Furnished",
  },
  {
    id: "RH-701",
    title: "Connected Row House",
    category: "Villas & Homes",
    type: "Row House",
    location: "Perumbakkam",
    city: "Chennai",
    priceLakh: 95,
    pricePerSqft: 5937,
    areaSqft: 1600,
    areaLabel: "1,600 sqft built-up",
    roadAccess: "30 ft tar road",
    ownership: "Freehold",
    status: "Available",
    verified: true,
    image: rowHouses,
    highlights: ["Modern Row Gated Community", "Low Maintenance", "Kids Play Area & Parks"],
    nearby: [
      { name: "Global Hospital", distance: "1.8 km" },
      { name: "OMR Sholinganallur", distance: "3.5 km" },
    ],
    description:
      "Elegantly designed 3 BHK row house in a close-knit gated township. Offers private parking, shared community amenities (gym, park, community hall), and excellent connectivity to the OMR IT corridor.",
    lat: 12.9015,
    lng: 80.1878,
    bedrooms: 3,
    bathrooms: 3,
    floors: 2,
    furnishing: "Semi-Furnished",
  },
  {
    id: "CT-801",
    title: "Holiday-style Beach Cottage",
    category: "Villas & Homes",
    type: "Cottage",
    location: "Kovalam, ECR",
    city: "Chennai",
    priceLakh: 165,
    pricePerSqft: 11000,
    areaSqft: 1500,
    areaLabel: "1,500 sqft built-up",
    roadAccess: "24 ft tar road",
    ownership: "Freehold",
    status: "Available",
    verified: true,
    image: beachCottage,
    highlights: [
      "Private Beach Access",
      "Thatch-style Roofing",
      "Fully Air Conditioned",
      "High Rental Yield",
    ],
    nearby: [
      { name: "Kovalam Surf School", distance: "0.5 km" },
      { name: "Taj Fisherman's Cove", distance: "1.0 km" },
      { name: "Muttukadu Boat House", distance: "2.5 km" },
    ],
    description:
      "Beautifully crafted beachside cottage with tropical landscaping, wooden deck, and modern comforts. Perfect as a weekend getaway or a highly profitable vacation rental.",
    lat: 12.7884,
    lng: 80.2505,
    bedrooms: 2,
    bathrooms: 2,
    floors: 1,
    furnishing: "Fully-Furnished",
  },
  {
    id: "PT-901",
    title: "Luxury Top-floor Penthouse",
    category: "Apartments",
    type: "Penthouse",
    location: "Velachery",
    city: "Chennai",
    priceLakh: 280,
    pricePerSqft: 8000,
    areaSqft: 3500,
    areaLabel: "3,500 sqft built-up",
    roadAccess: "60 ft main road frontage",
    ownership: "Freehold",
    status: "Available",
    verified: true,
    image: penthouse,
    highlights: [
      "Panoramic City Views",
      "Huge Private Terrace Garden",
      "Home Theatre Room",
      "Private Jacuzzi",
    ],
    nearby: [
      { name: "Phoenix Marketcity Mall", distance: "1.2 km" },
      { name: "Velachery Railway Station", distance: "0.8 km" },
      { name: "IIT Madras Campus", distance: "3.0 km" },
    ],
    description:
      "Ultra-luxury 4 BHK Penthouse on the top floor with an expansive private terrace garden. Offers stunning panoramic views of the city skyline, equipped with high-end designer fittings, private bar, and smart home automation.",
    lat: 12.9796,
    lng: 80.2185,
    bedrooms: 4,
    bathrooms: 4,
    floors: 1,
    furnishing: "Fully-Furnished",
  },
  {
    id: "HC-102",
    title: "Highway Commercial Land",
    category: "Commercial",
    type: "Commercial Land",
    location: "GST Road, Urapakkam",
    city: "Chennai",
    priceLakh: 480,
    pricePerSqft: 8000,
    areaSqft: 6000,
    areaLabel: "2.5 Grounds (6,000 sqft)",
    roadAccess: "Direct highway access",
    ownership: "Freehold",
    status: "Available",
    verified: true,
    image: commercial,
    highlights: [
      "GST Road Frontage",
      "Commercial Zoning",
      "Clear Title & EC",
      "High footfall zone",
    ],
    nearby: [
      { name: "Kilambakkam Bus Terminus", distance: "2.0 km" },
      { name: "Urapakkam Railway Station", distance: "0.5 km" },
      { name: "Vandalur Zoo", distance: "3.2 km" },
    ],
    description:
      "Prime commercial land of 2.5 Grounds with wide frontage directly facing the busy GST Road. Perfect for showrooms, retail complexes, car showrooms, hospitals, or institutional purposes.",
    lat: 12.8465,
    lng: 80.0658,
  },
  {
    id: "AG-103",
    title: "Agricultural Farmland",
    category: "Plots / Land",
    type: "Agricultural Farmland",
    location: "Sriperumbudur Outskirts",
    city: "Chennai",
    priceLakh: 75,
    areaSqft: 43560,
    areaLabel: "1 Acre (43,560 sqft)",
    roadAccess: "20 ft village road",
    ownership: "Freehold",
    status: "Reserved",
    verified: true,
    image: agricultural,
    highlights: ["Borewell & Free Electricity", "Fenced Boundary", "Coconut & Mango Trees"],
    nearby: [
      { name: "Sriperumbudur Rajiv Gandhi Memorial", distance: "6.0 km" },
      { name: "Chennai-Bangalore Highway", distance: "4.5 km" },
    ],
    description:
      "Highly fertile 1-acre agricultural farmland with a sweet-water borewell and free agricultural electricity connection. Located just off the main road, pre-fenced, and containing 40+ fruit trees.",
    lat: 12.9723,
    lng: 79.9511,
  },
  {
    id: "IN-104",
    title: "Smart City Investment Parcel",
    category: "Plots / Land",
    type: "Investment Parcel",
    location: "Oragadam Industrial Corridor",
    city: "Chennai",
    priceLakh: 38,
    pricePerSqft: 1583,
    areaSqft: 2400,
    areaLabel: "1 Ground (2,400 sqft)",
    roadAccess: "40 ft proposed road",
    ownership: "Freehold",
    status: "Sold",
    verified: true,
    image: investment,
    highlights: [
      "Industrial Growth Hub",
      "Proposed 6-Lane Expressway Access",
      "High Appreciation Zone",
    ],
    nearby: [
      { name: "Oragadam Industrial Junction", distance: "3.0 km" },
      { name: "Daimler India Commercial Vehicles", distance: "2.5 km" },
      { name: "Sriperumbudur SIPCOT", distance: "8.0 km" },
    ],
    description:
      "Strategic 1 ground plot located in the heart of Oragadam, South Asia's largest automotive corridor. Positioned for high capital appreciation driven by massive industrial infrastructure expansion and upcoming airport corridors.",
    lat: 12.8364,
    lng: 79.9575,
  },
  {
    id: "VL-202",
    title: "Ocean Breeze Luxury Villa",
    category: "Villas & Homes",
    type: "Villa",
    location: "Neelankarai, ECR",
    city: "Chennai",
    priceLakh: 380,
    pricePerSqft: 10857,
    areaSqft: 3500,
    areaLabel: "3,500 sqft built-up",
    roadAccess: "30 ft tar road",
    ownership: "Freehold",
    status: "Available",
    verified: true,
    image: luxuryVilla,
    highlights: ["Sea view from terrace", "Private garden", "Vaastu compliant", "Rooftop deck"],
    nearby: [
      { name: "Neelankarai Beach", distance: "0.4 km" },
      { name: "Mayajaal Multiplex", distance: "5.0 km" },
      { name: "Sholinganallur IT Corridor", distance: "6.0 km" },
    ],
    description:
      "A gorgeous modern 4 BHK villa located in Neelankarai, just walking distance from the ECR beach. Built with high-end structural design, featuring a private yard, marble flooring, and modular fittings.",
    lat: 12.9492,
    lng: 80.2588,
    bedrooms: 4,
    bathrooms: 4,
    floors: 2,
    furnishing: "Fully-Furnished",
  },
  {
    id: "AP-302",
    title: "Lakeview Executive Apartment",
    category: "Apartments",
    type: "Apartment / Flat",
    location: "Medavakkam",
    city: "Chennai",
    priceLakh: 85,
    pricePerSqft: 6071,
    areaSqft: 1400,
    areaLabel: "1,400 sqft built-up",
    roadAccess: "30 ft tar road",
    ownership: "Freehold",
    status: "Available",
    verified: true,
    image: modernApartment,
    highlights: [
      "Lake facing balcony",
      "Modular kitchen",
      "24/7 Security & CCTV",
      "Covered car park",
    ],
    nearby: [
      { name: "Medavakkam Lake Park", distance: "0.2 km" },
      { name: "Velachery Metro", distance: "6.0 km" },
    ],
    description:
      "Elegant 2 BHK apartment with beautiful lake views. Features an open modular kitchen, premium bath fittings, cross ventilation, and is situated inside a quiet residential gated community.",
    lat: 12.919,
    lng: 80.198,
    bedrooms: 2,
    bathrooms: 2,
    floors: 1,
    furnishing: "Semi-Furnished",
  },
  {
    id: "FM-402",
    title: "Green Meadows Farmhouse",
    category: "Farmhouses",
    type: "Farmhouse",
    location: "Padappai Outskirts",
    city: "Chennai",
    priceLakh: 180,
    areaSqft: 8712,
    areaLabel: "0.2 Acre (8,712 sqft)",
    roadAccess: "20 ft gravel road",
    ownership: "Freehold",
    status: "Available",
    verified: true,
    image: farmhouseImg,
    highlights: [
      "Swimming Pool",
      "Fruit trees orchard",
      "Borewell with sweet water",
      "Completely fenced",
    ],
    nearby: [
      { name: "Outer Ring Road (Padappai)", distance: "3.5 km" },
      { name: "Oragadam Industrial Hub", distance: "10.0 km" },
    ],
    description:
      "Splendid weekend getaway farmhouse built on a lush 0.2 acre plot. Features a private plunge pool, fully landscaped garden with mango/coconut trees, drip irrigation, and an open deck area.",
    lat: 12.875,
    lng: 80.015,
    bedrooms: 3,
    bathrooms: 3,
    floors: 1,
    furnishing: "Fully-Furnished",
  },
  {
    id: "AP-303",
    title: "OMR Skyline Suites",
    category: "Apartments",
    type: "Apartment / Flat",
    location: "Perungudi, OMR",
    city: "Chennai",
    priceLakh: 160,
    pricePerSqft: 7619,
    areaSqft: 2100,
    areaLabel: "2,100 sqft built-up",
    roadAccess: "60 ft main road frontage",
    ownership: "Freehold",
    status: "Available",
    verified: true,
    image: modernApartment,
    highlights: [
      "3 BHK luxury unit",
      "Clubhouse, gym & infinity pool",
      "100% backup",
      "Walkable to IT parks",
    ],
    nearby: [
      { name: "World Trade Center", distance: "0.5 km" },
      { name: "Perungudi Lake", distance: "1.0 km" },
    ],
    description:
      "Luxury 3 BHK high-rise residence offering panoramic views of the city. Located in Perungudi OMR, featuring world-class amenities, central air conditioning, and top-tier security systems.",
    lat: 12.962,
    lng: 80.242,
    bedrooms: 3,
    bathrooms: 3,
    floors: 1,
    furnishing: "Semi-Furnished",
  },
  {
    id: "VL-203",
    title: "Serene Garden Villa",
    category: "Villas & Homes",
    type: "Villa",
    location: "Tambaram East",
    city: "Chennai",
    priceLakh: 195,
    pricePerSqft: 7500,
    areaSqft: 2600,
    areaLabel: "2,600 sqft built-up",
    roadAccess: "30 ft tar road",
    ownership: "Freehold",
    status: "Available",
    verified: true,
    image: luxuryVilla,
    highlights: [
      "Private yard & garden",
      "Vaastu layout",
      "Covered garage",
      "Quiet residential avenue",
    ],
    nearby: [
      { name: "Tambaram Railway Station", distance: "4.5 km" },
      { name: "Selaiyur Lake", distance: "2.0 km" },
    ],
    description:
      "Beautiful independent 3 BHK garden villa with a private compound and covered car park. Nestled in a premium residential layout in Tambaram East with abundant groundwater.",
    lat: 12.915,
    lng: 80.145,
    bedrooms: 3,
    bathrooms: 3,
    floors: 2,
    furnishing: "Semi-Furnished",
  },
];

export const popularLocations = [
  { name: "OMR Road", count: 85, image: residential },
  { name: "ECR Coastline", count: 64, image: commercial },
  { name: "Tambaram Belt", count: 98, image: investment },
  { name: "Sriperumbudur Area", count: 42, image: agricultural },
  { name: "GST Road Corridor", count: 73, image: investment },
  { name: "Oragadam Hub", count: 51, image: agricultural },
  { name: "Velachery & Adyar", count: 112, image: modernBungalow },
];

export const testimonials = [
  {
    name: "Srinivasan K.",
    role: "IT Director, OMR Chennai",
    quote:
      "H and H Realty made my villa search on ECR extremely smooth. Transparent pricing and complete lawyer-vetted documents gave me the confidence to buy.",
  },
  {
    name: "Dr. Shalini S.",
    role: "Resident Doctor, Tambaram",
    quote:
      "Buying an independent plot has always been stressful. H and H Realty handled the entire DTCP verification, drone mapping, and registration assistance.",
  },
  {
    name: "Karthik Raja",
    role: "Business Owner, Adyar",
    quote:
      "Finally, a portal that categorizes land and built properties correctly with clear, upfront pricing. I purchased a commercial lot on GST Road without broker issues.",
  },
];

export const blogPosts = [
  {
    slug: "land-buying-checklist-chennai",
    title: "Step-by-Step Guide: How to Safely Buy Land in Chennai",
    excerpt:
      "A simple step-by-step checklist that explains how to verify critical land paperwork (like ownership deeds and tax receipts) so you never get cheated.",
    read: "6 min read",
    tag: "Guides",
  },
  {
    slug: "rera-tn-explained",
    title: "Government Approval Guide: Is Your Plot 100% Legal?",
    excerpt:
      "Learn how to easily check if a property is approved by TNRERA, CMDA, or DTCP, ensuring your investment is completely legal and safe from demolition.",
    read: "8 min read",
    tag: "Legal",
  },
  {
    slug: "growth-corridors-chennai",
    title: "Best Investment Spots: Where Chennai Land Value is Doubling",
    excerpt:
      "A simplified breakdown of the fastest-growing locations near Chennai (like OMR, ECR, and GST road) where buying land offers the highest financial returns.",
    read: "10 min read",
    tag: "Investment",
  },
];

export function formatPrice(lakh: number, short = false): string {
  if (lakh >= 100) {
    const cr = lakh / 100;
    const formatted = cr.toFixed(cr % 1 === 0 ? 0 : 2).replace(/\.00$/, "");
    return `₹${formatted} ${short ? "Cr" : "Crore"}`;
  }
  return `₹${lakh} ${short ? "Lakh" : "Lakh"}`;
}
