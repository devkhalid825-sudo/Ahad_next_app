// Live backend origin — used for image URLs. Next.js rewrites proxy /api/* and /uploads/* to this host.
const LIVE_BACKEND = 'https://mediumseagreen-crocodile-699024.hostingersite.com';

const normalizeUrl = (value, fallback) => {
  if (!value) return fallback;
  return String(value).replace(/\/+$/, '');
};

const defaultSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || process.env.FRONTEND_URL || 'https://elipsestudio.com';
const defaultApiBase = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || '/api';

export const BACKEND_ORIGIN = normalizeUrl(process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || LIVE_BACKEND, LIVE_BACKEND);
export const SITE_URL = normalizeUrl(defaultSiteUrl, 'https://darkgray-alpaca-239355.hostingersite.com');
export const FRONTEND_HOST = 'https://darkgray-alpaca-239355.hostingersite.com';
export const BACKEND_HOST = BACKEND_ORIGIN;
// Browser: use relative /api (proxied by Next.js rewrites → backend, no CORS)
// Server/build-time: use direct backend origin (no proxy available)
export const API_BASE_URL = typeof window !== 'undefined'
  ? '/api'
  : `${BACKEND_ORIGIN}/api`;

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

export function fixUrls(obj) {
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
    // Hostinger's Node-hosting wrapper + CDN block request bodies whose
    // Content-Type is application/json or text/plain (400 "Bad Request"
    // HTML). The JSON payload is sent as a urlencoded `data` field
    // instead; the backend decodes it back into req.body.
    headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  }
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const config = { method, headers, next };
  if (body) {
    if (isFormData) {
      config.body = body;
    } else {
      config.body = 'data=' + encodeURIComponent(JSON.stringify(body));
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
