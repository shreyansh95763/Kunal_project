import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "@/components/Footer";
import PageBanner from "@/components/PageBanner";
import { getAllBlogs, getBlogBySlug, getRelatedBlogs } from "@/lib/blogs";
import { ROUTES } from "@/lib/site";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: `${blog.title} - GGDL Gemological Insights`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      images: [{ url: blog.image, alt: blog.imageAlt }],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = getRelatedBlogs(blog.slug, 3);

  return (
    <>
      <PageBanner title="GEMOLOGICAL INSIGHTS" />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8 flex items-center text-xs font-medium text-gray-500">
          <Link href={ROUTES.home} className="hover:text-ggdl-blue transition">
            Home
          </Link>
          <span className="mx-2 text-gray-300">/</span>
          <Link href={ROUTES.blogs} className="hover:text-ggdl-blue transition">
            Blogs
          </Link>
          <span className="mx-2 text-gray-300">/</span>
          <span className="truncate text-ggdl-blue font-semibold">{blog.title}</span>
        </nav>

        {/* Article Header */}
        <header className="space-y-4 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <span className="rounded-full bg-ggdl-blue px-3.5 py-1 text-xs font-bold tracking-wider text-white uppercase">
              {blog.category}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <time dateTime={blog.publishDate} className="text-xs font-medium text-gray-600">
              {blog.publishDate}
            </time>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs font-medium text-gray-600">{blog.readTime}</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-ggdl-blue sm:text-4xl lg:text-5xl leading-tight">
            {blog.title}
          </h1>

          <p className="text-lg leading-relaxed text-gray-600">
            {blog.excerpt}
          </p>

          {/* Author info */}
          <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-100 sm:justify-start">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-ggdl-gold font-bold text-ggdl-blue shadow-sm text-sm">
              {blog.author.name.charAt(0)}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-ggdl-blue">{blog.author.name}</p>
              <p className="text-xs text-gray-500">{blog.author.role}</p>
            </div>
          </div>
        </header>

        {/* Hero Featured Image */}
        <div className="mt-10 overflow-hidden rounded-3xl bg-gray-100 shadow-xl ring-1 ring-black/5">
          <div className="relative aspect-16/9 w-full">
            <Image
              src={blog.image}
              alt={blog.imageAlt}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
          {blog.imageAlt && (
            <p className="bg-gray-50 px-5 py-3 text-center text-xs text-gray-500 italic">
              {blog.imageAlt}
            </p>
          )}
        </div>

        {/* Key Takeaways Box */}
        {blog.keyTakeaways && blog.keyTakeaways.length > 0 && (
          <div className="mt-12 rounded-2xl border border-ggdl-gold/40 bg-amber-50/60 p-6 sm:p-8 shadow-sm">
            <h2 className="flex items-center gap-2 text-base font-bold text-ggdl-blue uppercase tracking-wider">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ggdl-gold text-xs text-ggdl-blue font-bold">
                ✓
              </span>
              Key Takeaways
            </h2>
            <ul className="mt-4 space-y-2.5">
              {blog.keyTakeaways.map((takeaway, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-gray-700 leading-relaxed">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ggdl-gold" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Article Body Content */}
        <div className="mt-12 space-y-10 text-gray-700 leading-relaxed">
          {blog.sections.map((section, idx) => (
            <section key={idx} className="space-y-4">
              {section.heading && (
                <h2 className="text-2xl font-bold text-ggdl-blue pt-4 border-t border-gray-100 first:border-t-0 first:pt-0">
                  {section.heading}
                </h2>
              )}

              {section.subheading && (
                <h3 className="text-lg font-semibold text-ggdl-blue">
                  {section.subheading}
                </h3>
              )}

              {section.paragraphs.map((para, pIdx) => (
                <p key={pIdx} className="text-base text-gray-700 leading-relaxed">
                  {para}
                </p>
              ))}

              {section.bulletPoints && section.bulletPoints.length > 0 && (
                <ul className="my-4 ml-6 space-y-2 list-disc text-gray-700">
                  {section.bulletPoints.map((point, bpIdx) => (
                    <li key={bpIdx} className="text-base leading-relaxed">
                      {point}
                    </li>
                  ))}
                </ul>
              )}

              {section.callout && (
                <div className="my-6 rounded-r-xl border-l-4 border-ggdl-gold bg-blue-50/60 p-5 shadow-xs">
                  <p className="text-base font-medium italic text-ggdl-blue">
                    &ldquo;{section.callout}&rdquo;
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* FAQ Section if present */}
        {blog.faq && blog.faq.length > 0 && (
          <section className="mt-16 rounded-2xl bg-white p-8 shadow-md ring-1 ring-black/5">
            <h2 className="text-2xl font-bold text-ggdl-blue">
              Frequently Asked <span className="text-ggdl-gold">Questions</span>
            </h2>
            <div className="mt-6 space-y-6">
              {blog.faq.map((faqItem, fIdx) => (
                <div key={fIdx} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-semibold text-ggdl-blue text-base">
                    Q: {faqItem.question}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {faqItem.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tags */}
        <div className="mt-12 flex flex-wrap items-center gap-2 border-t border-gray-200 pt-6">
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-2">
            Related Tags:
          </span>
          {blog.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200 transition"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Author Bio Card */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-ggdl-blue text-xl font-bold text-ggdl-gold">
            {blog.author.name.charAt(0)}
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-base font-bold text-ggdl-blue">
              Written by {blog.author.name}
            </h3>
            <p className="text-xs font-medium text-ggdl-gold">{blog.author.role}</p>
            <p className="mt-2 text-xs text-gray-600 leading-relaxed">
              Dedicated to unbiased gemological examination, spectroscopic research, and consumer education at GGDL Laboratory.
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="mt-10 flex justify-between items-center border-t border-gray-200 pt-6">
          <Link
            href={ROUTES.blogs}
            className="inline-flex items-center gap-2 text-sm font-semibold text-ggdl-blue hover:text-ggdl-gold transition"
          >
            ← Back to all articles
          </Link>
          <Link
            href={ROUTES.contact}
            className="rounded-lg bg-ggdl-blue px-4 py-2 text-xs font-semibold text-white hover:bg-ggdl-blue/90 transition shadow-xs"
          >
            Ask a Gemologist
          </Link>
        </div>

        {/* Related Articles Section */}
        {relatedBlogs.length > 0 && (
          <section className="mt-20 border-t border-gray-200 pt-12">
            <h2 className="text-2xl font-bold text-ggdl-blue mb-8">
              Related <span className="text-ggdl-gold">Articles</span>
            </h2>

            <div className="grid gap-6 sm:grid-cols-3">
              {relatedBlogs.map((rel) => (
                <article
                  key={rel.slug}
                  className="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md hover:ring-ggdl-gold/30"
                >
                  <Link
                    href={`/blogs/${rel.slug}`}
                    className="relative aspect-16/10 w-full overflow-hidden bg-gray-100"
                  >
                    <Image
                      src={rel.image}
                      alt={rel.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-4">
                    <span className="text-[11px] font-semibold text-ggdl-gold uppercase tracking-wider">
                      {rel.category}
                    </span>
                    <h3 className="mt-1 text-sm font-bold text-ggdl-blue transition group-hover:text-ggdl-gold line-clamp-2">
                      <Link href={`/blogs/${rel.slug}`}>{rel.title}</Link>
                    </h3>
                    <p className="mt-2 text-xs text-gray-500 line-clamp-2 flex-1">
                      {rel.excerpt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
