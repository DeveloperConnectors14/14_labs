"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

interface NavLink {
  name: string;
  target: string;
  type?: "scroll" | "route";
}

const navLinks: NavLink[] = [
  { name: "Home", target: "top", type: "scroll" },
  { name: "Services", target: "services", type: "scroll" },
  { name: "About", target: "about", type: "scroll" },
  { name: "Case Studies", target: "/case-studies/ai-admission-counselor", type: "route" },
  { name: "Contact", target: "contact", type: "scroll" },
];

const caseStudies = [
  { name: "AI Admission Counselor", path: "/case-studies/ai-admission-counselor" },
  { name: "AI Find Sites Real Estate Solution", path: "/case-studies/find-sites-workflow" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCaseStudiesDropdown, setShowCaseStudiesDropdown] = useState(false);

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

  const handleNavClick = (e: React.MouseEvent, link: NavLink) => {
    e.preventDefault();

    if (link.type === "route") {
      router.push(link.target);
    } else {
      scrollToSection(link.target);
    }

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
              <div key={link.name} className="relative">
                <button
                  onClick={(e) => {
                    if (link.name === "Case Studies") {
                      e.preventDefault();
                      setShowCaseStudiesDropdown(!showCaseStudiesDropdown);
                    } else {
                      handleNavClick(e, link);
                    }
                  }}
                  onMouseEnter={() => {
                    setHoveredLink(link.name);
                    if (link.name === "Case Studies") {
                      setShowCaseStudiesDropdown(true);
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredLink(null);
                    if (link.name === "Case Studies") {
                      setShowCaseStudiesDropdown(false);
                    }
                  }}
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
                  <span className="relative z-10 flex items-center gap-2">
                    {link.name}
                    {link.name === "Case Studies" && (
                      <span
                        className={`transition-transform duration-300 ${
                          showCaseStudiesDropdown ? "rotate-180" : ""
                        }`}
                      >
                        ▼
                      </span>
                    )}
                  </span>
                  {/* Bottom accent */}
                  <span
                    className={`absolute bottom-1 left-1/2 h-[2px] bg-primary transition-all duration-300 ease-out ${
                      hoveredLink === link.name
                        ? "w-6 -translate-x-1/2 opacity-100"
                        : "w-0 -translate-x-1/2 opacity-0"
                    }`}
                  />
                </button>

                {/* Case Studies Dropdown */}
                {link.name === "Case Studies" && (
                  <div
                    className={`absolute top-full left-0 mt-2 bg-secondary/95 backdrop-blur-xl rounded-lg border border-foreground/10 overflow-hidden shadow-lg transition-all duration-300 ease-out ${
                      showCaseStudiesDropdown
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
                    onMouseEnter={() => setShowCaseStudiesDropdown(true)}
                    onMouseLeave={() => setShowCaseStudiesDropdown(false)}
                  >
                    {caseStudies.map((caseStudy, index) => (
                      <button
                        key={caseStudy.path}
                        onClick={() => {
                          router.push(caseStudy.path);
                          setShowCaseStudiesDropdown(false);
                        }}
                        className="w-full px-4 py-3 text-left text-sm font-medium text-foreground/80 hover:text-foreground hover:bg-primary/10 transition-all duration-300 border-b border-foreground/5 last:border-b-0"
                      >
                        {caseStudy.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
                onClick={(e) => handleNavClick(e, link)}
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
