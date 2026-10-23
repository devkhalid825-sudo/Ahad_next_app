/**
 * Helper to determine if a project or case study has been marked as hidden.
 * Checks multiple levels (top-level properties, status, and metadata inside sections[0]).
 */
export const isProjectHidden = (item) => {
  if (!item) return false;
  if (
    item.hidden === true ||
    item.hidden === 'true' ||
    item.isHidden === true ||
    item.isHidden === 'true' ||
    item.status === 'hidden'
  ) {
    return true;
  }

  if (item.sections) {
    try {
      const s = typeof item.sections === 'string' ? JSON.parse(item.sections) : item.sections;
      if (Array.isArray(s) && (s[0]?.hidden === true || s[0]?.hidden === 'true')) {
        return true;
      }
    } catch {
      // ignore parse error
    }
  }

  return false;
};
