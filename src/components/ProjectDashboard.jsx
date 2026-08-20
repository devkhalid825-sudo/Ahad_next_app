'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiCall, API_BASE_URL, BACKEND_ORIGIN, getYoutubeEmbed } from '../utils/api';
import { getAdminToken } from '../utils/auth';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiUpload, FiChevronUp, FiChevronDown, FiMove, FiImage } from 'react-icons/fi';
import HtmlEditor from './ui/HtmlEditor';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const categories = ['Animation', 'Web', 'Configurator', 'VR', 'AR', 'Architecture', 'Tour 360'];

const emptyForm = {
  title: '', metaTitle: '', metaDescription: '', category: '',
  image: '', heroImage: '', heroVideo: '', heroType: 'image',
  path: '', description: '',
  client: '', service: '', duration: '', deliverables: '',
  overviewHeading: '', overviewText: '', challengeHeading: '', challengeText: '',
  results: [{ stat: '', label: '', desc: '' }],
  processSteps: [{ step: '01', phase: '', title: '', desc: '' }],
  galleryCategories: [{ name: '', images: '' }],
  videoTabs: [{ label: '', url: '' }],
  ctaUrl: '', ctaText: '',
};

const demoData = {
  title: 'Malka Food — Dynamic Product Commercial',
  category: 'Animation, Web',
  path: '/project/malka-food',
  client: 'Malka Food',
  service: '3D Product Commercial',
  duration: '4 weeks',
  deliverables: 'Product video, 24 render assets',
  overviewHeading: 'Bringing flavor to the screen',
  overviewText: 'Malka Food needed to compete on digital shelves where photography alone was not cutting through. We created a library of photorealistic 3D product renders that gave their team complete control — any angle, any surface, any lighting.',
  challengeHeading: 'Capturing perfect freshness',
  challengeText: 'Every time a new SKU launched or packaging changed, the client had to schedule a studio, hire a photographer, and wait weeks. Digital campaigns were bottlenecked. The brief: build a 3D asset pipeline that makes render production as fast as marketing moves.',
  description: '<h2>Project Background</h2><p>Malka Food approached us with a clear goal: elevate their brand presence in the competitive packaged food market. Traditional photography was limiting their ability to scale content production for e-commerce, social media, and retail campaigns.</p><h2>Our Approach</h2><p>We developed a complete 3D asset pipeline that enabled rapid iteration across multiple product variants. Each asset was built with modular components — labels, packaging variants, and environmental lighting presets — allowing the client to request new renders without starting from scratch.</p><h2>Key Features</h2><ul><li>Photorealistic hero product shots for e-commerce listings</li><li>Lifestyle scenes with natural lighting for social media</li><li>Packaging variant system for rapid A/B testing</li><li>Export-ready assets for print, web, and broadcast</li></ul>',
  results: [
    { stat: '80%', label: 'Faster asset delivery', desc: 'From 3-week photoshoots to 48-hour render turnaround per SKU' },
    { stat: '24', label: 'Render assets delivered', desc: 'Packshots, hero shots, lifestyle composites — all in one pipeline' },
    { stat: '3x', label: 'Campaign output increase', desc: 'Marketing team tripled A/B variant production with same headcount' },
  ],
  processSteps: [
    { step: '01', phase: 'Discovery', title: 'Brand & packaging audit', desc: 'We started with a deep audit of every existing packaging file, brand guideline, and reference shoot to shape the entire asset brief.' },
    { step: '02', phase: 'Asset Build', title: 'High-fidelity 3D modelling', desc: 'Each product was built from technical dielines and reference images — accurate geometry, material stacking, and label mapping.' },
    { step: '03', phase: 'Lighting', title: 'Studio & lifestyle lighting setups', desc: 'We built three lighting presets: clean white studio, warm lifestyle, and moody dark hero. Each preset was reusable across SKUs.' },
    { step: '04', phase: 'Delivery', title: 'Organised asset library', desc: 'Final delivery included layered PSDs, transparent PNGs, and locked source files with documentation for the client internal team.' },
  ],
  galleryCategories: [
    { name: 'Hero Shots', images: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800,https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800,https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800' },
    { name: 'Lifestyle', images: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800,https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800,https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800' },
    { name: 'Packaging', images: 'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800,https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800' },
  ],
  ctaUrl: '/contact', ctaText: 'Start a project',
  videoTabs: [
    { label: 'Product Reel', url: 'https://www.youtube.com/watch?v=gjtQTltVD5A' },
    { label: 'Behind the Scenes', url: 'https://www.youtube.com/watch?v=BsKw4i6riRw' },
  ],
};

const SortableProjectItem = ({ project, onEdit, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1, zIndex: isDragging ? 10 : 1, position: 'relative' };
  return (
    <div ref={setNodeRef} style={style} className={`bg-[#111] border border-[#222] p-3 md:p-5 rounded-[1rem] md:rounded-[1.5rem] hover:border-[#4169E1]/40 transition-all flex items-center gap-2 md:gap-4 group ${isDragging ? 'shadow-[0_0_30px_rgba(65,105,225,0.15)] border-[#4169E1]/50' : ''}`}>
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 md:p-1.5 text-[#555] hover:text-[#4169E1] transition-colors shrink-0"><FiMove className="text-sm md:text-lg" /></div>
      <div className="w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-xl overflow-hidden bg-[#1A1A1A] shrink-0 border border-[#333]">
        {project.image ? <img src={project.image.startsWith('http') ? project.image : `${BACKEND_ORIGIN}${project.image}`} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[#555]"><FiImage size={20} /></div>}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs md:text-base font-bold tracking-tight text-[#F2F0EB] truncate">{project.title}</h4>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[6px] md:text-[8px] text-[#888] font-bold uppercase tracking-[0.1em] md:tracking-[0.2em] mt-0.5 md:mt-1">
          {(project.category || '').split(',').map((c, i) => (
            <span key={i} className="text-[#4169E1]">{c.trim()}{i < (project.category || '').split(',').length - 1 ? ', ' : ''}</span>
          ))}
          <span className="w-1 h-1 rounded-full bg-[#4169E1]/40 shrink-0"></span>
          <span className="truncate max-w-[60px] md:max-w-none text-[#555]">{project.path}</span>
        </div>
      </div>
      <div className="flex flex-row md:flex-col gap-0.5 md:gap-1">
        <button onClick={() => onMoveUp(project.id)} disabled={isFirst} className="p-1 md:p-1.5 bg-[#1A1A1A] text-[#555] hover:text-[#4169E1] hover:bg-[#1A1A1A] rounded-lg transition-all disabled:opacity-20 disabled:cursor-not-allowed"><FiChevronUp className="text-[10px] md:text-xs" /></button>
        <button onClick={() => onMoveDown(project.id)} disabled={isLast} className="p-1 md:p-1.5 bg-[#1A1A1A] text-[#555] hover:text-[#4169E1] hover:bg-[#1A1A1A] rounded-lg transition-all disabled:opacity-20 disabled:cursor-not-allowed"><FiChevronDown className="text-[10px] md:text-xs" /></button>
      </div>
      <div className="flex items-center gap-1 md:gap-2">
        <button onClick={() => onEdit(project)} className="p-1.5 md:p-2.5 bg-[#1A1A1A] text-[#555] hover:text-[#4169E1] hover:bg-[#1A1A1A] rounded-lg md:rounded-xl transition-all"><FiEdit2 className="text-[10px] md:text-sm" /></button>
        <button onClick={() => onDelete(project.id)} className="p-1.5 md:p-2.5 bg-red-500/10 text-red-500/50 hover:text-red-400 hover:bg-red-500/20 rounded-lg md:rounded-xl transition-all"><FiTrash2 className="text-[10px] md:text-sm" /></button>
      </div>
    </div>
  );
};

const SectionCard = ({ title, icon, children }) => (
  <div className="bg-[#111] border border-[#222] rounded-xl overflow-hidden">
    <div className="flex items-center gap-2 px-4 md:px-6 py-3 bg-[#1A1A1A] border-b border-[#222]">
      {icon && <span className="text-[#4169E1] text-xs">{icon}</span>}
      <span className="text-[#F2F0EB] text-[9px] font-bold uppercase tracking-[0.2em]">{title}</span>
    </div>
    <div className="p-4 md:p-6 space-y-4">{children}</div>
  </div>
);

const ProjectDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ ...emptyForm });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedHeroFile, setSelectedHeroFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState({});
  const [msg, setMsg] = useState('');
  const token = getAdminToken();

  const fetchProjects = async () => {
    setLoading(true);
    const { data, status } = await apiCall('/projects', 'GET');
    if (status === 200) setProjects(data);
    else setMsg('Failed to load projects');
    setLoading(false);
  };
  useEffect(() => { fetchProjects(); }, []);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const persistOrder = useCallback(async (ordered) => {
    const items = ordered.map((p, i) => ({ id: p.id, position: i }));
    const { status } = await apiCall('/projects/reorder', 'PUT', { items }, token);
    if (status !== 200) { setMsg('Failed to save order'); setTimeout(() => setMsg(''), 3000); }
  }, [token]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setProjects((prev) => {
      const oldIndex = prev.findIndex((p) => p.id === active.id);
      const newIndex = prev.findIndex((p) => p.id === over.id);
      if (oldIndex === -1 || newIndex === -1) return prev;
      const updated = [...prev];
      const [moved] = updated.splice(oldIndex, 1);
      updated.splice(newIndex, 0, moved);
      persistOrder(updated);
      return updated;
    });
  };

  const moveProject = (id, direction) => {
    setProjects((prev) => {
      const index = prev.findIndex((p) => p.id === id);
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

  const generatePath = (title) => '/project/' + title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm(f => ({ ...f, title, path: editing ? f.path : generatePath(title) }));
  };

  const openNewForm = () => {
    setEditing(null);
    setForm({ ...emptyForm, results: [{ stat: '', label: '', desc: '' }], processSteps: [{ step: '01', phase: '', title: '', desc: '' }], galleryCategories: [{ name: '', images: '' }], videoTabs: [{ label: '', url: '' }] });
    setGalleryFiles({});
    setShowForm(true);
  };

  const parseJSON = (val, fallback) => { if (!val) return fallback; try { return typeof val === 'string' ? JSON.parse(val) : val; } catch { return fallback; } };

  const openEditForm = (project) => {
    setEditing(project);
    setForm({
      title: project.title || '', metaTitle: project.metaTitle || '', metaDescription: project.metaDescription || '',
      category: project.category || 'Animation', image: project.image || '',
      heroImage: project.heroImage || '', heroVideo: project.heroVideo || '',
      heroType: (project.heroVideo && !project.heroImage) ? 'video' : 'image',
      path: project.path || '', description: project.description || '',
      client: project.client || '', service: project.service || '', duration: project.duration || '', deliverables: project.deliverables || '',
      overviewHeading: project.overviewHeading || 'Project overview', overviewText: project.overviewText || '',
      challengeHeading: project.challengeHeading || 'Key challenges', challengeText: project.challengeText || '',
      results: parseJSON(project.results, [{ stat: '', label: '', desc: '' }]),
      processSteps: parseJSON(project.processSteps, [{ step: '01', phase: '', title: '', desc: '' }]),
      galleryCategories: parseJSON(project.galleryCategories, [{ name: '', images: '' }]),
      videoTabs: parseJSON(project.videoTabs, [{ label: '', url: '' }]),
      ctaUrl: project.ctaUrl || '', ctaText: project.ctaText || '',
    });
    setShowForm(true);
  };

  const fillDemoData = () => {
    setForm({
      ...emptyForm,
      ...demoData,
      results: [...demoData.results],
      processSteps: [...demoData.processSteps],
      galleryCategories: [...demoData.galleryCategories],
      videoTabs: [...demoData.videoTabs],
    });
    setMsg('Demo data loaded — replace with your content');
    setTimeout(() => setMsg(''), 4000);
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

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');

    let imageUrl = form.image;
    if (selectedFile) {
      setUploading(true);
      const fd = new FormData();
      fd.append('image', selectedFile);
      fd.append('type', 'projects');
      try {
        const uploadRes = await fetch(`${API_BASE_URL}/upload`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
        const uploadData = await uploadRes.json();
        if (uploadData.url) imageUrl = uploadData.url;
        else throw new Error('Upload failed');
      } catch (err) { setMsg('Image upload failed'); setUploading(false); setSaving(false); return; }
      setUploading(false);
    }

    let heroImageUrl = form.heroImage;
    if (selectedHeroFile) {
      const fd = new FormData();
      fd.append('image', selectedHeroFile);
      fd.append('type', 'projects');
      try {
        const uploadRes = await fetch(`${API_BASE_URL}/upload`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
        const uploadData = await uploadRes.json();
        if (uploadData.url) heroImageUrl = uploadData.url;
      } catch (err) { setMsg('Hero image upload failed'); setSaving(false); return; }
    }

    let galleryData = [...form.galleryCategories];
    for (let i = 0; i < galleryData.length; i++) {
      const files = galleryFiles[i];
      if (files && files.length > 0) {
        const existingUrls = galleryData[i].images ? galleryData[i].images.split(',').map(s => s.trim()).filter(Boolean) : [];
        const newUrls = [];
        for (const file of files) {
          const fd = new FormData();
          fd.append('image', file);
          fd.append('type', 'projects');
          try {
            const uploadRes = await fetch(`${API_BASE_URL}/upload`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
            const uploadData = await uploadRes.json();
            if (uploadData.url) newUrls.push(uploadData.url);
          } catch (err) { setMsg('Gallery upload failed'); setSaving(false); return; }
        }
        galleryData[i] = { ...galleryData[i], images: [...existingUrls, ...newUrls].join(',') };
      }
    }

    const { heroType, ...formWithoutToggle } = form;
    const payload = {
      ...formWithoutToggle,
      image: imageUrl,
      heroImage: heroType === 'image' ? heroImageUrl : '',
      heroVideo: heroType === 'video' ? form.heroVideo : '',
      results: JSON.stringify(form.results.filter(r => r.stat || r.label)),
      processSteps: JSON.stringify(form.processSteps.filter(p => p.phase || p.title)),
      galleryCategories: JSON.stringify(galleryData.filter(g => g.name)),
      videoTabs: JSON.stringify(form.videoTabs.filter(v => v.label || v.url)),
      ctaUrl: form.ctaUrl || null,
      ctaText: form.ctaText || null,
    };

    let res;
    if (editing) res = await apiCall(`/projects/${editing.id}`, 'PUT', payload, token);
    else res = await apiCall('/projects', 'POST', payload, token);

    if (res.status === 200 || res.status === 201) {
      setMsg(editing ? 'Project updated!' : 'Project created!');
      setShowForm(false);
      setEditing(null);
      setSelectedFile(null);
      setSelectedHeroFile(null);
      fetchProjects();
    } else {
      setMsg(res.data?.message || 'Failed to save');
    }
    setSaving(false);
    setTimeout(() => setMsg(''), 3000);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this project?')) return;
    const { status } = await apiCall(`/projects/${id}`, 'DELETE', null, token);
    if (status === 200) { setMsg('Project deleted'); fetchProjects(); }
    else setMsg('Delete failed');
    setTimeout(() => setMsg(''), 3000);
  };

  if (loading) return <div className="flex items-center justify-center py-20"><div className="w-10 h-10 border-t-2 border-[#4169E1] border-solid rounded-full animate-spin"></div></div>;

  return (
    <div className="bg-[#0D0D0D] p-4 md:p-6 rounded-2xl">
      {msg && <div className="fixed top-8 right-8 z-[60] bg-[#4169E1] text-white px-6 py-4 rounded-2xl shadow-lg font-bold flex items-center gap-3 animate-in fade-in text-[10px] uppercase tracking-widest"><FiSave size={18} /> {msg}</div>}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 md:mb-8">
        <div>
          <h3 className="text-base md:text-lg font-bold uppercase tracking-tight text-[#F2F0EB]">Projects</h3>
          <p className="text-[#888] text-[7px] md:text-[8px] uppercase tracking-widest mt-1">Manage portfolio projects — drag to reorder</p>
        </div>
        <button onClick={openNewForm} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#4169E1] text-white font-bold px-5 py-3 rounded-xl hover:bg-[#3158D4] transition-all text-[8px] uppercase tracking-[0.2em]"><FiPlus /> New Project</button>
      </div>

      {projects.length === 0 ? (
        <div className="bg-[#111] border border-[#222] border-dashed rounded-[2rem] p-16 md:p-32 text-center">
          <p className="text-[#555] text-[9px] font-bold tracking-[0.4em] uppercase">No Projects Yet</p>
          <button onClick={openNewForm} className="mt-4 text-[#4169E1] text-[8px] uppercase tracking-widest underline underline-offset-4">Add your first project</button>
        </div>
      ) : (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={projects.map(p => p.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {projects.map((project, index) => (
                <SortableProjectItem key={project.id} project={project} onEdit={openEditForm} onDelete={handleDelete} onMoveUp={(id) => moveProject(id, -1)} onMoveDown={(id) => moveProject(id, 1)} isFirst={index === 0} isLast={index === projects.length - 1} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-[#0D0D0D]/80 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4" onClick={() => setShowForm(false)}>
          <div className="bg-[#0D0D0D] border border-[#222] rounded-xl md:rounded-[2rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between p-4 md:p-6 border-b border-[#222] sticky top-0 bg-[#0D0D0D] z-10">
              <div className="flex items-center gap-3">
                <h3 className="text-sm md:text-lg font-bold uppercase tracking-tight text-[#F2F0EB]">{editing ? 'Edit Project' : 'New Project'}</h3>
                {!editing && (
                  <button type="button" onClick={fillDemoData} className="text-[7px] md:text-[8px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-dashed border-[#555] text-[#555] hover:text-[#4169E1] hover:border-[#4169E1] transition-all">
                    Load Demo Data
                  </button>
                )}
              </div>
              <button onClick={() => setShowForm(false)} className="p-1.5 md:p-2 bg-[#1A1A1A] text-[#555] hover:text-[#F2F0EB] rounded-xl transition-all"><FiX size={16} /></button>
            </div>
            <form onSubmit={handleSave} className="p-4 md:p-6 space-y-5">

              {/* ===== SECTION: BASIC INFO ===== */}
              <SectionCard title="1. Basic Information" icon={<FiImage size={12} />}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Project Title <span className="text-red-400">*</span></label>
                    <input type="text" required value={form.title} onChange={handleTitleChange} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" placeholder="e.g. Malka Food — Dynamic Product Commercial" />
                  </div>
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Categories <span className="text-red-400">*</span> <span className="text-[#555]">(select one or more)</span></label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map(c => {
                        const selected = form.category.split(',').map(s => s.trim()).includes(c);
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
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">URL Path <span className="text-red-400">*</span></label>
                    <input type="text" required value={form.path} onChange={(e) => setForm(f => ({ ...f, path: '/project/' + e.target.value.replace(/^\/?(project\/)?/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs font-mono placeholder:text-[#444]" placeholder="/project/your-project-slug" />
                  </div>
                </div>
              </SectionCard>

              {/* ===== SECTION: META INFO (Hero) ===== */}
              <SectionCard title="2. Hero Meta Info" icon="??">
                <p className="text-[#555] text-[7px] uppercase tracking-widest mb-3 -mt-2">This appears in the hero section — Client, Service, Duration, Deliverables</p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Client</label>
                    <input type="text" value={form.client} onChange={(e) => setForm(f => ({ ...f, client: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" placeholder="e.g. Malka Food" />
                  </div>
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Service</label>
                    <input type="text" value={form.service} onChange={(e) => setForm(f => ({ ...f, service: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" placeholder="e.g. 3D Product Commercial" />
                  </div>
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Duration</label>
                    <input type="text" value={form.duration} onChange={(e) => setForm(f => ({ ...f, duration: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" placeholder="e.g. 4 weeks" />
                  </div>
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Deliverables</label>
                    <input type="text" value={form.deliverables} onChange={(e) => setForm(f => ({ ...f, deliverables: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" placeholder="e.g. Product video" />
                  </div>
                </div>
              </SectionCard>

              {/* ===== SECTION: MEDIA ===== */}
              <SectionCard title="3. Media (Card Image + Hero Section)" icon="??">
                <div>
                  <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Card Image <span className="text-[#555]">(thumbnail in dashboard & latest work grid)</span></label>
                  <div className="flex items-center gap-3">
                    {form.image && (
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-[#333] shrink-0 group">
                        <img src={form.image.startsWith('http') || form.image.startsWith('blob:') ? form.image : `${BACKEND_ORIGIN}${form.image}`} alt="" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => { setForm(f => ({ ...f, image: '' })); setSelectedFile(null); }} className="absolute inset-0 bg-[#0D0D0D]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"><FiX className="text-white text-xs" /></button>
                      </div>
                    )}
                    <label className={`flex-1 flex items-center justify-center gap-2 border border-dashed border-[#333] rounded-xl px-4 py-4 cursor-pointer hover:border-[#4169E1]/50 transition-all ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                      <FiUpload className={`${uploading ? 'animate-bounce text-[#4169E1]' : 'text-[#555]'}`} />
                      <span className="text-[#555] text-[9px] font-bold uppercase tracking-widest">{uploading ? 'Uploading...' : 'Choose Image'}</span>
                      <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files[0]; if (!file) return; setForm(f => ({ ...f, image: URL.createObjectURL(file) })); setSelectedFile(file); }} className="hidden" disabled={uploading} />
                    </label>
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Hero Section Type</label>
                  <div className="flex gap-2 mb-3">
                    {['image', 'video'].map((t) => (
                      <button key={t} type="button" onClick={() => setForm(f => ({ ...f, heroType: t, heroImage: t === 'video' ? '' : f.heroImage, heroVideo: t === 'image' ? '' : f.heroVideo }))}
                        className={`flex-1 text-[9px] font-bold uppercase tracking-widest px-4 py-3 rounded-xl border transition-all ${form.heroType === t ? 'bg-[#4169E1] text-white border-[#4169E1]' : 'bg-[#1A1A1A] text-[#555] border-[#333] hover:border-[#4169E1]/50'}`}>
                        {t === 'image' ? '?? Hero Image' : '?? YouTube Video'}
                      </button>
                    ))}
                  </div>
                  {form.heroType === 'image' ? (
                    <div className="flex items-center gap-3">
                      {form.heroImage && (
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-[#333] shrink-0 group">
                          <img src={form.heroImage.startsWith('http') || form.heroImage.startsWith('blob:') ? form.heroImage : `${BACKEND_ORIGIN}${form.heroImage}`} alt="" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => { setForm(f => ({ ...f, heroImage: '' })); setSelectedHeroFile(null); }} className="absolute inset-0 bg-[#0D0D0D]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"><FiX className="text-white text-xs" /></button>
                        </div>
                      )}
                      <label className="flex-1 flex items-center justify-center gap-2 border border-dashed border-[#333] rounded-xl px-4 py-4 cursor-pointer hover:border-[#4169E1]/50 transition-all">
                        <FiUpload className="text-[#555]" /><span className="text-[#555] text-[9px] font-bold uppercase tracking-widest">Choose Hero Image</span>
                        <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files[0]; if (!file) return; setForm(f => ({ ...f, heroImage: URL.createObjectURL(file) })); setSelectedHeroFile(file); }} className="hidden" />
                      </label>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <input type="text" value={form.heroVideo} onChange={(e) => setForm(f => ({ ...f, heroVideo: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" placeholder="YouTube URL (watch / youtu.be / embed)" />
                      {form.heroVideo && <div className="rounded-xl overflow-hidden border border-[#333] aspect-video bg-[#0D0D0D]"><iframe src={getYoutubeEmbed(form.heroVideo)} className="w-full h-full" allowFullScreen></iframe></div>}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Video Tabs <span className="text-[#555]">(for hero section — optional)</span></label>
                  {form.videoTabs.map((tab, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <input type="text" value={tab.label} onChange={(e) => updateArray('videoTabs', i, 'label', e.target.value)} placeholder="Tab label (e.g. Jam & Spread)" className="flex-1 bg-[#1A1A1A] border border-[#333] rounded-xl px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" />
                      <input type="text" value={tab.url} onChange={(e) => updateArray('videoTabs', i, 'url', e.target.value)} placeholder="YouTube URL" className="flex-[2] bg-[#1A1A1A] border border-[#333] rounded-xl px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" />
                      {form.videoTabs.length > 1 && <button type="button" onClick={() => removeArrayItem('videoTabs', i)} className="p-2 text-red-400 hover:text-red-300"><FiX size={14} /></button>}
                    </div>
                  ))}
                  <button type="button" onClick={() => addArrayItem('videoTabs', { label: '', url: '' })} className="text-[#4169E1] text-[8px] uppercase tracking-widest font-bold hover:underline"><FiPlus className="inline mr-1" />Add Video Tab</button>
                </div>
              </SectionCard>

              {/* ===== SECTION: OVERVIEW & CHALLENGE ===== */}
              <SectionCard title="4. Overview & Challenge" icon="??">
                <div>
                  <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Overview Heading</label>
                  <input type="text" value={form.overviewHeading} onChange={(e) => setForm(f => ({ ...f, overviewHeading: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" placeholder="e.g. Bringing flavor to the screen" />
                </div>
                <div>
                  <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Overview Text</label>
                  <textarea value={form.overviewText} onChange={(e) => setForm(f => ({ ...f, overviewText: e.target.value }))} rows={3} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444] resize-none" placeholder="Describe the project..." />
                </div>
                <div>
                  <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Challenge Heading</label>
                  <input type="text" value={form.challengeHeading} onChange={(e) => setForm(f => ({ ...f, challengeHeading: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" placeholder="e.g. Capturing perfect freshness" />
                </div>
                <div>
                  <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Challenge Text</label>
                  <textarea value={form.challengeText} onChange={(e) => setForm(f => ({ ...f, challengeText: e.target.value }))} rows={3} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444] resize-none" placeholder="Describe the challenge..." />
                </div>
              </SectionCard>

              {/* ===== SECTION: RESULTS ===== */}
              <SectionCard title="5. Results" icon="??">
                <p className="text-[#555] text-[7px] uppercase tracking-widest -mt-2">Add measurable results — each with a stat, label, and description</p>
                {form.results.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-[#1A1A1A] rounded-xl border border-[#222]">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                      <input type="text" value={r.stat} onChange={(e) => updateArray('results', i, 'stat', e.target.value)} placeholder="Stat (e.g. 4K+)" className="bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" />
                      <input type="text" value={r.label} onChange={(e) => updateArray('results', i, 'label', e.target.value)} placeholder="Label (e.g. Frames Rendered)" className="bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" />
                      <input type="text" value={r.desc} onChange={(e) => updateArray('results', i, 'desc', e.target.value)} placeholder="Description" className="bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" />
                    </div>
                    {form.results.length > 1 && <button type="button" onClick={() => removeArrayItem('results', i)} className="p-2 text-red-400 hover:text-red-300 mt-1"><FiX size={14} /></button>}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('results', { stat: '', label: '', desc: '' })} className="text-[#4169E1] text-[8px] uppercase tracking-widest font-bold hover:underline"><FiPlus className="inline mr-1" />Add Result</button>
              </SectionCard>

              {/* ===== SECTION: PROCESS ===== */}
              <SectionCard title="6. Process Steps" icon="??">
                <p className="text-[#555] text-[7px] uppercase tracking-widest -mt-2">Add process steps — each with step number, phase, title, and description</p>
                {form.processSteps.map((p, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-[#1A1A1A] rounded-xl border border-[#222]">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2">
                      <input type="text" value={p.step} onChange={(e) => updateArray('processSteps', i, 'step', e.target.value)} placeholder="Step (e.g. 01)" className="bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444] w-16" />
                      <input type="text" value={p.phase} onChange={(e) => updateArray('processSteps', i, 'phase', e.target.value)} placeholder="Phase (e.g. Macro CGI)" className="bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" />
                      <input type="text" value={p.title} onChange={(e) => updateArray('processSteps', i, 'title', e.target.value)} placeholder="Title" className="bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" />
                      <input type="text" value={p.desc} onChange={(e) => updateArray('processSteps', i, 'desc', e.target.value)} placeholder="Description" className="bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" />
                    </div>
                    {form.processSteps.length > 1 && <button type="button" onClick={() => removeArrayItem('processSteps', i)} className="p-2 text-red-400 hover:text-red-300 mt-1"><FiX size={14} /></button>}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('processSteps', { step: String(form.processSteps.length + 1).padStart(2, '0'), phase: '', title: '', desc: '' })} className="text-[#4169E1] text-[8px] uppercase tracking-widest font-bold hover:underline"><FiPlus className="inline mr-1" />Add Step</button>
              </SectionCard>

              {/* ===== SECTION: GALLERY ===== */}
              <SectionCard title="7. Gallery Categories" icon="??">
                <p className="text-[#555] text-[7px] uppercase tracking-widest -mt-2">Add category name, then upload images or paste URLs</p>
                {form.galleryCategories.map((g, i) => (
                  <div key={i} className="p-3 bg-[#1A1A1A] rounded-xl border border-[#222] space-y-2">
                    <div className="flex items-start gap-2">
                      <input type="text" value={g.name} onChange={(e) => updateArray('galleryCategories', i, 'name', e.target.value)} placeholder="Category name (e.g. Hero Shots)" className="flex-1 bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" />
                      {form.galleryCategories.length > 1 && <button type="button" onClick={() => removeArrayItem('galleryCategories', i)} className="p-2 text-red-400 hover:text-red-300"><FiX size={14} /></button>}
                    </div>
                    <input type="text" value={g.images} onChange={(e) => updateArray('galleryCategories', i, 'images', e.target.value)} placeholder="Paste image URLs (comma separated)" className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" />
                    {g.images && g.images.split(',').filter(s => s.trim()).length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {g.images.split(',').filter(s => s.trim()).map((url, j) => (
                          <div key={j} className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#333] group">
                            <img src={url.trim().startsWith('http') ? url.trim() : `${BACKEND_ORIGIN}${url.trim()}`} alt="" className="w-full h-full object-cover" />
                            <button type="button" onClick={() => {
                              const urls = g.images.split(',').filter(s => s.trim());
                              urls.splice(j, 1);
                              updateArray('galleryCategories', i, 'images', urls.join(', '));
                            }} className="absolute inset-0 bg-[#0D0D0D]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"><FiX className="text-white text-[8px]" /></button>
                          </div>
                        ))}
                      </div>
                    )}
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

              {/* ===== SECTION: DESCRIPTION ===== */}
              <SectionCard title="8. Description (HTML)" icon="??">
                <p className="text-[#555] text-[7px] uppercase tracking-widest -mt-2">Full HTML description — used for overview text (HTML tags stripped)</p>
                <HtmlEditor value={form.description} onChange={(val) => setForm(f => ({ ...f, description: val }))} minHeight={200} />
              </SectionCard>

              {/* ===== SECTION: SEO ===== */}
              <SectionCard title="9. SEO Settings" icon="??">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Meta Title <span className="text-[#555]">(optional)</span></label>
                    <input type="text" value={form.metaTitle} onChange={(e) => setForm(f => ({ ...f, metaTitle: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" placeholder="Leave blank to use project title" />
                  </div>
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Meta Description <span className="text-[#555]">(optional)</span></label>
                    <input type="text" value={form.metaDescription} onChange={(e) => setForm(f => ({ ...f, metaDescription: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" placeholder="Leave blank to use description" />
                  </div>
                </div>
              </SectionCard>

              {/* ===== SECTION: CTA LINK ===== */}
              <SectionCard title="10. CTA Button" icon="??">
                <p className="text-[#555] text-[7px] uppercase tracking-widest -mt-2">Add a call-to-action button on this project page</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Button Text</label>
                    <input type="text" value={form.ctaText} onChange={(e) => setForm(f => ({ ...f, ctaText: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" placeholder="e.g. View Live Project" />
                  </div>
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">URL <span className="text-[#555]">(full URL or /path)</span></label>
                    <input type="text" value={form.ctaUrl} onChange={(e) => setForm(f => ({ ...f, ctaUrl: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs font-mono placeholder:text-[#444]" placeholder="https://example.com or /contact" />
                  </div>
                </div>
              </SectionCard>

              {/* ===== ACTION BUTTONS ===== */}
              <div className="flex gap-3 pt-4 sticky bottom-0 bg-[#0D0D0D] pb-2">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 border border-[#333] text-[#888] font-bold py-3.5 rounded-xl hover:bg-[#1A1A1A] transition-all text-[8px] uppercase tracking-[0.2em]">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-[#4169E1] text-white font-bold py-3.5 rounded-xl hover:bg-[#3158D4] transition-all disabled:opacity-50 text-[8px] uppercase tracking-[0.2em]">
                  {saving ? 'Saving...' : editing ? 'Update Project' : 'Create Project'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDashboard;
