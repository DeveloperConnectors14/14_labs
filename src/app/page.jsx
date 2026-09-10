import Hero from "@/components/home/Hero";
import Capabilities from "@/components/home/Capabilities";
import Numbers from "@/components/home/Numbers";
import Stalls from "@/components/home/Stalls";
import ResearchFeature from "@/components/home/ResearchFeature";
import SelectedWork from "@/components/home/SelectedWork";
import Principles from "@/components/home/Principles";
import CallSection from "@/components/general/CallSection";

/**
 * Read top to bottom: what we are, what we build, how much of it is real,
 * where projects like yours go wrong, what we have written about it, what we
 * have shipped, how we behave — and one way in, at the end.
 *
 * Eight sections, each with one job. The previous page ran thirteen, and the
 * repetition was most of why it read as busy.
 */
function Home() {
  return (
    <>
      <Hero />
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
