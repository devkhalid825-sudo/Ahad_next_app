/**
 * Icons.jsx
 *
 * Inline SVG icon components. Zero external dependencies.
 * Replaces react-icons barrel imports (si, pi, ri, tb, fa, fi, hi2, lu)
 * which caused 1.9 MiB + 1.3 MiB + 498 KiB chunks in the treemap.
 *
 * Each icon accepts className and any other SVG props.
 * Default size: 1em × 1em (inherits font-size). Pass className to override.
 */

const svgProps = (extra = {}) => ({
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'currentColor',
  width: '1em',
  height: '1em',
  'aria-hidden': 'true',
  ...extra,
});

// ─── fa ──────────────────────────────────────────────────────────────────────

export const FaWhatsapp = ({ className, ...p }) => (
  <svg {...svgProps()} className={className} {...p}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const FaCheck = ({ className, ...p }) => (
  <svg {...svgProps()} className={className} {...p}>
    <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
  </svg>
);

export const FaPaperPlane = ({ className, ...p }) => (
  <svg {...svgProps()} className={className} {...p}>
    <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
  </svg>
);

export const FaMapMarkerAlt = ({ className, ...p }) => (
  <svg {...svgProps()} className={className} {...p}>
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);

export const FaThLarge = ({ className, ...p }) => (
  <svg {...svgProps()} className={className} {...p}>
    <path d="M10 3H3a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V4a1 1 0 00-1-1zM21 3h-7a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1V4a1 1 0 00-1-1zM10 14H3a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1v-7a1 1 0 00-1-1zM21 14h-7a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1v-7a1 1 0 00-1-1z" />
  </svg>
);

export const FaPhoneAlt = ({ className, ...p }) => (
  <svg {...svgProps()} className={className} {...p}>
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
  </svg>
);

// ─── fi ──────────────────────────────────────────────────────────────────────

export const FiSearch = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export const FiArrowLeft = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
  </svg>
);

export const FiArrowRight = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

export const FiFacebook = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
  </svg>
);

export const FiPhone = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.02 1.18 2 2 0 012 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92v2z" />
  </svg>
);

export const FiMail = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
  </svg>
);

export const FiEye = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

export const FiEyeOff = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

export const FiLock = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
  </svg>
);

export const FiLogIn = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" y1="12" x2="3" y2="12" />
  </svg>
);

export const FiX = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

export const FiPlus = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

export const FiTrash2 = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

export const FiSave = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
  </svg>
);

export const FiMove = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <polyline points="5 9 2 12 5 15" /><polyline points="9 5 12 2 15 5" /><polyline points="15 19 12 22 9 19" /><polyline points="19 9 22 12 19 15" /><line x1="2" y1="12" x2="22" y2="12" /><line x1="12" y1="2" x2="12" y2="22" />
  </svg>
);

export const FiEdit2 = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

export const FiUpload = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <polyline points="16 16 12 12 8 16" /><line x1="12" y1="12" x2="12" y2="21" /><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3" />
  </svg>
);

export const FiChevronUp = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <polyline points="18 15 12 9 6 15" />
  </svg>
);

export const FiChevronDown = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export const FiVideo = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

export const FiImage = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
  </svg>
);

export const FiFolder = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z" />
  </svg>
);

export const FiStar = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export const FiCode = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);

export const FiMaximize2 = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" /><line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);

export const FiCheckCircle = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// ─── si (brands) ─────────────────────────────────────────────────────────────

export const SiCalendly = ({ className, ...p }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true" className={className} {...p}>
    <path d="M19.578 4.432A11.944 11.944 0 0012.005.006C5.378.006 0 5.383 0 12.01S5.378 24.014 12.005 24.014c3.015 0 5.765-1.113 7.849-2.944l-2.577-2.578a8.3 8.3 0 01-5.272 1.885C7.634 20.377 3.638 16.38 3.638 12s3.996-8.378 8.367-8.378a8.3 8.3 0 015.507 2.077l2.066-1.267zm1.437 1.437l-9.01 9.01-2.577-2.578 2.19-2.19 6.82-6.82 2.577 2.578z" />
  </svg>
);

export const SiInstagram = ({ className, ...p }) => (
  <svg {...svgProps()} className={className} {...p}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

export const SiUnrealengine = ({ className, ...p }) => (
  <svg {...svgProps()} className={className} {...p}>
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 2.182a9.818 9.818 0 110 19.636A9.818 9.818 0 0112 2.182zm0 1.636C7.394 3.818 3.818 7.394 3.818 12c0 4.606 3.576 8.182 8.182 8.182S20.182 16.606 20.182 12c0-4.606-3.576-8.182-8.182-8.182zm-2.182 3.273h4.364l1.09 1.09v4.365l-1.09 1.09H9.818V7.091zm1.09 1.09v4.364h2.183V8.182h-2.182z" />
  </svg>
);

export const SiAutodesk = ({ className, ...p }) => (
  <svg {...svgProps()} className={className} {...p}>
    <path d="M0 0v24h24V0H0zm12.8 18.133H4.267L8.533 5.867h4.267l4.267 12.266H12.8zm4.267 0l-2.134-6.133 2.134-6.133 2.133 6.133-2.133 6.133z" />
  </svg>
);

export const SiCoronarenderer = ({ className, ...p }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true" className={className} {...p}>
    <path d="M12 1L2 6.5v11L12 23l10-5.5v-11L12 1zm0 2.236l8 4.4v9.128l-8 4.4-8-4.4V7.636l8-4.4zm0 3L7 9v6l5 2.764L17 15V9l-5-2.764zm0 2.236l3 1.652V13.5l-3 1.652L9 13.5v-3.376L12 8.472z" />
  </svg>
);

export const SiUnity = ({ className, ...p }) => (
  <svg {...svgProps()} className={className} {...p}>
    <path d="M13.229.896l5.367 9.295-5.367 9.296H2.496L-.87 13.19l.001 0L2.496.896h10.733zm-.875 1.476H3.371L.542 7.158 9.88 7.16l2.474-4.787zm-9.984.002L-.5 8.191l2.898 4.948 4.906-8.495-4.934-.27zm11.82 3.786l-2.476 4.79 2.477 4.793 2.476-4.793-2.477-4.79zM2.4 14.76l-.003.001-.003-.001H2.39L-.5 9.837l2.898 4.923 4.934.27-4.836 8.349.004.007zm.971 1.685l9.984-.002-2.474-4.788-9.338.003 1.828 4.787zm10.858-.159l-5.367 3.31 5.367 3.312 5.367-3.312-5.367-3.31z" />
  </svg>
);

export const SiBlender = ({ className, ...p }) => (
  <svg {...svgProps()} className={className} {...p}>
    <path d="M12.51 13.214c.046-.8.438-1.538 1.078-2.026a3.45 3.45 0 012.21-.773 3.45 3.45 0 012.211.773 3.26 3.26 0 011.078 2.026 3.259 3.259 0 01-.513 2.16 3.449 3.449 0 01-1.828 1.32 3.45 3.45 0 01-2.29-.13 3.26 3.26 0 01-1.656-1.49 3.259 3.259 0 01-.29-1.86zM9.105 17.21l-6.95 3.85a.546.546 0 01-.72-.24.546.546 0 01.24-.72l6.95-3.85a5.432 5.432 0 01-.09-1.25l-7-3.41a.55.55 0 01-.25-.73.55.55 0 01.73-.25l7 3.41a5.337 5.337 0 011.91-1.98l-2.15-7.56a.547.547 0 01.88-.55l5.75 5.86a5.436 5.436 0 012.35.06l3.89-5.82a.549.549 0 01.92.6l-3.89 5.82a5.348 5.348 0 012.12 3.33l6.1.37a.546.546 0 01.51.58.546.546 0 01-.58.51l-6.1-.37a5.365 5.365 0 01-1.44 2.42l2.73 6.75a.546.546 0 01-.3.71.546.546 0 01-.71-.3l-2.73-6.75a5.384 5.384 0 01-2.32.31l-3.22 6.52a.547.547 0 01-.72.25.547.547 0 01-.25-.72l3.22-6.52a5.355 5.355 0 01-1.84-2.28z" />
  </svg>
);

export const SiPlaycanvas = ({ className, ...p }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em" aria-hidden="true" className={className} {...p}>
    <path d="M0 0v24h24V0H0zm12 3.6l7.2 4.8L12 13.2V3.6zm-7.2 4.8L12 13.2v4.8L4.8 8.4zM12 13.2l7.2 4.8H4.8L12 13.2z" />
  </svg>
);

// ─── tb (Tabler brands) ───────────────────────────────────────────────────────

export const TbBrandLinkedin = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M4 6a2 2 0 104 0 2 2 0 00-4 0M4 10h4v10H4zM12 10h3.4v1.4a3.6 3.6 0 013.6-1.4 4 4 0 014 4V20h-4v-5.6a2.4 2.4 0 00-2.4-2.4 2.4 2.4 0 00-2.6 2.4V20h-4V10z" />
  </svg>
);

export const TbBrandAdobePhotoshop = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM7 17V7h4a3 3 0 010 6H7m10 4v-3a2 2 0 00-4 0v3m0-3h4" />
  </svg>
);

export const TbBrandAdobeAfterEffect = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M3 5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm4 12l3-8 3 8m-5-3h4m4-5v8" />
  </svg>
);

// ─── ri ──────────────────────────────────────────────────────────────────────

export const RiYoutubeLine = ({ className, ...p }) => (
  <svg {...svgProps()} className={className} {...p}>
    <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z" />
  </svg>
);

// ─── pi ──────────────────────────────────────────────────────────────────────

export const PiTiktokLogo = ({ className, ...p }) => (
  <svg {...svgProps()} className={className} {...p}>
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.28 8.28 0 004.83 1.56V6.78a4.85 4.85 0 01-1.06-.09z" />
  </svg>
);

// ─── hi2 ─────────────────────────────────────────────────────────────────────

export const HiOutlineBolt = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

export const HiOutlineBuildingStorefront = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
  </svg>
);

export const HiOutlineCube = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
  </svg>
);

export const HiOutlineHomeModern = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21H7.5V3.545M3 21h18M3.545 3H20.5m0 0L12 3.545M20.5 3l-8.5.545" />
  </svg>
);

export const HiOutlineBuildingOffice2 = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
  </svg>
);

export const HiOutlineShoppingBag = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
  </svg>
);

export const HiOutlineBeaker = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1 1 .03 2.798-1.414 2.798H4.212c-1.444 0-2.414-1.798-1.414-2.798L4.5 15.3" />
  </svg>
);

export const HiOutlineTruck = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
  </svg>
);

// ─── lu ──────────────────────────────────────────────────────────────────────

export const LuPaintbrush = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M18.37 2.63L14 7l-1.59-1.59-5.66 5.66 1.06 1.06-6.22 6.22v3.03H4.6l6.22-6.22 1.06 1.06 5.66-5.66L16 9l4.37-4.37a1 1 0 00-2-2z" /><path d="M9 8c0 1.1.9 2 2 2s2-.9 2-2" />
  </svg>
);

export const LuDroplet = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" />
  </svg>
);

export const LuBox = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
);

export const LuSofa = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M20 9V6a2 2 0 00-2-2H6a2 2 0 00-2 2v3" /><path d="M2 16a2 2 0 002 2h16a2 2 0 002-2v-5a2 2 0 00-4 0v2H6v-2a2 2 0 00-4 0v5z" /><path d="M6 18v2M18 18v2" />
  </svg>
);

export const LuFactory = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M2 20a2 2 0 002 2h16a2 2 0 002-2V8l-7 5V8l-7 5V4a2 2 0 00-2-2H4a2 2 0 00-2 2v16z" /><path d="M17 18h1M12 18h1M7 18h1" />
  </svg>
);

export const LuRuler = ({ className, ...p }) => (
  <svg {...svgProps({ fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' })} className={className} {...p}>
    <path d="M5 8l3 3-5.5 5.5a2.121 2.121 0 003 3L11 14l3 3 7-7-3-3-1.5 1.5-2-2 1.5-1.5-3-3L5 8z" /><path d="M7 10l1.5 1.5M11 14l1.5 1.5" />
  </svg>
);
