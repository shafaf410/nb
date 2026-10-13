"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2, ShieldCheck, Send, MapPin, Mail, Phone } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import MagneticButton from "@/components/MagneticButton";

interface WorkforceFormProps {
  initialIndustry?: string;
}

export default function WorkforceFormSection({ initialIndustry = "" }: WorkforceFormProps) {
  const { t, language } = useLanguage();
  const isSv = language === "sv";

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
      id="contact"
      ref={containerRef}
      className="py-24 sm:py-36 lg:py-44 bg-[#070D16] relative overflow-hidden text-white scroll-mt-20"
    >
      <div id="request-form" className="sr-only" />
      <div id="contact-us" className="sr-only" />
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

      <div className="max-w-6xl xl:max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Top Eyebrow Tag */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <span className="h-[1px] w-8 sm:w-12 bg-[#C59C58]/60" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#C59C58] uppercase">
            {isSv ? "KONTAKT // DIREKT LEDNING & FÖRFRÅGAN" : "CONTACT // DIRECT LEADERSHIP & INQUIRY"}
          </span>
          <span className="h-[1px] w-8 sm:w-12 bg-[#C59C58]/60" />
        </div>

        {/* Section Headline */}
        <div className="text-center overflow-hidden pb-4 sm:pb-6">
          <div ref={headlineRef} className="origin-top will-change-transform">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-[-0.02em] leading-tight">
              {isSv ? "Kontakta " : "Get in Touch with "}
              <br className="hidden sm:inline" />
              <span className="italic font-serif text-[#C59C58]">Norvian AB</span>
            </h2>
          </div>
        </div>

        {/* Header Message */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light leading-relaxed">
            {isSv 
              ? "Vi är alltid redo att diskutera era projektbehov, bemanningslösningar eller besvara frågor om yrkeskunnig arbetskraft från Sydamerika, Filippinerna, Vietnam och Indien."
              : "We're always ready to discuss your project requirements, manpower solutions, or any questions about skilled workers from South America, the Philippines, Vietnam, and India."}
          </p>
        </div>

        {/* 2-Column Responsive Grid: Left = Direct Leadership Contacts, Right = Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Direct Leadership & Partners Card (Image 2) */}
          <div className="lg:col-span-5 bg-[#0B1522]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.8)] flex flex-col justify-between">
            <div>
              {/* Card Header Badge */}
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                <span className="w-2 h-2 rounded-full bg-[#C59C58] animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-[#C59C58] uppercase font-semibold">
                  {isSv ? "DIREKT LEDNING & PARTNERS" : "KEY LEADERSHIP & PARTNERS"}
                </span>
              </div>

              {/* Person 1: Bianka Bittlingmeier */}
              <div className="pb-6 border-b border-white/15">
                <h3 className="font-serif text-2xl sm:text-[26px] text-white font-medium tracking-tight">
                  Bianka Bittlingmeier
                </h3>
                <p className="text-[#C59C58] font-semibold text-sm sm:text-base mt-1.5">
                  {isSv ? "Medgrundare & Delägare" : "Co-Founder & Co-Owner"}
                </p>
                <p className="text-white/60 text-xs sm:text-sm mt-1 font-light leading-relaxed">
                  {isSv ? "Rekrytering & Affärspartnerskap" : "Recruitment & Business Partnerships"}
                </p>
              </div>

              {/* Person 2: Vinu Mohan */}
              <div className="py-6 border-b border-white/15">
                <h3 className="font-serif text-2xl sm:text-[26px] text-white font-medium tracking-tight">
                  Vinu Mohan
                </h3>
                <p className="text-[#C59C58] font-semibold text-sm sm:text-base mt-1.5">
                  {isSv ? "Medgrundare & Delägare" : "Co-Founder & Co-Owner"}
                </p>
                <p className="text-white/60 text-xs sm:text-sm mt-1 font-light leading-relaxed">
                  {isSv ? "Internationell Drift & Rekrytering" : "International Operations & Recruitment"}
                </p>
              </div>

              {/* Person 3: Isabelle Beyer */}
              <div className="pt-6">
                <h3 className="font-serif text-2xl sm:text-[26px] text-white font-medium tracking-tight">
                  Isabelle Beyer
                </h3>
                <p className="text-[#C59C58] font-semibold text-sm sm:text-base mt-1.5">
                  {isSv ? "Extern Affärspartner – Tyskland" : "External Business Partner – Germany"}
                </p>
                <p className="text-white/60 text-xs sm:text-sm mt-1 font-light leading-relaxed">
                  {isSv ? "Tysk Marknadskoordinering" : "German Market Coordination"}
                </p>
              </div>
            </div>

            {/* Office & Direct Contact Info */}
            <div className="mt-8 pt-6 border-t border-white/15 space-y-3.5">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-white/75">
                <MapPin className="w-4 h-4 text-[#C59C58] shrink-0 mt-0.5" />
                <span>Baumansgatan 4, 593 32 Västervik, {isSv ? "Sverige" : "Sweden"}</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-white/75">
                <Mail className="w-4 h-4 text-[#C59C58] shrink-0" />
                <a href="mailto:contact@norvian.no" className="hover:text-[#C59C58] transition-colors">
                  contact@norvian.no
                </a>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-white/75">
                <Phone className="w-4 h-4 text-[#C59C58] shrink-0" />
                <a href="tel:+4722009000" className="hover:text-[#C59C58] transition-colors">
                  +47 22 00 90 00
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div
            ref={formCardRef}
            className="lg:col-span-7 bg-[#0B1522]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.8)]"
          >
          {submitted ? (
            <div className="py-12 text-center space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#C59C58]/15 text-[#C59C58] mx-auto flex items-center justify-center border border-[#C59C58]/30 shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-3xl sm:text-4xl font-normal text-white">
                  {isSv ? "Meddelandet Har Skickats" : "Message Sent Successfully"}
                </h3>
                <p className="text-sm text-white/70 max-w-md mx-auto font-light leading-relaxed">
                  {isSv
                    ? "Tack för att du kontaktar oss. Vårt team granskar era projektuppgifter och återkommer skyndsamt."
                    : "Thank you for reaching out. Our team will review your project details and get back to you promptly."}
                </p>
              </div>
              <button
                onClick={() => setSubmitted(false)}
                className="inline-flex items-center justify-center bg-white/10 hover:bg-[#C59C58] text-white hover:text-[#070D16] px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border border-white/20 hover:border-[#C59C58]"
              >
                {isSv ? "Skicka ett Nytt Meddelande" : "Send Another Message"}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Field 1: Company Name */}
              <div className="form-input-card">
                <input
                  type="text"
                  required
                  placeholder={isSv ? "Företagsnamn" : "Company Name"}
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
                  placeholder={isSv ? "Telefonnummer" : "Phone"}
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
                  placeholder={isSv ? "Officiell E-postadress" : "Official Email"}
                  value={formData.officialEmail}
                  onChange={(e) => setFormData({ ...formData, officialEmail: e.target.value })}
                  className="w-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/15 focus:border-[#C59C58] rounded-xl sm:rounded-2xl px-5 py-4 text-base text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#C59C58] transition-all"
                />
              </div>

              {/* Field 4: Which Service Do You Need? */}
              <div className="form-input-card">
                <input
                  type="text"
                  placeholder={isSv ? "Vilken tjänst behöver ni? (t.ex. Skeppsbyggare, Svetsare, Chaufförer...)" : "Which Service Do You Need? (e.g. Shipbuilding Workers, Welders, Drivers...)"}
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
                  placeholder={isSv ? "Berätta om ert projekt (antal arbetare som behövs, specifika yrkesroller, projektets varaktighet, plats i Europa, etc.)" : "Tell us about your project (number of workers needed, specific trades/roles, project duration, location in Europe, etc.)"}
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  className="w-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/15 focus:border-[#C59C58] rounded-xl sm:rounded-2xl px-5 py-4 text-base text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#C59C58] transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Trust/Compliance badge */}
              <div className="flex items-center gap-2.5 pt-1 text-xs text-white/60">
                <ShieldCheck className="w-4 h-4 text-[#C59C58] shrink-0" />
                <span>
                  {isSv
                    ? "Norvian AB hanterar kandidatgranskning, regelefterlevnad och logistik vid utplacering."
                    : "Norvian AB manages candidate screening, compliance, and deployment logistics."}
                </span>
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
                      <span>{isSv ? "Skickar Meddelande..." : "Sending Message..."}</span>
                    </span>
                  ) : (
                    <>
                      <span>{isSv ? "Skicka Meddelande" : "Send Message"}</span>
                      <Send className="w-4 h-4 text-white" />
                    </>
                  )}
                </MagneticButton>
              </div>

            </form>
          )}
        </div>

        </div>

      </div>
    </section>
  );
}
