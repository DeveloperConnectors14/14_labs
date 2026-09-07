/**
 * The readout a figure shows when you hover one of its marks.
 *
 * Visibility is CSS, not state: the tip lives inside a `.fx-hot` group and
 * globals.css reveals it on hover and on keyboard focus. That keeps every
 * figure a server component — a chart that has to ship a React runtime to tell
 * you what a bar is worth is a bad trade.
 *
 * The box is sized from the character count because SVG cannot size a rect to
 * its own text without measuring, and the labels are mono, where that estimate
 * is exact enough to look deliberate. `x` is clamped so a tip on the last mark
 * in a row is not half outside the viewBox.
 */
function Tip({ x, y, w: width, text, p, above = true }) {
  const w = text.length * 6.1 + 16;
  const h = 19;
  const cx = Math.min(Math.max(x, w / 2 + 2), width - w / 2 - 2);
  const cy = above ? y - 16 : y + 16;

  return (
    <g className="fx-tip">
      <rect
        x={cx - w / 2}
        y={cy - h / 2}
        width={w}
        height={h}
        rx="4"
        fill={p.labelStrong}
      />
      <text
        x={cx}
        y={cy + 3.9}
        textAnchor="middle"
        fontSize="11"
        fontFamily="var(--font-mono)"
        letterSpacing="0.03em"
        fill={p.onHighlight}
      >
        {text}
      </text>
    </g>
  );
}

export default Tip;
