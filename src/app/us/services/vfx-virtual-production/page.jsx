import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import UsVfxVirtualProductionPage from '@/components/us/UsVfxVirtualProductionPage';

const meta = {
  title: 'VFX & Virtual Production Services in the USA',
  description: 'CGI integration, environment replacement, and real-time LED volume production support for US brand campaigns and commercials, delivered from Elipse Studio Illinois.',
  keywords: 'vfx services usa, virtual production illinois, led volume production usa, cgi integration usa, broadcast vfx usa',
  ogImage: `${SITE_URL}/assets/services/og-vfx-virtual-production.jpg`,
  schemaType: 'Service',
};

const faqs = [
  { q: 'Can you support an LED volume shoot?', a: 'Yes — we build and operate real-time Unreal Engine environments for LED wall virtual production.' },
  { q: 'Do you work with US production companies and agencies?', a: 'Yes — we regularly work as the 3D/VFX execution partner for US production companies and agencies.' },
  { q: 'What formats do you deliver?', a: 'Broadcast and streaming-spec masters, along with social and digital cutdowns as required.' },
  { q: 'How far in advance do you need to be briefed for a shoot?', a: 'Ideally 3-4 weeks ahead for asset and environment prep, though shorter timelines can be discussed.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/us/services/vfx-virtual-production`,
    provider: { '@type': 'Organization', name: 'Elipse Studio', url: SITE_URL },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/us/services' },
    { name: 'VFX & Virtual Production', url: '/us/services/vfx-virtual-production' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/us/services/vfx-virtual-production`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <UsVfxVirtualProductionPage />
    </>
  );
}
