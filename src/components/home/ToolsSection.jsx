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
            <Typography variant="h4" fontWeight={600}>
              Tools & <Box component="span" sx={{ color: "primary.main" }}>
                technologies
              </Box>
            </Typography>
          </Box>
          <Typography sx={{ py: 2 }} color="text.secondary">
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
              backgroundColor: "primary.contrastText",
              color: "black",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#f3f4f6",
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
              backgroundColor: "primary.contrastText",
              color: "black",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#f3f4f6",
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
              backgroundColor: "primary.contrastText",
              color: "black",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#f3f4f6",
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
              fontWeight: 600,
              border: 1,
              borderColor: "divider",
              backgroundColor: "primary.contrastText",
              color: "black",
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#f3f4f6",
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