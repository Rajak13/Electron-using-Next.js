import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  ...(process.env.NODE_ENV === 'production' && { output: "export" }),
  images: {
    unoptimized: true
  },
  // Ensure CSS is properly handled in development
  experimental: {
    esmExternals: false
  },
  // Ensure proper asset handling for Electron
  assetPrefix: process.env.NODE_ENV === 'production' ? './' : undefined,
  trailingSlash: true,
};

export default nextConfig;
