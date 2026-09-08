import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import UsVirtualShowroomsPage from '@/components/us/UsVirtualShowroomsPage';

const meta = {
  title: 'Virtual Showrooms & Digital Twins Services in the USA',
  description: 'Browser-accessible 3D showrooms and digital twins for US manufacturers, developers, and retail brands, delivered from Elipse Studio Illinois.',
  keywords: 'virtual showroom usa, digital twin illinois, 3d showroom development usa, browser 3d showroom usa',
  ogImage: `${SITE_URL}/assets/services/og-virtual-showrooms.jpg`,
  schemaType: 'Service',
};

const faqs = [
  { q: 'Do visitors need to install anything?', a: 'No — the showroom runs in a standard web browser, accessible via a shared link.' },
  { q: 'Can the showroom reflect our real facility?', a: 'Yes — for digital twins we build from BIM data or site surveys for an accurate 1:1 replica.' },
  { q: 'How often can the product range be updated?', a: 'Content updates are scoped separately and can be scheduled as your catalog changes.' },
  { q: 'How long does a virtual showroom take to build?', a: 'Typically 8-12 weeks depending on catalog size and environment complexity.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/us/services/virtual-showrooms`,
    provider: { '@type': 'Organization', name: 'Elipse Studio', url: SITE_URL },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/us/services' },
    { name: 'Virtual Showrooms', url: '/us/services/virtual-showrooms' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/us/services/virtual-showrooms`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <UsVirtualShowroomsPage />
    </>
  );
}
