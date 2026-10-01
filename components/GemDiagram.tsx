/**
 * Crown-view facet diagram, drawn from the report's shape name.
 *
 * The certificate reserves a panel for a photograph of the specimen. Until a
 * real photo is on file this stands in — a diagram is more honest than a stock
 * image, and being SVG it prints sharply at any size.
 */

type Outline = { rx: number; ry: number; squareness: number };

/**
 * Maps a shape description onto a superellipse. `squareness` of 2 is a true
 * ellipse; higher values push the outline towards a cushion or a rectangle.
 */
function outlineFor(shape: string): Outline {
  const s = shape.toLowerCase();
  if (s.includes("oval")) return { rx: 40, ry: 52, squareness: 2 };
  if (s.includes("marquise")) return { rx: 30, ry: 54, squareness: 1.4 };
  if (s.includes("pear")) return { rx: 38, ry: 52, squareness: 1.7 };
  if (s.includes("cushion")) return { rx: 48, ry: 48, squareness: 3.4 };
  if (s.includes("emerald") || s.includes("baguette"))
    return { rx: 38, ry: 52, squareness: 8 };
  if (s.includes("princess") || s.includes("asscher") || s.includes("square"))
    return { rx: 48, ry: 48, squareness: 8 };
  return { rx: 48, ry: 48, squareness: 2 }; // round brilliant
}

/** Point on the superellipse at angle `t`, measured from the centre (60, 60). */
function pointAt(t: number, { rx, ry, squareness }: Outline, scale = 1) {
  const cos = Math.cos(t);
  const sin = Math.sin(t);
  const exp = 2 / squareness;
  const x = Math.sign(cos) * Math.abs(cos) ** exp * rx * scale;
  const y = Math.sign(sin) * Math.abs(sin) ** exp * ry * scale;
  return { x: 60 + x, y: 60 + y };
}

const GIRDLE_POINTS = 16;
const TABLE_POINTS = 8;
/** How far in the table sits, as a fraction of the girdle. */
const TABLE_SCALE = 0.44;
/** Rotate so a facet edge, not a vertex, faces the viewer. */
const OFFSET = Math.PI / GIRDLE_POINTS;

function polygon(count: number, outline: Outline, scale: number) {
  return Array.from({ length: count }, (_, i) =>
    pointAt(OFFSET + (i * 2 * Math.PI) / count, outline, scale)
  );
}

function toPath(points: { x: number; y: number }[]) {
  return `${points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join("")}Z`;
}

export default function GemDiagram({
  shape,
  className,
}: {
  shape: string;
  className?: string;
}) {
  const outline = outlineFor(shape);
  const girdle = polygon(GIRDLE_POINTS, outline, 1);
  const table = polygon(TABLE_POINTS, outline, TABLE_SCALE);

  return (
    <svg
      viewBox="0 0 120 120"
      role="img"
      aria-label={`Diagram of a ${shape.toLowerCase()} gemstone, crown view`}
      className={className}
    >
      <path d={toPath(girdle)} fill="#f4f8fb" stroke="#001b34" strokeWidth={1.2} />
      <path
        d={toPath(girdle.map((p) => ({ x: 60 + (p.x - 60) * 0.94, y: 60 + (p.y - 60) * 0.94 })))}
        fill="none"
        stroke="#001b34"
        strokeWidth={0.5}
        opacity={0.5}
      />
      <path d={toPath(table)} fill="#ffffff" stroke="#001b34" strokeWidth={0.9} />

      <g stroke="#001b34" strokeWidth={0.5} opacity={0.65}>
        {/* Bezel facets: each table corner drops to the girdle below it. */}
        {table.map((t, i) => {
          const g = girdle[i * 2];
          return <line key={`bezel-${i}`} x1={t.x} y1={t.y} x2={g.x} y2={g.y} />;
        })}
        {/* Star facets: the girdle points in between rise to a table edge. */}
        {table.map((t, i) => {
          const next = table[(i + 1) % TABLE_POINTS];
          const g = girdle[i * 2 + 1];
          return (
            <line
              key={`star-${i}`}
              x1={(t.x + next.x) / 2}
              y1={(t.y + next.y) / 2}
              x2={g.x}
              y2={g.y}
            />
          );
        })}
      </g>
    </svg>
  );
}
