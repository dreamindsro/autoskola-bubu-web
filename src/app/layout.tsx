import type { Metadata, Viewport } from "next";
import "@fontsource-variable/montserrat";
import "./globals.css";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StickyCta } from "@/components/sticky-cta";
import { branches } from "@/data/catalog";
import { absoluteUrl, site } from "@/data/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.canonicalUrl),
  title: {
    default: "Autoškola BuBu | Řidičák bez stresu",
    template: "%s | Autoškola BuBu",
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: site.name,
    title: "Autoškola BuBu | Řidičák bez stresu",
    description: site.description,
    url: "/",
    images: [{ url: site.ogImage, width: 1280, height: 960, alt: "Výcvikové auto Autoškoly BuBu" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Autoškola BuBu | Řidičák bez stresu",
    description: site.description,
    images: [site.ogImage],
  },
  icons: { icon: site.logo, apple: site.logo },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "DrivingSchool",
  "@id": `${site.canonicalUrl}/#organization`,
  name: site.name,
  url: site.canonicalUrl,
  logo: absoluteUrl(site.logo),
  slogan: site.slogan,
  telephone: branches.strizkov.phone,
  email: branches.strizkov.email,
  areaServed: ["Praha 8", "Střížkov", "Kladno", "Statenice", "Praha-západ"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "U Kapliček 34",
    addressLocality: "Praha 8 – Střížkov",
    addressCountry: "CZ",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="cs">
      <body>
        <a className="skip-link" href="#main-content">
          Přeskočit na obsah
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
        <StickyCta />
        <JsonLd data={organizationJsonLd} />
      </body>
    </html>
  );
}
