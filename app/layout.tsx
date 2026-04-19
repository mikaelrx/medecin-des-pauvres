import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Le Médecin des Pauvres — Remèdes naturels",
    template: "%s — Le Médecin des Pauvres",
  },
  description:
    "Trouvez des remèdes naturels selon vos symptômes, tirés du livre Le Médecin des Pauvres du Dr Beauvillard (1912). 198 remèdes de plantes médicinales.",
  keywords: ["remèdes naturels", "plantes médicinales", "médecine traditionnelle", "symptômes", "phytothérapie"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Le Médecin des Pauvres",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8664226537896402"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
