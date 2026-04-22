import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { SECTION_PX, SECTION_PY, CARD_RADIUS } from "@/theme/tokens";


function SingleCaseArchitechture({ architectureData }) {

    return (
        <>
            <Box sx={{ px: SECTION_PX, py: SECTION_PY }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h2" sx={{ color: "text.primary" }}>
                            Architecture{" "}
                            <Box component="span" sx={{ color: "text.secondary" }}>
                                Highlights
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Grid container spacing={3}>
                            {architectureData.map((item, i) => (
                                < Grid size={{ xs: 12, md: 4 }} key={i} sx={{ display: "flex" }}>
                                    <Card
                                        sx={{
                                            width: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            borderRadius: CARD_RADIUS,
                                            border: 1,
                                            borderColor: "divider",
                                            px: { xs: 0.5, sm: 1, md: 2 },
                                            position: "relative",
                                            overflow: "hidden",
                                            transition: "0.3s",
                                        }}
                                    >
                                        <CardContent sx={{ flexGrow: 1, p: { xs: 2, sm: 2.5, md: 3 }, "&:last-child": { pb: { xs: 2, sm: 2.5, md: 3 } } }}>
                                            <Typography
                                                sx={{
                                                    color: "text.primary",
                                                    fontFamily: "'Instrument Sans', sans-serif",
                                                    fontWeight: 700,
                                                    fontSize: { xs: "40px", sm: "48px", md: "56px" },
                                                    lineHeight: 1,
                                                }}
                                            >
                                                {item.value ?? item.title}
                                            </Typography>
                                            {item.label && (
                                                <Typography variant="h3" sx={{ color: "text.black", pt: 1.5 }}>
                                                    {item.label}
                                                </Typography>
                                            )}
                                            <Typography variant="body2" color="text.grey" sx={{ pt: item.label ? 1 : 1.5 }}>
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