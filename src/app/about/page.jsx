import AboutPage from '@/components/AboutPage';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';

export function generateMetadata() {
  return buildMetadata({
    title: 'About Our Studio',
    description:
      'Founded in 2021, Elipse Studio is a leading 3D visualization, AR/VR, and creative technology studio trusted by global developers.',
    keywords:
      'Elipse Studio, 3D visualization studio, immersive technology company, architectural visualization, VR studio, AR development, creative technology',
    canonical: `${SITE_URL}/about`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'AboutPage',
      name: 'About Elipse Studio',
      description:
        'Founded in 2021, Elipse Studio is a 3D visualization and immersive technology studio trusted by premium developers worldwide.',
      url: `${SITE_URL}/about`,
      mainEntity: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Elipse Studio',
        foundingDate: '2021',
        description:
          '3D visualization and immersive technology studio specializing in architectural visualization, VR, AR, and interactive experiences.',
        knowsAbout: ['3D Visualization', 'AR/VR Development', 'Web Configurator', 'Product Rendering', 'Interactive Experience'],
      },
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'About', item: `${SITE_URL}/about` },
      ],
    },
  });
}

export default function Page() {
  return <AboutPage />;
}
