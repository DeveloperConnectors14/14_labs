"use client";

import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
} from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Link from "next/link";

const pricing = [
    {
        title: "Pilot Project",
        duration: "2-3 Weeks",
        details: "One use case, Measurable KPI's, Limited integrations",
        pricing: "$1000-$3000",
    },
    {
        title: "MVP",
        duration: "4-6 Weeks",
        details: "Production ready version, Monitoring, Basic admin panel",
        pricing: "$3000-$8000",
    },
    {
        title: "Scalable",
        duration: "Ongoing",
        details: "Retaining, Evals, New Workflows, Cost Optimizations",
        pricing: "$8000+",
    },
];

function PricingSection() {
    return (
        <Box sx={{ px: 4, py: 6, }}>
            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography fontWeight={600} sx={{ color: "text.primary", fontSize: { xs: "26px", sm: "32px", md: "40px" }, fontStyle: "semiBold", fontFamily: "'Instrument Sans', sans-serif", }}>
                        Our <Box component="span" sx={{ color: "text.secondary", fontFamily: "'Instrument Sans', sans-serif", }}>
                            Pricing
                        </Box>
                    </Typography>
                    <Typography sx={{ py: 2, fontSize: { xs: "16px", sm: "17px", md: "18px" }, fontWeight: 400, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }} color="text.primary">
                        Customised pricing options best suitable for your needs
                    </Typography>
                </Grid>
                <Grid size={12}>
                    <Grid container spacing={3}>
                        {pricing.map((item, i) => (
                            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i} sx={{ display: "flex" }}>
                                <Card
                                    sx={{
                                        width: "100%",
                                        border: 1,
                                        borderColor: "divider",
                                        borderRadius: 4,
                                        transition: "0.3s",
                                        "&:hover": {
                                            borderColor: "text.grey"
                                        },
                                    }}
                                >
                                    <CardContent sx={{
                                        width: "100%",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between", p: 1,
                                    }}>
                                        <Box sx={{ px: 2, background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)", }}>
                                            <Typography fontWeight={500} color="text.black" sx={{ py: 1, fontSize: { xs: "24px", sm: "26px", md: "28px" }, fontStyle: "Medium", fontFamily: "Inter, sans-serif" }} >
                                                {item.title}
                                            </Typography>
                                            <Typography sx={{ py: 1, fontWeight: 400, fontSize: { xs: "16px", sm: "17px", md: "18px" }, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }} color="text.primary">
                                                {item.duration}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ px: 2 }}>
                                            {item.details.split(",").map((point, idx) => (
                                                <Box
                                                    key={idx}
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        py: 0.6,
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            width: 18,
                                                            height: 18,
                                                            borderRadius: "50%",
                                                            backgroundColor: "text.secondary",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <ArrowForwardIosIcon
                                                            sx={{ fontSize: 10, color: "secondary.contrastText" }}
                                                        />
                                                    </Box>

                                                    <Typography sx={{ py: 1, fontWeight: 400, fontSize: { xs: "16px", sm: "17px", md: "18px" }, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }} color="text.primary">
                                                        {point.trim()}
                                                    </Typography>
                                                </Box>
                                            ))}

                                            <Typography
                                                fontWeight={700}
                                                color="text.black"
                                                sx={{ mt: 1, fontSize: { xs: "24px", sm: "26px", md: "28px" }, fontStyle: "Bold", fontWeight: 700, fontFamily: "Inter, sans-serif" }}
                                            >
                                                {item.pricing}
                                            </Typography>

                                            <Button
                                                component={Link}
                                                href="/contact"
                                                variant="contained"
                                                sx={{
                                                    border: 1,
                                                    borderColor: "secondary.main",
                                                    borderRadius: 6,
                                                    mt: 2,
                                                    px: 3,
                                                    py: 1.4,
                                                    fontWeight: 600,
                                                    fontFamily: "'IBM Plex Mono', monospace",
                                                    backgroundColor: "background.paper",
                                                    color: "text.primary",
                                                    boxShadow: "none",
                                                    "&:hover": {
                                                        boxShadow: "none",
                                                        backgroundColor: "primary.contrastText",
                                                        color: "text.primary",
                                                    },
                                                }}
                                            >
                                                Schedule Call
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Box >
    );
}

export default PricingSection;
