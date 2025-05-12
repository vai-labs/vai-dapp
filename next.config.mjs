import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['pixabay.com'],
  },
  env: {
    NEXT_PUBLIC_BSC_TESTNET_RPC: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    NEXT_PUBLIC_BSC_TESTNET_CHAIN_ID: '97',
    NEXT_PUBLIC_IPFS_API_URL: 'https://ipfs.infura.io:5001/api/v0',
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  // Set the source directory for the application
  distDir: '.next',
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: false,
  },
  // Configure Webpack for TypeScript path mapping
  webpack(config) {
    config.resolve.alias['@'] = path.join(__dirname, 'src');
    return config;
  },
};

export default nextConfig;
