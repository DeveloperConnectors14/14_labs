import { Box, Typography } from "@mui/material";
import Image from "next/image";

function TrustedBrands() {

    const brandImages = [
        {
            fileName: "trustedBrand1.png",
        },
        {
            fileName: "trustedBrand2.png",
        },
        {
            fileName: "trustedBrand3.png",
        },
        {
            fileName: "trustedBrand4.png",
        },
        {
            fileName: "trustedBrand5.png",
        },
        {
            fileName: "trustedBrand6.png",
        },
    ]
    return (
        <Box
            sx={{
                py: 4,
                textAlign: "center",
            }}
        >
            <Typography
                sx={{
                    mb: 4,
                    fontWeight:400,
                    fontStyle:"Regular",
                    fontSize: { xs: 14, sm: 16, md: 16 },
                    fontFamily: "'IBM Plex Mono', monospace",
                    color: "text.grey",
                }}
            >
                TRUSTED BY LEADING BRANDS
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: { xs: 2, md: 1 },
                }}
            >
                {brandImages.map((item, index) => (
                    <Box key={index} sx={{
                        width: { xs: 80, sm: 140, md: 200 },
                        backgroundColor: "background.paper",
                        p: { xs: 1, sm: 2, md: 3 },
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 3
                    }}>
                        <Image
                            src={`/media/${item.fileName}`}
                            alt={`Brand ${item.fileName}`}
                            width={140}
                            height={40}
                            style={{
                                width: "100%",
                                objectFit: "contain",
                            }}
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
}

export default TrustedBrands;
