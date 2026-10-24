import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import CaseStudies from "@/components/home/CaseStudies";
import CallSection from "@/components/general/CallSection";
import ResearchSection from "@/components/research/ResearchSection";
import ResearchAreas from "@/components/research/ResearchAreas";

function Home() {
  return (
    <>
      <HeroSection />
      <ResearchSection />
      <ResearchAreas />
      <ServicesSection />
      <CaseStudies />
      <CallSection contact={true} />
    </>
  );
}

export default Home;
