"use client";

import { useEffect, useRef, useState } from "react";

interface Solution {
  icon: string;
  title: string;
  description: string;
}

export default function FindSitesSolutionApproach() {
  const [isVisible, setIsVisible] = useState(false);
  const [expandedStep, setExpandedStep] = useState(0);
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

  const solutions = [
    {
      title: "Automated Deep Research",
      description:
        "AI searches across LoopNet, CBRE, JLL, Brixmor, and local broker websites automatically, discovering properties that match your criteria.",
      icon: "🔍",
    },
    {
      title: "Structured Data Extraction",
      description:
        "Intelligently extracts property details, broker contacts (name, title, email, phone), and rental information from research findings.",
      icon: "📊",
    },
    {
      title: "Geolocation Verification",
      description:
        "Verifies address accuracy using Google Geocoding API and enriches data with GPS coordinates and CBSA information.",
      icon: "🗺️",
    },
    {
      title: "Computer Vision Analysis",
      description:
        "Analyzes aerial and street-view imagery to verify property attributes like square footage, asset type, and premises classification.",
      icon: "👁️",
    },
  ];

  const highlights = [
    {
      metric: "11",
      label: "Pipeline Nodes",
      description: "Sequential workflow with specialized processing at each stage",
    },
    {
      metric: "∞",
      label: "Scalability",
      description: "Extensible architecture supporting new data sources",
    },
    {
      metric: "100%",
      label: "Data Quality",
      description: "Multi-stage QA with verification and validation",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-xs uppercase tracking-wider text-primary font-medium mb-4">
            Our Approach
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            AI-Powered Workflow
          </h2>
          <p className="text-xl text-foreground/60 max-w-3xl">
            An intelligent sequential pipeline that automates commercial real estate research from initial discovery through final qualification.
          </p>
        </div>

        {/* Interactive Step-by-Step Workflow */}
        <div className="mb-16">
          {/* Steps visualization */}
          <div className="mb-12">
            {/* Horizontal line connecting steps */}
            <div className="hidden lg:flex items-center justify-between mb-8 relative">
              <div className="absolute top-5 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary/50 to-primary/20" />

              {/* Step buttons */}
              <div className="relative w-full flex justify-between">
                {solutions.map((solution, index) => (
                  <button
                    key={solution.title}
                    onClick={() => setExpandedStep(index)}
                    className={`group flex flex-col items-center transition-all duration-500 cursor-pointer ${
                      isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                    }`}
                    style={{
                      transitionDelay: isVisible ? `${100 + index * 100}ms` : "0ms",
                    }}
                  >
                    {/* Step circle */}
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl font-bold border-2 transition-all duration-500 mb-3 ${
                        expandedStep === index
                          ? "bg-primary border-primary text-white scale-110"
                          : "bg-secondary border-primary/30 text-primary hover:border-primary hover:bg-primary/10"
                      }`}
                    >
                      {index + 1}
                    </div>

                    {/* Step title */}
                    <span
                      className={`text-sm font-semibold text-center max-w-[100px] transition-colors duration-500 ${
                        expandedStep === index ? "text-primary" : "text-foreground/60"
                      }`}
                    >
                      {solution.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile vertical stepper */}
            <div className="lg:hidden space-y-3 mb-8">
              {solutions.map((solution, index) => (
                <button
                  key={solution.title}
                  onClick={() => setExpandedStep(index)}
                  className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all duration-500 ${
                    expandedStep === index
                      ? "bg-primary/20 border-2 border-primary"
                      : "bg-secondary/50 border-2 border-foreground/5"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 transition-all duration-500 ${
                      expandedStep === index
                        ? "bg-primary text-white"
                        : "bg-secondary text-primary"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground">{solution.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Expanded step details */}
          <div className="relative">
            {solutions.map((solution, index) => (
              <div
                key={solution.title}
                className={`transition-all duration-500 overflow-hidden ${
                  expandedStep === index ? "max-h-full md:max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div
                  className={`p-6 md:p-12 rounded-2xl bg-gradient-to-br from-primary/10 via-secondary/50 to-tertiary/10 border-2 border-primary/30 ${
                    isVisible ? "translate-y-0" : "translate-y-4"
                  }`}
                >
                  <div className="flex flex-col md:flex-row items-start gap-4 md:gap-6">
                    {/* Icon */}
                    <div className="text-5xl md:text-6xl flex-shrink-0">{solution.icon}</div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl md:text-3xl font-bold text-foreground mb-2 md:mb-3">
                        Step {expandedStep + 1}: {solution.title}
                      </h3>
                      <p className="text-foreground/80 text-sm md:text-lg leading-relaxed">
                        {solution.description}
                      </p>

                      {/* Decorative line */}
                      <div className="mt-4 md:mt-6 h-1 w-20 bg-gradient-to-r from-primary to-tertiary" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture highlights */}
        <div
          className={`p-8 md:p-12 rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/50 to-tertiary/5 border border-primary/20 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionDelay: isVisible ? "400ms" : "0ms",
          }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
            Architecture Highlights
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((highlight) => (
              <div key={highlight.label}>
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent mb-2">
                  {highlight.metric}
                </div>
                <p className="text-lg font-bold text-foreground mb-2">{highlight.label}</p>
                <p className="text-foreground/80">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
