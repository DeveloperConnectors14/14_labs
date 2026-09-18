import { Box, Container } from "@mui/material";
import { color, layout, radius } from "@/theme/tokens";

const BANDS = {
  ground: { backgroundColor: color.ground, color: color.ink },
  surface: { backgroundColor: color.surface, color: color.ink },
  alt: { backgroundColor: color.surfaceAlt, color: color.ink },
  // The lightest step of the grey ramp. Reads as a surface rather than as a
  // colour, which is the point: it separates two adjacent white slabs without
  // spending a strong tone on the page.
  tint: { backgroundColor: color.grey05, color: color.ink },
  // A pale indigo wash. Text on it is the ordinary ink, so anything written
  // for the ground works here as is.
  soft: { backgroundColor: color.soft, color: color.ink },
  // Solid indigo. The primary — keep it to the closing band and the odd tile.
  deep: { backgroundColor: color.deep, color: color.onDeep },
  black: { backgroundColor: color.black, color: color.onBlack },
  deepAlt: { backgroundColor: color.deepAlt, color: color.onDeep },
};

/**
 * The only vertical-rhythm primitive on the site, so spacing, max-width and
 * gutters can never drift apart between pages.
 *
 * Spacing model: a plain section contributes a HALF gap above and below, so two
 * stacked sections produce one full gap between them. An inset section keeps
 * that half gap on the outside and adds its own generous padding inside the
 * slab, because the slab is an enclosure rather than a stretch of page.
 *
 * `inset` floats the band as a rounded slab on the grey ground instead of
 * running it edge to edge — the move that gives the page card-like structure
 * rather than a flat run of full-width strips.
 */
function Section({
  id,
  band = "ground",
  tight = false,
  inset = false,
  divider = false,
  children,
  sx,
  containerSx,
  ...rest
}) {
  const tones = BANDS[band] ?? BANDS.ground;
  const onDark = band === "deep" || band === "deepAlt" || band === "black";
  const gap = tight ? layout.gapYTight : layout.gapY;
  // A section with an id can be jumped to from elsewhere, and the nav is
  // sticky: leave it room so the top of the section is not underneath it.
  const anchor = id ? { scrollMarginTop: `${layout.navHeight.md + 16}px` } : null;

  if (!inset) {
    return (
      <Box
        id={id}
        component="section"
        sx={{
          ...tones,
          ...anchor,
          paddingBlock: gap,
          borderTop: divider ? "1px solid" : 0,
          borderColor: band === "black" ? color.ruleOnBlack : onDark ? color.ruleOnDeep : color.rule,
          ...sx,
        }}
        {...rest}
      >
        <Container sx={containerSx}>{children}</Container>
      </Box>
    );
  }

  return (
    <Box
      id={id}
      component="section"
      sx={{
        backgroundColor: color.ground,
        ...anchor,
        paddingBlock: gap,
        paddingInline: layout.gutter,
      }}
      {...rest}
    >
      <Box
        sx={{
          ...tones,
          borderRadius: { xs: radius.lg, md: radius.xl },
          paddingBlock: layout.slabY,
          overflow: "hidden",
          ...sx,
        }}
      >
        <Container sx={containerSx}>{children}</Container>
      </Box>
    </Box>
  );
}

export default Section;
