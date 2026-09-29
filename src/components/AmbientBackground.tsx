import Image from "next/image";
import { wallpaper } from "@/data/site";

/**
 * Fixed ambient wash behind the whole page.
 *
 * Every panel on the site is translucent, so the glass only reads as glass if
 * there is something behind it to blur. By default that something is three
 * soft radial gradients plus a fine grain.
 *
 * Set `wallpaper` in src/data/site.ts to a file in /public and an image layer
 * is added on top of the gradients, dimmed to a tint so the panels in front of
 * it stay the subject. Leave it null for the plain gradient wash.
 *
 * Purely decorative — hidden from assistive technology and non-interactive.
 */
export default function AmbientBackground() {
  return (
    <div aria-hidden="true" className="ambient">
      {wallpaper ? (
        <>
          <Image
            src={wallpaper.src}
            alt=""
            fill
            sizes="100vw"
            unoptimized={wallpaper.src.endsWith(".svg")}
            className="object-cover"
            style={{ opacity: wallpaper.opacity }}
          />
          {/* Tint between the wallpaper and the content, so text contrast does
              not depend on how bright the chosen image happens to be. */}
          <span className="absolute inset-0 bg-canvas/70" />
        </>
      ) : null}

      <span className="ambient__blob ambient__blob--1" />
      <span className="ambient__blob ambient__blob--2" />
      <span className="ambient__blob ambient__blob--3" />

      <span className="ambient__grain" />
    </div>
  );
}
