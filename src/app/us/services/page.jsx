import UsServicesPage from '@/components/us/UsServicesPage';
import { buildMetadata, buildFaqSchema } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';

const faqs = [
  { q: 'What services does Elipse Studio offer US brands?', a: 'Elipse Studio USA delivers every immersive capability from one Illinois-based team: 3D product configurators, VR development, AR development, architectural visualization, 3D product visualization, 3D animation, motion graphics, VFX and virtual production, virtual showrooms and digital twins, and interactive web experiences. All services are quoted in transparent USD pricing with CT account management from our Illinois office.' },
  { q: 'How is working with a US-based Elipse Studio team different?', a: 'The difference is operational, not just geographic. Central Time (CT) hours mean your project is never waiting overnight for a decision or revision. Transparent USD pricing means no invoice surprises. A Illinois-based account manager means direct phone access at +1 630-297-0428 during your working day.' },
  { q: 'Can Elipse Studio handle multiple services for our US brand at once?', a: 'Yes — because every service is delivered by the same studio, your 3D assets are shared across deliverables. A 3D model produced for your product configurator also generates your product renders, powers your WebAR experience, and populates your virtual showroom — without any additional 3D production cost for each channel.' },
  { q: 'How do I get a quote for a US project?', a: 'Fill in the form at the bottom of this page or call our US direct line at +1 630-297-0428. We respond within one US business day with a free ballpark estimate. For qualifying projects we also offer a free sample render so you can assess visual quality before any commitment.' },
  { q: 'Do you work with US startups as well as established brands?', a: 'Yes. Our US client base spans early-stage DTC brands launching their first product to established American manufacturers replacing physical showrooms. The scope of the project scales to your stage.' },
];

const usServices = [
  { position: 1, name: '3D Product Configurators USA', url: `${SITE_URL}/us/services/3d-product-configurators` },
  { position: 2, name: 'VR Development USA', url: `${SITE_URL}/us/services/virtual-reality-development` },
  { position: 3, name: 'AR Development USA', url: `${SITE_URL}/us/services/ar-development` },
  { position: 4, name: 'Architectural Visualization USA', url: `${SITE_URL}/us/services/architectural-visualization` },
  { position: 5, name: '3D Product Visualization USA', url: `${SITE_URL}/us/services/3d-product-visualization` },
  { position: 6, name: '3D Animation USA', url: `${SITE_URL}/us/services/3d-animation-services` },
  { position: 7, name: 'Motion Graphics USA', url: `${SITE_URL}/us/services/motion-graphics-services` },
  { position: 8, name: 'VFX & Virtual Production USA', url: `${SITE_URL}/us/services/vfx-virtual-production` },
  { position: 9, name: 'Virtual Showrooms & Digital Twins USA', url: `${SITE_URL}/us/services/virtual-showrooms` },
  { position: 10, name: 'Interactive Web Experiences USA', url: `${SITE_URL}/us/services/interactive-web-experiences` },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Elipse Studio USA Services',
  description:
    'Elipse Studio USA delivers 3D product configurators, AR, VR, architectural visualization, 3D animation, motion graphics, VFX, virtual showrooms, and interactive web experiences for US brands.',
  url: `${SITE_URL}/us/services`,
  mainEntity: {
    '@type': 'ItemList',
    name: 'Our USA Services',
    itemListElement: usServices.map((s) => ({
      '@type': 'ListItem',
      position: s.position,
      name: s.name,
      url: s.url,
    })),
  },
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/us/services` },
  ],
};

export function generateMetadata() {
  return buildMetadata({
    title: 'Immersive 3D, AR & VR Services USA | Elipse Studio Illinois',
    description:
      "Elipse Studio is the USA's immersive studio for 3D product configurators, AR, VR, architectural visualization, 3D animation, motion graphics, VFX, virtual showrooms, and interactive web experiences — from one Illinois team.",
    canonical: `${SITE_URL}/us/services`,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={[schema, breadcrumb, buildFaqSchema(faqs)]} />
      <UsServicesPage />
    </>
  );
}
