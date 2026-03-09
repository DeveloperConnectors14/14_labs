"use client";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import {
  Box,
  Typography,
  Paper,
  Grid,
  IconButton,
} from "@mui/material";
import Image from "next/image";

function handleCrouserl() {
  console.log("handleCrouserl is clicked!")
}

function SuccessStories() {
  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box>
            <Typography variant="h4" fontWeight={600}>
              Success <Box component="span" sx={{ color: "primary.main" }}>
                Stories
              </Box>
            </Typography>
          </Box>
          <Typography sx={{ py: 2 }} color="text.secondary">
            Discover how our customized AI solutions have made a significant impact on
            businesses within these industries through our detailed case studies.
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }} sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", px: 2 }}>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              onClick={() => handleCrouserl()}
              sx={{ border: 1 }}
            >
              <ArrowBack />
            </IconButton>
            <IconButton
              onClick={() => handleCrouserl()}
              sx={{ border: 1 }}
            >
              <ArrowForward />
            </IconButton>
          </Box>
        </Grid>
        <Paper
          elevation={0}
          sx={{
            p: 5,
            border: 1,
            borderColor: "divider",
            borderRadius: 4,
            background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)",
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 4,
            alignItems: "center",
          }}
        >
          <Box>
            <Image
              src="/media/person.png"
              alt="person.png"
              width={120}
              height={120}
              style={{
                objectFit: "contain",
                borderRadius: 4,
              }}
            />
          </Box>
          <Box>
            <Typography sx={{ color: "black" }} mb={2}>
              "Working with 14labs has been a game-changer for our business.
              Their customized AI solutions hvae not only streamlined our operations but have also helped us gain valuable insights from our data. This team truly understands our needs and goes above and beyond to deliver results."
            </Typography>

            <Typography sx={{ color: "black" }} fontWeight={600}>
              John Doe – CEO IBM
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Box>
  );
}


export default SuccessStories;