"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { LanguageProvider, useLanguage } from "@/context/LanguageContext";
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Users,
  Calendar,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Send,
  ArrowLeft,
  Sparkles,
  Clock,
  ArrowRight,
  AlertCircle,
  Globe,
} from "lucide-react";

function RequestFormContent() {
  const { language } = useLanguage();
  const isSv = language === "sv";
  const isDe = language === "de";

  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    companyEmail: "",
    phoneNumber: "",
    workLocation: "",
    industry: "",
    workers: "",
    number: "",
    start: "",
    details: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Auto-fill industry from URL params if arrived from a specific service page
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const queryIndustry = params.get("industry") || params.get("service");
      if (queryIndustry) {
        let decoded = decodeURIComponent(queryIndustry);
        setFormData((prev) => ({ ...prev, industry: decoded }));
      }
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit request.");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setErrorMessage(
        err.message ||
          (isSv
            ? "Ett fel uppstod vid skickandet. Vänligen försök igen."
            : "An error occurred while submitting. Please try again.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SmoothScroll>
      <Navbar
        onRequestWorkforce={() => {
          const formEl = document.querySelector("form");
          formEl?.scrollIntoView({ behavior: "smooth" });
        }}
        showNav={true}
      />

      <main className="min-h-screen flex flex-col bg-[#070D16] text-[#F4F4F4] pt-24 sm:pt-28 pb-20 relative overflow-hidden">
        {/* Subtle Luxury Background Glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#C59C58]/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/3 left-10 w-[450px] h-[450px] bg-[#14253D]/30 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 w-full relative z-10 flex-1">
          {/* Back Navigation & Breadcrumb */}
          <div className="mb-8 flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider text-white/65 hover:text-[#C59C58] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 text-[#C59C58]" />
              <span>{isSv ? "Tillbaka till Start" : isDe ? "Zurück zur Übersicht" : "Back to Overview"}</span>
            </Link>

            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-[#C59C58] bg-[#C59C58]/10 border border-[#C59C58]/20 px-3 py-1 rounded-full">
              {isSv ? "Bemanningsförfrågan" : isDe ? "Personalanfrage Desk" : "Workforce Inquiry Desk"}
            </span>
          </div>

          {/* Section Header */}
          <div className="max-w-3xl mb-12 sm:mb-14">
            <div className="flex items-center gap-2.5 mb-3.5">
              <Sparkles className="w-4 h-4 text-[#C59C58]" />
              <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#C59C58] font-semibold">
                NORVIAN AB • EUROPE
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-[-0.02em] leading-[1.12] mb-4">
              {isSv ? "Begär Kvalificerad " : isDe ? "Qualifizierte " : "Request Qualified "}
              <span className="text-[#C59C58] italic font-serif">
                {isSv ? "Arbetskraft." : isDe ? "Fachkräfte Anfragen." : "Workforce."}
              </span>
            </h1>

            <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed">
              {isSv
                ? "Fyll i era bemanningsbehov nedan. Vårt operativa driftsteam i Västervik utvärderar tillgänglighet, kompetenser och levererar en detaljerad plan inom 24 timmar."
                : isDe
                ? "Geben Sie Ihre Personalanforderungen unten ein. Unser Einsatzteam in Västervik prüft Verfügbarkeiten und Qualifikationen und liefert Ihnen innerhalb von 24 Stunden eine konkrete Einsatzplanung."
                : "Submit your technical trade specifications and mobilization timeline. Our Sweden HQ team evaluates candidate availability and provides an exact deployment schedule within 24 hours."}
            </p>
          </div>

          {/* Main Layout Grid: Form + Sidebar Guarantees */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Column: Form Card */}
            <div className="lg:col-span-8 bg-[#0D1624]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C59C58] to-transparent" />

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-200 text-xs sm:text-sm">
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* 1. Company Name & Contact Person */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-[0.16em] text-[#C59C58] mb-2 font-semibold">
                        {isSv ? "Företagsnamn *" : "Company Name *"}
                      </label>
                      <div className="relative">
                        <Building2 className="w-4 h-4 text-white/35 absolute left-4 top-3.5" />
                        <input
                          type="text"
                          name="companyName"
                          required
                          value={formData.companyName}
                          onChange={handleChange}
                          placeholder={isSv ? "t.ex. Skandinavisk Marin AB" : "e.g., Nordic Marine Engineering AB"}
                          className="w-full bg-[#070D16]/80 border border-white/12 focus:border-[#C59C58] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-[0.16em] text-[#C59C58] mb-2 font-semibold">
                        {isSv ? "Kontaktperson *" : "Contact Person *"}
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-white/35 absolute left-4 top-3.5" />
                        <input
                          type="text"
                          name="contactPerson"
                          required
                          value={formData.contactPerson}
                          onChange={handleChange}
                          placeholder={isSv ? "För- och efternamn" : "First and last name"}
                          className="w-full bg-[#070D16]/80 border border-white/12 focus:border-[#C59C58] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 2. Company Email & Phone Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-[0.16em] text-[#C59C58] mb-2 font-semibold">
                        {isSv ? "Företags-E-post *" : "Company Email *"}
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-white/35 absolute left-4 top-3.5" />
                        <input
                          type="email"
                          name="companyEmail"
                          required
                          value={formData.companyEmail}
                          onChange={handleChange}
                          placeholder="namn@foretag.se"
                          className="w-full bg-[#070D16]/80 border border-white/12 focus:border-[#C59C58] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-[0.16em] text-[#C59C58] mb-2 font-semibold">
                        {isSv ? "Telefonnummer *" : "Phone Number *"}
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-white/35 absolute left-4 top-3.5" />
                        <input
                          type="tel"
                          name="phoneNumber"
                          required
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          placeholder="+46 / +47 / +49..."
                          className="w-full bg-[#070D16]/80 border border-white/12 focus:border-[#C59C58] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 3. Work Location & Industry */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-[0.16em] text-[#C59C58] mb-2 font-semibold">
                        {isSv ? "Arbetsplats / Ort *" : "Work Location *"}
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-white/35 absolute left-4 top-3.5" />
                        <input
                          type="text"
                          name="workLocation"
                          required
                          value={formData.workLocation}
                          onChange={handleChange}
                          placeholder={isSv ? "t.ex. Göteborg Varv / Oslo / Hamburg" : "e.g., Gothenburg Shipyard, Sweden"}
                          className="w-full bg-[#070D16]/80 border border-white/12 focus:border-[#C59C58] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-[0.16em] text-[#C59C58] mb-2 font-semibold">
                        {isSv ? "Bransch (t.ex. Skeppsbyggnad) *" : "Industry (e.g., Shipbuilding) *"}
                      </label>
                      <div className="relative">
                        <Briefcase className="w-4 h-4 text-white/35 absolute left-4 top-3.5 pointer-events-none" />
                        <input
                          type="text"
                          name="industry"
                          required
                          value={formData.industry}
                          onChange={handleChange}
                          placeholder={isSv ? "t.ex. Skeppsbyggnad, Bygg, Logistik..." : "e.g., Shipbuilding, Construction, Logistics..."}
                          className="w-full bg-[#070D16]/80 border border-white/12 focus:border-[#C59C58] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 4. Workers & Number & Start */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-[0.16em] text-[#C59C58] mb-2 font-semibold">
                        {isSv ? "Yrkesroller (Workers) *" : "Workers (Roles) *"}
                      </label>
                      <div className="relative">
                        <Users className="w-4 h-4 text-white/35 absolute left-4 top-3.5" />
                        <input
                          type="text"
                          name="workers"
                          required
                          value={formData.workers}
                          onChange={handleChange}
                          placeholder={isSv ? "t.ex. TIG-svetsare, Chaufförer" : "e.g., TIG Welders, Drivers"}
                          className="w-full bg-[#070D16]/80 border border-white/12 focus:border-[#C59C58] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-[0.16em] text-[#C59C58] mb-2 font-semibold">
                        {isSv ? "Antal (Number) *" : "Number of Workers *"}
                      </label>
                      <div className="relative">
                        <span className="text-white/35 text-xs font-mono absolute left-4 top-3.5">#</span>
                        <input
                          type="text"
                          name="number"
                          required
                          value={formData.number}
                          onChange={handleChange}
                          placeholder={isSv ? "t.ex. 10 personer" : "e.g., 10 workers"}
                          className="w-full bg-[#070D16]/80 border border-white/12 focus:border-[#C59C58] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase tracking-[0.16em] text-[#C59C58] mb-2 font-semibold">
                        {isSv ? "Startdatum *" : "Start (Timeline) *"}
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-white/35 absolute left-4 top-3.5" />
                        <input
                          type="text"
                          name="start"
                          required
                          value={formData.start}
                          onChange={handleChange}
                          placeholder={isSv ? "t.ex. Snarast / 1 juni" : "e.g., As soon as possible"}
                          className="w-full bg-[#070D16]/80 border border-white/12 focus:border-[#C59C58] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* 5. Details */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-[0.16em] text-[#C59C58] mb-2 font-semibold">
                      {isSv ? "Ytterligare Detaljer & Krav (Details) *" : "Project Details & Specifications *"}
                    </label>
                    <div className="relative">
                      <FileText className="w-4 h-4 text-white/35 absolute left-4 top-3.5" />
                      <textarea
                        name="details"
                        required
                        rows={4}
                        value={formData.details}
                        onChange={handleChange}
                        placeholder={
                          isSv
                            ? "Beskriv projektets varaktighet, skiftrotationer, specifika certifieringskrav (t.ex. ISO 9606-1, EN 12811, YKB), eller bostadsarrangemang..."
                            : "Specify shift rotations, certifications required (e.g. ISO 9606-1, EN 12811, Code 95), site conditions, or project duration..."
                        }
                        className="w-full bg-[#070D16]/80 border border-white/12 focus:border-[#C59C58] rounded-xl pl-11 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none transition-all duration-200 resize-y"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#C59C58] via-[#D8B474] to-[#C59C58] hover:from-[#D1A762] hover:to-[#DFBB7D] text-[#070D16] py-4 rounded-2xl text-xs sm:text-sm font-bold tracking-[0.18em] uppercase transition-all duration-300 shadow-[0_4px_24px_rgba(197,156,88,0.4)] hover:shadow-[0_0_30px_rgba(197,156,88,0.6)] hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-[#070D16] border-t-transparent rounded-full animate-spin" />
                          <span>{isSv ? "Bearbetar förfrågan..." : "Processing Request..."}</span>
                        </>
                      ) : (
                        <>
                          <span>{isSv ? "Skicka Bemanningsförfrågan" : "Submit Workforce Request"}</span>
                          <Send className="w-4 h-4 text-[#070D16] transition-transform duration-300 group-hover:translate-x-1" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-white/50 font-light mt-3">
                      {isSv
                        ? "Sekretessbelagd och icke-bindande förfrågan. Svar inom 24 timmar."
                        : "Confidential and non-binding inquiry. Exact feasibility delivered within 24 hours."}
                    </p>
                  </div>
                </form>
              ) : (
                /* Success State */
                <div className="py-12 sm:py-16 text-center space-y-6 animate-in fade-in zoom-in-95 duration-500">
                  <div className="w-16 h-16 rounded-full bg-[#C59C58]/20 border border-[#C59C58] text-[#C59C58] flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(197,156,88,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <div className="max-w-md mx-auto space-y-2">
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                      {isSv ? "Förfrågan Mottagen!" : "Workforce Request Received!"}
                    </h3>
                    <p className="text-sm text-white/70 font-light leading-relaxed">
                      {isSv
                        ? `Tack, ${formData.contactPerson || "för er förfrågan"}. Vi har tagit emot uppgifterna för ${formData.companyName}. Vårt driftsteam i Västervik granskar tillgängligheten och kontaktar er inom 24 timmar.`
                        : `Thank you, ${formData.contactPerson || "for your submission"}. We have received the staffing inquiry for ${formData.companyName}. Our operations desk in Västervik will review candidate availability and respond within 24 hours.`}
                    </p>
                  </div>

                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          companyName: "",
                          contactPerson: "",
                          companyEmail: "",
                          phoneNumber: "",
                          workLocation: "",
                          industry: "",
                          workers: "",
                          number: "",
                          start: "",
                          details: "",
                        });
                      }}
                      className="px-6 py-3 rounded-full text-xs font-mono uppercase tracking-wider text-white/80 hover:text-white border border-white/15 hover:border-white/30 transition-all cursor-pointer"
                    >
                      {isSv ? "Skicka en ny förfrågan" : "Submit another request"}
                    </button>

                    <Link
                      href="/"
                      className="px-7 py-3 rounded-full text-xs font-bold font-mono uppercase tracking-wider bg-[#C59C58] text-[#070D16] hover:bg-[#D8B474] transition-all shadow-md cursor-pointer inline-flex items-center gap-2"
                    >
                      <span>{isSv ? "Tillbaka till startsidan" : "Return to Home"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Guarantees & Direct Contacts */}
            <div className="lg:col-span-4 space-y-6">
              {/* Guarantee Box */}
              <div className="bg-[#0D1624]/60 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-7 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#C59C58]/15 border border-[#C59C58]/30 flex items-center justify-center text-[#C59C58]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase font-bold tracking-wider text-[#C59C58]">
                      {isSv ? "Norvian Standard" : "The Norvian Standard"}
                    </h4>
                    <p className="text-[11px] text-white/60">
                      {isSv ? "Garanterad Regelefterlevnad" : "Guaranteed EU Compliance"}
                    </p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 text-xs text-white/75 font-light">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C59C58] shrink-0 mt-0.5" />
                    <span>
                      {isSv
                        ? "100 % efterlevnad av nordiska kollektivavtal & EU-arbetsrätt"
                        : "100% compliant with Nordic collective agreements & EU labour laws"}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C59C58] shrink-0 mt-0.5" />
                    <span>
                      {isSv
                        ? "Erfarna medarbetare redan bosatta i Europa med giltiga arbetstillstånd"
                        : "Workers already based in Europe with valid permits & documentation"}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C59C58] shrink-0 mt-0.5" />
                    <span>
                      {isSv
                        ? "Dokumentverifiering, yrkesprov & säkerhetsintroduktioner"
                        : "Document verification, trade assessments & safety inductions"}
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#C59C58] shrink-0 mt-0.5" />
                    <span>
                      {isSv
                        ? "Flerspråkig fältsamordning (svenska, engelska, tyska)"
                        : "Multilingual field coordination (Swedish, English, German)"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Sweden HQ Desk Box */}
              <div className="bg-[#0D1624]/60 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-7 space-y-4">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.2em] text-[#C59C58] font-bold">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{isSv ? "Svar Inom 24 Timmar" : "24-Hour Response"}</span>
                </div>

                <h4 className="font-serif text-lg text-white font-normal">
                  {isSv ? "Direkt Bemanningsdesk" : "Direct Operations Desk"}
                </h4>

                <div className="space-y-3 text-xs text-white/70 font-light pt-1">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-[#C59C58] shrink-0" />
                    <a href="tel:+46793090307" className="hover:text-white transition-colors">
                      +46 79 30 90 30 7
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-[#C59C58] shrink-0" />
                    <a href="mailto:office@norvian.se" className="hover:text-white transition-colors">
                      office@norvian.se
                    </a>
                  </div>

                  <div className="flex items-center gap-3">
                    <Globe className="w-4 h-4 text-[#C59C58] shrink-0" />
                    <a href="https://www.norvian.se" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                      www.norvian.se
                    </a>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#C59C58] shrink-0 mt-0.5" />
                    <span>Baumansgatan 4, 593 32 Västervik, Sweden</span>
                  </div>
                </div>

                {/* Our Socials */}
                <div className="pt-3 border-t border-white/10 space-y-2.5">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#C59C58] block font-bold">
                    {isSv ? "Våra Sociala Medier" : "Our Socials"}
                  </span>
                  <div className="flex flex-wrap items-center gap-2">
                    <a
                      href="https://www.instagram.com/norvianab?srtk=M216aHY0OHcwb2lj&utm_source=qr"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#E1306C]/60 text-white text-xs transition-colors"
                    >
                      <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#405DE6] p-[1.5px]">
                        <div className="w-full h-full bg-[#0D1624] rounded-[3px] flex items-center justify-center">
                          <svg
                            className="w-3 h-3 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                          </svg>
                        </div>
                      </div>
                      <span className="font-medium">Instagram</span>
                    </a>

                    <a
                      href="https://www.linkedin.com/company/norvian-ab/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#0A66C2]/60 text-white text-xs transition-colors"
                    >
                      <div className="w-5 h-5 rounded-md bg-[#0A66C2] flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </div>
                      <span className="font-medium">LinkedIn</span>
                    </a>

                    <a
                      href="https://youtube.com/@norvianab?si=CHXBdVwTH7mq2W7i"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#FF0000]/60 text-white text-xs transition-colors"
                    >
                      <div className="w-5 h-5 rounded-md bg-[#FF0000] flex items-center justify-center">
                        <svg
                          className="w-3 h-3 text-white fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      </div>
                      <span className="font-medium">YouTube</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <Footer />
      </main>
    </SmoothScroll>
  );
}

export default function RequestPage() {
  return (
    <LanguageProvider>
      <RequestFormContent />
    </LanguageProvider>
  );
}
