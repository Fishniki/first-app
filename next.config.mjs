/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains:['lh3.googleusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.nike.com',
        port: '',
        pathname: '/a/**',
      },
    ],
  }
};

export default nextConfig;
