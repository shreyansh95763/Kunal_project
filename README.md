# GGDL — Global Diamond Laboratory

A Next.js rebuild of [glamgehna.com](https://www.glamgehna.com/), the site for GGDL
(Global Diamond Laboratory), a gemstone and diamond certification lab.

The original was a set of static `.html` files using the Tailwind CDN build. This
version is Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + TypeScript, with
the same layout, copy, and visual design.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # production build
npm start          # serve the production build
npm run lint
```

## Routes

Clean paths replace the old `.html` filenames. `next.config.ts` issues permanent
redirects from every legacy URL, so existing links and search results keep working.

| Page | Route | Legacy URL (redirects) |
| --- | --- | --- |
| Home | `/` | `/index.html` |
| Our Services | `/laboratory-services` | `/laboratory-services.html` |
| Importance of Certification | `/importance-of-certification` | `/importance-of-certification.html` |
| Testing of Certification | `/testing-and-certification` | `/Testing_and_Certification.html` |
| Reports & Certificates | `/reports-certificates` | `/reports-certificates.html` |
| Verify Your Report | `/verify-your-report` | `/verify-your-report.html` |
| Report result | `/certificate-view?gdl_report_no=…` | `/admin/certificate-view.php` |
| Contact Us | `/contact` | `/contact.html` |

## Layout

```
app/
  layout.tsx              Root layout: Inter font, metadata, shared <Header />
  page.tsx                Homepage
  globals.css             Tailwind theme + all custom CSS ported from mainstyle.css
  <route>/page.tsx        One directory per page
  api/contact/route.ts    Replaces contact-mail.php
  api/newsletter/route.ts Footer newsletter sign-up
components/               Header, Footer, HeroCarousel, ReportGrid, Testimonials, forms…
lib/
  site.ts                 Nav, footer links, testimonials, hero slides — edit copy here
  reports.ts              Certificate lookup (stubbed — see below)
public/img/               Image assets
```

Brand colours and fonts live in the `@theme` block at the top of
[app/globals.css](app/globals.css), so `bg-ggdl-blue` / `text-ggdl-gold` are real
Tailwind utilities rather than hand-written CSS classes as in the original:

| Token | Value |
| --- | --- |
| `ggdl-blue` | `#001b34` |
| `ggdl-gold` | `#c5a14d` |
| `lightgray` | `#f7f7f7` |

## What still needs wiring up

> **Before going live:** the contact details on the contact page are placeholders.
> The original site published no address, phone number or email anywhere, so the
> address, phone, WhatsApp, email, opening hours and map location in `CONTACT` in
> [lib/site.ts](lib/site.ts) are stand-ins. Everything the page shows is read from
> that one object — including `mapQuery`, which currently points the embedded map at
> Mumbai. Set any value to an empty string to hide that row.

Three things were backed by GGDL's PHP backend, which isn't part of this rebuild.
Each has a working front end and a clearly marked stub:

1. **Certificate lookup** — [lib/reports.ts](lib/reports.ts) holds one sample record
   (`GGDL-2025-000123`) in memory. Replace `findReport` with a real database or API
   query; it is already `async` and every caller awaits it.
2. **Contact form** — [app/api/contact/route.ts](app/api/contact/route.ts) validates
   the submission and logs it. Add your mail provider (Resend, SendGrid, SMTP…).
   It returns the same `{ status, message }` JSON contract the original used.
3. **Newsletter** — [app/api/newsletter/route.ts](app/api/newsletter/route.ts)
   validates the address and logs it. Point it at your mailing-list provider.

## Notes on the original site

Deliberate 1:1 reproductions, kept so this matches the live site:

- **Four pages share the same content.** On the live site `laboratory-services.html`,
  `importance-of-certification.html`, `Testing_and_Certification.html`, and
  `reports-certificates.html` are byte-identical — all four serve the "Importance of
  Certification" article, and all four use that same `<title>`. That duplication is
  reproduced here via the shared
  [components/CertificationArticle.tsx](components/CertificationArticle.tsx). To give
  a page its own copy, stop importing that component from its `page.tsx`, write the
  real content there, and set a distinct `metadata.title` — four routes currently
  share one title, which search engines will treat as duplicate content.

Intentionally redesigned rather than mirrored:

- **The contact page.** The original was a bare four-field form on a grey background
  with no contact details at all. It now pairs a dark details rail (address, phone,
  WhatsApp, email, opening hours) with the enquiry form in one card, plus a "what
  happens next" row and a map. Field names are unchanged, so the same POST body
  reaches the endpoint.

Fixed along the way:

- **Images were ~30 MB.** `Verificationbg.png` alone was 10.7 MB (6667×2083) and each
  of the three hero slides 5–6 MB (5000×2480). The oversized backgrounds were
  downscaled to 2560px wide and converted to WebP: **30.3 MB → 2.1 MB**, with no
  visible change at any viewport. Remaining assets were copied unchanged.
- **Broken nav link.** `contact.html` linked to `laboratory-services:.html.html`
  (a 404) in both its header and footer.
- **Tailwind via CDN.** `cdn.tailwindcss.com` is a dev-only build and isn't meant for
  production; this uses a compiled Tailwind v4 build.
- **Non-functional newsletter form.** The footer form had no `action` and no handler,
  so submitting it did nothing.
- **Asset directory typo.** `asstes/` → `public/img/`.
- **Duplicated script.** `main.js` ran the same "mark the active menu item" block
  twice; active state is now derived from the route with `usePathname`.

One unavoidable judgement call: the services nav link is labelled `SERVICES` on the
original homepage but `OUR SERVICES` on the other six pages *and* in the homepage's
own mobile menu. The shared header uses **`OUR SERVICES`**; change it in
`PRIMARY_LINKS` in [lib/site.ts](lib/site.ts) if you prefer the other.
