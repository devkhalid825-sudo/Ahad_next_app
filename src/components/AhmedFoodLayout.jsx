'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaThLarge, FaPaperPlane } from 'react-icons/fa';
import Header from './layouts/Header';
import LatestWork from './features/LatestWork';
import ClientReviews from './features/ClientReviews';
import Footer from './layouts/Footer';
import Contact from './features/Contact';

const RenderCard = ({ src, title }) => (
  <div className="group relative overflow-hidden border border-zinc-800 hover:border-zinc-700 transition-all duration-300 cursor-pointer shadow-md hover:shadow-xl aspect-[16/9] w-[360px] sm:w-[480px] md:w-[560px] shrink-0 snap-start rounded-lg">
    <div className="relative h-full w-full overflow-hidden rounded-lg">
      <img
        src={src}
        alt={title || "Render showcase"}
        width="560"
        height="315"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
  </div>
);

const AutoScrollRow = ({ children }) => {
  const scrollRef = useRef(null);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animFrame;
    const step = () => {
      el.scrollLeft += 1;
      if (el.scrollLeft >= el.scrollWidth / 2) el.scrollLeft = 0;
      animFrame = requestAnimationFrame(step);
    };
    const timer = setTimeout(() => { animFrame = requestAnimationFrame(step); }, 2000);
    return () => { clearTimeout(timer); cancelAnimationFrame(animFrame); };
  }, []);
  return (
    <div className="relative mt-[2rem]">
      <div ref={scrollRef} className="flex overflow-x-hidden no-scrollbar gap-[15px] pb-4">
        {children}
        {React.Children.map(children, (child) => React.cloneElement(child, { key: `dup-${child.key}` }))}
      </div>
    </div>
  );
};

const AhmedFoodLayout = ({
  title,
  meta = [],
  heroVideo,
  heroImage,
  overview = '',
  challenge = '',
  overviewHeading = '',
  challengeHeading = 'Key insights',
  content = '',
  sections = [],
  results = [],
  process = [],
  gallery = [],
  galleryCategories = [],
  videoTabs = [],
  smallBanner,
  children,
  nextProject,
  ctaUrl,
  ctaText,
}) => {
  const router = useRouter();
  const [activeVideo, setActiveVideo] = useState(0);

  const handleStartProject = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  const hasVideoTabs = videoTabs.length > 0;
  const currentVideoUrl = hasVideoTabs ? videoTabs[activeVideo]?.url : heroVideo;

  return (
    <div className="w-full overflow-x-hidden bg-[#0D0D0D] text-[#F2F0EB] selection:bg-[#4169E1]/30 selection:text-[#F2F0EB]">

      {/* HERO */}
      <section className="bg-[#0D0D0D] px-4 sm:px-8 md:px-12 lg:px-16 pt-[85px] sm:pt-[110px] md:pt-[125px] pb-6 md:pb-10 relative">
        <Header />

        <div className="max-w-[1600px] mx-auto">
          {/* Heading and Start a Project Button in same row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 sm:mb-6 pt-2 sm:pt-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#F2F0EB] leading-[1.1] tracking-tight">
              {title}<span className="text-[#4169E1]">.</span>
            </h1>
            <button
              onClick={handleStartProject}
              className="inline-flex items-center justify-center text-xs sm:text-[13px] font-semibold px-6 py-3 bg-[#4169E1] text-white rounded-full hover:bg-[#3158D4] transition-all duration-200 cursor-pointer shrink-0 shadow-lg shadow-[#4169E1]/20 self-start sm:self-auto"
            >
              Start a Project →
            </button>
          </div>

          {meta.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t border-white/10 pt-4 sm:pt-6 mb-6 max-w-3xl">
              {meta.map((item, i) => (
                <div key={i} className="cs-hero-meta-item">
                  <label className="block text-[9px] sm:text-[10px] font-semibold tracking-[0.15em] uppercase text-zinc-500 mb-1">{item.label}</label>
                  <p className="text-xs sm:text-sm font-medium text-[#F2F0EB] leading-snug">{item.value}</p>
                </div>
              ))}
            </div>
          )}

          {hasVideoTabs && (
            <div className="flex flex-wrap gap-2 mb-4">
              {videoTabs.map((tab) => (
                <button
                  key={tab.id ?? tab.label}
                  onClick={() => setActiveVideo(tab.id ?? videoTabs.indexOf(tab))}
                  className={`text-xs sm:text-[13px] font-medium px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${activeVideo === (tab.id ?? videoTabs.indexOf(tab))
                    ? 'bg-[#4169E1] text-white border-[#4169E1]'
                    : 'bg-transparent text-[#888] border-[#333] hover:border-[#666] hover:text-[#ccc]'
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          <div className="w-full relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
            {currentVideoUrl ? (
              <iframe
                src={currentVideoUrl}
                title={title}
                frameBorder="0"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : heroImage ? (
              <img src={heroImage} alt={title} width="1200" height="700" className="w-full h-full object-cover" />
            ) : null}
          </div>
        </div>
      </section>

      {/* OVERVIEW + CHALLENGE */}
      {(overview || challenge) && (
        <section className="px-4 sm:px-8 md:px-12 lg:px-16 py-8 md:py-16 bg-[#0D0D0D] grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-stretch max-w-[1600px] mx-auto">
          {overview && (
            <div className="p-4 sm:p-6 md:p-8 bg-[#111] rounded-xl border border-[#222]">
              <p className="text-xs sm:text-[13px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-2">Overview</p>
              {overviewHeading && (
                <h2 className="text-xl sm:text-3xl md:text-4xl font-medium mb-4 sm:mb-6 tracking-tight leading-tight text-[#F2F0EB]">
                  {overviewHeading}
                </h2>
              )}
              <div className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-zinc-300">
                {overview}
              </div>
            </div>
          )}
          {challenge && (
            <div className="bg-[#111] rounded-xl p-4 sm:p-6 md:p-8 text-[#F2F0EB] border border-[#222]">
              <p className="text-xs sm:text-[13px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-2">The challenge</p>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-medium mb-4 sm:mb-6 tracking-tight leading-tight text-[#F2F0EB]">
                {challengeHeading}
              </h2>
              <div className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-zinc-300 whitespace-pre-line">
                {challenge}
              </div>
            </div>
          )}
        </section>
      )}

      {/* HTML CONTENT (from editor) */}
      {content && (
        <section className="px-4 sm:px-8 md:px-12 lg:px-16 py-4 bg-[#0D0D0D] max-w-[1600px] mx-auto">
          <div
            className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-left w-full text-zinc-300 [&_h1]:text-[#F2F0EB] [&_h2]:text-[#F2F0EB] [&_h2]:text-xl sm:[&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-[#F2F0EB] [&_h3]:text-lg sm:[&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_h4]:text-[#F2F0EB] [&_p]:mb-4 [&_strong]:text-[#F2F0EB] [&_a]:text-[#4169E1] [&_a:hover]:text-[#3158D4] [&_img]:rounded-lg [&_img]:border [&_img]:border-[#1E1E1E] [&_img]:my-6 [&_img]:max-w-full [&_img]:h-auto [&_blockquote]:border-l-4 [&_blockquote]:border-[#4169E1] [&_blockquote]:pl-4 sm:[&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-zinc-400 [&_blockquote]:my-6 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_li]:mb-2"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
      )}

      {/* ADDITIONAL SECTIONS (from SectionBuilder) */}
      {sections.length > 1 && sections.slice(1).map((section, i) => {
        if (!section.content && !section.image && !section.video) return null;
        const hasBoth = section.content && section.image;
        return (
          <section key={i} className={`px-4 sm:px-8 md:px-12 lg:px-16 py-8 md:py-14 ${i % 2 === 0 ? 'bg-[#0D0D0D]' : 'bg-[#111]'}`}>
            <div className={`max-w-[1600px] mx-auto ${hasBoth ? 'grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-center' : ''}`}>
              {section.content && (
                <div className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-zinc-300 whitespace-pre-line">
                  {section.content}
                </div>
              )}
              {section.image && (
                <div className="w-full rounded-xl overflow-hidden border border-[#222] bg-[#0D0D0D]">
                  <img src={section.image} alt={`Section ${i + 2}`} width="800" height="500" className="w-full h-auto object-cover" loading="lazy" />
                </div>
              )}
            </div>
            {section.video && (
              <div className="max-w-[1600px] mx-auto w-full aspect-video rounded-xl overflow-hidden border border-[#222] mt-6">
                <iframe
                  src={`https://www.youtube.com/embed/${section.video}`}
                  title={`Section ${i + 2} video`}
                  frameBorder="0"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            )}
          </section>
        );
      })}

      {/* RESULTS */}
      {results.length > 0 && (
        <section className="bg-[#111] px-4 sm:px-8 md:px-12 lg:px-16 py-8 md:py-16">
          <div className="max-w-[1600px] mx-auto">
            <div className="mb-6 md:mb-10">
              <p className="text-xs sm:text-[14px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-2">Measurable impact</p>
              <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-medium tracking-tight leading-tight text-[#F2F0EB]">
                Results that moved the business
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {results.map((item, i) => (
                <div key={i} className="bg-[#16161a] border border-[#26262e] rounded-xl p-5 sm:p-8 flex flex-col justify-center">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#4169E1] leading-none mb-2">{item.stat}</div>
                  <div className="font-semibold text-[#F2F0EB] text-sm sm:text-base mb-2">{item.label}</div>
                  <div className="text-xs sm:text-sm font-light leading-relaxed text-zinc-400">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROCESS */}
      {process.length > 0 && (
        <section className="px-4 sm:px-8 md:px-12 lg:px-16 py-8 md:py-16 bg-[#0D0D0D]">
          <div className="max-w-[1600px] mx-auto">
            <p className="text-xs sm:text-[14px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-2">How we did it</p>
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-medium mb-6 md:mb-10 tracking-tight leading-tight text-[#F2F0EB]">
              Our process
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {process.map((item, i) => (
                <div key={i} className="bg-[#141417] rounded-xl p-5 sm:p-6 border border-[#232328]">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl sm:text-3xl font-bold text-[#4169E1]">{item.step}</span>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-[#4169E1] bg-[#4169E1]/10 px-2.5 py-0.5 rounded-full uppercase tracking-[0.08em]">{item.phase}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#F2F0EB] mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm font-light leading-relaxed text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY — categorized auto-scroll rows or single image */}
      {galleryCategories.length > 0 ? (
        <section className="bg-[#111] px-4 sm:px-8 md:px-12 lg:px-16 py-8 md:py-16 overflow-hidden">
          <div className="max-w-[1600px] mx-auto">
            <p className="text-xs sm:text-[14px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-2">Visual output</p>
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-medium mb-6 md:mb-10 tracking-tight leading-tight text-[#F2F0EB]">
              Selected renders
            </h2>
            <div className="flex flex-col gap-6 mt-4">
              {galleryCategories.map((cat, ci) => (
                <div key={ci}>
                  <h3 className="text-base sm:text-lg font-semibold text-[#F2F0EB] tracking-tight mb-3">{cat.name}</h3>
                  {cat.images.length > 0 && (
                    <AutoScrollRow>
                      {cat.images.map((src, ii) => (
                        <RenderCard key={ii} src={src} title={cat.name} />
                      ))}
                    </AutoScrollRow>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : gallery.length > 0 && (
        <section className="bg-[#111] px-4 sm:px-8 md:px-12 lg:px-16 py-8 md:py-16 overflow-hidden">
          <div className="max-w-[1600px] mx-auto">
            <p className="text-xs sm:text-[14px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-2">Visual output</p>
            <h2 className="text-2xl sm:text-4xl lg:text-[44px] font-medium mb-6 md:mb-10 tracking-tight leading-tight text-[#F2F0EB]">
              Selected renders
            </h2>
            <div className="w-full rounded-xl overflow-hidden border border-[#222] bg-[#0D0D0D] aspect-video">
              <img src={gallery[0]} alt={`${title} showcase`} width="1280" height="720" className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </section>
      )}

      {/* EXTRA CONTENT (children) */}
      {children && (
        <section className="px-4 sm:px-8 md:px-12 py-6 md:py-12 bg-[#0D0D0D]">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </section>
      )}

      {/* SMALL BANNER */}
      {smallBanner && (
        <section className="px-4 sm:px-8 md:px-12 py-6 md:py-10 bg-[#0D0D0D]">
          <div className="max-w-[1600px] mx-auto w-full rounded-xl overflow-hidden border border-[#222] shadow-2xl">
            <img src={smallBanner} alt={title || "Project banner"} width="1200" height="600" className="w-full h-auto object-contain" />
          </div>
        </section>
      )}

      {/* CTA / BOTTOM NAVIGATION (Desktop: 2 buttons on left, 1 on right) */}
      <footer className="px-4 sm:px-8 md:px-12 lg:px-16 py-6 md:py-10 bg-[#0D0D0D] border-t border-[#1A1A1A]">
        <div className="max-w-[1600px] mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 w-full">
          {/* Left side: 2 buttons (All work + View Project / Start a project) */}
          <div className="flex items-center gap-3 flex-wrap">
            <button
              className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-medium px-4 sm:px-5 py-2.5 border border-[#333] rounded-full hover:border-[#F2F0EB] hover:text-[#F2F0EB] transition-all duration-200 text-zinc-400 bg-transparent cursor-pointer"
              onClick={() => router.push('/')}
            >
              <FaThLarge aria-hidden="true" /> All work
            </button>
            {ctaUrl ? (
              <a
                href={ctaUrl}
                target={ctaUrl.startsWith('http') ? '_blank' : undefined}
                rel={ctaUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-semibold px-5 py-2.5 bg-[#4169E1] text-white rounded-full hover:bg-[#3158D4] transition-all duration-200 no-underline"
              >
                <FaPaperPlane aria-hidden="true" /> {ctaText || 'View Project'}
              </a>
            ) : (
              <button
                className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-semibold px-5 py-2.5 bg-[#4169E1] text-white rounded-full hover:bg-[#3158D4] transition-all duration-200 border-none cursor-pointer"
                onClick={handleStartProject}
              >
                <FaPaperPlane aria-hidden="true" /> Start a project
              </button>
            )}
          </div>

          {/* Right side: 1 button (Next Project) */}
          {nextProject && (
            <div className="flex items-center">
              <button
                className="inline-flex items-center justify-center gap-2 text-xs sm:text-[13px] font-semibold px-6 py-2.5 bg-[#4169E1] text-white rounded-full hover:bg-[#3158D4] transition-all duration-200 border-none cursor-pointer w-full sm:w-auto"
                onClick={() => router.push(nextProject.path)}
              >
                Next Project →
              </button>
            </div>
          )}
        </div>
      </footer>

      <LatestWork />
      <ClientReviews />
      <div id="contact">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default AhmedFoodLayout;
