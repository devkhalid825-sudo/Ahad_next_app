import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import UsMotionGraphicsPage from '@/components/us/UsMotionGraphicsPage';

const meta = {
  title: 'Motion Graphics Services in the USA',
  description: '2D/3D motion graphics, kinetic typography, animated explainers, and social ad creative for US brands — After Effects + Cinema 4D pipeline from Elipse Studio Illinois.',
  keywords: 'motion graphics services usa, motion design illinois, kinetic typography usa, social media ad creative usa, animated explainer video usa',
  ogImage: `${SITE_URL}/assets/services/og-motion-graphics.jpg`,
  schemaType: 'Service',
};

const faqs = [
  { q: 'How fast can you turn around a social ad cut?', a: 'Short-form social ad creative typically turns around in 48-72 hours once the brief and assets are confirmed; full campaigns take longer.' },
  { q: 'Do you work with US marketing and creative agencies?', a: 'Yes — we regularly work as the motion design production partner for US agencies who need overflow capacity or specialist 2D/3D skills.' },
  { q: 'Can you match our existing brand guidelines?', a: 'Yes — we build a reusable motion template system from your brand guidelines so future pieces stay consistent without a full rebrief.' },
  { q: 'What formats do you deliver?', a: 'Square (1:1), vertical (9:16), widescreen (16:9), and broadcast/OTT-spec masters from a single production.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/us/services/motion-graphics-services`,
    provider: { '@type': 'Organization', name: 'Elipse Studio', url: SITE_URL },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/us/services' },
    { name: 'Motion Graphics Services', url: '/us/services/motion-graphics-services' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/us/services/motion-graphics-services`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <UsMotionGraphicsPage />
    </>
  );
}
