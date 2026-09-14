// Live backend origin — used for image URLs. Next.js rewrites proxy /api/* and /uploads/* to this host.
const LIVE_BACKEND = 'https://api.elipsestudio.com';

const normalizeUrl = (value, fallback) => {
  if (!value) return fallback;
  return String(value).replace(/\/+$/, '');
};

const defaultSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || process.env.FRONTEND_URL || 'https://elipsestudio.com';
const defaultApiBase = process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || '/api';

export const BACKEND_ORIGIN = normalizeUrl(process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL || LIVE_BACKEND, LIVE_BACKEND);
export const SITE_URL = normalizeUrl(defaultSiteUrl, 'https://elipsestudio.com');
export const FRONTEND_HOST = 'https://elipsestudio.com';
export const BACKEND_HOST = BACKEND_ORIGIN;
// Always call the backend origin directly (api.elipsestudio.com in production),
// so requests never stop at the Next.js proxy / dev server. The backend CORS
// allowlist includes elipsestudio.com, localhost:3000 and localhost:5173.
export const API_BASE_URL = `${BACKEND_ORIGIN}/api`;

export function getImgSrc(img) {
  if (!img) return '';
  if (typeof img === 'object') {
    return img.src || (img.default && img.default.src) || img.default || '';
  }
  return img;
}

// Images always come from the production CDN origin (api.elipsestudio.com),
// regardless of which backend the form/API calls target during development.
export const IMAGE_ORIGIN = 'https://api.elipsestudio.com';

// Normalize any upload image URL (relative /uploads/*, or any origin) to the
// canonical CDN URL so blog/project/case-study cards never rely on the dev
// backend. Non-upload/absolute URLs (YouTube, Cloudinary) pass through.
export function toCdnUrl(img) {
  if (!img) return img;
  let str = img;
  if (typeof str !== 'string') {
    str = str.url || str.src || str.srcSet || '';
  }
  if (typeof str !== 'string' || !str) return img;
  if (str.startsWith('data:')) return str;
  if (str.startsWith('/uploads/')) return `${IMAGE_ORIGIN}${str}`;
  const m = str.match(/^https?:\/\/[^/]+(\/.*)$/);
  if (m && m[1].startsWith('/uploads/')) return `${IMAGE_ORIGIN}${m[1]}`;
  return str;
}

// Convert any upload image URL to a relative /uploads/* path so the
// Next.js rewrite proxy (next.config.ts) serves it — this avoids CORS issues.
function toRelativeUpload(url) {
  if (!url || typeof url !== 'string') return url;
  let str = url;
  // Strip api.elipsestudio.com origin to get relative /uploads/* path
  if (str.includes('api.elipsestudio.com')) {
    str = str.replace('https://api.elipsestudio.com', '');
  }
  // Already relative
  if (str.startsWith('/uploads/')) return str;
  // Absolute URL pointing to any backend /uploads/
  const match = str.match(/^https?:\/\/[^/]+(\/.*)$/);
  if (match && match[1].startsWith('/uploads/')) return match[1];
  return str;
}

export function fixUrls(obj) {
  if (typeof obj === 'string') {
    let str = obj;
    // Strip api.elipsestudio.com origin to get relative /uploads/* path
    if (str.includes('api.elipsestudio.com')) {
      str = str.replace('https://api.elipsestudio.com', '');
    }
    const relative = toRelativeUpload(str);
    if (relative !== str) return relative;
    const cleaned = str.replace(/:(\/\/)/g, '~PROTO~').replace(/\/+/g, '/').replace(/~PROTO~/g, '://');
    return cleaned;
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
