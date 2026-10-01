"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { Product, fetchProductsApi } from "@/lib/products";
import { ROUTES } from "@/lib/site";

export default function HomeProductsShowcase() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "gems" | "diamonds">("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      setLoading(true);
      const res = await fetchProductsApi("all");
      if (mounted) {
        setProducts(res.all);
        setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const displayedProducts = products
    .filter((p) => {
      if (activeTab === "gems") return p.product_type === "gem";
      if (activeTab === "diamonds") return p.product_type === "diamond";
      return true;
    })
    .slice(0, 8);

  return (
    <section className="my-16 md:my-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200/80 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-ggdl-gold border border-ggdl-gold/30">
              <span>✨</span> Verified Laboratory Collection
            </div>
            <h2 className="mt-3 text-3xl font-extrabold text-ggdl-blue sm:text-4xl tracking-tight">
              Featured Gemstones &amp; Diamonds
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl">
              Browse authentic certified diamonds and natural gemstones tested and graded by international standard gemological laboratories.
            </p>
          </div>

          {/* Tab Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "all"
                  ? "bg-ggdl-blue text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All ({products.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("gems")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "gems"
                  ? "bg-emerald-800 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Gemstones
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("diamonds")}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                activeTab === "diamonds"
                  ? "bg-sky-800 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Diamonds
            </button>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl border border-gray-100 bg-white p-4 shadow-xs">
                <div className="aspect-4/3 w-full rounded-xl bg-gray-200" />
                <div className="mt-4 h-4 w-3/4 rounded bg-gray-200" />
                <div className="mt-2 h-3 w-1/2 rounded bg-gray-200" />
                <div className="mt-4 h-14 w-full rounded bg-gray-100" />
              </div>
            ))}
          </div>
        )}

        {/* Products Grid */}
        {!loading && (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {displayedProducts.map((p) => (
              <ProductCard key={`${p.product_type}-${p.id}-${p.gdl_report_no}`} product={p} />
            ))}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href={ROUTES.products}
            className="inline-flex items-center gap-3 rounded-2xl bg-ggdl-blue px-8 py-4 text-sm font-bold text-white shadow-lg shadow-ggdl-blue/20 transition-all hover:bg-ggdl-blue/90 hover:scale-105"
          >
            Explore Complete Inventory ({products.length} Items) →
          </Link>
        </div>
      </div>
    </section>
  );
}
