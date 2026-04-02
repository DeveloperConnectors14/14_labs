import { Box, Grid, Typography } from "@mui/material";

function RealCostDetails({ costData }) {

    return (
        <>
            <Box sx={{ px: 4, py: 6 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Typography sx={{ py: 1, fontWeight: 400, fontSize: { xs: "16px", sm: "17px", md: "18px" }, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }} color="text.primary">
                            The Real Cost of Manual Operations
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }}>
                        <Grid container spacing={3}>
                            <Typography fontWeight={600} sx={{ color: "text.primary", fontSize: { xs: "26px", sm: "32px", md: "40px" }, fontStyle: "SemiBold", fontFamily: "'Instrument Sans', sans-serif", }}>
                                {costData.text}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Box >
        </>
    )
}

export default RealCostDetails;