import ServicesPage from '@/components/ServicesPage';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';

export function generateMetadata() {
  return buildMetadata({
    title: '3D Visualization, AR/VR & Digital Services',
    description:
      'From web and mobile to VR, AR, and animation — we build immersive digital experiences that engage audiences and drive results across every platform.',
    canonical: `${SITE_URL}/services`,
    schema: {
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
          { '@type': 'ListItem', position: 8, name: 'VFX & Virtual Production', url: `${SITE_URL}/services/vfx-virtual-production` },
          { '@type': 'ListItem', position: 9, name: 'Virtual Showrooms & Digital Twins', url: `${SITE_URL}/services/virtual-showrooms-digital-twins` },
          { '@type': 'ListItem', position: 10, name: 'Custom Software Development', url: `${SITE_URL}/services/custom-software-development` },
          { '@type': 'ListItem', position: 11, name: 'Website Development', url: `${SITE_URL}/services/website-development` },
          { '@type': 'ListItem', position: 12, name: 'Mobile App Development', url: `${SITE_URL}/services/mobile-app-development` },
          { '@type': 'ListItem', position: 13, name: 'Creative Services', url: `${SITE_URL}/services/creative-services` },
          { '@type': 'ListItem', position: 14, name: 'Enterprise Solutions', url: `${SITE_URL}/services/enterprise-solutions` },
          { '@type': 'ListItem', position: 15, name: 'Marketing', url: `${SITE_URL}/services/marketing` },
        ],
      },
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE_URL}/services` },
      ],
    },
  });
}

export default function Page() {
  return <ServicesPage />;
}
