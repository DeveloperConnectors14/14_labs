import { getFeatures } from "@/services/dataService";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import Image from "next/image";

const features = getFeatures();

function WhyChooseUs() {
  return (
    <Box sx={{ px: 4, py: 6, background: "linear-gradient(90deg, #e3f5f2, #e3edf0, #e6e4ed, #e4e5ec)", }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography fontWeight={600} sx={{ color: "text.primary", fontSize: { xs: "26px", sm: "32px", md: "40px" }, fontStyle: "SemiBold", fontFamily: "'Instrument Sans', sans-serif", }}>
            What set us <Box component="span" sx={{ color: "text.secondary", fontFamily: "'Instrument Sans', sans-serif", }}>
              apart
            </Box>
          </Typography>
          <Typography sx={{ py: 2, fontSize: { xs: "16px", sm: "17px", md: "18px" }, fontWeight: 400, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }} color="text.primary">
            We differentiate ourselves from other AI service providers by:
          </Typography>
        </Grid>
        <Grid size={12}>
          <Grid container spacing={3}>
            {features.map((item, i) => (
              < Grid size={{ xs: 12, md: 4 }} key={i} sx={{ display: "flex" }}>
                <Card
                  sx={{
                    width: "100%",
                    border: 1,
                    borderColor: "divider",
                    borderRadius: 4,
                    px: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "0.3s",
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ mb: 3 }}>
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
                    <Typography fontWeight={"700"} sx={{ fontSize: { xs: "20px", sm: "22px", md: "24px" }, fontStyle: "Bold", fontFamily: "'Instrument Sans', sans-serif", }}>
                      {item.title}
                    </Typography>
                    <Typography fontWeight={"400"} color="text.grey" sx={{ py: 1, fontSize: { xs: "16px", sm: "17px", md: "18px" }, fontStyle: "Regular", fontFamily: "'Instrument Sans', sans-serif", }}>
                      {item.desc}
                    </Typography>
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

export default WhyChooseUs;
