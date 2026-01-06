"use client";

import { useEffect, useRef, useState } from "react";

const technologies = [
  { name: "Flask", category: "Backend", icon: "🐍" },
  { name: "Python", category: "Backend", icon: "🔧" },
  { name: "Supabase", category: "Database", icon: "🗄️" },
  { name: "PostgreSQL", category: "Database", icon: "📊" },
  { name: "CrewAI", category: "AI Framework", icon: "🤖" },
  { name: "OpenAI GPT-4", category: "LLM", icon: "🧠" },
];

export default function TechStackSection() {
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

  const groupedTechs = {
    Backend: technologies.filter((t) => t.category === "Backend"),
    Database: technologies.filter((t) => t.category === "Database"),
    "AI Framework": technologies.filter((t) => t.category === "AI Framework"),
    LLM: technologies.filter((t) => t.category === "LLM"),
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-xs uppercase tracking-wider text-primary font-medium mb-4">
            Built With
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Technology Stack
          </h2>
          <p className="text-xl text-foreground/60 max-w-3xl">
            Enterprise-grade technologies powering scalable, intelligent multi-agent systems.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {Object.entries(groupedTechs).map(([category, techs], categoryIndex) => (
            <div key={category}>
              <h3 className="text-sm uppercase tracking-wider text-primary font-bold mb-4">
                {category}
              </h3>
              <div className="space-y-3">
                {techs.map((tech, index) => (
                  <div
                    key={tech.name}
                    className={`group relative p-4 rounded-xl bg-secondary/30 border border-foreground/5 hover:border-primary/30 transition-all duration-700 ${
                      isVisible
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-8"
                    }`}
                    style={{
                      transitionDelay: isVisible
                        ? `${200 + (categoryIndex * 3 + index) * 50}ms`
                        : "0ms",
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{tech.icon}</span>
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          {tech.name}
                        </p>
                        <p className="text-xs text-foreground/50">{tech.category}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Highlight box */}
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
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <p className="text-primary font-bold text-2xl mb-2">Event-Driven</p>
              <p className="text-foreground/80 text-sm">
                Microservices architecture with asynchronous message processing
              </p>
            </div>
            <div>
              <p className="text-primary font-bold text-2xl mb-2">Scalable</p>
              <p className="text-foreground/80 text-sm">
                Designed to handle thousands of concurrent student interactions
              </p>
            </div>
            <div>
              <p className="text-primary font-bold text-2xl mb-2">Production</p>
              <p className="text-foreground/80 text-sm">
                Running live at pgadmit.com with 99.9% uptime guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
