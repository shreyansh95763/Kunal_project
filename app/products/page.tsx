"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import {
  Product,
  GemProduct,
  DiamondProduct,
  fetchProductsApi,
  getProductTitle,
  getProductShape,
  getProductColor,
  getProductWeight,
} from "@/lib/products";
import { ROUTES } from "@/lib/site";

export default function ProductsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<"all" | "gems" | "diamonds">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedShape, setSelectedShape] = useState<string>("all");
  const [selectedColor, setSelectedColor] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "weight-desc" | "weight-asc">("newest");

  useEffect(() => {
    let mounted = true;
    async function loadData() {
      setLoading(true);
      const res = await fetchProductsApi("all");
      if (mounted) {
        setAllProducts(res.all);
        setLoading(false);
      }
    }
    loadData();
    return () => {
      mounted = false;
    };
  }, []);

  // Extract unique filter options from data
  const shapes = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach((p) => {
      const s = getProductShape(p);
      if (s && s !== "-") set.add(s.trim());
    });
    return Array.from(set).sort();
  }, [allProducts]);

  const colors = useMemo(() => {
    const set = new Set<string>();
    allProducts.forEach((p) => {
      const c = getProductColor(p);
      if (c && c !== "-") set.add(c.trim());
    });
    return Array.from(set).sort();
  }, [allProducts]);

  // Counts by category
  const gemsCount = useMemo(
    () => allProducts.filter((p) => p.product_type === "gem").length,
    [allProducts]
  );
  const diamondsCount = useMemo(
    () => allProducts.filter((p) => p.product_type === "diamond").length,
    [allProducts]
  );

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        // Category Filter
        if (selectedCategory === "gems" && product.product_type !== "gem") return false;
        if (selectedCategory === "diamonds" && product.product_type !== "diamond") return false;

        // Shape Filter
        if (selectedShape !== "all") {
          const shape = getProductShape(product).toLowerCase();
          if (!shape.includes(selectedShape.toLowerCase())) return false;
        }

        // Color Filter
        if (selectedColor !== "all") {
          const color = getProductColor(product).toLowerCase();
          if (!color.includes(selectedColor.toLowerCase())) return false;
        }

        // Search Query (title, report number, species, origin, color)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const title = getProductTitle(product).toLowerCase();
          const shape = getProductShape(product).toLowerCase();
          const color = getProductColor(product).toLowerCase();

          const matches =
            title.includes(q) ||
            shape.includes(q) ||
            color.includes(q);

          if (!matches) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "weight-desc" || sortBy === "weight-asc") {
          const parseWeight = (p: Product) => {
            const raw = p.product_type === "gem" ? p.weight_ct : p.carat_weight;
            const num = parseFloat(String(raw || "").replace(/[^0-9.]/g, ""));
            return isNaN(num) ? 0 : num;
          };
          const wA = parseWeight(a);
          const wB = parseWeight(b);
          return sortBy === "weight-desc" ? wB - wA : wA - wB;
        }
        // Default newest (id desc)
        return b.id - a.id;
      });
  }, [allProducts, selectedCategory, selectedShape, selectedColor, searchQuery, sortBy]);

  const resetFilters = () => {
    setSelectedCategory("all");
    setSelectedShape("all");
    setSelectedColor("all");
    setSearchQuery("");
    setSortBy("newest");
  };

  return (
    <>
      <PageBanner
        title="CERTIFIED GEMSTONES & DIAMONDS"
        subtitle="Explore our verified inventory of laboratory-graded diamonds and fine precious gemstones"
      />

      <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 pb-6">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-200 ${
                selectedCategory === "all"
                  ? "bg-ggdl-blue text-white shadow-md shadow-ggdl-blue/20 ring-2 ring-ggdl-gold/50"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>💎</span>
              All Inventory
              <span className={`rounded-full px-2 py-0.5 text-xs ${selectedCategory === "all" ? "bg-ggdl-gold text-ggdl-blue font-extrabold" : "bg-gray-300 text-gray-700"}`}>
                {allProducts.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory("gems")}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-200 ${
                selectedCategory === "gems"
                  ? "bg-ggdl-blue text-white shadow-md shadow-ggdl-blue/20 ring-2 ring-emerald-400"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>🟢</span>
              Precious Gemstones
              <span className={`rounded-full px-2 py-0.5 text-xs ${selectedCategory === "gems" ? "bg-emerald-400 text-ggdl-blue font-extrabold" : "bg-gray-300 text-gray-700"}`}>
                {gemsCount}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setSelectedCategory("diamonds")}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all duration-200 ${
                selectedCategory === "diamonds"
                  ? "bg-ggdl-blue text-white shadow-md shadow-ggdl-blue/20 ring-2 ring-sky-400"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <span>✨</span>
              Certified Diamonds
              <span className={`rounded-full px-2 py-0.5 text-xs ${selectedCategory === "diamonds" ? "bg-sky-300 text-ggdl-blue font-extrabold" : "bg-gray-300 text-gray-700"}`}>
                {diamondsCount}
              </span>
            </button>
          </div>

          {/* Quick Verification Link */}
          <Link
            href={ROUTES.verifyYourReport}
            className="inline-flex items-center gap-2 text-xs font-bold text-ggdl-blue hover:text-ggdl-gold transition"
          >
            <span>🔍 Have a Report Number? Verify Online →</span>
          </Link>
        </div>

        {/* Search and Filters Toolbar */}
        <div className="my-8 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-xs">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-5">
            {/* Search Input */}
            <div className="md:col-span-2">
              <label htmlFor="product-search" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Search Inventory
              </label>
              <div className="relative">
                <input
                  id="product-search"
                  type="text"
                  placeholder="Search by name, species, shape, color..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 bg-gray-50/50 px-4 py-2.5 pl-10 text-sm text-gray-900 transition focus:border-ggdl-blue focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-ggdl-blue/20"
                />
                <span className="absolute top-3 left-3.5 text-gray-400 text-sm">🔍</span>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute top-2.5 right-3 text-xs text-gray-400 hover:text-gray-600 font-bold"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Shape Filter */}
            <div>
              <label htmlFor="shape-filter" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Shape / Cut
              </label>
              <select
                id="shape-filter"
                value={selectedShape}
                onChange={(e) => setSelectedShape(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-gray-50/50 px-3 py-2.5 text-sm text-gray-900 transition focus:border-ggdl-blue focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-ggdl-blue/20"
              >
                <option value="all">All Shapes ({shapes.length})</option>
                {shapes.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Color Filter */}
            <div>
              <label htmlFor="color-filter" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Color Grade
              </label>
              <select
                id="color-filter"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full rounded-xl border border-gray-300 bg-gray-50/50 px-3 py-2.5 text-sm text-gray-900 transition focus:border-ggdl-blue focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-ggdl-blue/20"
              >
                <option value="all">All Colors ({colors.length})</option>
                {colors.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div>
              <label htmlFor="sort-by" className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                Sort By
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full rounded-xl border border-gray-300 bg-gray-50/50 px-3 py-2.5 text-sm text-gray-900 transition focus:border-ggdl-blue focus:bg-white focus:outline-hidden focus:ring-2 focus:ring-ggdl-blue/20"
              >
                <option value="newest">Newest Listed</option>
                <option value="weight-desc">Carat Weight (High to Low)</option>
                <option value="weight-asc">Carat Weight (Low to High)</option>
              </select>
            </div>
          </div>

          {/* Active Filter Chips */}
          {(selectedShape !== "all" || selectedColor !== "all" || searchQuery !== "" || selectedCategory !== "all") && (
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-3">
              <span className="text-xs font-medium text-gray-500">Active Filters:</span>

              {selectedCategory !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-ggdl-blue">
                  Type: {selectedCategory}
                  <button type="button" onClick={() => setSelectedCategory("all")} className="hover:text-red-500 font-bold ml-1">×</button>
                </span>
              )}

              {selectedShape !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-ggdl-blue">
                  Shape: {selectedShape}
                  <button type="button" onClick={() => setSelectedShape("all")} className="hover:text-red-500 font-bold ml-1">×</button>
                </span>
              )}

              {selectedColor !== "all" && (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-ggdl-blue">
                  Color: {selectedColor}
                  <button type="button" onClick={() => setSelectedColor("all")} className="hover:text-red-500 font-bold ml-1">×</button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-ggdl-blue">
                  Query: &ldquo;{searchQuery}&rdquo;
                  <button type="button" onClick={() => setSearchQuery("")} className="hover:text-red-500 font-bold ml-1">×</button>
                </span>
              )}

              <button
                type="button"
                onClick={resetFilters}
                className="ml-auto text-xs font-bold text-red-600 hover:text-red-800 transition underline"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-700">
            Showing <span className="font-bold text-ggdl-blue">{filteredProducts.length}</span> certified specimens
          </p>

          <span className="text-xs text-gray-500 hidden sm:inline-block">
            All specimens backed by GGDL official tamper-proof laboratory certification
          </span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-gray-100 bg-white p-4 shadow-xs">
                <div className="aspect-4/3 w-full rounded-xl bg-gray-200" />
                <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
                <div className="mt-2 h-3 w-1/2 rounded bg-gray-200" />
                <div className="mt-4 h-16 w-full rounded bg-gray-100" />
                <div className="mt-4 h-10 w-full rounded bg-gray-200" />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50/50 p-12 text-center">
            <span className="text-4xl">💎</span>
            <h3 className="mt-3 text-lg font-bold text-ggdl-blue">No matching products found</h3>
            <p className="mt-1 text-sm text-gray-600 max-w-md mx-auto">
              We couldn&apos;t find any gemstones or diamonds matching your current filter criteria.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex items-center rounded-xl bg-ggdl-blue px-6 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-ggdl-blue/90"
            >
              Clear All Filters
            </button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={`${product.product_type}-${product.id}-${product.gdl_report_no}`}
                product={product}
              />
            ))}
          </div>
        )}

        {/* Bottom Trust Banner */}
        <section className="mt-16 overflow-hidden rounded-3xl bg-linear-to-r from-ggdl-blue to-[#0b2447] p-8 text-white shadow-xl sm:p-12">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-ggdl-gold/20 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-ggdl-gold">
                Laboratory Grade Assurance
              </span>
              <h2 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl text-white">
                Every Gemstone & Diamond is Independently Verified
              </h2>
              <p className="mt-3 text-sm text-gray-300 leading-relaxed">
                Every stone in our registry comes with a tamper-proof digital and physical grading report detailing optical properties, microscopic observations, refractive index, and specific gravity.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  href={ROUTES.verifyYourReport}
                  className="rounded-xl bg-ggdl-gold px-6 py-3 text-xs font-bold text-ggdl-blue transition hover:bg-ggdl-gold/90 shadow-md"
                >
                  Verify Any Report Number →
                </Link>
                <Link
                  href={ROUTES.contact}
                  className="rounded-xl border border-white/30 px-6 py-3 text-xs font-bold text-white transition hover:bg-white/10"
                >
                  Custom Sourcing & Inquiries
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xs">
                <div className="text-3xl font-extrabold text-ggdl-gold">64+</div>
                <div className="mt-1 text-xs font-medium text-gray-300">Certified Specimens</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xs">
                <div className="text-3xl font-extrabold text-ggdl-gold">100%</div>
                <div className="mt-1 text-xs font-medium text-gray-300">Lab Tested Authenticity</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xs">
                <div className="text-3xl font-extrabold text-ggdl-gold">GDL / IGI</div>
                <div className="mt-1 text-xs font-medium text-gray-300">Accredited Formats</div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xs">
                <div className="text-3xl font-extrabold text-ggdl-gold">Direct</div>
                <div className="mt-1 text-xs font-medium text-gray-300">Lab Inquiry Support</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
