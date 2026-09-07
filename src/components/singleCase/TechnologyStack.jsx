import Image from "next/image";
import { Box, Typography } from "@mui/material";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import { color, motion, radius } from "@/theme/tokens";

/**
 * The stack, grouped the way an engineer would ask about it: what runs it, what
 * stores it, what orchestrates it, what does the thinking.
 *
 * On the deep band, because vendor marks are the one place on the site where
 * foreign colour is unavoidable — against dark green they read as logos rather
 * than as a rash of colour on grey.
 */
function TechnologyStack({ technologies }) {
  if (!technologies?.stacks?.length) return null;

  return (
    <Section band="deep">
      <SectionHead
        split
        onDeep
        eyebrow={technologies.label}
        title={technologies.title}
        lede={technologies.text}
      />

      <Box
        sx={{
          mt: { xs: 5, md: 8 },
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" },
          gap: { xs: 1.5, md: 2 },
        }}
      >
        {technologies.stacks.map((group) => (
          <Box
            key={group.techType}
            sx={{
              backgroundColor: color.deepAlt,
              border: "1px solid",
              borderColor: color.ruleOnDeep,
              borderRadius: radius.lg,
              p: { xs: 2.5, md: 3 },
            }}
          >
            <Typography variant="eyebrow" sx={{ color: color.lime }}>
              {group.techType}
            </Typography>

            <Box
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {group.values.map((tech) => (
                <Box
                  key={`${group.techType}-${tech.name}`}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.75,
                    py: 1.25,
                    px: 1.5,
                    borderRadius: radius.md,
                    transition: `background-color ${motion.fast}`,
                    "&:hover": { backgroundColor: color.deep },
                  }}
                >
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      flexShrink: 0,
                      borderRadius: radius.sm,
                      backgroundColor: color.onDeep,
                      display: "grid",
                      placeItems: "center",
                      // The marks are supplied as their own brand colours on
                      // transparent, so each one gets a light chip to sit on
                      // rather than being recoloured.
                      p: "5px",
                    }}
                  >
                    <Image
                      src={`/media/tech_stacks/${tech.file}.svg`}
                      alt=""
                      width={20}
                      height={20}
                      style={{ width: "100%", height: "auto" }}
                    />
                  </Box>

                  <Typography sx={{ fontSize: "0.9375rem", color: color.onDeep }}>
                    {tech.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        ))}
      </Box>
    </Section>
  );
}

export default TechnologyStack;
