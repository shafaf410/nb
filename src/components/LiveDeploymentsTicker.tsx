"use client";

import { useLanguage } from "@/context/LanguageContext";
import { ShieldCheck, Anchor, Building2, Truck } from "lucide-react";

export default function LiveDeploymentsTicker() {
  const { t } = useLanguage();

  const deployments = [
    { ...t.ticker.dep1, icon: Anchor },
    { ...t.ticker.dep2, icon: Building2 },
    { ...t.ticker.dep3, icon: Truck },
    { ...t.ticker.dep4, icon: Anchor },
    { ...t.ticker.dep5, icon: ShieldCheck },
  ];

  return (
    <div className="bg-[#0B1522] border-y border-[#C59C58]/30 py-4 overflow-hidden relative shadow-inner">
      {/* Subtle Glow Accents */}
      <div className="absolute left-0 inset-y-0 w-24 bg-gradient-to-r from-[#0B1522] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 inset-y-0 w-24 bg-gradient-to-l from-[#0B1522] to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-2 flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#C59C58] font-bold">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{t.ticker.title}</span>
        </div>
        <span className="hidden sm:inline text-white/50 font-normal">
          {t.ticker.subtitle}
        </span>
      </div>

      <div className="flex overflow-x-auto no-scrollbar gap-4 sm:gap-6 px-4 max-w-7xl mx-auto">
        {deployments.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-3 bg-white/5 hover:bg-white/10 px-4 py-2.5 rounded-xl border border-white/10 shrink-0 transition-colors cursor-default"
            >
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F2]/10 flex items-center justify-center text-[#C59C58]">
                <Icon className="w-4 h-4" />
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2 text-xs font-semibold text-white">
                  <span>{item.flag}</span>
                  <span>{item.location}</span>
                </div>
                <div className="text-[11px] text-white/70 font-light">
                  {item.detail}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
