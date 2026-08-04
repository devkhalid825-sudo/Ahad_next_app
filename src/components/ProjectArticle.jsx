'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArticleProgress } from './articles/articleHelpers';
import { FiArrowLeft } from 'react-icons/fi';
import { apiCall, getYoutubeEmbed, SITE_URL } from '../utils/api';
import AhmedFoodLayout from './AhmedFoodLayout';
import MobileMenu from './MobileMenu';

const safeJson = (val, fallback) => {
  if (!val) return fallback;
  try { return typeof val === 'string' ? JSON.parse(val) : val; } catch { return fallback; }
};

const ProjectArticle = ({ slug, initialData }) => {
  const captured = String(slug || '').trim();
  const [project, setProject] = useState(initialData || null);
  const [nextProject, setNextProject] = useState(null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const projectPath = '/project/' + captured;

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (!captured || initialData) return;
    const fetchProject = async () => {
      setLoading(true);
      setError('');
      try {
        const { data, status } = await apiCall(`/projects/by-path?path=${encodeURIComponent(projectPath)}`, 'GET');
        if (status === 200 && data && data.title) {
          setProject(data);
        } else {
          setError('Project not found');
          setProject(null);
        }
      } catch {
        setError('Failed to load project');
        setProject(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [captured]);

  useEffect(() => {
    if (!captured) return;
    apiCall('/projects', 'GET').then(({ data, status }) => {
      if (status === 200 && Array.isArray(data)) {
        const sorted = data.filter(p => p.path && p.path.startsWith('/project/'));
        const idx = sorted.findIndex(p => p.id === (project && project.id));
        if (idx !== -1) {
          const next = idx < sorted.length - 1 ? sorted[idx + 1] : sorted[0];
          setNextProject(next);
        }
      }
    }).catch(() => {});
  }, [captured, project && project.id]);

  const pageUrl = `${SITE_URL}${project?.path || ''}`;
  const rawDesc = project?.description ? project.description.replace(/<[^>]*>/g, '') : '';
  const image = project?.heroImage || project?.image || `${SITE_URL}/assets/og-image.webp`;

    if (loading) return (
    <div className="min-h-screen bg-[#F2F0EB] flex flex-col items-center justify-center gap-4">
      <div className="w-10 h-10 border-2 border-[#4169E1]/30 border-t-[#4169E1] rounded-full animate-spin" />
    </div>
  );

  if (error || !project) return (
    <div className="min-h-screen bg-[#F2F0EB] flex flex-col items-center justify-center px-6 gap-6">
      <span className="text-[120px] md:text-[200px] font-black text-gray-300 block leading-none">404</span>
      <p className="text-lg text-gray-500 font-light -mt-4">{error}</p>
      <Link to="/" className="flex items-center gap-2 bg-[#0D0D0D] text-[#F2F0EB] px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#4169E1] transition-all">
        <FiArrowLeft /> Back to Home
      </Link>
    </div>
  );

  // --- Field mappings ---

  const meta = [
    ...(project.client ? [{ label: 'Client', value: project.client }] : []),
    ...(project.service ? [{ label: 'Service', value: project.service }] : []),
    ...(project.duration ? [{ label: 'Duration', value: project.duration }] : []),
    ...(project.deliverables ? [{ label: 'Deliverables', value: project.deliverables }] : []),
  ];

  const heroImage = project.heroImage || project.image;
  const heroVideo = project.heroVideo ? getYoutubeEmbed(project.heroVideo) : undefined;

  const results = safeJson(project.results, []).filter(r => r.stat || r.label);
  const processSteps = safeJson(project.processSteps, []).filter(p => p.phase || p.title);
  const rawGallery = safeJson(project.galleryCategories, []);
  const galleryCategories = rawGallery
    .filter(g => g.name)
    .map(g => ({
      name: g.name,
      images: g.images
        ? g.images.split(',').map(s => s.trim()).filter(Boolean)
        : [],
    }));
  const videoTabs = safeJson(project.videoTabs, []).filter(t => t.label || t.url).map(t => ({
    ...t,
    url: getYoutubeEmbed(t.url) || t.url,
  }));

  // Legacy sections fallback
  let sections = [];
  if (project.sections) {
    try { sections = typeof project.sections === 'string' ? JSON.parse(project.sections) : project.sections; } catch (e) {}
  }

  return (
    <>
      
      <ArticleProgress fromColor="#0a4a5a" />
      <AhmedFoodLayout
        title={project.title}
        meta={meta.length > 0 ? meta : undefined}
        heroImage={heroImage}
        heroVideo={heroVideo}
        videoTabs={videoTabs.length > 0 ? videoTabs : undefined}
        overview={project.overviewText || ''}
        overviewHeading={project.overviewHeading || 'Project overview'}
        challenge={project.challengeText || ''}
        challengeHeading={project.challengeHeading || 'Key challenges'}
        content={project.description || ''}
        sections={sections}
        results={results}
        process={processSteps}
        galleryCategories={galleryCategories.length > 0 ? galleryCategories : undefined}
        nextProject={nextProject ? { path: nextProject.path, name: nextProject.title } : undefined}
        ctaUrl={project.ctaUrl || undefined}
        ctaText={project.ctaText || undefined}
      />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default ProjectArticle;
