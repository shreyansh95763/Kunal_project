import reportsData from "@/data/reports.json";
import { getProductImageUrl } from "@/lib/products";
import { ROUTES, SITE_URL } from "@/lib/site";

export type ItemType = "Diamond" | "Gemstone";

export type GemReport = {
  reportNo: string;
  issuedOn: string;
  reportTitle?: string;
  labName?: string;
  labSubtitle?: string;
  itemType?: ItemType;
  description: string;
  measurements: string;
  shape: string;
  caratWeight: string;
  colorGrade: string;
  clarityGrade?: string;
  cutGrade?: string;
  polish?: string;
  symmetry?: string;
  fluorescence?: string;
  certifiedBy: string;
  comments: string;
  graderTitle?: string;
  signatoryTitle?: string;
  disclaimer?: string;
  imageSrc?: string;

  // Dedicated gemstone properties
  species?: string;
  refractiveIndex?: string;
  specificGravity?: string;
  opticalProperties?: string;
  microscopicObservation?: string;
  transparency?: string;
  treatment?: string;
  origin?: string;
};

const SAMPLE_REPORTS: GemReport[] = reportsData as GemReport[];
const VERIFY_API_URL = "https://glamgehna.com/verify_certificate_api.php";

function normalise(reportNo: string): string {
  return reportNo.trim().toUpperCase();
}

export function findReportSync(_reportNo: string): GemReport | undefined {
  return undefined;
}

const STATIC_REPORTS: Record<string, GemReport> = {
  GD52416: {
    reportNo: "GD52416",
    issuedOn: "Jun 2, 2026",
    reportTitle: "DIAMOND ANALYSIS REPORT",
    itemType: "Diamond",
    description: "Natural Round Diamond",
    measurements: "8.5x8.5 MM",
    shape: "Round Brilliant",
    caratWeight: "2.15Ct",
    colorGrade: "Natural White",
    clarityGrade: "Natural",
    cutGrade: "Excellent",
    polish: "Natural",
    symmetry: "Excellent",
    fluorescence: "Slight",
    certifiedBy: "Glamgehna Gemstone & Diamond Laboratory",
    comments: "Natural Diamond Verified. No treatment detected.",
    graderTitle: "Diamond Grader",
    signatoryTitle: "GDL. Director",
    disclaimer: "This diamond report represents the characteristics of the diamond at the time of examination and does not imply monetary value.",
    imageSrc: "https://www.glamgehna.com/admin/uploads/diamonds/diamond_1780374793.jpg",
  },
};

export async function fetchVerifyCertificateApi(
  reportNo: string
): Promise<GemReport | undefined> {
  const trimmed = reportNo.trim();
  if (!trimmed) return undefined;

  const cleaned = trimmed.replace(/[\s-]/g, "").toUpperCase();

  // Check static reports dictionary first (instant & reliable)
  if (STATIC_REPORTS[cleaned]) {
    return STATIC_REPORTS[cleaned];
  }

  const queryApi = async (queryNo: string): Promise<GemReport | undefined> => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 6000);
      const res = await fetch(
        `${VERIFY_API_URL}?report_no=${encodeURIComponent(queryNo)}`,
        { cache: "no-store", signal: controller.signal }
      );
      clearTimeout(timeoutId);
      if (!res.ok) return undefined;
      const json = await res.json();

      const isSuccess =
        json.status === "success" ||
        json.status === true ||
        json.status === "true" ||
        json.status === "1";
      const isFound =
        json.found === true ||
        json.found === "true" ||
        json.found === 1 ||
        json.found === "1";

      if (isSuccess && isFound && json.data) {
        const d = json.data;
        const productType = String(json.product_type || d.product_type || "").trim().toLowerCase();
        const isDiamond = productType === "diamond";

        let dateStr = "";
        const rawDateStr = d.created_at || d.issue_date || d.date_of_issue;
        if (rawDateStr) {
          const rawDate = String(rawDateStr).split(" ")[0];
          const dateObj = new Date(rawDate);
          if (!isNaN(dateObj.getTime())) {
            dateStr = dateObj.toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            });
          }
        }
        if (!dateStr) dateStr = "Recent";

        if (isDiamond) {
          return {
            reportNo: d.gdl_report_no || queryNo.toUpperCase(),
            issuedOn: dateStr,
            reportTitle: "DIAMOND ANALYSIS REPORT",
            itemType: "Diamond",
            description: d.description || "Natural Round Diamond",
            measurements: d.measurement || d.measurements || "-",
            shape: d.shape_cut_style || d.shape || "-",
            caratWeight: d.carat_weight || "-",
            colorGrade: d.color_grade || "-",
            clarityGrade: d.clarity_grade || "-",
            cutGrade: d.cut_grade || "-",
            polish: d.polish || "-",
            symmetry: d.symmetry || "-",
            fluorescence: d.fluorescence || "-",
            certifiedBy: d.certificate_lab || "Glamgehna Gemstone & Diamond Laboratory",
            comments: d.comments || "Natural Diamond Verified. No treatment detected.",
            graderTitle: "Diamond Grader",
            signatoryTitle: d.signatory_title || "GDL. Director",
            disclaimer: "This diamond report represents the characteristics of the diamond at the time of examination and does not imply monetary value.",
            imageSrc: getProductImageUrl(d.image_url),
          };
        } else {
          const measurements =
            d.length_mm && d.width_mm && d.height_mm
              ? `${d.length_mm} x ${d.width_mm} x ${d.height_mm} MM`
              : (d.measurement || d.measurements || "-");

          return {
            reportNo: d.gdl_report_no || queryNo.toUpperCase(),
            issuedOn: dateStr,
            reportTitle: "GEMSTONE CERTIFICATE",
            itemType: "Gemstone",
            description: d.description || d.title || d.species || "Natural Gemstone",
            species: d.species || undefined,
            measurements: measurements,
            shape: d.shape || d.shape_cut_style || "-",
            caratWeight: d.weight_ct ? `${d.weight_ct} Ct` : (d.carat_weight || "-"),
            colorGrade: d.color || d.color_grade || "-",
            transparency: d.transparency || undefined,
            clarityGrade: d.microscopic_observation || d.clarity_grade || undefined,
            refractiveIndex: d.refractive_index || (d.polish?.startsWith("R.I.") ? d.polish.replace("R.I.:", "").trim() : d.polish) || undefined,
            specificGravity: d.specific_gravity || (d.symmetry?.startsWith("S.G.") ? d.symmetry.replace("S.G.:", "").trim() : d.symmetry) || undefined,
            opticalProperties: d.optical_properties || d.fluorescence || undefined,
            certifiedBy: d.certificate_type || d.certificate_lab || "Glamgehna Gemstone & Diamond Laboratory",
            treatment: d.treatment || undefined,
            origin: d.origin || undefined,
            comments: d.comments || (d.treatment ? `Treatment: ${d.treatment}` : (d.origin ? `Origin: ${d.origin}` : "Natural Gemstone Verified")),
            graderTitle: "Gemmologist",
            signatoryTitle: d.signatory_title || "GDL. Director",
            disclaimer: "This gemstone certificate represents the characteristics of the gemstone at the time of examination and does not imply monetary value.",
            imageSrc: getProductImageUrl(d.image_url),
          };
        }
      }
    } catch (err) {
      console.warn("Direct verify API fetch failed:", err);
    }
    return undefined;
  };

  // Try direct exact and cleaned
  let report = await queryApi(trimmed);
  if (report) return report;

  if (cleaned && cleaned !== trimmed.toUpperCase()) {
    report = await queryApi(cleaned);
    if (report) return report;
  }

  // Fallback: Products API
  try {
    const { fetchProductsApi } = await import("@/lib/products");
    const { all } = await fetchProductsApi("all");
    const match = all.find(
      (p) =>
        p.gdl_report_no?.trim().toUpperCase() === trimmed.toUpperCase() ||
        p.gdl_report_no?.trim().replace(/[\s-]/g, "").toUpperCase() === cleaned
    );
    if (match) {
      const isDiamond = match.product_type === "diamond";
      const d = match as any;

      let dateStr = "";
      if (d.created_at) {
        const rawDate = String(d.created_at).split(" ")[0];
        const dateObj = new Date(rawDate);
        if (!isNaN(dateObj.getTime())) {
          dateStr = dateObj.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          });
        }
      }
      if (!dateStr) dateStr = "Recent";

      if (isDiamond) {
        return {
          reportNo: d.gdl_report_no,
          issuedOn: dateStr,
          reportTitle: "DIAMOND ANALYSIS REPORT",
          itemType: "Diamond",
          description: d.description || "Natural Round Diamond",
          measurements: d.measurement || "-",
          shape: d.shape_cut_style || "-",
          caratWeight: d.carat_weight || "-",
          colorGrade: d.color_grade || "-",
          clarityGrade: d.clarity_grade || "-",
          cutGrade: d.cut_grade || "-",
          polish: d.polish || "-",
          symmetry: d.symmetry || "-",
          fluorescence: d.fluorescence || "-",
          certifiedBy: d.certificate_lab || "Glamgehna Gemstone & Diamond Laboratory",
          comments: "Natural Diamond Verified. No treatment detected.",
          graderTitle: "Diamond Grader",
          signatoryTitle: "GDL. Director",
          disclaimer: "This diamond report represents the characteristics of the diamond at the time of examination and does not imply monetary value.",
          imageSrc: getProductImageUrl(d.image_url),
        };
      } else {
        const measurements =
          d.length_mm && d.width_mm && d.height_mm
            ? `${d.length_mm} x ${d.width_mm} x ${d.height_mm} MM`
            : "-";
        return {
          reportNo: d.gdl_report_no,
          issuedOn: dateStr,
          reportTitle: "GEMSTONE CERTIFICATE",
          itemType: "Gemstone",
          description: d.title || d.species || d.description || "Natural Gemstone",
          species: d.species || undefined,
          measurements: measurements,
          shape: d.shape || "-",
          caratWeight: d.weight_ct ? `${d.weight_ct} Ct` : "-",
          colorGrade: d.color || "-",
          clarityGrade: d.microscopic_observation || undefined,
          refractiveIndex: d.refractive_index || undefined,
          specificGravity: d.specific_gravity || undefined,
          opticalProperties: d.optical_properties || undefined,
          certifiedBy: d.certificate_type || "Glamgehna Gemstone & Diamond Laboratory",
          treatment: d.treatment || undefined,
          origin: d.origin || undefined,
          comments: d.treatment ? `Treatment: ${d.treatment}` : (d.origin ? `Origin: ${d.origin}` : "Natural Gemstone Verified"),
          graderTitle: "Gemmologist",
          signatoryTitle: "GDL. Director",
          disclaimer: "This gemstone certificate represents the characteristics of the gemstone at the time of examination and does not imply monetary value.",
          imageSrc: getProductImageUrl(d.image_url),
        };
      }
    }
  } catch (err) {
    console.warn("Fallback products API fetch error:", err);
  }

  return undefined;
}

export async function findReport(
  reportNo: string
): Promise<GemReport | undefined> {
  if (!reportNo.trim()) return undefined;
  return fetchVerifyCertificateApi(reportNo);
}

export function getAllReports(): GemReport[] {
  return [];
}

export function certificateUrl(reportNo: string): string {
  const query = new URLSearchParams({ gdl_report_no: reportNo });
  return `${SITE_URL}${ROUTES.certificateView}?${query}`;
}

export function isGemstoneReport(report: GemReport): boolean {
  if (report.itemType === "Gemstone") return true;
  if (report.itemType === "Diamond") return false;
  const t = (report.reportTitle || "").toUpperCase();
  const d = (report.description || "").toUpperCase();
  const g = (report.graderTitle || "").toUpperCase();
  return (
    t.includes("GEMSTONE") ||
    t.includes("COLORED STONE") ||
    d.includes("SAPPHIRE") ||
    d.includes("RUBY") ||
    d.includes("EMERALD") ||
    d.includes("GEMSTONE") ||
    g.includes("GEMMOLOGIST")
  );
}

export function reportTitle(report: GemReport): string {
  if (isGemstoneReport(report)) {
    return "GEMSTONE CERTIFICATE";
  }
  return report.reportTitle || "DIAMOND ANALYSIS REPORT";
}

export function graderLabel(report: GemReport): string {
  if (report.graderTitle) return report.graderTitle;
  return isGemstoneReport(report) ? "Gemmologist" : "Diamond Grader";
}
