"use client";

import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Box, Typography, Paper, Grid, IconButton } from "@mui/material";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";

const stories = [
  {
    name: "John Doe – CEO IBM",
    text: `Working with 14labs has been a game-changer for our business.
    Their customized AI solutions have not only streamlined our operations
    but have also helped us gain valuable insights from our data.`,
    image: "/media/person.png",
  },
  {
    name: "Sarah Khan – CTO TechCorp",
    text: `The AI automation provided by the team improved our productivity
    drastically. Their support and innovation are exceptional.`,
    image: "/media/person.png",
  },
  {
    name: "Ali Ahmed – Founder StartupX",
    text: `Their AI-driven analytics helped us understand our customers
    better and scale our product faster.`,
    image: "/media/person.png",
  },
];

function SuccessStories() {
  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Typography variant="h4" fontWeight={600} sx={{ color: "primary.main" }}>
            Success{" "}
            <Box component="span" sx={{ color: "secondary.main" }}>
              Stories
            </Box>
          </Typography>

          <Typography sx={{ py: 2 }} color="primary.main">
            Discover how our customized AI solutions have made a significant
            impact on businesses through our case studies.
          </Typography>
        </Grid>

        <Grid
          size={{ xs: 12, md: 7 }}
          sx={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton className="prev-btn" sx={{ border: 1 }}>
              <ArrowBack sx={{
                transition: 'all 0.3s ease',
                "&:hover": {
                  color: "secondary.main",
                },
              }} />
            </IconButton>

            <IconButton className="next-btn" sx={{ border: 1 }}>
              <ArrowForward sx={{
                transition: 'all 0.3s ease',
                "&:hover": {
                  color: "secondary.main",
                },
              }} />
            </IconButton>
          </Box>
        </Grid>
      </Grid>

      {/* Slider */}

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".prev-btn",
          nextEl: ".next-btn",
        }}
        spaceBetween={20}
        slidesPerView={1}
      >
        {stories.map((story, index) => (
          <SwiperSlide key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 5,
                border: 1,
                borderColor: "divider",
                borderRadius: 4,
                background:
                  "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)",
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 4,
                alignItems: "center",
                mt: 3,
              }}
            >
              <Box>
                <Image
                  src={story.image}
                  alt="person"
                  width={120}
                  height={120}
                  style={{
                    objectFit: "contain",
                    borderRadius: 4,
                  }}
                />
              </Box>

              <Box>
                <Typography sx={{ color: "text.black" }} mb={2}>
                  "{story.text}"
                </Typography>

                <Typography sx={{ color: "text.black" }} fontWeight={600}>
                  {story.name}
                </Typography>
              </Box>
            </Paper>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

export default SuccessStories;