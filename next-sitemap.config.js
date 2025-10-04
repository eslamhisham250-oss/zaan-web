/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'http://localhost:3000', // غيّرها للدومين الحقيقي بعد النشر
  generateRobotsTxt: true,          // يطلع robots.txt أوتوماتيك
  exclude: ['/api/*'],              // استبعد الـ API routes
};
