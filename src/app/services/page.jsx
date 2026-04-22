"use client";

import CallSection from "@/components/general/CallSection";
import { getServices } from "@/services/dataService";
import { Box, Typography, Grid, Chip, Divider } from "@mui/material";
import { SECTION_PX, SECTION_PY, CARD_RADIUS } from "@/theme/tokens";

const services = getServices();

function Services() {
    return (
        <Box>
            <Box sx={{
                background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)",
                px: SECTION_PX,
                py: SECTION_PY,
            }}>
                <Typography variant="h2" sx={{ color: "text.primary" }}>
                    Serious expertise &{" "}
                    <Box component="span" sx={{ color: "text.secondary" }}>
                        Real results
                    </Box>
                </Typography>

                <Typography variant="body1" sx={{ py: 2, maxWidth: 580 }} color="text.primary">
                    We keep our word, align seamlessly with your teams, and deliver outcomes that matter. Integrating the now. Inventing the next.
                </Typography>
            </Box>

            <Box sx={{ px: SECTION_PX, py: SECTION_PY }}>
                <Grid container spacing={3}>
                    {services.map((s) => (
                        <Grid size={{ xs: 12, md: 6 }} key={s.sNo} sx={{ display: "flex" }}>
                            <Box sx={{
                                p: { xs: 3, md: 4 },
                                borderRadius: CARD_RADIUS,
                                backgroundColor: "background.paper",
                                border: 1,
                                borderColor: "divider",
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                            }}>
                                <Box>
                                    <Typography variant="caption" color="text.grey" sx={{ display: "block", pb: 0.5 }}>
                                        {s.sNo}
                                    </Typography>
                                    <Divider />
                                </Box>

                                <Typography variant="h3">
                                    {s.title}
                                </Typography>

                                <Typography variant="body2" color="text.grey">
                                    {s.desc}
                                </Typography>

                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                                    {s.tags.map((tag) => (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            size="small"
                                            sx={{ px: 1.5 }}
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
