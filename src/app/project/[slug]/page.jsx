import { notFound } from 'next/navigation';
import { apiCall, SITE_URL } from '@/utils/api';
import { buildMetadata } from '@/lib/seo';
import ProjectPage from '@/components/ProjectPage';
import AhmedFood from '@/components/projects/AhmedFood';
import { projectList, caseStudyEntries } from '@/components/projects/projectData';

const FALLBACK_TITLE = 'Project Details';
const VOWELS = /[aeiou]/i;

function isValidTitle(str) {
  if (!str || typeof str !== 'string') return false;
  const trimmed = str.trim();
  if (trimmed.length < 2 || trimmed.length > 200) return false;
  if (!/[a-zA-Z]/.test(trimmed)) return false;
  const alphaOnly = trimmed.replace(/[^a-zA-Z]/g, '');
  if (alphaOnly.length > 0 && !VOWELS.test(alphaOnly)) return false;
  return true;
}

function projectTitle(data) {
  const raw = data.metaTitle || data.title || '';
  return isValidTitle(raw) ? raw.trim() : FALLBACK_TITLE;
}

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
  if (!data || !data.title) {
    return buildMetadata({
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
      canonical: `${SITE_URL}/project/${slug}`,
      noIndex: true,
    });
  }
  const title = projectTitle(data);
  const rawDesc = data.description ? data.description.replace(/<[^>]*>/g, '') : '';
  const description = data.metaDescription || rawDesc.slice(0, 160);
  return buildMetadata({
    title,
    description,
    canonical: data.path ? (data.path.startsWith('http') ? data.path : `${SITE_URL}${data.path.startsWith('/') ? data.path : '/' + data.path}`) : `${SITE_URL}/project/${slug}`,
    schema: {
      '@context': 'https://schema.org',
      '@type': 'CreativeWork',
      name: title,
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
        { '@type': 'ListItem', position: 3, name: title, item: `${SITE_URL}${data.path || '/project/' + slug}` },
      ],
    },
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const safeSlug = String(slug || '').trim();

  if (!safeSlug) notFound();

  if (safeSlug === 'ahmed-food') {
    return <AhmedFood />;
  }

  if (projectMap[safeSlug]) {
    return <ProjectPage slug={safeSlug} />;
  }

  const { data, status } = await apiCall(`/projects/by-path?path=${encodeURIComponent('/project/' + safeSlug)}`, 'GET', null, null, false, { next: { revalidate: 300 } });
  if (status !== 200 || !data || !data.title) notFound();
  return <ProjectPage slug={safeSlug} initialData={data} />;
}
