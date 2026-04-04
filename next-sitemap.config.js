/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://quitly-eight.vercel.app',
  generateRobotsTxt: false,
  exclude: ['/admin', '/admin/*', '/compte', '/compte/*', '/api/*'],
  robotsTxtOptions: {
    additionalSitemaps: [],
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/compte', '/api'],
      },
    ],
  },
}
