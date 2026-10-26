'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { FiSearch } from '@/components/ui/Icons';
import { apiCall, BACKEND_ORIGIN } from '@/utils/api';
import { getProjectValueProposition } from '@/constants/projectValueProps';
import { useTheme } from '@/components/providers/ThemeProvider';


import { isProjectHidden } from '@/utils/projectVisibility';
import { renderCardTitle, stripHtml } from '@/utils/formatTitle';

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

const VideoHoverCard = ({ project, isLight }) => {
  const themeContext = useTheme();
  const isLightMode = isLight !== undefined ? isLight : Boolean(themeContext?.isLight);

  const imageSrc = project.image
    ? project.image.startsWith('http')
      ? project.image
      : `${BACKEND_ORIGIN}${project.image}`
    : '';

  const is360Tour = (project.category || '').toLowerCase().includes('360');
  const isVolvo = (project.title || '').toLowerCase().includes('volvo') ||
    (project.slug || '').toLowerCase().includes('volvo') ||
    (project.path || '').toLowerCase().includes('volvo');

  return (
    <Link
      href={project.path || `/case-study/${project.id}`}
      target={project.path?.startsWith('http') ? '_blank' : '_self'}
      rel={
        project.path?.startsWith('http')
          ? `noopener noreferrer${project.category === 'Tour 360' ? ' nofollow' : ''}`
          : ''
      }
      aria-label={`View project: ${stripHtml(project.title)}`}
      className={`group block relative overflow-hidden border transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl aspect-[16/9] w-full ${isLightMode
        ? 'border-zinc-200 hover:border-zinc-300'
        : 'border-zinc-800 hover:border-zinc-700'
        }`}
    >
      <div className="relative h-full w-full overflow-hidden">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={stripHtml(project.title)}
            loading="lazy"
            decoding="async"
            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2">{renderCardTitle(project.title)}</h3>
          <p className="text-zinc-300 text-xs md:text-sm mb-2 line-clamp-2">
            {isVolvo
              ? 'Unreal Engine 5 Pixel Streaming configurator for Volvo S90 featuring photorealistic cloud rendering — 34% conversion uplift.'
              : getProjectValueProposition(project)}
          </p>
          <div className="pt-3 border-t border-zinc-700/50">
            <span className="inline-flex items-center text-xs font-semibold text-white group-hover:text-[#4169E1] transition-colors uppercase tracking-widest">
              {is360Tour ? 'View 360 Tour' : 'View Case Study'}
              <svg
                className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const mapProjects = (data) =>
  data
    .filter((p) => p.title !== 'Costa Cart' && p.title !== 'Costa Cart Config' && p.path !== '/project/costa-cart' && !isProjectHidden(p))
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
      stripHtml(project.title).toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        } pt-6 sm:pt-8 md:pt-10 lg:pt-12 pb-3 sm:pb-6 md:pb-16`}
    >
      {isLightMode && (
        <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-b from-transparent to-black pointer-events-none"></div>
      )}

      <div className="w-full mx-auto px-[15px] md:px-[40px] pt-1 md:pt-4">
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

        {/* ── 4 Pillar Tabs (Responsive pill-button style) ── */}
        <div className="relative mb-5 md:mb-8 w-full -mx-[15px] px-[15px] md:mx-0 md:px-0">
          <div className="overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 pb-2 pt-1 min-w-max md:min-w-0 md:flex-wrap pr-8 md:pr-0">
              {PILLAR_TABS.map((tab) => {
                const isActive = activeTab === tab.key && !searchTerm;
                return (
                  <button
                    key={tab.key}
                    onClick={() => handleTabChange(tab.key)}
                    suppressHydrationWarning
                    className={`h-9 md:h-10 px-4 md:px-5.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 inline-flex items-center justify-center active:scale-95 ${isActive
                      ? isLightMode
                        ? 'bg-[#2563EB] text-white shadow-[0_2px_10px_rgba(37,99,235,0.35)] border border-blue-600/30 font-bold'
                        : 'bg-gradient-to-r from-[#2563EB] to-[#4169E1] text-white shadow-[0_0_15px_rgba(65,105,225,0.45)] border border-blue-400/30 font-bold'
                      : isLightMode
                        ? 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 border border-zinc-200/80'
                        : 'bg-[#121212] text-zinc-400 hover:bg-[#1C1C1C] hover:text-white border border-white/10'
                      }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
          {/* Subtle Right Edge Fade Indicator on Mobile (ultra-slim feather) */}
          <div
            className={`absolute right-0 top-0 bottom-2 w-3.5 md:hidden pointer-events-none z-10 ${isLightMode
              ? 'bg-gradient-to-l from-white/80 to-transparent'
              : 'bg-gradient-to-l from-black/80 to-transparent'
              }`}
            aria-hidden="true"
          />
        </div>
      </div>

      <div className="w-full px-[15px] md:px-[40px]">
        <div key={activeTab} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px]">
          {displayedProjects.map((project) => (
            <VideoHoverCard key={project.id} project={project} isLight={isLightMode} />
          ))}
        </div>

        {filteredProjects.length > 6 && (
          <div className="flex justify-center mt-6 md:mt-8 pb-0 md:pb-2">
            <button
              onClick={filteredProjects.length > visibleCount ? loadMore : () => setVisibleCount(6)}
              suppressHydrationWarning
              className={`group relative flex items-center gap-3 border rounded-full px-8 sm:px-10 py-3 sm:py-4 text-xs sm:text-sm font-medium tracking-widest uppercase hover:scale-105 transition-all duration-300 ${isLightMode
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
