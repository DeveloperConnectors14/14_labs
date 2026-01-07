import { Metadata } from "next";
import CaseStudyHero from "@/components/case-studies/CaseStudyHero";
import CaseStudyOverview from "@/components/case-studies/CaseStudyOverview";
import FindSitesProblemStatement from "@/components/case-studies/FindSitesProblemStatement";
import FindSitesSolutionApproach from "@/components/case-studies/FindSitesSolutionApproach";
import PipelineFlowDiagram from "@/components/case-studies/PipelineFlowDiagram";
import FindSitesKeyFeatures from "@/components/case-studies/FindSitesKeyFeatures";
import TechStackSection from "@/components/case-studies/TechStackSection";
import CaseStudyCTA from "@/components/case-studies/CaseStudyCTA";

import {
  heroData,
  overviewStats,
  pipelineNodes,
  technologies,
  techHighlights,
} from "@/data/case-studies/find-sites-workflow";

export const metadata: Metadata = {
  title: "AI Find Sites Real Estate Solution Case Study | 14 Labs",
  description:
    "AI-driven commercial real estate site discovery with automated research, geocoding, attribute analysis, and quality assurance. 11-node pipeline reducing research time from hours to minutes.",
  keywords: [
    "AI case study",
    "PropTech",
    "commercial real estate",
    "site discovery",
    "AI workflow",
    "property research automation",
    "CRE technology",
    "real estate AI",
  ],
  openGraph: {
    title: "AI Find Sites Real Estate Solution - 14 Labs Case Study",
    description:
      "11-node AI pipeline automating CRE site research with deep web analysis, geocoding, and multi-stage QA",
    url: "https://14labs.co/case-studies/find-sites-workflow",
    type: "article",
    images: [
      {
        url: "/og-find-sites.png",
        width: 1200,
        height: 630,
        alt: "Find Sites Workflow Pipeline Architecture",
      },
    ],
  },
};

export default function FindSitesWorkflowCaseStudy() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Hero Section */}
      <CaseStudyHero data={heroData} />

      {/* Overview Statistics */}
      <CaseStudyOverview stats={overviewStats} />

      {/* Problem Statement */}
      <FindSitesProblemStatement />

      {/* Solution Approach */}
      <FindSitesSolutionApproach />

      {/* Interactive Pipeline Diagram */}
      <PipelineFlowDiagram
        nodes={pipelineNodes}
        title="Intelligent Pipeline Architecture"
        subtitle="Click on any node to explore its role and data flow"
      />

      {/* Key Features */}
      <FindSitesKeyFeatures />

      {/* Technology Stack */}
      <TechStackSection technologies={technologies} highlights={techHighlights} />

      {/* Call to Action */}
      <CaseStudyCTA />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            headline: "AI Find Sites Real Estate Solution - AI-Driven CRE Site Discovery",
            description:
              "11-node AI pipeline automating commercial real estate site research with automated deep research, geocoding, and quality assurance",
            image: "/og-find-sites.png",
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
  );
}
