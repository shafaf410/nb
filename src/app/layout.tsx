import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://norvian.se"),
  title: "NORVIAN AB | Swedish Staffing Company",
  description: "NORVIAN AB is a Swedish staffing company based in Västervik, Sweden, providing workforce solutions across Europe. Our team brings around five years of experience in European staffing services and working with companies and business partners across Europe.",
  keywords: [
    "workforce",
    "staffing",
    "Swedish staffing company",
    "shipbuilding",
    "construction",
    "manufacturing",
    "transport",
    "logistics",
    "Europe",
    "manpower supply",
    "NORVIAN",
    "NORVIAN AB",
    "Baumansgatan 4",
    "593 32 Västervik",
    "Västervik Sweden",
  ],
  openGraph: {
    title: "NORVIAN AB | Swedish Staffing Company",
    description: "NORVIAN AB is a Swedish staffing company based in Västervik, Sweden, providing workforce solutions across Europe.",
    url: "https://norvian.se",
    siteName: "NORVIAN AB",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "NORVIAN AB - Swedish Staffing Company",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NORVIAN AB | Swedish Staffing Company",
    description: "NORVIAN AB is a Swedish staffing company based in Västervik, Sweden, providing workforce solutions across Europe.",
    images: ["/logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  verification: {
    google: "GKhIUx3_c0IeylmHCyrigVgbWH1UwY27JV1WS5KvY64",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: "NORVIAN AB",
    description: "Swedish manpower supply and international staffing consultancy",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Baumansgatan 4",
      postalCode: "593 32",
      addressLocality: "Västervik",
      addressCountry: "SE",
    },
    telephone: "+46 79 30 90 30 7",
    email: "office@norvian.se",
  };

  return (
    <html
      lang="sv"
      className={`${playfair.variable} ${jakarta.variable} antialiased`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="GKhIUx3_c0IeylmHCyrigVgbWH1UwY27JV1WS5KvY64"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen font-sans bg-[#FAF8F5] text-[#0E1B2B] flex flex-col selection:bg-[#C59C58]/20 selection:text-[#C59C58]">
        {children}
      </body>
    </html>
  );
}
