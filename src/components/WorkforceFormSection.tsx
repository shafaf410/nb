"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, ShieldCheck, Send } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import MagneticButton from "@/components/MagneticButton";

interface WorkforceFormProps {
  initialIndustry?: string;
}

export default function WorkforceFormSection({ initialIndustry = "" }: WorkforceFormProps) {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    companyName: "",
    phone: "",
    officialEmail: "",
    serviceNeeded: initialIndustry || "",
    projectDetails: "",
  });

  useEffect(() => {
    if (initialIndustry) {
      setFormData((prev) => ({ ...prev, serviceNeeded: initialIndustry }));
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
      // 1. Headline settles into final scale during scroll with hardware-accelerated transform
      if (headline) {
        gsap.fromTo(
          headline,
          {
            scale: 1.08,
            yPercent: 8,
            opacity: 0.85,
          },
          {
            scale: 1.0,
            yPercent: 0,
            opacity: 1,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 80%",
              end: "top 25%",
              scrub: 1.0,
            },
          }
        );
      }

      // 2. Background media slowly reveals behind it
      if (bgMedia) {
        gsap.fromTo(
          bgMedia,
          { opacity: 0.15, scale: 1.06 },
          {
            opacity: 0.45,
            scale: 1.0,
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top 85%",
              end: "bottom bottom",
              scrub: 1.0,
            },
          }
        );
      }

      // 3. Form fields appear sequentially
      if (formCard) {
        const fields = formCard.querySelectorAll(".form-input-card");
        gsap.from(fields, {
          y: 20,
          stagger: 0.08,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formCard,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
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
      className="py-24 sm:py-36 lg:py-44 bg-[#070D16] relative overflow-hidden text-white"
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#070D16] via-[#070D16]/88 to-[#070D16]/92" />
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* Top Eyebrow Tag */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-[1px] w-8 sm:w-12 bg-[#C59C58]/60" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#C59C58] uppercase">
            CONTACT // MANPOWER INQUIRY
          </span>
          <span className="h-[1px] w-8 sm:w-12 bg-[#C59C58]/60" />
        </div>

        {/* Section Headline */}
        <div className="text-center overflow-hidden pb-4 sm:pb-6">
          <div ref={headlineRef} className="origin-top will-change-transform">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-[-0.02em] leading-tight">
              Get in Touch with <br className="hidden sm:inline" />
              <span className="italic font-serif text-[#C59C58]">Norvian AB</span>
            </h2>
          </div>
        </div>

        {/* Header Message matching reference image verbatim */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light leading-relaxed">
            We&apos;re always ready to discuss your project requirements, manpower solutions, or any questions about skilled workers from Asia.
          </p>
        </div>

        {/* Form Container */}
        <div
          ref={formCardRef}
          className="bg-[#0B1522]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.8)]"
        >
          {submitted ? (
            <div className="py-12 text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#C59C58]/15 text-[#C59C58] mx-auto flex items-center justify-center border border-[#C59C58]/30 shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white">
                  Message Sent Successfully
                </h3>
                <p className="text-sm text-white/70 max-w-md mx-auto font-light leading-relaxed">
                  Thank you for reaching out. Our team will review your project details and get back to you promptly.
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="inline-flex items-center justify-center bg-white/10 hover:bg-[#C59C58] text-white hover:text-[#070D16] px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border border-white/20 hover:border-[#C59C58]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Field 1: Company Name */}
              <div className="form-input-card">
                <input
                  type="text"
                  required
                  placeholder="Company Name"
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/15 focus:border-[#C59C58] rounded-xl sm:rounded-2xl px-5 py-4 text-base text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#C59C58] transition-all"
                />
              </div>

              {/* Field 2: Phone */}
              <div className="form-input-card">
                <input
                  type="tel"
                  required
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/15 focus:border-[#C59C58] rounded-xl sm:rounded-2xl px-5 py-4 text-base text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#C59C58] transition-all"
                />
              </div>

              {/* Field 3: Official Email */}
              <div className="form-input-card">
                <input
                  type="email"
                  required
                  placeholder="Official Email"
                  value={formData.officialEmail}
                  onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                  className="w-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/15 focus:border-[#C59C58] rounded-xl sm:rounded-2xl px-5 py-4 text-base text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#C59C58] transition-all"
                />
              </div>

              {/* Field 4: Which Service Do You Need? */}
              <div className="form-input-card">
                <input
                  type="text"
                  placeholder="Which Service Do You Need? (e.g. Shipbuilding Workers, Welders, Drivers...)"
                  value={formData.serviceNeeded}
                  onChange={(e) => setFormData({ ...formData, serviceNeeded: e.target.value })}
                  className="w-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/15 focus:border-[#C59C58] rounded-xl sm:rounded-2xl px-5 py-4 text-base text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#C59C58] transition-all"
                />
              </div>

              {/* Field 5: Tell us about your project */}
              <div className="form-input-card">
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your project (number of workers needed, specific trades/roles, project duration, location in Europe, etc.)"
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  className="w-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/15 focus:border-[#C59C58] rounded-xl sm:rounded-2xl px-5 py-4 text-base text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#C59C58] transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Trust/Compliance badge */}
              <div className="flex items-center gap-2.5 pt-1 text-xs text-white/60">
                <ShieldCheck className="w-4 h-4 text-[#C59C58] shrink-0" />
                <span>Norvian AB manages candidate screening, compliance, and deployment logistics.</span>
              </div>

              {/* Submit Button: Send Message */}
              <div className="pt-3 flex justify-start sm:justify-start">
                <MagneticButton
                  type="submit"
                  disabled={loading}
                  strength={16}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#0088FF] hover:bg-[#0077EE] text-white px-9 py-4 rounded-xl sm:rounded-2xl text-sm font-semibold tracking-wide shadow-[0_10px_25px_-5px_rgba(0,136,255,0.4)] active:scale-95 transition-all cursor-pointer"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending Message...</span>
                    </span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 text-white" />
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
