import { Box, Card, Grid, IconButton, Typography } from "@mui/material";
import SchoolIcon from "@mui/icons-material/School";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import LanguageIcon from "@mui/icons-material/Language";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import Image from "next/image";
import { getTeam } from "@/services/dataService";
import { SECTION_PX, SECTION_PY, CARD_RADIUS, NAV_SCROLL_MARGIN } from "@/theme/tokens";

const linkTypes = {
  scholar: { label: "Google Scholar", Icon: SchoolIcon },
  linkedin: { label: "LinkedIn", Icon: LinkedInIcon },
  github: { label: "GitHub", Icon: GitHubIcon },
  portfolio: { label: "portfolio", Icon: LanguageIcon },
  email: { label: "email", Icon: MailOutlineIcon },
};

const team = getTeam();

function ResearchTeam() {
  return (
    <Box component="section" id="team" sx={{ px: SECTION_PX, py: SECTION_PY, scrollMarginTop: NAV_SCROLL_MARGIN }}>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography variant="h2" sx={{ color: "text.primary" }}>
            Research <Box component="span" sx={{ color: "text.secondary" }}>
              team
            </Box>
          </Typography>
          <Typography variant="body1" sx={{ py: 2 }} color="text.primary">
            Our researchers have co-authored work with DFKI (the German Research Center for Artificial Intelligence) and the Al-Khwarizmi Institute of Computer Science (KICS), UET Lahore.
          </Typography>
        </Grid>

        <Grid size={12}>
          <Grid container spacing={3}>
            {team.map((member) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={member.name} sx={{ display: "flex" }}>
                <Card
                  component="article"
                  sx={{
                    width: "100%",
                    p: 3,
                    border: 1,
                    borderColor: "divider",
                    borderRadius: CARD_RADIUS,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                  }}
                >
                  <Image
                    src={`/media/${member.photo}`}
                    alt={`Portrait of ${member.name}`}
                    width={96}
                    height={96}
                    style={{ borderRadius: "50%", objectFit: "cover" }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h3" sx={{ color: "text.black" }}>
                      {member.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ pt: 0.5 }}>
                      {member.role}
                    </Typography>
                    <Typography variant="body2" color="text.grey" sx={{ pt: 1 }}>
                      {member.bio}
                    </Typography>
                    <Typography variant="caption" color="text.grey" sx={{ display: "block", pt: 1 }}>
                      {member.education}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {member.links.map(({ type, url }) => {
                      const { label, Icon } = linkTypes[type];
                      // mailto: links open the mail client, so they stay in the same tab.
                      const isEmail = type === "email";
                      return (
                        <IconButton
                          key={type}
                          component="a"
                          href={url}
                          {...(!isEmail && { target: "_blank", rel: "noopener noreferrer" })}
                          aria-label={isEmail ? `Email ${member.name}` : `${member.name} on ${label} (opens in new tab)`}
                          sx={{ border: 1, color: "text.primary", "&:hover": { color: "secondary.main" } }}
                        >
                          <Icon fontSize="small" />
                        </IconButton>
                      );
                    })}
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ResearchTeam;
