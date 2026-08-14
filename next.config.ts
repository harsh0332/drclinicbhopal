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
      { source: "/areas/danish-kunj", destination: "/areas", permanent: true },
      { source: "/areas/salaiya", destination: "/areas", permanent: true },
      { source: "/areas/chuna-bhatti", destination: "/areas", permanent: true },
      { source: "/areas/katara-hills", destination: "/areas", permanent: true },
      { source: "/areas/bagmugaliya", destination: "/areas", permanent: true },
      { source: "/areas/lalghati", destination: "/areas", permanent: true },
      { source: "/areas/aiims-bhopal", destination: "/areas", permanent: true },
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
