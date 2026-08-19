import { notFound } from 'next/navigation';
import { buildMetadata } from '@/lib/seo';
import { SITE_URL } from '@/utils/api';
import IndustryLayout from '@/components/IndustryLayout';
import { industriesData } from '@/data/industriesData';

export const revalidate = 300;

export async function generateStaticParams() {
  return industriesData.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const industry = industriesData.find((i) => i.slug === slug);
  if (!industry) {
    return buildMetadata({
      title: 'Industry Not Found',
      description: 'The requested industry page could not be found.',
      canonical: `${SITE_URL}/industries/${slug}`,
      noIndex: true,
    });
  }

  const description = industry.meta?.metaDescription || industry.title;
  const keywords = industry.meta?.keywords || '';
  const ogImage = industry.meta?.ogImage
    ? industry.meta.ogImage.startsWith('http')
      ? industry.meta.ogImage
      : `${SITE_URL}${industry.meta.ogImage}`
    : `${SITE_URL}/assets/logo-og.webp`;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${industry.title} Solutions`,
    provider: {
      '@type': 'Organization',
      name: 'Elipse Studio',
      url: SITE_URL,
      logo: `${SITE_URL}/assets/logo-og.webp`,
      foundingDate: '2014',
      sameAs: [
        'https://www.linkedin.com/company/elipse-studio',
        'https://www.instagram.com/elipsestudio',
      ],
    },
    areaServed: [
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Country', name: 'Saudi Arabia' },
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'Canada' },
      { '@type': 'Country', name: 'Australia' },
    ],
    description,
    url: `${SITE_URL}/industries/${slug}`,
  };

  if (industry.faqs && industry.faqs.length) {
    schema['@type'] = 'FAQPage';
    schema.mainEntity = industry.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    }));
  }

  return buildMetadata({
    title: industry.meta?.seoTitle || `${industry.title} Solutions | Elipse Studio`,
    description,
    keywords,
    canonical: `${SITE_URL}/industries/${slug}`,
    ogImage,
    ogImageAlt: industry.meta?.ogImageAlt || `${industry.title} by Elipse Studio`,
    schema,
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Industries', item: `${SITE_URL}/industries` },
        { '@type': 'ListItem', position: 3, name: industry.title, item: `${SITE_URL}/industries/${slug}` },
      ],
    },
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const industry = industriesData.find((i) => i.slug === slug);
  if (!industry) notFound();

  return (
    <IndustryLayout
      slug={industry.slug}
      title={industry.title}
      category={industry.category}
      icon={industry.icon}
      meta={industry.meta}
      hero={industry.hero}
      tlDr={industry.tlDr}
      intro={industry.intro}
      solutions={industry.solutions}
      whyUs={industry.whyUs}
      midCta={industry.midCta}
      useCases={industry.useCases}
      technology={industry.technology}
      faqs={industry.faqs}
      finalCta={industry.finalCta}
    />
  );
}
