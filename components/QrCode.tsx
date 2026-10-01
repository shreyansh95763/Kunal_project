import qrcode from "qrcode-generator";

/**
 * Server-rendered QR code.
 *
 * The matrix is computed at render time and emitted as plain SVG, so there is
 * no client JavaScript, no canvas, and no external image request — which also
 * means it survives "Print to PDF" intact.
 *
 * Type 0 lets the library pick the smallest version that fits the payload, and
 * level "M" keeps the code readable on a printed certificate that may be
 * scuffed or photocopied.
 */
export default function QrCode({
  value,
  size = 96,
  title,
  className,
}: {
  value: string;
  /** Rendered edge length in px, quiet zone included. */
  size?: number;
  /** Accessible name; screen readers cannot read the pattern itself. */
  title: string;
  className?: string;
}) {
  const qr = qrcode(0, "M");
  qr.addData(value);
  qr.make();

  const count = qr.getModuleCount();
  // The spec asks for a 4-module quiet zone; without it scanners struggle.
  const quiet = 4;
  const extent = count + quiet * 2;

  // One path for every dark module beats thousands of <rect> nodes in the DOM.
  const path: string[] = [];
  for (let row = 0; row < count; row++) {
    for (let col = 0; col < count; col++) {
      if (qr.isDark(row, col)) {
        path.push(`M${col + quiet} ${row + quiet}h1v1h-1z`);
      }
    }
  }

  return (
    <svg
      role="img"
      aria-label={title}
      viewBox={`0 0 ${extent} ${extent}`}
      width={size}
      height={size}
      shapeRendering="crispEdges"
      className={className}
    >
      <rect width={extent} height={extent} fill="#ffffff" />
      <path d={path.join("")} fill="#001b34" />
    </svg>
  );
}
