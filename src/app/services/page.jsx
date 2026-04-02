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
        desc: "Seamlessly integrate AI capabilities into your existing systems. Enhance today's operations and drive tomorrow's breakthroughs with intelligent automation",
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

            <Box sx={{
                background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)",
                px: { xs: 4, md: 8 },
                py: { xs: 6, md: 10 },
            }}>
                <Typography
                    fontWeight={600}
                    sx={{
                        fontSize: { xs: "26px", sm: "32px", md: "40px" },
                        fontStyle: "SemiBold",
                        fontFamily: "'Instrument Sans', sans-serif",
                    }}
                >
                    Serious expertise &{" "}
                    <Box component="span" sx={{ color: "text.secondary" }}>
                        Real results
                    </Box>
                </Typography>

                <Typography sx={{
                    py: 2,
                    maxWidth: 580,
                    fontSize: { xs: "16px", sm: "17px", md: "18px" },
                    fontFamily: "'Instrument Sans', sans-serif",
                }}>
                    We keep our word, align seamlessly with your teams, and deliver outcomes that matter. Integrating the now. Inventing the next.
                </Typography>
            </Box>

            <Box sx={{ px: { xs: 4, md: 8 }, py: { xs: 6, md: 8 } }} >
                <Grid container spacing={3}>
                    {services.map((s) => (
                        <Grid size={{ xs: 12, md: 6 }} key={s.number} sx={{ display: "flex" }}>
                            <Box sx={{
                                p: 4,
                                borderRadius: 4,
                                backgroundColor: "background.paper",
                                border: 1,
                                borderColor: "divider",
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}>
                                <Typography sx={{
                                    fontSize: { xs: "14px", sm: "15px", md: "16px" },
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    color: "text.grey",
                                }}>
                                    {s.number}
                                </Typography>

                                <Typography sx={{
                                    fontSize: { xs: "20px", sm: "22px", md: "24px" },
                                    fontWeight: 600,
                                    fontFamily: "'Instrument Sans', sans-serif",
                                }}>
                                    {s.title}
                                </Typography>

                                <Typography sx={{
                                    fontSize: { xs: "14px", sm: "15px", md: "16px" },
                                    fontFamily: "'Instrument Sans', sans-serif",
                                    color: "text.grey",
                                }}>
                                    {s.desc}
                                </Typography>

                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                    {s.tags.map((tag) => (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            size="small"
                                            sx={{
                                                fontSize: { xs: "12px", sm: "13px", md: "14px" },
                                                fontFamily: "'Instrument Sans', sans-serif",
                                            }}
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