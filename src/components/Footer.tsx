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
                <Link href="/team" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300 text-[#C59C58]/90">
                  {t.nav.team}
                </Link>
              </li>
              <li>
                <a href="/#why-norvian" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {t.nav.whyNorvian}
                </a>
              </li>
              <li>
                <Link href="/request" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {t.nav.requestCta}
                </Link>
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

            {/* Socials in Footer */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <a
                href="https://www.instagram.com/norvianab?srtk=M216aHY0OHcwb2lj&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#405DE6] flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
              >
                <svg
                  className="w-3.5 h-3.5 text-white fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/norvian-ab/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-xl bg-[#0A66C2] hover:bg-[#0077B5] flex items-center justify-center shadow-sm hover:scale-110 transition-all"
              >
                <svg
                  className="w-3.5 h-3.5 text-white fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/61596564929344/posts/pfbid02W5xsxW7a8D99yNcxEogBhGQ4PdLC6gYj4XWieYx5gqhHoTMv79k7XaYNaFDZojfhl/?"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-xl bg-[#1877F2] hover:bg-[#0C63D4] flex items-center justify-center shadow-sm hover:scale-110 transition-all"
              >
                <svg
                  className="w-3.5 h-3.5 text-white fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://x.com/norvianse/status/2121289561502302543?a=nliUubxlIoOObtPs_PE&s=20"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="w-8 h-8 rounded-xl bg-black border border-white/20 hover:border-white/50 flex items-center justify-center shadow-sm hover:scale-110 transition-all"
              >
                <svg
                  className="w-3 h-3 text-white fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://youtube.com/@norvianab?si=CHXBdVwTH7mq2W7i"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-xl bg-[#FF0000] hover:bg-[#CC0000] flex items-center justify-center shadow-sm hover:scale-110 transition-all"
              >
                <svg
                  className="w-3.5 h-3.5 text-white fill-current"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
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
