'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiCall, API_BASE_URL, BACKEND_ORIGIN, getYoutubeEmbed } from '../utils/api';
import { getAdminToken } from '../utils/auth';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiUpload, FiChevronUp, FiChevronDown, FiChevronLeft, FiChevronRight, FiMove, FiImage } from '@/components/ui/Icons';
import HtmlEditor from './ui/HtmlEditor';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const categories = ['Configurator', 'Architecture', 'Animation'];

export const defaultSectionOrder = ['storyBlocks', 'thumbnails', 'stills', 'results', 'process', 'content'];

export const normalizeSectionOrder = (order) => {
  if (!order || !Array.isArray(order) || order.length === 0) return [...defaultSectionOrder];
  const list = [];
  for (const item of order) {
    if (item === 'gallery') {
      if (!list.includes('thumbnails')) list.push('thumbnails');
      if (!list.includes('stills')) list.push('stills');
    } else {
      if (!list.includes(item)) list.push(item);
    }
  }
  if (!list.includes('thumbnails') && !list.includes('stills')) {
    list.splice(1, 0, 'thumbnails', 'stills');
  } else {
    if (!list.includes('thumbnails')) list.push('thumbnails');
    if (!list.includes('stills')) list.push('stills');
  }
  return list;
};

export const resolvePreviewUrl = (src) => {
  if (!src || typeof src !== 'string') return '';
  const s = src.trim();
  if (s.startsWith('blob:') || s.startsWith('data:')) return s;
  if (s.includes('elipsestudio.com/photo-') || s.includes('elipsestudio.com/premium_photo-')) {
    return s.replace(/https?:\/\/elipsestudio\.com\//, 'https://images.unsplash.com/');
  }
  const uploadIdMatch = s.match(/(?:\/uploads\/media\/)(\d+)\.[a-zA-Z0-9]+$/);
  if (uploadIdMatch) {
    return `${BACKEND_ORIGIN}/media/${uploadIdMatch[1]}`;
  }
  if (s.includes('/media/')) {
    const match = s.match(/(\/media\/.*)$/);
    if (match) return `${BACKEND_ORIGIN}${match[1]}`;
  }
  if (s.includes('/uploads/')) {
    const match = s.match(/(\/uploads\/.*)$/);
    if (match) return `${BACKEND_ORIGIN}${match[1]}`;
  }
  if (s.startsWith('http://') || s.startsWith('https://')) {
    return s;
  }
  return s ? `${BACKEND_ORIGIN}/${s.replace(/^\//, '')}` : '';
};

const emptyForm = {
  title: '', subtitle: '', metaTitle: '', metaDescription: '', category: '',
  image: '', heroImage: '', heroVideo: '', heroType: 'image',
  heroAspectRatio: 'video', tickerWords: '',
  path: '', description: '',
  client: '', service: '', duration: '', deliverables: '',
  overviewHeading: '', overviewText: '', challengeHeading: '', challengeText: '',
  storyBlocks: [
    {
      tag: 'Overview',
      heading: '',
      text: '',
      image: '',
      position: 'left',
    },
    {
      tag: 'The challenge',
      heading: '',
      text: '',
      image: '',
      position: 'right',
    },
  ],
  galleryThumbnails: '',
  galleryStills: '',
  galleryCategories: [{ name: '', images: '' }],
  results: [],
  processSteps: [],
  sectionOrder: defaultSectionOrder,
  videoTabs: [{ label: '', url: '', aspectRatio: 'video' }],
  ctaUrl: '', ctaText: '',
  heroIntroText: '',
  heroStars: 5,
  heroReviewTitle: '',
  heroReviewSubtitle: '',
  heroQuoteText: '',
  heroQuoteAuthor: '',
  thumbnailsHeading: '',
  thumbnailsEyebrow: '',
  stillsHeading: '',
  stillsEyebrow: '',
  resultsHeading: '',
  resultsEyebrow: '',
  processHeading: '',
  processEyebrow: '',
};

const demoData = {
  title: 'Enterprise VR Training & Simulation',
  subtitle: 'High-fidelity 3D product visualization and CGI animation pipeline cutting campaign turnaround by 70%.',
  heroAspectRatio: 'video',
  tickerWords: '3D PRODUCT • CGI ANIMATION • UNREAL ENGINE 5 • PHOTOREALISM • VFX',
  category: 'VR, Animation',
  path: '/project/enterprise-vr-training',
  client: 'Enterprise VR Corp',
  service: 'VR Training & Simulation',
  duration: '6 weeks',
  deliverables: 'Interactive VR Environment, 3D Assets, Analytics',
  overviewHeading: 'Enterprise VR Training & Simulation',
  overviewText: 'The VR Training project revolutionizes workforce development through immersive simulation. Our objective was to create a safe, repeatable, and photorealistic virtual environment where professionals can practice complex procedures, from industrial safety protocols to high-stakes medical interventions, with zero real-world risk.',
  challengeHeading: 'Training Realism',
  challengeText: 'Balancing technical accuracy with a seamless user experience is critical for effective training. We had to ensure that every interactive element responded with realistic physics and that the feedback loop—whether success or failure—provided clear, actionable data for the trainee.',
  storyBlocks: [
    {
      tag: 'Overview',
      heading: 'Enterprise VR Training & Simulation',
      text: 'The VR Training project revolutionizes workforce development through immersive simulation. Our objective was to create a safe, repeatable, and photorealistic virtual environment where professionals can practice complex procedures, from industrial safety protocols to high-stakes medical interventions, with zero real-world risk.',
      image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=1200',
      position: 'left',
    },
    {
      tag: 'The challenge',
      heading: 'Training Realism',
      text: 'Balancing technical accuracy with a seamless user experience is critical for effective training. We had to ensure that every interactive element responded with realistic physics and that the feedback loop—whether success or failure—provided clear, actionable data for the trainee.',
      image: 'https://images.unsplash.com/photo-1622979135225-d2ba269bc1df?w=1200',
      position: 'right',
    },
  ],
  galleryThumbnails: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=1200, https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?w=1200, https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=1200',
  galleryStills: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200, https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1200, https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200',
  galleryCategories: [],
  results: [
    { stat: '4k', label: 'Retention', desc: 'Safe simulation environment for high-stakes procedural training' },
    { stat: '4k', label: 'Retention', desc: 'Safe simulation environment for high-stakes procedural training' },
    { stat: '4k', label: 'Retention', desc: 'Safe simulation environment for high-stakes procedural training' },
  ],
  processSteps: [
    { step: '01', phase: 'Research', title: 'Research', desc: 'Training needs analysis and subject matter expert consultations for scenario accuracy' },
    { step: '02', phase: 'Research', title: 'Research', desc: 'Training needs analysis and subject matter expert consultations for scenario accuracy' },
    { step: '03', phase: 'Research', title: 'Research', desc: 'Training needs analysis and subject matter expert consultations for scenario accuracy' },
    { step: '04', phase: 'Research', title: 'Research', desc: 'Training needs analysis and subject matter expert consultations for scenario accuracy' },
  ],
  sectionOrder: defaultSectionOrder,
  description: '<h2>Project Background</h2><p>Enterprise VR Training represents a leap forward in high-stakes procedural learning. By replacing passive manuals with photorealistic, physics-driven simulations, learners gain real-time tactical muscle memory with zero real-world risk.</p>',
  ctaUrl: '/contact',
  ctaText: 'Start a project',
  videoTabs: [
    { label: 'Video 1', url: '', aspectRatio: 'video' },
    { label: 'Reel 2', url: '', aspectRatio: 'reel' },
  ],
};

const SortableProjectItem = ({ project, onEdit, onDelete, onMoveUp, onMoveDown, isFirst, isLast }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project.id });
  const style = { transform: CSS.Transform.toString(transform), transition, opacity: isDragging ? 0.4 : 1, zIndex: isDragging ? 10 : 1, position: 'relative' };
  return (
    <div ref={setNodeRef} style={style} className={`bg-[#111] border border-[#222] p-3 md:p-5 rounded-[1rem] md:rounded-[1.5rem] hover:border-[#4169E1]/40 transition-all flex items-center gap-2 md:gap-4 group ${isDragging ? 'shadow-[0_0_30px_rgba(65,105,225,0.15)] border-[#4169E1]/50' : ''}`}>
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 md:p-1.5 text-[#555] hover:text-[#4169E1] transition-colors shrink-0"><FiMove className="text-sm md:text-lg" /></div>
      <div className="w-10 h-10 md:w-16 md:h-16 rounded-lg md:rounded-xl overflow-hidden bg-[#1A1A1A] shrink-0 border border-[#333]">
        {project.image ? <img src={resolvePreviewUrl(project.image)} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[#555]"><FiImage size={20} /></div>}
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
  const [storyBlockFiles, setStoryBlockFiles] = useState({});
  const [thumbnailFiles, setThumbnailFiles] = useState([]);
  const [stillFiles, setStillFiles] = useState([]);
  const [msg, setMsg] = useState('');
  const token = getAdminToken();

  const fetchProjects = async () => {
    setLoading(true);
    const { data, status } = await apiCall('/projects', 'GET');
    if (status === 200) setProjects(data);
    else setMsg('Failed to load projects');
    setLoading(false);
  };
  // Standard fetch-on-mount: fetchProjects's setState calls only run after
  // its awaited request settles, not synchronously within this effect.
  // eslint-disable-next-line react-hooks/set-state-in-effect
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
    setForm({
      ...emptyForm,
      storyBlocks: emptyForm.storyBlocks.map(b => ({ ...b })),
      results: emptyForm.results.map(r => ({ ...r })),
      processSteps: emptyForm.processSteps.map(p => ({ ...p })),
      videoTabs: [{ label: '', url: '' }],
      sectionOrder: [...defaultSectionOrder],
    });
    setStoryBlockFiles({});
    setThumbnailFiles([]);
    setStillFiles([]);
    setShowForm(true);
  };

  const parseJSON = (val, fallback) => { if (!val) return fallback; try { return typeof val === 'string' ? JSON.parse(val) : val; } catch { return fallback; } };

  const openEditForm = (project) => {
    setEditing(project);
    const parsedSections = parseJSON(project.sections, []);
    let storyBlocks = [];
    let sectionOrder = [...defaultSectionOrder];

    if (Array.isArray(parsedSections) && parsedSections.length > 0 && (parsedSections[0].heading || parsedSections[0].text || parsedSections[0].content)) {
      if (parsedSections[0]?.sectionOrder && Array.isArray(parsedSections[0].sectionOrder)) {
        sectionOrder = normalizeSectionOrder(parsedSections[0].sectionOrder);
      }
      storyBlocks = parsedSections.map((s, idx) => ({
        tag: s.tag || (idx === 0 ? 'Overview' : (idx === 1 ? 'The challenge' : `Section ${idx + 1}`)),
        heading: s.heading || (idx === 0 ? project.overviewHeading : project.challengeHeading) || '',
        text: s.text || s.content || '',
        image: s.image || '',
        position: s.position || (idx % 2 === 0 ? 'left' : 'right'),
      }));
    } else {
      storyBlocks = [
        {
          tag: 'Overview',
          heading: project.overviewHeading || '',
          text: project.overviewText || '',
          image: '',
          position: 'left',
        },
        {
          tag: 'The challenge',
          heading: project.challengeHeading || '',
          text: project.challengeText || '',
          image: '',
          position: 'right',
        },
      ];
    }

    const rawCats = parseJSON(project.galleryCategories, []);
    let galleryThumbnails = '';
    let galleryStills = '';
    const otherCats = [];

    if (Array.isArray(rawCats)) {
      rawCats.forEach(c => {
        const imgs = Array.isArray(c.images) ? c.images.join(', ') : (c.images || '');
        if (c.type === 'thumbnails' || c.name === 'Thumbnails') {
          galleryThumbnails = galleryThumbnails ? `${galleryThumbnails}, ${imgs}` : imgs;
        } else if (c.type === 'stills' || c.name === 'Still Images' || c.name === 'Still Renders') {
          galleryStills = galleryStills ? `${galleryStills}, ${imgs}` : imgs;
        } else if (c.name) {
          otherCats.push(c);
        }
      });
    }

    const firstSec = storyBlocks[0] || {};
    const subtitle = firstSec.subtitle || project.subtitle || project.metaDescription || '';
    const heroAspectRatio = firstSec.heroAspectRatio || project.heroAspectRatio || 'video';
    const tickerWords = firstSec.tickerWords || project.tickerWords || '';

    setForm({
      title: project.title || '', subtitle, metaTitle: project.metaTitle || '', metaDescription: project.metaDescription || '',
      category: project.category || 'Configurator', image: project.image || '',
      heroImage: project.heroImage || '', heroVideo: project.heroVideo || '',
      heroType: (project.heroVideo && !project.heroImage) ? 'video' : 'image',
      heroAspectRatio, tickerWords,
      path: project.path || '', description: project.description || '',
      client: project.client || '', service: project.service || '', duration: project.duration || '', deliverables: project.deliverables || '',
      overviewHeading: project.overviewHeading || '', overviewText: project.overviewText || '',
      challengeHeading: project.challengeHeading || '', challengeText: project.challengeText || '',
      storyBlocks,
      galleryThumbnails,
      galleryStills,
      galleryCategories: otherCats.length > 0 ? otherCats : [{ name: '', images: '' }],
      results: parseJSON(project.results, []),
      processSteps: parseJSON(project.processSteps, []),
      sectionOrder,
      videoTabs: (() => {
        let vts = parseJSON(project.videoTabs, []);
        if (!vts || vts.length === 0) vts = firstSec.videoTabs || [];
        if (!vts || vts.length === 0) {
          return [
            { label: 'Video 1', url: project.heroVideo || '', aspectRatio: heroAspectRatio },
            { label: 'Reel 2', url: '', aspectRatio: 'reel' },
          ];
        }
        if (vts.length === 1) {
          return [...vts, { label: 'Reel 2', url: '', aspectRatio: 'reel' }];
        }
        return vts;
      })(),
      ctaUrl: project.ctaUrl || firstSec.ctaUrl || '',
      ctaText: project.ctaText || firstSec.ctaText || '',
      heroIntroText: firstSec.heroIntroText || project.heroIntroText || '',
      heroStars: firstSec.heroStars || project.heroStars || 5,
      heroReviewTitle: firstSec.heroReviewTitle || project.heroReviewTitle || '',
      heroReviewSubtitle: firstSec.heroReviewSubtitle || project.heroReviewSubtitle || '',
      heroQuoteText: firstSec.heroQuoteText || project.heroQuoteText || '',
      heroQuoteAuthor: firstSec.heroQuoteAuthor || project.heroQuoteAuthor || '',
      thumbnailsHeading: firstSec.thumbnailsHeading || project.thumbnailsHeading || '',
      thumbnailsEyebrow: firstSec.thumbnailsEyebrow || project.thumbnailsEyebrow || '',
      stillsHeading: firstSec.stillsHeading || project.stillsHeading || '',
      stillsEyebrow: firstSec.stillsEyebrow || project.stillsEyebrow || '',
      resultsHeading: firstSec.resultsHeading || project.resultsHeading || '',
      resultsEyebrow: firstSec.resultsEyebrow || project.resultsEyebrow || '',
      processHeading: firstSec.processHeading || project.processHeading || '',
      processEyebrow: firstSec.processEyebrow || project.processEyebrow || '',
    });
    setStoryBlockFiles({});
    setThumbnailFiles([]);
    setStillFiles([]);
    setShowForm(true);
  };

  const fillDemoData = () => {
    setForm({
      ...emptyForm,
      ...demoData,
      storyBlocks: demoData.storyBlocks.map(b => ({ ...b })),
      results: demoData.results.map(r => ({ ...r })),
      processSteps: demoData.processSteps.map(p => ({ ...p })),
      videoTabs: demoData.videoTabs.map(v => ({ ...v })),
      sectionOrder: [...demoData.sectionOrder],
    });
    setStoryBlockFiles({});
    setThumbnailFiles([]);
    setStillFiles([]);
    setMsg('Demo data loaded — Enterprise VR Training & Simulation');
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

  const moveArrayItem = (key, index, direction) => {
    setForm(f => {
      const arr = [...f[key]];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= arr.length) return f;
      const temp = arr[index];
      arr[index] = arr[targetIndex];
      arr[targetIndex] = temp;
      return { ...f, [key]: arr };
    });
  };

  const moveSectionOrder = (index, direction) => {
    setForm(f => {
      const currentOrder = f.sectionOrder || [...defaultSectionOrder];
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= currentOrder.length) return f;
      const newOrder = [...currentOrder];
      const temp = newOrder[index];
      newOrder[index] = newOrder[targetIndex];
      newOrder[targetIndex] = temp;
      return { ...f, sectionOrder: newOrder };
    });
  };

  const moveGalleryImage = (key, idx, direction) => {
    const urls = (form[key] || '').split(',').map(s => s.trim()).filter(Boolean);
    const targetIdx = idx + direction;
    if (targetIdx < 0 || targetIdx >= urls.length) return;
    const temp = urls[idx];
    urls[idx] = urls[targetIdx];
    urls[targetIdx] = temp;
    setForm(f => ({ ...f, [key]: urls.join(', ') }));
  };

  const uploadImage = async (file, type = 'projects') => {
    const currentToken = getAdminToken() || token;
    if (!currentToken) {
      throw new Error('Admin session expired. Please log in again.');
    }
    const fd = new FormData();
    fd.append('image', file);
    fd.append('type', type);

    const uploadRes = await fetch(`${API_BASE_URL}/upload?type=${type}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${currentToken}` },
      body: fd,
    });

    const ct = uploadRes.headers.get('content-type') || '';
    let uploadData = {};
    if (ct.includes('application/json')) {
      uploadData = await uploadRes.json();
    } else {
      const text = await uploadRes.text();
      try {
        uploadData = JSON.parse(text);
      } catch {
        if (uploadRes.status === 413) throw new Error('File size exceeds server limit.');
        if (uploadRes.status === 401) throw new Error('Admin session expired.');
        throw new Error(`Upload failed (${uploadRes.status})`);
      }
    }

    if (uploadRes.ok && uploadData.url) {
      return uploadData.url;
    }
    throw new Error(uploadData.message || uploadData.error || `Upload failed (${uploadRes.status})`);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg('');

    let imageUrl = form.image;
    if (selectedFile) {
      setUploading(true);
      try {
        const url = await uploadImage(selectedFile, 'projects');
        if (url) imageUrl = url;
      } catch (err) {
        setMsg(`Image upload failed: ${err.message}`);
        setUploading(false);
        setSaving(false);
        return;
      }
      setUploading(false);
    }

    let heroImageUrl = form.heroImage;
    if (selectedHeroFile) {
      try {
        const url = await uploadImage(selectedHeroFile, 'projects');
        if (url) heroImageUrl = url;
      } catch (err) {
        setMsg(`Hero image upload failed: ${err.message}`);
        setSaving(false);
        return;
      }
    }

    // Upload story block images
    const updatedStoryBlocks = [...(form.storyBlocks || [])];
    for (let i = 0; i < updatedStoryBlocks.length; i++) {
      const file = storyBlockFiles[i];
      if (file) {
        try {
          const url = await uploadImage(file, 'projects');
          if (url) updatedStoryBlocks[i] = { ...updatedStoryBlocks[i], image: url };
        } catch (err) {
          setMsg(`Story block #${i + 1} image upload failed: ${err.message}`);
          setSaving(false);
          return;
        }
      }
    }

    // Upload thumbnail images
    let newThumbnailUrls = (form.galleryThumbnails || '')
      .split(',')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('blob:'));
    if (thumbnailFiles.length > 0) {
      for (const file of thumbnailFiles) {
        try {
          const url = await uploadImage(file, 'projects');
          if (url) newThumbnailUrls.push(url);
        } catch (err) {
          setMsg(`Thumbnail upload failed: ${err.message}`);
          setSaving(false);
          return;
        }
      }
    }

    // Upload still images
    let newStillUrls = (form.galleryStills || '')
      .split(',')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('blob:'));
    if (stillFiles.length > 0) {
      for (const file of stillFiles) {
        try {
          const url = await uploadImage(file, 'projects');
          if (url) newStillUrls.push(url);
        } catch (err) {
          setMsg(`Still image upload failed: ${err.message}`);
          setSaving(false);
          return;
        }
      }
    }

    // Build galleryCategories array
    const galleryCategoriesPayload = [];
    if (newThumbnailUrls.length > 0) {
      galleryCategoriesPayload.push({ name: 'Thumbnails', type: 'thumbnails', images: newThumbnailUrls.join(', ') });
    }
    if (newStillUrls.length > 0) {
      galleryCategoriesPayload.push({ name: 'Still Images', type: 'stills', images: newStillUrls.join(', ') });
    }
    (form.galleryCategories || []).forEach(cat => {
      if (cat.name && cat.name !== 'Thumbnails' && cat.name !== 'Still Images' && cat.type !== 'thumbnails' && cat.type !== 'stills') {
        galleryCategoriesPayload.push(cat);
      }
    });

    // Build sections with sectionOrder, heroAspectRatio, tickerWords, subtitle stored in first element
    const baseStoryBlocks = updatedStoryBlocks.length > 0 ? updatedStoryBlocks : [{
      tag: 'Overview',
      heading: form.overviewHeading || '',
      text: form.overviewText || '',
      image: '',
      position: 'left',
    }];
    const finalSections = baseStoryBlocks.map((b, idx) => ({
      tag: b.tag || (idx === 0 ? 'Overview' : (idx === 1 ? 'The challenge' : `Section ${idx + 1}`)),
      heading: b.heading || '',
      text: b.text || '',
      image: b.image || '',
      position: b.position || (idx % 2 === 0 ? 'left' : 'right'),
      ...(idx === 0 ? {
        sectionOrder: form.sectionOrder || defaultSectionOrder,
        heroAspectRatio: form.heroAspectRatio || 'video',
        tickerWords: form.tickerWords || '',
        subtitle: form.subtitle || '',
        videoTabs: form.videoTabs.filter(v => v.label || v.url),
        heroIntroText: form.heroIntroText || '',
        heroStars: form.heroStars || 5,
        heroReviewTitle: form.heroReviewTitle || '',
        heroReviewSubtitle: form.heroReviewSubtitle || '',
        heroQuoteText: form.heroQuoteText || '',
        heroQuoteAuthor: form.heroQuoteAuthor || '',
        ctaUrl: form.ctaUrl || '',
        ctaText: form.ctaText || '',
        thumbnailsHeading: form.thumbnailsHeading || '',
        thumbnailsEyebrow: form.thumbnailsEyebrow || '',
        stillsHeading: form.stillsHeading || '',
        stillsEyebrow: form.stillsEyebrow || '',
        resultsHeading: form.resultsHeading || '',
        resultsEyebrow: form.resultsEyebrow || '',
        processHeading: form.processHeading || '',
        processEyebrow: form.processEyebrow || '',
      } : {}),
    }));

    const {
      heroType, heroAspectRatio, tickerWords, subtitle, storyBlocks,
      galleryThumbnails, galleryStills, sectionOrder,
      heroIntroText, heroStars, heroReviewTitle, heroReviewSubtitle,
      heroQuoteText, heroQuoteAuthor,
      thumbnailsHeading, thumbnailsEyebrow, stillsHeading, stillsEyebrow,
      resultsHeading, resultsEyebrow, processHeading, processEyebrow,
      ...formWithoutToggle
    } = form;
    const payload = {
      ...formWithoutToggle,
      image: imageUrl,
      heroImage: heroType === 'image' ? heroImageUrl : '',
      heroVideo: heroType === 'video' ? form.heroVideo : '',
      metaDescription: form.subtitle || form.metaDescription || '',
      overviewHeading: finalSections[0]?.heading || form.overviewHeading || '',
      overviewText: finalSections[0]?.text || form.overviewText || '',
      challengeHeading: finalSections[1]?.heading || form.challengeHeading || '',
      challengeText: finalSections[1]?.text || form.challengeText || '',
      sections: JSON.stringify(finalSections),
      galleryCategories: JSON.stringify(galleryCategoriesPayload),
      results: JSON.stringify(form.results.filter(r => r.stat || r.label)),
      processSteps: JSON.stringify(form.processSteps.filter(p => p.phase || p.title)),
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
      setStoryBlockFiles({});
      setThumbnailFiles([]);
      setStillFiles([]);
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
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Subtitle / Subheading <span className="text-[#555]">(appears directly below project heading in hero)</span></label>
                    <input type="text" value={form.subtitle || ''} onChange={(e) => setForm(f => ({ ...f, subtitle: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" placeholder="e.g. High-fidelity 3D product visualization and CGI animation pipeline cutting turnaround by 70%." />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">URL Path <span className="text-red-400">*</span></label>
                    <input type="text" required value={form.path} onChange={(e) => setForm(f => ({ ...f, path: '/project/' + e.target.value.replace(/^\/?(project\/)?/i, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs font-mono placeholder:text-[#444]" placeholder="/project/your-project-slug" />
                  </div>
                </div>
              </SectionCard>

              {/* ===== SECTION: MEDIA ===== */}
              <SectionCard title="2. Media (Card Image + Hero Section)" icon="🖼">
                <div>
                  <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Card Image <span className="text-[#555]">(thumbnail in dashboard & latest work grid)</span></label>
                  <div className="flex items-center gap-3">
                    {form.image && (
                      <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-[#333] shrink-0 group">
                        <img src={resolvePreviewUrl(form.image)} alt="" className="w-full h-full object-cover" />
                        <button type="button" onClick={() => { setForm(f => ({ ...f, image: '' })); setSelectedFile(null); }} className="absolute inset-0 bg-[#0D0D0D]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"><FiX className="text-white text-xs" /></button>
                      </div>
                    )}
                    <input
                      type="text"
                      value={form.image || ''}
                      onChange={(e) => {
                        setForm(f => ({ ...f, image: e.target.value }));
                        setSelectedFile(null);
                      }}
                      placeholder="Paste https://api.elipsestudio.com/media/... or choose image"
                      className="flex-1 bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]"
                    />
                    <label className={`flex items-center justify-center gap-2 border border-dashed border-[#333] rounded-xl px-4 py-3 cursor-pointer hover:border-[#4169E1]/50 transition-all shrink-0 ${uploading ? 'opacity-50 pointer-events-none' : ''}`}>
                      <FiUpload className={`${uploading ? 'animate-bounce text-[#4169E1]' : 'text-[#555]'}`} />
                      <span className="text-[#555] text-[9px] font-bold uppercase tracking-widest">{uploading ? 'Uploading...' : 'Choose File'}</span>
                      <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files[0]; if (!file) return; setForm(f => ({ ...f, image: URL.createObjectURL(file) })); setSelectedFile(file); }} className="hidden" disabled={uploading} />
                    </label>
                  </div>
                </div>

                {/* Hero Media Format Selector: Wide 16:9, Vertical Reel 9:16, Square 1:1 */}
                <div className="pt-2">
                  <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Hero Video / Media Format</label>
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {[
                      { id: 'video', label: '🎬 Wide Video (16:9)', desc: 'Standard widescreen' },
                      { id: 'reel', label: '📱 Vertical Reel (9:16)', desc: 'Reel / Shorts card' },
                      { id: 'square', label: '⏹ Square Div (1:1)', desc: 'Square video frame' },
                    ].map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setForm(f => ({ ...f, heroAspectRatio: r.id }))}
                        className={`text-left p-3 rounded-xl border transition-all ${
                          (form.heroAspectRatio || 'video') === r.id
                            ? 'bg-[#4169E1]/20 border-[#4169E1] text-white'
                            : 'bg-[#1A1A1A] border-[#333] text-[#888] hover:border-[#555] hover:text-[#ccc]'
                        }`}
                      >
                        <div className="text-[11px] font-bold">{r.label}</div>
                        <div className="text-[8px] text-[#666] mt-0.5">{r.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Hero Section Type</label>
                  <div className="flex gap-2 mb-3">
                    {['image', 'video'].map((t) => (
                      <button key={t} type="button" onClick={() => setForm(f => ({ ...f, heroType: t, heroImage: t === 'video' ? '' : f.heroImage, heroVideo: t === 'image' ? '' : f.heroVideo }))}
                        className={`flex-1 text-[9px] font-bold uppercase tracking-widest px-4 py-3 rounded-xl border transition-all ${form.heroType === t ? 'bg-[#4169E1] text-white border-[#4169E1]' : 'bg-[#1A1A1A] text-[#555] border-[#333] hover:border-[#4169E1]/50'}`}>
                        {t === 'image' ? '🖼 Hero Image' : '🎬 Hero Video / Reel'}
                      </button>
                    ))}
                  </div>
                  {form.heroType === 'image' ? (
                    <div className="flex items-center gap-3">
                      {form.heroImage && (
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-[#333] shrink-0 group">
                          <img src={resolvePreviewUrl(form.heroImage)} alt="" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => { setForm(f => ({ ...f, heroImage: '' })); setSelectedHeroFile(null); }} className="absolute inset-0 bg-[#0D0D0D]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"><FiX className="text-white text-xs" /></button>
                        </div>
                      )}
                      <input
                        type="text"
                        value={form.heroImage || ''}
                        onChange={(e) => {
                          setForm(f => ({ ...f, heroImage: e.target.value }));
                          setSelectedHeroFile(null);
                        }}
                        placeholder="Paste https://api.elipsestudio.com/media/... or choose image"
                        className="flex-1 bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]"
                      />
                      <label className="flex items-center justify-center gap-2 border border-dashed border-[#333] rounded-xl px-4 py-3 cursor-pointer hover:border-[#4169E1]/50 transition-all shrink-0">
                        <FiUpload className="text-[#555]" /><span className="text-[#555] text-[9px] font-bold uppercase tracking-widest">Choose File</span>
                        <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files[0]; if (!file) return; setForm(f => ({ ...f, heroImage: URL.createObjectURL(file) })); setSelectedHeroFile(file); }} className="hidden" />
                      </label>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <input type="text" value={form.heroVideo} onChange={(e) => setForm(f => ({ ...f, heroVideo: e.target.value }))} className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" placeholder="Video URL (YouTube / Shorts / MP4 link)" />
                      {form.heroVideo && (
                        <div className={`mx-auto rounded-xl overflow-hidden border border-[#333] bg-[#0D0D0D] ${
                          form.heroAspectRatio === 'reel' ? 'max-w-[260px] aspect-[9/16]' :
                          form.heroAspectRatio === 'square' ? 'max-w-[340px] aspect-square' :
                          'w-full aspect-video'
                        }`}>
                          <iframe src={getYoutubeEmbed(form.heroVideo)} className="w-full h-full" allowFullScreen></iframe>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Hero Video Tabs Switcher like AhmedFood.jsx */}
                <div className="pt-3 border-t border-[#222]">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <label className="block text-[#888] text-[8px] uppercase tracking-widest">Hero Video Tabs (Clickable Tabs to Switch Video / Reels)</label>
                      <p className="text-[#888] text-[9px] mt-0.5">The main video above loads first by default. Adding tabs below allows visitors to click and switch between different videos or vertical reels (9:16)!</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {form.videoTabs.map((tab, i) => (
                      <div key={i} className="p-3 bg-[#141414] rounded-xl border border-[#26262e] space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[#4169E1] uppercase tracking-wider">
                            Tab #{i + 1}
                          </span>
                          {form.videoTabs.length > 1 && (
                            <button type="button" onClick={() => removeArrayItem('videoTabs', i)} className="text-red-400 hover:text-red-300 text-xs inline-flex items-center gap-1">
                              <FiX size={12} /> Remove Tab
                            </button>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                          <div className="sm:w-1/3">
                            <label className="block text-[#666] text-[8px] uppercase tracking-wider mb-1">1. Tab Name / Button Title</label>
                            <input
                              type="text"
                              value={tab.label}
                              onChange={(e) => updateArray('videoTabs', i, 'label', e.target.value)}
                              placeholder="e.g. Virtual Tour, Reel 1, Walkthrough"
                              className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                            />
                          </div>
                          <div className="flex-1">
                            <label className="block text-[#666] text-[8px] uppercase tracking-wider mb-1">2. Video / Reel Link (URL)</label>
                            <input
                              type="text"
                              value={tab.url}
                              onChange={(e) => updateArray('videoTabs', i, 'url', e.target.value)}
                              placeholder="YouTube / Shorts / MP4 Link"
                              className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                            />
                          </div>
                          <div className="sm:w-32">
                            <label className="block text-[#666] text-[8px] uppercase tracking-wider mb-1">Format</label>
                            <select
                              value={tab.aspectRatio || form.heroAspectRatio || 'video'}
                              onChange={(e) => updateArray('videoTabs', i, 'aspectRatio', e.target.value)}
                              className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-2.5 py-2 text-[#aaa] text-xs outline-none"
                            >
                              <option value="video">Wide (16:9)</option>
                              <option value="reel">Reel (9:16)</option>
                              <option value="square">Square (1:1)</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => addArrayItem('videoTabs', { label: `Video ${form.videoTabs.length + 1}`, url: '', aspectRatio: form.heroAspectRatio || 'video' })}
                    className="text-[#4169E1] text-[9px] uppercase tracking-widest font-bold hover:underline inline-flex items-center gap-1.5 mt-2"
                  >
                    <FiPlus size={12} /> Add Video Tab
                  </button>
                </div>

                {/* Hero Side Cards (Left Info Card & Right Review Card) */}
                <div className="pt-3 border-t border-[#222] space-y-4">
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest font-bold">
                      Hero Side Cards (Left Info Card & Right Review Card)
                    </label>
                    <p className="text-[#666] text-[9px] mt-0.5">
                      Customize the text, button, stars rating, and quote box displayed on either side of the hero video.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Left Card: 💡 Icon + Intro + CTA Button */}
                    <div className="p-3.5 bg-[#141414] rounded-xl border border-[#26262e] space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">💡</span>
                        <span className="text-[10px] font-bold text-[#4169E1] uppercase tracking-wider">
                          Left Card: Intro & CTA Button
                        </span>
                      </div>
                      <div>
                        <label className="block text-[#666] text-[8px] uppercase tracking-wider mb-1">Intro Description Text</label>
                        <textarea
                          rows={3}
                          value={form.heroIntroText || ''}
                          onChange={(e) => setForm(f => ({ ...f, heroIntroText: e.target.value }))}
                          placeholder="e.g. The VR Training project revolutionizes workforce development... (Leave empty to use Overview text)"
                          className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs resize-none"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[#666] text-[8px] uppercase tracking-wider mb-1">Button Text</label>
                          <input
                            type="text"
                            value={form.ctaText || ''}
                            onChange={(e) => setForm(f => ({ ...f, ctaText: e.target.value }))}
                            placeholder="e.g. Explore Insights"
                            className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[#666] text-[8px] uppercase tracking-wider mb-1">Button Link URL</label>
                          <input
                            type="text"
                            value={form.ctaUrl || ''}
                            onChange={(e) => setForm(f => ({ ...f, ctaUrl: e.target.value }))}
                            placeholder="e.g. /contact or URL"
                            className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Right Card: ★★★★★ + Category/Title + Quote Box */}
                    <div className="p-3.5 bg-[#141414] rounded-xl border border-[#26262e] space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[#4169E1] text-xs">★★★★★</span>
                          <span className="text-[10px] font-bold text-[#4169E1] uppercase tracking-wider">
                            Right Card: Review & Quote
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <label className="text-[#666] text-[8px] uppercase">Stars:</label>
                          <select
                            value={form.heroStars || 5}
                            onChange={(e) => setForm(f => ({ ...f, heroStars: Number(e.target.value) }))}
                            className="bg-[#0D0D0D] border border-[#333] rounded px-2 py-0.5 text-xs text-[#F2F0EB] outline-none"
                          >
                            {[5, 4, 3, 2, 1].map(n => (
                              <option key={n} value={n}>{n} Stars</option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[#666] text-[8px] uppercase tracking-wider mb-1">Title / Category</label>
                          <input
                            type="text"
                            value={form.heroReviewTitle || ''}
                            onChange={(e) => setForm(f => ({ ...f, heroReviewTitle: e.target.value }))}
                            placeholder="e.g. Architecture, VR"
                            className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                          />
                        </div>
                        <div>
                          <label className="block text-[#666] text-[8px] uppercase tracking-wider mb-1">Subtitle / Client</label>
                          <input
                            type="text"
                            value={form.heroReviewSubtitle || ''}
                            onChange={(e) => setForm(f => ({ ...f, heroReviewSubtitle: e.target.value }))}
                            placeholder="e.g. ELIPSE PRODUCTION"
                            className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-[#666] text-[8px] uppercase tracking-wider mb-1">Quote Box Text</label>
                        <input
                          type="text"
                          value={form.heroQuoteText || ''}
                          onChange={(e) => setForm(f => ({ ...f, heroQuoteText: e.target.value }))}
                          placeholder='e.g. "Safe simulation environment for high-stakes procedural training"'
                          className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[#666] text-[8px] uppercase tracking-wider mb-1">Quote Author</label>
                        <input
                          type="text"
                          value={form.heroQuoteAuthor || ''}
                          onChange={(e) => setForm(f => ({ ...f, heroQuoteAuthor: e.target.value }))}
                          placeholder="e.g. Elipse Studio"
                          className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hero Marquee Ticker Slider Words */}
                <div className="pt-3 border-t border-[#222]">
                  <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-1">
                    Hero Marquee Ticker Words <span className="text-[#555]">(infinite animated slider directly below hero)</span>
                  </label>
                  <p className="text-[#555] text-[8px] mb-2">
                    Enter words or tags separated by commas or bullets (e.g. <span className="text-zinc-400">3D PRODUCT • CGI ANIMATION • UNREAL ENGINE 5 • PHOTOREALISM • VFX</span>).
                  </p>
                  <input
                    type="text"
                    value={form.tickerWords || ''}
                    onChange={(e) => setForm(f => ({ ...f, tickerWords: e.target.value }))}
                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]"
                    placeholder="e.g. 3D PRODUCT • CGI ANIMATION • UNREAL ENGINE 5 • PHOTOREALISM • VFX"
                  />
                </div>
              </SectionCard>

              {/* ===== SECTION ORDER CONTROLLER ===== */}
              <SectionCard title="Page Section Order & Positioning" icon={<FiMove size={12} />}>
                <p className="text-[#888] text-[8px] uppercase tracking-widest -mt-2">
                  Arrange the display order of sections on your public project page:
                </p>
                <div className="space-y-2">
                  {(form.sectionOrder || defaultSectionOrder).map((secKey, idx) => {
                    const secLabels = {
                      storyBlocks: '1. Overview & Challenge (Alternating Story Blocks)',
                      thumbnails: form.thumbnailsHeading ? `2. ${form.thumbnailsHeading}` : '2. Visual Output: Thumbnails (16:9 Aspect Ratio - 3 per row)',
                      stills: form.stillsHeading ? `3. ${form.stillsHeading}` : '3. Visual Output: Still Images (4 per row)',
                      gallery: 'Visual Output (Combined Thumbnails & Stills)',
                      results: form.resultsHeading ? `4. ${form.resultsHeading}` : '4. Measurable Impact (Results Cards)',
                      process: form.processHeading ? `5. ${form.processHeading}` : '5. How We Did It (Process Steps)',
                      content: '6. Description (HTML Editor Content)',
                    };
                    return (
                      <div key={secKey} className="flex items-center justify-between p-2.5 bg-[#1A1A1A] border border-[#26262e] rounded-xl">
                        <span className="text-xs font-semibold text-[#F2F0EB]">
                          {secLabels[secKey] || secKey}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => moveSectionOrder(idx, -1)}
                            className="p-1.5 bg-[#0D0D0D] text-[#888] hover:text-[#4169E1] rounded-lg disabled:opacity-20 transition-all"
                            title="Move section up"
                          >
                            <FiChevronUp size={14} />
                          </button>
                          <button
                            type="button"
                            disabled={idx === (form.sectionOrder || defaultSectionOrder).length - 1}
                            onClick={() => moveSectionOrder(idx, 1)}
                            className="p-1.5 bg-[#0D0D0D] text-[#888] hover:text-[#4169E1] rounded-lg disabled:opacity-20 transition-all"
                            title="Move section down"
                          >
                            <FiChevronDown size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </SectionCard>

              {/* ===== SECTION 3: OVERVIEW & CHALLENGE (STORY BLOCKS) ===== */}
              <SectionCard title="3. Overview & Challenge (Story Blocks)" icon="💡">
                <p className="text-[#888] text-[8px] uppercase tracking-widest -mt-2">
                  Alternating image & content blocks. Set image to Left or Right for each block, and click Add Block to add more.
                </p>
                <div className="space-y-4">
                  {(form.storyBlocks || []).map((block, i) => {
                    const isLeft = (block.position || (i % 2 === 0 ? 'left' : 'right')) === 'left';
                    return (
                      <div key={i} className="p-4 bg-[#1A1A1A] rounded-xl border border-[#26262e] space-y-3">
                        <div className="flex items-center justify-between border-b border-[#26262e] pb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[#4169E1]">#{i + 1}</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#F2F0EB]">
                              {block.tag || (i === 0 ? 'Overview' : (i === 1 ? 'The challenge' : `Block ${i + 1}`))}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => {
                                const newPos = isLeft ? 'right' : 'left';
                                updateArray('storyBlocks', i, 'position', newPos);
                              }}
                              className="text-[8px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg border border-[#444] text-[#ccc] hover:border-[#4169E1] hover:text-[#4169E1] transition-all"
                              title="Toggle Image Left or Right"
                            >
                              Image: <span className="text-[#4169E1]">{isLeft ? 'LEFT ◀' : 'RIGHT ▶'}</span>
                            </button>
                            <button
                              type="button"
                              disabled={i === 0}
                              onClick={() => moveArrayItem('storyBlocks', i, -1)}
                              className="p-1 text-[#666] hover:text-[#4169E1] disabled:opacity-20"
                            >
                              <FiChevronUp size={14} />
                            </button>
                            <button
                              type="button"
                              disabled={i === (form.storyBlocks || []).length - 1}
                              onClick={() => moveArrayItem('storyBlocks', i, 1)}
                              className="p-1 text-[#666] hover:text-[#4169E1] disabled:opacity-20"
                            >
                              <FiChevronDown size={14} />
                            </button>
                            {(form.storyBlocks || []).length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeArrayItem('storyBlocks', i)}
                                className="p-1 text-red-400 hover:text-red-300"
                              >
                                <FiX size={14} />
                              </button>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-1">Tag / Label</label>
                            <input
                              type="text"
                              value={block.tag || ''}
                              onChange={(e) => updateArray('storyBlocks', i, 'tag', e.target.value)}
                              placeholder="e.g. Overview or The challenge"
                              className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-1">Heading</label>
                            <input
                              type="text"
                              value={block.heading || ''}
                              onChange={(e) => updateArray('storyBlocks', i, 'heading', e.target.value)}
                              placeholder="e.g. Enterprise VR Training & Simulation"
                              className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-1">Content / Description</label>
                          <textarea
                            value={block.text || ''}
                            onChange={(e) => updateArray('storyBlocks', i, 'text', e.target.value)}
                            rows={3}
                            placeholder="Write or paste the description..."
                            className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs resize-none"
                          />
                        </div>

                        <div>
                          <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-1">Block Image</label>
                          <div className="flex items-center gap-3">
                            {block.image && (
                              <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-[#333] shrink-0 group">
                                <img
                                  src={resolvePreviewUrl(block.image)}
                                  alt=""
                                  className="w-full h-full object-cover"
                                />
                                <button
                                  type="button"
                                  onClick={() => {
                                    updateArray('storyBlocks', i, 'image', '');
                                    setStoryBlockFiles(prev => ({ ...prev, [i]: null }));
                                  }}
                                  className="absolute inset-0 bg-[#0D0D0D]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                                >
                                  <FiX className="text-white text-xs" />
                                </button>
                              </div>
                            )}
                            <input
                              type="text"
                              value={block.image || ''}
                              onChange={(e) => updateArray('storyBlocks', i, 'image', e.target.value)}
                              placeholder="Paste image URL..."
                              className="flex-1 bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                            />
                            <label className="flex items-center gap-1.5 px-3 py-2 bg-[#0D0D0D] border border-dashed border-[#333] rounded-lg cursor-pointer hover:border-[#4169E1] transition-all shrink-0">
                              <FiUpload className="text-[#666] text-xs" />
                              <span className="text-[8px] font-bold uppercase tracking-widest text-[#aaa]">Upload</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (!file) return;
                                  setStoryBlockFiles(prev => ({ ...prev, [i]: file }));
                                  updateArray('storyBlocks', i, 'image', URL.createObjectURL(file));
                                }}
                                className="hidden"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button
                  type="button"
                  onClick={() => addArrayItem('storyBlocks', {
                    tag: 'Feature',
                    heading: '',
                    text: '',
                    image: '',
                    position: (form.storyBlocks || []).length % 2 === 0 ? 'left' : 'right',
                  })}
                  className="mt-2 text-[#4169E1] text-[8px] uppercase tracking-widest font-bold hover:underline inline-flex items-center gap-1"
                >
                  <FiPlus size={12} /> Add More Block
                </button>
              </SectionCard>

              {/* ===== SECTION 4: GALLERY (THUMBNAILS & STILLS) ===== */}
              <SectionCard title="4. Gallery (16:9 Thumbnails & Still Images)" icon="🖼">
                <p className="text-[#888] text-[8px] uppercase tracking-widest -mt-2">
                  Thumbnails are 16:9 ratio in a row of 3. Stills are displayed below in a row of 3. If either is omitted, no empty gap is shown.
                </p>

                {/* Sub-section: 16:9 Thumbnails */}
                <div className="p-4 bg-[#1A1A1A] rounded-xl border border-[#26262e] space-y-3">
                  <div className="flex items-center justify-between border-b border-[#26262e] pb-2">
                    <span className="text-xs font-bold text-[#F2F0EB]">Thumbnails (16:9 Aspect Ratio - 3 per row)</span>
                    <label className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0D0D0D] border border-dashed border-[#444] rounded-lg cursor-pointer hover:border-[#4169E1] transition-all">
                      <FiUpload className="text-[#4169E1] text-xs" />
                      <span className="text-[8px] font-bold uppercase tracking-wider text-[#F2F0EB]">Upload Thumbnails</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files);
                          if (!files.length) return;
                          setThumbnailFiles(prev => [...prev, ...files]);
                          const newUrls = files.map(f => URL.createObjectURL(f));
                          const existing = form.galleryThumbnails ? form.galleryThumbnails.split(',').map(s => s.trim()).filter(Boolean) : [];
                          setForm(f => ({ ...f, galleryThumbnails: [...existing, ...newUrls].join(', ') }));
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[#888] text-[8px] uppercase tracking-wider mb-1">Section Heading Title</label>
                      <input
                        type="text"
                        value={form.thumbnailsHeading || ''}
                        onChange={(e) => setForm(f => ({ ...f, thumbnailsHeading: e.target.value }))}
                        placeholder="Default: Thumbnails (16:9)"
                        className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[#888] text-[8px] uppercase tracking-wider mb-1">Eyebrow Tag</label>
                      <input
                        type="text"
                        value={form.thumbnailsEyebrow || ''}
                        onChange={(e) => setForm(f => ({ ...f, thumbnailsEyebrow: e.target.value }))}
                        placeholder="Default: Visual output"
                        className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    value={form.galleryThumbnails || ''}
                    onChange={(e) => setForm(f => ({ ...f, galleryThumbnails: e.target.value }))}
                    placeholder="Paste thumbnail URLs (comma-separated)..."
                    className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                  />
                  {form.galleryThumbnails && form.galleryThumbnails.split(',').filter(s => s.trim()).length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1">
                      {form.galleryThumbnails.split(',').filter(s => s.trim()).map((url, idx, allUrls) => (
                        <div key={idx} className="relative aspect-[16/9] rounded-lg overflow-hidden border border-[#333] group bg-[#0D0D0D]">
                          <img
                            src={resolvePreviewUrl(url)}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-black/70 backdrop-blur-sm rounded text-[9px] font-bold text-white/90 z-10">
                            #{idx + 1}
                          </span>
                          <div className="absolute inset-0 bg-[#0D0D0D]/80 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all z-20">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveGalleryImage('galleryThumbnails', idx, -1)}
                              className="p-1.5 bg-[#1A1A1A] hover:bg-[#4169E1] text-white rounded disabled:opacity-20 transition-colors"
                              title="Move left"
                            >
                              <FiChevronLeft size={13} />
                            </button>
                            <button
                              type="button"
                              disabled={idx === allUrls.length - 1}
                              onClick={() => moveGalleryImage('galleryThumbnails', idx, 1)}
                              className="p-1.5 bg-[#1A1A1A] hover:bg-[#4169E1] text-white rounded disabled:opacity-20 transition-colors"
                              title="Move right"
                            >
                              <FiChevronRight size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const urls = form.galleryThumbnails.split(',').map(s => s.trim()).filter(Boolean);
                                urls.splice(idx, 1);
                                setForm(f => ({ ...f, galleryThumbnails: urls.join(', ') }));
                              }}
                              className="p-1.5 bg-[#1A1A1A] hover:bg-red-500 text-white rounded transition-colors"
                              title="Remove"
                            >
                              <FiX size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Sub-section: Still Images */}
                <div className="p-4 bg-[#1A1A1A] rounded-xl border border-[#26262e] space-y-3">
                  <div className="flex items-center justify-between border-b border-[#26262e] pb-2">
                    <span className="text-xs font-bold text-[#F2F0EB]">Still Images (4 per row)</span>
                    <label className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0D0D0D] border border-dashed border-[#444] rounded-lg cursor-pointer hover:border-[#4169E1] transition-all">
                      <FiUpload className="text-[#4169E1] text-xs" />
                      <span className="text-[8px] font-bold uppercase tracking-wider text-[#F2F0EB]">Upload Stills</span>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                          const files = Array.from(e.target.files);
                          if (!files.length) return;
                          setStillFiles(prev => [...prev, ...files]);
                          const newUrls = files.map(f => URL.createObjectURL(f));
                          const existing = form.galleryStills ? form.galleryStills.split(',').map(s => s.trim()).filter(Boolean) : [];
                          setForm(f => ({ ...f, galleryStills: [...existing, ...newUrls].join(', ') }));
                        }}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[#888] text-[8px] uppercase tracking-wider mb-1">Section Heading Title</label>
                      <input
                        type="text"
                        value={form.stillsHeading || ''}
                        onChange={(e) => setForm(f => ({ ...f, stillsHeading: e.target.value }))}
                        placeholder="Default: Still Images"
                        className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[#888] text-[8px] uppercase tracking-wider mb-1">Eyebrow Tag</label>
                      <input
                        type="text"
                        value={form.stillsEyebrow || ''}
                        onChange={(e) => setForm(f => ({ ...f, stillsEyebrow: e.target.value }))}
                        placeholder="Default: Visual output"
                        className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                      />
                    </div>
                  </div>
                  <input
                    type="text"
                    value={form.galleryStills || ''}
                    onChange={(e) => setForm(f => ({ ...f, galleryStills: e.target.value }))}
                    placeholder="Paste still image URLs (comma-separated)..."
                    className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                  />
                  {form.galleryStills && form.galleryStills.split(',').filter(s => s.trim()).length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1">
                      {form.galleryStills.split(',').filter(s => s.trim()).map((url, idx, allUrls) => (
                        <div key={idx} className="relative aspect-[4/5] rounded-lg overflow-hidden border border-[#333] group bg-[#0D0D0D] flex items-center justify-center">
                          <img
                            src={resolvePreviewUrl(url)}
                            alt=""
                            className="w-full h-full object-cover object-center"
                          />
                          <span className="absolute top-1.5 left-1.5 px-1.5 py-0.5 bg-black/70 backdrop-blur-sm rounded text-[9px] font-bold text-white/90 z-10">
                            #{idx + 1}
                          </span>
                          <div className="absolute inset-0 bg-[#0D0D0D]/80 flex items-center justify-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all z-20">
                            <button
                              type="button"
                              disabled={idx === 0}
                              onClick={() => moveGalleryImage('galleryStills', idx, -1)}
                              className="p-1.5 bg-[#1A1A1A] hover:bg-[#4169E1] text-white rounded disabled:opacity-20 transition-colors"
                              title="Move left"
                            >
                              <FiChevronLeft size={13} />
                            </button>
                            <button
                              type="button"
                              disabled={idx === allUrls.length - 1}
                              onClick={() => moveGalleryImage('galleryStills', idx, 1)}
                              className="p-1.5 bg-[#1A1A1A] hover:bg-[#4169E1] text-white rounded disabled:opacity-20 transition-colors"
                              title="Move right"
                            >
                              <FiChevronRight size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const urls = form.galleryStills.split(',').map(s => s.trim()).filter(Boolean);
                                urls.splice(idx, 1);
                                setForm(f => ({ ...f, galleryStills: urls.join(', ') }));
                              }}
                              className="p-1.5 bg-[#1A1A1A] hover:bg-red-500 text-white rounded transition-colors"
                              title="Remove"
                            >
                              <FiX size={13} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </SectionCard>

              {/* ===== SECTION 5: RESULTS ===== */}
              <SectionCard title="5. Measurable Impact (Results)" icon="📈">
                <p className="text-[#888] text-[8px] uppercase tracking-widest -mt-2">
                  Highlight project results — each with Stat, Label, and Description. Use arrows to change item position.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-2 border-b border-[#222]">
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-wider mb-1">Section Heading Title</label>
                    <input
                      type="text"
                      value={form.resultsHeading || ''}
                      onChange={(e) => setForm(f => ({ ...f, resultsHeading: e.target.value }))}
                      placeholder="Default: Results that moved the business"
                      className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-wider mb-1">Eyebrow Tag</label>
                    <input
                      type="text"
                      value={form.resultsEyebrow || ''}
                      onChange={(e) => setForm(f => ({ ...f, resultsEyebrow: e.target.value }))}
                      placeholder="Default: Measurable impact"
                      className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                    />
                  </div>
                </div>
                {form.results.map((r, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-[#1A1A1A] rounded-xl border border-[#222]">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                      <input type="text" value={r.stat} onChange={(e) => updateArray('results', i, 'stat', e.target.value)} placeholder="Stat (e.g. 4k)" className="bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" />
                      <input type="text" value={r.label} onChange={(e) => updateArray('results', i, 'label', e.target.value)} placeholder="Label (e.g. Retention)" className="bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" />
                      <input type="text" value={r.desc} onChange={(e) => updateArray('results', i, 'desc', e.target.value)} placeholder="Description (e.g. Safe simulation environment...)" className="bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" />
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <button type="button" disabled={i === 0} onClick={() => moveArrayItem('results', i, -1)} className="p-1 text-[#666] hover:text-[#4169E1] disabled:opacity-20"><FiChevronUp size={14} /></button>
                      <button type="button" disabled={i === form.results.length - 1} onClick={() => moveArrayItem('results', i, 1)} className="p-1 text-[#666] hover:text-[#4169E1] disabled:opacity-20"><FiChevronDown size={14} /></button>
                      {form.results.length > 1 && <button type="button" onClick={() => removeArrayItem('results', i)} className="p-1 text-red-400 hover:text-red-300"><FiX size={14} /></button>}
                    </div>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('results', { stat: '', label: '', desc: '' })} className="text-[#4169E1] text-[8px] uppercase tracking-widest font-bold hover:underline"><FiPlus className="inline mr-1" />Add Result</button>
              </SectionCard>

              {/* ===== SECTION 6: PROCESS ===== */}
              <SectionCard title="6. How We Did It (Process Steps)" icon="⚙">
                <p className="text-[#888] text-[8px] uppercase tracking-widest -mt-2">
                  Process steps with Step Number, Phase, Title, and Description. Use arrows to position each step.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-2 border-b border-[#222]">
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-wider mb-1">Section Heading Title</label>
                    <input
                      type="text"
                      value={form.processHeading || ''}
                      onChange={(e) => setForm(f => ({ ...f, processHeading: e.target.value }))}
                      placeholder="Default: Our process"
                      className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-wider mb-1">Eyebrow Tag</label>
                    <input
                      type="text"
                      value={form.processEyebrow || ''}
                      onChange={(e) => setForm(f => ({ ...f, processEyebrow: e.target.value }))}
                      placeholder="Default: How we did it"
                      className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                    />
                  </div>
                </div>
                {form.processSteps.map((p, i) => (
                  <div key={i} className="flex items-start gap-2 p-3 bg-[#1A1A1A] rounded-xl border border-[#222]">
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-2">
                      <input type="text" value={p.step} onChange={(e) => updateArray('processSteps', i, 'step', e.target.value)} placeholder="Step (e.g. 01)" className="bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444] w-16" />
                      <input type="text" value={p.phase} onChange={(e) => updateArray('processSteps', i, 'phase', e.target.value)} placeholder="Phase (e.g. Research)" className="bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" />
                      <input type="text" value={p.title} onChange={(e) => updateArray('processSteps', i, 'title', e.target.value)} placeholder="Title (e.g. Research)" className="bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" />
                      <input type="text" value={p.desc} onChange={(e) => updateArray('processSteps', i, 'desc', e.target.value)} placeholder="Description" className="bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2.5 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]" />
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      <button type="button" disabled={i === 0} onClick={() => moveArrayItem('processSteps', i, -1)} className="p-1 text-[#666] hover:text-[#4169E1] disabled:opacity-20"><FiChevronUp size={14} /></button>
                      <button type="button" disabled={i === form.processSteps.length - 1} onClick={() => moveArrayItem('processSteps', i, 1)} className="p-1 text-[#666] hover:text-[#4169E1] disabled:opacity-20"><FiChevronDown size={14} /></button>
                      {form.processSteps.length > 1 && <button type="button" onClick={() => removeArrayItem('processSteps', i)} className="p-1 text-red-400 hover:text-red-300"><FiX size={14} /></button>}
                    </div>
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem('processSteps', { step: String(form.processSteps.length + 1).padStart(2, '0'), phase: '', title: '', desc: '' })} className="text-[#4169E1] text-[8px] uppercase tracking-widest font-bold hover:underline"><FiPlus className="inline mr-1" />Add Step</button>
              </SectionCard>

              {/* ===== SECTION: DESCRIPTION ===== */}
              <SectionCard title="7. Description (HTML)" icon="📝">
                <p className="text-[#555] text-[7px] uppercase tracking-widest -mt-2">Full HTML description — used for overview text (HTML tags stripped)</p>
                <HtmlEditor value={form.description} onChange={(val) => setForm(f => ({ ...f, description: val }))} minHeight={200} />
              </SectionCard>

              {/* ===== SECTION: SEO ===== */}
              <SectionCard title="8. SEO Settings" icon="🔍">
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
              <SectionCard title="9. CTA Button" icon="🔗">
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
