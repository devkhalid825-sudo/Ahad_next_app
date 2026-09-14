import industriesJson from './industriesData.json';

export const industriesData = industriesJson;

/**
 * Server-side / async getter functions
 */
export async function getIndustries() {
  return industriesJson;
}

export async function getIndustryBySlug(slug) {
  return industriesJson.find((ind) => ind.slug === slug) || null;
}

export default industriesData;
