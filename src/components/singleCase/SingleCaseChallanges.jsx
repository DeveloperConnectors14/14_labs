import { Box, Grid, Typography } from "@mui/material";
import { SECTION_PX, SECTION_PY, CARD_RADIUS } from "@/theme/tokens";
import NumberedCard from "@/components/general/NumberedCard";


function SingleCaseChallanges({ challanges }) {

    return (
        <>
            <Box sx={{ px: SECTION_PX, py: SECTION_PY, background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)", }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Typography variant="body1" sx={{ py: 1 }} color="text.primary">
                            {challanges.label || "Challenge"}
                        </Typography>
                        <Typography variant="h2" sx={{ color: "text.primary" }}>
                            {challanges.title}
                        </Typography>
                        {challanges.text && (
                            <Typography variant="body1" sx={{ pt: 2 }} color="text.grey">
                                {challanges.text}
                            </Typography>
                        )}
                        {challanges.sideStat && (
                            <Box
                                sx={{
                                    mt: 4,
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
                                        fontSize: { xs: "48px", sm: "56px", md: "72px" },
                                        lineHeight: 1,
                                    }}
                                >
                                    {challanges.sideStat.value}
                                </Typography>
                                <Typography variant="h3" sx={{ color: "text.black", pt: 1.5 }}>
                                    {challanges.sideStat.label}
                                </Typography>
                            </Box>
                        )}
                    </Grid>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Grid container spacing={3}>
                            {challanges.items.map((challange, i) => (
                                <Grid
                                    size={{ xs: 12, sm: 6, md: 6 }}
                                    key={i}
                                    sx={{ display: "flex" }}
                                >
                                    <NumberedCard number={challange.sNo} title={challange.title} desc={challange.desc} />
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