import { Box, Grid, Typography } from "@mui/material";
import { SECTION_PX, SECTION_PY } from "@/theme/tokens";

function RealCostDetails({ costData }) {

    return (
        <>
            <Box sx={{ px: SECTION_PX, py: SECTION_PY }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 5 }}>
                        <Typography variant="body1" sx={{ py: 1 }} color="text.primary">
                            The Real Cost of Manual Operations
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, md: 7 }}>
                        <Grid container spacing={3}>
                            <Typography variant="h3" sx={{ color: "text.primary" }}>
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