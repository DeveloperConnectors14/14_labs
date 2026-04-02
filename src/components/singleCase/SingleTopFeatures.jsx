import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

function SingleTopFeatures({ topFeatures }) {

    return (
        <>
            <Box sx={{ px: 4, py: 6 }}>
                <Grid container spacing={2}>
                    <Grid size={12}>
                        <Grid container spacing={3}>
                            {topFeatures.map((item, i) => (
                                < Grid size={{ xs: 12, md: 4 }} key={i} sx={{ display: { xs: "block", sm: "block", md: "flex" } }}>
                                    <Card
                                        sx={{
                                            px: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            backgroundColor: "transparent",
                                            boxShadow: "none"
                                        }}
                                    >
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography fontWeight={"600"} sx={{ color: "text.black", fontSize: { xs: "20px", sm: "22px", md: "24px" }, fontStyle: "SemiBold", pb: 1, fontFamily: "Inter, sans-serif" }}>
                                                {item.title}
                                            </Typography>
                                            <Typography fontWeight={"400"} color="text.primary" sx={{ py: 1, fontSize: { xs: "16px", sm: "17px", md: "18px" }, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }}>
                                                {item.desc}
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

export default SingleTopFeatures;