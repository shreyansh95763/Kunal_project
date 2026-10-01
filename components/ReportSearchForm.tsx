"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/lib/site";

function SearchIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

/**
 * Report-number lookup form.
 * Navigates to /certificate-view?gdl_report_no=... to keep results shareable.
 */
export default function ReportSearchForm({
  variant = "pill",
  defaultValue = "",
}: {
  variant?: "pill" | "inline";
  /** Pre-fills the box, so a results page still shows what was searched for. */
  defaultValue?: string;
}) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = query.trim();
    if (!clean) return;
    router.push(`${ROUTES.certificateView}?gdl_report_no=${encodeURIComponent(clean)}`);
  };

  if (variant === "inline") {
    return (
      <form onSubmit={handleSubmit} className="flex items-center shadow-sm">
        <input
          name="gdl_report_no"
          type="search"
          required
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="verify-input"
          placeholder="Search report number (e.g. GD52416)..."
          aria-label="Search report number"
        />
        <button className="verify-btn" type="submit" aria-label="Search">
          <SearchIcon className="h-5 w-5" />
        </button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-lg overflow-hidden rounded-full border-2 border-ggdl-blue/30 bg-white shadow-lg"
    >
      <input
        name="gdl_report_no"
        type="search"
        required
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter report number (e.g. GD52416)..."
        aria-label="Search report number"
        className="grow rounded-l-full p-4 text-gray-700 focus:ring-0 focus:outline-none"
      />
      <button
        type="submit"
        aria-label="Search"
        className="flex items-center justify-center rounded-r-full bg-ggdl-blue p-4 transition duration-150 hover:bg-ggdl-blue/80"
      >
        <SearchIcon className="h-6 w-6 text-white" />
      </button>
    </form>
  );
}

