import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

function SingleKeyFeatures() {

    const keyFeatures = [
        {
            title: "Deep research automation",
            desc: "Searches across loopNet, CBRE, JLL, Brixmor and local broker websites automatically, discovering properties missed by manual searching.",
        },
        {
            title: "Comprehensive Contact Data",
            desc: "Extracts complete broker information including name, title, company direct email, and phone numbers for immediate outreach.",
        },
        {
            title: "Geolocation verification",
            desc: "Validates addresses and enriches with GPS coordinates, CBSA codes, and metropolitan area data for accurate location intelligence.",
        },
        {
            title: "Computer vision analysis",
            desc: "Analyzes aerial and street view imagery to verify property attributes square footage, and premises classification.",
        },
        {
            title: "Multistage quality assurance",
            desc: "User-configurable qualification criteria with data legitimacy, recency and criteria matching for transparent desicion making.",
        },
        {
            title: "Real time monitoring",
            desc: "Google sheets integration logs all workflow execution for tracking, debugging and maintaining an audit trail.",
        },
    ];


    return (
        <>
            <Box sx={{ px: 4, py: 6, background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)", }}>
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Typography variant="h4" fontWeight={600} color="text.primary">
                            Key Features
                        </Typography>
                        <Typography sx={{ py: 2 }} color="text.primary">
                            A comprehensive suit of AI-powered tools to automate commercial real estate site discovery and qualification.
                        </Typography>
                    </Grid>
                    <Grid size={12}>
                        <Grid container spacing={3}>
                            {keyFeatures.map((item, i) => (
                                < Grid size={{ xs: 12, md: 4 }} key={i} sx={{ display: { xs: "block", sm: "block", md: "flex" } }}>
                                    <Card
                                        sx={{
                                            borderRadius: 4,
                                            px: 2,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "space-between",
                                            transition: "0.3s",
                                            "&:hover": {
                                                transform: "translateY(-6px)",
                                                boxShadow: 6,
                                            },
                                        }}
                                    >
                                        <CardContent sx={{ flexGrow: 1 }}>
                                            <Typography variant="h6" fontWeight={700} sx={{ color: "text.black", pb: 1 }}>
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.grey">
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