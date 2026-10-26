import {
  about,
  caseDetails,
  caseStudies,
  collaborators,
  contactInfo,
  footerColumns,
  heroSlides,
  navItems,
  otherTeamAuthors,
  researchAreas,
  services,
  socialLinks,
  team,
  values,
} from "@/data/data";
import { publications } from "@/data/publications";

// Research figures are derived from the publication list so they can't drift
// out of sync with the papers shown on the site.
const countByStatus = (status) => publications.filter((p) => p.status === status).length;

const stats = [
  { value: countByStatus("published"), label: "Peer-reviewed publications" },
  { value: countByStatus("review"), label: "Papers under review" },
  { value: researchAreas.length, label: "Research areas" },
];

export const getNavItems = () => navItems;
export const getcaseStudies = () => caseStudies;
export const getStats = () => stats;
export const getServices = () => services;
export const getCaseDetails = () => caseDetails;
export const getAbout = () => about;
export const getValues = () => values;
export const getPublications = () => publications;
export const getResearchAreas = () => researchAreas;
export const getTeam = () => team;
export const getHeroSlides = () => heroSlides;
export const getCollaborators = () => collaborators;
export const getContactInfo = () => contactInfo;
export const getSocialLinks = () => socialLinks;
export const getFooterColumns = () => footerColumns;

export const getPublication = (id) => publications.find((p) => p.id === id);

// Same research topic first, then everything else, keeping the list's order
// (published newest first, then under review). Omit `count` to get all of them.
export const getRelatedPublications = (id, count) => {
  const paper = getPublication(id);
  const others = publications.filter((p) => p.id !== id);
  const sameTopic = others.filter((p) => p.topic === paper?.topic);
  return [...sameTopic, ...others.filter((p) => p.topic !== paper?.topic)].slice(0, count);
};

export const getResearchArea = (topic) => researchAreas.find((area) => area.topics.includes(topic));

const teamAuthorNames = new Set([...team.flatMap((m) => m.aliases ?? [m.name]), ...otherTeamAuthors]);
export const isTeamAuthor = (name) => teamAuthorNames.has(name);

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// "2026-03-13" -> "13 Mar 2026", "2025-12" -> "Dec 2025"
export const formatPublishedDate = (iso) => {
  const [year, month, day] = iso.split("-").map(Number);
  return [day, MONTHS[month - 1], year].filter(Boolean).join(" ");
};

// Authors (year). Title. Journal, volume(issue), pages. https://doi.org/...
export const formatCitation = (paper) => {
  const volume = paper.issue ? `${paper.volume}(${paper.issue})` : paper.volume;
  return `${paper.authors.join(", ")} (${paper.year}). ${paper.title}. ${paper.venue}, ${volume}, ${paper.pages}. https://doi.org/${paper.doi}`;
};

// Pages whose top is the dark full-width gradient header; the navbar is
// transparent over them.
export const hasDarkHero = (pathname) => pathname === "/" || pathname.startsWith("/research/");

// Hover-panel contents for the navbar (see `menu` in navItems). Built from the
// existing data, so new papers and case studies appear automatically.
const latestPapers = publications
  .filter((p) => p.status === "published" && p.published)
  .sort((a, b) => b.published.localeCompare(a.published))
  .slice(0, 3);

const navMenus = {
  research: {
    columns: [
      {
        title: "Focus areas",
        links: researchAreas.map((area) => ({ label: area.title, href: `/#focus-${area.topics[0]}`, icon: area.icon, plain: true })),
      },
      {
        title: "Latest papers",
        links: latestPapers.map((p) => ({ label: p.shortTitle, meta: formatPublishedDate(p.published), href: `/research/${p.id}` })),
      },
    ],
    footer: { label: "All research", href: "/#research" },
  },
};

export const getNavMenus = () => navMenus;

