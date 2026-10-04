"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, ArrowRight, ShieldCheck, Clock, Award } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface IndustryModalProps {
  industryKey: "shipbuilding" | "construction" | "logistics" | null;
  onClose: () => void;
  onRequestForIndustry: (industryName: string) => void;
}

export default function IndustryModal({
  industryKey,
  onClose,
  onRequestForIndustry,
}: IndustryModalProps) {
  const { t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (industryKey) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [industryKey, onClose]);

  if (!industryKey) return null;

  const modalData = {
    shipbuilding: {
      title: t.industries.shipbuilding.title,
      subtitle: t.industries.shipbuilding.subtitle,
      image: "/images/shipbuilding_real.jpg",
      roles: t.industries.shipbuilding.skills.map((skill, idx) => ({
        name: skill,
        cert: t.industries.shipbuilding.badge,
      })),
      highlights: [
        "DNV / Lloyd's Register naval standard compliance",
        "Field-tested in European shipyards (Norway, Netherlands, Germany)",
        "Turnkey visa, D-number tax registration, and work permit processing",
        "Fast-track deployment mobilization within 2 to 4 weeks",
      ],
    },
    construction: {
      title: t.industries.construction.title,
      subtitle: t.industries.construction.subtitle,
      image: "/images/construction_real.jpg",
      roles: t.industries.construction.skills.map((skill, idx) => ({
        name: skill,
        cert: t.industries.construction.badge,
      })),
      highlights: [
        "Rigorous hands-on trade skills testing prior to European visa submission",
        "Full English & Scandinavian safety orientation training completed before departure",
        "Turnkey accommodation, flights, local transport, and site clothing provided",
        "Dedicated on-site bilingual coordinator assigned to every project crew",
      ],
    },
    logistics: {
      title: t.industries.logistics.title,
      subtitle: t.industries.logistics.subtitle,
      image: "/images/1.jpg",
      roles: t.industries.logistics.skills.map((skill, idx) => ({
        name: skill,
        cert: t.industries.logistics.badge,
      })),
      highlights: [
        "Valid EU driver licenses, Code 95 CPC accreditation, and digital tachograph cards",
        "Demonstrated driving mastery on Nordic mountain passes and winter snow conditions",
        "Complete background checks, health screening, and clean driving record guarantees",
        "Rapid deployment available for seasonal freight peaks or multi-year logistics contracts",
      ],
    },
  };

  const info = modalData[industryKey];

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B1522]/80 backdrop-blur-md transition-all"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 16 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[#FAF7F2] rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-[#C59C58]/35 shadow-[0_30px_70px_-20px_rgba(11,21,34,0.4)] relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-[#FAF7F2]/90 hover:bg-[#0B1522] hover:text-white transition-all text-[#0B1522] shadow-md border border-[#0B1522]/15 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Image */}
          <div className="relative h-64 sm:h-72 w-full overflow-hidden">
            <Image
              src={info.image}
              alt={info.title}
              fill
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1522] via-[#0B1522]/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 sm:left-8 sm:right-8 text-white space-y-1.5">
              <div className="flex items-center gap-2">
                <Image
                  src="/logo.png"
                  alt="NORVIAN AB"
                  width={90}
                  height={75}
                  className="h-7 w-auto object-contain"
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C59C58]">
                  {t.modal.tag}
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal tracking-tight text-white">
                {info.title}
              </h2>
              <p className="text-xs sm:text-sm text-white/80 font-light">
                {info.subtitle}
              </p>
            </div>
          </div>

          {/* Content Body */}
          <div className="p-6 sm:p-10 space-y-8">
            
            {/* Roles & Qualifications */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-normal text-[#0B1522] flex items-center gap-2.5">
                <Award className="w-5 h-5 text-[#C59C58]" />
                <span>{t.modal.testedDisciplines}</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {info.roles.map((r, i) => (
                  <div
                    key={i}
                    className="bg-white p-4 rounded-2xl border border-[#0B1522]/10 hover:border-[#C59C58]/40 transition-colors flex flex-col justify-between shadow-xs"
                  >
                    <div className="font-medium text-sm text-[#0B1522]">
                      {r.name}
                    </div>
                    <div className="text-[11px] text-[#C59C58] font-semibold mt-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{r.cert}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights & Standards */}
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-normal text-[#0B1522] flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-[#C59C58]" />
                <span>{t.modal.guaranteesTitle}</span>
              </h3>
              <ul className="space-y-3 bg-white/60 p-5 rounded-2xl border border-[#0B1522]/8">
                {info.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-[#0B1522]/85 font-light leading-relaxed">
                    <CheckCircle className="w-4 h-4 text-[#C59C58] shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Call to Action */}
            <div className="pt-6 border-t border-[#0B1522]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-[#0B1522]/70 font-light">
                <Clock className="w-4 h-4 text-[#C59C58]" />
                <span>{t.modal.mobilizationTime}</span>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onRequestForIndustry(info.title.split(" ")[0]);
                }}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#0B1522] via-[#142337] to-[#0B1522] hover:from-[#152336] hover:to-[#0B1522] text-white px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-md border border-[#C59C58]/40 group cursor-pointer"
              >
                <span>{t.modal.cta}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C59C58] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
