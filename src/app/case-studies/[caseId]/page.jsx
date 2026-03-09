"use client";


import CallSection from "@/components/general/CallSection";
import MoreCaseStudies from "@/components/singleCase/MoreCaseStudies";
import RealCostDetails from "@/components/singleCase/RealCostDetails";
import SingleCaseApproach from "@/components/singleCase/SingleCaseApproach";
import SingleCaseArchitechture from "@/components/singleCase/SingleCaseArchitechture";
import SingleCaseChallanges from "@/components/singleCase/SingleCaseChallanges";
import SingleCaseHero from "@/components/singleCase/SingleCaseHero";
import SingleCasePipeline from "@/components/singleCase/SingleCasePipeline";
import SingleKeyFeatures from "@/components/singleCase/SingleKeyFeatures";
import SingleTopFeatures from "@/components/singleCase/SingleTopFeatures";
import TechnologyStack from "@/components/singleCase/TechnologyStack";

function SingleCasePage() {


    return (
        <>
            <SingleCaseHero />
            <SingleCaseChallanges />
            <RealCostDetails />
            <SingleCaseApproach />
            <SingleCaseArchitechture />
            <SingleCasePipeline />
            <SingleKeyFeatures />
            <TechnologyStack />
            <SingleTopFeatures />
            <CallSection contact={true} />
            <MoreCaseStudies />
        </>
    )
}

export default SingleCasePage;