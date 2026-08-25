import IndustriesAllPage from '@/components/IndustriesAllPage';
import { buildMetadata } from '@/lib/seo';
import { MultiJsonLd } from '@/components/seo/JsonLd';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://elipsestudio.com';

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Elipse Studio Industries',
  description:
    'Tailored 3D visualization, VR, AR, and interactive solutions for real estate, ecommerce, healthcare, manufacturing, and more.',
  url: `${SITE_URL}/industries`,
  mainEntity: {
    '@type': 'ItemList',
    name: 'Industries We Serve',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Real Estate', url: `${SITE_URL}/industries/real-estate` },
      { '@type': 'ListItem', position: 2, name: 'Architecture', url: `${SITE_URL}/industries/architecture` },
      { '@type': 'ListItem', position: 3, name: 'Interior Design', url: `${SITE_URL}/industries/interior-design` },
      { '@type': 'ListItem', position: 4, name: 'Manufacturing', url: `${SITE_URL}/industries/manufacturing` },
      { '@type': 'ListItem', position: 5, name: 'E-Commerce', url: `${SITE_URL}/industries/ecommerce` },
      { '@type': 'ListItem', position: 6, name: 'Automotive', url: `${SITE_URL}/industries/automotive` },
      { '@type': 'ListItem', position: 7, name: 'Furniture', url: `${SITE_URL}/industries/furniture` },
      { '@type': 'ListItem', position: 8, name: 'Healthcare', url: `${SITE_URL}/industries/healthcare` },
      { '@type': 'ListItem', position: 9, name: 'Education & Training', url: `${SITE_URL}/industries/education-training` },
      { '@type': 'ListItem', position: 10, name: 'Construction', url: `${SITE_URL}/industries/construction` },
      { '@type': 'ListItem', position: 11, name: 'Energy & Utilities', url: `${SITE_URL}/industries/energy-utilities` },
      { '@type': 'ListItem', position: 12, name: 'Hospitality', url: `${SITE_URL}/industries/hospitality` },
      { '@type': 'ListItem', position: 13, name: 'Retail', url: `${SITE_URL}/industries/retail` },
    ],
  },
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Industries', item: `${SITE_URL}/industries` },
  ],
};

export function generateMetadata() {
  return buildMetadata({
    title: 'Industries We Serve',
    description:
      'Explore tailored 3D visualization, AR/VR, and interactive digital solutions for real estate, automotive, e-commerce, and healthcare.',
    canonical: `${SITE_URL}/industries`,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={[schema, breadcrumb]} />
      <IndustriesAllPage />
    </>
  );
}
