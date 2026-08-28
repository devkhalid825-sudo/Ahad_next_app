'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiCall, API_BASE_URL, BACKEND_ORIGIN, getYoutubeEmbed } from '../utils/api';
import { getAdminToken } from '../utils/auth';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiUpload, FiChevronUp, FiChevronDown, FiMove, FiImage, FiFolder, FiStar } from 'react-icons/fi';
import HtmlEditor from './ui/HtmlEditor';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const categories = ['Animation', 'Web', 'Configurator', 'VR', 'AR', 'Architecture', 'Tour 360'];

const emptyForm = {
  title: '', metaTitle: '', metaDescription: '', slug: '',
  largeBanner: '', smallBanner: '', content: '',
  client: '', service: '', category: 'Animation', duration: '', deliverables: '',
  overviewHeading: '', overviewText: '', challengeHeading: '', challengeText: '',
  results: [{ stat: '', label: '', desc: '' }],
  processSteps: [{ step: '01', phase: '', title: '', desc: '' }],
  galleryCategories: [{ name: '', images: '' }],
  videoTabs: [{ label: '', url: '' }],
  ctaUrl: '', ctaText: '',
  heroVideo: '', videoUrl: '',
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
          <span className="truncate max-w-[100px] md:max-w-none text-[#555]">/case-study/{cs.slug}</span>
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
  const [galleryFiles, setGalleryFiles] = useState({});
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

  const parseJSON = (val, fallback) => { if (!val) return fallback; try { return typeof val === 'string' ? JSON.parse(val) : val; } catch { return fallback; } };

  const openNewForm = () => {
    setEditing(null);
    setForm({
      ...emptyForm,
      results: [{ stat: '', label: '', desc: '' }],
      processSteps: [{ step: '01', phase: '', title: '', desc: '' }],
      galleryCategories: [{ name: '', images: '' }],
      videoTabs: [{ label: '', url: '' }]
    });
    setSelectedBannerFile(null);
    setSelectedSmallFile(null);
    setGalleryFiles({});
    setShowForm(true);
  };

  const openEditForm = (cs) => {
    setEditing(cs);
    setForm({
      title: cs.title || '', metaTitle: cs.metaTitle || '', metaDescription: cs.metaDescription || '',
      slug: cs.slug || '', largeBanner: cs.largeBanner || cs.heroImage || '', smallBanner: cs.smallBanner || '',
      content: cs.content || cs.description || '', client: cs.client || '', service: cs.service || '', category: cs.category || 'Animation',
      duration: cs.duration || '', deliverables: cs.deliverables || '',
      heroVideo: cs.heroVideo || cs.videoUrl || '', videoUrl: cs.videoUrl || cs.heroVideo || '',
      overviewHeading: cs.overviewHeading || 'Project overview', overviewText: cs.overviewText || cs.overview || '',
      challengeHeading: cs.challengeHeading || 'Key challenges', challengeText: cs.challengeText || cs.challenge || '',
      results: parseJSON(cs.results, [{ stat: '', label: '', desc: '' }]),
      processSteps: parseJSON(cs.processSteps || cs.process, [{ step: '01', phase: '', title: '', desc: '' }]),
      galleryCategories: parseJSON(cs.galleryCategories, [{ name: '', images: '' }]),
      videoTabs: parseJSON(cs.videoTabs, [{ label: '', url: '' }]),
      ctaUrl: cs.ctaUrl || '', ctaText: cs.ctaText || '',
      featured: cs.featured || false,
    });
    setSelectedBannerFile(null);
    setSelectedSmallFile(null);
    setGalleryFiles({});
    setShowForm(true);
  };

  const updateArray = (key, index, field, value) => {
    setForm(f => {
      const arr = [...f[key]];
      if (!arr[index]) arr[index] = {};
      arr[index] = { ...arr[index], [field]: value };
      return { ...f, [key]: arr };
    });
  };

  const addArrayItem = (key, template) => setForm(f => ({ ...f, [key]: [...f[key], { ...template }] }));
  const removeArrayItem = (key, index) => setForm(f => ({ ...f, [key]: f[key].filter((_, i) => i !== index) }));

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
    const { data, status } = await apiCall(`/upload?type=case-studies`, 'POST', formData, token, true);
    if (status === 200) return data.url;
    return null;
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!form.title || !form.slug) { setMsg('Title and Slug are required'); setTimeout(() => setMsg(''), 3000); return; }
    setSaving(true);
    let largeBannerUrl = form.largeBanner;
    let smallBannerUrl = form.smallBanner;

    if (selectedBannerFile) {
      setUploadingBanner(true);
      const url = await uploadImage(selectedBannerFile);
      if (url) largeBannerUrl = url;
      setUploadingBanner(false);
    }
    if (selectedSmallFile) {
      setUploadingSmall(true);
      const url = await uploadImage(selectedSmallFile);
      if (url) smallBannerUrl = url;
      setUploadingSmall(false);
    }

    let galleryData = [...form.galleryCategories];
    for (let i = 0; i < galleryData.length; i++) {
      const files = galleryFiles[i];
      if (files && files.length > 0) {
        const existingUrls = galleryData[i].images ? galleryData[i].images.split(',').map(s => s.trim()).filter(Boolean) : [];
        const newUrls = [];
        for (const file of files) {
          const url = await uploadImage(file);
          if (url) newUrls.push(url);
        }
        galleryData[i] = { ...galleryData[i], images: [...existingUrls, ...newUrls].join(',') };
      }
    }

    const payload = {
      ...form,
      largeBanner: largeBannerUrl,
      smallBanner: smallBannerUrl,
      heroImage: largeBannerUrl,
      heroVideo: form.heroVideo || form.videoUrl,
      videoUrl: form.heroVideo || form.videoUrl,
      results: JSON.stringify(form.results.filter(r => r.stat || r.label)),
      processSteps: JSON.stringify(form.processSteps.filter(p => p.phase || p.title)),
      galleryCategories: JSON.stringify(galleryData.filter(g => g.name)),
      videoTabs: JSON.stringify(form.videoTabs.filter(v => v.label || v.url)),
      ctaUrl: form.ctaUrl || null,
      ctaText: form.ctaText || null,
    };

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

  const handleAddProjectAsCaseStudy = async (project) => {
    setAddingFromProject(true);
    const slug = (project.path || '').replace(/^\/project\//, '') || generateSlug(project.title);
    const payload = {
      title: project.title,
      slug,
      category: project.category || 'Animation',
      client: project.client || '',
      service: project.service || '',
      duration: project.duration || '',
      deliverables: project.deliverables || '',
      largeBanner: project.heroImage || project.image || '',
      smallBanner: project.image || '',
      heroImage: project.heroImage || project.image || '',
      heroVideo: project.heroVideo || '',
      videoUrl: project.heroVideo || '',
      content: project.description || '',
      description: project.description || '',
      overviewHeading: project.overviewHeading || 'Project overview',
      overviewText: project.overviewText || '',
      challengeHeading: project.challengeHeading || 'Key challenges',
      challengeText: project.challengeText || '',
      results: typeof project.results === 'string' ? project.results : JSON.stringify(project.results || []),
      processSteps: typeof project.processSteps === 'string' ? project.processSteps : JSON.stringify(project.processSteps || []),
      galleryCategories: typeof project.galleryCategories === 'string' ? project.galleryCategories : JSON.stringify(project.galleryCategories || []),
      videoTabs: typeof project.videoTabs === 'string' ? project.videoTabs : JSON.stringify(project.videoTabs || []),
      ctaUrl: project.ctaUrl || null,
      ctaText: project.ctaText || null,
      featured: addAsFeatured,
    };
    const { status } = await apiCall('/case-studies', 'POST', payload, token);
    if (status === 201) {
      setMsg(`Added "${project.title}" as case study`);
      setShowProjectPicker(false);
      fetchCaseStudies();
    } else {
      setMsg('Failed to add case study');
    }
    setAddingFromProject(false);
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h3 className="text-[#F2F0EB] text-lg md:text-2xl font-bold tracking-tight">Case Studies</h3>
          <p className="text-[10px] text-[#888] mt-1">{caseStudies.length} entries</p>
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

      {/* Project Picker Modal */}
      {showProjectPicker && (
        <div className="fixed inset-0 bg-[#0D0D0D]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowProjectPicker(false)}>
          <div className="bg-[#0D0D0D] border border-[#222] rounded-2xl w-full max-w-2xl max-h-[80vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b border-[#222] flex items-center justify-between">
              <div>
                <h4 className="text-[#F2F0EB] text-sm font-bold">Import from Existing Project</h4>
                <p className="text-[9px] text-[#888] mt-0.5">Select a project to instantly create a matching case study with all its rich data</p>
              </div>
              <button onClick={() => setShowProjectPicker(false)} className="p-1.5 hover:bg-[#1A1A1A] rounded-lg"><FiX /></button>
            </div>
            <div className="p-3 bg-[#111] border-b border-[#222] flex items-center justify-between">
              <span className="text-[9px] text-[#888]">Auto-mark as Featured in top swiper:</span>
              <button type="button" onClick={() => setAddAsFeatured(!addAsFeatured)} className={`px-3 py-1 rounded-full text-[9px] font-bold ${addAsFeatured ? 'bg-[#4169E1] text-white' : 'bg-[#222] text-[#888]'}`}>
                {addAsFeatured ? 'Yes, Featured' : 'No, Regular'}
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {loadingProjects ? (
                <div className="py-8 text-center text-xs text-[#555]">Loading projects...</div>
              ) : projects.length === 0 ? (
                <div className="py-8 text-center text-xs text-[#555]">No projects found</div>
              ) : (
                projects.map(p => (
                  <div key={p.id} className="p-3 bg-[#111] border border-[#222] rounded-xl flex items-center justify-between gap-3 hover:border-[#4169E1]/40 transition-all">
                    <div className="flex items-center gap-3 min-w-0">
                      {p.image && <img src={p.image.startsWith('http') ? p.image : `${BACKEND_ORIGIN}${p.image}`} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />}
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-[#F2F0EB] truncate">{p.title}</div>
                        <div className="text-[8px] text-[#888]">{p.category || 'Animation'}</div>
                      </div>
                    </div>
                    <button disabled={addingFromProject} onClick={() => handleAddProjectAsCaseStudy(p)} className="px-3 py-1.5 bg-[#4169E1] text-white text-[9px] font-bold rounded-lg hover:bg-[#3158D4] transition-all shrink-0 disabled:opacity-50">
                      Import as Case Study
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-[#0D0D0D]/80 backdrop-blur-sm z-50 flex items-start justify-center pt-[5vh] px-4 overflow-y-auto pb-10" onClick={() => setShowForm(false)}>
          <div className="bg-[#0D0D0D] border border-[#222] rounded-xl md:rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-in fade-in slide-in-from-bottom-5" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 z-10 bg-[#0D0D0D] border-b border-[#222] px-4 md:px-8 py-4 flex items-center justify-between">
              <h4 className="text-[#F2F0EB] text-sm md:text-base font-bold">{editing ? 'Edit Case Study' : 'New Case Study'}</h4>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-[#1A1A1A] rounded-full transition-colors"><FiX className="text-[#888]" /></button>
            </div>

            <form onSubmit={handleSave} className="p-4 md:p-8 space-y-5">
              {/* 1. Basic Information */}
              <SectionCard icon={<FiImage />} title="1. Basic Information">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Case Study Title <span className="text-red-400">*</span></label>
                    <input type="text" required value={form.title} onChange={handleTitleChange} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs" placeholder="e.g. Malka Food — Dynamic Commercial" />
                  </div>
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Categories <span className="text-red-400">*</span></label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(c => {
                        const selected = (form.category || '').split(',').map(s => s.trim()).includes(c);
                        return (
                          <button key={c} type="button" onClick={() => {
                            const current = form.category ? form.category.split(',').map(s => s.trim()).filter(Boolean) : [];
                            const next = selected ? current.filter(x => x !== c) : [...current, c];
                            setForm(f => ({ ...f, category: next.join(', ') }));
                          }} className={`text-[10px] font-bold uppercase tracking-[0.12em] px-3.5 py-2 rounded-xl border transition-all ${
                            selected ? 'bg-[#4169E1] text-white border-[#4169E1]' : 'bg-[#1A1A1A] text-[#555] border-[#333] hover:border-[#4169E1]/50'
                          }`}>{c}</button>
                        );
                      })}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Slug (URL: /case-study/{form.slug || 'your-slug'}) <span className="text-red-400">*</span></label>
                    <input type="text" required value={form.slug} onChange={(e) => setForm(f => ({ ...f, slug: generateSlug(e.target.value) }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs font-mono" placeholder="your-case-study-slug" />
                  </div>
                </div>
              </SectionCard>

              {/* 2. Hero Meta Info */}
              <SectionCard icon="📌" title="2. Hero Meta Info">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Client</label>
                    <input type="text" value={form.client} onChange={(e) => setForm(f => ({ ...f, client: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs" placeholder="e.g. Malka Food" />
                  </div>
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Service</label>
                    <input type="text" value={form.service} onChange={(e) => setForm(f => ({ ...f, service: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs" placeholder="e.g. 3D Product Commercial" />
                  </div>
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Duration</label>
                    <input type="text" value={form.duration} onChange={(e) => setForm(f => ({ ...f, duration: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs" placeholder="e.g. 4 weeks" />
                  </div>
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Deliverables</label>
                    <input type="text" value={form.deliverables} onChange={(e) => setForm(f => ({ ...f, deliverables: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs" placeholder="e.g. Product video" />
                  </div>
                </div>
              </SectionCard>

              {/* 3. Media & Banners */}
              <SectionCard icon="🖼" title="3. Banners & Video">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Large Banner / Hero Image</label>
                    <div className="flex items-center gap-3">
                      {form.largeBanner && (
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-[#333] shrink-0 group">
                          <img src={form.largeBanner.startsWith('http') || form.largeBanner.startsWith('blob:') ? form.largeBanner : `${BACKEND_ORIGIN}${form.largeBanner}`} alt="" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => { setForm(f => ({ ...f, largeBanner: '' })); setSelectedBannerFile(null); }} className="absolute inset-0 bg-[#0D0D0D]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"><FiX className="text-white text-xs" /></button>
                        </div>
                      )}
                      <label className="flex-1 flex items-center justify-center gap-2 border border-dashed border-[#333] rounded-xl px-4 py-4 cursor-pointer hover:border-[#4169E1]/50 transition-all">
                        <FiUpload className="text-[#555]" />
                        <span className="text-[#555] text-[9px] font-bold uppercase tracking-widest">{uploadingBanner ? 'Uploading...' : 'Choose Large Banner'}</span>
                        <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files[0]; if (!file) return; setForm(f => ({ ...f, largeBanner: URL.createObjectURL(file) })); setSelectedBannerFile(file); }} className="hidden" />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Small Banner / Card Thumbnail</label>
                    <div className="flex items-center gap-3">
                      {form.smallBanner && (
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-[#333] shrink-0 group">
                          <img src={form.smallBanner.startsWith('http') || form.smallBanner.startsWith('blob:') ? form.smallBanner : `${BACKEND_ORIGIN}${form.smallBanner}`} alt="" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => { setForm(f => ({ ...f, smallBanner: '' })); setSelectedSmallFile(null); }} className="absolute inset-0 bg-[#0D0D0D]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"><FiX className="text-white text-xs" /></button>
                        </div>
                      )}
                      <label className="flex-1 flex items-center justify-center gap-2 border border-dashed border-[#333] rounded-xl px-4 py-4 cursor-pointer hover:border-[#4169E1]/50 transition-all">
                        <FiUpload className="text-[#555]" />
                        <span className="text-[#555] text-[9px] font-bold uppercase tracking-widest">{uploadingSmall ? 'Uploading...' : 'Choose Small Banner'}</span>
                        <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files[0]; if (!file) return; setForm(f => ({ ...f, smallBanner: URL.createObjectURL(file) })); setSelectedSmallFile(file); }} className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Hero Video (Optional YouTube URL)</label>
                  <input type="text" value={form.heroVideo} onChange={(e) => setForm(f => ({ ...f, heroVideo: e.target.value, videoUrl: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs" placeholder="https://youtube.com/watch?v=..." />
                </div>

                <div>
                  <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Video Tabs (Optional)</label>
                  {form.videoTabs.map((tab, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <input type="text" value={tab.label} onChange={(e) => updateArray('videoTabs', i, 'label', e.target.value)} placeholder="Tab label" className="flex-1 bg-[#1A1A1A] border border-[#333] rounded-xl px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs" />
                      <input type="text" value={tab.url} onChange={(e) => updateArray('videoTabs', i, 'url', e.target.value)} placeholder="YouTube URL" className="flex-[2] bg-[#1A1A1A] border border-[#333] rounded-xl px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs" />
                      {form.videoTabs.length > 1 && <button type="button" onClick={() => removeArrayItem('videoTabs', i)} className="p-2 text-red-400 hover:text-red-300"><FiX size={14} /></button>}
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('videoTabs', { label: '', url: '' })} className="text-[#4169E1] text-[8px] uppercase tracking-widest font-bold hover:underline"><FiPlus className="inline mr-1" />Add Video Tab</button>
                </div>
              </SectionCard>

              {/* 4. Overview & Challenge */}
              <SectionCard icon="💡" title="4. Overview & Challenge">
                <div>
                  <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Overview Heading</label>
                  <input type="text" value={form.overviewHeading} onChange={(e) => setForm(f => ({ ...f, overviewHeading: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs" placeholder="e.g. Bringing flavor to the screen" />
                </div>
                <div>
                  <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Overview Text</label>
                  <textarea value={form.overviewText} onChange={(e) => setForm(f => ({ ...f, overviewText: e.target.value }))} rows={3} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs resize-none" placeholder="Describe the case study overview..." />
                </div>
                <div>
                  <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Challenge Heading</label>
                  <input type="text" value={form.challengeHeading} onChange={(e) => setForm(f => ({ ...f, challengeHeading: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs" placeholder="e.g. Key challenges" />
                </div>
                <div>
                  <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Challenge Text</label>
                  <textarea value={form.challengeText} onChange={(e) => setForm(f => ({ ...f, challengeText: e.target.value }))} rows={3} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs resize-none" placeholder="Describe the challenges faced..." />
                </div>
              </SectionCard>

              {/* 5. Results */}
              <SectionCard icon="📈" title="5. Results & Metrics">
                {form.results.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-[#1A1A1A] rounded-xl border border-[#222]">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                      <input type="text" value={r.stat} onChange={(e) => updateArray('results', i, 'stat', e.target.value)} placeholder="Stat (e.g. 80%)" className="bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs" />
                      <input type="text" value={r.label} onChange={(e) => updateArray('results', i, 'label', e.target.value)} placeholder="Label (e.g. Faster delivery)" className="bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs" />
                      <input type="text" value={r.desc} onChange={(e) => updateArray('results', i, 'desc', e.target.value)} placeholder="Description" className="bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs" />
                    </div>
                    {form.results.length > 1 && <button type="button" onClick={() => removeArrayItem('results', i)} className="p-2 text-red-400 hover:text-red-300 mt-1"><FiX size={14} /></button>}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('results', { stat: '', label: '', desc: '' })} className="text-[#4169E1] text-[8px] uppercase tracking-widest font-bold hover:underline"><FiPlus className="inline mr-1" />Add Result</button>
              </SectionCard>

              {/* 6. Process Steps */}
              <SectionCard icon="⚙" title="6. Process Steps">
                {form.processSteps.map((p, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-[#1A1A1A] rounded-xl border border-[#222]">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2">
                      <input type="text" value={p.step} onChange={(e) => updateArray('processSteps', i, 'step', e.target.value)} placeholder="Step (01)" className="bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs w-16" />
                      <input type="text" value={p.phase} onChange={(e) => updateArray('processSteps', i, 'phase', e.target.value)} placeholder="Phase (e.g. Discovery)" className="bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs" />
                      <input type="text" value={p.title} onChange={(e) => updateArray('processSteps', i, 'title', e.target.value)} placeholder="Title" className="bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs" />
                      <input type="text" value={p.desc} onChange={(e) => updateArray('processSteps', i, 'desc', e.target.value)} placeholder="Description" className="bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs" />
                    </div>
                    {form.processSteps.length > 1 && <button type="button" onClick={() => removeArrayItem('processSteps', i)} className="p-2 text-red-400 hover:text-red-300 mt-1"><FiX size={14} /></button>}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('processSteps', { step: String(form.processSteps.length + 1).padStart(2, '0'), phase: '', title: '', desc: '' })} className="text-[#4169E1] text-[8px] uppercase tracking-widest font-bold hover:underline"><FiPlus className="inline mr-1" />Add Step</button>
              </SectionCard>

              {/* 7. Gallery Categories */}
              <SectionCard icon="🖼" title="7. Gallery Categories">
                {form.galleryCategories.map((g, i) => (
                  <div key={i} className="p-3 bg-[#1A1A1A] rounded-xl border border-[#222] space-y-2">
                    <div className="flex items-start gap-2">
                      <input type="text" value={g.name} onChange={(e) => updateArray('galleryCategories', i, 'name', e.target.value)} placeholder="Category name" className="flex-1 bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs" />
                      {form.galleryCategories.length > 1 && <button type="button" onClick={() => removeArrayItem('galleryCategories', i)} className="p-2 text-red-400 hover:text-red-300"><FiX size={14} /></button>}
                    </div>
                    <input type="text" value={g.images} onChange={(e) => updateArray('galleryCategories', i, 'images', e.target.value)} placeholder="Image URLs (comma separated)" className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs" />
                    <label className="flex items-center justify-center gap-2 border border-dashed border-[#333] rounded-lg px-3 py-2.5 cursor-pointer hover:border-[#4169E1]/50 transition-all">
                      <FiUpload className="text-[#555]" /><span className="text-[#555] text-[8px] font-bold uppercase tracking-widest">Upload Images</span>
                      <input type="file" accept="image/*" multiple onChange={(e) => {
                        const files = Array.from(e.target.files);
                        if (!files.length) return;
                        setGalleryFiles(prev => ({ ...prev, [i]: [...(prev[i] || []), ...files] }));
                        const newUrls = files.map(f => URL.createObjectURL(f));
                        const existing = g.images ? g.images.split(',').map(s => s.trim()).filter(Boolean) : [];
                        updateArray('galleryCategories', i, 'images', [...existing, ...newUrls].join(', '));
                      }} className="hidden" />
                    </label>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('galleryCategories', { name: '', images: '' })} className="text-[#4169E1] text-[8px] uppercase tracking-widest font-bold hover:underline"><FiPlus className="inline mr-1" />Add Category</button>
              </SectionCard>

              {/* 8. Description (HTML) */}
              <SectionCard icon="📝" title="8. Full Description (HTML Editor)">
                <HtmlEditor value={form.content} onChange={(val) => setForm(f => ({ ...f, content: val }))} minHeight={200} />
              </SectionCard>

              {/* 9. Featured Switch & SEO */}
              <SectionCard icon="⭐" title="9. Featured & SEO Settings">
                <div className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-xl border border-[#333] mb-4">
                  <div>
                    <span className="text-xs font-bold text-[#F2F0EB] block">Featured Case Study</span>
                    <span className="text-[8px] text-[#888]">Display this case study in the top interactive swiper on the home and case studies pages</span>
                  </div>
                  <button type="button" onClick={() => setForm(f => ({ ...f, featured: !f.featured }))} className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${form.featured ? 'bg-[#4169E1] text-white' : 'bg-[#222] text-[#888]'}`}>
                    {form.featured ? 'Featured' : 'Not Featured'}
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Meta Title</label>
                    <input type="text" value={form.metaTitle} onChange={(e) => setForm(f => ({ ...f, metaTitle: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs" placeholder="Leave blank to use case study title" />
                  </div>
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Meta Description</label>
                    <input type="text" value={form.metaDescription} onChange={(e) => setForm(f => ({ ...f, metaDescription: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs" placeholder="Leave blank to use overview" />
                  </div>
                </div>
              </SectionCard>

              {/* 10. CTA Button */}
              <SectionCard icon="🔗" title="10. CTA Button">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Button Text</label>
                    <input type="text" value={form.ctaText} onChange={(e) => setForm(f => ({ ...f, ctaText: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs" placeholder="e.g. Start a Project" />
                  </div>
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Button URL</label>
                    <input type="text" value={form.ctaUrl} onChange={(e) => setForm(f => ({ ...f, ctaUrl: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs font-mono" placeholder="/contact or https://..." />
                  </div>
                </div>
              </SectionCard>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 sticky bottom-0 bg-[#0D0D0D] pb-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-[#333] text-[#888] font-bold py-3.5 rounded-xl hover:bg-[#1A1A1A] transition-all text-[8px] uppercase tracking-[0.2em]">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-[#4169E1] text-white font-bold py-3.5 rounded-xl hover:bg-[#3158D4] transition-all disabled:opacity-50 text-[8px] uppercase tracking-[0.2em]">
                  {saving ? 'Saving...' : editing ? 'Update Case Study' : 'Create Case Study'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Case Studies List */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={caseStudies.map(c => c.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {caseStudies.map((cs, idx) => (
              <SortableCaseStudyItem
                key={cs.id}
                cs={cs}
                isTop={idx < 4}
                isFirst={idx === 0}
                isLast={idx === caseStudies.length - 1}
                onEdit={openEditForm}
                onDelete={handleDelete}
                onToggleFeatured={handleToggleFeatured}
                onMoveUp={(id) => moveCaseStudy(id, -1)}
                onMoveDown={(id) => moveCaseStudy(id, 1)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default CaseStudyDashboard;
