/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    images: {
      domains: ['utfs.io'],
    },
    remotePatterns: [
      {
        hostname: "utfs.io"
      },
      {
        hostname: "i.ibb.co"
      },
      {
        hostname: "test.rinjanivisitor.com"
      },
      {
        hostname: "mdbcdn.b-cdn.net"
      }
    ]
  }
}

module.exports = nextConfig
