'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiCall, uploadFile, getYoutubeEmbed } from '../utils/api';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiImage, FiSave, FiUpload, FiChevronUp, FiChevronDown, FiMove } from 'react-icons/fi';
import HtmlEditor from './ui/HtmlEditor';
import SectionBuilder from './ui/SectionBuilder';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const SortableBlogItem = ({ blog, onEdit, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: blog.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 10 : 1,
    position: 'relative',
  };

  return (
    <div ref={setNodeRef} style={style} className={`bg-white border border-[#0D0D0D]/20 p-3 md:p-5 rounded-[1rem] md:rounded-[1.5rem] hover:border-[#0D0D0D]/30 transition-all flex items-center gap-2 md:gap-4 group ${isDragging ? 'shadow-[0_0_30px_rgba(65,105,225,0.15)]' : ''}`}>
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 md:p-1.5 text-[#0D0D0D]/60 hover:text-[#4169E1] transition-colors shrink-0">
        <FiMove className="text-sm md:text-lg" />
      </div>
      <div className="w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-xl overflow-hidden bg-[#0D0D0D]/10 shrink-0">
        <img src={blog.image} alt="" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; }} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs md:text-base font-black tracking-tight text-[#0D0D0D] truncate">{blog.title}</h4>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[6px] md:text-[8px] text-[#0D0D0D]/70 font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] mt-0.5 md:mt-1">
          <span>{blog.date}</span>
          <span className="w-1 h-1 rounded-full bg-[#4169E1]/40 shrink-0"></span>
          <span>{blog.category}</span>
          <span className="w-1 h-1 rounded-full bg-[#4169E1]/40 shrink-0"></span>
          <span className="truncate max-w-[60px] md:max-w-none">/{blog.slug}</span>
        </div>
      </div>
      <div className="flex flex-row md:flex-col gap-0.5 md:gap-1">
        <button onClick={() => onMoveUp(blog.id)} disabled={isFirst} className="p-1 md:p-1.5 bg-[#0D0D0D]/10 text-[#0D0D0D]/60 hover:text-[#4169E1] hover:bg-[#0D0D0D]/10 rounded-lg transition-all disabled:opacity-20 disabled:cursor-not-allowed">
          <FiChevronUp className="text-[10px] md:text-xs" />
        </button>
        <button onClick={() => onMoveDown(blog.id)} disabled={isLast} className="p-1 md:p-1.5 bg-[#0D0D0D]/10 text-[#0D0D0D]/60 hover:text-[#4169E1] hover:bg-[#0D0D0D]/10 rounded-lg transition-all disabled:opacity-20 disabled:cursor-not-allowed">
          <FiChevronDown className="text-[10px] md:text-xs" />
        </button>
      </div>
      <div className="flex items-center gap-1 md:gap-2">
        <button onClick={() => onEdit(blog)} className="p-1.5 md:p-2.5 bg-[#0D0D0D]/10 text-[#0D0D0D]/60 hover:text-[#4169E1] hover:bg-[#0D0D0D]/10 rounded-lg md:rounded-xl transition-all">
          <FiEdit2 className="text-[10px] md:text-sm" />
        </button>
        <button onClick={() => onDelete(blog.id)} className="p-1.5 md:p-2.5 bg-red-500/5 text-red-500/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg md:rounded-xl transition-all">
          <FiTrash2 className="text-[10px] md:text-sm" />
        </button>
      </div>
    </div>
  );
};

const BlogDashboard = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', metaTitle: '', metaDescription: '', slug: '', excerpt: '', content: '', sections: [], image: '', image2: '', image3: '', image4: '', video: '', heroType: 'image', category: '', date: '' });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingSection, setUploadingSection] = useState(null);
  const [msg, setMsg] = useState('');

  const token = localStorage.getItem('adminToken');

  const fetchBlogs = async () => {
    setLoading(true);
    const { data, status } = await apiCall('/blogs', 'GET');
    if (status === 200) setBlogs(data);
    else setMsg('Failed to load blogs');
    setLoading(false);
  };

  useEffect(() => { fetchBlogs(); }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const persistOrder = useCallback(async (ordered) => {
    const items = ordered.map((b, i) => ({ id: b.id, position: i }));
    const { status } = await apiCall('/blogs/reorder', 'PUT', { items }, token);
    if (status !== 200) {
      setMsg('Failed to save order');
      setTimeout(() => setMsg(''), 3000);
    }
  }, [token]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setBlogs((prev) => {
      const oldIndex = prev.findIndex((b) => b.id === active.id);
      const newIndex = prev.findIndex((b) => b.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      const updated = [...prev];
      const [moved] = updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, moved);
      persistOrder(updated);
      return updated;
    });
  };

  const moveBlog = (id, direction) => {
    setBlogs((prev) => {
      const index = prev.findIndex((b) => b.id === id);
      if (index === -1) return prev;
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const updated = [...prev];
      const temp = updated[index];
      updated[index] = updated[newIndex];
      updated[newIndex] = temp;
      persistOrder(updated);
      return updated;
    });
  };

  const generateSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm(f => ({ ...f, title, slug: editing ? f.slug : generateSlug(title) }));
  };

  const openNewForm = () => {
    setEditing(null);
    setForm({ title: '', metaTitle: '', metaDescription: '', slug: '', excerpt: '', content: '', sections: [{ content: '', image: '' }, { content: '', image: '' }, { content: '', image: '' }, { content: '', image: '' }, { content: '', image: '' }], image: '', image2: '', image3: '', image4: '', video: '', heroType: 'image', category: '', date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase() });
    setShowForm(true);
  };

  const openEditForm = (blog) => {
    setEditing(blog);
    let sections = blog.sections;
    if (typeof sections === 'string') { try { sections = JSON.parse(sections); } catch (e) { sections = []; } }
    if (!sections || sections.length === 0) sections = [{ content: '', image: '' }, { content: '', image: '' }, { content: '', image: '' }, { content: '', image: '' }, { content: '', image: '' }];
    setForm({ title: blog.title, metaTitle: blog.metaTitle || '', metaDescription: blog.metaDescription || '', slug: blog.slug, excerpt: blog.excerpt, content: blog.content, sections, image: blog.image, image2: blog.image2 || '', image3: blog.image3 || '', image4: blog.image4 || '', video: blog.video || '', heroType: (blog.video && !blog.image) ? 'video' : 'image', category: blog.category, date: blog.date });
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');

    const { heroType, ...formWithoutToggle } = form;
    const payload = { ...formWithoutToggle, video: form.heroType === 'video' ? form.video : '', sections: JSON.stringify(form.sections) };
    let res;
    if (editing) {
      res = await apiCall(`/blogs/${editing.id}`, 'PUT', payload, token);
    } else {
      res = await apiCall('/blogs', 'POST', payload, token);
    }

    if (res.status === 200 || res.status === 201) {
      setMsg(editing ? 'Blog updated successfully!' : 'Blog created successfully!');
      setShowForm(false);
      setEditing(null);
      fetchBlogs();
    } else {
      setMsg(res.data?.message || 'Failed to save blog');
    }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  const handleImageUpload = async (file, imgKey) => {
    if (!file) return;
    setUploading(true);
    setMsg('');

    const res = await uploadFile('/upload', file, 'blogs', token);
    if (res.status === 200 && res.data.url) {
      setForm(f => ({ ...f, [imgKey]: res.data.url }));
    } else {
      setMsg('Upload failed');
      setTimeout(() => setMsg(''), 3000);
    }
    setUploading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog post?')) return;
    const { status } = await apiCall(`/blogs/${id}`, 'DELETE', null, token);
    if (status === 200) {
      setMsg('Blog deleted');
      fetchBlogs();
    } else {
      setMsg('Delete failed');
    }
    setTimeout(() => setMsg(''), 3000);
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-t-2 border-[#4169E1] border-solid rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div>
      {msg && (
        <div className="fixed top-24 right-6 left-6 md:left-auto md:top-8 md:right-8 z-[60] bg-[#4169E1] text-white px-6 py-4 rounded-2xl shadow-[0_0_30px_rgba(65,105,225,0.3)] font-bold flex items-center gap-3 animate-in fade-in text-[10px] uppercase tracking-widest">
           <FiSave size={18} /> {msg}
         </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 md:mb-8">
        <div>
          <h3 className="text-base md:text-lg font-black uppercase tracking-tight">Blog Posts</h3>
          <p className="text-[#0D0D0D]/60 text-[7px] md:text-[8px] uppercase tracking-widest mt-1">Manage your blog content — drag to reorder</p>
        </div>
        <button
          onClick={openNewForm}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#4169E1] text-white font-black px-5 py-3 rounded-xl hover:bg-[#0D0D0D] transition-all text-[8px] uppercase tracking-[0.2em]"
        >
          <FiPlus /> New Blog
        </button>
      </div>

      {blogs.length === 0 ? (
        <div className="bg-white border border-[#0D0D0D]/20 border-dashed rounded-[2rem] p-16 md:p-32 text-center">
          <FiImage className="text-3xl md:text-4xl text-[#0D0D0D]/40 mx-auto mb-4" />
          <p className="text-[#0D0D0D]/50 text-[9px] font-bold tracking-[0.4em] uppercase">No Blogs Yet</p>
          <button onClick={openNewForm} className="mt-4 text-[#4169E1] text-[8px] uppercase tracking-widest underline underline-offset-4">Create your first blog post</button>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={blogs.map(b => b.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {blogs.map((blog, index) => (
                <SortableBlogItem
                  key={blog.id}
                  blog={blog}
                  onEdit={openEditForm}
                  onDelete={handleDelete}
                  onMoveUp={(id) => moveBlog(id, -1)}
                  onMoveDown={(id) => moveBlog(id, 1)}
                  isFirst={index === 0}
                  isLast={index === blogs.length - 1}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Blog Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-[#0D0D0D]/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4" onClick={() => setShowForm(false)}>
          <div className="bg-white border border-[#0D0D0D]/20 rounded-xl md:rounded-[2rem] w-full max-w-3xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 md:p-8 border-b border-[#0D0D0D]/20">
              <h3 className="text-sm md:text-lg font-black uppercase tracking-tight text-[#0D0D0D]">{editing ? 'Edit Blog' : 'New Blog Post'}</h3>
              <button onClick={() => setShowForm(false)} className="p-1.5 md:p-2 bg-[#0D0D0D]/10 text-[#0D0D0D]/60 hover:text-[#0D0D0D] rounded-xl transition-all">
                <FiX size={16} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-4 md:p-8 space-y-4 md:space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="md:col-span-2">
                  <label className="block text-[#0D0D0D]/60 text-[8px] uppercase tracking-widest mb-2">Title</label>
                  <input type="text" required value={form.title} onChange={handleTitleChange} className="w-full bg-[#0D0D0D]/10 border border-[#0D0D0D]/20 rounded-xl px-4 py-3 text-[#0D0D0D] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#0D0D0D]/30" placeholder="Blog title" />
                </div>
                <div>
                  <label className="block text-[#0D0D0D]/60 text-[8px] uppercase tracking-widest mb-2">Slug (no slashes)</label>
                  <input type="text" required value={form.slug} onChange={(e) => setForm(f => ({ ...f, slug: e.target.value.replace(/[\/\\]/g, '') }))} className="w-full bg-[#0D0D0D]/10 border border-[#0D0D0D]/20 rounded-xl px-4 py-3 text-[#0D0D0D] focus:border-[#4169E1] outline-none transition-all text-xs font-mono placeholder:text-[#0D0D0D]/30" placeholder="blog-url-slug" />
                </div>
                <div>
                  <label className="block text-[#0D0D0D]/60 text-[8px] uppercase tracking-widest mb-2">Category</label>
                  <input type="text" required value={form.category} onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))} className="w-full bg-[#0D0D0D]/10 border border-[#0D0D0D]/20 rounded-xl px-4 py-3 text-[#0D0D0D] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#0D0D0D]/30" placeholder="e.g. Innovation" />
                </div>
                <div>
                  <label className="block text-[#0D0D0D]/60 text-[8px] uppercase tracking-widest mb-2">Date</label>
                  <input type="text" required value={form.date} onChange={(e) => setForm(f => ({ ...f, date: e.target.value }))} className="w-full bg-[#0D0D0D]/10 border border-[#0D0D0D]/20 rounded-xl px-4 py-3 text-[#0D0D0D] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#0D0D0D]/30" placeholder="JUNE 09, 2026" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[#0D0D0D]/60 text-[8px] uppercase tracking-widest mb-3">Images</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3">
                    {['image', 'image2', 'image3', 'image4'].map((imgKey, idx) => (
                      <div key={imgKey}>
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <label className={`flex-1 flex items-center justify-center gap-1.5 md:gap-2 border border-dashed border-[#0D0D0D]/20 rounded-lg md:rounded-xl px-2 md:px-3 py-2 md:py-3 cursor-pointer hover:border-[#4169E1]/50 transition-all ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                            <FiUpload className={`${uploading ? 'animate-bounce text-[#4169E1]' : 'text-[#0D0D0D]/60'} text-[8px] md:text-[10px]`} />
                            <span className="text-[#0D0D0D]/60 text-[6px] md:text-[7px] font-bold uppercase tracking-widest">{uploading ? '...' : `Img ${idx + 1}`}</span>
                            <input type="file" accept="image/*" onChange={async (e) => {
                              const file = e.target.files[0];
                              await handleImageUpload(file, imgKey);
                            }} className="hidden" disabled={uploading} />
                          </label>
                          {form[imgKey] && (
                            <button type="button" onClick={() => setForm(f => ({ ...f, [imgKey]: '' }))} className="p-1.5 text-red-500/40 hover:text-red-500 transition-all shrink-0">
                              <FiX size={12} />
                            </button>
                          )}
                        </div>
                        {form[imgKey] && (
                          <div className="mt-2 relative w-full h-20 rounded-lg overflow-hidden border border-[#0D0D0D]/20">
                            <img src={form[imgKey]} alt="" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-[#0D0D0D]/60 text-[8px] uppercase tracking-widest mb-2">Hero Type</label>
                  <div className="flex gap-2 mb-4">
                    {['image', 'video'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, heroType: t }))}
                        className={`flex-1 text-[9px] font-bold uppercase tracking-widest px-4 py-3 rounded-xl border transition-all ${form.heroType === t ? 'bg-[#4169E1] text-white border-[#4169E1]' : 'bg-[#0D0D0D]/10 text-[#0D0D0D]/60 border-[#0D0D0D]/20 hover:border-[#4169E1]/50'}`}
                      >
                        {t === 'image' ? 'Image' : 'YouTube Video'}
                      </button>
                    ))}
                  </div>
                  {form.heroType === 'video' && (
                    <input
                      type="text"
                      value={form.video}
                      onChange={(e) => setForm(f => ({ ...f, video: e.target.value }))}
                      className="w-full bg-[#0D0D0D]/10 border border-[#0D0D0D]/20 rounded-xl px-4 py-3 text-[#0D0D0D] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#0D0D0D]/30"
                      placeholder="YouTube URL (watch / youtu.be / embed)"
                    />
                  )}
                </div>

                <div className="md:col-span-2">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-px flex-1 bg-[#0D0D0D]/20" />
                    <span className="text-[#4169E1]/60 text-[8px] uppercase tracking-[0.4em] font-black">SEO Settings</span>
                    <div className="h-px flex-1 bg-[#0D0D0D]/20" />
                  </div>
                </div>
                <div>
                  <label className="block text-[#0D0D0D]/60 text-[8px] uppercase tracking-widest mb-2">Meta Title <span className="text-[#0D0D0D]/40">(optional)</span></label>
                  <input type="text" value={form.metaTitle} onChange={(e) => setForm(f => ({ ...f, metaTitle: e.target.value }))} className="w-full bg-[#0D0D0D]/10 border border-[#0D0D0D]/20 rounded-xl px-4 py-3 text-[#0D0D0D] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#0D0D0D]/30" placeholder="Leave blank to use blog title" />
                </div>
                <div>
                  <label className="block text-[#0D0D0D]/60 text-[8px] uppercase tracking-widest mb-2">Meta Description <span className="text-[#0D0D0D]/40">(optional)</span></label>
                  <input type="text" value={form.metaDescription} onChange={(e) => setForm(f => ({ ...f, metaDescription: e.target.value }))} className="w-full bg-[#0D0D0D]/10 border border-[#0D0D0D]/20 rounded-xl px-4 py-3 text-[#0D0D0D] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#0D0D0D]/30" placeholder="Leave blank to use excerpt" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[#0D0D0D]/60 text-[8px] uppercase tracking-widest mb-2">Excerpt</label>
                  <textarea required value={form.excerpt} onChange={(e) => setForm(f => ({ ...f, excerpt: e.target.value }))} rows={3} className="w-full bg-[#0D0D0D]/10 border border-[#0D0D0D]/20 rounded-xl px-4 py-3 text-[#0D0D0D] focus:border-[#4169E1] outline-none transition-all text-xs resize-none placeholder:text-[#0D0D0D]/30" placeholder="Short description for blog cards" />
                </div>
                <div className="md:col-span-2">
                  <HtmlEditor
                    label="Content (HTML)"
                    value={form.content}
                    onChange={(val) => setForm(f => ({ ...f, content: val }))}
                    minHeight={400}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-[#0D0D0D]/60 text-[8px] uppercase tracking-widest mb-3">Sections (Content + Image)</label>
                  <SectionBuilder
                    sections={form.sections}
                    onChange={(val) => setForm(f => ({ ...f, sections: val }))}
                    onImageUpload={async (index, file) => {
                      setUploadingSection(index);
                      const res = await uploadFile('/upload', file, 'blogs', token);
                      if (res.status === 200 && res.data.url) {
                        const updated = [...form.sections];
                        if (!updated[index]) updated[index] = { content: '', image: '' };
                        updated[index] = { ...updated[index], image: res.data.url };
                        setForm(f => ({ ...f, sections: updated }));
                      }
                      setUploadingSection(null);
                    }}
                    uploading={uploadingSection !== null}
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-[#0D0D0D]/20 text-[#0D0D0D]/60 font-black py-3.5 rounded-xl hover:bg-[#0D0D0D]/10 transition-all text-[8px] uppercase tracking-[0.2em]">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-[#4169E1] text-white font-black py-3.5 rounded-xl hover:bg-[#0D0D0D] transition-all disabled:opacity-50 text-[8px] uppercase tracking-[0.2em]">
                  {saving ? 'Saving...' : editing ? 'Update Blog' : 'Publish Blog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDashboard;
