import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import UsArDevelopmentPage from '@/components/us/UsArDevelopmentPage';

const meta = {
  title: 'Augmented Reality (AR) Development Services in the USA',
  description: 'WebAR and app-based AR development for US brands — virtual try-on, in-room product placement, and QR-triggered marketing. 8th Wall, ARKit, and ARCore from Elipse Studio Illinois.',
  keywords: 'ar development usa, augmented reality development illinois, webar development usa, virtual try-on ar, arkit arcore development usa',
  ogImage: `${SITE_URL}/assets/services/og-ar-development.jpg`,
  schemaType: 'Service',
};

const faqs = [
  { q: 'Does the customer need to download an app?', a: 'Not for WebAR — it opens instantly from a browser link or QR code on iOS and Android. Native AR (ARKit/ARCore) requires your existing app.' },
  { q: 'Can AR reduce our return rate?', a: 'Yes — in-room placement and virtual try-on close the expectation gap between what a customer sees online and what arrives, which is a common driver of returns.' },
  { q: 'How long does an AR build take?', a: 'Typically 6-10 weeks depending on tracking complexity, the number of SKUs, and whether it is WebAR or native.' },
  { q: 'Can you build a QR-triggered AR experience for packaging?', a: 'Yes — we build the AR experience and the QR trigger for packaging, print, or in-store display activations.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/us/services/ar-development`,
    provider: { '@type': 'Organization', name: 'Elipse Studio', url: SITE_URL },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/us/services' },
    { name: 'AR Development', url: '/us/services/ar-development' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/us/services/ar-development`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <UsArDevelopmentPage />
    </>
  );
}
