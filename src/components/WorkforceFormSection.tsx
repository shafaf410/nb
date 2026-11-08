"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  CheckCircle2,
  ShieldCheck,
  Send,
  MapPin,
  Mail,
  Phone,
  ArrowLeft,
  Globe,
  Copy,
  Check,
  ExternalLink,
  Building2,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import MagneticButton from "@/components/MagneticButton";

interface WorkforceFormProps {
  initialIndustry?: string;
}

interface ContactPerson {
  name: string;
  positionEn: string;
  positionSv: string;
  email: string;
  isGeneral?: boolean;
}

const OFFICIAL_CONTACTS: ContactPerson[] = [
  {
    name: "Bianka Bittlingmeier",
    positionEn: "Co-Founder & Co-Owner",
    positionSv: "Medgrundare & Delägare",
    email: "bianka@norvian.se",
  },
  {
    name: "Vinu Mohan",
    positionEn: "Co-Founder & Co-Owner",
    positionSv: "Medgrundare & Delägare",
    email: "vinu@norvian.se",
  },
  {
    name: "Alina K",
    positionEn: "Branch Manager & Administrator",
    positionSv: "Branch Manager & Administratör",
    email: "alina@norvian.se",
  },
  {
    name: "Isabelle Beyer",
    positionEn: "External Business Partner – Germany",
    positionSv: "Extern Affärspartner – Tyskland",
    email: "isabelle@norvian.se",
  },
  {
    name: "Baiju Babu",
    positionEn: "External Business Partner – UK",
    positionSv: "Extern Affärspartner – UK",
    email: "baiju@norvian.se",
  },
  {
    name: "General Office",
    positionEn: "General Enquiries",
    positionSv: "Allmänna Förfrågningar",
    email: "office@norvian.se",
    isGeneral: true,
  },
];

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

  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = (email: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => {
        setCopiedEmail(null);
      }, 2000);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const queryIndustry = params.get("industry") || params.get("service");
      if (queryIndustry) {
        let decoded = decodeURIComponent(queryIndustry);
        if (decoded.toLowerCase() === "shipbuilding") {
          decoded = isSv ? "Skeppsbyggnad & Marint" : "Shipbuilding & Marine";
        } else if (decoded.toLowerCase() === "construction") {
          decoded = isSv ? "Bygg & Anläggning" : "Civil & Infrastructure";
        } else if (decoded.toLowerCase() === "logistics" || decoded.toLowerCase() === "transport") {
          decoded = isSv ? "Tung Logistik & Transport" : "Heavy Transport & Logistics";
        } else if (decoded.toLowerCase() === "industrial" || decoded.toLowerCase() === "manufacturing") {
          decoded = isSv ? "Industri & Tillverkning" : "Industrial Manufacturing";
        }
        setFormData((prev) => ({ ...prev, serviceNeeded: decoded }));
        return;
      }
    }
    if (initialIndustry) {
      setFormData((prev) => ({ ...prev, serviceNeeded: initialIndustry }));
    }
  }, [initialIndustry, isSv]);

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
      // 1. Headline subtle entrance
      if (headline) {
        gsap.from(headline, {
          y: 12,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        });
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
      className="pt-2 sm:pt-4 pb-16 sm:pb-24 lg:pb-32 bg-[#070D16] relative overflow-hidden text-white scroll-mt-20"
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
        
        {/* Back Button Navigation */}
        <div className="mb-4 sm:mb-5">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                if (window.history.length > 1) {
                  window.history.back();
                } else {
                  window.location.href = "/#home";
                }
              }
            }}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] hover:bg-[#C59C58] text-white hover:text-[#070D16] border border-white/15 hover:border-[#C59C58] text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
            aria-label={isSv ? "Gå tillbaka till föregående sida" : "Go back to previous page"}
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>{isSv ? "Tillbaka" : "Back"}</span>
          </button>
        </div>

        {/* Top Eyebrow Tag */}
        <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
          <span className="h-[1px] w-8 sm:w-12 bg-[#C59C58]/60" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#C59C58] uppercase font-bold">
            {isSv ? "NORVIAN AB // OFFICIELLA E-POSTKONTAKTER" : "NORVIAN AB // OFFICIAL EMAIL CONTACTS"}
          </span>
          <span className="h-[1px] w-8 sm:w-12 bg-[#C59C58]/60" />
        </div>

        {/* Section Headline */}
        <div className="text-center overflow-hidden pb-2 sm:pb-3">
          <div ref={headlineRef} className="origin-top will-change-transform">
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-[-0.02em] leading-tight">
              NORVIAN AB
              <br />
              <span className="italic font-serif text-[#C59C58] text-2xl sm:text-4xl lg:text-5xl">
                {isSv ? "Officiella E-postkontakter" : "Official Email Contacts"}
              </span>
            </h2>
          </div>
        </div>

        {/* Header Message & Motto Banner */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-white/[0.05] border border-[#C59C58]/40 text-xs sm:text-sm font-medium text-white shadow-sm mb-3">
            <span className="w-2 h-2 rounded-full bg-[#C59C58] animate-pulse" />
            <span className="tracking-wide">
              {isSv ? "Er Bransch. Vårt Folk. Ett Mål." : "Your Industry. Our People. One Goal."}
            </span>
          </div>
          <p className="text-base sm:text-lg text-white/80 font-light leading-relaxed">
            {isSv 
              ? "Välkommen att kontakta vår ledning och våra affärspartners direkt via officiella e-postadresser, eller skicka en förfrågan i formuläret nedan för snabb återkoppling."
              : "Connect directly with our leadership, key branch managers, and international partners via official email, or submit project details using the form below."}
          </p>
        </div>

        {/* 2-Column Responsive Grid: Left = Direct Leadership Contacts, Right = Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Direct Leadership & Official Contacts Card */}
          <div className="lg:col-span-5 bg-[#0B1522]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 lg:p-9 border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.8)] flex flex-col justify-between">
            <div>
              {/* Card Header Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#C59C58] animate-pulse" />
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.22em] text-[#C59C58] uppercase font-semibold">
                    NORVIAN AB
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest">
                  {isSv ? "Officiella Kontakter" : "Official Roster"}
                </span>
              </div>

              {/* Card Sub-headline & Slogan */}
              <div className="mb-5">
                <h3 className="font-serif text-lg sm:text-xl text-white font-normal">
                  {isSv ? "Officiella E-postkontakter" : "Official Email Contacts"}
                </h3>
                <p className="text-xs text-[#C59C58] font-medium tracking-wide mt-1 italic">
                  {isSv ? "Er Bransch. Vårt Folk. Ett Mål." : "Your Industry. Our People. One Goal."}
                </p>
              </div>

              {/* Roster of Contacts */}
              <div className="space-y-3.5 divide-y divide-white/10">
                {OFFICIAL_CONTACTS.map((contact) => (
                  <div key={contact.email} className="pt-3 first:pt-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <h4 className="font-serif text-sm sm:text-base text-white font-medium tracking-tight truncate">
                          {contact.name}
                        </h4>
                        <p className="text-[#C59C58] font-semibold text-[11px] sm:text-xs mt-0.5">
                          {isSv ? contact.positionSv : contact.positionEn}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyEmail(contact.email)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-[#C59C58]/20 text-white/60 hover:text-[#C59C58] transition-colors shrink-0 cursor-pointer"
                        title={isSv ? "Kopiera e-postadress" : "Copy email address"}
                        aria-label={`Copy email for ${contact.name}`}
                      >
                        {copiedEmail === contact.email ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>

                    <div className="mt-1 flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#C59C58] shrink-0" />
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-xs sm:text-[12.5px] font-mono text-white/80 hover:text-[#C59C58] transition-colors truncate"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Office, Website & Direct Contact Info */}
            <div className="mt-6 pt-5 border-t border-white/15 space-y-3 text-xs sm:text-sm text-white/75">
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-[#C59C58] shrink-0" />
                <div className="flex items-center gap-1.5">
                  <span className="text-white/50">{isSv ? "Webbplats:" : "Website:"}</span>
                  <a
                    href="https://www.norvian.se"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-white hover:text-[#C59C58] transition-colors inline-flex items-center gap-1"
                  >
                    <span>www.norvian.se</span>
                    <ExternalLink className="w-3 h-3 text-[#C59C58]" />
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C59C58] shrink-0 mt-0.5" />
                <span>Baumansgatan 4, 593 32 Västervik, {isSv ? "Sverige" : "Sweden"}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C59C58] shrink-0" />
                <a href="tel:+4722009000" className="hover:text-[#C59C58] transition-colors font-mono">
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

        {/* Full Official Corporate Contact Directory Table */}
        <div className="mt-12 sm:mt-16 lg:mt-20 bg-[#0B1522]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.8)] relative overflow-hidden">
          {/* Subtle Ambient Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C59C58]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Section Heading & Tagline */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 sm:pb-8 border-b border-white/10 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#C59C58] animate-pulse" />
                <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#C59C58] uppercase font-bold">
                  NORVIAN AB
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-tight">
                {isSv ? "Officiella E-postkontakter" : "Official Email Contacts"}
              </h3>
              <p className="text-sm sm:text-base text-[#C59C58] font-medium tracking-wide mt-1.5 italic">
                {isSv ? "Er Bransch. Vårt Folk. Ett Mål." : "Your Industry. Our People. One Goal."}
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-white/70">
              <Globe className="w-4 h-4 text-[#C59C58]" />
              <span>Website:</span>
              <a
                href="https://www.norvian.se"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-[#C59C58] font-semibold underline underline-offset-4 decoration-[#C59C58]/60 transition-colors inline-flex items-center gap-1"
              >
                <span>www.norvian.se</span>
                <ExternalLink className="w-3 h-3 text-[#C59C58]" />
              </a>
            </div>
          </div>

          {/* Table for Desktop & Tablet */}
          <div className="hidden sm:block mt-6 overflow-x-auto relative z-10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-[11px] font-mono uppercase tracking-[0.18em] text-[#C59C58]">
                  <th className="py-4 px-4 font-semibold">{isSv ? "Fullständigt Namn" : "Full Name"}</th>
                  <th className="py-4 px-4 font-semibold">{isSv ? "Position" : "Position"}</th>
                  <th className="py-4 px-4 font-semibold text-right">{isSv ? "Officiell E-post" : "Official Email"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-sm">
                {OFFICIAL_CONTACTS.map((contact) => (
                  <tr
                    key={contact.email}
                    className="group hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 group-hover:border-[#C59C58]/50 flex items-center justify-center text-xs font-mono text-[#C59C58] font-bold">
                          {contact.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                        <div>
                          <div className="font-medium text-white group-hover:text-[#C59C58] transition-colors">
                            {contact.name}
                          </div>
                          {contact.isGeneral && (
                            <span className="text-[10px] font-mono text-white/40 uppercase tracking-wider">
                              Corporate Desk
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-white/80">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs text-white/90">
                        {isSv ? contact.positionSv : contact.positionEn}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <div className="inline-flex items-center gap-2 justify-end">
                        <a
                          href={`mailto:${contact.email}`}
                          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] hover:bg-[#C59C58] text-white hover:text-[#070D16] border border-white/15 hover:border-[#C59C58] text-xs font-mono tracking-wide transition-all group/link"
                        >
                          <Mail className="w-3.5 h-3.5 text-[#C59C58] group-hover/link:text-[#070D16] transition-colors" />
                          <span>{contact.email}</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => handleCopyEmail(contact.email)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-[#C59C58]/20 text-white/50 hover:text-[#C59C58] transition-colors cursor-pointer"
                          title={isSv ? "Kopiera e-postadress" : "Copy email address"}
                          aria-label={`Copy ${contact.email}`}
                        >
                          {copiedEmail === contact.email ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Stacked View */}
          <div className="sm:hidden mt-6 space-y-3.5 relative z-10">
            {OFFICIAL_CONTACTS.map((contact) => (
              <div
                key={contact.email}
                className="bg-white/[0.03] border border-white/10 rounded-2xl p-4 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-base text-white font-medium">
                    {contact.name}
                  </h4>
                  <button
                    type="button"
                    onClick={() => handleCopyEmail(contact.email)}
                    className="p-1.5 rounded-lg bg-white/5 text-white/60 hover:text-[#C59C58]"
                    aria-label={`Copy ${contact.email}`}
                  >
                    {copiedEmail === contact.email ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <p className="text-[#C59C58] text-xs font-medium">
                  {isSv ? contact.positionSv : contact.positionEn}
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-white/[0.06] hover:bg-[#C59C58] text-white hover:text-[#070D16] border border-white/15 text-xs font-mono transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-[#C59C58] group-hover:text-[#070D16]" />
                  <span>{contact.email}</span>
                </a>
              </div>
            ))}
          </div>

          {/* Table Card Bottom Strip */}
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60 relative z-10">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#C59C58]" />
              <span>NORVIAN AB • Org. Nr: 559473-4997 • Baumansgatan 4, 593 32 Västervik, Sweden</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[#C59C58]">Website: www.norvian.se</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
