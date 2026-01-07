import { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import CaseStudyHero from "@/components/case-studies/CaseStudyHero";
import CaseStudyOverview from "@/components/case-studies/CaseStudyOverview";
import ProblemStatement from "@/components/case-studies/ProblemStatement";
import SolutionApproach from "@/components/case-studies/SolutionApproach";
import AgentFlowDiagram from "@/components/case-studies/AgentFlowDiagram";
import KeyFeatures from "@/components/case-studies/KeyFeatures";
import TechStackSection from "@/components/case-studies/TechStackSection";
import OutcomesMetrics from "@/components/case-studies/OutcomesMetrics";
import CaseStudyCTA from "@/components/case-studies/CaseStudyCTA";

export const metadata: Metadata = {
  title: "AI Admission Counselor Case Study | 14 Labs",
  description:
    "How we built a multi-agent AI system that reduced university admissions research time by 70-80%. Learn about our CrewAI-powered solution for international students.",
  keywords: [
    "AI case study",
    "multi-agent system",
    "CrewAI",
    "university admissions AI",
    "EdTech AI",
    "artificial intelligence",
  ],
  openGraph: {
    title: "AI-Powered Admission Counselor - 14 Labs Case Study",
    description:
      "Multi-agent AI system reducing admissions research time by 70% with intelligent orchestration and specialized agents",
    url: "https://14labs.co/case-studies/ai-admission-counselor",
    type: "article",
    images: [
      {
        url: "/og-case-study.png",
        width: 1200,
        height: 630,
        alt: "AI Admission Counselor Architecture",
      },
    ],
  },
};

export default function AiAdmissionCounselorCaseStudy() {
  return (
    <>
      <Navbar />
      {/* Home Icon */}
      <div className="fixed top-24 right-6 z-40 md:hidden">
        <Link
          href="/"
          className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors duration-300"
          title="Back to home"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </Link>
      </div>
      <main className="min-h-screen bg-background text-foreground overflow-hidden">
        {/* Hero Section */}
        <CaseStudyHero />

      {/* Overview Statistics */}
      <CaseStudyOverview />

      {/* Problem Statement */}
      <ProblemStatement />

      {/* Solution Approach */}
      <SolutionApproach />

      {/* Interactive Agent Architecture Diagram */}
      <AgentFlowDiagram />

      {/* Key Features */}
      <KeyFeatures />

      {/* Technology Stack */}
      <TechStackSection />

      {/* Results & Impact */}
      <OutcomesMetrics />

      {/* Call to Action */}
      <CaseStudyCTA />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: "AI-Powered Admission Counselor Case Study",
            description:
              "How we built a multi-agent AI system that reduced university admissions research time by 70-80%",
            image: "/og-case-study.png",
            author: {
              "@type": "Organization",
              name: "14 Labs",
              url: "https://14labs.co",
            },
            publisher: {
              "@type": "Organization",
              name: "14 Labs",
              logo: {
                "@type": "ImageObject",
                url: "https://14labs.co/logo-primary.png",
              },
            },
            datePublished: "2024-01-01",
            dateModified: "2024-01-01",
          }),
        }}
      />
      </main>
    </>
  );
}
