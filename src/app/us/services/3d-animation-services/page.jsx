import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import UsAnimationPage from '@/components/us/UsAnimationPage';

const meta = {
  title: '3D Animation Services in the USA',
  description: 'Cinematic 3D product animation, brand films, and character animation for US brands — broadcast quality from Elipse Studio Illinois.',
  keywords: '3d animation services usa, product animation illinois, character animation usa, 3d brand film usa',
  ogImage: `${SITE_URL}/assets/services/og-3d-animation.jpg`,
  schemaType: 'Service',
};

const faqs = [
  { q: 'How long does 3D animation take?', a: 'Product animation typically 4–8 weeks; character animation 8–14 weeks. Milestones are shared before production begins.' },
  { q: 'Do you work with US agencies?', a: 'Yes — many US marketing agencies use Elipse Studio as their white-label 3D animation production partner.' },
  { q: 'Is the animation CAD-accurate?', a: 'Yes. We build from your actual CAD files so what you see matches exactly what your factory produces.' },
  { q: 'What formats do you deliver?', a: '4K broadcast master, social square (1:1), YouTube (16:9), portrait (9:16), web-optimized, and print stills from one production.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/us/services/3d-animation-services`,
    provider: { '@type': 'Organization', name: 'Elipse Studio', url: SITE_URL },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/us/services' },
    { name: '3D Animation Services', url: '/us/services/3d-animation-services' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/us/services/3d-animation-services`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <UsAnimationPage />
    </>
  );
}
