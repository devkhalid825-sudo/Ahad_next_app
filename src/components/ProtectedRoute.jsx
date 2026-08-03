'use client';
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [authed, setAuthed] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let token = null;
    try {
      token = typeof window !== 'undefined' ? localStorage.getItem('adminToken') : null;
    } catch (e) {
      token = null;
    }
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
