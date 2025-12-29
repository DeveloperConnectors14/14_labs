"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const navLinks = [
  { name: "Home", target: "top" },
  { name: "Services", target: "services" },
  { name: "About", target: "about" },
  { name: "Contact", target: "contact" },
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

  const scrollToSection = (target: string) => {
    if (target === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const element = document.getElementById(target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleNavClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    scrollToSection(target);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled || isMobileMenuOpen
          ? "bg-background/80 backdrop-blur-xl shadow-sm shadow-black/10 py-3"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("top")}
            className="group relative flex items-center"
          >
            <Image
              src="/logo-primary-white.png"
              alt="14 Labs"
              width={120}
              height={40}
              className={`h-10 md:h-12 w-auto transition-all duration-300 absolute ${
                isScrolled || isMobileMenuOpen
                  ? "opacity-0"
                  : "opacity-100 group-hover:opacity-0"
              }`}
              priority
            />
            <Image
              src="/logo-primary.png"
              alt="14 Labs"
              width={120}
              height={40}
              className={`h-10 md:h-12 w-auto transition-all duration-300 ${
                isScrolled || isMobileMenuOpen
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
              priority
            />
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-primary/0 blur-xl transition-all duration-500 group-hover:bg-primary/10" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={(e) => handleNavClick(e, link.target)}
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
              </button>
            ))}
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
              <button
                key={link.name}
                onClick={(e) => handleNavClick(e, link.target)}
                className="group relative px-4 py-3 text-left text-foreground/80 transition-all duration-300 hover:text-foreground hover:pl-6"
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 50}ms` : "0ms",
                }}
              >
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-2" />
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
