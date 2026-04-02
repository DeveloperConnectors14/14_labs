import { Box, Card, CardContent, Grid, Typography } from "@mui/material";


function SingleCaseArchitechture({ architectureData }) {

    return (
        <>
            <Box sx={{ px: 4, py: 6, }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600} sx={{ color: "text.primary", fontSize: { xs: "26px", sm: "32px", md: "40px" }, fontStyle: "SemiBold", fontFamily: "'Instrument Sans', sans-serif", }}>
                            Architecture <br /> Highlights
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Grid container spacing={3}>
                            {architectureData.map((item, i) => (
                                < Grid size={{ xs: 12, md: 4 }} key={i}>
                                    <Card
                                        sx={{
                                            borderRadius: 4,
                                            px: 2,
                                            position: "relative",
                                            overflow: "hidden",
                                            transition: "0.3s",
                                        }}
                                    >
                                        <CardContent>
                                            <Typography fontWeight={"700"} sx={{ fontSize: { xs: "20px", sm: "22px", md: "24px" }, fontStyle: "Bold", fontFamily: "'Instrument Sans', sans-serif", }}>
                                                {item.title}
                                            </Typography>
                                            <Typography color="text.grey" fontWeight={"400"} sx={{ fontSize: { xs: "16px", sm: "17px", md: "18px" }, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }}>
                                                <Box component={"span"} color="text.grey" fontWeight={"600"} sx={{ fontSize: { xs: "16px", sm: "17px", md: "18px" }, fontStyle: "Bold", fontFamily: "'Instrument Sans', sans-serif", }}>{item.boldText}</Box>
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

export default SingleCaseArchitechture;