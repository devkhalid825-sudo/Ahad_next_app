import { notFound } from 'next/navigation';
import { apiCall, SITE_URL } from '@/utils/api';
import { buildMetadata, buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema } from '@/lib/seo';
import BlogArticle from '@/components/BlogArticle';
import { MultiJsonLd } from '@/components/seo/JsonLd';

import dynamic from 'next/dynamic';

const staticArticles = {
  'virtual-showrooms-vs-physical-retail-2026-roi-guide': dynamic(() => import('@/components/articles/VirtualShowroomsRoiArticle')),
  'leap-2026': dynamic(() => import('@/components/articles/Leap2026Article')),
  'leap-2026-wrap-up': dynamic(() => import('@/components/articles/Leap2026Article')),
  'leap-2026-wrap-up-bilal-lania': dynamic(() => import('@/components/articles/Leap2026Article')),
  'webgl-vs-unreal-engine-3d-configurator': dynamic(() => import('@/components/articles/WebGLVsUnrealEngineArticle')),
  'web-based-configurator': dynamic(() => import('@/components/articles/ConfiguratorArticle')),
  'immersive-ar-marketing': dynamic(() => import('@/components/articles/ARMarketingArticle')),
  'industrial-animation': dynamic(() => import('@/components/articles/IndustrialAnimationArticle')),
  'automotive-configurator': dynamic(() => import('@/components/articles/AutomotiveConfiguratorArticle')),
  'vr-reshaping-world': dynamic(() => import('@/components/articles/VRReshapingWorldArticle')),
  'immersive-experience-design': dynamic(() => import('@/components/articles/ImmersiveExperienceArticle')),
  'immersive-tech-2026': dynamic(() => import('@/components/articles/ImmersiveTech2026Article')),
  'animated-videos-engagement': dynamic(() => import('@/components/articles/AnimatedVideosEngagementArticle')),
  'furniture-configurator-2026': dynamic(() => import('@/components/articles/FurnitureConfiguratorArticle')),
  'educational-animation-2026': dynamic(() => import('@/components/articles/EducationalAnimationArticle')),
  'vr-custom-development-2026': dynamic(() => import('@/components/articles/VRServicesArticle')),
  '3d-real-time-configurators-real-estate-dubai': dynamic(() => import('@/components/articles/RealEstateConfiguratorArticle')),
  'architectural-visualization-guide': dynamic(() => import('@/components/articles/ArchitecturalVisualization')),
  'apparel-configurator-fashion-brands-2026': dynamic(() => import('@/components/articles/ApparelConfiguratorArticle')),
  'why-product-photography-budget-3d-rendering-2026': dynamic(() => import('@/components/articles/WhyProductPhotographyBudgetArticle')),
  '3d-animation-services-uk-2026': dynamic(() => import('@/components/articles/UkAnimationServicesArticle')),
  'interactive-web-experiences-au-2026': dynamic(() => import('@/components/articles/AuInteractiveWebArticle')),
  'vfx-services-us-2026': dynamic(() => import('@/components/articles/UsVfxServicesArticle')),
  'interactive-3d-vs-cgi-production-pipeline-2026': dynamic(() => import('@/components/articles/Interactive3dVsCgiArticle')),
  '3d-architectural-visualisation-uk-property-developers-guide': dynamic(() => import('@/components/articles/UkArchVizArticle')),
  'ar-product-visualization-ecommerce-brands-2026-guide': dynamic(() => import('@/components/articles/ArProductVisualizationArticle')),
};

const staticArticleMetadata = {
  '3d-architectural-visualisation-uk-property-developers-guide': {
    title: '3D Architectural Visualisation for UK Property Developers: The 2026 Guide | Elipse Studio',
    description: 'UK property developers are using 3D architectural visualisation to sell off-plan units faster, win planning in conservation areas, and reduce buyer dropout. Costs, use cases, and how to brief a studio.',
    keywords: [
      'architectural visualisation UK',
      '3d rendering UK property developers',
      'off-plan renders UK',
      'architectural visualisation London',
      'planning permission renders UK',
      'property CGI UK',
      'architectural visualisation services',
      'Elipse Studio',
      'Bilal Lania',
    ],
    ogImage: `${SITE_URL}/assets/ElipseImages/projects/elipse-artitecture.webp`,
  },
  'ar-product-visualization-ecommerce-brands-2026-guide': {
    title: 'AR Product Visualization for Ecommerce Brands: The 2026 Guide | Elipse Studio',
    description: 'Your customers cannot touch your product online. AR product visualization solves that — letting buyers place, rotate, and inspect your product in their real space before buying. Here is how it works and what it costs.',
    keywords: [
      'ar product visualization',
      'augmented reality product visualization',
      'ar for ecommerce',
      'webAR product experience',
      '3d ar product viewer',
      'WebXR product viewer',
      'ecommerce 3D AR',
      'Elipse Studio',
      'Bilal Lania',
    ],
    ogImage: `${SITE_URL}/assets/ElipseImages/blogs/blogs-Ar.webp`,
  },
  'interactive-3d-vs-cgi-production-pipeline-2026': {
    title: 'Cinematic CGI and Interactive 3D: Why High-Growth Brands Need a Unified Pipeline in 2026 | Elipse Studio',
    description: 'Why leading brands no longer choose between CGI and interactive 3D. How building a unified 3D pipeline delivers 4K commercial visuals and web-native configurators from a single master asset.',
    keywords: [
      '3d product rendering services',
      'custom 3d product configurator development',
      'commercial cgi studio',
      'web-based 3d configurator agency',
      'photorealistic 3d product visualization',
      'cad to cgi conversion',
      'unreal engine 5 product visualization',
      'webgl 3d development services',
      'shopify 3d product customizer',
      'interactive 3d vs cgi',
      'real-time 3d product rendering',
      '3d packaging rendering for fmcg',
      'Elipse Studio',
      'Bilal Lania',
    ],
    ogImage: `${SITE_URL}/assets/About-page/marine.webp`,
  },
  'why-product-photography-budget-3d-rendering-2026': {
    title: 'Why Your Product Photography Budget Is Going to the Wrong Place in 2026 | Elipse Studio',
    description: 'Most brands spend $2,000–$8,000 per product shoot on photos that can\'t be reused. Here\'s why 3D product rendering is a smarter long-term investment — and when photography still wins.',
    keywords: ['product rendering services', '3d product rendering', 'product visualization', 'replace product photography 3d', 'Elipse Studio', 'Bilal Lania'],
    ogImage: `${SITE_URL}/assets/ElipseImages/projects/3D-rendering.webp`,
  },
  'virtual-showrooms-vs-physical-retail-2026-roi-guide': {
    title: 'Virtual Showrooms vs Physical Retail: 2026 Financial Case & ROI | Elipse Studio',
    description: 'Why enterprise brands treat virtual showrooms as 365-day conversion hubs alongside trade shows. Hard financial benchmarks, WebGL architecture, and ROI breakdown.',
    keywords: ['virtual showroom ROI', '3D commerce 2026', 'trade show vs virtual showroom', 'WebGL 3D configurator', 'Unreal Engine 5 showroom', 'enterprise 3D strategy', 'Elipse Studio', 'Bilal Lania'],
    ogImage: `${SITE_URL}/assets/ElipseImages/projects/elipse-artitecture.webp`,
  },
  '3d-animation-services-uk-2026': {
    title: '3D Animation Services UK (2026): Commercial, Product & Architectural CGI | Elipse Studio',
    description: 'High-fidelity 3D animation for UK brands. CAD-accurate product animations, commercial brand films, and architectural walkthroughs. Transparent GBP pricing.',
    keywords: ['3D animation services UK', 'commercial 3D animation', 'product animation London', 'architectural CGI UK', 'CAD animation UK', 'Clearcast animation', 'Elipse Studio'],
    ogImage: `${SITE_URL}/assets/Ahmed-food/jam&spread/15.webp`,
  },
  'interactive-web-experiences-au-2026': {
    title: 'Interactive Web Experiences Australia (2026): WebGL & 3D Brand Sites | Elipse Studio',
    description: 'Discover how Australian brands use WebGL 3D product experiences to increase session duration and online sales. Fast mobile loading. AUD pricing.',
    keywords: ['interactive web experiences Australia', 'WebGL Australia', '3D product configurator Australia', 'Three.js development Sydney', 'e-commerce 3D Australia', 'Elipse Studio'],
    ogImage: `${SITE_URL}/assets/ElipseImages/projects/Streeing-1.webp`,
  },
  'vfx-services-us-2026': {
    title: 'Anamorphic 3D Animation Services & LED Billboard Content USA (2026) | Elipse Studio',
    description: 'Forced-perspective anamorphic 3D animation and LED billboard content for US brands. Product breakouts, full-scene environments & real-time OOH loops. Transparent USD pricing.',
    keywords: ['anamorphic animation USA', 'anamorphic 3D content', 'LED billboard animation', 'forced perspective animation', 'DOOH content USA', 'OOH advertising 3D', 'Elipse Studio'],
    ogImage: `${SITE_URL}/assets/About-page/QORDEN.webp`,
  },
  'leap-2026': {
    title: 'LEAP 2026 Wrap Up: Social Posts and In-Depth Insights | Bilal Lania',
    description: 'Ground reality lessons from LEAP Riyadh for creative tech founders. 3D interactive configurators, enterprise VR, digital twins, and anamorphic 3D in Saudi Arabia.',
    keywords: ['LEAP 2026', 'LEAP Riyadh', '3D interactive configurators', 'enterprise VR AR', 'digital twins Saudi Arabia', 'anamorphic 3D', 'creative tech Saudi Arabia', 'Bilal Lania'],
    ogImage: `${SITE_URL}/assets/leap-2026/leap-hero.jpg`,
  },
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
  'webgl-vs-unreal-engine-3d-configurator': {
    title: 'WebGL vs Unreal Engine 3D Configurator: Full Comparison',
    description: 'Compare WebGL and Unreal Engine 3D configurators. Discover graphics quality, pixel streaming costs, e-commerce integration, and the best choice for your business.',
    keywords: [
      'WebGL 3D configurator',
      'Unreal Engine 3D configurator',
      'pixel streaming cost',
      'WebGL vs Unreal Engine',
      'interactive 3D product configurator',
      'Arcware pixel streaming',
      'StreamPixel',
      'e-commerce 3D configurator',
      'car configurator 3D',
      'Elipse Studio'
    ],
    ogImage: `${SITE_URL}/assets/ElipseImages/hero/volve-configrator.webp`,
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
    title: 'Industrial 3D Animation & Machinery Visualization | Elipse Studio',
    description: 'Elipse Studio creates industrial 3D animations from CAD files — heavy machinery visualization, process simulations, and trade show reels for manufacturers in the US, UK, and GCC.',
    keywords: ['industrial animation', 'industrial 3D animation', 'machinery animation', 'engineering animation', 'manufacturing animation UK', 'CAD animation', 'mechanical animation', 'exploded view animation', 'B2B animation'],
    ogImage: `${SITE_URL}/assets/industrial-animation/industrial-hero.webp`,
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

const BLOG_SLUG_ALIASES = {
  'unreal-engine-configurator': 'unreal-engine-configurator-real-time-3d-product-experiences-that-sell',
  'vfx-for-brand-campaigns': 'vfx-for-brand-campaigns-how-brands-use-visual-effects-to-break-through-in-2026',
};

export const revalidate = 0; // No cache — always fetch fresh data from backend

export async function generateStaticParams() {
  const staticList = Object.keys(staticArticles);
  const aliasList = Object.keys(BLOG_SLUG_ALIASES);
  return [...new Set([...staticList, ...aliasList])].map((slug) => ({ slug: [slug] }));
}

const slugFromParams = (slug) => (Array.isArray(slug) ? slug.join('/') : slug);

function staticArticleSchemas(slugStr, meta) {
  const isLeap = slugStr.startsWith('leap-2026');
  const isWebGLVsUnreal = slugStr === 'webgl-vs-unreal-engine-3d-configurator';
  const isInteractive3d = slugStr === 'interactive-3d-vs-cgi-production-pipeline-2026';
  const isUkArchViz = slugStr === '3d-architectural-visualisation-uk-property-developers-guide';
  const isArProduct = slugStr === 'ar-product-visualization-ecommerce-brands-2026-guide';
  const schema = buildArticleSchema({
    title: meta.title,
    description: meta.description,
    image: meta.ogImage || `${SITE_URL}/assets/leap-2026/leap-hero.jpg`,
    publishedAt: (isInteractive3d || isUkArchViz || isArProduct) ? '2026-10-06' : (isWebGLVsUnreal ? '2026-03-01' : '2026-02-12'),
    updatedAt: (isInteractive3d || isUkArchViz || isArProduct) ? '2026-10-06' : (isWebGLVsUnreal ? '2026-03-01' : '2026-02-12'),
    slug: slugStr,
  });

  const ukArchVizFaq = buildFaqSchema([
    {
      q: 'Why do UK property developers need 3D architectural visualisation in 2026?',
      a: '3D architectural visualisation helps developers sell off-plan units faster, reduces buyer anxiety and legal disputes between reservation and exchange, and provides local planning authorities (LPAs) with verified contextual photomontages required for planning approval in sensitive conservation areas.',
    },
    {
      q: 'What is the difference between a generic artist impression and a verified planning photomontage?',
      a: 'A verified planning photomontage integrates the proposed 3D building into a high-resolution photograph of the actual site from a surveyed camera position with accurate focal length, true scale, massing, materials, and seasonal lighting, satisfying strict UK planning committee scrutiny.',
    },
    {
      q: 'How much does architectural CGI cost for a UK development?',
      a: 'A single exterior planning photomontage typically ranges from £2,500 to £9,000, interior CGIs cost £1,500 to £6,000 per room, animated walkthroughs cost £8,000 to £35,000, and a full off-plan launch CGI suite ranges from £15,000 to £60,000.',
    },
    {
      q: 'Can interactive virtual tours replace physical show homes?',
      a: 'While physical show homes serve visitors in person, an interactive virtual tour allows international and remote buyers to explore unbuilt apartments 24/7, evaluate finishes in real time, and gain the conviction needed to reserve off-plan.',
    },
  ]);

  const arProductFaq = buildFaqSchema([
    {
      q: 'What is WebAR product visualization for ecommerce?',
      a: 'WebAR is browser-based augmented reality that lets shoppers place and interact with photorealistic 3D products in their real physical space directly on iOS Safari and Android Chrome without downloading any app.',
    },
    {
      q: 'How does AR reduce ecommerce return rates?',
      a: 'Over 64% of product returns occur because items looked different or did not fit in person. AR gives shoppers 1:1 real-world scale and context in their homes before ordering, eliminating scale and spatial mismatches.',
    },
    {
      q: 'What 3D file formats are needed for WebAR?',
      a: 'WebAR utilizes USDZ files for iOS devices via Quick Look / ARKit, and GLTF / GLB files for Android devices via ARCore / Scene Viewer, with models optimized for rapid mobile loading.',
    },
    {
      q: 'How much does it cost to implement WebAR on Shopify or WooCommerce?',
      a: 'Single product WebAR typically ranges from $5,500 to $12,000, multi-product catalogs (5–10 SKUs) range from $18,000 to $35,000, and full custom catalogs range from $40,000 to $85,000+.',
    },
  ]);

  const interactive3dFaq = buildFaqSchema([
    {
      q: 'Why do brands need both commercial CGI and interactive 3D configurators in 2026?',
      a: 'Commercial CGI delivers photorealistic emotion and precision for global advertising, broadcast spots, and 4K packaging, while interactive 3D configurators provide real-time product exploration, customization, and checkout confidence directly on e-commerce storefronts.',
    },
    {
      q: 'What is a unified 3D master asset pipeline?',
      a: 'A unified 3D pipeline builds a single, production-grade 3D digital twin from original engineering CAD data. That master asset simultaneously outputs 4K commercial CGI stills, sub-2MB WebGL configurators, and Unreal Engine 5 spatial walkthroughs without duplicated modeling costs.',
    },
    {
      q: 'How does a unified 3D pipeline achieve a 70% faster turnaround?',
      a: 'By preparing geometry and PBR materials once. Introducing a new colorway, wood finish, or technical attachment updates both commercial advertising renders and live web customizers in days rather than weeks, eliminating fragmented agency silos.',
    },
    {
      q: 'Can web-based 3D configurators integrate with Shopify and mobile browsers?',
      a: 'Yes. Browser-native 3D configurators built with WebGL frameworks like PlayCanvas load in under two seconds on mobile devices at 60 FPS, and connect directly to Shopify Plus, BigCommerce, or custom headless checkouts.',
    },
  ]);

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

  const webglUnrealFaq = buildFaqSchema([
    {
      q: 'What is the main difference between WebGL and Unreal Engine 3D configurators?',
      a: 'WebGL renders locally on the user browser GPU with zero recurring streaming fees and instant load times, making it ideal for high-traffic retail. Unreal Engine 5 delivers ultra-photorealistic ray-traced visuals rendered on cloud GPUs and streamed via pixel streaming (Arcware/StreamPixel), making it best for luxury automotive and high-ticket items.',
    },
    {
      q: 'How much does Pixel Streaming cost for Unreal Engine configurators?',
      a: 'Pixel Streaming costs depend on cloud GPU usage, typically ranging from $0.05 to $0.20+ per active minute per concurrent user through providers like Arcware or StreamPixel. WebGL, by contrast, incurs $0 streaming costs as it executes directly on the client device.',
    },
    {
      q: 'Can both WebGL and Unreal Engine configurators connect to Shopify and e-commerce checkouts?',
      a: 'Yes. Both technologies support end-to-end e-commerce integration, including dynamic Bill of Materials (BOM) generation, custom pricing calculation, and direct Add-to-Cart checkout via Shopify, WooCommerce, or custom APIs.',
    },
    {
      q: 'When should a business choose WebGL over Unreal Engine?',
      a: 'Choose WebGL when your website receives high visitor traffic, budget constraints require avoiding monthly streaming bills, fast mobile load speed is critical, and standard PBR 3D graphics are sufficient for your products.',
    },
  ]);

  const authorSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Bilal Lania',
    jobTitle: 'Founder & Creative Director',
    worksFor: { '@type': 'Organization', name: 'Elipse Studio', url: SITE_URL },
    url: SITE_URL,
    description: 'Founder and Creative Director of Elipse Studio specializing in 3D interactive configurators, Unreal Engine 5 pixel streaming, WebGL, and enterprise spatial computing.',
  };

  const breadcrumb = buildBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: meta.title, url: `/blog/${slugStr}` },
  ]);

  let extraSchemas = [];
  if (isLeap) extraSchemas = [leapFaq, authorSchema];
  if (isWebGLVsUnreal) extraSchemas = [webglUnrealFaq, authorSchema];
  if (isInteractive3d) extraSchemas = [interactive3dFaq, authorSchema];
  if (isUkArchViz) extraSchemas = [ukArchVizFaq, authorSchema];
  if (isArProduct) extraSchemas = [arProductFaq, authorSchema];

  return [schema, breadcrumb, ...extraSchemas].filter(Boolean);
}

function blogImageUrl(image) {
  if (!image) return `${SITE_URL}/assets/actuallogo.webp`;
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
  const apiSlug = BLOG_SLUG_ALIASES[slugStr] || slugStr;

  if (staticArticleMetadata[slugStr] || staticArticleMetadata[apiSlug]) {
    const meta = staticArticleMetadata[slugStr] || staticArticleMetadata[apiSlug];
    return buildMetadata({
      title: meta.title,
      description: meta.description,
      canonical: `${SITE_URL}/blog/${slugStr}`,
      ogImage: meta.ogImage,
      keywords: meta.keywords,
      type: 'article',
    });
  }

  const { data } = await apiCall(`/blogs/${apiSlug}`, 'GET', null, null, false, { next: { revalidate: 0 } });
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
  const apiSlug = BLOG_SLUG_ALIASES[slugStr] || slugStr;

  const StaticArticle = staticArticles[slugStr] || staticArticles[apiSlug];
  if (StaticArticle) {
    const meta = staticArticleMetadata[slugStr] || staticArticleMetadata[apiSlug];
    return (
      <>
        {meta && <MultiJsonLd schemas={staticArticleSchemas(slugStr, meta)} />}
        <StaticArticle />
      </>
    );
  }

  const { data, status } = await apiCall(`/blogs/${apiSlug}`, 'GET', null, null, false, { next: { revalidate: 0 } });
  if (status !== 200 || !data || !data.title) notFound();
  const { schemas } = apiArticleSchemas(slugStr, data);
  return (
    <>
      <MultiJsonLd schemas={schemas} />
      <BlogArticle slug={apiSlug} canonicalSlug={slugStr} initialData={data} showMidArticleCta={true} />
    </>
  );
}
