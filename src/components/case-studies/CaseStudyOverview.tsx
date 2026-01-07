"use client";

import { useEffect, useRef, useState } from "react";
import { StatCard } from "@/types/case-study";

interface CaseStudyOverviewProps {
  stats?: StatCard[];
}

const DEFAULT_STATS: StatCard[] = [
  { label: "Industry", value: "EdTech" },
  { label: "Timeline", value: "3 months" },
  { label: "Team Size", value: "4 engineers" },
  { label: "Agents", value: "7 AI" },
];

export default function CaseStudyOverview({ stats: propStats }: CaseStudyOverviewProps) {
  const stats = propStats || DEFAULT_STATS;
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`group relative p-6 rounded-2xl bg-secondary/50 border border-foreground/5 transition-all duration-700 hover:border-primary/30 hover:bg-secondary/80 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-tertiary/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative z-10">
                <p className="text-sm uppercase tracking-wider text-primary font-medium mb-2">
                  {stat.label}
                </p>
                <p className="text-3xl md:text-4xl font-bold text-foreground">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
