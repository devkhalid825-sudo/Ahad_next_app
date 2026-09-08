import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import UsProductVisualizationPage from '@/components/us/UsProductVisualizationPage';

const meta = {
  title: '3D Product Visualization Services in the USA',
  description: 'Photoreal 3D product renders and 360° views for US brands — replace photography with a single CAD-accurate 3D model. Delivered from Elipse Studio Illinois.',
  keywords: '3d product visualization usa, 3d product rendering illinois, photoreal product renders usa, 360 product view usa',
  ogImage: `${SITE_URL}/assets/services/og-3d-product-visualization.jpg`,
  schemaType: 'Service',
};

const faqs = [
  { q: 'Do you need physical samples to start?', a: 'No — we can work from CAD files, reference products, or spec sheets. Physical samples help match materials exactly but are not required.' },
  { q: 'Is 3D visualization cheaper than photography for a full catalog?', a: "For catalogs with many color or material variants, yes — the 3D model is built once and every variant renders at a fraction of a reshoot's cost." },
  { q: 'Can you match our exact colors and finishes?', a: 'Yes — PBR materials are calibrated against your physical samples or Pantone/RAL references before final renders are produced.' },
  { q: 'Do renders work for both web and print?', a: 'Yes — every render is delivered in web-optimized and print-ready (CMYK, high-resolution) formats from the same render pass.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/us/services/3d-product-visualization`,
    provider: { '@type': 'Organization', name: 'Elipse Studio', url: SITE_URL },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/us/services' },
    { name: '3D Product Visualization', url: '/us/services/3d-product-visualization' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/us/services/3d-product-visualization`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <UsProductVisualizationPage />
    </>
  );
}
