"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, ShieldCheck, Compass, MoveDown } from "lucide-react";

interface IntroCinematicSectionProps {
  onRequestWorkforce?: () => void;
}

export default function IntroCinematicSection({ onRequestWorkforce }: IntroCinematicSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineLine1Ref = useRef<HTMLDivElement>(null);
  const headlineLine2Ref = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const statsLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();

    // Only apply desktop-specific staggered opacity animations on large screens
    // On mobile devices, elements are rendered immediately at opacity: 1 so they are always visible!
    mm.add("(min-width: 1024px)", () => {
      // 1. Category Badge Reveal
      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Headline Words Staggered Reveal
      const words = section.querySelectorAll(".word-item");
      if (words.length > 0) {
        gsap.fromTo(
          words,
          { yPercent: 105, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.95,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headlineLine1Ref.current,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Subtitle Editorial Fade
      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 4. Trust Credentials Line
      if (statsLineRef.current) {
        gsap.fromTo(
          statsLineRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: statsLineRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 5. Image Wrapper Smooth Inset Reveal
      if (imageWrapperRef.current) {
        gsap.fromTo(
          imageWrapperRef.current,
          { opacity: 0, scale: 0.96, y: 30 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.05,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imageWrapperRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 6. Gentle parallax on the inner photography as user scrolls
      if (imageInnerRef.current) {
        gsap.fromTo(
          imageInnerRef.current,
          { yPercent: -4, scale: 1.05 },
          {
            yPercent: 4,
            scale: 1.0,
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
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intro-manifesto"
      className="relative min-h-[90vh] lg:h-screen lg:min-h-[680px] lg:max-h-[920px] flex items-center pt-16 sm:pt-24 lg:pt-0 pb-16 sm:pb-20 lg:pb-0 px-4 sm:px-8 lg:px-14 xl:px-16 overflow-hidden bg-[#FAF7F2] text-[#0B1522]"
    >
      {/* Background Architectural Accent Lines (Clean & Serene Guidelines) */}
      <div className="absolute inset-0 pointer-events-none select-none z-10 opacity-60">
        {/* Left vertical guideline */}
        <div className="absolute left-4 sm:left-8 lg:left-14 top-0 bottom-0 w-[1px] bg-[#C59C58]/30" />

        {/* Subtle geometric corner diamonds */}
        <div className="absolute left-4 sm:left-8 lg:left-14 top-16 sm:top-24 -translate-x-1/2 flex items-center justify-center">
          <div className="w-2 h-2 rotate-45 border border-[#C59C58]/55 bg-[#FAF7F2]" />
        </div>
        <div className="absolute left-4 sm:left-8 lg:left-14 bottom-16 sm:bottom-24 -translate-x-1/2 flex items-center justify-center">
          <div className="w-2 h-2 rotate-45 border border-[#C59C58]/55 bg-[#FAF7F2]" />
        </div>
      </div>

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
        <div className="max-w-lg lg:max-w-[490px] xl:max-w-[510px]">
          
          {/* 1. Top Category Badge */}
          <div ref={badgeRef} className="flex items-center gap-2.5 sm:gap-4 mb-2.5 sm:mb-4">
            <span className="text-[9.5px] sm:text-[10.5px] font-semibold uppercase tracking-[0.22em] sm:tracking-[0.26em] text-[#C59C58] flex items-center gap-1.5 sm:gap-2">
              <span className="inline-flex items-center justify-center w-3 h-3 rounded-full border border-[#C59C58] text-[7px] leading-none text-[#C59C58]">
                ☉
              </span>
              THE NORVIAN MANIFESTO
            </span>
            <span className="h-[1px] w-8 sm:w-16 bg-[#C59C58]/55" />
            <span className="text-[9.5px] sm:text-[10.5px] uppercase tracking-[0.18em] text-[#0B1522]/50 font-medium">
              01 / CORRIDOR
            </span>
          </div>

          {/* 2. Headline: WE MOVE WHAT MATTERS. */}
          <div className="space-y-0 leading-[0.98]">
            <div
              ref={headlineLine1Ref}
              className="overflow-hidden py-0.5 leading-[0.98]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h1 className="font-serif text-3xl sm:text-5xl lg:text-[66px] xl:text-[74px] font-normal tracking-[-0.03em] text-[#0B1522]">
                <span className="inline-block mr-2 sm:mr-4 word-item">WE</span>
                <span className="inline-block word-item">MOVE</span>
              </h1>
            </div>

            <div
              ref={headlineLine2Ref}
              className="overflow-hidden py-0.5 leading-[0.98]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-[66px] xl:text-[74px] font-normal tracking-[-0.03em] text-[#0B1522]">
                <span className="inline-block mr-2 sm:mr-4 word-item italic font-serif text-[#C59C58]">WHAT</span>
                <span className="inline-block word-item">MATTERS.</span>
              </h2>
            </div>
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
                NORVIAN AB • SCANDINAVIAN FLEET
              </span>
            </div>
          </div>

          {/* 3. Supporting Description Paragraph */}
          <p
            ref={subtitleRef}
            className="mt-3 sm:mt-5 text-[13.5px] sm:text-[15px] lg:text-[15.5px] text-[#0B1522]/80 font-light leading-[1.65] max-w-[460px]"
          >
            Industry moves at the speed of human mastery. We engineer compliant, end-to-end workforce corridors connecting qualified specialists with Europe’s most demanding maritime shipyards, infrastructure projects, and strategic transport networks.
          </p>

          {/* 4. The 3 Verified Credential Pills (Responsive flow on mobile) */}
          <div
            ref={statsLineRef}
            className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2 sm:gap-2.5"
          >
            <div className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white border border-[#0B1522]/12 shadow-[0_2px_6px_rgba(11,21,34,0.03)] text-[11px] sm:text-[11.5px] text-[#0B1522]/90 font-medium transition-all backdrop-blur-xs">
              <span className="text-[#C59C58] text-[11px]">☉</span>
              <span><strong className="font-semibold text-[#0B1522]">DNV & ISO 9001</strong> Verified</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white border border-[#0B1522]/12 shadow-[0_2px_6px_rgba(11,21,34,0.03)] text-[11px] sm:text-[11.5px] text-[#0B1522]/90 font-medium transition-all backdrop-blur-xs">
              <span className="text-[#C59C58] text-[11px]">☉</span>
              <span><strong className="font-semibold text-[#0B1522]">100% Tax & Legal</strong> Compliant</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white border border-[#0B1522]/12 shadow-[0_2px_6px_rgba(11,21,34,0.03)] text-[11px] sm:text-[11.5px] text-[#0B1522]/90 font-medium transition-all backdrop-blur-xs">
              <span className="text-[#C59C58] text-[11px]">☉</span>
              <span><strong className="font-semibold text-[#0B1522]">21-Day</strong> Deployment Window</span>
            </div>
          </div>

          {/* 5. Request Workforce Action Button (Mobile Touch-Optimized) */}
          {onRequestWorkforce && (
            <div className="mt-5 sm:mt-7">
              <button
                onClick={onRequestWorkforce}
                className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 bg-[#0B1522] hover:bg-[#142337] text-white px-7 py-3.5 rounded-full text-[11.5px] font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_12px_24px_-6px_rgba(11,21,34,0.2)] border border-[#C59C58]/35 hover:border-[#C59C58] active:scale-95 cursor-pointer overflow-hidden"
              >
                <span>REQUEST WORKFORCE</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C59C58] transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
