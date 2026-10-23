import { cachedFetch } from './api';
import { isProjectHidden } from '@/utils/projectVisibility';

export async function getProjects(options = {}) {
  const { includeHidden = false, ...fetchOptions } = options;
  const data = await cachedFetch('/projects', { tags: ['projects'], ...fetchOptions });
  if (!Array.isArray(data)) return [];
  if (includeHidden) return data;
  return data.filter((p) => !isProjectHidden(p));
}

export async function getProjectBySlug(slug, options = {}) {
  const data = await cachedFetch(`/projects/${slug}`, { tags: [`project-${slug}`], ...options });
  return data;
}

export async function getCaseStudies(options = {}) {
  const { includeHidden = false, ...fetchOptions } = options;
  const data = await cachedFetch('/case-studies', { tags: ['case-studies'], ...fetchOptions });
  if (!Array.isArray(data)) return [];
  if (includeHidden) return data;
  return data.filter((p) => !isProjectHidden(p));
}

export async function getFeaturedCaseStudies(options = {}) {
  const { includeHidden = false, ...fetchOptions } = options;
  const data = await cachedFetch('/case-studies?featured=true', { tags: ['case-studies', 'featured'], ...fetchOptions });
  if (!Array.isArray(data)) return [];
  if (includeHidden) return data;
  return data.filter((p) => !isProjectHidden(p));
}

export async function getCaseStudyBySlug(slug, options = {}) {
  const data = await cachedFetch(`/case-studies/${slug}`, { tags: [`case-study-${slug}`], ...options });
  return data;
}
