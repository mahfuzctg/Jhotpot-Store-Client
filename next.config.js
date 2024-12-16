/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack(config, { dev }) {
    // Enable source maps in development
    if (dev) {
      config.devtool = 'source-map';  // Or 'eval-source-map' for faster builds in dev
    } else {
      // Disable source maps in production for performance reasons (optional)
      config.devtool = false;
    }

    return config;
  },
};

export default nextConfig;
