import { SITE_URL } from '@/utils/api';

const SITE_NAME = 'Elipse Studio';

export const SITE_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/actuallogo.webp`,
    image: `${SITE_URL}/assets/actuallogo.webp`,
    description:
      'Creatively led technology studio specializing in 3D rendering, walkthrough animation, interactive configurators, and immersive AR/VR experiences for property developers and brands worldwide.',
    foundingDate: '2021',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1812 McCormick Ln',
      addressLocality: 'Hanover Park',
      addressRegion: 'IL',
      postalCode: '60133',
      addressCountry: 'US',
    },
    areaServed: [
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Saudi Arabia' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'Australia' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@elipsestudio.com',
      availableLanguage: ['English', 'Arabic', 'Urdu'],
    },
    sameAs: [
      'https://www.linkedin.com/company/elipse-studioo',
      'https://www.instagram.com/elipse_studio/',
      'https://www.facebook.com/elipsestudio',
      'https://www.youtube.com/@officialelipsestudio',
      'https://www.tiktok.com/@elipse_studio?lang=en',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}/#service`,
    name: 'Architectural Visualization & 3D Rendering Services',
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: ['UAE', 'Saudi Arabia', 'USA', 'UK', 'Canada', 'Australia'],
    serviceType: [
      '3D Rendering',
      'Architectural Walkthrough',
      'Interactive Configurator',
      'VR AR Experience',
      'Product Animation',
    ],
    description:
      'Premium 3D visualization, walkthrough animation, interactive web configurators, and immersive AR/VR experiences for property developers and global brands.',
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
  },
  {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${SITE_URL}/#professional-service`,
    name: SITE_NAME,
    url: SITE_URL,
    description:
      'Global immersive agency — WebGL 3D configurators, industrial 3D animation, architectural visualization, and Unreal Engine 5 development.',
    areaServed: ['US', 'GB', 'AE', 'SA', 'AU'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Immersive Technology Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'WebGL 3D Product Configurators',
            url: `${SITE_URL}/services/3d-product-configurators`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Industrial 3D Animation',
            url: `${SITE_URL}/blog/industrial-animation`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Architectural Visualization',
            url: `${SITE_URL}/services/architectural-visualization`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Unreal Engine 5 Development',
            url: `${SITE_URL}/services/unreal-engine-development`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'AR Development',
            url: `${SITE_URL}/services/ar-development`,
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'VR Development',
            url: `${SITE_URL}/services/vr-development`,
          },
        },
      ],
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Sales',
      url: `${SITE_URL}/contact`,
    },
  },
];
// Note: WebPage and BreadcrumbList are page-specific (they describe a single
// URL), so they are NOT included here — a copy of the homepage's WebPage/
// Breadcrumb rendered on every page would tell Google every page IS the
// homepage. Each page renders its own via buildMetadata's schema/breadcrumb
// and <MultiJsonLd> in its page component.

export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url.startsWith('/') ? item.url : `/${item.url}`}`,
    })),
  };
}

export function buildArticleSchema({ title, description, image, publishedAt, updatedAt, slug }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : `${SITE_URL}/assets/actuallogo.webp`,
    datePublished: publishedAt || new Date().toISOString(),
    dateModified: updatedAt || publishedAt || new Date().toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${slug}`,
    },
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/actuallogo.webp`,
      },
    },
  };
}

export function buildFaqSchema(faqItems) {
  if (!faqItems || !Array.isArray(faqItems) || faqItems.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q || item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a || item.answer,
      },
    })),
  };
}

export function buildVideoObjectSchema({ name, description, thumbnailUrl, uploadDate, embedUrl }) {
  if (!embedUrl) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: name || 'Elipse Studio Video',
    description: description || name || '3D visualization and immersive solutions by Elipse Studio',
    thumbnailUrl: thumbnailUrl || 'https://img.youtube.com/vi/aXGkn51OToA/maxresdefault.jpg',
    uploadDate: uploadDate || '2024-01-01',
    embedUrl: embedUrl,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/actuallogo.webp`,
      },
    },
  };
}
