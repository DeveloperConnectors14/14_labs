export const navItems = [
  { label: "RESEARCH", path: "/#research" },
  { label: "SERVICES", path: "/#services" },
  { label: "CASE STUDIES", path: "/#case-studies" },
  { label: "ABOUT US", path: "/about-us" },
];

export const contactInfo = {
  email: "contact@14labs.co",
  phone: "+92 318 7806914",
  location: "Lahore, Pakistan",
};

export const socialLinks = [
  { type: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/company/14labs" },
  { type: "x", label: "X", url: "https://x.com/14labs_co" },
];

export const footerColumns = [
  {
    title: "Explore",
    links: [
      { label: "Services", path: "/#services" },
      { label: "Case studies", path: "/#case-studies" },
      { label: "About us", path: "/about-us" },
      { label: "Contact", path: "/contact" },
    ],
  },
  {
    title: "Research",
    links: [
      { label: "Publications", path: "/#research" },
      { label: "Our focus", path: "/#research-areas" },
    ],
  },
];

// Institutions our papers' co-authors are affiliated with (from the publishers'
// affiliation records). Shown as "co-authored with researchers from", not as
// partners. Logos are white versions; width/height are the files' pixel sizes.
// `label` adds the name beside seal-only logos, which are unreadable when small.
export const collaborators = [
  { name: "DFKI (German Research Center for Artificial Intelligence)", country: "Germany", logo: "partners/dfki.webp", width: 290, height: 240 },
  { name: "University of Engineering and Technology, Lahore", country: "Pakistan", logo: "partners/uet.webp", width: 240, height: 240, label: "UET Lahore" },
  { name: "Istanbul Technical University", country: "Türkiye", logo: "partners/itu.webp", width: 426, height: 240 },
  { name: "Yonsei University", country: "South Korea", logo: "partners/yonsei.webp", width: 239, height: 239, label: "Yonsei University" },
  { name: "Osaka Metropolitan University", country: "Japan", logo: "partners/osaka.webp", width: 1139, height: 222 },
  { name: "University of Pittsburgh", country: "United States", logo: "partners/pitt.webp", width: 530, height: 236 },
  { name: "University of Udine", country: "Italy", logo: "partners/udine.webp", width: 240, height: 240, label: "University of Udine" },
];

// Homepage hero background photos, shown as a slow crossfade under the brand
// gradient. Unsplash photos (downloaded via the API download endpoint).
export const heroSlides = [
  { src: "hero/agriculture.webp", theme: "Agriculture", credit: "Bernd Dittrich", url: "https://unsplash.com/photos/aerial-view-of-agricultural-fields-at-sunset-with-distant-hills-ZIBr6-klEVE" },
  { src: "hero/materials.webp", theme: "Materials", credit: "Clayton Cardinalli", url: "https://unsplash.com/photos/laser-cutting-machine-with-orange-sparks-hkJNx0EDbjE" },
  { src: "hero/energy-city-grid.webp", theme: "Energy", credit: "Shio Yang", url: "https://unsplash.com/photos/aerial-view-of-city-during-night-time-b6i9pe16pAg" },
];

export const caseStudies = [
  {
    id: "find-sites-workflow",
    title: "AI Find Sites Real Estate Solution",
    img: "cases/find-sites-card.webp",
  },
  {
    id: "ai-admission-counselor",
    title: "AI Admission Counselor",
    img: "cases/admission-card.webp",
  },
];

export const researchAreas = [
  {
    icon: "WbSunnyOutlined",
    title: "Solar energy forecasting",
    desc: "Multi-horizon irradiance and PV power forecasting.",
    topics: ["solar"],
  },
  {
    icon: "Biotech",
    title: "Explainable ML for materials",
    desc: "Interpretable prediction of material properties and fatigue life.",
    topics: ["materials", "nano"],
  },
  {
    icon: "CenterFocusStrongOutlined",
    title: "Computer vision & safety",
    desc: "Real-time detection with vision and sensor fusion.",
    topics: ["vision"],
  },
  {
    icon: "EnergySavingsLeafOutlined",
    title: "Sustainability analytics",
    desc: "Air quality prediction for sustainable cities.",
    topics: ["environment"],
  },
];

export const services = [
  {
    sNo: "01",
    title: "Applied ML & forecasting",
    desc: "Predictive and explainable machine learning for energy, engineering and operations, from data pipelines to validated models.",
    tags: [
      "Time-series forecasting",
      "Explainable ML (SHAP)",
      "Predictive modelling",
      "Model evaluation",
    ],
  },
  {
    sNo: "02",
    title: "Research & academic collaboration",
    desc: "Joint research with universities and labs: problem framing, experiments, publications and supervised student projects.",
    tags: [
      "Joint research",
      "Peer-reviewed publications",
      "Student projects",
      "MOUs",
    ],
  },
  {
    sNo: "03",
    title: "Multi-agent systems",
    desc: "Development of multi-agent systems with built-in observability, enabling monitoring and optimizing specialized agents operating at enterprise scale.",
    tags: [
      "Agent orchestration",
      "Built-in observability",
      "Enterprise scale",
      "Real-time monitoring",
    ],
  },
  {
    sNo: "04",
    title: "Custom AI solutions",
    desc: "Designing intelligent solutions for the future. We build custom AI models and applications tailored to your unique business challenges.",
    tags: [
      "RAG systems",
      "Fine-tuned models",
      "AI chatbots",
      "Knowledge bases",
    ],
  },
];

export const caseDetails = [
  {
    caseId: "find-sites-workflow",
    // Article layout (centred header, cover, reading column); see CaseHeader/CaseArticle.
    layout: "article",
    // Photos: Unsplash (free licence) by Max Böttinger (cover) and Sean Pollock (card).
    cover: "cases/find-sites-cover.webp",
    hero: {
      title: "AI Find Sites Real Estate Solution",
      subtitle:
        "AI-Driven Commercial Real Estate Site Discovery - Automating hours of manual research into minutes of intelligent analysis",
      stats: [
        { label: "Industry", value: "Real Estate" },
        { label: "Timeline", value: "1 Month" },
        { label: "Engineers", value: "3" },
        { label: "Pipeline nodes", value: "11" },
      ],
    },
    challenges: {
      label: "The challenge",
      title: "Commercial real estate site discovery pain points",
      text: "Traditional site research methods are inefficient, error-prone, and lack the automation that modern commercial real estate professionals need.",
      items: [
        {
          sNo: "01",
          title: "Time-intensive research",
          desc: "Analysts spend 6-8 hours per day manually searching across LoopNet, CBRE, JLL, and local broker websites with no integration or automation",
        },
        {
          sNo: "02",
          title: "Fragmented & incomplete data",
          desc: "Property information scattered across 5+ sources with missing contact details, broker information, and geographic data that requires manual consolidation",
        },
        {
          sNo: "03",
          title: "No verification standards",
          desc: "Addresses, square footage, property attributes, and contact details lack systematic verification, leading to 30%+ data inaccuracy rates",
        },
        {
          sNo: "04",
          title: "Missed opportunities",
          desc: "Manual processes create response delays, duplicate efforts, and significant property discovery gaps that competitors find through automation",
        },
      ],
    },
    cost: {
      text: "These challenges compound daily: analysts spend 6-8 hours per property discovery, data accuracy drops to 70%, and critical opportunities are missed entirely. The result is slower deal cycles, higher operational costs, and competitive disadvantage. Automation is no longer optional—it's essential.",
    },
    approach: {
      label: "Our approach",
      title: "AI-powered workflow",
      text: "An intelligent sequential pipeline that automates commercial real estate research from initial discovery through final qualification.",
      steps: [
        {
          step: "STEP 1",
          icon: "SearchOutlined",
          title: "Automated deep research",
          desc: "AI searches across LoopNet, CBRE, JLL, Brixmor, and local broker websites automatically, discovering properties that match your criteria.",
        },
        {
          step: "STEP 2",
          icon: "StorageOutlined",
          title: "Structured data extraction",
          desc: "Intelligently extracts property details, broker contacts (name, title, email, phone), and rental information from research findings.",
        },
        {
          step: "STEP 3",
          icon: "LocationOnOutlined",
          title: "Geolocation verification",
          desc: "Verifies address accuracy using Google Geocoding API and enriches data with GPS coordinates and CBSA information.",
        },
        {
          step: "STEP 4",
          icon: "VisibilityOutlined",
          title: "Computer vision analysis",
          desc: "Analyzes aerial and street-view imagery to verify property attributes like square footage, asset type, and premises classification.",
        },
      ],
    },
    architecture_highlights: [
      {
        value: "11",
        label: "Pipeline nodes",
        desc: "Sequential workflow with specialized processing at each stage",
      },
      {
        value: "∞",
        label: "Scalability",
        desc: "Extensible architecture supporting new data sources",
      },
      {
        value: "100%",
        label: "Data quality",
        desc: "Multi-stage QA with verification and validation",
      },
    ],
    pipeline: {
      label: "Architecture",
      title: "Intelligent pipeline architecture",
      text: "Click on any node to explore its role and data flow",
      nodes: [
        { id: "global", label: "Global config", color: "#377BBB" },
        { id: "geo", label: "Geography input", color: "#377BBB" },
        { id: "research", label: "Deep research", color: "#00895E" },
        { id: "extract", label: "Site extraction", color: "#BB7000" },
        { id: "geocode", label: "Geocode", color: "#BB7000" },
        { id: "analysis", label: "Site attribute analysis", color: "#BB7000" },
        { id: "join", label: "Join", color: "#BB7000" },
        { id: "filter", label: "Filter", color: "#BB7000" },
        { id: "qa", label: "QA node", color: "#BC2831" },
        { id: "excel", label: "Excel output", color: "#4B4DB6" },
        { id: "log", label: "Workflow log", color: "#4B4DB6" },
      ],

      edges: [
        ["global", "geo"],
        ["geo", "research"],
        ["research", "extract"],
        ["extract", "geocode"],
        ["extract", "analysis"],
        ["join", "geocode"],
        ["join", "analysis"],
        ["join", "filter"],
        ["filter", "qa"],
        ["qa", "excel"],
        ["qa", "log"],
      ],

      layout: [
        ["global"],
        ["geo"],
        ["research"],
        ["extract"],
        ["geocode", "analysis"],
        ["join"],
        ["filter"],
        ["qa"],
        ["excel", "log"],
      ],
    },
    key_features: {
      label: "Capabilities",
      title: "Key features",
      text: "A comprehensive suite of AI-powered tools to automate commercial real estate site discovery and qualification.",
      list: [
        {
          title: "Deep research automation",
          desc: "Searches across LoopNet, CBRE, JLL, Brixmor, and local broker websites automatically, discovering properties missed by manual searching.",
        },
        {
          title: "Comprehensive contact data",
          desc: "Extracts complete broker information including name, title, company, direct email, and phone numbers for immediate outreach.",
        },
        {
          title: "Geolocation verification",
          desc: "Validates addresses and enriches with GPS coordinates, CBSA codes, and metropolitan area data for accurate location intelligence.",
        },
        {
          title: "Computer vision analysis",
          desc: "Analyzes aerial and street view imagery to verify property attributes, square footage, and premises classification.",
        },
        {
          title: "Multi-stage quality assurance",
          desc: "User-configurable qualification criteria with data legitimacy, recency, and criteria matching for transparent decision making.",
        },
        {
          title: "Real-time monitoring",
          desc: "Google Sheets integration logs all workflow executions for tracking, debugging, and maintaining an audit trail.",
        },
      ],
    },
    techStack: {
      label: "Built with",
      title: "Technology stack",
      text: "Enterprise-grade technologies powering scalable, intelligent multi-agent systems.",
      stacks: [
        {
          techType: "Backend",
          values: [
            { name: "FastAPI", file: "fastapi-original" },
            { name: "Python", file: "python-original" },
          ],
        },
        {
          techType: "Database",
          values: [
            { name: "Google Sheets", file: "googlesheets" },
          ],
        },
        {
          techType: "AI Framework",
          values: [
            { name: "CrewAI", file: "crewai" },
            { name: "LangChain", file: "langchain" },
          ],
        },
        {
          techType: "LLM",
          values: [
            { name: "OpenAI GPT-4o", file: "openai-2" },
            { name: "OpenAI GPT-5.2", file: "openai-2" },
            { name: "Gemini Vision API", file: "gemini" },
          ],
        },
      ],
    },
    top_features: [
      {
        title: "Sequential pipeline architecture",
        desc: "11-node data enrichment pipeline processing sites through multiple AI-powered stages for comprehensive analysis.",
      },
      {
        title: "Multi-source integration",
        desc: "Integrates Google APIs, AI research, computer vision, and geocoding services into unified workflow.",
      },
      {
        title: "Real-time monitoring & logging",
        desc: "Google Sheets integration for workflow monitoring, execution tracking, and audit trails.",
      },
    ],
    more_cases: [
      {
        id: "ai-admission-counselor",
        title: "AI Admission Counselor",
        img: "cases/admission-card.webp",
      },
    ],
  },
  {
    caseId: "ai-admission-counselor",
    layout: "article",
    // Photos: Unsplash (free licence) by Zhanhui Li (cover) and Dragos Blaga (card).
    cover: "cases/admission-cover.webp",
    hero: {
      title: "AI-Powered Admission Counselor",
      subtitle:
        "Transforming University Admissions with Multi-Agent Intelligence",
      stats: [
        { label: "Industry", value: "EdTech" },
        { label: "Timeline", value: "3 months" },
        { label: "Team size", value: "4 engineers" },
        { label: "Agents", value: "7 AI" },
      ],
    },
    challenges: {
      label: "The challenge",
      title: "The problem",
      text: "Applying to universities—especially internationally—is a fragmented and overwhelming process.",
      items: [
        {
          sNo: "01",
          desc: "Students spend 40+ hours on manual university research",
        },
        {
          sNo: "02",
          desc: "Application requirements vary widely across institutions",
        },
        {
          sNo: "03",
          desc: "Scholarship discovery is scattered and often outdated",
        },
        {
          sNo: "04",
          desc: "Visa requirements are complex and frequently changing",
        },
        {
          sNo: "05",
          desc: "Students miss deadlines due to poor planning or lack of guidance",
        },
      ],
    },
    approach: {
      label: "Our approach",
      title: "The solution",
      text: "We built an AI-driven, agentic admissions consulting platform that breaks the process into specialized domains with intelligent orchestration at the core.",
      steps: [
        {
          step: "STEP 1",
          icon: "AccountTreeOutlined",
          title: "Master-worker architecture",
          desc: "Centralized orchestrator agent coordinates with 6 specialist agents, each handling specific domains",
        },
        {
          step: "STEP 2",
          icon: "GroupsOutlined",
          title: "1 orchestrator + 6 specialists",
          desc: "Admission Counselor routes requests to University Search, Application Requirements, Scholarship Search, Scholarship Requirements, Essay, and Visa agents",
        },
        {
          step: "STEP 3",
          icon: "InsightsOutlined",
          title: "Data-driven recommendations",
          desc: "Personalized recommendations based on student profiles and real data, not generic advice",
        },
        {
          step: "STEP 4",
          icon: "BoltOutlined",
          title: "Automated discovery",
          desc: "Automates research across universities, scholarships, and visa requirements while keeping humans in control",
        },
      ],
    },
    architecture_highlights: [
      {
        value: "1",
        desc: "Central Orchestrator for unified student experience",
      },
      {
        value: "6",
        desc: "Specialized agents handling different admission domains",
      },
      {
        value: "∞",
        desc: "Scalable to add new agents and domains as needed",
      },
    ],
    pipeline: {
      label: "Architecture",
      title: "Multi-agent system",
      text: "Click on any agent to explore its role and responsibilities",
      nodes: [
        { id: "university", label: "University", color: "#377BBB" },
        { id: "visa", label: "Visa", color: "#377BBB" },
        { id: "application", label: "Application", color: "#00895E" },
        { id: "counselor", label: "Admission counselor", color: "#BC2831" },
        { id: "scholarship", label: "Scholarship", color: "#BB7000" },
        { id: "essay", label: "Essay", color: "#BB7000" },
      ],

      edges: [
        ["university", "counselor"],
        ["visa", "counselor"],
        ["application", "counselor"],
        ["scholarship", "counselor"],
        ["essay", "counselor"],
      ],

      layout: [
        ["university"],
        ["visa", "application"],
        ["counselor"], // center
        ["scholarship", "essay"],
      ],
    },
    key_features: {
      label: "Capabilities",
      title: "Key features",
      text: "A comprehensive suite of AI-powered tools to guide students through every step of the admissions journey.",
      list: [
        {
          title: "Intelligent conversation routing",
          desc: "Understands student queries and routes them to the right specialist agent with full context preservation.",
        },
        {
          title: "Real-time university matching",
          desc: "Instant matching of universities based on academic profile, preferences, and goals with detailed rankings.",
        },
        {
          title: "Scholarship discovery engine",
          desc: "Comprehensive search across thousands of scholarships to find the best opportunities for each student.",
        },
        {
          title: "Application timeline management",
          desc: "Automated deadline tracking, document checklists, and progress monitoring across all applications.",
        },
        {
          title: "Essay assistance & review",
          desc: "AI-powered feedback on personal essays and statements with suggestions for improvement and impact.",
        },
        {
          title: "Visa guidance & requirements",
          desc: "Country-specific visa information, requirements, and procedural guidance for international students.",
        },
      ],
    },
    techStack: {
      label: "Built with",
      title: "Technology stack",
      text: "Enterprise-grade technologies powering scalable, intelligent multi-agent systems.",
      stacks: [
        {
          techType: "Backend",
          values: [
            { name: "Flask", file: "flask" },
            { name: "Python", file: "python-original" },
          ],
        },
        {
          techType: "Database",
          values: [
            { name: "Supabase", file: "supabase" },
            { name: "PostgreSQL", file: "postgresql-original" },
          ],
        },
        {
          techType: "AI Framework",
          values: [
            { name: "CrewAI", file: "crewai" },
          ],
        },
        {
          techType: "LLM",
          values: [
            { name: "OpenAI GPT-4", file: "openai-2" },
          ],
        },
      ],
    },
    results: {
      label: "Results",
      title: "Measurable impact",
      text: "The agentic system delivered tangible value through intelligent automation and comprehensive guidance.",
      items: [
        { value: "75%", label: "Time reduction", desc: "Reduction in manual research time for students" },
        { value: "6", label: "Specialist agents", desc: "AI agents working in coordination to provide end-to-end guidance" },
        { value: "1", label: "Master orchestrator", desc: "Central coordinator ensuring cohesive student experience" },
        { value: "∞", label: "Scalability", desc: "Easily extensible architecture for future agents and domains" },
      ],
    },
    top_features: [
      {
        title: "Event-driven",
        desc: "Microservices architecture with asynchronous message processing",
      },
      {
        title: "Scalable",
        desc: "Designed to handle thousands of concurrent student interactions",
      },
      {
        title: "Reliable",
        desc: "Enterprise-grade infrastructure with 99.9% uptime guarantee and robust monitoring",
      },
    ],
    more_cases: [
      {
        id: "find-sites-workflow",
        title: "AI Find Sites Real Estate Solution",
        img: "cases/find-sites-card.webp",
      },
    ],
  },
];

// Vision, mission and values, from the "14Labs Research – Main Document".
export const about = {
  vision: "Machine learning research that solves humanity's real problems.",
  mission: "We do original, rigorous machine learning research for organizations tackling real-world problems, turning new ideas into solutions that work and benefit people.",
};

export const values = [
  {
    title: "Novel work",
    desc: "We pursue original ideas, not repackaged ones. If an existing tool already solves a client's problem, we tell them.",
  },
  {
    title: "Quality first",
    desc: "We only deliver results we can stand behind: reproducible experiments, honest evaluation, and clear reporting of what didn't work.",
  },
  {
    title: "People before profit",
    desc: "We choose projects by their benefit to people, and we turn down work that would cause harm.",
  },
  {
    title: "Real problems, real outcomes",
    desc: "We measure success by impact in the real world, not just benchmark scores.",
  },
];

// 14Labs people without a profile card, still highlighted in author lists.
export const otherTeamAuthors = ["Muhammad Baqir"];

export const team = [
  {
    name: "Faisal Ali",
    aliases: ["Faisal Ali"],
    role: "Researcher & Mechanical Engineer",
    bio: "Building intelligent applications and explainable models for energy, engineering and enterprise systems.",
    education: "BSc Mechanical Engineering, UET Lahore",
    photo: "team/faisal-ali-2026.webp",
    links: [
      { type: "scholar", url: "https://scholar.google.com/citations?user=oTPZS2oAAAAJ" },
      { type: "portfolio", url: "https://engfaisaluet.netlify.app/" },
      { type: "email", url: "mailto:engfaisaluet@14labs.co" },
    ],
  },
  {
    name: "Mehmood Ul Haq",
    aliases: ["Mehmood Ul Haq", "Mehmood ul Haq"],
    role: "AI/ML Researcher",
    bio: "Computer Engineering graduate focused on AI, machine learning, deep learning and NLP, building impactful, scalable AI solutions for complex real-world challenges.",
    education: "MS Data Science, UET Lahore",
    photo: "team/mehmood-ul-haq-2026.webp",
    links: [
      { type: "scholar", url: "https://scholar.google.com/citations?user=oRDkaNIAAAAJ" },
      { type: "linkedin", url: "https://www.linkedin.com/in/mehmodulhaq570/" },
      { type: "github", url: "https://github.com/mehmoodulhaq570" },
      { type: "portfolio", url: "https://mehmoodulhaq570.netlify.app/" },
      { type: "email", url: "mailto:mehmoodulhaq1040@14labs.co" },
    ],
  },
  {
    name: "Muhammad Ilyas",
    aliases: ["Muhammad Ilyas"],
    role: "Machine Learning Engineer",
    bio: "Builds real-time, production-style AI systems, with strengths in computer vision, deep learning and deployment. His final-year project was a real-time violence detection system.",
    education: "BS Computer Science",
    photo: "team/muhammad-ilyas.webp",
    links: [
      { type: "email", url: "mailto:m.ilyaskhan5383@14labs.co" },
    ],
  },
];
