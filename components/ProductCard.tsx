"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Product,
  getProductImageUrl,
  getProductTitle,
  getProductWeight,
  getProductShape,
  getProductColor,
  getProductCertificate,
} from "@/lib/products";
import { ROUTES, CONTACT } from "@/lib/site";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(getProductImageUrl(product.image_url));
  const [imgError, setImgError] = useState(false);

  const title = getProductTitle(product);
  const weight = getProductWeight(product);
  const shape = getProductShape(product);
  const color = getProductColor(product);
  const cert = getProductCertificate(product);
  const reportNo = product.gdl_report_no?.trim() || "";

  const isGem = product.product_type === "gem";
  const detailUrl = `/products/detail?id=${product.id}&type=${product.product_type}`;
  const verifyUrl = reportNo
    ? `${ROUTES.certificateView}?gdl_report_no=${encodeURIComponent(reportNo)}`
    : ROUTES.verifyYourReport;

  const waMessage = encodeURIComponent(
    `Hello GGDL, I am interested in ${title}. Could you share more details?`
  );
  const waLink = `${CONTACT.whatsappHref}?text=${waMessage}`;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-ggdl-gold/50"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)" }}
    >
      {/* Image */}
      <Link href={detailUrl} className="relative block aspect-square w-full overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={imgError ? "/img/guide-shapes.png" : imgSrc}
          alt={title}
          onError={() => {
            setImgError(true);
            setImgSrc("/img/guide-shapes.png");
          }}
          className="h-full w-full object-contain p-5 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Type pill — top-left */}
        <span
          className={`absolute top-2.5 left-2.5 rounded-full px-2.5 py-[3px] text-[10px] font-bold uppercase tracking-wide ${
            isGem
              ? "bg-emerald-600 text-white"
              : "bg-ggdl-blue text-white"
          }`}
        >
          {isGem ? "Gemstone" : "Diamond"}
        </span>

        {/* Certificate pill — top-right */}
        <span className="absolute top-2.5 right-2.5 rounded-full bg-white/90 border border-gray-200 px-2 py-[3px] text-[10px] font-bold text-gray-700 backdrop-blur-sm shadow-xs">
          {cert} Certified
        </span>

        {/* Weight pill — bottom-left */}
        {weight !== "-" && (
          <span className="absolute bottom-2.5 left-2.5 rounded-md bg-ggdl-blue/90 px-2 py-[3px] text-[11px] font-bold text-white shadow-sm">
            {weight}
          </span>
        )}
      </Link>

      {/* Body */}
      <div className="flex flex-1 flex-col px-4 pt-3.5 pb-4">
        {/* Title */}
        <Link href={detailUrl}>
          <h3
            className="line-clamp-2 text-[15px] font-bold leading-tight text-gray-900 transition-colors group-hover:text-ggdl-gold"
            title={title}
          >
            {title}
          </h3>
        </Link>

        {/* Specs */}
        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[12px]">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 block">Shape</span>
            <span className="font-semibold text-gray-800 truncate block">{shape}</span>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 block">Color</span>
            <span className="font-semibold text-gray-800 truncate block">{color}</span>
          </div>

          {isGem ? (
            <>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 block">Species</span>
                <span className="font-semibold text-gray-800 truncate block">{product.species || "-"}</span>
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 block">Origin</span>
                <span className="font-semibold text-gray-800 truncate block">{product.origin || "-"}</span>
              </div>
            </>
          ) : (
            <>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 block">Clarity</span>
                <span className="font-semibold text-gray-800 truncate block">{product.clarity_grade || "-"}</span>
              </div>
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 block">Cut</span>
                <span className="font-semibold text-gray-800 truncate block">{product.cut_grade || "-"}</span>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto pt-3.5 flex gap-2">
          <Link
            href={detailUrl}
            className="flex-1 rounded-lg bg-ggdl-blue py-2 text-center text-[12px] font-bold text-white transition hover:bg-ggdl-blue/90"
          >
            View Details
          </Link>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[12px] font-bold text-emerald-700 transition hover:bg-emerald-100"
          >
            💬
          </a>
        </div>
      </div>
    </div>
  );
}
