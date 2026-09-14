export const PROJECT_VALUE_PROPOSITIONS = {
  'volvo-configurator':
    'Real-time WebGL steering wheel configurator for Volvo — sub-2MB, 60fps, Shopify-integrated with 34% conversion uplift.',
  'steering-configurator':
    'High-performance WebGL steering wheel customizer with dynamic materials, real-time lighting, and sub-second load times.',
  'ahmed-food':
    'High-fidelity 3D product visualization and CGI animation pipeline for Ahmed Food packaging, cutting campaign turnaround by 70%.',
  'lahore-zoo':
    'Photorealistic 3D architectural walkthrough and wildlife habitat animation for Lahore Zoo, driving pre-launch public engagement.',
  'inverex':
    'Interactive 3D solar inverter configurator for Inverex, enabling real-time product customization and accelerated B2B sales.',
  'inverex-configurator':
    'Interactive 3D solar inverter configurator for Inverex, enabling real-time product customization and accelerated B2B sales.',
  'tim-barth':
    'Custom interactive 3D digital twin and visualization delivered for Tim Barth, accelerating stakeholder sign-offs by 40%.',
  'gabani-emerald':
    'Immersive 3D architectural visualization and interactive sales gallery for Gabani Emerald luxury residences.',
  'villa-luxury':
    'Ultra-realistic architectural CGI and cinematic walkthrough film for private luxury villa development.',
  'luxury-villa':
    'Ultra-realistic architectural CGI and cinematic walkthrough film for private luxury villa development.',
  'malka-food':
    'Commercial 3D packaging renders and dynamic particle CGI animations for Malka Food culinary product lines.',
  'costa-cart':
    'Real-time 3D golf cart and utility vehicle configurator with instant accessory visualization and quote generation.',
  'space-explorer-vr':
    'Interactive 6DOF VR space exploration simulation developed for educational and institutional training.',
  'boat-configurator':
    'High-definition real-time 3D boat and yacht customizer featuring dynamic hull materials and custom trim packages.',
  'anamorphic-animation':
    'Impactful 3D anamorphic billboard animation engineered for high-traffic public displays and viral reach.',
  'industrial-animation':
    'Precise mechanical and industrial CGI animations explaining complex engineering systems with photoreal accuracy.',
  'khoj-villas':
    'Architectural CGI visualizations and virtual walkthroughs showcasing eco-luxury resort living.',
  'kia-configurator':
    'Interactive 3D automotive vehicle configurator with real-time exterior paint, wheels, and interior trims.',
  'seat-configurator':
    'Browser-based 3D automotive seating customizer delivering photoreal textures, stitching, and ergonomic views.',
  'towel-configurator':
    'Interactive WebGL textile and fabric configurator featuring physical thread simulation and instant colorways.',
  'yacht-configurator':
    'Luxury marine yacht configurator offering real-time deck, interior finishes, and hull customization in WebGL.',
};

export const CATEGORY_FALLBACKS = {
  Configurator: 'Interactive 3D configurator driving customer engagement and conversion',
  VR: 'Immersive virtual reality experience built for commercial and enterprise applications',
  AR: 'High-fidelity augmented reality bridging digital interaction with physical spaces',
  Animation: 'Cinematic 3D animation engineered for brand storytelling and product launches',
  Web: 'High-performance interactive web application built for measurable business results',
  Architecture: 'Photorealistic architectural visualization and cinematic walkthroughs that sell properties',
  'Tour 360': 'Interactive 360 virtual tour showcasing every space with photoreal precision',
};

/**
 * Extracts a normalized slug string from path or slug or title.
 */
function normalizeSlug(slugOrPathOrTitle = '') {
  return String(slugOrPathOrTitle)
    .toLowerCase()
    .replace(/^https?:\/\/[^/]+/i, '')
    .replace(/^\/(project|case-study)\//i, '')
    .replace(/^\/+|\/+$/g, '')
    .trim();
}

/**
 * Resolves a unique value proposition for a project, avoiding duplicate content signals.
 */
export function getProjectValueProposition(project) {
  if (!project) return 'Real results delivered through immersive creative technology.';

  const slug = normalizeSlug(project.slug || project.path || project.title || '');

  // 1. Direct slug or title match
  if (PROJECT_VALUE_PROPOSITIONS[slug]) {
    return PROJECT_VALUE_PROPOSITIONS[slug];
  }

  // 2. Fuzzy match across keys
  for (const [key, value] of Object.entries(PROJECT_VALUE_PROPOSITIONS)) {
    if (slug.includes(key) || key.includes(slug)) {
      return value;
    }
  }

  // 3. Check for specific title words (e.g., 'Volvo', 'Ahmed', 'Inverex')
  const titleLower = String(project.title || '').toLowerCase();
  if (titleLower.includes('volvo')) return PROJECT_VALUE_PROPOSITIONS['volvo-configurator'];
  if (titleLower.includes('ahmed')) return PROJECT_VALUE_PROPOSITIONS['ahmed-food'];
  if (titleLower.includes('lahore')) return PROJECT_VALUE_PROPOSITIONS['lahore-zoo'];
  if (titleLower.includes('inverex')) return PROJECT_VALUE_PROPOSITIONS['inverex'];
  if (titleLower.includes('barth')) return PROJECT_VALUE_PROPOSITIONS['tim-barth'];

  // 4. Custom CMS description or metaDescription if available and meaningful
  const customDesc = (project.metaDescription || project.description || '').replace(/<[^>]*>/g, '').trim();
  if (customDesc && customDesc.length > 20 && !customDesc.toLowerCase().includes('brand story')) {
    return customDesc.length > 160 ? `${customDesc.slice(0, 157)}...` : customDesc;
  }

  // 5. Category-based fallback
  const cat = project.category || '';
  if (CATEGORY_FALLBACKS[cat]) {
    return CATEGORY_FALLBACKS[cat];
  }

  return 'Real results delivered through immersive creative technology.';
}
