"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Building2,
  ShieldCheck,
  Scale,
  FileCheck2,
  Users,
  MapPin,
  Mail,
  Phone,
  Globe,
  Calendar,
  Lock,
  ArrowRight,
  ExternalLink,
  Briefcase,
  CheckCircle2
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ImpressumSection() {
  const { language } = useLanguage();
  const isSv = language === "sv";
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      const items = container.querySelectorAll(".legal-card-fade");
      if (items.length > 0) {
        gsap.from(items, {
          y: 24,
          opacity: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="impressum"
      className="relative bg-[#070D16] text-white py-16 sm:py-24 lg:py-28 border-t border-[#C59C58]/30 overflow-hidden"
    >
      {/* Background Ambient Glow & Grid Lines */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-[#C59C58]/8 via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#C59C58_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />

      <div ref={containerRef} className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Header Breadcrumb & Regulatory Tag */}
        <div className="pb-8 mb-10 sm:mb-14 border-b border-white/12">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#C59C58] tracking-widest uppercase mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C59C58] animate-pulse" />
              <span>
                {isSv ? "OFFICIELL BOLAGSINFORMATION // NORVIAN AB" : "OFFICIAL CORPORATE DISCLOSURE // NORVIAN AB"}
              </span>
            </div>
            <div className="text-white/50 text-[11px] font-mono">
              Bolagsverket Org. Nr: 559473-4997
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight">
            {isSv ? "Impressum / Juridiskt Meddelande" : "Impressum / Legal Notice"}
          </h1>
          <p className="mt-3.5 text-base sm:text-lg text-white/70 font-light max-w-3xl leading-relaxed">
            {isSv
              ? "Officiell bolagsredovisning, registrerade verksamheter och lagstadgad representation för Norvian AB enligt svensk aktiebolagslag och Europeiska unionens regler."
              : "Official statutory disclosures, registered corporate activities, and legal governance details for Norvian AB under Swedish corporate law and European Union transparency standards."}
          </p>
        </div>

        {/* Top 3 High-Priority Fast Facts Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-12 sm:mb-16">
          
          <div className="legal-card-fade bg-[#0B1522]/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-[#C59C58]/50 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
            <div className="w-10 h-10 rounded-xl bg-[#C59C58]/15 border border-[#C59C58]/30 flex items-center justify-center text-[#C59C58] mb-4">
              <Building2 className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-mono text-[#C59C58] uppercase tracking-wider mb-1">
              {isSv ? "Bolagsnamn & Form" : "Company & Legal Type"}
            </div>
            <h2 className="font-serif text-xl text-white font-medium">Norvian AB</h2>
            <p className="text-xs text-white/60 font-light mt-1">
              {isSv ? "Svenskt Aktiebolag (Sv. AB)" : "Swedish Limited Company (Aktiebolag)"}
            </p>
          </div>

          <div className="legal-card-fade bg-[#0B1522]/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-[#C59C58]/50 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
            <div className="w-10 h-10 rounded-xl bg-[#C59C58]/15 border border-[#C59C58]/30 flex items-center justify-center text-[#C59C58] mb-4">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-mono text-[#C59C58] uppercase tracking-wider mb-1">
              {isSv ? "Organisationsnummer" : "Organisation Number"}
            </div>
            <h2 className="font-mono text-xl text-white font-medium tracking-wider">559473-4997</h2>
            <p className="text-xs text-white/60 font-light mt-1">
              {isSv ? "Registrerat hos Bolagsverket (2024-02-26)" : "Registered with Bolagsverket (26 Feb 2024)"}
            </p>
          </div>

          <div className="legal-card-fade bg-[#0B1522]/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:border-[#C59C58]/50 transition-all duration-300 shadow-[0_15px_40px_rgba(0,0,0,0.4)]">
            <div className="w-10 h-10 rounded-xl bg-[#C59C58]/15 border border-[#C59C58]/30 flex items-center justify-center text-[#C59C58] mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-[10px] font-mono text-[#C59C58] uppercase tracking-wider mb-1">
              {isSv ? "Säte & Huvudkontor" : "Registered Office"}
            </div>
            <h2 className="font-serif text-xl text-white font-medium">Västervik, Sweden</h2>
            <p className="text-xs text-white/60 font-light mt-1">
              Baumansgatan 4, 593 32 Västervik
            </p>
          </div>

        </div>

        {/* 2-Column Main Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-start">
          
          {/* Left Column (7 cols): Company Details, What We Do, SNI Codes */}
          <div className="lg:col-span-7 space-y-10 sm:space-y-12">
            
            {/* Section 1: Detailed Company Information Table */}
            <div className="legal-card-fade bg-[#0B1522]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59C58]" />
                <h2 className="text-xs sm:text-sm font-mono tracking-[0.2em] text-[#C59C58] uppercase font-bold">
                  {isSv ? "01 • FÖRETAGSUPPGIFTER" : "01 • COMPANY DETAILS"}
                </h2>
              </div>

              <div className="divide-y divide-white/8 text-sm sm:text-[15px]">
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-white/50 text-xs sm:text-sm">{isSv ? "Företagsnamn" : "Company Name"}</span>
                  <span className="text-white font-medium">Norvian AB</span>
                </div>
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-white/50 text-xs sm:text-sm">{isSv ? "Organisationsnummer" : "Organisation Number"}</span>
                  <span className="text-white font-mono font-semibold">559473-4997</span>
                </div>
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-white/50 text-xs sm:text-sm">{isSv ? "Bolagsform" : "Company Type"}</span>
                  <span className="text-white">{isSv ? "Svenskt Aktiebolag" : "Swedish Limited Company (Aktiebolag)"}</span>
                </div>
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-white/50 text-xs sm:text-sm">{isSv ? "Registreringsdatum" : "Registered Date"}</span>
                  <span className="text-white">{isSv ? "26 februari 2024" : "26 February 2024"}</span>
                </div>
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-white/50 text-xs sm:text-sm">{isSv ? "Bolagssäte" : "Registered Office"}</span>
                  <span className="text-white">Västervik, Sweden</span>
                </div>
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-white/50 text-xs sm:text-sm">{isSv ? "Registrerad Adress" : "Registered Address"}</span>
                  <span className="text-white">Baumansgatan 4, 593 32 Västervik, Sweden</span>
                </div>
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-white/50 text-xs sm:text-sm">{isSv ? "Registreringsmyndighet" : "Registration Authority"}</span>
                  <span className="text-white">Bolagsverket, Sweden</span>
                </div>
                <div className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span className="text-white/50 text-xs sm:text-sm">{isSv ? "Momsregistreringsstatus" : "VAT Status"}</span>
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-mono text-xs font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {isSv ? "Registrerad för moms (Momsregistrerad)" : "Registered for VAT"}
                  </span>
                </div>
              </div>
            </div>

            {/* Section 2: Founders */}
            <div className="legal-card-fade bg-[#0B1522]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59C58]" />
                <h2 className="text-xs sm:text-sm font-mono tracking-[0.2em] text-[#C59C58] uppercase font-bold">
                  {isSv ? "02 • GRUNDARE & ÄGARSKAP" : "02 • FOUNDERS & OWNERSHIP"}
                </h2>
              </div>
              <p className="text-sm sm:text-base text-white/90 font-light leading-relaxed">
                {isSv
                  ? "Norvian AB grundades gemensamt av Ninu Mohan Poyilil och Bianka Bittlingmeier."
                  : "Norvian AB was co-founded by Ninu Mohan Poyilil and Bianka Bittlingmeier."}
              </p>
            </div>

            {/* Section 3: What We Do */}
            <div className="legal-card-fade bg-[#0B1522]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-4">
              <div className="flex items-center gap-2.5 pb-4 border-b border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59C58]" />
                <h2 className="text-xs sm:text-sm font-mono tracking-[0.2em] text-[#C59C58] uppercase font-bold">
                  {isSv ? "03 • VERKSAMHETSBESKRIVNING" : "03 • WHAT WE DO"}
                </h2>
              </div>

              <div className="space-y-3.5 text-sm sm:text-base text-white/80 font-light leading-relaxed">
                <p>
                  {isSv
                    ? "Norvian AB är ett svenskt rekryterings- och bemanningsföretag med säte i Västervik. Vi hjälper företag att hitta kvalificerad arbetskraft och tillhandahåller bemanningslösningar för olika industrier i Sverige och över hela Europa."
                    : "Norvian AB is a Swedish recruitment and staffing company based in Västervik. We help businesses find qualified workers and provide staffing solutions for different industries across Sweden and Europe."}
                </p>
                <p>
                  {isSv
                    ? "Vår verksamhet omfattar rekrytering, tillfällig bemanning, personaluthyrning, internationell arbetskraftsförsörjning och HR-konsultation. Vi erbjuder även affärsutveckling och rådgivningstjänster."
                    : "Our work includes recruitment, temporary staffing, personnel leasing, international workforce supply, and HR consulting. We also offer business development and advisory services."}
                </p>
                <p>
                  {isSv
                    ? "Därutöver bistår vi med internationella studentantagningar samt hjälper till att koppla samman företag och privatpersoner med försäkringsbolag och andra relevanta tjänsteleverantörer."
                    : "In addition, we work with international student admissions and help connect businesses and individuals with insurance companies and other relevant service providers."}
                </p>
              </div>
            </div>

            {/* Section 4: Registered Business Activities (SNI Codes) */}
            <div className="legal-card-fade bg-[#0B1522]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-2.5 mb-6 pb-4 border-b border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59C58]" />
                <h2 className="text-xs sm:text-sm font-mono tracking-[0.2em] text-[#C59C58] uppercase font-bold">
                  {isSv ? "04 • REGISTRERADE VERKSAMHETER (SNI)" : "04 • REGISTERED BUSINESS ACTIVITIES (SNI)"}
                </h2>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/8">
                  <span className="px-2 py-0.5 rounded bg-[#C59C58]/20 border border-[#C59C58]/40 text-[#C59C58] font-mono text-xs font-semibold shrink-0">
                    78201
                  </span>
                  <div>
                    <span className="text-sm font-medium text-white">
                      {isSv ? "Bemanningsföretag" : "Staffing"}
                    </span>
                    <p className="text-xs text-white/60 font-light mt-0.5">
                      {isSv ? "Uthyrning av personal och tillfälliga industriella bemanningsfunktioner" : "Temporary workforce leasing and placement operations"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/8">
                  <span className="px-2 py-0.5 rounded bg-[#C59C58]/20 border border-[#C59C58]/40 text-[#C59C58] font-mono text-xs font-semibold shrink-0">
                    78100
                  </span>
                  <div>
                    <span className="text-sm font-medium text-white">
                      {isSv ? "Arbetsförmedling och rekrytering" : "Employment and recruitment services"}
                    </span>
                    <p className="text-xs text-white/60 font-light mt-0.5">
                      {isSv ? "Rekrytering och matchning av kvalificerade yrkesarbetare till europeiska företag" : "Executive search, candidate screening, and global talent recruitment"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/8">
                  <span className="px-2 py-0.5 rounded bg-[#C59C58]/20 border border-[#C59C58]/40 text-[#C59C58] font-mono text-xs font-semibold shrink-0">
                    78202
                  </span>
                  <div>
                    <span className="text-sm font-medium text-white">
                      {isSv ? "Övrig personaluthyrning" : "Other provision of personnel functions"}
                    </span>
                    <p className="text-xs text-white/60 font-light mt-0.5">
                      {isSv ? "Verksamhetsnära personalstöd och specialistfunktioner" : "Cross-border specialized staffing and operational workforce support"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (5 cols): Official Contact, Intellectual Property, Privacy & Jurisdiction */}
          <div className="lg:col-span-5 space-y-10 sm:space-y-12">
            
            {/* Contact Card */}
            <div className="legal-card-fade bg-[#0B1522]/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-[#C59C58]/35 shadow-[0_25px_60px_rgba(0,0,0,0.6)]">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59C58]" />
                <h2 className="text-xs sm:text-sm font-mono tracking-[0.2em] text-[#C59C58] uppercase font-bold">
                  {isSv ? "OFFICIELL KONTAKT" : "OFFICIAL CONTACT"}
                </h2>
              </div>

              <div className="space-y-4 text-sm font-light">
                <div>
                  <h3 className="font-serif text-lg text-white font-medium">Norvian AB</h3>
                  <p className="text-white/60 text-xs mt-0.5">Bolagsverket Reg. 559473-4997</p>
                </div>

                <div className="space-y-3 pt-2 text-white/80">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#C59C58] shrink-0 mt-1" />
                    <span>
                      Baumansgatan 4<br />
                      593 32 Västervik<br />
                      Sweden
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#C59C58] shrink-0" />
                    <a href="mailto:contact@norvian.no" className="hover:text-[#C59C58] transition-colors">
                      contact@norvian.no / contact@norvian.se
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#C59C58] shrink-0" />
                    <a href="tel:+4722009000" className="hover:text-[#C59C58] transition-colors">
                      +47 22 00 90 00 / +46 70 827 82 82
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-[#C59C58] shrink-0" />
                    <a href="https://nb-two-coral.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-[#C59C58] transition-colors flex items-center gap-1">
                      <span>https://norvian.se</span>
                      <ExternalLink className="w-3 h-3 text-[#C59C58]" />
                    </a>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <Link
                    href="/contact"
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#C59C58] via-[#D8B474] to-[#C59C58] text-[#070D16] py-3 rounded-xl text-xs font-bold tracking-wider uppercase shadow-[0_4px_16px_rgba(197,156,88,0.35)] active:scale-95 transition-all cursor-pointer"
                  >
                    <span>{isSv ? "Gå till Förfrågan & Kontakt" : "Go to Request & Inquiry"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Website Information & Disclaimer */}
            <div className="legal-card-fade bg-[#0B1522]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59C58]" />
                <h2 className="text-xs sm:text-sm font-mono tracking-[0.2em] text-[#C59C58] uppercase font-bold">
                  {isSv ? "WEBBPLATSINFORMATION" : "WEBSITE INFORMATION"}
                </h2>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                <p>
                  <strong className="text-white font-medium">{isSv ? "Riktighet & Uppdateringar:" : "Accuracy & Updates:"}</strong>{" "}
                  {isSv
                    ? "Vi gör vårt bästa för att hålla informationen på vår webbplats korrekt och uppdaterad. Detaljer om våra tjänster och affärsverksamheter kan dock förändras över tid."
                    : "We do our best to keep the information on our website accurate and up to date. However, details about our services and business activities may change from time to time."}
                </p>
                <p>
                  <strong className="text-white font-medium">{isSv ? "Upphovsrätt & Immateriella Rättigheter:" : "Intellectual Property:"}</strong>{" "}
                  {isSv
                    ? "Allt originalinnehåll, fotografier, grafik och företagsvarumärken tillhör Norvian AB eller respektive ägare. Vänligen kontakta oss innan vårt material används för kommersiella ändamål."
                    : "All original content, photographs, graphics, and company branding belong to Norvian AB or their respective owners. Please contact us before using our materials for commercial purposes."}
                </p>
                <p>
                  <strong className="text-white font-medium">{isSv ? "Externa Länkar:" : "External Links:"}</strong>{" "}
                  {isSv
                    ? "Vår webbplats kan innehålla länkar till andra webbplatser. Vi ansvarar inte för innehållet eller integritetspraxis på externa webbplatser, förutom där så krävs enligt lag."
                    : "Our website may include links to other websites. We are not responsible for the content or privacy practices of those external websites, except where required by law."}
                </p>
              </div>
            </div>

            {/* Privacy & Applicable Law */}
            <div id="privacy" className="legal-card-fade bg-[#0B1522]/80 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59C58]" />
                <h2 className="text-xs sm:text-sm font-mono tracking-[0.2em] text-[#C59C58] uppercase font-bold">
                  {isSv ? "INTEGRITET & TILLÄMPLIG LAG" : "PRIVACY & APPLICABLE LAW"}
                </h2>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                <p>
                  <strong className="text-white font-medium">{isSv ? "Integritet & GDPR:" : "Privacy & GDPR:"}</strong>{" "}
                  {isSv
                    ? "Vi respekterar integriteten för våra kunder, samarbetspartners, arbetssökande och webbplatsbesökare. Personuppgifter hanteras i enlighet med svensk dataskyddslagstiftning och EU:s allmänna dataskyddsförordning (GDPR)."
                    : "We respect the privacy of our clients, business partners, job applicants, and website visitors. Personal information is handled in accordance with Swedish data protection laws and the EU General Data Protection Regulation (GDPR)."}
                </p>
                <p>
                  <strong className="text-white font-medium">{isSv ? "Tillämplig Lag:" : "Applicable Law:"}</strong>{" "}
                  {isSv
                    ? "Norvian AB är registrerat i Sverige och bedriver verksamhet i enlighet med tillämplig svensk lagstiftning och Europeiska unionens regelverk."
                    : "Norvian AB is registered in Sweden and operates under applicable Swedish and European Union laws."}
                </p>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-white/50 border-t border-white/8 font-mono">
                <span>© {new Date().getFullYear()} Norvian AB</span>
                <span>{isSv ? "Med ensamrätt." : "All rights reserved."}</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
