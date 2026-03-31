"use client";

import CallSection from "@/components/general/CallSection";
import { Box, Typography, Grid } from "@mui/material";

const stats = [
    { value: "15+", label: "Projects Delivered" },
    { value: "10+", label: "Happy Clients" },
    { value: "4+", label: "Years Experience" },
    { value: "95%", label: "Client Satisfaction" },
];

const pillars = ["AI-First", "Enterprise Scale", "Transparency", "Real Results"];

const values = [
    {
        title: "Deep AI Expertise",
        desc: "From multi-agent architectures to fine-tuned LLMs, our team brings cutting-edge knowledge to every engagement.",
    },
    {
        title: "Practical Engineering",
        desc: "We don't just design systems — we build and ship them. Every solution is engineered for reliability and real-world performance.",
    },
    {
        title: "Genuine Partnership",
        desc: "We align seamlessly with your teams, keep our word, and stay invested in your outcomes long after delivery.",
    },
];

function AboutUs() {
    return (
        <Box>

            <Box
                sx={{
                    background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)",
                    px: { xs: 4, md: 8 },
                    py: { xs: 6, md: 10 },
                }}
            >
                <Grid container spacing={4}>
                    <Grid size={{ xs: 12 }}>
                        <Typography
                            fontWeight={600}
                            sx={{
                                fontSize: { xs: "26px", sm: "32px", md: "40px" },
                                fontStyle: "SemiBold",
                                fontFamily: "'Instrument Sans', sans-serif",
                                color: "text.primary",
                            }}
                        >
                            Designing{" "}
                            <Box component="span" sx={{ color: "text.secondary" }}>
                                Intelligent Solutions
                            </Box>
                        </Typography>

                        <Typography
                            sx={{
                                py: 2,
                                fontSize: { xs: "16px", sm: "17px", md: "18px" },
                                fontWeight: 400,
                                fontStyle: "Regular",
                                fontFamily: "'Instrument Sans', sans-serif",
                                color: "text.primary",
                            }}
                        >
                            14 Labs is an AI-first technology company dedicated to transforming
                            businesses through intelligent automation and cutting-edge AI solutions.
                            We combine deep AI expertise with practical engineering to deliver
                            systems that drive real business value.
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: { xs: "16px", sm: "17px", md: "18px" },
                                fontWeight: 400,
                                fontStyle: "Regular",
                                fontFamily: "'Instrument Sans', sans-serif",
                                color: "text.primary",
                            }}
                        >
                            From multi-agent systems to custom LLM integrations, we specialize in
                            building AI infrastructure that scales. We believe in genuine support,
                            seamless team alignment, and delivering outcomes that matter.
                        </Typography>

                        {/* Pillars */}
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1.5, mt: 4 }}>
                            {pillars.map((p) => (
                                <Box
                                    key={p}
                                    sx={{
                                        px: 2.5,
                                        py: 1,
                                        borderRadius: 7,
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

            <Box sx={{ px: { xs: 4, md: 8 }, py: { xs: 6, md: 8 } }}>
                <Grid container spacing={3}>
                    {stats.map((s) => (
                        <Grid size={{ xs: 6, md: 3 }} key={s.label}>
                            <Box
                                sx={{
                                    textAlign: "center",
                                    p: 3,
                                    borderRadius: 4,
                                    backgroundColor: "background.paper",
                                    border: 1,
                                    borderColor: "divider",
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: { xs: "26px", sm: "32px", md: "36px" },
                                        fontWeight: 700,
                                        fontFamily: "'Instrument Sans', sans-serif",
                                        color: "primary.main",
                                    }}
                                >
                                    {s.value}
                                </Typography>

                                <Typography
                                    sx={{
                                        mt: 1,
                                        fontSize: { xs: "14px", sm: "15px", md: "16px" },
                                        fontWeight: 400,
                                        fontStyle: "Regular",
                                        fontFamily: "'Instrument Sans', sans-serif",
                                        color: "text.secondary",
                                    }}
                                >
                                    {s.label}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ px: { xs: 4, md: 8 }, py: { xs: 6, md: 8 } }}>
                <Grid container spacing={6}>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Typography
                            fontWeight={600}
                            sx={{
                                fontSize: { xs: "26px", sm: "32px", md: "40px" },
                                fontStyle: "SemiBold",
                                fontFamily: "'Instrument Sans', sans-serif",
                            }}
                        >
                            Who{" "}
                            <Box component="span" sx={{ color: "text.secondary" }}>
                                We Are
                            </Box>
                        </Typography>

                        <Typography sx={{
                            py: 2,
                            fontSize: { xs: "16px", sm: "17px", md: "18px" },
                            fontFamily: "'Instrument Sans', sans-serif",
                        }}>
                            We are a team of AI engineers, researchers, and product builders...
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }}>
                        <Grid container spacing={2}>
                            {values.map((v) => (
                                <Grid size={{ xs: 12 }} key={v.title}>
                                    <Box sx={{
                                        p: 3,
                                        borderRadius: 4,
                                        border: 1,
                                        borderColor: "divider",
                                        backgroundColor: "background.paper",
                                    }}>
                                        <Typography sx={{
                                            fontSize: { xs: "18px", sm: "20px", md: "22px" },
                                            fontWeight: 600,
                                            fontFamily: "'Instrument Sans', sans-serif",
                                        }}>
                                            {v.title}
                                        </Typography>

                                        <Typography sx={{
                                            py: 1,
                                            fontSize: { xs: "14px", sm: "15px", md: "16px" },
                                            fontFamily: "'Instrument Sans', sans-serif",
                                            color: "text.grey",
                                        }}>
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