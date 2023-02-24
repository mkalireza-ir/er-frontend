/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    ENDPOINT_URL: process.env.ENDPOINT_URL,
  },
};

module.exports = nextConfig;
