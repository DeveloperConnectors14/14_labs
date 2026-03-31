import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";

function SingleCasePipeline() {

    return (
        <>
            <Box sx={{ px: 4, py: 6, }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography sx={{ py: 1, fontWeight: 400, fontSize: { xs: "16px", sm: "17px", md: "18px" }, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }} color="text.primary">
                            Architecture
                        </Typography>
                        <Typography fontWeight={600} sx={{ color: "text.primary", fontSize: { xs: "26px", sm: "32px", md: "40px" }, fontStyle: "SemiBold", fontFamily: "'Instrument Sans', sans-serif", }}>
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