'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiCall, BACKEND_ORIGIN } from '../utils/api';
import { getAdminToken } from '../utils/auth';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiUpload, FiChevronUp, FiChevronDown, FiMove, FiImage, FiYoutube, FiFolder, FiStar } from 'react-icons/fi';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const emptyForm = {
  title: '', metaTitle: '', metaDescription: '', slug: '',
  largeBanner: '', smallBanner: '', content: '',
  client: '', service: '', category: '', videoUrl: '',
  featured: false,
};

const SectionCard = ({ icon, title, children }) => (
  <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
    <div className="bg-[#1A1A1A] border-b border-[#222] px-4 md:px-6 py-3 flex items-center gap-2">
      <span className="text-[#4169E1] text-sm">{icon}</span>
      <span className="text-[#F2F0EB] text-[9px] font-bold uppercase tracking-[0.2em]">{title}</span>
    </div>
    <div className="p-4 md:p-6 space-y-4">
      {children}
    </div>
  </div>
);

const SortableCaseStudyItem = ({ cs, onEdit, onDelete, onMoveUp, onMoveDown, onToggleFeatured, isFirst, isLast, isTop }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: cs.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1, zIndex: isDragging ? 10 : 1, position: 'relative' };
  const thumbSrc = isTop
    ? (cs.largeBanner ? (cs.largeBanner.startsWith('http') ? cs.largeBanner : `${BACKEND_ORIGIN}${cs.largeBanner}`) : '')
    : (cs.smallBanner ? (cs.smallBanner.startsWith('http') ? cs.smallBanner : `${BACKEND_ORIGIN}${cs.smallBanner}`) : '');
  return (
    <div ref={setNodeRef} style={style} className={`bg-[#111] border border-[#222] p-3 md:p-5 rounded-xl hover:border-[#4169E1]/40 transition-all flex items-center gap-2 md:gap-4 group ${isDragging ? 'shadow-[0_0_30px_rgba(65,105,225,0.15)] border-[#4169E1]/50' : ''}`}>
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 md:p-1.5 text-[#555] hover:text-[#4169E1] transition-colors shrink-0"><FiMove className="text-sm md:text-lg" /></div>
      <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg overflow-hidden bg-[#1A1A1A] shrink-0 border border-[#333] relative">
        {thumbSrc ? <img src={thumbSrc} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[#555]"><FiImage size={18} /></div>}
        <span className={`absolute top-0 right-0 text-[6px] font-bold px-1 py-0.5 rounded-bl-lg leading-none ${isTop ? 'bg-[#4169E1]/30 text-[#4169E1]' : 'bg-[#555]/30 text-[#aaa]'}`}>{isTop ? 'TB' : 'SB'}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs md:text-sm font-bold tracking-tight text-[#F2F0EB] truncate flex items-center gap-2">
          {cs.title}
          {cs.featured && <span className="inline-block px-1.5 py-0.5 bg-[#4169E1]/20 text-[#4169E1] text-[6px] md:text-[7px] font-bold uppercase tracking-[0.15em] rounded-full leading-none">Featured</span>}
        </h4>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[6px] md:text-[8px] text-[#888] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] mt-0.5 md:mt-1">
          {cs.category && <span className="text-[#4169E1]">{cs.category}</span>}
          {cs.category && cs.slug && <span className="w-1 h-1 rounded-full bg-[#4169E1]/40 shrink-0"></span>}
          <span className="truncate max-w-[60px] md:max-w-none text-[#555]">/case-study/{cs.slug}</span>
        </div>
      </div>
      <div className="flex flex-row md:flex-col gap-0.5 md:gap-1">
        <button onClick={() => onMoveUp(cs.id)} disabled={isFirst} className="p-1 md:p-1.5 bg-[#1A1A1A] text-[#555] hover:text-[#4169E1] rounded-lg transition-all disabled:opacity-20 disabled:cursor-not-allowed"><FiChevronUp className="text-[10px] md:text-xs" /></button>
        <button onClick={() => onMoveDown(cs.id)} disabled={isLast} className="p-1 md:p-1.5 bg-[#1A1A1A] text-[#555] hover:text-[#4169E1] rounded-lg transition-all disabled:opacity-20 disabled:cursor-not-allowed"><FiChevronDown className="text-[10px] md:text-xs" /></button>
      </div>
      <div className="flex items-center gap-1 md:gap-2">
        <button onClick={() => onToggleFeatured(cs)} className={`p-1.5 md:p-2.5 bg-[#1A1A1A] rounded-lg transition-all ${cs.featured ? 'text-yellow-400 hover:text-yellow-300' : 'text-[#555] hover:text-[#4169E1]'}`} title={cs.featured ? 'Unmark featured' : 'Mark as featured'}><FiStar className="text-[10px] md:text-sm" /></button>
        <button onClick={() => onEdit(cs)} className="p-1.5 md:p-2.5 bg-[#1A1A1A] text-[#555] hover:text-[#4169E1] rounded-lg transition-all"><FiEdit2 className="text-[10px] md:text-sm" /></button>
        <button onClick={() => onDelete(cs.id)} className="p-1.5 md:p-2.5 bg-red-500/10 text-red-500/50 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition-all"><FiTrash2 className="text-[10px] md:text-sm" /></button>
      </div>
    </div>
  );
};

const CaseStudyDashboard = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [uploadingBanner, setUploadingBanner] = useState(false);
  const [uploadingSmall, setUploadingSmall] = useState(false);
  const [msg, setMsg] = useState('');
  const [selectedBannerFile, setSelectedBannerFile] = useState(null);
  const [selectedSmallFile, setSelectedSmallFile] = useState(null);
  const [showProjectPicker, setShowProjectPicker] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(false);
  const [addingFromProject, setAddingFromProject] = useState(false);
  const [addAsFeatured, setAddAsFeatured] = useState(true);
  const token = getAdminToken();

  const fetchCaseStudies = async () => {
    setLoading(true);
    const { data, status } = await apiCall('/case-studies', 'GET');
    if (status === 200) setCaseStudies(data);
    else setMsg('Failed to load case studies');
    setLoading(false);
  };
  useEffect(() => { fetchCaseStudies(); }, []);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const persistOrder = useCallback(async (ordered) => {
    const items = ordered.map((c, i) => ({ id: c.id, position: i }));
    const { status } = await apiCall('/case-studies/reorder', 'PUT', { items }, token);
    if (status !== 200) { setMsg('Failed to save order'); setTimeout(() => setMsg(''), 3000); }
  }, [token]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setCaseStudies((prev) => {
      const oldIndex = prev.findIndex((c) => c.id === active.id);
      const newIndex = prev.findIndex((c) => c.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      const updated = [...prev];
      const [moved] = updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, moved);
      persistOrder(updated);
      return updated;
    });
  };

  const moveCaseStudy = (id, direction) => {
    setCaseStudies((prev) => {
      const index = prev.findIndex((c) => c.id === id);
      if (index === -1) return prev;
      const newIndex = index + direction;
      if (newIndex < 0 || newIndex >= prev.length) return prev;
      const updated = [...prev];
      updated[index] = updated[newIndex];
      updated[newIndex] = prev[index];
      persistOrder(updated);
      return updated;
    });
  };

  const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm(f => ({ ...f, title, slug: editing ? f.slug : generateSlug(title) }));
  };

  const openNewForm = () => {
    setEditing(null);
    setForm({ ...emptyForm });
    setSelectedBannerFile(null);
    setSelectedSmallFile(null);
    setShowForm(true);
  };

  const openEditForm = (cs) => {
    setEditing(cs);
    setForm({
      title: cs.title || '', metaTitle: cs.metaTitle || '', metaDescription: cs.metaDescription || '',
      slug: cs.slug || '', largeBanner: cs.largeBanner || '', smallBanner: cs.smallBanner || '',
      content: cs.content || '', client: cs.client || '', service: cs.service || '', category: cs.category || '', videoUrl: cs.videoUrl || '',
      featured: cs.featured || false,
    });
    setSelectedBannerFile(null);
    setSelectedSmallFile(null);
    setShowForm(true);
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const { data, status } = await apiCall(`/upload?type=case-studies`, 'POST', formData, token, true);
    if (status === 200) return data.url;
    return null;
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) { setMsg('Title and Slug are required'); setTimeout(() => setMsg(''), 3000); return; }
    setSaving(true);
    let payload = { ...form };

    if (selectedBannerFile) {
      const url = await uploadImage(selectedBannerFile);
      if (url) payload.largeBanner = url;
    }
    if (selectedSmallFile) {
      const url = await uploadImage(selectedSmallFile);
      if (url) payload.smallBanner = url;
    }

    if (editing) {
      const { status } = await apiCall(`/case-studies/${editing.id}`, 'PUT', payload, token);
      if (status === 200) { setMsg('Case study updated'); fetchCaseStudies(); setShowForm(false); }
      else setMsg('Update failed');
    } else {
      const { status } = await apiCall('/case-studies', 'POST', payload, token);
      if (status === 201) { setMsg('Case study created'); fetchCaseStudies(); setShowForm(false); }
      else setMsg('Create failed');
    }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  const handleToggleFeatured = async (cs) => {
    const { status } = await apiCall(`/case-studies/${cs.id}`, 'PUT', { featured: !cs.featured }, token);
    if (status === 200) { setMsg(cs.featured ? 'Removed from featured' : 'Added to featured'); fetchCaseStudies(); }
    else setMsg('Toggle failed');
    setTimeout(() => setMsg(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this case study?')) return;
    const { status } = await apiCall(`/case-studies/${id}`, 'DELETE', null, token);
    if (status === 200) { setMsg('Case study deleted'); fetchCaseStudies(); }
    else setMsg('Delete failed');
    setTimeout(() => setMsg(''), 3000);
  };

  const imgPreview = (url) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `${BACKEND_ORIGIN}${url}`;
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-[#F2F0EB] text-lg md:text-2xl font-bold tracking-tight">Case Studies</h3>
          <p className="text-[10px] text-[#888] mt-1">{caseStudies.length} entries — <span className="text-[#4169E1]">{Math.min(4, caseStudies.length)} top</span> + <span className="text-[#555]">{Math.max(0, caseStudies.length - 4)} small</span></p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => { setShowProjectPicker(true); setLoadingProjects(true); apiCall('/projects', 'GET').then(r => { setProjects(Array.isArray(r.data) ? r.data : []); setLoadingProjects(false); }); }} className="flex items-center gap-2 px-4 md:px-5 py-2.5 md:py-3 bg-[#1A1A1A] text-[#888] text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] rounded-full border border-[#333] hover:border-[#4169E1] hover:text-[#4169E1] transition-all">
            <FiFolder /> From Project
          </button>
          <button onClick={openNewForm} className="flex items-center gap-2 px-4 md:px-6 py-2.5 md:py-3 bg-[#4169E1] text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] rounded-full hover:bg-[#3158D4] transition-all shadow-lg">
            <FiPlus /> New Case Study
          </button>
        </div>
      </div>

      {msg && (
        <div className="fixed top-8 right-8 z-[60] bg-[#4169E1] text-white px-6 py-4 rounded-2xl shadow-lg font-bold text-[10px] uppercase tracking-widest animate-in fade-in slide-in-from-top-5">
          {msg}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-[#0D0D0D]/80 backdrop-blur-sm z-50 flex items-start justify-center pt-[5vh] px-4 overflow-y-auto pb-10" onClick={() => setShowForm(false)}>
          <div className="bg-[#0D0D0D] border border-[#222] rounded-xl md:rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-5" onClick={e => e.stopPropagation()}>
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-[#0D0D0D] border-b border-[#222] px-4 md:px-8 py-4 flex items-center justify-between">
              <h4 className="text-[#F2F0EB] text-sm md:text-base font-bold">{editing ? 'Edit Case Study' : 'New Case Study'}</h4>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-[#1A1A1A] rounded-full transition-colors"><FiX className="text-[#888]" /></button>
            </div>

            <div className="p-4 md:p-8 space-y-4">
              {/* Section 1: Basic Info */}
              <SectionCard icon={<FiImage />} title="Basic Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[#888] text-[8px] uppercase tracking-widest font-bold">Title <span className="text-red-400">*</span></label>
                    <input value={form.title} onChange={handleTitleChange} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-xs text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all placeholder:text-[#444]" placeholder="Case study title" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#888] text-[8px] uppercase tracking-widest font-bold">Category</label>
                    <input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-xs text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all placeholder:text-[#444]" placeholder="e.g. Architecture, Animation" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[#888] text-[8px] uppercase tracking-widest font-bold">Slug <span className="text-red-400">*</span></label>
                    <input value={form.slug} onChange={e => setForm(f => ({ ...f, slug: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-xs text-[#F2F0EB] font-mono focus:border-[#4169E1] outline-none transition-all placeholder:text-[#444]" placeholder="case-study-url" />
                  </div>
                </div>
              </SectionCard>

              {/* Section 2: Hero Meta */}
              <SectionCard icon="??" title="Hero Meta Info">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[#888] text-[8px] uppercase tracking-widest font-bold">Client</label>
                    <input value={form.client} onChange={e => setForm(f => ({ ...f, client: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-xs text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all placeholder:text-[#444]" placeholder="Client name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#888] text-[8px] uppercase tracking-widest font-bold">Service</label>
                    <input value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-xs text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all placeholder:text-[#444]" placeholder="Service provided" />
                  </div>
                </div>
                {/* Featured Toggle */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#222]">
                  <div>
                    <p className="text-[#F2F0EB] text-xs font-bold">Featured on Homepage</p>
                    <p className="text-[#555] text-[9px] mt-0.5">Show this case study in the homepage carousel</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, featured: !f.featured }))}
                    className={`relative w-12 h-6 rounded-full transition-colors ${form.featured ? 'bg-[#4169E1]' : 'bg-[#333]'}`}
                  >
                    <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.featured ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              </SectionCard>

              {/* Section 3: Media */}
              <SectionCard icon={<FiImage />} title="Media">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Large Banner */}
                  <div className="space-y-2">
                    <label className="text-[#888] text-[8px] uppercase tracking-widest font-bold">Large Banner <span className="text-[#555]">(hero)</span></label>
                    {form.largeBanner ? (
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#333] group">
                        <img src={imgPreview(form.largeBanner)} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                          <button onClick={() => { setForm(f => ({ ...f, largeBanner: '' })); setSelectedBannerFile(null); }} className="opacity-0 group-hover:opacity-100 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-500 transition-all"><FiX size={16} /></button>
                        </div>
                      </div>
                    ) : null}
                    <label className={`flex items-center justify-center gap-2 px-4 py-8 bg-[#1A1A1A] border-2 border-dashed rounded-xl cursor-pointer hover:border-[#4169E1] transition-all ${form.largeBanner ? 'border-[#333]/0' : 'border-[#333]'}`}>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center">
                          <FiUpload className={`text-sm ${uploadingBanner ? 'text-[#4169E1] animate-pulse' : 'text-[#888]'}`} />
                        </div>
                        <span className="text-[9px] text-[#555] uppercase tracking-widest font-bold">{uploadingBanner ? 'Uploading...' : 'Drop or click to upload'}</span>
                      </div>
                      <input type="file" accept="image/*" onChange={async (e) => {
                        const file = e.target.files?.[0]; if (!file) return;
                        setSelectedBannerFile(file); setUploadingBanner(true);
                        const fd = new FormData(); fd.append('image', file);
                        const { data, status } = await apiCall('/upload?type=case-studies', 'POST', fd, token, true);
                        if (status === 200) setForm(f => ({ ...f, largeBanner: data.url }));
                        setUploadingBanner(false);
                      }} className="hidden" disabled={uploadingBanner} />
                    </label>
                  </div>

                  {/* Small Banner */}
                  <div className="space-y-2">
                    <label className="text-[#888] text-[8px] uppercase tracking-widest font-bold">Small Banner <span className="text-[#555]">(second image)</span></label>
                    {form.smallBanner ? (
                      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#333] group">
                        <img src={imgPreview(form.smallBanner)} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                          <button onClick={() => { setForm(f => ({ ...f, smallBanner: '' })); setSelectedSmallFile(null); }} className="opacity-0 group-hover:opacity-100 p-2 bg-red-500/80 text-white rounded-full hover:bg-red-500 transition-all"><FiX size={16} /></button>
                        </div>
                      </div>
                    ) : null}
                    <label className={`flex items-center justify-center gap-2 px-4 py-8 bg-[#1A1A1A] border-2 border-dashed rounded-xl cursor-pointer hover:border-[#4169E1] transition-all ${form.smallBanner ? 'border-[#333]/0' : 'border-[#333]'}`}>
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center">
                          <FiUpload className={`text-sm ${uploadingSmall ? 'text-[#4169E1] animate-pulse' : 'text-[#888]'}`} />
                        </div>
                        <span className="text-[9px] text-[#555] uppercase tracking-widest font-bold">{uploadingSmall ? 'Uploading...' : 'Drop or click to upload'}</span>
                      </div>
                      <input type="file" accept="image/*" onChange={async (e) => {
                        const file = e.target.files?.[0]; if (!file) return;
                        setSelectedSmallFile(file); setUploadingSmall(true);
                        const fd = new FormData(); fd.append('image', file);
                        const { data, status } = await apiCall('/upload?type=case-studies', 'POST', fd, token, true);
                        if (status === 200) setForm(f => ({ ...f, smallBanner: data.url }));
                        setUploadingSmall(false);
                      }} className="hidden" disabled={uploadingSmall} />
                    </label>
                  </div>
                </div>

                {/* YouTube URL */}
                <div className="space-y-2 mt-4">
                  <label className="text-[#888] text-[8px] uppercase tracking-widest font-bold flex items-center gap-1.5"><FiYoutube className="text-red-500" /> YouTube Embed URL <span className="text-[#555]">(overrides hero image)</span></label>
                  <input value={form.videoUrl} onChange={e => setForm(f => ({ ...f, videoUrl: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-xs text-[#F2F0EB] font-mono focus:border-[#4169E1] outline-none transition-all placeholder:text-[#444]" placeholder="https://www.youtube.com/embed/VIDEO_ID" />
                  {form.videoUrl && (
                    <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[#333]">
                      <iframe src={form.videoUrl} className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                    </div>
                  )}
                </div>
              </SectionCard>

              {/* Section 4: Content */}
              <SectionCard icon="??" title="Content">
                <div className="space-y-2">
                  <label className="text-[#888] text-[8px] uppercase tracking-widest font-bold">HTML Content</label>
                  <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} rows={10} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-xs text-[#F2F0EB] font-mono focus:border-[#4169E1] outline-none transition-all resize-none placeholder:text-[#444]" placeholder="<h2>Case Study Content</h2><p>Write your case study here...</p>" />
                </div>
              </SectionCard>

              {/* Section 5: SEO */}
              <SectionCard icon="??" title="SEO Settings">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[#888] text-[8px] uppercase tracking-widest font-bold">Meta Title <span className="text-[#555]">(optional)</span></label>
                    <input value={form.metaTitle} onChange={e => setForm(f => ({ ...f, metaTitle: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-xs text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all placeholder:text-[#444]" placeholder="SEO title" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[#888] text-[8px] uppercase tracking-widest font-bold">Meta Description <span className="text-[#555]">(optional)</span></label>
                    <textarea value={form.metaDescription} onChange={e => setForm(f => ({ ...f, metaDescription: e.target.value }))} rows={2} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-xs text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all resize-none placeholder:text-[#444]" placeholder="SEO description" />
                  </div>
                </div>
              </SectionCard>
            </div>

            {/* Sticky Action Buttons */}
            <div className="sticky bottom-0 bg-[#0D0D0D] border-t border-[#222] px-4 md:px-8 py-4 flex gap-3">
              <button onClick={() => setShowForm(false)} className="flex-1 px-6 py-3 text-[10px] uppercase tracking-[0.15em] font-bold border border-[#333] text-[#888] rounded-xl hover:border-[#666] hover:text-[#ccc] transition-all">Cancel</button>
              <button onClick={handleSave} disabled={saving} className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#4169E1] text-white text-[10px] uppercase tracking-[0.15em] font-bold rounded-xl hover:bg-[#3158D4] transition-all disabled:opacity-50 shadow-lg">
                <FiSave size={14} /> {saving ? 'Saving...' : editing ? 'Update Case Study' : 'Create Case Study'}
              </button>
            </div>
          </div>
        </div>
      )}

      {!loading && caseStudies.length === 0 && (
        <div className="text-center py-16 md:py-24 bg-[#111] border border-[#222] border-dashed rounded-[2rem]">
          <FiImage className="text-[#333] text-4xl mx-auto mb-4" />
          <p className="text-[#555] text-sm">No case studies yet. Click "New Case Study" to create one.</p>
        </div>
      )}

      {caseStudies.length > 0 && (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={caseStudies.map(c => c.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-1 md:space-y-2">
              {caseStudies.length > 4 && (
                <div className="flex items-center gap-2 px-1 pt-4 pb-1">
                  <span className="text-[#4169E1] text-[8px] font-bold uppercase tracking-[0.2em]">Top Banner</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#4169E1]/30 to-transparent"></div>
                </div>
              )}
              {caseStudies.slice(0, 4).map((cs, i) => (
                <SortableCaseStudyItem key={cs.id} cs={cs} onEdit={openEditForm} onDelete={handleDelete} onToggleFeatured={handleToggleFeatured} onMoveUp={() => moveCaseStudy(cs.id, -1)} onMoveDown={() => moveCaseStudy(cs.id, 1)} isFirst={i === 0} isLast={i === 3} isTop={true} />
              ))}
              {caseStudies.length > 4 && (
                <div className="flex items-center gap-2 px-1 pt-6 pb-1">
                  <span className="text-[#555] text-[8px] font-bold uppercase tracking-[0.2em]">Small Banner</span>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#555]/20 to-transparent"></div>
                </div>
              )}
              {caseStudies.slice(4).map((cs, i, arr) => (
                <SortableCaseStudyItem key={cs.id} cs={cs} onEdit={openEditForm} onDelete={handleDelete} onToggleFeatured={handleToggleFeatured} onMoveUp={() => moveCaseStudy(cs.id, -1)} onMoveDown={() => moveCaseStudy(cs.id, 1)} isFirst={i === 0} isLast={i === arr.length - 1} isTop={false} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Project Picker Modal */}
      {showProjectPicker && (
        <div className="fixed inset-0 bg-[#0D0D0D]/80 backdrop-blur-sm z-50 flex items-start justify-center pt-[5vh] px-4 overflow-y-auto pb-10" onClick={() => setShowProjectPicker(false)}>
          <div className="bg-[#0D0D0D] border border-[#222] rounded-xl md:rounded-[2rem] w-full max-w-3xl max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 z-10 bg-[#0D0D0D] border-b border-[#222] px-4 md:px-8 py-4 flex items-center justify-between">
              <h4 className="text-[#F2F0EB] text-sm md:text-base font-bold">Select a Project</h4>
              <button onClick={() => setShowProjectPicker(false)} className="p-2 hover:bg-[#1A1A1A] rounded-full transition-colors"><FiX className="text-[#888]" /></button>
            </div>
            <div className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4 px-1">
                <span className="text-[#888] text-[8px] uppercase tracking-widest font-bold">Add as</span>
                <div className="flex items-center gap-3">
                  <span className={`text-[8px] font-bold uppercase tracking-widest ${!addAsFeatured ? 'text-[#4169E1]' : 'text-[#555]'}`}>Small</span>
                  <button type="button" onClick={() => setAddAsFeatured(!addAsFeatured)} className={`relative w-9 h-5 rounded-full transition-colors ${addAsFeatured ? 'bg-[#4169E1]' : 'bg-[#333]'}`}>
                    <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${addAsFeatured ? 'translate-x-4' : 'translate-x-0'}`} />
                  </button>
                  <span className={`text-[8px] font-bold uppercase tracking-widest ${addAsFeatured ? 'text-[#4169E1]' : 'text-[#555]'}`}>Top</span>
                </div>
              </div>
              {loadingProjects ? (
                <div className="py-16 flex justify-center gap-1.5">
                  {[0,1,2,3,4].map(i => <div key={i} className="w-2 h-2 rounded-full bg-[#4169E1]" style={{ animation: `csBounce 1.4s ease-in-out ${i * 0.15}s infinite` }} />)}
                  <style>{`@keyframes csBounce{0%,80%,100%{transform:scale(0);opacity:0.3}40%{transform:scale(1);opacity:1}}`}</style>
                </div>
              ) : projects.length === 0 ? (
                <div className="py-16 text-center text-[#555] text-sm">No projects available.</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {projects.map(p => {
                    const alreadyExists = caseStudies.some(cs => cs.slug === p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''));
                    return (
                      <button
                        key={p.id}
                        disabled={alreadyExists || addingFromProject}
                        onClick={async () => {
                          setAddingFromProject(true);
                          const genSlug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
                          const payload = {
                            title: p.title, slug: genSlug,
                            metaTitle: p.metaTitle || '', metaDescription: p.metaDescription || '',
                            largeBanner: p.heroImage || p.image || '', smallBanner: p.image || '',
                            content: p.description || '', client: p.client || '', service: p.service || '',
                            category: p.category || '', videoUrl: p.heroVideo || p.video || '',
                            featured: addAsFeatured,
                          };
                          const { status } = await apiCall('/case-studies', 'POST', payload, token);
                          setAddingFromProject(false);
                          if (status === 201 || status === 200) { setMsg(`"${p.title}" added as featured`); setShowProjectPicker(false); fetchCaseStudies(); }
                          else setMsg('Failed to add');
                          setTimeout(() => setMsg(''), 3000);
                        }}
                        className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${alreadyExists ? 'border-[#333] opacity-40 cursor-not-allowed' : 'border-[#333] hover:border-[#4169E1] hover:bg-[#1A1A1A] cursor-pointer'}`}
                      >
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-[#1A1A1A] shrink-0 border border-[#333]">
                          {(p.heroImage || p.image) ? <img src={(p.heroImage || p.image).startsWith('http') ? (p.heroImage || p.image) : `${BACKEND_ORIGIN}${p.heroImage || p.image}`} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[#555]"><FiImage size={16} /></div>}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-bold text-[#F2F0EB] truncate">{p.title}</p>
                          <p className="text-[8px] text-[#888] mt-0.5">{p.category}{p.client ? ` — ${p.client}` : ''}</p>
                        </div>
                        {alreadyExists ? <span className="text-[7px] text-[#555] uppercase tracking-widest font-bold shrink-0">Added</span> : <span className="text-[7px] text-[#4169E1] uppercase tracking-widest font-bold shrink-0">Add ?</span>}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudyDashboard;
