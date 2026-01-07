"use client";

import { useEffect, useRef, useState } from "react";
import NodeCard from "./NodeCard";
import { PipelineNode } from "@/types/case-study";

interface PipelineFlowDiagramProps {
  nodes: PipelineNode[];
  title?: string;
  subtitle?: string;
}

export default function PipelineFlowDiagram({
  nodes,
  title = "Pipeline Architecture",
  subtitle = "Click on any node to explore its role and data flow",
}: PipelineFlowDiagramProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeNode, setActiveNode] = useState<PipelineNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

  // Define connections between nodes
  const connections = [
    { from: "global-config", to: "geography-input" },
    { from: "geography-input", to: "deep-research" },
    { from: "deep-research", to: "site-extraction" },
    { from: "site-extraction", to: "geocode" },
    { from: "site-extraction", to: "site-attribute-analysis" },
    { from: "geocode", to: "join" },
    { from: "site-attribute-analysis", to: "join" },
    { from: "join", to: "filter" },
    { from: "filter", to: "qa" },
    { from: "qa", to: "excel-output" },
    { from: "qa", to: "workflow-log" },
  ];

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'input':
        return '#60a5fa';
      case 'research':
        return '#10b981';
      case 'processing':
        return '#f59e0b';
      case 'analysis':
        return '#a855f7';
      case 'quality':
        return '#ef4444';
      case 'output':
        return '#6366f1';
      default:
        return '#3ecfb2';
    }
  };

  const getCategoryLabel = (category: string): string => {
    switch (category) {
      case 'input':
        return 'Input';
      case 'research':
        return 'Research';
      case 'processing':
        return 'Processing';
      case 'analysis':
        return 'Analysis';
      case 'quality':
        return 'Quality';
      case 'output':
        return 'Output';
      default:
        return 'Node';
    }
  };

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
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-xs uppercase tracking-wider text-primary font-medium mb-4">
            Architecture
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            {title}
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* SVG Diagram */}
        <div
          className={`relative transition-all duration-700 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
          style={{ transitionDelay: isVisible ? "200ms" : "0ms" }}
        >
          <svg
            viewBox="0 0 700 900"
            className="w-full h-auto max-w-4xl mx-auto"
            preserveAspectRatio="xMidYMid meet"
          >
            {/* Connection lines */}
            {connections.map((conn, idx) => {
              const fromNode = nodes.find((n) => n.id === conn.from);
              const toNode = nodes.find((n) => n.id === conn.to);
              if (!fromNode || !toNode) return null;

              const isHovered =
                hoveredNode === conn.from || hoveredNode === conn.to;
              const lineColor = isHovered ? toNode.color : "#3ecfb2";
              const lineOpacity = isHovered ? 1 : 0.2;
              const lineWidth = isHovered ? 3 : 1;

              return (
                <g key={`conn-${idx}`}>
                  {/* Main line */}
                  <line
                    x1={fromNode.position.x}
                    y1={fromNode.position.y}
                    x2={toNode.position.x}
                    y2={toNode.position.y}
                    stroke={lineColor}
                    strokeWidth={lineWidth}
                    strokeOpacity={lineOpacity}
                    className="transition-all duration-300"
                  />

                  {/* Animated flow indicator */}
                  {isHovered && (
                    <line
                      x1={fromNode.position.x}
                      y1={fromNode.position.y}
                      x2={toNode.position.x}
                      y2={toNode.position.y}
                      stroke={toNode.color}
                      strokeWidth={3}
                      strokeDasharray="8,4"
                      opacity="0.5"
                      className="animate-pulse"
                    />
                  )}

                  {/* Arrow marker */}
                  <defs>
                    <marker
                      id={`arrow-${idx}`}
                      markerWidth="10"
                      markerHeight="10"
                      refX="9"
                      refY="3"
                      orient="auto"
                      markerUnits="strokeWidth"
                    >
                      <path d="M0,0 L0,6 L9,3 z" fill={lineColor} fillOpacity={lineOpacity} />
                    </marker>
                  </defs>
                  <line
                    x1={fromNode.position.x}
                    y1={fromNode.position.y}
                    x2={toNode.position.x}
                    y2={toNode.position.y}
                    stroke={lineColor}
                    strokeWidth={lineWidth}
                    strokeOpacity={lineOpacity}
                    markerEnd={`url(#arrow-${idx})`}
                    className="pointer-events-none"
                  />
                </g>
              );
            })}

            {/* Node circles */}
            {nodes.map((node) => {
              const color = getCategoryColor(node.category);
              const isActive = activeNode?.id === node.id;
              const isHovered = hoveredNode === node.id;
              const shouldHighlight = isActive || isHovered;

              return (
                <g key={node.id}>
                  {/* Node circle */}
                  <circle
                    cx={node.position.x}
                    cy={node.position.y}
                    r={32}
                    fill={color}
                    opacity={shouldHighlight ? 1 : 0.7}
                    className="transition-all duration-300 cursor-pointer"
                    onClick={() => setActiveNode(node)}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${node.name}: ${node.role}. Click to view details.`}
                    onKeyDown={(e: React.KeyboardEvent) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setActiveNode(node);
                      }
                    }}
                    style={{
                      filter: shouldHighlight
                        ? `drop-shadow(0 0 20px ${color}80)`
                        : "none",
                    }}
                  />


                  {/* Node label */}
                  <text
                    x={node.position.x}
                    y={node.position.y + 50}
                    textAnchor="middle"
                    fontSize="13"
                    fontWeight="600"
                    fill="#e8e8ed"
                    className="pointer-events-none select-none"
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Category Legend */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm">
          {[
            { label: "Input", color: "#60a5fa" },
            { label: "Research", color: "#10b981" },
            { label: "Processing", color: "#f59e0b" },
            { label: "Analysis", color: "#a855f7" },
            { label: "Quality", color: "#ef4444" },
            { label: "Output", color: "#6366f1" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-foreground/60">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Node detail card overlay */}
      {activeNode && <NodeCard node={activeNode} onClose={() => setActiveNode(null)} />}
    </section>
  );
}
