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
      className="relative pt-8 sm:pt-12 lg:pt-14 pb-16 sm:pb-24 lg:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#FAF7F2] text-[#0B1522]"
      style={{ perspective: "1000px" }}
    >
      {/* Background Architectural Accent Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 border-x border-[#0B1522]/10" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Category Badge */}
        <div ref={badgeRef} className="flex items-center gap-3 mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-[#C59C58] flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-[#C59C58]" />
            THE NORVIAN MANIFESTO
          </span>
          <span className="h-[1px] w-12 sm:w-16 bg-[#C59C58]/60" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#0B1522]/50 font-medium">
            01 / CORRIDOR
          </span>
        </div>

        {/* Cinematic Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Left: Typography Choreography */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div className="space-y-1 sm:space-y-2">
              {/* Line 1: WE MOVE */}
              <div
                ref={headlineLine1Ref}
                className="overflow-hidden py-1 leading-[1.05]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-[-0.03em] text-[#0B1522]">
                  <span className="inline-block mr-3 sm:mr-5 word-item">WE</span>
                  <span className="inline-block word-item">MOVE</span>
                </h2>
              </div>

              {/* Line 2: WHAT MATTERS. */}
              <div
                ref={headlineLine2Ref}
                className="overflow-hidden py-1 leading-[1.05]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-normal tracking-[-0.03em] text-[#0B1522]">
                  <span className="inline-block mr-3 sm:mr-5 word-item italic text-[#C59C58]">WHAT</span>
                  <span className="inline-block word-item">MATTERS.</span>
                </h2>
              </div>
            </div>

            {/* Supporting Editorial Subtitle */}
            <p
              ref={subtitleRef}
              className="text-base sm:text-lg lg:text-xl text-[#0B1522]/75 font-light leading-relaxed max-w-xl"
            >
              Industry moves at the speed of human mastery. We engineer compliant, end-to-end workforce corridors connecting qualified specialists with Europe’s most demanding maritime shipyards, infrastructure projects, and strategic transport networks.
            </p>

            {/* Micro Details & Editorial Credentials */}
            <div ref={statsLineRef} className="pt-4 border-t border-[#0B1522]/10 flex flex-wrap items-center gap-6 sm:gap-10 text-xs sm:text-sm text-[#0B1522]/70 font-light">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59C58]" />
                <span className="font-medium text-[#0B1522]">DNV & ISO 9001</span> Verified
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59C58]" />
                <span className="font-medium text-[#0B1522]">100% Tax & Legal</span> Compliant
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C59C58]" />
                <span className="font-medium text-[#0B1522]">21-Day</span> Deployment Window
              </div>
            </div>

            {/* Direct Workforce Request Action */}
            {onRequestWorkforce && (
              <div className="pt-3">
                <button
                  onClick={onRequestWorkforce}
                  className="group inline-flex items-center gap-3 bg-[#0B1522] hover:bg-[#142337] text-white px-7 sm:px-8 py-3.5 sm:py-4 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 shadow-[0_16px_32px_-8px_rgba(11,21,34,0.25)] border border-[#C59C58]/40 active:scale-95 cursor-pointer overflow-hidden"
                >
                  <span>REQUEST WORKFORCE</span>
                  <ArrowRight className="w-4 h-4 text-[#C59C58] transition-transform duration-300 ease-out group-hover:translate-x-1.5" />
                </button>
              </div>
            )}
          </div>

          {/* Right: Shutter Masked Cinematic Photography */}
          <div className="lg:col-span-5 relative">
            <div
              ref={imageWrapperRef}
              className="relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[4/5] sm:aspect-[4/4.8] shadow-[0_25px_60px_-15px_rgba(11,21,34,0.22)] border border-[#0B1522]/12 bg-[#0B1522]"
            >
              <div
                ref={imageInnerRef}
                className="relative w-full h-[115%] -top-[7%]"
              >
                <Image
                  src="/images/1.jpg"
                  alt="NORVIAN Continental Movement and Precision Industrial Operations"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                  priority
                />
                {/* Filmic Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1522]/80 via-transparent to-black/20 pointer-events-none" />
              </div>

              {/* Shutter Camera Overlay Metadata */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="text-[10px] font-mono tracking-widest uppercase text-white/80 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                  REF // 01-MVMT
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#C59C58] bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                  SHUTTER 1/250s
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 pointer-events-none">
                <div className="text-[10px] uppercase font-bold tracking-[0.25em] text-[#C59C58] mb-1">
                  STRATEGIC LOGISTICS
                </div>
                <div className="font-serif text-xl sm:text-2xl text-white font-normal leading-snug">
                  Precision in Motion.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
