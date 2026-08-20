import { apiCall, SITE_URL } from '@/utils/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { data } = await apiCall('/case-studies', 'GET', null, null, false, { next: { revalidate: 300 } });
  const caseStudies = Array.isArray(data) ? data : [];

  const urls = caseStudies
    .filter((cs) => cs.slug)
    .map((cs) => {
      const lastmod = (cs.updatedAt || cs.createdAt || '').split('T')[0] || new Date().toISOString().split('T')[0];
      return `  <url>
    <loc>${SITE_URL}/case-study/${encodeURIComponent(cs.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
