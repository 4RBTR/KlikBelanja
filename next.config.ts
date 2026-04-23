import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'learn.smktelkom-mlg.sch.id',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
