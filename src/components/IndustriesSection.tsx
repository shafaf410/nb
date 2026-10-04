"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ShieldCheck, Check, Anchor, Building2, Truck, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface IndustriesSectionProps {
  onSelectIndustry: (industryKey: "shipbuilding" | "construction" | "logistics") => void;
}

export default function IndustriesSection({ onSelectIndustry }: IndustriesSectionProps) {
  const { t } = useLanguage();
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const industries = [
    {
      id: "shipbuilding" as const,
      number: "01",
      code: "IND-01 / MARITIME",
      title: "Shipbuilding & Marine",
      category: "MARITIME & OFFSHORE FABRICATION",
      subtitle: "Precision welders, pipe fitters, and marine electricians powering Northern Europe's leading commercial and defense yards.",
      badge: "DNV & ISO 9606-1",
      image: "/images/shipbuilding_real.jpg",
      buttonText: "Explore Shipbuilding",
      icon: Anchor,
      skills: [
        "ISO 9606-1 TIG & MIG Multi-Position Welders",
        "Hull, Structural Steel & High-Pressure Pipe Fitters",
        "Marine Systems Electricians & Cable Riggers",
        "Dry Dock & Offshore Vessel Maintenance Crews"
      ],
    },
    {
      id: "construction" as const,
      number: "02",
      code: "IND-02 / CIVIL",
      title: "Industrial Construction",
      category: "CIVIL & HEAVY INFRASTRUCTURE",
      subtitle: "Vetted civil crews, formwork specialists, and structural steel erectors delivering complex industrial infrastructure across Europe.",
      badge: "EN 1090 & ISO 45001",
      image: "/images/construction_real.jpg",
      buttonText: "Explore Construction",
      icon: Building2,
      skills: [
        "EN 1090 Structural Steel Erectors & Riggers",
        "Industrial Formwork & Concrete Specialists",
        "Heavy Machinery & Tower Crane Operators",
        "Site Civil Engineers & Survey Coordinators"
      ],
    },
    {
      id: "logistics" as const,
      number: "03",
      code: "IND-03 / FLEET",
      title: "Transport & Logistics",
      category: "CONTINENTAL FLEET & BULK HAULAGE",
      subtitle: "Certified heavy freight drivers and logistics specialists keeping Scandinavian and European supply chains running at full throttle.",
      badge: "EU CODE 95 & ADR",
      image: "/images/1.jpg",
      buttonText: "Explore Logistics",
      icon: Truck,
      skills: [
        "EU Code 95 Certified Articulated CE Drivers",
        "ADR Hazardous Materials Transport Crews",
        "Automated Terminal & Warehouse Specialists",
        "Heavy Haulage & Specialized Trailer Pilots"
      ],
    },
  ];

  // Helper to swiftly scroll directly to a specific slide
  const goToSlide = useCallback((index: number) => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const st = ScrollTrigger.getById("industries-pin");
    if (st) {
      // 3 distinct rest positions: 0.15, 0.50, 0.85
      const targetProgress = index === 0 ? 0.15 : index === 1 ? 0.50 : 0.85;
      const targetY = st.start + targetProgress * (st.end - st.start);
      window.scrollTo({ top: targetY, behavior: "smooth" });
    } else {
      setActiveIndex(index);
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = triggerRef.current;
    const pin = pinRef.current;
    if (!trigger || !pin) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      // Pinned runway: cleanly maps vertical scroll into exact discrete card states
      ScrollTrigger.create({
        id: "industries-pin",
        trigger: trigger,
        start: "top top",
        end: "+=1600",
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          // Step 1: 0.00 to 0.33 -> Card 01
          // Step 2: 0.33 to 0.67 -> Card 02
          // Step 3: 0.67 to 1.00 -> Card 03
          let nextIdx = 0;
          if (p >= 0.66) {
            nextIdx = 2;
          } else if (p >= 0.33) {
            nextIdx = 1;
          } else {
            nextIdx = 0;
          }
          setActiveIndex(nextIdx);
        },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={triggerRef}
      id="industries"
      className="relative z-10 bg-[#070D16] text-white w-full overflow-hidden shadow-[0_-35px_100px_rgba(0,0,0,0.95)] border-t border-[#C59C58]/35"
    >
      {/* Pinned Desktop Viewport (100% Full Screen Edge-to-Edge) */}
      <div
        ref={pinRef}
        className="w-full h-screen overflow-hidden flex flex-col justify-between relative bg-[#070D16]"
      >
        {/* Top Pinned Cinematic HUD */}
        <div className="absolute top-0 inset-x-0 z-30 pt-6 sm:pt-8 px-6 sm:px-12 lg:px-16 w-full flex items-center justify-end">
          {/* Guaranteed Correct Discipline Number: 01, 02, 03 */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="text-[10px] uppercase font-mono tracking-widest text-white/40">
              DISCIPLINE
            </span>
            <div className="h-8 w-12 border border-[#C59C58]/40 rounded-lg bg-black/60 backdrop-blur-md flex items-center justify-center overflow-hidden shadow-inner">
              <span className="font-serif text-lg font-normal text-[#C59C58] transition-all duration-300">
                {industries[activeIndex].number}
              </span>
            </div>
            <span className="text-xs text-white/40 font-mono">/ 03</span>
          </div>
        </div>

        {/* Central Full Screen Edge-to-Edge Cards: Right-to-Left Slide-Over Deck Layering */}
        <div className="relative w-full h-full overflow-hidden flex items-center">
          <div className="relative w-full h-full">
            {industries.map((ind, idx) => {
              const Icon = ind.icon;
              const isCurrent = idx === activeIndex;
              const isFuture = idx > activeIndex;
              return (
                <div
                  key={ind.id}
                  className={`absolute inset-0 w-full h-full flex flex-col lg:flex-row items-stretch will-change-transform bg-[#070D16] ${
                    idx > 0 ? "shadow-[-40px_0_100px_rgba(0,0,0,0.95)] border-l border-[#C59C58]/35" : ""
                  }`}
                  style={{
                    transform: `translate3d(${isFuture ? 100 : 0}%, 0, 0)`,
                    transition: "transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)",
                    zIndex: (idx + 1) * 10,
                    visibility: idx <= activeIndex + 1 ? "visible" : "hidden",
                  }}
                >
                  {/* Left Column: 100% Full-Bleed Edge-to-Edge Photography */}
                  <div className="w-full lg:w-[56vw] h-[45vh] lg:h-full relative overflow-hidden bg-black shrink-0">
                    <div className="relative w-full h-full">
                      <Image
                        src={ind.image}
                        alt={ind.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 56vw"
                        className="object-cover object-center brightness-95 contrast-105"
                        priority={idx === 0}
                      />
                      {/* Filmic edge vignette & right-side feather into dark navy */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#070D16] via-transparent to-[#070D16]/40 lg:hidden pointer-events-none" />
                      <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#070D16] pointer-events-none" />
                      <div className="hidden lg:block absolute inset-y-0 right-0 w-36 bg-gradient-to-r from-transparent to-[#070D16] pointer-events-none" />
                    </div>

                    {/* Bottom Metadata on Image */}
                    <div className="absolute bottom-6 left-6 sm:left-12 z-20 pointer-events-none flex items-center gap-3">
                      <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-white/75 bg-black/60 backdrop-blur-sm px-3 py-1 rounded">
                        {ind.code}
                      </span>
                      <span className="font-serif text-2xl sm:text-3xl font-light text-white/40">
                        {ind.number}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Full-Height Editorial Typography & Controls */}
                  <div className="w-full lg:w-[44vw] h-full flex flex-col justify-center px-6 sm:px-12 lg:px-14 xl:px-20 py-8 lg:py-0 relative z-20 bg-[#070D16]">
                    
                    <div className="max-w-xl space-y-4 sm:space-y-5">
                      
                      {/* Category & Icon Tag */}
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C59C58]">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-[#C59C58] font-bold">
                          {ind.category}
                        </span>
                        <span className="inline-flex items-center gap-1.5 text-[9px] uppercase tracking-wider text-[#C59C58] font-mono bg-white/5 px-2.5 py-1 rounded-full border border-[#C59C58]/30">
                          <ShieldCheck className="w-3 h-3 text-[#C59C58]" />
                          {ind.badge}
                        </span>
                      </div>

                      {/* Main Title */}
                      <div className="overflow-hidden">
                        <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-normal text-white tracking-[-0.025em] leading-[1.04]">
                          {ind.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm lg:text-base text-white/75 font-light leading-relaxed">
                        {ind.subtitle}
                      </p>

                      {/* Verified Skills Grid: Full readability, no truncation */}
                      <div className="space-y-2 pt-3 border-t border-white/10">
                        <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C59C58]">
                          {t.industries.vettedTradesLabel}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {ind.skills.map((skill, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 text-xs text-white/90 font-light bg-white/[0.04] hover:bg-white/[0.08] px-3 py-2 rounded-lg border border-white/5 transition-colors"
                            >
                              <Check className="w-3.5 h-3.5 text-[#C59C58] shrink-0" />
                              <span className="leading-snug">{skill}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Interactive Specification Modal Trigger — Fully visible with ample margin */}
                      <div className="pt-2 sm:pt-4">
                        <button
                          onClick={() => onSelectIndustry(ind.id)}
                          className="group inline-flex items-center justify-between gap-4 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#C59C58] hover:bg-[#D4AF37] text-[#070D16] font-semibold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_12px_32px_-6px_rgba(197,156,88,0.45)] cursor-pointer active:scale-95 overflow-hidden"
                        >
                          <span>{ind.buttonText}</span>
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                        </button>
                      </div>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Pinned HUD: Clean step status and swift controls */}
        <div className="absolute bottom-0 inset-x-0 z-30 py-3 sm:py-4 px-6 sm:px-12 lg:px-16 w-full flex items-center justify-between text-white/50 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C59C58] animate-pulse" />
            <span>DISCIPLINE 0{activeIndex + 1} OF 03 ACTIVE</span>
          </div>

          {/* Swift Next / Prev Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToSlide(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-[#C59C58] text-white/60 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1 cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>PREV</span>
            </button>
            <button
              onClick={() => goToSlide(Math.min(industries.length - 1, activeIndex + 1))}
              disabled={activeIndex === industries.length - 1}
              className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-[#C59C58] text-white/60 hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-all flex items-center gap-1 cursor-pointer"
            >
              <span>NEXT</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
