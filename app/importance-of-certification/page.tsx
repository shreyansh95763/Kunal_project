import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { ROUTES, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Importance of Certification | GGDL",
  description:
    "Understand why independent gemological certification is essential for protecting your investment, ensuring authenticity, and establishing market value for diamonds and gemstones.",
};

const BENEFITS = [
  {
    icon: "🛡️",
    title: "Proof of Authenticity",
    desc: "A certificate from an accredited lab confirms that your gem is natural, not synthetic or treated, protecting you from misrepresentation.",
  },
  {
    icon: "💰",
    title: "Fair Market Valuation",
    desc: "Certified stones carry documented quality grades that enable accurate pricing and help you negotiate with confidence.",
  },
  {
    icon: "🔄",
    title: "Easy Resale & Insurance",
    desc: "Reselling or insuring an uncertified stone is nearly impossible. A lab report provides the documented proof buyers and insurers require.",
  },
  {
    icon: "🔬",
    title: "Treatment Disclosure",
    desc: "Certificates reveal heat treatments, fracture filling, irradiation, and other enhancements that dramatically impact a gem's value.",
  },
  {
    icon: "📊",
    title: "Transparent Comparison",
    desc: "Standardized grading reports let you objectively compare gems side-by-side on cut, clarity, color, and carat weight.",
  },
  {
    icon: "🤝",
    title: "Buyer & Seller Trust",
    desc: "Third-party verification eliminates conflicts of interest and builds mutual trust between jewelers and consumers.",
  },
];

const PROCESS_STEPS = [
  {
    step: "01",
    title: "Submit Your Specimen",
    desc: "Bring or ship your diamond, gemstone, or jewelry piece to our GGDL laboratory with secure packaging.",
  },
  {
    step: "02",
    title: "Expert Analysis",
    desc: "Our certified gemologists examine the stone using spectroscopy, microscopy, and advanced refractometry instruments.",
  },
  {
    step: "03",
    title: "Grading & Documentation",
    desc: "Every characteristic — from inclusions to optical properties — is documented per international grading standards.",
  },
  {
    step: "04",
    title: "Certified Report Issued",
    desc: "You receive a tamper-proof, digitally verifiable certificate with a unique report number and QR code.",
  },
];

export default function ImportanceOfCertificationPage() {
  return (
    <>
      <PageBanner
        title="IMPORTANCE OF CERTIFICATION"
        subtitle="Why independent gemological grading is your most valuable purchase decision"
      />

      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Intro Section */}
        <section className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ggdl-blue sm:text-4xl">
            Your Diamond Deserves <span className="text-ggdl-gold">Proof</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            When you purchase a diamond or precious gemstone, how can you be certain
            that what you see matches what the jeweler describes? A laboratory
            certification is the only objective, third-party guarantee of a
            stone&apos;s identity, quality, and value. Without it, you&apos;re
            relying solely on trust — and in a market where synthetics and treatments
            are increasingly sophisticated, that&apos;s a risk no buyer should take.
          </p>
        </section>

        {/* Stats Bar */}
        <div className="my-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "100%", label: "Unbiased Grading" },
            { value: "4Cs", label: "Standardized Analysis" },
            { value: "QR", label: "Digital Verification" },
            { value: "ISO", label: "Accredited Standards" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-slate-50 p-6 text-center shadow-sm transition hover:shadow-md"
            >
              <div className="text-2xl font-black text-ggdl-blue sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-xs font-bold uppercase tracking-wider text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* What a Certificate Tells You */}
        <section className="rounded-3xl bg-gradient-to-br from-ggdl-blue to-[#0b2447] p-8 text-white shadow-xl sm:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-ggdl-gold/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ggdl-gold">
                What a Certificate Reveals
              </span>
              <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
                A Blueprint of Your Stone
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-300">
                A gemological certificate is <strong>not</strong> an appraisal — it
                does not assign a monetary value. Instead, it provides a detailed
                scientific record of your stone&apos;s measurable characteristics:
              </p>

              <ul className="mt-6 space-y-3 text-sm text-gray-200">
                {[
                  "Precise dimensions and carat weight",
                  "Color grade per standardized scale",
                  "Clarity grade with mapped inclusions",
                  "Cut, polish, and symmetry quality",
                  "Fluorescence behavior under UV light",
                  "Treatment and enhancement disclosure",
                  "Species / variety identification (for colored gems)",
                  "Refractive index and specific gravity measurements",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-ggdl-gold" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "✦", label: "Cut Grade", detail: "Brilliance & fire" },
                { icon: "◇", label: "Clarity", detail: "Inclusion mapping" },
                { icon: "◈", label: "Color", detail: "D to Z scale" },
                { icon: "⚖", label: "Carat", detail: "0.001ct precision" },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm transition hover:bg-white/10"
                >
                  <span className="text-3xl text-ggdl-gold">{card.icon}</span>
                  <div className="mt-2 text-sm font-extrabold text-white">
                    {card.label}
                  </div>
                  <div className="mt-1 text-xs text-gray-400">{card.detail}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16">
          <div className="text-center">
            <span className="inline-block rounded-full bg-amber-50 border border-ggdl-gold/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ggdl-gold">
              Key Benefits
            </span>
            <h3 className="mt-4 text-2xl font-bold text-ggdl-blue sm:text-3xl">
              Why Certification Matters
            </h3>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-ggdl-gold/40 hover:shadow-lg"
              >
                <span className="text-3xl">{b.icon}</span>
                <h4 className="mt-3 text-base font-bold text-ggdl-blue group-hover:text-ggdl-gold transition-colors">
                  {b.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {b.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Certification vs Appraisal */}
        <section className="rounded-3xl border border-gray-200/80 bg-white p-8 shadow-sm sm:p-10">
          <h3 className="text-xl font-bold text-ggdl-blue sm:text-2xl">
            Certificate vs. Appraisal — What&apos;s the Difference?
          </h3>
          <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-ggdl-blue text-left text-white">
                  <th className="px-5 py-3.5 font-bold">Aspect</th>
                  <th className="px-5 py-3.5 font-bold">Certificate (Lab Report)</th>
                  <th className="px-5 py-3.5 font-bold">Appraisal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  ["Purpose", "Documents quality & identity", "Assigns monetary value"],
                  ["Issued By", "Independent gemological lab", "Licensed appraiser"],
                  ["Bias", "100% unbiased (no stake in sale)", "May reflect market conditions"],
                  ["Requirement", "Needed for appraisal", "Needs a certificate first"],
                  ["Validity", "Permanent scientific record", "Valid for 1–2 years"],
                ].map(([aspect, cert, appr]) => (
                  <tr key={aspect} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-3 font-bold text-ggdl-blue">{aspect}</td>
                    <td className="px-5 py-3 text-gray-700">{cert}</td>
                    <td className="px-5 py-3 text-gray-700">{appr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* How It Works Steps */}
        <section className="py-16">
          <div className="text-center">
            <span className="inline-block rounded-full bg-blue-50 border border-ggdl-blue/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ggdl-blue">
              How It Works
            </span>
            <h3 className="mt-4 text-2xl font-bold text-ggdl-blue sm:text-3xl">
              Get Your Stone Certified at GGDL
            </h3>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS_STEPS.map((s) => (
              <div
                key={s.step}
                className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
                <span className="absolute -top-3 left-5 rounded-full bg-ggdl-blue px-3 py-1 text-xs font-black text-white shadow-md">
                  {s.step}
                </span>
                <h4 className="mt-3 text-base font-bold text-ggdl-blue">
                  {s.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-gradient-to-r from-amber-50 via-white to-amber-50 border border-ggdl-gold/30 p-8 text-center shadow-sm sm:p-12">
          <span className="text-4xl">💎</span>
          <h3 className="mt-3 text-xl font-bold text-ggdl-blue sm:text-2xl">
            Ready to Certify Your Gemstone or Diamond?
          </h3>
          <p className="mt-3 text-sm text-gray-600 max-w-lg mx-auto">
            Submit your specimen to GGDL and receive a tamper-proof, digitally
            verifiable grading report backed by international standards.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href={ROUTES.contact}
              className="rounded-xl bg-ggdl-blue px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-ggdl-blue/90"
            >
              Contact Us to Submit
            </Link>
            <Link
              href={ROUTES.verifyYourReport}
              className="rounded-xl border border-ggdl-gold bg-white px-6 py-3 text-sm font-bold text-ggdl-gold transition hover:bg-ggdl-gold hover:text-ggdl-blue"
            >
              Verify Existing Report →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
