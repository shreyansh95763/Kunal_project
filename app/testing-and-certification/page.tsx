import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { ROUTES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Testing & Certification Process | GGDL",
  description:
    "Explore GGDL's rigorous gemological testing methodology — from advanced spectroscopy and laser screening to microscopic analysis and final certification.",
};

const TESTING_METHODS = [
  {
    icon: "🔬",
    title: "Optical Microscopy",
    desc: "High-powered binocular microscopes reveal internal inclusions, growth patterns, and crystal structure — the fingerprint of every gem.",
    detail: "10x–100x magnification with darkfield & brightfield illumination",
  },
  {
    icon: "🌈",
    title: "UV-Vis Spectroscopy",
    desc: "Measures how the stone absorbs light across ultraviolet and visible wavelengths, identifying its chemical composition and origin.",
    detail: "190–1100nm wavelength range for precise identification",
  },
  {
    icon: "💡",
    title: "Refractometer Analysis",
    desc: "Determines the refractive index — the way light bends through the gem — to confirm species and separate natural from synthetic stones.",
    detail: "Precision to 0.001 RI units on calibrated instruments",
  },
  {
    icon: "⚖️",
    title: "Specific Gravity Testing",
    desc: "Hydrostatic weighing measures the density of the stone, a key physical constant that helps confirm its identity.",
    detail: "Accurate to 0.01 g/cm³ using precision electronic balances",
  },
  {
    icon: "🔦",
    title: "Fluorescence Testing",
    desc: "Long-wave and short-wave UV lamps reveal fluorescence reactions, helping detect treatments, synthetics, and species identification.",
    detail: "365nm LW and 254nm SW UV analysis chambers",
  },
  {
    icon: "📐",
    title: "Proportion Analysis",
    desc: "Advanced optical scanning measures cut proportions, symmetry, and light performance with sub-millimeter accuracy.",
    detail: "Crown angle, pavilion depth, table %, and girdle thickness",
  },
];

const GRADING_SCALES = [
  {
    grade: "Cut",
    scale: ["Excellent", "Very Good", "Good", "Fair", "Poor"],
    desc: "Evaluates how well the stone's proportions interact with light to create brilliance, fire, and scintillation.",
  },
  {
    grade: "Clarity",
    scale: ["FL", "IF", "VVS1-2", "VS1-2", "SI1-2", "I1-3"],
    desc: "Assesses the number, size, position, and nature of internal inclusions and surface blemishes.",
  },
  {
    grade: "Color",
    scale: ["D", "E-F", "G-H", "I-J", "K-Z"],
    desc: "Grades colorless to light yellow/brown on a standardized scale under controlled lighting conditions.",
  },
  {
    grade: "Polish",
    scale: ["Excellent", "Very Good", "Good", "Fair", "Poor"],
    desc: "Evaluates the smoothness and quality of the stone's facet surfaces after cutting and polishing.",
  },
];

export default function TestingAndCertificationPage() {
  return (
    <>
      <PageBanner
        title="TESTING & CERTIFICATION"
        subtitle="Rigorous scientific analysis powering every GGDL grading report"
      />

      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Intro */}
        <section className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ggdl-blue sm:text-4xl">
            Science-Backed <span className="text-ggdl-gold">Precision</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            Every gemstone and diamond that enters our laboratory undergoes a
            comprehensive multi-stage testing process. Our certified gemologists
            use state-of-the-art equipment — from spectroscopes to precision
            refractometers — to document every measurable characteristic with
            absolute accuracy.
          </p>
        </section>

        {/* Testing Pipeline Visual */}
        <section className="my-14 rounded-3xl bg-gradient-to-br from-ggdl-blue to-[#0b2447] p-8 text-white shadow-xl sm:p-12">
          <div className="text-center mb-10">
            <span className="inline-block rounded-full bg-ggdl-gold/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ggdl-gold">
              Testing Pipeline
            </span>
            <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
              Our 5-Stage Certification Process
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-5">
            {[
              { num: "1", title: "Intake & Logging", icon: "📋" },
              { num: "2", title: "Visual Inspection", icon: "👁️" },
              { num: "3", title: "Instrument Analysis", icon: "🔬" },
              { num: "4", title: "Grading & Scoring", icon: "📊" },
              { num: "5", title: "Report Generation", icon: "📄" },
            ].map((stage, i) => (
              <div key={stage.num} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-3xl backdrop-blur-sm">
                  {stage.icon}
                </div>
                <div className="mt-3 text-sm font-bold">{stage.title}</div>
                <div className="mt-1 text-xs text-gray-400">Stage {stage.num}</div>
                {i < 4 && (
                  <span className="absolute top-7 -right-3 hidden text-ggdl-gold sm:block">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Testing Methods Grid */}
        <section className="py-12">
          <div className="text-center mb-10">
            <span className="inline-block rounded-full bg-amber-50 border border-ggdl-gold/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ggdl-gold">
              Advanced Methodology
            </span>
            <h3 className="mt-4 text-2xl font-bold text-ggdl-blue sm:text-3xl">
              Laboratory Testing Methods
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTING_METHODS.map((method) => (
              <div
                key={method.title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-ggdl-gold/40 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{method.icon}</span>
                  <h4 className="text-base font-bold text-ggdl-blue group-hover:text-ggdl-gold transition-colors">
                    {method.title}
                  </h4>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {method.desc}
                </p>
                <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs font-medium text-ggdl-blue border border-gray-100">
                  {method.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Grading Standards */}
        <section className="rounded-3xl border border-gray-200/80 bg-white p-8 shadow-sm sm:p-10">
          <div className="text-center mb-8">
            <span className="inline-block rounded-full bg-blue-50 border border-ggdl-blue/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ggdl-blue">
              Grading Standards
            </span>
            <h3 className="mt-4 text-2xl font-bold text-ggdl-blue">
              International Grading Scales Used
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {GRADING_SCALES.map((g) => (
              <div key={g.grade} className="rounded-2xl border border-gray-100 bg-slate-50/50 p-5">
                <h4 className="text-base font-bold text-ggdl-blue">{g.grade} Grade</h4>
                <p className="mt-2 text-sm text-gray-600">{g.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {g.scale.map((s) => (
                    <span
                      key={s}
                      className="rounded-full bg-ggdl-blue px-2.5 py-1 text-[10px] font-bold text-white"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Equipment Highlights */}
        <section className="my-14 grid gap-4 sm:grid-cols-3">
          {[
            {
              label: "Spectroscopy",
              desc: "Infrared & Raman spectroscopy for mineral identification",
              icon: "🌡️",
            },
            {
              label: "Laser Screening",
              desc: "DiamondSure™ and DiamondView™ type screening protocols",
              icon: "💠",
            },
            {
              label: "Photomicrography",
              desc: "High-resolution inclusion photography for permanent records",
              icon: "📸",
            },
          ].map((eq) => (
            <div
              key={eq.label}
              className="rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-blue-50/30 p-6 text-center shadow-sm hover:shadow-md transition"
            >
              <span className="text-4xl">{eq.icon}</span>
              <h4 className="mt-3 text-sm font-bold text-ggdl-blue">{eq.label}</h4>
              <p className="mt-2 text-xs text-gray-600">{eq.desc}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="rounded-3xl bg-gradient-to-r from-blue-50 via-white to-blue-50 border border-ggdl-blue/20 p-8 text-center shadow-sm sm:p-12">
          <span className="text-4xl">🔬</span>
          <h3 className="mt-3 text-xl font-bold text-ggdl-blue sm:text-2xl">
            Need Your Stone Tested & Graded?
          </h3>
          <p className="mt-3 text-sm text-gray-600 max-w-lg mx-auto">
            Our laboratory accepts walk-in submissions and courier specimens.
            Contact us to learn about turnaround times and fees.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href={ROUTES.contact}
              className="rounded-xl bg-ggdl-blue px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-ggdl-blue/90"
            >
              Submit a Specimen
            </Link>
            <Link
              href={ROUTES.importanceOfCertification}
              className="rounded-xl border border-ggdl-gold bg-white px-6 py-3 text-sm font-bold text-ggdl-gold transition hover:bg-ggdl-gold hover:text-ggdl-blue"
            >
              Why Certification Matters →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
