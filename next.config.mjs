/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['localhost', 'vercel.app'],
  },
  // Ensure CSS animations are preserved
  experimental: {
    optimizeCss: false,
  },
  // Disable CSS minification to preserve animations
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.minimize = false;
    }
    return config;
  },
  // Trailing slash for better compatibility
  trailingSlash: true,
}

export default nextConfig
