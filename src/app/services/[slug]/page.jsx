import { notFound } from 'next/navigation';
import { SITE_URL } from '@/utils/api';
import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import { SERVICE_FAQS } from '@/seo/serviceFaqs';
import ArchitecturalVisualizationPage from '@/components/services/ArchitecturalVisualizationPage';
import ProductVisualizationPage from '@/components/services/ProductVisualizationPage';
import ProductConfiguratorsPage from '@/components/services/ProductConfiguratorsPage';
import InteractiveWebExperiencesPage from '@/components/services/InteractiveWebExperiencesPage';
import VrDevelopmentPage from '@/components/services/VrDevelopmentPage';
import ArDevelopmentPage from '@/components/services/ArDevelopmentPage';
import AnimationPage from '@/components/services/AnimationPage';
import VfxVirtualProductionPage from '@/components/services/VfxVirtualProductionPage';
import VirtualShowroomsDigitalTwinsPage from '@/components/services/VirtualShowroomsDigitalTwinsPage';
import CustomSoftwareDevelopmentPage from '@/components/services/CustomSoftwareDevelopmentPage';
import WebsiteDevelopmentPage from '@/components/services/WebsiteDevelopmentPage';
import MobileAppDevelopmentPage from '@/components/services/MobileAppDevelopmentPage';
import CreativeServicesPage from '@/components/services/CreativeServicesPage';
import EnterpriseSolutionsPage from '@/components/services/EnterpriseSolutionsPage';
import MarketingPage from '@/components/services/MarketingPage';

const servicePages = {
  'architectural-visualization': ArchitecturalVisualizationPage,
  '3d-product-visualization': ProductVisualizationPage,
  '3d-product-configurators': ProductConfiguratorsPage,
  'interactive-web-experiences': InteractiveWebExperiencesPage,
  'vr-development': VrDevelopmentPage,
  'ar-development': ArDevelopmentPage,
  '3d-animation': AnimationPage,
  'vfx-virtual-production': VfxVirtualProductionPage,
  'virtual-showrooms-digital-twins': VirtualShowroomsDigitalTwinsPage,
  'custom-software-development': CustomSoftwareDevelopmentPage,
  'website-development': WebsiteDevelopmentPage,
  'mobile-app-development': MobileAppDevelopmentPage,
  'creative-services': CreativeServicesPage,
  'enterprise-solutions': EnterpriseSolutionsPage,
  marketing: MarketingPage,
};

const serviceMeta = {
  'architectural-visualization': {
    title: 'Architectural Visualization Services Worldwide',
    description: 'Photorealistic architectural visualization services from Elipse Studio — 3D renderings, walkthroughs, and immersive experiences for developers and architects worldwide.',
    keywords: 'architectural visualization services, 3d architectural rendering, photoreal visualization, arch viz, architectural rendering company, 3d rendering services',
    ogImage: `${SITE_URL}/assets/logo-og.webp`,
    schemaType: 'Service',
  },
  '3d-product-visualization': {
    title: '3D Product Visualization Services',
    description: 'Photorealistic 3D product visualization and rendering services for e-commerce brands, manufacturers, and product designers. Transform your products into stunning digital assets.',
    keywords: '3d product visualization, 3d product rendering, product visualization services, e-commerce 3d rendering, photorealistic product rendering',
    ogImage: `${SITE_URL}/assets/logo-og.webp`,
    schemaType: 'Service',
  },
  '3d-product-configurators': {
    title: '3D Product Configurator Development',
    description: 'Custom interactive 3D product configurators for e-commerce brands. Real-time customization with photoreal previews integrated with Shopify, WooCommerce, and Magento.',
    keywords: '3d product configurator, web configurator, interactive 3d configurator, custom product configurator, e-commerce configurator',
    ogImage: `${SITE_URL}/assets/logo-og.webp`,
    schemaType: 'Product',
  },
  'interactive-web-experiences': {
    title: 'Interactive Web Experiences Development',
    description: 'Immersive interactive web experiences combining 3D, motion, and WebGL for brands and agencies. Award-quality digital campaigns that engage audiences.',
    keywords: 'interactive web experiences, webgl experiences, 3d web development, interactive campaigns, browser-based 3d',
    ogImage: `${SITE_URL}/assets/logo-og.webp`,
    schemaType: 'Service',
  },
  'vr-development': {
    title: 'VR Development Services',
    description: 'Custom VR development for enterprise training, sales, and marketing. Meta Quest 3, HTC Vive, Varjo XR-4 with Unreal Engine 5. Immersive virtual reality experiences.',
    keywords: 'vr development, virtual reality development, vr app development, meta quest development, unreal engine vr',
    ogImage: `${SITE_URL}/assets/logo-og.webp`,
    schemaType: 'Service',
  },
  'ar-development': {
    title: 'AR Development Services',
    description: 'Custom AR development for retail, real estate, and marketing. ARKit, ARCore, and WebAR with no app download required. Augmented reality solutions.',
    keywords: 'ar development, augmented reality development, ar app development, arkit, arcore, webar',
    ogImage: `${SITE_URL}/assets/logo-og.webp`,
    schemaType: 'Service',
  },
  '3d-animation': {
    title: '3D Animation & Motion Graphics Services',
    description: 'Cinematic 3D animation and motion graphics for brands and enterprises. Architectural walkthroughs, product animation, and explainer videos with stunning quality.',
    keywords: '3d animation, motion graphics, 3d animation services, explainer videos, architectural walkthrough, product animation',
    ogImage: `${SITE_URL}/assets/logo-og.webp`,
    schemaType: 'Service',
  },
  'vfx-virtual-production': {
    title: 'VFX & Virtual Production Services',
    description: 'VFX and virtual production services for film, commercial, and brand content. CG visual effects, compositing, and LED wall production for creative projects.',
    keywords: 'vfx services, virtual production, cg visual effects, vfx studio, led wall production, compositing',
    ogImage: `${SITE_URL}/assets/logo-og.webp`,
    schemaType: 'Service',
  },
  'virtual-showrooms-digital-twins': {
    title: 'Virtual Showrooms & Digital Twins Development',
    description: 'Immersive virtual showrooms and photorealistic digital twins for brands, developers, and enterprises. 3D virtual environments for real estate and retail.',
    keywords: 'virtual showroom, digital twins, 3d virtual showroom, virtual reality showroom, digital twin development',
    ogImage: `${SITE_URL}/assets/logo-og.webp`,
    schemaType: 'Service',
  },
  'custom-software-development': {
    title: 'Custom Software Development Services',
    description: 'Custom software development for enterprises and startups. Web apps, SaaS platforms, ERP/CRM systems, APIs, and cloud-native architecture solutions.',
    keywords: 'custom software development, enterprise software, saas development, web application development, cloud-native',
    ogImage: `${SITE_URL}/assets/logo-og.webp`,
    schemaType: 'Service',
  },
  'website-development': {
    title: 'Website Development Services',
    description: 'Custom website development with Next.js, WordPress, and JAMstack. SEO-optimized, mobile-first responsive design with Core Web Vitals focus.',
    keywords: 'website development, next.js development, jamstack, seo website, responsive web design, wordpress development',
    ogImage: `${SITE_URL}/assets/logo-og.webp`,
    schemaType: 'Service',
  },
  'mobile-app-development': {
    title: 'Mobile App Development Services',
    description: 'Custom mobile app development for iOS and Android. Cross-platform apps with React Native, Flutter, Swift, and Kotlin. Native and hybrid solutions.',
    keywords: 'mobile app development, ios app development, android app development, react native, flutter development',
    ogImage: `${SITE_URL}/assets/logo-og.webp`,
    schemaType: 'Service',
  },
  'creative-services': {
    title: 'Creative Services',
    description: 'Brand identity design, motion graphics, video production, graphic design, UI/UX design, and photography for brands and agencies.',
    keywords: 'creative services, brand identity design, ui/ux design, motion graphics, video production, graphic design',
    ogImage: `${SITE_URL}/assets/logo-og.webp`,
    schemaType: 'Service',
  },
  'enterprise-solutions': {
    title: 'Enterprise Solutions',
    description: 'Scalable enterprise-grade solutions including cloud infrastructure, ERP systems, custom software, data analytics, cybersecurity, and IT consulting.',
    keywords: 'enterprise solutions, enterprise software, cloud computing, erp systems, cybersecurity, it consulting',
    ogImage: `${SITE_URL}/assets/logo-og.webp`,
    schemaType: 'Service',
  },
  marketing: {
    title: 'Digital Marketing Services',
    description: 'Data-driven marketing strategies including SEO/SEM, social media marketing, content strategy, email marketing, and performance analytics.',
    keywords: 'digital marketing, seo services, sem, social media marketing, content marketing, email marketing',
    ogImage: `${SITE_URL}/assets/logo-og.webp`,
    schemaType: 'Service',
  },
};

export function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = serviceMeta[slug];
  if (!meta) return {};

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: meta.title, url: `/services/${slug}` },
  ]);

  const faqs = SERVICE_FAQS[slug];
  const faq = faqs ? buildFaqSchema(faqs) : null;

  return buildMetadata({
    title: meta.title,
    description: meta.description,
    canonical: `${SITE_URL}/services/${slug}`,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
    schema: {
      '@context': 'https://schema.org',
      '@type': meta.schemaType,
      name: meta.title,
      description: meta.description,
      url: `${SITE_URL}/services/${slug}`,
      provider: {
        '@type': 'Organization',
        name: 'Elipse Studio',
        url: SITE_URL,
      },
    },
    breadcrumb,
    faq,
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const ServicePage = servicePages[slug];
  if (!ServicePage) notFound();

  const meta = serviceMeta[slug];
  const breadcrumbSchema = meta
    ? buildBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: meta.title, url: `/services/${slug}` },
      ])
    : null;

  const faqs = SERVICE_FAQS[slug];
  const faqSchema = faqs ? buildFaqSchema(faqs) : null;

  return (
    <>
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ServicePage />
    </>
  );
}
