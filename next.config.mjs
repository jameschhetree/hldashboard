/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  webpack: (config, { dev, isServer }) => {
    // Fix for refresh 404s: Disable filesystem cache in dev to prevent build ID mismatches
    if (dev) {
      config.cache = false;
      
      // Ensure webpack doesn't try to optimize chunks that cause issues
      if (!isServer) {
        config.optimization = {
          ...config.optimization,
          moduleIds: 'named', // Use named module IDs for better stability
        };
      }
    }
    
    return config;
  },
  // Prevent Next.js from changing build ID on refresh
  generateBuildId: async () => {
    // Use a consistent build ID in dev to prevent 404s on refresh
    if (process.env.NODE_ENV === 'development') {
      return 'dev-build';
    }
    return null; // Use default for production
  },
};

export default nextConfig;
