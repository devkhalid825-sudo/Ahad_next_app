'use client';

import { useSyncExternalStore } from 'react';

function subscribeToMobileQuery(callback) {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(max-width: 767px)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
}

const getIsMobileSnapshot = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 767px)').matches;
};

// Return null on server / during initial hydration check so components can
// choose a safe initial render or render a responsive wrapper without mismatch.
const getIsMobileServerSnapshot = () => null;

export function useIsMobile() {
  return useSyncExternalStore(
    subscribeToMobileQuery,
    getIsMobileSnapshot,
    getIsMobileServerSnapshot
  );
}
