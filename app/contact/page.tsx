import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { CONTACT_STEPS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with GGDL — Global Diamond Laboratory — for diamond, coloured stone and jewellery certification enquiries.",
};

export default function ContactPage() {
  return (
    <>
      {/* No subtitle here: the "Get in Touch" intro below already says it */}
      <PageBanner title="CONTACT US" />

      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-ggdl-gold uppercase">
            We are here to help
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-ggdl-blue md:text-4xl">
            Get in <span className="text-ggdl-gold">Touch</span>
          </h1>
          <span className="mx-auto mt-5 block h-px w-24 bg-ggdl-gold" />
          <p className="mt-5 text-gray-600">
            Whether you need a diamond graded, a coloured stone identified or a
            finished piece appraised, our gemologists are happy to talk it through.
          </p>
        </div>

        {/* Enquiry form */}
        <div className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-xl bg-white shadow-xl ring-1 ring-black/5 p-8 md:p-10">
          <ContactForm />
        </div>

        {/* What happens next */}
        <section className="mt-20">
          <h2 className="text-center text-2xl font-bold text-ggdl-blue">
            What happens <span className="text-ggdl-gold">next</span>
          </h2>

          <ol className="mt-10 grid gap-8 md:grid-cols-3">
            {CONTACT_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="relative rounded-lg bg-white p-6 pt-8 shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
              >
                <span className="absolute -top-5 left-6 flex h-10 w-10 items-center justify-center rounded-full bg-ggdl-gold font-bold text-ggdl-blue">
                  {i + 1}
                </span>
                <h3 className="font-semibold text-ggdl-blue">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <Footer />
    </>
  );
}
