"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUp, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import CookieConsent from "@/components/CookieConsent";

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      const isHome = window.location.pathname === "/" || window.location.pathname === "";
      if (isHome) {
        const homeEl = document.getElementById("home") || document.getElementById("intro-manifesto");
        if (homeEl) {
          window.dispatchEvent(new CustomEvent("norvian:go-to-home"));
          const targetY = homeEl.getBoundingClientRect().top + window.scrollY;
          if ((window as any).lenis) {
            (window as any).lenis.start();
            (window as any).lenis.scrollTo(targetY, { duration: 1.1 });
          } else {
            window.scrollTo({ top: targetY, behavior: "smooth" });
          }
          if (window.location.hash !== "#home") {
            window.history.pushState(null, "", "/#home");
          }
          return;
        }
      }
      if (window.location.hash) {
        window.history.pushState(null, "", window.location.pathname);
      }
      if ((window as any).lenis) {
        (window as any).lenis.start();
        (window as any).lenis.scrollTo(0, { duration: 1.2 });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-[#0B1522] text-white pt-0 pb-12 sm:pb-16 relative overflow-hidden">
      {/* Subtle Gold Horizontal Accent Line */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C59C58]/60 to-transparent" />

      {/* Pre-Footer Statutory Corporate Badge & Impressum Tab */}
      <div className="border-b border-white/10 bg-[#070D16]/95 backdrop-blur-md py-3.5 sm:py-4 px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2.5 text-white/70">
            <span className="w-2 h-2 rounded-full bg-[#C59C58] animate-pulse" />
            <span className="font-mono text-[10.5px] sm:text-[11.5px] uppercase tracking-wider text-[#C59C58] font-bold">
              NORVIAN AB • ORG. NR: 559473-4997
            </span>
            <span className="text-white/30 hidden md:inline">•</span>
            <span className="text-white/60 hidden md:inline">
              Registered with Bolagsverket, Sweden
            </span>
          </div>

          <Link
            href="/impressum"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-[#C59C58] text-[#C59C58] hover:text-[#070D16] border border-[#C59C58]/40 hover:border-[#C59C58] font-semibold text-[11px] tracking-wider uppercase transition-all duration-300 group cursor-pointer shadow-sm"
          >
            <span>Impressum / Legal Notice</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-20">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 pb-10 sm:pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <Link
              href="/#home"
              onClick={(e) => {
                if (typeof window !== "undefined" && (window.location.pathname === "/" || window.location.pathname === "")) {
                  e.preventDefault();
                  scrollToTop();
                }
              }}
              className="inline-flex items-center gap-3.5 sm:gap-4 group cursor-pointer"
            >
              <Image
                src="/logo-white.png"
                alt="NORVIAN AB"
                width={180}
                height={150}
                className="h-12 sm:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col border-l border-white/15 pl-3.5 sm:pl-4">
                <span className="text-[10px] tracking-[0.25em] text-[#C59C58] font-semibold uppercase">
                  {t.nav.brandSub}
                </span>
                <span className="text-xs text-white/50 font-light mt-0.5">
                  Baumansgatan 4, 593 32 Västervik • Sweden
                </span>
              </div>
            </Link>

            <p className="text-sm text-white/70 font-light leading-relaxed max-w-sm pt-1 sm:pt-2">
              {t.footer.brandDesc}
            </p>

            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-[#C59C58]">
              <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/5 border border-[#C59C58]/30 tracking-wider uppercase text-[10px] font-semibold">
                {t.footer.hqNorway}
              </span>
              <span className="px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-white/5 border border-[#C59C58]/30 tracking-wider uppercase text-[10px] font-semibold">
                {t.footer.hubsAsia}
              </span>
              <LanguageToggle variant="dark" />
            </div>
          </div>

          {/* Quick Links Column 1: Sectors */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C59C58]">
              {t.footer.colSectors}
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-sm text-white/70 font-light">
              <li>
                <a href="#industries" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {t.footer.secShipbuilding}
                </a>
              </li>
              <li>
                <a href="#industries" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {t.footer.secConstruction}
                </a>
              </li>
              <li>
                <a href="#industries" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {t.footer.secTransport}
                </a>
              </li>
              <li>
                <a href="#industries" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {t.footer.secTrades}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Column 2: Company */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C59C58]">
              {t.footer.colCompany}
            </h4>
            <ul className="space-y-2.5 sm:space-y-3 text-sm text-white/70 font-light">
              <li>
                <a href="/about" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {t.nav.about}
                </a>
              </li>
              <li>
                <a href="/#why-norvian" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {t.nav.whyNorvian}
                </a>
              </li>
              <li>
                <a href="/#global-network" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {t.nav.globalCorridor}
                </a>
              </li>
              <li>
                <a href="/#deployment-process" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {t.nav.process}
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {t.nav.requestCta}
                </a>
              </li>
              <li>
                <Link href="/impressum" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-[#C59C58]/90">
                  Impressum / Legal Notice
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="lg:col-span-3 space-y-3 sm:space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C59C58]">
              {t.footer.colContact}
            </h4>
            <div className="space-y-2.5 sm:space-y-3 text-sm text-white/70 font-light">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C59C58] shrink-0 mt-0.5" />
                <span>{t.footer.address}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C59C58] shrink-0" />
                <a href={`tel:${t.footer.phone.replace(/\s+/g, '')}`} className="hover:text-white transition-colors">
                  {t.footer.phone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C59C58] shrink-0" />
                <a href={`mailto:${t.footer.email}`} className="hover:text-white transition-colors">
                  {t.footer.email}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-xs text-white/50 font-light text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} NORVIAN AB. {t.footer.copyright}
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4 sm:gap-6">
            <Link href="/impressum" className="hover:text-white text-[#C59C58] transition-colors font-medium">
              Impressum / Legal Notice
            </Link>
            <Link href="/impressum#privacy" className="hover:text-white transition-colors">
              {t.footer.privacy}
            </Link>
            <Link href="/impressum#terms" className="hover:text-white transition-colors">
              {t.footer.terms}
            </Link>
            <Link href="/impressum" className="hover:text-white transition-colors">
              {t.footer.complianceNotice}
            </Link>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("norvian:open-cookies"));
                }
              }}
              className="hover:text-white transition-colors cursor-pointer"
            >
              {(t.footer as any).cookies || "Cookie Settings"}
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-[#C59C58] hover:text-[#0B1522] text-white transition-all cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Global GDPR & ePrivacy Cookie Consent Drawer */}
      <CookieConsent />
    </footer>
  );
}
