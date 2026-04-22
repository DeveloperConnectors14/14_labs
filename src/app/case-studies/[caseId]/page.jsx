"use client";

import { notFound } from "next/navigation";
import CallSection from "@/components/general/CallSection";
import MoreCaseStudies from "@/components/singleCase/MoreCaseStudies";
import RealCostDetails from "@/components/singleCase/RealCostDetails";
import SingleCaseApproach from "@/components/singleCase/SingleCaseApproach";
import SingleCaseArchitechture from "@/components/singleCase/SingleCaseArchitechture";
import SingleCaseChallanges from "@/components/singleCase/SingleCaseChallanges";
import SingleCaseHero from "@/components/singleCase/SingleCaseHero";
import SingleCasePipeline from "@/components/singleCase/SingleCasePipeline";
import SingleCaseResults from "@/components/singleCase/SingleCaseResults";
import SingleKeyFeatures from "@/components/singleCase/SingleKeyFeatures";
import SingleTopFeatures from "@/components/singleCase/SingleTopFeatures";
import TechnologyStack from "@/components/singleCase/TechnologyStack";
import React from "react";
import { getCaseDetails } from "@/services/dataService";


const caseDetails = getCaseDetails();

function SingleCasePage({ params }) {
  const searchParams = React.use(params);
  const data = caseDetails.find(item => item.caseId === searchParams.caseId);
  if (!data) return notFound();

  return (
    <>
      <SingleCaseHero heroData={data.hero} />
      <SingleCaseChallanges challanges={data.challenges} />
      {data.cost && <RealCostDetails costData={data.cost} />}
      <SingleCaseApproach approaches={data.approach} />
      <SingleCaseArchitechture architectureData={data.architecture_highlights} />
      <SingleCasePipeline casePipeline={data.pipeline} />
      <SingleKeyFeatures keyFeatures={data.key_features} />
      <TechnologyStack technologies={data.techStack} />
      <SingleTopFeatures topFeatures={data.top_features} />
      {data.results && <SingleCaseResults results={data.results} />}
      <CallSection contact={true} />
      <MoreCaseStudies moreCases={data.more_cases} />
    </>
  )
}

export default SingleCasePage;
