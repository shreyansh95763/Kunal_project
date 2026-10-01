import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { ROUTES, CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Services | GGDL Laboratory",
  description:
    "Explore GGDL's full range of gemological services — diamond grading, gemstone identification, jewelry evaluation, online verification, and custom corporate partnerships.",
};

const CORE_SERVICES = [
  {
    icon: "💎",
    title: "Diamond Grading",
    desc: "Complete 4C analysis with proportion diagrams, clarity plots, and fluorescence assessment. Our trained gemologists evaluate every facet of your diamond using standardized international grading criteria.",
    features: [
      "Full 4Cs assessment (Cut, Clarity, Color, Carat)",
      "Proportion analysis with visual diagrams",
      "Polish, symmetry, and light performance",
      "Fluorescence reaction documentation",
      "Natural vs synthetic screening",
    ],
    gradient: "from-blue-50 to-white",
    accent: "bg-blue-500",
  },
  {
    icon: "🟢",
    title: "Gemstone Identification",
    desc: "Scientific species and variety determination for all colored gemstones — including sapphires, rubies, emeralds, and rare collector stones. We document origin, treatments, and all optical properties.",
    features: [
      "Species and variety identification",
      "Geographic origin determination",
      "Treatment and enhancement detection",
      "Refractive index & specific gravity",
      "Microscopic observation report",
    ],
    gradient: "from-emerald-50 to-white",
    accent: "bg-emerald-500",
  },
  {
    icon: "💍",
    title: "Jewelry Evaluation",
    desc: "Comprehensive assessment of finished jewelry pieces covering gemstone identification, metal purity testing via XRF spectrometry, and detailed craftsmanship documentation.",
    features: [
      "Individual stone identification",
      "Metal purity verification (XRF)",
      "Total carat weight documentation",
      "Craftsmanship quality assessment",
      "High-resolution photography",
    ],
    gradient: "from-amber-50 to-white",
    accent: "bg-amber-500",
  },
  {
    icon: "🔍",
    title: "Online Verification",
    desc: "Instant digital verification of any GGDL certificate through our secure online portal. Every report number is linked to a tamper-proof digital record with QR code scanning support.",
    features: [
      "Real-time report lookup",
      "QR code scanning support",
      "Tamper-proof digital records",
      "Full certificate preview online",
      "24/7 access from any device",
    ],
    gradient: "from-purple-50 to-white",
    accent: "bg-purple-500",
  },
  {
    icon: "📊",
    title: "Bulk Grading Services",
    desc: "Volume grading solutions for jewelry retailers, manufacturers, and wholesalers. Streamlined intake, priority turnaround, and dedicated account management for recurring business.",
    features: [
      "Priority processing queue",
      "Dedicated account manager",
      "Volume pricing available",
      "Batch intake and tracking",
      "Custom branding options",
    ],
    gradient: "from-rose-50 to-white",
    accent: "bg-rose-500",
  },
  {
    icon: "🎓",
    title: "Education & Training",
    desc: "Workshops and training sessions for jewelers, retailers, and gemstone enthusiasts. Learn diamond grading fundamentals, gemstone identification basics, and certification best practices.",
    features: [
      "Diamond grading workshops",
      "Gemstone identification basics",
      "Hands-on loupe techniques",
      "Certification best practices",
      "Industry networking events",
    ],
    gradient: "from-teal-50 to-white",
    accent: "bg-teal-500",
  },
];

const WHY_GGDL = [
  {
    icon: "🏛️",
    title: "Accredited Laboratory",
    desc: "Operating under international gemological standards with state-of-the-art equipment and certified professionals.",
  },
  {
    icon: "⚡",
    title: "Fast Turnaround",
    desc: "Standard reports delivered within 3–5 business days. Express service available for urgent requirements.",
  },
  {
    icon: "🔒",
    title: "Tamper-Proof Reports",
    desc: "Security-printed certificates with QR verification, holographic elements, and encrypted digital storage.",
  },
  {
    icon: "🌍",
    title: "Global Recognition",
    desc: "GGDL certificates are accepted and trusted by jewelers, insurers, and auction houses worldwide.",
  },
  {
    icon: "💰",
    title: "Competitive Pricing",
    desc: "Transparent, fair pricing with volume discounts for trade professionals and repeat clients.",
  },
  {
    icon: "🤝",
    title: "Expert Consultation",
    desc: "Our gemologists are available for personalized consultations to help you understand your stone's characteristics.",
  },
];

export default function LaboratoryServicesPage() {
  return (
    <>
      <PageBanner
        title="OUR SERVICES"
        subtitle="Comprehensive gemological services trusted by jewelers, collectors, and insurers"
      />

      <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Intro */}
        <section className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-ggdl-blue sm:text-4xl">
            Excellence in <span className="text-ggdl-gold">Gemological Services</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-gray-600">
            GGDL is the most progressive and trusted gemological institute in
            India, providing internationally recognized diamond grading,
            gemstone identification, and jewelry evaluation services. Our
            laboratory is equipped with cutting-edge technology and staffed by
            highly qualified gemologists.
          </p>
        </section>

        {/* Key Numbers */}
        <div className="my-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: "10,000+", label: "Reports Issued" },
            { value: "64+", label: "Certified Specimens" },
            { value: "3–5 Days", label: "Standard Turnaround" },
            { value: "100%", label: "Accuracy Guarantee" },
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

        {/* Core Services */}
        <section className="py-12">
          <div className="text-center mb-10">
            <span className="inline-block rounded-full bg-amber-50 border border-ggdl-gold/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ggdl-gold">
              What We Offer
            </span>
            <h3 className="mt-4 text-2xl font-bold text-ggdl-blue sm:text-3xl">
              Our Core Services
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CORE_SERVICES.map((service) => (
              <div
                key={service.title}
                className={`group rounded-3xl border border-gray-100 bg-gradient-to-br ${service.gradient} p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{service.icon}</span>
                  <h4 className="text-lg font-bold text-ggdl-blue group-hover:text-ggdl-gold transition-colors">
                    {service.title}
                  </h4>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">
                  {service.desc}
                </p>
                <div className="mt-4 space-y-2">
                  {service.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-xs">
                      <span className={`h-1.5 w-1.5 rounded-full ${service.accent} shrink-0`} />
                      <span className="font-medium text-gray-700">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How to Submit */}
        <section className="rounded-3xl bg-gradient-to-br from-ggdl-blue to-[#0b2447] p-8 text-white shadow-xl sm:p-12">
          <div className="text-center mb-10">
            <span className="inline-block rounded-full bg-ggdl-gold/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ggdl-gold">
              Easy Process
            </span>
            <h3 className="mt-3 text-2xl font-bold sm:text-3xl">
              How to Get Your Stone Certified
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                step: "01",
                icon: "📞",
                title: "Contact Us",
                desc: "Reach out via phone, WhatsApp, email, or our contact form to discuss your requirements.",
              },
              {
                step: "02",
                icon: "📦",
                title: "Submit Specimen",
                desc: "Walk-in to our laboratory or ship your stone via insured courier. We provide packaging guidance.",
              },
              {
                step: "03",
                icon: "🔬",
                title: "Expert Analysis",
                desc: "Our certified gemologists perform comprehensive testing using advanced laboratory instruments.",
              },
              {
                step: "04",
                icon: "📄",
                title: "Receive Certificate",
                desc: "Collect your tamper-proof, digitally verifiable grading report within 3–5 business days.",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="relative rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm"
              >
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ggdl-gold px-3 py-1 text-xs font-black text-ggdl-blue shadow-md">
                  {s.step}
                </span>
                <span className="text-3xl">{s.icon}</span>
                <h4 className="mt-2 text-sm font-bold">{s.title}</h4>
                <p className="mt-2 text-xs text-gray-300 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose GGDL */}
        <section className="py-16">
          <div className="text-center mb-10">
            <span className="inline-block rounded-full bg-blue-50 border border-ggdl-blue/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ggdl-blue">
              Why Choose Us
            </span>
            <h3 className="mt-4 text-2xl font-bold text-ggdl-blue sm:text-3xl">
              The GGDL Advantage
            </h3>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_GGDL.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-ggdl-gold/40 hover:shadow-lg"
              >
                <span className="text-3xl">{item.icon}</span>
                <h4 className="mt-3 text-base font-bold text-ggdl-blue group-hover:text-ggdl-gold transition-colors">
                  {item.title}
                </h4>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Corporate / Trade Section */}
        <section className="rounded-3xl border border-gray-200/80 bg-white p-8 shadow-sm sm:p-10">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-block rounded-full bg-amber-50 border border-ggdl-gold/30 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-ggdl-gold">
                For Trade Professionals
              </span>
              <h3 className="mt-4 text-2xl font-bold text-ggdl-blue">
                Corporate & Wholesale Partnerships
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                GGDL offers tailored solutions for jewelry retailers,
                manufacturers, wholesalers, and auction houses. Whether you need
                bulk grading, private-label certificates, or on-site evaluation
                services — we have a package designed for your business needs.
              </p>

              <ul className="mt-6 space-y-3">
                {[
                  "Volume pricing with dedicated account manager",
                  "Custom-branded certificate formats",
                  "On-site laboratory evaluation for large inventories",
                  "Priority 24-hour express turnaround",
                  "Regular industry insights and market updates",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm">
                    <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-ggdl-gold" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={ROUTES.contact}
                className="mt-6 inline-flex items-center rounded-xl bg-ggdl-blue px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-ggdl-blue/90"
              >
                Discuss Partnership →
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "50+", label: "Trade Partners", icon: "🏢" },
                { value: "Express", label: "24hr Turnaround", icon: "⚡" },
                { value: "Custom", label: "Branded Reports", icon: "🏷️" },
                { value: "On-Site", label: "Lab Evaluations", icon: "🔬" },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-gray-100 bg-gradient-to-br from-slate-50 to-white p-5 text-center shadow-sm"
                >
                  <span className="text-3xl">{card.icon}</span>
                  <div className="mt-2 text-lg font-black text-ggdl-blue">{card.value}</div>
                  <div className="mt-1 text-xs font-bold text-gray-500">{card.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mt-14 rounded-3xl bg-gradient-to-r from-amber-50 via-white to-amber-50 border border-ggdl-gold/30 p-8 text-center shadow-sm sm:p-12">
          <span className="text-4xl">💎</span>
          <h3 className="mt-3 text-xl font-bold text-ggdl-blue sm:text-2xl">
            Ready to Work With GGDL?
          </h3>
          <p className="mt-3 text-sm text-gray-600 max-w-lg mx-auto">
            Whether you need a single stone certified or a bulk inventory graded,
            our team is ready to assist you. Get in touch today.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link
              href={ROUTES.contact}
              className="rounded-xl bg-ggdl-blue px-6 py-3 text-sm font-bold text-white shadow-md transition hover:bg-ggdl-blue/90"
            >
              Contact Our Lab →
            </Link>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-emerald-300 bg-emerald-50 px-6 py-3 text-sm font-bold text-emerald-700 transition hover:bg-emerald-100"
            >
              💬 WhatsApp Inquiry
            </a>
            <Link
              href={ROUTES.verifyYourReport}
              className="rounded-xl border border-ggdl-gold bg-white px-6 py-3 text-sm font-bold text-ggdl-gold transition hover:bg-ggdl-gold hover:text-ggdl-blue"
            >
              Verify a Report →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
