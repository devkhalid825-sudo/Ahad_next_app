import { cachedFetch } from './api';

export async function getBlogs(options = {}) {
  const data = await cachedFetch('/blogs', { tags: ['blogs'], ...options });
  return Array.isArray(data) ? data : [];
}

export async function getBlogBySlug(slug, options = {}) {
  const data = await cachedFetch(`/blogs/${slug}`, { tags: [`blog-${slug}`], ...options });
  return data;
}
