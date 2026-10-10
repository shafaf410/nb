"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { 
  X, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Anchor, 
  Building2, 
  Truck, 
  ChevronRight, 
  Sparkles,
  Award,
  Globe2
} from "lucide-react";

export type ServiceKey = "shipbuilding" | "construction" | "logistics";

interface ServiceDetailPageProps {
  serviceKey: ServiceKey | null;
  onClose: () => void;
  onRequestForIndustry: (serviceName: string) => void;
  onSwitchService?: (serviceKey: ServiceKey) => void;
}

export const SERVICES_DATA: Record<
  ServiceKey,
  {
    id: ServiceKey;
    number: string;
    code: string;
    title: string;
    heading: string;
    badge: string;
    complianceBadges: string[];
    shortDescription: string;
    detailedDescription: string;
    workforce: string[];
    expertise: string[];
    ctaText: string;
    image: string;
    icon: typeof Anchor;
  }
> = {
  shipbuilding: {
    id: "shipbuilding",
    number: "01",
    code: "DISCIPLINE 01 / MARITIME",
    title: "Shipbuilding",
    heading: "Empowering Shipbuilders",
    badge: "DNV & ISO 9606-1 CERTIFIED",
    complianceBadges: ["DNV Standard", "ISO 9606-1 Welders", "Lloyd's Register Compliant", "Turnkey Mobilization"],
    shortDescription:
      "Skilled welders, fitters and marine specialists from Asia, supporting shipyards with the workforce needed to build, repair and maintain vessels.",
    detailedDescription:
      "Scandic Roots connects shipyards and marine engineering companies with skilled professionals for demanding shipbuilding projects. From steel fabrication to vessel assembly, we help employers source suitable talent to support project schedules, quality standards and operational requirements.",
    workforce: [
      "Certified Welders",
      "Ship Fitters",
      "Pipe Fitters",
      "Steel Fabricators",
      "Structural Fitters",
      "Marine Technicians",
      "Mechanical Fitters",
    ],
    expertise: [
      "Ship construction and assembly",
      "Hull fabrication and steelwork",
      "Welding and metal fabrication",
      "Marine piping and fitting",
      "Ship repair and maintenance",
    ],
    ctaText: "Find Shipbuilding Talent",
    image: "/images/shipbuilding_real.jpg",
    icon: Anchor,
  },
  construction: {
    id: "construction",
    number: "02",
    code: "DISCIPLINE 02 / CIVIL",
    title: "Construction",
    heading: "Building Stronger Futures",
    badge: "EN 1090 & ISO 45001 CERTIFIED",
    complianceBadges: ["EN 1090 Steel", "ISO 45001 Safety", "Eurocode Compliant", "Pre-Tested Trade Skills"],
    shortDescription:
      "Reliable construction professionals and skilled tradespeople to support infrastructure, commercial and industrial projects.",
    detailedDescription:
      "We help construction companies source skilled workers who can contribute to projects of different sizes and complexities. Our focus is on connecting employers with suitable candidates whose practical skills and experience match the demands of the job.",
    workforce: [
      "Construction Workers",
      "Welders",
      "Steel Fabricators",
      "Structural Fitters",
      "Concrete Workers",
      "Mechanical Installers",
      "General Skilled Tradespeople",
    ],
    expertise: [
      "Industrial construction",
      "Structural steel installation",
      "Infrastructure development",
      "Commercial construction",
      "On-site technical and trade support",
    ],
    ctaText: "Find Construction Talent",
    image: "/images/construction_real.jpg",
    icon: Building2,
  },
  logistics: {
    id: "logistics",
    number: "03",
    code: "DISCIPLINE 03 / FLEET",
    title: "Transport & Logistics",
    heading: "Driving Logistics Forward",
    badge: "EU CODE 95 & ADR CERTIFIED",
    complianceBadges: ["EU Code 95 CPC", "ADR Dangerous Goods", "Tachograph Verified", "Nordic Winter Ready"],
    shortDescription:
      "Experienced truck and trailer drivers to help transport and logistics companies keep goods moving and operations running smoothly.",
    detailedDescription:
      "Scandic Roots supports transport businesses by connecting them with suitable professional drivers for their operational needs. We focus on relevant driving experience, role requirements and the documentation necessary for employment and legal driving eligibility in the destination country.",
    workforce: [
      "Heavy Goods Vehicle (HGV) Drivers",
      "Truck Drivers",
      "Trailer Drivers",
      "Long-Haul Drivers",
      "Freight Transport Drivers",
    ],
    expertise: [
      "Long-distance freight transport",
      "Commercial vehicle operations",
      "Trailer and heavy vehicle driving",
      "Transport workforce sourcing",
      "Driver qualification and documentation coordination",
    ],
    ctaText: "Find Qualified Drivers",
    image: "/images/norvian_truck.jpg",
    icon: Truck,
  },
};

export default function ServiceDetailPage({
  serviceKey,
  onClose,
  onRequestForIndustry,
  onSwitchService,
}: ServiceDetailPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const pageContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard navigation & body scroll lock with scroll restoration
  useEffect(() => {
    if (!serviceKey) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Save scroll position and lock background
    const prevScrollY = window.scrollY;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      // Ensure background scroll position is strictly preserved
      if (typeof window !== "undefined") {
        window.scrollTo(0, prevScrollY);
      }
    };
  }, [serviceKey, onClose]);

  if (!serviceKey) return null;

  const data = SERVICES_DATA[serviceKey];
  const Icon = data.icon;

  // MacBook Opening Animation:
  // Scales up gently from the trigger area into full-screen with subtle lid-tilt perspective
  const macBookAnimationVariants: Variants = {
    initial: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          scale: 0.94,
          rotateX: 7,
          y: 24,
          transformOrigin: "bottom center",
        },
    animate: shouldReduceMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          y: 0,
          transformOrigin: "bottom center",
          transition: {
            duration: 0.42,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          scale: 0.95,
          rotateX: 5,
          y: 18,
          transformOrigin: "bottom center",
          transition: {
            duration: 0.3,
            ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
          },
        },
  };

  const handleCtaClick = () => {
    // Connect to existing form flow: closes page and pre-fills service
    onRequestForIndustry(data.title);
  };

  // Other two services for footer switcher
  const serviceKeys: ServiceKey[] = ["shipbuilding", "construction", "logistics"];
  const otherServices = serviceKeys.filter((k) => k !== serviceKey);

  return (
    <AnimatePresence mode="wait">
      <div 
        className="fixed inset-0 z-[100] w-full h-[100dvh] overflow-hidden bg-black/80 backdrop-blur-md flex items-center justify-center"
        style={{ perspective: 1200 }}
      >
        <motion.div
          ref={pageContainerRef}
          key={data.id}
          variants={macBookAnimationVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative w-full h-full overflow-y-auto bg-[#070D16] text-white selection:bg-[#C59C58] selection:text-[#070D16]"
        >
          {/* 1. Fixed Persistent Header with Norvian AB Branding and Accessible Exit Button */}
          <header className="sticky top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-12 py-3 sm:py-4 bg-[#070D16]/90 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
            {/* Left: Norvian AB Crest & Scandic Roots Identifier */}
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="NORVIAN AB"
                width={150}
                height={36}
                className="h-7 sm:h-8 md:h-9 w-auto object-contain"
                priority
              />
              <div className="hidden sm:flex flex-col border-l border-white/15 pl-3">
                <span className="text-[10px] font-bold tracking-[0.22em] text-white/90 uppercase">
                  SCANDIC ROOTS
                </span>
                <span className="text-[8px] font-mono tracking-wider text-[#C59C58] uppercase">
                  Specialized Workforce Alliance
                </span>
              </div>
            </div>

            {/* Center: Current Service Badge */}
            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-white/70 font-mono tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59C58] animate-pulse" />
              <span>SERVICE /</span>
              <span className="text-white font-semibold uppercase">{data.title}</span>
            </div>

            {/* Right: Persistent, High-Contrast Accessible Exit Button */}
            <button
              onClick={onClose}
              aria-label={`Exit ${data.title} page and return to slide`}
              className="flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-white/10 hover:bg-[#C59C58] text-white hover:text-[#070D16] border border-white/20 hover:border-[#C59C58] backdrop-blur-md shadow-lg transition-all duration-200 cursor-pointer group active:scale-95"
            >
              <span className="text-xs font-semibold tracking-wider uppercase">EXIT</span>
              <X className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
            </button>
          </header>

          {/* Subtle Ambient Top Accent Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-96 bg-[#C59C58]/10 blur-[130px] rounded-full pointer-events-none" />

          {/* 2. Hero Section */}
          <section className="relative pt-8 sm:pt-12 pb-12 sm:pb-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Heading, Short Description, and Primary CTA */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                
                {/* Meta Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.35 }}
                  className="flex flex-wrap items-center gap-2 sm:gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#C59C58]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#C59C58] font-bold">
                    {data.code}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] uppercase tracking-wider text-[#C59C58] font-mono bg-white/5 px-2.5 py-0.5 rounded-full border border-[#C59C58]/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C59C58]" />
                    {data.badge}
                  </span>
                </motion.div>

                {/* Main Heading (Exact from prompt) */}
                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.4 }}
                  className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-[-0.025em] leading-[1.06]"
                >
                  {data.heading}
                </motion.h1>

                {/* Short Description (Exact from prompt) */}
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16, duration: 0.4 }}
                  className="text-base sm:text-lg lg:text-xl text-white/85 font-light leading-relaxed max-w-2xl"
                >
                  {data.shortDescription}
                </motion.p>

                {/* Primary CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="pt-2 sm:pt-4 flex flex-wrap items-center gap-4"
                >
                  <button
                    onClick={handleCtaClick}
                    className="group inline-flex items-center justify-between gap-4 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#C59C58] hover:bg-[#D4AF37] text-[#070D16] font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_12px_32px_-6px_rgba(197,156,88,0.45)] cursor-pointer active:scale-95"
                  >
                    <span>{data.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>

                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all border border-white/10 cursor-pointer"
                  >
                    <span>Back to Carousel</span>
                  </button>
                </motion.div>

              </div>

              {/* Right Column: High-Quality Industrial Photograph with gentle reveal */}
              <motion.div
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1.0 }}
                transition={{ delay: 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="lg:col-span-5 relative"
              >
                <div className="relative h-64 sm:h-80 lg:h-[460px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.85)] bg-black">
                  <Image
                    src={data.image}
                    alt={data.heading}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center brightness-95 contrast-105 transition-transform duration-700 hover:scale-[1.03]"
                    priority
                  />
                  {/* Subtle edge vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070D16]/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Bottom Image Tag */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/75 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                    <span className="font-mono uppercase tracking-wider text-[11px] text-[#C59C58]">
                      NORWEGIAN AB • SPEC
                    </span>
                    <span className="font-serif text-lg font-light text-white/50">
                      0{data.number}
                    </span>
                  </div>
                </div>
              </motion.div>

            </div>
          </section>

          {/* 3. Detailed Description Editorial Card */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-6 sm:py-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-[#0E1726] to-[#070D16] border border-[#C59C58]/30 shadow-2xl"
            >
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="w-1.5 h-16 sm:h-20 rounded-full bg-[#C59C58] shrink-0 mt-1" />
                <div className="space-y-2 sm:space-y-3">
                  <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#C59C58] font-bold">
                    THE SCANDIC ROOTS APPROACH
                  </div>
                  <p className="text-base sm:text-xl lg:text-2xl font-light text-white leading-relaxed">
                    {data.detailedDescription}
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* 4. Dual Pillars: "Our Workforce Includes" & "Our Expertise" */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-8 sm:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Column 1: Our Workforce Includes */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all shadow-xl space-y-5"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C59C58]">
                      SOURCED & VETTED TALENT
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                      Our Workforce Includes
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C59C58]">
                    <Award className="w-5 h-5" />
                  </div>
                </div>

                <ul className="space-y-2.5 sm:space-y-3 pt-2">
                  {data.workforce.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#C59C58]/40 hover:bg-white/[0.05] transition-all group"
                    >
                      <div className="w-6 h-6 rounded-lg bg-[#C59C58]/15 text-[#C59C58] flex items-center justify-center shrink-0 group-hover:bg-[#C59C58] group-hover:text-[#070D16] transition-colors">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm sm:text-base text-white/90 font-light group-hover:text-white transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Column 2: Our Expertise */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all shadow-xl space-y-5"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C59C58]">
                      CAPABILITIES & SCOPE
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                      Our Expertise
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C59C58]">
                    <Globe2 className="w-5 h-5" />
                  </div>
                </div>

                <ul className="space-y-2.5 sm:space-y-3 pt-2">
                  {data.expertise.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#C59C58]/40 hover:bg-white/[0.05] transition-all group"
                    >
                      <div className="w-6 h-6 rounded-lg bg-[#C59C58]/15 text-[#C59C58] flex items-center justify-center shrink-0 group-hover:bg-[#C59C58] group-hover:text-[#070D16] transition-colors">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm sm:text-base text-white/90 font-light group-hover:text-white transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>
          </section>

          {/* 5. Regulatory & Mobilization Compliance Strip */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-4">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1522]/80 border border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C59C58]">
                  OPERATIONAL ACCREDITATION
                </span>
                <p className="text-sm sm:text-base text-white/90 font-light">
                  Full turnkey compliance under Scandinavian and European labor directives.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {data.complianceBadges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white/80 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* 6. Closing Full-Width Call-to-Action Banner */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-12 sm:py-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="relative rounded-3xl p-8 sm:p-14 lg:p-16 overflow-hidden bg-gradient-to-br from-[#0B1522] via-[#0E1726] to-[#070D16] border border-[#C59C58]/40 shadow-2xl text-center space-y-6"
            >
              {/* Background ambient light */}
              <div className="absolute inset-0 bg-radial from-[#C59C58]/15 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#C59C58] bg-[#C59C58]/10 px-3.5 py-1 rounded-full border border-[#C59C58]/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>START YOUR INQUIRY TODAY</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight">
                  Ready to Mobilize {data.title} Talent?
                </h2>

                <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed max-w-xl mx-auto">
                  Connect with our recruitment team to review project schedules, skill requirements, and worker availability across Scandinavia and Europe.
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={handleCtaClick}
                    className="group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-[#C59C58] hover:bg-[#D4AF37] text-[#070D16] font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_12px_36px_-6px_rgba(197,156,88,0.5)] cursor-pointer active:scale-95"
                  >
                    <span>{data.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>

                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold uppercase tracking-wider transition-all border border-white/15 cursor-pointer"
                  >
                    <span>Return to Slide (✕)</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </section>

          {/* 7. Other Services Switcher Footer */}
          <footer className="border-t border-white/10 bg-[#05090F] py-10 px-4 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
              
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="NORVIAN AB"
                  width={130}
                  height={32}
                  className="h-7 w-auto object-contain"
                />
                <span className="text-xs text-white/50 font-light">
                  © {new Date().getFullYear()} Norvian AB • Scandic Roots
                </span>
              </div>

              {/* Quick links to explore other services */}
              {onSwitchService && (
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="text-white/40 font-mono uppercase tracking-wider">OTHER SERVICES:</span>
                  {otherServices.map((key) => {
                    const otherData = SERVICES_DATA[key];
                    return (
                      <button
                        key={key}
                        onClick={() => onSwitchService(key)}
                        className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 hover:border-[#C59C58] transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{otherData.title}</span>
                        <ChevronRight className="w-3 h-3 text-[#C59C58]" />
                      </button>
                    );
                  })}
                </div>
              )}

            </div>
          </footer>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
