/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })

    return config
  },
  images: {
    domains: [
      'encrypted-tbn0.gstatic.com',
      'wallpaperaccess.com',
      'lh3.googleusercontent.com',
      'cloudflare-ipfs.com',
      'loremflickr.com',
      'firebasestorage.googleapis.com',
    ],
  },
}
