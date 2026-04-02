import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

function SingleKeyFeatures({ keyFeatures }) {

    return (
        <>
            <Box sx={{ px: 4, py: 6, background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)", }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600} sx={{ color: "text.primary", fontSize: { xs: "26px", sm: "32px", md: "40px" }, fontStyle: "SemiBold", fontFamily: "'Instrument Sans', sans-serif", }}>
                            Key Features
                        </Typography>
                        <Typography sx={{ py: 1, fontWeight: 400, fontSize: { xs: "16px", sm: "17px", md: "18px" }, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }} color="text.primary">
                            {keyFeatures.text}
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Grid container spacing={3}>
                            {keyFeatures.list.map((item, i) => (
                                < Grid size={{ xs: 12, md: 4 }} key={i} sx={{ display: { xs: "block", sm: "block", md: "flex" } }}>
                                    <Card
                                        sx={{
                                            borderRadius: 4,
                                            px: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            transition: "0.3s",
                                        }}
                                    >
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography fontWeight={"600"} sx={{ color: "text.black", fontSize: { xs: "20px", sm: "22px", md: "24px" }, fontStyle: "SemiBold", fontFamily: "'Instrument Sans', sans-serif", }}>
                                                {item.title}
                                            </Typography>
                                            <Typography fontWeight={"400"} color="text.grey" sx={{ py: 1, fontSize: { xs: "16px", sm: "17px", md: "18px" }, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }}>
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

export default SingleKeyFeatures;