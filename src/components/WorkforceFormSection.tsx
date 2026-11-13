"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
  ArrowRight,
  Globe,
  Copy,
  Check,
  ExternalLink,
  Building2,
  Users2,
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
  positionDe?: string;
  email: string;
  isGeneral?: boolean;
}

const OFFICIAL_CONTACTS: ContactPerson[] = [
  {
    name: "Bianka Bittlingmeier",
    positionEn: "Co-Founder & Co-Owner",
    positionSv: "Medgrundare & Delägare",
    positionDe: "Mitgründerin & Miteigentümerin",
    email: "bianka@norvian.se",
  },
  {
    name: "Vinu Mohan",
    positionEn: "Co-Founder & Co-Owner",
    positionSv: "Medgrundare & Delägare",
    positionDe: "Mitgründer & Miteigentümer",
    email: "vinu@norvian.se",
  },
  {
    name: "Alina Aleksandriuk",
    positionEn: "Branch Manager & Administrator",
    positionSv: "Branch Manager & Administratör",
    positionDe: "Niederlassungsleiterin & Administratorin",
    email: "alina@norvian.se",
  },
  {
    name: "Isabelle Beyer",
    positionEn: "External Business Partner – Germany",
    positionSv: "Extern Affärspartner – Tyskland",
    positionDe: "Externe Geschäftspartnerin – Deutschland",
    email: "isabelle@norvian.se",
  },
  {
    name: "Baiju Babu",
    positionEn: "Business Development Manager",
    positionSv: "Affärsutvecklingschef",
    positionDe: "Business Development Manager",
    email: "baiju@norvian.se",
  },
  {
    name: "General Office",
    positionEn: "General Enquiries",
    positionSv: "Allmänna Förfrågningar",
    positionDe: "Allgemeine Anfragen",
    email: "office@norvian.se",
    isGeneral: true,
  },
];

export default function WorkforceFormSection({ initialIndustry = "" }: WorkforceFormProps) {
  const { t, language } = useLanguage();
  const isSv = language === "sv";
  const isDe = language === "de";

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
            aria-label={isSv ? "Gå tillbaka till föregående sida" : isDe ? "Zurück zur vorherigen Seite" : "Go back to previous page"}
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1" />
            <span>{isSv ? "Tillbaka" : isDe ? "Zurück" : "Back"}</span>
          </button>
        </div>

        {/* Top Eyebrow Tag */}
        <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
          <span className="h-[1px] w-8 sm:w-12 bg-[#C59C58]/60" />
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#C59C58] uppercase font-bold">
            {isSv ? "NORVIAN AB // OFFICIELLA E-POSTKONTAKTER" : isDe ? "NORVIAN AB // OFFIZIELLE E-MAIL-KONTAKTE" : "NORVIAN AB // OFFICIAL EMAIL CONTACTS"}
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
                {isSv ? "Officiella E-postkontakter" : isDe ? "Offizielle E-Mail-Kontakte" : "Official Email Contacts"}
              </span>
            </h2>
          </div>
        </div>

        {/* Header Message & Motto Banner */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2.5 px-4.5 py-1.5 rounded-full bg-white/[0.05] border border-[#C59C58]/40 text-xs sm:text-sm font-medium text-white shadow-sm mb-3">
            <span className="w-2 h-2 rounded-full bg-[#C59C58] animate-pulse" />
            <span className="tracking-wide">
              {isSv ? "Er Bransch. Vårt Folk. Ett Mål." : isDe ? "Ihre Branche. Unsere Menschen. Ein Ziel." : "Your Industry. Our People. One Goal."}
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
                          {isSv ? contact.positionSv : isDe && contact.positionDe ? contact.positionDe : contact.positionEn}
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

              {/* Dedicated Leadership & Team Page Banner */}
              <div className="mt-5 pt-4 border-t border-white/10">
                <Link
                  href="/team"
                  className="group flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-[#C59C58]/15 to-[#C59C58]/5 hover:from-[#C59C58]/25 hover:to-[#C59C58]/15 border border-[#C59C58]/35 hover:border-[#C59C58] transition-all duration-300 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#C59C58]/25 flex items-center justify-center text-[#E8C587] group-hover:scale-110 transition-transform">
                      <Users2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white group-hover:text-[#E8C587] transition-colors">
                        {isSv ? "Möt Vårt Ledarskapsteam" : "Meet Our Leadership Team"}
                      </div>
                      <div className="text-[10.5px] text-slate-300">
                        {isSv ? "Se profiler & foton på grundarna →" : "View founders & partner profiles →"}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#C59C58] group-hover:translate-x-1 transition-transform" />
                </Link>
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
                <a href="tel:+46793090307" className="hover:text-[#C59C58] transition-colors font-mono">
                  +46 79 30 90 30 7
                </a>
              </div>
            </div>

            {/* Our Socials Section */}
            <div className="mt-8 pt-6 border-t border-white/15 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono tracking-widest uppercase text-[#C59C58] font-bold">
                  {isSv ? "Våra Sociala Medier" : isDe ? "Unsere Sozialen Medien" : "Our Socials"}
                </span>
                <span className="text-[11px] text-white/50 font-mono">
                  {isSv ? "Följ vår resa" : isDe ? "Folgen Sie uns" : "Follow our journey"}
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/norvianab?srtk=M216aHY0OHcwb2lj&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col justify-between p-4 rounded-2xl bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent hover:from-[#E1306C]/15 hover:to-[#F56040]/10 border border-white/15 hover:border-[#E1306C]/60 transition-all duration-300 shadow-md hover:shadow-[0_8px_25px_-5px_rgba(225,48,108,0.25)] hover:-translate-y-0.5 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#405DE6] flex items-center justify-center shadow-sm">
                      <svg
                        className="w-5 h-5 text-white fill-current"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <div className="mt-3">
                    <span className="text-sm font-semibold text-white block group-hover:text-[#F77737] transition-colors">
                      Instagram
                    </span>
                    <span className="text-[11px] text-white/50 font-mono">
                      @norvianab
                    </span>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/company/norvian-ab/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col justify-between p-4 rounded-2xl bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent hover:from-[#0A66C2]/20 hover:to-[#0077B5]/10 border border-white/15 hover:border-[#0A66C2]/70 transition-all duration-300 shadow-md hover:shadow-[0_8px_25px_-5px_rgba(10,102,194,0.3)] hover:-translate-y-0.5 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#0A66C2] flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <div className="mt-3">
                    <span className="text-sm font-semibold text-white block group-hover:text-[#0A66C2] transition-colors">
                      LinkedIn
                    </span>
                    <span className="text-[11px] text-white/50 font-mono">
                      Norvian AB
                    </span>
                  </div>
                </a>

                {/* YouTube */}
                <a
                  href="https://youtube.com/@norvianab?si=CHXBdVwTH7mq2W7i"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative flex flex-col justify-between p-4 rounded-2xl bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent hover:from-[#FF0000]/20 hover:to-[#CC0000]/10 border border-white/15 hover:border-[#FF0000]/70 transition-all duration-300 shadow-md hover:shadow-[0_8px_25px_-5px_rgba(255,0,0,0.3)] hover:-translate-y-0.5 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-[#FF0000] flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 text-white fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </div>
                    <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <div className="mt-3">
                    <span className="text-sm font-semibold text-white block group-hover:text-[#FF4D4D] transition-colors">
                      YouTube
                    </span>
                    <span className="text-[11px] text-white/50 font-mono">
                      @norvianab
                    </span>
                  </div>
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
                        {isSv ? contact.positionSv : isDe && contact.positionDe ? contact.positionDe : contact.positionEn}
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
                  {isSv ? contact.positionSv : isDe && contact.positionDe ? contact.positionDe : contact.positionEn}
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
