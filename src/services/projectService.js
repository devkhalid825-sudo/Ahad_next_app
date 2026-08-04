import { cachedFetch } from './api';

export async function getProjects(options = {}) {
  const data = await cachedFetch('/projects', { tags: ['projects'], ...options });
  return Array.isArray(data) ? data : [];
}

export async function getProjectBySlug(slug, options = {}) {
  const data = await cachedFetch(`/projects/${slug}`, { tags: [`project-${slug}`], ...options });
  return data;
}

export async function getCaseStudies(options = {}) {
  const data = await cachedFetch('/case-studies', { tags: ['case-studies'], ...options });
  return Array.isArray(data) ? data : [];
}

export async function getFeaturedCaseStudies(options = {}) {
  const data = await cachedFetch('/case-studies?featured=true', { tags: ['case-studies', 'featured'], ...options });
  return Array.isArray(data) ? data : [];
}

export async function getCaseStudyBySlug(slug, options = {}) {
  const data = await cachedFetch(`/case-studies/${slug}`, { tags: [`case-study-${slug}`], ...options });
  return data;
}
