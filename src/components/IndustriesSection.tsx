"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check, ShieldCheck, Anchor, Building2, Truck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface IndustriesSectionProps {
  onSelectIndustry: (industryKey: "shipbuilding" | "construction" | "logistics") => void;
}

export default function IndustriesSection({ onSelectIndustry }: IndustriesSectionProps) {
  const { t } = useLanguage();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const industries = [
    {
      id: "shipbuilding" as const,
      ...t.industries.shipbuilding,
      image: "/images/shipbuilding.jpg",
      buttonText: t.industries.buttonTextShipbuilding,
      icon: Anchor,
    },
    {
      id: "construction" as const,
      ...t.industries.construction,
      image: "/images/construction.jpg",
      buttonText: t.industries.buttonTextConstruction,
      icon: Building2,
    },
    {
      id: "logistics" as const,
      ...t.industries.logistics,
      image: "/images/1.jpg",
      buttonText: t.industries.buttonTextLogistics,
      icon: Truck,
    },
  ];

  return (
    <section id="industries" className="py-16 sm:py-24 lg:py-36 bg-[#FAF7F2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end pb-10 sm:pb-16 border-b border-[#0B1522]/10 mb-10 sm:mb-14">
          <div className="lg:col-span-8 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C59C58]">
                {t.industries.tag}
              </span>
              <span className="h-[1px] w-10 sm:w-12 bg-[#C59C58]/60" />
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#0B1522] tracking-[-0.02em] leading-tight">
              {t.industries.titleMain} <br className="hidden sm:inline" />
              <span className="text-[#C59C58] italic font-serif">{t.industries.titleAccent}</span>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pb-2">
            <p className="text-sm sm:text-base text-[#0B1522]/70 font-light leading-relaxed">
              {t.industries.desc}
            </p>
          </div>
        </div>

        {/* 3 Luxury Visual Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 xl:gap-10">
          {industries.map((ind, idx) => {
            return (
              <motion.div
                key={ind.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex flex-col justify-between rounded-2xl overflow-hidden bg-[#0B1522] text-white border border-[#C59C58]/20 hover:border-[#C59C58]/60 shadow-[0_20px_50px_-15px_rgba(11,21,34,0.2)] hover:shadow-[0_30px_60px_-15px_rgba(197,156,88,0.2)] transition-all duration-500"
              >
                {/* Image & Dark Gradient Overlay */}
                <div className="relative h-64 sm:h-80 lg:h-96 w-full overflow-hidden">
                  <Image
                    src={ind.image}
                    alt={ind.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  
                  {/* Cinematic Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1522] via-[#0B1522]/40 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#0B1522]/70 via-transparent to-transparent opacity-90" />

                  {/* Top Bar with Number & Verified Cert Badge */}
                  <div className="absolute top-4 left-4 right-4 sm:top-6 sm:left-6 sm:right-6 flex items-center justify-between">
                    <span className="font-serif text-xl sm:text-2xl font-light text-white/90 tracking-widest">
                      {ind.number}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#C59C58] font-semibold bg-[#0B1522]/85 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full border border-[#C59C58]/40 shadow-md">
                      <ShieldCheck className="w-3 h-3 text-[#C59C58]" />
                      <span>{ind.badge}</span>
                    </span>
                  </div>

                  {/* Bottom Title & Sector Tag Over Image */}
                  <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 space-y-1 sm:space-y-1.5">
                    <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-[#C59C58] font-medium block">
                      {ind.category}
                    </span>
                    <h3 className="font-serif text-2xl sm:text-4xl font-normal text-white tracking-[-0.01em]">
                      {ind.title}
                    </h3>
                  </div>
                </div>

                {/* Integrated Content Body */}
                <div className="p-5 sm:p-8 flex-1 flex flex-col justify-between space-y-5 sm:space-y-6 bg-gradient-to-b from-[#0B1522] to-[#080F18]">
                  <div className="space-y-5">
                    <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed">
                      {ind.subtitle}
                    </p>

                    {/* Verified Skills List */}
                    <div className="pt-3 border-t border-white/10 space-y-3">
                      <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C59C58]/90">
                        {t.industries.vettedTradesLabel}
                      </div>
                      {ind.skills.map((skill, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-white/85 font-light leading-snug">
                          <Check className="w-3.5 h-3.5 text-[#C59C58] shrink-0 mt-0.5" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Editorial Action Button */}
                  <div className="pt-4 border-t border-white/10">
                    <button
                      onClick={() => onSelectIndustry(ind.id)}
                      className="w-full flex items-center justify-between py-3.5 px-5 rounded-xl bg-white/5 hover:bg-[#C59C58] text-white hover:text-[#0B1522] transition-all duration-300 group/btn border border-white/10 hover:border-[#C59C58] cursor-pointer shadow-sm"
                    >
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        {ind.buttonText}
                      </span>
                      <ArrowRight className="w-4 h-4 text-[#C59C58] group-hover/btn:text-[#0B1522] transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
