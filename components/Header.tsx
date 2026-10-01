"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/BrandLogo";
import { CONTACT, LABORATORY_LINKS, ROUTES } from "@/lib/site";

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}

const LAB_META: Record<string, { desc: string; icon: string }> = {
  [ROUTES.importanceOfCertification]: {
    desc: "Why independent grading protects your investment & fair market value",
    icon: "🛡️",
  },
  [ROUTES.testingAndCertification]: {
    desc: "Spectroscopy, refractometry & microscopic analysis at our certified lab",
    icon: "🔬",
  },
  [ROUTES.reportsCertificates]: {
    desc: "Tamper-proof digital & printed certificates with QR verification",
    icon: "📄",
  },
};

const NAV_ITEMS = [
  { href: ROUTES.home, label: "HOME", icon: "🏠" },
  { href: ROUTES.products, label: "PRODUCTS", icon: "💎" },
  { href: ROUTES.laboratoryServices, label: "OUR SERVICES", icon: "🔬" },
  { href: ROUTES.blogs, label: "BLOGS", icon: "📰" },
  { href: ROUTES.contact, label: "CONTACT US", icon: "📍" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [labOpen, setLabOpen] = useState(false);
  const [mobileLabOpen, setMobileLabOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll listener for sticky navbar transition
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click or escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setLabOpen(false);
        setMobileOpen(false);
      }
    }
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setLabOpen(false);
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const wrapper = document.getElementById("mobile-drawer-wrapper");
    if (wrapper) {
      wrapper.setAttribute("data-open", mobileOpen ? "true" : "false");
    }
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close menus when route changes
  useEffect(() => {
    setMobileOpen(false);
    setLabOpen(false);
  }, [pathname]);

  const isActive = (href: string) => pathname === href;
  const labSectionActive = LABORATORY_LINKS.some((l) => isActive(l.href));

  return (
    <>
      <header
      className={`site-header sticky top-0 z-40 w-full transition-all duration-300 ${scrolled
          ? "bg-white/95 shadow-lg backdrop-blur-md border-b border-ggdl-gold/20"
          : "bg-white shadow-sm border-b border-gray-100"
        }`}
    >
      {/* Top Utility Announcement Bar (Desktop) */}
      <div className="hidden border-b border-gray-100 bg-[#0c1e36] text-white sm:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs font-medium sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-gray-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Accredited Gemological Laboratory
            </span>
            <span className="text-gray-400">|</span>
            <span className="text-gray-300">Mon – Fri: 10:00 – 19:00</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href={`tel:${CONTACT.phone.replace(/[^0-9+]/g, "")}`}
              className="flex items-center gap-1.5 text-gray-300 transition hover:text-ggdl-gold"
            >
              <span>📞</span> {CONTACT.phone}
            </a>
            <span className="text-gray-400">|</span>
            <Link
              href={ROUTES.verifyYourReport}
              className="font-semibold text-ggdl-gold transition hover:underline"
            >
              Verify Report Online →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8 transition-all duration-200">
        {/* Brand Logo */}
        <Link
          href={ROUTES.home}
          aria-label="GGDL — Global Diamond Laboratory Home"
          className="group flex items-center transition-transform duration-200 hover:scale-[1.02]"
        >
          <BrandLogo height={scrolled ? 60 : 72} priority />
        </Link>

        {/* Desktop Navigation Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden items-center space-x-1 lg:flex xl:space-x-3"
        >
          {/* Laboratory Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setLabOpen(true)}
            onMouseLeave={() => setLabOpen(false)}
          >
            <button
              type="button"
              aria-haspopup="true"
              aria-expanded={labOpen}
              onClick={() => setLabOpen((v) => !v)}
              className={`group flex items-center rounded-lg px-3 py-2 text-sm font-semibold tracking-wide transition-colors ${labSectionActive
                  ? "text-ggdl-gold font-bold"
                  : "text-[#0c1e36] hover:text-ggdl-gold"
                }`}
            >
              LABORATORY
              <ChevronDown
                className={`ml-1 h-4 w-4 transition-transform duration-200 ${labOpen ? "rotate-180 text-ggdl-gold" : "text-gray-400 group-hover:text-ggdl-gold"
                  }`}
              />
            </button>

            {/* Enhanced Desktop Dropdown Menu */}
            <div
              className={`absolute top-full left-0 z-50 mt-1 w-80 origin-top-left rounded-2xl border border-gray-100 bg-white p-3 shadow-2xl ring-1 ring-black/5 backdrop-blur-xl transition-all duration-200 ${labOpen
                  ? "pointer-events-auto scale-100 opacity-100 translate-y-0"
                  : "pointer-events-none scale-95 opacity-0 -translate-y-2"
                }`}
            >
              <div className="space-y-1">
                {LABORATORY_LINKS.map((link) => {
                  const active = isActive(link.href);
                  const meta = LAB_META[link.href];
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setLabOpen(false)}
                      className={`group flex items-start gap-3 rounded-xl p-3 text-left transition-all ${active
                          ? "bg-[#0c1e36] text-white"
                          : "hover:bg-gray-50 text-[#0c1e36]"
                        }`}
                    >
                      {meta && (
                        <span className="mt-0.5 text-lg shrink-0">{meta.icon}</span>
                      )}
                      <div>
                        <span
                          className={`text-sm font-bold transition-colors ${active
                              ? "text-ggdl-gold"
                              : "group-hover:text-ggdl-gold text-[#0c1e36]"
                            }`}
                        >
                          {link.label}
                        </span>
                        {meta && (
                          <span
                            className={`mt-0.5 block text-xs leading-snug ${active
                                ? "text-gray-300"
                                : "text-gray-500 group-hover:text-gray-600"
                              }`}
                          >
                            {meta.desc}
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Primary Navigation Links */}
          {NAV_ITEMS.filter((item) => item.href !== ROUTES.home).map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative rounded-lg px-3 py-2 text-sm font-semibold tracking-wide transition-colors ${active
                    ? "text-ggdl-gold font-bold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-ggdl-gold"
                    : "text-[#0c1e36] hover:text-ggdl-gold"
                  }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* Verify CTA Pill */}
          <Link
            href={ROUTES.verifyYourReport}
            className={`relative ml-2 inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:scale-105 ${isActive(ROUTES.verifyYourReport)
                ? "bg-ggdl-gold text-[#0c1e36] shadow-md ring-2 ring-ggdl-gold/50"
                : "bg-[#0c1e36] text-white hover:bg-[#122b4d] hover:shadow-md"
              }`}
          >
            <span className="h-2 w-2 rounded-full bg-[#c59d3f] animate-ping" />
            🔍 VERIFY REPORT
          </Link>
        </nav>

        {/* Mobile menu Hamburger button (Pure CSS + React resilient) */}
        <label
          htmlFor="mobile-menu-toggle"
          id="mobile-menu-btn"
          aria-label="Open navigation menu"
          className="relative flex items-center justify-center rounded-xl p-2.5 text-[#0c1e36] transition hover:bg-gray-100 focus:ring-2 focus:ring-ggdl-gold focus:outline-none lg:hidden cursor-pointer select-none"
        >
          <div className="flex h-5 w-6 flex-col justify-between pointer-events-none">
            <span className="h-0.5 w-full rounded-full bg-current" />
            <span className="h-0.5 w-full rounded-full bg-current" />
            <span className="h-0.5 w-full rounded-full bg-current" />
          </div>
        </label>
      </div>
    </header>

    {/* Pure CSS Checkbox Toggle: guarantees drawer works even if JS is disabled or hydrating */}
    <input
      type="checkbox"
      id="mobile-menu-toggle"
      className="hidden peer"
      aria-label="Toggle navigation drawer"
    />

    {/* ================= SLIDE-IN SIDEBAR DRAWER FOR MOBILE ================= */}
    <div
      id="mobile-drawer-wrapper"
      data-open={mobileOpen ? "true" : "false"}
      className="fixed inset-0 z-[9999] lg:hidden"
      role="dialog"
      aria-modal="true"
    >
      {/* Dark Blurred Backdrop */}
      <label
        htmlFor="mobile-menu-toggle"
        id="mobile-menu-backdrop"
        className="fixed inset-0 bg-black/60 backdrop-blur-xs cursor-pointer block"
        aria-hidden="true"
      />

      {/* Slide-over Sidebar Drawer */}
      <div
        id="mobile-sidebar-drawer"
        className="fixed inset-y-0 right-0 z-10 flex w-full max-w-[340px] flex-col justify-between bg-white shadow-2xl overflow-hidden"
      >
        {/* Sidebar Top Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5 shadow-xs bg-white">
          <Link
            href={ROUTES.home}
            onClick={() => {
              const el = document.getElementById("mobile-menu-toggle") as HTMLInputElement | null;
              if (el) el.checked = false;
              setMobileOpen(false);
            }}
            className="flex items-center"
          >
            <BrandLogo height={50} priority />
          </Link>

          {/* Circular Close Button */}
          <label
            htmlFor="mobile-menu-toggle"
            id="mobile-menu-close-btn"
            aria-label="Close navigation menu"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-700 transition hover:bg-gray-200 hover:text-black focus:outline-none focus:ring-2 focus:ring-ggdl-gold cursor-pointer select-none"
          >
            <svg className="h-5 w-5 pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </label>
        </div>

        {/* Sidebar Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
          {/* Quick Link: Home */}
          <Link
            href={ROUTES.home}
            onClick={() => {
              const el = document.getElementById("mobile-menu-toggle") as HTMLInputElement | null;
              if (el) el.checked = false;
              setMobileOpen(false);
            }}
            className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold tracking-wide transition ${isActive(ROUTES.home)
                ? "bg-[#0c1e36] text-white shadow-sm"
                : "text-[#0c1e36] bg-gray-50/80 hover:bg-gray-100"
              }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-base">🏠</span>
              <span>HOME</span>
            </div>
            <span className="text-xs text-gray-400">→</span>
          </Link>

          {/* Collapsible: Laboratory Services (Native HTML5 details) */}
          <details className="group rounded-xl border border-gray-200/80 overflow-hidden bg-white shadow-2xs">
            <summary className="flex w-full items-center justify-between px-4 py-3 text-sm font-bold tracking-wide transition cursor-pointer list-none select-none text-[#0c1e36] hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <span className="text-base">🔬</span>
                <span>LABORATORY SERVICES</span>
              </div>
              <ChevronDown className="h-4 w-4 text-[#c59d3f] transition-transform duration-200 group-open:rotate-180" />
            </summary>

            {/* Submenu Accordion Links */}
            <div className="divide-y divide-gray-100 bg-slate-50/70 p-2 space-y-1 border-t border-gray-100">
              {LABORATORY_LINKS.map((link) => {
                const active = isActive(link.href);
                const meta = LAB_META[link.href];
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      const el = document.getElementById("mobile-menu-toggle") as HTMLInputElement | null;
                      if (el) el.checked = false;
                      setMobileOpen(false);
                    }}
                    className={`flex items-start gap-3 rounded-lg p-2.5 transition ${active
                        ? "bg-[#0c1e36] text-white"
                        : "hover:bg-white text-gray-800"
                      }`}
                  >
                    {meta && <span className="text-sm mt-0.5">{meta.icon}</span>}
                    <div>
                      <div className={`text-xs font-bold ${active ? "text-[#c59d3f]" : "text-[#0c1e36]"}`}>
                        {link.label}
                      </div>
                      {meta && (
                        <p className={`text-[10px] mt-0.5 leading-tight ${active ? "text-gray-300" : "text-gray-500"}`}>
                          {meta.desc}
                        </p>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </details>

          {/* Other Primary Links */}
          {NAV_ITEMS.filter((i) => i.href !== ROUTES.home).map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  const el = document.getElementById("mobile-menu-toggle") as HTMLInputElement | null;
                  if (el) el.checked = false;
                  setMobileOpen(false);
                }}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold tracking-wide transition ${active
                    ? "bg-[#0c1e36] text-white shadow-sm"
                    : "text-[#0c1e36] bg-gray-50/80 hover:bg-gray-100"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{link.icon}</span>
                  <span>{link.label}</span>
                </div>
                <span className="text-xs text-gray-400">→</span>
              </Link>
            );
          })}

          {/* High-Conversion "Verify Your Report" CTA Banner */}
          <div className="pt-2">
            <Link
              href={ROUTES.verifyYourReport}
              onClick={() => {
                const el = document.getElementById("mobile-menu-toggle") as HTMLInputElement | null;
                if (el) el.checked = false;
                setMobileOpen(false);
              }}
              className="flex items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-[#c59d3f] via-[#d4af4a] to-[#c59d3f] p-4 text-[#0c1e36] shadow-lg transition-transform active:scale-98"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0c1e36] text-white shadow-md text-base">
                  🔍
                </div>
                <div>
                  <span className="block text-xs font-black tracking-wider uppercase">
                    VERIFY YOUR REPORT
                  </span>
                  <span className="block text-[10.5px] font-semibold text-[#0c1e36]/85">
                    Online Certificate Lookup &amp; QR
                  </span>
                </div>
              </div>
              <span className="text-sm font-black">→</span>
            </Link>
          </div>

          {/* Quick Contact Action Bar (Call & WhatsApp) */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <a
              href={`tel:${CONTACT.phone.replace(/[^0-9+]/g, "")}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-2.5 text-xs font-bold text-[#0c1e36] shadow-2xs hover:bg-gray-50"
            >
              <span>📞</span> Call Us
            </a>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 py-2.5 text-xs font-bold text-emerald-800 shadow-2xs hover:bg-emerald-100"
            >
              <span>💬</span> WhatsApp
            </a>
          </div>
        </div>

        {/* Sidebar Bottom Accreditation Footer */}
        <div className="border-t border-gray-100 bg-slate-50 px-5 py-3 text-center">
          <p className="text-[11px] font-bold text-[#0c1e36]">
            Global Diamond Laboratory
          </p>
          <p className="text-[9.5px] text-gray-500 mt-0.5">
            ISO &amp; International Gemological Accreditation • Mon – Fri: 10:00 – 19:00
          </p>
        </div>
      </div>
    </div>
  </>
);
}
