import Link from "next/link";
import NewsletterForm from "@/components/NewsletterForm";
import { FOOTER_IMPORTANT_LINKS, FOOTER_REPORT_LINKS, SITE } from "@/lib/site";

type FooterProps = {
  /**
   * The homepage places the "Reports & Certificates" panels so they overlap the
   * footer. When true, the footer gains enough top padding to clear them.
   */
  withOverlap?: boolean;
};

function FooterColumn({
  heading,
  links,
}: {
  heading: string;
  links: readonly { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="mb-4 border-b border-ggdl-gold/50 pb-1 text-lg font-semibold">
        {heading}
      </h4>
      <nav className="space-y-2 text-sm">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block text-gray-300 transition duration-150 hover:text-white"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default function Footer({ withOverlap = false }: FooterProps) {
  return (
    <footer
      className={`site-footer bg-ggdl-blue pb-12 text-white ${
        withOverlap ? "with-overlap mt-10" : "mt-12 pt-10"
      }`}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        <div>
          <h4 className="mb-4 text-xl font-bold text-ggdl-gold">GLOBAL DIAMOND</h4>
          <p className="text-sm text-gray-300">{SITE.footerBlurb}</p>
        </div>

        <FooterColumn heading="IMPORTANT LINKS" links={FOOTER_IMPORTANT_LINKS} />
        <FooterColumn heading="REPORTS" links={FOOTER_REPORT_LINKS} />

        <div>
          <h4 className="mb-4 border-b border-ggdl-gold/50 pb-1 text-lg font-semibold">
            SUBSCRIBE NEWSLETTER
          </h4>
          <NewsletterForm />
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-6 text-center">
        <p className="text-sm text-gray-400">{SITE.copyright}</p>
      </div>
    </footer>
  );
}
