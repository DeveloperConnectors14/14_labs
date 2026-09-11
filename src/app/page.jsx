import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import Capabilities from "@/components/home/Capabilities";
import Numbers from "@/components/home/Numbers";
import Stalls from "@/components/home/Stalls";
import ResearchFeature from "@/components/home/ResearchFeature";
import SelectedWork from "@/components/home/SelectedWork";
import Principles from "@/components/home/Principles";
import CallSection from "@/components/general/CallSection";

/**
 * Read top to bottom: what we are, why that matters, what we build, how much
 * of it is real, where projects like yours go wrong, what we have written
 * about it, what we have shipped, how we behave — and one way in, at the end.
 *
 * Each section has one job and one moment of motion at most: the mark that
 * assembles, the statement that fills in as you read it, the row that drifts,
 * the cards that stack, the pictures that open, the ground that
 * rolls under the last card.
 */
function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <Capabilities />
      <Numbers />
      <Stalls />
      <ResearchFeature />
      <SelectedWork />
      <Principles />
      <CallSection contact />
    </>
  );
}

export default Home;
