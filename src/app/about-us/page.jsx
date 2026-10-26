import CallSection from "@/components/general/CallSection";
import { keepHyphenatedWords } from "@/components/general/ArticleParts";
import { getAbout, getValues } from "@/services/dataService";
import { Box, Typography, Grid } from "@mui/material";
import { SECTION_PX, SECTION_PY, CARD_RADIUS, SOFT_GRADIENT } from "@/theme/tokens";

export const metadata = {
    title: "About",
    description: "14Labs, Lahore, Pakistan: original, rigorous machine learning research turned into solutions that work and benefit people.",
};

const about = getAbout();
const values = getValues();

const cardSx = {
    height: "100%",
    p: { xs: 2.5, md: 3 },
    borderRadius: CARD_RADIUS,
    border: 1,
    borderColor: "divider",
    backgroundColor: "background.paper",
};

// Heading in the site's "Our <teal word>" style, used for each section's left column.
function SectionHeading({ word }) {
    return (
        <Typography variant="h2" sx={{ color: "text.primary" }}>
            Our{" "}
            <Box component="span" sx={{ color: "text.secondary" }}>
                {word}
            </Box>
        </Typography>
    );
}

function AboutUs() {
    return (
        <Box>
            <Box
                component="section"
                sx={{
                    background: SOFT_GRADIENT,
                    px: SECTION_PX,
                    py: SECTION_PY,
                }}
            >
                <Typography variant="caption" sx={{ display: "block", color: "text.secondary", letterSpacing: "0.08em", textTransform: "uppercase", mb: 2 }}>
                    Our vision
                </Typography>
                <Typography variant="h1" component="h1" sx={{ color: "text.primary", maxWidth: 900, textWrap: "balance" }}>
                    {about.vision}{" "}
                    <Box component="span" sx={{ color: "text.secondary" }}>
                        {about.visionHighlight}
                    </Box>
                </Typography>

                <Typography variant="body1" sx={{ pt: 3, maxWidth: 760 }} color="text.primary">
                    {about.intro}
                </Typography>
            </Box>

            {/* Mission and values share one layout: heading on the left, content on the right. */}
            <Box component="section" sx={{ px: SECTION_PX, pt: SECTION_PY }}>
                <Grid container spacing={{ xs: 2, md: 6 }}>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <SectionHeading word="mission" />
                    </Grid>
                    <Grid size={{ xs: 12, md: 7 }}>
                        <Typography variant="h3" component="p" sx={{ color: "text.primary", fontWeight: 500, pt: { md: 1 }, textWrap: "balance" }}>
                            {keepHyphenatedWords(about.mission)}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

            <Box component="section" sx={{ px: SECTION_PX, py: SECTION_PY }}>
                <Grid container spacing={{ xs: 3, md: 6 }} sx={{ borderTop: 1, borderColor: "divider", pt: { xs: 4, md: 6 } }}>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <SectionHeading word="values" />
                        <Typography variant="body1" sx={{ pt: 2 }} color="text.primary">
                            The principles behind which projects we take on and how we carry them out.
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }}>
                        <Grid container spacing={2}>
                            {values.map((v, i) => (
                                <Grid size={{ xs: 12, sm: 6 }} key={v.title}>
                                    <Box sx={cardSx}>
                                        <Typography variant="caption" sx={{ display: "block", color: "text.grey", mb: 1 }}>
                                            {String(i + 1).padStart(2, "0")}
                                        </Typography>
                                        <Typography variant="h3" sx={{ color: "text.primary" }}>
                                            {v.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.grey" sx={{ pt: 1 }}>
                                            {v.desc}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>

            <CallSection contact={true} />
        </Box>
    );
}

export default AboutUs;
