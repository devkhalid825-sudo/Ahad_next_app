import { notFound } from 'next/navigation';
import { cache } from 'react';
import { apiCall, SITE_URL } from '@/utils/api';
import { buildMetadata } from '@/lib/seo';
import ProjectPage from '@/components/ProjectPage';
import { projectList, caseStudyEntries } from '@/components/projects/projectData';
import { MultiJsonLd } from '@/components/seo/JsonLd';

export const revalidate = 60; // 1 min ISR cache for instant page clicks + fresh updates

const allProjects = [...projectList, ...caseStudyEntries];
const projectMap = Object.fromEntries(allProjects.map((p) => [p.slug, p]));

const getProject = cache(async (safeSlug) => {
  const { data, status } = await apiCall(`/projects/by-path?path=${encodeURIComponent('/project/' + safeSlug)}`, 'GET', null, null, false, { next: { revalidate: 60 } });
  return { data, status };
});

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

function staticProjectSchemas(slug, staticProject) {
  const description = staticProject.meta?.find((m) => m.label === 'Description')?.value || staticProject.title;
  const category = staticProject.meta?.find((m) => m.label === 'Service')?.value || 'Projects';
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: staticProject.title,
    description,
    url: `${SITE_URL}/project/${slug}`,
    creator: {
      '@type': 'Organization',
      name: 'Elipse Studio',
    },
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: category, item: `${SITE_URL}/portfolio` },
      { '@type': 'ListItem', position: 3, name: staticProject.title, item: `${SITE_URL}/project/${slug}` },
    ],
  };
  return { description, schemas: [schema, breadcrumb] };
}

function apiProjectSchemas(slug, data) {
  const title = data.metaTitle || data.title;
  const rawDesc = data.description ? data.description.replace(/<[^>]*>/g, '') : '';
  const description = data.metaDescription || rawDesc.slice(0, 160);
  const url = `${SITE_URL}${data.path || '/project/' + slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    url,
    creator: {
      '@type': 'Organization',
      name: 'Elipse Studio',
    },
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/portfolio` },
      { '@type': 'ListItem', position: 3, name: title, item: url },
    ],
  };
  return { title, description, schemas: [schema, breadcrumb] };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { data } = await getProject(slug);
  if (data && data.title) {
    const { title, description } = apiProjectSchemas(slug, data);
    return buildMetadata({
      title,
      description,
      canonical: data.path ? (data.path.startsWith('http') ? data.path : `${SITE_URL}${data.path.startsWith('/') ? data.path : '/' + data.path}`) : `${SITE_URL}/project/${slug}`,
    });
  }
  const staticProject = projectMap[slug];
  if (staticProject) {
    const { description } = staticProjectSchemas(slug, staticProject);
    return buildMetadata({
      title: staticProject.title,
      description,
      canonical: `${SITE_URL}/project/${slug}`,
    });
  }
  return buildMetadata({
    title: 'Project Not Found',
    description: 'The requested project could not be found.',
    canonical: `${SITE_URL}/project/${slug}`,
    noIndex: true,
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const safeSlug = String(slug || '').trim();

  if (!safeSlug) notFound();

  const { data, status } = await getProject(safeSlug);
  if (status === 200 && data && data.title) {
    const { schemas } = apiProjectSchemas(safeSlug, data);
    return (
      <>
        <MultiJsonLd schemas={schemas} />
        <ProjectPage slug={safeSlug} initialData={data} />
      </>
    );
  }

  if (projectMap[safeSlug]) {
    const { schemas } = staticProjectSchemas(safeSlug, projectMap[safeSlug]);
    return (
      <>
        <MultiJsonLd schemas={schemas} />
        <ProjectPage slug={safeSlug} />
      </>
    );
  }

  notFound();
}
