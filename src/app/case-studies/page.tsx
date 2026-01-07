import { Metadata } from "next";
import Link from "next/link";
import CaseStudiesShowcase from "@/components/case-studies/CaseStudiesShowcase";

export const metadata: Metadata = {
  title: "Case Studies | 14 Labs",
  description:
    "Explore our portfolio of AI-powered solutions. From real estate automation to educational technology, see how we transform businesses with intelligent systems.",
  keywords: [
    "case studies",
    "AI solutions",
    "14 Labs portfolio",
    "AI implementation",
    "real estate AI",
    "EdTech AI",
  ],
  openGraph: {
    title: "Case Studies - 14 Labs",
    description:
      "Explore our portfolio of AI-powered solutions and real-world implementations",
    url: "https://14labs.co/case-studies",
    type: "website",
    images: [
      {
        url: "/og-case-studies.png",
        width: 1200,
        height: 630,
        alt: "14 Labs Case Studies Portfolio",
      },
    ],
  },
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <CaseStudiesShowcase />
    </main>
  );
}
