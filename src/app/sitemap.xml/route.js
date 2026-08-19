import { SITE_URL } from '@/utils/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  const now = new Date().toISOString().split('T')[0];

  const sitemaps = [
    { file: 'pages_sitemap.xml', date: now },
    { file: 'services_sitemap.xml', date: now },
    { file: 'projects_sitemap.xml', date: now },
    { file: 'blogs_sitemap.xml', date: now },
    { file: 'casestudies_sitemap.xml', date: now },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (s) => `<sitemap>
  <loc>${SITE_URL}/${s.file}</loc>
  <lastmod>${s.date}</lastmod>
</sitemap>`
  )
  .join('\n')}
</sitemapindex>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
