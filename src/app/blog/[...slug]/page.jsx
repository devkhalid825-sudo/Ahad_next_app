import { notFound } from 'next/navigation';
import { apiCall, SITE_URL } from '@/utils/api';
import { buildMetadata, buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import BlogArticle from '@/components/BlogArticle';
import { MultiJsonLd } from '@/components/seo/JsonLd';

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
import Leap2026Article from '@/components/articles/Leap2026Article';

const staticArticles = {
  'leap-2026-wrap-up': Leap2026Article,
  'leap-2026-wrap-up-bilal-lania': Leap2026Article,
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
  'leap-2026-wrap-up': {
    title: 'LEAP 2026 Wrap Up: Social Posts and In-Depth Insights | Bilal Lania',
    description: 'Ground reality lessons from LEAP Riyadh for creative tech founders. 3D interactive configurators, enterprise VR, digital twins, and anamorphic 3D in Saudi Arabia.',
    keywords: ['LEAP 2026', 'LEAP Riyadh', '3D interactive configurators', 'enterprise VR AR', 'digital twins Saudi Arabia', 'anamorphic 3D', 'creative tech Saudi Arabia', 'Bilal Lania'],
    ogImage: `${SITE_URL}/assets/leap-2026/leap-hero.jpg`,
  },
  'leap-2026-wrap-up-bilal-lania': {
    title: 'LEAP 2026 Wrap Up: Social Posts and In-Depth Insights | Bilal Lania',
    description: 'Ground reality lessons from LEAP Riyadh for creative tech founders. 3D interactive configurators, enterprise VR, digital twins, and anamorphic 3D in Saudi Arabia.',
    keywords: ['LEAP 2026', 'LEAP Riyadh', '3D interactive configurators', 'enterprise VR AR', 'digital twins Saudi Arabia', 'anamorphic 3D', 'creative tech Saudi Arabia', 'Bilal Lania'],
    ogImage: `${SITE_URL}/assets/leap-2026/leap-hero.jpg`,
  },
  'web-based-configurator': {
    title: 'Web-Based 3D Configurators',
    description: 'Learn how interactive 3D product configurators drive online sales conversions, reduce return rates, and engage buyers in real time.',
  },
  'immersive-ar-marketing': {
    title: 'Immersive AR Marketing Guide',
    description: 'Discover how WebAR, virtual try-ons, and immersive experiences are transforming brand marketing and consumer engagement in 2026.',
  },
  'industrial-animation': {
    title: 'Industrial 3D Animation',
    description: 'Professional 3D industrial animation visualizes complex machinery, engineering workflows, and technical concepts for global brands.',
  },
  'automotive-configurator': {
    title: 'Automotive 3D Configurators',
    description: 'Modern automotive 3D configurators provide real-time interactive vehicle customization, virtual showrooms, and sales acceleration.',
  },
  'vr-reshaping-world': {
    title: 'How VR Is Transforming Work',
    description: 'Discover how virtual reality is transforming training, design, healthcare, and enterprise collaboration across global industries.',
  },
  'immersive-experience-design': {
    title: 'Immersive Experience Design',
    description: 'Explore how immersive experience design leverages VR, AR, and interactive 3D to create deeper brand engagement and connection.',
  },
  'immersive-tech-2026': {
    title: 'AR vs VR vs MR Comparison',
    description: 'Compare AR, VR, and MR technology capabilities to understand which immersive platform best serves your brand objectives in 2026.',
  },
  'animated-videos-engagement': {
    title: 'Animated Videos for Brands',
    description: 'Learn why 3D animated videos and motion graphics drive brand awareness, improve audience retention, and boost social engagement.',
  },
  'furniture-configurator-2026': {
    title: 'Furniture 3D Configurators',
    description: 'Discover how real-time 3D furniture configurators help e-commerce brands showcase custom variations and boost checkout rates.',
  },
  'educational-animation-2026': {
    title: 'Educational 3D Animation',
    description: 'Explore how educational 3D animation helps e-learning platforms and institutions improve comprehension and student engagement.',
  },
  'vr-custom-development-2026': {
    title: 'Custom VR Development Guide',
    description: 'A complete guide to bespoke virtual reality development, from enterprise simulation concept design to deployment on Meta Quest 3.',
  },
  '3d-real-time-configurators-real-estate-dubai': {
    title: 'Dubai Real Estate Configurators',
    description: 'How Dubai property developers use real-time Unreal Engine 3D configurators to sell unbuilt off-plan luxury homes before construction.',
  },
  'architectural-visualization-guide': {
    title: 'Arch Viz Complete Guide',
    description: 'Comprehensive guide to photorealistic architectural visualization, 3D exterior renders, interior CGI, and marketing animations.',
  },
  'apparel-configurator-fashion-brands-2026': {
    title: 'Fashion Apparel Configurators',
    description: 'Discover how fashion brands use interactive 3D apparel configurators and digital customization tools to increase average order value.',
  },
};

export const revalidate = 0; // No cache — always fetch fresh data from backend

export async function generateStaticParams() {
  return Object.keys(staticArticles).map((slug) => ({ slug: [slug] }));
}

const slugFromParams = (slug) => (Array.isArray(slug) ? slug.join('/') : slug);

function staticArticleSchemas(slugStr, meta) {
  const schema = buildArticleSchema({
    title: meta.title,
    description: meta.description,
    image: `${SITE_URL}/assets/leap-2026/leap-hero.jpg`,
    publishedAt: '2026-02-12',
    updatedAt: '2026-02-12',
    slug: slugStr,
  });

  const leapFaq = buildFaqSchema([
    {
      q: 'What are the biggest LEAP 2026 takeaways for creative tech founders?',
      a: 'The five ground lessons from LEAP Riyadh: interactive 3D configurators replacing passive renders, enterprise VR/AR validation from Aramco and STC, regional e-learning partnerships as the fastest door in, digital twins becoming national-scale infrastructure, and anamorphic 3D content owning public attention.',
    },
    {
      q: 'Why are interactive configurators the future of architectural visualization?',
      a: 'Across the LEAP floor the most compelling showcases were fully interactive real-time configurators, letting buyers change finishes, layouts and lighting live — turning passive visual assets into commercial sales engines.',
    },
    {
      q: 'How should studios enter the Saudi creative tech market?',
      a: 'Through regional partnership: regional e-learning and training platforms already carry institutional trust, Arabic content pipelines and government relationships, so plugging 3D and interactive content into existing platforms is faster than launching standalone.',
    },
    {
      q: 'What is the digital twins opportunity in Saudi Arabia?',
      a: 'Digital twins are transitioning from buzzword to essential infrastructure. Authorities like Haramain are actively exploring partners, and government bodies, master developers and smart-city operators need studios that build accurate data-connected 3D replicas.',
    },
  ]);

  const leapAuthor = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Bilal Lania',
    jobTitle: 'Founder & Creative Director',
    worksFor: { '@type': 'Organization', name: 'Elipse Studio', url: SITE_URL },
    url: SITE_URL,
    description: 'Founder and Creative Director of Elipse Studio. Ground report from LEAP 2026 in Riyadh on 3D interactive configurators, enterprise VR/AR, digital twins and anamorphic content in Saudi Arabia.',
  };

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: meta.title, url: `/blog/${slugStr}` },
  ]);
  return [schema, breadcrumb, leapFaq, leapAuthor].filter(Boolean);
}

function blogImageUrl(image) {
  if (!image) return `${SITE_URL}/assets/logo-og.webp`;
  let resolved = image;
  // Normalize old Hostinger backend URL
  if (resolved.includes('mediumseagreen-crocodile-699024.hostingersite.com')) {
    resolved = resolved.replace('https://mediumseagreen-crocodile-699024.hostingersite.com', SITE_URL);
  }
  // Normalize new api.elipsestudio.com backend URL
  if (resolved.includes('api.elipsestudio.com')) {
    resolved = resolved.replace('https://api.elipsestudio.com', SITE_URL);
  }
  if (resolved.startsWith('/')) {
    resolved = `${SITE_URL}${resolved}`;
  }
  return resolved;
}

function blogTitleFromData(data) {
  const rawBlogTitle = data.metaTitle || data.title;
  return rawBlogTitle ? rawBlogTitle.replace(/(\s*([|—–]|-)\s*(Elipse\s*Studio|Elipse))+$/i, '').trim() : rawBlogTitle;
}

function apiArticleSchemas(slugStr, data) {
  const description = data.metaDescription || (data.excerpt || '').slice(0, 160);
  const image = blogImageUrl(data.image);
  const blogTitle = blogTitleFromData(data);
  const schema = buildArticleSchema({
    title: blogTitle,
    description,
    image,
    publishedAt: data.createdAt || data.date,
    updatedAt: data.updatedAt,
    slug: slugStr,
  });
  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: blogTitle, url: `/blog/${slugStr}` },
  ]);
  return { blogTitle, description, image, schemas: [schema, breadcrumb] };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const slugStr = slugFromParams(slug);

  if (staticArticleMetadata[slugStr]) {
    const meta = staticArticleMetadata[slugStr];
    return buildMetadata({
      title: meta.title,
      description: meta.description,
      canonical: `${SITE_URL}/blog/${slugStr}`,
      ogImage: meta.ogImage,
      keywords: meta.keywords,
      type: 'article',
    });
  }

  const { data } = await apiCall(`/blogs/${slugStr}`, 'GET', null, null, false, { next: { revalidate: 0 } });
  if (!data || !data.title) {
    return buildMetadata({
      title: 'Blog Post Not Found',
      description: 'The requested blog post could not be found.',
      canonical: `${SITE_URL}/blog/${slugStr}`,
      noIndex: true,
    });
  }
  const { blogTitle, description, image } = apiArticleSchemas(slugStr, data);

  return buildMetadata({
    title: blogTitle,
    description,
    canonical: `${SITE_URL}/blog/${slugStr}`,
    ogImage: image,
    type: 'article',
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const slugStr = slugFromParams(slug);

  const StaticArticle = staticArticles[slugStr];
  if (StaticArticle) {
    const meta = staticArticleMetadata[slugStr];
    return (
      <>
        {meta && <MultiJsonLd schemas={staticArticleSchemas(slugStr, meta)} />}
        <StaticArticle />
      </>
    );
  }

  const { data, status } = await apiCall(`/blogs/${slugStr}`, 'GET', null, null, false, { next: { revalidate: 0 } });
  if (status !== 200 || !data || !data.title) notFound();
  const { schemas } = apiArticleSchemas(slugStr, data);
  return (
    <>
      <MultiJsonLd schemas={schemas} />
      <BlogArticle slug={slugStr} initialData={data} />
    </>
  );
}
