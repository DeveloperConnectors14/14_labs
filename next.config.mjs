/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // The services and case-studies listing pages became homepage sections.
  // Detail pages (/case-studies/:id) are not affected.
  async redirects() {
    return [
      { source: '/services', destination: '/#services', permanent: true },
      { source: '/case-studies', destination: '/#case-studies', permanent: true },
    ];
  },
};

export default nextConfig;
