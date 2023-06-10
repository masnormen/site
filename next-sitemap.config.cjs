/** @type {import('next-sitemap').IConfig} */
module.exports = {
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        disallow: "/noindex/*",
      },
    ],
  },
  generateIndexSitemap: false,
  siteUrl: "https://nourman.com",
};
