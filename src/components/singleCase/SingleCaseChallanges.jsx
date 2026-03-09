import {  Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";


function SingleCaseChallanges() {

    const challanges = [
        {
            sNo: "01",
            title: "Time-intensive research",
            desc: "Web plateforms, internal tools, dashboards, and scalable systems tailored to your workflow."
        },
        {
            sNo: "02",
            title: "Fragmented & incomplete data",
            desc: "Property information scaterred across 5+ sources with missing contact details, broker information, and geographic data that requires manual consolidation"
        },
        {
            sNo: "03",
            title: "No verification standards",
            desc: "Addresses, square footage, property attributes and contact details lack systematic verification, leading to 30%+ data inaccuracy rates"
        },
        {
            sNo: "04",
            title: "Missed opportunities",
            desc: "Manual processes create response delays, duplicate efforts, and significant property discovery gaps that competitors fint through automation."
        },
    ];

    return (
        <>
            <Box sx={{ px: 4, py: 6, background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)", }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography sx={{ py: 2.5 }} color="text.secondary">
                            Challange
                        </Typography>
                        <Typography variant="h4" fontWeight={600}>
                            Commercial Real Estate Site Discovery Pain Points
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Grid container spacing={3}>
                            {challanges.map((challange, i) => (
                                <Grid
                                    size={{ xs: 12, sm: 6, md: 6 }}
                                    key={i}
                                    sx={{ display: "flex" }}
                                >
                                    <Card
                                        sx={{
                                            flex: 1,
                                            borderRadius: 4,
                                            p: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            transition: "0.3s",
                                            "&:hover": {
                                                transform: "translateY(-6px)",
                                                boxShadow: 6,
                                            },
                                        }}
                                    >
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography variant="body2" color="text.secondary" sx={{ py: 0.5 }}>
                                                {challange.sNo}
                                            </Typography>
                                            <Divider />
                                            <Box sx={{ pt: 10 }}>
                                                <Typography variant="h6" sx={{ color: "black" }}>
                                                    {challange.title}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                    sx={{
                                                        pt: 1,
                                                        display: "-webkit-box",
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: "vertical",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    {challange.desc}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}

export default SingleCaseChallanges;