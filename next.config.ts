import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      // The 'display' alias was removed as per instruction.
    };
    // Fix for supabase-js websocket dependency in edge
    config.resolve.fallback = {
      ...config.resolve.fallback,
      "ws": false,
    };
    return config;
  },
};

export default nextConfig;
