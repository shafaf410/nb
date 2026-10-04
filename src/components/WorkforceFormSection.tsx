"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ChevronDown, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import MagneticButton from "@/components/MagneticButton";

interface WorkforceFormProps {
  initialIndustry?: string;
}

export default function WorkforceFormSection({ initialIndustry = "" }: WorkforceFormProps) {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    industry: initialIndustry || "",
    requirement: "",
  });

  useEffect(() => {
    if (initialIndustry) {
      setFormData((prev) => ({ ...prev, industry: initialIndustry }));
    }
  }, [initialIndustry]);

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bgMediaRef = useRef<HTMLDivElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const headline = headlineRef.current;
    const bgMedia = bgMediaRef.current;
    const formCard = formCardRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Headline initially oversized and slightly clipped, settles into final scale during scroll
      if (headline) {
        gsap.fromTo(
          headline,
          {
            scale: 1.22,
            yPercent: 8,
            clipPath: "inset(0 0 15% 0)",
          },
          {
            scale: 1.0,
            yPercent: 0,
            clipPath: "inset(0 0 0% 0)",
            ease: "power3.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              end: "top 25%",
              scrub: 1.2,
            },
          }
        );
      }

      // 2. Background media slowly reveals behind it
      if (bgMedia) {
        gsap.fromTo(
          bgMedia,
          { opacity: 0.15, scale: 1.1 },
          {
            opacity: 0.55,
            scale: 1.0,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              end: "bottom bottom",
              scrub: 1.5,
            },
          }
        );
      }

      // 3. Form fields appear sequentially
      if (formCard) {
        const fields = formCard.querySelectorAll(".sequential-field");
        gsap.fromTo(
          fields,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.14,
            ease: "power2.out",
            scrollTrigger: {
              trigger: formCard,
              start: "top 75%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, container);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section
      id="request-form"
      ref={containerRef}
      className="py-24 sm:py-36 lg:py-48 bg-[#070D16] relative overflow-hidden text-white"
    >
      {/* Background Architectural Ambient Image & Grid */}
      <div
        ref={bgMediaRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
      >
        <Image
          src="/images/worker_real.jpg"
          alt="NORVIAN Deployment Command Center"
          fill
          sizes="100vw"
          className="object-cover object-center filter grayscale contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070D16] via-[#070D16]/85 to-[#070D16]/90" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
        
        {/* Top Tag */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#C59C58] uppercase">
            {t.form.tag} // 05 FINAL CALL
          </span>
          <span className="h-[1px] w-12 sm:w-16 bg-[#C59C58]/60" />
        </div>

        {/* Requirement 11: Oversized Headline Settling into Final Scale */}
        <div className="overflow-hidden pb-8 sm:pb-12">
          <div ref={headlineRef} className="origin-top-left will-change-transform">
            <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-normal text-white tracking-[-0.03em] leading-[0.95] sm:leading-[0.92]">
              BUILD YOUR <br />
              <span className="italic font-serif text-[#C59C58]">NEXT TEAM.</span>
            </h2>
          </div>
        </div>

        {/* Editorial Subtitle */}
        <p className="text-sm sm:text-base lg:text-lg text-white/70 font-light leading-relaxed max-w-2xl mb-12 sm:mb-16">
          Direct recruitment corridors for specialized European shipbuilding, industrial construction, and continental fleet operations. Fully audited for immigration, tax, and social compliance under Scandinavian directives.
        </p>

        {/* Sequential 4-Field Form Container */}
        <div
          ref={formCardRef}
          className="max-w-4xl bg-[#0B1522]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 lg:p-14 border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.8)]"
        >
          {submitted ? (
            <div className="py-12 text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#C59C58]/15 text-[#C59C58] mx-auto flex items-center justify-center border border-[#C59C58]/30 shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white">
                  Deployment Corridor Activated
                </h3>
                <p className="text-sm text-white/70 max-w-md mx-auto font-light leading-relaxed">
                  Your workforce request has been routed to our European logistics directors. You will receive certified candidate portfolios within 48 hours.
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="inline-flex items-center justify-center bg-white/10 hover:bg-[#C59C58] text-white hover:text-[#070D16] px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border border-white/20 hover:border-[#C59C58]"
              >
                Submit Additional Brief
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Sequential Field 01: NAME */}
              <div className="sequential-field group relative space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase">
                  <span className="text-[#C59C58] font-bold">01 NAME</span>
                  <span className="text-white/40">DIRECT CONTACT & TITLE</span>
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. Henrik Lindqvist, Head of Marine Operations (+47 ...)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-base sm:text-lg text-white placeholder-white/30 focus:outline-none transition-colors"
                />
                {/* Micro-interaction line-draw on focus */}
                <div className="h-[2px] w-full bg-[#C59C58] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
              </div>

              {/* Sequential Field 02: COMPANY */}
              <div className="sequential-field group relative space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase">
                  <span className="text-[#C59C58] font-bold">02 COMPANY</span>
                  <span className="text-white/40">ORGANIZATION & COUNTRY</span>
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. Nordic Yards ASA, Norway / Germany"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-base sm:text-lg text-white placeholder-white/30 focus:outline-none transition-colors"
                />
                <div className="h-[2px] w-full bg-[#C59C58] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
              </div>

              {/* Sequential Field 03: INDUSTRY */}
              <div className="sequential-field group relative space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase">
                  <span className="text-[#C59C58] font-bold">03 INDUSTRY</span>
                  <span className="text-white/40">SPECIALIZED DISCIPLINE</span>
                </div>
                <div className="relative">
                  <select
                    required
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full bg-transparent border-b border-white/20 py-3 text-base sm:text-lg text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-[#0B1522] text-white">Select Primary Discipline</option>
                    <option value="Shipbuilding & Marine Engineering" className="bg-[#0B1522] text-white">01 Shipbuilding & Marine Engineering (ISO 9001 / DNV)</option>
                    <option value="Industrial Construction & Civil" className="bg-[#0B1522] text-white">02 Industrial Construction & Heavy Civil (EN 1090)</option>
                    <option value="Transport & Continental Fleet" className="bg-[#0B1522] text-white">03 Transport, Fleet & Continental Logistics (Code 95 / ADR)</option>
                    <option value="Energy & Infrastructure" className="bg-[#0B1522] text-white">04 Renewable Energy & Grid Infrastructure</option>
                  </select>
                  <ChevronDown className="w-5 h-5 text-white/50 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
                <div className="h-[2px] w-full bg-[#C59C58] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
              </div>

              {/* Sequential Field 04: REQUIREMENT */}
              <div className="sequential-field group relative space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono tracking-widest uppercase">
                  <span className="text-[#C59C58] font-bold">04 REQUIREMENT</span>
                  <span className="text-white/40">CREW SIZE & TIMELINE BRIEF</span>
                </div>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. 15 TIG welders (6G DNV) and 4 Hull Fabricators needed in Bergen yard by Q3."
                  value={formData.requirement}
                  onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                  className="w-full bg-transparent border-b border-white/20 py-3 text-base sm:text-lg text-white placeholder-white/30 focus:outline-none transition-colors resize-none"
                />
                <div className="h-[2px] w-full bg-[#C59C58] origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
              </div>

              {/* Compliance Trust Note */}
              <div className="flex items-center gap-3 pt-2 text-xs text-white/60">
                <ShieldCheck className="w-4 h-4 text-[#C59C58] shrink-0" />
                <span>Zero immigration risk. Full tax, social security, and housing logistics managed by Norvian AB.</span>
              </div>

              {/* Requirement 11: SEND REQUEST Button with Refined Magnetic Hover & Arrow Movement without Bouncing */}
              <div className="pt-4 flex justify-end">
                <MagneticButton
                  type="submit"
                  disabled={loading}
                  strength={16}
                  className="group inline-flex items-center gap-4 bg-[#C59C58] hover:bg-[#D4AF37] text-[#070D16] px-8 sm:px-12 py-4 sm:py-5 rounded-full text-xs font-semibold uppercase tracking-[0.2em] shadow-[0_12px_35px_-8px_rgba(197,156,88,0.5)] border border-[#C59C58] active:scale-95 overflow-hidden"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-[#070D16]/30 border-t-[#070D16] rounded-full animate-spin" />
                      <span>INITIALIZING BRIEF...</span>
                    </span>
                  ) : (
                    <>
                      <span>SEND REQUEST</span>
                      {/* Arrow moves 6px on hover without bouncing */}
                      <ArrowRight className="w-4 h-4 text-[#070D16] transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                    </>
                  )}
                </MagneticButton>
              </div>

            </form>
          )}
        </div>

      </div>
    </section>
  );
}
