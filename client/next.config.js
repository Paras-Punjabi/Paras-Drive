/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    SERVER_HOSTNAME:"http://localhost:8000",
  }
}

module.exports = nextConfig
