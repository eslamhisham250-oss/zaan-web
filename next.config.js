/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['picsum.photos'], // ← هنا سمحنا باستخدام الصور من Picsum
  },
};

module.exports = nextConfig;