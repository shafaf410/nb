"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ShieldCheck, Users, FileCheck2, Scale, CheckCircle2, Award, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function WhyNorvianSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const topBeamRef = useRef<HTMLDivElement>(null);

  const icons = [Scale, Users, FileCheck2, ShieldCheck];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const headline = headlineRef.current;
    const cardsContainer = cardsContainerRef.current;
    const topBeam = topBeamRef.current;
    if (!section || !cardsContainer) return;

    const ctx = gsap.context(() => {
      // 1. Top Architectural Beam Trace
      if (topBeam) {
        gsap.fromTo(
          topBeam,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.1,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 2. Editorial Masked Headline Reveal
      if (headline) {
        const lines = headline.querySelectorAll(".headline-line");
        gsap.fromTo(
          lines,
          { yPercent: 100, opacity: 0, rotateX: 10 },
          {
            yPercent: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.1,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headline,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // 3. Staggered Hardware-Accelerated Rise Reveal for the 4 Cards
      const cards = cardsContainer.querySelectorAll(".pillar-card");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cardsContainer,
          start: "top 78%",
          toggleActions: "play none none none",
        },
      });

      tl.fromTo(
        cards,
        {
          opacity: 0,
          y: 50,
          scale: 0.95,
          rotateX: 6,
          transformOrigin: "bottom center",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1.0,
          rotateX: 0,
          stagger: 0.1,
          duration: 0.9,
          ease: "power3.out",
        }
      );

      // 4. Subtle internal line draw for each card's bottom border
      const bottomLines = cardsContainer.querySelectorAll(".card-bottom-line");
      tl.fromTo(
        bottomLines,
        { scaleX: 0 },
        {
          scaleX: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
        },
        "-=0.6"
      );

      // 5. Responsive parallax micro-movement on numbers as you continue scrolling
      const numbers = cardsContainer.querySelectorAll(".card-number");
      numbers.forEach((num) => {
        gsap.fromTo(
          num,
          { y: 15 },
          {
            y: -15,
            ease: "none",
            scrollTrigger: {
              trigger: num,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-norvian"
      className="py-24 sm:py-36 lg:py-44 bg-[#FAF7F2] relative border-t border-[#0B1522]/10 overflow-hidden"
      style={{ perspective: "1400px" }}
    >
      {/* Golden Architectural Beam line that draws across the section */}
      <div
        ref={topBeamRef}
        className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C59C58] to-transparent origin-left will-change-transform"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        
        {/* Top Tag & Accent Line */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-[10px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.25em] text-[#C59C58] flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#C59C58]" />
            {t.why.tag} // 03 REGULATORY PILLARS
          </span>
          <span className="h-[1px] w-12 sm:w-16 bg-[#C59C58]/60" />
        </div>

        {/* Large Editorial Headline with Masked Text Animation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16 sm:mb-20">
          <div className="lg:col-span-8">
            <h2
              ref={headlineRef}
              className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#0B1522] tracking-[-0.025em] leading-[1.08]"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="overflow-hidden py-1">
                <div className="headline-line will-change-transform">{t.why.titleLine1}</div>
              </div>
              <div className="overflow-hidden py-1">
                <div className="headline-line will-change-transform">{t.why.titleLine2}</div>
              </div>
              <div className="overflow-hidden py-1">
                <div className="headline-line text-[#C59C58] italic font-serif will-change-transform">
                  {t.why.titleAccent}
                </div>
              </div>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:pb-3">
            <p className="text-sm sm:text-base text-[#0B1522]/75 font-light leading-relaxed">
              {t.why.desc}
            </p>
          </div>
        </div>

        {/* 4 Architectural Benefit Cards with 3D Rise & Curtain Shutter Reveal */}
        <div
          ref={cardsContainerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
          style={{ transformStyle: "preserve-3d" }}
        >
          {t.why.pillars.map((item, idx) => {
            const Icon = icons[idx] || Award;
            return (
              <PillarCard
                key={item.number}
                number={item.number}
                subtitle={item.subtitle}
                title={item.title}
                description={item.description}
                stats={item.stats}
                Icon={Icon}
              />
            );
          })}
        </div>

      </div>
    </section>
  );
}

// Sub-component with 3D Tilt Micro-Interaction and Shutter Aesthetics
function PillarCard({
  number,
  subtitle,
  title,
  description,
  stats,
  Icon,
}: {
  number: string;
  subtitle: string;
  title: string;
  description: string;
  stats: string;
  Icon: any;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -6; // max 6deg
    const rotateY = ((x - centerX) / centerX) * 6;

    setTilt({
      x: rotateX,
      y: rotateY,
      glowX: (x / rect.width) * 100,
      glowY: (y / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glowX: 50, glowY: 50 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="pillar-card group relative flex flex-col justify-between rounded-3xl p-7 sm:p-8 bg-white/90 hover:bg-[#070D16] text-[#0B1522] hover:text-white border border-[#0B1522]/10 hover:border-[#C59C58]/60 shadow-[0_16px_36px_-12px_rgba(11,21,34,0.08)] hover:shadow-[0_30px_70px_-15px_rgba(11,21,34,0.45)] transition-colors duration-500 will-change-transform overflow-hidden"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: tilt.x === 0 ? "transform 0.5s ease-out, background-color 0.5s ease" : "background-color 0.5s ease",
      }}
    >
      {/* Interactive Cursor Light Sheen */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(circle 240px at ${tilt.glowX}% ${tilt.glowY}%, rgba(197, 156, 88, 0.15), transparent 70%)`,
        }}
      />

      {/* Top Number & Icon Row */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <span className="card-number font-serif text-3xl font-light tracking-widest text-[#C59C58] will-change-transform">
          {number}
        </span>
        
        <div className="w-12 h-12 rounded-2xl bg-[#0B1522]/5 group-hover:bg-white/10 border border-[#0B1522]/10 group-hover:border-[#C59C58]/40 flex items-center justify-center text-[#0B1522] group-hover:text-[#C59C58] transition-all duration-300 shadow-xs">
          <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-115" />
        </div>
      </div>

      {/* Typography Block */}
      <div className="space-y-3 flex-1 relative z-10 mb-6">
        <div className="text-[10px] font-mono uppercase font-bold tracking-[0.2em] text-[#C59C58]">
          {subtitle}
        </div>
        <h3 className="font-serif text-2xl font-normal leading-snug group-hover:text-white transition-colors duration-300">
          {title}
        </h3>
        <p className="text-xs text-[#0B1522]/70 group-hover:text-white/75 font-light leading-relaxed pt-1">
          {description}
        </p>
      </div>

      {/* Bottom Stat Pill with Animated Hairline Gold Draw */}
      <div className="pt-4 relative z-10">
        {/* Animated Line Draw on reveal */}
        <div className="card-bottom-line absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#C59C58]/60 to-transparent origin-left will-change-transform" />

        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] font-mono font-semibold tracking-wider text-[#C59C58]">
            {stats}
          </span>
          <CheckCircle2 className="w-4 h-4 text-[#C59C58] transition-transform duration-300 group-hover:scale-110" />
        </div>
      </div>
    </div>
  );
}
