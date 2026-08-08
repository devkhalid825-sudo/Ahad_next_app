import { notFound } from 'next/navigation';
import { apiCall, SITE_URL } from '@/utils/api';
import { buildMetadata, buildArticleSchema, buildBreadcrumbSchema } from '@/lib/seo';
import BlogArticle from '@/components/BlogArticle';

import ConfiguratorArticle from '@/components/articles/ConfiguratorArticle';
import ARMarketingArticle from '@/components/articles/ARMarketingArticle';
import IndustrialAnimationArticle from '@/components/articles/IndustrialAnimationArticle';
import AutomotiveConfiguratorArticle from '@/components/articles/AutomotiveConfiguratorArticle';
import VRReshapingWorldArticle from '@/components/articles/VRReshapingWorldArticle';
import ImmersiveExperienceArticle from '@/components/articles/ImmersiveExperienceArticle';
import ImmersiveTech2026Article from '@/components/articles/ImmersiveTech2026Article';
import AnimatedVideosEngagementArticle from '@/components/articles/AnimatedVideosEngagementArticle';
import FurnitureConfiguratorArticle from '@/components/articles/FurnitureConfiguratorArticle';
import EducationalAnimationArticle from '@/components/articles/EducationalAnimationArticle';
import VRServicesArticle from '@/components/articles/VRServicesArticle';
import RealEstateConfiguratorArticle from '@/components/articles/RealEstateConfiguratorArticle';
import ArchitecturalVisualization from '@/components/articles/ArchitecturalVisualization';
import ApparelConfiguratorArticle from '@/components/articles/ApparelConfiguratorArticle';

const staticArticles = {
  'web-based-configurator': ConfiguratorArticle,
  'immersive-ar-marketing': ARMarketingArticle,
  'industrial-animation': IndustrialAnimationArticle,
  'automotive-configurator': AutomotiveConfiguratorArticle,
  'vr-reshaping-world': VRReshapingWorldArticle,
  'immersive-experience-design': ImmersiveExperienceArticle,
  'immersive-tech-2026': ImmersiveTech2026Article,
  'animated-videos-engagement': AnimatedVideosEngagementArticle,
  'furniture-configurator-2026': FurnitureConfiguratorArticle,
  'educational-animation-2026': EducationalAnimationArticle,
  'vr-custom-development-2026': VRServicesArticle,
  '3d-real-time-configurators-real-estate-dubai': RealEstateConfiguratorArticle,
  'architectural-visualization-guide': ArchitecturalVisualization,
  'apparel-configurator-fashion-brands-2026': ApparelConfiguratorArticle,
};

const staticArticleMetadata = {
  'web-based-configurator': {
    title: 'Web-Based Configurator',
    description: 'Web-based configurators let users customize products to exact specifications. Explore how interactive 3D tools drive conversions, reduce returns, and improve customer satisfaction.',
  },
  'immersive-ar-marketing': {
    title: 'What Is Immersive AR Marketing?',
    description: 'AR marketing blends digital content with the real world. Learn how WebAR, 5G, and immersive experiences are transforming brand engagement in 2026.',
  },
  'industrial-animation': {
    title: 'Professional Industrial Animation for Your Brand',
    description: 'Industrial animation visualizes complex machinery and engineering concepts. Explore how 3D mechanical animation drives engagement and simplifies technical communication.',
  },
  'automotive-configurator': {
    title: 'Redefining the Car Buying Experience',
    description: 'Modern automotive configurators are immersive interactive showrooms. Learn how real-time 3D rendering and VR/AR visualization transform the car buying experience.',
  },
  'vr-reshaping-world': {
    title: 'How Virtual Reality Is Reshaping the Way We Work',
    description: 'Virtual reality is transforming how we train, design, and experience the world. Discover how VR applications in healthcare, architecture, and entertainment are reshaping industries.',
  },
  'immersive-experience-design': {
    title: 'Immersive Experience Design: Brands in 2026',
    description: 'Immersive experience design is a human attention strategy powered by extraordinary technology. Explore how VR, AR, and interactive 3D create emotional connections that flat screens cannot match.',
  },
  'immersive-tech-2026': {
    title: 'AR vs. VR vs. MR: Transforming Your Brand',
    description: 'AR, VR, and MR are powerful tools for modern branding. Compare these immersive technologies and learn how each serves distinct brand objectives in 2026.',
  },
  'animated-videos-engagement': {
    title: 'Why Animated Videos Drive Brand Engagement',
    description: 'Animated videos combine movement, sound, and storytelling to capture attention. Learn why brands use animation to boost engagement, retention, and social sharing.',
  },
  'furniture-configurator-2026': {
    title: 'Configurator Solutions for Custom Furniture Brands',
    description: '3D configurator solutions transform the furniture buying journey. Learn how Al Noor Furniture uses real-time customization to drive conversions and reduce returns.',
  },
  'educational-animation-2026': {
    title: 'Educational Animation Services for Platforms',
    description: 'Educational animation transforms learning through engaging animated content. Discover how e-learning platforms use animation to improve retention and learner engagement.',
  },
  'vr-custom-development-2026': {
    title: 'Trusted VR Services Company for Custom Development',
    description: 'Custom VR development delivers bespoke virtual reality experiences from concept to deployment. Discover how Elipse Studio builds immersive worlds that move the metrics that matter.',
  },
  '3d-real-time-configurators-real-estate-dubai': {
    title: '3D Real-Time Configurators for Dubai Off-Plan Sales',
    description: 'Dubai developers use Unreal Engine configurators to sell off-plan property. Discover how real-time 3D configurators help buyers visualize unbuilt homes and win deposits before construction begins.',
  },
  'architectural-visualization-guide': {
    title: 'Architectural Visualization Guide',
    description: 'Architectural visualization turns unbuilt geometry into photorealistic imagery. Learn how property developers use 3D renders and animation to sell off-plan properties.',
  },
  'apparel-configurator-fashion-brands-2026': {
    title: 'Apparel Configurator Guide',
    description: 'An apparel configurator lets customers customize clothing in real-time 3D. Discover how fashion brands use co-design tools to boost engagement and average order value.',
  },
};

export const revalidate = 300;

export async function generateStaticParams() {
  return Object.keys(staticArticles).map((slug) => ({ slug: [slug] }));
}

const slugFromParams = (slug) => (Array.isArray(slug) ? slug.join('/') : slug);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const slugStr = slugFromParams(slug);
  
  if (staticArticleMetadata[slugStr]) {
    const meta = staticArticleMetadata[slugStr];
    return buildMetadata({
      title: meta.title,
      description: meta.description,
      canonical: `${SITE_URL}/blog/${slugStr}`,
      type: 'article',
      schema: {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: meta.title,
        description: meta.description,
        publisher: { '@type': 'Organization', name: 'Elipse Studio', url: SITE_URL },
        datePublished: new Date().toISOString().split('T')[0],
      },
      breadcrumb: buildBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: meta.title, url: `/blog/${slugStr}` },
      ]),
    });
  }

  const { data } = await apiCall(`/blogs/${slugStr}`, 'GET', null, null, false, { next: { revalidate: 300 } });
  if (!data || !data.title) return {};
  const description = data.metaDescription || (data.excerpt || '').slice(0, 160);

  let image = data.image;
  if (image) {
    if (image.includes('mediumseagreen-crocodile-699024.hostingersite.com')) {
      image = image.replace('https://mediumseagreen-crocodile-699024.hostingersite.com', SITE_URL);
    }
    if (image.startsWith('/')) {
      image = `${SITE_URL}${image}`;
    }
  } else {
    image = `${SITE_URL}/assets/logo-og.webp`;
  }

  const blogTitle = data.metaTitle || data.title;

  return buildMetadata({
    title: blogTitle,
    description,
    canonical: `${SITE_URL}/blog/${slugStr}`,
    ogImage: image,
    type: 'article',
    schema: buildArticleSchema({
      title: blogTitle,
      description,
      image,
      publishedAt: data.createdAt || data.date,
      updatedAt: data.updatedAt,
      slug: slugStr,
    }),
    breadcrumb: buildBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: blogTitle, url: `/blog/${slugStr}` },
    ]),
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const slugStr = slugFromParams(slug);

  const StaticArticle = staticArticles[slugStr];
  if (StaticArticle) return <StaticArticle />;

  const { data, status } = await apiCall(`/blogs/${slugStr}`, 'GET', null, null, false, { next: { revalidate: 300 } });
  if (status !== 200 || !data || !data.title) notFound();
  return <BlogArticle slug={slugStr} initialData={data} />;
}
