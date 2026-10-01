import type { Metadata } from "next";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import ReportSearchForm from "@/components/ReportSearchForm";

export const metadata: Metadata = { title: "Verify Your Report" };

export default function VerifyYourReportPage() {
  return (
    <>
      <PageBanner title="FIND YOUR REPORT" />

      <section className="verify-hero">
        <div className="verify-search">
          <ReportSearchForm variant="inline" />
          <p className="verify-note">
            Enter your report number to verify authenticity. Example: GD52416
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-12">
        <section className="rounded bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-bold text-ggdl-blue">
            How verification works
          </h2>
          <p className="text-gray-700">
            Paste the report number into the search box above and press Search. If
            the report exists in our records, the full analysis report is shown as
            it appears on the printed certificate — including the QR code, which
            links straight back to this verification page.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
