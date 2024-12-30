/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    missingSuspenseWithCSRBailout: false, // Ensure this is necessary for your use case
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Consider limiting this to known hostnames for better security
      },
    ],
  },
  webpack(config, { dev }) {
    // Enable source maps in development for debugging
    if (dev) {
      config.devtool = 'source-map'; // 'eval-source-map' is faster for dev, 'source-map' for detailed debugging
    } else {
      // Disable source maps in production for performance
      config.devtool = false; // You could also use 'hidden-source-map' if you want to keep source maps available but not expose them
    }

    return config;
  },
};

export default nextConfig;
