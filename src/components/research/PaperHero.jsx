import GradientHero from "@/components/general/GradientHero";
import { getResearchArea } from "@/services/dataService";

function PaperHero({ paper }) {
  const area = getResearchArea(paper.topic);
  const caption = [
    paper.status === "published" ? `Published · ${paper.year}` : "Under review",
    area?.title,
  ].filter(Boolean).join(" · ");

  // The page header has its own optional image (`heroImg`, wide landscape), separate
  // from the card image; without one it shows the brand gradient.
  return <GradientHero caption={caption} title={paper.title} image={paper.heroImg && `/media/${paper.heroImg}`} />;
}

export default PaperHero;
