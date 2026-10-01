"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/blogs";

interface BlogListProps {
  blogs: BlogPost[];
  categories: string[];
}

export default function BlogList({ blogs, categories }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesCategory =
        selectedCategory === "All" || blog.category === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === "" ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    });
  }, [blogs, selectedCategory, searchQuery]);

  return (
    <div className="space-y-10">
      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? "bg-ggdl-blue text-white shadow-md ring-2 ring-ggdl-gold/50"
                    : "bg-white text-gray-700 shadow-sm ring-1 ring-black/5 hover:bg-gray-50 hover:text-ggdl-blue"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search articles & topics..."
            className="w-full rounded-full border border-gray-200 bg-white py-2.5 pr-4 pl-10 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-ggdl-gold focus:ring-2 focus:ring-ggdl-gold/20 focus:outline-none"
          />
          <svg
            className="pointer-events-none absolute top-3 left-3.5 h-4 w-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute top-2.5 right-3 text-xs text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Blog Cards Grid */}
      {filteredBlogs.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 bg-white py-16 text-center">
          <p className="text-lg font-semibold text-gray-700">
            No articles found matching &quot;{searchQuery}&quot;
          </p>
          <p className="mt-2 text-sm text-gray-500">
            Try adjusting your search keywords or switching category filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="mt-6 rounded-lg bg-ggdl-gold px-5 py-2 text-sm font-semibold text-ggdl-blue transition hover:bg-ggdl-gold/90"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <article
              key={blog.slug}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-ggdl-gold/30"
            >
              {/* Card Image */}
              <Link
                href={`/blogs/${blog.slug}`}
                className="relative aspect-16/10 w-full overflow-hidden bg-gray-100"
              >
                <Image
                  src={blog.image}
                  alt={blog.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-block rounded-full bg-ggdl-blue/90 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm shadow-sm">
                    {blog.category}
                  </span>
                </div>
              </Link>

              {/* Card Body */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <time dateTime={blog.publishDate}>{blog.publishDate}</time>
                  <span>•</span>
                  <span>{blog.readTime}</span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-ggdl-blue transition-colors group-hover:text-ggdl-gold line-clamp-2">
                  <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                </h3>

                <p className="mt-3 flex-1 text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  {blog.excerpt}
                </p>

                {/* Footer / Read More */}
                <div className="mt-6 border-t border-gray-100 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-500">
                      By {blog.author.name}
                    </span>
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold tracking-wider text-ggdl-blue uppercase transition group-hover:text-ggdl-gold"
                    >
                      Read Article
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
