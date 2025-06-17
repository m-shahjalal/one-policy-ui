import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["next-mdx-remote"],
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/:path*", // Proxy to Backend
      },
    ];
  },
  // Add CORS headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,POST,PUT,DELETE,OPTIONS,PATCH",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Origin, X-Requested-With, Content-Type, Accept, Authorization, Set-Cookie",
          },
        ],
      },
    ];
  },
};

const removeImports = require("next-remove-imports")();
module.exports = removeImports({});
export default nextConfig;
