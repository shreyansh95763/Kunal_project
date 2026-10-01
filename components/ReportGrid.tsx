import Image from "next/image";
import Link from "next/link";

/**
 * The eight-tile reports mosaic that overlaps the bottom of the hero.
 * Tile order matters: globals.css places children 1-4 on row one and 5-6
 * centred on row two at the lg breakpoint.
 */

function ImageTile({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="report-card relative h-full overflow-hidden">
      <Image
        src={src}
        alt={alt}
        width={405}
        height={260}
        sizes="(min-width: 1024px) 25vw, 100vw"
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function GoldTile({
  title,
  blurb,
  href,
}: {
  title: string;
  blurb: string;
  href: string;
}) {
  return (
    <div className="gold-panel report-card h-full">
      <div className="panel-inner text-left">
        <h3>{title}</h3>
        <p className="mb-2 opacity-90">{blurb}</p>
        <Link href={href}>
          MORE DETAILS <span className="text-lg">→</span>
        </Link>
      </div>
    </div>
  );
}

export default function ReportGrid() {
  return (
    <div className="report-grid">
      <ImageTile src="/img/report-grid-1.png" alt="Diamond ring" />

      <GoldTile
        title="DIAMOND REPORT"
        blurb="Detailed grading and certification for diamonds."
        href="/reports-certificates"
      />

      <ImageTile src="/img/report-grid-2.png" alt="Loose gemstones" />

      <div className="report-card relative h-full overflow-hidden">
        <div className="white-panel">
          <div>
            <h3>
              GEMSTONE
              <br />
              REPORT
            </h3>
            <Link href="/reports-certificates">MORE DETAILS →</Link>
          </div>
        </div>
      </div>

      <ImageTile src="/img/report-grid-3.png" alt="Gemstone ring" />

      <GoldTile
        title="JEWELLERY REPORT"
        blurb="Certification & appraisal for finished jewellery."
        href="/reports-certificates"
      />

      <ImageTile src="/img/report-grid-4.png" alt="Emerald gemstone" />
      <ImageTile src="/img/report-grid-5.png" alt="Cut gemstone detail" />
    </div>
  );
}
