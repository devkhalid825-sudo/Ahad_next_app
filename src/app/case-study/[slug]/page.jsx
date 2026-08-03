import { notFound } from 'next/navigation';
import { apiCall, SITE_URL } from '@/utils/api';
import { buildMetadata } from '@/lib/seo';
import CaseStudyDetail from '@/components/CaseStudyDetails';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

export const revalidate = 300;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await apiCall(`/case-studies/by-slug?slug=${slug}`, 'GET', null, null, false, { next: { revalidate: 300 } });
  if (!data || !data.title) return {};
  const description = data.metaDescription || (data.description || data.content || '').replace(/<[^>]*>/g, '').slice(0, 160);
  return buildMetadata({
    title: data.metaTitle || data.title,
    description,
    canonical: `${SITE_URL}/case-study/${slug}`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: data.metaTitle || data.title,
      description,
      image: data.heroImage || data.largeBanner,
      publisher: {
        '@type': 'Organization',
        name: 'Elipse Studio',
      },
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${SITE_URL}/case-studies` },
        { '@type': 'ListItem', position: 3, name: data.title, item: `${SITE_URL}/case-study/${slug}` },
      ],
    },
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const { data, status } = await apiCall(`/case-studies/by-slug?slug=${slug}`, 'GET', null, null, false, { next: { revalidate: 300 } });
  if (status !== 200 || !data || !data.title) notFound();
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: `${SITE_URL}/` },
          { name: 'Case Studies', item: `${SITE_URL}/case-studies` },
          { name: data.title, item: `${SITE_URL}/case-study/${slug}` },
        ]}
      />
      <CaseStudyDetail slug={slug} initialData={data} />
    </>
  );
}
