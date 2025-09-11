/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'dummyimage.com',
        port: '',
        pathname: '/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: "ik.imagekit.io",
        port: '',
        pathname: '/**',
        search: '',
      }
    ],
  },
};

export default nextConfig;
