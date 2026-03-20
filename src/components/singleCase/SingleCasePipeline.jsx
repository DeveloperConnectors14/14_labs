import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

function SingleCasePipeline() {

    return (
        <>
            <Box sx={{ px: 4, py: 6, }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography sx={{ py: 2.5 }} color="text.primary">
                            Architecture
                        </Typography>
                        <Typography variant="h4" fontWeight={600} color="text.primary">
                            Intelligent Pipeline <br /> Architecture
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Box
                            sx={{
                                width: "60%",
                                height: "80vh",
                                position: "relative",
                                mx: "auto"
                            }}
                        >
                            <Image
                                src="/media/piplineChart.PNG"
                                alt="piplineChart"
                                fill
                                style={{
                                    objectFit: "cover",
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box >
        </>
    )
}

export default SingleCasePipeline;