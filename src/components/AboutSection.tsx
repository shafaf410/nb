"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Building2, 
  Anchor, 
  Cog, 
  Truck,
  Check
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface AboutSectionProps {
  onRequestWorkforce?: () => void;
}

export default function AboutSection({ onRequestWorkforce }: AboutSectionProps) {
  const { language, t } = useLanguage();
  const isSv = language === "sv";
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      const revealItems = container.querySelectorAll(".about-fade-up");
      if (revealItems.length > 0) {
        gsap.from(revealItems, {
          y: 28,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  const sectors = [
    { 
      title: isSv ? "Skeppsbyggnad & Marint" : "Shipbuilding & Marine", 
      icon: Anchor, 
      desc: isSv ? "Varv, torrdockor och offshore-konstruktion" : "Shipyards, dry docks, and offshore fabrication" 
    },
    { 
      title: isSv ? "Bygg & Anläggning" : "Construction", 
      icon: Building2, 
      desc: isSv ? "Kommersiella, industriella och anläggningsbyggen" : "Commercial, industrial, and infrastructure builds" 
    },
    { 
      title: isSv ? "Tillverkningsindustri" : "Manufacturing", 
      icon: Cog, 
      desc: isSv ? "Precisionsbearbetning, CNC och monteringsfabriker" : "Precision fabrication, CNC, and assembly plants" 
    },
    { 
      title: isSv ? "Transport & Logistik" : "Transport & Logistics", 
      icon: Truck, 
      desc: isSv ? "Tung fjärrtransport, distribution och åkeriverksamhet" : "Heavy road freight, distribution, and fleet operations" 
    },
  ];

  const trades = isSv ? [
    "Svetsare (TIG & MIG)",
    "Skeppsbyggnadsspecialister",
    "Rörläggare & montörer",
    "Bygg- & anläggningsarbetare",
    "CNC-operatörer",
    "Tunga lastbilschaufförer (CE)",
  ] : [
    "Welders (TIG & MIG)",
    "Shipbuilding Specialists",
    "Pipe Fitters",
    "Construction Workers",
    "CNC Operators",
    "Truck & Trailer Drivers",
  ];

  const contractModels = isSv ? [
    "Korttidsbehov",
    "Långtidsplaceringar",
    "Projektbaserad arbetskraft",
  ] : [
    "Short-term requirements",
    "Long-term placements",
    "Project-based workforce",
  ];

  return (
    <section
      ref={sectionRef}
      id="about-us"
      className="relative bg-[#080E18] text-white py-24 sm:py-32 lg:py-36 border-t border-[#C59C58]/20 overflow-hidden"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 divide-x divide-white">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full" />
          ))}
        </div>
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10">
        
        {/* Editorial Eyebrow & Provenance */}
        <div className="about-fade-up flex flex-wrap items-center justify-between gap-4 pb-8 mb-12 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-8 bg-[#C59C58]" />
            <h2 className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-[#C59C58]">
              {isSv ? "Om Oss" : "About Us"}
            </h2>
            <span className="text-xs text-white/40 font-mono">
              {isSv ? "/ Norvian AB Företagsprofil" : "/ Norvian AB Company Profile"}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-white/70">
            <MapPin className="w-3.5 h-3.5 text-[#C59C58]" />
            <span>{isSv ? "Huvudkontor i Västervik, Sverige" : "Headquartered in Västervik, Sweden"}</span>
          </div>
        </div>

        {/* Hero Editorial Statement */}
        <div className="about-fade-up max-w-4xl mb-16 sm:mb-20">
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal text-white leading-[1.18] tracking-[-0.015em]">
            {isSv ? (
              <>
                Norvian AB är ett bemannings- och rekryteringsföretag baserat i{" "}
                <span className="text-[#C59C58] italic">Västervik, Sverige.</span>
              </>
            ) : (
              <>
                Norvian AB is a manpower supply and recruitment company based in{" "}
                <span className="text-[#C59C58] italic">Västervik, Sweden.</span>
              </>
            )}
          </h3>
        </div>

        {/* Main Content: Split Narrative & Corporate Imagery */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          
          {/* Left Narrative Column (7 Cols) */}
          <div className="about-fade-up lg:col-span-7 space-y-10">
            
            {/* Story Paragraph 1 */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#C59C58]">
                {isSv ? "Interkontinentala Bemanningslösningar" : "Cross-Continent Workforce Solutions"}
              </h4>
              <p className="text-lg sm:text-xl text-white/90 font-light leading-relaxed">
                {isSv 
                  ? "Vi hjälper europeiska företag inom skeppsbyggnad, bygg & anläggning, tillverkning samt transport & logistik att rekrytera erfaren och kvalificerad personal från Asien."
                  : "We help European companies in the shipbuilding, construction, manufacturing, and transport & logistics sectors find skilled and experienced workers from Asian countries."}
              </p>
            </div>

            {/* Story Paragraph 2 */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#C59C58]">
                {isSv ? "Specialiserade Yrken & Avtalsmodeller" : "Specialized Disciplines & Contract Terms"}
              </h4>
              <p className="text-base sm:text-lg text-white/75 font-light leading-relaxed">
                {isSv
                  ? "Vi är specialiserade på att förmedla svetsare, skeppsbyggare, rörläggare, anläggningsarbetare, CNC-operatörer samt yrkeschaufförer för korttidsbehov, långtidsuppdrag och projektbaserad bemanning."
                  : "We specialize in supplying welders, shipbuilding specialists, pipe fitters, construction workers, CNC operators, and professional truck and trailer drivers for short-term, long-term, and project-based workforce requirements."}
              </p>

              {/* Verified Trades List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {trades.map((trade, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/5 text-sm text-white/85"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C59C58] shrink-0" />
                    <span>{trade}</span>
                  </div>
                ))}
              </div>

              {/* Engagement Terms */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-mono text-white/50 uppercase tracking-wider mr-2">
                  {isSv ? "Flexibel Bemanning:" : "Flexible Deployment:"}
                </span>
                {contractModels.map((model, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-white/[0.04] border border-[#C59C58]/25 text-[#E6C687]"
                  >
                    <Check className="w-3 h-3 text-[#C59C58]" />
                    {model}
                  </span>
                ))}
              </div>
            </div>

            {/* Story Paragraph 3: Compliance & Legal Standards */}
            <div className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/10 space-y-3">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#C59C58]">
                <ShieldCheck className="w-4 h-4 text-[#C59C58]" />
                <span>{isSv ? "Rigorös Regelefterlevnad & Juridisk Trygghet" : "Regulatory Rigor & Compliance"}</span>
              </div>
              <p className="text-base text-white/85 font-light leading-relaxed">
                {isSv 
                  ? "Genom vårt internationella rekryteringsnätverk förenar vi företag med kvalificerad personal under full efterlevnad av tillämpliga europeiska arbetsrättsliga lagar och industristandarder."
                  : "Through our international recruitment network, we connect companies with qualified and experienced workers while following applicable European labour laws and industry standards."}
              </p>
            </div>

          </div>

          {/* Right Column: Authentic Editorial Photo & Leadership Quote (5 Cols) */}
          <div className="about-fade-up lg:col-span-5 space-y-6">
            
            {/* Real Editorial Industrial Photo */}
            <div className="relative aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <Image
                src="/images/worker_real.jpg"
                alt="Norvian AB industrial specialist"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover object-center filter brightness-[0.88] contrast-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080E18] via-transparent to-transparent opacity-80" />
              
              {/* Photo Caption Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/80 bg-[#080E18]/85 backdrop-blur-md px-3.5 py-2 rounded-lg border border-white/10">
                <span>{isSv ? "Kvalificerade Yrkesroller" : "Vetted Technical Trades"}</span>
                <span className="text-[#C59C58]">DNV & ISO Standard</span>
              </div>
            </div>

            {/* Mission & Purpose Card */}
            <div className="relative p-7 sm:p-8 rounded-2xl bg-[#0C1524] border border-[#C59C58]/30 shadow-xl space-y-4">
              <div className="text-[#C59C58] font-serif text-3xl leading-none">“</div>
              <blockquote className="font-serif text-lg sm:text-xl text-white font-normal leading-snug">
                {isSv
                  ? "Vårt mål är att leverera pålitliga bemanningslösningar, hjälpa företag att överbrygga personalbrist och bygga starka, långsiktiga partnerskap med våra kunder."
                  : "Our goal is to provide reliable manpower solutions, help businesses overcome workforce shortages, and build strong, long-term partnerships with our clients."}
              </blockquote>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60">
                <span className="text-white/80 font-medium">Norvian AB</span>
                <span>Västervik, Sweden</span>
              </div>
            </div>

          </div>

        </div>

        {/* Sectors Overview Grid */}
        <div className="about-fade-up pt-12 border-t border-white/10">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C59C58] mb-6">
            {isSv ? "Viktiga Industrisektorer Vi Betjänar" : "Key Industry Sectors We Serve"}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sectors.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#C59C58]/30 transition-colors"
                >
                  <Icon className="w-5 h-5 text-[#C59C58] mb-3" />
                  <h5 className="font-serif text-base text-white font-normal mb-1">
                    {sec.title}
                  </h5>
                  <p className="text-xs text-white/55 font-light leading-relaxed">
                    {sec.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Bar */}
        {onRequestWorkforce && (
          <div className="about-fade-up mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-sm font-serif text-white/90">
                {isSv 
                  ? "Redo att säkra er kompetensförsörjning med certifierad personal?"
                  : "Ready to address critical workforce gaps with certified personnel?"}
              </p>
              <p className="text-xs text-white/50 font-mono mt-0.5">
                {isSv 
                  ? "Huvudkontor i Västervik, Sverige • Direktmobilisering över hela Europa"
                  : "Headquarters in Västervik, Sweden • Direct deployment across Europe"}
              </p>
            </div>

            <button
              onClick={onRequestWorkforce}
              className="inline-flex items-center gap-2.5 bg-[#C59C58] hover:bg-[#D4AF37] text-[#080E18] px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(197,156,88,0.4)] cursor-pointer active:scale-95 shrink-0"
            >
              <span>{t.nav.requestCta}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#080E18]" />
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
