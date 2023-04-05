/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  // async redirects() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://api.openai.com/:path*',
  //       permanent: true,
  //     },
  //   ]
  // },
  // async headers() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       headers: [
  //         {
  //           key: 'Access-Control-Allow-Origin',
  //           value: '*',
  //         },
  //         {
  //           key: 'Access-Control-Allow-Headers',
  //           value: 'Content-Type',
  //         },
  //       ],
  //     },
  //   ];
  // },
}

module.exports = nextConfig
