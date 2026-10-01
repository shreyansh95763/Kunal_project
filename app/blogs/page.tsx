import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BlogList from "@/components/BlogList";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { getAllBlogs, getBlogCategories, getFeaturedBlog } from "@/lib/blogs";
import { ROUTES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gemological Insights & Blogs",
  description:
    "Explore authoritative articles on diamond grading, 4Cs, lab-grown vs natural diamond detection, colored gemstone authentication, and fine jewellery care from GGDL gemologists.",
};

export default function BlogsPage() {
  const blogs = getAllBlogs();
  const categories = getBlogCategories();
  const featured = getFeaturedBlog();

  return (
    <>
      <PageBanner title="GEMOLOGICAL INSIGHTS & BLOGS" />

      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-ggdl-gold uppercase">
            Knowledge & Research
          </p>
          <h1 className="mt-3 text-3xl font-extrabold text-ggdl-blue md:text-4xl">
            The GGDL <span className="text-ggdl-gold">Gemological Library</span>
          </h1>
          <span className="mx-auto mt-5 block h-px w-24 bg-ggdl-gold" />
          <p className="mt-5 text-gray-600 leading-relaxed">
            Stay informed with expert insights, scientific grading standards, market education, and practical care guides curated by our senior laboratory gemologists and research scientists.
          </p>
        </div>

        {/* Featured Post Spotlight */}
        {featured && (
          <div className="mt-14 overflow-hidden rounded-3xl bg-white shadow-xl ring-1 ring-black/5">
            <div className="grid lg:grid-cols-12">
              <div className="relative aspect-16/10 lg:aspect-auto lg:col-span-7">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-ggdl-gold px-3.5 py-1.5 text-xs font-bold tracking-wider text-ggdl-blue uppercase shadow-md">
                    ★ Featured Story
                  </span>
                </div>
              </div>

              <div className="flex flex-col justify-between p-8 sm:p-10 lg:col-span-5">
                <div>
                  <div className="flex items-center gap-3 text-xs font-medium text-gray-500">
                    <span className="rounded-md bg-ggdl-blue/10 px-2.5 py-1 font-semibold text-ggdl-blue">
                      {featured.category}
                    </span>
                    <span>•</span>
                    <time dateTime={featured.publishDate}>{featured.publishDate}</time>
                    <span>•</span>
                    <span>{featured.readTime}</span>
                  </div>

                  <h2 className="mt-4 text-2xl font-extrabold text-ggdl-blue sm:text-3xl hover:text-ggdl-gold transition-colors">
                    <Link href={`/blogs/${featured.slug}`}>{featured.title}</Link>
                  </h2>

                  <p className="mt-4 text-sm leading-relaxed text-gray-600 line-clamp-4">
                    {featured.excerpt}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {featured.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-gray-100 pt-6 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-ggdl-blue">{featured.author.name}</p>
                    <p className="text-[11px] text-gray-500">{featured.author.role}</p>
                  </div>
                  <Link
                    href={`/blogs/${featured.slug}`}
                    className="inline-flex items-center gap-2 rounded-lg bg-ggdl-blue px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-ggdl-blue/90 shadow-sm"
                  >
                    Read Story
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Articles Section */}
        <section className="mt-20">
          <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-ggdl-blue">
                All <span className="text-ggdl-gold">Articles</span>
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Browse by topic or search our gemological research archive.
              </p>
            </div>
          </div>

          <BlogList blogs={blogs} categories={categories} />
        </section>

        {/* Call to Action Banner */}
        <section className="mt-24 rounded-3xl bg-linear-to-r from-ggdl-blue via-ggdl-blue/95 to-slate-900 px-8 py-14 text-center text-white shadow-2xl sm:px-12">
          <span className="text-xs font-bold tracking-[0.2em] text-ggdl-gold uppercase">
            Accredited Testing & Certification
          </span>
          <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl">
            Have a Diamond or Gemstone That Needs Certification?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-300">
            Submit your specimen to GGDL for precise, independent, and scientifically rigorous grading reports trusted by jewellers and collectors worldwide.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={ROUTES.verifyYourReport}
              className="rounded-lg bg-ggdl-gold px-6 py-3 text-sm font-semibold text-ggdl-blue transition hover:bg-ggdl-gold/90 shadow-md"
            >
              Verify Existing Report
            </Link>
            <Link
              href={ROUTES.contact}
              className="rounded-lg bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 ring-1 ring-white/20"
            >
              Contact Our Gemologists
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
