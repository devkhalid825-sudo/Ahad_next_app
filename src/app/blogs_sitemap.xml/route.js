import { apiCall, SITE_URL } from '@/utils/api';

export const dynamic = 'force-dynamic';

const staticBlogSlugs = [
  'leap-2026-wrap-up',
  'webgl-vs-unreal-engine-3d-configurator',
  'web-based-configurator',
  'immersive-ar-marketing',
  'industrial-animation',
  'automotive-configurator',
  'vr-reshaping-world',
  'immersive-experience-design',
  'immersive-tech-2026',
  'animated-videos-engagement',
  'furniture-configurator-2026',
  'educational-animation-2026',
  'vr-custom-development-2026',
  '3d-real-time-configurators-real-estate-dubai',
  'architectural-visualization-guide',
  'apparel-configurator-fashion-brands-2026',
];

export async function GET() {
  const { data } = await apiCall('/blogs', 'GET', null, null, false, { next: { revalidate: 300 } });
  const blogs = Array.isArray(data) ? data : [];
  const now = new Date().toISOString().split('T')[0];

  const seenSlugs = new Set();
  const urlEntries = [];

  // Add dynamic blogs from API
  blogs.forEach((b) => {
    if (b.slug) {
      seenSlugs.add(b.slug);
      const lastmod = (b.updatedAt || b.createdAt || '').split('T')[0] || now;
      urlEntries.push(`  <url>
    <loc>${SITE_URL}/blog/${encodeURIComponent(b.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
    }
  });

  // Add static article slugs if not already provided by API
  staticBlogSlugs.forEach((slug) => {
    if (!seenSlugs.has(slug)) {
      urlEntries.push(`  <url>
    <loc>${SITE_URL}/blog/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`);
    }
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

