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
  allowedDevOrigins: ['localhost:3000', '10.132.20.49', '127.0.0.1:3000'],
};

export default nextConfig;
