import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import HomeProductsShowcase from "@/components/HomeProductsShowcase";
import ReportGrid from "@/components/ReportGrid";
import ReportSearchForm from "@/components/ReportSearchForm";
import Testimonials from "@/components/Testimonials";
import { GUIDES, ROUTES, SITE } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      {/* Hero: report lookup over a fading photo carousel */}
      <section className="hero-section relative flex flex-col items-center justify-center overflow-hidden py-8 md:py-20">
        <HeroCarousel />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tighter text-ggdl-blue md:text-5xl">
            VERIFY YOUR REPORT
          </h1>

          <ReportSearchForm />

          <p className="mx-auto mt-8 max-w-2xl text-lg font-medium text-gray-700">
            {SITE.tagline}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">
        <ReportGrid />

        {/* Featured Products Collection */}
        <HomeProductsShowcase />

        {/* Why GGDL */}
        <section className="grid items-center lg:grid-cols-2">
          <div className="order-2 h-full space-y-4 bg-white p-6 md:p-8 lg:order-1">
            <h2 className="text-3xl font-bold text-ggdl-blue">Why GGDL</h2>
            <p className="text-lg text-gray-700">
              Upholding the highest standards of quality, GGDL has set up an
              international standard laboratory, furnished with cutting-edge gem
              testing equipment, modern technology, and extremely qualified
              gemologists who test and certify your diamonds and gemstones.
            </p>
            <p className="text-ggdl-blue italic">
              Our commitment is to provide absolute assurance and transparency in
              every grading report.
            </p>
          </div>
          <div className="order-1 overflow-hidden lg:order-2">
            <Image
              src="/img/why-ggdl.png"
              alt="Gemologist examining a stone"
              width={608}
              height={320}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-auto w-full object-cover"
            />
          </div>
        </section>

        {/* Gemstone guides */}
        <section className="py-16 md:py-24">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <div className="mx-auto max-w-2xl">
              <span className="inline-block text-xs font-bold tracking-[0.25em] text-amber-700 uppercase">
                Gemological Education
              </span>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Gemstone <span className="text-ggdl-gold">Guides</span>
              </h2>
              <div className="mx-auto mt-3 h-0.5 w-16 bg-gradient-to-r from-transparent via-ggdl-gold to-transparent" />
              <p className="mt-4 text-base text-gray-600 leading-relaxed">
                Essential insights, diamond grading standards, and expert preservation advice curated by certified GGDL gemologists.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 items-stretch gap-8 sm:grid-cols-3">
              {GUIDES.map((guide) => (
                <Link
                  key={guide.title}
                  href={guide.href}
                  className="group relative flex flex-col items-center rounded-3xl bg-white/80 p-6 text-center shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:bg-white hover:shadow-xl hover:shadow-amber-500/5 ring-1 ring-black/5 hover:ring-amber-300/60"
                >
                  {/* Luxury circular image wrapper */}
                  <div className="relative mb-6 flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-amber-200/60 via-amber-100/30 to-amber-400/50 p-1.5 shadow-lg ring-1 ring-amber-300/40 transition-all duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-amber-500/15 group-hover:ring-amber-400 md:h-52 md:w-52">
                    <div className="relative h-full w-full overflow-hidden rounded-full bg-slate-900">
                      <Image
                        src={guide.src}
                        alt={guide.title}
                        width={300}
                        height={300}
                        sizes="(max-width: 640px) 192px, 208px"
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Badge */}
                  <span className="mb-2.5 inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-800 tracking-wider uppercase ring-1 ring-amber-200/70">
                    {guide.tag}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-amber-800">
                    {guide.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {guide.subtitle}
                  </p>

                  {/* CTA link */}
                  <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-amber-700 uppercase transition-all duration-300 group-hover:text-amber-900">
                    <span>Read Guide</span>
                    <span className="text-sm transition-transform duration-300 group-hover:translate-x-1.5">
                      →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Certificate verification band — full-bleed, fixed background */}
        <section className="fixed-hero">
          <div className="hero-content">
            <h2 className="text-4xl font-semibold md:text-5xl">
              <span>Certificate </span>
              <span className="text-ggdl-gold">Verification</span>
            </h2>
          </div>
        </section>

        {/* Laboratory services */}
        <section className="services-section">
          <div className="mx-auto grid max-w-7xl items-center gap-0 lg:grid-cols-2">
            <div className="overflow-hidden">
              <Image
                src="/img/laboratory.png"
                alt="GGDL laboratory"
                width={608}
                height={320}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="service-image"
              />
            </div>
            <div className="services-panel h-full">
              <h3 className="text-3xl font-bold text-ggdl-blue">
                Laboratory <span className="text-ggdl-gold">Services</span>
              </h3>
              <p className="mt-6 max-w-lg text-gray-700">
                GGDL is the most progressive and trusted institute in India with a
                rock solid credibility which is proving enough for diamond graders
                to use GGDL&apos;s diamond grading reports as benchmarks.
              </p>
              <Link
                href={ROUTES.laboratoryServices}
                className="mt-6 inline-flex items-center text-sm font-semibold text-gray-800"
              >
                MORE DETAILS
                <span className="ml-3 text-2xl">→</span>
              </Link>
            </div>
          </div>
        </section>

        <Testimonials />
      </main>

      {/* Sits above the footer and overlaps it */}
      <section className="overlap-section">
        <div className="overlap-panels">
          <div className="panel left">
            <h3>
              Reports & <span className="text-ggdl-gold">Certificates</span>
            </h3>
            <p>
              GGDL may be better known in the industry for its work in the field of
              certification, but its activity as a Research &amp; Development
              (R&amp;D) centre in gemmology has been no less significant.
            </p>
            <Link href={ROUTES.reportsCertificates}>
              MORE DETAILS <span className="text-xl">→</span>
            </Link>
          </div>

          <div className="panel right">
            <h3>Importance of Certification</h3>
            <p>
              How do you know when you intend to buy a diamond or a diamond jewel
              that the gem is corresponding to what the jeweler describes to you?
            </p>
            <Link
              href={ROUTES.importanceOfCertification}
              className="text-black/85"
            >
              MORE DETAILS <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Footer withOverlap />
    </>
  );
}
