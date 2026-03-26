import { Box, Card, CardContent, Grid, Typography } from "@mui/material";


function SingleCaseArchitechture() {

    const archHighlights = [
        {
            title: "11",
            boldText: "Pipeline nodes : ",
            desc: "Sequential workflow with specialized processing at each stage",
        },
        {
            title: "Infinite",
            boldText: "Scalability : ",
            desc: "Extensible architecture supporting new data resources",
        },
        {
            title: "100%",
            boldText: "Data Quality : ",
            desc: "Multi-stage QA with verification and validation",
        },
    ];

    return (
        <>
            <Box sx={{ px: 4, py: 6, }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h4" fontWeight={600} color="text.primary" sx={{ fontFamily: "'Instrument Sans', sans-serif", }}>
                            Architecture <br /> Highlights
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Grid container spacing={3}>
                            {archHighlights.map((item, i) => (
                                < Grid size={{ xs: 12, md: 4 }} key={i}>
                                    <Card
                                        sx={{
                                            borderRadius: 4,
                                            px: 2,
                                            position: "relative",
                                            overflow: "hidden",
                                            transition: "0.3s",
                                        }}
                                    >
                                        <CardContent>
                                            <Typography variant="h6" fontWeight={700} sx={{ color: "text.primary", pb: 1, fontFamily: "'Instrument Sans', sans-serif", }}>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.grey" sx={{ fontFamily: "'Instrument Sans', sans-serif", }}>
                                                <Box component="span" fontWeight={600} sx={{ fontFamily: "'Instrument Sans', sans-serif", }}>{item.boldText}</Box>
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