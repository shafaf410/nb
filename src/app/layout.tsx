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
  title: "NORVIAN AB | Qualified International Workforce & Talent Placement",
  description: "Norvian AB is an experienced Swedish manpower supply company based in Västervik, Sweden. With over 1,000 workers successfully placed, we provide skilled professionals across Europe in shipbuilding, construction, manufacturing, and transport & logistics.",
  keywords: ["workforce", "recruitment", "shipbuilding", "construction", "manufacturing", "transport", "logistics", "Europe", "manpower supply", "NORVIAN", "NORVIAN AB", "Västervik Sweden"],
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${jakarta.variable} antialiased`}
    >
      <body className="min-h-screen font-sans bg-[#FAF8F5] text-[#0E1B2B] flex flex-col selection:bg-[#C59C58]/20 selection:text-[#C59C58]">
        {children}
      </body>
    </html>
  );
}
