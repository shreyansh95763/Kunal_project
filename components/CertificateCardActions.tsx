"use client";

import { useEffect } from "react";
import { GemReport } from "@/lib/reports";

export default function CertificateCardActions({
  report: _report,
}: {
  report: GemReport;
}) {
  const handlePrint = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (typeof window !== "undefined") {
      try {
        window.print();
      } catch (err) {
        console.error("Print dialog error:", err);
      }
    }
  };

  useEffect(() => {
    const btn = document.getElementById("print-certificate-btn");
    if (btn) {
      const listener = (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        window.print();
      };
      btn.addEventListener("click", listener);
      return () => btn.removeEventListener("click", listener);
    }
  }, []);

  return (
    <div className="no-print mt-6 flex flex-col items-center gap-3 w-full px-2">
      {/* Plastic Card Dimension Badge */}
      <div className="inline-flex items-center justify-center gap-2 rounded-full border border-amber-200/80 bg-amber-50/90 px-4 py-1.5 text-xs font-medium text-amber-900 shadow-xs text-center max-w-full">
        <svg
          className="h-4 w-4 text-amber-600 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="2" y="5" width="20" height="14" rx="2" />
          <line x1="2" y1="10" x2="22" y2="10" />
        </svg>
        <span>
          <strong>Standard Card Size:</strong> 8.6 cm × 5.4 cm (CR80 Plastic Card • Print &amp; PDF Ready)
        </span>
      </div>

      {/* Single DOWNLOAD / PRINT Button */}
      <div className="flex items-center justify-center w-full">
        <button
          type="button"
          id="print-certificate-btn"
          onClick={handlePrint}
          className="inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#0c1e36] px-8 py-4 text-sm sm:text-base font-bold text-white shadow-xl transition-all duration-300 hover:bg-[#12283d] hover:shadow-2xl hover:scale-[1.02] active:scale-98 cursor-pointer border border-[#c59d3f]/60 w-full sm:w-auto max-w-md select-none"
        >
          <svg
            className="h-5 w-5 text-[#c59d3f] shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4H7v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          <span className="tracking-wide">DOWNLOAD / PRINT (8.6 cm × 5.4 cm)</span>
        </button>
      </div>

      {/* Pure inline fallback script that attaches directly to the DOM at parse time */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              function attachPrint() {
                var btn = document.getElementById('print-certificate-btn');
                if (btn && !btn._hasPrintListener) {
                  btn._hasPrintListener = true;
                  btn.onclick = function(e) {
                    if (e) e.preventDefault();
                    window.print();
                  };
                }
              }
              if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', attachPrint);
              } else {
                attachPrint();
              }
            })();
          `,
        }}
      />

      <p className="text-[12px] text-gray-500 text-center max-w-md px-2">
        Opens the print dialog to <strong>Save as PDF</strong> or <strong>Print</strong> at exact plastic card size (8.6 cm × 5.4 cm) on any printer.
      </p>
    </div>
  );
}
