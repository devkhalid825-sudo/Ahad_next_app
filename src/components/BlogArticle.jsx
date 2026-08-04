﻿'use client';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { apiCall, getYoutubeEmbed } from '../utils/api';
import AhmedFoodLayout from './AhmedFoodLayout';

const BlogArticle = ({ slug, initialData }) => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState(initialData || null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState('');

    useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (!slug || initialData) return;
    const fetchBlog = async () => {
      setLoading(true);
      setError('');
      try {
        const { data, status } = await apiCall(`/blogs/${slug}`, 'GET');
        if (status === 200) setBlog(data);
        else setError('Blog not found');
      } catch {
        setError('Failed to load blog');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-2 border-[#4169E1]/30 border-t-[#4169E1] rounded-full animate-spin" />
    </div>
  );

  if (error || !blog) return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center px-6 gap-6">
      <span className="text-[120px] md:text-[200px] font-black text-[#1A1A1A] block leading-none">404</span>
      <p className="text-lg text-white/40 font-light -mt-4">{error}</p>
      <button onClick={() => navigate('/blog')} className="flex items-center gap-2 bg-[#4169E1] text-white px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#3158D4] transition-all">
        <FiArrowLeft /> Back to Blogs
      </button>
    </div>
  );

  const meta = [
    ...(blog.category ? [{ label: 'Category', value: blog.category }] : []),
    ...(blog.date ? [{ label: 'Date', value: blog.date }] : []),
  ];

  let sections = [];
  if (blog.sections) {
    try { sections = typeof blog.sections === 'string' ? JSON.parse(blog.sections) : blog.sections; } catch (e) {}
  }

  const gallery = sections.filter(s => s.image).map(s => s.image);
  if (blog.image2) gallery.push(blog.image2);
  if (blog.image3) gallery.push(blog.image3);
  if (blog.image4) gallery.push(blog.image4);

  return (
    <>
      
      <AhmedFoodLayout
        title={blog.title}
        meta={meta}
        heroVideo={blog.video ? getYoutubeEmbed(blog.video) : undefined}
        heroImage={blog.image}
        overview={blog.excerpt || ''}
        challenge={sections[0]?.content || ''}
        content={blog.content || ''}
        sections={sections}
        gallery={gallery}
      />
    </>
  );
};

export default BlogArticle;
