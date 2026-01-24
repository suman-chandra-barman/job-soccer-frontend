import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: "https",
      //   hostname: process.env.NEXT_PUBLIC_HOSTNAME as string,
      // },
      {
        protocol: "http",
        hostname: process.env.NEXT_PUBLIC_HOSTNAME as string,
      },
      {
        protocol: "http",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
