import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

function SingleCaseHero({ heroData }) {

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
                    <Grid size={{ xs: 12, md: 6 }} >
                        <Typography fontWeight={600} color="text.primary" sx={{ fontSize: { xs: "26px", sm: "30px", md: "48px" }, fontStyle: "SemiBold", fontFamily: "'Instrument Sans', sans-serif", }}>
                            {heroData.title}
                        </Typography>
                        <Typography sx={{ py: 2, fontSize: { xs: "16px", sm: "17px", md: "18px" }, fontWeight: 400, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }} color="text.primary">
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
                                        }}
                                    >
                                        <CardContent>
                                            <Typography fontWeight={"700"} sx={{ fontSize: { xs: "20px", sm: "22px", md: "24px" }, fontStyle: "Bold", fontFamily: "'Instrument Sans', sans-serif", }}>
                                                {item.value}
                                            </Typography>
                                            <Typography fontWeight={"400"} color="text.grey" sx={{ pt: 1, fontSize: { xs: "16px", sm: "17px", md: "18px" }, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }}>
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