import Home from '@/components/Home';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL, BACKEND_ORIGIN } from '@/utils/api';

const REVALIDATE_SECONDS = 3600;

async function fetchHomeData(path) {
  try {
    const res = await fetch(`${BACKEND_ORIGIN}/api${path}`, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

export function generateMetadata() {
  return buildMetadata({
    title: '3D Visualization, AR/VR & Web Configurator Agency | Elipse Studio',
    description:
      'Professional 3D visualization, AR/VR experiences, and web configurators for product-based businesses across Dubai, UAE & worldwide. Transform your ideas into immersive digital experiences.',
    keywords:
      '3D visualization, AR VR development, web configurators, real-time rendering, Unreal Engine, WebGL, product visualization, Dubai 3D studio, immersive experiences',
    canonical: SITE_URL,
    ogImage: `${SITE_URL}/assets/logo-og.webp`,
    ogImageAlt: 'Elipse Studio — 3D Visualization, AR/VR & Web Configurator Agency',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Elipse Studio — 3D Visualization, AR/VR & Web Configurator Agency',
      description:
        'Professional 3D visualization, AR/VR experiences, and web configurators for product-based businesses. Transform your ideas into immersive digital experiences.',
      url: SITE_URL,
      publisher: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Elipse Studio',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/assets/logo-og.webp`,
        },
      },
      isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: 'Elipse Studio', url: SITE_URL },
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` }],
    },
  });
}

export default async function Page() {
  const [featured, projects, reviews, blogs] = await Promise.all([
    fetchHomeData('/case-studies?featured=true'),
    fetchHomeData('/projects'),
    fetchHomeData('/reviews'),
    fetchHomeData('/blogs'),
  ]);

  return (
    <Home
      initialFeatured={featured}
      initialProjects={projects}
      initialReviews={reviews}
      initialBlogs={blogs}
    />
  );
}
