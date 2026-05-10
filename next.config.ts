import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "i.pravatar.cc" },
      { protocol: "https", hostname: "image.pollinations.ai" },
      { protocol: "https", hostname: "placehold.co" },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    return [
      { source: "/chat", destination: "/api/chat" },
      { source: "/health", destination: "/api/health" },
      { source: "/sessions/:path*", destination: "/api/sessions/:path*" },
    ];
  },
};

export default nextConfig;
