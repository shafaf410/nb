"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    if (typeof window !== "undefined" && (window as any).lenis) {
      (window as any).lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-[#0B1522] text-white pt-16 pb-12 sm:pt-28 sm:pb-16 relative overflow-hidden">
      {/* Subtle Gold Horizontal Accent Line */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#C59C58]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-20">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-8 pb-10 sm:pb-16 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-5 sm:space-y-6">
            <Link href="/" className="inline-flex items-center gap-3.5 sm:gap-4 group">
              <Image
                src="/logo.png"
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
                  Oslo • Bergen • European Corridor
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
                <a href="#why-norvian" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {t.nav.whyNorvian}
                </a>
              </li>
              <li>
                <a href="#global-network" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {t.nav.globalCorridor}
                </a>
              </li>
              <li>
                <a href="#deployment-process" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {t.nav.process}
                </a>
              </li>
              <li>
                <a href="#request-form" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                  {t.nav.requestCta}
                </a>
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
            <a href="#" className="hover:text-white transition-colors">
              {t.footer.privacy}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {t.footer.terms}
            </a>
            <a href="#" className="hover:text-white transition-colors">
              {t.footer.complianceNotice}
            </a>
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
    </footer>
  );
}
