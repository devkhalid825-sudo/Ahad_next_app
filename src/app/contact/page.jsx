import ContactPage from '@/components/ContactPage';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export function generateMetadata() {
  return buildMetadata({
    title: 'Contact Us',
    description:
      'Ready to start your project? Get in touch with Elipse Studio for 3D visualization, VR, AR, and interactive experiences. We respond within 24 hours.',
    canonical: `${SITE_URL}/contact`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      name: 'Contact Elipse Studio',
      description:
        'Get in touch with Elipse Studio for 3D visualization, VR, AR, and interactive experiences.',
      url: `${SITE_URL}/contact`,
      mainEntity: {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: 'Elipse Studio',
        url: SITE_URL,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          availableLanguage: ['English', 'Arabic'],
        },
      },
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
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
          { name: 'Contact', item: `${SITE_URL}/contact` },
        ]}
      />
      <ContactPage />
    </>
  );
}
