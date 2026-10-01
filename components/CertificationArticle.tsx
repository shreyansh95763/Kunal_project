import Link from "next/link";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { ROUTES } from "@/lib/site";

/**
 * ⚠️ PLACEHOLDER CONTENT — SHARED BY FOUR ROUTES
 *
 * On the live glamgehna.com site these four pages are byte-identical copies of
 * one another; all of them serve the "Importance of Certification" article:
 *
 *   /laboratory-services   /importance-of-certification
 *   /testing-and-certification   /reports-certificates
 *
 * That duplication is reproduced here deliberately, so the rebuild matches the
 * original 1:1. To give a page its own copy, stop importing this component from
 * that route's page.tsx and write the real content there instead (and set a
 * distinct `metadata.title`, since all four currently share one).
 */
export default function CertificationArticle() {
  return (
    <>
      <PageBanner title="IMPORTANCE OF CERTIFICATION" />

      <main className="page-prose mx-auto max-w-5xl px-4 py-12 leading-relaxed">
        <p>
          How do you know when you intend to buy a diamond or a diamond jewel that
          the gem is corresponding to what the jeweler describes to you? What
          guarantee do you have that the diamond/gemstone that you are buying is
          natural, not synthetic? What should you know before attempting any
          important diamond/gemstone/jewellery purchase?
        </p>

        <p>
          All diamonds are not equal. When purchasing a diamond, it is important to
          consider its cut, clarity, color, carat weight, fluorescence, treatments,
          etc. These factors affect not only the appearance and quality of a
          diamond, but also its price.
        </p>

        <p>
          Diamond testing and grading covers numerous aspects of each stone&apos;s
          qualities. Quality assessments regarding grading are made by independent
          gemological labs. The stone is evaluated, measured, and scrutinized using
          trained eyes, a jeweler&apos;s loupe, a microscope, and other
          instruments, and a certificate of authentication is issued for each piece.
        </p>

        <p>
          A certificate is like a &ldquo;blueprint&rdquo; of a diamond, and tells
          you its measurements and weight, as well as the details of its clarity,
          color, polish, symmetry, cut and quality. It precisely points out all the
          individual characteristics of the stone. It also tells you whether the
          stone is treated or not. Certificates also serve as proof of the
          diamond/gemstone&apos;s identity.
        </p>

        <p>
          A certificate is not the same thing as an appraisal. A certificate
          describes the quality of a diamond, but it does not place a monetary
          value on the gem. An appraisal places a monetary value on your diamond,
          but does not certify the quality of the diamond. An appraiser will only be
          able to appraise a diamond/gemstone/jewellery if it has a certificate of
          authentication.
        </p>

        <h2 className="mt-8 text-2xl font-bold text-ggdl-blue">
          Why certification matters
        </h2>
        <ul className="mt-3 ml-6 list-disc">
          <li>Assures the buyer about the gem&apos;s identity and authenticity.</li>
          <li>Helps determine fair market value and facilitates resale.</li>
          <li>
            Documents treatments and enhancements, preventing surprises later.
          </li>
          <li>Provides clarity and transparency to both buyer and seller.</li>
        </ul>

        <p className="mt-6">
          If you have any specimen you want certified, please contact GGDL and we
          will guide you through the submission and testing process.
        </p>

        <div className="mt-8">
          <Link
            href={ROUTES.home}
            className="inline-block rounded bg-ggdl-gold px-4 py-2 font-semibold text-ggdl-blue"
          >
            Back to Home
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
