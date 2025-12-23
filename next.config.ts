import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: process.env.NEXT_PUBLIC_HOSTNAME as string,
      },
      {
        protocol: "http",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "*.devtunnels.ms",
      },
      {
        protocol: "http",
        hostname: "*.devtunnels.ms",
      },
      {
        protocol: "http",
        hostname: "31.97.33.65",
      },
      {
        protocol: "https",
        hostname: "31.97.33.65",
      },
    ],
  },
};

export default nextConfig;
