import type { NextConfig } from "next";

// No third-party scripts, analytics, or remote fonts: feelings data is
// sensitive personal information under RA 10173.
const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
