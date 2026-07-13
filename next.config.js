/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["192.168.1.98"],
  experimental: {
    serverActions: {
      allowedOrigins: [
        "*.app.github.dev",
        "localhost:3000",
        "192.168.1.98:3000",
      ],
    },
  },
};

module.exports = nextConfig;
