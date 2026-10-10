import { Anchor, Building2, Truck } from "lucide-react";

export type ServiceKey = "shipbuilding" | "construction" | "logistics";

export interface TechnicalMatrixItem {
  discipline: string;
  standards: string;
  capabilities: string;
  verification: string;
}

export interface TradeSpecialty {
  title: string;
  desc: string;
  certs: string;
}

export interface DeploymentStep {
  step: string;
  title: string;
  desc: string;
}

export interface EmployerAssurance {
  title: string;
  desc: string;
  tag: string;
}

export interface CaseStudyItem {
  project: string;
  clientType: string;
  timeline: string;
  impact: string;
  metrics: string[];
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  country: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface ServiceDetailItem {
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
  technicalMatrix: TechnicalMatrixItem[];
  tradeSpecialties: TradeSpecialty[];
  deploymentProcess: DeploymentStep[];
  employerAssurances: EmployerAssurance[];
  caseStudies: CaseStudyItem[];
  testimonial: TestimonialItem;
  faqs: FaqItem[];
}

export const SERVICES_DATA: Record<ServiceKey, ServiceDetailItem> = {
  shipbuilding: {
    id: "shipbuilding",
    number: "01",
    code: "DISCIPLINE 01 / MARITIME",
    title: "Shipbuilding",
    heading: "Empowering Shipbuilders",
    badge: "DNV & ISO 9606-1 CERTIFIED",
    complianceBadges: [
      "DNV Standard",
      "ISO 9606-1 Welders",
      "Lloyd's Register Compliant",
      "Bureau Veritas Approved",
      "Turnkey Mobilization",
      "STCW Safety Inducted",
    ],
    shortDescription:
      "Skilled welders, fitters and marine specialists from Asia, supporting shipyards with the workforce needed to build, repair and maintain vessels.",
    detailedDescription:
      "Scandic Roots connects shipyards and marine engineering companies with skilled professionals for demanding shipbuilding projects. From steel fabrication to vessel assembly, we help employers source suitable talent to support project schedules, quality standards and operational requirements.",
    workforce: [
      "Certified Naval Welders (141 / 135 / 136 / 111)",
      "Hull Fabricators & Block Assembly Fitters",
      "High-Pressure Marine Pipe Fitters (ASME / EN)",
      "Heavy Steel Fabricators & Plate Workers",
      "Structural Sub-Block Pre-Assembly Riggers",
      "Marine Systems Electricians & Cable Pullers",
      "Mechanical Propulsion & Stern Tube Fitters",
      "Engine Room Machinery Overhaul Technicians",
      "Marine Riggers & Crane Slingers (Shipyard Gate)",
      "NDT Visual & Ultrasound Test Prep Inspectors",
      "Marine Coating & Sandblasting Specialists (FROSIO)",
      "Shipyard Shift Foremen & Bilingual Lead Fitters",
    ],
    expertise: [
      "Commercial cargo, cruise, and specialized vessel assembly",
      "Curved hull plating, double bottoms, and bulbous bow alignment",
      "Multi-position 6G / 6GR welding across high-tensile naval steels",
      "Ballast, fuel bunkering, hydraulic, and cryogenic piping networks",
      "Dry dock scheduled refits, hull replacements, and rapid repairs",
      "Engine room machinery overhauls, shaftline optical alignments",
      "Aluminum and duplex stainless steel superstructure fabrication",
      "Turnkey crew logistics, Nordic visa compliance, and yard safety management",
    ],
    ctaText: "Find Shipbuilding Talent",
    image: "/images/shipbuilding_real.jpg",
    icon: Anchor,
    stats: [
      { value: "2–4 Wks", label: "Mobilization Time", sub: "Fast-track onboarding directly to shipyard gate" },
      { value: "100%", label: "DNV & ISO Verified", sub: "Rigorous 6G & multi-position pre-tested welders" },
      { value: "98.4%", label: "Contract Retention", sub: "High satisfaction across Nordic naval & commercial drydocks" },
      { value: "1,400+", label: "Marine Craftsmen", sub: "Successfully mobilized across Northern Europe" },
    ],
    technicalMatrix: [
      {
        discipline: "TIG, MIG/MAG & FCAW Welding (141 / 135 / 136)",
        standards: "ISO 9606-1, DNV-OS-C401, AWS D1.1",
        capabilities: "AH36, DH36, EH36 naval steel, Duplex 2205, 316L, 5083 Marine Aluminum (3mm–65mm)",
        verification: "100% Visual (VT-2), Radiographic (RT), and Ultrasonic (UT) coupon examination",
      },
      {
        discipline: "Hull Assembly & Sub-Block Erection",
        standards: "IACS No. 47 Shipbuilding Quality Standard",
        capabilities: "Pre-erection block fairing, 3D laser-aligned keel sub-blocks, frame spacing <1.5mm tolerance",
        verification: "Total station optical alignment, pre-weld root opening and bevel angle audit",
      },
      {
        discipline: "High-Pressure Marine Piping Networks",
        standards: "ASME B31.3, EN 13480, DIN 86003",
        capabilities: "Seamless carbon & CuNiFe pipe spooling, ballast water management, fuel, and LNG systems",
        verification: "Hydrostatic pressure testing up to 250 bar, helium leak detection, weld penetration check",
      },
      {
        discipline: "Machinery, Propulsion & Shaft Line",
        standards: "STCW Section A-III/1, OEM Marine Engine Specs",
        capabilities: "Wärtsilä / MAN B&W main engine mounts, stern tube bearings, controllable pitch prop hubs",
        verification: "Dial indicator deflection test, laser shaft line optical runout verification (<0.02mm)",
      },
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
      {
        title: "Marine Electrical & Automation Technicians",
        desc: "Main switchboard cable routing, bridge navigation consoles, generator sync panels, ATEX explosion-proof lighting, and sensor harnesses.",
        certs: "Class DNV Marine Electrical • ATEX Directive",
      },
      {
        title: "Surface Preparation & Protective Marine Coating",
        desc: "Ultra-high pressure (UHP) water blasting, abrasive grit blasting to Sa 2.5 standard, and airless multi-coat epoxy/antifouling application.",
        certs: "FROSIO Level II • NACE Coating Inspector Protocol",
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
    employerAssurances: [
      {
        title: "Legal & Visa Sovereignty",
        desc: "Full biometric visas, work authorization, local registration (D-number / Skatteverket), and social security compliance managed by our legal team.",
        tag: "100% REGULATORY COMPLIANT",
      },
      {
        title: "Furnished Housing & Gate Commute",
        desc: "Scandic Roots leases and manages furnished apartments near your shipyard, coordinating daily crew vans so workers arrive punctual and rested.",
        tag: "TURNKEY LOGISTICS",
      },
      {
        title: "Mandatory Nordic HSE Inductions",
        desc: "All technicians arrive equipped with CE-certified thermal PPE, safety harnesses, and completion certificates for Nordic maritime safety rules.",
        tag: "ZERO COMPROMISE SAFETY",
      },
      {
        title: "48-Hour Rapid Replacement Warranty",
        desc: "If any mobilized tradesperson fails to satisfy your yard's on-site quality benchmarks during initial trial, we dispatch a replacement within 48 hours.",
        tag: "IRONCLAD GUARANTEE",
      },
    ],
    caseStudies: [
      {
        project: "240-Meter Commercial Cruise Vessel Dry Dock Refit",
        clientType: "Leading Northern European Naval Shipyard",
        timeline: "65 Welders & Fitters Deployed in 22 Days",
        impact: "Zero weld rejection rate on initial ultrasound inspection (NDT Level II); completed hull reinforcement 6 days ahead of dry dock schedule.",
        metrics: ["65 Craftsmen Mobilized", "0.0% Weld Failure Rate", "+6 Days Ahead of Schedule"],
      },
      {
        project: "Offshore Wind Substation Jacket Topside Assembly",
        clientType: "Major Scandinavian Maritime Fabricator",
        timeline: "42 Structural Steel Fitters & Flux-Core Welders in 18 Days",
        impact: "100% ultrasonic pass rate on structural node heavy plate joints (thickness 50mm) under DNV-OS-C401 offshore fabrication standard.",
        metrics: ["42 Specialist Trades", "50mm Heavy Plate Tested", "100% NDT Acceptance"],
      },
    ],
    testimonial: {
      quote:
        "Scandic Roots supplied 60 pre-tested 6G welders and pipe fitters for our scheduled dry dock refit. The team arrived fully prepared, adapted immediately to our yard's safety culture, and delivered flawless ultrasound results from week one. Their bilingual coordinator resolved every logistical question before it became an issue.",
      author: "Morten Lindqvist",
      role: "Shipyard Production Director",
      company: "Westcon Yards Norway",
      country: "Norway",
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
      {
        q: "What rotation cycles and contract durations do you support?",
        a: "We accommodate standard European shipyard rotation cycles, including 6 weeks on / 2 weeks off, 8 weeks on / 2 weeks off, or continuous long-term project placements ranging from 6 to 24 months with pre-arranged relief rotations.",
      },
      {
        q: "Are the technicians covered by Scandinavian occupational insurance?",
        a: "Yes. Every technician deployed by Scandic Roots is protected under mandatory occupational injury insurance, European medical emergency coverage, and statutory social welfare protocols matching Scandinavian host-country standards.",
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
    complianceBadges: [
      "EN 1090 Steel",
      "ISO 45001 Safety",
      "Eurocode Compliant",
      "ID06 / HMS Registered",
      "Pre-Tested Trade Skills",
      "Collective Agreement Aligned",
    ],
    shortDescription:
      "Reliable construction professionals and skilled tradespeople to support infrastructure, commercial and industrial projects.",
    detailedDescription:
      "We help construction companies source skilled workers who can contribute to projects of different sizes and complexities. Our focus is on connecting employers with suitable candidates whose practical skills and experience match the demands of the job.",
    workforce: [
      "EN 1090 Structural Steel Erectors & Riggers",
      "Certified Construction Welders (MMA / MAG)",
      "Heavy Rebar Tying & Reinforcement Benders",
      "Industrial Formwork Carpenters (PERI / Doka)",
      "Precast Concrete Block Assemblers & Grouting Crews",
      "Tower Crane & Mobile Hydraulic Crane Operators",
      "Heavy Excavator & Earthmoving Machinery Pilots",
      "Mechanical & Industrial MEP Plant Installers",
      "Exterior Façade, Glazing & Cladding Technicians",
      "Civil Bridge, Tunnel & Foundation Workers",
      "High-Altitude Scaffold Riggers (IPAF Certified)",
      "Site Trade Foremen & Nordic ByggID Supervisors",
    ],
    expertise: [
      "Industrial gigafactories, battery plants, and data centers",
      "Heavy structural steel erection and pre-tensioned bolting",
      "Civil transportation infrastructure, bridges, and highway viaducts",
      "High-volume commercial concrete casting and slipform structures",
      "Logistics distribution centers and automated fulfillment hubs",
      "Precast concrete component installation and seismic grouting",
      "Heavy construction equipment positioning and tandem dual-crane lifts",
      "Full compliance with Swedish ID06 and Norwegian HMS-kort access protocols",
    ],
    ctaText: "Find Construction Talent",
    image: "/images/construction_real.jpg",
    icon: Building2,
    stats: [
      { value: "14–21 Days", label: "Crew Deployment", sub: "Rapid on-site mobilization across Scandinavia" },
      { value: "EN 1090", label: "Structural Compliance", sub: "Fully certified structural steel erectors & riggers" },
      { value: "0 Incidents", label: "Safety Orientation", sub: "Mandatory pre-departure Nordic HSE induction" },
      { value: "1,100+", label: "Tradespeople Mobilized", sub: "Battery gigafactories, bridges & industrial hubs" },
    ],
    technicalMatrix: [
      {
        discipline: "Structural Steelwork Assembly (EN 1090)",
        standards: "EN 1090-2 (Execution Classes EXC2 & EXC3), Eurocode 3",
        capabilities: "Heavy portal frames, trusses, high-altitude steel modules, crane runways up to 45m height",
        verification: "Pre-tensioned bolt torque calibration (EN 14399), laser plumb line audit (<1mm/m)",
      },
      {
        discipline: "Modular Formwork & Concrete Pouring",
        standards: "Eurocode 2 (EN 1992-1-1), DIN 18202 Class 3",
        capabilities: "PERI Trio / MAXIMO, Doka Framax, hydraulic climbing formwork, self-compacting concrete",
        verification: "Slump flow cone testing, Schmidt rebound hammer, dimensional tolerance survey",
      },
      {
        discipline: "Heavy Plant Machinery & Rigging",
        standards: "ISO 4301-1 Crane Standard, Nordic Rigging Codes",
        capabilities: "Liebherr / Potain tower crane operations, dual-crane tandem lifts, telehandlers to 25m",
        verification: "Certified rigging slingers, pre-lift hazard assessment, load cell telemetry",
      },
      {
        discipline: "Industrial MEP & Infrastructure Mechanical",
        standards: "EN 12237 Ventilation, EN 13480 Piping",
        capabilities: "Heavy industrial HVAC ductwork networks, utility pipe racks, equipment skid positioning",
        verification: "Helium/smoke pressure integrity testing, laser optical foundation leveling",
      },
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
      {
        title: "Heavy Equipment & Tower Crane Operators",
        desc: "Certified pilots for top-slewing tower cranes, crawler cranes, high-capacity excavators, and all-terrain telescopic forklifts.",
        certs: "Nordic Crane Operator License • Liebherr / Potain Qualified",
      },
      {
        title: "Industrial Façade & Envelope Technicians",
        desc: "Precision installation of insulated composite sandwich panels, architectural curtain walls, industrial roofing membranes, and thermal flashings.",
        certs: "Kingspan / Paroc Certified • Nordic Fall Arrest Protocol",
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
        desc: "Full legal visa issuance, local tax registrations (D-number / Skatteverket), European health cover, and registration on Scandinavian site platforms (ID06 / HMS).",
      },
      {
        step: "04",
        title: "On-Site Delivery, Tooling & Safety Induction",
        desc: "Workers arrive equipped with compliant winter/summer PPE, tools, and local transport. An on-site supervisor oversees smooth project integration.",
      },
    ],
    employerAssurances: [
      {
        title: "Instant ID06 & HMS Site Access Cards",
        desc: "We pre-register every tradesperson with the national tax agency and site badge platform before arrival, guaranteeing zero access delays at your turnstiles.",
        tag: "TURNKEY ACCESS GUARANTEE",
      },
      {
        title: "Collective Agreement Wage & Hours Alignment",
        desc: "Our contracts are structured in full compliance with Nordic collective bargaining agreements (Byggnads, IF Metall), protecting contractors from union audits.",
        tag: "100% LABOR COMPLIANCE",
      },
      {
        title: "Nordic Climate Winter PPE & Tools",
        desc: "Workers receive high-visibility thermal clothing, steel-toe thermal boots, personal fall arrest gear, and specialized tradesman hand tooling.",
        tag: "FULL SITE PREPARATION",
      },
      {
        title: "Furnished Tenancies & Crew Vans",
        desc: "We provide fully equipped residential housing located convenient to your jobsite, complete with dedicated utility management and company transport vans.",
        tag: "SEAMLESS MOBILITY",
      },
    ],
    caseStudies: [
      {
        project: "80,000 m² Battery Gigafactory & Logistics Hub",
        clientType: "Tier-1 Scandinavian General Contractor",
        timeline: "50 Structural Steel & Concrete Specialists in 18 Days",
        impact: "Accelerated structural envelope completion by 3 weeks, enabling interior mechanical fit-out to begin ahead of winter freeze.",
        metrics: ["50 Skilled Trades Mobilized", "-3 Weeks Construction Time", "0 Lost-Time Injuries"],
      },
      {
        project: "Pre-Stressed Concrete Highway Bridge & Rail Viaduct",
        clientType: "Nordic Infrastructure Joint Venture",
        timeline: "32 Formwork Carpenters & Rebar Craftsmen in 14 Days",
        impact: "Executed high-tolerance formwork pours for 12 bridge piers with zero structural voids, meeting stringent transport authority load audits.",
        metrics: ["32 Civil Craftsmen", "12 Bridge Piers Cast", "100% Load Audit Pass"],
      },
    ],
    testimonial: {
      quote:
        "Finding 40 qualified formwork carpenters and steel erectors who understand Scandinavian winter building practices used to take us months. Scandic Roots delivered the complete crew on schedule with verified ID06 cards and exceptional work ethic. They became the most dependable unit on our gigafactory site.",
      author: "Göran Bergström",
      role: "Project Director",
      company: "Skandinavisk Bygg AB",
      country: "Sweden",
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
      {
        q: "How do you handle Swedish ID06 and Norwegian HMS site access cards?",
        a: "We coordinate the entire administrative process including tax agency verification, biometric registration, and card issuance before workers enter site gates, ensuring 100% compliant site entry on day one.",
      },
      {
        q: "What happens if adverse weather causes unexpected site work stoppages?",
        a: "We establish clear contractual provisions aligning with Nordic construction standards, offering flexible shift scheduling and safety indoor task assignments to maintain worker welfare while protecting project budgets.",
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
    complianceBadges: [
      "EU Code 95 CPC",
      "ADR Dangerous Goods",
      "Tachograph Verified",
      "Nordic Winter Ready",
      "EU Mobility Package Compliant",
      "Zero Drug & Alcohol Tested",
    ],
    shortDescription:
      "Experienced truck and trailer drivers to help transport and logistics companies keep goods moving and operations running smoothly.",
    detailedDescription:
      "Scandic Roots supports transport businesses by connecting them with suitable professional drivers for their operational needs. We focus on relevant driving experience, role requirements and the documentation necessary for employment and legal driving eligibility in the destination country.",
    workforce: [
      "Class CE Articulated Long-Haul Drivers (40t)",
      "Severe Nordic Winter Highway Pilots",
      "Temperature-Controlled Reefer Drivers (ATP / GDP)",
      "ADR Dangerous Goods Tanker & Package Drivers",
      "Intermodal Sea-Container & Rail Haulers",
      "Heavy Bulk, Silo & Timber Transport Pilots",
      "Cross-Border Scandinavian Freight Shuttle Drivers",
      "Automated Reach Stacker & Container Terminal Operators",
      "High-Bay Automated Warehouse VNA Forklift Drivers",
      "Distribution Center Yard Shunter Pilots",
      "Heavy Haulage Oversize Low-Loader Drivers",
      "Bilingual Fleet Dispatchers & Route Coordinators",
    ],
    expertise: [
      "Trans-European and domestic Scandinavian heavy freight corridors",
      "Commercial articulated tractor-trailer operations (Volvo, Scania, MAN, DAF)",
      "Severe winter highway piloting, snow chain mounting, and mountain pass descents",
      "Strict compliance with EU Regulation (EC) 561/2006 digital tachograph rules",
      "Dangerous chemical, fuel, and pressurized gas transport under ADR regulations",
      "Pharmaceutical and fresh grocery cold-chain integrity under GDP/ATP rules",
      "Automated container terminal operations and intermodal rail freight connections",
      "Full EU driver license conversion, Code 95 CPC accreditation, and driver welfare",
    ],
    ctaText: "Find Qualified Drivers",
    image: "/images/norvian_truck.jpg",
    icon: Truck,
    stats: [
      { value: "Code 95", label: "EU CPC Certified", sub: "100% compliant commercial articulated driving licenses" },
      { value: "5M+ Km", label: "Nordic Winter Haulage", sub: "Trained on extreme ice, snow & mountain corridors" },
      { value: "48 Hours", label: "Emergency Replacement", sub: "Guaranteed driver continuity for peak freight lanes" },
      { value: "850+", label: "HGV / CE Drivers", sub: "Successfully mobilized for European logistics fleets" },
    ],
    technicalMatrix: [
      {
        discipline: "Articulated Highway Freight (Class CE)",
        standards: "EU Directive 2003/59/EC (Code 95 CPC), Reg 561/2006",
        capabilities: "Volvo FH 500/540, Scania R/S series, 40-tonne semi-trailers, mega-trailers, curtain-siders",
        verification: "Simulator & practical dock reversing test, digital tachograph record audit, Eco-driving exam",
      },
      {
        discipline: "Refrigerated & Cold-Chain Transport",
        standards: "ATP Agreement (FRC/FNA), GDP Pharmaceutical Rules",
        capabilities: "Thermo King SLXi / Carrier Vector units, multi-temperature dual-evaporator trailers",
        verification: "Temperature continuous data-logger monitoring, pre-trip defroster cycle verification",
      },
      {
        discipline: "ADR Dangerous Goods Transport",
        standards: "ADR Convention (Classes 2, 3, 4, 5, 6, 8, 9)",
        capabilities: "Chemical tank semi-trailers, pressurized cylinder transport, ADR tunnel codes B through E",
        verification: "ADR driver license check, emergency valve operation test, spill cleanup protocol exam",
      },
      {
        discipline: "Intermodal Terminal & Heavy Machinery",
        standards: "ISO 3874 Container Handling, CE Machinery Directive",
        capabilities: "45-tonne Kalmar / Konecranes reach stackers, Tugmaster yard tractors, reach trucks",
        verification: "Container locking pin sensor inspection, stacking stability and speed-limiting test",
      },
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
      {
        title: "Container Terminal & Reach Stacker Operators",
        desc: "Certified heavy machinery drivers for top-lift container reach stackers, empty container handlers, and high-frequency terminal shunters.",
        certs: "Heavy Equipment License • Kalmar / Konecranes Certified",
      },
      {
        title: "Heavy Haulage & Specialized Trailer Pilots",
        desc: "Specialists in extendable low-loaders, modular multi-axle trailers, steerable bogies, and oversized wind turbine or heavy machinery transport.",
        certs: "Special Transport Permit • Escort Vehicle Protocol",
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
    employerAssurances: [
      {
        title: "Full EU Mobility Package Compliance",
        desc: "Drivers are provided dedicated host-country apartments so regular 45-hour weekly rest periods are never spent in the truck cabin, in strict EU compliance.",
        tag: "100% REGULATORY ASSURANCE",
      },
      {
        title: "Zero-Tolerance Drug & Alcohol Screening",
        desc: "All candidates undergo certified 10-panel medical drug and alcohol testing prior to departure, with random screening policies supported on-site.",
        tag: "SAFETY GUARANTEE",
      },
      {
        title: "Digital Tachograph & Rest Rules Governance",
        desc: "Drivers arrive with active smart driver cards and thorough understanding of European Regulation 561/2006, ensuring 100% compliance during transport audits.",
        tag: "AUDIT-READY DRIVERS",
      },
      {
        title: "Dedicated Dispatcher Welfare Support",
        desc: "Our bilingual coordinators remain on-call 24/7 to assist your route dispatchers with onboarding, route directions, and administrative questions.",
        tag: "24/7 FLEET ASSISTANCE",
      },
    ],
    caseStudies: [
      {
        project: "Nordic Peak Seasonal E-Commerce & Grocery Freight Corridor",
        clientType: "International Logistics & Freight Forwarder",
        timeline: "45 Class CE Articulated Drivers Mobilized in 25 Days",
        impact: "Maintained 99.6% on-time delivery metric during peak pre-Christmas winter blizzard conditions with zero major driving incidents.",
        metrics: ["45 CE Drivers Mobilized", "99.6% On-Time Delivery", "0 Winter Accidents"],
      },
      {
        project: "Cross-Border Petrochemical & ADR Liquid Tanker Fleet",
        clientType: "Leading Scandinavian Chemical Logistics Provider",
        timeline: "24 ADR Certified Tanker Drivers in 18 Days",
        impact: "Completed 1.8M operational kilometers across Sweden and Norway with 100% safety record during national transport inspectorate audits.",
        metrics: ["24 ADR Pilots", "1.8M Accident-Free Km", "100% Audit Compliance"],
      },
    ],
    testimonial: {
      quote:
        "Driver shortages during Scandinavian winter peaks threatened our delivery contracts. Scandic Roots provided 35 Code 95 CE drivers who were already trained on winter roads and digital tachographs. Our operations ran seamlessly without a single delayed shipment. The drivers treat the trucks with utmost care.",
      author: "Kristian Møller",
      role: "Vice President of Fleet Operations",
      company: "Nordic Freight Logistics",
      country: "Denmark",
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
      {
        q: "How are drivers' housing, rest periods, and cabotage regulations managed?",
        a: "We arrange dedicated apartments near your logistics depot so drivers never take regular 45-hour weekly rests in the vehicle cab, in strict compliance with the EU Mobility Package.",
      },
      {
        q: "What is your driver replacement procedure in case of sudden illness or absence?",
        a: "We maintain an active reserve pool in Northern Europe and guarantee replacement driver dispatch within 24 to 48 hours to ensure zero disruption to your delivery commitments.",
      },
    ],
  },
};
