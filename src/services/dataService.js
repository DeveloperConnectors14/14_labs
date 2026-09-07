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
import { research } from "@/data/research";

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

/** Newest first, so callers never have to remember to sort. */
export const getResearch = () =>
  [...research].sort((a, b) => b.date.localeCompare(a.date));

export const getResearchPost = (slug) =>
  research.find((post) => post.slug === slug) ?? null;
