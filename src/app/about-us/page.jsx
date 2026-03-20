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
                    px: { xs: 3, md: 8 },
                    py: { xs: 6, md: 10 },
                }}
            >
                <Grid container spacing={4} alignItems="center">
                    <Grid size={{ xs: 12, md: 12 }}>
                        <Typography variant="h3" fontWeight={700} color="text.primary" gutterBottom>
                            Designing{" "}
                            <Box component="span" sx={{ color: "text.secondary" }}>
                                Intelligent Solutions
                            </Box>
                        </Typography>

                        <Typography color="text.primary" sx={{ lineHeight: 1.8, mb: 2 }}>
                            14 Labs is an AI-first technology company dedicated to transforming
                            businesses through intelligent automation and cutting-edge AI solutions.
                            We combine deep AI expertise with practical engineering to deliver
                            systems that drive real business value.
                        </Typography>

                        <Typography color="text.primary" sx={{ lineHeight: 1.8 }}>
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
                                        fontSize: "0.85rem",
                                    }}
                                >
                                    {p}
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ px: { xs: 3, md: 8 }, py: { xs: 6, md: 8 }, backgroundColor: "background.default" }}>
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
                                    boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
                                }}
                            >
                                <Typography variant="h3" fontWeight={700} sx={{ color: "primary.main" }}>
                                    {s.value}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    {s.label}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <Box sx={{ px: { xs: 3, md: 8 }, py: { xs: 6, md: 8 } }}>
                <Grid container spacing={6} alignItems="flex-start">
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Typography variant="h4" fontWeight={700} color="text.primary" gutterBottom>
                            Who{" "}
                            <Box component="span" sx={{ color: "text.secondary" }}>
                                We Are
                            </Box>
                        </Typography>
                        <Typography color="text.primary" sx={{ lineHeight: 1.8 }}>
                            We are a team of AI engineers, researchers, and product builders
                            passionate about solving hard problems. Our work spans industries —
                            from real estate and healthcare to finance and logistics — delivering
                            AI systems that create measurable business outcomes.
                        </Typography>
                        <Typography color="text.primary" sx={{ lineHeight: 1.8, mt: 2 }}>
                            We partner closely with our clients, embedding ourselves in their
                            workflows to truly understand the challenge before building the solution.
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }}>
                        <Grid container spacing={2}>
                            {values.map((v) => (
                                <Grid size={{ xs: 12 }} key={v.title}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "flex-start",
                                            gap: 2.5,
                                            p: 3,
                                            borderRadius: 4,
                                            border: 1,
                                            borderColor: "divider",
                                            backgroundColor: "background.paper",
                                            transition: "0.3s",
                                            "&:hover": {
                                                boxShadow: 4,
                                                transform: "translateY(-4px)",
                                            },
                                        }}
                                    >
                                        <Box>
                                            <Typography fontWeight={600} color="text.primary" gutterBottom>
                                                {v.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.grey" sx={{ lineHeight: 1.7 }}>
                                                {v.desc}
                                            </Typography>
                                        </Box>
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
