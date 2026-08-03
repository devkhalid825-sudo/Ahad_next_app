import { notFound } from 'next/navigation';
import { apiCall, SITE_URL } from '@/utils/api';
import { buildMetadata } from '@/lib/seo';
import ProjectPage from '@/components/ProjectPage';
import AhmedFood from '@/components/projects/AhmedFood';
import { projectList, caseStudyEntries } from '@/components/projects/projectData';
import BreadcrumbJsonLd from '@/components/BreadcrumbJsonLd';

const allProjects = [...projectList, ...caseStudyEntries];
const projectMap = Object.fromEntries(allProjects.map((p) => [p.slug, p]));

export const revalidate = 300;

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const staticProject = projectMap[slug];
  if (staticProject) {
    const description = staticProject.meta?.find((m) => m.label === 'Description')?.value || staticProject.title;
    const category = staticProject.meta?.find((m) => m.label === 'Service')?.value || 'Projects';
    return buildMetadata({
      title: staticProject.title,
      description,
      canonical: `${SITE_URL}/project/${slug}`,
      schema: {
        '@context': 'https://schema.org',
        '@type': 'CreativeWork',
        name: staticProject.title,
        description,
        url: `${SITE_URL}/project/${slug}`,
        creator: {
          '@type': 'Organization',
          name: 'Elipse Studio',
        },
      },
      breadcrumb: {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: category, item: `${SITE_URL}/portfolio` },
          { '@type': 'ListItem', position: 3, name: staticProject.title, item: `${SITE_URL}/project/${slug}` },
        ],
      },
    });
  }
  const { data } = await apiCall(`/projects/by-path?path=${encodeURIComponent('/project/' + slug)}`, 'GET', null, null, false, { next: { revalidate: 300 } });
  if (!data || !data.title) return {};
  const rawDesc = data.description ? data.description.replace(/<[^>]*>/g, '') : '';
  const description = data.metaDescription || rawDesc.slice(0, 160);
  return buildMetadata({
    title: data.metaTitle || data.title,
    description,
    canonical: data.path || `${SITE_URL}/project/${slug}`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: data.title,
      description,
      url: `${SITE_URL}${data.path || '/project/' + slug}`,
      creator: {
        '@type': 'Organization',
        name: 'Elipse Studio',
      },
    },
    breadcrumb: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: `${SITE_URL}/portfolio` },
        { '@type': 'ListItem', position: 3, name: data.title, item: `${SITE_URL}${data.path || '/project/' + slug}` },
      ],
    },
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (slug === 'ahmed-food') {
    return (
      <>
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', item: `${SITE_URL}/` },
            { name: 'Projects', item: `${SITE_URL}/portfolio` },
            { name: 'Ahmed Food', item: `${SITE_URL}/project/ahmed-food` },
          ]}
        />
        <AhmedFood />
      </>
    );
  }
  if (projectMap[slug]) {
    const project = projectMap[slug];
    const category = project.meta?.find((m) => m.label === 'Service')?.value || 'Projects';
    return (
      <>
        <BreadcrumbJsonLd
          items={[
            { name: 'Home', item: `${SITE_URL}/` },
            { name: category, item: `${SITE_URL}/portfolio` },
            { name: project.title, item: `${SITE_URL}/project/${slug}` },
          ]}
        />
        <ProjectPage slug={slug} />
      </>
    );
  }

  const { data, status } = await apiCall(`/projects/by-path?path=${encodeURIComponent('/project/' + slug)}`, 'GET', null, null, false, { next: { revalidate: 300 } });
  if (status !== 200 || !data || !data.title) notFound();
  const category = data.category || data.service || 'Projects';
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', item: `${SITE_URL}/` },
          { name: category, item: `${SITE_URL}/portfolio` },
          { name: data.title, item: `${SITE_URL}${data.path || '/project/' + slug}` },
        ]}
      />
      <ProjectPage slug={slug} initialData={data} />
    </>
  );
}
