'use client';

import { useState, useEffect, useCallback } from 'react';
import { apiCall, API_BASE_URL, BACKEND_ORIGIN, getYoutubeEmbed } from '../utils/api';
import { getAdminToken } from '../utils/auth';
import { FiPlus, FiEdit2, FiTrash2, FiX, FiSave, FiUpload, FiChevronUp, FiChevronDown, FiChevronLeft, FiChevronRight, FiMove, FiImage, FiFolder, FiStar, FiEye, FiEyeOff } from '@/components/ui/Icons';
import HtmlEditor from './ui/HtmlEditor';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { isProjectHidden } from '../utils/projectVisibility';

const categories = ['Animation', 'Web', 'Configurator', 'VR', 'AR', 'Architecture', 'Tour 360'];

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
  title: '', metaTitle: '', metaDescription: '', slug: '',
  largeBanner: '', smallBanner: '', content: '',
  client: '', service: '', category: 'Animation', duration: '', deliverables: '',
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
  creditsEyebrow: '',
  creditsHeading: '',
  creditsToolsLabel: '',
  creditsTools: '',
  creditsAgency: '',
  faqHeading: '',
  faqItems: [],
  calloutEyebrow: '',
  calloutHeadline: '',
  calloutBody: '',
  calloutButtonText: '',
  calloutButtonUrl: '',
  targetKeywords: '',
  customSchema: '',
  sectionOrder: defaultSectionOrder,
  videoTabs: [{ label: '', url: '' }],
  ctaUrl: '', ctaText: '',
  heroVideo: '', videoUrl: '',
  featured: false,
  hidden: false,
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

const SortableCaseStudyItem = ({ cs, onEdit, onDelete, onMoveUp, onMoveDown, onToggleFeatured, onToggleHide, isFirst, isLast, isTop }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: cs.id });
  const hidden = isProjectHidden(cs);
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : hidden ? 0.6 : 1,
    zIndex: isDragging ? 10 : 1,
    position: 'relative'
  };
  const thumbSrc = isTop
    ? resolvePreviewUrl(cs.largeBanner)
    : resolvePreviewUrl(cs.smallBanner);
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border p-3 md:p-5 rounded-xl transition-all flex items-center gap-2 md:gap-4 group ${
        hidden
          ? 'bg-[#141414] border-amber-900/40 hover:border-amber-700/60'
          : 'bg-[#111] border-[#222] hover:border-[#4169E1]/40'
      } ${isDragging ? 'shadow-[0_0_30px_rgba(65,105,225,0.15)] border-[#4169E1]/50' : ''}`}
    >
      <div {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing p-1 md:p-1.5 text-[#555] hover:text-[#4169E1] transition-colors shrink-0"><FiMove className="text-sm md:text-lg" /></div>
      <div className="w-10 h-10 md:w-14 md:h-14 rounded-lg overflow-hidden bg-[#1A1A1A] shrink-0 border border-[#333] relative">
        {thumbSrc ? <img src={thumbSrc} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[#555]"><FiImage size={18} /></div>}
        <span className={`absolute top-0 right-0 text-[6px] font-bold px-1 py-0.5 rounded-bl-lg leading-none ${isTop ? 'bg-[#4169E1]/30 text-[#4169E1]' : 'bg-[#555]/30 text-[#aaa]'}`}>{isTop ? 'TB' : 'SB'}</span>
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs md:text-sm font-bold tracking-tight text-[#F2F0EB] truncate flex items-center gap-2">
          {cs.title}
          {hidden && (
            <span className="inline-block px-1.5 py-0.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[6px] md:text-[7px] font-bold uppercase tracking-[0.15em] rounded-full leading-none">
              Hidden
            </span>
          )}
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
        <button
          onClick={() => onToggleHide(cs)}
          className={`p-1.5 md:p-2.5 bg-[#1A1A1A] rounded-lg transition-all ${
            hidden ? 'text-amber-400 hover:text-amber-300' : 'text-[#555] hover:text-[#4169E1]'
          }`}
          title={hidden ? 'Unhide case study (make visible)' : 'Hide case study from website'}
        >
          {hidden ? <FiEyeOff className="text-[10px] md:text-sm" /> : <FiEye className="text-[10px] md:text-sm" />}
        </button>
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
  const [storyBlockFiles, setStoryBlockFiles] = useState({});
  const [thumbnailFiles, setThumbnailFiles] = useState([]);
  const [stillFiles, setStillFiles] = useState([]);
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

  const handleToggleHide = async (cs) => {
    const currentHidden = isProjectHidden(cs);
    const nextHidden = !currentHidden;
    let existingSections = [];
    try {
      existingSections = typeof cs.sections === 'string' ? JSON.parse(cs.sections) : (Array.isArray(cs.sections) ? cs.sections : []);
    } catch {}
    const updatedSections = [...existingSections];
    if (updatedSections.length === 0) {
      updatedSections.push({ type: 'metadata', hidden: nextHidden });
    } else {
      updatedSections[0] = { ...updatedSections[0], hidden: nextHidden };
    }
    const payload = {
      hidden: nextHidden,
      isHidden: nextHidden,
      status: nextHidden ? 'hidden' : 'published',
      sections: JSON.stringify(updatedSections),
    };
    const { status } = await apiCall(`/case-studies/${cs.id}`, 'PUT', payload, token);
    if (status === 200 || status === 201) {
      setCaseStudies((prev) =>
        prev.map((item) =>
          item.id === cs.id
            ? { ...item, hidden: nextHidden, isHidden: nextHidden, status: nextHidden ? 'hidden' : 'published', sections: JSON.stringify(updatedSections) }
            : item
        )
      );
      setMsg(nextHidden ? `Case study "${cs.title}" is now hidden.` : `Case study "${cs.title}" is now visible.`);
      setTimeout(() => setMsg(''), 4000);
    } else {
      setMsg('Failed to update visibility');
      setTimeout(() => setMsg(''), 4000);
    }
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
      storyBlocks: emptyForm.storyBlocks.map(b => ({ ...b })),
      results: emptyForm.results.map(r => ({ ...r })),
      processSteps: emptyForm.processSteps.map(p => ({ ...p })),
      faqItems: [],
      videoTabs: [{ label: '', url: '' }],
      sectionOrder: [...defaultSectionOrder],
    });
    setSelectedBannerFile(null);
    setSelectedSmallFile(null);
    setStoryBlockFiles({});
    setThumbnailFiles([]);
    setStillFiles([]);
    setShowForm(true);
  };

  const openEditForm = (cs) => {
    setEditing(cs);
    const parsedSections = parseJSON(cs.sections || cs.overviewText, []);
    let storyBlocks = [];
    let sectionOrder = [...defaultSectionOrder];

    if (Array.isArray(parsedSections) && parsedSections.length > 0) {
      if (parsedSections[0]?.sectionOrder && Array.isArray(parsedSections[0].sectionOrder)) {
        sectionOrder = normalizeSectionOrder(parsedSections[0].sectionOrder);
      }
      const validStorySections = parsedSections.filter(s =>
        !s.isMetaOnly && (
          (s.heading && s.heading.trim().length > 0) ||
          (s.text && s.text.trim().length > 0) ||
          (s.content && s.content.trim().length > 0) ||
          (s.image && s.image.trim().length > 0)
        )
      );
      storyBlocks = validStorySections.map((s, idx) => ({
        tag: s.tag || (idx === 0 ? 'Overview' : (idx === 1 ? 'The challenge' : `Section ${idx + 1}`)),
        heading: s.heading !== undefined ? s.heading : '',
        text: s.text || s.content || '',
        image: s.image || '',
        position: s.position || (idx % 2 === 0 ? 'left' : 'right'),
      }));
    } else {
      const ovText = (cs.overviewText || cs.overview || '').trim();
      const chText = (cs.challengeText || cs.challenge || '').trim();
      storyBlocks = [];
      if (ovText || (cs.overviewHeading && cs.overviewHeading.trim().length > 0)) {
        storyBlocks.push({
          tag: 'Overview',
          heading: cs.overviewHeading || '',
          text: ovText,
          image: '',
          position: 'left',
        });
      }
      if (chText || (cs.challengeHeading && cs.challengeHeading.trim().length > 0)) {
        storyBlocks.push({
          tag: 'The challenge',
          heading: cs.challengeHeading || '',
          text: chText,
          image: '',
          position: 'right',
        });
      }
    }

    const rawCats = parseJSON(cs.galleryCategories, []);
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

    const firstSec = Array.isArray(parsedSections) && parsedSections.length > 0 ? parsedSections[0] : {};

    setForm({
      title: cs.title || '', metaTitle: cs.metaTitle || '', metaDescription: cs.metaDescription || '',
      slug: cs.slug || '', largeBanner: cs.largeBanner || cs.heroImage || '', smallBanner: cs.smallBanner || '',
      content: cs.content || cs.description || '', client: cs.client || '', service: cs.service || '', category: cs.category || 'VR',
      duration: cs.duration || '', deliverables: cs.deliverables || '',
      heroVideo: cs.heroVideo || cs.videoUrl || '', videoUrl: cs.videoUrl || cs.heroVideo || '',
      overviewHeading: cs.overviewHeading || '', overviewText: cs.overviewText || cs.overview || '',
      challengeHeading: cs.challengeHeading || '', challengeText: cs.challengeText || cs.challenge || '',
      creditsEyebrow: firstSec.creditsEyebrow !== undefined ? firstSec.creditsEyebrow : (cs.creditsEyebrow || ''),
      creditsHeading: firstSec.creditsHeading !== undefined ? firstSec.creditsHeading : (cs.creditsHeading || ''),
      creditsToolsLabel: firstSec.creditsToolsLabel !== undefined ? firstSec.creditsToolsLabel : (cs.creditsToolsLabel || ''),
      creditsTools: firstSec.creditsTools !== undefined ? firstSec.creditsTools : (cs.creditsTools || ''),
      creditsAgency: firstSec.creditsAgency !== undefined ? firstSec.creditsAgency : (cs.creditsAgency || ''),
      faqHeading: firstSec.faqHeading !== undefined ? firstSec.faqHeading : (cs.faqHeading || ''),
      faqItems: Array.isArray(firstSec.faqItems) ? firstSec.faqItems : parseJSON(cs.faqItems, []),
      calloutEyebrow: firstSec.calloutEyebrow !== undefined ? firstSec.calloutEyebrow : (cs.calloutEyebrow || ''),
      calloutHeadline: firstSec.calloutHeadline !== undefined ? firstSec.calloutHeadline : (cs.calloutHeadline || ''),
      calloutBody: firstSec.calloutBody !== undefined ? firstSec.calloutBody : (cs.calloutBody || ''),
      calloutButtonText: firstSec.calloutButtonText !== undefined ? firstSec.calloutButtonText : (cs.calloutButtonText || ''),
      calloutButtonUrl: firstSec.calloutButtonUrl !== undefined ? firstSec.calloutButtonUrl : (cs.calloutButtonUrl || ''),
      targetKeywords: firstSec.targetKeywords !== undefined ? firstSec.targetKeywords : (cs.targetKeywords || cs.metaKeywords || ''),
      customSchema: firstSec.customSchema !== undefined ? firstSec.customSchema : (cs.customSchema || ''),
      storyBlocks,
      galleryThumbnails,
      galleryStills,
      galleryCategories: otherCats.length > 0 ? otherCats : [{ name: '', images: '' }],
      results: parseJSON(cs.results, []),
      processSteps: parseJSON(cs.processSteps || cs.process, []),
      sectionOrder,
      videoTabs: parseJSON(cs.videoTabs, [{ label: '', url: '' }]),
      ctaUrl: cs.ctaUrl || '', ctaText: cs.ctaText || '',
      featured: cs.featured || false,
      hidden: isProjectHidden(cs),
    });
    setSelectedBannerFile(null);
    setSelectedSmallFile(null);
    setGalleryFiles({});
    setStoryBlockFiles({});
    setThumbnailFiles([]);
    setStillFiles([]);
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

  const uploadImage = async (file) => {
    const currentToken = getAdminToken() || token;
    const formData = new FormData();
    formData.append('image', file);
    const { data, status } = await apiCall(`/upload?type=case-studies`, 'POST', formData, currentToken, true);
    if (status === 200 && data?.url) return data.url;
    throw new Error(data?.message || data?.error || `Upload failed with status ${status}`);
  };

  const handleSave = async (e) => {
    if (e) e.preventDefault();
    if (!form.title || !form.slug) { setMsg('Title and Slug are required'); setTimeout(() => setMsg(''), 3000); return; }
    setSaving(true);
    let largeBannerUrl = form.largeBanner;
    let smallBannerUrl = form.smallBanner;

    if (selectedBannerFile) {
      setUploadingBanner(true);
      try {
        const url = await uploadImage(selectedBannerFile);
        if (url) largeBannerUrl = url;
      } catch (err) {
        setMsg(`Banner upload failed: ${err.message}`);
        setUploadingBanner(false);
        setSaving(false);
        return;
      }
      setUploadingBanner(false);
    }
    if (selectedSmallFile) {
      setUploadingSmall(true);
      try {
        const url = await uploadImage(selectedSmallFile);
        if (url) smallBannerUrl = url;
      } catch (err) {
        setMsg(`Small banner upload failed: ${err.message}`);
        setUploadingSmall(false);
        setSaving(false);
        return;
      }
      setUploadingSmall(false);
    }

    // Upload story block images
    const updatedStoryBlocks = [...(form.storyBlocks || [])];
    for (let i = 0; i < updatedStoryBlocks.length; i++) {
      const file = storyBlockFiles[i];
      if (file) {
        try {
          const url = await uploadImage(file);
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
          const url = await uploadImage(file);
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
          const url = await uploadImage(file);
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

    // Build sections with sectionOrder stored in the first element
    let finalSections = [];
    if (updatedStoryBlocks.length > 0) {
      finalSections = updatedStoryBlocks.map((b, idx) => ({
        tag: b.tag || (idx === 0 ? 'Overview' : (idx === 1 ? 'The challenge' : `Section ${idx + 1}`)),
        heading: b.heading || '',
        text: b.text || '',
        image: b.image || '',
        position: b.position || (idx % 2 === 0 ? 'left' : 'right'),
        ...(idx === 0 ? {
          sectionOrder: form.sectionOrder || defaultSectionOrder,
          hidden: Boolean(form.hidden),
          creditsEyebrow: form.creditsEyebrow || '',
          creditsHeading: form.creditsHeading || '',
          creditsToolsLabel: form.creditsToolsLabel || '',
          creditsTools: form.creditsTools || '',
          creditsAgency: form.creditsAgency || '',
          faqHeading: form.faqHeading || '',
          faqItems: form.faqItems || [],
          calloutEyebrow: form.calloutEyebrow || '',
          calloutHeadline: form.calloutHeadline || '',
          calloutBody: form.calloutBody || '',
          calloutButtonText: form.calloutButtonText || '',
          calloutButtonUrl: form.calloutButtonUrl || '',
          targetKeywords: form.targetKeywords || '',
          customSchema: form.customSchema || '',
        } : {}),
      }));
    } else {
      finalSections = [{
        isMetaOnly: true,
        tag: '',
        heading: '',
        text: '',
        image: '',
        position: 'left',
        sectionOrder: form.sectionOrder || defaultSectionOrder,
        hidden: Boolean(form.hidden),
        creditsEyebrow: form.creditsEyebrow || '',
        creditsHeading: form.creditsHeading || '',
        creditsToolsLabel: form.creditsToolsLabel || '',
        creditsTools: form.creditsTools || '',
        creditsAgency: form.creditsAgency || '',
        faqHeading: form.faqHeading || '',
        faqItems: form.faqItems || [],
        calloutEyebrow: form.calloutEyebrow || '',
        calloutHeadline: form.calloutHeadline || '',
        calloutBody: form.calloutBody || '',
        calloutButtonText: form.calloutButtonText || '',
        calloutButtonUrl: form.calloutButtonUrl || '',
        targetKeywords: form.targetKeywords || '',
        customSchema: form.customSchema || '',
      }];
    }

    const { storyBlocks, galleryThumbnails, galleryStills, sectionOrder, ...formRest } = form;
    const payload = {
      ...formRest,
      hidden: Boolean(form.hidden),
      isHidden: Boolean(form.hidden),
      status: form.hidden ? 'hidden' : 'published',
      largeBanner: largeBannerUrl,
      smallBanner: smallBannerUrl,
      heroImage: largeBannerUrl,
      heroVideo: form.heroVideo || form.videoUrl,
      videoUrl: form.heroVideo || form.videoUrl,
      overviewHeading: updatedStoryBlocks[0]?.heading || '',
      overviewText: updatedStoryBlocks[0]?.text || '',
      challengeHeading: updatedStoryBlocks[1]?.heading || '',
      challengeText: updatedStoryBlocks[1]?.text || '',
      sections: JSON.stringify(finalSections),
      results: JSON.stringify(form.results.filter(r => r.stat || r.label)),
      processSteps: JSON.stringify(form.processSteps.filter(p => p.phase || p.title)),
      galleryCategories: JSON.stringify(galleryCategoriesPayload),
      videoTabs: JSON.stringify(form.videoTabs.filter(v => v.label || v.url)),
      creditsEyebrow: form.creditsEyebrow || '',
      creditsHeading: form.creditsHeading || '',
      creditsToolsLabel: form.creditsToolsLabel || '',
      creditsTools: form.creditsTools || '',
      creditsAgency: form.creditsAgency || '',
      faqHeading: form.faqHeading || '',
      faqItems: JSON.stringify(form.faqItems || []),
      targetKeywords: form.targetKeywords || '',
      metaKeywords: form.targetKeywords || '',
      customSchema: form.customSchema || '',
      ctaUrl: form.ctaUrl || '',
      ctaText: form.ctaText || '',
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
              {/* Visibility / Hidden Status */}
              <div className="bg-[#141414] border border-[#262626] p-4 rounded-xl flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${form.hidden ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                    <span className="text-xs font-bold uppercase tracking-widest text-[#F2F0EB]">
                      {form.hidden ? 'Status: Hidden from Website' : 'Status: Published & Visible'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#888] mt-1">
                    {form.hidden
                      ? 'This case study is hidden from portfolio feeds, home page, and search index.'
                      : 'This case study is live and visible to visitors on the website.'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm(f => ({ ...f, hidden: !f.hidden }))}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 ${
                    form.hidden
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                      : 'bg-[#1F1F1F] text-[#AAA] border-[#333] hover:text-white hover:border-[#555]'
                  }`}
                >
                  {form.hidden ? 'Hidden (Click to Show)' : 'Visible (Click to Hide)'}
                </button>
              </div>

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
                          <img src={resolvePreviewUrl(form.largeBanner)} alt="" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => { setForm(f => ({ ...f, largeBanner: '' })); setSelectedBannerFile(null); }} className="absolute inset-0 bg-[#0D0D0D]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"><FiX className="text-white text-xs" /></button>
                        </div>
                      )}
                      <input
                        type="text"
                        value={form.largeBanner || ''}
                        onChange={(e) => {
                          setForm(f => ({ ...f, largeBanner: e.target.value }));
                          setSelectedBannerFile(null);
                        }}
                        placeholder="Paste https://api.elipsestudio.com/media/... or choose image"
                        className="flex-1 bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]"
                      />
                      <label className="flex items-center justify-center gap-2 border border-dashed border-[#333] rounded-xl px-4 py-3 cursor-pointer hover:border-[#4169E1]/50 transition-all shrink-0">
                        <FiUpload className="text-[#555]" />
                        <span className="text-[#555] text-[9px] font-bold uppercase tracking-widest">{uploadingBanner ? 'Uploading...' : 'Choose File'}</span>
                        <input type="file" accept="image/*" onChange={(e) => { const file = e.target.files[0]; if (!file) return; setForm(f => ({ ...f, largeBanner: URL.createObjectURL(file) })); setSelectedBannerFile(file); }} className="hidden" />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-2">Small Banner / Card Thumbnail</label>
                    <div className="flex items-center gap-3">
                      {form.smallBanner && (
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-[#333] shrink-0 group">
                          <img src={resolvePreviewUrl(form.smallBanner)} alt="" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => { setForm(f => ({ ...f, smallBanner: '' })); setSelectedSmallFile(null); }} className="absolute inset-0 bg-[#0D0D0D]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"><FiX className="text-white text-xs" /></button>
                        </div>
                      )}
                      <input
                        type="text"
                        value={form.smallBanner || ''}
                        onChange={(e) => {
                          setForm(f => ({ ...f, smallBanner: e.target.value }));
                          setSelectedSmallFile(null);
                        }}
                        placeholder="Paste https://api.elipsestudio.com/media/... or choose image"
                        className="flex-1 bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]"
                      />
                      <label className="flex items-center justify-center gap-2 border border-dashed border-[#333] rounded-xl px-4 py-3 cursor-pointer hover:border-[#4169E1]/50 transition-all shrink-0">
                        <FiUpload className="text-[#555]" />
                        <span className="text-[#555] text-[9px] font-bold uppercase tracking-widest">{uploadingSmall ? 'Uploading...' : 'Choose File'}</span>
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

              {/* ===== SECTION ORDER CONTROLLER ===== */}
              <SectionCard title="Page Section Order & Positioning" icon={<FiMove size={12} />}>
                <p className="text-[#888] text-[8px] uppercase tracking-widest -mt-2">
                  Arrange the display order of sections on your public case study page:
                </p>
                <div className="space-y-2">
                  {(form.sectionOrder || defaultSectionOrder).map((secKey, idx) => {
                    const secLabels = {
                      storyBlocks: '1. Overview & Challenge (Alternating Story Blocks)',
                      thumbnails: '2. Visual Output: Thumbnails (16:9 Aspect Ratio - 3 per row)',
                      stills: '3. Visual Output: Still Images (4 per row)',
                      gallery: 'Visual Output (Combined Thumbnails & Stills)',
                      results: '4. Measurable Impact (Results Cards)',
                      process: '5. How We Did It (Process Steps)',
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

              {/* ===== SECTION 4: OVERVIEW & CHALLENGE (STORY BLOCKS) ===== */}
              <SectionCard title="4. Overview & Challenge (Story Blocks)" icon="💡">
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

              {/* ===== SECTION 5: GALLERY (THUMBNAILS & STILLS) ===== */}
              <SectionCard title="5. Gallery (16:9 Thumbnails & Still Images)" icon="🖼">
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

              {/* ===== SECTION 6: RESULTS ===== */}
              <SectionCard title="6. Measurable Impact (Results)" icon="📈">
                <p className="text-[#888] text-[8px] uppercase tracking-widest -mt-2">
                  Highlight project results — each with Stat, Label, and Description. Use arrows to change item position.
                </p>
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

              {/* ===== SECTION 7: PROCESS ===== */}
              <SectionCard title="7. How We Did It (Process Steps)" icon="⚙">
                <p className="text-[#888] text-[8px] uppercase tracking-widest -mt-2">
                  Process steps with Step Number, Phase, Title, and Description. Use arrows to position each step.
                </p>
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

              {/* ===== SECTION 8: FORMAL PROJECT CREDITS ===== */}
              <SectionCard title="8. Formal Project Credits & Pipeline" icon="🎬">
                <p className="text-[#888] text-[8px] uppercase tracking-widest -mt-2">
                  Display a sleek centered card with production eyebrow, title, and tool pill badges on your case study page.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-wider mb-1">Card Eyebrow Tag</label>
                    <input
                      type="text"
                      value={form.creditsEyebrow || ''}
                      onChange={(e) => setForm(f => ({ ...f, creditsEyebrow: e.target.value }))}
                      placeholder="Default: PRODUCTION PIPELINE"
                      className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-wider mb-1">Section Title</label>
                    <input
                      type="text"
                      value={form.creditsHeading || ''}
                      onChange={(e) => setForm(f => ({ ...f, creditsHeading: e.target.value }))}
                      placeholder="Default: Formal Project Credits"
                      className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-wider mb-1">Tools Sub-Heading Label</label>
                    <input
                      type="text"
                      value={form.creditsToolsLabel || ''}
                      onChange={(e) => setForm(f => ({ ...f, creditsToolsLabel: e.target.value }))}
                      placeholder="Default: CORE TOOLS & PIPELINE:"
                      className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-wider mb-1">Lead Creative Agency (optional)</label>
                    <input
                      type="text"
                      value={form.creditsAgency || ''}
                      onChange={(e) => setForm(f => ({ ...f, creditsAgency: e.target.value }))}
                      placeholder="e.g. Digitz"
                      className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[#888] text-[8px] uppercase tracking-wider mb-1">Core Tools (comma-separated)</label>
                  <input
                    type="text"
                    value={form.creditsTools || ''}
                    onChange={(e) => setForm(f => ({ ...f, creditsTools: e.target.value }))}
                    placeholder="e.g. Autodesk Maya, Redshift, Foundry Nuke, SpeedTree, Blender, Adobe After Effects, AI 8K Upscaling"
                    className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                  />
                  {form.creditsTools && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 p-2.5 bg-[#0D0D0D] rounded-lg border border-[#222]">
                      <span className="text-[9px] text-[#666] uppercase tracking-wider mr-1 self-center">Live Badges Preview:</span>
                      {form.creditsTools.split(',').map((t, idx) => {
                        const trimmed = t.trim();
                        if (!trimmed) return null;
                        return (
                          <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#4169E1]/20 text-[#60a5fa] border border-[#4169E1]/30">
                            {trimmed}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              </SectionCard>

              {/* ===== SECTION 9: FAQ ===== */}
              <SectionCard title="9. Frequently Asked Questions (FAQ)" icon="❓">
                <p className="text-[#888] text-[8px] uppercase tracking-widest -mt-2">
                  Add project FAQs with question and answer inputs. Renders centered and matching the site layout.
                </p>
                <div>
                  <label className="block text-[#888] text-[8px] uppercase tracking-wider mb-1">FAQ Section Heading</label>
                  <input
                    type="text"
                    value={form.faqHeading || ''}
                    onChange={(e) => setForm(f => ({ ...f, faqHeading: e.target.value }))}
                    placeholder="Default: FAQ"
                    className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                  />
                </div>

                <div className="space-y-3">
                  {(form.faqItems || []).map((faq, i) => (
                    <div key={i} className="p-3 bg-[#1A1A1A] rounded-xl border border-[#222] space-y-2">
                      <div className="flex items-center justify-between border-b border-[#26262e] pb-1.5">
                        <span className="text-[10px] font-bold text-[#4169E1]">Question #{i + 1}</span>
                        <div className="flex items-center gap-1">
                          <button type="button" disabled={i === 0} onClick={() => moveArrayItem('faqItems', i, -1)} className="p-1 text-[#666] hover:text-[#4169E1] disabled:opacity-20"><FiChevronUp size={14} /></button>
                          <button type="button" disabled={i === (form.faqItems || []).length - 1} onClick={() => moveArrayItem('faqItems', i, 1)} className="p-1 text-[#666] hover:text-[#4169E1] disabled:opacity-20"><FiChevronDown size={14} /></button>
                          <button type="button" onClick={() => removeArrayItem('faqItems', i)} className="p-1 text-red-400 hover:text-red-300" title="Remove question"><FiX size={14} /></button>
                        </div>
                      </div>
                      <div>
                        <input
                          type="text"
                          value={faq.q || ''}
                          onChange={(e) => updateArray('faqItems', i, 'q', e.target.value)}
                          placeholder="Question: e.g. What software and techniques were used to create the Lahore Zoo 3D billboard?"
                          className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs font-semibold"
                        />
                      </div>
                      <div>
                        <textarea
                          value={faq.a || ''}
                          onChange={(e) => updateArray('faqItems', i, 'a', e.target.value)}
                          rows={3}
                          placeholder="Answer: e.g. The production pipeline utilized Autodesk Maya and Redshift for 3D animation..."
                          className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs resize-none font-light leading-relaxed"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => addArrayItem('faqItems', { q: '', a: '' })}
                  className="text-[#4169E1] text-[8px] uppercase tracking-widest font-bold hover:underline"
                >
                  <FiPlus className="inline mr-1" />Add FAQ Question
                </button>
              </SectionCard>

              {/* 10. Callout Banner (Above Related Work) */}
              <SectionCard icon="📢" title="10. Commercial Callout Banner (Above Related Work)">
                <p className="text-[#888] text-[8px] uppercase tracking-widest -mt-2">
                  Display a sleek cinema-caliber conversion banner directly above the &ldquo;Related Work&rdquo; section.
                </p>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-wider mb-1">Eyebrow Pill Tag</label>
                    <input
                      type="text"
                      value={form.calloutEyebrow || ''}
                      onChange={(e) => setForm(f => ({ ...f, calloutEyebrow: e.target.value }))}
                      placeholder="e.g. READY TO ELEVATE YOUR COMMERCIAL CAMPAIGNS?"
                      className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-wider mb-1">Headline</label>
                    <input
                      type="text"
                      value={form.calloutHeadline || ''}
                      onChange={(e) => setForm(f => ({ ...f, calloutHeadline: e.target.value }))}
                      placeholder="e.g. Replace Costly Film Sets with Cinema-Caliber 3D CGI"
                      className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[#888] text-[8px] uppercase tracking-wider mb-1">Body / Subtext</label>
                    <textarea
                      value={form.calloutBody || ''}
                      onChange={(e) => setForm(f => ({ ...f, calloutBody: e.target.value }))}
                      rows={3}
                      placeholder="e.g. Eliminate unpredictable live-action food shoots. Send us your campaign brief or product CAD files, and our lead animation director will provide a 3D commercial feasibility breakdown within 24 hours."
                      className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs resize-none font-light leading-relaxed"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#888] text-[8px] uppercase tracking-wider mb-1">Button Text</label>
                      <input
                        type="text"
                        value={form.calloutButtonText || ''}
                        onChange={(e) => setForm(f => ({ ...f, calloutButtonText: e.target.value }))}
                        placeholder="Default: Schedule a 15-Minute Scoping Call"
                        className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[#888] text-[8px] uppercase tracking-wider mb-1">Button Link / Calendly URL</label>
                      <input
                        type="text"
                        value={form.calloutButtonUrl || ''}
                        onChange={(e) => setForm(f => ({ ...f, calloutButtonUrl: e.target.value }))}
                        placeholder="Default: https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting"
                        className="w-full bg-[#0D0D0D] border border-[#333] rounded-lg px-3 py-2 text-[#F2F0EB] focus:border-[#4169E1] outline-none text-xs"
                      />
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* 11. Description (HTML) */}
              <SectionCard icon="📝" title="11. Full Description (HTML Editor)">
                <HtmlEditor value={form.content} onChange={(val) => setForm(f => ({ ...f, content: val }))} minHeight={200} />
              </SectionCard>

              {/* 12. Featured Switch & SEO */}
              <SectionCard icon="⭐" title="12. Featured & SEO Settings">
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

                <div className="mt-4 pt-4 border-t border-[#222]">
                  <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-1">
                    Target Keywords (SEO / AEO) <span className="text-[#555]">(comma-separated)</span>
                  </label>
                  <p className="text-[#555] text-[8px] mb-2">Used for meta keyword tags, Schema.org Article, and AI discovery.</p>
                  <input
                    type="text"
                    value={form.targetKeywords || ''}
                    onChange={(e) => setForm(f => ({ ...f, targetKeywords: e.target.value }))}
                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs placeholder:text-[#444]"
                    placeholder="e.g. Lahore Zoo 3D billboard, anamorphic wildlife animation, naked-eye 3D creature CGI, SpeedTree 3D forest environment, corner LED screen animation, Elipse Studio"
                  />
                  {form.targetKeywords && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 p-2.5 bg-[#0D0D0D] rounded-lg border border-[#222]">
                      <span className="text-[9px] text-[#666] uppercase tracking-wider mr-1 self-center">Keywords Preview:</span>
                      {form.targetKeywords.split(',').map((k, idx) => {
                        const trimmed = k.trim();
                        if (!trimmed) return null;
                        return (
                          <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-[#4169E1]/15 text-[#93c5fd] border border-[#4169E1]/30">
                            #{trimmed}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-[#222]">
                  <label className="block text-[#888] text-[8px] uppercase tracking-widest mb-1">
                    Custom JSON-LD Schema <span className="text-[#555]">(Optional — paste &lt;script&gt; or {`{}`} JSON)</span>
                  </label>
                  <p className="text-[#555] text-[8px] mb-2">
                    Paste custom schema (e.g. CreativeWork / Article with contributors, customer, genre). If left blank, the website automatically generates standard Article + Breadcrumb + FAQ schema.
                  </p>
                  <textarea
                    value={form.customSchema || ''}
                    onChange={(e) => setForm(f => ({ ...f, customSchema: e.target.value }))}
                    rows={4}
                    placeholder='{ "@context": "https://schema.org", "@type": "CreativeWork", "name": "...", "creator": { ... }, "contributor": [ ... ] }'
                    className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-[#F2F0EB] focus:border-[#4169E1] outline-none transition-all text-xs font-mono placeholder:text-[#444] resize-y"
                  />
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
                onToggleHide={handleToggleHide}
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
