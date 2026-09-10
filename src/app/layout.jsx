import { Inter, Inter_Tight, IBM_Plex_Mono, Source_Serif_4 } from "next/font/google";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { themeCss } from "@/theme/tokens";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import "./globals.css";

const SITE_URL = "https://14labs.co";

// Self-hosted through next/font: no render-blocking request to Google, and no
// flash of fallback text on first paint the way the old <link> tag caused.
const display = Inter_Tight({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

// Long-form research prose only. Keeps writing feeling like writing rather
// than like another marketing section.
const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const DESCRIPTION =
  "14Labs is an AI engineering and applied machine learning practice. We build multi-agent systems, LLM pipelines and research-grade infrastructure that runs in production.";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "14Labs — AI Engineering, Applied Machine Learning & Research",
    // Pages set their own title; this frames it. Without a template every route
    // inherits the bare site name, which is what shipped until now.
    template: "%s · 14Labs",
  },
  description: DESCRIPTION,
  icons: {
    // Google's favicon crawler looks for /favicon.ico by that exact name.
    // Both files are generated from public/logo-14.png — see scripts/generate-icons.mjs.
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    siteName: "14Labs",
    url: SITE_URL,
    title: "14Labs — AI Engineering, Applied Machine Learning & Research",
    description: DESCRIPTION,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "14Labs" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@14labs_co",
    title: "14Labs — AI Engineering, Applied Machine Learning & Research",
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

// Without this Google has no declared logo for the domain and picks a page image
// instead — which is how OpenAI's mark ended up on our search result.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "14Labs",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/og.png`,
  email: "contact@14labs.co",
  description: DESCRIPTION,
  sameAs: ["https://x.com/14labs_co", "https://www.linkedin.com/company/14labs"],
};

function RootLayout({ children }) {
  // The theme attribute on <html> is written by InitColorSchemeScript before
  // React hydrates, so the server's <html> can never match it exactly — hence
  // suppressHydrationWarning, which covers that one element only.
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable} ${serif.variable}`}
      suppressHydrationWarning
    >
      <head>
        <style id="theme-tokens" dangerouslySetInnerHTML={{ __html: themeCss }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        {/* Picks light or dark from the saved choice or the OS setting, before
            first paint. Must run ahead of everything that has a colour. */}
        <InitColorSchemeScript attribute="data-theme" />
        <AppRouterCacheProvider>
          <ThemeProvider>
            <Navbar />
            <main id="main">{children}</main>
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

export default RootLayout;
