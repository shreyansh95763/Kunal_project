import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { ROUTES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Reports & Certificates | GGDL",
  description:
    "Learn about GGDL's tamper-proof digital and physical grading reports — from diamond certificates to gemstone identification reports and jewelry evaluations.",
};

const REPORT_TYPES = [
  {
    icon: "💎",
    title: "Diamond Grading Report",
    desc: "Comprehensive 4C analysis covering carat weight, cut, clarity, and color grade along with proportions, symmetry, polish, and fluorescence assessment.",
    features: [
      "Full 4Cs grading",
      "Proportion diagram",
      "Clarity plot mapping",
      "Fluorescence analysis",
      "Digital verification",
    ],
    color: "from-blue-50 to-white",
    border: "border-blue-100",
  },
  {
    icon: "🟢",
    title: "Gemstone Identification Report",
    desc: "Detailed species and variety identification for colored gemstones including origin determination, treatment disclosure, and optical property documentation.",
    features: [
      "Species identification",
      "Origin determination",
      "Treatment disclosure",
      "Optical properties",
      "Physical measurements",
    ],
    color: "from-emerald-50 to-white",
    border: "border-emerald-100",
  },
  {
    icon: "💍",
    title: "Jewelry Assessment Report",
    desc: "Complete evaluation of finished jewelry pieces covering gemstone identification, metal purity testing, and overall craftsmanship quality assessment.",
    features: [
      "Metal purity test",
      "Stone identification",
      "Weight documentation",
      "Quality assessment",
      "Photographic record",
    ],
    color: "from-amber-50 to-white",
    border: "border-amber-100",
  },
];

const SECURITY_FEATURES = [
  {
    icon: "🔒",
    title: "Tamper-Proof Design",
    desc: "Each certificate uses security printing, microtext, and holographic elements to prevent duplication or alteration.",
  },
  {
    icon: "📱",
    title: "QR Code Verification",
    desc: "Scan the QR code on any GGDL certificate to instantly verify its authenticity on our secure online portal.",
  },
  {
    icon: "🌐",
    title: "Online Database",
    desc: "Every report is stored in our encrypted digital database with instant lookup by report number at any time.",
  },
  {
    icon: "🏷️",
    title: "Unique Report Number",
    desc: "Each certificate receives a unique sequential report number that cannot be duplicated or reassigned.",
  },
  {
    icon: "📄",
    title: "Archival Paper Stock",
    desc: "Physical certificates are printed on archival-grade paper that resists aging, water damage, and UV fading.",
  },
  {
    icon: "✍️",
    title: "Authorized Signatures",
    desc: "Each certificate bears the authorized signature of the grading gemologist and laboratory director.",
  },
];

export default function ReportsCertificatesPage() {
  return (
    <>
      <PageBanner
        title="REPORTS & CERTIFICATES"
        subtitle="Tamper-proof, digitally verifiable grading reports for every specimen"
      />

      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Intro */}
        <section className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ggdl-blue sm:text-4xl">
            Your Stone&apos;s <span className="text-ggdl-gold">Permanent Record</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            GGDL issues comprehensive grading reports that serve as the
            permanent scientific record of your diamond or gemstone. Each report
            is secured with multiple anti-fraud features and can be verified
            online instantly using the unique report number or QR code.
          </p>
        </section>

        {/* Report Format Stats */}
        <div className="my-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "Digital", label: "Online Verification" },
            { value: "Physical", label: "Printed Certificate" },
            { value: "QR", label: "Scan to Verify" },
            { value: "24/7", label: "Online Access" },
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

        {/* Report Types */}
        <section className="py-12">
          <div className="text-center mb-10">
            <span className="inline-block rounded-full bg-amber-50 border border-ggdl-gold/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ggdl-gold">
              Report Types
            </span>
            <h3 className="mt-4 text-2xl font-bold text-ggdl-blue sm:text-3xl">
              Certificates We Issue
            </h3>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {REPORT_TYPES.map((rt) => (
              <div
                key={rt.title}
                className={`rounded-3xl border ${rt.border} bg-gradient-to-br ${rt.color} p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg`}
              >
                <span className="text-4xl">{rt.icon}</span>
                <h4 className="mt-3 text-lg font-bold text-ggdl-blue">
                  {rt.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {rt.desc}
                </p>
                <div className="mt-4 space-y-2">
                  {rt.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs">
                      <span className="h-1.5 w-1.5 rounded-full bg-ggdl-gold shrink-0" />
                      <span className="font-medium text-gray-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What's Included in a Report */}
        <section className="rounded-3xl bg-gradient-to-br from-ggdl-blue to-[#0b2447] p-8 text-white shadow-xl sm:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-ggdl-gold/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ggdl-gold">
                What&apos;s Inside
              </span>
              <h3 className="mt-4 text-2xl font-bold sm:text-3xl">
                Anatomy of a GGDL Report
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-300">
                Every certificate follows a standardized format that documents
                every measurable attribute of your specimen:
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  "Laboratory logo & branding",
                  "Unique report number",
                  "Date of examination",
                  "Specimen description",
                  "Physical measurements",
                  "Carat weight (0.001ct)",
                  "Color & clarity grade",
                  "Cut, polish & symmetry",
                  "Fluorescence reaction",
                  "Microscopic observations",
                  "Specimen photograph",
                  "QR verification code",
                  "Director signature",
                  "Security watermarks",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-ggdl-gold" />
                    <span className="text-gray-200">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "📋", label: "Detailed Specs", value: "14+ fields" },
                { icon: "📸", label: "Photography", value: "HD specimen" },
                { icon: "✅", label: "Verification", value: "QR + online" },
                { icon: "🔐", label: "Security", value: "Multi-layer" },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm"
                >
                  <span className="text-3xl">{card.icon}</span>
                  <div className="mt-2 text-sm font-extrabold text-white">
                    {card.label}
                  </div>
                  <div className="mt-1 text-xs text-ggdl-gold font-bold">{card.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-16">
          <div className="text-center mb-10">
            <span className="inline-block rounded-full bg-red-50 border border-red-200/60 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-red-600">
              Anti-Fraud Protection
            </span>
            <h3 className="mt-4 text-2xl font-bold text-ggdl-blue sm:text-3xl">
              Certificate Security Features
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SECURITY_FEATURES.map((sf) => (
              <div
                key={sf.title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-ggdl-blue/30 hover:shadow-lg"
              >
                <span className="text-3xl">{sf.icon}</span>
                <h4 className="mt-3 text-base font-bold text-ggdl-blue group-hover:text-ggdl-gold transition-colors">
                  {sf.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {sf.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Verify CTA */}
        <section className="rounded-3xl bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border border-emerald-200/60 p-8 text-center shadow-sm sm:p-12">
          <span className="text-4xl">🔍</span>
          <h3 className="mt-3 text-xl font-bold text-ggdl-blue sm:text-2xl">
            Already Have a GGDL Certificate?
          </h3>
          <p className="mt-3 text-sm text-gray-600 max-w-lg mx-auto">
            Enter your report number to instantly verify its authenticity and
            view the full digital version of your grading report.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href={ROUTES.verifyYourReport}
              className="rounded-xl bg-ggdl-blue px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-ggdl-blue/90"
            >
              🔍 Verify Report Online
            </Link>
            <Link
              href={ROUTES.contact}
              className="rounded-xl border border-ggdl-gold bg-white px-6 py-3 text-sm font-bold text-ggdl-gold transition hover:bg-ggdl-gold hover:text-ggdl-blue"
            >
              Request a New Certificate →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
