import { getChallanges } from "@/services/dataService";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import Image from "next/image";

const challenges = getChallanges();

function ChallengesSection() {
  return (
    <Box sx={{ px: 4, py: 6 }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Box>
            <Typography fontWeight={600} sx={{ color: "text.primary", fontSize: { xs: "26px", sm: "32px", md: "40px" }, fontStyle: "semiBold", fontFamily: "'Instrument Sans', sans-serif", }}>
              Challenges we <Box component="span" sx={{ color: "text.secondary", fontFamily: "'Instrument Sans', sans-serif", }}>
                can overcome
              </Box>
            </Typography>
          </Box>
          <Typography sx={{ py: 2, fontSize: { xs: "16px", sm: "17px", md: "18px" }, fontWeight: 400, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }} color="text.primary">
            We turn these challenges into intelligent, practicle solutions.
          </Typography>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
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
                      <Typography fontWeight={"700"} sx={{ fontSize: { xs: "20px", sm: "22px", md: "24px" }, fontStyle: "Bold", fontFamily: "'Instrument Sans', sans-serif", }}>
                        {item.title}
                      </Typography>
                      <Typography fontWeight={"400"} color="text.grey" sx={{ py: 1, fontSize: { xs: "14px", sm: "15px", md: "16px" }, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }}>
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