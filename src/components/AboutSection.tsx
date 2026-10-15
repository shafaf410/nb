"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
  Check,
  Globe2,
  Scale,
  FileCheck2,
  Users,
  Award,
  Sparkles,
  Home,
  Clock
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
          stagger: 0.1,
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

  // Quick At-a-Glance Metrics
  const quickFacts = [
    {
      label: isSv ? "Rekryteringsländer" : "Sourcing Hubs",
      value: isSv ? "Sydamerika • Asien" : "South America • Asia",
      sub: isSv ? "Sydamerika, Filippinerna, Vietnam, Indien" : "South America, Philippines, Vietnam, India",
    },
    {
      label: isSv ? "Kärnbranscher" : "Core Sectors",
      value: "4 " + (isSv ? "Huvudsektorer" : "Key Disciplines"),
      sub: isSv ? "Skeppsbyggnad, Bygg, Tillverkning, Logistik" : "Shipbuilding, Civil, Industrial, Fleet",
    },
    {
      label: isSv ? "Juridisk Trygghet" : "Labor Compliance",
      value: isSv ? "100% Avtalsenligt" : "100% Verified",
      sub: isSv ? "Kollektivavtal & EU-utstationering" : "EU Directives & Nordic Agreements",
    },
    {
      label: isSv ? "Huvudkontor" : "Headquarters",
      value: "Västervik, Sverige",
      sub: "Baumansgatan 4, 593 32 Västervik",
    },
  ];

  // 4 Global Recruitment Corridors
  const talentCorridors = [
    {
      country: isSv ? "Sydamerika" : "South America",
      flag: "🌎",
      roles: isSv ? "Erfarna industritekniker, montage- & anläggningsarbetare" : "Experienced industrial mechanics, civil & assembly technicians",
      highlight: isSv ? "Tung industriell montagekompetens" : "Heavy structural assembly expertise",
    },
    {
      country: isSv ? "Filippinerna" : "The Philippines",
      flag: "🇵🇭",
      roles: isSv ? "Marin- & varvspersonal, rörläggare, offshore-tekniker" : "Maritime & shipyard crews, pipe fitters, offshore technicians",
      highlight: isSv ? "DNV GL maritim klassificering" : "DNV GL maritime classification",
    },
    {
      country: isSv ? "Vietnam" : "Vietnam",
      flag: "🇻🇳",
      roles: isSv ? "Precisionssvetsare (TIG/MIG 6G), rörbockare, stålbyggare" : "Precision TIG/MIG 6G welders, pipe fabricators, structural fitters",
      highlight: isSv ? "ISO 9606-1 certifierade svetsare" : "ISO 9606-1 certified welders",
    },
    {
      country: isSv ? "Indien" : "India",
      flag: "🇮🇳",
      roles: isSv ? "Mekaniska ingenjörer, rörsystemstekniker, CNC-operatörer" : "Mechanical engineers, piping specialists, CNC operators",
      highlight: isSv ? "Teknisk specialistkompetens & engelsktalande" : "Engineering background & bilingual proficiency",
    },
  ];

  // The 4 Core Sectors
  const sectors = [
    { 
      title: isSv ? "Skeppsbyggnad & Marint" : "Shipbuilding & Marine", 
      icon: Anchor, 
      desc: isSv ? "Varv, torrdockor, skrovmontage och offshore-konstruktion (DNV GL standard)." : "Shipyards, dry docks, hull assembly, and offshore fabrication (DNV GL standards)." 
    },
    { 
      title: isSv ? "Bygg & Anläggning" : "Construction & Civil", 
      icon: Building2, 
      desc: isSv ? "Kommersiella, industriella byggen, broar, tunnlar och prefab (EN 1090-2)." : "Commercial builds, heavy infrastructure, bridges, tunnels, and precast (EN 1090-2)." 
    },
    { 
      title: isSv ? "Tillverkningsindustri" : "Manufacturing & Trades", 
      icon: Cog, 
      desc: isSv ? "Precisionsbearbetning, ISO 9606-1 svetsning, CNC och industrimontage." : "Precision fabrication, ISO 9606-1 welding, CNC machining, and industrial plants." 
    },
    { 
      title: isSv ? "Transport & Logistik" : "Heavy Logistics & Fleet", 
      icon: Truck, 
      desc: isSv ? "Tunga fjärrtransporter (CE), EU Code 95 och farligt gods (ADR-kompetens)." : "Long-haul freight, CE truck drivers, EU Code 95, and hazardous cargo (ADR)." 
    },
  ];

  // The 4 Operational Pillars / Why Norvian
  const pillars = [
    {
      icon: Scale,
      title: isSv ? "Kollektivavtal & EU-Direktiv" : "Collective Agreements & EU Directives",
      desc: isSv
        ? "Fullständig efterlevnad av svenska kollektivavtal, avtalsenliga löner, arbetstidslagar och EU:s utstationeringsdirektiv."
        : "Full alignment with Swedish collective agreements, fair wage structures, working hour laws, and EU Posted Workers directives.",
    },
    {
      icon: Award,
      title: isSv ? "Rigorös Kompetensprovning" : "Hands-On Skill Verification",
      desc: isSv
        ? "Samtliga yrkesarbetare genomgår praktiska svetsprov (TUV/DNV), certifikatverifiering och fackmässig granskning före avresa."
        : "All technical specialists undergo practical trade testing (TUV/DNV weld tests), document audits, and hands-on screening prior to deployment.",
    },
    {
      icon: Home,
      title: isSv ? "Nyckelfärdig Mobilisering" : "Turnkey Deployment Logistics",
      desc: isSv
        ? "Vi hanterar visum, arbetstillstånd, flygresor, boende av god standard, transport och skatteregistrering (A1/samordningsnummer)."
        : "We handle visas, work permits, flights, vetted housing, daily transport, insurance, and tax registrations (A1 certificates) end-to-end.",
    },
    {
      icon: Users,
      title: isSv ? "Dedikerad Partnerskap & Kontinuitet" : "Operational Continuity & 24/7 Support",
      desc: isSv
        ? "Direkt kontaktperson, snabb ersättningsgaranti vid behov och kontinuerlig uppföljning på plats under hela projektets gång."
        : "Dedicated account manager, fast replacement warranty, and continuous on-site liaison for the full project duration.",
    },
  ];

  // Direct Leadership & Key Partners
  const leadership = [
    {
      name: "Bianka Bittlingmeier",
      role: isSv ? "Medgrundare & Delägare" : "Co-Founder & Co-Owner",
      focus: isSv ? "Rekrytering & Affärspartnerskap" : "Recruitment & Business Partnerships",
    },
    {
      name: "Vinu Mohan",
      role: isSv ? "Medgrundare & Delägare" : "Co-Founder & Co-Owner",
      focus: isSv ? "Internationell Drift & Rekrytering" : "International Operations & Recruitment",
    },
    {
      name: "Isabelle Beyer",
      role: isSv ? "Extern Affärspartner – Tyskland" : "External Business Partner – Germany",
      focus: isSv ? "Tysk Marknadskoordinering" : "German Market Coordination",
    },
  ];

  const trades = isSv ? [
    "Svetsare (TIG & MIG, 6G ISO 9606-1)",
    "Skeppsbyggnadsspecialister & skrovmontörer",
    "Industriella rörläggare & montörer",
    "Bygg- & anläggningsarbetare (prefab/bro)",
    "CNC-operatörer & maskinbearbetare",
    "Tunga lastbilschaufförer (CE / EU Code 95)",
  ] : [
    "Welders (TIG & MIG, 6G ISO 9606-1)",
    "Shipbuilding & Hull Assembly Specialists",
    "Industrial Pipe Fitters & Fabricators",
    "Civil & Infrastructure Workers (Precast/Bridges)",
    "CNC Operators & Precision Machinists",
    "Heavy Truck & Trailer Drivers (CE / EU Code 95)",
  ];

  const contractModels = isSv ? [
    "Korttidsbehov vid arbetstoppar",
    "Långtidsplaceringar & skiftlag",
    "Projektbaserade specialistteam",
  ] : [
    "Short-term surge capacity",
    "Long-term placements & shifts",
    "Turnkey project-based crews",
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-[#080E18] text-white py-24 sm:py-32 lg:py-36 border-t border-[#C59C58]/20 overflow-hidden"
    >
      <div id="about-us" className="sr-only" />

      {/* Subtle Background Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <div className="max-w-7xl mx-auto h-full grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-12 divide-x divide-white">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="h-full" />
          ))}
        </div>
      </div>

      <div ref={containerRef} className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 relative z-10 space-y-20 sm:space-y-24">
        
        {/* 1. Top Eyebrow & Provenance */}
        <div>
          <div className="about-fade-up flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-8 bg-[#C59C58]" />
              <h2 className="text-xs sm:text-sm font-mono uppercase tracking-[0.22em] text-[#C59C58]">
                {isSv ? "Om Oss" : "About Us"}
              </h2>
              <span className="text-xs text-white/40 font-mono">
                {isSv ? "/ Norvian AB Företagsprofil & Verksamhet" : "/ Norvian AB Company Profile & Operations"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-white/70">
              <MapPin className="w-3.5 h-3.5 text-[#C59C58]" />
              <span>{isSv ? "Huvudkontor: Baumansgatan 4, 593 32 Västervik, Sverige" : "Headquarters: Baumansgatan 4, 593 32 Västervik, Sweden"}</span>
            </div>
          </div>

          {/* Hero Editorial Statement */}
          <div className="about-fade-up max-w-4xl mt-12 mb-10">
            <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-normal text-white leading-[1.18] tracking-[-0.015em]">
              {isSv ? (
                <>
                  Norvian AB är ett svenskt bemannings- och rekryteringsföretag baserat i{" "}
                  <span className="text-[#C59C58] italic">Västervik, Sverige.</span>
                </>
              ) : (
                <>
                  Norvian AB is a Swedish manpower supply and recruitment company based in{" "}
                  <span className="text-[#C59C58] italic">Västervik, Sweden.</span>
                </>
              )}
            </h3>
            <p className="mt-6 text-lg sm:text-xl text-white/80 font-light max-w-3xl leading-relaxed">
              {isSv
                ? "Vi överbryggar den akuta europeiska kompetensbristen genom att rekrytera, granska och mobilisera yrkeskunnig arbetskraft från Sydamerika, Filippinerna, Vietnam och Indien till ledande industriföretag i Norden och Europa."
                : "We bridge urgent European technical skill shortages by recruiting, vetting, and mobilizing skilled workers from South America, the Philippines, Vietnam, and India to industrial leaders across the Nordics and Europe."}
            </p>
          </div>

          {/* Fast-Facts Stat Pills */}
          <div className="about-fade-up grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {quickFacts.map((fact, idx) => (
              <div 
                key={idx}
                className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#C59C58]/30 transition-all"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C59C58] block mb-1">
                  {fact.label}
                </span>
                <span className="text-base sm:text-lg font-serif font-medium text-white block">
                  {fact.value}
                </span>
                <span className="text-xs text-white/50 font-light block mt-1">
                  {fact.sub}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Main Narrative & Media Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Narrative Column (7 Cols) */}
          <div className="about-fade-up lg:col-span-7 space-y-10">
            
            {/* Story Section 1: Scope */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#C59C58]">
                {isSv ? "Global Kompetensförsörjning" : "Cross-Continent Technical Sourcing"}
              </h4>
              <p className="text-base sm:text-lg text-white/90 font-light leading-relaxed">
                {isSv 
                  ? "Vi hjälper europeiska företag inom skeppsbyggnad, bygg & anläggning, tillverkning samt transport & logistik att snabbt säkra certifierad och erfaren personal för krävande projektmiljöer."
                  : "We help European companies in shipbuilding, heavy civil construction, manufacturing, and transport & logistics secure certified, experienced personnel ready for high-demand project environments."}
              </p>
            </div>

            {/* Story Section 2: Verified Trades */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#C59C58]">
                {isSv ? "Certifierade Yrkesroller & Avtalsmodeller" : "Vetted Disciplines & Engagement Terms"}
              </h4>
              <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed">
                {isSv
                  ? "Vi förmedlar specialister med bevisad fälterfarenhet för såväl kortsiktiga arbetstoppar som långsiktiga ramavtal och skiftlag:"
                  : "We supply technical trade specialists with verified track records for peak project demand, long-term shifts, and turnkey teams:"}
              </p>

              {/* Verified Trades List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {trades.map((trade, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs sm:text-sm text-white/85"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C59C58] shrink-0" />
                    <span>{trade}</span>
                  </div>
                ))}
              </div>

              {/* Engagement Models */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-mono text-white/50 uppercase tracking-wider mr-2">
                  {isSv ? "Bemanningsmodeller:" : "Deployment Models:"}
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

            {/* Story Section 3: Legal & Regulatory Assurance */}
            <div className="p-6 sm:p-7 rounded-2xl bg-[#0B1522] border border-[#C59C58]/30 space-y-3">
              <div className="flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-[#C59C58]">
                <ShieldCheck className="w-4 h-4 text-[#C59C58]" />
                <span>{isSv ? "Svensk & Europeisk Arbetsrätt i Första Rummet" : "Nordic & European Regulatory Compliance"}</span>
              </div>
              <p className="text-sm sm:text-base text-white/85 font-light leading-relaxed">
                {isSv 
                  ? "Genom vårt internationella rekryteringsnätverk förenar vi företag med kvalificerad personal under full efterlevnad av tillämpliga europeiska arbetsrättsliga lagar, kollektivavtal, skatteregler och industristandarder."
                  : "Through our international recruitment network, we connect companies with qualified workers while rigorously adhering to European posted workers directives, collective agreements, tax compliance, and industry safety standards."}
              </p>
            </div>

          </div>

          {/* Right Column: Visuals & Mission (5 Cols) */}
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
                <span>{isSv ? "Verifierade Yrkesarbetare" : "Vetted Technical Trades"}</span>
                <span className="text-[#C59C58]">DNV GL • ISO 9606-1</span>
              </div>
            </div>

            {/* Mission & Purpose Card */}
            <div className="relative p-7 sm:p-8 rounded-2xl bg-[#0B1522]/90 border border-[#C59C58]/30 shadow-xl space-y-4">
              <div className="text-[#C59C58] font-serif text-3xl leading-none">“</div>
              <blockquote className="font-serif text-lg sm:text-xl text-white font-normal leading-snug">
                {isSv
                  ? "Vårt mål är att leverera pålitliga bemanningslösningar, hjälpa företag att överbrygga personalbrist och bygga starka, långsiktiga partnerskap med våra kunder."
                  : "Our goal is to provide reliable manpower solutions, help businesses overcome workforce shortages, and build strong, long-term partnerships with our clients."}
              </blockquote>
              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-white/60">
                <span className="text-white/80 font-medium">Norvian AB</span>
                <span>Baumansgatan 4, 593 32 Västervik, {isSv ? "Sverige" : "Sweden"}</span>
              </div>
            </div>

          </div>

        </div>

        {/* 3. Global Talent Sourcing Corridors */}
        <div className="about-fade-up pt-10 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#C59C58] mb-2">
                <Globe2 className="w-4 h-4 text-[#C59C58]" />
                <span>{isSv ? "Globala Rekryteringskorridorer" : "Global Sourcing Corridors"}</span>
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                {isSv ? "Varifrån Vi Rekryterar" : "Where We Recruit Our Talent"}
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-white/60 font-light max-w-md">
              {isSv 
                ? "Vi samarbetar med auktoriserade utbildningscentra och tekniska institut för att säkerställa högsta yrkesstandard före mobilisering till Europa."
                : "We partner with accredited technical institutes and trade centers in origin countries to guarantee rigorous pre-departure qualification."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {talentCorridors.map((c, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#C59C58]/40 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">{c.flag}</span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#C59C58] bg-[#C59C58]/10 px-2.5 py-1 rounded-full border border-[#C59C58]/20">
                      Hub 0{idx + 1}
                    </span>
                  </div>
                  <h5 className="font-serif text-lg text-white font-medium mb-2 group-hover:text-[#C59C58] transition-colors">
                    {c.country}
                  </h5>
                  <p className="text-xs text-white/70 font-light leading-relaxed mb-4">
                    {c.roles}
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 text-[11px] font-mono text-[#E6C687]">
                  ✓ {c.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. The 4 Operational Pillars (Nordic Rigor & Turnkey Support) */}
        <div className="about-fade-up pt-10 border-t border-white/10">
          <div className="mb-8">
            <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C59C58] mb-2">
              {isSv ? "Vårt Bemanningslöfte // 4 Huvudpelare" : "Our Commitment // 4 Core Pillars"}
            </div>
            <h4 className="font-serif text-2xl sm:text-3xl text-white font-normal">
              {isSv ? "Trygg, Effektiv & Fullt Integrerad Bemanning" : "Dependable, Compliant & Integrated Manpower"}
            </h4>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pillars.map((pillar, idx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={idx}
                  className="p-6 sm:p-7 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#C59C58]/35 transition-all space-y-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#C59C58]/15 text-[#C59C58] flex items-center justify-center border border-[#C59C58]/30">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h5 className="font-serif text-base sm:text-lg text-white font-medium">
                      {pillar.title}
                    </h5>
                  </div>
                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed pl-12">
                    {pillar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. Key Industry Sectors Overview */}
        <div className="about-fade-up pt-10 border-t border-white/10">
          <div className="text-xs font-mono uppercase tracking-[0.2em] text-[#C59C58] mb-6">
            {isSv ? "Viktiga Industrisektorer Vi Betjänar" : "Key Industry Sectors We Serve"}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sectors.map((sec, idx) => {
              const Icon = sec.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#C59C58]/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <Icon className="w-5 h-5 text-[#C59C58] mb-3" />
                    <h5 className="font-serif text-base text-white font-normal mb-1.5">
                      {sec.title}
                    </h5>
                    <p className="text-xs text-white/60 font-light leading-relaxed">
                      {sec.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/5">
                    <Link
                      href={`/#service-${idx === 0 ? "shipbuilding" : idx === 1 ? "construction" : idx === 2 ? "industrial" : "logistics"}`}
                      className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#C59C58] hover:text-[#E6C687] transition-colors"
                    >
                      <span>{isSv ? "Läs mer om sektorn" : "Explore sector"}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6. Direct Leadership & Governance Card */}
        <div className="about-fade-up pt-10 border-t border-white/10">
          <div className="p-7 sm:p-9 rounded-3xl bg-[#0B1522]/90 border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C59C58] animate-pulse" />
                <h4 className="text-xs font-mono uppercase tracking-[0.2em] text-[#C59C58] font-semibold">
                  {isSv ? "Direkt Ledning & Partners" : "Direct Leadership & Key Partners"}
                </h4>
              </div>
              <span className="text-xs font-mono text-white/50">
                Norvian AB • Västervik, Sweden
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {leadership.map((leader, i) => (
                <div key={i} className="space-y-1 p-4 rounded-xl bg-white/[0.02] border border-white/5">
                  <h5 className="font-serif text-sm sm:text-base text-white font-medium tracking-tight">
                    {leader.name}
                  </h5>
                  <p className="text-[#C59C58] font-semibold text-[11px] sm:text-xs">
                    {leader.role}
                  </p>
                  <p className="text-white/60 text-[10.5px] sm:text-[11.5px] font-light leading-relaxed">
                    {leader.focus}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-white/70">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C59C58]" />
                <span>Baumansgatan 4, 593 32 Västervik, Sweden</span>
              </div>
              <div className="flex items-center gap-4">
                <a href="mailto:contact@norvian.no" className="hover:text-[#C59C58] transition-colors">
                  contact@norvian.no
                </a>
                <span>•</span>
                <a href="tel:+4722009000" className="hover:text-[#C59C58] transition-colors">
                  +47 22 00 90 00
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Bottom CTA Bar */}
        <div className="about-fade-up pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-base font-serif text-white/95">
              {isSv 
                ? "Behöver ni kvalificerad personal till era projekt i Norden eller Europa?"
                : "Need certified technical workforce for your upcoming projects across Europe?"}
            </p>
            <p className="text-xs text-white/50 font-mono mt-1">
              {isSv 
                ? "Diskutera direkt med vår företagsledning • Snabb handläggning och mobilisering"
                : "Discuss directly with our leadership team • Direct deployment & transparent terms"}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2.5 bg-[#C59C58] hover:bg-[#D4AF37] text-[#080E18] px-7 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-[0_10px_25px_-5px_rgba(197,156,88,0.4)] cursor-pointer active:scale-95"
            >
              <span>{t.nav.requestCta}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#080E18]" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
