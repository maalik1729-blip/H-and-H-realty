import { useState, useRef } from "react";
import { ShieldCheck, MessageCircle, Info, Sparkles, MapPin, X, ArrowRight } from "lucide-react";

interface Plot {
  id: string;
  number: number;
  sizeSqft: number;
  priceLakh: number;
  status: "Available" | "Reserved" | "Sold";
  facing: "East" | "West" | "North" | "South";
  dimensions: string;
  points: string;
  textX: number;
  textY: number;
}

const PLOTS_DATA: Plot[] = [
  // Top Row (Facing North/Road A) - Y from 80 to 200
  {
    id: "OB-01",
    number: 1,
    sizeSqft: 2400,
    priceLakh: 96,
    status: "Available",
    facing: "North",
    dimensions: "40' x 60'",
    points: "100,80 160,80 160,200 100,200",
    textX: 130,
    textY: 145,
  },
  {
    id: "OB-02",
    number: 2,
    sizeSqft: 1800,
    priceLakh: 72,
    status: "Sold",
    facing: "North",
    dimensions: "30' x 60'",
    points: "160,80 220,80 220,200 160,200",
    textX: 190,
    textY: 145,
  },
  {
    id: "OB-03",
    number: 3,
    sizeSqft: 1800,
    priceLakh: 72,
    status: "Available",
    facing: "North",
    dimensions: "30' x 60'",
    points: "220,80 280,80 280,200 220,200",
    textX: 250,
    textY: 145,
  },
  {
    id: "OB-04",
    number: 4,
    sizeSqft: 1800,
    priceLakh: 72,
    status: "Reserved",
    facing: "North",
    dimensions: "30' x 60'",
    points: "280,80 340,80 340,200 280,200",
    textX: 310,
    textY: 145,
  },
  {
    id: "OB-05",
    number: 5,
    sizeSqft: 1800,
    priceLakh: 72,
    status: "Available",
    facing: "North",
    dimensions: "30' x 60'",
    points: "340,80 400,80 400,200 340,200",
    textX: 370,
    textY: 145,
  },
  {
    id: "OB-06",
    number: 6,
    sizeSqft: 1800,
    priceLakh: 72,
    status: "Sold",
    facing: "North",
    dimensions: "30' x 60'",
    points: "400,80 460,80 460,200 400,200",
    textX: 430,
    textY: 145,
  },
  {
    id: "OB-07",
    number: 7,
    sizeSqft: 1800,
    priceLakh: 72,
    status: "Available",
    facing: "North",
    dimensions: "30' x 60'",
    points: "460,80 520,80 520,200 460,200",
    textX: 490,
    textY: 145,
  },
  {
    id: "OB-08",
    number: 8,
    sizeSqft: 2800,
    priceLakh: 118,
    status: "Available",
    facing: "East",
    dimensions: "46' x 60'",
    points: "520,80 600,80 600,200 520,200",
    textX: 560,
    textY: 145,
  },

  // Bottom Row (Facing South/Road A) - Y from 240 to 360
  {
    id: "OB-09",
    number: 9,
    sizeSqft: 2400,
    priceLakh: 96,
    status: "Sold",
    facing: "South",
    dimensions: "40' x 60'",
    points: "100,240 160,240 160,360 100,360",
    textX: 130,
    textY: 305,
  },
  {
    id: "OB-10",
    number: 10,
    sizeSqft: 1800,
    priceLakh: 72,
    status: "Available",
    facing: "South",
    dimensions: "30' x 60'",
    points: "160,240 220,240 220,360 160,360",
    textX: 190,
    textY: 305,
  },
  {
    id: "OB-11",
    number: 11,
    sizeSqft: 1800,
    priceLakh: 72,
    status: "Available",
    facing: "South",
    dimensions: "30' x 60'",
    points: "220,240 280,240 280,360 220,360",
    textX: 250,
    textY: 305,
  },
  {
    id: "OB-12",
    number: 12,
    sizeSqft: 1800,
    priceLakh: 72,
    status: "Sold",
    facing: "South",
    dimensions: "30' x 60'",
    points: "280,240 340,240 340,360 280,360",
    textX: 310,
    textY: 305,
  },
  {
    id: "OB-13",
    number: 13,
    sizeSqft: 1800,
    priceLakh: 72,
    status: "Reserved",
    facing: "South",
    dimensions: "30' x 60'",
    points: "340,240 400,240 400,360 340,360",
    textX: 370,
    textY: 305,
  },
  {
    id: "OB-14",
    number: 14,
    sizeSqft: 1800,
    priceLakh: 72,
    status: "Available",
    facing: "South",
    dimensions: "30' x 60'",
    points: "400,240 460,240 460,360 400,360",
    textX: 430,
    textY: 305,
  },
  {
    id: "OB-15",
    number: 15,
    sizeSqft: 1800,
    priceLakh: 72,
    status: "Available",
    facing: "South",
    dimensions: "30' x 60'",
    points: "460,240 520,240 520,360 460,360",
    textX: 490,
    textY: 305,
  },
  {
    id: "OB-16",
    number: 16,
    sizeSqft: 2400,
    priceLakh: 98,
    status: "Available",
    facing: "West",
    dimensions: "40' x 60'",
    points: "520,240 600,240 600,360 520,360",
    textX: 560,
    textY: 305,
  },
];

export function PlotLayoutVisualizer() {
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(PLOTS_DATA[0]);
  const [hoveredPlot, setHoveredPlot] = useState<Plot | null>(null);
  const [statusFilter, setStatusFilter] = useState<"All" | "Available" | "Reserved">("All");
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setTooltipPos({
        x: e.clientX - rect.left + 15,
        y: e.clientY - rect.top - 15,
      });
    }
  };

  const getStatusColor = (status: Plot["status"], isHovered: boolean, isSelected: boolean) => {
    if (status === "Sold") {
      return isSelected
        ? "fill-slate-400 stroke-slate-500 opacity-90"
        : isHovered
          ? "fill-slate-300 stroke-slate-400 cursor-not-allowed opacity-80"
          : "fill-slate-200 stroke-slate-300 opacity-60";
    }
    if (status === "Reserved") {
      return isSelected
        ? "fill-amber-400 stroke-amber-600 opacity-90 shadow-lg"
        : isHovered
          ? "fill-amber-300 stroke-amber-500 cursor-pointer opacity-90"
          : "fill-amber-100 stroke-amber-300 opacity-70";
    }
    // Available
    return isSelected
      ? "fill-emerald-400 stroke-emerald-600 opacity-95 shadow-lg"
      : isHovered
        ? "fill-emerald-300 stroke-emerald-500 cursor-pointer opacity-90"
        : "fill-emerald-100/80 stroke-emerald-300 opacity-70";
  };

  const filteredPlots = PLOTS_DATA.filter((p) => {
    if (statusFilter === "All") return true;
    return p.status === statusFilter;
  });

  const whatsappMessage = selectedPlot
    ? `Hi H and H Realty, I'm interested in Plot #${selectedPlot.number} (${selectedPlot.sizeSqft} sqft, ${selectedPlot.facing} facing) at ECR Ocean Breeze Enclave. Is it still available?`
    : "";

  return (
    <section className="bg-card py-16 md:py-24 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-3.5 py-1 text-xs font-semibold text-accent uppercase tracking-wider mb-3">
              <Sparkles className="h-3.5 w-3.5" /> Interactive Experience
            </span>
            <h2 className="font-display text-3xl font-bold sm:text-4xl">
              Ocean Breeze Enclave, ECR
            </h2>
            <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
              Explore our master layout map below. Hover over any plot to view live availability,
              pricing, and dimensions. Click to select and request legal documentation.
            </p>
          </div>
          {/* Legend and Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setStatusFilter("All")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer border ${
                statusFilter === "All"
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary text-foreground border-border hover:bg-muted"
              }`}
            >
              All Plots
            </button>
            <button
              onClick={() => setStatusFilter("Available")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer border ${
                statusFilter === "Available"
                  ? "bg-emerald-600 text-white border-emerald-600"
                  : "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
              }`}
            >
              Available Plots
            </button>
            <button
              onClick={() => setStatusFilter("Reserved")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer border ${
                statusFilter === "Reserved"
                  ? "bg-amber-600 text-white border-amber-600"
                  : "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100"
              }`}
            >
              Reserved
            </button>
          </div>
        </div>

        {/* Main Content Layout */}
        <div className="grid gap-8 lg:grid-cols-[1.8fr_1fr]">
          {/* Left: SVG Canvas Container */}
          <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            className="relative rounded-3xl border border-border bg-slate-50/50 p-4 md:p-6 overflow-hidden flex items-center justify-center min-h-[300px] md:min-h-[460px] shadow-sm select-none"
          >
            {/* Tooltip */}
            {hoveredPlot && (
              <div
                className="absolute z-20 pointer-events-none rounded-xl bg-slate-900/95 text-slate-50 p-3 shadow-elevated border border-slate-800 text-xs w-48 backdrop-blur"
                style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
              >
                <div className="flex items-center justify-between font-bold border-b border-slate-800 pb-1.5 mb-1.5">
                  <span>Plot #{hoveredPlot.number}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-[4px] text-[10px] uppercase font-extrabold ${
                      hoveredPlot.status === "Available"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : hoveredPlot.status === "Reserved"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-slate-500/20 text-slate-400"
                    }`}
                  >
                    {hoveredPlot.status}
                  </span>
                </div>
                <div className="space-y-1 text-slate-300 font-medium">
                  <p className="flex justify-between">
                    <span>Size:</span>
                    <span className="font-semibold text-slate-100">
                      {hoveredPlot.sizeSqft} sqft
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-semibold text-slate-100">
                      ₹{hoveredPlot.priceLakh} Lakh
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Facing:</span>
                    <span className="font-semibold text-slate-100">{hoveredPlot.facing}</span>
                  </p>
                </div>
              </div>
            )}

            {/* SVG Visual Layout */}
            <svg
              viewBox="0 0 800 450"
              className="w-full h-auto max-h-[420px]"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Grid Background Lines for Techy Aesthetic */}
              <defs>
                <pattern id="layout-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="rgba(203, 213, 225, 0.25)"
                    strokeWidth="1"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#layout-grid)" className="rounded-2xl" />

              {/* Park Area */}
              <rect
                x="20"
                y="80"
                width="60"
                height="280"
                rx="12"
                className="fill-emerald-50/70 stroke-emerald-200/50"
                strokeWidth="2"
              />
              <g transform="translate(50, 220) rotate(-90)">
                <text
                  className="font-display font-bold text-xs fill-emerald-600/60 uppercase tracking-widest text-center"
                  textAnchor="middle"
                >
                  Central Green Park
                </text>
              </g>

              {/* Clubhouse Area */}
              <rect
                x="620"
                y="80"
                width="160"
                height="280"
                rx="16"
                className="fill-slate-100 stroke-slate-200"
                strokeWidth="2"
              />
              <g transform="translate(700, 220)">
                <circle cx="0" cy="-20" r="16" className="fill-accent/10 stroke-accent/20" />
                <path
                  d="M-6,-20 L0,-26 L6,-20 L4,-20 L4,-14 L-4,-14 L-4,-20 Z"
                  className="fill-accent"
                />
                <text
                  className="font-display font-bold text-xs fill-slate-700 uppercase tracking-wider mt-4"
                  textAnchor="middle"
                  y="20"
                >
                  Clubhouse
                </text>
                <text className="font-sans text-[10px] fill-slate-500" textAnchor="middle" y="34">
                  & Indoor Arena
                </text>
              </g>

              {/* Main Corridor Road */}
              <rect
                x="90"
                y="210"
                width="520"
                height="20"
                rx="4"
                className="fill-slate-200 stroke-slate-300"
              />
              <line
                x1="95"
                y1="220"
                x2="605"
                y2="220"
                stroke="#fff"
                strokeWidth="2"
                strokeDasharray="8 8"
              />
              <text
                x="350"
                y="224"
                className="font-sans font-bold text-[9px] fill-slate-500 uppercase tracking-widest"
                textAnchor="middle"
              >
                East Coast Boulevard (30 Ft. Road)
              </text>

              {/* Entrance Gate */}
              <path d="M 85,200 L 95,200 L 95,240 L 85,240 Z" className="fill-slate-700" />
              <text
                x="65"
                y="223"
                className="font-sans font-semibold text-[8px] fill-slate-400 uppercase tracking-wider rotate-90"
                transform="translate(0, 0)"
              >
                Main Entry
              </text>

              {/* Plots Group */}
              {PLOTS_DATA.map((p) => {
                const isSelected = selectedPlot?.id === p.id;
                const isHovered = hoveredPlot?.id === p.id;
                const isHiddenByFilter = statusFilter !== "All" && p.status !== statusFilter;

                return (
                  <g
                    key={p.id}
                    onClick={() => p.status !== "Sold" && setSelectedPlot(p)}
                    onMouseEnter={() => setHoveredPlot(p)}
                    onMouseLeave={() => setHoveredPlot(null)}
                    className={`transition-all duration-200 ${
                      p.status === "Sold" ? "cursor-not-allowed" : "cursor-pointer"
                    } ${isHiddenByFilter ? "opacity-20" : ""}`}
                  >
                    {/* Plot Polygon */}
                    <polygon
                      points={p.points}
                      className={`transition-all duration-300 ${getStatusColor(p.status, isHovered, isSelected)}`}
                      strokeWidth={isSelected ? 2.5 : isHovered ? 2 : 1}
                    />

                    {/* Plot Number Text */}
                    <text
                      x={p.textX}
                      y={p.textY}
                      className={`font-display text-xs font-bold transition-colors select-none ${
                        isSelected
                          ? "fill-primary"
                          : p.status === "Sold"
                            ? "fill-slate-400"
                            : p.status === "Reserved"
                              ? "fill-amber-800"
                              : "fill-emerald-800"
                      }`}
                      textAnchor="middle"
                    >
                      P-{p.number}
                    </text>

                    {/* Smaller Size Indicator Label */}
                    <text
                      x={p.textX}
                      y={p.textY + 12}
                      className="font-sans text-[8px] opacity-60 fill-slate-800 select-none"
                      textAnchor="middle"
                    >
                      {p.sizeSqft}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Mobile Touch Zoom Tip */}
            <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur px-2.5 py-1 rounded-lg border border-border text-[10px] text-muted-foreground flex items-center gap-1">
              <Info className="h-3 w-3" /> Select a plot for details
            </div>
          </div>

          {/* Right: Selected Plot Detail Card */}
          <div className="flex flex-col justify-between rounded-3xl border border-border bg-card p-6 md:p-8 shadow-card">
            {selectedPlot ? (
              <div className="flex-1 flex flex-col justify-between h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Plot Specifications
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                        selectedPlot.status === "Available"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                          : "bg-amber-100 text-amber-800 border border-amber-200"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${selectedPlot.status === "Available" ? "bg-emerald-500" : "bg-amber-500"}`}
                      />
                      {selectedPlot.status}
                    </span>
                  </div>

                  <h3 className="font-display text-3xl font-bold text-foreground">
                    Plot #{selectedPlot.number}
                  </h3>
                  <p className="mt-2 text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="h-3 w-3" /> Ocean Breeze Enclave, Sector A
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-4 border-y border-border/60 py-5 my-6">
                    <div>
                      <p className="text-[11px] text-muted-foreground uppercase font-medium">
                        Area Size
                      </p>
                      <p className="text-lg font-bold text-foreground mt-0.5">
                        {selectedPlot.sizeSqft} sqft
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground uppercase font-medium">
                        Dimensions
                      </p>
                      <p className="text-lg font-bold text-foreground mt-0.5">
                        {selectedPlot.dimensions}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground uppercase font-medium">
                        Road Facing
                      </p>
                      <p className="text-lg font-bold text-foreground mt-0.5">
                        {selectedPlot.facing} Facing
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-muted-foreground uppercase font-medium">
                        Clear Title
                      </p>
                      <p className="text-lg font-bold text-foreground mt-0.5 flex items-center gap-1.5 text-primary">
                        <ShieldCheck className="h-4.5 w-4.5 text-primary" /> Yes
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs text-muted-foreground">
                      * DTCP & TNRERA approved layout with 30-year mother deed records checked by
                      legal advisors. Gated boundary walls and concrete roads are fully installed.
                    </p>
                    <p className="text-xs text-muted-foreground">
                      * Water lines connection laid directly to the plot corner. Bank loans
                      pre-approved through SBI, HDFC, and LIC.
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-border/60">
                  <div className="flex items-baseline justify-between mb-4">
                    <span className="text-sm text-muted-foreground">Launch Price:</span>
                    <span className="font-display text-2xl font-bold text-foreground">
                      ₹{selectedPlot.priceLakh} Lakhs
                    </span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <a
                      href={`https://wa.me/919876543210?text=${encodeURIComponent(whatsappMessage)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-3 text-sm font-semibold text-whatsapp-foreground hover:opacity-90 transition-opacity"
                    >
                      <MessageCircle className="h-4 w-4" /> Book Reservation (WhatsApp)
                    </a>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      Request Legal Papers <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
                <Info className="h-10 w-10 text-muted-foreground/60 mb-3" />
                <h4 className="font-display text-lg font-bold">No Plot Selected</h4>
                <p className="text-xs text-muted-foreground mt-2 max-w-xs">
                  Hover over or click any available (green) or reserved (amber) plot on the map to
                  inspect sizes, layouts, pricing, and launch details.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
