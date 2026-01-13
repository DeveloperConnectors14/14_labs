"use client";

import { useEffect, useRef, useState } from "react";
import { Feature } from "@/types/case-study";

interface KeyFeaturesProps {
  features?: Feature[];
}

const DEFAULT_FEATURES: Feature[] = [
  {
    title: "Intelligent Conversation Routing",
    description:
      "Understands student queries and routes them to the right specialist agent with full context preservation.",
    icon: "🎯",
  },
  {
    title: "Real-Time University Matching",
    description:
      "Instant matching of universities based on academic profile, preferences, and goals with detailed rankings.",
    icon: "🎓",
  },
  {
    title: "Scholarship Discovery Engine",
    description:
      "Comprehensive search across thousands of scholarships to find the best opportunities for each student.",
    icon: "💰",
  },
  {
    title: "Application Timeline Management",
    description:
      "Automated deadline tracking, document checklists, and progress monitoring across all applications.",
    icon: "📅",
  },
  {
    title: "Essay Assistance & Review",
    description:
      "AI-powered feedback on personal essays and statements with suggestions for improvement and impact.",
    icon: "✍️",
  },
  {
    title: "Visa Guidance & Requirements",
    description:
      "Country-specific visa information, requirements, and procedural guidance for international students.",
    icon: "🌍",
  },
];

export default function KeyFeatures({ features: propFeatures }: KeyFeaturesProps) {
  const features = propFeatures || DEFAULT_FEATURES;
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

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute top-0 -left-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-xs uppercase tracking-wider text-primary font-medium mb-4">
            Capabilities
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Key Features
          </h2>
          <p className="text-xl text-foreground/60 max-w-3xl">
            A comprehensive suite of AI-powered tools to guide students through
            every step of the admissions journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`group relative p-8 rounded-2xl bg-secondary/50 border border-foreground/5 transition-opacity transition-transform duration-700 hover:border-primary ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? `${100 + index * 50}ms` : "0ms",
              }}
            >

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
