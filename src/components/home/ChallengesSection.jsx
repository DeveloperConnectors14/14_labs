import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import Image from "next/image";

const challenges = [
  {
    icon: "challangeIcon1.png",
    title: "Too much manual work",
    desc: "Repetitive tasks aeting up your team's time",
  },
  {
    icon: "challangeIcon2.png",
    title: "Disconnected tools & messy data",
    desc: "Systems that don’t talk to each other",
  },
  {
    icon: "challangeIcon3.png",
    title: "AI feels complex and hard to apply",
    desc: "Unsure how to leverage AI for your business",
  },
  {
    icon: "challangeIcon4.png",
    title: "You need custom software, not generic tools",
    desc: "Off-the-shelf solutions don’t fit your workflow",
  },
];

function ChallengesSection() {
  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box>
            <Typography variant="h4" fontWeight={600}>
              Challenges we <Box component="span" sx={{ color: "primary.main" }}>
                can overcome
              </Box>
            </Typography>
          </Box>
          <Typography sx={{ py: 2 }} color="text.secondary">
            We turn these challenges into intelligent, practicle solutions.
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Grid container spacing={3}>
            {challenges.map((item, i) => (
              <Grid size={12} key={i}>
                <Card>
                  <CardContent sx={{
                    p: 2.5,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 3,
                    display: "flex",
                    gap: 3,
                    alignItems: "center",
                  }}>
                    <Box>
                      <Image
                        src={`/media/${item.icon}`}
                        alt={item.icon}
                        width={60}
                        height={60}
                        style={{
                          objectFit: "contain",
                          borderRadius: "100%",
                        }}
                      />
                    </Box>
                    <Box>
                      <Typography variant="h6" fontWeight={"bold"}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                        {item.desc}
                      </Typography>
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


export default ChallengesSection;