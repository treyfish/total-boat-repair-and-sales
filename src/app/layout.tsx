import type { Metadata } from "next";
import "./globals.css";
import { TopBar } from "@/components/layout/TopBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default:
      "Total Boat Repair & Sales | Marine Service & Boats | Old Town, FL",
    template: "%s | Total Boat Repair & Sales",
  },
  description:
    "Authorized Honda Marine dealer offering expert boat repair, maintenance, pre-owned boat sales, and marine services in Old Town, Florida. All brands serviced.",
  keywords: [
    "boat repair",
    "marine service",
    "Old Town FL",
    "Honda Marine dealer",
    "pre-owned boats",
    "outboard motor repair",
    "boat sales Florida",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Total Boat Repair & Sales",
    title:
      "Total Boat Repair & Sales | Marine Service & Boats | Old Town, FL",
    description:
      "Your one-stop shop for all marine needs. Expert repair, pre-owned boats, Honda Marine dealer. Old Town, FL.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&family=Oswald:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <TopBar />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
