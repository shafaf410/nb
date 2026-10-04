"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UserCheck, Award, Shield, FileCheck, Layers } from "lucide-react";

interface ProfessionalProfile {
  title: string;
  role: string;
  discipline: string;
  certification: string;
  deployment: string;
  experience: string;
  image: string;
  colorScheme: string;
}

export default function PeopleSection() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const creditsContainerRef = useRef<HTMLDivElement>(null);

  const [activeProfileIndex, setActiveProfileIndex] = useState(0);

  const profiles: ProfessionalProfile[] = [
    {
      title: "MECHANICAL ENGINEER",
      role: "Lead Pipe & Precision Fabrication Specialist",
      discipline: "HIGH-PRESSURE INDUSTRIAL SYSTEMS",
      certification: "ISO 9606-1 / 6G TIG TUV CERTIFIED",
      deployment: "NORTH SEA CONTINENTAL SHELF & BERGEN YARDS",
      experience: "12+ YEARS VERIFIED FIELD EXP",
      image: "/images/worker.jpg",
      colorScheme: "#070D16",
    },
    {
      title: "MARINE SPECIALIST",
      role: "Senior Hull & Propulsion Integration Lead",
      discipline: "OFFSHORE VESSEL RETROFIT & NAVAL DEFENSE",
      certification: "DNV GL MARITIME CLASSIFICATION WELDING",
      deployment: "STAVANGER & OSLO SHIPBUILDING CORRIDORS",
      experience: "14+ YEARS OFFSHORE DIRECTIVES",
      image: "/images/2.png",
      colorScheme: "#0B1522",
    },
    {
      title: "INFRASTRUCTURE LEAD",
      role: "Heavy Civil & Precast Structural Supervisor",
      discipline: "CONTINENTAL RAILWAYS & VIADUCT TUNNELING",
      certification: "EN 1090-2 EXECUTION CLASS EXC4",
      deployment: "SCANDINAVIAN TUNNEL & BRIDGE PROJECTS",
      experience: "10+ YEARS INFRASTRUCTURE",
      image: "/images/4.png",
      colorScheme: "#0A1420",
    },
    {
      title: "HEAVY INDUSTRY",
      role: "Continental Fleet & Heavy Haulage Master",
      discipline: "OVERSIZED MULTI-AXLE TRANSPORT & CRANE RIGGING",
      certification: "EU CODE 95 / ADR CLASS 1-9 HAZMAT",
      deployment: "CENTRAL EUROPE & TRANS-NORDIC ROUTES",
      experience: "16+ YEARS COMMERCIAL HAULAGE",
      image: "/images/5.png",
      colorScheme: "#060B12",
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const trigger = triggerRef.current;
    const pin = pinRef.current;
    if (!trigger || !pin) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      const count = profiles.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: "top top",
          end: "+=1200",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(count - 1, Math.floor(self.progress * count));
            setActiveProfileIndex(idx);
          },
        },
      });

      // Background subtle color transition between scenes
      tl.to(
        pin,
        {
          backgroundColor: "#060B12",
          ease: "none",
        },
        0
      );

      // Shutter clip-path & zoom parallax on the portraits
      const imgElements = pin.querySelectorAll(".portrait-layer");
      imgElements.forEach((el, i) => {
        if (i > 0) {
          const start = (i / count) - 0.05;
          tl.fromTo(
            el,
            {
              clipPath: "inset(0 100% 0 0)",
              scale: 1.12,
              yPercent: 4,
            },
            {
              clipPath: "inset(0 0% 0 0)",
              scale: 1.0,
              yPercent: -4,
              ease: "power2.inOut",
            },
            start
          );
        }
      });
    });

    return () => mm.revert();
  }, [profiles.length]);

  const activeProfile = profiles[activeProfileIndex] || profiles[0];

  return (
    <div
      ref={triggerRef}
      id="people-experience"
      className="relative bg-[#070D16] text-white"
    >
      {/* Pinned Desktop Viewport (100vh Full Screen) */}
      <div
        ref={pinRef}
        className="w-full lg:h-screen lg:overflow-hidden flex flex-col justify-between relative bg-[#070D16]"
      >
        {/* Top Film Credits HUD: Clean top padding */}
        <div className="relative z-30 pt-6 sm:pt-8 pb-2 px-6 sm:px-10 lg:px-16 w-full max-w-[1700px] mx-auto flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] text-[#C59C58] uppercase">
              DOCUMENTARY CREDITS // 04 PEOPLE OF INDUSTRY
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-white/50">
            <span>SEQUENCE</span>
            <span className="text-[#C59C58] font-bold">0{activeProfileIndex + 1}</span>
            <span>/ 04</span>
          </div>
        </div>

        {/* Central Documentary Stage */}
        <div className="relative flex-1 w-full max-w-[1700px] mx-auto px-6 sm:px-10 lg:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center my-2 min-h-0">
          
          {/* Left Column: Massive Cinematic Portrait with Shutter Aperture */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div
              ref={imageContainerRef}
              className="relative w-full max-w-[500px] aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 shadow-[0_30px_90px_rgba(0,0,0,0.85)] bg-black"
            >
              {profiles.map((prof, idx) => (
                <div
                  key={prof.title}
                  className={`portrait-layer absolute inset-0 w-full h-full transition-opacity duration-700 ${
                    idx === activeProfileIndex ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                  }`}
                >
                  <Image
                    src={prof.image}
                    alt={prof.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover object-top filter contrast-110"
                    priority={idx === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070D16] via-transparent to-black/20" />
                </div>
              ))}

              {/* Film Shutter Vignette Overlay */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
                <span className="text-[9px] font-mono tracking-widest uppercase text-white/70 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-sm border border-white/10">
                  VERIFIED IDENT // #{activeProfileIndex + 904}
                </span>
                <span className="text-[9px] font-mono tracking-widest uppercase text-[#C59C58] bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-sm border border-white/10">
                  APERTURE F/1.8
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
                <div className="text-[10px] font-mono text-[#C59C58] tracking-widest uppercase">
                  {activeProfile.experience}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Documentary Film Credits Typography — One line at a time */}
          <div
            ref={creditsContainerRef}
            className="lg:col-span-6 space-y-6 sm:space-y-8"
          >
            {/* Discipline Sequence Indicators */}
            <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest uppercase text-white/40">
              {["MECHANICAL ENGINEER", "MARINE", "INFRASTRUCTURE", "HEAVY INDUSTRY"].map((name, i) => (
                <span
                  key={name}
                  className={`transition-colors duration-300 ${
                    i === activeProfileIndex
                      ? "text-[#C59C58] font-bold underline underline-offset-4"
                      : "text-white/20"
                  }`}
                >
                  0{i + 1}
                </span>
              ))}
            </div>

            {/* Documentary Title Headline with Vertical Mask */}
            <div className="overflow-hidden">
              <h3
                key={activeProfile.title}
                className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-[-0.02em] leading-tight animate-fadeIn"
              >
                {activeProfile.title}
              </h3>
            </div>

            {/* One Line at a Time Credentials */}
            <div className="space-y-4 pt-4 border-t border-white/10 font-mono text-xs sm:text-sm">
              <div className="space-y-1">
                <span className="text-[10px] uppercase text-[#C59C58] tracking-widest block">
                  ROLE & OPERATIONAL CAPACITY
                </span>
                <div className="text-white/90 font-light">{activeProfile.role}</div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase text-[#C59C58] tracking-widest block">
                  PRIMARY INDUSTRIAL DISCIPLINE
                </span>
                <div className="text-white/80 font-light">{activeProfile.discipline}</div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase text-[#C59C58] tracking-widest block">
                  COMPLIANCE & EUROPEAN AUDIT
                </span>
                <div className="text-white/80 font-light flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-[#C59C58]" />
                  <span>{activeProfile.certification}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] uppercase text-[#C59C58] tracking-widest block">
                  ASSIGNED DESTINATION CORRIDORS
                </span>
                <div className="text-white/70 font-light">{activeProfile.deployment}</div>
              </div>
            </div>

            {/* Quote / Ethos */}
            <p className="font-serif italic text-base sm:text-lg text-white/60 pt-2 border-t border-white/5">
              &ldquo;Specialized mastery is not replaceable by volume. We deploy professionals who build Europe’s bedrock.&rdquo;
            </p>
          </div>

        </div>

        {/* Bottom Credits Status Bar */}
        <div className="relative z-30 px-6 sm:px-12 max-w-7xl mx-auto w-full flex items-center justify-between border-t border-white/10 pt-4 text-white/50 text-[10px] font-mono tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C59C58]" />
            <span>INDIVIDUALIZED VETTING PROTOCOL</span>
          </div>
          <div>SCROLL CONTINUITY // 60–120 FPS CALIBRATED</div>
        </div>

      </div>
    </div>
  );
}
