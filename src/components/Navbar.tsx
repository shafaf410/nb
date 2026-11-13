"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown, Anchor, Building2, Truck, Factory, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

interface NavbarProps {
  onRequestWorkforce?: () => void;
  onGoHome?: () => void;
  showNav?: boolean;
}

export default function Navbar({ onRequestWorkforce, onGoHome, showNav = true }: NavbarProps) {
  const { t, language } = useLanguage();
  const isSv = language === "sv";
  const isDe = language === "de";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);

  // Close desktop dropdowns on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".services-dropdown-container")) {
        setServicesOpen(false);
      }
      if (!target.closest(".contact-dropdown-container")) {
        setContactOpen(false);
      }
    };
    if (servicesOpen || contactOpen) {
      window.addEventListener("click", handleOutsideClick);
    }
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [servicesOpen, contactOpen]);

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
      title: isSv ? "Skeppsbyggnad & Marint" : isDe ? "Schiffbau & Marine" : "Shipbuilding & Marine",
      desc: isSv ? "Varv, torrdockor & marint" : isDe ? "Werften, Trockendocks & Offshore" : "Shipyards, dry docks & offshore",
      icon: Anchor,
      tag: "01",
    },
    {
      id: "construction",
      href: "/#service-construction",
      title: isSv ? "Bygg & Anläggning" : isDe ? "Bau & Infrastruktur" : "Construction & Civil",
      desc: isSv ? "Infrastruktur & stålkonstruktion" : isDe ? "Infrastruktur & Stahlbau" : "Civil builds & structural steel",
      icon: Building2,
      tag: "02",
    },
    {
      id: "logistics",
      href: "/#service-logistics",
      title: isSv ? "Tung Logistik & Transport" : isDe ? "Schwerlastlogistik & Flotte" : "Heavy Logistics & Fleet",
      desc: isSv ? "Åkeri & terminaldistribution" : isDe ? "Fernverkehr & Flottenlogistik" : "Freight transport & fleet logistics",
      icon: Truck,
      tag: "03",
    },
    {
      id: "industrial",
      href: "/#service-industrial",
      title: isSv ? "Industri & Tillverkning" : isDe ? "Industrie & Fertigung" : "Industrial Production & Trades",
      desc: isSv ? "Svets, CNC & mekanisk montering" : isDe ? "Präzisionsschweißen, CNC & Montage" : "Precision welding, CNC & assembly",
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
            } relative w-full max-w-5xl xl:max-w-6xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#E2E8F0]/95 backdrop-blur-2xl py-2 px-3.5 sm:py-2.5 sm:px-6 rounded-full border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex items-center justify-between gap-3`}
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
                <div className="hidden xl:flex flex-col border-l border-slate-400/40 pl-3">
                  <span className="text-[8.5px] tracking-[0.22em] text-slate-700 font-semibold uppercase leading-tight">
                    {t.nav.brandSub}
                  </span>
                  <span className="text-[7.5px] tracking-[0.18em] text-[#9E7324] font-bold uppercase mt-0.5">
                    {isSv ? "Nordisk Arbetskraft • EU" : "Nordic Workforce • EU"}
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Center: Desktop Navigation Links (Home, Services Dropdown, About, Team, Contact) */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={showNav ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:flex items-center gap-3.5 lg:gap-6 xl:gap-8 relative z-10 whitespace-nowrap shrink-0"
            >
              {/* 1. Home Link */}
              <Link
                href="/#home"
                onClick={handleHomeClick}
                className="whitespace-nowrap shrink-0 text-[12.5px] lg:text-[13px] font-semibold tracking-wide text-slate-800 hover:text-black transition-all duration-200 py-1.5 relative group hover:-translate-y-0.5"
              >
                <span>{t.nav.home || (isSv ? "Hem" : "Home")}</span>
                <span className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#C59C58] via-[#9E7324] to-[#C59C58] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-left" />
              </Link>

              {/* 2. Services with Dropdown Menu */}
              <div
                className="relative services-dropdown-container shrink-0"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setServicesOpen((prev) => !prev)}
                  className="flex items-center gap-1.5 whitespace-nowrap shrink-0 text-[12.5px] lg:text-[13px] font-semibold tracking-wide text-slate-800 hover:text-black transition-all duration-200 py-1.5 relative group cursor-pointer"
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
                          {isSv ? "Specialiserade Branscher" : isDe ? "Spezialisierte Branchen" : "Specialized Disciplines"}
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
                className="whitespace-nowrap shrink-0 text-[12.5px] lg:text-[13px] font-semibold tracking-wide text-slate-800 hover:text-black transition-all duration-200 py-1.5 relative group hover:-translate-y-0.5"
              >
                <span>{t.nav.about}</span>
                <span className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#C59C58] via-[#9E7324] to-[#C59C58] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-left" />
              </Link>

              {/* 3. Team Link */}
              <Link
                href="/team"
                className="whitespace-nowrap shrink-0 text-[12.5px] lg:text-[13px] font-semibold tracking-wide text-slate-800 hover:text-black transition-all duration-200 py-1.5 relative group hover:-translate-y-0.5"
              >
                <span>{t.nav.team}</span>
                <span className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#C59C58] via-[#9E7324] to-[#C59C58] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-left" />
              </Link>

              {/* 4. Contact Us with Dropdown (including Our Socials) */}
              <div
                className="relative contact-dropdown-container shrink-0"
                onMouseEnter={() => setContactOpen(true)}
                onMouseLeave={() => setContactOpen(false)}
              >
                <div className="flex items-center">
                  <Link
                    href="/contact"
                    className="whitespace-nowrap shrink-0 text-[12.5px] lg:text-[13px] font-semibold tracking-wide text-slate-800 hover:text-black transition-all duration-200 py-1.5 relative group"
                  >
                    <span>{t.nav.contactUs}</span>
                    <span className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-[#C59C58] via-[#9E7324] to-[#C59C58] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full origin-left" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => setContactOpen((prev) => !prev)}
                    className="p-1 -ml-0.5 text-slate-600 hover:text-black transition-colors cursor-pointer"
                    aria-label="Toggle contact & socials menu"
                    aria-expanded={contactOpen}
                  >
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-300 ${
                        contactOpen ? "rotate-180 text-[#9E7324]" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Floating Contact & Our Socials Dropdown */}
                <AnimatePresence>
                  {contactOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute right-0 top-full mt-3 w-72 sm:w-80 p-2.5 rounded-2xl bg-[#E2E8F0]/98 backdrop-blur-2xl border border-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.3)] z-50 overflow-hidden"
                    >
                      {/* Direct Contact Page Link */}
                      <Link
                        href="/contact"
                        onClick={() => setContactOpen(false)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-300/50 transition-all duration-200 group/contact cursor-pointer"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900 group-hover/contact:text-[#9E7324] transition-colors">
                            {isSv ? "Kontakta Oss" : isDe ? "Kontaktieren Sie Uns" : "Contact Office"}
                          </div>
                          <div className="text-[11px] text-slate-600 mt-0.5">
                            {isSv ? "Huvudkontor, formulär & direktteam" : isDe ? "Hauptsitz, Formular & Team" : "Headquarters, inquiry desk & team"}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#9E7324] group-hover/contact:translate-x-1 transition-transform" />
                      </Link>

                      {/* Header Strip for Our Socials */}
                      <div className="mt-2 pt-2.5 border-t border-slate-300/80 px-2 flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#9E7324] font-bold">
                          {isSv ? "Våra Sociala Medier" : isDe ? "Unsere Sozialen Medien" : "Our Socials"}
                        </span>
                        <span className="text-[9px] font-mono text-slate-500">
                          {isSv ? "Följ oss" : "Follow"}
                        </span>
                      </div>

                      {/* Social Channels List */}
                      <div className="mt-1 space-y-1">
                        {/* Instagram */}
                        <a
                          href="https://www.instagram.com/norvianab?srtk=M216aHY0OHcwb2lj&utm_source=qr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-300/60 transition-all group/insta"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#405DE6] flex items-center justify-center shrink-0 shadow-xs">
                              <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-900 group-hover/insta:text-[#E1306C] transition-colors">
                                Instagram
                              </div>
                              <div className="text-[10px] font-mono text-slate-500">
                                @norvianab
                              </div>
                            </div>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/insta:text-slate-700" />
                        </a>

                        {/* LinkedIn */}
                        <a
                          href="https://www.linkedin.com/company/norvian-ab/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-300/60 transition-all group/li"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-[#0A66C2] flex items-center justify-center shrink-0 shadow-xs">
                              <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-900 group-hover/li:text-[#0A66C2] transition-colors">
                                LinkedIn
                              </div>
                              <div className="text-[10px] font-mono text-slate-500">
                                Norvian AB
                              </div>
                            </div>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/li:text-slate-700" />
                        </a>

                        {/* Facebook */}
                        <a
                          href="https://www.facebook.com/61596564929344/posts/pfbid02W5xsxW7a8D99yNcxEogBhGQ4PdLC6gYj4XWieYx5gqhHoTMv79k7XaYNaFDZojfhl/?"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-300/60 transition-all group/fb"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-[#1877F2] flex items-center justify-center shrink-0 shadow-xs">
                              <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-900 group-hover/fb:text-[#1877F2] transition-colors">
                                Facebook
                              </div>
                              <div className="text-[10px] font-mono text-slate-500">
                                Norvian AB
                              </div>
                            </div>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/fb:text-slate-700" />
                        </a>

                        {/* X (formerly Twitter) */}
                        <a
                          href="https://x.com/norvianse/status/2121289561502302543?a=nliUubxlIoOObtPs_PE&s=20"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-300/60 transition-all group/x"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-black border border-slate-300/60 flex items-center justify-center shrink-0 shadow-xs">
                              <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-900 group-hover/x:text-black transition-colors">
                                X (Twitter)
                              </div>
                              <div className="text-[10px] font-mono text-slate-500">
                                @norvianse
                              </div>
                            </div>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/x:text-slate-700" />
                        </a>

                        {/* YouTube */}
                        <a
                          href="https://youtube.com/@norvianab?si=CHXBdVwTH7mq2W7i"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-300/60 transition-all group/yt"
                        >
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-[#FF0000] flex items-center justify-center shrink-0 shadow-xs">
                              <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-xs font-semibold text-slate-900 group-hover/yt:text-[#FF0000] transition-colors">
                                YouTube
                              </div>
                              <div className="text-[10px] font-mono text-slate-500">
                                @norvianab
                              </div>
                            </div>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover/yt:text-slate-700" />
                        </a>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* Right: Language toggle (eng/sw) + Request button */}
            <motion.div
              initial={{ opacity: 0, x: 14 }}
              animate={showNav ? { opacity: 1, x: 0 } : { opacity: 0, x: 14 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:flex items-center gap-2.5 lg:gap-3 relative z-10 shrink-0"
            >
              {/* Language Toggle (EN / SE) */}
              <LanguageToggle variant="pill" />

              {/* Request CTA Button */}
              <Link
                href="/request"
                onClick={(e) => {
                  if (typeof window !== "undefined" && window.location.pathname === "/request") {
                    e.preventDefault();
                    onRequestWorkforce?.();
                  }
                }}
                className="group relative inline-flex items-center justify-center bg-gradient-to-r from-[#C59C58] via-[#D8B474] to-[#C59C58] hover:from-[#D1A762] hover:to-[#DFBB7D] text-[#070D16] px-4.5 sm:px-5 py-1.5 rounded-full text-[11px] font-bold tracking-[0.14em] uppercase transition-all duration-300 shadow-[0_4px_14px_rgba(197,156,88,0.35)] hover:shadow-[0_0_20px_rgba(197,156,88,0.5)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap shrink-0"
              >
                <span className="relative z-10 font-bold whitespace-nowrap">{t.nav.requestShort}</span>
              </Link>
            </motion.div>

            {/* Mobile Actions: Language toggle + Fast Request CTA & Hamburger */}
            <div className="flex md:hidden items-center gap-2 sm:gap-2.5 relative z-10 shrink-0">
              <LanguageToggle variant="pill" />

              <Link
                href="/request"
                onClick={(e) => {
                  if (typeof window !== "undefined" && window.location.pathname === "/request") {
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

                  {/* Team Link */}
                  <Link
                    href="/team"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between text-base font-serif font-medium text-slate-800 py-3 px-3.5 rounded-xl hover:bg-slate-300/40 transition-colors active:bg-slate-300/60"
                  >
                    <span>{t.nav.team}</span>
                    <ArrowRight className="w-4 h-4 text-[#9E7324]" />
                  </Link>

                  {/* Contact Us Accordion / Link */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-base font-serif font-medium text-slate-800 py-3 px-3.5 rounded-xl hover:bg-slate-300/40 transition-colors">
                      <Link
                        href="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex-1"
                      >
                        <span>{t.nav.contactUs}</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => setMobileContactOpen((prev) => !prev)}
                        className="p-1 -mr-1 text-[#9E7324] cursor-pointer"
                        aria-label="Toggle socials accordion"
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-300 ${
                            mobileContactOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    {/* Expandable Socials in Mobile Drawer */}
                    <AnimatePresence>
                      {mobileContactOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-3 pr-1 space-y-1"
                        >
                          <a
                            href="https://www.instagram.com/norvianab?srtk=M216aHY0OHcwb2lj&utm_source=qr"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-300/50 text-xs font-semibold text-slate-800"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-5 h-5 rounded-md bg-gradient-to-tr from-[#FFDC80] via-[#FD1D1D] to-[#405DE6] flex items-center justify-center">
                                <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 24 24">
                                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                              </div>
                              <span>Instagram (@norvianab)</span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                          </a>
                          <a
                            href="https://www.linkedin.com/company/norvian-ab/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-300/50 text-xs font-semibold text-slate-800"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-5 h-5 rounded-md bg-[#0A66C2] flex items-center justify-center">
                                <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 24 24">
                                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                              </div>
                              <span>LinkedIn (Norvian AB)</span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                          </a>
                          <a
                            href="https://www.facebook.com/61596564929344/posts/pfbid02W5xsxW7a8D99yNcxEogBhGQ4PdLC6gYj4XWieYx5gqhHoTMv79k7XaYNaFDZojfhl/?"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-300/50 text-xs font-semibold text-slate-800"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-5 h-5 rounded-md bg-[#1877F2] flex items-center justify-center">
                                <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 24 24">
                                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                              </div>
                              <span>Facebook (Norvian AB)</span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                          </a>
                          <a
                            href="https://x.com/norvianse/status/2121289561502302543?a=nliUubxlIoOObtPs_PE&s=20"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-300/50 text-xs font-semibold text-slate-800"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-5 h-5 rounded-md bg-black flex items-center justify-center">
                                <svg className="w-2.5 h-2.5 text-white fill-current" viewBox="0 0 24 24">
                                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                              </div>
                              <span>X / Twitter (@norvianse)</span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                          </a>
                          <a
                            href="https://youtube.com/@norvianab?si=CHXBdVwTH7mq2W7i"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-300/50 text-xs font-semibold text-slate-800"
                          >
                            <div className="flex items-center gap-2.5">
                              <div className="w-5 h-5 rounded-md bg-[#FF0000] flex items-center justify-center">
                                <svg className="w-3 h-3 text-white fill-current" viewBox="0 0 24 24">
                                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                </svg>
                              </div>
                              <span>YouTube (@norvianab)</span>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                          </a>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Single Strong Action Button: Request */}
                <div className="pt-2">
                  <Link
                    href="/request"
                    onClick={(e) => {
                      setMobileMenuOpen(false);
                      if (typeof window !== "undefined" && window.location.pathname === "/request") {
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
                    Bianka Bittlingmeier • Vinu Mohan • Alina Aleksandriuk • Isabelle Beyer • Baiju Babu
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
