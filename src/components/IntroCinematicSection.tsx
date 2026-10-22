"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ShieldCheck, Compass, MoveDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface IntroCinematicSectionProps {
  onRequestWorkforce?: () => void;
}

export default function IntroCinematicSection({ onRequestWorkforce }: IntroCinematicSectionProps) {
  const { language, t } = useLanguage();
  const isSv = language === "sv";
  const sectionRef = useRef<HTMLElement>(null);
  const headlineLine1Ref = useRef<HTMLDivElement>(null);
  const headlineLine2Ref = useRef<HTMLDivElement>(null);
  const headlineLine3Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Gentle parallax on the inner photography as user scrolls through the manifesto section
      if (imageInnerRef.current) {
        gsap.fromTo(
          imageInnerRef.current,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.0,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intro-manifesto"
      className="relative min-h-[90vh] lg:min-h-screen flex items-center pt-20 sm:pt-28 lg:pt-20 pb-16 sm:pb-20 lg:pb-16 px-4 sm:px-8 lg:px-14 xl:px-16 overflow-hidden bg-[#FAF7F2] text-[#0B1522]"
    >
      {/* Right Scenic Truck Photography with Soft Feathered Edge (Desktop Only) */}
      <div
        ref={imageWrapperRef}
        className="hidden lg:block absolute top-0 right-0 bottom-0 w-[56%] xl:w-[53%] pointer-events-none select-none overflow-hidden z-0"
        style={{
          maskImage: "radial-gradient(ellipse 95% 85% at 75% 50%, black 45%, rgba(0,0,0,0.85) 65%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 95% 85% at 75% 50%, black 45%, rgba(0,0,0,0.85) 65%, transparent 100%)",
        }}
      >
        <div
          ref={imageInnerRef}
          className="relative w-full h-[115%] -top-[7%]"
        >
          <Image
            src="/images/norvian_truck.jpg"
            alt="NORVIAN AB Continental Transport and Heavy Logistics in Norway"
            fill
            sizes="55vw"
            className="object-cover object-[68%_center] brightness-[1.01] contrast-[1.02]"
            priority
          />

          {/* Smooth feathered dissolves that blend seamlessly with the #FAF7F2 cream background */}
          <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/85 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/75 to-transparent pointer-events-none" />
          <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/60 to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#FAF7F2]/40 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Decorative Sparkle Accent on Road (Desktop Only) */}
      <div className="absolute right-[8%] sm:right-[12%] lg:right-[13%] bottom-[12%] sm:bottom-[15%] pointer-events-none z-10 select-none opacity-60 hidden lg:block">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#C59C58] drop-shadow-xs">
          <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" fill="currentColor" />
        </svg>
      </div>

      {/* Main Content Area: Fully responsive on mobile, tablet, and desktop */}
      <div className="max-w-7xl mx-auto w-full relative z-20 pl-2 sm:pl-6 lg:pl-10">
        <div className="max-w-lg lg:max-w-[530px] xl:max-w-[580px]">
          
          {/* 1. Top Category Badge */}
          <div ref={badgeRef} className="flex items-center gap-2.5 sm:gap-4 mb-2.5 sm:mb-4">
            <span className="text-[9.5px] sm:text-[10.5px] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.26em] text-[#C59C58] flex items-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center justify-center w-3 h-3 rounded-full border border-[#C59C58] text-[7px] leading-none text-[#C59C58]">
                ☉
              </span>
              {isSv ? "NORVIAN AB • SVERIGE" : "NORVIAN AB • SWEDEN"}
            </span>
            <span className="h-[1px] w-8 sm:w-16 bg-[#C59C58]/55" />
            <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.18em] text-[#0B1522]/50 font-medium">
              {isSv ? "VÄSTERVIK // HELA EUROPA" : "VÄSTERVIK // ACROSS EUROPE"}
            </span>
          </div>

          {/* 2. Headline: YOUR INDUSTRY / OUR PEOPLE / ONE GOAL. */}
          <div className="space-y-0.5 sm:space-y-1 leading-[1.02]">
            <div
              ref={headlineLine1Ref}
              className="overflow-hidden py-0.5 leading-[1.02]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-normal tracking-[-0.03em] text-[#0B1522]">
                <span className="inline-block mr-2 sm:mr-3.5 word-item">
                  {isSv ? "ER" : "YOUR"}
                </span>
                <span className="inline-block word-item">
                  {isSv ? "INDUSTRI" : "INDUSTRY"}
                </span>
              </h1>
            </div>

            <div
              ref={headlineLine2Ref}
              className="overflow-hidden py-0.5 leading-[1.02]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="font-serif text-3xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-normal tracking-[-0.03em] text-[#0B1522]">
                <span className="inline-block mr-2 sm:mr-3.5 word-item">
                  {isSv ? "VÅRT" : "OUR"}
                </span>
                <span className="inline-block word-item">
                  {isSv ? "FOLK" : "PEOPLE"}
                </span>
              </div>
            </div>

            <div
              ref={headlineLine3Ref}
              className="overflow-hidden py-0.5 leading-[1.02]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-[54px] xl:text-[62px] font-normal tracking-[-0.03em] text-[#0B1522]">
                <span className="inline-block mr-2 sm:mr-3.5 word-item italic font-serif text-[#C59C58]">
                  {isSv ? "ETT" : "ONE"}
                </span>
                <span className="inline-block word-item italic font-serif text-[#C59C58]">
                  {isSv ? "MÅL." : "GOAL."}
                </span>
              </h2>
            </div>
          </div>

          {/* Subheading: Delivering Skilled Professionals Across Europe. */}
          <div className="mt-3.5 sm:mt-4 flex items-center gap-2.5 sm:gap-3">
            <span className="h-[1.5px] w-6 sm:w-8 bg-[#C59C58] shrink-0" />
            <p className="text-[14.5px] sm:text-[16.5px] lg:text-[17.5px] font-serif font-medium text-[#0B1522] tracking-[-0.01em] leading-snug">
              {isSv
                ? "Levererar kvalificerade yrkespersoner över hela Europa."
                : "Delivering Skilled Professionals Across Europe."}
            </p>
          </div>

          {/* Mobile Scenic Photography Card: Visible on mobile devices */}
          <div className="block lg:hidden relative w-full h-48 sm:h-60 my-4 sm:my-5 rounded-2xl overflow-hidden shadow-[0_12px_28px_rgba(11,21,34,0.12)] border border-[#C59C58]/30">
            <Image
              src="/images/norvian_truck.jpg"
              alt="NORVIAN AB Continental Transport and Heavy Logistics in Norway"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover object-[70%_center]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1522]/65 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-2.5 left-3 flex items-center gap-2">
              <span className="text-[9px] font-mono uppercase tracking-widest text-white/95 bg-black/60 px-2.5 py-1 rounded backdrop-blur-xs border border-white/10">
                {isSv ? "NORVIAN AB • SKANDINAVISK FLOTTA" : "NORVIAN AB • SCANDINAVIAN FLEET"}
              </span>
            </div>
          </div>

          {/* 3. Supporting Description Paragraphs */}
          <div
            ref={subtitleRef}
            className="mt-3 sm:mt-3.5 space-y-2.5 text-[13px] sm:text-[14px] lg:text-[14px] text-[#0B1522]/85 font-light leading-[1.62] max-w-[510px]"
          >
            <p>
              {isSv ? (
                <>
                  <strong className="font-semibold text-[#0B1522]">Norvian AB</strong> är ett erfaret svenskt bemanningsföretag baserat i Västervik, Sverige. Med över 1 000 framgångsrikt placerade arbetare tillhandahåller vi skickliga, erfarna och pålitliga yrkespersoner till industrier över hela Europa.
                </>
              ) : (
                <>
                  <strong className="font-semibold text-[#0B1522]">Norvian AB</strong> is an experienced Swedish manpower supply company based in Västervik, Sweden. With over 1,000 workers successfully placed, we provide skilled, experienced, and reliable professionals to industries across Europe.
                </>
              )}
            </p>
            <p>
              {isSv
                ? "Vi är specialiserade på bemanningslösningar för skeppsbyggnad, bygg & anläggning, tillverkning samt transport & logistik, och hjälper företag att möta sina kompetensbehov med trygghet."
                : "We specialize in manpower solutions for shipbuilding, construction, manufacturing, and transport & logistics, helping companies meet their workforce needs with confidence."}
            </p>
          </div>

          {/* 4. Request Workforce Action Button (Mobile Touch-Optimized) */}
          <div className="mt-6 sm:mt-7">
            <Link
              href="/contact"
              onClick={(e) => {
                if (onRequestWorkforce) {
                  e.preventDefault();
                  onRequestWorkforce();
                }
              }}
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 bg-[#0B1522] hover:bg-[#142337] text-white px-7 py-3.5 rounded-full text-[11.5px] font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_12px_24px_-6px_rgba(11,21,34,0.2)] border border-[#C59C58]/35 hover:border-[#C59C58] active:scale-95 cursor-pointer overflow-hidden"
            >
              <span>{t.nav.requestCta}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C59C58] transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
