import Image from "next/image";

/**
 * Profile photo — a cut-out, waist-up portrait on a transparent background.
 *
 * public/profile.png is generated from the original studio shot: the flat grey
 * backdrop is keyed out and the frame cropped above the waist. The source of
 * truth is public/profile.jpg, which is kept so the cut-out can be regenerated.
 *
 * The image is deliberately bare: no frame, no background of its own. The Hero
 * paints the lime block behind it and anchors the bottom edge to the bottom of
 * the section, so the flat waist crop reads as the section's edge rather than
 * as a cut. Move the figure off that bottom edge and the crop becomes visible.
 *
 * `sizes` mirrors how the Hero actually sizes it — a share of the content
 * column above 1024px, a share of the viewport below that. If the Hero's
 * widths change, change these to match, or the browser picks a source that is
 * too small and the portrait renders soft.
 */
const PROFILE = {
  src: "/profile.png",
  alt: "Prince Kanswal",
  width: 570,
  height: 780,
};

export default function ProfileAvatar() {
  return (
    <Image
      src={PROFILE.src}
      alt={PROFILE.alt}
      width={PROFILE.width}
      height={PROFILE.height}
      sizes="(min-width: 1440px) 461px, (min-width: 1024px) 40vw, (min-width: 640px) 44vw, 56vw"
      // Largest above-the-fold image, so it is preloaded — the Next 16
      // replacement for the deprecated `priority` prop.
      preload
      className="relative block h-auto w-full"
    />
  );
}
