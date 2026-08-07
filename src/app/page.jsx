import Home from '@/components/features/Home';
import { buildMetadata } from '@/seo/metadata';
import { SITE_URL } from '@/utils/api';
import { getFeaturedCaseStudies, getProjects } from '@/services/projectService';
import { getReviews } from '@/services/reviewService';
import { getBlogs } from '@/services/blogService';

export function generateMetadata() {
  return buildMetadata({
    title: '3D Visualization & Web Configurators',
    description:
      'Elipse Studio delivers premium 3D rendering, walkthrough animation, interactive web configurators, and AR/VR experiences for property developers and brands worldwide since 2014. Trusted by Burj Binghatti.',
    canonical: `${SITE_URL}/`,
    ogImage: `${SITE_URL}/assets/logo-og.webp`,
    ogImageAlt: 'Elipse Studio — 3D Visualization & AR/VR Studio',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Elipse Studio — 3D Visualization, AR/VR & Web Configurator Agency',
      description:
        'Elipse Studio delivers premium 3D rendering, walkthrough animation, interactive web configurators, and AR/VR experiences for property developers and brands worldwide since 2014. Trusted by Burj Binghatti.',
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
    getFeaturedCaseStudies(),
    getProjects(),
    getReviews(),
    getBlogs(),
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
