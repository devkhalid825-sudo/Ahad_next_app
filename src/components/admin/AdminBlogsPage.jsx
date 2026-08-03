'use client';

import React from 'react';
import BlogDashboard from '../BlogDashboard';

const AdminBlogsPage = () => {
    return (
    <>
      
      <header className="mb-6 md:mb-8">
        <h2 className="text-2xl md:text-4xl font-black tracking-tight uppercase bg-gradient-to-r from-[#4169E1] to-[#8B5CF6] bg-clip-text text-transparent">Blog Management</h2>
        <div className="h-0.5 w-8 bg-[#4169E1] mt-3 rounded-full" />
        <p className="text-[#0D0D0D]/70 text-[11px] md:text-sm mt-3 font-light max-w-md leading-relaxed">
          Create, edit, and manage blog content with SEO controls.
        </p>
      </header>
      <BlogDashboard />
    </>
  );
};

export default AdminBlogsPage;
