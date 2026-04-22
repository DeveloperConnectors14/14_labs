"use client";

import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import { SECTION_PX, SECTION_PY, TILE_RADIUS } from "@/theme/tokens";

function TechnologyStack({ technologies }) {
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredTools =
        activeFilter === "All"
            ? technologies.stacks.flatMap((item) => item.values)
            : technologies.stacks
                .filter((item) => item.techType === activeFilter)
                .flatMap((item) => item.values);

    return (
        <Box sx={{ px: SECTION_PX, py: SECTION_PY }}>
            <Grid container spacing={2}>
                <Grid size={12}>
                    {technologies.label && (
                        <Typography variant="body1" sx={{ py: 1 }} color="text.primary">
                            {technologies.label}
                        </Typography>
                    )}
                    <Typography variant="h2" sx={{ color: "text.primary" }}>
                        {technologies.title ? (
                            technologies.title
                        ) : (
                            <>
                                Build with{" "}
                                <Box component="span" sx={{ color: "text.secondary" }}>
                                    technology stack
                                </Box>
                            </>
                        )}
                    </Typography>
                    <Typography variant="body1" sx={{ py: 1 }} color="text.primary">
                        {technologies.text}
                    </Typography>
                </Grid>

                <Grid size={12} sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 2,
                    pb: 2,
                }}>
                    {["All", ...technologies.stacks.map((s) => s.techType)].map((label) => {
                        const isActive = activeFilter === label;
                        return (
                            <Button
                                key={label}
                                variant="contained"
                                onClick={() => setActiveFilter(label)}
                                sx={{
                                    borderRadius: TILE_RADIUS,
                                    px: 2,
                                    py: 1,
                                    border: 1,
                                    borderColor: isActive ? "text.secondary" : "divider",
                                    backgroundColor: isActive ? "text.secondary" : "background.paper",
                                    color: isActive ? "secondary.contrastText" : "text.black",
                                    boxShadow: "none",
                                    "&:hover": {
                                        backgroundColor: isActive ? "text.secondary" : "primary.contrastText",
                                        boxShadow: "none",
                                    },
                                }}
                            >
                                {label}
                            </Button>
                        );
                    })}
                </Grid>

                <Grid container spacing={2} sx={{ width: "100%" }}>
                    {filteredTools.map((item, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={`${item.name}-${index}`}>
                            <Box sx={{
                                width: "100%",
                                height: { xs: 120, sm: 130, md: 140 },
                                backgroundColor: "background.paper",
                                p: 2,
                                border: 1,
                                borderColor: "divider",
                                borderRadius: TILE_RADIUS,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: 1.5,
                            }}>
                                <Image
                                    src={`/media/tech_stacks/${item.file}.svg`}
                                    alt={item.name}
                                    width={48}
                                    height={48}
                                    style={{
                                        height: 44,
                                        width: "auto",
                                        maxWidth: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                                <Typography variant="body2" sx={{ color: "text.black", textAlign: "center", fontWeight: 600, lineHeight: 1.2 }}>
                                    {item.name}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
}

export default TechnologyStack;
