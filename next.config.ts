import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Self-contained server bundle (.next/standalone/server.js) so the app can
  // run with plain `node server.js` on any Node host (Hostinger VPS/Business,
  // etc.). Ignored/handled automatically on Vercel — safe to keep on.
  output: "standalone",
  // Don't advertise the framework/version in an "X-Powered-By" header.
  poweredByHeader: false,
  typescript: {
    ignoreBuildErrors: false,
  },
  turbopack: {
    root: path.resolve(process.cwd()),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 192, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    // 85 is used for the Hindi health posters so small poster text stays crisp
    qualities: [75, 85],
  },
  async redirects() {
    return [
      // Single canonical host: www.* duplicates every page otherwise.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.babystepsnewbornclinic.com" }],
        destination: "https://babystepsnewbornclinic.com/:path*",
        permanent: true,
      },
      { source: "/appointment", destination: "/book-appointment", permanent: true },
      { source: "/appointments", destination: "/book-appointment", permanent: true },
      { source: "/booking", destination: "/book-appointment", permanent: true },
      { source: "/book", destination: "/book-appointment", permanent: true },
      { source: "/blog/baby-vaccination-guide", destination: "/blog/child-vaccination-guide-india", permanent: true },
      { source: "/blog/child-cough-cold-home-care", destination: "/blog/baby-cough-cold-home-care", permanent: true },
      { source: "/blog/iap-vaccination-schedule-chart", destination: "/blog/baby-vaccination-schedule-chart-india", permanent: true },
      { source: "/blog/breastfeeding-tips-new-mothers", destination: "/blog/breastfeeding-basics-guide", permanent: true },
      { source: "/blog/skip-delay-child-vaccination-risks", destination: "/blog/missed-vaccine-what-to-do", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        // Baseline security headers for every response.
        source: "/:path*",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'self'; base-uri 'self'; form-action 'self'; object-src 'none'" },
        ],
      },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
