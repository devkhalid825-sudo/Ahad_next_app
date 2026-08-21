import { cache } from 'react';
import { BACKEND_ORIGIN, fixUrls } from '@/utils/api';

const DEFAULT_REVALIDATE = 300; // 5 min caching by default, matches page-level `revalidate` export used across the app

/**
 * Standard server-side fetch wrapper wrapped in React cache() to prevent duplicate fetches 
 * during the same request render pass.
 */
export const cachedFetch = cache(async (endpoint, options = {}) => {
  const {
    revalidate = DEFAULT_REVALIDATE,
    tags = [],
    headers = {},
    ...rest
  } = options;

  const url = endpoint.startsWith('http') ? endpoint : `${BACKEND_ORIGIN}/api${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const res = await fetch(url, {
      ...rest,
      headers: {
        Accept: 'application/json',
        ...headers,
      },
      next: {
        revalidate,
        ...(tags.length > 0 ? { tags } : {}),
      },
    });

    if (!res.ok) {
      return null;
    }

    const json = await res.json();
    return fixUrls(json);
  } catch (error) {
    console.error(`Fetch error for endpoint "${endpoint}":`, error);
    return null;
  }
});
