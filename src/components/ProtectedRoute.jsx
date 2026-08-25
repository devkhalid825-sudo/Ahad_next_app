'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAdminToken } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);

  // One-time auth check on mount: reads a token from storage (can't happen
  // during render since it's a browser-only API and triggers navigation as
  // a side effect) and sets local state once, before the child ever renders.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      router.replace('/admin/login');
    } else {
      setAuthed(true);
    }
    setChecked(true);
  }, [router]);
  /* eslint-enable react-hooks/set-state-in-effect */

  if (!checked || !authed) return null;

  return children;
};

export default ProtectedRoute;
