import { Box, Button, Grid, Typography } from "@mui/material";
import Image from "next/image";

function handleFilter() {

    console.log("handleFilter function is called!")
}

function TechnologyStack() {

    const tools = [
        "tool1.png",
        "tool2.png",
        "tool3.png",
        "tool4.png",
        "tool5.png",
        "tool5.png",
    ];

    return (
        <>
            <Box sx={{ px: 4, py: 6 }}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Box>
                            <Typography variant="h4" fontWeight={600} color="text.primary" sx={{ fontFamily: "'Instrument Sans', sans-serif", }}>
                                Build with technology stack
                            </Typography>
                        </Box>
                        <Typography sx={{ py: 2, fontFamily: "'Instrument Sans', sans-serif", }} color="text.primary">
                            Enterprise-grade technologies powering scalable, intelligent multi-agent systems.
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
                            onClick={() => handleFilter()}
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
                            BACKEND
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleFilter()}
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
                            DATABASE
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleFilter()}
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
                            AI FRAMEWORKS
                        </Button>
                        <Button
                            variant="contained"
                            onClick={() => handleFilter()}
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
                            LLM
                        </Button>
                    </Grid>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: 2,
                        }}
                    >
                        {tools.map((item, index) => (
                            <Box key={index} sx={{
                                width: { xs: 80, sm: 80, md: 120 },
                                backgroundColor: "background.paper",
                                p: 1,
                                border: 1,
                                borderColor: "divider",
                                borderRadius: 3
                            }}>
                                <Image
                                    src={`/media/${item}`}
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
            </Box>
        </>
    )
}

export default TechnologyStack;