import { SITE_URL } from '@/utils/api';

export const SITE_NAME = 'Elipse Studio';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/assets/logo-og.webp`;
export const TWITTER_SITE = '@ElipseStudio';
export const TWITTER_CREATOR = '@ElipseStudio';

/**
 * Builds standard metadata object compliant with Next.js 15 Metadata API.
 * Includes Canonical URLs, Open Graph, Twitter cards, and Schema.org JSON-LD scripts.
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
  const fullDescription =
    description ||
    'Elipse Studio: photoreal 3D rendering, architectural visualization, interactive 3D configurators, VR/AR, and animation for property developers worldwide.';
  const url = canonical || SITE_URL;

  const metadata = {
    title: fullTitle,
    description: fullDescription,
    ...(keywords ? { keywords } : {}),
    ...(noIndex
      ? {
          robots: {
            index: false,
            follow: false,
            googleBot: {
              index: false,
              follow: false,
            },
          },
        }
      : {
          robots: {
            index: true,
            follow: true,
            googleBot: {
              index: true,
              follow: true,
              'max-video-preview': -1,
              'max-image-preview': 'large',
              'max-snippet': -1,
            },
          },
        }),
    alternates: {
      canonical: url,
    },
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

  const jsonLdScripts = [];
  if (schema) jsonLdScripts.push(schema);
  if (breadcrumb) jsonLdScripts.push(breadcrumb);
  if (faq) jsonLdScripts.push(faq);

  if (jsonLdScripts.length > 0) {
    metadata.other = jsonLdScripts.reduce((acc, script, i) => {
      acc[`ld+json-${i}`] = JSON.stringify(script);
      return acc;
    }, {});
  }

  return metadata;
}

export default buildMetadata;
