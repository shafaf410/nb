"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Check,
  Copy,
  ShieldCheck,
  Building2,
  Users2,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface TeamMember {
  name: string;
  roleEn: string;
  roleSv: string;
  deptEn: string;
  deptSv: string;
  bioEn: string;
  bioSv: string;
  email: string;
  locationEn: string;
  locationSv: string;
  languages: string[];
  image: string;
  tagEn: string;
  tagSv: string;
}

export default function TeamSection() {
  const { language } = useLanguage();
  const isSv = language === "sv";

  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  const handleCopyEmail = (email: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email);
      setCopiedEmail(email);
      setTimeout(() => setCopiedEmail(null), 2000);
    }
  };

  const handleBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "/contact";
      }
    }
  };

  const regionalTeam: TeamMember[] = [
    {
      name: "Isabelle Beyer",
      roleEn: "External Business Partner – Germany",
      roleSv: "Extern Affärspartner – Tyskland",
      deptEn: "German Market Coordination",
      deptSv: "Tysk Marknadskoordinering",
      bioEn:
        "Coordinates Norvian AB's market presence and industrial client relations across Germany and the DACH region. Spearheads cross-border client integration, regulatory liaison, and dedicated talent solutions for German industrial employers.",
      bioSv:
        "Koordinerar Norvian AB:s verksamhet och industriella klientrelationer i Tyskland och DACH-regionen. Driver gränsöverskridande företagsintegration, myndighetskontakt och skräddarsydda bemanningslösningar för tyska arbetsgivare.",
      email: "isabelle@norvian.se",
      locationEn: "Germany (DACH Region)",
      locationSv: "Tyskland (DACH-regionen)",
      languages: ["Deutsch", "English"],
      image: "/images/team/isabelle_beyer.jpg",
      tagEn: "German Market",
      tagSv: "Tyska Marknaden",
    },
    {
      name: "Alina Aleksandriuk",
      roleEn: "Branch Manager & Administrator",
      roleSv: "Branch Manager & Administratör",
      deptEn: "Operational Administration & Compliance",
      deptSv: "Operativ Administration & Regelefterlevnad",
      bioEn:
        "Manages internal branch operations, documentation processing, worker onboarding logistics, and administrative coordination between European enterprise clients and regional deployment teams.",
      bioSv:
        "Ansvarar för operativ filialadministration, dokumentationshantering, onboarding-logistik och samordning mellan europeiska företagskunder och regionala team.",
      email: "alina@norvian.se",
      locationEn: "Sweden Operations",
      locationSv: "Sverige Verksamhet",
      languages: ["English", "Svenska"],
      image: "/images/team/alina.jpg",
      tagEn: "Operations",
      tagSv: "Administration",
    },
    {
      name: "Baiju Babu",
      roleEn: "External Business Partner – UK",
      roleSv: "Extern Affärspartner – UK",
      deptEn: "UK Industrial Partner Relations",
      deptSv: "Brittiska Industrirelationer",
      bioEn:
        "Leads strategic workforce liaisons and cross-border placement initiatives for industrial, marine, and construction sectors in the United Kingdom and international corridors.",
      bioSv:
        "Leder strategiska arbetskraftssamarbeten och gränsöverskridande bemanningsinitiativ för marin-, industri- och byggsektorn i Storbritannien och internationellt.",
      email: "baiju@norvian.se",
      locationEn: "United Kingdom",
      locationSv: "Storbritannien",
      languages: ["English", "Malayalam"],
      image: "/images/team/baiju.jpg",
      tagEn: "UK Market",
      tagSv: "UK Marknad",
    },
  ];

  return (
    <div className="bg-[#070D16] text-slate-200 py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* Top Navigation & Breadcrumbs */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={handleBack}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] hover:bg-[#C59C58] text-white hover:text-[#070D16] border border-white/15 hover:border-[#C59C58] text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-sm"
            aria-label={isSv ? "Tillbaka till föregående sida" : "Go back to previous page"}
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            <span>{isSv ? "Tillbaka" : "Back"}</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">
              Norvian AB
            </Link>
            <span className="text-slate-600">/</span>
            <Link href="/contact" className="hover:text-white transition-colors">
              {isSv ? "Kontakt" : "Contact"}
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-[#C59C58] font-semibold">
              {isSv ? "Ledarskap & Team" : "Leadership & Team"}
            </span>
          </div>
        </div>

        {/* Section Header */}
        <header className="border-b border-white/15 pb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C59C58]/15 border border-[#C59C58]/35 text-[#E8C587] text-[11px] font-mono uppercase tracking-[0.22em] mb-4">
            <Users2 className="w-3.5 h-3.5" />
            <span>{isSv ? "Företagsledning & Nyckelpersoner" : "Executive Leadership & Key Partners"}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-white font-normal tracking-tight">
            {isSv ? "Möt Vårt Ledarskapsteam" : "Meet Our Leadership Team"}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 mt-3 max-w-3xl leading-relaxed">
            {isSv
              ? "De drivande krafterna bakom Norvian AB. Med djup expertis inom skandinavisk industri, internationell personalförsörjning och europeiska marknader levererar vi kvalitetssäkrad arbetskraft med fullständig regelefterlevnad."
              : "The experienced leaders driving Norvian AB. Combining deep industry insight, international recruitment corridors, and European regulatory compliance, we connect premier employers with qualified professionals."}
          </p>
        </header>

        {/* Featured Co-Founders Cinematic Showcase */}
        <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0B1522] via-[#09111C] to-[#070D16] border border-[#C59C58]/35 shadow-[0_20px_60px_rgba(0,0,0,0.85)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C59C58]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            {/* Founders Photo */}
            <div className="lg:col-span-5 relative aspect-[4/3] sm:aspect-[16/11] lg:aspect-auto lg:h-full min-h-[340px] sm:min-h-[460px] overflow-hidden bg-black/50">
              <Image
                src="/images/team/co_founders.jpg"
                alt="Norvian AB Co-Founders Bianka Bittlingmeier & Vinu Mohan"
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1522] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0B1522]" />

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] font-mono text-white/90 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
                <span className="flex items-center gap-1.5 text-[#E8C587]">
                  <Sparkles className="w-3.5 h-3.5" />
                  {isSv ? "Grundarduon" : "Founding Partners"}
                </span>
                <span className="text-slate-300">Vinu Mohan &amp; Bianka Bittlingmeier</span>
              </div>
            </div>

            {/* Founders Statement & Profiles */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-mono text-[#C59C58] tracking-wider uppercase">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isSv ? "Officiell Grundarledning" : "Official Executive Directorate"}</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal tracking-tight">
                {isSv
                  ? "Ett gemensamt löfte om industriell kvalitet och integritet"
                  : "A shared commitment to industrial excellence and trust"}
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                {isSv
                  ? "Norvian AB grundades med en tydlig vision: att bygga en transparent, snabb och 100 % efterlevnadssäkrad bro mellan världsledande yrkesskicklighet och Europas mest krävande industrier. Från Västervik till Hamburg och Nordsjöns varv står vårt grundarteam personligen bakom varje placering."
                  : "Norvian AB was founded with a clear mission: to build a transparent, fast, and 100% compliant bridge between world-class trade specialists and Europe's most demanding industrial operations. From our Swedish headquarters in Västervik to partners across Europe, our founders personally champion every deployment."}
              </p>

              {/* Co-Founders Detail Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                {/* Bianka Bittlingmeier */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#E8C587] font-semibold">
                      {isSv ? "Företagsledning" : "Executive Board"}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {isSv ? "Sverige & Tyskland" : "Sweden & Germany"}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-white font-medium">Bianka Bittlingmeier</h3>
                    <div className="text-xs font-mono text-[#C59C58] font-semibold">
                      {isSv ? "Medgrundare & Delägare" : "Co-Founder & Co-Owner"}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isSv ? "Rekrytering & Affärspartnerskap" : "Recruitment & Business Partnerships"}
                    </div>
                  </div>
                  <p className="text-[11.5px] text-slate-300 leading-relaxed pt-1">
                    {isSv
                      ? "Leder europeiska kundrelationer, B2B-integrering och strategiska partnerskapsnätverk för industri- och varvsprojekt."
                      : "Senior executive directing European client relationships, B2B workforce integrations, and strategic partner networks."}
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
                    <span className="text-[10px] font-mono text-slate-400">Deutsch • Svenska • English</span>
                    <a
                      href="mailto:bianka@norvian.se"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#E8C587] hover:underline"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>bianka@norvian.se</span>
                    </a>
                  </div>
                </div>

                {/* Vinu Mohan */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#E8C587] font-semibold">
                      {isSv ? "Global Verksamhet" : "Global Operations"}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {isSv ? "Sverige & Internationellt" : "Sweden & International"}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg text-white font-medium">Vinu Mohan</h3>
                    <div className="text-xs font-mono text-[#C59C58] font-semibold">
                      {isSv ? "Medgrundare & Delägare" : "Co-Founder & Co-Owner"}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {isSv ? "Internationell Verksamhet & Rekrytering" : "International Operations & Recruitment"}
                    </div>
                  </div>
                  <p className="text-[11.5px] text-slate-300 leading-relaxed pt-1">
                    {isSv
                      ? "Arkitekten bakom Norvians internationella talangkorridorer, certifierade yrkesverifiering och visumarkitektur."
                      : "Architect of Norvian's international talent corridors, mobilization pipelines, and cross-border compliance."}
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
                    <span className="text-[10px] font-mono text-slate-400">English • Hindi • Malayalam</span>
                    <a
                      href="mailto:vinu@norvian.se"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[#E8C587] hover:underline"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>vinu@norvian.se</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Core Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="font-serif text-xl sm:text-2xl text-[#E8C587] font-semibold">1,000+</div>
                  <div className="text-[10.5px] font-mono text-slate-400 uppercase mt-0.5">
                    {isSv ? "Specialister Placerade" : "Professionals Placed"}
                  </div>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="font-serif text-xl sm:text-2xl text-[#E8C587] font-semibold">100%</div>
                  <div className="text-[10.5px] font-mono text-slate-400 uppercase mt-0.5">
                    {isSv ? "EU & Visumefterlevnad" : "EU & Visa Compliant"}
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1 p-3 rounded-2xl bg-white/[0.03] border border-white/10">
                  <div className="font-serif text-xl sm:text-2xl text-[#E8C587] font-semibold">Västervik</div>
                  <div className="text-[10.5px] font-mono text-slate-400 uppercase mt-0.5">
                    {isSv ? "Svenskt Säte & HK" : "Swedish Headquarters"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regional Partners & Key Team Members Grid */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/10 pb-4">
            <div>
              <div className="text-xs font-mono text-[#C59C58] uppercase tracking-wider">
                {isSv ? "Regionala Partners & Team" : "Regional Partners & Team"}
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl text-white font-normal mt-1">
                {isSv ? "Internationella partners & filialer" : "International Partners & Branch Operations"}
              </h2>
            </div>
            <div className="text-xs font-mono text-slate-400">
              {isSv ? "Direktkontakt med regionala samordnare" : "Direct access to regional coordinators"}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {regionalTeam.map((member) => {
              const role = isSv ? member.roleSv : member.roleEn;
              const dept = isSv ? member.deptSv : member.deptEn;
              const bio = isSv ? member.bioSv : member.bioEn;
              const location = isSv ? member.locationSv : member.locationEn;
              const tag = isSv ? member.tagSv : member.tagEn;
              const isCopied = copiedEmail === member.email;

              return (
                <div
                  key={member.name}
                  className="group relative flex flex-col rounded-3xl bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-[#C59C58]/60 transition-all duration-300 hover:-translate-y-1 shadow-[0_12px_40px_rgba(0,0,0,0.5)] overflow-hidden"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/40">
                    <Image
                      src={member.image}
                      alt={`${member.name} - ${role}`}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070D16] via-transparent to-transparent opacity-90" />

                    {/* Department Tag Pill */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[10.5px] font-mono tracking-wider uppercase font-semibold bg-black/70 backdrop-blur-md text-[#E8C587] border border-[#C59C58]/40 shadow-md">
                        {tag}
                      </span>
                    </div>

                    {/* Location Badge */}
                    <div className="absolute bottom-4 left-4 flex items-center gap-1.5 text-xs font-mono text-slate-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      <MapPin className="w-3 h-3 text-[#C59C58]" />
                      <span>{location}</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                    <div>
                      <h3 className="font-serif text-2xl text-white font-normal tracking-tight group-hover:text-[#E8C587] transition-colors">
                        {member.name}
                      </h3>
                      <div className="text-xs font-mono text-[#C59C58] uppercase tracking-wider font-semibold mt-1">
                        {role}
                      </div>
                      <div className="text-xs text-slate-400 font-medium mt-0.5">
                        {dept}
                      </div>

                      <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed mt-4">
                        {bio}
                      </p>
                    </div>

                    {/* Footer / Languages & Contact Actions */}
                    <div className="pt-4 border-t border-white/10 space-y-3.5">
                      {/* Languages */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[10.5px] font-mono text-slate-400 uppercase mr-1">
                          {isSv ? "Språk:" : "Lang:"}
                        </span>
                        {member.languages.map((lang) => (
                          <span
                            key={lang}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.06] text-slate-300 border border-white/5"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>

                      {/* Email CTA Button with Copy Feature */}
                      <div className="flex items-center gap-2">
                        <a
                          href={`mailto:${member.email}`}
                          className="flex-1 flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-[#C59C58]/15 hover:bg-[#C59C58] text-[#E8C587] hover:text-[#070D16] border border-[#C59C58]/40 hover:border-[#C59C58] text-xs font-mono font-semibold transition-all duration-200"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span className="truncate">{member.email}</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleCopyEmail(member.email)}
                          title={isSv ? "Kopiera e-post" : "Copy email address"}
                          className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/15 text-slate-300 hover:text-white border border-white/10 transition-colors cursor-pointer"
                        >
                          {isCopied ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Central Office Dispatch */}
        <section className="rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2 text-slate-300">
            <Building2 className="w-4 h-4 text-[#C59C58]" />
            <span>
              <strong>Norvian AB</strong> • Baumansgatan 4, 593 32 Västervik, Sweden (Org. 559473-4997)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:office@norvian.se"
              className="hover:text-[#E8C587] transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#C59C58]" />
              <span>office@norvian.se</span>
            </a>
            <span className="text-slate-600">•</span>
            <a
              href="tel:+4722009000"
              className="hover:text-[#E8C587] transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#C59C58]" />
              <span>+47 22 00 90 00</span>
            </a>
          </div>
        </section>

        {/* Action Call to Action Footer Card */}
        <section className="rounded-3xl bg-gradient-to-r from-[#0E1B2B] via-[#0B1522] to-[#070D16] border border-[#C59C58]/35 p-8 sm:p-12 text-center space-y-6 shadow-[0_20px_50px_rgba(0,0,0,0.7)]">
          <div className="max-w-2xl mx-auto space-y-3">
            <h3 className="font-serif text-2xl sm:text-4xl text-white font-normal tracking-tight">
              {isSv
                ? "Redo att diskutera era personalbehov?"
                : "Ready to discuss your workforce requirements?"}
            </h3>
            <p className="text-sm sm:text-base text-slate-300">
              {isSv
                ? "Kontakta våra grundare eller skicka en direkt förfrågan för en skräddarsydd bemanningslösning till er verksamhet."
                : "Connect directly with our founders or submit an operational inquiry for tailored manpower solutions."}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/request"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#C59C58] via-[#D8B474] to-[#C59C58] hover:from-[#D1A762] hover:to-[#DFBB7D] text-[#070D16] text-xs sm:text-sm font-bold tracking-[0.14em] uppercase transition-all duration-300 shadow-[0_4px_18px_rgba(197,156,88,0.4)] hover:shadow-[0_0_25px_rgba(197,156,88,0.6)] hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span>{isSv ? "Begär Arbetskraft" : "Request Qualified Workforce"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white/15 text-white border border-white/15 hover:border-white/30 text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer"
            >
              <span>{isSv ? "Kontakta Huvudkontoret" : "Contact Main Office"}</span>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
