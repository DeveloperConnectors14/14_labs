import CallSection from "@/components/general/CallSection";
import { getAbout, getContactInfo, getValues } from "@/services/dataService";
import { Box, Typography, Grid } from "@mui/material";
import { SECTION_PX, SECTION_PY, CARD_RADIUS, SOFT_GRADIENT } from "@/theme/tokens";

export const metadata = {
    title: "About",
    description: "14Labs, Lahore, Pakistan: original, rigorous machine learning research turned into solutions that work and benefit people.",
};

const about = getAbout();
const contactInfo = getContactInfo();
const values = getValues();

const cardSx = {
    height: "100%",
    p: { xs: 2.5, md: 3 },
    borderRadius: CARD_RADIUS,
    border: 1,
    borderColor: "divider",
    backgroundColor: "background.paper",
};

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
                {/* The vision statement is the page headline, with its last words highlighted. */}
                <Typography variant="h1" component="h1" sx={{ color: "text.primary", maxWidth: 900 }}>
                    {about.vision.replace(/humanity's real problems\.$/, "")}
                    <Box component="span" sx={{ color: "text.secondary" }}>
                        humanity&apos;s real problems
                    </Box>
                </Typography>

                <Typography variant="body1" sx={{ pt: 3, maxWidth: 760 }} color="text.primary">
                    14Labs is an AI engineering, applied machine learning and research company based in {contactInfo.location}. We publish peer-reviewed research and turn it into production AI systems for companies and research partners.
                </Typography>
            </Box>

            <Box component="section" sx={{ px: SECTION_PX, py: SECTION_PY }}>
                <Box sx={cardSx}>
                    <Typography variant="caption" sx={{ display: "block", color: "text.grey", textTransform: "uppercase", mb: 2 }}>
                        Our mission
                    </Typography>
                    <Typography variant="h3" sx={{ color: "text.black", fontWeight: 500, maxWidth: 1000 }}>
                        {about.mission}
                    </Typography>
                </Box>
            </Box>

            <Box component="section" sx={{ px: SECTION_PX, py: SECTION_PY }}>
                <Grid container spacing={6}>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Typography variant="h2" sx={{ color: "text.primary" }}>
                            Our{" "}
                            <Box component="span" sx={{ color: "text.secondary" }}>
                                values
                            </Box>
                        </Typography>

                        <Typography variant="body1" sx={{ py: 2 }} color="text.primary">
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
                                        <Typography variant="h3">
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
