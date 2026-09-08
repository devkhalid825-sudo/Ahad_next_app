import { SITE_URL } from '@/utils/api';

export const dynamic = 'force-dynamic';

export async function GET() {
  const now = new Date().toISOString().split('T')[0];

  const globalServices = [
    '',
    '/architectural-visualization',
    '/3d-product-visualization',
    '/3d-product-configurators',
    '/interactive-web-experiences',
    '/vr-development',
    '/ar-development',
    '/3d-animation',
    '/product-animation',
    '/vfx-virtual-production',
    '/virtual-showrooms-digital-twins',
    '/custom-software-development',
    '/website-development',
    '/mobile-app-development',
    '/creative-services',
    '/enterprise-solutions',
    '/marketing',
  ];

  const ukServices = [
    '',
    '/3d-product-configurators',
    '/virtual-reality-development',
    '/architectural-visualisation',
    '/3d-product-visualisation',
    '/3d-animation-services',
    '/vfx-virtual-production',
    '/virtual-showrooms',
    '/interactive-web-experiences',
  ];

  const auServices = [
    '',
    '/3d-product-configurators',
    '/virtual-reality-development',
    '/architectural-visualisation',
    '/3d-product-visualisation',
    '/3d-animation-services',
    '/vfx-virtual-production',
    '/virtual-showrooms',
    '/interactive-web-experiences',
  ];

  const usServices = [
    '',
    '/3d-product-configurators',
    '/virtual-reality-development',
    '/ar-development',
    '/architectural-visualization',
    '/3d-product-visualization',
    '/3d-animation-services',
    '/motion-graphics-services',
    '/vfx-virtual-production',
    '/virtual-showrooms',
    '/interactive-web-experiences',
  ];

  const globalUrls = globalServices.map(
    (slug) => `  <url>
    <loc>${SITE_URL}/services${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${slug === '' ? '0.95' : '0.9'}</priority>
  </url>`
  );

  const ukUrls = ukServices.map(
    (slug) => `  <url>
    <loc>${SITE_URL}/uk/services${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${slug === '' ? '0.95' : '0.9'}</priority>
  </url>`
  );

  const auUrls = auServices.map(
    (slug) => `  <url>
    <loc>${SITE_URL}/au/services${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${slug === '' ? '0.95' : '0.9'}</priority>
  </url>`
  );

  const usUrls = usServices.map(
    (slug) => `  <url>
    <loc>${SITE_URL}/us/services${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${slug === '' ? '0.95' : '0.9'}</priority>
  </url>`
  );

  const urls = [...globalUrls, ...ukUrls, ...auUrls, ...usUrls].join('\n');

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
