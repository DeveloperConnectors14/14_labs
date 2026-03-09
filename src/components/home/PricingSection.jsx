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
                    <Typography variant="h4" fontWeight={600}>
                        Our <Box component="span" sx={{ color: "primary.main" }}>
                            Pricing
                        </Box>
                    </Typography>
                    <Typography sx={{ py: 2 }} color="text.secondary">
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
                                    <CardContent sx={{ flexGrow: 1, p: 1 }}>
                                        <Box sx={{ px: 2, background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)", }}>
                                            <Typography variant="h6" fontWeight={700} color="black" sx={{ py: 1 }} >
                                                {item.title}
                                            </Typography>
                                            <Typography sx={{ py: 1 }} color="text.secondary">
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
                                                            backgroundColor: "primary.main",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <ArrowForwardIosIcon
                                                            sx={{ fontSize: 10, color: "#fff" }}
                                                        />
                                                    </Box>

                                                    <Typography color="text.secondary">
                                                        {point.trim()}
                                                    </Typography>
                                                </Box>
                                            ))}

                                            <Typography
                                                variant="h6"
                                                fontWeight={700}
                                                color="black"
                                                sx={{ mt: 1 }}
                                            >
                                                {item.pricing}
                                            </Typography>

                                            <Button
                                                component={Link}
                                                href="/contact"
                                                variant="contained"
                                                sx={{
                                                    border: 1,
                                                    borderColor: "primary.main",
                                                    borderRadius: 6,
                                                    mt: 2,
                                                    px: 3,
                                                    py: 1.4,
                                                    fontWeight: 600,
                                                    backgroundColor: "primary.contrastText",
                                                    color: "text.primary",
                                                    boxShadow: "none",
                                                    "&:hover": {
                                                        backgroundColor: "#f3f4f6",
                                                        boxShadow: "none",
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
