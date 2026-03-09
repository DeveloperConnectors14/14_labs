import CallSection from "@/components/general/CallSection";
import CaseStudies from "@/components/home/CaseStudies";

function CaseStudiesPage() {

    return (
        <>
            <CaseStudies />
            <CallSection contact={true} />
        </>
    )
}

export default CaseStudiesPage;