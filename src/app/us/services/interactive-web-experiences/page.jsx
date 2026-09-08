import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import UsInteractiveWebExperiencesPage from '@/components/us/UsInteractiveWebExperiencesPage';

const meta = {
  title: 'Interactive Web Experiences Services in the USA',
  description: 'WebGL-powered 3D landing pages, scroll-driven storytelling, and immersive microsites for US digital campaigns, delivered from Elipse Studio Illinois.',
  keywords: 'interactive web experiences usa, webgl development illinois, 3d landing page usa, three.js development usa, unreal pixel streaming usa',
  ogImage: `${SITE_URL}/assets/services/og-interactive-web-experiences.jpg`,
  schemaType: 'Service',
};

const faqs = [
  { q: 'Does it work on mobile?', a: 'Yes — every build is tested and optimized for mobile browsers and US mobile network conditions before launch.' },
  { q: 'Do visitors need to download anything?', a: 'No — everything runs natively in the browser, including Unreal Pixel Streaming builds.' },
  { q: 'How long does an interactive campaign build take?', a: 'Typically 4-8 weeks depending on scene complexity and interaction depth.' },
  { q: 'Can it integrate with our existing website?', a: 'Yes — delivered as an embeddable build or a standalone microsite linked from your main site.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/us/services/interactive-web-experiences`,
    provider: { '@type': 'Organization', name: 'Elipse Studio', url: SITE_URL },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/us/services' },
    { name: 'Interactive Web Experiences', url: '/us/services/interactive-web-experiences' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/us/services/interactive-web-experiences`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <UsInteractiveWebExperiencesPage />
    </>
  );
}
