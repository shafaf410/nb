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

    const ctx = gsap.context(() => {
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
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="intro-manifesto"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center pt-24 sm:pt-28 lg:pt-32 pb-16 sm:pb-24 lg:pb-28 px-4 sm:px-6 lg:px-12 overflow-hidden bg-[#FAF7F2] text-[#0B1522]"
    >
      {/* Background Architectural Accent Lines (Matching Mockup Left Geometry) */}
      <div className="absolute inset-0 pointer-events-none select-none z-10 opacity-70">
        {/* Left vertical guideline */}
        <div className="absolute left-4 sm:left-8 lg:left-14 top-0 bottom-0 w-[1px] bg-[#C59C58]/35" />

        {/* Architectural diagonal and cross lines (Matching Mockup Far Left Geometry) */}
        <svg
          className="absolute left-0 top-0 bottom-0 h-full w-24 sm:w-32 stroke-[#C59C58]/30 stroke-[1px] pointer-events-none"
          fill="none"
        >
          {/* Diagonal intersecting lines */}
          <line x1="0" y1="60" x2="60" y2="120" />
          <line x1="0" y1="180" x2="60" y2="120" />
          <line x1="60" y1="120" x2="120" y2="60" />
          <line x1="0" y1="520" x2="60" y2="580" />
          <line x1="0" y1="640" x2="60" y2="580" />
          <line x1="60" y1="580" x2="120" y2="520" />
        </svg>

        {/* Subtle geometric corner diamonds */}
        <div className="absolute left-4 sm:left-8 lg:left-14 top-20 -translate-x-1/2 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rotate-45 border border-[#C59C58]/55 bg-[#FAF7F2]" />
        </div>
        <div className="absolute left-4 sm:left-8 lg:left-14 bottom-28 -translate-x-1/2 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rotate-45 border border-[#C59C58]/55 bg-[#FAF7F2]" />
        </div>
      </div>

      {/* Right Scenic Truck Photography with Soft Feathered Edge (Exact Match to Mockup) */}
      <div
        ref={imageWrapperRef}
        className="absolute top-0 right-0 bottom-0 w-full lg:w-[68%] xl:w-[65%] pointer-events-none select-none overflow-hidden z-0"
        style={{
          maskImage: "radial-gradient(ellipse 92% 82% at 72% 50%, black 42%, rgba(0,0,0,0.8) 65%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 92% 82% at 72% 50%, black 42%, rgba(0,0,0,0.8) 65%, transparent 100%)",
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
            sizes="(max-width: 1024px) 100vw, 68vw"
            className="object-cover object-[72%_center] sm:object-[68%_center] lg:object-[64%_center] xl:object-[62%_center] brightness-[1.01] contrast-[1.02]"
            priority
          />

          {/* Smooth feathered dissolves that blend seamlessly with the #FAF7F2 cream background */}
          {/* Left-edge smooth feather: dissolves over the text area */}
          <div className="absolute inset-y-0 left-0 w-full sm:w-[62%] lg:w-[50%] bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/90 to-transparent pointer-events-none" />
          
          {/* Bottom edge gentle fade */}
          <div className="absolute inset-x-0 bottom-0 h-40 sm:h-56 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent pointer-events-none" />
          
          {/* Top edge soft fade */}
          <div className="absolute inset-x-0 top-0 h-32 sm:h-44 bg-gradient-to-b from-[#FAF7F2] via-[#FAF7F2]/65 to-transparent pointer-events-none" />

          {/* Right edge soft fade */}
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#FAF7F2]/45 to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Decorative Sparkle Accent on Road (Matching Mockup Lower Right) */}
      <div className="absolute right-[8%] sm:right-[12%] lg:right-[14%] bottom-[12%] sm:bottom-[15%] pointer-events-none z-10 select-none opacity-70 hidden sm:block">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-[#C59C58] drop-shadow-sm">
          <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" fill="currentColor" />
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto w-full relative z-20 pl-2 sm:pl-8 lg:pl-14">
        <div className="max-w-xl lg:max-w-2xl space-y-6 sm:space-y-8">
          
          {/* 1. Top Category Badge (Matching Mockup ☉ THE NORVIAN MANIFESTO —— 01 / CORRIDOR) */}
          <div ref={badgeRef} className="flex items-center gap-3 sm:gap-4">
            <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C59C58] flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-3 h-3 rounded-full border border-[#C59C58] text-[7px] leading-none text-[#C59C58]">
                ☉
              </span>
              THE NORVIAN MANIFESTO
            </span>
            <span className="h-[1px] w-12 sm:w-20 bg-[#C59C58]/60" />
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] text-[#0B1522]/50 font-medium">
              01 / CORRIDOR
            </span>
          </div>

          {/* 2. Headline: WE MOVE WHAT MATTERS. */}
          <div className="space-y-0 sm:space-y-1">
            <div
              ref={headlineLine1Ref}
              className="overflow-hidden py-0.5 leading-[1.0]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-normal tracking-[-0.03em] text-[#0B1522]">
                <span className="inline-block mr-3 sm:mr-5 word-item">WE</span>
                <span className="inline-block word-item">MOVE</span>
              </h1>
            </div>

            <div
              ref={headlineLine2Ref}
              className="overflow-hidden py-0.5 leading-[1.0]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl xl:text-9xl font-normal tracking-[-0.03em] text-[#0B1522]">
                <span className="inline-block mr-3 sm:mr-5 word-item italic font-serif text-[#C59C58]">WHAT</span>
                <span className="inline-block word-item">MATTERS.</span>
              </h2>
            </div>
          </div>

          {/* 3. Supporting Description Paragraph */}
          <p
            ref={subtitleRef}
            className="text-sm sm:text-base lg:text-[16.5px] text-[#0B1522]/80 font-light leading-relaxed max-w-xl pt-1"
          >
            Industry moves at the speed of human mastery. We engineer compliant, end-to-end workforce corridors connecting qualified specialists with Europe’s most demanding maritime shipyards, infrastructure projects, and strategic transport networks.
          </p>

          {/* 4. The 3 Verified Credential Pills (Exact Match to Mockup) */}
          <div
            ref={statsLineRef}
            className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1"
          >
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2 rounded-full bg-white/80 hover:bg-white border border-[#0B1522]/15 shadow-[0_2px_8px_rgba(11,21,34,0.04)] text-xs text-[#0B1522]/90 font-medium transition-all backdrop-blur-xs">
              <span className="text-[#C59C58] text-xs">☉</span>
              <span><strong className="font-semibold text-[#0B1522]">DNV & ISO 9001</strong> Verified</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2 rounded-full bg-white/80 hover:bg-white border border-[#0B1522]/15 shadow-[0_2px_8px_rgba(11,21,34,0.04)] text-xs text-[#0B1522]/90 font-medium transition-all backdrop-blur-xs">
              <span className="text-[#C59C58] text-xs">☉</span>
              <span><strong className="font-semibold text-[#0B1522]">100% Tax & Legal</strong> Compliant</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2 rounded-full bg-white/80 hover:bg-white border border-[#0B1522]/15 shadow-[0_2px_8px_rgba(11,21,34,0.04)] text-xs text-[#0B1522]/90 font-medium transition-all backdrop-blur-xs">
              <span className="text-[#C59C58] text-xs">☉</span>
              <span><strong className="font-semibold text-[#0B1522]">21-Day</strong> Deployment Window</span>
            </div>
          </div>

          {/* 5. Request Workforce Action Button (Matching Mockup Dark Pill CTA) */}
          {onRequestWorkforce && (
            <div className="pt-2 sm:pt-4">
              <button
                onClick={onRequestWorkforce}
                className="group inline-flex items-center gap-3.5 bg-[#0B1522] hover:bg-[#142337] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_16px_32px_-8px_rgba(11,21,34,0.25)] border border-[#C59C58]/35 hover:border-[#C59C58] active:scale-95 cursor-pointer overflow-hidden"
              >
                <span>REQUEST WORKFORCE</span>
                <ArrowRight className="w-4 h-4 text-[#C59C58] transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
