/** @type {import('next').NextConfig} */

const path = require('path')


const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includeOptions: [path.join(__dirname, 'styles'), path.join(__dirname, 'styles/*.scss')],
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
}

module.exports = nextConfig
