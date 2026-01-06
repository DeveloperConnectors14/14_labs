"use client";

import { useEffect, useRef, useState } from "react";

export default function SolutionApproach() {
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

  const solutions = [
    {
      title: "Master-Worker Architecture",
      description:
        "Centralized orchestrator agent coordinates with 6 specialist agents, each handling specific domains",
      icon: "🏗️",
    },
    {
      title: "1 Orchestrator + 6 Specialists",
      description:
        "Admission Counselor routes requests to University Search, Application Requirements, Scholarship Search, Scholarship Requirements, Essay, and Visa agents",
      icon: "🤖",
    },
    {
      title: "Data-Driven Recommendations",
      description:
        "Personalized recommendations based on student profiles and real data, not generic advice",
      icon: "📊",
    },
    {
      title: "Automated Discovery",
      description:
        "Automates research across universities, scholarships, and visa requirements while keeping humans in control",
      icon: "⚡",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute -top-40 right-0 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-xs uppercase tracking-wider text-primary font-medium mb-4">
            Our Approach
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            The Solution
          </h2>
          <p className="text-xl text-foreground/60 max-w-3xl">
            We built an AI-driven, agentic admissions consulting platform that
            breaks the process into specialized domains with intelligent
            orchestration at the core.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {solutions.map((solution, index) => (
            <div
              key={solution.title}
              className={`group relative p-8 rounded-2xl bg-secondary/50 border border-foreground/5 transition-all duration-700 hover:border-primary/30 hover:bg-secondary/80 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? `${200 + index * 100}ms` : "0ms",
              }}
            >
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-tertiary/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <div className="text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-110">
                  {solution.icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {solution.title}
                </h3>
                <p className="text-foreground/60">{solution.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture highlight */}
        <div
          className={`mt-16 p-8 md:p-12 rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/50 to-tertiary/5 border border-primary/20 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionDelay: isVisible ? "600ms" : "0ms",
          }}
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-primary font-bold text-3xl mb-2">1</div>
              <p className="text-foreground/80">
                Central Orchestrator for unified student experience
              </p>
            </div>
            <div>
              <div className="text-primary font-bold text-3xl mb-2">6</div>
              <p className="text-foreground/80">
                Specialized agents handling different admission domains
              </p>
            </div>
            <div>
              <div className="text-primary font-bold text-3xl mb-2">∞</div>
              <p className="text-foreground/80">
                Scalable to add new agents and domains as needed
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
