"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Compass, 
  MapPin, 
  ShieldCheck, 
  Users, 
  Anchor, 
  Building2, 
  Truck, 
  Cog, 
  Flame, 
  Wrench, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  Globe2
} from "lucide-react";

interface AboutSectionProps {
  onRequestWorkforce?: () => void;
}

export default function AboutSection({ onRequestWorkforce }: AboutSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // Gentle entrance reveal without locking opacity to 0
      const blocks = content.querySelectorAll(".about-reveal-block");
      if (blocks.length > 0) {
        gsap.from(blocks, {
          y: 35,
          stagger: 0.1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: content,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const sectors = [
    { name: "Shipbuilding & Marine", icon: Anchor, code: "01" },
    { name: "Industrial Construction", icon: Building2, code: "02" },
    { name: "Heavy Manufacturing", icon: Cog, code: "03" },
    { name: "Transport & Logistics", icon: Truck, code: "04" },
  ];

  const trades = [
    { name: "Certified Welders (TIG/MIG)", icon: Flame },
    { name: "Shipbuilding Specialists", icon: Anchor },
    { name: "High-Pressure Pipe Fitters", icon: Wrench },
    { name: "Construction Crews", icon: Building2 },
    { name: "Precision CNC Operators", icon: Cog },
    { name: "Professional Truck & Trailer Drivers", icon: Truck },
  ];

  const deploymentModels = [
    "Short-Term Deployment",
    "Long-Term Placement",
    "Project-Based Requirements"
  ];

  return (
    <section
      ref={sectionRef}
      id="about-us"
      className="relative py-24 sm:py-32 lg:py-40 bg-[#070D16] text-white overflow-hidden border-t border-[#C59C58]/35 shadow-[0_-35px_100px_rgba(0,0,0,0.95)]"
    >
      {/* Background Architectural Ambient Elements */}
      <div className="absolute inset-0 pointer-events-none select-none z-0">
        {/* Subtle Map Overlay with Feathered Gradients */}
        <div className="absolute top-0 right-0 w-full lg:w-3/5 h-full opacity-15 overflow-hidden">
          <Image
            src="/images/realistic_map.jpg"
            alt="Norvian International Recruitment Network"
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-center filter grayscale brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#070D16]/80 to-[#070D16]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070D16] via-transparent to-[#070D16]/80" />
        </div>

        {/* Ambient Warm Golden Glow */}
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#C59C58]/5 rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#142337]/50 rounded-full blur-[120px]" />

        {/* Subtle Geometric Guideline */}
        <div className="absolute left-6 sm:left-12 lg:left-20 top-0 bottom-0 w-[1px] bg-white/[0.04]" />
      </div>

      <div ref={contentRef} className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 relative z-10">
        
        {/* Top Header Badge & Provenance */}
        <div className="about-reveal-block flex flex-wrap items-center justify-between gap-4 mb-8 sm:mb-12">
          <div className="flex items-center gap-3">
            <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.26em] text-[#C59C58] flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C59C58]" />
              ABOUT US // CORPORATE PROFILE
            </span>
            <span className="h-[1px] w-12 sm:w-16 bg-[#C59C58]/60" />
          </div>

          {/* Västervik Sweden Headquarters Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#C59C58]/35 backdrop-blur-md shadow-xs">
            <span className="text-xs">🇸🇪</span>
            <MapPin className="w-3.5 h-3.5 text-[#C59C58]" />
            <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-white/85">
              Headquarters • Västervik, Sweden
            </span>
          </div>
        </div>

        {/* Primary Statement Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-16 sm:mb-20">
          
          {/* Left Column: Bold Editorial Headline */}
          <div className="about-reveal-block lg:col-span-7 space-y-6">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-[-0.025em] leading-[1.08]">
              Norvian AB is a manpower supply and recruitment company based in{" "}
              <span className="text-[#C59C58] italic font-serif">Västervik, Sweden.</span>
            </h2>

            <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light leading-relaxed">
              We help European companies in the <span className="text-white font-normal">shipbuilding</span>,{" "}
              <span className="text-white font-normal">construction</span>,{" "}
              <span className="text-white font-normal">manufacturing</span>, and{" "}
              <span className="text-white font-normal">transport & logistics</span> sectors find skilled and experienced workers from Asian countries.
            </p>
          </div>

          {/* Right Column: Mission Card & Client Partnership Plaque */}
          <div className="about-reveal-block lg:col-span-5 bg-gradient-to-b from-[#0B1522]/90 to-[#070D16]/95 border border-white/10 rounded-3xl p-7 sm:p-9 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl relative overflow-hidden">
            {/* Top gold accent line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C59C58] to-transparent" />

            <div className="flex items-center gap-2 mb-4">
              <Globe2 className="w-4 h-4 text-[#C59C58]" />
              <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C59C58] font-bold">
                OUR CORE OBJECTIVE
              </span>
            </div>

            <p className="font-serif text-lg sm:text-xl text-white font-normal leading-snug mb-5">
              “Our goal is to provide reliable manpower solutions, help businesses overcome workforce shortages, and build strong, long-term partnerships with our clients.”
            </p>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/60 font-mono">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C59C58]" />
                Scandinavian Standards
              </span>
              <span>EST. SWEDEN</span>
            </div>
          </div>
        </div>

        {/* 4 Supported European Sectors Grid */}
        <div className="about-reveal-block mb-16 sm:mb-20">
          <div className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#C59C58] mb-4 flex items-center gap-2">
            <span>KEY SECTORS SERVED ACROSS EUROPE</span>
            <span className="h-[1px] flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sectors.map((sec) => {
              const Icon = sec.icon;
              return (
                <div
                  key={sec.code}
                  className="group relative p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-[#C59C58]/40 transition-all duration-300 backdrop-blur-xs flex items-center gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-black/40 border border-white/10 group-hover:border-[#C59C58]/40 flex items-center justify-center text-[#C59C58] transition-colors shrink-0">
                    <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <span className="text-[9px] font-mono text-white/40 block">SECTOR {sec.code}</span>
                    <span className="font-serif text-sm sm:text-base font-normal text-white group-hover:text-[#C59C58] transition-colors">
                      {sec.name}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Specialized Trades & Multi-Model Deployment */}
        <div className="about-reveal-block grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16 sm:mb-20">
          
          {/* Specialized Trades Card */}
          <div className="lg:col-span-7 bg-[#0B1522]/60 rounded-3xl p-7 sm:p-9 border border-white/10 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C59C58] mb-2 flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-[#C59C58]" />
                SPECIALIZED WORKFORCE DISCIPLINE
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal mb-4">
                Tested Trades for European Industrial Demand
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed mb-6">
                We specialize in supplying welders, shipbuilding specialists, pipe fitters, construction workers, CNC operators, and professional truck and trailer drivers for short-term, long-term, and project-based workforce requirements.
              </p>
            </div>

            {/* Chips Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
              {trades.map((trade, idx) => {
                const Icon = trade.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/5 text-xs text-white/85 font-light"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#C59C58] shrink-0" />
                    <span>{trade.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legal Compliance & Flexibility Card */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* European Labour Laws Compliance Box */}
            <div className="flex-1 bg-gradient-to-br from-[#0B1522] to-[#070D16] rounded-3xl p-7 sm:p-8 border border-white/10 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="w-4 h-4 text-[#C59C58]" />
                  <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C59C58] font-bold">
                    LEGAL & REGULATORY ASSURANCE
                  </span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl text-white font-normal mb-3">
                  100% European Labour Law Compliance
                </h4>
                <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed">
                  Through our international recruitment network, we connect companies with qualified and experienced workers while following applicable European labour laws and industry standards.
                </p>
              </div>

              {/* Verified pill badges */}
              <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2">
                <span className="text-[10px] font-mono bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-full text-white/80">
                  EU Directives Compliant
                </span>
                <span className="text-[10px] font-mono bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-full text-white/80">
                  Immigration & Visa Managed
                </span>
                <span className="text-[10px] font-mono bg-white/[0.05] border border-white/10 px-2.5 py-1 rounded-full text-white/80">
                  ISO & DNV Audited
                </span>
              </div>
            </div>

            {/* Contract Models Bar */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10">
              <span className="text-[9.5px] font-mono uppercase tracking-widest text-[#C59C58] block mb-3">
                FLEXIBLE ENGAGEMENT MODELS:
              </span>
              <div className="flex flex-wrap gap-2">
                {deploymentModels.map((m, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-black/40 border border-[#C59C58]/30 text-[11px] font-mono text-white/90"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C59C58]" />
                    {m}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

        {/* Bottom CTA Row: Connect to Workforce Request */}
        {onRequestWorkforce && (
          <div className="about-reveal-block pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#C59C58] animate-pulse" />
              <span className="text-xs text-white/60 font-mono uppercase tracking-wider">
                Active Asian Talent Corridors to Northern & Western Europe
              </span>
            </div>

            <button
              onClick={onRequestWorkforce}
              className="group inline-flex items-center gap-3 bg-[#C59C58] hover:bg-[#D4AF37] text-[#070D16] px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(197,156,88,0.4)] cursor-pointer active:scale-95"
            >
              <span>DISCUSS WORKFORCE SOLUTIONS</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#070D16] transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
