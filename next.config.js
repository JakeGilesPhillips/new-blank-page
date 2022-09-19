/** @type {import('next').NextConfig} */

const path = require('path')


const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includeOptions: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
