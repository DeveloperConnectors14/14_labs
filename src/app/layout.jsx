import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";

const SITE_URL = "https://14labs.co";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "14Labs",
    // Pages set their own title; this frames it. Without a template every route
    // inherits the bare site name, which is what shipped until now.
    template: "%s · 14Labs",
  },
  description:
    "14Labs builds AI and machine learning systems — multi-agent architectures, LLM pipelines, and applied research delivered to production.",
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
      "AI and machine learning systems — multi-agent architectures, LLM pipelines, and applied research.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "14Labs" }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@14labs_co",
    title: "14Labs",
    description:
      "AI and machine learning systems — multi-agent architectures, LLM pipelines, and applied research.",
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
    "14Labs builds AI and machine learning systems — multi-agent architectures, LLM pipelines, and applied research.",
  sameAs: ["https://x.com/14labs_co", "https://www.linkedin.com/company/14labs"],
};

function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono&family=Instrument+Sans&family=Inter&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
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
