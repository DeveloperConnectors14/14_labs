import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";
import { useState } from "react";


function TechnologyStack({ technologies }) {
    const [activeFilter, setActiveFilter] = useState("All");

    const filteredTools =
        activeFilter === "All"
            ? technologies.stacks.flatMap((item) => item.values)
            : technologies.stacks
                .filter((item) => item.techType === activeFilter)
                .flatMap((item) => item.values);

    function handleFilter(type) {
        setActiveFilter(type);
    }

    return (
        <>
            <Box sx={{ px: 4, py: 6 }}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Box>
                            <Typography fontWeight={600} sx={{ color: "text.primary", fontSize: { xs: "26px", sm: "32px", md: "40px" }, fontStyle: "SemiBold", fontFamily: "'Instrument Sans', sans-serif", }}>
                                Build with technology stack
                            </Typography>
                        </Box>
                        <Typography sx={{ py: 1, fontWeight: 400, fontSize: { xs: "16px", sm: "17px", md: "18px" }, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }} color="text.primary">
                            {technologies.text}
                        </Typography>
                    </Grid>

                    <Grid size={12} sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: 2,
                        pb: 2
                    }}>
                        <Button
                            variant="contained"
                            onClick={() => handleFilter("All")}
                            sx={{
                                borderRadius: 2,
                                px: 2,
                                py: 1,
                                border: 1,
                                borderColor: "divider",
                                fontWeight: 600,
                                fontFamily: "'IBM Plex Mono', monospace",
                                backgroundColor: "background.paper",
                                color: "text.black",
                                boxShadow: "none",
                                "&:hover": {
                                    backgroundColor: "primary.contrastText",
                                    boxShadow: "none",
                                },
                            }}
                        >
                            All
                        </Button>
                        {technologies.stacks.map((item, index) => (
                            <Button
                                key={index}
                                variant="contained"
                                onClick={() => handleFilter(`${item.techType}`)}
                                sx={{
                                    borderRadius: 2,
                                    px: 2,
                                    py: 1,
                                    border: 1,
                                    borderColor: "divider",
                                    fontWeight: 600,
                                    fontFamily: "'IBM Plex Mono', monospace",
                                    backgroundColor: "background.paper",
                                    color: "text.black",
                                    boxShadow: "none",
                                    "&:hover": {
                                        backgroundColor: "primary.contrastText",
                                        boxShadow: "none",
                                    },
                                }}
                            >
                                {item.techType}
                            </Button>
                        ))}
                    </Grid>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        {filteredTools.map((item, index) => (
                            <Box key={index} sx={{
                                width: { xs: 80, sm: 80, md: 120 },
                                backgroundColor: "background.paper",
                                p: 1,
                                border: 1,
                                borderColor: "divider",
                                borderRadius: 3
                            }}>
                                <Image
                                    src={`/media/tech_stacks/${item}.svg`}
                                    alt={item}
                                    width={120}
                                    height={45}
                                    style={{
                                        width: "100%",
                                        objectFit: "contain",
                                    }}
                                />
                            </Box>
                        ))}
                    </Box>
                </Grid>
            </Box >
        </>
    )
}

export default TechnologyStack;