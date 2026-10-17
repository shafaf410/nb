"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ImpressumSection() {
  const { language } = useLanguage();
  const isSv = language === "sv";

  const handleBack = () => {
    if (typeof window !== "undefined") {
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = "/#home";
      }
    }
  };

  return (
    <div className="bg-[#0A0F18] text-slate-200 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto">
        
        {/* Top Navigation: Back Button */}
        <div className="mb-8">
          <button
            type="button"
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#C59C58] hover:text-white transition-colors cursor-pointer py-1.5 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10"
            aria-label={isSv ? "Gå tillbaka" : "Go back"}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isSv ? "Tillbaka" : "Back"}</span>
          </button>
        </div>

        {/* Formal Document Container */}
        <div className="bg-[#0D1522] border border-white/15 rounded-2xl p-6 sm:p-10 lg:p-12 space-y-10 shadow-lg">
          
          {/* Document Header */}
          <div className="border-b border-white/15 pb-6">
            <div className="text-xs font-mono text-[#C59C58] uppercase tracking-wider mb-2">
              {isSv ? "Officiell Bolagsinformation" : "Official Legal Notice"}
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl text-white font-normal">
              {isSv ? "Impressum / Juridiskt Meddelande" : "Impressum / Legal Notice"}
            </h1>
            <p className="text-xs text-slate-400 mt-2 font-mono">
              Norvian AB • Org. Nr: 559473-4997 • Bolagsverket, Sweden
            </p>
          </div>

          {/* Section 1: Company Details */}
          <section className="space-y-4">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-wide border-b border-white/10 pb-2">
              {isSv ? "Företagsuppgifter" : "Company Details"}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left border-collapse">
                <tbody className="divide-y divide-white/10">
                  <tr>
                    <td className="py-2.5 pr-4 text-slate-400 w-1/3 align-top font-medium">
                      {isSv ? "Företagsnamn:" : "Company Name:"}
                    </td>
                    <td className="py-2.5 text-white font-semibold">Norvian AB</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-slate-400 align-top font-medium">
                      {isSv ? "Organisationsnummer:" : "Organisation Number:"}
                    </td>
                    <td className="py-2.5 text-white font-mono">559473-4997</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-slate-400 align-top font-medium">
                      {isSv ? "Bolagsform:" : "Company Type:"}
                    </td>
                    <td className="py-2.5 text-white">
                      {isSv ? "Svenskt Aktiebolag" : "Swedish Limited Company (Aktiebolag)"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-slate-400 align-top font-medium">
                      {isSv ? "Registreringsdatum:" : "Registered:"}
                    </td>
                    <td className="py-2.5 text-white">
                      {isSv ? "26 februari 2024" : "26 February 2024"}
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-slate-400 align-top font-medium">
                      {isSv ? "Säte:" : "Registered Office:"}
                    </td>
                    <td className="py-2.5 text-white">Västervik, Sweden</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-slate-400 align-top font-medium">
                      {isSv ? "Adress:" : "Address:"}
                    </td>
                    <td className="py-2.5 text-white">
                      Baumansgatan 4, 593 32 Västervik, Sweden
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-slate-400 align-top font-medium">
                      {isSv ? "Registreringsmyndighet:" : "Registration Authority:"}
                    </td>
                    <td className="py-2.5 text-white">Bolagsverket, Sweden</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 pr-4 text-slate-400 align-top font-medium">
                      {isSv ? "Momsstatus:" : "VAT Status:"}
                    </td>
                    <td className="py-2.5 text-white">
                      {isSv ? "Registrerad för moms (Momsregistrerad)" : "Registered for VAT"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 2: Founders */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-wide border-b border-white/10 pb-2">
              {isSv ? "Grundare" : "Founders"}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isSv
                ? "Norvian AB grundades gemensamt av Ninu Mohan Poyilil och Bianka Bittlingmeier."
                : "Norvian AB was co-founded by Ninu Mohan Poyilil and Bianka Bittlingmeier."}
            </p>
          </section>

          {/* Section 3: What We Do */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-wide border-b border-white/10 pb-2">
              {isSv ? "Verksamhetsbeskrivning" : "What We Do"}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isSv
                ? "Norvian AB är ett svenskt rekryterings- och bemanningsföretag baserat i Västervik. Vi hjälper företag att hitta kvalificerad arbetskraft och erbjuder bemanningslösningar för olika branscher i Sverige och över hela Europa."
                : "Norvian AB is a Swedish recruitment and staffing company based in Västervik. We help businesses find qualified workers and provide staffing solutions for different industries across Sweden and Europe."}
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isSv
                ? "Vår verksamhet omfattar rekrytering, tillfällig bemanning, personaluthyrning, internationell personalförsörjning och HR-konsultation. Vi erbjuder även affärsutveckling och rådgivningstjänster."
                : "Our work includes recruitment, temporary staffing, personnel leasing, international workforce supply, and HR consulting. We also offer business development and advisory services."}
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isSv
                ? "Därutöver bistår vi med internationella studentantagningar och hjälper till att koppla samman företag och privatpersoner med försäkringsbolag och andra relevanta tjänsteleverantörer."
                : "In addition, we work with international student admissions and help connect businesses and individuals with insurance companies and other relevant service providers."}
            </p>
          </section>

          {/* Section 4: Registered Business Activities */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-wide border-b border-white/10 pb-2">
              {isSv ? "Registrerade Verksamhetskoder (SNI)" : "Registered Business Activities"}
            </h2>
            <ul className="text-sm text-slate-300 space-y-2">
              <li className="flex items-start gap-2">
                <span className="font-mono text-[#C59C58] font-semibold w-16 shrink-0">78201</span>
                <span>{isSv ? "– Bemanningsföretag (Staffing)" : "– Staffing"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-[#C59C58] font-semibold w-16 shrink-0">78100</span>
                <span>{isSv ? "– Arbetsförmedling och rekrytering" : "– Employment and recruitment services"}</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-mono text-[#C59C58] font-semibold w-16 shrink-0">78202</span>
                <span>{isSv ? "– Övrig personaluthyrning" : "– Other provision of personnel functions"}</span>
              </li>
            </ul>
          </section>

          {/* Section 5: Contact */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-wide border-b border-white/10 pb-2">
              {isSv ? "Kontakt" : "Contact"}
            </h2>
            <div className="text-sm text-slate-300 leading-relaxed space-y-1">
              <p className="font-semibold text-white">Norvian AB</p>
              <p>Baumansgatan 4</p>
              <p>593 32 Västervik</p>
              <p>Sweden</p>
              <div className="pt-2 space-y-1">
                <p>
                  <span className="text-slate-400">{isSv ? "E-post: " : "Email: "}</span>
                  <a href="mailto:contact@norvian.no" className="text-[#C59C58] hover:underline">
                    contact@norvian.no
                  </a>
                  <span className="text-slate-500"> / </span>
                  <a href="mailto:contact@norvian.se" className="text-[#C59C58] hover:underline">
                    contact@norvian.se
                  </a>
                </p>
                <p>
                  <span className="text-slate-400">{isSv ? "Telefon: " : "Phone: "}</span>
                  <a href="tel:+4722009000" className="text-slate-200 hover:underline">
                    +47 22 00 90 00
                  </a>
                  <span className="text-slate-500"> / </span>
                  <a href="tel:+46708278282" className="text-slate-200 hover:underline">
                    +46 70 827 82 82
                  </a>
                </p>
                <p>
                  <span className="text-slate-400">{isSv ? "Webbplats: " : "Website: "}</span>
                  <a href="https://norvian.se" target="_blank" rel="noopener noreferrer" className="text-[#C59C58] hover:underline">
                    https://norvian.se
                  </a>
                </p>
              </div>
            </div>
          </section>

          {/* Section 6: Website Information */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-wide border-b border-white/10 pb-2">
              {isSv ? "Webbplatsinformation" : "Website Information"}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isSv
                ? "Vi strävar efter att hålla informationen på webbplatsen korrekt och aktuell. Detaljer om våra tjänster och affärsverksamheter kan dock komma att uppdateras från tid till annan."
                : "We do our best to keep the information on our website accurate and up to date. However, details about our services and business activities may change from time to time."}
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isSv
                ? "Allt originalinnehåll, fotografier, grafik och varumärken tillhör Norvian AB eller respektive rättighetsinnehavare. Vänligen kontakta oss skriftligen före kommersiell användning."
                : "All original content, photographs, graphics, and company branding belong to Norvian AB or their respective owners. Please contact us before using our materials for commercial purposes."}
            </p>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isSv
                ? "Vår webbplats kan innehålla länkar till externa webbplatser. Vi ansvarar inte för innehållet eller integritetsrutinerna på dessa externa webbplatser utöver vad som föreskrivs i lag."
                : "Our website may include links to other websites. We are not responsible for the content or privacy practices of those external websites, except where required by law."}
            </p>
          </section>

          {/* Section 7: Privacy */}
          <section className="space-y-3" id="privacy">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-wide border-b border-white/10 pb-2">
              {isSv ? "Integritet & Dataskydd" : "Privacy"}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isSv
                ? "Vi värnar om den personliga integriteten för kunder, affärspartners, arbetssökande och besökare. Personuppgifter behandlas i strikt enlighet med svensk dataskyddslagstiftning och EU:s dataskyddsförordning (GDPR)."
                : "We respect the privacy of our clients, business partners, job applicants, and website visitors. Personal information is handled in accordance with Swedish data protection laws and the EU General Data Protection Regulation (GDPR)."}
            </p>
          </section>

          {/* Section 8: Applicable Law */}
          <section className="space-y-3" id="terms">
            <h2 className="text-base sm:text-lg font-semibold text-white tracking-wide border-b border-white/10 pb-2">
              {isSv ? "Tillämplig Lag & Jurisdiktion" : "Applicable Law"}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isSv
                ? "Norvian AB är registrerat i Sverige och verkar under svensk lag och Europeiska unionens regelverk."
                : "Norvian AB is registered in Sweden and operates under applicable Swedish and European Union laws."}
            </p>
          </section>

          {/* Bottom Copyright & Back Action */}
          <div className="pt-6 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div>© {new Date().getFullYear()} Norvian AB. {isSv ? "Med ensamrätt." : "All rights reserved."}</div>
            <button
              type="button"
              onClick={handleBack}
              className="inline-flex items-center gap-1.5 text-[#C59C58] hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{isSv ? "Gå tillbaka" : "Back to previous page"}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
