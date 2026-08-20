import BlogsPage from '@/components/BlogsPage';
import { apiCall } from '@/utils/api';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';

export const revalidate = 300;

export function generateMetadata() {
  return buildMetadata({
    title: 'Blog & Insights',
    description:
      'Explore expert insights, guides, and trends on 3D visualization, VR/AR development, and interactive configurators from Elipse Studio.',
    keywords:
      '3D visualization blog, VR insights, AR technology, configurator trends, immersive tech Dubai, 3D web, WebGL, Unreal Engine, real-time rendering',
    canonical: `${SITE_URL}/blog`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Elipse Studio Blog',
      description:
        'Insights on 3D visualization, VR, AR, configurators, and immersive technology from Elipse Studio.',
      url: `${SITE_URL}/blog`,
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'Elipse Studio',
        url: SITE_URL,
      },
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      ],
    },
  });
}

export default async function Page() {
  const { data, status } = await apiCall('/blogs', 'GET', null, null, false, { next: { revalidate: 300 } });
  const initialBlogs =
    status === 200 && Array.isArray(data)
      ? data
          .map((b) => ({
            id: b.id,
            title: b.title,
            excerpt: b.excerpt,
            image: b.image,
            date: b.date,
            category: b.category,
            url: '/blog/' + b.slug,
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date))
      : null;
  return <BlogsPage initialBlogs={initialBlogs} />;
}
