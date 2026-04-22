import { Box, Card, CardContent, Divider, Grid, Typography } from "@mui/material";
import { SECTION_PX, SECTION_PY, CARD_RADIUS } from "@/theme/tokens";


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
                                    <Card
                                        sx={{
                                            flex: 1,
                                            border: 1,
                                            borderColor: "divider",
                                            borderRadius: CARD_RADIUS,
                                            display: "flex",
                                            flexDirection: "column",
                                            position: "relative",
                                            minHeight: 250,
                                            transition: "all 0.4s ease",
                                            "&:hover": {
                                                backgroundImage: 'url("/media/service1.png")',
                                                backgroundPosition: "center",
                                                backgroundSize: "cover",
                                                backgroundRepeat: "no-repeat",
                                                "& .cardContent::before": {
                                                    opacity: 1,
                                                },
                                                "& .sNo": {
                                                    color: "primary.contrastText",
                                                },
                                                "& .hidden": {
                                                    opacity: 1,
                                                    maxHeight: "500px",
                                                },
                                                "& .heading": {
                                                    color: "secondary.contrastText",
                                                }
                                            },
                                            "@media (max-width: 1023.95px)": {
                                                backgroundImage: 'url("/media/service1.png")',
                                                backgroundPosition: "center",
                                                backgroundSize: "cover",
                                                backgroundRepeat: "no-repeat",
                                                "& .cardContent::before": {
                                                    opacity: 1,
                                                },
                                                "& .sNo": {
                                                    color: "primary.contrastText",
                                                },
                                                "& .hidden": {
                                                    opacity: 1,
                                                    maxHeight: "500px",
                                                },
                                                "& .heading": {
                                                    color: "secondary.contrastText",
                                                },
                                            },
                                        }}
                                    >
                                        <CardContent
                                            className="cardContent"
                                            sx={{
                                                position: "relative",
                                                flexGrow: 1,
                                                zIndex: 0,
                                                display: "flex",
                                                flexDirection: "column",
                                                justifyContent: "space-between",
                                                transition: "background 0.4s ease",
                                                "&::before": {
                                                    content: '""',
                                                    position: "absolute",
                                                    inset: 0,
                                                    background:
                                                        "linear-gradient(90deg, #016b64bb, #054c64c5, #063864cb, #02185abb)",
                                                    opacity: 0,
                                                    transition: "opacity 0.4s ease",
                                                }
                                            }}
                                        >
                                            <Box sx={{
                                                flexGrow: 1,
                                                zIndex: 1,
                                                display: "flex",
                                                flexDirection: "column",
                                                gap: 2,
                                                transition: "background 0.4s ease",
                                            }}>
                                                <Box>
                                                    <Typography
                                                        className="sNo"
                                                        variant="caption"
                                                        color="text.grey"
                                                        sx={{ py: 0.5, display: "block" }}
                                                    >
                                                        {challange.sNo}
                                                    </Typography>
                                                    <Divider />
                                                </Box>
                                                <Box className="detailBox">
                                                    {challange.title ? (
                                                        <>
                                                            <Typography
                                                                className="heading"
                                                                variant="h3"
                                                                sx={{ color: "text.black" }}
                                                            >
                                                                {challange.title}
                                                            </Typography>
                                                            <Box className="hidden" sx={{
                                                                opacity: 0,
                                                                maxHeight: 0,
                                                                overflow: "hidden",
                                                                transition: "all 0.4s ease",
                                                            }} >
                                                                <Typography
                                                                    variant="body2"
                                                                    color="primary.contrastText"
                                                                    sx={{ py: 1 }}
                                                                >
                                                                    {challange.desc}
                                                                </Typography>
                                                            </Box>
                                                        </>
                                                    ) : (
                                                        <Typography
                                                            className="heading"
                                                            variant="h3"
                                                            sx={{ color: "text.black" }}
                                                        >
                                                            {challange.desc}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </Box>
                                        </CardContent>
                                    </Card>
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