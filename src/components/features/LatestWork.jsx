'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { FiSearch } from '@/components/ui/Icons';
import { apiCall, BACKEND_ORIGIN } from '@/utils/api';
import { getProjectValueProposition } from '@/constants/projectValueProps';
import { useTheme } from '@/components/providers/ThemeProvider';
import VideoHover from '@/components/ui/VideoHover';

/* ──────────────────────────────────────────────────────────────────────────────
   TASK B1 — 4 Pillar Tabs
   ────────────────────────────────────────────────────────────────────────────── */
const PILLAR_TABS = [
  { key: 'all', label: 'All Projects' },
  { key: 'configurator', label: '3D Configurators' },
  { key: 'archviz', label: 'Real-Time ArchViz & VR' },
  { key: 'cgi', label: 'Commercial CGI & Animation' },
];

const categoryToPillars = (category = '') => {
  const cats = category.split(',').map((c) => c.trim().toLowerCase());
  const pillars = new Set();

  for (const c of cats) {
    if (c === 'configurator') pillars.add('configurator');
    if (['vr', 'architecture', 'tour 360'].includes(c)) pillars.add('archviz');
    if (c === 'animation') pillars.add('cgi');
  }

  return pillars;
};

const resolveVideoUrl = (val) => {
  if (!val || typeof val !== 'string') return '';
  const s = val.trim();
  if (!s) return '';
  if (
    s.includes('youtube.com') ||
    s.includes('youtu.be') ||
    s.startsWith('http://') ||
    s.startsWith('https://') ||
    s.startsWith('/')
  ) {
    return s;
  }
  return `/assets/ElipseImages/videos/${s}`;
};

const VideoHoverCard = ({ project, isLight }) => {
  const themeContext = useTheme();
  const isLightMode = isLight !== undefined ? isLight : Boolean(themeContext?.isLight);

  const imageSrc = project.image
    ? project.image.startsWith('http')
      ? project.image
      : `${BACKEND_ORIGIN}${project.image}`
    : '';

  const rawVideo = project.previewVideo || project.video || project.heroVideo || '';
  const videoSrc = resolveVideoUrl(rawVideo);
  const is360Tour = (project.category || '').toLowerCase().includes('360');

  return (
    <Link
      href={project.path || `/case-study/${project.id}`}
      target={project.path?.startsWith('http') ? '_blank' : '_self'}
      rel={
        project.path?.startsWith('http')
          ? `noopener noreferrer${project.category === 'Tour 360' ? ' nofollow' : ''}`
          : ''
      }
      aria-label={`View project: ${project.title}`}
      className="group block transition-all duration-300 cursor-pointer"
    >
      {/* 16:9 Media Container (100% Clean Poster + Hover Video) */}
      <div
        className={`relative overflow-hidden border transition-all duration-300 shadow-sm group-hover:shadow-xl aspect-[16/9] w-full ${isLightMode
          ? 'border-zinc-200 group-hover:border-zinc-400'
          : 'border-zinc-800 group-hover:border-zinc-700'
          }`}
      >
        <VideoHover
          posterSrc={imageSrc}
          videoSrc={videoSrc}
          alt={project.title}
          className="w-full h-full"
        />
      </div>

      {/* Architectural Luxury Editorial Info Below Media (Centered) */}
      <div className="pt-4 pb-2 px-2 text-center flex flex-col items-center">
        {/* Project Title (Serif Luxury Style) */}
        <h3
          className={`text-lg md:text-xl font-serif tracking-wide transition-colors duration-300 ${isLightMode
            ? 'text-zinc-900 group-hover:text-black'
            : 'text-white group-hover:text-zinc-100'
            }`}
        >
          {project.title}
        </h3>

        {/* Subtitle / Description */}
        <p
          className={`text-xs md:text-sm font-light mt-1.5 max-w-sm line-clamp-2 leading-relaxed ${isLightMode ? 'text-zinc-600' : 'text-zinc-400'
            }`}
        >
          {getProjectValueProposition(project)}
        </p>

        {/* Outlined Explore / View 360 Tour ↗ Button with Hover Color Fill */}
        <div className="mt-3.5">
          <span
            className={`inline-flex items-center justify-center gap-2 px-6 py-2 text-sm font-medium tracking-wider border transition-all duration-300 shadow-sm ${isLightMode
              ? 'border-zinc-400 text-zinc-800 bg-transparent group-hover:border-black group-hover:bg-black group-hover:text-white hover:border-black hover:bg-black hover:text-white'
              : 'border-zinc-500 text-zinc-200 bg-transparent group-hover:border-white group-hover:bg-white group-hover:text-black hover:border-white hover:bg-white hover:text-black'
              }`}
          >
            {is360Tour ? 'View 360 Tour' : 'Explore'}
            <span className="text-[13px] leading-none transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
};

const mapProjects = (data) =>
  data
    .filter((p) => p.title !== 'Costa Cart' && p.title !== 'Costa Cart Config' && p.path !== '/project/costa-cart')
    .map((p) => ({
      id: p.id,
      title: p.title,
      category: p.category,
      image: p.image,
      path: p.path,
      description: p.description,
      metaDescription: p.metaDescription,
      video: p.video || '',
      heroVideo: p.heroVideo || '',
      previewVideo: p.previewVideo || p.video || p.heroVideo || '',
    }));

const LatestWorkContent = ({ isLight = undefined, initialProjects = null }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const themeContext = useTheme();
  const isLightMode = isLight !== undefined ? isLight : Boolean(themeContext?.isLight);

  const [apiProjects, setApiProjects] = useState(initialProjects ? mapProjects(initialProjects) : []);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    // Skip fetch if server already provided data (avoid redundant request).
    if (initialProjects) return;
    let cancelled = false;
    const fetchProjects = async () => {
      try {
        const { data, status } = await apiCall('/projects', 'GET');
        if (!cancelled && status === 200 && Array.isArray(data)) {
          setApiProjects(mapProjects(data));
        }
      } catch {
        /* keep initialProjects as fallback */
      }
    };
    fetchProjects();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projects = apiProjects;

  const categoryParam = searchParams ? searchParams.get('category') : null;
  const [prevCategoryParam, setPrevCategoryParam] = useState(categoryParam);
  if (categoryParam !== prevCategoryParam) {
    setPrevCategoryParam(categoryParam);
    if (categoryParam) {
      const lower = categoryParam.toLowerCase();
      if (lower === 'configurator') setActiveTab('configurator');
      else if (['vr', 'architecture', 'tour 360'].includes(lower)) setActiveTab('archviz');
      else if (lower === 'animation') setActiveTab('cgi');
      else setActiveTab('all');
    }
  }

  const handleTabChange = (key) => {
    setActiveTab(key);
    setSearchTerm('');
    setVisibleCount(6);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setVisibleCount(6);
  };

  const loadMore = () => {
    setVisibleCount((prev) => prev + 6);
  };

  const filteredProjects = projects.filter((project) => {
    if (pathname === project.path) return false;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.category.toLowerCase().includes(searchTerm.toLowerCase());
    if (searchTerm) return matchesSearch;
    if (activeTab === 'all') return true;
    return categoryToPillars(project.category).has(activeTab);
  });

  const displayedProjects = filteredProjects.slice(0, visibleCount);

  return (
    <section
      id="latest-work"
      className={`relative transition-colors duration-300 ${isLightMode ? 'bg-white text-zinc-900' : 'bg-black text-white'
        } pt-0 md:pt-6 lg:pt-8 pb-12 md:pb-20`}
    >
      {isLightMode && (
        <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
      )}

      <div className="w-full mx-auto px-[15px] md:px-[40px] pt-0 md:pt-4">
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-6">
          <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1]">
            Latest Work
          </h2>
          <div className="relative flex items-center w-full max-w-[180px] md:max-w-xs">
            <div
              className={`flex items-center border rounded-full pl-4 pr-1.5 py-1.5 w-full hover:border-[#4169E1]/50 transition-all duration-300 focus-within:border-[#4169E1] ${isLightMode
                ? 'bg-zinc-100/50 border-zinc-200 focus-within:shadow-[0_0_15px_rgba(65,105,225,0.06)]'
                : 'bg-zinc-900/50 border-zinc-800 focus-within:shadow-[0_0_15px_rgba(65,105,225,0.1)]'
                }`}
            >
              <input
                type="text"
                placeholder="Search..."
                className={`bg-transparent border-none outline-none text-[10px] md:text-sm w-full placeholder:text-zinc-500 min-h-[32px] ${isLightMode ? 'text-black' : 'text-white'
                  }`}
                value={searchTerm}
                onChange={handleSearchChange}
                aria-label="Search projects"
                suppressHydrationWarning
              />
              <button
                className="bg-[#4169E1] text-black p-2 md:p-2.5 rounded-full hover:bg-[#4169E1] transition-colors shrink-0 flex items-center justify-center min-w-[32px] min-h-[32px]"
                aria-label="Submit Search"
                suppressHydrationWarning
              >
                <FiSearch className="w-3.5 h-3.5 md:w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* ── Task B1: 4 Pillar Tabs (pill-button style) ── */}
        <div className="relative mb-4 md:mb-8">
          <div className="flex flex-wrap gap-2 md:gap-3 pb-4 items-center">
            {PILLAR_TABS.map((tab) => {
              const isActive = activeTab === tab.key && !searchTerm;
              return (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  suppressHydrationWarning
                  className={`px-4 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer shrink-0 ${isActive
                    ? 'bg-[#2563EB] text-white shadow-md shadow-[#2563EB]/30'
                    : isLightMode
                      ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 border border-zinc-200/70'
                      : 'bg-zinc-900/90 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-zinc-800'
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="w-full px-[15px] md:px-[40px]">
        <div key={activeTab} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {displayedProjects.map((project) => (
            <VideoHoverCard key={project.id} project={project} isLight={isLightMode} />
          ))}
        </div>

        {filteredProjects.length > 6 && (
          <div className="flex justify-center mt-8 pb-6 md:pb-8">
            <button
              onClick={filteredProjects.length > visibleCount ? loadMore : () => setVisibleCount(6)}
              suppressHydrationWarning
              className={`group relative flex items-center gap-3 border rounded-full px-10 py-4 text-sm font-medium tracking-widest uppercase hover:scale-105 transition-all duration-500 ${isLightMode
                ? 'bg-black/5 border-black/20 hover:bg-black hover:text-white'
                : 'bg-white/5 border-white/20 hover:bg-white hover:text-black'
                }`}
            >
              {filteredProjects.length > visibleCount ? 'Load More' : 'Show Less'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const LatestWorkFallback = ({ isLight = false }) => (
  <section
    id="latest-work"
    className={`relative transition-colors duration-300 ${isLight ? 'bg-white pt-8 md:pt-16 pb-10 md:pb-16' : 'bg-black pt-8 md:pt-12 pb-10'
      }`}
  >
    <div className="w-full mx-auto px-[15px] md:px-[40px]">
      <h2 className="text-2xl md:text-4xl lg:text-[44px] font-medium tracking-tight leading-[1.1]">
        Latest Work
      </h2>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={`aspect-[16/9] rounded ${isLight ? 'bg-zinc-100' : 'bg-zinc-900'
              } animate-pulse`}
          />
        ))}
      </div>
    </div>
  </section>
);

const LatestWork = (props) => {
  return (
    <Suspense fallback={<LatestWorkFallback isLight={props.isLight} />}>
      <LatestWorkContent {...props} />
    </Suspense>
  );
};

export default LatestWork;
