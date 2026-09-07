import { Box } from "@mui/material";
import HeroSection from "@/components/home/HeroSection";
import PracticeIndex from "@/components/home/PracticeIndex";
import ImpactSection from "@/components/home/ImpactSection";
import ChallengesSection from "@/components/home/ChallengesSection";
import ServicesSection from "@/components/home/ServicesSection";
import LoadSequence from "@/components/home/LoadSequence";
import ResearchPreview from "@/components/home/ResearchPreview";
import CaseStudies from "@/components/home/CaseStudies";
import LabTeam from "@/components/home/LabTeam";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ToolsSection from "@/components/home/ToolsSection";
import PricingSection from "@/components/home/PricingSection";
import CallSection from "@/components/general/CallSection";
import { color } from "@/theme/tokens";

/**
 * Section order is an argument, read top to bottom: here is the problem, here
 * is how we work on it, here is what we have written about it, here is what we
 * shipped, here is who does it. Research sits above the commercial sections
 * deliberately.
 *
 * There is exactly one call to action, at the end. The old page ran the same
 * gradient CTA band twice.
 *
 * The wrapper below is load-bearing, not layout sugar. The hero is pinned to the
 * viewport and blurs as you scroll (DefocusOnScroll); everything after it has to
 * ride over the top on an opaque ground, or the pinned hero shows through the
 * seams between bands. Its own background is the fallback for exactly those
 * seams — every child band paints its own on top.
 */
function Home() {
  return (
    <>
      <HeroSection />

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          backgroundColor: color.ground,
        }}
      >
        <PracticeIndex />
        <ImpactSection />
        <ChallengesSection />
        <ServicesSection />
        <LoadSequence />
        <ResearchPreview />
        <CaseStudies />
        <LabTeam />
        <WhyChooseUs />
        <ToolsSection />
        <PricingSection />
        <CallSection contact />
      </Box>
    </>
  );
}

export default Home;
