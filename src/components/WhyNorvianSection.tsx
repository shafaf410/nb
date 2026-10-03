"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Users, FileCheck2, Scale, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyNorvianSection() {
  const { t } = useLanguage();

  const icons = [Scale, Users, FileCheck2, ShieldCheck];

  return (
    <section id="why-norvian" className="py-16 sm:py-24 lg:py-36 bg-[#FAF7F2] relative border-t border-[#0B1522]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tag & Accent Line */}
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.25em] text-[#C59C58]">
            {t.why.tag}
          </span>
          <span className="h-[1px] w-10 sm:w-12 bg-[#C59C58]/60" />
        </div>

        {/* Large Editorial Headline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end mb-10 sm:mb-16 lg:mb-20">
          <div className="lg:col-span-8">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-7xl font-normal text-[#0B1522] tracking-[-0.025em] leading-[1.1] sm:leading-[1.08]">
              {t.why.titleLine1} <br />
              {t.why.titleLine2} <br />
              <span className="text-[#C59C58] italic font-serif">{t.why.titleAccent}</span>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pb-3">
            <p className="text-sm sm:text-base text-[#0B1522]/75 font-light leading-relaxed">
              {t.why.desc}
            </p>
          </div>
        </div>

        {/* 4 Architectural Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {t.why.pillars.map((item, idx) => {
            const Icon = icons[idx];
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col justify-between rounded-2xl p-5 sm:p-7 bg-white/70 hover:bg-[#0B1522] text-[#0B1522] hover:text-white border border-[#0B1522]/10 hover:border-[#C59C58]/60 shadow-[0_12px_30px_-10px_rgba(11,21,34,0.06)] hover:shadow-[0_24px_50px_-15px_rgba(11,21,34,0.25)] transition-all duration-500 space-y-5 sm:space-y-6"
              >
                {/* Top Number & Icon Row */}
                <div className="flex items-center justify-between">
                  <span className="font-serif text-lg font-light tracking-widest text-[#C59C58] group-hover:text-[#C59C58]">
                    {item.number}
                  </span>
                  
                  <div className="w-12 h-12 rounded-xl bg-[#0B1522]/5 group-hover:bg-white/10 border border-[#0B1522]/10 group-hover:border-[#C59C58]/40 flex items-center justify-center text-[#0B1522] group-hover:text-[#C59C58] transition-all duration-300">
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </div>

                {/* Typography Block */}
                <div className="space-y-2.5 flex-1">
                  <div className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C59C58]">
                    {item.subtitle}
                  </div>
                  <h3 className="font-serif text-2xl font-normal leading-snug group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#0B1522]/70 group-hover:text-white/75 font-light leading-relaxed pt-1">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Stat Pill */}
                <div className="pt-4 border-t border-[#0B1522]/10 group-hover:border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-semibold tracking-wider text-[#C59C58]">
                    {item.stats}
                  </span>
                  <CheckCircle2 className="w-4 h-4 text-[#C59C58]" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
