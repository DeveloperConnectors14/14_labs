"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled || isMobileMenuOpen
          ? "bg-secondary/95 backdrop-blur-xl shadow-lg shadow-primary/5 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="group relative flex items-center"
          >
            <Image
              src="/logo-primary-white.png"
              alt="14 Labs"
              width={240}
              height={80}
              className="h-20 md:h-24 w-auto transition-all duration-300 group-hover:brightness-125"
              priority
            />
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-primary/0 blur-xl transition-all duration-500 group-hover:bg-primary/10" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative px-5 py-2.5 text-sm font-medium text-foreground/80 transition-all duration-300 hover:text-foreground"
              >
                {/* Background pill */}
                <span
                  className={`absolute inset-0 rounded-full bg-primary/10 transition-all duration-300 ease-out ${
                    hoveredLink === link.name
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95"
                  }`}
                />
                {/* Text */}
                <span className="relative z-10">{link.name}</span>
                {/* Bottom accent */}
                <span
                  className={`absolute bottom-1 left-1/2 h-[2px] bg-primary transition-all duration-300 ease-out ${
                    hoveredLink === link.name
                      ? "w-6 -translate-x-1/2 opacity-100"
                      : "w-0 -translate-x-1/2 opacity-0"
                  }`}
                />
              </a>
            ))}

            {/* CTA Button */}
            <a
              href="#contact"
              className="group relative ml-4 overflow-hidden rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-secondary transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
            >
              <span className="relative z-10 transition-all duration-300 group-hover:text-secondary">
                Get Started
              </span>
              {/* Shine effect */}
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              {/* Scale effect */}
              <div className="absolute inset-0 scale-0 rounded-full bg-tertiary transition-transform duration-300 group-hover:scale-100" />
              <span className="absolute inset-0 z-10 flex items-center justify-center font-semibold text-secondary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Get Started
              </span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="relative md:hidden w-10 h-10 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <span
                className={`absolute left-0 w-full h-[2px] bg-foreground transition-all duration-300 ease-out ${
                  isMobileMenuOpen
                    ? "top-1/2 -translate-y-1/2 rotate-45 bg-primary"
                    : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-foreground transition-all duration-300 ease-out ${
                  isMobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              />
              <span
                className={`absolute left-0 w-full h-[2px] bg-foreground transition-all duration-300 ease-out ${
                  isMobileMenuOpen
                    ? "top-1/2 -translate-y-1/2 -rotate-45 bg-primary"
                    : "bottom-0"
                }`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-2 pb-6 pt-4 border-t border-primary/20">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="group relative px-4 py-3 text-foreground/80 transition-all duration-300 hover:text-foreground hover:pl-6"
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-2" />
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-2 mx-4 rounded-full bg-primary px-6 py-3 text-center font-semibold text-secondary transition-all duration-300 hover:bg-tertiary"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

