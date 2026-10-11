"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, MapPin, Radio, Activity, Navigation, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface RouteStop {
  id: string;
  name: string;
  country: string;
  coords: { x: number; y: number }; // viewBox 0 0 1000 600
  code: string;
  activePhase: number;
}

export default function GlobalNetworkSection() {
  const { t, language } = useLanguage();
  const isSv = language === "sv";
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const mapCanvasRef = useRef<HTMLDivElement>(null);
  const textStageRef = useRef<HTMLDivElement>(null);
  const statsLineRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(0); // 0: Scandinavia, 1: Germany, 2: Netherlands, 3: Sweden, 4: Rest of Europe
  const [statsAnimated, setStatsAnimated] = useState(false);

  // SVG Coordinates for Routes across Europe & international origin
  // South Asia Origin: 620, 420
  // Norway (Oslo/Bergen): 285, 175
  // Germany (Hamburg/Frankfurt): 310, 260
  // Netherlands (Rotterdam): 275, 255
  // Sweden (Gothenburg/Stockholm): 340, 165
  // Central/Rest of Europe: 370, 290
  const stops: RouteStop[] = [
    {
      id: "norway",
      name: isSv ? "NORGE" : "NORWAY",
      country: isSv ? "Oslo & Västkustens fjordar" : "Oslo & Western Fjords",
      coords: { x: 285, y: 175 },
      code: isSv ? "NO-01/MARINT" : "NO-01/MARITIME",
      activePhase: 0,
    },
    {
      id: "germany",
      name: isSv ? "TYSKLAND" : "GERMANY",
      country: isSv ? "Hamburg & Rhen-Ruhr" : "Hamburg & Rhine-Ruhr",
      coords: { x: 310, y: 260 },
      code: isSv ? "DE-02/TUNG-IND" : "DE-02/HEAVY-IND",
      activePhase: 1,
    },
    {
      id: "netherlands",
      name: isSv ? "NEDERLÄNDERNA" : "NETHERLANDS",
      country: isSv ? "Rotterdams hamnar & logistik" : "Rotterdam Ports & Logistics",
      coords: { x: 275, y: 255 },
      code: isSv ? "NL-03/LOGISTIK" : "NL-03/LOGISTICS",
      activePhase: 2,
    },
    {
      id: "sweden",
      name: isSv ? "SVERIGE" : "SWEDEN",
      country: isSv ? "Göteborg & Stockholm" : "Gothenburg & Stockholm",
      coords: { x: 340, y: 165 },
      code: isSv ? "SE-04/TILLV-IND" : "SE-04/ADV-MFG",
      activePhase: 3,
    },
    {
      id: "europe",
      name: isSv ? "ÖVRIGA EUROPA" : "REST OF EUROPE",
      country: isSv ? "Kontinental Korridor" : "Continental Corridor",
      coords: { x: 370, y: 290 },
      code: isSv ? "EU-05/NÄTVERK" : "EU-05/NETWORK",
      activePhase: 4,
    },
  ];

  // Text variations for scroll interaction:
  const textNarratives = [
    {
      region: isSv ? "SKANDINAVIEN" : "SCANDINAVIA",
      quote: isSv ? "Förenar specialistkompetens med europeisk industri." : "Connecting specialist talent with European industry.",
      detail: isSv ? "Strategiska marina och offshore-varv i Bergen, Stavanger och Oslo." : "Strategic maritime & offshore yards in Bergen, Stavanger, and Oslo.",
    },
    {
      region: isSv ? "CENTRALEUROPA" : "CENTRAL EUROPE",
      quote: isSv ? "Flyttar expertis dit industrin behöver den." : "Moving expertise where industry needs it.",
      detail: isSv ? "Tung maskinteknik och infrastrukturkorridorer i Tyskland." : "Heavy mechanical engineering and infrastructure corridors in Germany.",
    },
    {
      region: isSv ? "NEDERLÄNDERNA" : "NETHERLANDS",
      quote: isSv ? "Automatiserad hamnlogistik och europeiska distributionspulsådror." : "Automated port logistics & European distribution arteries.",
      detail: isSv ? "Förbinder Rotterdams hamnar med certifierade CE-transportteam." : "Connecting Rotterdam maritime gateways with vetted CE transport teams.",
    },
    {
      region: isSv ? "SVERIGE" : "SWEDEN",
      quote: isSv ? "Precisionstillverkning och industriell förnybar skala." : "Precision manufacturing & renewable industrial scale.",
      detail: isSv ? "Rena energianläggningar, batterifabriker och fordonstillverkning." : "Clean energy facilities, battery gigafactories, and automotive assembly.",
    },
    {
      region: isSv ? "EUROPA" : "EUROPE",
      quote: isSv ? "Ett nätverk. Många branscher." : "One network. Multiple industries.",
      detail: isSv ? "En enhetlig, regelrätt bemanningsbro som betjänar 15+ destinationer." : "A unified, compliant workforce bridge servicing 15+ destination hubs.",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = triggerRef.current;
    const pin = pinRef.current;
    const mapCanvas = mapCanvasRef.current;
    if (!trigger || !pin) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Pin the map section for immersive swift scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: "+=1400",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const step = Math.min(4, Math.floor(self.progress * 5));
            setActiveStep(step);
          },
        },
      });

      // Subtle slow camera pan and zoom on the map canvas
      if (mapCanvas) {
        tl.to(
          mapCanvas,
          {
            scale: 1.15,
            xPercent: -3,
            yPercent: 2,
            ease: "none",
          },
          0
        );
      }

      // Animated drawing of SVG route paths via strokeDashoffset
      const paths = pin.querySelectorAll(".animated-route-line");
      paths.forEach((path, i) => {
        const pathEl = path as SVGPathElement;
        const length = pathEl.getTotalLength ? pathEl.getTotalLength() : 800;
        gsap.set(pathEl, { strokeDasharray: length, strokeDashoffset: length });

        const startProgress = i * 0.18;
        const endProgress = startProgress + 0.22;

        tl.to(
          pathEl,
          {
            strokeDashoffset: 0,
            ease: "power2.out",
          },
          startProgress
        );
      });
    });

    // Statistics Section 0 -> 100% line & counting trigger
    const statsTrigger = ScrollTrigger.create({
      trigger: "#network-statistics",
      start: "top 80%",
      onEnter: () => {
        setStatsAnimated(true);
        if (statsLineRef.current) {
          gsap.fromTo(
            statsLineRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 1.4, ease: "power3.inOut" }
          );
        }
      },
      once: true,
    });

    return () => {
      mm.revert();
      statsTrigger.kill();
    };
  }, []);

  const currentNarrative = textNarratives[activeStep] || textNarratives[0];

  return (
    <div
      ref={triggerRef}
      id="global-network"
      className="relative bg-[#070D16] text-white"
    >
      {/* Pinned Viewport Container (100vh Full Screen) */}
      <div
        ref={pinRef}
        className="w-full lg:h-screen lg:overflow-hidden flex flex-col justify-between relative bg-[#070D16]"
      >
        {/* Top Control Bar HUD: Clean, sleek top alignment */}
        <div className="relative z-30 pt-6 sm:pt-8 pb-2 px-6 sm:px-10 lg:px-16 w-full max-w-[1700px] mx-auto flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <Radio className="w-4 h-4 text-[#C59C58] animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#C59C58] uppercase">
              {t.global.tag} // 03 SIGNATURE NETWORK
            </span>
          </div>

          {/* Sequential Step Indicator: NORWAY ↓ GERMANY ↓ NETHERLANDS ↓ SWEDEN ↓ REST OF EUROPE */}
          <div className="hidden md:flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase text-white/50">
            {["NORWAY", "GERMANY", "NETHERLANDS", "SWEDEN", "EUROPE"].map((item, idx) => (
              <span key={item} className="flex items-center gap-2">
                <span
                  className={`transition-colors duration-300 ${
                    idx === activeStep
                      ? "text-[#C59C58] font-bold"
                      : idx < activeStep
                      ? "text-white/80"
                      : "text-white/30"
                  }`}
                >
                  {item}
                </span>
                {idx < 4 && <span className="text-white/20">→</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Central Map Canvas + Interactive Text HUD */}
        <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden my-2 min-h-0">
          
          {/* Zooming / Panning Cartography Stage */}
          <div
            ref={mapCanvasRef}
            className="absolute inset-0 w-full h-full flex items-center justify-center will-change-transform"
          >
            {/* Dark Minimal Realistic Map Asset */}
            <div className="relative w-full h-full max-w-[1400px]">
              <Image
                src="/images/realistic_map.jpg"
                alt="NORVIAN Signature European Infrastructure Map"
                fill
                sizes="100vw"
                className="object-cover object-center brightness-75 contrast-125 select-none pointer-events-none"
                priority
              />
              <div className="absolute inset-0 bg-[#070D16]/65 pointer-events-none" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070D16] via-transparent to-[#070D16]/80 pointer-events-none" />

              {/* Dynamic SVG Drawing Corridors & Glowing Traveling Particles */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                viewBox="0 0 1000 600"
                preserveAspectRatio="none"
              >
                <defs>
                  {/* Glowing Gradients */}
                  <linearGradient id="routeGlowActive" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FAF7F2" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#C59C58" stopOpacity="1" />
                    <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.8" />
                  </linearGradient>

                  <filter id="glowFilter" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Route 1: Global Origin (620, 420) -> Norway (285, 175) */}
                <path
                  className="animated-route-line"
                  d="M 620 420 Q 450 140 285 175"
                  fill="none"
                  stroke={activeStep === 0 ? "url(#routeGlowActive)" : "#C59C58"}
                  strokeWidth={activeStep === 0 ? "3.5" : "1.8"}
                  strokeOpacity={activeStep === 0 ? "1" : "0.35"}
                  filter={activeStep === 0 ? "url(#glowFilter)" : undefined}
                />

                {/* Route 2: Norway -> Germany (310, 260) */}
                <path
                  className="animated-route-line"
                  d="M 285 175 Q 295 220 310 260"
                  fill="none"
                  stroke={activeStep === 1 ? "url(#routeGlowActive)" : "#C59C58"}
                  strokeWidth={activeStep === 1 ? "3.5" : "1.8"}
                  strokeOpacity={activeStep === 1 ? "1" : "0.35"}
                  filter={activeStep === 1 ? "url(#glowFilter)" : undefined}
                />

                {/* Route 3: Germany -> Netherlands (275, 255) */}
                <path
                  className="animated-route-line"
                  d="M 310 260 Q 290 250 275 255"
                  fill="none"
                  stroke={activeStep === 2 ? "url(#routeGlowActive)" : "#C59C58"}
                  strokeWidth={activeStep === 2 ? "3.5" : "1.8"}
                  strokeOpacity={activeStep === 2 ? "1" : "0.35"}
                  filter={activeStep === 2 ? "url(#glowFilter)" : undefined}
                />

                {/* Route 4: Norway -> Sweden (340, 165) */}
                <path
                  className="animated-route-line"
                  d="M 285 175 Q 315 160 340 165"
                  fill="none"
                  stroke={activeStep === 3 ? "url(#routeGlowActive)" : "#C59C58"}
                  strokeWidth={activeStep === 3 ? "3.5" : "1.8"}
                  strokeOpacity={activeStep === 3 ? "1" : "0.35"}
                  filter={activeStep === 3 ? "url(#glowFilter)" : undefined}
                />

                {/* Route 5: Germany -> Central / Rest of Europe (370, 290) */}
                <path
                  className="animated-route-line"
                  d="M 310 260 Q 345 280 370 290"
                  fill="none"
                  stroke={activeStep === 4 ? "url(#routeGlowActive)" : "#C59C58"}
                  strokeWidth={activeStep === 4 ? "3.5" : "1.8"}
                  strokeOpacity={activeStep === 4 ? "1" : "0.35"}
                  filter={activeStep === 4 ? "url(#glowFilter)" : undefined}
                />

                {/* Tiny Animated Traveling Light Particles along active route */}
                <circle r="4" fill="#FFFFFF" filter="url(#glowFilter)">
                  <animateMotion
                    path={
                      activeStep === 0
                        ? "M 620 420 Q 450 140 285 175"
                        : activeStep === 1
                        ? "M 285 175 Q 295 220 310 260"
                        : activeStep === 2
                        ? "M 310 260 Q 290 250 275 255"
                        : activeStep === 3
                        ? "M 285 175 Q 315 160 340 165"
                        : "M 310 260 Q 345 280 370 290"
                    }
                    dur="2.4s"
                    repeatCount="indefinite"
                  />
                </circle>
              </svg>

              {/* Geographic Nodes with Atmospheric Glow & Data Points */}
              {stops.map((stop) => {
                const isActive = stop.activePhase === activeStep;
                const isPast = stop.activePhase < activeStep;
                return (
                  <div
                    key={stop.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-all duration-500"
                    style={{
                      left: `${(stop.coords.x / 1000) * 100}%`,
                      top: `${(stop.coords.y / 600) * 100}%`,
                    }}
                  >
                    {/* Atmospheric Glow Ring */}
                    {isActive && (
                      <div className="absolute -inset-6 rounded-full bg-[#C59C58]/25 blur-md animate-pulse" />
                    )}

                    <div className="relative flex items-center justify-center">
                      {isActive && (
                        <span className="w-8 h-8 rounded-full bg-[#C59C58]/40 animate-ping absolute" />
                      )}
                      <span
                        className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 ${
                          isActive
                            ? "bg-[#FAF7F2] border-[#C59C58] scale-125 shadow-[0_0_15px_#C59C58]"
                            : isPast
                            ? "bg-[#C59C58] border-white/60"
                            : "bg-white/30 border-white/20"
                        }`}
                      />
                    </div>

                    {/* Location Badge & Live Data Point */}
                    <div
                      className={`mt-2 transition-all duration-500 whitespace-nowrap ${
                        isActive
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-40 scale-95 translate-y-1"
                      }`}
                    >
                      <div className="bg-[#070D16]/90 backdrop-blur-md px-3 py-1 rounded-md border border-[#C59C58]/40 shadow-xl flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C59C58]" />
                        <span className="text-[10px] font-mono font-bold tracking-widest text-white uppercase">
                          {stop.name}
                        </span>
                      </div>
                      {isActive && (
                        <div className="text-[9px] font-mono text-[#C59C58] tracking-widest pl-1 mt-0.5 animate-fadeIn">
                          {stop.code}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

          {/* Floating Text Interaction Box: Synchronized Vertical Mask Reveals */}
          <div
            ref={textStageRef}
            className="absolute bottom-6 left-6 right-6 sm:left-12 sm:bottom-12 sm:right-auto sm:max-w-lg z-30 bg-[#070D16]/90 backdrop-blur-2xl p-6 sm:p-8 rounded-2xl border border-white/15 shadow-[0_30px_70px_rgba(0,0,0,0.8)] text-white space-y-4"
          >
            <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.25em] text-[#C59C58]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {isSv ? "AKTIV KORRIDORFAS" : "ACTIVE CORRIDOR PHASE"}
              </span>
              <span>0{activeStep + 1} / 05</span>
            </div>

            {/* Vertical Masked Region Title */}
            <div className="overflow-hidden">
              <h3
                key={currentNarrative.region}
                className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-[-0.02em] transition-all duration-500 transform translate-y-0"
              >
                {currentNarrative.region}
              </h3>
            </div>

            {/* Vertical Masked Quote */}
            <div className="overflow-hidden">
              <p
                key={currentNarrative.quote}
                className="font-serif italic text-lg sm:text-xl text-[#C59C58] leading-snug transition-all duration-500"
              >
                &ldquo;{currentNarrative.quote}&rdquo;
              </p>
            </div>

            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed pt-1">
              {currentNarrative.detail}
            </p>
          </div>

        </div>

        {/* Bottom Pinned Coordinates Status */}
        <div className="relative z-30 px-6 sm:px-12 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/10 pt-4 text-white/50 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C59C58]" />
            <span>GEO-LOCATION PROTOCOL // 120 FPS CORRIDOR</span>
          </div>
          <div>SCROLL PROGRESS: 0{activeStep + 1} STAGE ACTIVE</div>
        </div>

      </div>

      {/* 4-Step Editorial Process Corridor */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-20 border-t border-white/10">
        <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#C59C58] mb-8">
          EXECUTION CHOREOGRAPHY // 4-PHASE INTEGRATION
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.global.phases.map((step, idx) => (
            <div
              key={step.number}
              className="space-y-3 border-l-2 border-[#C59C58]/40 pl-5 group hover:border-[#C59C58] transition-colors"
            >
              <span className="text-[10px] uppercase font-mono font-bold tracking-[0.25em] text-[#C59C58] block">
                PHASE {step.number}
              </span>
              <h4 className="font-serif text-xl font-normal text-white">
                {step.label}
              </h4>
              <p className="text-xs text-white/70 font-light leading-relaxed">
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Requirement 7: STATISTICS — High-End Animated Counting (0 → 1,000+, 0 → 15+, 0 → 5+, 0 → 3) */}
      <div
        id="network-statistics"
        className="max-w-7xl mx-auto px-6 sm:px-12 py-20 border-t border-white/10 relative"
      >
        {/* Subtle Horizontal Line that grows 0% -> 100% */}
        <div
          ref={statsLineRef}
          className="absolute top-0 left-6 right-6 sm:left-12 sm:right-12 h-[1px] bg-gradient-to-r from-transparent via-[#C59C58] to-transparent origin-left will-change-transform"
        />

        <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#C59C58] mb-12">
          {isSv ? "REVIDERADE NYCKELTAL // KONTINENTAL VERIFIERING" : "AUDITED METRICS // CONTINENTAL VERIFICATION"}
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <StatCounterItem
            target={1000}
            suffix="+"
            label={isSv ? "Verifierade Utplaceringar" : "Verified Deployments"}
            sublabel={isSv ? "Aktiva kvalificerade placeringar inom europeisk industri" : "Active skilled placements across European industries"}
            animate={statsAnimated}
          />
          <StatCounterItem
            target={15}
            suffix="+"
            label={isSv ? "Destinationshubbar" : "Destination Hubs"}
            sublabel={isSv ? "Direkta operativa korridorer i Skandinavien & Centraleuropa" : "Direct operational corridors in Scandinavia & Central EU"}
            animate={statsAnimated}
          />
          <StatCounterItem
            target={5}
            suffix="+"
            label={isSv ? "Specialiserade Sektorer" : "Specialized Sectors"}
            sublabel={isSv ? "Marint, Tung anläggning, Infrastruktur, Energi & Logistik" : "Maritime, Heavy Civil, Infrastructure, Energy & Logistics"}
            animate={statsAnimated}
          />
          <StatCounterItem
            target={3}
            suffix={isSv ? "-Veckor" : "-Week"}
            label={isSv ? "Genomsnittlig Mobilisering" : "Mobilization Average"}
            sublabel={isSv ? "Från regelefterlevnadskontroll till operativ introduktion på plats" : "From compliance audit to on-site operational induction"}
            animate={statsAnimated}
          />
        </div>
      </div>

    </div>
  );
}

// Requirement 7: Dedicated Smooth Counter with 0.85 -> 1.00 scaling & custom easing
function StatCounterItem({
  target,
  suffix,
  label,
  sublabel,
  animate,
}: {
  target: number;
  suffix: string;
  label: string;
  sublabel: string;
  animate: boolean;
}) {
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!animate) return;

    let startTime: number | null = null;
    const duration = 1800; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min(1, (timestamp - startTime) / duration);
      // Smooth easing curve (easeOutExpo)
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setVal(Math.floor(ease * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setVal(target);
      }
    };

    requestAnimationFrame(step);
  }, [animate, target]);

  return (
    <div className="space-y-3">
      {/* Number scales 0.85 -> 1.00 while counting */}
      <div
        className={`font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-white tracking-tight transition-transform duration-1000 ${
          animate ? "scale-100" : "scale-85"
        }`}
      >
        <span className="text-white">{val.toLocaleString()}</span>
        <span className="text-[#C59C58] ml-1">{suffix}</span>
      </div>

      <div className="text-sm font-medium text-white/90">{label}</div>
      <div className="text-xs text-white/60 font-light leading-relaxed">
        {sublabel}
      </div>
    </div>
  );
}
