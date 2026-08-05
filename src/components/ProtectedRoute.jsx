'use client';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getAdminToken } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = getAdminToken();
    setAuthed(!!token);
    setChecked(true);
  }, []);

  if (!checked) return null;

  if (!authed) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
