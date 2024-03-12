/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
        permanent: true,
      },
      {
        source: "/signin",
        destination: "/auth/login",
        permanent: true,
      },
      {
        source: "/sign-in",
        destination: "/auth/login",
        permanent: true,
      },
      {
        source: "/register",
        destination: "/auth/register",
        permanent: true,
      },
      {
        source: "/signup",
        destination: "/auth/register",
        permanent: true,
      },
      {
        source: "/sign-up",
        destination: "/auth/register",
        permanent: true,
      },
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
};

module.exports = nextConfig;
