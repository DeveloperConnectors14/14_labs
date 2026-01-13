"use client";

import { useEffect, useState, useRef } from "react";

const services = [
  {
    id: "multi-agent",
    title: "Multi-Agent Systems",
    description:
      "Development of multi-agent systems with built-in observability, enabling monitoring and optimizing specialized agents operating at enterprise scale.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="12" cy="18" r="3" />
        <path d="M6 9v3a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3V9" />
        <path d="M12 15v-3" />
      </svg>
    ),
    features: ["Agent Orchestration", "Built-in Observability", "Enterprise Scale", "Real-time Monitoring"],
  },
  {
    id: "ai-integration",
    title: "AI Integration",
    description:
      "Seamlessly integrate AI capabilities into your existing systems. Enhance today's operations and drive tomorrow's breakthroughs with intelligent automation.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M12 2a4 4 0 0 1 4 4c0 1.1-.9 2-2 2h-4a2 2 0 0 1-2-2 4 4 0 0 1 4-4z" />
        <path d="M8 8v8" />
        <path d="M16 8v8" />
        <path d="M12 8v8" />
        <path d="M8 16a4 4 0 0 0 8 0" />
        <circle cx="8" cy="8" r="1" />
        <circle cx="16" cy="8" r="1" />
        <circle cx="12" cy="8" r="1" />
      </svg>
    ),
    features: ["LLM Integration", "Custom AI Models", "Process Automation", "Data Analytics"],
  },
  {
    id: "custom-ai",
    title: "Custom AI Solutions",
    description:
      "Designing intelligent solutions for the future. We build custom AI models and applications tailored to your unique business challenges.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    features: ["RAG Systems", "Fine-tuned Models", "AI Chatbots", "Knowledge Bases"],
  },
  {
    id: "web",
    title: "Web & App Development",
    description:
      "Modern, AI-enhanced websites and applications built with cutting-edge technologies. From intelligent platforms to seamless mobile experiences.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    features: ["React & Next.js", "Mobile Apps", "AI-Powered UX", "API Integration"],
  },
];

export default function Services() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
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
      id="services"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span
            className={`inline-block text-primary text-sm font-semibold tracking-wider uppercase mb-4 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            AI Services
          </span>
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 transition-all duration-700 delay-100 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Serious expertise. <span className="text-primary">Real results.</span>
          </h2>
          <p
            className={`text-foreground/60 text-lg max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            We keep our word, align seamlessly with your teams, and deliver outcomes that matter.
            Integrating the now. Inventing the next.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              onMouseEnter={() => setHoveredCard(service.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`group relative rounded-2xl bg-secondary/50 border border-foreground/5 p-8 transition-opacity transition-transform duration-500 hover:border-primary ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{
                transitionDelay: isVisible ? `${300 + index * 100}ms` : "0ms",
              }}
            >

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-6 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                  {service.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-foreground mb-3 transition-colors duration-300 group-hover:text-primary">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-foreground/60 mb-6 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center text-sm text-foreground/50"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>

              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-2xl">
                <div
                  className={`absolute top-0 right-0 w-28 h-28 -translate-y-1/2 translate-x-1/2 rounded-full bg-gradient-to-br from-primary/10 to-transparent transition-all duration-500 ${
                    hoveredCard === service.id ? "scale-150" : "scale-100"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
