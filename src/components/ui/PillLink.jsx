import { Box } from "@mui/material";
import LinkBox from "@/components/ui/LinkBox";
import { titleCaseChild } from "@/services/titleCase";
import { color, motion, radius } from "@/theme/tokens";

const onDarkLine = `color-mix(in srgb, ${color.onBlack} 34%, transparent)`;

/**
 * The site's one button shape: a pill. Its label is title-cased.
 *
 *   primary         the main action — navy in the light theme, white in dark
 *   outline         the secondary action on the page ground
 *   inverse         the main action on a black card or the closing band
 *   inverseOutline  the secondary action there
 *
 * One primary per view. Everything else is outline, so the eye always has one
 * obvious place to go.
 */
const VARIANTS = {
  primary: {
    base: { backgroundColor: color.primary, color: color.onPrimary, borderColor: color.primary },
    hover: { backgroundColor: color.primaryHover, borderColor: color.primaryHover },
  },
  outline: {
    base: { backgroundColor: "transparent", color: color.ink, borderColor: color.ruleStrong },
    hover: { backgroundColor: color.surfaceAlt },
  },
  inverse: {
    base: { backgroundColor: color.onBlack, color: color.black, borderColor: color.onBlack },
    hover: {
      backgroundColor: `color-mix(in srgb, ${color.onBlack} 86%, transparent)`,
      borderColor: "transparent",
    },
  },
  inverseOutline: {
    base: { backgroundColor: "transparent", color: color.onBlack, borderColor: onDarkLine },
    hover: { backgroundColor: `color-mix(in srgb, ${color.onBlack} 10%, transparent)` },
  },
};

const SIZES = {
  sm: { height: 40, px: 2.25, fontSize: "0.875rem" },
  md: { height: 46, px: 2.75, fontSize: "0.9375rem" },
  lg: { height: 54, px: 3.5, fontSize: "1rem" },
};

function PillLink({ href, variant = "primary", size = "md", children, sx, ...rest }) {
  const v = VARIANTS[variant] ?? VARIANTS.primary;
  const s = SIZES[size] ?? SIZES.md;
  const label = titleCaseChild(children);

  const style = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    height: s.height,
    px: s.px,
    borderRadius: radius.pill,
    border: "1px solid",
    ...v.base,
    fontSize: s.fontSize,
    fontWeight: 500,
    lineHeight: 1,
    letterSpacing: "-0.005em",
    textDecoration: "none",
    whiteSpace: "nowrap",
    transition: `background-color ${motion.fast}, border-color ${motion.fast}, color ${motion.fast}`,
    "&:hover": v.hover,
    ...sx,
  };

  // Mail, phone and off-site links are plain anchors; everything else goes
  // through the router.
  if (/^(https?:|mailto:|tel:)/.test(href)) {
    const offsite = href.startsWith("http");
    return (
      <Box
        component="a"
        href={href}
        target={offsite ? "_blank" : undefined}
        rel={offsite ? "noopener noreferrer" : undefined}
        sx={style}
        {...rest}
      >
        {label}
      </Box>
    );
  }

  return (
    <LinkBox href={href} sx={style} {...rest}>
      {label}
    </LinkBox>
  );
}

export default PillLink;
