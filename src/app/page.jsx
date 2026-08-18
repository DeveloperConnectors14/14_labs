import HeroSection from "@/components/home/HeroSection";
import ChallengesSection from "@/components/home/ChallengesSection";
import ServicesSection from "@/components/home/ServicesSection";
import ToolsSection from "@/components/home/ToolsSection";
import ImpactSection from "@/components/home/ImpactSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CaseStudies from "@/components/home/CaseStudies";
import CallSection from "@/components/general/CallSection";
import PricingSection from "@/components/home/PricingSection";

function Home() {
  return (
    <>
      <HeroSection />
      <ChallengesSection />
      <ServicesSection />
      <CallSection contact={false} />
      <ToolsSection />
      <ImpactSection />
      <PricingSection />
      <WhyChooseUs />
      <CaseStudies />
      <CallSection contact={true} />
    </>
  );
}

export default Home;
