/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "i.ibb.co"
      },
      {
        hostname: "mdbcdn.b-cdn.net"
      }
    ]
  }
}

module.exports = nextConfig
