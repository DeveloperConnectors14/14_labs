import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",              // ✅ makes Next generate /out
  images: {
    unoptimized: true,           // ✅ required for static hosting (next/image)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.jsdelivr.net",
      },
    ],
  },
};

export default nextConfig;
