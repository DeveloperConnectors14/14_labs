import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { SECTION_PX, SECTION_PY } from "@/theme/tokens";

function SingleTopFeatures({ topFeatures }) {

    return (
        <>
            <Box sx={{ px: SECTION_PX, py: SECTION_PY }}>
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
                                            <Typography variant="h3" sx={{ color: "text.black", pb: 1 }}>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body1" color="text.primary" sx={{ py: 1 }}>
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