import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/Header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

/** Serif used for the certificate sheet, which reads as a printed document. */
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GGDL - Global Diamond Laboratory",
    template: "%s - GGDL",
  },
  description:
    "GGDL grades the widest variety of gemstones and jewelry in more corners of the world than any other gemological organization.",
  icons: { icon: "/img/logoNew.png" },
  verification: {
    google: "-zXBaO8WmC3YQr-HRZTciGycQ8KwpKSUW2mzZ77GZ-Y",
  },
};

/**
 * The header is identical on every page so it lives here. The footer is rendered
 * per page instead, because the homepage needs its overlapping-panel variant.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        <meta name="google-site-verification" content="-zXBaO8WmC3YQr-HRZTciGycQ8KwpKSUW2mzZ77GZ-Y" />
      </head>
      <body className="flex min-h-full flex-col bg-lightgray">
        <Header />
        {children}
      </body>
    </html>
  );
}
