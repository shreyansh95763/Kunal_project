/**
 * Single source of truth for navigation, footer links and homepage copy.
 * Content mirrors the original glamgehna.com (GGDL) site.
 */

export const SITE = {
  name: "GGDL",
  longName: "Global Diamond Laboratory",
  tagline:
    "GGDL grades the widest variety of gemstones and jewelry in more corners of the world than any other gemological organization.",
  footerBlurb:
    "The most progressive and trusted institute in the gemological industry.",
  copyright: "Copyright © 2025 GGDL Ltd. All rights reserved",
} as const;

/**
 * Public origin of the deployed site, used to build the absolute URL encoded in
 * a certificate's QR code (a relative path would be useless once scanned).
 *
 * Set `NEXT_PUBLIC_SITE_URL` in the deployment environment; the fallback only
 * keeps local development working.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.glamgehna.com"
).replace(/\/+$/, "");

/** The laboratory branding printed on the certificate itself. */
export const CERTIFICATE = {
  labName: "GLAMGEHNA",
  labSubtitle: "Gemstone & Diamond Laboratory",
  labMotto: "Authenticity. Precision. Trust.",
  signatory: "GDL Director",
  disclaimer:
    "This diamond report represents the characteristics of the diamond at the time of examination and does not imply monetary value.",
  /** Sits under the QR code on the certificate. */
  qrCaption: "Scan to verify online",
} as const;

/**
 * ⚠️ PLACEHOLDER CONTACT DETAILS — REPLACE BEFORE GOING LIVE
 *
 * The original site published no address, phone number or email anywhere, so
 * these are stand-ins rather than GGDL's real details. Everything the contact
 * page displays is read from here.
 *
 * `mapQuery` is fed to Google Maps; update it with the real address or the
 * embedded map will point at the wrong place. To hide a row entirely, set its
 * value to an empty string.
 */
export const CONTACT = {
  addressLines: ["[Street address]", "[Area, City]", "[State] [PIN code]", "India"],
  phone: "+91 00000 00000",
  phoneHref: "tel:+910000000000",
  whatsapp: "+91 00000 00000",
  whatsappHref: "https://wa.me/910000000000",
  email: "info@example.com",
  emailHref: "mailto:info@example.com",
  hours: [
    { days: "Monday – Friday", time: "10:00 – 19:00" },
    { days: "Saturday", time: "10:00 – 15:00" },
    { days: "Sunday", time: "Closed" },
  ],
  mapQuery: "Mumbai, India",
} as const;

/** Sets client expectations under the form. Purely presentational. */
export const CONTACT_STEPS = [
  {
    title: "We review your enquiry",
    body: "A gemologist reads every submission and routes it to the right department.",
  },
  {
    title: "We reply within one working day",
    body: "You will hear back by email, or by phone if you have left a number.",
  },
  {
    title: "We guide your submission",
    body: "If you are sending a specimen, we explain packaging, insurance and turnaround.",
  },
] as const;

/** Routes. The original site used .html filenames; next.config.ts redirects those here. */
export const ROUTES = {
  home: "/",
  products: "/products",
  laboratoryServices: "/laboratory-services",
  importanceOfCertification: "/importance-of-certification",
  testingAndCertification: "/testing-and-certification",
  reportsCertificates: "/reports-certificates",
  verifyYourReport: "/verify-your-report",
  blogs: "/blogs",
  contact: "/contact",
  certificateView: "/certificate-view",
} as const;

/** "LABORATORY" dropdown in the main nav. */
export const LABORATORY_LINKS = [
  { href: ROUTES.importanceOfCertification, label: "Importance of Certification" },
  { href: ROUTES.testingAndCertification, label: "Testing of Certification" },
  { href: ROUTES.reportsCertificates, label: "Reports & Certificates" },
] as const;

/** Top-level nav items shown after the dropdown. */
export const PRIMARY_LINKS = [
  { href: ROUTES.products, label: "PRODUCTS" },
  { href: ROUTES.laboratoryServices, label: "OUR SERVICES" },
  { href: ROUTES.verifyYourReport, label: "VERIFY YOUR REPORT" },
  { href: ROUTES.blogs, label: "BLOGS" },
  { href: ROUTES.contact, label: "CONTACT US" },
] as const;

export const FOOTER_IMPORTANT_LINKS = [
  { href: ROUTES.home, label: "Home" },
  { href: ROUTES.products, label: "Products" },
  { href: ROUTES.laboratoryServices, label: "Our Services" },
  { href: ROUTES.blogs, label: "Blogs" },
  { href: ROUTES.contact, label: "Contact Us" },
] as const;

export const FOOTER_REPORT_LINKS = [
  { href: ROUTES.importanceOfCertification, label: "Importance of Certification" },
  { href: ROUTES.reportsCertificates, label: "Reports & Certificates" },
  { href: ROUTES.testingAndCertification, label: "Testing and Certification" },
  { href: ROUTES.verifyYourReport, label: "Verify Your Report" },
] as const;

/** Hero background carousel slides. */
export const HERO_SLIDES = [
  { src: "/img/bg1.webp", alt: "Gemstones under laboratory inspection" },
  { src: "/img/bg2.webp", alt: "Diamond grading in progress" },
  { src: "/img/bg3.webp", alt: "Certified loose diamonds" },
] as const;

export const GUIDES = [
  {
    src: "/img/guide-4cs.webp",
    title: "Diamond 4Cs",
    subtitle: "Cut, Color, Clarity & Carat weight fundamentals",
    href: "/blogs/understanding-the-4cs-of-diamond-quality",
    tag: "Grading Standard",
  },
  {
    src: "/img/guide-shapes.webp",
    title: "Diamond Shapes",
    subtitle: "Explore cuts from Round Brilliant to Emerald & Heart",
    href: "/blogs/colored-gemstone-identification-rubies-sapphires-emeralds",
    tag: "Anatomy & Cuts",
  },
  {
    src: "/img/guide-care.webp",
    title: "Jewelry Care Tips",
    subtitle: "Professional cleaning, storage & preservation guidance",
    href: "/blogs/caring-for-fine-diamond-and-gemstone-jewellery",
    tag: "Care & Maintenance",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "Being associated with Global Diamond Laboratory (GGDL) has been one of the most enriching experience of my life. GGDL has not only provided in depth knowledge of gemstones and diamonds but also expanded my vision in this trade.",
    author: "Vikas Mehta",
    role: "Mehta & Sons, Gujarat",
  },
  {
    quote:
      "Their grading reports are precise and trusted. The team is professional and the turnaround time is impressive. Our clients appreciate the detailed certificates.",
    author: "Anita Kapoor",
    role: "Kapoor Jewelers, Mumbai",
  },
  {
    quote:
      "GGDL's services helped us improve client trust and transparency. We rely on their assessments for valuation and resale.",
    author: "Rohit S.",
    role: "Rohit Diamonds, Surat",
  },
] as const;
