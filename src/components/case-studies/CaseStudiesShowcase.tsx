"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { caseStudies } from "@/data/case-studies-index";

export default function CaseStudiesShowcase() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
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
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 -left-40 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div
          className={`mb-20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-block text-xs uppercase tracking-wider text-primary font-medium mb-4">
            Case Studies
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            Real-World AI Solutions
          </h1>
          <p className="text-xl text-foreground/60 max-w-3xl leading-relaxed">
            Explore how we've transformed businesses across industries with
            intelligent automation, multi-agent systems, and cutting-edge AI
            technology.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {caseStudies.map((caseStudy, index) => (
            <Link key={caseStudy.id} href={caseStudy.href}>
              <div
                className={`group relative h-full cursor-pointer transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: isVisible ? `${100 + index * 150}ms` : "0ms",
                }}
                onMouseEnter={() => setHoveredId(caseStudy.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Featured Badge */}
                {caseStudy.featured && (
                  <div className="absolute -top-4 left-8 z-20">
                    <span className="inline-block px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-primary to-cyan-500 text-white">
                      Featured
                    </span>
                  </div>
                )}

                {/* Card Container */}
                <div className="relative h-full rounded-2xl overflow-hidden border border-foreground/10 group-hover:border-primary/40 transition-all duration-500 bg-gradient-to-br from-secondary/50 to-secondary/30 group-hover:from-secondary/70 group-hover:to-secondary/50">
                  {/* Gradient background that animates on hover */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${caseStudy.color.primary}08 0%, ${caseStudy.color.secondary}08 100%)`,
                    }}
                  />

                  {/* Content */}
                  <div className="relative p-8 md:p-10 h-full flex flex-col">
                    {/* Top Section - Title and Industry */}
                    <div className="mb-8">
                      {/* Industry Tag */}
                      <div className="inline-block mb-4">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-white"
                          style={{
                            backgroundColor: caseStudy.color.primary + "40",
                            color: caseStudy.color.primary,
                          }}
                        >
                          {caseStudy.industry}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-500 line-clamp-2">
                        {caseStudy.title}
                      </h2>

                      {/* Description */}
                      <p className="text-foreground/70 text-base leading-relaxed line-clamp-2">
                        {caseStudy.shortDescription}
                      </p>
                    </div>

                    {/* Middle Section - Metrics and Highlights */}
                    <div className="mb-8 flex-1">
                      {/* Metrics Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {caseStudy.metrics.slice(0, 4).map((metric, idx) => (
                          <div
                            key={idx}
                            className={`p-3 rounded-lg bg-foreground/5 group-hover:bg-foreground/10 transition-all duration-500 ${
                              hoveredId === caseStudy.id
                                ? "translate-y-0 opacity-100"
                                : "translate-y-2 opacity-80"
                            }`}
                            style={{
                              transitionDelay:
                                hoveredId === caseStudy.id
                                  ? `${idx * 50}ms`
                                  : "0ms",
                            }}
                          >
                            <p
                              className="text-lg md:text-xl font-bold mb-1"
                              style={{ color: caseStudy.color.primary }}
                            >
                              {metric.value}
                            </p>
                            <p className="text-xs uppercase tracking-wider text-foreground/60 font-semibold">
                              {metric.label}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Project Highlights */}
                      <div className="space-y-3 pt-6 border-t border-foreground/10 group-hover:border-primary/30 transition-colors duration-500">
                        <div className={`flex items-center gap-3 transition-all duration-500 ${
                          hoveredId === caseStudy.id ? "translate-x-0 opacity-100" : "translate-x-2 opacity-60"
                        }`}
                          style={{ transitionDelay: hoveredId === caseStudy.id ? "200ms" : "0ms" }}>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: caseStudy.color.primary }} />
                          <span className="text-xs text-foreground/70">
                            <span className="font-semibold text-foreground">{caseStudy.timeline}</span> timeline
                          </span>
                        </div>
                        <div className={`flex items-center gap-3 transition-all duration-500 ${
                          hoveredId === caseStudy.id ? "translate-x-0 opacity-100" : "translate-x-2 opacity-60"
                        }`}
                          style={{ transitionDelay: hoveredId === caseStudy.id ? "250ms" : "0ms" }}>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: caseStudy.color.primary }} />
                          <span className="text-xs text-foreground/70">
                            <span className="font-semibold text-foreground">{caseStudy.teamSize}</span> engineers
                          </span>
                        </div>
                        <div className={`flex items-center gap-3 transition-all duration-500 ${
                          hoveredId === caseStudy.id ? "translate-x-0 opacity-100" : "translate-x-2 opacity-60"
                        }`}
                          style={{ transitionDelay: hoveredId === caseStudy.id ? "300ms" : "0ms" }}>
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: caseStudy.color.primary }} />
                          <span className="text-xs text-foreground/70">
                            <span className="font-semibold text-foreground">{caseStudy.technologies.length}</span> technologies
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Section - Technologies and CTA */}
                    <div className="space-y-5">
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2">
                        {caseStudy.technologies.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 text-xs rounded-full bg-foreground/5 text-foreground/70 font-medium border border-foreground/10 group-hover:border-primary/30 transition-colors duration-500"
                          >
                            {tech}
                          </span>
                        ))}
                        {caseStudy.technologies.length > 3 && (
                          <span className="px-3 py-1 text-xs rounded-full bg-foreground/5 text-foreground/70 font-medium border border-foreground/10">
                            +{caseStudy.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* CTA Button */}
                      <div className="flex items-center justify-between pt-4 border-t border-foreground/10 group-hover:border-primary/30 transition-colors duration-500">
                        <span className="text-sm font-semibold text-foreground/60 group-hover:text-primary transition-colors duration-500">
                          Explore Case Study
                        </span>
                        <div
                          className="w-6 h-6 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500"
                          style={{
                            backgroundColor: caseStudy.color.primary + "20",
                            color: caseStudy.color.primary,
                          }}
                        >
                          <svg
                            className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${caseStudy.color.primary} 0%, transparent 70%)`,
                      filter: "blur(40px)",
                    }}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <div
          className={`mt-24 grid md:grid-cols-3 gap-8 p-12 rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/50 to-tertiary/5 border border-primary/20 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionDelay: isVisible ? "400ms" : "0ms",
          }}
        >
          {[
            { label: "Total Case Studies", value: "2" },
            { label: "Industries Served", value: "2+" },
            { label: "Combined Efficiency Gain", value: "70%+" },
          ].map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent mb-2">
                {stat.value}
              </p>
              <p className="text-foreground/60 uppercase text-sm font-semibold tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
