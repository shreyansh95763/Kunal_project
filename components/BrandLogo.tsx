import Image from "next/image";

/**
 * GGDL application brand logo (GlamGehna monogram + wordmark).
 *
 * Source artwork: `/img/logoNew.png` — 1254 × 1254 square canvas.
 * The actual artwork (G monogram + "GLAMGEHNA" text + subtitle) sits in the
 * centre of the canvas surrounded by whitespace. We crop into the artwork
 * bounding-box so it fills the header height cleanly.
 *
 * Artwork bounding-box (approximate, in source pixels):
 *   x: 170 → 1084  (width 914)
 *   y: 250 → 950   (height 700)
 */
export default function BrandLogo({
  height = 42,
  priority = false,
  className = "",
}: {
  /** Rendered height of the artwork in px. */
  height?: number;
  priority?: boolean;
  className?: string;
}) {
  // Artwork crop fractions (relative to the 1254 × 1254 source)
  const ART_X = 170 / 1254;   // 0.1355 — left edge
  const ART_Y = 250 / 1254;   // 0.1994 — top edge
  const ART_W = 914 / 1254;   // 0.7289 — width fraction
  const ART_H = 700 / 1254;   // 0.5582 — height fraction

  // Scale the full image so the artwork region exactly fills `height`
  const imgSize = Math.round(height / ART_H);
  // The visible container matches the artwork region at that scale
  const width = Math.round(imgSize * ART_W);
  // Offsets to shift the artwork into view
  const offsetX = Math.round(imgSize * ART_X);
  const offsetY = Math.round(imgSize * ART_Y);

  return (
    <span
      className={`brand-logo ${className}`}
      style={{
        display: "inline-block",
        position: "relative",
        width: `${width}px`,
        height: `${height}px`,
        minWidth: `${width}px`,
        minHeight: `${height}px`,
        overflow: "hidden",
        flexShrink: 0,
      }}
    >
      <Image
        src="/img/logoNew.png"
        alt="GGDL — GlamGehna Gemstone & Diamond Laboratory"
        width={imgSize}
        height={imgSize}
        priority={priority}
        style={{
          position: "absolute",
          width: `${imgSize}px`,
          height: `${imgSize}px`,
          maxWidth: "none",
          left: `${-offsetX}px`,
          top: `${-offsetY}px`,
          display: "block",
        }}
      />
    </span>
  );
}
