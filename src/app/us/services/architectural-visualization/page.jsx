import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import UsArchitecturalVisualizationPage from '@/components/us/UsArchitecturalVisualizationPage';

const meta = {
  title: 'Architectural Visualization Services in the USA',
  description: 'Photoreal exterior and interior CGI, walkthroughs, and entitlement visuals for US property developers and architects. Delivered from Elipse Studio Illinois.',
  keywords: 'architectural visualization usa, arch vis illinois, 3d rendering for developers usa, entitlement visuals usa, architectural cgi usa',
  ogImage: `${SITE_URL}/assets/services/og-architectural-visualization.jpg`,
  schemaType: 'Service',
};

const faqs = [
  { q: 'Can you work directly from our BIM model?', a: 'Yes — we work from Revit, SketchUp, ArchiCAD, and AutoCAD files, importing the model directly to avoid re-modeling.' },
  { q: 'Do you produce verified views for entitlement or zoning hearings?', a: 'Yes — we produce CGI verified views and photomontages to the standard US city planning departments and zoning boards require for approval packages.' },
  { q: 'How long does an exterior render take?', a: 'A single exterior CGI typically takes 2-4 weeks; full entitlement packages and walkthrough animation take longer depending on scope.' },
  { q: 'Can renders be used before a project has final approval?', a: 'Yes — pre-application visuals are common for community meetings and investor decks.' },
];

function buildSchemas() {
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': meta.schemaType,
    name: meta.title,
    description: meta.description,
    url: `${SITE_URL}/us/services/architectural-visualization`,
    provider: { '@type': 'Organization', name: 'Elipse Studio', url: SITE_URL },
  };
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/us/services' },
    { name: 'Architectural Visualization', url: '/us/services/architectural-visualization' },
  ]);
  const faq = buildFaqSchema(faqs);
  return [serviceSchema, breadcrumb, faq].filter(Boolean);
}

export function generateMetadata() {
  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/us/services/architectural-visualization`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={buildSchemas()} />
      <UsArchitecturalVisualizationPage />
    </>
  );
}
