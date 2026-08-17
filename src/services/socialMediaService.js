import { cachedFetch } from './api';

export async function getSocialMedia(options = {}) {
  const data = await cachedFetch('/social-media', { tags: ['social-media'], ...options });
  return Array.isArray(data) ? data : [];
}
