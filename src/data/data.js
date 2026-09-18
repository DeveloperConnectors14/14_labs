// Research leads the nav on purpose: it is the thing that says "lab" before a
// visitor reads a single word of copy.
export const navItems = [
  { label: "Research", path: "/research" },
  { label: "Work", path: "/case-studies" },
  { label: "What We Do", path: "/services" },
  { label: "About", path: "/about-us" },
  { label: "Contact", path: "/contact" },
];

export const site = {
  motto: "AI engineering, applied machine learning & research",
  email: "contact@14labs.co",
  phone: "+92 318 7806914",
  x: "https://x.com/14labs_co",
  linkedin: "https://www.linkedin.com/company/14labs",
};

export const caseStudies = [
  {
    id: "find-sites-workflow",
    title: "AI Find Sites Real Estate Solution",
    img: "case1.png",
    date: "1st January 2024",
  },
  {
    id: "ai-admission-counselor",
    title: "AI Admission Counselor",
    img: "case2.png",
    date: "1st January 2024",
  },
];

// Framed as failure modes we have actually watched happen, not as a generic
// list of pain points. Each one is answerable by a practice on the services
// page or by the work — Stalls carries the link per card.
export const challanges = [
  {
    sNo: "01",
    title: "The Demo Works. The System Doesn't.",
    desc: "Moving from a controlled prototype to a real product requires handling unpredictable users, data, and scale. Most pilots die between the notebook and the first real user.",
  },
  {
    sNo: "02",
    title: "You Can't Improve What You Can't Measure.",
    desc: "AI systems can change from one release to the next without anyone knowing what actually improved. Good evaluation makes those changes measurable.",
  },
  {
    sNo: "03",
    title: "The Knowledge Is There. The Model Can't Reach It.",
    desc: "Your knowledge may live across documents, databases, wikis, and internal tools. The challenge is finding the right information when the user needs it.",
  },
  {
    sNo: "04",
    title: "Adding More Agents Doesn't Always Help.",
    desc: "Complex workflows can become difficult to debug, trace, and control. The first step is understanding what each agent is doing and why.",
  },
];

export const stats = [
  { value: "15+", label: "Projects Delivered", note: "In production, not pilots" },
  { value: "10+", label: "Client Teams", note: "Across four industries" },
  { value: "4+", label: "Years Building", note: "Since before the agent boom" },
  { value: "95%", label: "Satisfaction", note: "Measured post-engagement" },
];

// Presented as engagement shapes rather than packages. `question` is the thing
// each one actually answers — that framing is what a lab sells, not a tier.
export const pricing = [
  {
    title: "Pilot",
    duration: "2–3 weeks",
    question: "Is this worth building at all?",
    details: "One use case, One measurable KPI, Evaluation set you keep, Written go / no-go",
    pricing: "$1,000 – $3,000",
  },
  {
    title: "Build",
    duration: "4–6 weeks",
    question: "Make it survive real users.",
    details: "Production deployment, Tracing and monitoring, CI regression gates, Handover documentation",
    pricing: "$3,000 – $8,000",
  },
  {
    title: "Partner",
    duration: "Ongoing",
    question: "Keep it improving after launch.",
    details: "New workflows, Retraining and evals, Cost and latency tuning, Embedded with your team",
    pricing: "$8,000+",
  },
];

// Four practices, no web-development line. Everything here maps to work we
// have shipped — the tags are capabilities, not keywords.
export const services = [
  {
    sNo: "01",
    title: "Multi-Agent Systems",
    short: "Multi-Agent Systems",
    tagline: "Pipelines of specialised agents, each with a contract, a budget and a trace.",
    desc: "Orchestrated pipelines where each step is a specialised agent with a defined contract, a budget and a trace. We design the topology, then build the plumbing that makes it debuggable at three in the morning.",
    tags: [
      "Orchestration & routing",
      "Tool and API contracts",
      "Tracing & cost control",
      "Failure and retry design",
    ],
  },
  {
    sNo: "02",
    title: "Retrieval & Knowledge Systems",
    short: "Retrieval",
    tagline: "The right context in front of the model — measured, not guessed.",
    desc: "Getting the right context in front of the model is most of the work. We build the ingestion, chunking, indexing and reranking layers — and measure retrieval quality separately from generation quality, because they fail for different reasons.",
    tags: [
      "Hybrid & semantic retrieval",
      "Document ingestion pipelines",
      "Reranking & context assembly",
      "Domain knowledge bases",
    ],
  },
  {
    sNo: "03",
    title: "Applied Machine Learning",
    short: "Applied ML",
    tagline: "Models chosen for the decision they support, not for the hype cycle.",
    desc: "Model work that starts from the decision it has to support. Fine-tuning where it earns its cost, classical models where they beat an LLM, and honest analysis of when neither is the answer.",
    tags: [
      "Fine-tuning & adaptation",
      "Structured extraction",
      "Forecasting & classification",
      "Data & feature pipelines",
    ],
  },
  {
    sNo: "04",
    title: "Evaluation & Reliability",
    short: "Evaluation",
    tagline: "Golden sets, regression gates and tracing, so every change is measurable.",
    desc: "The part most teams skip. Golden sets, offline evals, regression gates in CI and production tracing — so a change to a prompt is a measurable engineering decision instead of a guess.",
    tags: [
      "Eval harnesses & golden sets",
      "Regression gates in CI",
      "Production observability",
      "Latency & spend budgets",
    ],
  },
];

export const tools = [
  {
    techType: "Models",
    values: [
      { file: "anthropic", name: "Anthropic" },
      { file: "openai-2", name: "OpenAI" },
      { file: "gemini", name: "Gemini" },
      { file: "huggingface", name: "Hugging Face" },
    ],
  },
  {
    techType: "Orchestration",
    values: [
      { file: "langchain", name: "LangChain" },
      { file: "crewai", name: "CrewAI" },
      { file: "python-original", name: "Python" },
    ],
  },
  {
    techType: "Serving & Data",
    values: [
      { file: "fastapi-original", name: "FastAPI" },
      { file: "postgresql-original", name: "PostgreSQL" },
      { file: "redis-original", name: "Redis" },
      { file: "supabase", name: "Supabase" },
    ],
  },
  {
    techType: "Infrastructure",
    values: [
      { file: "amazonwebservices-original-wordmark", name: "AWS" },
      { file: "docker-original", name: "Docker" },
      { file: "kubernetes-original", name: "Kubernetes" },
    ],
  },
];

// How we work. Deliberately stated as commitments that can be checked against
// us later — "Fast / Competitive Pricing / Support" could have described anyone.
export const features = [
  {
    sNo: "01",
    title: "We Measure What We Build",
    desc: "We define how success will be measured from the start, so we can see what is improving and what needs to change.",
  },
  {
    sNo: "02",
    title: "We Start With What Works",
    desc: "We use the simplest approach that can solve the problem well. We add complexity only when it brings a clear improvement.",
  },
  {
    sNo: "03",
    title: "You Own What We Build",
    desc: "The code, infrastructure, evaluation, and documentation stay with you. We don't build systems that depend on us to keep working.",
  },
];

export const caseDetails = [
  {
    caseId: "find-sites-workflow",
    hero: {
      title: "AI Find Sites Real Estate Solution",
      subtitle:
        "AI-Driven Commercial Real Estate Site Discovery - Automating hours of manual research into minutes of intelligent analysis",
      stats: [
        { label: "Industry", value: "Real Estate" },
        { label: "Timeline", value: "1 Month" },
        { label: "Engineers", value: "3" },
        { label: "Pipeline Nodes", value: "11" },
      ],
    },
    challenges: {
      label: "The Challenge",
      title: "Commercial Real Estate Site Discovery Pain Points",
      text: "Traditional site research methods are inefficient, error-prone, and lack the automation that modern commercial real estate professionals need.",
      items: [
        {
          sNo: "01",
          title: "Time-Intensive Research",
          desc: "Analysts spend 6-8 hours per day manually searching across LoopNet, CBRE, JLL, and local broker websites with no integration or automation",
        },
        {
          sNo: "02",
          title: "Fragmented & Incomplete Data",
          desc: "Property information scattered across 5+ sources with missing contact details, broker information, and geographic data that requires manual consolidation",
        },
        {
          sNo: "03",
          title: "No Verification Standards",
          desc: "Addresses, square footage, property attributes, and contact details lack systematic verification, leading to 30%+ data inaccuracy rates",
        },
        {
          sNo: "04",
          title: "Missed Opportunities",
          desc: "Manual processes create response delays, duplicate efforts, and significant property discovery gaps that competitors find through automation",
        },
      ],
    },
    cost: {
      text: "These challenges compound daily: analysts spend 6-8 hours per property discovery, data accuracy drops to 70%, and critical opportunities are missed entirely. The result is slower deal cycles, higher operational costs, and competitive disadvantage. Automation is no longer optional—it's essential.",
    },
    approach: {
      label: "Our Approach",
      title: "AI-Powered Workflow",
      text: "An intelligent sequential pipeline that automates commercial real estate research from initial discovery through final qualification.",
      steps: [
        {
          step: "STEP 1",
          icon: "SearchOutlined",
          title: "Automated Deep Research",
          desc: "AI searches across LoopNet, CBRE, JLL, Brixmor, and local broker websites automatically, discovering properties that match your criteria.",
        },
        {
          step: "STEP 2",
          icon: "StorageOutlined",
          title: "Structured Data Extraction",
          desc: "Intelligently extracts property details, broker contacts (name, title, email, phone), and rental information from research findings.",
        },
        {
          step: "STEP 3",
          icon: "LocationOnOutlined",
          title: "Geolocation Verification",
          desc: "Verifies address accuracy using Google Geocoding API and enriches data with GPS coordinates and CBSA information.",
        },
        {
          step: "STEP 4",
          icon: "VisibilityOutlined",
          title: "Computer Vision Analysis",
          desc: "Analyzes aerial and street-view imagery to verify property attributes like square footage, asset type, and premises classification.",
        },
      ],
    },
    architecture_highlights: [
      {
        value: "11",
        label: "Pipeline Nodes",
        desc: "Sequential workflow with specialized processing at each stage",
      },
      {
        value: "∞",
        label: "Scalability",
        desc: "Extensible architecture supporting new data sources",
      },
      {
        value: "100%",
        label: "Data Quality",
        desc: "Multi-stage QA with verification and validation",
      },
    ],
    pipeline: {
      label: "Architecture",
      title: "Intelligent Pipeline Architecture",
      text: "Every node in the flow, in the order the data moves through it",
      nodes: [
        { id: "global", label: "Global Config", color: "#377BBB" },
        { id: "geo", label: "Geography Input", color: "#377BBB" },
        { id: "research", label: "Deep Research", color: "#00895E" },
        { id: "extract", label: "Site Extraction", color: "#BB7000" },
        { id: "geocode", label: "Geocode", color: "#BB7000" },
        { id: "analysis", label: "Site Attribute Analysis", color: "#BB7000" },
        { id: "join", label: "Join", color: "#BB7000" },
        { id: "filter", label: "Filter", color: "#BB7000" },
        { id: "qa", label: "QA Node", color: "#BC2831" },
        { id: "excel", label: "Excel Output", color: "#4B4DB6" },
        { id: "log", label: "Workflow Log", color: "#4B4DB6" },
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
      title: "Key Features",
      text: "A comprehensive suite of AI-powered tools to automate commercial real estate site discovery and qualification.",
      list: [
        {
          title: "Deep Research Automation",
          desc: "Searches across LoopNet, CBRE, JLL, Brixmor, and local broker websites automatically, discovering properties missed by manual searching.",
        },
        {
          title: "Comprehensive Contact Data",
          desc: "Extracts complete broker information including name, title, company, direct email, and phone numbers for immediate outreach.",
        },
        {
          title: "Geolocation Verification",
          desc: "Validates addresses and enriches with GPS coordinates, CBSA codes, and metropolitan area data for accurate location intelligence.",
        },
        {
          title: "Computer Vision Analysis",
          desc: "Analyzes aerial and street view imagery to verify property attributes, square footage, and premises classification.",
        },
        {
          title: "Multi-Stage Quality Assurance",
          desc: "User-configurable qualification criteria with data legitimacy, recency, and criteria matching for transparent decision making.",
        },
        {
          title: "Real-Time Monitoring",
          desc: "Google Sheets integration logs all workflow executions for tracking, debugging, and maintaining an audit trail.",
        },
      ],
    },
    techStack: {
      label: "Built With",
      title: "Technology Stack",
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
        title: "Sequential Pipeline Architecture",
        desc: "11-node data enrichment pipeline processing sites through multiple AI-powered stages for comprehensive analysis.",
      },
      {
        title: "Multi-Source Integration",
        desc: "Integrates Google APIs, AI research, computer vision, and geocoding services into unified workflow.",
      },
      {
        title: "Real-Time Monitoring & Logging",
        desc: "Google Sheets integration for workflow monitoring, execution tracking, and audit trails.",
      },
    ],
    more_cases: [
      {
        id: "ai-admission-counselor",
        title: "AI Admission Counselor",
        img: "case2.png",
        date: "1st January 2024",
      },
    ],
  },
  {
    caseId: "ai-admission-counselor",
    hero: {
      title: "AI-Powered Admission Counselor",
      subtitle:
        "Transforming University Admissions with Multi-Agent Intelligence",
      stats: [
        { label: "Industry", value: "EdTech" },
        { label: "Timeline", value: "3 months" },
        { label: "Team Size", value: "4 engineers" },
        { label: "Agents", value: "7 AI" },
      ],
    },
    challenges: {
      label: "The Challenge",
      title: "The Problem",
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
      label: "Our Approach",
      title: "The Solution",
      text: "We built an AI-driven, agentic admissions consulting platform that breaks the process into specialized domains with intelligent orchestration at the core.",
      steps: [
        {
          step: "STEP 1",
          icon: "AccountTreeOutlined",
          title: "Master-Worker Architecture",
          desc: "Centralized orchestrator agent coordinates with 6 specialist agents, each handling specific domains",
        },
        {
          step: "STEP 2",
          icon: "GroupsOutlined",
          title: "1 Orchestrator + 6 Specialists",
          desc: "Admission Counselor routes requests to University Search, Application Requirements, Scholarship Search, Scholarship Requirements, Essay, and Visa agents",
        },
        {
          step: "STEP 3",
          icon: "InsightsOutlined",
          title: "Data-Driven Recommendations",
          desc: "Personalized recommendations based on student profiles and real data, not generic advice",
        },
        {
          step: "STEP 4",
          icon: "BoltOutlined",
          title: "Automated Discovery",
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
      title: "Multi-Agent System",
      text: "Click on any agent to explore its role and responsibilities",
      nodes: [
        { id: "university", label: "University", color: "#377BBB" },
        { id: "visa", label: "Visa", color: "#377BBB" },
        { id: "application", label: "Application", color: "#00895E" },
        { id: "counselor", label: "Admission Counselor", color: "#BC2831" },
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
      title: "Key Features",
      text: "A comprehensive suite of AI-powered tools to guide students through every step of the admissions journey.",
      list: [
        {
          title: "Intelligent Conversation Routing",
          desc: "Understands student queries and routes them to the right specialist agent with full context preservation.",
        },
        {
          title: "Real-Time University Matching",
          desc: "Instant matching of universities based on academic profile, preferences, and goals with detailed rankings.",
        },
        {
          title: "Scholarship Discovery Engine",
          desc: "Comprehensive search across thousands of scholarships to find the best opportunities for each student.",
        },
        {
          title: "Application Timeline Management",
          desc: "Automated deadline tracking, document checklists, and progress monitoring across all applications.",
        },
        {
          title: "Essay Assistance & Review",
          desc: "AI-powered feedback on personal essays and statements with suggestions for improvement and impact.",
        },
        {
          title: "Visa Guidance & Requirements",
          desc: "Country-specific visa information, requirements, and procedural guidance for international students.",
        },
      ],
    },
    techStack: {
      label: "Built With",
      title: "Technology Stack",
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
      title: "Measurable Impact",
      text: "The agentic system delivered tangible value through intelligent automation and comprehensive guidance.",
      items: [
        { value: "75%", label: "Time Reduction", desc: "Reduction in manual research time for students" },
        { value: "6", label: "Specialist Agents", desc: "AI agents working in coordination to provide end-to-end guidance" },
        { value: "1", label: "Master Orchestrator", desc: "Central coordinator ensuring cohesive student experience" },
        { value: "∞", label: "Scalability", desc: "Easily extensible architecture for future agents and domains" },
      ],
    },
    top_features: [
      {
        title: "Event-Driven",
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
        img: "case1.png",
        date: "1st January 2024",
      },
    ],
  },
];

export const pillars = [
  "AI-First",
  "Enterprise Scale",
  "Transparency",
  "Real Results",
];

export const values = [
  {
    title: "Research and Engineering",
    desc: "We combine applied research with software engineering to turn ideas into working systems.",
  },
  {
    title: "Built for Real Use",
    desc: "We focus on reliable products and systems that work beyond prototypes and demos.",
  },
  {
    title: "Long-Term Ownership",
    desc: "We build with maintainability, documentation, and your team’s ability to take over in mind.",
  },
];

/**
 * The people on the engagement.
 *
 * `photo` is a filename inside /public/media/team. Until that file exists the
 * card falls back to a monogram tile, which is a deliberate design state rather
 * than a broken image — so the section ships correctly with no photography at
 * all, and upgrades one person at a time as headshots are added.
 */
export const team = [
  {
    name: "Muhammad Baqir",
    role: "Founder, AI engineering",
    focus: "Agent topologies, tracing, cost control",
    photo: "muhammad-baqir.jpg",
  },
  {
    name: "Faisal Ali",
    role: "Research Lead",
    focus: "Researcher",
    photo: "faisal-ali.jpg",
  },
  {
    name: "Abdullah Sajjad",
    role: "Development Lead",
    focus: "Full stack developer",
    photo: "abdullah-sajjad.jpg",
  },
  {
    name: "Ikram Ali",
    role: "AI Lead",
    focus: "AI Engineer",
    photo: "ikram-ali.jpg",
  },
];
