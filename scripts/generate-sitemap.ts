import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://team1515.com';

const routes = [
  '/',
  '/about',
  '/outreach',
  '/leaders',
  '/sponsors',
  '/contact',
  '/blog'
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
    .map(route => {
      return `
    <url>
      <loc>${SITE_URL}${route}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${route === '/' ? '1.0' : '0.8'}</priority>
    </url>`;
    })
    .join('')}
</urlset>`;

  fs.writeFileSync(
    path.join(process.cwd(), 'public', 'sitemap.xml'),
    sitemap.trim()
  );
  console.log('Sitemap generated successfully!');
};

generateSitemap();