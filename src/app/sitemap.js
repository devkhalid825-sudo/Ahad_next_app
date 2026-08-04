import { BACKEND_ORIGIN, SITE_URL } from '@/utils/api';

export const revalidate = 86400;

const SITEMAP_FILES = [
  'pages_sitemap.xml',
  'projects_sitemap.xml',
  'blogs_sitemap.xml',
  'casestudies_sitemap.xml',
];

const STATIC_PAGES = [
  '',
  'about',
  'services',
  'capabilities',
  'portfolio',
  'case-studies',
  'contact',
  'blog',
];

export default async function sitemap() {
  const urls = [];

  for (const file of SITEMAP_FILES) {
    try {
      const res = await fetch(`${BACKEND_ORIGIN}/${file}`, { next: { revalidate: 86400 } });
      if (!res.ok) continue;
      const xml = await res.text();
      const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
      for (const loc of locs) {
        if (!loc) continue;
        urls.push({ url: loc, lastModified: new Date() });
      }
    } catch {
      // backend unreachable — fall through to static pages
    }
  }

  if (urls.length === 0) {
    for (const page of STATIC_PAGES) {
      urls.push({
        url: `${SITE_URL}/${page}`.replace(/\/$/, ''),
        lastModified: new Date(),
      });
    }
  }

  return urls;
}
