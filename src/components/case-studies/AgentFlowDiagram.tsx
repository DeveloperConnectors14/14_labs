"use client";

import { useEffect, useRef, useState } from "react";
import AgentCard from "./AgentCard";

interface Agent {
  id: string;
  name: string;
  role: string;
  description: string;
  responsibilities: string[];
  position: { x: number; y: number };
  color: string;
  isOrchestrator?: boolean;
}

const agents: Agent[] = [
  {
    id: "orchestrator",
    name: "Admission Counselor",
    role: "Master Orchestrator",
    description:
      "Central intelligence that understands student queries and routes them to specialist agents while maintaining context.",
    responsibilities: [
      "Understand student queries through natural conversation",
      "Route requests to appropriate specialist agents",
      "Aggregate responses from multiple agents",
      "Maintain conversation context and history",
      "Provide coherent unified responses",
    ],
    position: { x: 500, y: 400 },
    color: "#3ecfb2",
    isOrchestrator: true,
  },
  {
    id: "university-search",
    name: "University Search",
    role: "University Matcher",
    description:
      "Intelligent discovery engine that finds and ranks universities based on student profile and preferences.",
    responsibilities: [
      "Match universities to student academic profile",
      "Filter by preferences (location, size, specialization)",
      "Rank universities by fit score",
      "Compile detailed information for each match",
      "Log results for future reference",
    ],
    position: { x: 250, y: 180 },
    color: "#2ab090",
  },
  {
    id: "application-requirements",
    name: "Application Requirements",
    role: "Requirements Specialist",
    description:
      "Tracks application deadlines and documents needed for each university application.",
    responsibilities: [
      "List all application requirements per university",
      "Track submission deadlines with reminders",
      "Create document checklists for students",
      "Monitor application progress",
      "Flag critical deadlines",
    ],
    position: { x: 750, y: 180 },
    color: "#60a5fa",
  },
  {
    id: "scholarship-search",
    name: "Scholarship Search",
    role: "Scholarship Finder",
    description:
      "Discovers and matches relevant scholarships based on student profile and preferences.",
    responsibilities: [
      "Search scholarship databases for matches",
      "Filter by eligibility criteria",
      "Rank scholarships by funding amount",
      "Identify opportunities across regions",
      "Track application deadlines",
    ],
    position: { x: 200, y: 580 },
    color: "#fbbf24",
  },
  {
    id: "scholarship-requirements",
    name: "Scholarship Requirements",
    role: "Requirements Extractor",
    description:
      "Extracts and structures scholarship application requirements and documentation needs.",
    responsibilities: [
      "Extract requirements from scholarship data",
      "Structure information for clarity",
      "Identify common vs unique requirements",
      "Compile requirement summaries",
      "Log requirements in database",
    ],
    position: { x: 500, y: 620 },
    color: "#ec4899",
  },
  {
    id: "essay-agent",
    name: "Essay Agent",
    role: "Essay Assistant",
    description:
      "Provides guidance and feedback on personal essays and statements for applications.",
    responsibilities: [
      "Review essay drafts and provide feedback",
      "Suggest improvements for clarity and impact",
      "Ensure essays meet requirements",
      "Help brainstorm unique narratives",
      "Polish final submissions",
    ],
    position: { x: 800, y: 580 },
    color: "#3b82f6",
  },
  {
    id: "visa-agent",
    name: "Visa Agent",
    role: "Visa Specialist",
    description:
      "Provides comprehensive visa guidance and requirement information for international students.",
    responsibilities: [
      "Provide country-specific visa requirements",
      "Explain visa application procedures",
      "Track document requirements",
      "Monitor visa processing timelines",
      "Answer FAQs about visa processes",
    ],
    position: { x: 500, y: 100 },
    color: "#10b981",
  },
];

export default function AgentFlowDiagram() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeAgent, setActiveAgent] = useState<Agent | null>(null);
  const [hoveredAgent, setHoveredAgent] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Calculate agent positions for hexagonal layout
  const orchestrator = agents.find((a) => a.isOrchestrator);
  const orchPos = orchestrator?.position || { x: 500, y: 400 };
  const orchColor = orchestrator?.color || "#3ecfb2";
  const specialistAgents = agents.filter((a) => !a.isOrchestrator);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen py-24 md:py-32 flex items-center overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-xs uppercase tracking-wider text-primary font-medium mb-4">
            Architecture
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Multi-Agent System
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">
            Click on any agent to explore its role and responsibilities
          </p>
        </div>

        {/* SVG Diagram */}
        <div className={`relative transition-all duration-700 ${
          isVisible
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95"
        }`}
        style={{
          transitionDelay: isVisible ? "200ms" : "0ms",
        }}>
          <svg
            ref={svgRef}
            viewBox="0 0 1000 700"
            className="w-full h-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Connection lines */}
            {specialistAgents.map((agent) => (
              <g key={`line-${agent.id}`}>
                <defs>
                  <linearGradient
                    id={`gradient-${agent.id}`}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor={orchColor} />
                    <stop offset="100%" stopColor={agent.color} />
                  </linearGradient>
                </defs>

                {/* Connection line */}
                <line
                  x1={orchPos.x}
                  y1={orchPos.y}
                  x2={agent.position.x}
                  y2={agent.position.y}
                  stroke={
                    hoveredAgent === agent.id || activeAgent?.id === agent.id
                      ? agent.color
                      : "#3ecfb2"
                  }
                  strokeWidth={
                    hoveredAgent === agent.id || activeAgent?.id === agent.id
                      ? 3
                      : 1
                  }
                  strokeOpacity={
                    hoveredAgent === agent.id || activeAgent?.id === agent.id
                      ? 1
                      : 0.2
                  }
                  className="transition-all duration-300"
                />

                {/* Animated dashes for active agents */}
                {(hoveredAgent === agent.id ||
                  activeAgent?.id === agent.id) && (
                  <line
                    x1={orchPos.x}
                    y1={orchPos.y}
                    x2={agent.position.x}
                    y2={agent.position.y}
                    stroke={agent.color}
                    strokeWidth={3}
                    strokeDasharray="8,4"
                    opacity="0.5"
                    className="animate-pulse"
                  />
                )}
              </g>
            ))}

            {/* Orchestrator node */}
            <g
              key="orchestrator"
              className="cursor-pointer"
              onClick={() => setActiveAgent(agents[0])}
              onMouseEnter={() => setHoveredAgent("orchestrator")}
              onMouseLeave={() => setHoveredAgent(null)}
              role="button"
              tabIndex={0}
              aria-label="Admission Counselor: Master Orchestrator. Click to view details."
              onKeyDown={(e: any) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveAgent(agents[0]);
                }
              }}
            >
              {/* Main circle */}
              <circle
                cx={orchPos.x}
                cy={orchPos.y}
                r={70}
                fill={agents[0].color}
                opacity={
                  activeAgent?.id === "orchestrator"
                    ? 1
                    : hoveredAgent === "orchestrator"
                      ? 0.8
                      : 0.7
                }
                className="transition-all duration-300"
                filter={
                  activeAgent?.id === "orchestrator" || hoveredAgent === "orchestrator"
                    ? "drop-shadow(0 0 20px rgba(62, 207, 178, 0.5))"
                    : undefined
                }
              />

              {/* Icon placeholder */}
              <text
                x={orchPos.x}
                y={orchPos.y - 10}
                textAnchor="middle"
                fontSize="32"
              >
                🎯
              </text>

              {/* Label */}
              <text
                x={orchPos.x}
                y={orchPos.y + 35}
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill={agents[0].color}
              >
                Admission
              </text>
              <text
                x={orchPos.x}
                y={orchPos.y + 52}
                textAnchor="middle"
                fontSize="14"
                fontWeight="600"
                fill={agents[0].color}
              >
                Counselor
              </text>
            </g>

            {/* Specialist agent nodes */}
            {specialistAgents.map((agent) => (
              <g
                key={agent.id}
                className="cursor-pointer"
                onClick={() => setActiveAgent(agent)}
                onMouseEnter={() => setHoveredAgent(agent.id)}
                onMouseLeave={() => setHoveredAgent(null)}
                role="button"
                tabIndex={0}
                aria-label={`${agent.name}: ${agent.role}. Click to view details.`}
                onKeyDown={(e: any) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveAgent(agent);
                  }
                }}
              >
                {/* Main circle */}
                <circle
                  cx={agent.position.x}
                  cy={agent.position.y}
                  r={50}
                  fill={agent.color}
                  opacity={
                    agent.id === "university-search" || agent.id === "visa-agent"
                      ? 0
                      : activeAgent?.id === agent.id
                        ? 1
                        : hoveredAgent === agent.id
                          ? 0.8
                          : 0.7
                  }
                  className="transition-all duration-300"
                  style={{
                    transform:
                      hoveredAgent === agent.id || activeAgent?.id === agent.id
                        ? `translate(${agent.position.x}px, ${agent.position.y}px) scale(1.15)`
                        : `translate(${agent.position.x}px, ${agent.position.y}px) scale(1)`,
                  }}
                  filter={
                    activeAgent?.id === agent.id || hoveredAgent === agent.id
                      ? `drop-shadow(0 0 20px ${agent.color}80)`
                      : undefined
                  }
                />

                {/* Icon placeholder */}
                <text
                  x={agent.position.x}
                  y={agent.position.y + 10}
                  textAnchor="middle"
                  fontSize="28"
                >
                  {agent.id === "university-search"
                    ? "🎓"
                    : agent.id === "application-requirements"
                      ? "📋"
                      : agent.id === "scholarship-search"
                        ? "💰"
                        : agent.id === "scholarship-requirements"
                          ? "📊"
                          : agent.id === "essay-agent"
                            ? "✍️"
                            : "🌍"}
                </text>

                {/* Label */}
                <text
                  x={agent.position.x}
                  y={agent.position.y + 65}
                  textAnchor="middle"
                  fontSize="12"
                  fontWeight="600"
                  fill="#e8e8ed"
                  className="pointer-events-none"
                >
                  {agent.name.split(" ")[0]}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Help text */}
        <div className="mt-8 text-center text-foreground/60 text-sm">
          <p>💡 Select an agent above to view more details</p>
        </div>
      </div>

      {/* Agent detail card overlay */}
      {activeAgent && (
        <AgentCard
          agent={activeAgent}
          onClose={() => setActiveAgent(null)}
        />
      )}
    </section>
  );
}
