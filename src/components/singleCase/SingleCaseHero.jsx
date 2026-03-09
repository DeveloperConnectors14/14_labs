import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

function SingleCaseHero() {

    const heroCards = [
        {
            value: "Real Estate",
            label: "industry",
        },
        {
            value: "1 Month",
            label: "Timeline",
        },
        {
            value: "3",
            label: "Engineers",
        },
        {
            value: "11",
            label: "Pipeline nodes",
        },
    ];

    return (
        <>
            <Box sx={{
                minHeight: { md: "88vh", xs: "90vh" },
                px: 4,
                py: { xs: 6, md: 0 }
            }}>
                <Grid container spacing={3} sx={{
                    minHeight: { md: "88vh", xs: "90vh" },
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                }}>
                    <Grid size={{ xs: 12, md: 7 }} >
                        <Typography variant="h2" fontWeight={600}>
                            AI Find Sites Real Estate Solution
                        </Typography>
                        <Typography sx={{ py: 2.5 }} color="text.secondary">
                            AI-Driven Commercial Real Estate Site Discovery - Automating hours of manual research into minutes of intelligent analysis
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Grid container spacing={3}>
                            {heroCards.map((item, i) => (
                                < Grid size={{ md: 3 }} key={i}>
                                    <Card
                                        sx={{
                                            borderRadius: 4,
                                            border: 1,
                                            borderColor: "linear-gradient(90deg, #00baaf, #0186b2, #0261b3, #002cb6)",
                                            px: 2,
                                            textAlign: "start",
                                            position: "relative",
                                            overflow: "hidden",
                                            transition: "0.3s",
                                            "&:hover": {
                                                transform: "translateY(-6px)",
                                                boxShadow: 6,
                                            },
                                        }}
                                    >
                                        <CardContent>
                                            <Typography variant="h6" fontWeight={700} >
                                                {item.value}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ pt: 1 }}>
                                                {item.label}
                                            </Typography>
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

export default SingleCaseHero;