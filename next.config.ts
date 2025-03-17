import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // ✅ Ignore ESLint errors
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Ignore TypeScript errors
  },
  images: {
    domains: ["assets.coinlayer.com", "cryptologos.cc","cdn.jsdelivr.net"], // ✅ Allow this domain
  }
};0

export default nextConfig;
