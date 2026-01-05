import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "14 Labs | AI Solutions & Multi-Agent Systems",
  description:
    "14 Labs - AI-powered innovation for enterprise. Multi-agent systems, LLM integration, and intelligent automation delivered on time and on target.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.png", sizes: "any", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/logo-secondary.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "14 Labs | AI Solutions & Multi-Agent Systems",
    description:
      "AI-powered innovation for enterprise. Multi-agent systems, LLM integration, and intelligent automation delivered on time and on target.",
    url: "https://14labs.co",
    siteName: "14 Labs",
    images: [
      {
        url: "/logo-primary.png",
        width: 1200,
        height: 630,
        alt: "14 Labs - AI Solutions",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "14 Labs | AI Solutions & Multi-Agent Systems",
    description:
      "AI-powered innovation for enterprise. Multi-agent systems, LLM integration, and intelligent automation.",
    images: ["/logo-primary.png"],
  },
  metadataBase: new URL("https://14labs.co"),
  other: {
    "msapplication-TileColor": "#3ecfb2",
    "msapplication-TileImage": "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
