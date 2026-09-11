import {
  caseDetails,
  caseStudies,
  challanges,
  features,
  navItems,
  pillars,
  pricing,
  services,
  site,
  stats,
  team,
  tools,
  values,
} from "@/data/data";
import { publications, publicationSources, publicationStatuses } from "@/data/publications";

export const getNavItems = () => navItems;
export const getSite = () => site;
export const getcaseStudies = () => caseStudies;
export const getChallanges = () => challanges;
export const getStats = () => stats;
export const getPricing = () => pricing;
export const getServices = () => services;
export const getTools = () => tools;
export const getFeatures = () => features;
export const getCaseDetails = () => caseDetails;
export const getPillars = () => pillars;
export const getValues = () => values;
export const getTeam = () => team;

/** Papers grouped by status, in the order the statuses are listed. */
export const getPublications = () => ({
  sources: publicationSources,
  groups: publicationStatuses.map((status) => ({
    status,
    papers: publications.filter((paper) => paper.status === status),
  })),
});

/** Published papers with a page of their own, newest first. */
export const getPublishedPapers = () =>
  publications
    .filter((paper) => paper.slug)
    .sort((a, b) => b.date.localeCompare(a.date));

export const getPublication = (slug) =>
  publications.find((paper) => paper.slug && paper.slug === slug) ?? null;

/** How many papers sit at each status. */
export const getPublicationCounts = () => {
  const count = (status) => publications.filter((paper) => paper.status === status).length;
  return {
    published: count("Published"),
    underReview: count("Under review"),
    inProgress: count("Work in progress"),
  };
};
