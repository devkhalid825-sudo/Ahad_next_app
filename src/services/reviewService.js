import { cachedFetch } from './api';

export async function getReviews(options = {}) {
  const data = await cachedFetch('/reviews', { tags: ['reviews'], ...options });
  return Array.isArray(data) ? data : [];
}
