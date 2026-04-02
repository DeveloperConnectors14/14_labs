import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Link from "next/link";

function MoreCaseStudies({ moreCases }) {

    return (
        <>
            <Box sx={{ px: 4, py: 6, }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography fontWeight={600} sx={{ color: "text.primary", fontSize: { xs: "26px", sm: "32px", md: "40px" }, fontStyle: "SemiBold", fontFamily: "'Instrument Sans', sans-serif", }}>
                            View more <Box component="span" sx={{ color: "text.secondary", fontFamily: "'Instrument Sans', sans-serif", }}>
                                case studies
                            </Box>
                        </Typography>
                        <Typography sx={{ py: 1, fontWeight: 400, fontSize: { xs: "16px", sm: "17px", md: "18px" }, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }} color="text.primary">
                            Explore our in-depth case studies showcasing real-world examples of how AI solutions have driven success for businesses like yours.
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Grid container spacing={3}>
                            {moreCases.map((item, i) => (
                                < Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}
                                    sx={{ display: "flex" }}
                                >
                                    <Card
                                        component={Link}
                                        href={`/case-studies/${item.id}`}
                                        sx={{
                                            width: "100%",
                                            border: 1,
                                            borderColor: "divider",
                                            borderRadius: 4,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            transition: "0.3s",
                                            textDecoration: "none",
                                            p: 1,
                                            "&:hover": {
                                                borderColor: "text.grey"
                                            },
                                        }}
                                    >
                                        <CardMedia
                                            component="img"
                                            height="200"
                                            image={`/media/${item.img}`}
                                            alt={item.img}
                                            sx={{ borderRadius: 2 }}
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography color="text.black" fontWeight={"700"} sx={{ fontSize: { xs: "20px", sm: "22px", md: "24px" }, fontStyle: "Bold", fontFamily: "'Instrument Sans', sans-serif", }}>
                                                {item.title}
                                            </Typography>
                                            <Typography color="text.grey"
                                                sx={{ py: 0.5, fontSize: { xs: "14px", sm: "15px", md: "16px" }, fontWeight: 400, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }}>
                                                {item.date}
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

export default MoreCaseStudies;