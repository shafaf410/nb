"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";
import { 
  X, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Anchor, 
  Building2, 
  Truck, 
  ChevronRight, 
  Sparkles,
  Award,
  Globe2,
  Clock,
  Users,
  FileCheck2,
  HardHat,
  ChevronDown,
  Building,
  Briefcase,
  CheckCircle2
} from "lucide-react";

export type ServiceKey = "shipbuilding" | "construction" | "logistics";

interface ServiceDetailPageProps {
  serviceKey: ServiceKey | null;
  onClose: () => void;
  onRequestForIndustry: (serviceName: string) => void;
  onSwitchService?: (serviceKey: ServiceKey) => void;
}

export const SERVICES_DATA: Record<
  ServiceKey,
  {
    id: ServiceKey;
    number: string;
    code: string;
    title: string;
    heading: string;
    badge: string;
    complianceBadges: string[];
    shortDescription: string;
    detailedDescription: string;
    workforce: string[];
    expertise: string[];
    ctaText: string;
    image: string;
    icon: typeof Anchor;
    stats: { value: string; label: string; sub: string }[];
    tradeSpecialties: { title: string; desc: string; certs: string }[];
    deploymentProcess: { step: string; title: string; desc: string }[];
    caseStudy: { project: string; clientType: string; timeline: string; impact: string };
    faqs: { q: string; a: string }[];
  }
> = {
  shipbuilding: {
    id: "shipbuilding",
    number: "01",
    code: "DISCIPLINE 01 / MARITIME",
    title: "Shipbuilding",
    heading: "Empowering Shipbuilders",
    badge: "DNV & ISO 9606-1 CERTIFIED",
    complianceBadges: ["DNV Standard", "ISO 9606-1 Welders", "Lloyd's Register Compliant", "Turnkey Mobilization"],
    shortDescription:
      "Skilled welders, fitters and marine specialists from Asia, supporting shipyards with the workforce needed to build, repair and maintain vessels.",
    detailedDescription:
      "Scandic Roots connects shipyards and marine engineering companies with skilled professionals for demanding shipbuilding projects. From steel fabrication to vessel assembly, we help employers source suitable talent to support project schedules, quality standards and operational requirements.",
    workforce: [
      "Certified Welders",
      "Ship Fitters",
      "Pipe Fitters",
      "Steel Fabricators",
      "Structural Fitters",
      "Marine Technicians",
      "Mechanical Fitters",
    ],
    expertise: [
      "Ship construction and assembly",
      "Hull fabrication and steelwork",
      "Welding and metal fabrication",
      "Marine piping and fitting",
      "Ship repair and maintenance",
    ],
    ctaText: "Find Shipbuilding Talent",
    image: "/images/shipbuilding_real.jpg",
    icon: Anchor,
    stats: [
      { value: "2–4 Wks", label: "Mobilization Time", sub: "Fast-track onboarding directly to shipyard gate" },
      { value: "100%", label: "DNV & ISO Verified", sub: "Rigorous 6G & multi-position pre-tested welders" },
      { value: "98.4%", label: "Contract Retention", sub: "High satisfaction across Nordic naval & commercial drydocks" },
      { value: "1,200+", label: "Marine Craftsmen", sub: "Successfully mobilized across Northern Europe" },
    ],
    tradeSpecialties: [
      {
        title: "Naval Certified Welders (141 / 135 / 136 / 111)",
        desc: "Experienced TIG, MIG/MAG, and Flux-Core welders tested in 6G/6GR positions on high-tensile naval steel, duplex, and aluminum superstructures.",
        certs: "ISO 9606-1 • DNV GL • Lloyd's Register",
      },
      {
        title: "Hull & Structural Steel Fitters",
        desc: "Precision heavy plate assembly, 3D laser-aligned sub-blocks, frame erection, and fairing for commercial cargo, offshore vessels, and cruise ships.",
        certs: "Naval Blueprint Mastery • NDT Visual VT-2",
      },
      {
        title: "High-Pressure Marine Pipe Fitters",
        desc: "Fabrication, spooling, and installation of ballast, fuel, hydraulic, and fire extinguishing piping systems under strict maritime pressure tolerances.",
        certs: "ASME IX • EN ISO 15614 • Flange Alignment",
      },
      {
        title: "Marine Mechanical & Propulsion Technicians",
        desc: "Engine room overhaul, shaft line alignment, thruster and rudder servicing, valve installation, and auxiliary machinery maintenance.",
        certs: "STCW Orientation • OEM Engine System Training",
      },
    ],
    deploymentProcess: [
      {
        step: "01",
        title: "Technical Scoping & Weld Procedure Matching",
        desc: "We analyze your shipyard's WPS (Welding Procedure Specifications), project blueprints, and delivery milestones to formulate exact crew profiles.",
      },
      {
        step: "02",
        title: "Hands-On Trade Testing & Third-Party Inspection",
        desc: "Candidates perform live welding tests, radiography (RT/UT), and pipe-fitting mockups evaluated by European-accredited testing officers in Asia.",
      },
      {
        step: "03",
        title: "Turnkey Nordic Legal, Visa & Tax Processing",
        desc: "We coordinate fast-track European work permits, consular visas, D-numbers / tax registrations, health checks, and mandatory maritime safety courses.",
      },
      {
        step: "04",
        title: "Shipyard Mobilization & On-Site Supervision",
        desc: "Crews arrive with safety gear and lodging arranged. A dedicated bilingual coordinator assists with daily shift briefings, safety, and integration.",
      },
    ],
    caseStudy: {
      project: "240-Meter Commercial Cruise Vessel Dry Dock Refit",
      clientType: "Leading Northern European Naval Shipyard",
      timeline: "65 Welders & Fitters Deployed in 22 Days",
      impact: "Zero weld rejection rate on initial ultrasound inspection (NDT Level II); completed hull reinforcement 6 days ahead of dry dock schedule.",
    },
    faqs: [
      {
        q: "How do you ensure candidate welders meet Scandinavian shipyard quality standards?",
        a: "Every candidate undergoes live test coupons in certified Asian test facilities evaluated against your exact Welding Procedure Specifications (WPS). We inspect all welds using Non-Destructive Testing (Visual, Ultrasonic, and X-ray) before visa submission.",
      },
      {
        q: "Who handles flights, accommodation, and Scandinavian tax registration?",
        a: "Scandic Roots handles the entire operational lifecycle: international travel, local Scandinavian housing near the yard, work permits, D-number/tax registrations, insurance, and mandatory shipyard safety inductions.",
      },
      {
        q: "What is your replacement guarantee if a worker does not match our requirements?",
        a: "We provide an ironclad 48-hour replacement guarantee. If any technician does not meet on-site quality benchmarks during the initial trial period, we substitute them at zero additional cost to your yard.",
      },
      {
        q: "Do your marine technicians communicate in English?",
        a: "Yes. All selected professionals speak professional working English. Furthermore, each larger deployment includes an on-site bilingual coordinator to ensure smooth daily communication between yard foremen and workers.",
      },
    ],
  },
  construction: {
    id: "construction",
    number: "02",
    code: "DISCIPLINE 02 / CIVIL",
    title: "Construction",
    heading: "Building Stronger Futures",
    badge: "EN 1090 & ISO 45001 CERTIFIED",
    complianceBadges: ["EN 1090 Steel", "ISO 45001 Safety", "Eurocode Compliant", "Pre-Tested Trade Skills"],
    shortDescription:
      "Reliable construction professionals and skilled tradespeople to support infrastructure, commercial and industrial projects.",
    detailedDescription:
      "We help construction companies source skilled workers who can contribute to projects of different sizes and complexities. Our focus is on connecting employers with suitable candidates whose practical skills and experience match the demands of the job.",
    workforce: [
      "Construction Workers",
      "Welders",
      "Steel Fabricators",
      "Structural Fitters",
      "Concrete Workers",
      "Mechanical Installers",
      "General Skilled Tradespeople",
    ],
    expertise: [
      "Industrial construction",
      "Structural steel installation",
      "Infrastructure development",
      "Commercial construction",
      "On-site technical and trade support",
    ],
    ctaText: "Find Construction Talent",
    image: "/images/construction_real.jpg",
    icon: Building2,
    stats: [
      { value: "14–21 Days", label: "Crew Deployment", sub: "Rapid on-site mobilization across Scandinavia" },
      { value: "EN 1090", label: "Structural Compliance", sub: "Fully certified structural steel erectors & riggers" },
      { value: "0 Incidents", label: "Safety Orientation", sub: "Mandatory pre-departure Nordic HSE induction" },
      { value: "850+", label: "Tradespeople Mobilized", sub: "Battery gigafactories, bridges & industrial hubs" },
    ],
    tradeSpecialties: [
      {
        title: "EN 1090 Structural Steel Erectors",
        desc: "Certified riggers and erectors for high-altitude steel frameworks, multi-story industrial halls, crane runways, and pre-engineered metal buildings.",
        certs: "EN 1090 Execution Class 2/3 • High-Altitude IPAF",
      },
      {
        title: "Industrial Formwork & Concrete Specialists",
        desc: "Expert assembly of Doka, PERI, and Paschal modular formwork systems, heavy rebar tying, slipform casting, and industrial slab finishing.",
        certs: "Eurocode 2 Concrete • Crane Rigging Slinger",
      },
      {
        title: "Heavy Mechanical & MEP Plant Installers",
        desc: "Assembly and positioning of industrial manufacturing equipment, HVAC ductwork networks, overhead crane rails, and conveyor transport belts.",
        certs: "Machinery Alignment • Torque Verification",
      },
      {
        title: "Infrastructure & Civil Works Trades",
        desc: "Highway retaining structures, bridge piers, pre-cast concrete tunnel elements, drainage networks, and heavy foundation works.",
        certs: "Scandinavian ID06 / ByggID • ISO 45001 Safety",
      },
    ],
    deploymentProcess: [
      {
        step: "01",
        title: "Project Scope & Crew Skill Specification",
        desc: "We analyze your architectural schedules, site timeline, and trade quotas to construct tailored crews of foremen, journeymen, and installers.",
      },
      {
        step: "02",
        title: "Trade Competency Assessment & Background Verification",
        desc: "Candidates undergo rigorous practical trade examinations in simulated building conditions, safety testing, and verified employment audits.",
      },
      {
        step: "03",
        title: "European Documentation & Site ID Registration",
        desc: "Full legal visa issuance, local tax registrations (D-number / Skatteverket), European health cover, and registration on Scandinavian site platforms (ID06).",
      },
      {
        step: "04",
        title: "On-Site Delivery, Tooling & Safety Induction",
        desc: "Workers arrive equipped with compliant winter/summer PPE, tools, and local transport. An on-site supervisor oversees smooth project integration.",
      },
    ],
    caseStudy: {
      project: "80,000 m² Battery Gigafactory & Logistics Hub",
      clientType: "Tier-1 Scandinavian General Contractor",
      timeline: "50 Structural Steel & Concrete Specialists in 18 Days",
      impact: "Accelerated structural envelope completion by 3 weeks, enabling interior mechanical fit-out to begin ahead of winter freeze.",
    },
    faqs: [
      {
        q: "Are the construction workers familiar with Scandinavian weather and safety regulations?",
        a: "Yes. All workers complete extensive Nordic Health, Safety, and Environment (HSE) orientation before departure. They are trained in cold-weather construction practices, fall prevention, scaffolding safety, and Scandinavian site conduct.",
      },
      {
        q: "Do workers come with their own personal protective equipment (PPE)?",
        a: "Yes. Scandic Roots equips all deployed professionals with European-standard CE/EN certified PPE, including high-visibility thermal clothing, safety helmets, steel-toe boots, and safety harnesses.",
      },
      {
        q: "Can you provide smaller specialized crews or large multi-disciplinary teams?",
        a: "We support both. We routinely supply agile crews of 4 to 8 specialist steel erectors as well as complete turnkey teams of 40 to 80 mixed civil, concrete, and mechanical workers for major industrial projects.",
      },
      {
        q: "How are local accommodations and site commuting handled?",
        a: "We source and manage all furnished housing near your construction site, coordinate local crew vans for daily site transport, and manage all utility and tenancy logistics.",
      },
    ],
  },
  logistics: {
    id: "logistics",
    number: "03",
    code: "DISCIPLINE 03 / FLEET",
    title: "Transport & Logistics",
    heading: "Driving Logistics Forward",
    badge: "EU CODE 95 & ADR CERTIFIED",
    complianceBadges: ["EU Code 95 CPC", "ADR Dangerous Goods", "Tachograph Verified", "Nordic Winter Ready"],
    shortDescription:
      "Experienced truck and trailer drivers to help transport and logistics companies keep goods moving and operations running smoothly.",
    detailedDescription:
      "Scandic Roots supports transport businesses by connecting them with suitable professional drivers for their operational needs. We focus on relevant driving experience, role requirements and the documentation necessary for employment and legal driving eligibility in the destination country.",
    workforce: [
      "Heavy Goods Vehicle (HGV) Drivers",
      "Truck Drivers",
      "Trailer Drivers",
      "Long-Haul Drivers",
      "Freight Transport Drivers",
    ],
    expertise: [
      "Long-distance freight transport",
      "Commercial vehicle operations",
      "Trailer and heavy vehicle driving",
      "Transport workforce sourcing",
      "Driver qualification and documentation coordination",
    ],
    ctaText: "Find Qualified Drivers",
    image: "/images/norvian_truck.jpg",
    icon: Truck,
    stats: [
      { value: "Code 95", label: "EU CPC Certified", sub: "100% compliant commercial articulated driving licenses" },
      { value: "5M+ Km", label: "Nordic Winter Haulage", sub: "Trained on extreme ice, snow & mountain corridors" },
      { value: "48 Hours", label: "Emergency Replacement", sub: "Guaranteed driver continuity for peak freight lanes" },
      { value: "650+", label: "HGV / CE Drivers", sub: "Successfully mobilized for European logistics fleets" },
    ],
    tradeSpecialties: [
      {
        title: "Class CE Articulated Long-Haul Drivers",
        desc: "Experienced operators for 40-tonne semi-trailers, curtain-siders, box trailers, and intermodal sea-container transport across Scandinavian highways.",
        certs: "EU Driving License CE • Digital Tachograph Card",
      },
      {
        title: "Temperature-Controlled & Reefer Haulage",
        desc: "Specialized drivers trained in cold-chain integrity, food and pharmaceutical transport protocols, Thermo King/Carrier unit monitoring, and HACCP rules.",
        certs: "ATP Certificate • Cold-Chain Monitoring",
      },
      {
        title: "ADR Dangerous Goods Transport Specialists",
        desc: "Certified chemical, petroleum, and pressurized gas transport drivers trained in hazardous materials handling, spill response, and safety protocols.",
        certs: "ADR Tank & Package Certificate • Emergency Handling",
      },
      {
        title: "Severe Winter & Mountain Corridor Pilots",
        desc: "Extensive practical experience handling Nordic winter conditions, including snow chain fitting, black ice negotiation, and mountain pass descents.",
        certs: "Nordic Winter Driving Certified • Eco-Driving",
      },
    ],
    deploymentProcess: [
      {
        step: "01",
        title: "Fleet Requirements & Route Profiling",
        desc: "We analyze your fleet composition (Scania, Volvo, MAN), transmission systems, route profiles (domestic Nordic, trans-European), and schedule types.",
      },
      {
        step: "02",
        title: "Simulator & Practical Driving Examination",
        desc: "Drivers undergo maneuvering tests, reversing into loading docks, coupling procedures, tachograph regulation quizzes, and alcohol/drug screenings.",
      },
      {
        step: "03",
        title: "EU License Conversion & Code 95 Accreditation",
        desc: "We manage European driver license verification, Code 95 Certificate of Professional Competence, digital tachograph cards, and residence permits.",
      },
      {
        step: "04",
        title: "Fleet Integration & Route Familiarization",
        desc: "Drivers arrive at your logistics terminal ready for route orientation. We support dispatchers with ongoing communication and driver welfare.",
      },
    ],
    caseStudy: {
      project: "Nordic Peak Seasonal E-Commerce & Grocery Freight Corridor",
      clientType: "International Logistics & Freight Forwarder",
      timeline: "45 Class CE Articulated Drivers Mobilized in 25 Days",
      impact: "Maintained 99.6% on-time delivery metric during peak pre-Christmas winter blizzard conditions with zero major driving incidents.",
    },
    faqs: [
      {
        q: "Do all drivers possess valid EU Code 95 and digital driver cards?",
        a: "Yes. Every driver deployed through Scandic Roots arrives with valid EU-recognized Class CE qualifications, Code 95 CPC accreditation, and an active digital tachograph smart card for full legal compliance.",
      },
      {
        q: "Are the drivers tested on modern European commercial vehicles?",
        a: "All drivers have extensive operational experience driving modern Euro 6 commercial tractor-trailers (Volvo FH, Scania R/S series, Mercedes-Benz Actros) with automated and manual transmissions.",
      },
      {
        q: "How do you verify drivers' understanding of EU driving hours and rest periods?",
        a: "Drivers must pass a comprehensive examination on European Regulation (EC) No 561/2006 governing driving times, rest breaks, and tachograph recording rules before receiving visa clearance.",
      },
      {
        q: "Can drivers handle extreme Scandinavian winter driving conditions?",
        a: "Yes. Drivers complete practical training on snow chain installation, slippery surface vehicle recovery, defensive winter driving, and mountain pass navigation prior to arriving in the Nordics.",
      },
    ],
  },
};

export default function ServiceDetailPage({
  serviceKey,
  onClose,
  onRequestForIndustry,
  onSwitchService,
}: ServiceDetailPageProps) {
  const shouldReduceMotion = useReducedMotion();
  const pageContainerRef = useRef<HTMLDivElement>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Keyboard navigation & body scroll lock with scroll restoration
  useEffect(() => {
    if (!serviceKey) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Save scroll position and lock background
    const prevScrollY = window.scrollY;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      // Ensure background scroll position is strictly preserved
      if (typeof window !== "undefined") {
        window.scrollTo(0, prevScrollY);
      }
    };
  }, [serviceKey, onClose]);

  if (!serviceKey) return null;

  const data = SERVICES_DATA[serviceKey];
  const Icon = data.icon;

  // MacBook Opening Animation:
  // Scales up gently from the trigger area into full-screen with subtle lid-tilt perspective
  const macBookAnimationVariants: Variants = {
    initial: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          scale: 0.94,
          rotateX: 7,
          y: 24,
          transformOrigin: "bottom center",
        },
    animate: shouldReduceMotion
      ? { opacity: 1 }
      : {
          opacity: 1,
          scale: 1,
          rotateX: 0,
          y: 0,
          transformOrigin: "bottom center",
          transition: {
            duration: 0.42,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          },
        },
    exit: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          scale: 0.95,
          rotateX: 5,
          y: 18,
          transformOrigin: "bottom center",
          transition: {
            duration: 0.3,
            ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
          },
        },
  };

  const handleCtaClick = () => {
    // Connect to existing form flow: closes page and pre-fills service
    onRequestForIndustry(data.title);
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? null : idx));
  };

  // Other two services for footer switcher
  const serviceKeys: ServiceKey[] = ["shipbuilding", "construction", "logistics"];
  const otherServices = serviceKeys.filter((k) => k !== serviceKey);

  return (
    <AnimatePresence mode="wait">
      <div 
        className="fixed inset-0 z-[100] w-full h-[100dvh] overflow-hidden bg-black/80 backdrop-blur-md flex items-center justify-center"
        style={{ perspective: 1200 }}
      >
        <motion.div
          ref={pageContainerRef}
          key={data.id}
          variants={macBookAnimationVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="relative w-full h-full overflow-y-auto bg-[#070D16] text-white selection:bg-[#C59C58] selection:text-[#070D16]"
        >
          {/* 1. Fixed Persistent Header with Norvian AB Branding and Accessible Exit Button */}
          <header className="sticky top-0 inset-x-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-12 py-3 sm:py-4 bg-[#070D16]/92 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
            {/* Left: Norvian AB Crest & Scandic Roots Identifier */}
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt="NORVIAN AB"
                width={150}
                height={36}
                className="h-7 sm:h-8 md:h-9 w-auto object-contain"
                priority
              />
              <div className="hidden sm:flex flex-col border-l border-white/15 pl-3">
                <span className="text-[10px] font-bold tracking-[0.22em] text-white/90 uppercase">
                  SCANDIC ROOTS
                </span>
                <span className="text-[8px] font-mono tracking-wider text-[#C59C58] uppercase">
                  Specialized Workforce Alliance
                </span>
              </div>
            </div>

            {/* Center: Current Service Badge */}
            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-white/70 font-mono tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C59C58] animate-pulse" />
              <span>SERVICE /</span>
              <span className="text-white font-semibold uppercase">{data.title}</span>
            </div>

            {/* Right: Persistent, High-Contrast Accessible Exit Button */}
            <button
              onClick={onClose}
              aria-label={`Exit ${data.title} page and return to slide`}
              className="flex items-center gap-2 px-4 py-1.5 sm:px-5 sm:py-2 rounded-full bg-white/10 hover:bg-[#C59C58] text-white hover:text-[#070D16] border border-white/20 hover:border-[#C59C58] backdrop-blur-md shadow-lg transition-all duration-200 cursor-pointer group active:scale-95"
            >
              <span className="text-xs font-semibold tracking-wider uppercase">EXIT</span>
              <X className="w-4 h-4 transition-transform duration-200 group-hover:rotate-90" />
            </button>
          </header>

          {/* Subtle Ambient Top Accent Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-4xl h-96 bg-[#C59C58]/10 blur-[130px] rounded-full pointer-events-none" />

          {/* 2. Hero Section */}
          <section className="relative pt-8 sm:pt-12 pb-10 sm:pb-14 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Heading, Short Description, and Primary CTA */}
              <div className="lg:col-span-7 space-y-5 sm:space-y-6">
                
                {/* Meta Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.35 }}
                  className="flex flex-wrap items-center gap-2 sm:gap-3"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#C59C58]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#C59C58] font-bold">
                    {data.code}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] uppercase tracking-wider text-[#C59C58] font-mono bg-white/5 px-2.5 py-0.5 rounded-full border border-[#C59C58]/30">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C59C58]" />
                    {data.badge}
                  </span>
                </motion.div>

                {/* Main Heading (Exact from prompt) */}
                <motion.h1
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12, duration: 0.4 }}
                  className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-[-0.025em] leading-[1.06]"
                >
                  {data.heading}
                </motion.h1>

                {/* Short Description (Exact from prompt) */}
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16, duration: 0.4 }}
                  className="text-base sm:text-lg lg:text-xl text-white/85 font-light leading-relaxed max-w-2xl"
                >
                  {data.shortDescription}
                </motion.p>

                {/* Primary CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                  className="pt-2 sm:pt-4 flex flex-wrap items-center gap-4"
                >
                  <button
                    onClick={handleCtaClick}
                    className="group inline-flex items-center justify-between gap-4 px-7 sm:px-9 py-3.5 sm:py-4 rounded-full bg-[#C59C58] hover:bg-[#D4AF37] text-[#070D16] font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_12px_32px_-6px_rgba(197,156,88,0.45)] cursor-pointer active:scale-95"
                  >
                    <span>{data.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>

                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-semibold uppercase tracking-wider transition-all border border-white/10 cursor-pointer"
                  >
                    <span>Back to Carousel</span>
                  </button>
                </motion.div>

              </div>

              {/* Right Column: High-Quality Industrial Photograph with gentle reveal */}
              <motion.div
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1.0 }}
                transition={{ delay: 0.15, duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="lg:col-span-5 relative"
              >
                <div className="relative h-64 sm:h-80 lg:h-[460px] w-full rounded-2xl sm:rounded-3xl overflow-hidden border border-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.85)] bg-black">
                  <Image
                    src={data.image}
                    alt={data.heading}
                    fill
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className="object-cover object-center brightness-95 contrast-105 transition-transform duration-700 hover:scale-[1.03]"
                    priority
                  />
                  {/* Subtle edge vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070D16]/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Bottom Image Tag */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/75 bg-black/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                    <span className="font-mono uppercase tracking-wider text-[11px] text-[#C59C58]">
                      NORWEGIAN AB • SPEC
                    </span>
                    <span className="font-serif text-lg font-light text-white/50">
                      0{data.number}
                    </span>
                  </div>
                </div>
              </motion.div>

            </div>
          </section>

          {/* 3. High-Impact Performance Metrics Strip */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-4 sm:py-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {data.stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.35 }}
                  className="p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#C59C58]/40 transition-all space-y-1 sm:space-y-2"
                >
                  <div className="font-serif text-2xl sm:text-4xl font-normal text-[#C59C58]">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-white tracking-wide">
                    {stat.label}
                  </div>
                  <div className="text-[11px] sm:text-xs text-white/60 font-light leading-snug">
                    {stat.sub}
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 4. Detailed Description Editorial Card */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-6 sm:py-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-[#0E1726] to-[#070D16] border border-[#C59C58]/35 shadow-2xl"
            >
              <div className="flex items-start gap-4 sm:gap-6">
                <div className="w-1.5 h-16 sm:h-20 rounded-full bg-[#C59C58] shrink-0 mt-1" />
                <div className="space-y-2 sm:space-y-3">
                  <div className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#C59C58] font-bold">
                    THE SCANDIC ROOTS APPROACH
                  </div>
                  <p className="text-base sm:text-xl lg:text-2xl font-light text-white leading-relaxed">
                    {data.detailedDescription}
                  </p>
                </div>
              </div>
            </motion.div>
          </section>

          {/* 5. Dual Pillars: "Our Workforce Includes" & "Our Expertise" */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-8 sm:py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              
              {/* Column 1: Our Workforce Includes */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all shadow-xl space-y-5"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C59C58]">
                      SOURCED & VETTED TALENT
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                      Our Workforce Includes
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C59C58]">
                    <Award className="w-5 h-5" />
                  </div>
                </div>

                <ul className="space-y-2.5 sm:space-y-3 pt-2">
                  {data.workforce.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#C59C58]/40 hover:bg-white/[0.05] transition-all group"
                    >
                      <div className="w-6 h-6 rounded-lg bg-[#C59C58]/15 text-[#C59C58] flex items-center justify-center shrink-0 group-hover:bg-[#C59C58] group-hover:text-[#070D16] transition-colors">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm sm:text-base text-white/90 font-light group-hover:text-white transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Column 2: Our Expertise */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.1 }}
                className="rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 bg-white/[0.03] border border-white/10 hover:border-white/20 transition-all shadow-xl space-y-5"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-[#C59C58]">
                      CAPABILITIES & SCOPE
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                      Our Expertise
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C59C58]">
                    <Globe2 className="w-5 h-5" />
                  </div>
                </div>

                <ul className="space-y-2.5 sm:space-y-3 pt-2">
                  {data.expertise.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-[#C59C58]/40 hover:bg-white/[0.05] transition-all group"
                    >
                      <div className="w-6 h-6 rounded-lg bg-[#C59C58]/15 text-[#C59C58] flex items-center justify-center shrink-0 group-hover:bg-[#C59C58] group-hover:text-[#070D16] transition-colors">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-sm sm:text-base text-white/90 font-light group-hover:text-white transition-colors">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>

            </div>
          </section>

          {/* 6. Deep-Dive Trade Specializations Cards */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-8 sm:py-12 border-t border-white/10">
            <div className="space-y-2 mb-8">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#C59C58] font-bold">
                PRECISION CAPABILITIES
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
                Specialized Technical Disciplines
              </h2>
              <p className="text-sm sm:text-base text-white/70 font-light max-w-2xl">
                Every trade is independently verified against European operational standards before departure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {data.tradeSpecialties.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="p-6 rounded-2xl bg-[#0B1522]/80 border border-white/10 hover:border-[#C59C58]/50 transition-all space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-base sm:text-lg font-medium text-white group-hover:text-[#C59C58] transition-colors">
                      {item.title}
                    </h4>
                    <span className="w-2 h-2 rounded-full bg-[#C59C58]/60 group-hover:bg-[#C59C58] transition-colors" />
                  </div>
                  <p className="text-xs sm:text-sm text-white/75 font-light leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="pt-2 border-t border-white/5 flex items-center gap-2 text-[10px] sm:text-xs font-mono text-[#C59C58]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{item.certs}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 7. Turnkey 4-Step Recruitment & Mobilization Process */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-8 sm:py-14 border-t border-white/10">
            <div className="space-y-2 mb-10 text-center max-w-2xl mx-auto">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#C59C58] font-bold">
                STREAMLINED DEPLOYMENT
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
                How We Mobilize Your Workforce
              </h2>
              <p className="text-sm sm:text-base text-white/70 font-light">
                From technical scoping to day-one on-site arrival with complete European legal compliance.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {data.deploymentProcess.map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.4 }}
                  className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-[#C59C58]/40 transition-all space-y-3 relative group"
                >
                  <div className="font-mono text-2xl sm:text-3xl font-light text-[#C59C58]/60 group-hover:text-[#C59C58] transition-colors">
                    {step.step}
                  </div>
                  <h4 className="text-base font-medium text-white leading-snug">
                    {step.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* 8. Verified Case Study Spotlight */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-6 sm:py-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#0B1522] to-[#070D16] border border-white/15 shadow-xl space-y-4"
            >
              <div className="flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#C59C58]">
                <Briefcase className="w-3.5 h-3.5" />
                <span>PROJECT HIGHLIGHT & OPERATIONAL SUCCESS</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-normal">
                {data.caseStudy.project}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-white/10">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">PARTNER</span>
                  <span className="text-sm text-white font-light">{data.caseStudy.clientType}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">TIMELINE</span>
                  <span className="text-sm text-[#C59C58] font-medium">{data.caseStudy.timeline}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block">IMPACT</span>
                  <span className="text-sm text-white/90 font-light">{data.caseStudy.impact}</span>
                </div>
              </div>
            </motion.div>
          </section>

          {/* 9. Frequently Asked Questions (FAQ) */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-8 sm:py-14 border-t border-white/10">
            <div className="space-y-2 mb-8">
              <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#C59C58] font-bold">
                ANSWERS FOR EMPLOYERS
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl text-white font-normal">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-3">
              {data.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="rounded-xl sm:rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => toggleFaq(idx)}
                      className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.03] transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm sm:text-base font-medium text-white/95">
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#C59C58] shrink-0 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-white/75 font-light leading-relaxed border-t border-white/5 pt-3">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* 10. Regulatory & Mobilization Compliance Strip */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-4">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0B1522]/80 border border-white/10 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C59C58]">
                  OPERATIONAL ACCREDITATION
                </span>
                <p className="text-sm sm:text-base text-white/90 font-light">
                  Full turnkey compliance under Scandinavian and European labor directives.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {data.complianceBadges.map((badge, idx) => (
                  <span
                    key={idx}
                    className="text-[10px] sm:text-xs font-mono uppercase tracking-wider text-white/80 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* 11. Closing Full-Width Call-to-Action Banner */}
          <section className="px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto py-12 sm:py-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="relative rounded-3xl p-8 sm:p-14 lg:p-16 overflow-hidden bg-gradient-to-br from-[#0B1522] via-[#0E1726] to-[#070D16] border border-[#C59C58]/40 shadow-2xl text-center space-y-6"
            >
              {/* Background ambient light */}
              <div className="absolute inset-0 bg-radial from-[#C59C58]/15 via-transparent to-transparent pointer-events-none" />

              <div className="relative z-10 max-w-3xl mx-auto space-y-4">
                <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-[0.25em] text-[#C59C58] bg-[#C59C58]/10 px-3.5 py-1 rounded-full border border-[#C59C58]/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>START YOUR INQUIRY TODAY</span>
                </div>

                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-white tracking-tight">
                  Ready to Mobilize {data.title} Talent?
                </h2>

                <p className="text-sm sm:text-base text-white/75 font-light leading-relaxed max-w-xl mx-auto">
                  Connect with our recruitment team to review project schedules, skill requirements, and worker availability across Scandinavia and Europe.
                </p>

                <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
                  <button
                    onClick={handleCtaClick}
                    className="group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 rounded-full bg-[#C59C58] hover:bg-[#D4AF37] text-[#070D16] font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_12px_36px_-6px_rgba(197,156,88,0.5)] cursor-pointer active:scale-95"
                  >
                    <span>{data.ctaText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                  </button>

                  <button
                    onClick={onClose}
                    className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-semibold uppercase tracking-wider transition-all border border-white/15 cursor-pointer"
                  >
                    <span>Return to Slide (✕)</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </section>

          {/* 12. Other Services Switcher Footer */}
          <footer className="border-t border-white/10 bg-[#05090F] py-10 px-4 sm:px-8 lg:px-12">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
              
              <div className="flex items-center gap-3">
                <Image
                  src="/logo.png"
                  alt="NORVIAN AB"
                  width={130}
                  height={32}
                  className="h-7 w-auto object-contain"
                />
                <span className="text-xs text-white/50 font-light">
                  © {new Date().getFullYear()} Norvian AB • Scandic Roots
                </span>
              </div>

              {/* Quick links to explore other services */}
              {onSwitchService && (
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <span className="text-white/40 font-mono uppercase tracking-wider">OTHER SERVICES:</span>
                  {otherServices.map((key) => {
                    const otherData = SERVICES_DATA[key];
                    return (
                      <button
                        key={key}
                        onClick={() => onSwitchService(key)}
                        className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/15 text-white/80 hover:text-white border border-white/10 hover:border-[#C59C58] transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <span>{otherData.title}</span>
                        <ChevronRight className="w-3 h-3 text-[#C59C58]" />
                      </button>
                    );
                  })}
                </div>
              )}

            </div>
          </footer>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
