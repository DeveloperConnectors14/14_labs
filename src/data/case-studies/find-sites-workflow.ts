import {
  HeroData,
  StatCard,
  PipelineNode,
  Technology,
  Metric,
  TechHighlight,
} from '@/types/case-study';

// Hero Section Data
export const heroData: HeroData = {
  label: 'Case Study',
  title: 'AI Find Sites Real Estate Solution',
  subtitle:
    'AI-Driven Commercial Real Estate Site Discovery - Automating hours of manual research into minutes of intelligent analysis',
  ctaText: 'Get Started',
  ctaLink: '#contact',
};

// Overview Statistics
export const overviewStats: StatCard[] = [
  {
    label: 'Industry',
    value: 'Real Estate',
  },
  {
    label: 'Timeline',
    value: '1 Month',
  },
  {
    label: 'Engineers',
    value: '3',
  },
  {
    label: 'Pipeline Nodes',
    value: '11',
  },
];

// Pipeline Nodes (11 Required Nodes)
export const pipelineNodes: PipelineNode[] = [
  {
    id: 'global-config',
    name: 'Global Config',
    role: 'Configuration Input',
    description:
      'Collects user requirements including geography, asset type, size criteria, and search parameters.',
    inputs: [
      {
        name: 'user_prompt',
        type: 'string',
        description: 'User search criteria and preferences',
      },
    ],
    outputs: [
      {
        name: 'workflow_config',
        type: 'object',
        description: 'Complete workflow configuration with all parameters',
      },
      {
        name: 'user_prompt',
        type: 'string',
        description: 'Original user prompt text',
      },
    ],
    position: { x: 100, y: 50 },
    color: '#60a5fa',
    isRequired: true,
    category: 'input',
  },
  {
    id: 'geography-input',
    name: 'Geography Input',
    role: 'Location Parser',
    description:
      'Parses geography text input and geocodes locations into coordinates and geographic boundaries.',
    inputs: [
      {
        name: 'job_id',
        type: 'string',
        description: 'Job identifier for tracking',
      },
      {
        name: 'workflow_config',
        type: 'object',
        description: 'Workflow configuration with geography text',
      },
    ],
    outputs: [
      {
        name: 'geographies',
        type: 'list',
        description: 'Geography objects with coordinates and bounds',
      },
      {
        name: 'geography_count',
        type: 'number',
        description: 'Total number of geographies parsed',
      },
    ],
    position: { x: 100, y: 150 },
    color: '#60a5fa',
    isRequired: true,
    category: 'input',
  },
  {
    id: 'deep-research',
    name: 'Deep Research',
    role: 'AI Web Researcher',
    description:
      'Performs AI-powered deep web research across commercial real estate websites including LoopNet, CBRE, JLL, Brixmor, and local broker sites.',
    inputs: [
      {
        name: 'user_prompt',
        type: 'string',
        description: 'User search criteria for research',
      },
      {
        name: 'geographies',
        type: 'list',
        description: 'Geographies to search',
      },
      {
        name: 'workflow_config',
        type: 'object',
        description: 'Workflow configuration',
      },
    ],
    outputs: [
      {
        name: 'research_report',
        type: 'string',
        description: 'Comprehensive research findings and site listings',
      },
    ],
    position: { x: 300, y: 100 },
    color: '#10b981',
    isRequired: true,
    category: 'research',
  },
  {
    id: 'site-extraction',
    name: 'Site Extraction',
    role: 'Data Extractor',
    description:
      'Extracts structured site data from research reports and normalizes attributes including address, property details, and broker contacts.',
    inputs: [
      {
        name: 'report',
        type: 'string',
        description: 'Research report with site information',
      },
      {
        name: 'user_prompt',
        type: 'string',
        description: 'User criteria for data extraction',
      },
    ],
    outputs: [
      {
        name: 'extracted_sites',
        type: 'list',
        description: 'Normalized site objects with structured data',
      },
      {
        name: 'total_sites',
        type: 'number',
        description: 'Total number of sites extracted',
      },
    ],
    position: { x: 500, y: 100 },
    color: '#f59e0b',
    isRequired: true,
    category: 'processing',
  },
  {
    id: 'geocode',
    name: 'Geocode',
    role: 'Location Verifier',
    description:
      'Verifies address accuracy and enriches addresses with GPS coordinates, CBSA (Core Based Statistical Area) information, and location standardization.',
    inputs: [
      {
        name: 'sites',
        type: 'list',
        description: 'Site objects with addresses to geocode',
      },
      {
        name: 'geographies',
        type: 'list',
        description: 'Geography objects for reference',
      },
    ],
    outputs: [
      {
        name: 'geocoded_sites',
        type: 'list',
        description: 'Sites enriched with coordinates and CBSA data',
      },
      {
        name: 'total_geocoded',
        type: 'number',
        description: 'Number of successfully geocoded sites',
      },
    ],
    position: { x: 200, y: 250 },
    color: '#f59e0b',
    isRequired: true,
    category: 'processing',
  },
  {
    id: 'site-attribute-analysis',
    name: 'Site Attribute Analysis',
    role: 'Computer Vision Analyst',
    description:
      'Uses computer vision on aerial and street-view imagery to extract and verify site attributes including square footage, property type, and premises classification.',
    inputs: [
      {
        name: 'sites',
        type: 'list',
        description: 'Site objects with coordinates',
      },
      {
        name: 'research_report',
        type: 'string',
        description: 'Research report for context',
      },
      {
        name: 'workflow_config',
        type: 'object',
        description: 'Configuration with attribute criteria',
      },
    ],
    outputs: [
      {
        name: 'analyzed_sites',
        type: 'list',
        description: 'Sites with extracted and verified attributes',
      },
      {
        name: 'total_analyzed',
        type: 'number',
        description: 'Number of sites analyzed',
      },
    ],
    position: { x: 400, y: 250 },
    color: '#a855f7',
    isRequired: true,
    category: 'analysis',
  },
  {
    id: 'join',
    name: 'Join',
    role: 'Data Merger',
    description:
      'Joins multiple data sources (geocoding results, attribute analysis, research findings) into unified site records for comprehensive view.',
    inputs: [
      {
        name: 'geocoded_sites',
        type: 'list',
        description: 'Sites with geolocation data',
      },
      {
        name: 'analyzed_sites',
        type: 'list',
        description: 'Sites with attribute analysis',
      },
    ],
    outputs: [
      {
        name: 'joined_sites',
        type: 'list',
        description: 'Unified site records with all data merged',
      },
      {
        name: 'total_joined',
        type: 'number',
        description: 'Number of unified records',
      },
    ],
    position: { x: 300, y: 350 },
    color: '#f59e0b',
    isRequired: true,
    category: 'processing',
  },
  {
    id: 'filter',
    name: 'Filter',
    role: 'Criteria Filter',
    description:
      'Filters sites based on user-defined criteria including asset type, square footage, real estate type, and premises classification.',
    inputs: [
      {
        name: 'sites',
        type: 'list',
        description: 'Sites to filter',
      },
      {
        name: 'workflow_config',
        type: 'object',
        description: 'Filter criteria from workflow config',
      },
    ],
    outputs: [
      {
        name: 'filtered_sites',
        type: 'list',
        description: 'Sites matching user criteria',
      },
      {
        name: 'total_filtered',
        type: 'number',
        description: 'Number of filtered sites',
      },
    ],
    position: { x: 300, y: 450 },
    color: '#f59e0b',
    isRequired: true,
    category: 'processing',
  },
  {
    id: 'qa',
    name: 'QA Node',
    role: 'Quality Assurance',
    description:
      'Performs quality assurance and qualification checks with user-configurable criteria. Validates data legitimacy, recency, and parameter matching.',
    inputs: [
      {
        name: 'sites',
        type: 'list',
        description: 'Sites to evaluate',
      },
      {
        name: 'workflow_config',
        type: 'object',
        description: 'Qualification criteria configuration',
      },
    ],
    outputs: [
      {
        name: 'qa_results',
        type: 'list',
        description: 'QA results with qualification status',
      },
      {
        name: 'qualified_count',
        type: 'number',
        description: 'Number of qualified sites',
      },
      {
        name: 'not_qualified_count',
        type: 'number',
        description: 'Number of sites not meeting criteria',
      },
    ],
    position: { x: 300, y: 550 },
    color: '#ef4444',
    isRequired: true,
    category: 'quality',
  },
  {
    id: 'excel-output',
    name: 'Excel Output',
    role: 'Report Generator',
    description:
      'Generates an Excel (.xlsx) file containing all sites with qualification reasoning, broker contacts, and comprehensive property details.',
    inputs: [
      {
        name: 'sites',
        type: 'list',
        description: 'All site objects to export',
      },
      {
        name: 'job_id',
        type: 'string',
        description: 'Job identifier for file naming',
      },
    ],
    outputs: [
      {
        name: 'excel_file_path',
        type: 'string',
        description: 'Path to generated Excel file',
      },
      {
        name: 'total_rows',
        type: 'number',
        description: 'Number of rows written',
      },
    ],
    position: { x: 150, y: 650 },
    color: '#6366f1',
    isRequired: true,
    category: 'output',
  },
  {
    id: 'workflow-log',
    name: 'Workflow Log',
    role: 'Execution Logger',
    description:
      'Logs each workflow execution to Google Sheets for monitoring, debugging, and auditing. Tracks execution metadata and results.',
    inputs: [
      {
        name: 'job_id',
        type: 'string',
        description: 'Job identifier',
      },
      {
        name: 'workflow_data',
        type: 'object',
        description: 'All nodes data and results',
      },
      {
        name: 'execution_metadata',
        type: 'object',
        description: 'Runtime metadata and timing',
      },
    ],
    outputs: [
      {
        name: 'log_location',
        type: 'string',
        description: 'Location where log was saved',
      },
      {
        name: 'status',
        type: 'string',
        description: 'Status of log save operation',
      },
    ],
    position: { x: 450, y: 650 },
    color: '#6366f1',
    isRequired: true,
    category: 'output',
  },
];

// Technologies
export const technologies: Technology[] = [
  {
    name: 'FastAPI',
    category: 'Backend',
    logo: '⚡',
  },
  {
    name: 'Python',
    category: 'Backend',
    logo: '🐍',
  },
  {
    name: 'Google Sheets',
    category: 'Database',
    logo: '📊',
  },
  {
    name: 'Google Geocoding API',
    category: 'API Integration',
    logo: '🗺️',
  },
  {
    name: 'Google Drive',
    category: 'Storage',
    logo: '💾',
  },
  {
    name: 'OpenAI GPT-4o',
    category: 'LLM',
    logo: '🧠',
  },
  {
    name: 'OpenAI GPT-5.2',
    category: 'LLM',
    logo: '🤖',
  },
  {
    name: 'Gemini Vision API',
    category: 'Computer Vision',
    logo: '👁️',
  },
];

// Tech Stack Highlights
export const techHighlights: TechHighlight[] = [
  {
    title: 'Sequential Pipeline Architecture',
    description:
      '11-node data enrichment pipeline processing sites through multiple AI-powered stages for comprehensive analysis',
  },
  {
    title: 'Multi-Source Integration',
    description:
      'Integrates Google APIs, AI research, computer vision, and geocoding services into unified workflow',
  },
  {
    title: 'Real-Time Monitoring & Logging',
    description:
      'Google Sheets integration for workflow monitoring, execution tracking, and audit trails',
  },
];

// Outcomes & Metrics
export const outcomes: Metric[] = [
  {
    value: 'Hours → Minutes',
    label: 'Time Savings',
    description: 'Automated site research from hours of manual work to minutes of intelligent analysis',
  },
  {
    value: '11',
    label: 'Pipeline Nodes',
    description: 'Integrated end-to-end workflow with sequential data enrichment at each stage',
  },
  {
    value: '100%',
    label: 'Data Quality',
    description:
      'Multi-stage QA framework with geolocation verification, CBSA enrichment, and AI validation',
  },
  {
    value: '∞',
    label: 'Scalability',
    description:
      'Easily extensible architecture supporting new data sources and analysis types',
  },
];
