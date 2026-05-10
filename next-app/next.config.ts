import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
