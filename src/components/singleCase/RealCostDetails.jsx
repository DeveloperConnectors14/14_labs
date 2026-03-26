import { Box, Grid, Typography } from "@mui/material";

function RealCostDetails() {

    return (
        <>
            <Box sx={{ px: 4, py: 6 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Typography sx={{ py: 2.5, fontFamily: "'Instrument Sans', sans-serif", }} color="text.primary">
                            The Real Cost of Manual Operations
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }}>
                        <Grid container spacing={3}>
                            <Typography variant="h4" fontWeight={600} color="text.primary" sx={{ fontFamily: "'Instrument Sans', sans-serif", }}>
                                These challanges compound daily: analysts spend 6-8 hours per property discovery, data accuracy drops to 70%, and critical oppurtunities are missed entirely. The result is slower deal cycles, higher optional costs, and competitive disadventage. Automation is no longer optional-it's essential.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Box >
        </>
    )
}

export default RealCostDetails;