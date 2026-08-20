import CaseStudiesPage from '@/components/CaseStudiesPage';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';

export function generateMetadata() {
  return buildMetadata({
    title: 'Case Studies & Results',
    description:
      'Discover how Elipse Studio delivers measurable business results through 3D visualization, VR/AR, and interactive product configurators.',
    keywords:
      '3D visualization case studies, VR projects, AR solutions, interactive configurator examples, Elipse Studio portfolio, real results',
    canonical: `${SITE_URL}/case-studies`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Elipse Studio Case Studies',
      description:
        'See how Elipse Studio delivers immersive 3D, VR, AR, and interactive configurator solutions across industries.',
      url: `${SITE_URL}/case-studies`,
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
        { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${SITE_URL}/case-studies` },
      ],
    },
  });
}

export default function Page() {
  return <CaseStudiesPage />;
}
