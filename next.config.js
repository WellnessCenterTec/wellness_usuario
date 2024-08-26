/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    BACKEND_URL: process.env.BACKEND_URL,
    ADMIN_URL: process.env.ADMIN_URL,
  },
  images: {
    domains: ['res.cloudinary.com']
  }
}

module.exports = nextConfig
