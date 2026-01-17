/** @type {import('next').NextConfig} */
const nextConfig = {

output: 'export',
  images: {
    unoptimized: true, // Required for AWS Amplify static hosting
  },
  // Ensure static export compatibility
  trailingSlash: false,
};

export default nextConfig;
