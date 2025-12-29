"use client";

import { useEffect, useState, useRef } from "react";

const stats = [
  { value: "15+", label: "Projects Delivered" },
  { value: "10+", label: "Happy Clients" },
  { value: "4+", label: "Years Experience" },
  { value: "95%", label: "Client Satisfaction" },
];

export default function About() {
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
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div>
            <span
              className={`inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              About Us
            </span>
            <h2
              className={`text-4xl md:text-5xl font-bold text-foreground mb-6 transition-all duration-700 delay-100 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              We Build Digital
              <span className="text-primary"> Excellence</span>
            </h2>
            <p
              className={`text-foreground/60 text-lg mb-6 leading-relaxed transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              14 Labs is a forward-thinking technology company dedicated to transforming
              businesses through innovative digital solutions. We combine creativity with
              technical expertise to deliver products that make a real impact.
            </p>
            <p
              className={`text-foreground/60 text-lg mb-8 leading-relaxed transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              Our team of experts specializes in web development, mobile applications,
              and AI-powered solutions. We believe in building long-term partnerships
              with our clients, understanding their unique challenges, and delivering
              solutions that exceed expectations.
            </p>

            {/* Values */}
            <div
              className={`flex flex-wrap gap-3 transition-all duration-700 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              {["Innovation", "Quality", "Transparency", "Results"].map((value) => (
                <span
                  key={value}
                  className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                >
                  {value}
                </span>
              ))}
            </div>
          </div>

          {/* Right Content - Stats */}
          <div
            className={`grid grid-cols-2 gap-6 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="group relative p-6 rounded-2xl bg-secondary/50 border border-foreground/5 transition-all duration-300 hover:border-primary/30 hover:bg-secondary/80"
                style={{
                  transitionDelay: isVisible ? `${400 + index * 100}ms` : "0ms",
                }}
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-foreground/60 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
