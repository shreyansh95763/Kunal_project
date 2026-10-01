/**
 * Products API integration for GGDL Gemstones & Diamonds.
 * Source API: https://glamgehna.com/get_products_api.php?category=all
 */

export const API_BASE_URL = "https://glamgehna.com/get_products_api.php";
export const MEDIA_BASE_URL = "https://www.glamgehna.com/admin";

export interface BaseProduct {
  id: number;
  gdl_report_no: string;
  image_url: string;
  created_at: string;
  product_type: "gem" | "diamond";
}

export interface GemProduct extends BaseProduct {
  product_type: "gem";
  title: string;
  description: string | null;
  species: string;
  shape: string;
  length_mm: string;
  width_mm: string;
  height_mm: string;
  weight_ct: string;
  color: string;
  microscopic_observation: string;
  specific_gravity: string;
  refractive_index: string;
  mohs_scale: string;
  optical_properties: string;
  treatment: string;
  origin: string;
  certificate_type: string;
}

export interface DiamondProduct extends BaseProduct {
  product_type: "diamond";
  description: string;
  title?: string;
  measurement: string;
  shape_cut_style: string;
  carat_weight: string;
  color_grade: string;
  clarity_grade: string;
  cut_grade: string;
  polish: string;
  symmetry: string;
  fluorescence: string;
  certificate_lab: string;
}

export type Product = GemProduct | DiamondProduct;

export interface ProductsApiResponse {
  status: string;
  total_products: number;
  query: {
    category: string;
    report_no: string;
    id: number;
  };
  data: {
    gems: GemProduct[];
    diamonds: DiamondProduct[];
  };
}

/**
 * Returns full URL for product image.
 */
export function getProductImageUrl(path?: string | null): string {
  if (!path) {
    return "/img/guide-shapes.png";
  }
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${MEDIA_BASE_URL}/${cleanPath}`;
}

/**
 * Normalizes product display title.
 */
export function getProductTitle(product: Product): string {
  if (product.product_type === "gem") {
    return product.title || product.species || `Gemstone`;
  }
  return (
    product.description ||
    product.title ||
    `${product.carat_weight || ""} ${product.shape_cut_style || ""} Diamond`.trim() ||
    `Diamond`
  );
}

/**
 * Normalizes carat weight string.
 */
export function getProductWeight(product: Product): string {
  if (product.product_type === "gem") {
    return product.weight_ct ? `${product.weight_ct} Ct` : "-";
  }
  return product.carat_weight || "-";
}

/**
 * Normalizes shape string.
 */
export function getProductShape(product: Product): string {
  if (product.product_type === "gem") {
    return product.shape || "-";
  }
  return product.shape_cut_style || "-";
}

/**
 * Normalizes color string.
 */
export function getProductColor(product: Product): string {
  if (product.product_type === "gem") {
    return product.color || "-";
  }
  return product.color_grade || "-";
}

/**
 * Normalizes certificate issuer.
 */
export function getProductCertificate(product: Product): string {
  if (product.product_type === "gem") {
    const cert = product.certificate_type?.trim();
    return cert || "GDL";
  }
  const lab = (product.certificate_lab || "GDL").trim();
  if (
    lab.toLowerCase().includes("gemstone and diamond identification laboratory") ||
    lab.toLowerCase().includes("global diamond laboratory") ||
    lab.toLowerCase().includes("ggdl") ||
    lab.toLowerCase().includes("gdl")
  ) {
    return "GDL";
  }
  if (lab.toLowerCase().includes("igi")) return "IGI";
  if (lab.toLowerCase().includes("gia")) return "GIA";
  return lab.length > 12 ? "GDL" : lab;
}

/**
 * Fetches all products or by category from API.
 */
export async function fetchProductsApi(
  category: "all" | "gems" | "diamonds" = "all"
): Promise<{ gems: GemProduct[]; diamonds: DiamondProduct[]; all: Product[] }> {
  try {
    const res = await fetch(`${API_BASE_URL}?category=${category}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) {
      throw new Error(`API returned status ${res.status}`);
    }
    const json: ProductsApiResponse = await res.json();
    const gems = json.data?.gems || [];
    const diamonds = json.data?.diamonds || [];
    const all: Product[] = [...gems, ...diamonds];
    return { gems, diamonds, all };
  } catch (error) {
    console.error("Failed to fetch products API:", error);
    return { gems: [], diamonds: [], all: [] };
  }
}
