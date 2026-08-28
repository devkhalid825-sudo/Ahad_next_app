import { notFound } from 'next/navigation';
import { cache } from 'react';
import { apiCall, SITE_URL } from '@/utils/api';
import { buildMetadata } from '@/lib/seo';
import ProjectPage from '@/components/ProjectPage';
import { MultiJsonLd } from '@/components/seo/JsonLd';

export const revalidate = 60; // 1 min ISR cache for instant page clicks + fresh updates

const getCaseStudy = cache(async (slug) => {
  const { data, status } = await apiCall(`/case-studies/by-slug?slug=${slug}`, 'GET', null, null, false, { next: { revalidate: 60 } });
  return { data, status };
});

function caseStudySchemas(slug, data) {
  const description = data.metaDescription || (data.description || data.content || '').replace(/<[^>]*>/g, '').slice(0, 160);
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: data.metaTitle || data.title,
    description,
    image: data.heroImage || data.largeBanner,
    publisher: {
      '@type': 'Organization',
      name: 'Elipse Studio',
    },
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${SITE_URL}/case-studies` },
      { '@type': 'ListItem', position: 3, name: data.title, item: `${SITE_URL}/case-study/${slug}` },
    ],
  };
  return { description, schemas: [schema, breadcrumb] };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await getCaseStudy(slug);
  if (!data || !data.title) {
    return buildMetadata({
      title: 'Case Study Not Found',
      description: 'The requested case study could not be found.',
      canonical: `${SITE_URL}/case-study/${slug}`,
      noIndex: true,
    });
  }
  const { description } = caseStudySchemas(slug, data);
  return buildMetadata({
    title: data.metaTitle || data.title,
    description,
    canonical: `${SITE_URL}/case-study/${slug}`,
  });
}

import { projectList, caseStudyEntries } from '@/components/projects/projectData';

const allProjects = [...projectList, ...caseStudyEntries];
const projectMap = Object.fromEntries(allProjects.map(p => [p.slug, p]));

export default async function Page({ params }) {
  const { slug } = await params;
  const { data, status } = await getCaseStudy(slug);
  if (status === 200 && data && data.title) {
    const { schemas } = caseStudySchemas(slug, data);
    return (
      <>
        <MultiJsonLd schemas={schemas} />
        <ProjectPage slug={slug} initialData={data} type="case-study" />
      </>
    );
  }
  // Fallback only for content that will never live in the dashboard.
  if (projectMap[slug]) {
    return <ProjectPage slug={slug} />;
  }
  notFound();
}
