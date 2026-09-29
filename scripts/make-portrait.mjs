/**
 * Turns the studio portrait in public/profile.jpg into the cut-out used by the
 * site, writing public/profile.png.
 *
 * Two operations:
 *
 *   1. Crop above the waist.
 *   2. Key out the flat backdrop so the figure can sit on the Hero's lime
 *      panel. The backdrop is a uniform studio grey, so a threshold on the
 *      distance from that grey is enough — no matting model needed.
 *
 * The chroma gate is the part worth understanding. Skin sits close to a mid
 * grey in luminance, so a distance-only key eats holes in the face and beard.
 * Requiring a pixel to be near-grey *as well as* near the backdrop keeps
 * anything with colour, which is what protects the subject.
 *
 * Run with `npm run portrait`. If you swap in a new photo, check the reported
 * size and adjust CROP — everything else adapts on its own.
 */
import sharp from "sharp";

const SRC = "public/profile.jpg";
const OUT = "public/profile.png";

const source = sharp(SRC);
const meta = await source.metadata();
const { width: SW, height: SH } = meta;

// Above the waist. Measured against the current 570x1000 source: hair starts
// ~y=100, the crossed arms end ~y=790, the belt sits ~y=880. Stopping at 840
// keeps headroom above the hair and finishes just above the waist.
const CROP = { left: 0, top: 60, width: 570, height: 780 };

if (CROP.left + CROP.width > SW || CROP.top + CROP.height > SH) {
  throw new Error(
    `CROP ${CROP.width}x${CROP.height}+${CROP.left}+${CROP.top} does not fit the ` +
      `${SW}x${SH} source — update CROP in scripts/make-portrait.mjs.`,
  );
}

const D0 = 7, D1 = 18;   // backdrop-distance thresholds
const C0 = 5, C1 = 16;   // chroma thresholds — protects warm skin tones

const smoothstep = (e0, e1, x) => {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
};

const { data, info } = await sharp(SRC)
  .extract(CROP)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width: W, height: H, channels: C } = info;

// Backdrop colour: the median of the four corners, so a stray dark pixel in one
// corner cannot skew it.
const corner = (x, y) => {
  const i = (y * W + x) * C;
  return [data[i], data[i + 1], data[i + 2]];
};
const corners = [corner(1, 1), corner(W - 2, 1), corner(1, H - 2), corner(W - 2, H - 2)];
const median = (values) => values.slice().sort((a, b) => a - b)[values.length >> 1];
const BG = [0, 1, 2].map((c) => median(corners.map((p) => p[c])));

let cleared = 0;

for (let i = 0; i < data.length; i += C) {
  const r = data[i], g = data[i + 1], b = data[i + 2];

  const d = Math.max(Math.abs(r - BG[0]), Math.abs(g - BG[1]), Math.abs(b - BG[2]));
  const chroma = Math.max(r, g, b) - Math.min(r, g, b);

  // High where the pixel *is* backdrop — near the sampled grey and near-neutral.
  const bgness = (1 - smoothstep(D0, D1, d)) * (1 - smoothstep(C0, C1, chroma));

  const alpha = Math.round((1 - bgness) * 255);
  if (alpha < 8) cleared++;
  data[i + 3] = alpha;
}

await sharp(data, { raw: { width: W, height: H, channels: C } })
  .png({ compressionLevel: 9 })
  .toFile(OUT);

const pct = ((cleared / (W * H)) * 100).toFixed(1);
console.log(
  `wrote ${OUT}  ${W}x${H}  backdrop rgb(${BG.join(",")})  cleared ${pct}% of pixels`,
);
