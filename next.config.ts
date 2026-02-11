import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets-in.bmscdn.com",
      },
    ],
  },
};

export default nextConfig;