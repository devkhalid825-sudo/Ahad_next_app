import { notFound } from 'next/navigation';
import { SITE_URL } from '@/utils/api';
import { buildMetadata, buildBreadcrumbSchema, buildFaqSchema, buildVideoObjectSchema } from '@/lib/seo';
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
    title: 'Architectural Visualization',
    description: 'Photorealistic 3D architectural rendering, exterior visualization, and walkthrough animation for developers and architects worldwide.',
    keywords: 'architectural visualization services, 3d architectural rendering, photoreal visualization, arch viz, architectural rendering company, 3d rendering services',
    ogImage: `${SITE_URL}/assets/services/og-architectural-visualization.jpg`,
    schemaType: 'Service',
  },
  '3d-product-visualization': {
    title: '3D Product Visualization',
    description: 'Photorealistic 3D product rendering, CGI visuals, and 360-degree views for e-commerce brands and manufacturers worldwide.',
    keywords: '3d product visualization, 3d product rendering, product visualization services, e-commerce 3d rendering, photorealistic product rendering',
    ogImage: `${SITE_URL}/assets/services/og-3d-product-visualization.jpg`,
    schemaType: 'Service',
  },
  '3d-product-configurators': {
    title: '3D Product Configurators',
    description: 'Custom interactive 3D product configurators for Shopify and enterprise platforms. Real-time customization for global brands.',
    keywords: '3d product configurator, web configurator, interactive 3d configurator, custom product configurator, e-commerce configurator',
    ogImage: `${SITE_URL}/assets/services/og-3d-product-configurators.jpg`,
    schemaType: 'Product',
  },
  'interactive-web-experiences': {
    title: 'Interactive Web Experiences',
    description: 'Immersive WebGL experiences and interactive 3D web applications designed to engage users and elevate global brand campaigns.',
    keywords: 'interactive web experiences, webgl experiences, 3d web development, interactive campaigns, browser-based 3d',
    ogImage: `${SITE_URL}/assets/services/og-interactive-web-experiences.jpg`,
    schemaType: 'Service',
  },
  'vr-development': {
    title: 'VR Development Services',
    description: 'Custom VR development for enterprise training, simulation, and sales on Meta Quest 3, Apple Vision Pro, and Unreal Engine 5.',
    keywords: 'vr development, virtual reality development, vr app development, meta quest development, unreal engine vr',
    ogImage: `${SITE_URL}/assets/services/og-vr-development.jpg`,
    schemaType: 'Service',
    video: {
      name: 'VR Development Services — Elipse Studio',
      description: 'See how Elipse Studio builds enterprise VR training and sales applications.',
      thumbnailUrl: 'https://img.youtube.com/vi/aXGkn51OToA/maxresdefault.jpg',
      uploadDate: '2024-01-01',
      embedUrl: 'https://www.youtube.com/embed/aXGkn51OToA',
    },
  },
  'ar-development': {
    title: 'AR Development Services',
    description: 'Enterprise augmented reality development using ARKit, ARCore, and WebAR for retail, real estate, and marketing campaigns.',
    keywords: 'ar development, augmented reality development, ar app development, arkit, arcore, webar',
    ogImage: `${SITE_URL}/assets/services/og-ar-development.jpg`,
    schemaType: 'Service',
  },
  '3d-animation': {
    title: '3D Animation Services',
    description: 'Cinematic 3D animation and motion graphics for global brands. Product demos, explainer videos, and architectural walkthroughs.',
    keywords: '3d animation, motion graphics, 3d animation services, explainer videos, architectural walkthrough, product animation',
    ogImage: `${SITE_URL}/assets/services/og-3d-animation.jpg`,
    schemaType: 'Service',
  },
  'vfx-virtual-production': {
    title: 'VFX & Virtual Production',
    description: 'High-end visual effects and virtual production services for films, broadcast, and brand commercials with LED wall workflows.',
    keywords: 'vfx services, virtual production, cg visual effects, vfx studio, led wall production, compositing',
    ogImage: `${SITE_URL}/assets/services/og-vfx-virtual-production.jpg`,
    schemaType: 'Service',
  },
  'virtual-showrooms-digital-twins': {
    title: 'Virtual Showrooms & Digital Twins',
    description: 'Immersive 3D virtual showrooms and digital twin experiences built with Unreal Engine 5 and WebGL for global enterprises.',
    keywords: 'virtual showroom, digital twins, 3d virtual showroom, virtual reality showroom, digital twin development',
    ogImage: `${SITE_URL}/assets/services/og-virtual-showrooms-digital-twins.jpg`,
    schemaType: 'Service',
  },
  'custom-software-development': {
    title: 'Custom Software Development',
    description: 'Scalable enterprise software development, cloud-native web apps, SaaS platforms, and API integrations for modern businesses.',
    keywords: 'custom software development, enterprise software, saas development, web application development, cloud-native',
    ogImage: `${SITE_URL}/assets/services/og-custom-software-development.jpg`,
    schemaType: 'Service',
  },
  'website-development': {
    title: 'Website Development Services',
    description: 'High-performance Next.js website development with mobile-first design, fast load times, and Core Web Vitals optimization.',
    keywords: 'website development, next.js development, jamstack, seo website, responsive web design, wordpress development',
    ogImage: `${SITE_URL}/assets/services/og-website-development.jpg`,
    schemaType: 'Service',
  },
  'mobile-app-development': {
    title: 'Mobile App Development',
    description: 'Native and cross-platform mobile app development for iOS and Android built with React Native, Flutter, and modern stacks.',
    keywords: 'mobile app development, ios app development, android app development, react native, flutter development',
    ogImage: `${SITE_URL}/assets/services/og-mobile-app-development.jpg`,
    schemaType: 'Service',
  },
  'creative-services': {
    title: 'Creative Services & Design',
    description: 'Full-service creative design agency specializing in brand identity, UI/UX design, motion graphics, and visual content.',
    keywords: 'creative services, brand identity design, ui/ux design, motion graphics, video production, graphic design',
    ogImage: `${SITE_URL}/assets/services/og-creative-services.jpg`,
    schemaType: 'Service',
  },
  'enterprise-solutions': {
    title: 'Enterprise Digital Solutions',
    description: 'Enterprise digital transformation, cloud architecture, and immersive 3D technology solutions for organizations worldwide.',
    keywords: 'enterprise solutions, enterprise software, cloud computing, erp systems, cybersecurity, it consulting',
    ogImage: `${SITE_URL}/assets/services/og-enterprise-solutions.jpg`,
    schemaType: 'Service',
  },
  marketing: {
    title: 'Immersive Marketing Solutions',
    description: 'Data-driven marketing solutions, interactive 3D campaigns, and digital strategies that drive brand engagement and growth.',
    keywords: 'digital marketing, seo services, sem, social media marketing, content marketing, email marketing',
    ogImage: `${SITE_URL}/assets/services/og-marketing.jpg`,
    schemaType: 'Service',
  },
};

export function generateStaticParams() {
  return Object.keys(servicePages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const meta = serviceMeta[slug];
  if (!meta) {
    notFound();
  }

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/services' },
    { name: meta.title, url: `/services/${slug}` },
  ]);

  const faqs = SERVICE_FAQS[slug];
  const faq = faqs ? buildFaqSchema(faqs) : null;
  const videoSchema = meta.video ? buildVideoObjectSchema(meta.video) : null;

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
    ...(videoSchema ? { video: videoSchema } : {}),
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const ServicePage = servicePages[slug];
  if (!ServicePage) notFound();
  return <ServicePage />;
}
