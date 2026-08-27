import { apiCall, SITE_URL } from '@/utils/api';
import { projectList, caseStudyEntries } from '@/components/projects/projectData';

export const dynamic = 'force-dynamic';

// ahmed-food is a special-cased static page (src/app/project/[slug]/page.jsx)
// with no entry in projectData.js and no DB row.
const staticSlugs = ['ahmed-food', ...projectList.map((p) => p.slug), ...caseStudyEntries.map((p) => p.slug)];
const staticSlugSet = new Set(staticSlugs);

export async function GET() {
  const { data } = await apiCall('/projects', 'GET', null, null, false, { next: { revalidate: 300 } });
  const dbProjects = Array.isArray(data) ? data : [];

  // Static projects have no meaningful "updated" timestamp, so no <lastmod>
  // (same convention as pages_sitemap.xml / services_sitemap.xml).
  const staticUrls = staticSlugs.map(
    (slug) => `  <url>
    <loc>${SITE_URL}/project/${slug}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
  );

  // page.jsx checks the static list first, so a DB row whose path collides
  // with a static slug is unreachable there — skip it here too.
  // Some rows store an external URL in `path` (e.g. Tour 360 entries hosted
  // off-site, see LatestWork.jsx nofollow handling) — those aren't pages on
  // this site and must not be submitted in this site's sitemap.
  const dbUrls = dbProjects
    .filter((p) => p.path && !p.path.startsWith('http') && !staticSlugSet.has(p.path.replace(/^\/project\//, '')))
    .map((p) => {
      const lastmod = (p.updatedAt || p.createdAt || '').split('T')[0] || new Date().toISOString().split('T')[0];
      const loc = p.path.startsWith('/') ? p.path : `/${p.path}`;
      return `  <url>
    <loc>${SITE_URL}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

  const urls = [...staticUrls, ...dbUrls].join('\n');

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
