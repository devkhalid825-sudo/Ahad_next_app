'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        alt={title}
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
  const navigate = useNavigate();
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
      <section className="bg-[#0D0D0D] px-8 pt-[140px] pb-[3rem] relative min-h-screen">
        <Header />

        <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-medium text-[#F2F0EB] leading-[1.1] tracking-tight max-w-[800px] mb-[2rem] pt-[2rem] sm:pt-[3rem]">
          {title}<span className="text-[#4169E1]">.</span>
        </h1>

        {meta.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-1 border-t border-[#222] pt-[1.5rem] max-w-[680px]">
            {meta.map((item, i) => (
              <div key={i} className="cs-hero-meta-item">
                <label className="block text-[10px] font-medium tracking-[0.1em] uppercase text-[#555] mb-[4px]">{item.label}</label>
                <p className="text-[13px] font-medium text-[#F2F0EB] leading-[1.4]">{item.value}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-[8px] mt-[3rem]">
          {hasVideoTabs && videoTabs.map((tab) => (
            <button
              key={tab.id ?? tab.label}
              onClick={() => setActiveVideo(tab.id ?? videoTabs.indexOf(tab))}
              className={`text-[13px] font-medium px-[18px] py-[8px] rounded-full border transition-all duration-200 cursor-pointer ${
                activeVideo === (tab.id ?? videoTabs.indexOf(tab))
                  ? 'bg-[#4169E1] text-white border-[#4169E1]'
                  : 'bg-transparent text-[#888] border-[#333] hover:border-[#666] hover:text-[#ccc]'
              }`}
            >
              {tab.label}
            </button>
          ))}
          <button
            onClick={handleStartProject}
            className="text-[13px] font-semibold px-[20px] py-[8px] bg-[#4169E1] text-white rounded-full border border-[#4169E1] hover:bg-[#3158D4] transition-all duration-200 cursor-pointer ml-auto"
          >
            Start a Project →
          </button>
        </div>

        <div className="w-full mt-[1.5rem] h-[65vh] rounded-lg overflow-hidden border border-[#1E1E1E] shadow-2xl bg-[#111]">
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
            <img src={heroImage} alt={title} className="w-full h-full object-cover" />
          ) : null}
        </div>
      </section>

      {/* OVERVIEW + CHALLENGE */}
      {(overview || challenge) && (
      <section className="px-5 md:px-8 py-[6rem] bg-[#0D0D0D] grid grid-cols-1 lg:grid-cols-2 gap-[3rem] items-stretch">
        <div className="p-[2rem]">
          <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">Overview</p>
          {overviewHeading && (
          <h4 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-10 md:mb-20 tracking-tight leading-[1.1] text-[#F2F0EB]">
            {overviewHeading}
          </h4>
          )}
          <div className="text-base md:text-lg lg:text-xl font-light text-left leading-relaxed text-white/70">
            {overview}
          </div>
        </div>
        {challenge && (
          <div className="bg-[#111] rounded-lg p-[2rem] text-[#F2F0EB] border border-[#1A1A1A]">
            <p className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">The challenge</p>
            <h3 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-10 md:mb-20 tracking-tight leading-[1.1] text-[#F2F0EB]">
              {challengeHeading}
            </h3>
            <div className="text-base md:text-lg lg:text-xl font-light text-left leading-relaxed text-white/70 whitespace-pre-line">
              {challenge}
            </div>
          </div>
        )}
      </section>
      )}

      {/* HTML CONTENT (from editor) */}
      {content && (
        <section className="px-5 md:px-8 py-0 bg-[#0D0D0D]">
          <div
            className="text-base md:text-lg lg:text-xl font-light leading-relaxed text-left w-full text-white/70 [&_h1]:text-[#F2F0EB] [&_h2]:text-[#F2F0EB] [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h2]:mb-4 [&_h3]:text-[#F2F0EB] [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:mt-8 [&_h3]:mb-3 [&_h4]:text-[#F2F0EB] [&_p]:mb-4 [&_strong]:text-[#F2F0EB] [&_a]:text-[#4169E1] [&_a:hover]:text-[#3158D4] [&_img]:rounded-lg [&_img]:border [&_img]:border-[#1E1E1E] [&_img]:my-6 [&_img]:max-w-full [&_img]:h-auto [&_blockquote]:border-l-4 [&_blockquote]:border-[#4169E1] [&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:text-white/60 [&_blockquote]:my-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_li]:mb-2 [&_article]:!ml-0 [&_article]:!mr-0 [&_article]:!max-w-full [&_article]:!w-full [&_article]:!p-[20px]"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
      )}

      {/* ADDITIONAL SECTIONS (from SectionBuilder) */}
      {sections.length > 1 && sections.slice(1).map((section, i) => {
        if (!section.content && !section.image && !section.video) return null;
        const hasBoth = section.content && section.image;
        return (
        <section key={i} className={`px-5 md:px-8 py-[6rem] ${i % 2 === 0 ? 'bg-[#0D0D0D]' : 'bg-[#111]'}`}>
          <div className={`${hasBoth ? 'grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center' : ''}`}>
            {section.content && (
              <div className="text-base md:text-lg lg:text-xl font-light leading-relaxed text-white/70 whitespace-pre-line">
                {section.content}
              </div>
            )}
            {section.image && (
              <div className="w-full rounded-lg overflow-hidden border border-[#1E1E1E] bg-[#0D0D0D]">
                <img src={section.image} alt={`Section ${i + 2}`} className="w-full h-auto object-cover" loading="lazy" />
              </div>
            )}
          </div>
            {section.video && (
              <div className="w-full aspect-video rounded-lg overflow-hidden border border-[#1E1E1E] mt-8">
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
        <section className="bg-[#111] px-5 md:px-8 py-[6rem]">
          <div className="mb-[3rem]">
            <p className="text-[14px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">Measurable impact</p>
            <h4 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-10 md:mb-20 tracking-tight leading-[1.1] text-[#F2F0EB]">
              Results that moved the business
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#1A1A1A] border border-[#1A1A1A] rounded-xl overflow-hidden">
            {results.map((item, i) => (
              <div key={i} className="bg-[#111] p-[2.5rem] flex flex-col justify-center">
                <div className="text-[3.5rem] font-bold text-[#4169E1] leading-[1] mb-[8px]">{item.stat}</div>
                <div className="font-semibold text-[#F2F0EB] mb-[8px]">{item.label}</div>
                <div className="text-base md:text-lg lg:text-xl font-light leading-relaxed text-white/70">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROCESS */}
      {process.length > 0 && (
        <section className="px-5 md:px-8 py-[3rem] md:py-[6rem] bg-[#0D0D0D]">
          <p className="text-[14px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">How we did it</p>
          <h4 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-8 md:mb-16 tracking-tight leading-[1.1] text-[#F2F0EB]">
            Our process
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
            {process.map((item, i) => (
              <div key={i} className="bg-[#1A1A1A] rounded-2xl p-6 md:p-8 border border-[#333]">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl md:text-4xl font-bold text-[#4169E1]">{item.step}</span>
                  <span className="text-[11px] md:text-[12px] font-semibold text-[#4169E1] bg-[#4169E1]/10 px-3 py-1 rounded-full uppercase tracking-[0.08em]">{item.phase}</span>
                </div>
                <h4 className="text-[17px] md:text-[20px] font-semibold text-[#F2F0EB] mb-3">{item.title}</h4>
                <p className="text-sm md:text-[15px] font-light leading-[1.7] text-white/70">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* GALLERY — categorized auto-scroll rows or single image */}
      {galleryCategories.length > 0 ? (
        <section className="bg-[#111] px-[15px] md:px-[40px] py-[6rem] overflow-hidden">
          <p className="text-[14px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">Visual output</p>
          <h4 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-10 md:mb-20 tracking-tight leading-[1.1] text-[#F2F0EB]">
            Selected renders
          </h4>
          <div className="flex flex-col gap-[24px] mt-[2rem]">
            {galleryCategories.map((cat, ci) => (
              <div key={ci}>
                <h4 className="text-[18px] font-semibold text-[#F2F0EB] tracking-tight mb-3">{cat.name}</h4>
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
        </section>
      ) : gallery.length > 0 && (
        <section className="bg-[#111] px-5 md:px-8 py-[6rem] overflow-hidden">
          <p className="text-[14px] font-semibold tracking-[0.12em] uppercase text-[#4169E1] mb-[0.75rem]">Visual output</p>
          <h4 className="text-2xl md:text-4xl lg:text-[44px] font-medium mb-10 md:mb-20 tracking-tight leading-[1.1] text-[#F2F0EB]">
            Selected renders
          </h4>
          <div className="w-full rounded-lg overflow-hidden border border-[#1E1E1E] bg-[#0D0D0D] aspect-[16/9]">
            <img src={gallery[0]} alt={`${title} showcase`} className="w-full h-full object-cover" loading="lazy" />
          </div>
        </section>
      )}

      {/* EXTRA CONTENT (children) */}
      {children && (
        <section className="px-5 md:px-8 py-[4rem] bg-[#0D0D0D]">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </section>
      )}

      {/* SMALL BANNER */}
      {smallBanner && (
        <section className="px-5 md:px-8 py-[3rem] bg-[#0D0D0D]">
          <div className="w-full rounded-lg overflow-hidden border border-[#1E1E1E] shadow-2xl">
            <img src={smallBanner} alt="" className="w-full h-auto object-contain" />
          </div>
        </section>
      )}

      {/* CTA */}
      <footer className="px-8 py-[3rem] bg-[#0D0D0D] flex flex-col sm:flex-row items-center justify-end gap-[1.5rem] border-t border-[#1A1A1A]">
        <div className="flex items-center justify-between flex-wrap gap-[10px] w-full">
          <div className="flex gap-[10px] flex-wrap">
            <button
              className="inline-flex items-center gap-[8px] text-[13px] font-medium px-[20px] py-[10px] border border-[#333] rounded-[6px] hover:border-[#F2F0EB] hover:text-[#F2F0EB] transition-all duration-200 text-[#888] bg-transparent cursor-pointer"
              onClick={() => navigate('/')}
            >
              <FaThLarge aria-hidden="true" /> All work
            </button>
            {ctaUrl ? (
              <a
                href={ctaUrl}
                target={ctaUrl.startsWith('http') ? '_blank' : undefined}
                rel={ctaUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-[8px] text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] hover:bg-[#3158D4] transition-all duration-200 no-underline"
              >
                <FaPaperPlane aria-hidden="true" /> {ctaText || 'View Project'}
              </a>
            ) : (
              <button
                className="inline-flex items-center gap-[8px] text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] hover:bg-[#3158D4] transition-all duration-200 border-none cursor-pointer"
                onClick={handleStartProject}
              >
                <FaPaperPlane aria-hidden="true" /> Start a project
              </button>
            )}
          </div>
          {nextProject && (
            <button
              className="inline-flex items-center gap-[8px] text-[13px] font-semibold px-[20px] py-[10px] bg-[#4169E1] text-white rounded-[6px] hover:bg-[#3158D4] transition-all duration-200 border-none cursor-pointer"
              onClick={() => navigate(nextProject.path)}
            >
              Next Project →
            </button>
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
