import { notFound } from 'next/navigation';
import { cache } from 'react';
import { apiCall, SITE_URL } from '@/utils/api';
import { buildMetadata } from '@/lib/seo';
import ProjectPage from '@/components/ProjectPage';
import { MultiJsonLd } from '@/components/seo/JsonLd';
import { getProjectValueProposition } from '@/constants/projectValueProps';

export const revalidate = 60; // 1 min ISR cache for instant page clicks + fresh updates

const getCaseStudy = cache(async (slug) => {
  const { data, status } = await apiCall(`/case-studies/by-slug?slug=${slug}`, 'GET', null, null, false, { next: { revalidate: 60 } });
  return { data, status };
});

import { buildFaqSchema } from '@/seo/schemas';

function caseStudySchemas(slug, data) {
  const uniqueValueProp = getProjectValueProposition({ ...data, slug });
  const description = data.metaDescription || uniqueValueProp || (data.description || data.content || '').replace(/<[^>]*>/g, '').slice(0, 160);
  
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
    '@type': 'Article',
    headline: data.metaTitle || data.title,
    description,
    image: data.heroImage || data.largeBanner,
    ...(targetKeywords ? { keywords: targetKeywords } : {}),
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

  const schemas = [breadcrumb];

  // Custom Schema support
  let customParsed = null;
  const rawCustom = data.customSchema || metaSec.customSchema;
  if (rawCustom && typeof rawCustom === 'string' && rawCustom.trim().length > 0) {
    try {
      const cleaned = rawCustom.replace(/<\/?script[^>]*>/gi, '').trim();
      customParsed = JSON.parse(cleaned);
    } catch (e) {
      console.error('Error parsing customSchema JSON-LD in case-study page:', e);
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

  return { description, targetKeywords, schemas };
}

import { projectList, caseStudyEntries } from '@/components/projects/projectData';

const allProjects = [...projectList, ...caseStudyEntries];
const projectMap = Object.fromEntries(allProjects.map(p => [p.slug, p]));

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const safeSlug = String(slug || '').trim();

  const { data } = await getCaseStudy(safeSlug);
  if (!data || !data.title) {
    return buildMetadata({
      title: 'Case Study Not Found',
      description: 'The requested case study could not be found.',
      canonical: `${SITE_URL}/case-study/${safeSlug}`,
      noIndex: true,
    });
  }
  const { description, targetKeywords } = caseStudySchemas(safeSlug, data);
  return buildMetadata({
    title: data.metaTitle || data.title,
    description,
    keywords: targetKeywords || undefined,
    canonical: `${SITE_URL}/case-study/${safeSlug}`,
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const safeSlug = String(slug || '').trim();

  if (!safeSlug) notFound();

  const { data, status } = await getCaseStudy(safeSlug);
  if (status === 200 && data && data.title) {
    const { schemas } = caseStudySchemas(safeSlug, data);
    return (
      <>
        <MultiJsonLd schemas={schemas} />
        <ProjectPage slug={safeSlug} initialData={data} type="case-study" />
      </>
    );
  }
  // Fallback only for content that will never live in the dashboard.
  if (projectMap[safeSlug]) {
    return <ProjectPage slug={safeSlug} />;
  }
  notFound();
}
