/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    SERVER_HOSTNAME:"http://localhost:8000",
    NEXT_PUBLIC_EMAILJS_ID:"7CkKyBAZTYjKs9Ror",
    NEXT_PUBLIC_TEMPLATE:"template_47rjp3l",
    NEXT_PUBLIC_SERVICE:"service_s4u9grf"
  }
}

module.exports = nextConfig
