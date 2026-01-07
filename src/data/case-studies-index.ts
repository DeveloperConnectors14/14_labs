export interface CaseStudyCard {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  industry: string;
  timeline: string;
  teamSize: string;
  metrics: {
    label: string;
    value: string;
  }[];
  technologies: string[];
  imageUrl?: string;
  href: string;
  featured?: boolean;
  color: {
    primary: string;
    secondary: string;
  };
}

export const caseStudies: CaseStudyCard[] = [
  {
    id: "find-sites-workflow",
    title: "AI Find Sites Real Estate Solution",
    shortDescription: "AI-driven commercial real estate site discovery with automated research and quality assurance",
    description:
      "Automate hours of manual commercial real estate research with an intelligent 11-node pipeline that discovers properties, extracts data, verifies accuracy, and enriches location information.",
    industry: "Real Estate",
    timeline: "1 Month",
    teamSize: "3",
    metrics: [
      { label: "Pipeline Nodes", value: "11" },
      { label: "Data Quality", value: "100%" },
      { label: "Scalability", value: "∞" },
      { label: "Research Reduction", value: "6-8h → min" },
    ],
    technologies: [
      "Python",
      "Flask",
      "CrewAI",
      "OpenAI GPT-4",
      "Supabase",
      "PostgreSQL",
    ],
    href: "/case-studies/find-sites-workflow",
    featured: true,
    color: {
      primary: "#60a5fa",
      secondary: "#3b82f6",
    },
  },
  {
    id: "ai-admission-counselor",
    title: "AI Admission Counselor",
    shortDescription: "Multi-agent AI system for university admissions research and student guidance",
    description:
      "A sophisticated multi-agent AI system that reduces university admissions research time by 70-80%. Equipped with specialized agents for program discovery, scholarship hunting, and personalized guidance.",
    industry: "EdTech",
    timeline: "4 Months",
    teamSize: "5",
    metrics: [
      { label: "Research Time Saved", value: "70-80%" },
      { label: "Agents", value: "4" },
      { label: "Universities", value: "5K+" },
      { label: "Uptime", value: "99.9%" },
    ],
    technologies: [
      "Python",
      "CrewAI",
      "OpenAI GPT-4",
      "FastAPI",
      "PostgreSQL",
      "TypeScript",
    ],
    href: "/case-studies/ai-admission-counselor",
    featured: false,
    color: {
      primary: "#8b5cf6",
      secondary: "#7c3aed",
    },
  },
];
