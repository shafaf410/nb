"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Subtle CountUp component for statistics
function CountUpNumber({ end, suffix = "", duration = 1500 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-serif">
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function GlobalNetworkSection() {
  const { t } = useLanguage();

  const steps = t.global.phases;
  const stats = t.global.stats;

  return (
    <section id="global-network" className="py-16 sm:py-24 lg:py-36 bg-[#FAF7F2] relative overflow-hidden border-t border-[#0B1522]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* Top Header Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end">
          <div className="lg:col-span-8 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C59C58]">
                {t.global.tag}
              </span>
              <span className="h-[1px] w-10 sm:w-12 bg-[#C59C58]/60" />
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#0B1522] tracking-[-0.02em] leading-[1.12]">
              {t.global.titleLine1} <br />
              {t.global.titleLine2} <span className="text-[#C59C58] italic font-serif">{t.global.titleAccent}</span>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pb-2">
            <p className="text-sm sm:text-base text-[#0B1522]/75 font-light leading-relaxed">
              {t.global.desc}
            </p>
          </div>
        </div>

        {/* Realistic Minimal Modern Cartography Centerpiece */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden border border-[#0B1522]/15 shadow-[0_20px_50px_-15px_rgba(11,21,34,0.2)] sm:shadow-[0_30px_70px_-20px_rgba(11,21,34,0.25)] bg-[#070D16]">
          <div className="relative h-[380px] sm:h-[520px] lg:h-[660px] w-full">
            
            {/* Realistic Minimal Map Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/realistic_map.jpg"
                alt="NORVIAN Realistic Minimal Continental Cartography - Europe to Asia Corridor"
                fill
                sizes="100vw"
                className="object-cover object-center"
                priority
              />
            </div>

            {/* Subtle Vignette & Contrast Control */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070D16]/90 via-transparent to-[#070D16]/40 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#070D16]/50 via-transparent to-[#070D16]/50 pointer-events-none" />

            {/* SVG Flight Arcs Connecting Precise Geographic Points */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 600"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="goldFlightGrad" x1="100%" y1="70%" x2="20%" y2="25%">
                  <stop offset="0%" stopColor="#C59C58" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#FAF7F2" stopOpacity="0.95" />
                  <stop offset="100%" stopColor="#C59C58" stopOpacity="0.8" />
                </linearGradient>

                <linearGradient id="goldGlowGrad" x1="100%" y1="70%" x2="20%" y2="25%">
                  <stop offset="0%" stopColor="#C59C58" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#C59C58" stopOpacity="0.1" />
                </linearGradient>
              </defs>

              {/* Arc 1: South Asia (India ~ 585, 390) -> Northern Europe (Oslo/Bergen ~ 245, 175) */}
              <motion.path
                d="M 585 390 Q 420 120 245 175"
                fill="none"
                stroke="url(#goldGlowGrad)"
                strokeWidth="6"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.path
                d="M 585 390 Q 420 120 245 175"
                fill="none"
                stroke="url(#goldFlightGrad)"
                strokeWidth="2.5"
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Arc 2: Nepal / Subcontinent (~ 610, 375) -> Central Europe (~ 220, 240) */}
              <motion.path
                d="M 610 375 Q 440 145 220 240"
                fill="none"
                stroke="url(#goldFlightGrad)"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2.4, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </svg>

            {/* Glowing Origin & Destination Geographic Markers */}
            
            {/* EUROPE Hub (Norway & Northern Europe) */}
            <div className="absolute top-[29%] left-[24.5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-20">
              <div className="relative flex items-center justify-center">
                <span className="w-8 h-8 rounded-full bg-[#C59C58]/25 animate-ping absolute" />
                <span className="w-4 h-4 rounded-full bg-[#C59C58] border-2 border-white shadow-[0_0_12px_#C59C58] relative z-10" />
              </div>
              <div className="mt-2.5 bg-[#0B1522]/90 backdrop-blur-md px-3.5 py-1 rounded-full border border-[#C59C58]/40 shadow-xl">
                <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-white whitespace-nowrap">
                  {t.global.destinationPill}
                </span>
              </div>
            </div>

            {/* SOUTH ASIA Hub (India & Nepal) */}
            <div className="absolute top-[65%] left-[58.5%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group cursor-pointer z-20">
              <div className="relative flex items-center justify-center">
                <span className="w-8 h-8 rounded-full bg-[#C59C58]/25 animate-ping absolute" />
                <span className="w-4 h-4 rounded-full bg-[#C59C58] border-2 border-white shadow-[0_0_12px_#C59C58] relative z-10" />
              </div>
              <div className="mt-2.5 bg-[#0B1522]/90 backdrop-blur-md px-3.5 py-1 rounded-full border border-[#C59C58]/40 shadow-xl">
                <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-white whitespace-nowrap">
                  {t.global.originPill}
                </span>
              </div>
            </div>

            {/* Floating Editorial Legend in Bottom Left Corner */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-md bg-[#0B1522]/90 backdrop-blur-xl p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-white/10 text-white space-y-1.5 sm:space-y-2 shadow-2xl z-20">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#C59C58] font-bold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{t.global.legendTitle}</span>
              </div>
              <p className="text-[11px] sm:text-xs text-white/80 font-light leading-relaxed">
                {t.global.legendDesc}
              </p>
            </div>
          </div>
        </div>

        {/* 4-Step Editorial Process Corridor */}
        <div id="deployment-process" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pt-8 scroll-mt-28">
          {steps.map((step, idx) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2.5 sm:space-y-3 border-l-2 border-[#C59C58]/40 pl-4 sm:pl-5 relative group"
            >
              <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C59C58] block">
                PHASE {step.number}
              </span>
              <h4 className="font-serif text-lg sm:text-xl font-normal text-[#0B1522]">
                {step.label}
              </h4>
              <p className="text-xs text-[#0B1522]/70 font-light leading-relaxed">
                {step.detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Integrated Statistics Section */}
        <div id="statistics" className="pt-12 sm:pt-16 pb-8 border-t border-[#0B1522]/10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="space-y-1 sm:space-y-2 lg:border-r lg:last:border-r-0 border-[#0B1522]/10 lg:pr-8"
              >
                <div className="font-serif text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-normal text-[#0B1522] tracking-tight">
                  <CountUpNumber end={stat.numeric} suffix={stat.suffix} />
                </div>
                <div className="text-xs sm:text-sm font-medium text-[#0B1522] pt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] sm:text-xs text-[#0B1522]/60 font-light leading-snug">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
