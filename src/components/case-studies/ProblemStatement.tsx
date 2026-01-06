"use client";

import { useEffect, useRef, useState } from "react";

const problems = [
  "Students spend 40+ hours on manual university research",
  "Application requirements vary widely across institutions",
  "Scholarship discovery is scattered and often outdated",
  "Visa requirements are complex and frequently changing",
  "Students miss deadlines due to poor planning or lack of guidance",
];

export default function ProblemStatement() {
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
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-xs uppercase tracking-wider text-primary font-medium mb-4">
            The Challenge
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            The Problem
          </h2>
          <p className="text-xl text-foreground/60 max-w-2xl">
            Applying to universities—especially internationally—is a fragmented
            and overwhelming process.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text content */}
          <div
            className={`transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
            style={{
              transitionDelay: isVisible ? "200ms" : "0ms",
            }}
          >
            <ul className="space-y-4">
              {problems.map((problem, index) => (
                <li
                  key={index}
                  className="flex gap-4 items-start group"
                  style={{
                    transitionDelay: isVisible
                      ? `${200 + index * 50}ms`
                      : "0ms",
                  }}
                >
                  <div className="mt-1.5 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/40 transition-colors duration-300">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-foreground/80 text-lg pt-0.5">
                    {problem}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Visual element */}
          <div
            className={`relative h-96 md:h-full min-h-96 rounded-2xl overflow-hidden transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
            style={{
              transitionDelay: isVisible ? "300ms" : "0ms",
            }}
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-tertiary/10" />

            {/* Animated grid */}
            <div className="absolute inset-0">
              <svg
                className="w-full h-full"
                viewBox="0 0 400 400"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <pattern
                    id="grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="0.5"
                      opacity="0.1"
                    />
                  </pattern>
                </defs>
                <rect width="400" height="400" fill="url(#grid)" />

                {/* Animated circles */}
                <circle
                  cx="200"
                  cy="200"
                  r="80"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="1"
                  opacity="0.2"
                  className="animate-pulse"
                />
                <circle
                  cx="200"
                  cy="200"
                  r="120"
                  fill="none"
                  stroke="var(--tertiary)"
                  strokeWidth="1"
                  opacity="0.15"
                  style={{
                    animation: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) 1s infinite",
                  }}
                />

                {/* Scattered nodes */}
                {[
                  { x: 100, y: 100 },
                  { x: 300, y: 120 },
                  { x: 150, y: 280 },
                  { x: 320, y: 280 },
                ].map((pos, i) => (
                  <g key={i}>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="8"
                      fill="var(--primary)"
                      opacity="0.3"
                    />
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="8"
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="1"
                      opacity="0.5"
                      className="animate-pulse"
                      style={{
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  </g>
                ))}
              </svg>
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-primary/40 mb-2">
                  40+
                </div>
                <p className="text-foreground/40 font-medium">hours of research</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
