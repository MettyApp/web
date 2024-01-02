/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: 'custom',
    loaderFile: './lib/imageLoader.js',
    remotePatterns: [
      { hostname: 'images.ctfassets.net',  protocol: 'https', }
    ]
  }
}

module.exports = nextConfig
