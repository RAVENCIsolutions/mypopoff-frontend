/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/me",
        destination: "/me/dashboard",
        permanent: true,
      },
      {
        source: "/dashboard",
        destination: "/me/dashboard",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pixabay.com/",
      },
    ],
  },
};

module.exports = nextConfig;
