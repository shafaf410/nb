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

export const SERVICES_DATA_EN: Record<ServiceKey, ServiceDetailItem> = {
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
      "Hull construction and module assembly",
      "Marine piping and propulsion systems",
      "Certified multi-position welding",
      "Surface treatment, anti-fouling & blasting",
      "Electrical installation & marine automation",
      "Vessel refits, conversions & life extensions",
      "Dry dock routine maintenance & surveys",
      "Classification Society quality standards",
    ],
    ctaText: "Request Shipbuilding Workforce",
    image: "/images/shipbuilding_real.jpg",
    icon: Anchor,
    stats: [
      { value: "ISO 9606", label: "Welding Standard", sub: "Multi-position certified" },
      { value: "±2.0mm", label: "Block Alignment", sub: "Sub-block assembly tolerance" },
      { value: "100%", label: "Survey Ready", sub: "DNV & Lloyd's Register tested" },
      { value: "14-28 Days", label: "Deployment", sub: "Full visa & clearance managed" },
    ],
    technicalMatrix: [
      {
        discipline: "Hull & Structural Sub-Blocks",
        standards: "DNV-OS-C401 / IACS No. 47",
        capabilities: "Sub-block pre-erection up to 350t with laser verification down to ±2.0mm.",
        verification: "100% Visual Testing (VT), Ultrasonic Testing (UT), and 3D Laser Tracker alignment.",
      },
      {
        discipline: "High-Pressure Piping & Hydraulics",
        standards: "ISO 9606-1 / ASME IX 6G",
        capabilities: "Installation of 316L stainless, CuNi, and duplex piping for ballast, fuel & hydraulics.",
        verification: "100% Hydrostatic pressure testing up to 350 bar and Radiographic Testing (RT) on roots.",
      },
      {
        discipline: "Welding Metallurgy & Multi-Position",
        standards: "EN ISO 15614-1 / AWS D1.1",
        capabilities: "FCAW, GMAW, and GTAW multi-pass welding on high-tensile naval steels (AH36, DH36, EH36).",
        verification: "Magnetic Particle (MT), Dye Penetrant (PT), and Charpy V-Notch impact testing at -40°C.",
      },
      {
        discipline: "Propulsion & Shaftline Machinery",
        standards: "DNV Pt.4 Ch.2 / Class NK",
        capabilities: "Optical line boring, stern tube bearings, controllable pitch propeller hub fitting.",
        verification: "Dial indicator runout checks within 0.02mm and classification surveyor sign-off.",
      },
    ],
    tradeSpecialties: [
      {
        title: "Marine Hull Fabrication",
        desc: "Precision curvature shaping, plate forming, and structural framing for ice-class and offshore vessels.",
        certs: "DNV GL • EN 1090-2 • IACS",
      },
      {
        title: "Class-Certified Pipe Welding",
        desc: "High-pressure stainless steel, titanium, and duplex pipe spools for engine room cooling and fuel systems.",
        certs: "ISO 9606-1 6G • ASME IX",
      },
      {
        title: "Marine Electrical & Automation",
        desc: "Marine switchboards, bridge consoles, instrumentation, and fire-resistant marine cable installations.",
        certs: "IEC 60092 • Marine Safety Auth.",
      },
      {
        title: "Blasting & Marine Coatings",
        desc: "Ultra-high-pressure water jetting, abrasive grit blasting, and epoxy barrier application to marine specs.",
        certs: "FROSIO Level II/III • NACE",
      },
      {
        title: "Engine Room & Mechanical Alignment",
        desc: "Auxiliary genset mounting, turbocharger overhauls, laser shaft alignment, and pump manifold assemblies.",
        certs: "OEM Certified • DNV Qualified",
      },
      {
        title: "Outfitting & Joinery",
        desc: "A-60 fire-rated bulkhead installations, insulation, deck coverings, and high-spec crew accommodation fit-outs.",
        certs: "IMO FTP Code • Solas B-15/A-60",
      },
    ],
    deploymentProcess: [
      { step: "01", title: "Technical Project Scoping", desc: "We evaluate your shipyard requirements, WPS specs, delivery schedules, and required marine certifications." },
      { step: "02", title: "Practical Workshop Testing", desc: "Candidates undergo rigorous practical trade tests in Asian facilities, including 6G radiography weld samples." },
      { step: "03", title: "Visas & Nordic Clearances", desc: "Scandic Roots manages 100% of embassy filings, biometric appointments, flights, and ID06/HMS-kort registrations." },
      { step: "04", title: "Shipyard Induction & Support", desc: "Crews arrive with safety gear, undergo on-site induction, and remain supported by our bilingual field coordinators." },
    ],
    employerAssurances: [
      { title: "Full Legal & Visa Sponsorship", desc: "Turnkey work authorization, residence permits, and embassy clearance managed entirely by Scandic Roots.", tag: "LEGAL ASSURANCE" },
      { title: "Nordic Regulatory Cards Included", desc: "All marine trades arrive with verified HMS-kort (Norway) or ID06 (Sweden) ready for immediate shipyard access.", tag: "SAFETY COMPLIANCE" },
      { title: "Furnished Accommodation & Transit", desc: "We coordinate approved housing near the shipyard and local transit, removing operational distraction.", tag: "ZERO LOGISTICS FRICTION" },
      { title: "48-Hour Replacement Guarantee", desc: "If any technician fails to meet your quality threshold, we dispatch an accredited replacement within 48 hours.", tag: "PERFORMANCE WARRANTY" },
    ],
    caseStudies: [
      {
        project: "Ulsteinvik Offshore Support Vessel Overhaul",
        clientType: "Norwegian Commercial Shipyard",
        timeline: "14-Day Fast-Track Mobilization",
        impact: "Deployed 42 certified hull fitters and 6G pipe welders for an emergency dry-docking. Project completed 2 days ahead of contract schedule with 0 DNV non-conformities.",
        metrics: ["42 Certified Technicians", "0 Non-Conformities", "Completed 2 Days Early"],
      },
      {
        project: "Gothenburg Commercial Ro-Pax Refit",
        clientType: "Swedish Naval & Marine Engineering Contractor",
        timeline: "21-Day Turnaround Window",
        impact: "Supplied 65 marine electrical and steel fabrication specialists to replace 85 metric tons of hull plating and re-wire main deck power distribution.",
        metrics: ["65 Specialists Deployed", "85 Metric Tons Steel Replaced", "100% On-Schedule Delivery"],
      },
    ],
    testimonial: {
      quote: "Scandic Roots delivered 40 class-certified welders and fitters to our yard in under 3 weeks. The weld X-ray pass rate was over 99.2%, directly saving our schedule penalties.",
      author: "Morten Lindqvist",
      role: "VP of Shipyard Operations",
      company: "Westcon Yards",
      country: "Norway",
    },
    faqs: [
      {
        q: "How fast can you mobilize certified shipyard personnel to our dry dock?",
        a: "Standard deployment takes 14 to 28 calendar days including visa clearance, work permits, flights, and safety induction. For rapid turnarounds, we maintain a pre-cleared reserve roster ready within 10 days.",
      },
      {
        q: "What welding certifications and testing standards do your welders hold?",
        a: "Our welders hold valid ISO 9606-1 and ASME Section IX test certificates verified by international classification societies (DNV, Lloyd's Register, Bureau Veritas) across TIG (141), MIG/MAG (131/135/136), and MMA (111) in 6G and all positional configurations.",
      },
      {
        q: "Can your shipyard workforce communicate effectively in English?",
        a: "Yes. All technicians undergo language screening and are trained in English maritime technical terminology. Shift foremen and bilingual coordinators ensure zero miscommunication during daily toolbox talks.",
      },
      {
        q: "Are collective bargaining agreements and Nordic labor laws respected?",
        a: "Strictly. Scandic Roots operates under full compliance with the Norwegian Working Environment Act (Arbeidsmiljøloven) and Swedish collective tariffs, guaranteeing equal pay directives, mandatory pension, and occupational insurance.",
      },
      {
        q: "Who provides personal protective equipment (PPE) and tools?",
        a: "Workers arrive equipped with standard European CE-marked PPE (safety helmets, steel-toe boots, flame-retardant overalls, eye protection). Specialized yard tools, consumables, and welding sets are provided on site according to project scope.",
      },
      {
        q: "What happens if a worker fails an on-site yard weld test?",
        a: "We maintain a contractual 48-hour replacement guarantee. Any candidate who fails your internal yard test is replaced at our sole expense without recruitment surcharge.",
      },
    ],
  },

  construction: {
    id: "construction",
    number: "02",
    code: "DISCIPLINE 02 / CIVIL",
    title: "Construction",
    heading: "Building Industrial Infrastructure",
    badge: "EN 1090 & ISO 45001 CERTIFIED",
    complianceBadges: [
      "EN 1090-2 EXC3",
      "ISO 45001 Safety",
      "Eurocode 2 & 3 Compliant",
      "HMS-kort (Norway)",
      "ID06 (Sweden)",
      "Valtti (Finland)",
    ],
    shortDescription:
      "Reliable carpenters, masons and construction specialists from Asia, helping contractors deliver infrastructure and commercial projects.",
    detailedDescription:
      "Scandic Roots supports construction companies with skilled workforce solutions across civil, commercial and industrial builds. We connect employers with dependable talent capable of meeting strict building codes, safety regulations and construction timelines across Scandinavia.",
    workforce: [
      "Structural Steel Erectors & EN 1090 Riggers",
      "Modular Formwork Carpenters (PERI / Doka / MEVA)",
      "Heavy Rebar Benders & Reinforced Concrete Fixers",
      "Tower Crane Operators & Mobile Rigging Specialists",
      "Certified Scaffolding Erectors (EN 12811 / TG20)",
      "Industrial MEP Mechanical Pipe Fitters",
      "Heavy Earthmoving & Excavator Machine Operators",
      "Precast Concrete Erection & Grouting Crews",
      "Precision Screeders & Power Float Finishers",
      "Drywall Systems & Technical Acoustic Installers",
      "Facade Cladding & Curtain Wall Specialists",
      "Site Safety Officers & Multi-Lingual Chargehands",
    ],
    expertise: [
      "Commercial and residential structures",
      "Concrete formwork and steel reinforcement",
      "Structural steel assembly and welding",
      "Scaffolding and temporary site works",
      "Industrial MEP, ductwork and piping",
      "Precast element placement and grouting",
      "Heavy civil earthworks and foundations",
      "Strict compliance with Nordic safety standards",
    ],
    ctaText: "Request Construction Workforce",
    image: "/images/construction_real.jpg",
    icon: Building2,
    stats: [
      { value: "EN 1090", label: "Execution Class", sub: "EXC2 & EXC3 certified erectors" },
      { value: "F3 / F4", label: "Concrete Finish", sub: "High-spec architectural formwork" },
      { value: "100%", label: "Site Card Ready", sub: "ID06 & HMS-kort verified" },
      { value: "14-28 Days", label: "Deployment", sub: "Turnkey Nordic onboarding" },
    ],
    technicalMatrix: [
      {
        discipline: "Structural Steelwork & Erection",
        standards: "EN 1090-2 EXC3 / Eurocode 3",
        capabilities: "High-strength bolt tensioning (EN 14399), column verticality checks within H/1000.",
        verification: "Ultrasonic weld inspection, torque wrench calibration logs, digital tachymeter surveys.",
      },
      {
        discipline: "Modular Formwork Systems",
        standards: "DIN 18202 / Eurocode 2",
        capabilities: "PERI Trio / Doka Framax climbing forms for high-rise cores and hydro dams up to 80kN/m².",
        verification: "Laser plumblines, deflection checks under pour pressure, concrete cover gauge audits.",
      },
      {
        discipline: "Heavy Plant & Crane Operations",
        standards: "EN 13000 / ISO 23814",
        capabilities: "Tandem lifts up to 120t, tower crane operation under Scandinavian gust conditions up to 18m/s.",
        verification: "EU-recognized operator cards, daily pre-shift rigging inspection logs, zero-incident track record.",
      },
      {
        discipline: "Industrial MEP & Plant Piping",
        standards: "EN 13480 / ISO 14692",
        capabilities: "Prefabricated district heating, HVAC chiller mains, sprinkler systems, and high-voltage cable runs.",
        verification: "Hydrostatic pressure testing at 1.5x design pressure, endoscopic weld seam inspections.",
      },
    ],
    tradeSpecialties: [
      {
        title: "Heavy Structural Steel Assembly",
        desc: "Erection of high-bay distribution warehouses, industrial processing halls, and bridge steel components.",
        certs: "EN 1090 EXC3 • Bolt Tensioning Cert.",
      },
      {
        title: "High-Rise Modular Formwork",
        desc: "Hydraulic self-climbing formwork, core walls, cantilever slab tables, and curved architectural concrete.",
        certs: "PERI / Doka Certified • EN 13670",
      },
      {
        title: "Industrial MEP & Process Piping",
        desc: "Large-diameter stainless and carbon steel pipe spools for municipal energy plants and factories.",
        certs: "EN ISO 9606 • Pressure Equip. Dir.",
      },
      {
        title: "Earthmoving & Heavy Plant Ops",
        desc: "GPS-guided excavators, articulated dump trucks, soil compactors, and deep foundation piling machinery.",
        certs: "EU Plant Operator • Trench Safety",
      },
      {
        title: "Precast Concrete Erection",
        desc: "Placement of prestressed hollowcore slabs, precast columns, architectural spandrels, and seismic grouting.",
        certs: "EN 13369 • Heavy Lift Rigging",
      },
      {
        title: "Finishing & Technical Drywall",
        desc: "Multi-layer fire-rated EI60/EI120 drywall, acoustic baffles, raised access flooring, and cleanroom panels.",
        certs: "Gyproc / Knauf Systems • Acoustic Spec.",
      },
    ],
    deploymentProcess: [
      { step: "01", title: "Project Specification Review", desc: "We review your site blueprints, execution classes (EXC), crew sizes, and mobilization milestones." },
      { step: "02", title: "Skills Center Pre-Vetting", desc: "Workers perform practical formwork erection, rebar tying, and steel assembly in controlled testing centers." },
      { step: "03", title: "Nordic Compliance & Travel", desc: "We handle embassy filings, biometric ID cards, tax registration (D-number), and Scandinavian transit." },
      { step: "04", title: "Site Integration & Supervision", desc: "Teams arrive fully outfitted with ID06/HMS cards, safety inductions completed, backed by our field coordinators." },
    ],
    employerAssurances: [
      { title: "Turnkey Nordic Compliance", desc: "All trade professionals hold valid Swedish ID06, Norwegian HMS-kort, or Finnish Valtti cards before arriving on site.", tag: "100% REGULATORY ASSURANCE" },
      { title: "Direct Work Permit Handling", desc: "Zero legal exposure for the main contractor. Scandic Roots takes full liability for all visa sponsorships and tax filings.", tag: "LEGAL PEACE OF MIND" },
      { title: "Fully Managed Crew Lodging", desc: "We secure furnished, municipal-approved apartments with scheduled shuttle vans directly to the construction gate.", tag: "SEAMLESS LOGISTICS" },
      { title: "Rapid Scale-Up / Scale-Down", desc: "Flexible deployment contracts that adapt cleanly to project phasing, seasonal peaks, and weather delays.", tag: "OPERATIONAL FLEXIBILITY" },
    ],
    caseStudies: [
      {
        project: "Stockholm Sub-Station & Industrial Facility",
        clientType: "Tier-One Swedish General Contractor",
        timeline: "6-Month Framework Mobilization",
        impact: "Mobilized 58 structural steel erectors and certified formwork carpenters to erect 3,200 metric tons of steel and 8,500m³ of concrete. Zero lost-time incidents recorded.",
        metrics: ["58 Tradesmen", "3,200 Tons Steel", "Zero Lost-Time Incidents"],
      },
      {
        project: "Helsinki Logistics Hub & Cold-Storage Center",
        clientType: "Nordic Industrial Real Estate Builder",
        timeline: "4-Week Rapid Deployment",
        impact: "Supplied 74 precast concrete erectors, rebar fixers, and MEP installers. Project reached roof-closure milestone 3 weeks ahead of scheduled winter deadline.",
        metrics: ["74 Specialists Deployed", "3 Weeks Ahead of Plan", "99.4% QC Acceptance"],
      },
    ],
    testimonial: {
      quote: "Managing major infrastructure projects requires workforce reliability above all. Scandic Roots provided 60 top-tier steel and concrete specialists who integrated seamlessly with our Swedish site managers.",
      author: "Göran Bergström",
      role: "Head of Production",
      company: "Skandinavisk Bygg AB",
      country: "Sweden",
    },
    faqs: [
      {
        q: "Do workers hold valid ID06 (Sweden) or HMS-kort (Norway) before site arrival?",
        a: "Yes. Every tradesperson is pre-registered and arrives with active, company-linked ID06 (Sweden) or HMS-kort (Norway) cards ready for turnstile scanning on day one.",
      },
      {
        q: "What execution classes (EXC) can your structural steel erectors handle?",
        a: "Our steel erectors and welders are certified up to Execution Class EXC3 under EN 1090-2, qualified for complex dynamic loads, bridges, high-rise buildings, and industrial plants.",
      },
      {
        q: "How do you verify formwork and rebar installation standards?",
        a: "Our workers undergo practical testing on PERI and Doka systems in our accredited Asian training centers, evaluating dimensional tolerances, tie-rod safety limits, and concrete cover accuracy.",
      },
      {
        q: "Are the teams insured against occupational accidents in the Nordics?",
        a: "Yes. Scandic Roots maintains comprehensive occupational injury insurance (AFA Försäkring in Sweden / Yrkesskadeforsikring in Norway) that fully covers all personnel.",
      },
      {
        q: "Can you provide entire project crews with working foremen?",
        a: "Yes. We frequently supply balanced crews of 10 to 50 workers headed by English-speaking chargehands and safety coordinators who directly liaise with your general site manager.",
      },
      {
        q: "What is the minimum deployment duration for construction personnel?",
        a: "We cater to short-term surges (minimum 3 months) as well as multi-year infrastructure frameworks with rolling roster rotations.",
      },
    ],
  },

  logistics: {
    id: "logistics",
    number: "03",
    code: "DISCIPLINE 03 / FLEET",
    title: "Transport & Logistics",
    heading: "Driving European Supply Chains",
    badge: "EU CODE 95 & ADR CERTIFIED",
    complianceBadges: [
      "EU Code 95 Certified",
      "ADR Dangerous Goods",
      "Digital Tachograph Ready",
      "ATP Cold-Chain Qualified",
      "Arctic Winter Driving",
      "EU Mobility Package",
    ],
    shortDescription:
      "Licensed truck drivers and warehouse personnel from Asia, keeping supply chains and transport operations moving forward.",
    detailedDescription:
      "Scandic Roots connects transport and logistics operators with qualified drivers and warehouse personnel. With verified licenses and relevant experience, our workforce helps companies maintain fleet capacity, optimize warehouse flow and meet strict delivery schedules throughout Europe.",
    workforce: [
      "EU Code 95 Heavy Articulated Truck Drivers (CE)",
      "ADR Hazardous Materials Tanker Drivers (Class 1-9)",
      "Refrigerated Cold-Chain Fleet Operators (ATP)",
      "Cross-Border Intermodal Container Drivers",
      "Heavy Haulage & Oversized Project Cargo Drivers",
      "Reach Stacker & Heavy Port Terminal Operators",
      "VNA (Very Narrow Aisle) & High-Bay Forklift Drivers",
      "Automated WMS Warehouse & Inventory Technicians",
      "Cross-Dock Fleet Dispatchers & Route Planners",
      "Commercial Fleet Maintenance & Diagnostic Techs",
      "Last-Mile Electric Van & Urban Freight Drivers",
      "Bilingual Fleet Operations Supervisors",
    ],
    expertise: [
      "Heavy commercial vehicle driving (CE license)",
      "Code 95 certification and safety compliance",
      "Temperature-controlled and hazardous goods transport",
      "Cross-border haulage and route planning",
      "Warehouse management and forklift operation",
      "Terminal logistics and cargo handling",
      "Challenging Nordic winter weather conditions",
      "Digital tachograph and EU driving time regulations",
    ],
    ctaText: "Request Transport & Logistics Workforce",
    image: "/images/norvian_truck.jpg",
    icon: Truck,
    stats: [
      { value: "Code 95", label: "Driver CPC", sub: "100% EU accredited Class CE" },
      { value: "ADR", label: "Hazardous Cargo", sub: "Tank & package certified" },
      { value: "99.7%", label: "On-Time Dispatch", sub: "Proven route reliability" },
      { value: "14-28 Days", label: "Mobilization", sub: "Complete license transfer" },
    ],
    technicalMatrix: [
      {
        discipline: "Articulated Highway Freight (Class CE)",
        standards: "EU Directive 2003/59/EC (Code 95)",
        capabilities: "Euro 6 40t - 60t tractor-semitrailers, twin-trailer modular combinations up to 25.25m.",
        verification: "Digital tachograph compliance audits, defensive driving telemetry reviews, clean accident records.",
      },
      {
        discipline: "Temperature-Controlled Cold Chain",
        standards: "ATP Agreement / HACCP Food Safety",
        capabilities: "Multi-temperature reefer trailers with Thermo King / Carrier units down to -25°C.",
        verification: "Automated temperature logger monitoring, pre-trip sensor calibration, pharma chain integrity.",
      },
      {
        discipline: "ADR Liquid Chemicals & Fuel Tankers",
        standards: "ADR Chapter 8.2 / UNECE",
        capabilities: "Baffled stainless and aluminum road tankers carrying flammable liquids (Class 3) and corrosives.",
        verification: "ADR vocational training certificates, grounding protocols, spill-response simulation drills.",
      },
      {
        discipline: "Intermodal Hub & Reach Stacker Ops",
        standards: "ISO 3874 / EN 1459",
        capabilities: "45-tonne reach stackers stacking 20ft/40ft maritime containers up to 5-high at port terminals.",
        verification: "Twistlock alignment speed tests, heavy container stability certifications, zero-damage records.",
      },
    ],
    tradeSpecialties: [
      {
        title: "Arctic Highway Freight",
        desc: "Long-haul Nordic routes through snow, black ice, and mountain passes utilizing snow chains and retarders.",
        certs: "Code 95 CE • Winter Handling Cert.",
      },
      {
        title: "Temperature-Controlled Cold-Chain",
        desc: "Direct perishable food, dairy, and pharmaceuticals freight maintaining continuous cold-chain audit logs.",
        certs: "ATP Certified • HACCP Pharma Trace",
      },
      {
        title: "Hazardous Cargo & ADR Liquids",
        desc: "Safe highway conveyance of industrial chemicals, petrochemicals, gases, and dangerous bulk goods.",
        certs: "ADR All Classes (Tanks & Packages)",
      },
      {
        title: "Port & Rail Terminal Reach Stackers",
        desc: "Rapid intermodal container offloading, rail car transfers, and empty container yard stacking.",
        certs: "Heavy Plant Cert. • Port Security Reg.",
      },
      {
        title: "High-Density WMS Operations",
        desc: "Reach truck, order picker, and counterbalanced operations in modern automated fulfillment centers.",
        certs: "EU Forklift T1-T4 • WMS RF Systems",
      },
      {
        title: "Project Cargo & Heavy Haulage",
        desc: "Multi-axle low-loader trailers transporting wind turbine blades, industrial machinery, and oversized modules.",
        certs: "Special Haulage Pilot • Heavy Axle Cert.",
      },
    ],
    deploymentProcess: [
      { step: "01", title: "Fleet & Route Profile Assessment", desc: "We evaluate your fleet make (Scania, Volvo, MAN), trailer types, route corridors, and peak seasonal volume." },
      { step: "02", title: "Track Driving & Simulator Testing", desc: "Drivers are evaluated on vehicle handling, reversing precision, snow chain installation, and driving hours." },
      { step: "03", title: "Code 95 & Permit Processing", desc: "We handle EU driver qualification cards (DQC), digital driver tachograph cards, and residence permits." },
      { step: "04", title: "Onboarding & Fleet Deployment", desc: "Drivers arrive at your terminal, undergo local route familiarization, and begin scheduled dispatches." },
    ],
    employerAssurances: [
      { title: "EU Mobility Package Compliant", desc: "Full adherence to European road transport regulations, driving and rest periods (Regulation 561/2006), and return home rules.", tag: "ROAD TRANSPORT COMPLIANCE" },
      { title: "Digital Tachograph & DQC Ready", desc: "Every driver possesses an active digital driver card and valid Code 95 CPC accreditation prior to key handover.", tag: "READY FOR DISPATCH" },
      { title: "Off-Cabin Housing Provided", desc: "Drivers are provided clean, comfortable apartment lodging near your depot so mandatory weekly rests are never taken in-cab.", tag: "DRIVER WELFARE STANDARD" },
      { title: "Immediate Driver Backup Roster", desc: "We maintain a replacement guarantee within 48 hours for any driver unable to perform duties due to medical or personal reasons.", tag: "FLEET CONTINUITY" },
    ],
    caseStudies: [
      {
        project: "Nordic Winter Retail & Cold-Chain Peak",
        clientType: "Leading Scandinavian Grocery Logistics Network",
        timeline: "Q4 Peak Season Rapid Mobilization",
        impact: "Supplied 95 Class CE refrigerated truck drivers across Sweden and Norway. Logged over 1.4 million kilometers during severe winter blizzards with a 99.7% on-time delivery rate.",
        metrics: ["95 Class CE Drivers", "1.4M Kilometers Logged", "99.7% On-Time Delivery"],
      },
      {
        project: "Oslofjord Multimodal Port & Terminal Operations",
        clientType: "Intermodal Freight Terminal Operator",
        timeline: "Ongoing Framework Contract",
        impact: "Deployed 38 certified reach stacker drivers and high-bay forklift operators for 24/7 port operations, increasing container turnover velocity by 28%.",
        metrics: ["38 Machine Operators", "28% Velocity Increase", "Zero Damage Incidents"],
      },
    ],
    testimonial: {
      quote: "Driver shortages were throttling our fleet capacity across the Nordic corridor. Scandic Roots placed 50 certified Class CE drivers with impeccable winter driving skills. Our fleet has never been more dependable.",
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

export const SERVICES_DATA_SV: Record<ServiceKey, ServiceDetailItem> = {
  shipbuilding: {
    id: "shipbuilding",
    number: "01",
    code: "BRANSCH 01 / MARINT",
    title: "Skeppsbyggnad",
    heading: "Stärker Varvsindustrin",
    badge: "DNV & ISO 9606-1 CERTIFIERAD",
    complianceBadges: [
      "DNV-standard",
      "ISO 9606-1-svetsare",
      "Lloyd's Register-godkända",
      "Bureau Veritas-certifierade",
      "Nyckelfärdig Mobilisering",
      "STCW-säkerhetsintroduktion",
    ],
    shortDescription:
      "Skickliga svetsare, skrovmontörer och marinspecialister från Asien som förser varv med den arbetskraft som krävs för att bygga, reparera och underhålla fartyg.",
    detailedDescription:
      "Scandic Roots och Norvian AB sammanför varv och marintekniska företag med kvalificerade yrkesarbetare för krävande skeppsbyggnadsprojekt. Från stålkonstruktion till fartygsmontering hjälper vi arbetsgivare att rekrytera rätt kompetens för att säkra projektets tidplan, kvalitetsnormer och driftkrav.",
    workforce: [
      "Certifierade Marin- & Varvssvetsare (141 / 135 / 136 / 111)",
      "Skrovmontörer & Sektionsbyggare",
      "Högtrycksrörläggare för Fartygssystem (ASME / EN)",
      "Tunga Stålkonstruktörer & Plåtslagare",
      "Blockmonterings- & Fartygsriggare",
      "Marinelektriker & Kabeldragare",
      "Mekaniska Framdrivnings- & Hylsmontörer",
      "Maskinrums- & Motoröversynstekniker",
      "Varvsriggare & Krananhållare (Signalmän)",
      "NDT-tekniker & Svetskontrollanter (VT/UT/MT)",
      "Blästrings- & Ytbehandlingsspecialister (FROSIO)",
      "Varvsförmän & Tvåspråkiga Basar",
    ],
    expertise: [
      "Skrovkonstruktion och modulär blockmontering",
      "Fartygspipingsystem och maskinrumsinstallationer",
      "Certifierad flerlägessvetsning i alla lägen",
      "Ytbehandling, korrosionsskydd och blästring",
      "Elektrisk installation och fartygsautomation",
      "Fartygskonverteringar, ombyggnad och livstidsförlängning",
      "Torrdocksunderhåll och klassningsbesiktningar",
      "Klassningssällskapens kvalitets- och säkerhetskrav",
    ],
    ctaText: "Begär Arbetskraft inom Skeppsbyggnad",
    image: "/images/shipbuilding_real.jpg",
    icon: Anchor,
    stats: [
      { value: "ISO 9606", label: "Svetsstandard", sub: "Certifierade i alla svetslägen" },
      { value: "±2.0mm", label: "Blockinriktning", sub: "Tolerans vid sektionsmontage" },
      { value: "100%", label: "Klassningsklara", sub: "DNV & Lloyd's Register testade" },
      { value: "14-28 Dagar", label: "Mobilisering", sub: "Komplett visum- och tillståndshantering" },
    ],
    technicalMatrix: [
      {
        discipline: "Skrovkonstruktion & Sektionsmontage",
        standards: "DNV-OS-C401 / IACS No. 47",
        capabilities: "Sektions- och blockmontering upp till 350 ton med laserinmätning ner till ±2.0 mm.",
        verification: "100% Visuell kontroll (VT), Ultraljudsprovning (UT) och 3D-laserspårning.",
      },
      {
        discipline: "Högtrycksrör & Fartygshydraulik",
        standards: "ISO 9606-1 / ASME IX 6G",
        capabilities: "Installation av 316L rostfritt stål, CuNi och duplexrör för ballast, bränsle och hydraulik.",
        verification: "100% Provtryckning upp till 350 bar och radiografisk provning (RT) på rotsträngar.",
      },
      {
        discipline: "Svetsmetallurgi & Flerlägessvets",
        standards: "EN ISO 15614-1 / AWS D1.1",
        capabilities: "FCAW-, GMAW- och GTAW-flersträngssvetsning i höghållfast marint stål (AH36, DH36, EH36).",
        verification: "Magnetpulverprovning (MT), penetrantprovning (PT) och slagseghetsprov vid -40°C.",
      },
      {
        discipline: "Framdrivning & Axelledningsmaskineri",
        standards: "DNV Pt.4 Ch.2 / Class NK",
        capabilities: "Optisk linjeborrning, montering av hylslager, axeltätningar och propellerhubbar.",
        verification: "Indikatorklockmätning inom 0,02 mm och godkännande av klassningsinspektör.",
      },
    ],
    tradeSpecialties: [
      {
        title: "Marint Skrovmontage",
        desc: "Precisionsformning av plåt, bockning och uppriktning av spant för isklassade fartyg och offshore-enheter.",
        certs: "DNV GL • EN 1090-2 • IACS",
      },
      {
        title: "Klasscertifierad Rörsvetsning",
        desc: "Högtrycksrör i rostfritt stål, titan och duplex för maskinrum, kylning och högtryckshydraulik.",
        certs: "ISO 9606-1 6G • ASME IX",
      },
      {
        title: "Marin El & Fartygsautomation",
        desc: "Huvudställverk, bryggpaneler, instrumentering och brandbeständig kabelförläggning till sjöss.",
        certs: "IEC 60092 • Marin Behörighet",
      },
      {
        title: "Blästring & Ytbehandling",
        desc: "Högtrycksvattentvätt, gritblästring och applicering av epoxisystem enligt marina krav.",
        certs: "FROSIO Nivå II/III • NACE",
      },
      {
        title: "Maskinrum & Maskinriktning",
        desc: "Montage av hjälpmotorer, pumpar, laseruppriktning av drivaxlar och turboöverhalning.",
        certs: "OEM-certifierade • DNV-kvalificerade",
      },
      {
        title: "Inredning & Marinsnickeri",
        desc: "Brandklassade A-60/B-15 skott, isolering, däcksläggning och hyttinredning för kryssnings- och offshorefartyg.",
        certs: "IMO FTP Code • Solas B-15/A-60",
      },
    ],
    deploymentProcess: [
      { step: "01", title: "Teknisk Projektanalys", desc: "Vi kartlägger era varvskrav, WPS-svetsspecifikationer, tidsplaner och obligatoriska certifieringar." },
      { step: "02", title: "Praktiska Prov i Verkstad", desc: "Yrkesarbetarna genomgår hårda praktiska prov i godkända center i Asien, inklusive 6G-röntgenprov." },
      { step: "03", title: "Visum & Nordiska Tillstånd", desc: "Vi hanterar 100% av arbetstillstånd, ambassadbiometri, flygbokningar och ID06/HMS-kortregistrering." },
      { step: "04", title: "Introduktion på Varvet", desc: "Teamen anländer utrustade med skyddskläder, genomgår säkerhetsgenomgång och stöds av våra fältkoordinatorer." },
    ],
    employerAssurances: [
      { title: "Fullt Juridiskt Ansvar & Arbetstillstånd", desc: "Nyckelfärdig hantering av Migrationsverket, uppehållstillstånd och ambassadvisum helt utan administrativ börda för er.", tag: "JURIDISK TRYGGHET" },
      { title: "Nordiska Behörighetskort Ingår", desc: "Alla tekniker anländer med aktiva HMS-kort (Norge) eller ID06-kort (Sverige) redo för grindaccess från dag ett.", tag: "SÄKERHETSKRAV UPPFYLLDA" },
      { title: "Möblerat Boende & Lokal Logistik", desc: "Vi ombesörjer kvalitetssäkrade lägenheter nära varvet och lokala transporter så produktionen flyter utan störningar.", tag: "NOLL LOGISTIKBÖRDA" },
      { title: "48 Timmars Ersättningsgaranti", desc: "Om en tekniker inte når upp till er förväntade kvalitetsstandard ersätter vi personen kostnadsfritt inom 48 timmar.", tag: "KVALITETSGARANTI" },
    ],
    caseStudies: [
      {
        project: "Renovering av Offshorefartyg vid Ulsteinvik",
        clientType: "Norskt Kommersiellt Varv",
        timeline: "14 Dagars Snabbmobilisering",
        impact: "Mobiliserade 42 certifierade skrovmontörer och 6G-rörsvetsare för akut torrdockning. Arbetet slutfördes 2 dygn före utsatt tidplan med 0 anmärkningar från DNV.",
        metrics: ["42 Certifierade Tekniker", "0 DNV-anmärkningar", "Klart 2 Dygn Före Tidplan"],
      },
      {
        project: "Ombyggnad av Kommersiell Ro-Pax i Göteborg",
        clientType: "Svenskt Marintekniskt Företag",
        timeline: "21 Dagars Turnaround",
        impact: "Levererade 65 marin- och stålmontörer för att byta ut 85 ton skrovplåt och dra om kraftförsörjningen på huvuddäck under planerad översyn.",
        metrics: ["65 Specialister på Plats", "85 Ton Stål Monterat", "100% Leverans i Tid"],
      },
    ],
    testimonial: {
      quote: "Scandic Roots levererade 40 klasscertifierade svetsare till vårt varv på under tre veckor. Röntgenpassningsgraden översteg 99,2 %, vilket räddade vår leveranstidplan.",
      author: "Morten Lindqvist",
      role: "Produktionschef Varvsdrift",
      company: "Westcon Yards",
      country: "Norge",
    },
    faqs: [
      {
        q: "Hur snabbt kan ni mobilisera certifierad varvspersonal till vår torrdocka?",
        a: "Standardmobilisering tar 14 till 28 kalenderdagar inklusive visum, arbetstillstånd, flygresor och säkerhetskort. För akuta behov har vi förhandsgodkända team redo inom 10 dagar.",
      },
      {
        q: "Vilka svetscertifikat och standarder innehar era svetsare?",
        a: "Våra svetsare innehar ISO 9606-1 och ASME Section IX-certifikat godkända av klassningssällskap (DNV, Lloyd's Register, Bureau Veritas) för TIG (141), MIG/MAG (131/135/136) och MMA (111) i 6G och alla svetslägen.",
      },
      {
        q: "Klarar er varvspersonal engelsk kommunikation på arbetsplatsen?",
        a: "Ja. Alla tekniker språktestas och behärskar engelsk marin fackterminologi. Arbetsledare och tvåspråkiga fältkoordinatorer säkerställer felfri kommunikation vid dagliga genomgångar.",
      },
      {
        q: "Följs gällande kollektivavtal och nordisk arbetsmiljölagstiftning?",
        a: "Självklart. Vi följer gällande kollektivavtal, lika lön-principen och ländernas arbetsmiljölagar (Arbeidsmiljøloven i Norge, MBL/AML i Sverige). Skatter och sociala avgifter redovisas korrekt.",
      },
      {
        q: "Vem står för personlig skyddsutrustning (PPE) och verktyg?",
        a: "Arbetarna anländer utrustade med europeisk CE-märkt skyddsutrustning (hjälm, skyddsskor, flamsäkra overaller, ögonskydd). Specialverktyg och svetselektroder tillhandahålls normalt av varvet enligt era projektkrav.",
      },
      {
        q: "Vad händer om en person inte klarar vårt interna svetsprov på plats?",
        a: "Vi erbjuder en avtalsenlig 48-timmars ersättningsgaranti. En yrkesman som inte uppfyller era interna krav ersätts omgående på vår bekostnad utan extra avgift.",
      },
    ],
  },

  construction: {
    id: "construction",
    number: "02",
    code: "BRANSCH 02 / BYGG",
    title: "Bygg & Anläggning",
    heading: "Bygger Industriell Infrastruktur",
    badge: "EN 1090 & ISO 45001 CERTIFIERAD",
    complianceBadges: [
      "EN 1090-2 EXC3",
      "ISO 45001 Arbetsmiljö",
      "Eurocode 2 & 3 Godkända",
      "HMS-kort (Norge)",
      "ID06 (Sverige)",
      "Valtti (Finland)",
    ],
    shortDescription:
      "Pålitliga snickare, murare och anläggningsarbetare från Asien som hjälper byggföretag att leverera infrastruktur- och kommersiella projekt.",
    detailedDescription:
      "Scandic Roots och Norvian AB stödjer byggbolag med kvalificerade bemanningslösningar för anläggnings-, kommersiella och industriella projekt. Vi sammanför entreprenörer med pålitlig personal som uppfyller strikta europeiska byggnormer, säkerhetskrav och tidplaner i Skandinavien.",
    workforce: [
      "Stålbyggnadsmontörer & EN 1090 Riggare",
      "Modulformsickare (PERI / Doka / MEVA)",
      "Armerare & Järnbockare för Tunga Konstruktioner",
      "Tornkransförare & Mobilkranriggare",
      "Certifierade Ställningsbyggare (EN 12811)",
      "Industriella VVS- & Processrörsmontörer",
      "Grävmaskinister & Tunga Anläggningsförare",
      "Prefabmontörer & Elementgjutare",
      "Golvläggare & Betongglättare",
      "Gipssnickare & Undertaksmontörer",
      "Fasadmontörer & Glaspartispecialister",
      "KMA-samordnare & Flerspråkiga Lagbasar",
    ],
    expertise: [
      "Kommersiella och industriella byggnadsverk",
      "Betongformning och armeringsarbete",
      "Stålkonstruktionsmontage och svetsning",
      "Ställningsbyggnad och tillfälliga konstruktioner",
      "Industriell VVS, ventilation och processledningar",
      "Montage och undergjutning av betongelement",
      "Tunga schakt- och grundläggningsarbeten",
      "Full efterlevnad av nordiska arbetsmiljökrav",
    ],
    ctaText: "Begär Arbetskraft inom Bygg & Anläggning",
    image: "/images/construction_real.jpg",
    icon: Building2,
    stats: [
      { value: "EN 1090", label: "Utförandeklass", sub: "EXC2 & EXC3 certifierade montörer" },
      { value: "F3 / F4", label: "Betongyta", sub: "Arkitektonisk formgjutning" },
      { value: "100%", label: "Behörighetskort", sub: "ID06 & HMS-kort verifierade" },
      { value: "14-28 Dagar", label: "Mobilisering", sub: "Nyckelfärdig nordisk etablering" },
    ],
    technicalMatrix: [
      {
        discipline: "Stålkonstruktion & Montering",
        standards: "EN 1090-2 EXC3 / Eurocode 3",
        capabilities: "Åtdragning av höghållfasta skruvförband (EN 14399), lodkontroll av pelare inom H/1000.",
        verification: "Ultraljudsprovning av svetsfogar, kalibrerade momentnycklar, inmätning med totalstation.",
      },
      {
        discipline: "Modulära Formsystem",
        standards: "DIN 18202 / Eurocode 2",
        capabilities: "PERI Trio / Doka Framax klätterformar för hisskärnor och tunga gjutetapper upp till 80 kN/m².",
        verification: "Laserlod, nedböjningskontroll under gjuttryck, kontroll av täckskikt med täckskiktsmätare.",
      },
      {
        discipline: "Tunga Anläggningsmaskiner & Kranar",
        standards: "EN 13000 / ISO 23814",
        capabilities: "Samlyft upp till 120 ton, tornkranskörning i skandinaviska vindbyar upp till 18 m/s.",
        verification: "EU-godkända förarbevis, dagliga säkerhetskontroller av lyftredskap, nollolycksstatistik.",
      },
      {
        discipline: "Industriell VVS & Anläggningsrör",
        standards: "EN 13480 / ISO 14692",
        capabilities: "Prefabricerade fjärrvärmeledningar, kylsystem, sprinklerinstallationer och kabelstegar.",
        verification: "Provtryckning med 1,5x designtryck, endoskopisk kontroll av inre rörfogar.",
      },
    ],
    tradeSpecialties: [
      {
        title: "Tungt Stålbyggnadsmontage",
        desc: "Resning av logistiklager med höga spännvidder, industrihallar och bärande stålkonstruktioner.",
        certs: "EN 1090 EXC3 • Åtdragningscertifikat",
      },
      {
        title: "Höghus- & Modulformsnickeri",
        desc: "Hydrauliska självklättrande formsystem, trapphuskärnor, bjälklagsbord och synlig betongfinish.",
        certs: "PERI / Doka Kvalificerade • EN 13670",
      },
      {
        title: "Industriell VVS & Processrör",
        desc: "Grovdimensionerade rörstråk i rostfritt och kolstål för värmeverk, industri och reningsanläggningar.",
        certs: "EN ISO 9606 • Tryckkärlsdirektivet",
      },
      {
        title: "Anläggnings- & Maskinförare",
        desc: "GPS-styrda grävmaskiner, dumper, vältar och maskiner för djupgrundläggning och schaktning.",
        certs: "EU Yrkesbevis • Schaktsäkerhet",
      },
      {
        title: "Prefabricerat Elementmontage",
        desc: "Montage av håldäcksbjälklag, betongpelare, fasadelement och strukturell undergjutning.",
        certs: "EN 13369 • Säkra Lyft / Riggning",
      },
      {
        title: "Ytfinish & Teknisk Gipsmontage",
        desc: "Brandklassade EI60/EI120 gipssystem, akustikundertak, installationsgolv och renrumsväggar.",
        certs: "Systemcertifierade • Ljudklasskrav",
      },
    ],
    deploymentProcess: [
      { step: "01", title: "Ritningsgranskning & Behov", desc: "Vi går igenom era bygghandlingar, utförandeklasser (EXC), teamstorlekar och tidsatta delmål." },
      { step: "02", title: "Praktiska Tester i Utbildningscenter", desc: "Yrkesarbetarna testas praktiskt i formsättning, armeringsbockning och stålresning." },
      { step: "03", title: "Nordisk Etablering & Myndigheter", desc: "Vi ombesörjer arbetstillstånd, skatteregistrering (samordningsnummer), ID06-kort och resor." },
      { step: "04", title: "Arbetsplatsstart & Drift", desc: "Teamen inställer sig med giltiga ID06/HMS-kort och skyddsutrustning under ledning av fältkoordinator." },
    ],
    employerAssurances: [
      { title: "Garanterad Regelefterlevnad", desc: "Alla medarbetare har giltiga svenska ID06-kort eller norska HMS-kort innan de anländer till arbetsplatsen.", tag: "100% EFTERLEVNAD" },
      { title: "Komplett Arbetstillståndshantering", desc: "Noll juridisk risk för huvudentreprenören. Vi tar det fulla ansvaret för visum och myndighetstillstånd.", tag: "TOTAL TRYGGHET" },
      { title: "Möblerat Boende & Etablering", desc: "Vi ordnar godkända lägenheter med god standard samt transportbilar till och från bygget varje dag.", tag: "SMIDIG LOGISTIK" },
      { title: "Skalbar Flexibilitet", desc: "Anpassa bemanningen efter byggfasens toppar och dalar utan långsiktiga fasta anställningsrisker.", tag: "OPERATIV FLEXIBILITET" },
    ],
    caseStudies: [
      {
        project: "Stockholms Industri- & Transformatorstation",
        clientType: "Ledande Svensk Byggentreprenör",
        timeline: "6 Månaders Ramavtalsuppdrag",
        impact: "Mobiliserade 58 stålmontörer och formsnickare för att resa 3 200 ton stål och gjuta 8 500 m³ betong. Noll frånvaroolyckor under hela projekttiden.",
        metrics: ["58 Yrkesarbetare", "3 200 Ton Stål", "0 Arbetsplatsolyckor"],
      },
      {
        project: "Helsingfors Logistik- & Fryscenter",
        clientType: "Nordisk Industri- & Fastighetsbyggare",
        timeline: "4 Veckors Snabbinsats",
        impact: "Tillhandahöll 74 prefabmontörer, armerare och VVS-installatörer. Tätt hus nåddes 3 veckor före den planerade vinterfristen.",
        metrics: ["74 Yrkesmän på Plats", "3 Veckor Före Tidplan", "99,4% Godkända Kontroller"],
      },
    ],
    testimonial: {
      quote: "Att leda stora anläggningsprojekt kräver pålitlig bemanning framför allt annat. Scandic Roots försåg oss med 60 förstklassiga stål- och betongarbetare som fungerade perfekt med våra svenska platschefer.",
      author: "Göran Bergström",
      role: "Produktionschef",
      company: "Skandinavisk Bygg AB",
      country: "Sverige",
    },
    faqs: [
      {
        q: "Innehar personalen giltiga ID06- eller HMS-kort före ankomst till bygget?",
        a: "Ja. Varje medarbetare är förregistrerad och anländer med ett aktivt ID06- (Sverige) eller HMS-kort (Norge) redo att scannas i vändkorsen från dag ett.",
      },
      {
        q: "Vilka utförandeklasser (EXC) klarar era stålmontörer av?",
        a: "Våra stålmontörer och svetsare är certifierade upp till Utförandeklass EXC3 enligt EN 1090-2 för krävande dynamiska laster, broar och industrihallar.",
      },
      {
        q: "Hur kontrolleras kompetensen för form- och armeringsarbeten?",
        a: "Personalen provbyggs på PERI- och Doka-system i våra ackrediterade utbildningscenter i Asien, där måttnoggrannhet, stagning och täckskikt testas noggrant.",
      },
      {
        q: "Är medarbetarna försäkrade vid eventuella olyckor i Norden?",
        a: "Ja. Vi har heltäckande olycksfalls- och ansvarsförsäkringar (motsvarande AFA Försäkring i Sverige / Yrkesskadeforsikring i Norge) som skyddar all personal.",
      },
      {
        q: "Kan ni tillhandahålla kompletta arbetslag med engelsktalande förmän?",
        a: "Ja. Vi levererar ofta kompletta lag på 10 till 50 personer med engelsktalande förmän och säkerhetsombud som kommunicerar direkt med er platsledning.",
      },
      {
        q: "Vad är minsta projektlängd för att hyra in byggpersonal?",
        a: "Vi hanterar säsongstoppar (minst 3 månader) såväl som fleråriga infrastrukturkontrakt med rullande rotationer.",
      },
    ],
  },

  logistics: {
    id: "logistics",
    number: "03",
    code: "BRANSCH 03 / ÅKERI",
    title: "Transport & Logistik",
    heading: "Kör Europas Försörjningskedjor",
    badge: "EU YKB KOD 95 & ADR CERTIFIERAD",
    complianceBadges: [
      "YKB Kod 95 Certifierade",
      "ADR Farligt Gods",
      "Digitalt Färdskrivarkort",
      "ATP Kylgodscertifierade",
      "Vintervägsutbildade",
      "EU Mobilitetspaketet",
    ],
    shortDescription:
      "Licensierade lastbilschaufförer och lagerpersonal från Asien som håller leveranskedjor och logistikflöden i ständig rörelse.",
    detailedDescription:
      "Scandic Roots och Norvian AB sammanför transportföretag och logistikhubbar med kvalificerade förare och lageroperatörer. Med internationell yrkeserfarenhet och obligatoriska europeiska behörigheter hjälper vår personal åkerier att upprätthålla kapacitet och säkra leveranstider.",
    workforce: [
      "YKB Kod 95 CE-chaufförer för Tunga Dragbilar",
      "ADR-certifierade Tankbilsförare (Klass 1-9)",
      "Kyl- & Frystransportchaufförer (ATP-certifierade)",
      "Chaufförer för Intermodala Containerdragbilar",
      "Special- & Tungtransportförare (Bredlast)",
      "Reachstacker- & Hamnterminalförare",
      "Skjutstativ- & Höglagerförare (A- & B-kort)",
      "Lagertekniker för Automatiserade WMS-system",
      "Trafikledare & Ruttplanerare",
      "Verkstadsmekaniker för Tunga Fordon",
      "Chaufförer för Distributions- & Citybilar",
      "Tvåspråkiga Åkeriförmän & Gruppledare",
    ],
    expertise: [
      "Tung kommersiell fjärrtransport (CE-behörighet)",
      "YKB Kod 95 och europeiska trafiksäkerhetskrav",
      "Temperaturkontrollerad transport och farligt gods (ADR)",
      "Gränsöverskridande fjärrgods och ruttoptimering",
      "Lagerlogistik och truckkörning i höglager",
      "Terminalhantering och snabb containeromlastning",
      "Erfarenhet av krävande nordiska vintervägar",
      "Digital färdskrivare och EU:s kör- och vilotidsregler",
    ],
    ctaText: "Begär Chaufförer & Logistikpersonal",
    image: "/images/norvian_truck.jpg",
    icon: Truck,
    stats: [
      { value: "Kod 95", label: "Yrkesförarkompetens", sub: "100% EU-certifierade CE-förare" },
      { value: "ADR", label: "Farligt Gods", sub: "Tank- och styckegodsklassade" },
      { value: "99.7%", label: "Leveransprecision", sub: "Dokumenterad tillförlitlighet" },
      { value: "14-28 Dagar", label: "Mobilisering", sub: "Klar för direkt körning" },
    ],
    technicalMatrix: [
      {
        discipline: "Tung Fjärrtransport (Klass CE)",
        standards: "EU-direktiv 2003/59/EG (Kod 95)",
        capabilities: "Euro 6 dragbilar 40t - 60t, modulsystemsekipage upp till 25,25 meter.",
        verification: "Uppföljning av digital färdskrivardata, telematik för defensiv körning, prickfria körjournaler.",
      },
      {
        discipline: "Temperaturkontrollerad Kylkedja",
        standards: "ATP-överenskommelsen / HACCP",
        capabilities: "Flerzons kyltrailers med Thermo King / Carrier aggregat ner till -25°C.",
        verification: "Automatiska temperaturloggar, kalibrerade sensorer, obruten läkemedels- och livsmedelskedja.",
      },
      {
        discipline: "ADR Vätskekemikalier & Tankbilar",
        standards: "ADR Kapitel 8.2 / UNECE",
        capabilities: "Rostfria och aluminiumtankar för brandfarliga vätskor (Klass 3) och frätande ämnen.",
        verification: "ADR-intyg, jordningsrutiner vid lastning/lossning, praktiska spillövningar.",
      },
      {
        discipline: "Kombiterminal & Reachstackers",
        standards: "ISO 3874 / EN 1459",
        capabilities: "45-tons reachstackers för lyft och stapling av 20ft/40ft containrar upp till 5 högt.",
        verification: "Tidstester för twistlock-låsning, stabilitetsbedömning vid tunga lyft, nollskadestatistik.",
      },
    ],
    tradeSpecialties: [
      {
        title: "Arktisk Fjärrtransport",
        desc: "Körning på snö, underkylt regn och över norska bergspass med snökedjor och retarder.",
        certs: "YKB Kod 95 CE • Vintervägskurs",
      },
      {
        title: "Temperaturkontrollerad Kylkedja",
        desc: "Färskvaror, livsmedel och läkemedelstransporter med strikt temperaturövervakning.",
        certs: "ATP-certifierade • HACCP Spårbarhet",
      },
      {
        title: "Farligt Gods & ADR-vätskor",
        desc: "Säker landsvägstransport av kemikalier, petroleumprodukter, gaser och farligt bulkgods.",
        certs: "ADR Alla Klasser (Tank & Styckegods)",
      },
      {
        title: "Hamn- & Kombiterminalförare",
        desc: "Snabb containerlossning från fartyg till järnvägsvagnar och rangering på terminalområden.",
        certs: "Tungt Maskinbevis • Hamnbehörighet",
      },
      {
        title: "Högeffektiv WMS-lagerdrift",
        desc: "Skjutstativtruck, plocktruck och motviktstruck i moderna automatiserade distributionscenter.",
        certs: "EU Truckkort T1-T4 • WMS Handdator",
      },
      {
        title: "Specialtransport & Bredlast",
        desc: "Lågbyggda trailers med styrbara axlar för vindkraftvingar, transformatorer och tunga maskiner.",
        certs: "Specialtransportintyg • Varningsbil",
      },
    ],
    deploymentProcess: [
      { step: "01", title: "Flottprofil & Behovsanalys", desc: "Vi kartlägger era fordon (Scania, Volvo, MAN), trailertyper, körsträckor och säsongstoppar." },
      { step: "02", title: "Körkvalificering & Tester", desc: "Förare testas praktiskt i manövrering, backning mot ramp, snökedjemontering och färdskrivarregler." },
      { step: "03", title: "YKB Kod 95 & Myndighetsgodkännande", desc: "Vi ombesörjer förarkort, digitala färdskrivarkort, yrkeskompetensbevis och uppehållstillstånd." },
      { step: "04", title: "Introduktion & Första Körpass", desc: "Chaufförerna anländer till er depå, genomgår linjeintroduktion och påbörjar schemalagda körningar." },
    ],
    employerAssurances: [
      { title: "Uppfyller EU:s Mobilitetspaket", desc: "Strikt efterlevnad av kör- och vilotider (Förordning 561/2006), cabotageregler och regelbundna hemresor.", tag: "TRANSPORTRÄTTSLIG EFTERLEVNAD" },
      { title: "Färdskrivarkort & YKB Klart", desc: "Varje förare har ett aktivt digitalt förarkort och godkänt YKB-bevis före första fordonsstart.", tag: "KLAR FÖR TRAFIK" },
      { title: "Godkänd Bostad Utanför Hytten", desc: "Vi ordnar fullt utrustade lägenheter vid depån så att ordinarie vekovila aldrig tas i fordonshytten.", tag: "FÖRARVÄLFÄRD & LAGKRAV" },
      { title: "Snabb Chaufförsreserv", desc: "Vi har en aktiv förarreserv i Skandinavien och garanterar ersättningsförare inom 24 till 48 timmar.", tag: "LEVERANSTILLFÖRLITLIGHET" },
    ],
    caseStudies: [
      {
        project: "Nordisk Vinter- & Dagligvarulogistik",
        clientType: "Stort Skandinaviskt Logistiknätverk",
        timeline: "Mobilisering inför Vintersäsongen",
        impact: "Levererade 95 CE-kylbilschaufförer över Sverige och Norge. Förare loggade över 1,4 miljoner kilometer under svåra vinterförhållanden med 99,7 % punktlighet.",
        metrics: ["95 CE-chaufförer", "1,4M Körda Kilometer", "99,7% Leveransprecision"],
      },
      {
        project: "Oslofjords Kombiterminal & Hamndrift",
        clientType: "Intermodal Terminaloperatör",
        timeline: "Löpande Ramavtalsuppdrag",
        impact: "Tillsatte 38 certifierade reachstacker- och höglagerförare för dygnet-runt-drift, vilket ökade terminalens genomströmningshastighet med 28 %.",
        metrics: ["38 Maskinförare", "28% Snabbare Omlastning", "Noll Skadehändelser"],
      },
    ],
    testimonial: {
      quote: "Förarbristen begränsade vår fordonskapacitet i Norden. Scandic Roots tillsatte 50 certifierade CE-chaufförer med utmärkt vinterkörvana. Vår fordonsflotta har aldrig rullat mer stabilt.",
      author: "Kristian Møller",
      role: "Operativ Chef Åkeridrift",
      company: "Nordic Freight Logistics",
      country: "Danmark",
    },
    faqs: [
      {
        q: "Har alla chaufförer giltigt YKB Kod 95 och digitalt färdskrivarkort?",
        a: "Ja. Varje förare som levereras anländer med giltigt EU-godkänt CE-körkort, YKB-intyg (Kod 95) och ett aktivt digitalt förarkort för färdskrivare.",
      },
      {
        q: "Är förarna vana vid moderna europeiska dragbilar?",
        a: "Ja, alla förare har gedigen erfarenhet av moderna Euro 6-dragbilar (Volvo FH, Scania R/S, Mercedes-Benz Actros, MAN TGX) med automatiserade växellådor.",
      },
      {
        q: "Hur säkerställer ni förarnas förståelse för kör- och vilotider?",
        a: "Förarna genomgår prov i EU-förordning (EG) nr 561/2006 gällande körtider, raster, dygnsvilor och korrekt färdskrivaranvändning före avresa.",
      },
      {
        q: "Klarar chaufförerna svåra skandinaviska vinterförhållanden?",
        a: "Ja. Chaufförerna genomgår praktisk träning i montering av snökedjor, halkkörning, användning av retarder och körning i branta backar och bergspass.",
      },
      {
        q: "Hur hanteras förarnas bostäder och cabotageregler?",
        a: "Vi ordnar lägenheter nära er åkeridepå så att ordinarie vekovila (45 timmar) aldrig tas i lastbilshytten, i full enlighet med EU:s mobilitetspaket.",
      },
      {
        q: "Vad gör ni om en chaufför plötsligt blir sjuk eller skadad?",
        a: "Vi har en aktiv reservpool i Norden och kan tillhandahålla en ersättningsförare inom 24 till 48 timmar för att era transporter inte ska stanna upp.",
      },
    ],
  },
};

export const getServicesData = (lang?: "en" | "sv" | string): Record<ServiceKey, ServiceDetailItem> => {
  return lang === "sv" ? SERVICES_DATA_SV : SERVICES_DATA_EN;
};

export const SERVICES_DATA: Record<ServiceKey, ServiceDetailItem> = SERVICES_DATA_EN;
