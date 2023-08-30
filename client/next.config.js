/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'storage.googleapis.com'], // Resimlerin yer aldığı ana bilgisayar adını ekleyin
  },
};

module.exports = nextConfig;
