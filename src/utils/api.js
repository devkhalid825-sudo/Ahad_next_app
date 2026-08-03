// Live backend origin — used for image URLs. Next.js rewrites proxy /api/* and /uploads/* to this host.
const LIVE_BACKEND = 'https://mediumseagreen-crocodile-699024.hostingersite.com';

const normalizeUrl = (value, fallback) => {
  if (!value) return fallback;
  return String(value).replace(/\/+$/, '');
};

const defaultSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || process.env.FRONTEND_URL || 'https://aqua-chinchilla-205103.hostingersite.com';
const defaultApiBase = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || '/api';

export const BACKEND_ORIGIN = normalizeUrl(process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || LIVE_BACKEND, LIVE_BACKEND);
export const SITE_URL = normalizeUrl(defaultSiteUrl, 'https://aqua-chinchilla-205103.hostingersite.com');
export const FRONTEND_HOST = 'https://aqua-chinchilla-205103.hostingersite.com';
export const BACKEND_HOST = BACKEND_ORIGIN;
export const API_BASE_URL = (() => {
  const configured = String(defaultApiBase).trim();
  if (!configured) return '/api';
  if (/^https?:\/\//i.test(configured)) return normalizeUrl(configured, `${BACKEND_ORIGIN}/api`);
  if (configured === 'same-origin' || configured === 'relative') {
    if (typeof window !== 'undefined') return '/api';
    return `${SITE_URL}/api`;
  }
  if (typeof window !== 'undefined') return normalizeUrl(configured, '/api');
  return normalizeUrl(`${SITE_URL}${configured.startsWith('/') ? configured : `/${configured}`}`, `${SITE_URL}/api`);
})();

export function getImgSrc(img) {
  if (!img) return '';
  if (typeof img === 'object') {
    return img.src || (img.default && img.default.src) || img.default || '';
  }
  return img;
}

// Convert any upload image URL to a relative /uploads/* path so the
// Next.js rewrite proxy (next.config.ts) serves it — this avoids CORS issues.
function toRelativeUpload(url) {
  if (!url || typeof url !== 'string') return url;
  // Already relative
  if (url.startsWith('/uploads/')) return url;
  // Absolute URL pointing to any backend /uploads/
  const match = url.match(/^https?:\/\/[^/]+(\/.*)$/);
  if (match && match[1].startsWith('/uploads/')) return match[1];
  return url;
}

function fixUrls(obj) {
  if (typeof obj === 'string') {
    // Convert absolute upload URLs → relative so Next.js proxy handles them
    const relative = toRelativeUpload(obj);
    if (relative !== obj) return relative;
    let replaced = obj;
    replaced = replaced.replace(/:\/\//g, '~!~~!~').replace(/\/+/g, '/').replace(/~!~~!~/g, '://');
    return replaced;
  }
  if (Array.isArray(obj)) return obj.map(fixUrls);
  if (obj && typeof obj === 'object') {
    const result = {};
    for (const key of Object.keys(obj)) {
      result[key] = fixUrls(obj[key]);
    }
    return result;
  }
  return obj;
}

export const apiCall = async (endpoint, method = 'GET', body = null, token = null, isFormData = false, next = {}) => {
  const headers = {};
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const config = { method, headers, next };
  if (body) {
    if (isFormData) {
      config.body = body;
    } else {
      config.body = JSON.stringify(body);
    }
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const ct = response.headers.get('content-type') || '';
    const responseText = await response.text();

    if (responseText) {
      const trimmed = responseText.trim();
      if (trimmed.startsWith('<') || trimmed.startsWith('<!DOCTYPE')) {
        console.error('API Error: Received HTML instead of JSON', trimmed.slice(0, 400));
        return { data: { message: 'The server returned an HTML error page. Please check the backend/frontend deployment configuration.' }, status: response.status };
      }

      try {
        const parsed = JSON.parse(responseText);
        const data = fixUrls(parsed);
        return { data, status: response.status };
      } catch {
        if (ct.includes('application/json') || trimmed.startsWith('{') || trimmed.startsWith('[')) {
          console.error('API Error: Invalid JSON response', responseText);
        }
      }
    }

    if (responseText) {
      return { data: { message: responseText }, status: response.status };
    }

    return { data: { message: 'Server returned an empty response.' }, status: response.status };
  } catch (error) {
    console.error('API Error:', error);
    return { data: { message: 'Network error. Please check connection.' }, status: 500 };
  }
};

export const getYoutubeEmbed = (url) => {
  if (!url) return '';
  const match = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

export const uploadFile = async (endpoint, file, type = 'blogs', token = null) => {
  const formData = new FormData();
  formData.append('image', file);

  return await apiCall(`${endpoint}?type=${encodeURIComponent(type)}`, 'POST', formData, token, true);
};
