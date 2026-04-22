import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { SECTION_PX, CARD_RADIUS } from "@/theme/tokens";

function SingleCaseHero({ heroData }) {

    return (
        <>
            <Box sx={{
                px: SECTION_PX,
                py: { xs: 6, md: 8 }
            }}>
                <Grid container spacing={4} sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                }}>
                    <Grid size={{ xs: 12, md: 6 }} >
                        <Typography variant="h2" sx={{ color: "text.primary" }}>
                            {heroData.title}
                        </Typography>
                        <Typography variant="body1" sx={{ py: 2 }} color="text.primary">
                            {heroData.subtitle}
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Grid container spacing={3} sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 2,
                        }}>
                            {heroData.stats.map((item, i) => (
                                < Grid size={{ xs: 6, sm: 6, md: 3 }} key={i}>
                                    <Card
                                        sx={{
                                            borderRadius: CARD_RADIUS,
                                            border: 1,
                                            borderColor: "divider",
                                            px: { xs: 0.5, sm: 1, md: 2 },
                                            textAlign: "start",
                                            position: "relative",
                                            overflow: "hidden",
                                            transition: "0.3s",
                                        }}
                                    >
                                        <CardContent sx={{ p: { xs: 1.5, sm: 2, md: 3 }, "&:last-child": { pb: { xs: 1.5, sm: 2, md: 3 } } }}>
                                            <Typography variant="h3">
                                                {item.value}
                                            </Typography>
                                            <Typography variant="body2" color="text.grey" sx={{ pt: 1 }}>
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