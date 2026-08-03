import { SITE_URL } from '@/utils/api';

const SITE_NAME = 'Elipse Studio';
const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/logo-og.webp`;
const TWITTER_SITE = '@ElipseStudio';
const TWITTER_CREATOR = '@ElipseStudio';

/**
 * Converts the old `useSeo` props into Next.js App Router Metadata.
 *
 * Usage in a server component page:
 *   export async function generateMetadata() {
 *     return buildMetadata({ title, description, canonical, schema, breadcrumb, faq });
 *   }
 */
export function buildMetadata({
  title,
  description,
  canonical,
  keywords,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt,
  noIndex = false,
  type = 'website',
  schema,
  breadcrumb,
  faq,
}) {
  const cleanTitle = title ? title.replace(/\s*\|\s*Elipse Studio\s*$/i, '') : '';
  const fullTitle = cleanTitle ? `${cleanTitle} | ${SITE_NAME}` : SITE_NAME;
  const fullDescription = description || 'Elipse Studio: photoreal 3D rendering, architectural visualization, interactive 3D configurators, VR/AR, and animation for property developers worldwide.';
  const url = canonical || SITE_URL;

  const metadata = {
    title: fullTitle,
    description: fullDescription,
    ...(keywords ? { keywords } : {}),
    ...(noIndex ? { robots: { index: false, follow: false } } : {}),
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url,
      siteName: SITE_NAME,
      type,
      images: [
        {
          url: ogImage,
          secureUrl: ogImage,
          type: 'image/webp',
          width: 1200,
          height: 630,
          ...(ogImageAlt ? { alt: ogImageAlt } : {}),
        },
      ],
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_SITE,
      creator: TWITTER_CREATOR,
      title: fullTitle,
      description: fullDescription,
      images: [ogImage],
    },
    publisher: SITE_NAME,
    authors: [{ name: SITE_NAME }],
  };

  // JSON-LD structured data
  const jsonLdScripts = [];
  if (schema) {
    jsonLdScripts.push(schema);
  }
  if (breadcrumb) {
    jsonLdScripts.push(breadcrumb);
  }
  if (faq) {
    jsonLdScripts.push(faq);
  }
  if (jsonLdScripts.length > 0) {
    metadata.other = jsonLdScripts.reduce((acc, script, i) => {
      acc[`ld+json-${i}`] = JSON.stringify(script);
      return acc;
    }, {});
  }

  return metadata;
}

/**
 * The site-wide static JSON-LD (LocalBusiness / Service / WebSite).
 * Rendered once in the root layout via <JsonLd schema={...} />.
 */
export const SITE_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/assets/logo-og.webp`,
    image: `${SITE_URL}/og-image.jpg`,
    description: 'Award-winning architectural visualization studio specializing in 3D rendering, walkthrough animation, interactive configurators, and immersive AR/VR experiences for property developers and brands worldwide since 2014.',
    foundingDate: '2014',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Karachi',
      addressRegion: 'Sindh',
      addressCountry: 'PK',
    },
    areaServed: [
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Saudi Arabia' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'Australia' },
      { '@type': 'Continent', name: 'Asia' },
      { '@type': 'Continent', name: 'Europe' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: 'info@elipsestudio.com',
      availableLanguage: ['English', 'Urdu', 'Arabic'],
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
    areaServed: ['UAE', 'Saudi Arabia', 'USA', 'UK', 'Canada', 'Australia', 'Asia', 'Europe'],
    serviceType: ['3D Rendering', 'Architectural Walkthrough', 'Interactive Configurator', 'VR AR Experience', 'Product Animation'],
    description: 'Premium 3D visualization, walkthrough animation, interactive web configurators, and immersive AR/VR experiences for property developers and global brands.',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${SITE_URL}/?s={search_term_string}` },
      'query-input': 'required name=search_term_string',
    },
  },
];

export default buildMetadata;
