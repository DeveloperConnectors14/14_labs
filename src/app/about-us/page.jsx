"use client";

import CallSection from "@/components/general/CallSection";
import { getPillars, getStats, getValues } from "@/services/dataService";
import { Box, Typography, Grid } from "@mui/material";
import { SECTION_PX, SECTION_PY, CARD_RADIUS, BUTTON_RADIUS } from "@/theme/tokens";

const stats = getStats();
const pillars = getPillars();
const values = getValues();

function AboutUs() {
    return (
        <Box>
            <Box
                sx={{
                    background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)",
                    px: SECTION_PX,
                    py: SECTION_PY,
                }}
            >
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12 }}>
                        <Typography variant="h2" sx={{ color: "text.primary" }}>
                            Designing{" "}
                            <Box component="span" sx={{ color: "text.secondary" }}>
                                Intelligent Solutions
                            </Box>
                        </Typography>

                        <Typography variant="body1" sx={{ py: 2 }} color="text.primary">
                            14 Labs is an AI-first technology company dedicated to transforming businesses through intelligent automation and cutting-edge AI solutions. We combine deep AI expertise with practical engineering to deliver systems that drive real business value.
                        </Typography>

                        <Typography variant="body1" color="text.primary">
                            From multi-agent systems to custom LLM integrations, we specialize in building AI infrastructure that scales. We believe in genuine support, seamless team alignment, and delivering outcomes that matter.
                        </Typography>

                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 4 }}>
                            {pillars.map((p) => (
                                <Box
                                    key={p}
                                    sx={{
                                        px: 2.5,
                                        py: 1,
                                        borderRadius: BUTTON_RADIUS,
                                        backgroundColor: "primary.contrastText",
                                        color: "text.primary",
                                        fontSize: { xs: "12px", sm: "13px", md: "14px" },
                                        fontFamily: "'Instrument Sans', sans-serif",
                                    }}
                                >
                                    {p}
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ px: SECTION_PX, py: SECTION_PY }}>
                <Grid container spacing={3}>
                    {stats.map((s) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={s.label}>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 2.5,
                                    p: 2,
                                    borderRadius: CARD_RADIUS,
                                    border: 1,
                                    borderColor: "divider",
                                    backgroundColor: "background.paper",
                                    transition: "0.3s",
                                }}
                            >
                                <Box>
                                    <Typography
                                        sx={{
                                            lineHeight: 1,
                                            mb: 3,
                                            fontWeight: 700,
                                            fontSize: { xs: "48px", sm: "64px", md: "88px" },
                                            color: "text.primary",
                                            fontFamily: "'Instrument Sans', sans-serif",
                                        }}
                                    >
                                        {s.value}
                                    </Typography>
                                    <Typography variant="h3" sx={{ color: "text.black" }}>
                                        {s.label}
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ px: SECTION_PX, py: SECTION_PY }}>
                <Grid container spacing={6}>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Typography variant="h2" sx={{ color: "text.primary" }}>
                            Who{" "}
                            <Box component="span" sx={{ color: "text.secondary" }}>
                                We Are
                            </Box>
                        </Typography>

                        <Typography variant="body1" sx={{ py: 2 }} color="text.primary">
                            We are a team of AI engineers, researchers, and product builders...
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }}>
                        <Grid container spacing={2}>
                            {values.map((v) => (
                                <Grid size={{ xs: 12 }} key={v.title}>
                                    <Box sx={{
                                        p: { xs: 2, sm: 2.5, md: 3 },
                                        borderRadius: CARD_RADIUS,
                                        border: 1,
                                        borderColor: "divider",
                                        backgroundColor: "background.paper",
                                    }}>
                                        <Typography variant="h3">
                                            {v.title}
                                        </Typography>

                                        <Typography variant="body2" color="text.grey" sx={{ py: 1 }}>
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
