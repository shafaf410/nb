"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  ArrowRight, 
  Anchor, 
  Building2, 
  Truck, 
  ChevronDown 
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";

interface NavbarProps {
  onRequestWorkforce: () => void;
  showNav?: boolean;
}

export default function Navbar({ onRequestWorkforce, showNav = true }: NavbarProps) {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: t.nav.industries, href: "#industries", badge: t.nav.industriesBadge, hasDropdown: true },
    { label: t.nav.globalCorridor, href: "#global-network", badge: t.nav.globalBadge },
    { label: t.nav.whyNorvian, href: "#why-norvian" },
    { label: t.nav.process, href: "#deployment-process" },
  ];

  const industrySubmenu = [
    {
      title: t.nav.shipbuildingTitle,
      desc: t.nav.shipbuildingDesc,
      href: "#industries",
      icon: Anchor,
    },
    {
      title: t.nav.constructionTitle,
      desc: t.nav.constructionDesc,
      href: "#industries",
      icon: Building2,
    },
    {
      title: t.nav.transportTitle,
      desc: t.nav.transportDesc,
      href: "#industries",
      icon: Truck,
    },
  ];

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
            className={`${showNav ? "pointer-events-auto" : "pointer-events-none invisible"} relative w-full max-w-5xl overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#070D16]/92 backdrop-blur-2xl py-2 px-3.5 sm:py-2.5 sm:px-6 rounded-full border border-white/[0.12] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] flex items-center justify-between gap-2`}
          >
            {/* Very Subtle Moving Light Reflection Across Surface */}
            <motion.div
              initial={{ x: "-180%" }}
              animate={{ x: "220%" }}
              transition={{
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
                repeatDelay: 3.5,
              }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.045] to-transparent -skew-x-12 pointer-events-none"
            />

            {/* Subtle top edge champagne highlight */}
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/[0.15] to-transparent pointer-events-none" />

            {/* Left: Prominent Official NORVIAN AB Crest */}
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={showNav ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 flex items-center shrink-0"
            >
              <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group">
                <Image
                  src="/logo.png"
                  alt="NORVIAN AB"
                  width={180}
                  height={144}
                  className="h-8 sm:h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  priority
                />
                <div className="hidden md:flex flex-col border-l border-white/15 pl-3 sm:pl-3.5">
                  <span className="text-[9px] sm:text-[9.5px] tracking-[0.24em] text-white/70 font-semibold uppercase leading-tight">
                    {t.nav.brandSub}
                  </span>
                  <span className="text-[7.5px] sm:text-[8px] tracking-[0.18em] text-[#C59C58] font-bold uppercase mt-0.5">
                    Nordic Workforce • EU
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Center: Desktop Navigation Links with Stagger and Refined Hover */}
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={showNav ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:flex items-center gap-5 xl:gap-7 relative z-10"
            >
              {navLinks.map((link) => (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => link.hasDropdown && setIndustriesOpen(true)}
                  onMouseLeave={() => link.hasDropdown && setIndustriesOpen(false)}
                >
                  <a
                    href={link.href}
                    className="text-[12.5px] xl:text-[13px] font-medium tracking-wide text-white/75 hover:text-white transition-all duration-200 py-2 group flex items-center gap-1.5 hover:-translate-y-0.5"
                  >
                    <span>{link.label}</span>
                    {link.hasDropdown ? (
                      <span className="inline-flex items-center gap-1 text-[9px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider bg-white/[0.08] text-[#E6C687] border border-white/12">
                        <span>{link.badge}</span>
                        <ChevronDown
                          className={`w-3 h-3 text-[#E6C687] transition-transform duration-300 ease-out ${
                            industriesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    ) : link.badge ? (
                      <span className="inline-flex items-center gap-1 text-[8.5px] px-2 py-0.5 rounded-full font-semibold uppercase tracking-wider bg-[#0C1B14] text-[#4ADE80] border border-[#22C55E]/25">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80] animate-pulse" />
                        <span>{link.badge}</span>
                      </span>
                    ) : null}
                  </a>

                  {/* Mega Menu Dropdown */}
                  {link.hasDropdown && (
                    <AnimatePresence>
                      {industriesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute top-full left-0 w-84 pt-3 z-50"
                        >
                          <div className="bg-[#070D16]/95 backdrop-blur-2xl rounded-2xl p-3 border border-white/[0.12] shadow-[0_25px_50px_-15px_rgba(0,0,0,0.8)] text-white">
                            <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C59C58] px-3 py-1.5 border-b border-white/10">
                              {t.nav.certifiedDisciplines}
                            </div>
                            <div className="space-y-1 mt-2">
                              {industrySubmenu.map((sub) => {
                                const Icon = sub.icon;
                                return (
                                  <a
                                    key={sub.title}
                                    href={sub.href}
                                    onClick={() => setIndustriesOpen(false)}
                                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/[0.08] transition-all group/sub"
                                  >
                                    <div className="w-8 h-8 rounded-lg bg-white/[0.06] group-hover/sub:bg-[#C59C58]/20 flex items-center justify-center shrink-0 text-[#C59C58] transition-colors mt-0.5">
                                      <Icon className="w-4 h-4" />
                                    </div>
                                    <div>
                                      <div className="text-xs font-semibold text-white/90 group-hover/sub:text-[#C59C58] transition-colors">
                                        {sub.title}
                                      </div>
                                      <div className="text-[10.5px] text-white/60 leading-snug mt-0.5">
                                        {sub.desc}
                                      </div>
                                    </div>
                                  </a>
                                );
                              })}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </motion.div>

            {/* Right: Simplified Controls + Single Strong CTA */}
            <motion.div
              initial={{ opacity: 0, x: 14 }}
              animate={showNav ? { opacity: 1, x: 0 } : { opacity: 0, x: 14 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:flex items-center gap-4 relative z-10 shrink-0"
            >
              {/* Refined Glassmorphic Language Toggle */}
              <LanguageToggle variant="dark" />

              {/* Single Strong CTA: Request Workforce Matching Mockup */}
              <button
                onClick={onRequestWorkforce}
                className="group relative inline-flex items-center justify-center bg-gradient-to-r from-[#C59C58] via-[#D8B474] to-[#C59C58] hover:from-[#D1A762] hover:to-[#DFBB7D] text-[#070D16] px-5 sm:px-6 py-2 rounded-full text-xs font-bold tracking-[0.14em] uppercase transition-all duration-300 shadow-[0_4px_16px_rgba(197,156,88,0.25)] hover:shadow-[0_0_24px_rgba(197,156,88,0.45)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span className="relative z-10 font-bold">{t.nav.requestShort}</span>
              </button>
            </motion.div>

            {/* Mobile Actions: Language toggle + Fast CTA & Hamburger */}
            <div className="flex lg:hidden items-center gap-2 sm:gap-2.5 relative z-10 shrink-0">
              <LanguageToggle variant="dark" />

              <button
                onClick={onRequestWorkforce}
                className="hidden sm:inline-flex bg-gradient-to-r from-[#C59C58] to-[#D8B474] text-[#070D16] text-[11px] font-bold px-3 py-1.5 rounded-full shadow-sm uppercase tracking-wider active:scale-95"
              >
                {t.nav.requestShort}
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 sm:p-2 text-white/90 rounded-xl hover:bg-white/10 focus:outline-none transition-colors touch-manipulation cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-[#C59C58]" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Refined Dark Glassmorphic Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Tap to Close */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-3 top-16 sm:top-20 z-50 max-h-[85vh] overflow-y-auto lg:hidden pointer-events-auto"
            >
              <div className="bg-[#070D16]/95 backdrop-blur-2xl rounded-3xl p-5 sm:p-6 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.85)] border border-white/[0.12] space-y-5 text-white">
                {/* Header Status inside Mobile Drawer */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                    <Image
                      src="/logo.png"
                      alt="NORVIAN AB"
                      width={140}
                      height={112}
                      className="h-8 sm:h-9 w-auto object-contain"
                    />
                  </Link>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <LanguageToggle variant="dark" />
                  </div>
                </div>

                {/* Main Links */}
                <div className="flex flex-col space-y-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between text-base font-serif font-medium text-white/90 py-3 px-3 rounded-xl hover:bg-white/[0.08] transition-colors active:bg-white/15"
                    >
                      <span>{link.label}</span>
                      {link.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-sans bg-white/[0.08] text-[#E6C687] font-semibold border border-white/10">
                          {link.badge}
                        </span>
                      )}
                    </a>
                  ))}
                </div>

                {/* Industry Quick Select */}
                <div className="bg-white/[0.04] rounded-2xl p-4 border border-white/10 space-y-2.5">
                  <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#C59C58]">
                    {t.nav.certifiedDisciplines}
                  </div>
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {industrySubmenu.map((sub) => {
                      const Icon = sub.icon;
                      return (
                        <a
                          key={sub.title}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-white/[0.08] text-xs font-medium text-white/80 transition-colors"
                        >
                          <Icon className="w-3.5 h-3.5 text-[#C59C58]" />
                          <span>{sub.title}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* Single Strong Action Button */}
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onRequestWorkforce();
                    }}
                    className="w-full inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#C59C58] via-[#D8B474] to-[#C59C58] text-[#070D16] py-3.5 rounded-2xl text-xs font-bold tracking-wider uppercase shadow-[0_0_24px_rgba(197,156,88,0.35)] active:scale-98 cursor-pointer"
                  >
                    <span>{t.nav.requestCta}</span>
                    <ArrowRight className="w-4 h-4 text-[#070D16]" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
