/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['mui-color-input'],
  images: {
    remotePatterns: [
      {
        hostname: 'utfs.io',
      },
    ],
  },
};

export default nextConfig;
