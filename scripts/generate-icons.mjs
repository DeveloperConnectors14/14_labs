// Regenerates every brand raster from the committed vector sources.
// Run with: node scripts/generate-icons.mjs
import sharp from "sharp";
import { readFileSync, writeFileSync } from "fs";

const MARK = readFileSync("public/logo-14.png");       // canonical square "14" mark
const WORDMARK = readFileSync("public/media/logo.svg"); // "14Labs" lockup
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };

// Trim to the glyph's own bounds so the margins below are ours, not whatever
// padding the source file happened to ship with.
const glyph = await sharp(MARK).trim().png().toBuffer();

async function square(size, background, padRatio) {
  const inner = Math.round(size * (1 - padRatio * 2));
  const scaled = await sharp(glyph).resize(inner, inner, { fit: "inside" }).png().toBuffer();
  return sharp({ create: { width: size, height: size, channels: 4, background } })
    .composite([{ input: scaled, gravity: "center" }])
    .png()
    .toBuffer();
}

// ICO container holding PNG payloads — understood by every modern browser and by
// Google's favicon crawler, which looks for /favicon.ico specifically.
function buildIco(buffers, sizes) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(buffers.length, 4);

  let offset = 6 + buffers.length * 16;
  const entries = buffers.map((buf, i) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], 0);
    e.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(buf.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += buf.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...buffers]);
}

const icoSizes = [16, 32, 48];
const icoPngs = await Promise.all(icoSizes.map((s) => square(s, CLEAR, 0.08)));
writeFileSync("public/favicon.ico", buildIco(icoPngs, icoSizes));

// Apple wants an opaque icon — a transparent one renders on black in iOS.
writeFileSync("public/apple-icon.png", await square(180, WHITE, 0.14));

// schema.org Organization.logo — the real 14Labs logo is the wordmark, so that is
// what Google gets. The square "14" mark is favicon-only by design decision.
const logoWordmark = await sharp(WORDMARK, { density: 2400 }).resize({ width: 1000 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 480, channels: 4, background: WHITE } })
  .composite([{ input: logoWordmark, gravity: "center" }])
  .png()
  .toFile("public/logo.png");

// Social card. Wordmark only: the positioning copy is still in flux and baking a
// tagline in here would strand it at a URL that caches for weeks.
const wordmark = await sharp(WORDMARK, { density: 2400 }).resize({ width: 560 }).png().toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: WHITE } })
  .composite([{ input: wordmark, gravity: "center" }])
  .png()
  .toFile("public/og.png");

console.log("wrote favicon.ico, apple-icon.png, logo.png, og.png");
