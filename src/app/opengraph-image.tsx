import { ImageResponse } from "next/og";
import { profile } from "@/data/site";

export const alt = `${profile.name} — ${profile.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Social sharing card, generated at build time. Uses flexbox only — satori
 * (which ImageResponse is built on) does not support grid.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0a0b0e",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "68px",
              height: "68px",
              borderRadius: "18px",
              backgroundColor: "#4f46e5",
              color: "#ffffff",
              fontSize: "30px",
              fontWeight: 700,
            }}
          >
            {profile.initials}
          </div>
          <div style={{ display: "flex", color: "#9aa2b4", fontSize: "26px" }}>
            {profile.location}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              color: "#e9eaef",
              fontSize: "76px",
              fontWeight: 700,
              letterSpacing: "-2px",
            }}
          >
            {profile.name}
          </div>
          <div style={{ display: "flex", color: "#818cf8", fontSize: "36px", marginTop: "20px" }}>
            {profile.tagline}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
