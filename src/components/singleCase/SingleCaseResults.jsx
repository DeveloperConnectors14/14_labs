import { Box, Grid, Typography } from "@mui/material";
import { SECTION_PX, SECTION_PY, CARD_RADIUS } from "@/theme/tokens";

function SingleCaseResults({ results }) {
    if (!results) return null;

    return (
        <Box sx={{ px: SECTION_PX, py: SECTION_PY }}>
            <Grid container spacing={3}>
                <Grid size={12}>
                    {results.label && (
                        <Typography variant="body1" sx={{ py: 1 }} color="text.primary">
                            {results.label}
                        </Typography>
                    )}
                    <Typography variant="h2" sx={{ color: "text.primary" }}>
                        {results.title}
                    </Typography>
                    {results.text && (
                        <Typography variant="body1" sx={{ py: 1 }} color="text.primary">
                            {results.text}
                        </Typography>
                    )}
                </Grid>

                <Grid size={12}>
                    <Grid container spacing={3}>
                        {results.items.map((item, i) => (
                            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i} sx={{ display: "flex" }}>
                                <Box
                                    sx={{
                                        width: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        p: { xs: 2.5, md: 3 },
                                        borderRadius: CARD_RADIUS,
                                        border: 1,
                                        borderColor: "divider",
                                        backgroundColor: "background.paper",
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            color: "text.secondary",
                                            fontFamily: "'Instrument Sans', sans-serif",
                                            fontWeight: 700,
                                            fontSize: { xs: "40px", sm: "48px", md: "56px" },
                                            lineHeight: 1,
                                        }}
                                    >
                                        {item.value}
                                    </Typography>
                                    <Typography variant="h3" sx={{ color: "text.black", pt: 1.5 }}>
                                        {item.label}
                                    </Typography>
                                    <Typography variant="body2" color="text.grey" sx={{ pt: 1 }}>
                                        {item.desc}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default SingleCaseResults;
