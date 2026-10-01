"use client";

/**
 * Opens the browser's print dialog, which is also how a visitor saves the
 * certificate as a PDF — hence the combined label. The print stylesheet in
 * globals.css strips the site chrome so only the certificate sheet is output.
 */
export default function PrintButton({
  label = "DOWNLOAD / PRINT",
}: {
  label?: string;
}) {
  return (
    <button type="button" onClick={() => window.print()} className="cert-print-btn">
      {label}
    </button>
  );
}
