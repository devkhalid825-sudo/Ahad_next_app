import ServicesPage from '@/components/ServicesPage';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import { MultiJsonLd } from '@/components/seo/JsonLd';

const schema = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Elipse Studio Services',
      description:
        'From web and mobile to VR, AR, and animation — we build immersive digital experiences that engage audiences and drive results.',
      url: `${SITE_URL}/services`,
      mainEntity: {
        '@type': 'ItemList',
        name: 'Our Services',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Architectural Visualization', url: `${SITE_URL}/services/architectural-visualization` },
          { '@type': 'ListItem', position: 2, name: '3D Product Visualization', url: `${SITE_URL}/services/3d-product-visualization` },
          { '@type': 'ListItem', position: 3, name: '3D Product Configurators', url: `${SITE_URL}/services/3d-product-configurators` },
          { '@type': 'ListItem', position: 4, name: 'Interactive Web Experiences', url: `${SITE_URL}/services/interactive-web-experiences` },
          { '@type': 'ListItem', position: 5, name: 'VR Development', url: `${SITE_URL}/services/vr-development` },
          { '@type': 'ListItem', position: 6, name: 'AR Development', url: `${SITE_URL}/services/ar-development` },
          { '@type': 'ListItem', position: 7, name: '3D Animation', url: `${SITE_URL}/services/3d-animation` },
          { '@type': 'ListItem', position: 8, name: '3D Product Animation', url: `${SITE_URL}/services/product-animation` },
          { '@type': 'ListItem', position: 9, name: 'VFX & Virtual Production', url: `${SITE_URL}/services/vfx-virtual-production` },
          { '@type': 'ListItem', position: 10, name: 'Virtual Showrooms & Digital Twins', url: `${SITE_URL}/services/virtual-showrooms-digital-twins` },
          { '@type': 'ListItem', position: 11, name: 'Custom Software Development', url: `${SITE_URL}/services/custom-software-development` },
          { '@type': 'ListItem', position: 12, name: 'Website Development', url: `${SITE_URL}/services/website-development` },
          { '@type': 'ListItem', position: 13, name: 'Mobile App Development', url: `${SITE_URL}/services/mobile-app-development` },
          { '@type': 'ListItem', position: 14, name: 'Creative Services', url: `${SITE_URL}/services/creative-services` },
          { '@type': 'ListItem', position: 15, name: 'Enterprise Solutions', url: `${SITE_URL}/services/enterprise-solutions` },
          { '@type': 'ListItem', position: 16, name: 'Marketing', url: `${SITE_URL}/services/marketing` },
        ],
      },
};

const breadcrumb = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
  ],
};

export function generateMetadata() {
  return buildMetadata({
    title: 'Services & Solutions',
    description:
      'Explore 3D rendering, walkthrough animation, interactive configurators, and AR/VR development services from Elipse Studio worldwide.',
    canonical: `${SITE_URL}/services`,
  });
}

export default function Page() {
  return (
    <>
      <MultiJsonLd schemas={[schema, breadcrumb]} />
      <ServicesPage />
    </>
  );
}
