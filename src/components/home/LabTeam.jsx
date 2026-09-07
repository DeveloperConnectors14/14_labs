import Image from "next/image";
import { Box, Typography } from "@mui/material";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import ActionLink from "@/components/ui/ActionLink";
import { getTeam } from "@/services/dataService";
import { color, font, motion, radius } from "@/theme/tokens";

const team = getTeam();

// The tile tones walk down the green ramp so a row of monograms reads as one
// designed object rather than four identical grey squares.
const TILE_TONES = [color.green20, color.green30, color.green20, color.green30];

const initials = (name) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

/**
 * Who is actually on the engagement.
 *
 * Every card handles the no-photograph case as a first-class state: a monogram
 * on a green tile. That is not a placeholder waiting to be embarrassing — it is
 * what the card looks like until a headshot exists, and photographs can land one
 * at a time without the row ever going half-broken.
 */
function LabTeam() {
  return (
    <Section id="team" band="tint" inset>
      <SectionHead
        split
        eyebrow="The people"
        title="You work with the engineers, not an account layer"
        lede="Small team by design. The person who writes the evaluation harness is the person who explains the number to you."
        action={<ActionLink href="/about-us">About the practice</ActionLink>}
      />

      <Box
        sx={{
          mt: { xs: 5, md: 8 },
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            md: `repeat(${Math.min(team.length, 4)}, 1fr)`,
          },
          gap: { xs: 2, md: 2.5 },
        }}
      >
        {team.map((person, i) => (
          <Box key={person.name} sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              sx={{
                position: "relative",
                aspectRatio: "4 / 5",
                borderRadius: radius.lg,
                overflow: "hidden",
                backgroundColor: TILE_TONES[i % TILE_TONES.length],
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: `background-color ${motion.base}`,
              }}
            >
              {person.photo ? (
                <Image
                  src={`/media/team/${person.photo}`}
                  alt={person.name}
                  fill
                  sizes="(max-width: 900px) 50vw, 25vw"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <Typography
                  aria-hidden
                  sx={{
                    fontFamily: font.display,
                    fontWeight: 200,
                    fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.05em",
                    color: color.accent,
                    opacity: 0.55,
                  }}
                >
                  {initials(person.name)}
                </Typography>
              )}
            </Box>

            <Typography
              variant="h4"
              sx={{ mt: 2.5, color: color.ink, letterSpacing: "-0.016em" }}
            >
              {person.name}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.5, color: color.inkMuted }}>
              {person.role}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                mt: 1.5,
                pt: 1.5,
                borderTop: "1px solid",
                borderColor: color.green20,
                color: color.inkFaint,
              }}
            >
              {person.focus}
            </Typography>
          </Box>
        ))}
      </Box>
    </Section>
  );
}

export default LabTeam;
