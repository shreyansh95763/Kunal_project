import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import QrCode from "@/components/QrCode";
import {
  certificateUrl,
  graderLabel,
  isGemstoneReport,
  reportTitle,
  type GemReport,
} from "@/lib/reports";

/* ─── Exact gold outline SVG icons matching reference card ─── */
const I = ({
  d,
  className = "h-[15px] w-[15px]",
  color = "#c59d3f",
}: {
  d: string;
  className?: string;
  color?: string;
}) => (
  <svg
    className={`shrink-0 ${className}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d={d} />
  </svg>
);

const ICONS: Record<string, string> = {
  // 1. Description: diamond outline
  diamond: "M6 3h12l4 7-10 11L2 10l4-7z M2 10h20 M6 3l4 7 2 11 2-11 4-7",
  // 2. Measurement: diagonal ruler with measurement notches
  ruler: "M3 21l18-18m-5 1l2 2m-5-2l2 2m-5-2l2 2m-5-2l2 2",
  // 3. Shape & Cut: brilliant cut gem facet
  shapeCut: "M12 2L2 9l10 13 10-13-10-7zm0 0v20M2 9h20M7 9l5 13 5-13",
  // 4. Carat Weight: balance scale
  scale: "M3 6l3 7h6L9 6H3zm12 0l3 7h6l-3-7h-6zM12 3v18m-6 0h12",
  // 5. Color Grade: teardrop
  drop: "M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z",
  // 6. Clarity Grade: magnifying loupe
  loupe: "M21 21l-6-6m0 0a7 7 0 10-9.9-9.9 7 7 0 009.9 9.9z",
  // 7. Cut Grade: diamond star
  cutGrade: "M12 2l2.4 7.2h7.6l-6.2 4.5 2.4 7.3-6.2-4.5-6.2 4.5 2.4-7.3-6.2-4.5h7.6z",
  // 8. Polish: 8-spoke sparkle star
  sparkle: "M12 2v20M2 12h20M5 5l14 14M19 5L5 19",
  // 9. Symmetry: geometric faceted polygon
  symmetry: "M12 2l7 5v10l-7 5-7-5V7l7-5zm0 0v20M5 7l14 10M19 7L5 17",
  // 10. Fluorescence: sun rays
  sun: "M12 8a4 4 0 100 8 4 4 0 000-8zm0-4v2m0 12v2m-8-8H2m16 0h2m-2.93-5.07l1.41-1.41M5.52 18.48l1.41-1.41m0-10.14L5.52 5.52m12.96 12.96l-1.41-1.41",
  // 11. Certified By: ribbon medal badge
  medal: "M12 3a5 5 0 110 10A5 5 0 0112 3zm0 10l-2 8 2-.5 2 .5-2-8z",
  // 12. Comments: note document
  note: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
};

interface SpecRowProps {
  label: string;
  value?: string;
  icon: string;
  bold?: boolean;
  iconColor?: string;
  multiline?: boolean;
}

function SpecRow({ label, value, icon, bold, iconColor, multiline }: SpecRowProps) {
  if (!value) return null;
  const isMulti = multiline || label === "Description";
  const isLong = value.length > 30;
  return (
    <div
      className={`flex ${isMulti ? "items-start" : "items-center"} border-b border-gray-200/60 last:border-b-0`}
      style={{ paddingTop: "3px", paddingBottom: "3px" }}
    >
      <span className="shrink-0 mr-[8px]" style={isMulti ? { marginTop: "1px" } : undefined}>
        <I d={ICONS[icon] || ICONS.diamond} className="h-[17px] w-[17px]" color={iconColor || "#c59d3f"} />
      </span>
      <span
        className="shrink-0 font-bold text-[#0c1e36] tracking-tight"
        style={{ width: "118px", fontSize: "14px", lineHeight: 1.25 }}
      >
        {label}
      </span>
      <span
        className="shrink-0 text-center font-bold text-[#94a3b8]"
        style={{ width: "12px", fontSize: "14px", lineHeight: 1.25 }}
      >
        :
      </span>
      <span
        title={value}
        className={`flex-1 min-w-0 pl-2.5 ${isMulti ? "whitespace-pre-wrap break-words" : "truncate"} ${bold ? "font-black text-[#0c1e36]" : "font-semibold text-[#1e293b]"}`}
        style={{ fontSize: isLong && !isMulti ? "13px" : "14px", lineHeight: 1.25 }}
      >
        {value}
      </span>
    </div>
  );
}

export default function CertificateCard({ report }: { report: GemReport }) {
  const isGemstone = isGemstoneReport(report);
  const verifyUrl = certificateUrl(report.reportNo);
  const title = isGemstone ? "GEMSTONE CERTIFICATE" : reportTitle(report);
  const grader = graderLabel(report);
  const lab = report.labSubtitle || "GEMSTONE & DIAMOND LABORATORY";

  const [imgError, setImgError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    setImgError(false);
  }, [report.reportNo, report.imageSrc]);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const availableWidth = containerRef.current.clientWidth;
        if (availableWidth > 0) {
          setScale(Math.min(1, availableWidth / 860));
        }
      }
    };

    handleResize();

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      ro = new ResizeObserver(() => handleResize());
      ro.observe(containerRef.current);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      ro?.disconnect();
    };
  }, []);

  const fallbackImg = !isGemstone
    ? "/img/reports/GD52416.png"
    : "/img/diamond-specimen.jpg";

  // Dynamic specimen image from report data or fallback
  const img = (!imgError && report.imageSrc) ? report.imageSrc : fallbackImg;

  const note =
    report.disclaimer ||
    (isGemstone
      ? "This gemstone certificate represents the characteristics of the gemstone at the time of examination and does not imply monetary value."
      : "This diamond report represents the characteristics of the diamond at the time of examination and does not imply monetary value.");

  const gold = isGemstone ? "#10b981" : "#c59d3f";
  const darkBlue = "#0c1e36";

  const verifiedBg = isGemstone
    ? "linear-gradient(90deg, #059669, #34d399, #0d9488)"
    : "linear-gradient(90deg, #d4af37, #fef08a, #c59d3f)";
  const verifiedTxt = darkBlue;

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-center py-4 px-1 max-w-[860px] mx-auto print-card-wrapper overflow-hidden"
    >
      {/*
        Responsive Scaling Wrapper:
        The 860x540 card renders at exact design dimensions and scales smoothly on mobile.
        In print mode, .print-card-scaler ensures it renders at full exact size without distortion.
      */}
      <div
        className="print-card-scaler"
        style={{
          width: `${860 * scale}px`,
          height: `${540 * scale}px`,
          position: "relative",
          flexShrink: 0,
        }}
      >
        <article
          id="certificate-card"
          className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 select-none overflow-hidden print-card-article"
          style={{
            width: 860,
            height: 540,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
          aria-label={`${title} ${report.reportNo}`}
        >
          {/* ── Soft 3D Geometric Facet Watermark on Left & Right ── */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 860 540"
            fill="none"
            style={{ opacity: 0.045 }}
          >
            {/* Left side facet network */}
            <polygon points="0,0 210,0 150,180 0,130" fill="#c59d3f" />
            <polygon points="0,130 150,180 80,360 0,300" fill="#0c1e36" />
            <polygon points="0,300 80,360 170,540 0,540" fill="#c59d3f" />
            <polygon points="210,0 340,0 260,160 150,180" fill="#0c1e36" />
            <polygon points="150,180 260,160 220,380 80,360" fill="#c59d3f" />

            {/* Right side facet network */}
            <polygon points="860,0 650,0 710,180 860,130" fill="#c59d3f" />
            <polygon points="860,130 710,180 780,360 860,300" fill="#0c1e36" />
            <polygon points="860,300 780,360 690,540 860,540" fill="#c59d3f" />
            <polygon points="650,0 520,0 600,160 710,180" fill="#0c1e36" />
            <polygon points="710,180 600,160 640,380 780,360" fill="#c59d3f" />
          </svg>

          {/* ── Inner layout: flex column occupying full card area ── */}
          <div
            className="relative z-10 flex flex-col h-full justify-between"
            style={{ padding: "14px 20px 12px 20px" }}
          >
            {/* ═══════════════════════════ HEADER ═══════════════════════════ */}
            <header
              className="flex items-stretch justify-between gap-3 pb-2"
              style={{ borderBottom: "1px solid #e5e7eb" }}
            >
              {/* ── LEFT: Logo Block with Golden Metallic Ribbon Swoosh ── */}
              <div className="relative flex items-center shrink-0" style={{ minWidth: 200 }}>
                {/* Golden metallic swoosh arc framing the logo matching reference */}
                <svg
                  className="absolute pointer-events-none"
                  style={{
                    top: -14,
                    left: -20,
                    width: 310,
                    height: 112,
                    zIndex: 0,
                    filter: "drop-shadow(0 2px 3px rgba(180, 130, 40, 0.22))",
                  }}
                  viewBox="0 0 320 116"
                  fill="none"
                >
                  {/* Subtle lower shadow stroke */}
                  <path
                    d="M 305,0 C 275,6 248,26 230,60 C 210,95 155,98 0,98"
                    fill="none"
                    stroke="#854d0e"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    opacity="0.22"
                  />
                  {/* Main metallic gold ribbon curve */}
                  <path
                    d="M 305,0 C 275,6 248,26 230,60 C 210,95 155,98 0,98"
                    fill="none"
                    stroke="url(#swooshGoldGrad)"
                    strokeWidth="3.6"
                    strokeLinecap="round"
                  />
                  {/* Inner luxury highlight shine line */}
                  <path
                    d="M 303,0 C 273,6 246,25 228,59 C 208,94 153,96.5 0,96.5"
                    fill="none"
                    stroke="#fffbe8"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                  <defs>
                    <linearGradient id="swooshGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="20%" stopColor="#d4af37" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="75%" stopColor="#fef08a" />
                      <stop offset="100%" stopColor="#92400e" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Logo: Metallic 'G' Emblem with Sparkle Stars + Gold GLAM + Navy GEHNA + Subtitle */}
                <div
                  className="relative flex flex-col items-center"
                  style={{ zIndex: 1, paddingLeft: 4, paddingRight: 8 }}
                >
                  {/* 3D Metallic Gold 'G' Emblem with 4-Point Sparkle Stars */}
                  <div
                    style={{
                      position: "relative",
                      width: 42,
                      height: 36,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      src="/img/gold-g-emblem.png"
                      alt="Glamgehna G Emblem"
                      width={38}
                      height={36}
                      className="object-contain drop-shadow-[0_1px_2px_rgba(0,0,0,0.18)]"
                      priority
                    />
                    {/* Upper-right sparkle stars matching reference artwork */}
                    <svg
                      style={{
                        position: "absolute",
                        top: 1,
                        right: 3,
                        width: 13,
                        height: 13,
                        filter: "drop-shadow(0 0 2px rgba(254,240,138,0.8))",
                      }}
                      viewBox="0 0 24 24"
                      fill="#d4af37"
                    >
                      <path d="M12 0L14 8L22 10L14 12L12 20L10 12L2 10L10 8Z" />
                    </svg>
                    <svg
                      style={{
                        position: "absolute",
                        top: -2,
                        right: 13,
                        width: 8,
                        height: 8,
                        filter: "drop-shadow(0 0 1px rgba(254,240,138,0.9))",
                      }}
                      viewBox="0 0 24 24"
                      fill="#fef08a"
                    >
                      <path d="M12 0L14 8L22 10L14 12L12 20L10 12L2 10L10 8Z" />
                    </svg>
                  </div>

                  {/* GLAMGEHNA: GLAM in Rich Gold, GEHNA in Dark Navy */}
                  <div
                    style={{
                      fontSize: 17,
                      fontWeight: 800,
                      letterSpacing: "0.22em",
                      lineHeight: 1,
                      marginTop: 2,
                      display: "flex",
                      alignItems: "center",
                      fontFamily: "var(--font-sans), system-ui, -apple-system, sans-serif",
                    }}
                  >
                    <span style={{ color: "#c59d3f" }}>GLAM</span>
                    <span style={{ color: darkBlue }}>GEHNA</span>
                  </div>

                  {/* Delicate Gold Divider with Center Diamond Dot ♦ */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                      margin: "3px 0 2px 0",
                    }}
                  >
                    <div
                      style={{
                        flex: 1,
                        height: 1,
                        background: "linear-gradient(90deg, transparent, #c59d3f)",
                      }}
                    />
                    <span style={{ color: "#c59d3f", fontSize: 6, margin: "0 4px", lineHeight: 1 }}>◆</span>
                    <div
                      style={{
                        flex: 1,
                        height: 1,
                        background: "linear-gradient(270deg, transparent, #c59d3f)",
                      }}
                    />
                  </div>

                  {/* GEMSTONE & DIAMOND LABORATORY in Dark Navy */}
                  <p
                    style={{
                      fontSize: 9.5,
                      fontWeight: 800,
                      letterSpacing: "0.14em",
                      color: darkBlue,
                      textTransform: "uppercase",
                      lineHeight: 1,
                      margin: 0,
                    }}
                  >
                    {lab}
                  </p>
                </div>
              </div>

              {/* ── CENTER: Report Title + Divider + Tagline ── */}
              <div
                className="flex-1 flex flex-col items-center justify-center text-center"
                style={{ paddingTop: 2, paddingBottom: 2 }}
              >
                <h1
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: 25,
                    fontWeight: 900,
                    color: darkBlue,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    lineHeight: 1,
                    margin: 0,
                  }}
                >
                  {title}
                </h1>

                {/* Gold ornamental line with center diamond icon */}
                <div className="flex items-center justify-center gap-1.5" style={{ marginTop: 6 }}>
                  <span
                    style={{
                      display: "block",
                      height: 1,
                      width: 65,
                      background: "linear-gradient(90deg, transparent, #c59d3f)",
                    }}
                  />
                  <svg
                    viewBox="0 0 24 24"
                    fill={gold}
                    style={{ width: 10, height: 10, flexShrink: 0 }}
                  >
                    <path d="M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7z" />
                  </svg>
                  <span
                    style={{
                      display: "block",
                      height: 1,
                      width: 65,
                      background: "linear-gradient(270deg, transparent, #c59d3f)",
                    }}
                  />
                </div>

                {/* Tagline */}
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 900,
                    letterSpacing: "0.26em",
                    color: "#4b5563",
                    textTransform: "uppercase",
                    marginTop: 5,
                    lineHeight: 1,
                  }}
                >
                  TRUST • ANALYZE • CERTIFY
                </p>
              </div>

              {/* ── RIGHT: Report Info Box + Attached Gold Verified Badge ── */}
              <div className="flex flex-col items-end shrink-0" style={{ minWidth: 156 }}>
                {/* Rounded light box */}
                <div
                  style={{
                    background: "#f0f4f8",
                    border: "1px solid #cbd5e1",
                    borderRadius: "10px 10px 0 0",
                    padding: "6px 12px",
                    textAlign: "right",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ lineHeight: 1.3 }}>
                    <span
                      style={{
                        fontSize: 9.5,
                        fontWeight: 700,
                        color: "#6b7280",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      REPORT NO :{" "}
                    </span>
                    <span
                      style={{
                        fontSize: 17,
                        fontWeight: 900,
                        color: darkBlue,
                        letterSpacing: "0.06em",
                      }}
                    >
                      {report.reportNo}
                    </span>
                  </div>
                  <div style={{ marginTop: 2, lineHeight: 1.3 }}>
                    <span
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        color: "#6b7280",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      DATE OF ISSUE :{" "}
                    </span>
                    <span
                      style={{
                        fontSize: 12.5,
                        fontWeight: 700,
                        color: "#1f2937",
                      }}
                    >
                      {report.issuedOn}
                    </span>
                  </div>
                </div>

                {/* Attached Golden Pill Badge: VERIFIED & CERTIFIED */}
                <div
                  style={{
                    width: "100%",
                    borderRadius: "0 0 10px 10px",
                    background: verifiedBg,
                    padding: "5px 0",
                    textAlign: "center",
                    boxSizing: "border-box",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                  }}
                >
                  <p
                    style={{
                      fontSize: 9.5,
                      fontWeight: 900,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: verifiedTxt,
                      lineHeight: 1,
                      margin: 0,
                    }}
                  >
                    VERIFIED &amp; CERTIFIED
                  </p>
                </div>
              </div>
            </header>

            {/* ═══════════════════════════ BODY ═══════════════════════════ */}
            <div className="flex flex-1 items-center justify-between gap-3" style={{ minHeight: 0, paddingTop: 3, paddingBottom: 2 }}>
              {/* ── LEFT: Specifications Table (55%) ── */}
              <div style={{ width: "55%", alignSelf: "stretch", display: "flex", flexDirection: "column", justifyContent: "space-between", paddingTop: 1, paddingBottom: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1 }}>
                  {isGemstone ? (
                    <>
                      <SpecRow icon="diamond" label="Description" value={report.description} multiline iconColor={isGemstone ? "#10b981" : "#c59d3f"} />
                      {report.species && <SpecRow icon="shapeCut" label="Species" value={report.species} iconColor="#10b981" />}
                      <SpecRow icon="ruler" label="Measurement" value={report.measurements} iconColor="#10b981" />
                      <SpecRow icon="shapeCut" label="Shape & Cut" value={report.shape} iconColor="#10b981" />
                      <SpecRow icon="scale" label="Carat Weight" value={report.caratWeight} bold iconColor="#10b981" />
                      <SpecRow icon="drop" label="Color" value={report.colorGrade} iconColor="#10b981" />
                      {(report.transparency || report.clarityGrade) && (
                        <SpecRow icon="loupe" label="Clarity / Transp." value={report.transparency || report.clarityGrade} iconColor="#10b981" />
                      )}
                      {report.refractiveIndex && <SpecRow icon="sparkle" label="Refractive Index" value={report.refractiveIndex} iconColor="#10b981" />}
                      {report.specificGravity && <SpecRow icon="scale" label="Specific Gravity" value={report.specificGravity} iconColor="#10b981" />}
                      {report.opticalProperties && <SpecRow icon="sun" label="Optical Char." value={report.opticalProperties} iconColor="#10b981" />}
                    </>
                  ) : (
                    <>
                      <SpecRow icon="diamond" label="Description" value={report.description} multiline />
                      <SpecRow icon="ruler" label="Measurement" value={report.measurements} />
                      <SpecRow icon="shapeCut" label="Shape & Cut" value={report.shape} />
                      <SpecRow icon="scale" label="Carat Weight" value={report.caratWeight} bold />
                      <SpecRow icon="drop" label="Color Grade" value={report.colorGrade} />
                      <SpecRow icon="loupe" label="Clarity Grade" value={report.clarityGrade} />
                      <SpecRow icon="cutGrade" label="Cut Grade" value={report.cutGrade} bold />
                      <SpecRow icon="sparkle" label="Polish" value={report.polish} />
                      <SpecRow icon="symmetry" label="Symmetry" value={report.symmetry} />
                      <SpecRow icon="sun" label="Fluorescence" value={report.fluorescence} />
                    </>
                  )}
                </div>
              </div>

              {/* ── RIGHT: Specimen Reticle + Signature + QR (45%) ── */}
              <div
                style={{
                  width: "45%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                {/* Specimen Compass Reticle Circle (Enlarged) */}
                <div
                  style={{
                    position: "relative",
                    width: 245,
                    height: 245,
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 0,
                  }}
                >
                  {/* Outer SVG ring with Compass Markers & Solid White Circular Dish */}
                  <svg
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
                    viewBox="0 0 222 222"
                  >
                    {/* Solid White Circular Dish to mask card watermark cleanly */}
                    <circle
                      cx="111"
                      cy="111"
                      r="97"
                      fill="#ffffff"
                    />

                    {/* Outer Dashed Gold Ring */}
                    <circle
                      cx="111"
                      cy="111"
                      r="105"
                      fill="none"
                      stroke={gold}
                      strokeWidth="1.5"
                      strokeDasharray="5 3.5"
                      opacity="0.9"
                    />
                    {/* Inner Thin Solid Gold Ring */}
                    <circle
                      cx="111"
                      cy="111"
                      r="97"
                      fill="none"
                      stroke={gold}
                      strokeWidth="0.9"
                      opacity="0.45"
                    />
                  </svg>

                  {/* 4 Cardinal Gold Diamond Markers (12, 3, 6, 9 o'clock) */}
                  {[
                    { top: "1px", left: "50%", transform: "translateX(-50%) rotate(45deg)" },
                    { bottom: "1px", left: "50%", transform: "translateX(-50%) rotate(45deg)" },
                    { left: "1px", top: "50%", transform: "translateY(-50%) rotate(45deg)" },
                    { right: "1px", top: "50%", transform: "translateY(-50%) rotate(45deg)" },
                  ].map((s, i) => (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        width: 11,
                        height: 11,
                        borderRadius: 2,
                        background: gold,
                        ...s,
                        boxShadow: "0 1px 3px rgba(0,0,0,0.18)",
                        zIndex: 2,
                      }}
                    />
                  ))}

                  {/* Circular Specimen Frame with strict circle clip-path */}
                  <div
                    style={{
                      position: "relative",
                      width: 205,
                      height: 205,
                      borderRadius: "50%",
                      clipPath: "circle(50% at 50% 50%)",
                      WebkitClipPath: "circle(50% at 50% 50%)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                      background: "#ffffff",
                    }}
                  >
                    {/* Soft realistic drop shadow under diamond */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 6,
                        left: "12%",
                        width: "76%",
                        height: 18,
                        background: "radial-gradient(ellipse at center, rgba(0,0,0,0.28) 0%, rgba(0,0,0,0) 70%)",
                        borderRadius: "50%",
                        filter: "blur(5px)",
                        pointerEvents: "none",
                        zIndex: 1,
                      }}
                    />
                    <div
                      style={{
                        position: "relative",
                        width: 205,
                        height: 205,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={report.description || "Specimen"}
                        className="w-full h-full object-contain"
                        style={{
                          transform: "scale(1.18)",
                          mixBlendMode: "multiply",
                          display: "block",
                        }}
                        onError={() => {
                          if (!imgError) setImgError(true);
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* Bottom Row: Grader Signature (Left) & QR Code (Right) */}
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                    paddingLeft: 8,
                    paddingRight: 8,
                    paddingBottom: 2,
                  }}
                >
                  {/* Grader Signature Block */}
                  <div style={{ textAlign: "center" }}>
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 800,
                        color: darkBlue,
                        lineHeight: 1,
                        marginBottom: 3,
                      }}
                    >
                      {grader}
                    </p>
                    {/* Fluid cursive signature wave */}
                    <svg
                      viewBox="0 0 120 30"
                      fill="none"
                      stroke={darkBlue}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      style={{ width: 90, height: 22, display: "block", margin: "0 auto" }}
                    >
                      <path d="M 5 20 C 15 5, 20 28, 30 14 C 40 2, 45 22, 55 16 C 65 10, 70 24, 80 18 C 90 12, 100 20, 115 15" />
                    </svg>
                    {/* Signature line */}
                    <div
                      style={{
                        width: 62,
                        height: 1,
                        background: "#9ca3af",
                        margin: "2px auto 3px",
                      }}
                    />
                    <p
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: "#4b5563",
                        lineHeight: 1,
                      }}
                    >
                      {report.signatoryTitle || "GDL. Director"}
                    </p>
                  </div>

                  {/* QR Code Verification Box (Enlarged for high visibility) */}
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        border: `2px solid ${gold}`,
                        borderRadius: 8,
                        padding: 3,
                        background: "#fff",
                        display: "inline-block",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                      }}
                    >
                      <QrCode
                        value={verifyUrl}
                        size={78}
                        title={`Scan to verify report ${report.reportNo}`}
                      />
                    </div>
                    <p
                      style={{
                        fontSize: 9.5,
                        fontWeight: 900,
                        letterSpacing: "0.14em",
                        color: gold,
                        textTransform: "uppercase",
                        marginTop: 3,
                        lineHeight: 1,
                      }}
                    >
                      SCAN TO VERIFY
                    </p>
                    <p
                      style={{
                        fontSize: 13,
                        fontWeight: 900,
                        letterSpacing: "0.08em",
                        color: darkBlue,
                        lineHeight: 1,
                        marginTop: 1,
                      }}
                    >
                      {report.reportNo}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ═══════════════════════════ FOOTER ═══════════════════════════ */}
            <footer
              className="flex items-center justify-between gap-5"
              style={{ borderTop: "1px solid #e5e7eb", paddingTop: 7 }}
            >
              {/* Left: Shield Badge + Full Disclaimer Pill */}
              <div
                className="flex flex-1 items-center gap-2 overflow-hidden"
                style={{
                  background: "#f0f4f8",
                  border: "1px solid #cbd5e1",
                  borderRadius: 20,
                  padding: "4px 10px",
                }}
              >
                {/* Dark Navy Circular Badge with Emerald Checkmark */}
                <div
                  style={{
                    flexShrink: 0,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    background: darkBlue,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ width: 11, height: 11 }}
                  >
                    <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#1e293b",
                    lineHeight: 1.25,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  <span style={{ fontWeight: 800, color: darkBlue, textTransform: "uppercase", letterSpacing: "0.03em" }}>
                    CERTIFIED BY: {report.certifiedBy}
                  </span>
                  {/* <span style={{ margin: "0 6px", color: "#cbd5e1" }}>|</span> */}
                  {/* <span>{note}</span> */}
                </p>
              </div>

              {/* Right: AUTHENTIC / ACCURATE / RELIABLE with Gold Accent */}
              <div style={{ flexShrink: 0, paddingLeft: 8 }}>
                <p
                  style={{
                    fontSize: 9.5,
                    fontWeight: 800,
                    letterSpacing: "0.16em",
                    color: "#9ca3af",
                    textTransform: "uppercase",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  AUTHENTIC{" "}
                  <span style={{ color: "#d1d5db" }}>/</span>{" "}
                  <span style={{ position: "relative", color: "#374151", fontWeight: 900 }}>
                    ACCURATE
                    <span
                      style={{
                        position: "absolute",
                        bottom: -2,
                        left: 0,
                        right: 0,
                        height: 1.5,
                        background: gold,
                      }}
                    />
                  </span>{" "}
                  <span style={{ color: "#d1d5db" }}>/</span>{" "}
                  RELIABLE
                </p>
              </div>
            </footer>
          </div>
        </article>
      </div>
    </div>
  );
}


