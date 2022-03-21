/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com','www.freeiconspng.com'],
    formats: ["image/webp",],
    
  },

}

module.exports = nextConfig
