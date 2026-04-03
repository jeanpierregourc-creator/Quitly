/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://quitly.fr',
  generateRobotsTxt: true,
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
