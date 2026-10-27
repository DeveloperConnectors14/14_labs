import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";

// Self-hosted at build time (no request to Google from visitors) with the real
// weights the site uses, so bold text isn't faked by the browser. The CSS
// variables are read by FONT_SANS / FONT_MONO in src/theme/tokens.js.
const sans = Instrument_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-mono", display: "swap" });

const SITE_URL = "https://14labs.co";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "14Labs · AI Engineering, Applied Machine Learning & Research",
    // Pages set their own title; this frames it. Without a template every route
    // inherits the bare site name, which is what shipped until now.
    template: "%s · 14Labs",
  },
  description:
    "14Labs, Lahore, Pakistan: AI engineering, applied machine learning and peer-reviewed research in solar energy forecasting, explainable ML and computer vision.",
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
    title: "14Labs",
    description:
      "AI engineering, applied machine learning and peer-reviewed research, from Lahore, Pakistan.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "14Labs" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@14labs_co",
    title: "14Labs",
    description:
      "AI engineering, applied machine learning and peer-reviewed research, from Lahore, Pakistan.",
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
  description:
    "14Labs, Lahore, Pakistan: AI engineering, applied machine learning and peer-reviewed research in solar energy forecasting, explainable ML and computer vision.",
  sameAs: ["https://x.com/14labs_co", "https://www.linkedin.com/company/14labs"],
};

function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`${sans.variable} ${mono.variable}`}>
        {/* Applies the visitor's saved colour scheme (light by default) before the page paints. */}
        <InitColorSchemeScript attribute="class" defaultMode="light" />
        <AppRouterCacheProvider>
          <ThemeProvider>
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}

export default RootLayout;
