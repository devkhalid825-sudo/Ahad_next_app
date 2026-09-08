import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import UsProductConfiguratorsPage from '@/components/us/UsProductConfiguratorsPage';

const meta = {
  title: '3D Product Configurator Development Services in the USA',
  description: 'Real-time WebGL 3D product configurators for US ecommerce brands. Shopify and WooCommerce native, USD pricing, CAD-accurate PBR renders from Elipse Studio Illinois.',
  keywords: '3d product configurator usa, 3d configurator development illinois, shopify 3d configurator usa, webgl configurator usa, real-time product configurator',
  ogImage: `${SITE_URL}/assets/services/og-3d-configurators.jpg`,
  schemaType: 'Service',
};

const faqs = [
  { q: 'Do customers need to download anything?', a: 'No. The configurator runs natively in the browser via WebGL — no app, no download, no account required.' },
  { q: 'Does it integrate with our Shopify store?', a: 'Yes. SKU and USD price flow directly from the configurator into Shopify, WooCommerce, or Magento checkout.' },
  { q: 'How long does a configurator take to build?', a: 'Typically live within 10 weeks from CAD handover, with milestones at model, logic, and integration stages.' },
  { q: 'Can it handle my compatibility rules?', a: 'Yes — our rules engine blocks invalid option combinations before they reach your OMS, preventing misconfigured orders.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/us/services/3d-product-configurators`,
    provider: { '@type': 'Organization', name: 'Elipse Studio', url: SITE_URL },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/us/services' },
    { name: '3D Product Configurators', url: '/us/services/3d-product-configurators' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/us/services/3d-product-configurators`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <UsProductConfiguratorsPage />
    </>
  );
}
