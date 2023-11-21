/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    BACKEND_URL: process.env.BACKEND_URL,
  },
  images: {
    domains: ['res.cloudinary.com']
  }
}

module.exports = nextConfig
