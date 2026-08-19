import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Self-contained server bundle (.next/standalone/server.js) so the app can
  // run with plain `node server.js` on any Node host (Hostinger VPS/Business,
  // etc.). Ignored/handled automatically on Vercel — safe to keep on.
  output: "standalone",
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
  },
  async redirects() {
    return [
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
