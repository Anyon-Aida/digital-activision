import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/works/:slug",
        destination: "/projects/:slug",
      },
    ];
  },
};

export default nextConfig;