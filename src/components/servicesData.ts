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

export interface SpecializationCategory {
  category: string;
  roles: string[];
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
  specializationCategories?: SpecializationCategory[];
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
    code: "SHIPBUILDING MANPOWER SUPPLY",
    title: "Shipbuilding",
    heading: "Looking for Experienced Shipbuilding Workers?",
    badge: "MINIMUM 5 YEARS EXPERIENCE",
    complianceBadges: [
      "Min. 5 Years Experience",
      "European & International Pool",
      "Direct Asian Recruitment",
      "Philippines • Vietnam • Brazil • India",
      "DNV & ISO 9606 Ready",
      "Flexible Manpower Supply",
    ],
    shortDescription:
      "Norvian AB supplies skilled and experienced shipbuilding professionals to shipyards and marine industries across Europe. We provide qualified workers with a minimum of 5 years of shipyard experience, helping companies find the right people for their projects.",
    detailedDescription:
      "We supply experienced European workers and international professionals already based in Europe with valid visas and appropriate work authorization.\n\nWe also provide direct international recruitment from the Philippines, Vietnam, Brazil, and India for short-term, long-term, and project-based workforce requirements.",
    specializationCategories: [
      {
        category: "Hull Construction & Steel Fabrication",
        roles: ["Hull Fitters", "Steel Fabricators", "Shipyard Locksmiths"],
      },
      {
        category: "Welding Professionals",
        roles: ["TIG Welders", "MIG/MAG Welders", "MMA Welders"],
      },
      {
        category: "Piping & Mechanical Works",
        roles: ["Pipe Fitters", "Mechanical Fitters", "Shipbuilding Technicians"],
      },
      {
        category: "Electrical & Surface Treatment",
        roles: ["Marine Electricians", "Ship Painters", "Sandblasters"],
      },
    ],
    workforce: [
      "Hull Fitters",
      "Steel Fabricators",
      "Shipyard Locksmiths",
      "TIG Welders",
      "MIG/MAG Welders",
      "MMA Welders",
      "Pipe Fitters",
      "Mechanical Fitters",
      "Shipbuilding Technicians",
      "Marine Electricians",
      "Ship Painters",
      "Sandblasters",
    ],
    expertise: [
      "Hull construction and module assembly",
      "Precision marine steel fabrication",
      "TIG, MIG/MAG & MMA certified welding",
      "Marine piping and engine room installations",
      "Mechanical outfitting & machinery fitting",
      "Marine electrical systems & automation",
      "Ship painting & corrosion prevention barrier",
      "Grit sandblasting & high-pressure surface treatment",
    ],
    ctaText: "Request Shipbuilding Workers",
    image: "/images/shipbuilding_real.jpg",
    icon: Anchor,
    stats: [
      { value: "5+ Years", label: "Shipyard Experience", sub: "Minimum practical qualification" },
      { value: "EU & Global", label: "Talent Corridors", sub: "Europe, Philippines, Vietnam, Brazil, India" },
      { value: "100%", label: "Work Authorized", sub: "Valid visas & legal compliance" },
      { value: "Flexible", label: "Supply Model", sub: "Short, long-term & project-based" },
    ],
    technicalMatrix: [
      {
        discipline: "Hull Construction & Steel Fabrication",
        standards: "DNV & EN 1090-2",
        capabilities: "Plate forming, curvature alignment, sub-block assembly, and structural framing by verified hull fitters and fabricators.",
        verification: "100% Visual Testing (VT), dimensional checking, and laser block alignment.",
      },
      {
        discipline: "Welding Professionals",
        standards: "ISO 9606-1 / ASME IX",
        capabilities: "TIG, MIG/MAG, and MMA multi-pass welding on high-tensile naval steels and marine structures.",
        verification: "Radiographic (RT), Ultrasonic (UT), and Magnetic Particle (MT) test verification.",
      },
      {
        discipline: "Piping & Mechanical Works",
        standards: "ISO 9606-1 / Marine Class",
        capabilities: "Ballast, fuel, hydraulic, and cooling pipe spool fabrication and machinery fitting in shipyard environments.",
        verification: "Hydrostatic pressure testing and class surveyor sign-off.",
      },
      {
        discipline: "Electrical & Surface Treatment",
        standards: "IEC 60092 / FROSIO Specs",
        capabilities: "Marine cabling, switchboards, grit sandblasting, and marine epoxy coatings for hull protection.",
        verification: "Megger insulation resistance tests and dry film thickness (DFT) gauge audits.",
      },
    ],
    tradeSpecialties: [
      {
        title: "Hull Construction & Steel Fabrication",
        desc: "Hull Fitters, Steel Fabricators, and Shipyard Locksmiths providing precision plate forming and block erection.",
        certs: "Min. 5 Years Exp. • DNV Standards",
      },
      {
        title: "Welding Professionals",
        desc: "TIG Welders, MIG/MAG Welders, and MMA Welders tested for multi-position shipyard joining.",
        certs: "ISO 9606-1 • Multi-Position Certified",
      },
      {
        title: "Piping & Mechanical Works",
        desc: "Pipe Fitters, Mechanical Fitters, and Shipbuilding Technicians for engine room and marine utility lines.",
        certs: "High-Pressure Class Verified",
      },
      {
        title: "Electrical & Surface Treatment",
        desc: "Marine Electricians, Ship Painters, and Sandblasters ensuring operational systems and corrosion defense.",
        certs: "Marine Electric & FROSIO Standards",
      },
    ],
    deploymentProcess: [
      {
        step: "01",
        title: "Share Your Requirements",
        desc: "Tell us the positions, number of workers, required experience, and project location.",
      },
      {
        step: "02",
        title: "Worker Selection",
        desc: "We identify suitable candidates and review their experience, qualifications, and relevant documents.",
      },
      {
        step: "03",
        title: "Candidate Profiles & Interviews",
        desc: "We share selected candidate profiles and arrange interviews when required.",
      },
      {
        step: "04",
        title: "Recruitment & Deployment",
        desc: "We coordinate the recruitment process and assist with the necessary employment and documentation procedures.",
      },
    ],
    employerAssurances: [
      {
        title: "Minimum 5 Years of Experience",
        desc: "We focus on workers with at least 5 years of relevant shipyard experience. Candidates are selected based on their practical skills, qualifications, and work history.",
        tag: "MIN. 5 YEARS EXP.",
      },
      {
        title: "European & International Workforce",
        desc: "We have access to European workers and experienced international professionals already living in Europe with valid visas and appropriate work authorization.",
        tag: "EU & RESIDENT TALENT",
      },
      {
        title: "Direct International Recruitment",
        desc: "We recruit qualified shipbuilding workers directly from the Philippines, Vietnam, Brazil, and India based on our clients’ requirements.",
        tag: "GLOBAL CORRIDORS",
      },
      {
        title: "Flexible Manpower Supply",
        desc: "From a few specialized workers to larger shipyard teams, we support short-term projects, long-term employment, and ongoing workforce needs.",
        tag: "FLEXIBLE MOBILIZATION",
      },
    ],
    caseStudies: [
      {
        project: "European Commercial Shipyard Assembly",
        clientType: "European Naval & Commercial Yard",
        timeline: "Rapid On-Demand Deployment",
        impact: "Supplied 35 experienced hull fitters, TIG/MIG welders, and pipe fitters with 5+ years shipyard experience, maintaining project deadlines and strict classification standards.",
        metrics: ["35 Shipbuilding Specialists", "5+ Years Min. Experience", "100% On-Schedule Delivery"],
      },
      {
        project: "Vessel Modernization & Dry Dock Refit",
        clientType: "Scandinavian Marine Repair Facility",
        timeline: "Project-Based Workforce",
        impact: "Mobilized specialized marine electricians, sandblasters, and structural fabricators from our European and international talent pool for an intensive dry dock overhaul.",
        metrics: ["Turnkey Workforce", "Zero Schedule Delay", "DNV & ISO Compliant"],
      },
    ],
    testimonial: {
      quote: "Norvian AB provided us with skilled hull fitters and certified welders who had extensive shipyard backgrounds. Their practical experience showed from day one, helping us complete our marine project on schedule.",
      author: "Shipyard Operations Lead",
      role: "VP of Shipyard Operations",
      company: "Westcon Yards",
      country: "Europe",
    },
    faqs: [
      {
        q: "What experience do Norvian AB shipbuilding workers have?",
        a: "All candidates have a minimum of 5 years of verified shipyard and marine construction experience. Candidates are selected based on their practical skills, qualifications, and work history.",
      },
      {
        q: "Where do you source your shipbuilding workforce from?",
        a: "We supply experienced European workers and international professionals already based in Europe with valid visas. Additionally, we conduct direct international recruitment from the Philippines, Vietnam, Brazil, and India.",
      },
      {
        q: "What shipyard positions and trades can you provide?",
        a: "We supply Hull Fitters, Steel Fabricators, Shipyard Locksmiths, TIG/MIG/MMA Welders, Pipe Fitters, Mechanical Fitters, Shipbuilding Technicians, Marine Electricians, Ship Painters, and Sandblasters.",
      },
      {
        q: "How does the recruitment and selection process work?",
        a: "The process is simple: 1) Share your requirements, 2) We select and review candidate profiles, 3) We share profiles and arrange interviews, and 4) We coordinate deployment and documentation procedures.",
      },
      {
        q: "Can you provide workers for both short-term projects and long-term contracts?",
        a: "Yes. From a few specialized tradespeople to full shipyard teams, we support short-term projects, long-term employment, and continuous workforce needs.",
      },
      {
        q: "How do we get started?",
        a: "Simply contact our team and share your workforce requirements including positions, number of workers, required experience, and project location.",
      },
    ],
  },

  construction: {
    id: "construction",
    number: "02",
    code: "CONSTRUCTION MANPOWER SUPPLY",
    title: "Construction",
    heading: "Looking for Experienced Construction Workers?",
    badge: "SKILLED & VETTED TRADES",
    complianceBadges: [
      "Structural & Concrete Trades",
      "Masonry & Building Works",
      "MEP & Electrical Installers",
      "Finishing & Interior Works",
      "Trade Skills Verification",
      "Short, Long-Term & Turnkey",
    ],
    shortDescription:
      "Norvian AB supplies skilled and experienced construction workers to construction companies, contractors, and building projects across Europe. We help companies find reliable workers for residential, commercial, industrial, and infrastructure construction projects.\n\nOur focus is on providing qualified construction professionals with practical experience, technical skills, and knowledge of workplace safety.",
    detailedDescription:
      "We supply experienced European construction workers and international professionals already based in Europe with valid visas and appropriate work authorization.\n\nWe also offer direct international recruitment from India, the Philippines, Vietnam, Brazil, and other countries, providing skilled workers for residential, commercial, and large-scale construction projects.\n\nWe support construction companies looking for workers for short-term projects, long-term employment, and ongoing workforce requirements.",
    specializationCategories: [
      {
        category: "Structural & Concrete Construction",
        roles: [
          "Shuttering Carpenters",
          "Formwork Carpenters",
          "Steel Fixers",
          "Concrete Workers",
          "Reinforcement Workers",
          "Scaffolders",
        ],
      },
      {
        category: "Masonry & Building Works",
        roles: [
          "Bricklayers",
          "Block Masons",
          "Plasterers",
          "General Carpenters",
          "Roofers",
          "Tilers",
        ],
      },
      {
        category: "Electrical & Mechanical Trades",
        roles: [
          "Construction Electricians",
          "Plumbers",
          "Pipe Fitters",
          "HVAC Technicians",
          "Mechanical Installers",
        ],
      },
      {
        category: "Finishing & Interior Works",
        roles: [
          "Painters",
          "Drywall Installers",
          "Ceiling Installers",
          "Flooring Installers",
          "Interior Finishing Workers",
        ],
      },
      {
        category: "Industrial & General Construction",
        roles: [
          "Structural Steel Erectors",
          "Steel Fabricators",
          "Construction Welders",
          "General Construction Workers",
          "Construction Helpers",
        ],
      },
    ],
    workforce: [
      "Shuttering Carpenters",
      "Formwork Carpenters",
      "Steel Fixers",
      "Concrete Workers",
      "Reinforcement Workers",
      "Scaffolders",
      "Bricklayers",
      "Block Masons",
      "Plasterers",
      "General Carpenters",
      "Roofers",
      "Tilers",
      "Construction Electricians",
      "Plumbers",
      "Pipe Fitters",
      "HVAC Technicians",
      "Mechanical Installers",
      "Painters",
      "Drywall Installers",
      "Ceiling Installers",
      "Flooring Installers",
      "Structural Steel Erectors",
      "Steel Fabricators",
      "Construction Welders",
      "General Construction Workers",
    ],
    expertise: [
      "Concrete shuttering & modular formwork assembly",
      "Rebar tying & structural steel reinforcement",
      "Precision masonry, bricklaying & plastering",
      "Building electrical installations & power distribution",
      "Commercial plumbing, sanitary & HVAC pipe fitting",
      "Technical drywall, acoustic ceiling & interior finishing",
      "Structural steel erection & certified on-site welding",
      "Workplace safety adherence & Scandinavian site protocols",
    ],
    ctaText: "Request Construction Workers",
    image: "/images/construction_real.jpg",
    icon: Building2,
    stats: [
      { value: "5 Key", label: "Trade Disciplines", sub: "Structural, masonry, MEP, finishing, steel" },
      { value: "EU & Global", label: "Talent Corridors", sub: "Europe, India, Philippines, Vietnam, Brazil" },
      { value: "100%", label: "Work Authorized", sub: "Valid visas & ID compliance" },
      { value: "Flexible", label: "Supply Model", sub: "Short, long-term & project-based" },
    ],
    technicalMatrix: [
      {
        discipline: "Structural & Concrete Construction",
        standards: "Eurocode 2 / EN 13670",
        capabilities: "Formwork systems (PERI, Doka), rebar bending, placement tolerances, and foundation concrete pours.",
        verification: "Cover gauge testing, rebar spacing checks, dimensional laser alignment.",
      },
      {
        discipline: "Masonry & Building Works",
        standards: "Eurocode 6 / EN 998",
        capabilities: "Structural bricklaying, thermal block installation, exterior facade plastering, and waterproofing.",
        verification: "Plumb line checking, mortar bonding verification, joint uniformity inspection.",
      },
      {
        discipline: "Electrical & Mechanical (MEP)",
        standards: "IEC 60364 / EN 806",
        capabilities: "Cable containment, main switchboards, plumbing risers, HVAC distribution ductwork.",
        verification: "Megger insulation testing, hydrostatic pressure tests, air flow balancing.",
      },
      {
        discipline: "Finishing & Structural Steel",
        standards: "EN 1090-2 / Gyproc Norms",
        capabilities: "Fire-rated drywall partitions, acoustic drop ceilings, structural column erection, on-site welding.",
        verification: "Acoustic seal audits, bolt torque records, visual weld inspection.",
      },
    ],
    tradeSpecialties: [
      {
        title: "Structural & Concrete Trades",
        desc: "Shuttering carpenters, formwork specialists, and steel fixers for high-tolerance foundations and multi-story structures.",
        certs: "Formwork Systems • Rebar Certified",
      },
      {
        title: "Masonry & Building Works",
        desc: "Bricklayers, block masons, plasterers, and general carpenters ensuring weather-tight building envelopes.",
        certs: "Eurocode 6 • Building Standards",
      },
      {
        title: "Electrical & Mechanical Trades",
        desc: "Construction electricians, plumbers, and pipe fitters for commercial utilities and building systems.",
        certs: "MEP Certified • Safety Tested",
      },
      {
        title: "Finishing & Interior Works",
        desc: "Painters, drywall installers, and ceiling specialists delivering immaculate turn-key interior finishes.",
        certs: "Interior Systems • Acoustic Spec.",
      },
      {
        title: "Industrial & Steel Construction",
        desc: "Structural steel erectors, fabricators, and certified welders for industrial halls and heavy framing.",
        certs: "EN 1090 Ready • Rigging Qualified",
      },
      {
        title: "General Construction & Helpers",
        desc: "Dependable site workers supporting logistics, material handling, site cleanup, and trades assistance.",
        certs: "Workplace Safety • Site Induction",
      },
    ],
    deploymentProcess: [
      {
        step: "01",
        title: "Share Your Requirements",
        desc: "Tell us the positions required, number of workers, experience level, project location, and expected employment duration.",
      },
      {
        step: "02",
        title: "Worker Selection",
        desc: "We identify suitable candidates and review their construction experience, trade skills, qualifications, and supporting documents.",
      },
      {
        step: "03",
        title: "Candidate Profiles & Interviews",
        desc: "We provide selected candidate profiles, CVs, and available work demonstration videos. Online interviews can also be arranged.",
      },
      {
        step: "04",
        title: "Recruitment & Documentation",
        desc: "We coordinate the recruitment process and assist with the necessary employment documentation and work permit procedures where required.",
      },
      {
        step: "05",
        title: "Worker Deployment",
        desc: "Once the required legal documents and employment arrangements are completed, selected workers can join your construction project.",
      },
    ],
    employerAssurances: [
      {
        title: "Skilled & Experienced Professionals",
        desc: "We focus on workers with relevant construction experience and practical trade skills. Candidates are selected based on their qualifications, work history, and ability to meet project requirements.",
        tag: "PRACTICAL SKILLS",
      },
      {
        title: "European & International Workforce",
        desc: "We have access to experienced European construction workers and international professionals already living in Europe with valid visas and work permits.",
        tag: "EU & RESIDENT TALENT",
      },
      {
        title: "Direct International Recruitment",
        desc: "We recruit skilled construction workers from India, the Philippines, Vietnam, Brazil, and other international markets according to our clients’ requirements.",
        tag: "GLOBAL CORRIDORS",
      },
      {
        title: "Trade Skills Verification",
        desc: "We review candidates’ experience, qualifications, and supporting documents. Practical skills demonstrations and online interviews can also be arranged when required.",
        tag: "SKILLS VERIFICATION",
      },
      {
        title: "Flexible Manpower Supply",
        desc: "Whether you need a few specialized tradespeople or a larger workforce for a construction project, we can support short-term, long-term, and ongoing requirements.",
        tag: "FLEXIBLE SUPPLY",
      },
      {
        title: "Workforce for Different Projects",
        desc: "We provide workers for residential housing, commercial buildings, industrial facilities, renovation projects, and infrastructure construction.",
        tag: "ALL PROJECT TYPES",
      },
    ],
    caseStudies: [
      {
        project: "Commercial Office Complex & Parking Facility",
        clientType: "European General Contractor",
        timeline: "Phased Milestone Deployment",
        impact: "Supplied 52 shuttering carpenters, steel fixers, and concrete workers for foundation and superstructure works, achieving structural handover 2 weeks ahead of target.",
        metrics: ["52 Trade Professionals", "2 Weeks Ahead of Plan", "Zero Lost-Time Incidents"],
      },
      {
        project: "Residential Housing & Urban Infrastructure",
        clientType: "Residential Developer & Builder",
        timeline: "Turnkey Workforce Framework",
        impact: "Deployed bricklayers, plasterers, electricians, and interior finishing teams across a multi-building residential development with complete documentation and housing support.",
        metrics: ["Turnkey Team Supply", "100% Quality Acceptance", "On-Budget Delivery"],
      },
    ],
    testimonial: {
      quote: "Norvian AB has consistently provided us with skilled formwork carpenters and steel fixers who hit the ground running. Their practical knowledge and attention to site safety made a major difference on our build.",
      author: "Göran Bergström",
      role: "Senior Project Director",
      company: "Nordic Commercial Contractors",
      country: "Sweden",
    },
    faqs: [
      {
        q: "What construction trades does Norvian AB supply?",
        a: "We supply structural & concrete workers (shuttering carpenters, steel fixers, scaffolders), masonry trades (bricklayers, plasterers), MEP specialists (electricians, plumbers, pipe fitters), interior finishing teams (drywall, painters, flooring), and steel erectors.",
      },
      {
        q: "How do you verify the practical skills of construction candidates?",
        a: "We examine work history, qualifications, and reference checks. Where required, candidates complete practical trade demonstrations on camera and participate in technical video interviews.",
      },
      {
        q: "Where is your construction workforce recruited from?",
        a: "We supply experienced European workers, EU-resident international professionals with valid work permits, and direct international recruitment from India, the Philippines, Vietnam, Brazil, and other countries.",
      },
      {
        q: "Do you handle site cards and documentation (e.g., ID06, HMS)?",
        a: "Yes. We coordinate the necessary work permits, employment documentation, and site access credentials required for compliant operation across European jurisdictions.",
      },
      {
        q: "Can you provide workers for both short-term phases and long-term projects?",
        a: "Yes. From a few specialized craftsmen for a specific construction milestone to full site workforces for multi-year builds, we adapt to your schedule.",
      },
      {
        q: "How quickly can construction workers be mobilized to our job site?",
        a: "European and resident workers can often be mobilized rapidly, while international direct recruitment timelines depend on required visa and travel documentation procedures.",
      },
    ],
  },

  logistics: {
    id: "logistics",
    number: "03",
    code: "TRUCK & TRAILER DRIVER MANPOWER SUPPLY",
    title: "Transport & Logistics",
    heading: "Looking for Experienced Truck & Trailer Drivers?",
    badge: "CE DRIVERS & CODE 95 SUPPORT",
    complianceBadges: [
      "CE Category Drivers",
      "EU Code 95 Support",
      "European & International Pool",
      "Direct Global Recruitment",
      "India • Philippines • Vietnam • Brazil • Zimbabwe",
      "Practical Driving Verification",
    ],
    shortDescription:
      "Norvian AB supplies skilled and experienced truck and trailer drivers to transport and logistics companies across Europe. We help companies find reliable drivers for international transport, long-distance routes, and daily logistics operations.\n\nOur focus is on providing professional drivers with practical driving experience, good knowledge of road safety, and the skills required for European transport operations.",
    detailedDescription:
      "We supply experienced European drivers and international drivers already based in Europe with valid residence permits and appropriate work authorization.\n\nWe also offer direct international recruitment of experienced truck and trailer drivers from India, the Philippines, Vietnam, Brazil, Zimbabwe, and other countries, including drivers with professional experience in Saudi Arabia, Qatar, Kuwait, and the UAE.\n\nWe support transport companies looking for drivers for short-term, long-term, and permanent employment.",
    specializationCategories: [
      {
        category: "Truck & Trailer Drivers",
        roles: [
          "CE Category Truck Drivers",
          "International Trailer Drivers",
          "Long-Haul Truck Drivers",
          "Heavy Goods Vehicle (HGV) Drivers",
        ],
      },
      {
        category: "Specialized Transport Drivers",
        roles: [
          "Refrigerated Trailer Drivers",
          "Container Transport Drivers",
          "Curtain-Sider Trailer Drivers",
          "Flatbed Trailer Drivers",
          "Tanker Drivers",
        ],
      },
      {
        category: "Logistics & Distribution Drivers",
        roles: [
          "Regional Distribution Drivers",
          "Domestic Transport Drivers",
          "C Category Truck Drivers",
        ],
      },
    ],
    workforce: [
      "CE Category Truck Drivers",
      "International Trailer Drivers",
      "Long-Haul Truck Drivers",
      "Heavy Goods Vehicle (HGV) Drivers",
      "Refrigerated Trailer Drivers",
      "Container Transport Drivers",
      "Curtain-Sider Trailer Drivers",
      "Flatbed Trailer Drivers",
      "Tanker Drivers",
      "Regional Distribution Drivers",
      "Domestic Transport Drivers",
      "C Category Truck Drivers",
    ],
    expertise: [
      "Heavy commercial vehicle driving (CE license)",
      "International trailer haulage & route planning",
      "Refrigerated cold-chain & temperature control",
      "Intermodal container handling & terminal delivery",
      "Curtain-sider, flatbed & cargo tie-down safety",
      "ADR hazardous liquid & tanker operations",
      "Regional distribution & multi-drop logistics",
      "Digital tachograph & EU driving hour compliance",
    ],
    ctaText: "Request Truck & Trailer Drivers",
    image: "/images/norvian_truck.jpg",
    icon: Truck,
    stats: [
      { value: "Class CE", label: "Heavy Drivers", sub: "Truck & trailer verified" },
      { value: "Code 95", label: "Driver CPC Support", sub: "Full compliance training" },
      { value: "Global", label: "Talent Corridors", sub: "India, Philippines, Vietnam, Brazil, Zimbabwe, Gulf" },
      { value: "100%", label: "Work Authorized", sub: "Valid permits & documentation" },
    ],
    technicalMatrix: [
      {
        discipline: "Truck & Trailer Drivers (Class CE)",
        standards: "EU Directive 2003/59/EC (Code 95)",
        capabilities: "Heavy articulated combinations (Euro 6 tractor-trailers, 40t-60t GCW) for international long-haul and cross-border transport.",
        verification: "Licence verification, driving history checks, and digital tachograph hours compliance.",
      },
      {
        discipline: "Specialized Transport (Reefer, Tanker, Container)",
        standards: "ATP Cold-Chain / ADR Regulations",
        capabilities: "Reefer temperature control, dangerous goods transport, twist-lock container haulage, and flatbed load securing.",
        verification: "Practical cargo securing assessment and hazardous goods certificate verification.",
      },
      {
        discipline: "Logistics & Regional Distribution",
        standards: "C & CE Commercial Norms",
        capabilities: "Domestic freight, multi-drop regional distribution, dock reversing, and tail-lift operations.",
        verification: "Urban route navigation tests and dock loading evaluation.",
      },
    ],
    tradeSpecialties: [
      {
        title: "CE Category Long-Haul Drivers",
        desc: "Experienced heavy articulated drivers for cross-border European linehaul, night routes, and highway corridors.",
        certs: "Class CE • Valid Driver Card",
      },
      {
        title: "Refrigerated & Cold-Chain Trailers",
        desc: "Strict temperature monitoring for perishable food, pharmaceutical cargo, and sensitive supply chains.",
        certs: "ATP Qualified • Temperature Log Tested",
      },
      {
        title: "Intermodal Container & Flatbed",
        desc: "Port and terminal container drayage, skeletal trailers, and heavy flatbed oversized load transport.",
        certs: "Cargo Lashing • Port Access Ready",
      },
      {
        title: "Tanker & Hazardous Liquids",
        desc: "Safe highway conveyance of liquid bulk, petrochemicals, and industrial chemicals in road tankers.",
        certs: "ADR Certified (Tanks & Bulk)",
      },
      {
        title: "Curtain-Sider & Dry Freight",
        desc: "Rapid side-loading, palletized industrial goods, and reliable dock-to-dock general freight transit.",
        certs: "EN 12642 XL Load Securing",
      },
      {
        title: "Regional Distribution & Urban Freight",
        desc: "Precision maneuvering in congested European logistics parks, retail distribution, and final-mile hubs.",
        certs: "Class C/CE • Tail-Lift Certified",
      },
    ],
    deploymentProcess: [
      {
        step: "01",
        title: "Share Your Requirements",
        desc: "Tell us how many drivers you need, the required licence categories, driving experience, transport type, and employment location.",
      },
      {
        step: "02",
        title: "Driver Selection",
        desc: "We identify suitable candidates and review their driving experience, licences, qualifications, and supporting documents.",
      },
      {
        step: "03",
        title: "Candidate Profiles & Interviews",
        desc: "We provide selected driver profiles, CVs, and available driving demonstration videos. Online interviews can also be arranged.",
      },
      {
        step: "04",
        title: "Recruitment & Documentation",
        desc: "We coordinate the recruitment process and assist with the necessary employment documentation, work permits, and professional driver qualification procedures where required.",
      },
      {
        step: "05",
        title: "Driver Deployment",
        desc: "Once the required legal documents and professional qualifications are completed, selected drivers can join your transport operations.",
      },
    ],
    employerAssurances: [
      {
        title: "Professional Driving Experience",
        desc: "We focus on drivers with relevant heavy vehicle and trailer driving experience. Candidates are selected based on their driving history, technical skills, and professional qualifications.",
        tag: "PRACTICAL EXPERIENCE",
      },
      {
        title: "European & International Drivers",
        desc: "We have access to experienced European drivers and international drivers already living in Europe with valid residence permits and appropriate work authorization.",
        tag: "EU & RESIDENT POOL",
      },
      {
        title: "Direct International Recruitment",
        desc: "We recruit experienced truck and trailer drivers from India, the Philippines, Vietnam, Brazil, Zimbabwe, and other international markets, including drivers with experience in Gulf countries (Saudi Arabia, Qatar, Kuwait, UAE).",
        tag: "GLOBAL CORRIDORS",
      },
      {
        title: "Driving Skills Verification",
        desc: "We review candidates’ driving experience, licences, and supporting documents. Practical driving demonstration videos and interviews can also be arranged before selection.",
        tag: "SKILLS VERIFICATION",
      },
      {
        title: "Driving Licence & Code 95 Support",
        desc: "For international candidates, we can assist with coordinating the required driving licence procedures, Code 95 training, and other professional qualifications according to the destination country’s regulations.",
        tag: "CODE 95 SUPPORT",
      },
      {
        title: "Flexible Driver Recruitment",
        desc: "Whether you need a few drivers or a larger team for your transport operations, we can support short-term, long-term, and permanent workforce requirements.",
        tag: "FLEXIBLE RECRUITMENT",
      },
    ],
    caseStudies: [
      {
        project: "European Cross-Border Linehaul Fleet",
        clientType: "International Long-Distance Haulage Network",
        timeline: "Rapid Mobilization",
        impact: "Supplied 45 verified Class CE truck and trailer drivers with international route experience. Zero route delays and 100% compliance with EU driving and rest times.",
        metrics: ["45 CE Drivers", "100% On-Time Dispatches", "EU Mobility Compliant"],
      },
      {
        project: "Temperature-Controlled Cold-Chain Logistics",
        clientType: "Scandinavian Perishables & Food Fleet",
        timeline: "Full Fleet Seasonal Expansion",
        impact: "Recruited and deployed experienced refrigerated trailer drivers with verified cold-chain monitoring skills for high-demand seasonal operations.",
        metrics: ["Turnkey Driver Supply", "Zero Spoilage Incidents", "24/7 Operations"],
      },
    ],
    testimonial: {
      quote: "Finding experienced truck and trailer drivers who understand road safety and European regulations used to take months. Norvian AB provided vetted professionals with impressive driving skills and complete documentation support.",
      author: "Kristian Møller",
      role: "Operations Director",
      company: "Nordic Freight Transport",
      country: "Sweden",
    },
    faqs: [
      {
        q: "What driving licence categories do your drivers possess?",
        a: "We provide both CE Category (truck and articulated trailer) and C Category commercial drivers with verified professional experience.",
      },
      {
        q: "How do you verify the practical skills of international drivers?",
        a: "We review complete driving histories, check licences and references, and provide video driving demonstrations showcasing vehicle maneuvering, reversing, and trailer coupling.",
      },
      {
        q: "Do you assist with Code 95 training and licence conversion?",
        a: "Yes. For international candidates, we assist with coordinating required driving licence procedures, Code 95 training, and driver qualification cards (DQC) according to the destination country's regulations.",
      },
      {
        q: "Which countries do you recruit drivers from?",
        a: "In addition to European and EU-resident drivers, we recruit directly from India, the Philippines, Vietnam, Brazil, Zimbabwe, and drivers with prior professional experience in Saudi Arabia, Qatar, Kuwait, and the UAE.",
      },
      {
        q: "Can we interview and test drivers before deployment?",
        a: "Yes. We arrange online technical interviews and provide video demonstrations so your fleet managers can evaluate candidates before finalizing selections.",
      },
      {
        q: "What types of employment contracts do you support?",
        a: "We support short-term projects, seasonal fleet capacity peaks, long-term assignments, and permanent employment arrangements.",
      },
    ],
  },
};

export const SERVICES_DATA_SV: Record<ServiceKey, ServiceDetailItem> = {
  shipbuilding: {
    id: "shipbuilding",
    number: "01",
    code: "BEMANNING INOM SKEPPSBYGGNAD",
    title: "Skeppsbyggnad",
    heading: "Söker ni erfaren varvspersonal?",
    badge: "MINST 5 ÅRS ERFARENHET",
    complianceBadges: [
      "Minst 5 års varvserfarenhet",
      "Europeisk & global rekrytering",
      "Giltigt visum & arbetstillstånd",
      "Filippinerna • Vietnam • Brasilien • Indien",
      "DNV & ISO 9606 redo",
      "Flexibel bemanningslösning",
    ],
    shortDescription:
      "Norvian AB levererar kvalificerad och erfaren varvspersonal till varv och marin industri över hela Europa. Vi tillhandahåller yrkesarbetare med minst 5 års varvserfarenhet och hjälper företag att hitta rätt personal för sina projekt.",
    detailedDescription:
      "Vi tillhandahåller erfarna europeiska yrkesarbetare och internationella specialister som redan befinner sig i Europa med giltiga visum och arbetstillstånd.\n\nVi erbjuder även direkt internationell rekrytering från Filippinerna, Vietnam, Brasilien och Indien för korttidsbehov, långtidsuppdrag och projektbaserad bemanning.",
    specializationCategories: [
      {
        category: "Skrovkonstruktion & Ståltillverkning",
        roles: ["Skrovmontörer", "Stålkonstruktörer", "Varvslåssmeder"],
      },
      {
        category: "Professionella Svetsare",
        roles: ["TIG-svetsare", "MIG/MAG-svetsare", "MMA-svetsare"],
      },
      {
        category: "Rörarbeten & Mekanik",
        roles: ["Rörläggare", "Mekaniska montörer", "Varvstekniker"],
      },
      {
        category: "El & Ytbehandling",
        roles: ["Marinelektriker", "Fartygsmålare", "Blästrare"],
      },
    ],
    workforce: [
      "Skrovmontörer",
      "Stålkonstruktörer",
      "Varvslåssmeder",
      "TIG-svetsare",
      "MIG/MAG-svetsare",
      "MMA-svetsare",
      "Rörläggare",
      "Mekaniska montörer",
      "Varvstekniker",
      "Marinelektriker",
      "Fartygsmålare",
      "Blästrare",
    ],
    expertise: [
      "Skrovkonstruktion och sektionsmontering",
      "Tung marin ståltillverkning",
      "Certifierad TIG-, MIG/MAG- och MMA-svetsning",
      "Fartygspipingsystem och rördragning",
      "Mekaniskt montage och maskinrumsinstallation",
      "Marinelektriska installationer och kabelsystem",
      "Fartygsmålning och korrosionsskydd",
      "Blästring och ytbehandling enligt marin standard",
    ],
    ctaText: "Begär Varvspersonal",
    image: "/images/shipbuilding_real.jpg",
    icon: Anchor,
    stats: [
      { value: "5+ År", label: "Varvserfarenhet", sub: "Minst 5 års verifierad erfarenhet" },
      { value: "4 Länder", label: "Direktrekrytering", sub: "Filippinerna, Vietnam, Brasilien, Indien" },
      { value: "100%", label: "Arbetstillstånd", sub: "EU-medborgare & visuminnehavare" },
      { value: "Flexibelt", label: "Bemanningsupplägg", sub: "Korttids-, långtids- & projektbasis" },
    ],
    technicalMatrix: [
      {
        discipline: "Skrovkonstruktion & Ståltillverkning",
        standards: "DNV & EN 1090-2",
        capabilities: "Plåtformning, bockning, sektionsmontage och spantuppriktning av erfarna skrovmontörer.",
        verification: "Visuell kontroll (VT), dimensionsmätning och laserjustering.",
      },
      {
        discipline: "Professionella Svetsare",
        standards: "ISO 9606-1 / ASME IX",
        capabilities: "Flersträngssvetsning med TIG, MIG/MAG och MMA i marin stålplåt och rör.",
        verification: "Röntgenkontroll (RT), ultraljud (UT) och magnetpulver (MT).",
      },
      {
        discipline: "Rörarbeten & Mekanik",
        standards: "ISO 9606-1 / Klassnormer",
        capabilities: "Tillverkning och montering av ballast-, bränsle- och hydraulikrör samt maskinmontage.",
        verification: "Provtryckning och godkännande av klassningsinspektör.",
      },
      {
        discipline: "El & Ytbehandling",
        standards: "IEC 60092 / FROSIO",
        capabilities: "Marinelektriska installationer, sandblästring och applicering av marin epoxifärg.",
        verification: "Isolationsmätning och skikttjocklekskontroll (DFT).",
      },
    ],
    tradeSpecialties: [
      {
        title: "Skrovkonstruktion & Ståltillverkning",
        desc: "Skrovmontörer, Stålkonstruktörer och Varvslåssmeder för fartygsbyggnad och torrdocka.",
        certs: "Minst 5 Års Erfarenhet • DNV-normer",
      },
      {
        title: "Professionella Svetsare",
        desc: "TIG-svetsare, MIG/MAG-svetsare och MMA-svetsare certifierade för flerlägessvetsning.",
        certs: "ISO 9606-1 • Certifierade svetsare",
      },
      {
        title: "Rörarbeten & Mekanik",
        desc: "Rörläggare, Mekaniska montörer och Varvstekniker för maskinrum och rörsystem.",
        certs: "Klassningsgodkända procedurer",
      },
      {
        title: "El & Ytbehandling",
        desc: "Marinelektriker, Fartygsmålare och Blästrare för fartygsutrustning och korrosionsskydd.",
        certs: "Marinelektriker & FROSIO-standard",
      },
    ],
    deploymentProcess: [
      {
        step: "01",
        title: "Dela Era Behov",
        desc: "Berätta vilka positioner, antal arbetare, erforderlig erfarenhet och projektplats.",
      },
      {
        step: "02",
        title: "Urval av Personal",
        desc: "Vi identifierar lämpliga kandidater och granskar deras erfarenhet, kvalifikationer och dokumentation.",
      },
      {
        step: "03",
        title: "Kandidatprofiler & Intervjuer",
        desc: "Vi presenterar utvalda kandidatprofiler och arrangerar intervjuer vid behov.",
      },
      {
        step: "04",
        title: "Rekrytering & Mobilisering",
        desc: "Vi koordinerar rekryteringsprocessen och bistår med nödvändiga anställnings- och dokumentationsprocedurer.",
      },
    ],
    employerAssurances: [
      {
        title: "Minst 5 Års Erfarenhet",
        desc: "Vi fokuserar på arbetare med minst 5 års relevant varvserfarenhet. Kandidater väljs ut baserat på praktisk skicklighet, kvalifikationer och arbetshistorik.",
        tag: "MINST 5 ÅRS ERF.",
      },
      {
        title: "Europeisk & Internationell Arbetskraft",
        desc: "Vi har tillgång till europeiska yrkesarbetare och erfarna internationella specialister som redan bor i Europa med giltiga visum och arbetstillstånd.",
        tag: "EU & BOSATTA I EUROPA",
      },
      {
        title: "Direkt Internationell Rekrytering",
        desc: "Vi rekryterar kvalificerad varvspersonal direkt från Filippinerna, Vietnam, Brasilien och Indien utifrån våra kunders krav.",
        tag: "GLOBALA KORRIDORER",
      },
      {
        title: "Flexibel Bemanning",
        desc: "Från enstaka specialister till större varvsteam stöttar vi korttidsuppdrag, långtidsanställning och löpande bemanningsbehov.",
        tag: "FLEXIBEL MOBILISERING",
      },
    ],
    caseStudies: [
      {
        project: "Europeiskt Varvsprojekt för Kommersiella Fartyg",
        clientType: "Europeiskt Kommersiellt Varv",
        timeline: "Snabb och Efterfrågestyrd Mobilisering",
        impact: "Levererade 35 erfarna skrovmontörer, svetsare och rörläggare med minst 5 års varvserfarenhet för att säkra projektets leveransdatum.",
        metrics: ["35 Varvsspecialister", "Minst 5 Års Erfarenhet", "100% Leverans i Tid"],
      },
      {
        project: "Fartygsmodernisering & Torrdockningsöversyn",
        clientType: "Skandinaviskt Fartygsreparationsvarv",
        timeline: "Projektbaserad Arbetskraft",
        impact: "Mobiliserade marinelektriker, blästrare och stålmontörer från vår europeiska och internationella talangbas för en intensiv torrdocksrenovering.",
        metrics: ["Nyckelfärdig Bemanning", "Noll Projektförsening", "DNV & ISO Efterlevnad"],
      },
    ],
    testimonial: {
      quote: "Norvian AB försåg oss med skickliga skrovmontörer och certifierade svetsare med gedigen varvsbakgrund. Deras praktiska erfarenhet märktes från dag ett och hjälpte oss hålla tidplanen.",
      author: "Shipyard Operations Lead",
      role: "Driftsansvarig",
      company: "Europeiskt Marint Varv",
      country: "Europa",
    },
    faqs: [
      {
        q: "Vilken erfarenhet har Norvian AB:s varvspersonal?",
        a: "Alla kandidater har minst 5 års verifierad erfarenhet från varv och marin konstruktion. De väljs ut baserat på praktisk kompetens, certifikat och dokumenterad yrkesbakgrund.",
      },
      {
        q: "Varifrån rekryterar ni er varvsarbetskraft?",
        a: "Vi tillhandahåller erfarna europeiska arbetare och internationella specialister som redan bor i Europa med giltiga visum. Dessutom utför vi direktrekrytering från Filippinerna, Vietnam, Brasilien och Indien.",
      },
      {
        q: "Vilka varvsroller kan ni leverera?",
        a: "Vi levererar skrovmontörer, stålkonstruktörer, varvslåssmeder, TIG/MIG/MMA-svetsare, rörläggare, mekaniska montörer, varvstekniker, marinelektriker, fartygsmålare och blästrare.",
      },
      {
        q: "Hur ser rekryterings- och urvalsprocessen ut?",
        a: "Processen är enkel: 1) Ni delar era behov, 2) Vi väljer och granskar kandidatprofiler, 3) Vi delar profiler och bokar intervjuer, 4) Vi koordinerar mobilisering och dokumentation.",
      },
      {
        q: "Kan ni leverera personal för både korta och långa projekt?",
        a: "Ja, vi stödjer korttidsuppdrag, långtidsanställningar och fortlöpande bemanningsbehov, från enstaka specialister till kompletta varvsteam.",
      },
      {
        q: "Hur kommer vi i kontakt för att boka personal?",
        a: "Kontakta vårt team idag och dela era krav gällande roller, antal personer, erfarenhetsnivå och projektplats.",
      },
    ],
  },

  construction: {
    id: "construction",
    number: "02",
    code: "BEMANNING INOM BYGG & ANLÄGGNING",
    title: "Bygg & Anläggning",
    heading: "Söker ni erfaren byggpersonal?",
    badge: "KVALIFICERADE YRKESARBETARE",
    complianceBadges: [
      "Struktur- & Betongarbeten",
      "Mureri & Byggnadsarbeten",
      "El- & VVS-installatörer",
      "Ytskikt & Inredningsmontage",
      "Verifierad Yrkeskompetens",
      "Korttids-, Långtids- & Projektbasis",
    ],
    shortDescription:
      "Norvian AB levererar yrkesskickliga och erfarna byggnadsarbetare till byggföretag, entreprenörer och projekt över hela Europa. Vi hjälper företag att hitta pålitlig personal för bostads-, kommersiella, industriella och infrastrukturprojekt.\n\nVårt fokus ligger på att tillhandahålla kvalificerade yrkespersoner med praktisk erfarenhet, teknisk kompetens och god förståelse för arbetsplatssäkerhet.",
    detailedDescription:
      "Vi tillhandahåller erfarna europeiska byggnadsarbetare och internationella specialister som redan bor i Europa med giltiga visum och arbetstillstånd.\n\nVi erbjuder även direkt internationell rekrytering från Indien, Filippinerna, Vietnam, Brasilien och andra länder, och levererar yrkeskunnig personal för bostads-, kommersiella och storskaliga byggprojekt.\n\nVi stödjer byggföretag som söker personal för korttidsuppdrag, långtidsanställning och fortlöpande bemanningsbehov.",
    specializationCategories: [
      {
        category: "Struktur & Betongbyggnad",
        roles: [
          "Formsnickare",
          "Formbyggare",
          "Armerare & Järnbockare",
          "Betongarbetare",
          "Förstärkningsarbetare",
          "Ställningsbyggare",
        ],
      },
      {
        category: "Mureri & Byggnadsarbeten",
        roles: [
          "Murare",
          "Blockmurare",
          "Putsare",
          "Träarbetare / Snickare",
          "Takläggare",
          "Plattsättare",
        ],
      },
      {
        category: "El & Installationsteknik",
        roles: [
          "Byggelektriker",
          "Rörmokare & VVS-montörer",
          "Rörläggare",
          "Ventilationstekniker (HVAC)",
          "Mekaniska installatörer",
        ],
      },
      {
        category: "Ytskikt & Inredningsarbeten",
        roles: [
          "Målare",
          "Gipssnickare",
          "Undertaksmontörer",
          "Golvläggare",
          "Inredningssnickare",
        ],
      },
      {
        category: "Industri & Allmänt Byggande",
        roles: [
          "Stålbyggnadsmontörer",
          "Stålkonstruktörer",
          "Byggnadssvetsare",
          "Allmänna byggnadsarbetare",
          "Bygghjälparbetare",
        ],
      },
    ],
    workforce: [
      "Formsnickare",
      "Formbyggare",
      "Armerare & Järnbockare",
      "Betongarbetare",
      "Förstärkningsarbetare",
      "Ställningsbyggare",
      "Murare",
      "Blockmurare",
      "Putsare",
      "Träarbetare / Snickare",
      "Takläggare",
      "Plattsättare",
      "Byggelektriker",
      "Rörmokare & VVS-montörer",
      "Rörläggare",
      "Ventilationstekniker (HVAC)",
      "Mekaniska installatörer",
      "Målare",
      "Gipssnickare",
      "Undertaksmontörer",
      "Golvläggare",
      "Stålbyggnadsmontörer",
      "Stålkonstruktörer",
      "Byggnadssvetsare",
      "Allmänna byggnadsarbetare",
    ],
    expertise: [
      "Formsättning och modulära formsystem (PERI / Doka)",
      "Armeringsmontering och betonggjutning",
      "Murning, fasadputsning och plattsättning",
      "Elektriska installationer och kraftmatning",
      "VVS-dragning, rörledningar och ventilationsmontage",
      "Gipsväggar, akustikundertak och invändiga ytskikt",
      "Stålkonstruktionsresning och certifierad svetsning",
      "Arbetsmiljösäkerhet och efterlevnad av byggplatsstandarder",
    ],
    ctaText: "Begär Byggpersonal",
    image: "/images/construction_real.jpg",
    icon: Building2,
    stats: [
      { value: "5 Områden", label: "Yrkesinriktningar", sub: "Betong, mureri, VVS, ytskikt, stål" },
      { value: "EU & Globalt", label: "Rekryteringsnätverk", sub: "Europa, Indien, Filippinerna, Brasilien" },
      { value: "100%", label: "Arbetstillstånd", sub: "Giltiga visum och behörighetskort" },
      { value: "Flexibelt", label: "Bemanningsupplägg", sub: "Korttids-, långtids- och projektbasis" },
    ],
    technicalMatrix: [
      {
        discipline: "Struktur & Betongbyggnad",
        standards: "Eurocode 2 / EN 13670",
        capabilities: "Formbyggnad med moderna modulsystem, armering enligt ritning och kvalitetskontrollerad betonggjutning.",
        verification: "Täckskiktsmätning, kontroll av armeringsavstånd och dimensionskontroll.",
      },
      {
        discipline: "Mureri & Byggnadsarbeten",
        standards: "Eurocode 6 / EN 998",
        capabilities: "Bärande murverk, lättklinker- och tegelmurning, fasadputsning och fuktskydd.",
        verification: "Lod- och vågkontroll, vidhäftningsprov och foggranskning.",
      },
      {
        discipline: "El & Installationsteknik (MEP)",
        standards: "IEC 60364 / EN 806",
        capabilities: "Kabelförläggning, elcentraler, tappvatten- och avloppsstammar, ventilationskanaler.",
        verification: "Isolationsmätning, provtryckning och luftflödesmätning.",
      },
      {
        discipline: "Ytskikt & Stålkonstruktion",
        standards: "EN 1090-2 / Byggstandarder",
        capabilities: "Brandklassade gipssystem, undertak, montering av stålbalkar och pelare samt fältfogsvetsning.",
        verification: "Akustisk täthetskontroll, momentdragning av bultförband, visuell svetskontroll.",
      },
    ],
    tradeSpecialties: [
      {
        title: "Struktur- & Betongarbeten",
        desc: "Formsnickare, armerare och betongarbetare för grundläggning, stommar och anläggningsarbeten.",
        certs: "Formsystem • Armeringsteknik",
      },
      {
        title: "Mureri & Byggnation",
        desc: "Murare, putsare och snickare för täta och estetiskt fulländade klimatskärmar och stommar.",
        certs: "Eurocode 6 • Byggnormer",
      },
      {
        title: "El & Installationsteknik",
        desc: "Byggelektriker och VVS-montörer för moderna fastighetsinstallationer och energisystem.",
        certs: "Installationsbehöriga • Säkerhetstestade",
      },
      {
        title: "Ytskikt & Inredning",
        desc: "Gipssnickare, målare och golvläggare för färdigställande av kommersiella och bostadsytor.",
        certs: "Rumsakustik • Ytfinish",
      },
      {
        title: "Industriellt Stålmontage",
        desc: "Stålmontörer och certifierade svetsare för industrihallar, fackverk och bärande stålverk.",
        certs: "EN 1090-standard • Heta Arbeten",
      },
      {
        title: "Allmänna Byggarbetare & Hjälpare",
        desc: "Arbetsvillig och pålitlig byggpersonal för logistik, materialhantering och allmän service.",
        certs: "Säkerhetsintroduktion • Skyddsutbildade",
      },
    ],
    deploymentProcess: [
      {
        step: "01",
        title: "Dela Era Behov",
        desc: "Berätta vilka positioner ni behöver, antal yrkesarbetare, erfarenhetsnivå, projektplats och förväntad anställningstid.",
      },
      {
        step: "02",
        title: "Urval av Personal",
        desc: "Vi identifierar lämpliga kandidater och granskar deras byggerfarenhet, yrkeskompetens, certifikat och underlag.",
      },
      {
        step: "03",
        title: "Kandidatprofiler & Intervjuer",
        desc: "Vi tillhandahåller utvalda kandidatprofiler, CV:n och tillgängliga videor på yrkesutförande. Onlineintervjuer kan även arrangeras.",
      },
      {
        step: "04",
        title: "Rekrytering & Dokumentation",
        desc: "Vi samordnar rekryteringsprocessen och bistår med nödvändiga anställningshandlingar och arbetstillståndsförfaranden.",
      },
      {
        step: "05",
        title: "Mobilisering & Arbetsplatsstart",
        desc: "När juridiska dokument och anställningsarrangemang är klara ansluter de utvalda yrkesarbetarna till ert byggprojekt.",
      },
    ],
    employerAssurances: [
      {
        title: "Kvalificerade & Erfarna Yrkesarbetare",
        desc: "Vi fokuserar på arbetare med relevant byggerfarenhet och praktisk yrkesskicklighet. Kandidater väljs ut baserat på kvalifikationer, arbetshistorik och projektkrav.",
        tag: "PRAKTISK ERFARENHET",
      },
      {
        title: "Europeisk & Internationell Arbetskraft",
        desc: "Vi har tillgång till erfarna europeiska byggnadsarbetare och internationella specialister som redan bor i Europa med giltiga visum och arbetstillstånd.",
        tag: "EU & BOSATTA I EUROPA",
      },
      {
        title: "Direkt Internationell Rekrytering",
        desc: "Vi rekryterar kvalificerad byggpersonal från Indien, Filippinerna, Vietnam, Brasilien och andra internationella marknader enligt våra kunders önskemål.",
        tag: "GLOBALA KORRIDORER",
      },
      {
        title: "Verifiering av Yrkeskompetens",
        desc: "Vi granskar kandidaters erfarenhet, kvalifikationer och intyg. Praktiska färdighetsdemonstrationer och onlineintervjuer ordnas vid behov.",
        tag: "FÄRDIGHETSVERIFIERING",
      },
      {
        title: "Flexibel Bemanning",
        desc: "Oavsett om ni behöver några enstaka specialister eller en större arbetsstyrka för ett byggprojekt stöttar vi era bemanningskrav.",
        tag: "FLEXIBEL MOBILISERING",
      },
      {
        title: "Personal för Alla Typer av Projekt",
        desc: "Vi tillhandahåller arbetskraft för bostadsbyggande, kommersiella fastigheter, industrianläggningar, renoveringsprojekt och infrastrukturbyggen.",
        tag: "ALLA PROJEKTTYPER",
      },
    ],
    caseStudies: [
      {
        project: "Kommersiellt Kontorskomplex & Parkeringshus",
        clientType: "Europeisk Byggentreprenör",
        timeline: "Etappvis Mobilisering",
        impact: "Levererade 52 formsnickare, armerare och betongarbetare för grund- och stomarbeten. Stommen överlämnades 2 veckor före tidplan.",
        metrics: ["52 Yrkesarbetare", "2 Veckor Före Tidplan", "Noll Arbetsplatsolyckor"],
      },
      {
        project: "Bostadskvarter & Stadsutveckling",
        clientType: "Bostadsutvecklare & Byggbolag",
        timeline: "Nyckelfärdig Bemanningslösning",
        impact: "Tillsatte murare, putsare, elektriker och inredningslag för ett flerbostadsprojekt med komplett logistik- och boendestöd.",
        metrics: ["Kompletta Arbetslag", "100% Godkänd Kvalitet", "Hållen Budget"],
      },
    ],
    testimonial: {
      quote: "Norvian AB har kontinuerligt försett oss med skickliga formsnickare och armerare som levererar från dag ett. Deras praktiska kunnande och säkerhetsfokus gjorde stor skillnad i vårt projekt.",
      author: "Göran Bergström",
      role: "Projektchef",
      company: "Nordisk Byggentreprenad",
      country: "Sverige",
    },
    faqs: [
      {
        q: "Vilka byggroller tillhandahåller Norvian AB?",
        a: "Vi levererar struktur- och betongarbetare (formsnickare, armerare, ställningsbyggare), murningsyrken (murare, putsare), installationsyrken (elektriker, VVS, rörläggare), ytskiktsarbetare (gips, målare, golv) samt stålmontörer.",
      },
      {
        q: "Hur verifieras yrkeskompetensen hos byggpersonalen?",
        a: "Vi granskar arbetshistorik, referenser och certifikat. Vid behov genomför kandidater praktiska arbetsdemonstrationer på video och deltar i tekniska onlineintervjuer.",
      },
      {
        q: "Varifrån rekryteras er byggpersonal?",
        a: "Vi levererar erfarna europeiska arbetare, i Europa bosatta internationella yrkespersoner med arbetstillstånd, samt direktrekrytering från Indien, Filippinerna, Vietnam och Brasilien.",
      },
      {
        q: "Hjälper ni till med ID06, HMS och arbetsplatstillstånd?",
        a: "Ja, vi samordnar nödvändiga arbetstillstånd, anställningshandlingar och behörighetskort som krävs för regelefterlevnad på europeiska byggarbetsplatser.",
      },
      {
        q: "Kan ni tillhandahålla personal för både korta och långa projekt?",
        a: "Ja, allt från enstaka specialister för specifika etapper till fullständiga arbetslag för fleråriga entreprenader.",
      },
      {
        q: "Hur snabbt kan byggpersonal vara på plats?",
        a: "Europeisk och i Europa bosatt personal kan mobiliseras med kort varsel, medan internationell direktrekrytering beror på gällande visum- och handläggningstider.",
      },
    ],
  },

  logistics: {
    id: "logistics",
    number: "03",
    code: "BEMANNING AV LASTBILS- & TRAILERCHAUFFÖRER",
    title: "Transport & Logistik",
    heading: "Söker ni erfarna lastbils- och trailerchaufförer?",
    badge: "CE-CHAUFFÖRER & YKB KOD 95",
    complianceBadges: [
      "CE-kategorichaufförer",
      "Stöd för YKB Kod 95",
      "Europeiska & internationella förare",
      "Direktrekrytering: Indien, Filippinerna, Brasilien m.fl.",
      "Praktisk körverifiering",
      "Korttids-, långtids- & tillsvidareanställning",
    ],
    shortDescription:
      "Norvian AB levererar yrkesskickliga och erfarna lastbils- och trailerchaufförer till transport- och logistikföretag över hela Europa. Vi hjälper företag att hitta pålitliga förare för internationell transport, långdistansrutter och daglig logistikdrift.\n\nVårt fokus är att tillhandahålla professionella förare med praktisk körvana, god trafiksäkerhetsförståelse och de färdigheter som krävs för europeisk åkeridrift.",
    detailedDescription:
      "Vi tillhandahåller erfarna europeiska förare och internationella chaufförer som redan bor i Europa med giltiga uppehållstillstånd och arbetstillstånd.\n\nVi erbjuder även direkt internationell rekrytering av erfarna lastbils- och trailerchaufförer från Indien, Filippinerna, Vietnam, Brasilien, Zimbabwe och andra länder, inklusive förare med yrkeserfarenhet från Saudiarabien, Qatar, Kuwait och Förenade Arabemiraten.\n\nVi stöttar transportföretag som söker förare för korttidsuppdrag, långtidsanställning och tillsvidareanställning.",
    specializationCategories: [
      {
        category: "Lastbils- & Trailerchaufförer",
        roles: [
          "CE-kategori lastbilsförare",
          "Internationella trailerchaufförer",
          "Fjärrtransportförare (Long-Haul)",
          "Tunga godsbilschaufförer (HGV)",
        ],
      },
      {
        category: "Specialtransportförare",
        roles: [
          "Kyl- och frystrailerförare",
          "Containertransportchaufförer",
          "Curtainsider- & kapelltrailerförare",
          "Flaktrailerförare (Flatbed)",
          "Tankbilschaufförer",
        ],
      },
      {
        category: "Logistik- & Distributionsförare",
        roles: [
          "Regionala distributionsförare",
          "Inrikes transportchaufförer",
          "C-kategori lastbilsförare",
        ],
      },
    ],
    workforce: [
      "CE-kategori lastbilsförare",
      "Internationella trailerchaufförer",
      "Fjärrtransportförare (Long-Haul)",
      "Tunga godsbilschaufförer (HGV)",
      "Kyl- och frystrailerförare",
      "Containertransportchaufförer",
      "Curtainsider- & kapelltrailerförare",
      "Flaktrailerförare (Flatbed)",
      "Tankbilschaufförer",
      "Regionala distributionsförare",
      "Inrikes transportchaufförer",
      "C-kategori lastbilsförare",
    ],
    expertise: [
      "Körning av tunga kommersiella fordon (CE-körkort)",
      "Internationell fjärrtransport och ruttplanering",
      "Temperaturkontrollerad kylkedja och livsmedelstransport",
      "Intermodal containerhantering och hamndragbilar",
      "Lastsäkring på kapell- och flaktrailers",
      "ADR-farligt gods och tankbilsdrift",
      "Regional distribution och multi-drop logistik",
      "Digital färdskrivare och EU:s kör- och vilotidsregler",
    ],
    ctaText: "Begär Lastbils- & Trailerchaufförer",
    image: "/images/norvian_truck.jpg",
    icon: Truck,
    stats: [
      { value: "Klass CE", label: "Tunga Förare", sub: "Lastbil och trailer certifierade" },
      { value: "Kod 95", label: "YKB-stöd", sub: "Komplett kompetensutbildning" },
      { value: "Globalt", label: "Rekryteringsnätverk", sub: "EU, Indien, Filippinerna, Brasilien, Golfen" },
      { value: "100%", label: "Arbetstillstånd", sub: "Visum och tillstånd säkrade" },
    ],
    technicalMatrix: [
      {
        discipline: "Lastbils- & Trailerchaufförer (Klass CE)",
        standards: "EU-direktiv 2003/59/EG (Kod 95)",
        capabilities: "Euro 6 dragbilar och trailerkombinationer (40t-60t) för internationell fjärrtransport och gränsöverskridande logistik.",
        verification: "Körkortsverifiering, körhistorikkontroll och uppföljning av digitala färdskrivardata.",
      },
      {
        discipline: "Specialtransport (Kyl, Tank, Container)",
        standards: "ATP-kyltransport / ADR-normer",
        capabilities: "Kylaggregatsstyrning, transport av farligt gods, vridlåsning av sjöcontainrar och tung lastsäkring.",
        verification: "Praktisk bedömning av lastsäkring och certifiering för farligt gods.",
      },
      {
        discipline: "Logistik & Distribution",
        standards: "C- & CE-standarder",
        capabilities: "Inrikestransport, regional varudistribution, rampbackning och bakgavelliftsdrift.",
        verification: "Manövertester i tätortsmiljö och utvärdering vid lastkaj.",
      },
    ],
    tradeSpecialties: [
      {
        title: "CE-chaufförer för Fjärrtransport",
        desc: "Erfarna dragbilsförare för europeiska linjetransporter, nattkörningar och motorvägskorridorer.",
        certs: "Klass CE • Digitalt Förarkort",
      },
      {
        title: "Kyl- & Frystekniktrailers",
        desc: "Strikt temperaturövervakning för färskvaror, läkemedel och känsligt livsmedelsgods.",
        certs: "ATP-kvalificerad • Loggverifierad",
      },
      {
        title: "Intermodal Container & Flak",
        desc: "Hamn- och terminaltransporter med containerchassin samt flaktransporter för industriellt gods.",
        certs: "Lastsäkringsintyg • Hamnbehörighet",
      },
      {
        title: "Tankbil & Flytande Gods",
        desc: "Säker transport av bulkvätskor, petroleumprodukter och industrikemikalier i tankbil.",
        certs: "ADR-certifierad (Tank & Bulk)",
      },
      {
        title: "Kapelltrailer & Styckegods",
        desc: "Snabb sidolastning, palleterat industrigods och punktliga dörr-till-dörr transporter.",
        certs: "EN 12642 XL Lastsäkring",
      },
      {
        title: "Regional Distribution & Citylogistik",
        desc: "Skicklig manövrering i europeiska logistikparker, butiksleveranser och terminaldistribution.",
        certs: "Klass C/CE • Bakgavellift",
      },
    ],
    deploymentProcess: [
      {
        step: "01",
        title: "Dela Era Behov",
        desc: "Berätta hur många förare ni behöver, erforderliga körkortsbehörigheter, körvana, transporttyp och arbetsort.",
      },
      {
        step: "02",
        title: "Förarurval",
        desc: "Vi identifierar lämpliga kandidater och granskar deras körvana, körkort, kvalifikationer och underlag.",
      },
      {
        step: "03",
        title: "Kandidatprofiler & Intervjuer",
        desc: "Vi presenterar utvalda förarprofiler, CV:n och tillgängliga demonstrationsvideor på manövrering. Onlineintervjuer kan även arrangeras.",
      },
      {
        step: "04",
        title: "Rekrytering & Dokumentation",
        desc: "Vi samordnar rekryteringsprocessen och bistår med anställningshandlingar, arbetstillstånd och procedurer för yrkesförarkompetens där det krävs.",
      },
      {
        step: "05",
        title: "Mobilisering & Driftstart",
        desc: "När nödvändiga juridiska handlingar och yrkesbehörigheter är klara kan de utvalda förarna ansluta till er transportverksamhet.",
      },
    ],
    employerAssurances: [
      {
        title: "Professionell Körerfarenhet",
        desc: "Vi fokuserar på förare med relevant körvana av tunga fordon och trailers. Kandidater väljs ut baserat på körhistorik, tekniska färdigheter och yrkeskvalifikationer.",
        tag: "PRAKTISK ERFARENHET",
      },
      {
        title: "Europeiska & Internationella Förare",
        desc: "Vi har tillgång till erfarna europeiska förare och internationella chaufförer som redan bor i Europa med giltiga uppehålls- och arbetstillstånd.",
        tag: "EU & BOSATTA FÖRARE",
      },
      {
        title: "Direkt Internationell Rekrytering",
        desc: "Vi rekryterar erfarna lastbils- och trailerchaufförer från Indien, Filippinerna, Vietnam, Brasilien, Zimbabwe och andra marknader, inklusive förare med erfarenhet från Gulfländerna (Saudiarabien, Qatar, Kuwait, FAE).",
        tag: "GLOBALA KORRIDORER",
      },
      {
        title: "Verifiering av Körskicklighet",
        desc: "Vi granskar kandidaters körerfarenhet, körkort och intyg. Praktiska demonstrationsvideor och intervjuer kan ordnas före slutgiltigt val.",
        tag: "FÖRARVERIFIERING",
      },
      {
        title: "Körkort & YKB Kod 95-stöd",
        desc: "För internationella kandidater kan vi bistå med att samordna nödvändiga körkortsförfaranden, YKB Kod 95-utbildning och andra yrkeskvalifikationer enligt destinationslandets regelverk.",
        tag: "YKB KOD 95-STÖD",
      },
      {
        title: "Flexibel Förarrekrytering",
        desc: "Oavsett om ni behöver några enstaka förare eller ett större team för er åkeriverksamhet stöttar vi korttids-, långtids- och tillsvidarebehov.",
        tag: "FLEXIBEL FLOTTABEMANNING",
      },
    ],
    caseStudies: [
      {
        project: "Europeisk Fjärrtransportflotta",
        clientType: "Internationellt Fjärråkeri",
        timeline: "Snabb Mobilisering",
        impact: "Levererade 45 verifierade CE-trailerchaufförer med erfarenhet av internationella linjetransporter. Fullständig punktlighet och 100% efterlevnad av kör- och vilotider.",
        metrics: ["45 CE-förare", "100% Punktlighet", "Full EU-efterlevnad"],
      },
      {
        project: "Temperaturkontrollerad Kyl- & Livsmedelslogistik",
        clientType: "Skandinaviskt Åkerinätverk",
        timeline: "Säsongsexpansion",
        impact: "Rekryterade och tillsatte erfarna kyltrailerchaufförer med dokumenterad kunskap om temperaturkontrollerad transport under högsäsong.",
        metrics: ["Nyckelfärdig Bemanning", "Noll Kylkedjeavbrott", "Dygnet-Runt Drift"],
      },
    ],
    testimonial: {
      quote: "Att hitta erfarna trailerchaufförer som förstår trafiksäkerhet och europeiska regler tog tidigare månader. Norvian AB levererade skickliga förare med utmärkt körteknik och komplett dokumentationsstöd.",
      author: "Kristian Møller",
      role: "Driftchef Åkeri",
      company: "Nordic Freight Transport",
      country: "Sverige",
    },
    faqs: [
      {
        q: "Vilka körkortsbehörigheter har era förare?",
        a: "Vi tillhandahåller både CE-kategori (tung lastbil med släp/trailer) och C-kategori yrkesförare med verifierad yrkeserfarenhet.",
      },
      {
        q: "Hur verifierar ni praktisk körskicklighet hos internationella förare?",
        a: "Vi granskar fullständig körhistorik, validerar körkort och referenser, samt erbjuder videodokumentation som visar manövrering, rampbackning och trailerkoppling.",
      },
      {
        q: "Hjälper ni till med YKB Kod 95 och körkortsförfaranden?",
        a: "Ja. För internationella förare bistår vi med att samordna körkortsprocedurer, YKB Kod 95-utbildning och förarkompetensbevis enligt mottagarlandets bestämmelser.",
      },
      {
        q: "Från vilka länder rekryterar ni förare?",
        a: "Förutom europeiska och i Europa bosatta förare rekryterar vi direkt från Indien, Filippinerna, Vietnam, Brasilien, Zimbabwe samt förare med tidigare erfarenhet från Saudiarabien, Qatar, Kuwait och FAE.",
      },
      {
        q: "Kan vi intervjua och testa förare före beslut?",
        a: "Ja. Vi arrangerar digitala intervjuer och tillhandahåller körvideor så att era åkerichefer kan bedöma förarna innan de godkänns.",
      },
      {
        q: "Vilka anställningsformer erbjuder ni?",
        a: "Vi stöttar korttidsuppdrag, säsongstoppar, långtidsuppdrag samt direkt rekrytering för tillsvidareanställning.",
      },
    ],
  },
};

export const getServicesData = (lang?: "en" | "sv" | string): Record<ServiceKey, ServiceDetailItem> => {
  return lang === "sv" ? SERVICES_DATA_SV : SERVICES_DATA_EN;
};

export const SERVICES_DATA: Record<ServiceKey, ServiceDetailItem> = SERVICES_DATA_EN;
