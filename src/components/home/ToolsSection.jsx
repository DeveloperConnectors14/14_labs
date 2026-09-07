import Image from "next/image";
import { Box, Typography } from "@mui/material";
import Section from "@/components/ui/Section";
import SectionHead from "@/components/ui/SectionHead";
import { getTools } from "@/services/dataService";
import { color, motion, radius } from "@/theme/tokens";

const tools = getTools();

/**
 * Grouped rows rather than a filterable wall of tiles. A logo grid with its own
 * tab bar was more interface than the content justified — there are fourteen
 * items and no reason to hide any of them.
 */
function ToolsSection() {
  return (
    <Section band="surface" inset tight>
      <SectionHead
        split
        eyebrow="Stack"
        title="What we build on"
        lede="Chosen per problem, not per preference. We are model-agnostic by default and will say so when the cheaper option is the right one."
      />

      <Box sx={{ mt: { xs: 5, md: 8 } }}>
        {tools.map((group) => (
          <Box
            key={group.techType}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "200px 1fr" },
              gap: { xs: 2, md: 5 },
              alignItems: "center",
              paddingBlock: { xs: 3, md: 3.5 },
              borderTop: "1px solid",
              borderColor: color.rule,
            }}
          >
            <Typography variant="eyebrow" sx={{ color: color.inkFaint }}>
              {group.techType}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {group.values.map((tool) => (
                <Box
                  key={tool.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1.25,
                    backgroundColor: color.green05,
                    border: "1px solid",
                    borderColor: color.green20,
                    borderRadius: radius.pill,
                    pl: 1.5,
                    pr: 2.25,
                    py: 1,
                    transition: `background-color ${motion.base}, border-color ${motion.base}`,
                    "&:hover": {
                      backgroundColor: color.accentSoft,
                      borderColor: color.green45,
                    },
                    "&:hover .tool-mark": { opacity: 1, filter: "grayscale(0)" },
                    "&:hover .tool-name": { color: color.ink },
                  }}
                >
                  <Image
                    className="tool-mark"
                    src={`/media/tech_stacks/${tool.file}.svg`}
                    alt=""
                    width={20}
                    height={20}
                    style={{
                      height: 20,
                      width: "auto",
                      objectFit: "contain",
                      // Desaturated at rest so fourteen brand palettes do not
                      // fight the two-colour page.
                      filter: "grayscale(1)",
                      opacity: 0.65,
                      transition: `opacity ${motion.fast}, filter ${motion.fast}`,
                    }}
                  />
                  <Typography
                    className="tool-name"
                    variant="body2"
                    sx={{ color: color.inkMuted, transition: `color ${motion.fast}` }}
                  >
                    {tool.name}
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

export default ToolsSection;
