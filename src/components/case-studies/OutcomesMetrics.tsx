"use client";

import { useEffect, useRef, useState } from "react";
import { Metric } from "@/types/case-study";

interface OutcomesMetricsProps {
  metrics?: Metric[];
}

const DEFAULT_METRICS: Metric[] = [
  {
    value: "70%",
    label: "Time Reduction",
    description: "Reduction in manual research time for students",
  },
  {
    value: "6",
    label: "Specialist Agents",
    description: "AI agents working in coordination to provide end-to-end guidance",
  },
  {
    value: "1",
    label: "Master Orchestrator",
    description: "Central coordinator ensuring cohesive student experience",
  },
  {
    value: "∞",
    label: "Scalability",
    description: "Easily extensible architecture for future agents and domains",
  },
];

interface CounterProps {
  value: string;
  isVisible: boolean;
  index: number;
}

function Counter({ value, isVisible, index }: CounterProps) {
  const [displayValue, setDisplayValue] = useState("0");
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isVisible || hasAnimated.current) return;

    // Extract numeric value
    const numericValue = parseInt(value);
    const suffix = value.replace(/\d+/g, ""); // Get non-numeric part (%, etc)

    if (isNaN(numericValue)) {
      // Non-numeric values like "∞" or "70-80%"
      setDisplayValue(value);
      hasAnimated.current = true;
      return;
    }

    hasAnimated.current = true;
    const duration = 1500;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = numericValue / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= numericValue) {
        setDisplayValue(numericValue.toString() + suffix);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current).toString() + suffix);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div
      className={`transition-all duration-700 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
      style={{
        transitionDelay: isVisible ? `${200 + index * 100}ms` : "0ms",
      }}
    >
      <div className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-tertiary bg-clip-text text-transparent mb-2">
        {displayValue}
      </div>
    </div>
  );
}

export default function OutcomesMetrics({ metrics: propMetrics }: OutcomesMetricsProps) {
  const metrics = propMetrics || DEFAULT_METRICS;
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
      <div className="absolute top-1/3 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-xs uppercase tracking-wider text-primary font-medium mb-4">
            Results
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Measurable Impact
          </h2>
          <p className="text-xl text-foreground/60 max-w-3xl">
            The agentic system delivered tangible value through intelligent
            automation and comprehensive guidance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
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
                <Counter
                  value={metric.value}
                  isVisible={isVisible}
                  index={index}
                />
                <p className="text-lg font-bold text-foreground mb-2">
                  {metric.label}
                </p>
                <p className="text-foreground/60">{metric.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
