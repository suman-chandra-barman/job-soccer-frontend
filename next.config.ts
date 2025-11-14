import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_HOSTNAME || "10.10.12.125",
        port: "5013",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
