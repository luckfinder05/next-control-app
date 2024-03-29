module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['openweathermap.org'],
  },
  serverRuntimeConfig: {
    secret: process.env.NEXTAUTH_SECRET
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000/api' // development api
      : 'https://cck.vercel.app/api' // production api
  },
  async redirects() {
    return [
      {
        source: '/s/:id*',
        destination: '/api/s/:id*', // Matched parameters can be used in the destination
        permanent: true,
      },
    ]
  },

}
