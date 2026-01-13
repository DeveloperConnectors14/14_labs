"use client";

import { useEffect, useState } from "react";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/30 rounded-full blur-3xl transition-all duration-1000 delay-500 ${
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-50"
          }`}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(#3ecfb2 1px, transparent 1px), linear-gradient(90deg, #3ecfb2 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <p
          className={`text-sm md:text-base text-primary font-semibold tracking-wider uppercase mb-4 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Engineered for enterprise. Inspired by what&apos;s next.
        </p>

        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 transition-all duration-700 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-foreground">We are </span>
          <span className="relative">
            <span className="text-primary">14 Labs</span>
            <svg
              className="absolute -bottom-2 left-0 w-full"
              viewBox="0 0 200 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 10C50 4 150 4 198 10"
                stroke="#3ecfb2"
                strokeWidth="3"
                strokeLinecap="round"
                className={`transition-all duration-1000 delay-700 ${
                  isLoaded ? "stroke-dashoffset-0" : ""
                }`}
                style={{
                  strokeDasharray: 200,
                  strokeDashoffset: isLoaded ? 0 : 200,
                  transition: "stroke-dashoffset 1s ease-out 0.7s",
                }}
              />
            </svg>
          </span>
        </h1>

        <p
          className={`text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-100 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Delivering AI-powered innovation. We turn complex technology challenges into
          seamless, scalable solutions that are delivered on time and on target.
        </p>

        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 delay-200 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="#services"
            className="group relative overflow-hidden rounded-full bg-primary px-8 py-4 text-base font-semibold text-secondary transition-all duration-300 hover:ring-2 hover:ring-primary"
          >
            <span className="relative z-10">Explore AI Services</span>
            <div className="absolute inset-0 scale-0 rounded-full bg-tertiary transition-transform duration-500 group-hover:scale-100" />
            <span className="absolute inset-0 z-10 flex items-center justify-center font-semibold text-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Explore AI Services
            </span>
          </a>
          <a
            href="#contact"
            className="group relative rounded-full border border-foreground/20 px-8 py-4 text-base font-medium text-foreground transition-all duration-300 hover:border-primary hover:text-primary"
          >
            <span>Contact Us</span>
            <span className="inline-block ml-2 transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
