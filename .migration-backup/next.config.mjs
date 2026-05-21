/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
  images: { unoptimized: true },
  allowedDevOrigins: ["*.replit.dev", "*.kirk.replit.dev", "*.replit.app"],
  serverExternalPackages: ["better-sqlite3"],
};

export default nextConfig;