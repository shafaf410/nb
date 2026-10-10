"use client";

import { useEffect, useRef, useState } from "react";
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
  Globe2,
  Clock,
  Users,
  FileCheck2,
  HardHat,
  ChevronDown,
  Building,
  Briefcase,
  CheckCircle2,
  Quote,
  Layers,
  FileText
} from "lucide-react";
import { 
  SERVICES_DATA, 
  type ServiceKey, 
  type ServiceDetailItem 
} from "@/components/servicesData";

export type { ServiceKey, ServiceDetailItem };
export { SERVICES_DATA };

interface ServiceDetailPageProps {
  serviceKey: ServiceKey | null;
  onClose: () => void;
  onRequestForIndustry: (serviceName: string) => void;
  onSwitchService?: (serviceKey: ServiceKey) => void;
}

export default function ServiceDetailPage({
  serviceKey,
  onClose,
  onRequestForIndustry,
  onSwitchService,
}: ServiceDetailPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Keyboard navigation, background scroll lock, Lenis control, and scroll reset
  useEffect(() => {
    if (!serviceKey) return;

    // Pause Lenis so it cannot intercept wheel or touch events on the modal
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.stop();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Save scroll position and lock background
    const prevScrollY = window.scrollY;
    const prevBodyOverflow = document.body.style.overflow;
    const prevHtmlOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // Reset modal scroll position to top whenever opened or switched
    if (pageContainerRef.current) {
      pageContainerRef.current.scrollTop = 0;
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevBodyOverflow;
      document.documentElement.style.overflow = prevHtmlOverflow;

      // Resume Lenis smooth scroll
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.start();
      }

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
  // Smoothly fades in and scales gently without breaking CSS scroll container mechanics
  const macBookAnimationVariants: Variants = {
    initial: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: 24,
          scale: 0.985,
        },
    animate: shouldReduceMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.38,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: 18,
          scale: 0.985,
          transition: {
            duration: 0.22,
            ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
          },
        },
  };

  const handleCtaClick = () => {
    // Connect to existing form flow: closes page and pre-fills service
    onRequestForIndustry(data.title);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  const handleSwitchService = (key: ServiceKey) => {
    if (pageContainerRef.current) {
      pageContainerRef.current.scrollTop = 0;
    }
    if (onSwitchService) {
      onSwitchService(key);
    }
  };

  const serviceKeys: ServiceKey[] = ["shipbuilding", "construction", "logistics"];
  const otherServices = serviceKeys.filter((k) => k !== serviceKey);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        ref={pageContainerRef}
        key="service-detail-modal"
        data-lenis-prevent="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-[100] w-full h-[100dvh] overflow-y-auto overflow-x-hidden bg-[#070D16] text-white selection:bg-[#C59C58] selection:text-[#070D16] overscroll-contain [scrollbar-width:thin] [scrollbar-color:#C59C58_#070D16] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-[#070D16] [&::-webkit-scrollbar-thumb]:bg-[#C59C58]/50 hover:[&::-webkit-scrollbar-thumb]:bg-[#C59C58] [&::-webkit-scrollbar-thumb]:rounded-full"
        style={{
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-y",
        }}
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        {/* 1. Fixed Persistent Header with Norvian AB Branding and Accessible Exit Button */}
        <header className="sticky top-0 inset-x-0 z-50 flex items-center justify-between px-3.5 sm:px-8 lg:px-12 py-2.5 sm:py-3.5 bg-[#070D16]/95 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
          {/* Left: Norvian AB Crest & Scandic Roots Identifier */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <Image
              src="/logo.png"
              alt="NORVIAN AB"
              width={140}
              height={34}
              className="h-6 sm:h-8 w-auto object-contain"
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

          {/* Center: Interactive Service Tabs Switcher */}
          {onSwitchService && (
            <div className="flex items-center gap-1 sm:gap-1.5 p-1 rounded-full bg-white/[0.04] border border-white/10">
              {serviceKeys.map((key) => {
                const item = SERVICES_DATA[key];
                const isCurrent = key === serviceKey;
                return (
                  <button
                    key={key}
                    onClick={() => handleSwitchService(key)}
                    className={`px-2.5 sm:px-3.5 py-1 rounded-full text-[9px] sm:text-[11px] font-mono tracking-wider transition-all duration-200 cursor-pointer ${
                      isCurrent
                        ? "bg-[#C59C58] text-[#070D16] font-bold shadow-md"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <span className="hidden sm:inline">{item.number} </span>
                    {key === "shipbuilding" ? "SHIPBUILDING" : key === "construction" ? "CONSTRUCTION" : "LOGISTICS"}
                  </button>
                );
              })}
            </div>
          )}

          {/* Right: Persistent, High-Contrast Accessible Exit Button */}
          <button
            onClick={onClose}
            aria-label={`Exit ${data.title} page and return to slide`}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full bg-white/10 hover:bg-[#C59C58] text-white hover:text-[#070D16] border border-white/20 hover:border-[#C59C58] backdrop-blur-md shadow-lg transition-all duration-200 cursor-pointer group active:scale-95"
          >
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider uppercase">EXIT</span>
            <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:rotate-90" />
          </button>
        </header>

        {/* 2. Inner Animated Content Body */}
        <motion.div
          key={data.id}
          variants={macBookAnimationVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative w-full flex flex-col"
        >
          {/* Subtle Ambient Top Accent Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-96 bg-[#C59C58]/10 blur-[130px] rounded-full pointer-events-none" />

          {/* 2. Hero Section */}
          <section className="relative pt-6 sm:pt-12 pb-8 sm:pb-14 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Heading, Short Description, and Primary CTA */}
              <div className="lg:col-span-7 space-y-4 sm:space-y-6">
                
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

                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.4 }}
                  className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-[-0.025em] leading-[1.06]"
                >
                  {data.heading}
                </motion.h1>

                {/* Short Description */}
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
                  className="pt-2 sm:pt-4 flex flex-wrap items-center gap-3 sm:gap-4"
                >
                  <button
                    onClick={handleCtaClick}
                    className="group inline-flex items-center justify-between gap-4 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-[#C59C58] hover:bg-[#D4AF37] text-[#070D16] font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_12px_32px_-6px_rgba(197,156,88,0.45)] cursor-pointer active:scale-95"
                  >
                    <span>{data.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>

                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all border border-white/10 cursor-pointer"
                  >
                    <span>Back to Carousel</span>
                  </button>
                </motion.div>

              </div>

              {/* Right Column: High-Quality Industrial Photograph */}
              <motion.div
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1.0 }}
                transition={{ delay: 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="lg:col-span-5 relative"
              >
                <div className="relative h-60 sm:h-80 lg:h-[460px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.85)] bg-black">
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
                      NORVIAN AB • SPEC
                    </span>
                    <span className="font-serif text-lg font-light text-white/50">
                      0{data.number}
                    </span>
                  </div>
                </div>
              </motion.div>

            </div>
          </section>

          {/* 3. High-Impact Performance Metrics Strip */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-3 sm:py-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {data.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.35 }}
                  className="p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#C59C58]/40 transition-all space-y-1 sm:space-y-2"
                >
                  <div className="font-serif text-2xl sm:text-4xl font-normal text-[#C59C58]">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-white tracking-wide">
                    {stat.label}
                  </div>
                  <div className="text-[11px] sm:text-xs text-white/60 font-light leading-snug">
                    {stat.sub}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 4. Detailed Description Editorial Card */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-5 sm:py-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-[#0E1726] to-[#070D16] border border-[#C59C58]/35 shadow-2xl"
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

          {/* 5. Dual Pillars: "Our Workforce Includes" & "Our Expertise" */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-6 sm:py-10">
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

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2">
                  {data.workforce.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#C59C58]/40 hover:bg-white/[0.05] transition-all group"
                    >
                      <div className="w-5 h-5 rounded-md bg-[#C59C58]/15 text-[#C59C58] flex items-center justify-center shrink-0 group-hover:bg-[#C59C58] group-hover:text-[#070D16] transition-colors">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-xs sm:text-sm text-white/90 font-light group-hover:text-white transition-colors leading-tight">
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

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3 pt-2">
                  {data.expertise.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-2.5 p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#C59C58]/40 hover:bg-white/[0.05] transition-all group"
                    >
                      <div className="w-5 h-5 rounded-md bg-[#C59C58]/15 text-[#C59C58] flex items-center justify-center shrink-0 group-hover:bg-[#C59C58] group-hover:text-[#070D16] transition-colors">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-xs sm:text-sm text-white/90 font-light group-hover:text-white transition-colors leading-tight">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>
          </section>

          {/* 6. Technical Standards & Competence Matrix (NEW) */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-8 sm:py-12 border-t border-white/10">
            <div className="space-y-2 mb-8">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#C59C58] font-bold">
                ENGINEERING RIGOR & TOLERANCES
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
                Technical Standards & Testing Matrix
              </h2>
              <p className="text-sm sm:text-base text-white/70 font-light max-w-2xl">
                Every trade is independently assessed and certified to European operational norms before deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {data.technicalMatrix.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="p-5 sm:p-6 rounded-2xl bg-[#09101C] border border-white/10 hover:border-[#C59C58]/50 transition-all space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                    <h4 className="text-base sm:text-lg font-medium text-white">
                      {item.discipline}
                    </h4>
                    <span className="text-[10px] sm:text-xs font-mono text-[#C59C58] bg-[#C59C58]/10 px-2.5 py-0.5 rounded-full border border-[#C59C58]/20">
                      {item.standards}
                    </span>
                  </div>
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <div>
                      <span className="text-white/50 font-mono text-[10px] uppercase block">CAPABILITIES & MATERIALS</span>
                      <p className="text-white/85 font-light leading-relaxed">{item.capabilities}</p>
                    </div>
                    <div className="pt-1">
                      <span className="text-white/50 font-mono text-[10px] uppercase block">QUALITY & VERIFICATION</span>
                      <p className="text-[#C59C58]/90 font-light leading-relaxed flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C59C58] shrink-0" />
                        <span>{item.verification}</span>
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 7. Deep-Dive Trade Specializations (6 Cards) */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-8 sm:py-12 border-t border-white/10">
            <div className="space-y-2 mb-8">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#C59C58] font-bold">
                PRECISION CAPABILITIES
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
                Specialized Technical Disciplines
              </h2>
              <p className="text-sm sm:text-base text-white/70 font-light max-w-2xl">
                Specialized trade certifications and verified craftsmanship ready for deployment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {data.tradeSpecialties.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="p-6 rounded-2xl bg-[#0B1522]/80 border border-white/10 hover:border-[#C59C58]/50 transition-all space-y-3 group flex flex-col justify-between"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <h4 className="text-base sm:text-lg font-medium text-white group-hover:text-[#C59C58] transition-colors">
                        {item.title}
                      </h4>
                      <span className="w-2 h-2 rounded-full bg-[#C59C58]/60 group-hover:bg-[#C59C58] transition-colors" />
                    </div>
                    <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-white/5 flex items-center gap-2 text-[10px] sm:text-xs font-mono text-[#C59C58]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C59C58] shrink-0" />
                    <span>{item.certs}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 8. Turnkey 4-Step Recruitment & Mobilization Process */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-8 sm:py-14 border-t border-white/10">
            <div className="space-y-2 mb-10 text-center max-w-2xl mx-auto">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#C59C58] font-bold">
                STREAMLINED DEPLOYMENT
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
                How We Mobilize Your Workforce
              </h2>
              <p className="text-sm sm:text-base text-white/70 font-light">
                From technical scoping to day-one on-site arrival with complete European legal compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {data.deploymentProcess.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#C59C58]/40 transition-all space-y-3 relative group"
                >
                  <div className="font-mono text-2xl sm:text-3xl font-light text-[#C59C58]/60 group-hover:text-[#C59C58] transition-colors">
                    {step.step}
                  </div>
                  <h4 className="text-base font-medium text-white leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 9. Turnkey Employer Governance & Assurance Package (NEW) */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-8 sm:py-12 border-t border-white/10">
            <div className="space-y-2 mb-8">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#C59C58] font-bold">
                ZERO COMPROMISE COMPLIANCE
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
                Full Employer Governance Package
              </h2>
              <p className="text-sm sm:text-base text-white/70 font-light max-w-2xl">
                We handle the complete administrative, legal, and logistical lifecycle so your management can focus purely on production.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {data.employerAssurances.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.35 }}
                  className="p-6 rounded-2xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/10 hover:border-[#C59C58]/40 transition-all space-y-3"
                >
                  <span className="text-[9.5px] font-mono uppercase tracking-wider text-[#C59C58] block">
                    {item.tag}
                  </span>
                  <h4 className="text-base font-medium text-white leading-snug">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 10. Verified Case Studies (2 Spotlights) */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-8 sm:py-12 border-t border-white/10">
            <div className="space-y-2 mb-8">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#C59C58] font-bold">
                PROVEN RESULTS & TRACK RECORD
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
                Featured Deployment Case Studies
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.caseStudies.map((study, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: idx * 0.1 }}
                  className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0B1522] to-[#070D16] border border-white/15 shadow-xl space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#C59C58]">
                      <Briefcase className="w-3.5 h-3.5" />
                      <span>CASE STUDY 0{idx + 1}</span>
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-normal">
                      {study.project}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/80 font-light leading-relaxed">
                      {study.impact}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50 font-mono">CLIENT TYPE:</span>
                      <span className="text-white font-medium">{study.clientType}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white/50 font-mono">TIMELINE:</span>
                      <span className="text-[#C59C58] font-semibold">{study.timeline}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {study.metrics.map((m, mIdx) => (
                        <span
                          key={mIdx}
                          className="text-[10px] font-mono text-[#C59C58] bg-[#C59C58]/10 px-2.5 py-1 rounded-md border border-[#C59C58]/20"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 11. Client Testimonial Reference (NEW) */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-8 sm:py-12 border-t border-white/10">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="relative p-6 sm:p-10 lg:p-12 rounded-3xl bg-gradient-to-r from-[#0C1523] via-[#0A121E] to-[#070D16] border border-[#C59C58]/35 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-6 right-8 text-[#C59C58]/15 pointer-events-none">
                <Quote className="w-24 h-24" />
              </div>
              <div className="relative z-10 max-w-4xl space-y-6">
                <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#C59C58] font-semibold">
                  EXECUTIVE CLIENT ENDORSEMENT
                </span>
                <p className="font-serif text-lg sm:text-2xl text-white/95 font-light leading-relaxed italic">
                  &ldquo;{data.testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4 pt-2 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-[#C59C58]/20 border border-[#C59C58]/40 flex items-center justify-center text-[#C59C58] font-bold text-sm">
                    {data.testimonial.author[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {data.testimonial.author}
                    </div>
                    <div className="text-xs text-white/60 font-light">
                      {data.testimonial.role} • {data.testimonial.company} ({data.testimonial.country})
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* 12. Frequently Asked Questions (6 Accordion Items) */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-8 sm:py-14 border-t border-white/10">
            <div className="space-y-2 mb-8">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#C59C58] font-bold">
                ANSWERS FOR EMPLOYERS
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {data.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.03] transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm sm:text-base font-medium text-white/95">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#C59C58] shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-white/75 font-light leading-relaxed border-t border-white/5 pt-3">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* 13. Regulatory & Mobilization Compliance Strip */}
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

          {/* 14. Closing Full-Width Call-to-Action Banner */}
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

          {/* 15. Other Services Switcher Footer */}
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
      </motion.div>
    </AnimatePresence>
  );
}
