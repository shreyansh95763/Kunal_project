"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import CertificateCard from "@/components/CertificateCard";
import CertificateCardActions from "@/components/CertificateCardActions";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import ReportSearchForm from "@/components/ReportSearchForm";
import { findReport, GemReport } from "@/lib/reports";
import { ROUTES } from "@/lib/site";

type FetchStatus = "idle" | "loading" | "found" | "not_found" | "error";

function CheckIcon() {
  return (
    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function CertificateContent() {
  const searchParams = useSearchParams();
  const rawParam = searchParams?.get("gdl_report_no");

  const [reportNo, setReportNo] = useState("");
  const [report, setReport] = useState<GemReport | null>(null);
  const [status, setStatus] = useState<FetchStatus>("idle");

  useEffect(() => {
    let q = rawParam?.trim() || "";
    if (!q && typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      q = (urlParams.get("gdl_report_no") || "").trim();
    }
    setReportNo(q);
  }, [rawParam]);

  useEffect(() => {
    console.log("reportNo", reportNo)

    if (!reportNo) {
      setStatus("idle");
      setReport(null);
      return;
    }

    let active = true;
    setStatus("loading");
    setReport(null);

    (async () => {
      try {
        const res = await findReport(reportNo);
        console.log("Response", res, active)
        if (!active) return;
        if (res) {
          setReport(res);
          setStatus("found");
        } else {
          setStatus("not_found");
        }
      } catch (err: unknown) {
        console.error("Certificate fetch error:", err);
        if (!active) return;
        // Distinguish a true network failure from a "not found" result
        const isNetworkErr =
          err instanceof TypeError ||
          (err instanceof DOMException && err.name === "AbortError");
        setStatus(isNetworkErr ? "error" : "not_found");
      }
    })();

    return () => {
      active = false;
    };
  }, [reportNo]);

  return (
    <main className="mx-auto w-full max-w-5xl px-2 xs:px-4 py-6 sm:py-10">
      {/* Search Bar */}
      <div className="no-print mb-8">
        <div className="max-w-2xl">
          <ReportSearchForm variant="inline" defaultValue={reportNo} />
        </div>
      </div>

      {/* ── Idle (No query param entered) ── */}
      {status === "idle" && (
        <section className="rounded-2xl bg-white p-8 text-center shadow-md border border-gray-100 my-4 max-w-2xl mx-auto">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-[#0c1e36]">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h2 className="mt-3 text-base font-extrabold text-[#0c1e36]">Verify Your Report</h2>
          <p className="mt-1 text-sm text-gray-600">
            Enter a report number (e.g. <span className="font-bold text-[#0c1e36]">GD52416</span>) above to view and verify its official GDL certificate.
          </p>
        </section>
      )}

      {/* ── Loading ── */}
      {status === "loading" && (
        <section className="rounded-2xl bg-white p-8 text-center shadow-md border border-gray-100 my-4 max-w-2xl mx-auto">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-[#0c1e36] border-t-transparent" />
          <p className="mt-3 text-sm font-semibold text-gray-700">
            Verifying report <span className="text-[#0c1e36]">#{reportNo}</span> with laboratory API…
          </p>
        </section>
      )}

      {/* ── Not Found ── */}
      {status === "not_found" && (
        <section className="rounded-2xl border-l-4 border-amber-500 bg-white p-6 shadow-md my-4 max-w-2xl mx-auto border border-gray-100">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-700">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#0c1e36]">Report Not Found</h2>
              <p className="mt-1 text-sm font-bold text-gray-800">
                No certificate found for report number:{" "}
                <span className="text-[#0c1e36] underline decoration-amber-400">{reportNo}</span>
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Please double-check the report number entered above and try again.
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── Network / CORS Error ── */}
      {status === "error" && (
        <section className="rounded-2xl border-l-4 border-red-400 bg-white p-6 shadow-md my-4 max-w-2xl mx-auto border border-gray-100">
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#0c1e36]">Verification Unavailable</h2>
              <p className="mt-1 text-sm text-gray-700">
                Could not reach the laboratory API. This may be a temporary network issue.
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Please try again in a moment, or contact the laboratory directly to verify report{" "}
                <span className="font-semibold text-[#0c1e36]">{reportNo}</span>.
              </p>
              <button
                onClick={async () => {
                  setStatus("loading");
                  try {
                    const res = await findReport(reportNo);
                    if (res) { setReport(res); setStatus("found"); }
                    else setStatus("not_found");
                  } catch {
                    setStatus("error");
                  }
                }}
                className="mt-3 rounded-lg bg-[#0c1e36] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#1a3a5c] transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── Found ── */}
      {status === "found" && report && (
        <>
          <div className="no-print mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 rounded border-l-4 border-green-500 bg-white px-5 py-4 shadow-sm">
            <span className="flex items-center gap-2 font-bold text-green-700">
              <CheckIcon />
              Verified
            </span>
            <span className="text-gray-700">
              Report{" "}
              <span className="font-semibold text-[#0c1e36]">{report.reportNo}</span>{" "}
              is on record, issued {report.issuedOn}.
            </span>
          </div>

          <CertificateCard report={report} />

          <CertificateCardActions report={report} />

          <div className="no-print mt-6 flex justify-center gap-4">
            <Link href={ROUTES.verifyYourReport} className="cert-ghost-btn">
              Verify another report
            </Link>
          </div>
        </>
      )}
    </main>
  );
}

export default function CertificateViewPage() {
  return (
    <>
      <div className="no-print">
        <PageBanner title="REPORT VERIFICATION" />
      </div>

      <Suspense fallback={<main className="mx-auto w-full max-w-5xl px-4 py-10">Loading report...</main>}>
        <CertificateContent />
      </Suspense>

      <div className="no-print">
        <Footer />
      </div>
    </>
  );
}
