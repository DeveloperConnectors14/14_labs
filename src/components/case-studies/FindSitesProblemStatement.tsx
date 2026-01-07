"use client";

import { useEffect, useRef, useState } from "react";

export default function FindSitesProblemStatement() {
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

  const problems = [
    {
      icon: "⏱️",
      title: "Time-Intensive Research",
      description: "Analysts spend 6-8 hours per day manually searching across LoopNet, CBRE, JLL, and local broker websites with no integration or automation",
    },
    {
      icon: "🔀",
      title: "Fragmented & Incomplete Data",
      description: "Property information scattered across 5+ sources with missing contact details, broker information, and geographic data that requires manual consolidation",
    },
    {
      icon: "❌",
      title: "No Verification Standards",
      description: "Addresses, square footage, property attributes, and contact details lack systematic verification, leading to 30%+ data inaccuracy rates",
    },
    {
      icon: "⚖️",
      title: "Missed Opportunities",
      description: "Manual processes create response delays, duplicate efforts, and significant property discovery gaps that competitors find through automation",
    },
  ];

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background orbs */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-xs uppercase tracking-wider text-primary font-medium mb-4">
            The Challenge
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Commercial Real Estate<br />Site Discovery Pain Points
          </h2>
          <p className="text-xl text-foreground/60 max-w-3xl">
            Traditional site research methods are inefficient, error-prone, and lack the automation that modern commercial real estate professionals need.
          </p>
        </div>

        {/* Problem alternating zigzag layout */}
        <div className="max-w-5xl mx-auto mb-12">
          {/* Center connecting line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0 hidden lg:block" />

          <div className="relative space-y-12">
            {problems.map((problem, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={problem.title}
                  className={`grid lg:grid-cols-2 gap-8 items-center transition-all duration-700 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{
                    transitionDelay: isVisible ? `${100 + index * 75}ms` : "0ms",
                  }}
                >
                  {/* Content - alternates left/right */}
                  <div className={`${!isEven ? "lg:order-2" : ""}`}>
                    <div className="group relative">
                      {/* Title with inline icon */}
                      <div className="flex items-start gap-3 mb-3">
                        <span className="text-3xl md:text-4xl flex-shrink-0">
                          {problem.icon}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300 pt-1">
                          {problem.title}
                        </h3>
                      </div>

                      {/* Description */}
                      <p className="text-foreground/70 text-base md:text-lg leading-relaxed mb-4">
                        {problem.description}
                      </p>

                      {/* Accent line */}
                      <div className="h-1 w-0 bg-gradient-to-r from-primary to-tertiary group-hover:w-16 transition-all duration-300" />
                    </div>
                  </div>

                  {/* Right side spacer - alternates right/left */}
                  <div className={`${!isEven ? "lg:order-1" : ""}`}>
                    <div className="hidden lg:block h-32" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Impact Summary Callout */}
        <div
          className={`max-w-4xl mx-auto mt-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionDelay: isVisible ? "500ms" : "0ms",
          }}
        >
          <div className="relative p-8 md:p-10 rounded-2xl bg-gradient-to-r from-primary/10 via-tertiary/10 to-primary/10 border-2 border-primary/30 backdrop-blur-sm">
            {/* Accent decorations */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-primary/20 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-20 h-20 bg-tertiary/20 rounded-full blur-2xl translate-x-1/2 translate-y-1/2" />

            <div className="relative z-10">
              <h3 className="text-lg md:text-xl font-bold text-primary mb-3">
                The Real Cost of Manual Operations
              </h3>
              <p className="text-foreground/80 text-base md:text-lg leading-relaxed">
                These challenges compound daily: analysts spend <strong>6-8 hours per property discovery</strong>, data accuracy drops to <strong>70%</strong>, and critical opportunities are <strong>missed entirely</strong>. The result is slower deal cycles, higher operational costs, and competitive disadvantage. <strong>Automation is no longer optional—it's essential.</strong>
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
