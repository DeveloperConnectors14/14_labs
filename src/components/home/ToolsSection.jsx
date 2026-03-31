"use client";
import {
  Box,
  Typography,
  Grid,
  Button,
} from "@mui/material";
import Image from "next/image";

const tools = [
  "tool1.png",
  "tool2.png",
  "tool3.png",
  "tool4.png",
  "tool5.png",
  "tool5.png",
];

function handleFilter() {

  console.log("handleFilter function is called!")
}

function ToolsSection() {
  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Grid container spacing={2}>
        <Grid size={12}>
          <Box>
            <Typography fontWeight={600} sx={{ color: "text.primary", fontSize: { xs: "26px", sm: "32px", md: "40px" }, fontStyle: "semiBold", fontFamily: "'Instrument Sans', sans-serif", }}>
              Tools & <Box component="span" sx={{ color: "text.secondary", fontFamily: "'Instrument Sans', sans-serif", }}>
                technologies
              </Box>
            </Typography>
          </Box>
          <Typography sx={{ py: 2, fontSize: { xs: "16px", sm: "17px", md: "18px" }, fontWeight: 400, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }} color="text.primary">
            We will be using the best tools and technologies to deliver results.
          </Typography>
        </Grid>

        <Grid size={12} sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 2,
          pb: 2
        }}>
          <Button
            variant="contained"
            onClick={() => handleFilter()}
            sx={{
              borderRadius: 2,
              px: 2,
              py: 1,
              border: 1,
              borderColor: "divider",
              fontWeight: 600,
              fontFamily: "'IBM Plex Mono', monospace",
              backgroundColor: "background.paper",
              color: "text.black",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "primary.contrastText",
                boxShadow: "none",
              },
            }}
          >
            AI & LLMs
          </Button>
          <Button
            variant="contained"
            onClick={() => handleFilter()}
            sx={{
              borderRadius: 2,
              px: 2,
              py: 1,
              border: 1,
              borderColor: "divider",
              fontWeight: 600,
              fontFamily: "'IBM Plex Mono', monospace",
              backgroundColor: "background.paper",
              color: "text.black",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "primary.contrastText",
                boxShadow: "none",
              },
            }}
          >
            BACKEND
          </Button>
          <Button
            variant="contained"
            onClick={() => handleFilter()}
            sx={{
              borderRadius: 2,
              px: 2,
              py: 1,
              border: 1,
              borderColor: "divider",
              fontWeight: 600,
              backgroundColor: "background.paper",
              color: "text.black",
              fontFamily: "'IBM Plex Mono', monospace",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "primary.contrastText",
                boxShadow: "none",
              },
            }}
          >
            FRONTEND
          </Button>
          <Button
            variant="contained"
            onClick={() => handleFilter()}
            sx={{
              borderRadius: 2,
              px: 2,
              py: 1,
              border: 1,
              borderColor: "divider",
              fontWeight: 600,
              fontFamily: "'IBM Plex Mono', monospace",
              backgroundColor: "background.paper",
              color: "text.black",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "primary.contrastText",
                boxShadow: "none",
              },
            }}
          >
            CLOUD
          </Button>
        </Grid>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 2,
          }}
        >
          {tools.map((item, index) => (
            <Box key={index} sx={{
              width: { xs: 80, sm: 80, md: 120 },
              backgroundColor: "background.paper",
              p: 1,
              border: 1,
              borderColor: "divider",
              borderRadius: 3
            }}>
              <Image
                src={`/media/${item}`}
                alt={item}
                width={120}
                height={45}
                style={{
                  width: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          ))}
        </Box>
      </Grid>
    </Box>
  );
}


export default ToolsSection;