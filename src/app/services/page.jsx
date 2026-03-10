"use client";

import CallSection from "@/components/general/CallSection";
import { Box, Typography, Grid, Chip } from "@mui/material";

const services = [
    {
        number: "01",
        title: "Multi-Agent Systems",
        desc: "Development of multi-agent systems with built-in observability, enabling monitoring and optimizing specialized agents operating at enterprise scale.",
        tags: ["Agent Orchestration", "Built-in Observability", "Enterprise Scale", "Real-time Monitoring"],
    },
    {
        number: "02",
        title: "AI Integration",
        desc: "Seamlessly integrate AI capabilities into your existing systems. Enhance today's operations and drive tomorrow's breakthroughs with intelligent automation.",
        tags: ["LLM Integration", "Custom AI Models", "Process Automation", "Data Analytics"],
    },
    {
        number: "03",
        title: "Custom AI Solutions",
        desc: "Designing intelligent solutions for the future. We build custom AI models and applications tailored to your unique business challenges.",
        tags: ["RAG Systems", "Fine-tuned Models", "AI Chatbots", "Knowledge Bases"],
    },
    {
        number: "04",
        title: "Web & App Development",
        desc: "Modern, AI-enhanced websites and applications built with cutting-edge technologies. From intelligent platforms to seamless mobile experiences.",
        tags: ["React & Next.js", "Mobile Apps", "AI-Powered UX", "API Integration"],
    },
];

function Services() {
    return (
        <Box>
            <Box
                sx={{
                    background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)",
                    px: { xs: 3, md: 8 },
                    py: { xs: 6, md: 10 },
                }}
            >
                <Typography variant="h3" fontWeight={700} color="text.primary" gutterBottom>
                    Serious expertise.{" "}
                    <Box component="span" sx={{ color: "primary.main" }}>
                        Real results.
                    </Box>
                </Typography>
                <Typography color="text.secondary" sx={{ maxWidth: 580, lineHeight: 1.8 }}>
                    We keep our word, align seamlessly with your teams, and deliver outcomes
                    that matter. Integrating the now. Inventing the next.
                </Typography>
            </Box>

            <Box sx={{ px: { xs: 3, md: 8 }, py: { xs: 6, md: 8 }, backgroundColor: "background.default" }}>
                <Grid container spacing={3}>
                    {services.map((s, i) => (
                        <Grid size={{ xs: 12, md: 6 }} key={s.number}>
                            <Box
                                sx={{
                                    p: 4,
                                    borderRadius: 4,
                                    backgroundColor: "background.paper",
                                    border: 1,
                                    borderColor: "divider",
                                    height: "100%",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 2,
                                    transition: "0.3s",
                                    "&:hover": {
                                        boxShadow: 6,
                                        transform: "translateY(-6px)",
                                    },
                                }}
                            >
                                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography
                                        variant="h6"
                                        fontWeight={700}
                                        sx={{ color: "primary.main" }}
                                    >
                                        {s.number}
                                    </Typography>
                                </Box>

                                <Typography variant="h6" fontWeight={700} color="text.primary">
                                    {s.title}
                                </Typography>

                                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, flexGrow: 1 }}>
                                    {s.desc}
                                </Typography>

                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                                    {s.tags.map((tag) => (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            size="small"
                                            sx={{ fontSize: "0.75rem" }}
                                        />
                                    ))}
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            <CallSection contact={true} />


        </Box>
    );
}

export default Services;
