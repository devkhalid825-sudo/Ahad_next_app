import CapabilitiesPage from '@/components/CapabilitiesPage';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';

export function generateMetadata() {
  return buildMetadata({
    title: 'Capabilities & Tools',
    description:
      'Explore our full range of creative technology capabilities including 3D rendering, interactive web configurators, and AR/VR development.',
    canonical: `${SITE_URL}/capabilities`,
    ogImage: `${SITE_URL}/assets/logo-og.webp`,
    ogImageAlt: 'Elipse Studio — Full Range of Creative Technology Capabilities',
    schema: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${SITE_URL}/capabilities#webpage`,
      url: `${SITE_URL}/capabilities`,
      name: 'Our Capabilities | Elipse Studio',
      description:
        'Full range of creative technology capabilities including 3D visualization, interactive configurators, AR/VR, CGI animation, web development, and digital marketing.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#organization` },
      breadcrumb: { '@id': `${SITE_URL}/capabilities#breadcrumb` },
      inLanguage: 'en-US',
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/capabilities#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Capabilities', item: `${SITE_URL}/capabilities` },
      ],
    },
  });
}

export default function Page() {
  return <CapabilitiesPage />;
}
