import qrcode from "qrcode-generator";
import {
  certificateUrl,
  graderLabel,
  reportTitle,
  type GemReport,
} from "@/lib/reports";

/**
 * Renders the Certificate Card onto a 300 DPI high-resolution HTML5 Canvas
 * sized exactly to CR80 Plastic Card standard: 8.6 cm × 5.4 cm (1016 × 638 px).
 */
export async function generateCertificateCardCanvas(
  report: GemReport
): Promise<HTMLCanvasElement> {
  const width = 1016;
  const height = 638;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Could not initialize canvas context");

  // Helper: Draw rounded rectangle
  function roundRect(
    x: number,
    y: number,
    w: number,
    h: number,
    radius: number | { tl: number; tr: number; br: number; bl: number }
  ) {
    const r =
      typeof radius === "number"
        ? { tl: radius, tr: radius, br: radius, bl: radius }
        : radius;
    ctx!.beginPath();
    ctx!.moveTo(x + r.tl, y);
    ctx!.lineTo(x + w - r.tr, y);
    ctx!.quadraticCurveTo(x + w, y, x + w, y + r.tr);
    ctx!.lineTo(x + w, y + h - r.br);
    ctx!.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h);
    ctx!.lineTo(x + r.bl, y + h);
    ctx!.quadraticCurveTo(x, y + h, x, y + h - r.bl);
    ctx!.lineTo(x, y + r.tl);
    ctx!.quadraticCurveTo(x, y, x + r.tl, y);
    ctx!.closePath();
  }

  // 1. White Background with rounded corners (CR80 standard ~3mm corner radius)
  ctx.fillStyle = "#ffffff";
  roundRect(0, 0, width, height, 36);
  ctx.fill();

  // Subtle border
  ctx.strokeStyle = "#d1d5db";
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // 2. Top-Left Navy Box Badge with Logo
  ctx.fillStyle = "#0c1e36";
  roundRect(0, 0, 240, 78, { tl: 36, tr: 0, br: 24, bl: 0 });
  ctx.fill();

  // Load and draw Logo
  try {
    const logoImg = await loadImage("/img/new_bg_remove.png");
    ctx.drawImage(logoImg, 30, 8, 180, 42);
  } catch {
    ctx.fillStyle = "#c59d3f";
    ctx.font = "bold 20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("GLAMGEHNA", 120, 36);
  }

  // Gold line inside navy badge
  ctx.strokeStyle = "rgba(197, 157, 63, 0.7)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(25, 56);
  ctx.lineTo(215, 56);
  ctx.stroke();

  // Lab subtitle in gold
  const lab = report.labSubtitle || "GEMSTONE & DIAMOND LABORATORY";
  ctx.fillStyle = "#c59d3f";
  ctx.font = "bold 8.5px sans-serif";
  ctx.textAlign = "center";
  ctx.letterSpacing = "1.5px";
  ctx.fillText(lab, 120, 68);
  ctx.letterSpacing = "0px";

  // 3. Center Header Title
  const title = reportTitle(report);
  ctx.fillStyle = "#0c1e36";
  ctx.font = "900 20px sans-serif";
  ctx.textAlign = "center";
  ctx.letterSpacing = "2.5px";
  ctx.fillText(title.toUpperCase(), 535, 40);
  ctx.letterSpacing = "0px";

  // Decorative gold diamonds & lines under title
  ctx.strokeStyle = "#c59d3f";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(430, 52);
  ctx.lineTo(515, 52);
  ctx.moveTo(555, 52);
  ctx.lineTo(640, 52);
  ctx.stroke();

  // Small gold diamond in center
  ctx.save();
  ctx.translate(535, 52);
  ctx.rotate((45 * Math.PI) / 180);
  ctx.fillStyle = "#c59d3f";
  ctx.fillRect(-3.5, -3.5, 7, 7);
  ctx.restore();

  // 4. Top-Right Report Metadata
  ctx.textAlign = "right";
  ctx.font = "bold 11px sans-serif";
  ctx.fillStyle = "#6b7280";
  ctx.fillText("REPORT NO : ", 850, 34);
  ctx.font = "900 17px sans-serif";
  ctx.fillStyle = "#0c1e36";
  ctx.fillText(report.reportNo, 975, 34);

  ctx.font = "bold 10px sans-serif";
  ctx.fillStyle = "#6b7280";
  ctx.fillText("DATE OF ISSUE : ", 890, 56);
  ctx.font = "bold 13px sans-serif";
  ctx.fillStyle = "#0c1e36";
  ctx.fillText(report.issuedOn, 975, 56);

  // Header bottom divider line
  ctx.strokeStyle = "#f3f4f6";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(25, 86);
  ctx.lineTo(990, 86);
  ctx.stroke();

  // 5. Left Column: Specifications
  const specs: { label: string; value?: string; bold?: boolean }[] = [
    { label: "Description", value: report.description },
    { label: "Measurement", value: report.measurements },
    { label: "Shape & Cut", value: report.shape },
    { label: "Carat Weight", value: report.caratWeight, bold: true },
    { label: "Color Grade", value: report.colorGrade },
    { label: "Clarity Grade", value: report.clarityGrade },
    { label: "Cut Grade", value: report.cutGrade, bold: true },
    { label: "Polish", value: report.polish },
    { label: "Symmetry", value: report.symmetry },
    { label: "Fluorescence", value: report.fluorescence },
    { label: "Certified By", value: report.certifiedBy },
    { label: "Comments", value: report.comments },
  ].filter((s) => Boolean(s.value));

  let startY = 114;
  const rowHeight = 35.5;

  specs.forEach((item, index) => {
    const y = startY + index * rowHeight;

    // Small Gold Diamond Bullet
    ctx.save();
    ctx.translate(42, y - 4);
    ctx.rotate((45 * Math.PI) / 180);
    ctx.fillStyle = "#c59d3f";
    ctx.fillRect(-2.5, -2.5, 5, 5);
    ctx.restore();

    // Label
    ctx.textAlign = "left";
    ctx.font = "bold 12.5px sans-serif";
    ctx.fillStyle = "#0c1e36";
    ctx.fillText(item.label, 58, y);

    // Colon
    ctx.font = "bold 12px sans-serif";
    ctx.fillStyle = "#9ca3af";
    ctx.fillText(":", 200, y);

    // Value
    ctx.font = item.bold ? "900 13px sans-serif" : "600 12.5px sans-serif";
    ctx.fillStyle = item.bold ? "#0c1e36" : "#1f2937";
    ctx.fillText(item.value || "", 215, y);

    // Underline
    ctx.strokeStyle = "rgba(243, 244, 246, 0.9)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(35, y + 8);
    ctx.lineTo(550, y + 8);
    ctx.stroke();

    if (index === 6) {
      // Dashed separator
      ctx.save();
      ctx.setLineDash([4, 4]);
      ctx.strokeStyle = "#e5e7eb";
      ctx.beginPath();
      ctx.moveTo(35, y + 8);
      ctx.lineTo(550, y + 8);
      ctx.stroke();
      ctx.restore();
    }
  });

  // 6. Right Column: Compass Reticle & Specimen Image
  const centerX = 770;
  const centerY = 236;
  const outerR = 124;

  // Dashed gold outer circle
  ctx.save();
  ctx.setLineDash([5, 4]);
  ctx.strokeStyle = "rgba(197, 157, 63, 0.85)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(centerX, centerY, outerR, 0, Math.PI * 2);
  ctx.stroke();
  ctx.restore();

  // Solid gold inner circle
  ctx.strokeStyle = "rgba(197, 157, 63, 0.4)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(centerX, centerY, outerR - 6, 0, Math.PI * 2);
  ctx.stroke();

  // 4 Cardinal Markers
  const markerPositions = [
    { x: centerX, y: centerY - outerR },
    { x: centerX, y: centerY + outerR },
    { x: centerX - outerR, y: centerY },
    { x: centerX + outerR, y: centerY },
  ];
  markerPositions.forEach((pos) => {
    ctx.save();
    ctx.translate(pos.x, pos.y);
    ctx.rotate((45 * Math.PI) / 180);
    ctx.fillStyle = "#c59d3f";
    ctx.fillRect(-3.5, -3.5, 7, 7);
    ctx.restore();
  });

  // Specimen Inner Circle Frame
  const innerR = 106;
  ctx.save();
  ctx.beginPath();
  ctx.arc(centerX, centerY, innerR, 0, Math.PI * 2);
  ctx.clip();
  ctx.fillStyle = "#ffffff";
  ctx.fill();

  // Load and draw Specimen Image
  const specimenSrc = report.imageSrc || "/img/reports/GD52416.jpg";
  try {
    const specImg = await loadImage(specimenSrc);
    // Draw centered aspect-contain
    const aspect = specImg.width / specImg.height;
    let dw = innerR * 1.8;
    let dh = dw / aspect;
    if (dh > innerR * 1.8) {
      dh = innerR * 1.8;
      dw = dh * aspect;
    }
    ctx.drawImage(specImg, centerX - dw / 2, centerY - dh / 2, dw, dh);
  } catch {
    ctx.fillStyle = "#f3f4f6";
    ctx.fill();
  }
  ctx.restore();

  // Gold ring border around specimen
  ctx.strokeStyle = "rgba(197, 157, 63, 0.8)";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(centerX, centerY, innerR, 0, Math.PI * 2);
  ctx.stroke();

  // 7. Grader Signature & QR Code Area
  const grader = graderLabel(report);

  // Grader signature (Left side of right column)
  ctx.textAlign = "center";
  ctx.font = "bold 11px sans-serif";
  ctx.fillStyle = "#0c1e36";
  ctx.fillText(grader, 665, 435);

  // Draw signature stylized curve
  ctx.strokeStyle = "#0c1e36";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(610, 460);
  ctx.bezierCurveTo(630, 440, 645, 475, 665, 452);
  ctx.bezierCurveTo(680, 435, 695, 470, 720, 455);
  ctx.stroke();

  // Underline
  ctx.strokeStyle = "#d1d5db";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(615, 472);
  ctx.lineTo(715, 472);
  ctx.stroke();

  ctx.font = "600 9.5px sans-serif";
  ctx.fillStyle = "#4b5563";
  ctx.fillText(report.signatoryTitle || "GDL. Director", 665, 486);

  // QR Code (Right side of right column)
  const verifyUrl = certificateUrl(report.reportNo);
  const qr = qrcode(0, "M");
  qr.addData(verifyUrl);
  qr.make();
  const count = qr.getModuleCount();
  const quiet = 2;
  const qrExtent = count + quiet * 2;
  const qrPixelSize = 64;
  const qrCellSize = qrPixelSize / qrExtent;

  const qrX = 860;
  const qrY = 405;

  // QR background card
  ctx.fillStyle = "#ffffff";
  roundRect(qrX - 4, qrY - 4, qrPixelSize + 8, qrPixelSize + 8, 6);
  ctx.fill();
  ctx.strokeStyle = "rgba(197, 157, 63, 0.7)";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = "#0c1e36";
  for (let r = 0; r < count; r++) {
    for (let c = 0; c < count; c++) {
      if (qr.isDark(r, c)) {
        ctx.fillRect(
          qrX + (c + quiet) * qrCellSize,
          qrY + (r + quiet) * qrCellSize,
          qrCellSize + 0.2,
          qrCellSize + 0.2
        );
      }
    }
  }

  ctx.textAlign = "center";
  ctx.font = "900 8px sans-serif";
  ctx.fillStyle = "#c59d3f";
  ctx.letterSpacing = "0.8px";
  ctx.fillText("SCAN TO VERIFY", qrX + qrPixelSize / 2, qrY + qrPixelSize + 12);
  ctx.letterSpacing = "0px";

  ctx.font = "900 11px sans-serif";
  ctx.fillStyle = "#0c1e36";
  ctx.fillText(report.reportNo, qrX + qrPixelSize / 2, qrY + qrPixelSize + 25);

  // 8. Bottom Footer Security Bar
  const note =
    report.disclaimer ||
    "This diamond report represents the characteristics of the diamond at the time of examination and does not imply monetary value.";

  // Security Pill
  ctx.fillStyle = "rgba(12, 30, 54, 0.04)";
  roundRect(30, 575, 830, 36, 18);
  ctx.fill();
  ctx.strokeStyle = "rgba(209, 213, 219, 0.6)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Green Shield Circle
  ctx.fillStyle = "#0c1e36";
  ctx.beginPath();
  ctx.arc(52, 593, 11, 0, Math.PI * 2);
  ctx.fill();

  // Green Check inside shield
  ctx.strokeStyle = "#34d399";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(47, 593);
  ctx.lineTo(50, 596);
  ctx.lineTo(57, 589);
  ctx.stroke();

  // Disclaimer text
  ctx.textAlign = "left";
  ctx.font = "500 10.5px sans-serif";
  ctx.fillStyle = "#4b5563";
  ctx.fillText(note, 72, 596, 770);

  // Right Security Micro-dots (6x3 grid)
  const dotStartX = 890;
  const dotStartY = 582;
  ctx.fillStyle = "#9ca3af";
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 6; c++) {
      ctx.beginPath();
      ctx.arc(dotStartX + c * 5.5, dotStartY + r * 6.5, 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Right Security Overlapping Diamonds
  ctx.save();
  ctx.translate(952, 588);
  ctx.rotate((45 * Math.PI) / 180);
  ctx.fillStyle = "#0c1e36";
  ctx.fillRect(-5, -5, 10, 10);
  ctx.restore();

  ctx.save();
  ctx.translate(962, 596);
  ctx.rotate((45 * Math.PI) / 180);
  ctx.fillStyle = "#c59d3f";
  ctx.fillRect(-4, -4, 8, 8);
  ctx.restore();

  return canvas;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}
