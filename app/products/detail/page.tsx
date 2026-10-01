"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import {
  Product,
  GemProduct,
  DiamondProduct,
  fetchProductsApi,
  getProductImageUrl,
  getProductTitle,
  getProductWeight,
  getProductShape,
  getProductColor,
  getProductCertificate,
} from "@/lib/products";
import { ROUTES, CONTACT } from "@/lib/site";

function ProductDetailContent() {
  const searchParams = useSearchParams();
  const idParam = searchParams?.get("id");
  const typeParam = searchParams?.get("type");
  const reportParam = searchParams?.get("report_no");

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const res = await fetchProductsApi("all");
      if (mounted) {
        setAllProducts(res.all);
        setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  // Find targeted product
  const product = allProducts.find((p) => {
    if (reportParam && p.gdl_report_no?.toUpperCase() === reportParam.toUpperCase()) {
      return true;
    }
    if (idParam && String(p.id) === String(idParam)) {
      if (typeParam) {
        return p.product_type === typeParam;
      }
      return true;
    }
    return false;
  });

  // Related products in same category
  const relatedProducts = allProducts
    .filter((p) => p.id !== product?.id && p.product_type === product?.product_type)
    .slice(0, 4);

  const handleCopyReport = () => {
    if (product?.gdl_report_no) {
      navigator.clipboard.writeText(product.gdl_report_no);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="animate-pulse space-y-8">
          <div className="h-6 w-48 rounded bg-gray-200" />
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <div className="aspect-square rounded-3xl bg-gray-200 md:col-span-5" />
            <div className="space-y-4 md:col-span-7">
              <div className="h-8 w-3/4 rounded bg-gray-200" />
              <div className="h-4 w-1/2 rounded bg-gray-200" />
              <div className="h-32 rounded bg-gray-100" />
              <div className="h-12 w-full rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!product) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-12 shadow-sm">
          <span className="text-5xl">🔍</span>
          <h2 className="mt-4 text-2xl font-bold text-ggdl-blue">Specimen Not Found</h2>
          <p className="mt-2 text-sm text-gray-600">
            The requested gemstone or diamond could not be found in our current laboratory inventory.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href={ROUTES.products}
              className="rounded-xl bg-ggdl-blue px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-ggdl-blue/90"
            >
              ← Back to All Products
            </Link>
            <Link
              href={ROUTES.verifyYourReport}
              className="rounded-xl border border-ggdl-gold bg-amber-50/50 px-6 py-3 text-xs font-bold text-ggdl-gold hover:bg-ggdl-gold hover:text-ggdl-blue"
            >
              Verify a Certificate Report
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const isGem = product.product_type === "gem";
  const gem = isGem ? (product as GemProduct) : null;
  const diamond = !isGem ? (product as DiamondProduct) : null;

  const title = getProductTitle(product);
  const weight = getProductWeight(product);
  const shape = getProductShape(product);
  const color = getProductColor(product);
  const cert = getProductCertificate(product);
  const imgSrc = imgError
    ? "/img/guide-shapes.png"
    : getProductImageUrl(product.image_url);

  const verifyUrl = ROUTES.verifyYourReport;

  // WhatsApp prefilled message
  const waMessage = encodeURIComponent(
    `Hello GGDL, I am interested in inquiring about ${title}. Please provide price and viewing details.`
  );
  const waLink = `${CONTACT.whatsappHref}?text=${waMessage}`;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Lightbox Zoom Modal */}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
          onClick={() => setZoomOpen(false)}
        >
          <div className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-3xl bg-white p-4 shadow-2xl">
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              className="absolute top-4 right-4 z-10 rounded-full bg-black/70 p-2 text-white hover:bg-black"
            >
              ✕
            </button>
            <img
              src={imgSrc}
              alt={title}
              className="max-h-[80vh] w-auto object-contain mx-auto"
            />
            <p className="mt-2 text-center text-xs font-semibold text-gray-700">{title}</p>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-xs text-gray-500">
        <Link href={ROUTES.home} className="hover:text-ggdl-gold">
          Home
        </Link>
        <span>/</span>
        <Link href={ROUTES.products} className="hover:text-ggdl-gold">
          Products
        </Link>
        <span>/</span>
        <span className="font-semibold text-ggdl-blue">
          {isGem ? "Precious Gemstones" : "Certified Diamonds"}
        </span>
        <span>/</span>
        <span className="text-gray-400 truncate max-w-xs">{title}</span>
      </nav>

      {/* Main Product Showcase Section */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Column: Image & Media Gallery */}
        <div className="lg:col-span-5">
          <div className="sticky top-24 space-y-4">
            <div className="group relative aspect-square w-full overflow-hidden rounded-3xl border border-gray-200/80 bg-radial from-white via-slate-50 to-slate-100 shadow-xl">
              <img
                src={imgSrc}
                alt={title}
                onError={() => setImgError(true)}
                className="h-full w-full object-contain p-8 transition-transform duration-500 group-hover:scale-105 drop-shadow-lg cursor-zoom-in"
                onClick={() => setZoomOpen(true)}
              />

              {/* Type Badge */}
              <div className="absolute top-4 left-4 flex gap-2 pointer-events-none">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-extrabold uppercase tracking-wider shadow-sm flex items-center gap-1.5 ${
                    isGem
                      ? "bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 backdrop-blur-md"
                      : "bg-ggdl-blue/95 text-ggdl-gold border border-ggdl-gold/40 backdrop-blur-md"
                  }`}
                >
                  <span>{isGem ? "💎" : "✨"}</span>
                  {isGem ? "Gemstone" : "Diamond"}
                </span>

                {cert && (
                  <span className="rounded-full bg-slate-900/85 px-3 py-1 text-xs font-semibold text-white border border-white/10 backdrop-blur-md">
                    {cert} Certified
                  </span>
                )}
              </div>

              {/* Weight Pill */}
              {weight !== "-" && (
                <div className="absolute bottom-4 left-4 pointer-events-none">
                  <span className="rounded-xl bg-gradient-to-r from-ggdl-blue to-[#0b2447] px-3.5 py-1.5 text-sm font-extrabold text-white shadow-md border border-white/10">
                    {weight}
                  </span>
                </div>
              )}

              {/* Click to Zoom hint */}
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                className="absolute bottom-4 right-4 rounded-xl bg-white/90 px-3 py-1.5 text-xs font-bold text-ggdl-blue shadow-md hover:bg-white transition flex items-center gap-1"
              >
                <span>🔍</span> Zoom
              </button>
            </div>

            {/* Verification Guarantee Box */}
            <div className="flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50/70 p-4 text-xs shadow-xs">
              <div className="flex items-center gap-2.5 text-emerald-900">
                <span className="text-lg">🛡️</span>
                <div>
                  <span className="font-bold block">100% Laboratory Verified</span>
                  <span className="text-emerald-700 text-2xs">Tamper-Proof Grading Record</span>
                </div>
              </div>
              <Link
                href={verifyUrl}
                className="rounded-xl bg-emerald-700 px-3 py-2 text-xs font-bold text-white shadow-xs hover:bg-emerald-800 transition"
              >
                Verify Online →
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Specifications & Action Details */}
        <div className="lg:col-span-7">
          {/* Header info */}
          <div className="border-b border-gray-200 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-widest text-ggdl-gold bg-amber-50 px-3 py-1 rounded-md border border-ggdl-gold/30">
                {isGem ? gem?.species || "Gemological Specimen" : "Lab Graded Diamond"}
              </span>


            </div>

            <h1 className="mt-4 text-2xl font-extrabold text-ggdl-blue sm:text-3xl tracking-tight">
              {title}
            </h1>

            {/* Quick Highlights Grid */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-2xl bg-slate-50 p-3.5 text-center border border-gray-100">
                <span className="block text-2xs uppercase font-bold text-gray-500 tracking-wider">Weight</span>
                <span className="mt-1 block text-sm font-extrabold text-ggdl-blue">{weight}</span>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3.5 text-center border border-gray-100">
                <span className="block text-2xs uppercase font-bold text-gray-500 tracking-wider">Shape & Cut</span>
                <span className="mt-1 block text-sm font-extrabold text-ggdl-blue truncate">{shape}</span>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3.5 text-center border border-gray-100">
                <span className="block text-2xs uppercase font-bold text-gray-500 tracking-wider">Color Grade</span>
                <span className="mt-1 block text-sm font-extrabold text-ggdl-blue truncate">{color}</span>
              </div>

              <div className="rounded-2xl bg-slate-50 p-3.5 text-center border border-gray-100">
                <span className="block text-2xs uppercase font-bold text-gray-500 tracking-wider">Certificate</span>
                <span className="mt-1 block text-sm font-extrabold text-ggdl-blue">{cert}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="my-6 flex flex-wrap gap-3.5">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition-all hover:bg-emerald-700 hover:shadow-xl"
            >
              <span>💬</span>
              Inquire on WhatsApp
            </a>



            <button
              type="button"
              onClick={() => window.print()}
              className="flex items-center justify-center gap-1.5 rounded-2xl border border-gray-300 bg-white px-5 py-4 text-xs font-bold text-gray-700 transition hover:bg-gray-50 shadow-xs"
            >
              <span>🖨️</span> Print Spec Sheet
            </button>
          </div>

          {/* Comprehensive Gemological Specifications Table */}
          <div className="mt-8 rounded-3xl border border-gray-200/90 bg-white p-6 shadow-xs">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3.5">
              <h2 className="text-base font-bold text-ggdl-blue flex items-center gap-2">
                <span>🔬</span> Complete Gemological Specifications
              </h2>
              <span className="text-2xs font-semibold text-gray-500 uppercase tracking-wider">
                Laboratory Grade Data
              </span>
            </div>

            <div className="mt-4 divide-y divide-gray-100 text-xs">
              {isGem && gem && (
                <>
                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Species / Variety</span>
                    <span className="col-span-2 font-bold text-ggdl-blue">{gem.species || "-"}</span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Shape & Cut</span>
                    <span className="col-span-2 font-bold text-ggdl-blue">{gem.shape || "-"}</span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Carat Weight</span>
                    <span className="col-span-2 font-bold text-ggdl-blue">{gem.weight_ct ? `${gem.weight_ct} Ct` : "-"}</span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Dimensions (L × W × H)</span>
                    <span className="col-span-2 font-medium text-gray-800">
                      {gem.length_mm && gem.width_mm && gem.height_mm
                        ? `${gem.length_mm} × ${gem.width_mm} × ${gem.height_mm} mm`
                        : "-"}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Color Grade / Shade</span>
                    <span className="col-span-2 font-medium text-gray-800">{gem.color || "-"}</span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Microscopic Observation</span>
                    <span className="col-span-2 font-medium text-gray-800">{gem.microscopic_observation || "-"}</span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Specific Gravity</span>
                    <span className="col-span-2 font-medium text-gray-800">{gem.specific_gravity || "-"}</span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Refractive Index</span>
                    <span className="col-span-2 font-medium text-gray-800">{gem.refractive_index || "-"}</span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Mohs Hardness Scale</span>
                    <span className="col-span-2 font-medium text-gray-800">{gem.mohs_scale || "-"}</span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Optical Properties</span>
                    <span className="col-span-2 font-medium text-gray-800">{gem.optical_properties || "-"}</span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Treatment</span>
                    <span className="col-span-2 font-medium text-gray-800">{gem.treatment || "Untreated / None"}</span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Origin / Provenance</span>
                    <span className="col-span-2 font-medium text-gray-800">{gem.origin || "Laboratory Grown / Verified"}</span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Grading Laboratory</span>
                    <span className="col-span-2 font-bold text-ggdl-blue">{gem.certificate_type || "GDL"}</span>
                  </div>
                </>
              )}

              {!isGem && diamond && (
                <>
                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Description</span>
                    <span className="col-span-2 font-bold text-ggdl-blue">{diamond.description || "-"}</span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Carat Weight</span>
                    <span className="col-span-2 font-bold text-ggdl-blue">{diamond.carat_weight || "-"}</span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Shape &amp; Cutting Style</span>
                    <span className="col-span-2 font-bold text-ggdl-blue">{diamond.shape_cut_style || "-"}</span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Measurements</span>
                    <span className="col-span-2 font-medium text-gray-800">{diamond.measurement || "-"}</span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Color Grade</span>
                    <span className="col-span-2 font-medium text-gray-800">{diamond.color_grade || "-"}</span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Clarity Grade</span>
                    <span className="col-span-2 font-medium text-gray-800">{diamond.clarity_grade || "-"}</span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Cut Grade</span>
                    <span className="col-span-2 font-medium text-gray-800">{diamond.cut_grade || "-"}</span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Polish</span>
                    <span className="col-span-2 font-medium text-gray-800">{diamond.polish || "-"}</span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Symmetry</span>
                    <span className="col-span-2 font-medium text-gray-800">{diamond.symmetry || "-"}</span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Fluorescence</span>
                    <span className="col-span-2 font-medium text-gray-800">{diamond.fluorescence || "-"}</span>
                  </div>

                  <div className="grid grid-cols-3 py-3 items-center">
                    <span className="font-semibold text-gray-500">Certification Lab</span>
                    <span className="col-span-2 font-bold text-ggdl-blue">{diamond.certificate_lab || "GDL"}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 border-t border-gray-200 pt-12">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-ggdl-gold">
                More In This Category
              </span>
              <h2 className="mt-1 text-xl font-bold text-ggdl-blue sm:text-2xl">
                Related {isGem ? "Precious Gemstones" : "Certified Diamonds"}
              </h2>
            </div>

            <Link
              href={ROUTES.products}
              className="text-xs font-bold text-ggdl-blue hover:text-ggdl-gold transition"
            >
              View Full Inventory →
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((p) => (
              <ProductCard key={`${p.product_type}-${p.id}-${p.gdl_report_no}`} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default function ProductDetailPage() {
  return (
    <>
      <PageBanner
        title="SPECIMEN DETAILS & SPECIFICATIONS"
        subtitle="Complete scientific analysis and laboratory grading breakdown"
      />

      <Suspense
        fallback={
          <main className="mx-auto w-full max-w-7xl px-4 py-16 text-center">
            <p className="text-sm font-semibold text-gray-600">Loading specimen details...</p>
          </main>
        }
      >
        <ProductDetailContent />
      </Suspense>

      <Footer />
    </>
  );
}
