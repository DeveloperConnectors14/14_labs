import { Box, Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { SECTION_PX, SECTION_PY, CARD_RADIUS, TILE_RADIUS } from "@/theme/tokens";

function MoreCaseStudies({ moreCases }) {

    return (
        <>
            <Box sx={{ px: SECTION_PX, py: SECTION_PY }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h2" sx={{ color: "text.primary" }}>
                            View More{" "}
                            <Box component="span" sx={{ color: "text.secondary" }}>
                                Case Studies
                            </Box>
                        </Typography>
                        <Typography variant="body1" sx={{ py: 1 }} color="text.primary">
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
                                            borderRadius: CARD_RADIUS,
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
                                            sx={{ borderRadius: TILE_RADIUS }}
                                        />
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography variant="h3" color="text.black">
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.grey" sx={{ pt: 0.5 }}>
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