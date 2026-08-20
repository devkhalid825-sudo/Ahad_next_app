import IndustriesAllPage from '@/components/IndustriesAllPage';
import { buildMetadata } from '@/lib/seo';

export function generateMetadata() {
  return buildMetadata({
    title: 'Industries We Serve',
    description:
      'Explore tailored 3D visualization, AR/VR, and interactive digital solutions for real estate, automotive, e-commerce, and healthcare.',
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://elipsestudio.com'}/industries`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Elipse Studio Industries',
      description:
        'Tailored 3D visualization, VR, AR, and interactive solutions for real estate, ecommerce, healthcare, manufacturing, and more.',
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://elipsestudio.com'}/industries`,
      mainEntity: {
        '@type': 'ItemList',
        name: 'Industries We Serve',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Real Estate', url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://elipsestudio.com'}/industries/real-estate` },
          { '@type': 'ListItem', position: 2, name: 'Architecture', url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://elipsestudio.com'}/industries/architecture` },
          { '@type': 'ListItem', position: 3, name: 'Interior Design', url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://elipsestudio.com'}/industries/interior-design` },
          { '@type': 'ListItem', position: 4, name: 'Manufacturing', url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://elipsestudio.com'}/industries/manufacturing` },
          { '@type': 'ListItem', position: 5, name: 'E-Commerce', url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://elipsestudio.com'}/industries/ecommerce` },
          { '@type': 'ListItem', position: 6, name: 'Automotive', url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://elipsestudio.com'}/industries/automotive` },
          { '@type': 'ListItem', position: 7, name: 'Furniture', url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://elipsestudio.com'}/industries/furniture` },
          { '@type': 'ListItem', position: 8, name: 'Healthcare', url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://elipsestudio.com'}/industries/healthcare` },
          { '@type': 'ListItem', position: 9, name: 'Education & Training', url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://elipsestudio.com'}/industries/education-training` },
          { '@type': 'ListItem', position: 10, name: 'Construction', url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://elipsestudio.com'}/industries/construction` },
          { '@type': 'ListItem', position: 11, name: 'Energy & Utilities', url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://elipsestudio.com'}/industries/energy-utilities` },
          { '@type': 'ListItem', position: 12, name: 'Hospitality', url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://elipsestudio.com'}/industries/hospitality` },
        ],
      },
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://elipsestudio.com'}/` },
        { '@type': 'ListItem', position: 2, name: 'Industries', item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://elipsestudio.com'}/industries` },
      ],
    },
  });
}

export default function Page() {
  return <IndustriesAllPage />;
}
