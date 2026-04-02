import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Box, Card, CardContent, Grid, Typography } from "@mui/material";
import Image from "next/image";

function SingleCaseApproach({ approaches }) {

    return (
        <>
            <Box sx={{ px: 4, py: 6 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Typography sx={{ py: 1, fontWeight: 400, fontSize: { xs: "16px", sm: "17px", md: "18px" }, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }} color="text.primary">
                            Our approach
                        </Typography>
                        <Typography fontWeight={600} sx={{ color: "text.primary", fontSize: { xs: "26px", sm: "32px", md: "40px" }, fontStyle: "SemiBold", fontFamily: "'Instrument Sans', sans-serif", }}>
                            {approaches.title}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }}>
                        <Grid container spacing={3}>
                            {approaches.steps.map((item, i) => (
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
                                                            <Typography color="text.grey"
                                                                sx={{ py: 0.5, fontSize: { xs: "14px", sm: "15px", md: "16px" }, fontWeight: 400, fontStyle: "Regular", fontFamily: "'IBM Plex Mono', monospace", }}>
                                                                {item.step}
                                                            </Typography>
                                                            <Typography fontWeight={"700"} sx={{ fontSize: { xs: "20px", sm: "22px", md: "24px" }, fontStyle: "Bold", fontFamily: "'Instrument Sans', sans-serif", }}>
                                                                {item.title}
                                                            </Typography>
                                                        </Box>
                                                    </AccordionSummary>
                                                    <AccordionDetails>
                                                        <Typography fontWeight={"400"} color="text.grey" sx={{ fontSize: { xs: "14px", sm: "15px", md: "16px" }, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }}>
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