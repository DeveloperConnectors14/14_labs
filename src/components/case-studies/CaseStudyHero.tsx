"use client";

import { useEffect, useRef, useState } from "react";

export default function CaseStudyHero() {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pt-32 md:pt-40 lg:pt-48 pb-24 md:pb-32"
    >
      {/* Background orbs */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
        {/* Label */}
        <div
          className={`inline-block mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <span className="text-xs uppercase tracking-wider text-primary font-medium">
            Case Study
          </span>
        </div>

        {/* Title */}
        <h1
          className={`text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: isVisible ? "100ms" : "0ms",
          }}
        >
          AI-Powered Admission Counselor
        </h1>

        {/* Subtitle */}
        <p
          className={`text-xl md:text-2xl text-foreground/60 mb-8 max-w-2xl mx-auto transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: isVisible ? "200ms" : "0ms",
          }}
        >
          Transforming University Admissions with Multi-Agent Intelligence
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{
            transitionDelay: isVisible ? "300ms" : "0ms",
          }}
        >
          <a
            href="https://pgadmit.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 rounded-full bg-primary text-background font-medium overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-primary/30"
          >
            <span className="relative z-10">View Live Platform</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-tertiary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </a>

          <a
            href="#contact"
            className="group relative px-8 py-4 rounded-full border border-primary/30 text-foreground font-medium transition-all duration-500 hover:border-primary hover:bg-primary/5"
          >
            <span className="relative z-10">Contact Us</span>
          </a>
        </div>
      </div>

      {/* Animated accent line */}
      <svg
        className="absolute bottom-0 left-0 right-0 w-full h-16"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 Q300,20 600,50 T1200,50"
          stroke="url(#gradient)"
          strokeWidth="2"
          fill="none"
          strokeDasharray="1200"
          strokeDashoffset={isVisible ? "0" : "1200"}
          style={{
            transition: "stroke-dashoffset 1.5s ease-out",
          }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--primary)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--tertiary)" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </section>
  );
}
