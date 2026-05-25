import { useEffect, useRef, useState } from "react";
import { Sparkles, Compass, Play, Volume2, X } from "lucide-react";
import droneTour from "@/assets/drone-tour.mp4";


export function ScrollVideoReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much the container has scrolled through the viewport
      const totalDist = rect.height + windowHeight;
      const currentDist = windowHeight - rect.top;

      const progress = Math.min(Math.max(currentDist / totalDist, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial run

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Map progress (0.15 to 0.7) to clip rate (0 to 1)
  const start = 0.15;
  const end = 0.7;
  let rate = 0;
  if (scrollProgress > start) {
    rate = Math.min((scrollProgress - start) / (end - start), 1);
  }

  // Calculate 3D perspective and scale transitions
  const scale = 0.85 + 0.15 * rate; // scales from 0.85 to 1.00
  const rotateX = (1 - rate) * 12; // tilts back 12 degrees to 0 degrees
  const borderRadius = `${(1 - rate) * 2.5}rem`; // from 2.5rem to 0rem
  const width = `${85 + 15 * rate}%`; // widens from 85% to 100%
  const opacity = 0.6 + 0.4 * rate; // fades from 0.6 to 1.00

  return (
    <section
      ref={containerRef}
      className="relative bg-slate-950 text-white min-h-[110vh] flex flex-col justify-center overflow-hidden py-16"
    >
      {/* Editorial typography layer behind the video box (shows when mask is contracted) */}
      <div className="absolute inset-x-0 top-12 z-0 text-center opacity-30 select-none">
        <p className="font-display text-[9vw] font-black uppercase leading-none tracking-widest text-slate-800">
          EXPERIENCE
        </p>
      </div>

      {/* Cinematic 3D Transforming Video Container */}
      <div
        className="relative mx-auto h-[65vh] md:h-[80vh] z-10 transition-all duration-75 ease-out shadow-2xl overflow-hidden"
        style={{
          width: width,
          transform: `perspective(1200px) rotateX(${rotateX}deg) scale(${scale})`,
          borderRadius: borderRadius,
          opacity: opacity,
        }}
      >
        {/* Loop video of real plot walkthrough */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover brightness-[0.7]"
          poster="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1920&q=80"
        >
          <source
            src={droneTour}
            type="video/mp4"
          />
        </video>

        {/* Video Overlay Info */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-between p-6 md:p-12">
          {/* Top Row: Coordinates & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center items-start justify-between gap-3">
            <div className="flex items-center gap-2 rounded-full bg-slate-900/80 backdrop-blur px-4 py-1.5 border border-slate-700 text-xs font-medium shrink-0">
              <Compass className="h-4 w-4 text-accent animate-spin-slow" />
              <span className="font-mono text-slate-300">12°53'14" N · 80°14'31" E · ECR</span>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 backdrop-blur px-3.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent border border-accent/40 shrink-0">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
              Live Site Drone Feed
            </span>
          </div>

          {/* Bottom Row: Text Content */}
          <div className="max-w-2xl">
            <h3 className="font-display text-3xl md:text-5xl font-bold leading-tight">
              Where Chennai Meets the Bay
            </h3>
            <p className="mt-4 text-sm md:text-base text-slate-300 leading-relaxed max-w-xl">
              Inspect site boundaries, road alignments, soil clearances, and neighboring properties
              in real-time. We stream high-definition drone-tours for every ECR & OMR layout
              directly to your device.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 text-xs font-bold uppercase tracking-wider hover:opacity-90 shadow-lg cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 fill-current" /> Play Tour Video
              </button>
              <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
                <Volume2 className="h-3.5 w-3.5" /> High Definition Audio Guides Available
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial details below the video */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-2 gap-8 md:grid-cols-4 text-center md:text-left">
        <div>
          <p className="text-2xl font-display font-bold text-accent">100%</p>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
            Drone Vetted Layouts
          </p>
        </div>
        <div>
          <p className="text-2xl font-display font-bold text-accent">12.8%</p>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
            ECR Annual Appreciation
          </p>
        </div>
        <div>
          <p className="text-2xl font-display font-bold text-accent">30+ Yrs</p>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
            Title History Checked
          </p>
        </div>
        <div>
          <p className="text-2xl font-display font-bold text-accent">₹0 Broker</p>
          <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider">
            Direct Builder Pricing
          </p>
        </div>
      </div>
      {/* Lightbox Video Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md animate-fade-in p-4 sm:p-6 md:p-10">
          <div
            className="absolute inset-0 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl z-10 animate-scale-up">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-white backdrop-blur border border-slate-700 hover:bg-slate-800 hover:scale-105 transition cursor-pointer"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <video
              autoPlay
              controls
              playsInline
              className="w-full h-full object-contain"
            >
              <source
                src={droneTour}
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
