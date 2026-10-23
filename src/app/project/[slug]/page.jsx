import { notFound } from 'next/navigation';
import { cache } from 'react';
import { apiCall, SITE_URL } from '@/utils/api';
import { buildMetadata } from '@/lib/seo';
import ProjectPage from '@/components/ProjectPage';
import { projectList, caseStudyEntries } from '@/components/projects/projectData';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import { getProjectValueProposition } from '@/constants/projectValueProps';

export const revalidate = 10; // 10s fast cache for fresh updates

const allProjects = [...projectList, ...caseStudyEntries];
const projectMap = Object.fromEntries(allProjects.map((p) => [p.slug, p]));

const getProject = cache(async (safeSlug) => {
  const { data, status } = await apiCall(`/projects/by-path?path=${encodeURIComponent('/project/' + safeSlug)}`, 'GET', null, null, false, { next: { revalidate: 10 } });
  return { data, status };
});

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

function staticProjectSchemas(slug, staticProject) {
  const uniqueValueProp = getProjectValueProposition({ ...staticProject, slug });
  const description = staticProject.meta?.find((m) => m.label === 'Description')?.value || uniqueValueProp || staticProject.title;
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

import { buildFaqSchema } from '@/seo/schemas';
import { isProjectHidden } from '@/utils/projectVisibility';

function apiProjectSchemas(slug, data) {
  const title = data.metaTitle || data.title;
  const uniqueValueProp = getProjectValueProposition({ ...data, slug });
  const rawDesc = data.description ? data.description.replace(/<[^>]*>/g, '') : '';
  const description = data.metaDescription || uniqueValueProp || rawDesc.slice(0, 160);
  const url = `${SITE_URL}${data.path || '/project/' + slug}`;
  
  let targetKeywords = data.targetKeywords || data.metaKeywords || '';
  let metaSec = {};
  if (data.sections) {
    try {
      const parsed = typeof data.sections === 'string' ? JSON.parse(data.sections) : data.sections;
      if (Array.isArray(parsed) && parsed[0]) {
        metaSec = parsed[0];
        if (!targetKeywords && metaSec.targetKeywords) {
          targetKeywords = metaSec.targetKeywords;
        }
      }
    } catch {}
  }

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: title,
    description,
    url,
    ...(targetKeywords ? { keywords: targetKeywords } : {}),
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

  const schemas = [breadcrumb];

  // Custom Schema support
  let customParsed = null;
  const rawCustom = data.customSchema || metaSec.customSchema;
  if (rawCustom && typeof rawCustom === 'string' && rawCustom.trim().length > 0) {
    try {
      const cleaned = rawCustom.replace(/<\/?script[^>]*>/gi, '').trim();
      customParsed = JSON.parse(cleaned);
    } catch (e) {
      console.error('Error parsing customSchema JSON-LD in project page:', e);
    }
  }

  if (customParsed) {
    schemas.push(customParsed);
  } else {
    schemas.push(defaultSchema);
  }

  // Auto FAQ schema
  const faqItems = metaSec.faqItems || data.faqItems;
  if (Array.isArray(faqItems) && faqItems.length > 0) {
    const faqSchema = buildFaqSchema(faqItems);
    if (faqSchema) schemas.push(faqSchema);
  }

  return { title, description, targetKeywords, schemas };
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const safeSlug = String(slug || '').trim();

  const { data } = await getProject(safeSlug);
  if (data && data.title) {
    const isHidden = isProjectHidden(data);
    const { title, description, targetKeywords } = apiProjectSchemas(safeSlug, data);
    return buildMetadata({
      title,
      description,
      keywords: targetKeywords || undefined,
      canonical: data.path ? (data.path.startsWith('http') ? data.path : `${SITE_URL}${data.path.startsWith('/') ? data.path : '/' + data.path}`) : `${SITE_URL}/project/${slug}`,
      noIndex: isHidden ? true : undefined,
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
