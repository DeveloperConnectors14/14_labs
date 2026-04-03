"use client";

import { notFound } from "next/navigation";
import CallSection from "@/components/general/CallSection";
import MoreCaseStudies from "@/components/singleCase/MoreCaseStudies";
import RealCostDetails from "@/components/singleCase/RealCostDetails";
import SingleCaseApproach from "@/components/singleCase/SingleCaseApproach";
import SingleCaseArchitechture from "@/components/singleCase/SingleCaseArchitechture";
import SingleCaseChallanges from "@/components/singleCase/SingleCaseChallanges";
import SingleCaseHero from "@/components/singleCase/SingleCaseHero";
import SingleCasePipeline from "@/components/singleCase/SingleCasePipeline";
import SingleKeyFeatures from "@/components/singleCase/SingleKeyFeatures";
import SingleTopFeatures from "@/components/singleCase/SingleTopFeatures";
import TechnologyStack from "@/components/singleCase/TechnologyStack";
import React from "react";


const caseStudies = [
  {
    caseId: "find-sites-workflow",
    hero: {
      title: "AI Find Sites Real Estate Solution",
      subtitle: "AI-Driven Commercial Real Estate Site Discovery - Automating hours of manual research into minutes of intelligent analysis",
      stats: [
        { label: "Industry", value: "Real Estate" },
        { label: "Timeline", value: "1 Month" },
        { label: "Engineers", value: "3" },
        { label: "Pipeline nodes", value: "11" },
      ],
    },
    challenges: {
      title: "Commercial Real Estate Site Discovery Pain Points",
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
      title: "AI Powered Workflow",
      steps: [
        {
          step: "STEP 1",
          icon: "workflowstep1.png",
          title: "Automated Deep Research",
          desc: "AI searches across LoopNet, CBRE, JLL, Brixmor, and local broker websites automatically, discovering properties that match your criteria."
        },
        {
          step: "STEP 2",
          icon: "workflowstep2.png",
          title: "Structured Data Extraction",
          desc: "Intelligently extracts property details, broker contacts (name, title, email, phone), and rental information from research findings."
        },
        {
          step: "STEP 3",
          icon: "workflowstep3.png",
          title: "Geolocation Verification",
          desc: "Verifies address accuracy using Google Geocoding API and enriches data with GPS coordinates and CBSA information."
        },
        {
          step: "STEP 4",
          icon: "workflowstep4.png",
          title: "Computer Vision Analysis",
          desc: "Analyzes aerial and street-view imagery to verify property attributes like square footage, asset type, and premises classification."
        },
      ],
    },
    architecture_highlights: [
      {
        title: "11",
        boldText: "Pipeline nodes : ",
        desc: "Sequential workflow with specialized processing at each stage",
      },
      {
        title: "Infinite",
        boldText: "Scalability : ",
        desc: "Extensible architecture supporting new data resources",
      },
      {
        title: "100%",
        boldText: "Data Quality : ",
        desc: "Multi-stage QA with verification and validation",
      },
    ],
    pipeline: {
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
      text: "A comprehensive suite of AI-powered tools to automate commercial real estate site discovery and qualification.",
      list: [
        {
          title: "Deep research automation",
          desc: "Searches across loopNet, CBRE, JLL, Brixmor and local broker websites automatically, discovering properties missed by manual searching.",
        },
        {
          title: "Comprehensive Contact Data",
          desc: "Extracts complete broker information including name, title, company direct email, and phone numbers for immediate outreach.",
        },
        {
          title: "Geolocation verification",
          desc: "Validates addresses and enriches with GPS coordinates, CBSA codes, and metropolitan area data for accurate location intelligence.",
        },
        {
          title: "Computer vision analysis",
          desc: "Analyzes aerial and street view imagery to verify property attributes square footage, and premises classification.",
        },
        {
          title: "Multistage quality assurance",
          desc: "User-configurable qualification criteria with data legitimacy, recency and criteria matching for transparent desicion making.",
        },
        {
          title: "Real time monitoring",
          desc: "Google sheets integration logs all workflow execution for tracking, debugging and maintaining an audit trail.",
        },
      ],
    },
    techStack: {
      text: "Enterprise-grade technologies powering scalable, intelligent multi-agent systems.",
      stacks: [
        {
          techType: "BACKEND",
          values: [
            "openai-2",
            "ffffff (1)",
            "ffffff",
            "huggingface",
          ]
        },
        {
          techType: "DATABASE",
          values: [
            "python-original",
            "fastapi-original",
            "postgresql-original",
            "redis-original",
          ]
        },
        {
          techType: "AI FRAMEWORK",
          values: [
            "react-original",
            "nextjs-original",
            "typescript-original",
            "react-original",
          ]
        },
        {
          techType: "LLM",
          values: [
            "amazonwebservices-original-wordmark",
            "docker-original",
            "kubernetes-original",
            "vercel-original",
          ]
        },
      ]
    },
    top_features: [
      {
        title: "Sequential Pipeline Architecture",
        desc: "11-node data enrichment pipeline processing sites through multiple AI-powered stages for comprehensive analysis.",
      },
      {
        title: "Multi-Source Integration",
        desc: "Integrates Google APIs, AI research, computer vision and geocoding services into unified workflow.",
      },
      {
        title: "Real time monitoring & logging",
        desc: "Google sheets integration for workflow monitoring, execution tracking and audit trails.",
      },
    ],
    more_cases: [
      {
        id: "ai-admission-counselor",
        title: "AI Admission Counselor",
        img: "case2.png",
        date: "1st January 2024",
      }
    ]
  },
  {
    caseId: "ai-admission-counselor",
    hero: {
      title: "AI-Powered Admission Counselor",
      subtitle: "Transforming University Admissions with Multi-Agent Intelligence",
      stats: [
        { label: "Industry", value: "EdTech" },
        { label: "Timeline", value: "3 Month" },
        { label: "Team Size", value: "4 Engineers" },
        { label: "Agents", value: "7 AI" },
      ],
    },
    challenges: {
      title: "Applying to universities especially internationally is a fragmented and overwhelming process.",
      items: [
        {
          sNo: "01",
          title: "Extensive Research Time",
          desc: "Students spend 40+ hours on manual university research",
        },
        {
          sNo: "02",
          title: "Complex Eligibility Criteria",
          desc: "Application requirements vary widely across institutions",
        },
        {
          sNo: "03",
          title: "Scattered Scholarship Data",
          desc: "Scholarship discovery is scattered and often outdated",
        },
        {
          sNo: "04",
          title: "Complicated Visa Processes",
          desc: "Visa requirements are complex and frequently changing",
        },
        {
          sNo: "05",
          title: "Lack of Structured Guidance",
          desc: "Students miss deadlines due to poor planning or lack of guidance",
        },
      ],
    },
    cost: {
      text: "These challenges quickly add up: students spend 40+ hours navigating fragmented information, miss critical deadlines, and often apply to poorly matched universities or miss scholarship opportunities. The result is increased stress, lower success rates, and inefficient decision-making. An intelligent, automated guidance system is no longer a luxury—it's a necessity.",
    },
    approach: {
      title: "AI-driven, agentic admissions consulting platform",
      steps: [
        {
          step: "STEP 1",
          icon: "workflowstep1.png",
          title: "Master-Worker Architecture",
          desc: "Centralized orchestrator agent coordinates with 6 specialist agents, each handling specific domains"
        },
        {
          step: "STEP 2",
          icon: "workflowstep2.png",
          title: "1 Orchestrator + 6 Specialists",
          desc: "Admission Counselor routes requests to University Search, Application Requirements, Scholarship Search, Scholarship Requirements, Essay, and Visa agents"
        },
        {
          step: "STEP 3",
          icon: "workflowstep3.png",
          title: "Data-Driven Recommendations",
          desc: "Personalized recommendations based on student profiles and real data, not generic advice"
        },
        {
          step: "STEP 4",
          icon: "workflowstep4.png",
          title: "Automated Discovery",
          desc: "Automates research across universities, scholarships, and visa requirements while keeping humans in control"
        },
      ],
    },
    architecture_highlights: [
      {
        title: "1",
        boldText: "Orchestrator : ",
        desc: "Central Orchestrator for unified student experience",
      },
      {
        title: "6",
        boldText: "Specialist Agents : ",
        desc: "Specialized agents handling different admission domains",
      },
      {
        title: "Infinite",
        boldText: "Scalability : ",
        desc: "Scalable to add new agents and domains as needed",
      },
    ],
    pipeline: {
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
          desc: "Country-specific visa information, requirements, and procedural guidance for international students",
        },
      ],
    },
    techStack: {
      text: "Enterprise-grade technologies powering scalable, intelligent multi-agent systems.",
      stacks: [
        {
          techType: "BACKEND",
          values: [
            "openai-2",
            "ffffff (1)",
            "ffffff",
            "huggingface",
          ]
        },
        {
          techType: "DATABASE",
          values: [
            "python-original",
            "fastapi-original",
            "postgresql-original",
            "redis-original",
          ]
        },
        {
          techType: "AI FRAMEWORK",
          values: [
            "react-original",
            "nextjs-original",
            "typescript-original",
            "react-original",
          ]
        },
        {
          techType: "LLM",
          values: [
            "amazonwebservices-original-wordmark",
            "docker-original",
            "kubernetes-original",
            "vercel-original",
          ]
        },
      ]
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
    ]
  },
];


function SingleCasePage({ params }) {
  const searchParams = React.use(params);
  const data = caseStudies.find(item => item.caseId === searchParams.caseId);
  if (!data) return notFound();

  return (
    <>
      <SingleCaseHero heroData={data.hero} />
      <SingleCaseChallanges challanges={data.challenges} />
      <RealCostDetails costData={data.cost} />
      <SingleCaseApproach approaches={data.approach} />
      <SingleCaseArchitechture architectureData={data.architecture_highlights} />
      <SingleCasePipeline casePipeline={data.pipeline} />
      <SingleKeyFeatures keyFeatures={data.key_features} />
      <TechnologyStack technologies={data.techStack} />
      <SingleTopFeatures topFeatures={data.top_features} />
      <CallSection contact={true} />
      <MoreCaseStudies moreCases={data.more_cases} />
    </>
  )
}

export default SingleCasePage;
