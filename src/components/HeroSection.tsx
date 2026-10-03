"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface HeroSectionProps {
  onRequestWorkforce: () => void;
}

export default function HeroSection({ onRequestWorkforce }: HeroSectionProps) {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const trustHighlights = [
    { label: t.hero.amlBadge },
    { label: t.hero.dnvBadge },
    { label: t.hero.code95Badge },
  ];

  return (
    <section
      ref={containerRef}
      className="relative pt-24 pb-16 sm:pt-40 sm:pb-28 lg:pt-48 lg:pb-36 overflow-hidden bg-[#FAF7F2]"
    >
      {/* Background Architectural Ambient Light & Subtle Grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 border-x border-[#0B1522]/5" />
      </div>

      {/* Atmospheric Gold Radial Sheen */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-br from-[#C59C58]/10 via-[#FAF7F2]/0 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          
          {/* Left Hero Column */}
          <div className="lg:col-span-7 z-10 space-y-6 sm:space-y-8">
            
            {/* Prestige Tag Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-[#C59C58]/40 shadow-[0_2px_12px_-2px_rgba(11,21,34,0.06)]"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C59C58] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C59C58]"></span>
              </span>
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.2em] sm:tracking-[0.24em] text-[#0B1522]">
                {t.hero.badge}
              </span>
            </motion.div>

            {/* Editorial Staggered Headline */}
            <div className="space-y-1.5 sm:space-y-2">
              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-7xl xl:text-[80px] font-normal tracking-[-0.025em] text-[#0B1522] leading-[1.1] sm:leading-[1.04]"
              >
                {t.hero.titleLine1} <br />
                <span className="italic text-[#C59C58] font-serif pr-2 font-normal drop-shadow-xs">
                  {t.hero.titleAccent}
                </span> <br className="hidden sm:inline" />
                {t.hero.titleLine2}
              </motion.h1>
            </div>

            {/* Supporting Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base lg:text-lg text-[#0B1522]/75 max-w-xl font-light leading-relaxed"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-1 sm:pt-2"
            >
              <button
                onClick={onRequestWorkforce}
                className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#0B1522] via-[#142337] to-[#0B1522] hover:from-[#152336] hover:to-[#0B1522] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_16px_32px_-8px_rgba(11,21,34,0.25)] border border-[#C59C58]/40 active:scale-95 cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
                <span className="relative z-10">{t.hero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 text-[#C59C58] relative z-10 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </button>

              <a
                href="#industries"
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-2.5 bg-white/70 hover:bg-[#FAF7F2] text-[#0B1522] px-6 sm:px-7 py-3.5 sm:py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 border border-[#0B1522]/15 shadow-xs"
              >
                <span>{t.hero.ctaSecondary}</span>
                <span className="text-[#C59C58] transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </a>
            </motion.div>

            {/* Editorial Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.45 }}
              className="pt-4 sm:pt-6 flex flex-wrap items-center gap-3 sm:gap-6 text-xs text-[#0B1522]/75 font-medium"
            >
              {trustHighlights.map((th, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C59C58] shrink-0" />
                  <span className="text-[11px] sm:text-xs">{th.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Metrics Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.55, ease: "easeOut" }}
              className="pt-6 sm:pt-8 border-t border-[#0B1522]/10 grid grid-cols-3 gap-2 sm:gap-6 max-w-lg"
            >
              <div className="space-y-1">
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#0B1522] block font-normal">
                  {t.hero.stat1Number}
                </span>
                <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-wider text-[#0B1522]/65 font-medium block">
                  {t.hero.stat1Label}
                </span>
              </div>
              <div className="space-y-1 border-l border-[#0B1522]/10 pl-3 sm:pl-6">
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#C59C58] block font-normal">
                  {t.hero.stat2Number}
                </span>
                <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-wider text-[#0B1522]/65 font-medium block">
                  {t.hero.stat2Label}
                </span>
              </div>
              <div className="space-y-1 border-l border-[#0B1522]/10 pl-3 sm:pl-6">
                <span className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#0B1522] block font-normal">
                  {t.hero.stat3Number}
                </span>
                <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-wider text-[#0B1522]/65 font-medium block">
                  {t.hero.stat3Label}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Right Immersive Image Column with Asymmetric Overlap */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md mx-auto lg:max-w-none lg:-mr-8 xl:-mr-12"
            >
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#0B1522]/15 shadow-[0_30px_70px_-20px_rgba(11,21,34,0.22)] aspect-[4/5] sm:aspect-[4/4.5] lg:aspect-[4/5.2]">
                <motion.div style={{ y: imageY }} className="relative w-full h-[115%] -top-[7%]">
                  <Image
                    src="/images/1.jpg"
                    alt="NORVIAN AB Heavy Transport Logistics in Norway"
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-center"
                    priority
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1522]/80 via-[#0B1522]/20 to-transparent" />
                </motion.div>
              </div>

              {/* Decorative Luxury Corner Accents */}
              <div className="absolute -top-3 -right-3 w-20 h-20 border-t-2 border-r-2 border-[#C59C58]/60 pointer-events-none rounded-tr-xl" />
              <div className="absolute -bottom-3 -left-3 w-16 h-16 border-b-2 border-l-2 border-[#C59C58]/40 pointer-events-none rounded-bl-xl" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
