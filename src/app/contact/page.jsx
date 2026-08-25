import ContactPage from '@/components/ContactPage';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';

const schema = {
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
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${SITE_URL}/contact` },
  ],
};

export function generateMetadata() {
  return buildMetadata({
    title: 'Contact Us',
    description:
      'Get in touch with Elipse Studio for 3D visualization, VR, AR, and interactive web experiences. We respond to inquiries within 24 hours.',
    canonical: `${SITE_URL}/contact`,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={[schema, breadcrumb]} />
      <ContactPage />
    </>
  );
}
