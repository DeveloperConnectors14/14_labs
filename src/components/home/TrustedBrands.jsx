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
                py: 6,
                textAlign: "center",
            }}
        >
            <Typography
                sx={{
                    mb: 4,
                    fontWeight: 500,
                    letterSpacing: 1,
                    color: "text.secondary",
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
                    gap: { xs: 4, md: 7 },
                }}
            >
                {brandImages.map((item, index) => (
                    <Box key={index} sx={{
                        backgroundColor: "background.paper",
                        p: 3,
                        border: 1,
                        borderColor: "divider",
                        borderRadius: 3
                    }}>
                        <Image
                            src={`/media/${item.fileName}`}
                            alt={`Brand ${item.fileName}`}
                            width={120}
                            height={25}
                            style={{
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
