/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn1.lottery.ie', 'placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn1.lottery.ie',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
