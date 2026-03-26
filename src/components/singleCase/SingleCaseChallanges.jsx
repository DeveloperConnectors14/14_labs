import { Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";


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
                        <Typography sx={{ py: 2.5, fontFamily: "'Instrument Sans', sans-serif", }} color="text.primary">
                            Challange
                        </Typography>
                        <Typography variant="h4" fontWeight={600} color="text.primary" sx={{ fontFamily: "'Instrument Sans', sans-serif", }}>
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
                                            border: 1,
                                            borderColor: "divider",
                                            borderRadius: 4,
                                            display: "flex",
                                            flexDirection: "column",
                                            position: "relative",
                                            minHeight: 250,
                                            transition: "all 0.4s ease",
                                            "&:hover": {
                                                backgroundImage: 'url("/media/service1.png")',
                                                backgroundPosition: "center",
                                                backgroundSize: "cover",
                                                backgroundRepeat: "no-repeat",
                                                "& .cardContent::before": {
                                                    opacity: 1,
                                                },
                                                "& .sNo": {
                                                    color: "primary.contrastText",
                                                },
                                                "& .hidden": {
                                                    display: "block",
                                                    transform: "translateY(0)",
                                                    opacity: 1,
                                                }, "&:hover .hidden": {
                                                    position: "relative",
                                                    opacity: 1,
                                                    transform: "translateY(0)",
                                                    visibility: "visible",
                                                },
                                                "& .heading": {
                                                    color: "secondary.contrastText",
                                                }
                                            },

                                        }}
                                    >
                                        <CardContent
                                            className="cardContent"
                                            sx={{
                                                position: "relative",
                                                flexGrow: 1,
                                                zIndex: 0,
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                transition: "background 0.4s ease",
                                                "&::before": {
                                                    content: '""',
                                                    position: "absolute",
                                                    inset: 0,
                                                    background:
                                                        "linear-gradient(90deg, #016b64bb, #054c64c5, #063864cb, #02185abb)",
                                                    opacity: 0,
                                                    transition: "opacity 0.4s ease",
                                                }
                                            }}
                                        >
                                            <Box sx={{
                                                flexGrow: 1,
                                                zIndex: 1,
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                transition: "background 0.4s ease",
                                            }}>
                                                <Box>
                                                    <Typography
                                                        className="sNo"
                                                        variant="body2"
                                                        color="text.grey"
                                                        sx={{ py: 0.5, fontFamily: "'IBM Plex Mono', monospace", }}
                                                    >
                                                        {challange.sNo}
                                                    </Typography>
                                                    <Divider />
                                                </Box>
                                                <Box className="detailBox" >
                                                    <Typography
                                                        className="heading"
                                                        variant="h6"
                                                        sx={{ color: "text.black", fontFamily: "Inter, sans-serif" }}
                                                    >
                                                        {challange.title}
                                                    </Typography>
                                                    <Box className="hidden" sx={{
                                                        position: "absolute",
                                                        opacity: 0,
                                                        transform: "translateY(50px)",
                                                        visibility: "hidden",
                                                        transition: "all 0.4s ease",
                                                    }} >
                                                        <Typography
                                                            variant="body2"
                                                            color="primary.contrastText"
                                                            sx={{ py: 1, fontFamily: "'Instrument Sans', sans-serif", }}
                                                        >
                                                            {challange.desc}
                                                        </Typography>
                                                    </Box>
                                                </Box>
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