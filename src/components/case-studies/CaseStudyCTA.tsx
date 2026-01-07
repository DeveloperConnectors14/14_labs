"use client";

import { useEffect, useRef, useState } from "react";

export default function CaseStudyCTA() {
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
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-secondary/50 to-tertiary/10" />

      {/* Animated orbs */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 -translate-y-1/2 -right-40 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Ready to Build Your AI Solution?
          </h2>
        </div>

        <p
          className={`text-xl text-foreground/70 mb-8 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionDelay: isVisible ? "100ms" : "0ms",
          }}
        >
          We design and build multi-agent AI systems tailored to your unique
          business needs. From architecture to deployment, we handle it all.
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionDelay: isVisible ? "200ms" : "0ms",
          }}
        >
          <a
            href="mailto:contact@14labs.co"
            className="group relative px-8 py-4 rounded-full bg-primary text-background font-medium overflow-hidden transition-all duration-500 hover:shadow-lg hover:shadow-primary/30"
          >
            <span className="relative z-10">Discuss Your Project</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-tertiary opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </a>

          <a
            href="/case-studies"
            className="group relative px-8 py-4 rounded-full border border-primary/30 text-foreground font-medium transition-all duration-500 hover:border-primary hover:bg-primary/5"
          >
            <span className="relative z-10">View More Case Studies</span>
          </a>
        </div>

        {/* Social proof */}
        <div
          className={`mt-12 pt-12 border-t border-foreground/10 transition-all duration-700 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          style={{
            transitionDelay: isVisible ? "300ms" : "0ms",
          }}
        >
          <p className="text-sm text-foreground/60 mb-4">
            Featured in production for EdTech solutions
          </p>
          <div className="flex items-center justify-center gap-6 flex-wrap">
            <div className="flex items-center gap-2 text-foreground/70">
              <span className="text-lg">🚀</span>
              <span className="text-sm">Production Ready</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-foreground/20" />
            <div className="flex items-center gap-2 text-foreground/70">
              <span className="text-lg">🔒</span>
              <span className="text-sm">Enterprise Secure</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-foreground/20" />
            <div className="flex items-center gap-2 text-foreground/70">
              <span className="text-lg">📈</span>
              <span className="text-sm">Highly Scalable</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
