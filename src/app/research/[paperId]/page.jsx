import { notFound } from "next/navigation";
import CallSection from "@/components/general/CallSection";
import PaperHero from "@/components/research/PaperHero";
import PaperArticle from "@/components/research/PaperArticle";
import MorePapers from "@/components/research/MorePapers";
import { getPublication, getPublications, getRelatedPublications } from "@/services/dataService";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublications().map((paper) => ({ paperId: paper.id }));
}

export async function generateMetadata({ params }) {
  const { paperId } = await params;
  const paper = getPublication(paperId);
  if (!paper) return {};

  const description = paper.overview[0].length > 160 ? `${paper.overview[0].slice(0, 157)}…` : paper.overview[0];
  return {
    title: `${paper.shortTitle} · Research`,
    description,
    openGraph: {
      title: paper.title,
      description,
      ...(paper.img && { images: [`/media/${paper.img}`] }),
    },
  };
}

async function ResearchPaperPage({ params }) {
  const { paperId } = await params;
  const paper = getPublication(paperId);
  if (!paper) notFound();

  return (
    <>
      <PaperHero paper={paper} />
      <PaperArticle paper={paper} />
      <MorePapers papers={getRelatedPublications(paper.id)} />
      <CallSection contact={true} />
    </>
  );
}

export default ResearchPaperPage;
