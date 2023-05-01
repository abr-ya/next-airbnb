/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MAPBOX_TOKEN: process.env.MAPBOX_TOKEN,
  },
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "images.unsplash.com",
      "cdn.sanity.io",
      "i.pinimg.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "res.cloudinary.com",
    ],
  },
};

module.exports = nextConfig;
