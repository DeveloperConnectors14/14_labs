import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import { SECTION_PX, SECTION_PY, CARD_RADIUS } from "@/theme/tokens";

function SingleKeyFeatures({ keyFeatures }) {

    return (
        <>
            <Box sx={{ px: SECTION_PX, py: SECTION_PY, background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)", }}>
                <Grid container spacing={3}>
                    <Grid size={12}>
                        {keyFeatures.label && (
                            <Typography variant="body1" sx={{ py: 1 }} color="text.primary">
                                {keyFeatures.label}
                            </Typography>
                        )}
                        <Typography variant="h2" sx={{ color: "text.primary" }}>
                            {keyFeatures.title ? (
                                keyFeatures.title
                            ) : (
                                <>
                                    Key{" "}
                                    <Box component="span" sx={{ color: "text.secondary" }}>
                                        Features
                                    </Box>
                                </>
                            )}
                        </Typography>
                        <Typography variant="body1" sx={{ py: 1 }} color="text.primary">
                            {keyFeatures.text}
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Grid container spacing={3}>
                            {keyFeatures.list.map((item, i) => (
                                < Grid size={{ xs: 12, md: 4 }} key={i} sx={{ display: { xs: "block", sm: "block", md: "flex" } }}>
                                    <Card
                                        sx={{
                                            borderRadius: CARD_RADIUS,
                                            border: 1,
                                            borderColor: "divider",
                                            px: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            transition: "0.3s",
                                        }}
                                    >
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography variant="h3" sx={{ color: "text.black" }}>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.grey" sx={{ py: 1 }}>
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