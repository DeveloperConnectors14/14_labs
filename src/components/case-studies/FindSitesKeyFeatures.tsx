"use client";

import { useEffect, useRef, useState } from "react";

export default function FindSitesKeyFeatures() {
  const [isVisible, setIsVisible] = useState(false);
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

  const features = [
    {
      title: "Deep Research Automation",
      description:
        "Searches across LoopNet, CBRE, JLL, Brixmor, and local broker websites automatically, discovering properties missed by manual searching.",
      icon: "🔍",
    },
    {
      title: "Comprehensive Contact Data",
      description:
        "Extracts complete broker information including name, title, company, direct email, and phone numbers for immediate outreach.",
      icon: "📞",
    },
    {
      title: "Geolocation Verification",
      description:
        "Validates addresses and enriches with GPS coordinates, CBSA codes, and metropolitan area data for accurate location intelligence.",
      icon: "🗺️",
    },
    {
      title: "Computer Vision Analysis",
      description:
        "Analyzes aerial and street view imagery to verify property attributes, square footage, and premises classification.",
      icon: "👁️",
    },
    {
      title: "Multi-Stage Quality Assurance",
      description:
        "User-configurable qualification criteria with data legitimacy, recency, and criteria matching for transparent decision making.",
      icon: "✅",
    },
    {
      title: "Real-Time Monitoring",
      description:
        "Google Sheets integration logs all workflow executions for tracking, debugging, and maintaining an audit trail.",
      icon: "📊",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-xs uppercase tracking-wider text-primary font-medium mb-4">
            Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Key Features
          </h2>
          <p className="text-xl text-foreground/60 max-w-3xl">
            A comprehensive suite of AI-powered tools to automate commercial real estate site discovery and qualification.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative p-8 rounded-2xl bg-secondary/50 border border-foreground/5 transition-all duration-700 hover:border-primary/30 hover:bg-secondary/80 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? `${100 + index * 50}ms` : "0ms",
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-tertiary/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="text-5xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom accent */}
                <div className="mt-4 h-1 w-0 bg-gradient-to-r from-primary to-tertiary group-hover:w-12 transition-all duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
