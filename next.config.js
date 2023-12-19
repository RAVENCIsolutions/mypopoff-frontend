/** @type {import('next').NextConfig} */
const nextConfig = {
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
