import PortfolioPage from '@/components/PortfolioPage';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export function generateMetadata() {
  return buildMetadata({
    title: 'Portfolio & Projects',
    description:
      'Explore 3D visualization, VR, AR, and interactive configurator projects across real estate, automotive, ecommerce, and manufacturing.',
    canonical: `${SITE_URL}/portfolio`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Elipse Studio Portfolio',
      description:
        'Explore our portfolio of 3D visualization, VR, AR, and interactive configurator projects across industries.',
      url: `${SITE_URL}/portfolio`,
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
        { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${SITE_URL}/portfolio` },
      ],
    },
  });
}

export default function Page() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: `${SITE_URL}/` },
          { name: 'Portfolio', item: `${SITE_URL}/portfolio` },
        ]}
      />
      <PortfolioPage />
    </>
  );
}
