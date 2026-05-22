import residential from "@/assets/plot-residential.jpg";
import commercial from "@/assets/plot-commercial.jpg";
import agricultural from "@/assets/plot-agricultural.jpg";
import investment from "@/assets/plot-investment.jpg";

export type LandType = "Residential" | "Commercial" | "Agricultural" | "Investment";

export interface Listing {
  id: string;
  title: string;
  type: LandType;
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
}

export const listings: Listing[] = [
  {
    id: "GR-101",
    title: "Greenfield Residential Plot",
    type: "Residential",
    location: "Sarjapur Road",
    city: "Bengaluru",
    priceLakh: 78,
    pricePerSqft: 6500,
    areaSqft: 1200,
    areaLabel: "1,200 sqft",
    roadAccess: "30 ft tar road",
    ownership: "Freehold",
    status: "Available",
    verified: true,
    rera: "PRM/KA/RERA/1251/310/PR/0823",
    image: residential,
    highlights: ["Gated layout", "Clear title", "Corner plot", "Bank loan approved"],
    nearby: [
      { name: "Wipro Corporate Office", distance: "4.2 km" },
      { name: "Greenwood High School", distance: "2.1 km" },
      { name: "Decathlon", distance: "3.8 km" },
    ],
    description:
      "A premium east-facing residential plot in a fully developed gated layout with paved roads, streetlights, underground drainage and 24/7 security.",
    lat: 12.9009,
    lng: 77.7401,
  },
  {
    id: "HC-204",
    title: "Highway Commercial Land",
    type: "Commercial",
    location: "NH-44 Frontage",
    city: "Hyderabad",
    priceLakh: 320,
    pricePerSqft: 8000,
    areaSqft: 4000,
    areaLabel: "4,000 sqft",
    roadAccess: "Direct highway access",
    ownership: "Freehold",
    status: "Available",
    verified: true,
    image: commercial,
    highlights: ["Highway facing", "High footfall", "Zoning approved", "Wide frontage"],
    nearby: [
      { name: "ORR Junction", distance: "1.1 km" },
      { name: "Inorbit Mall", distance: "6.0 km" },
      { name: "Hyderabad Airport", distance: "18 km" },
    ],
    description:
      "Prime commercial land with direct highway frontage, ideal for showrooms, fuel stations, or hospitality projects.",
    lat: 17.385,
    lng: 78.4867,
  },
  {
    id: "AG-309",
    title: "Fertile Mango Farmland",
    type: "Agricultural",
    location: "Doddaballapur",
    city: "Bengaluru Rural",
    priceLakh: 145,
    areaSqft: 43560,
    areaLabel: "1 acre",
    roadAccess: "20 ft mud road",
    ownership: "Freehold",
    status: "Available",
    verified: true,
    image: agricultural,
    highlights: ["Borewell water", "Mango orchard", "Fenced", "Electricity connection"],
    nearby: [
      { name: "Nandi Hills", distance: "22 km" },
      { name: "Devanahalli Town", distance: "14 km" },
      { name: "Kempegowda Airport", distance: "28 km" },
    ],
    description:
      "Productive agricultural land with 80+ mature mango trees, fully fenced, with year-round borewell water and a small farm shed.",
    lat: 13.2257,
    lng: 77.5697,
  },
  {
    id: "IN-412",
    title: "Pre-launch Investment Parcel",
    type: "Investment",
    location: "Tumkur Smart City Belt",
    city: "Tumkur",
    priceLakh: 42,
    pricePerSqft: 3500,
    areaSqft: 1200,
    areaLabel: "1,200 sqft",
    roadAccess: "40 ft proposed road",
    ownership: "Freehold",
    status: "Available",
    verified: true,
    image: investment,
    highlights: ["High appreciation zone", "Near upcoming metro", "Easy resale"],
    nearby: [
      { name: "Proposed Metro Station", distance: "1.4 km" },
      { name: "Industrial Corridor", distance: "3.5 km" },
      { name: "Tumkur University", distance: "5.2 km" },
    ],
    description:
      "Hand-picked investment plot in a fast-developing smart city corridor projected to deliver strong 5-year appreciation.",
    lat: 13.3392,
    lng: 77.1011,
  },
  {
    id: "GR-115",
    title: "Lakeview Premium Plot",
    type: "Residential",
    location: "Devanahalli",
    city: "Bengaluru",
    priceLakh: 95,
    pricePerSqft: 7900,
    areaSqft: 1200,
    areaLabel: "1,200 sqft",
    roadAccess: "40 ft tar road",
    ownership: "Freehold",
    status: "Reserved",
    verified: true,
    image: residential,
    highlights: ["Lake view", "Clubhouse access", "Vaastu compliant"],
    nearby: [
      { name: "Airport", distance: "9 km" },
      { name: "Manyata Tech Park", distance: "25 km" },
    ],
    description: "North-east facing lakeview plot in a premium gated community with clubhouse.",
    lat: 13.2469,
    lng: 77.7066,
  },
  {
    id: "AG-321",
    title: "River-side Agricultural Land",
    type: "Agricultural",
    location: "Mysuru Belt",
    city: "Mysuru",
    priceLakh: 88,
    areaSqft: 43560,
    areaLabel: "1 acre",
    roadAccess: "Village road",
    ownership: "Freehold",
    status: "Sold",
    verified: true,
    image: agricultural,
    highlights: ["River access", "Coconut grove", "Fenced"],
    nearby: [{ name: "Mysuru City", distance: "18 km" }],
    description: "Productive river-side agricultural land with coconut grove.",
    lat: 12.2958,
    lng: 76.6394,
  },
];

export const popularLocations = [
  { name: "Bengaluru", count: 124, image: residential },
  { name: "Hyderabad", count: 86, image: commercial },
  { name: "Mysuru", count: 52, image: agricultural },
  { name: "Tumkur", count: 41, image: investment },
];

export const testimonials = [
  {
    name: "Anita Reddy",
    role: "Investor, Bengaluru",
    quote:
      "Terraline made my first land purchase effortless — the legal verification and site visit were spot-on.",
  },
  {
    name: "Rohit Sharma",
    role: "NRI Buyer, Dubai",
    quote:
      "I bought a plot remotely and never felt unsure. Documents, drone tour, and registration were transparent.",
  },
  {
    name: "Meera Iyer",
    role: "Farmer, Mysuru",
    quote:
      "Finally a platform that treats agricultural land seriously. Genuine listings and honest agents.",
  },
];

export const blogPosts = [
  {
    slug: "land-buying-checklist-2026",
    title: "The 12-point land buying checklist for 2026",
    excerpt:
      "From title deed to encumbrance certificate — every document you must verify before signing.",
    read: "6 min read",
    tag: "Guides",
  },
  {
    slug: "rera-explained",
    title: "RERA explained: what land buyers actually need to know",
    excerpt:
      "A plain-English breakdown of how RERA protects you when buying plotted developments.",
    read: "8 min read",
    tag: "Legal",
  },
  {
    slug: "investment-corridors-south-india",
    title: "5 high-growth land investment corridors in South India",
    excerpt: "Where smart money is buying ahead of the next infrastructure wave.",
    read: "10 min read",
    tag: "Investment",
  },
];
