"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown, Anchor, Building2, Truck, Factory } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

interface NavbarProps {
  onRequestWorkforce: () => void;
  onGoHome?: () => void;
  showNav?: boolean;
}

export default function Navbar({ onRequestWorkforce, onGoHome, showNav = true }: NavbarProps) {
  const { t, language } = useLanguage();
  const isSv = language === "sv";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".services-dropdown-container")) {
        setServicesOpen(false);
      }
    };
    if (servicesOpen) {
      window.addEventListener("click", handleOutsideClick);
    }
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [servicesOpen]);

  const handleHomeClick = (e: React.MouseEvent) => {
    if (typeof window !== "undefined" && window.location.pathname !== "/") {
      return; // allow default Link navigation to "/#home"
    }
    e.preventDefault();
    if (typeof window !== "undefined" && window.location.hash !== "#home") {
      window.history.pushState(null, "", "/#home");
    }
    if (onGoHome) {
      onGoHome();
    } else if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("norvian:go-to-home"));
      const homeEl = document.getElementById("home") || document.getElementById("intro-manifesto");
      const targetY = homeEl ? homeEl.offsetTop : window.innerHeight;
      if ((window as any).lenis) {
        (window as any).lenis.start();
        (window as any).lenis.scrollTo(targetY, { duration: 1.1 });
      } else {
        window.scrollTo({ top: targetY, behavior: "smooth" });
      }
    }
  };

  const servicesItems = [
    {
      id: "shipbuilding",
      href: "/#service-shipbuilding",
      title: isSv ? "Skeppsbyggnad & Marint" : "Shipbuilding & Marine",
      desc: isSv ? "Varv, torrdockor & marint" : "Shipyards, dry docks & offshore",
      icon: Anchor,
      tag: "01",
    },
    {
      id: "construction",
      href: "/#service-construction",
      title: isSv ? "Bygg & Anläggning" : "Construction & Civil",
      desc: isSv ? "Infrastruktur & stålkonstruktion" : "Civil builds & structural steel",
      icon: Building2,
      tag: "02",
    },
    {
      id: "logistics",
      href: "/#service-logistics",
      title: isSv ? "Tung Logistik & Transport" : "Heavy Logistics & Fleet",
      desc: isSv ? "Åkeri & terminaldistribution" : "Freight transport & fleet logistics",
      icon: Truck,
      tag: "03",
    },
    {
      id: "industrial",
      href: "/#service-industrial",
      title: isSv ? "Industri & Tillverkning" : "Industrial Production & Trades",
      desc: isSv ? "Svets, CNC & mekanisk montering" : "Precision welding, CNC & assembly",
      icon: Factory,
      tag: "04",
    },
  ];

  const handleServiceSelect = (href: string) => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
    if (typeof window !== "undefined") {
      if (window.location.pathname === "/") {
        const hash = href.replace("/#", "");
        window.location.hash = hash;
      } else {
        window.location.href = href;
      }
    }
  };

  return (
    <>
      {/* Refined Single Floating Luxury Nordic Navbar */}
      <motion.header
        initial={{ y: -36, opacity: 0 }}
        animate={showNav ? { y: 0, opacity: 1 } : { y: -36, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-2.5 sm:top-5 left-0 right-0 z-50 pointer-events-none px-3 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto flex justify-center">
          <nav
            className={`${
              showNav ? "pointer-events-auto" : "pointer-events-none invisible"
            } relative w-full max-w-4xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#E2E8F0]/95 backdrop-blur-2xl py-2 px-3.5 sm:py-2.5 sm:px-6 rounded-full border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex items-center justify-between gap-3`}
          >
            {/* Shimmer inside overflow-hidden layer */}
            <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
              <motion.div
                initial={{ x: "-180%" }}
                animate={{ x: "220%" }}
                transition={{
                  repeat: Infinity,
                  duration: 8,
                  ease: "easeInOut",
                  repeatDelay: 3.5,
                }}
                className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 pointer-events-none"
              />
              <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent pointer-events-none" />
            </div>

            {/* Left: Prominent Official NORVIAN AB Crest */}
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={showNav ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex items-center shrink-0"
            >
              <Link
                href="/#home"
                onClick={handleHomeClick}
                className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer"
              >
                <Image
                  src="/logo.png"
                  alt="NORVIAN AB"
                  width={180}
                  height={144}
                  className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  priority
                />
                <div className="hidden lg:flex flex-col border-l border-slate-400/40 pl-3">
                  <span className="text-[8.5px] tracking-[0.22em] text-slate-700 font-semibold uppercase leading-tight">
                    {t.nav.brandSub}
                  </span>
                  <span className="text-[7.5px] tracking-[0.18em] text-[#9E7324] font-bold uppercase mt-0.5">
                    {isSv ? "Nordisk Arbetskraft • EU" : "Nordic Workforce • EU"}
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Center: Desktop Navigation Links (Home, Services Dropdown, About, Contact Us) */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={showNav ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:flex items-center gap-6 lg:gap-8 relative z-10"
            >
              {/* 1. Home Link */}
              <Link
                href="/#home"
                onClick={handleHomeClick}
                className="text-[12.5px] lg:text-[13px] font-semibold tracking-wide text-slate-800 hover:text-black transition-all duration-200 py-1.5 relative group hover:-translate-y-0.5"
              >
                <span>{t.nav.home || (isSv ? "Hem" : "Home")}</span>
                <span className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#C59C58] via-[#9E7324] to-[#C59C58] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-left" />
              </Link>

              {/* 2. Services with Dropdown Menu */}
              <div
                className="relative services-dropdown-container"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setServicesOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 text-[12.5px] lg:text-[13px] font-semibold tracking-wide text-slate-800 hover:text-black transition-all duration-200 py-1.5 relative group cursor-pointer"
                  aria-expanded={servicesOpen}
                >
                  <span>{t.nav.services}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-600 transition-transform duration-300 ${
                      servicesOpen ? "rotate-180 text-[#9E7324]" : "group-hover:text-black"
                    }`}
                  />
                  <span className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#C59C58] via-[#9E7324] to-[#C59C58] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-left" />
                </button>

                {/* Floating Luxury Frosted Glass Dropdown Menu */}
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-72 sm:w-80 p-2 rounded-2xl bg-[#E2E8F0]/98 backdrop-blur-2xl border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-50 overflow-hidden"
                    >
                      <div className="px-3 py-2 border-b border-slate-300/70 flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9E7324] font-bold">
                          {isSv ? "Specialiserade Branscher" : "Specialized Disciplines"}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      </div>

                      <div className="py-1 space-y-0.5">
                        {servicesItems.map((item) => {
                          const IconComponent = item.icon;
                          return (
                            <Link
                              key={item.id}
                              href={item.href}
                              onClick={(e) => {
                                e.preventDefault();
                                handleServiceSelect(item.href);
                              }}
                              className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-300/50 transition-all duration-200 group/item cursor-pointer text-left"
                            >
                              <div className="w-8 h-8 rounded-lg bg-white/80 group-hover/item:bg-[#C59C58] flex items-center justify-center shrink-0 border border-slate-300/60 shadow-xs transition-colors">
                                <IconComponent className="w-4 h-4 text-[#9E7324] group-hover/item:text-[#070D16] transition-colors" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-semibold text-slate-900 group-hover/item:text-black truncate">
                                    {item.title}
                                  </span>
                                  <span className="text-[9px] font-mono text-slate-500 group-hover/item:text-[#9E7324]">
                                    {item.tag}
                                  </span>
                                </div>
                                <p className="text-[10.5px] text-slate-600 truncate mt-0.5">
                                  {item.desc}
                                </p>
                              </div>
                            </Link>
                          );
                        })}
                      </div>

                      {/* All Services Overview Link */}
                      <div className="pt-1.5 border-t border-slate-300/70">
                        <Link
                          href="/#services"
                          onClick={() => setServicesOpen(false)}
                          className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-[#9E7324] hover:bg-[#C59C58]/15 transition-colors group/all cursor-pointer"
                        >
                          <span>{isSv ? "Visa alla branscher & översikt" : "View all services overview"}</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover/all:translate-x-1" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 2. About Link */}
              <Link
                href="/about"
                className="text-[12.5px] lg:text-[13px] font-semibold tracking-wide text-slate-800 hover:text-black transition-all duration-200 py-1.5 relative group hover:-translate-y-0.5"
              >
                <span>{t.nav.about}</span>
                <span className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#C59C58] via-[#9E7324] to-[#C59C58] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-left" />
              </Link>

              {/* 3. Contact Us Link */}
              <Link
                href="/contact"
                className="text-[12.5px] lg:text-[13px] font-semibold tracking-wide text-slate-800 hover:text-black transition-all duration-200 py-1.5 relative group hover:-translate-y-0.5"
              >
                <span>{t.nav.contactUs}</span>
                <span className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#C59C58] via-[#9E7324] to-[#C59C58] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-left" />
              </Link>
            </motion.div>

            {/* Right: Language toggle (eng/sw) + Request button */}
            <motion.div
              initial={{ opacity: 0, x: 14 }}
              animate={showNav ? { opacity: 1, x: 0 } : { opacity: 0, x: 14 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:flex items-center gap-3 relative z-10 shrink-0"
            >
              {/* Language Toggle (EN / SV) */}
              <LanguageToggle variant="pill" />

              {/* Request CTA Button */}
              <Link
                href="/contact"
                onClick={(e) => {
                  if (typeof window !== "undefined" && window.location.pathname === "/contact") {
                    e.preventDefault();
                    onRequestWorkforce?.();
                  }
                }}
                className="group relative inline-flex items-center justify-center bg-gradient-to-r from-[#C59C58] via-[#D8B474] to-[#C59C58] hover:from-[#D1A762] hover:to-[#DFBB7D] text-[#070D16] px-4.5 sm:px-5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.14em] uppercase transition-all duration-300 shadow-[0_4px_14px_rgba(197,156,88,0.35)] hover:shadow-[0_0_20px_rgba(197,156,88,0.5)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span className="relative z-10 font-bold">{t.nav.requestShort}</span>
              </Link>
            </motion.div>

            {/* Mobile Actions: Language toggle + Fast Request CTA & Hamburger */}
            <div className="flex md:hidden items-center gap-2 sm:gap-2.5 relative z-10 shrink-0">
              <LanguageToggle variant="pill" />

              <Link
                href="/contact"
                onClick={(e) => {
                  if (typeof window !== "undefined" && window.location.pathname === "/contact") {
                    e.preventDefault();
                    onRequestWorkforce?.();
                  }
                }}
                className="hidden sm:inline-flex bg-gradient-to-r from-[#C59C58] to-[#D8B474] text-[#070D16] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider active:scale-95 cursor-pointer"
              >
                {t.nav.requestShort}
              </Link>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 sm:p-2 text-slate-800 rounded-xl hover:bg-slate-300/60 focus:outline-none transition-colors touch-manipulation cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#9E7324]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Refined Glassmorphic Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Tap to Close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-3 top-16 sm:top-20 z-50 max-h-[85vh] overflow-y-auto md:hidden pointer-events-auto"
            >
              <div className="bg-[#E2E8F0]/98 backdrop-blur-2xl rounded-3xl p-5 sm:p-6 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.35)] border border-white/80 space-y-5 text-slate-900">
                {/* Header inside Mobile Drawer */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-300">
                  <Link
                    href="/#home"
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleHomeClick(e);
                    }}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Image
                      src="/logo.png"
                      alt="NORVIAN AB"
                      width={140}
                      height={112}
                      className="h-8 sm:h-9 w-auto object-contain"
                    />
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <LanguageToggle variant="pill" />
                  </div>
                </div>

                {/* Main Links with Home & Services Accordion */}
                <div className="flex flex-col space-y-1">
                  {/* Home Link */}
                  <Link
                    href="/#home"
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      handleHomeClick(e);
                    }}
                    className="flex items-center justify-between text-base font-serif font-medium text-slate-800 py-3 px-3.5 rounded-xl hover:bg-slate-300/40 transition-colors active:bg-slate-300/60"
                  >
                    <span>{t.nav.home || (isSv ? "Hem" : "Home")}</span>
                    <ArrowRight className="w-4 h-4 text-[#9E7324]" />
                  </Link>

                  {/* Services Accordion Button */}
                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => setMobileServicesOpen((prev) => !prev)}
                      className="w-full flex items-center justify-between text-base font-serif font-medium text-slate-800 py-3 px-3.5 rounded-xl hover:bg-slate-300/40 transition-colors cursor-pointer"
                    >
                      <span>{t.nav.services}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#9E7324] transition-transform duration-300 ${
                          mobileServicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Expandable Services list */}
                    <AnimatePresence>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-3 pr-1 space-y-1"
                        >
                          {servicesItems.map((item) => {
                            const IconComponent = item.icon;
                            return (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => handleServiceSelect(item.href)}
                                className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-slate-300/50 text-left text-xs font-semibold text-slate-800 cursor-pointer"
                              >
                                <div className="flex items-center gap-2.5">
                                  <IconComponent className="w-4 h-4 text-[#9E7324]" />
                                  <span>{item.title}</span>
                                </div>
                                <span className="text-[10px] font-mono text-slate-500">{item.tag}</span>
                              </button>
                            );
                          })}
                          <button
                            type="button"
                            onClick={() => handleServiceSelect("/#services")}
                            className="w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-bold text-[#9E7324] hover:bg-[#C59C58]/15 cursor-pointer"
                          >
                            <span>{isSv ? "Visa alla branscher →" : "View all services →"}</span>
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* About Link */}
                  <Link
                    href="/about"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-base font-serif font-medium text-slate-800 py-3 px-3.5 rounded-xl hover:bg-slate-300/40 transition-colors active:bg-slate-300/60"
                  >
                    <span>{t.nav.about}</span>
                    <ArrowRight className="w-4 h-4 text-[#9E7324]" />
                  </Link>

                  {/* Contact Us Link */}
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-base font-serif font-medium text-slate-800 py-3 px-3.5 rounded-xl hover:bg-slate-300/40 transition-colors active:bg-slate-300/60"
                  >
                    <span>{t.nav.contactUs}</span>
                    <ArrowRight className="w-4 h-4 text-[#9E7324]" />
                  </Link>
                </div>

                {/* Single Strong Action Button: Request */}
                <div className="pt-2">
                  <Link
                    href="/contact"
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (typeof window !== "undefined" && window.location.pathname === "/contact") {
                        e.preventDefault();
                        onRequestWorkforce?.();
                      }
                    }}
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#C59C58] via-[#D8B474] to-[#C59C58] text-[#070D16] py-3.5 rounded-2xl text-xs font-bold tracking-wider uppercase shadow-[0_4px_16px_rgba(197,156,88,0.35)] active:scale-98 cursor-pointer"
                  >
                    <span>{t.nav.requestCta}</span>
                    <ArrowRight className="w-4 h-4 text-[#070D16]" />
                  </Link>
                </div>

                {/* Mobile Drawer Key Contacts Preview */}
                <div className="pt-3 border-t border-slate-300 text-xs text-slate-600 space-y-1.5 font-light">
                  <div className="flex items-center gap-2 text-slate-800 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9E7324]" />
                    <span>{isSv ? "Direkt Ledning & Partners:" : "Direct Leadership & Partners:"}</span>
                  </div>
                  <p className="text-[11px] text-slate-600">
                    Bianka Bittlingmeier • Vinu Mohan • Isabelle Beyer
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
