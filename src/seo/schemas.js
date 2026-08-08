import { SITE_URL } from '@/utils/api';

const SITE_NAME = 'Elipse Studio';

export const SITE_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo-og.webp`,
    image: `${SITE_URL}/assets/logo-og.webp`,
    description:
      'Award-winning architectural visualization studio specializing in 3D rendering, walkthrough animation, interactive configurators, and immersive AR/VR experiences for property developers and brands worldwide.',
    foundingDate: '2014',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressRegion: 'Dubai',
      addressCountry: 'AE',
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
      'https://www.linkedin.com/company/elipse-studio',
      'https://www.instagram.com/elipsestudio',
      'https://twitter.com/elipsestudio',
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
    '@type': 'WebPage',
    '@id': `${SITE_URL}/#webpage`,
    name: 'Elipse Studio | 3D Visualization & AR/VR Studio',
    description:
      'Professional 3D visualization, AR/VR experiences, and web configurators for property developers and product brands worldwide since 2014.',
    url: `${SITE_URL}/`,
    isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}/#website` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${SITE_URL}/#breadcrumb`,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
    ],
  },
];

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
    image: image ? (image.startsWith('http') ? image : `${SITE_URL}${image}`) : `${SITE_URL}/assets/logo-og.webp`,
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
        url: `${SITE_URL}/assets/logo-og.webp`,
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
