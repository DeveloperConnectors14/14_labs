import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import Image from "next/image";

function SingleCaseApproach() {

    const workflowSteps = [
        {
            step: "STEP 1",
            icon: "workflowstep1.png",
            title: "Automated Deep Research",
            desc: "AI searches across LoopNet, CBRE, JLL, Brixmor, and local broker websites automatically discovering properties that match your criteria.",
        },
        {
            step: "STEP 2",
            icon: "workflowstep2.png",
            title: "Structured Data Extraction",
            desc: "AI searches across LoopNet, CBRE, JLL, Brixmor, and local broker websites automatically discovering properties that match your criteria.",
        },
        {
            step: "STEP 3",
            icon: "workflowstep3.png",
            title: "Geolocation Verification",
            desc: "AI searches across LoopNet, CBRE, JLL, Brixmor, and local broker websites automatically discovering properties that match your criteria.",
        },
        {
            step: "STEP 4",
            icon: "workflowstep4.png",
            title: "Computer Vision Analysis",
            desc: "AI searches across LoopNet, CBRE, JLL, Brixmor, and local broker websites automatically discovering properties that match your criteria.",
        },
    ];

    return (
        <>
            <Box sx={{ px: 4, py: 6 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Typography sx={{ py: 2.5, fontFamily: "'Instrument Sans', sans-serif", }} color="text.primary">
                            Our approach
                        </Typography>
                        <Typography variant="h4" fontWeight={600} color="text.primary" sx={{ fontFamily: "'Instrument Sans', sans-serif", }}>
                            AI Powered Workflow
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }}>
                        <Grid container spacing={3}>
                            {workflowSteps.map((item, i) => (
                                <Grid size={12} key={i} >
                                    <Card sx={{ border: "divider" }}>
                                        <CardContent sx={{
                                            p: 2.5,
                                            borderRadius: 3,
                                            border: "1px solid",
                                            borderColor: "divider",
                                            display: "flex",
                                            gap: 3,
                                            alignItems: "center",
                                        }}>
                                            <Box>
                                                <Image
                                                    src={`/media/${item.icon}`}
                                                    alt={item.icon}
                                                    width={60}
                                                    height={60}
                                                    style={{
                                                        objectFit: "contain",
                                                        borderRadius: "100%",
                                                    }}
                                                />
                                            </Box>
                                            <Box>
                                                <Accordion sx={{ boxShadow: "none" }}>
                                                    <AccordionSummary expandIcon={<ExpandMore />}>
                                                        <Box>
                                                            <Typography variant="body2" color="text.grey" sx={{ py: 0.5, fontFamily: "'IBM Plex Mono', monospace", }}>
                                                                {item.step}
                                                            </Typography>
                                                            <Typography variant="h6" fontWeight={"bold"} color="text.primary" sx={{ fontFamily: "'Instrument Sans', sans-serif", }}>
                                                                {item.title}
                                                            </Typography>
                                                        </Box>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography variant="body2" color="text.grey" sx={{ fontFamily: "'Instrument Sans', sans-serif", }}>
                                                            {item.desc}
                                                        </Typography>
                                                    </AccordionDetails>
                                                </Accordion>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Box >
        </>
    )
}

export default SingleCaseApproach;