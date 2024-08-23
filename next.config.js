
module.exports = {
  reactStrictMode: true,
  transpilePackages: ["ui"],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/id/**',
      },
    ],
  },
};
