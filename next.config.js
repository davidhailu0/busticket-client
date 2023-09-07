/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  output:"standalone",
  eslint:{
    ignoreDuringBuilds:true
  },
  i18n:{
    locales:['amh','orm','tgr','eng'],
    defaultLocale:'eng'
  },
  images:{
    domains: ["server.app.mybus.et","server","localhost"],
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'server.app.mybus.et',
        port: '80',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'server',
        port: '5000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'server',
        port: '9000',
        pathname: '/**',
      }
    ]
  }
}
module.exports = nextConfig
