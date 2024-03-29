/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    appName: process.env.NEXT_PUBLIC_APP_NAME,
    tokenKey: process.env.NEXT_APP_TOKEN_KEY,
  },
  features: {
    webpack5: true,
  },
  images: {
    domains: [],
  },
  reactStrictMode: true
};

module.exports = nextConfig;
