import type { Metadata, Viewport } from "next";
import { Cinzel, Cormorant_Garamond, Lato } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

// Only the weights the design uses: headings are regular weight with italic accents.
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

// Small labels and the wordmark only, so it doesn't need to block the first paint.
const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

// Share previews need an absolute URL. Order: real domain (site.url) →
// Vercel's production URL (set automatically on Vercel) → localhost for dev.
const siteUrl =
  site.url ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

// Google business data. Only published once the details are real (site.launchReady),
// so fake phone/address never reach search engines.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ClothingStore",
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: siteUrl,
  logo: `${siteUrl}/images/logo.png`,
  image: `${siteUrl}/images/og.jpg`,
  telephone: site.phone,
  address: site.address.join(", "),
  sameAs: [site.instagram],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${site.name} | Premium Suits, Kurtas & Exclusive Fabrics`,
  description: site.description,
  openGraph: {
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    type: "website",
    locale: "en_IN",
    siteName: site.name,
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: ["/images/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#4a1420",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${cormorant.variable} ${cinzel.variable} ${lato.variable}`}>
      <body className="min-h-dvh">
        {children}
        {site.launchReady && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
          />
        )}
      </body>
    </html>
  );
}
