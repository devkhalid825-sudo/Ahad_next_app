'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaThLarge, FaPaperPlane, FiX } from '@/components/ui/Icons';
import Header from './layouts/Header';
import LatestWork from './features/LatestWork';
import ClientReviews from './features/ClientReviews';
import Footer from './layouts/Footer';
import Contact from './features/Contact';
import { useTheme } from '@/components/providers/ThemeProvider';
import { BACKEND_ORIGIN, toCdnUrl } from '../utils/api';
import MidArticleCta from '@/components/blog/MidArticleCta';

export const resolveImageUrl = (src) => {
  if (!src || typeof src !== 'string') return src || '';
  if (src.includes('elipsestudio.com/photo-') || src.includes('elipsestudio.com/premium_photo-')) {
    return src.replace(/https?:\/\/elipsestudio\.com\//, 'https://images.unsplash.com/');
  }
  return toCdnUrl(src);
};

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
  subtitle,
  meta = [],
  heroVideo,
  heroImage,
  heroAspectRatio = 'video',
  tickerWords = '',
  overview = '',
  challenge = '',
  overviewHeading = '',
  challengeHeading = 'Key insights',
  storyBlocks = [],
  galleryThumbnails = [],
  galleryStills = [],
  sectionOrder = ['storyBlocks', 'gallery', 'results', 'process', 'content'],
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
  heroIntroText,
  heroStars = 5,
  heroReviewTitle,
  heroReviewSubtitle,
  heroQuoteText,
  heroQuoteAuthor,
  thumbnailsHeading,
  thumbnailsEyebrow,
  stillsHeading,
  stillsEyebrow,
  resultsHeading,
  resultsEyebrow,
  processHeading,
  processEyebrow,
  showMidArticleCta = false,
  midArticleCtaComponent = null,
  hideThemeToggle = false,
}) => {
  const router = useRouter();
  const [activeVideo, setActiveVideo] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [copied, setCopied] = useState(false);
  const themeContext = useTheme();
  const isLight = themeContext?.isLight || false;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleStartProject = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
  };

  const isDirectVideo = (url) => {
    if (!url || typeof url !== 'string') return false;
    return /\.(mp4|webm|mov|m4v)(\?.*)?$/i.test(url) || url.includes('/media/') || url.includes('/uploads/');
  };

  const cleanContent = React.useMemo(() => {
    if (!content || typeof content !== 'string') return '';
    return content
      .replaceAll('max-w-3xl', 'w-full')
      .replaceAll('max-w-4xl', 'w-full')
      .replaceAll('max-w-2xl', 'w-full')
      .replaceAll('max-w-xl', 'w-full')
      .replaceAll('max-w-lg', 'w-full')
      .replaceAll('max-w-5xl', 'w-full')
      .replaceAll('max-w-6xl', 'w-full')
      .replaceAll('max-w-7xl', 'w-full')
      .replaceAll('max-w-[700px]', 'w-full')
      .replaceAll('max-w-[800px]', 'w-full')
      .replaceAll('max-w-[900px]', 'w-full')
      .replaceAll('max-w-[1000px]', 'w-full')
      .replaceAll('max-w-[1200px]', 'w-full')
      .replace(/max-width\s*:\s*\d+px/gi, 'max-width: 100%');
  }, [content]);

  // Merge storyBlocks or fallback to overview + challenge
  const effectiveStoryBlocks = React.useMemo(() => {
    const list = [];
    if (Array.isArray(storyBlocks) && storyBlocks.length > 0) {
      list.push(...storyBlocks);
    } else {
      if (overview && typeof overview === 'string' && overview.trim().length > 0) {
        list.push({
          tag: 'Overview',
          heading: overviewHeading || 'Project Overview',
          text: overview.trim(),
          image: null,
          position: 'left',
        });
      }
      if (challenge && typeof challenge === 'string' && challenge.trim().length > 0) {
        list.push({
          tag: 'The challenge',
          heading: challengeHeading || 'Key Challenges',
          text: challenge.trim(),
          image: null,
          position: 'right',
        });
      }
    }

    // STRICT: Only keep blocks that actually have content (text or image)
    // Never show empty dummy boxes with just headings and no content
    return list.filter((block) => {
      const hasText = Boolean(block && block.text && typeof block.text === 'string' && block.text.trim().length > 0);
      const hasImage = Boolean(block && block.image && typeof block.image === 'string' && block.image.trim().length > 0);
      return hasText || hasImage;
    });
  }, [storyBlocks, overview, challenge, overviewHeading, challengeHeading]);

  // Render Story Blocks (Overview & Challenge)
  const renderStoryBlocks = () => {
    if (!effectiveStoryBlocks || effectiveStoryBlocks.length === 0) return null;
    return (
      <section className={`px-4 sm:px-6 md:px-8 py-10 md:py-20 space-y-16 md:space-y-24 transition-colors duration-300 ${isLight ? 'bg-white text-neutral-900' : 'bg-[#0D0D0D] text-[#F2F0EB]'}`}>
        {effectiveStoryBlocks.map((block, i) => {
          const isLeft = (block.position || (i % 2 === 0 ? 'left' : 'right')) === 'left';
          const hasImage = Boolean(block.image);
          return (
            <div
              key={i}
              className={`w-full ${hasImage
                ? 'grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-14 items-center'
                : `max-w-4xl mx-auto p-6 md:p-10 rounded-2xl border ${isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#111] border-[#222]'}`
                }`}
            >
              {hasImage && (
                <div
                  className={`w-full rounded-2xl overflow-hidden border ${isLight ? 'border-neutral-200 bg-neutral-100' : 'border-white/10 bg-[#1A1A1A]'} shadow-2xl aspect-[16/10] sm:aspect-video relative group ${isLeft ? 'lg:order-1' : 'lg:order-2'
                    }`}
                >
                  <img
                    src={resolveImageUrl(block.image)}
                    alt={block.heading || `Story block ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              )}
              <div
                className={`space-y-4 ${hasImage
                  ? isLeft
                    ? 'lg:order-2'
                    : 'lg:order-1'
                  : ''
                  }`}
              >
                {block.tag && (
                  <span className={`inline-block text-xs sm:text-[13px] font-semibold tracking-[0.14em] uppercase ${isLight ? 'text-[#2563EB]' : 'text-[#4169E1]'}`}>
                    {block.tag}
                  </span>
                )}
                {block.heading && (
                  <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-bold tracking-tight leading-[1.18] ${isLight ? 'text-neutral-900' : 'text-[#F2F0EB]'}`}>
                    {block.heading}
                  </h2>
                )}
                {block.text && (
                  <div className={`text-sm sm:text-base md:text-lg font-light leading-relaxed whitespace-pre-line ${isLight ? 'text-zinc-600' : 'text-zinc-300'}`}>
                    {block.text}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </section>
    );
  };


  const renderThumbnails = () => {
    const hasThumbnails = galleryThumbnails && galleryThumbnails.length > 0;
    if (!hasThumbnails) return null;

    const total = galleryThumbnails.length;
    const fullGridCount = total >= 3 ? Math.floor(total / 3) * 3 : 0;
    const gridItems = fullGridCount > 0 ? galleryThumbnails.slice(0, fullGridCount) : [];
    const remainingItems = fullGridCount > 0 ? galleryThumbnails.slice(fullGridCount) : galleryThumbnails;

    const renderThumbnailCard = (rawSrc, index) => {
      const src = resolveImageUrl(rawSrc);
      return (
        <div
          key={index}
          onClick={() => setLightboxImg(src)}
          className={`group relative aspect-[16/9] w-full rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer shadow-lg shrink-0 ${
            isLight ? 'border-neutral-200 bg-white hover:border-[#2563EB]' : 'border-zinc-800 bg-[#0D0D0D] hover:border-[#4169E1]/60'
          }`}
        >
          <img
            src={src}
            alt={`Thumbnail render ${index + 1}`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      );
    };

    return (
      <section className={`px-4 sm:px-6 md:px-8 py-10 md:py-20 border-t border-b overflow-hidden transition-colors duration-300 ${isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#111] border-white/5'}`}>
        <div className="w-full">
          <p className={`text-xs sm:text-[14px] font-semibold tracking-[0.12em] uppercase mb-2 ${isLight ? 'text-[#2563EB]' : 'text-[#4169E1]'}`}>
            {thumbnailsEyebrow || 'Visual output'}
          </p>
          <h2 className={`text-2xl sm:text-4xl lg:text-[44px] font-medium mb-8 md:mb-12 tracking-tight leading-tight ${isLight ? 'text-neutral-900' : 'text-[#F2F0EB]'}`}>
            {thumbnailsHeading || 'Thumbnails (16:9)'}
          </h2>

          {gridItems.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 w-full">
              {gridItems.map((rawSrc, i) => renderThumbnailCard(rawSrc, i))}
            </div>
          )}

          {remainingItems.length > 0 && (
            <div className={`flex flex-wrap justify-center items-center gap-4 md:gap-6 w-full ${gridItems.length > 0 ? 'mt-4 md:mt-6' : ''}`}>
              {remainingItems.map((rawSrc, i) => {
                const globalIndex = gridItems.length + i;
                const widthClass = remainingItems.length === 1 && total === 1
                  ? 'w-full max-w-2xl'
                  : 'w-full sm:w-[calc(50%-12px)] md:w-[calc((100%-2*24px)/3)]';
                return (
                  <div key={globalIndex} className={widthClass}>
                    {renderThumbnailCard(rawSrc, globalIndex)}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    );
  };

  // Render Still Images (Top row 4 full width with no side gaps, remaining 3 centered with equal space)
  const renderStills = () => {
    const hasStills = galleryStills && galleryStills.length > 0;
    if (!hasStills) return null;

    const total = galleryStills.length;
    const fullGridCount = total >= 4 ? Math.floor(total / 4) * 4 : 0;
    const gridItems = fullGridCount > 0 ? galleryStills.slice(0, fullGridCount) : [];
    const remainingItems = fullGridCount > 0 ? galleryStills.slice(fullGridCount) : galleryStills;

    const renderStillCard = (rawSrc, index) => {
      const src = resolveImageUrl(rawSrc);
      return (
        <div
          key={index}
          onClick={() => setLightboxImg(src)}
          className={`group relative aspect-[4/5] w-full rounded-xl overflow-hidden border transition-all duration-300 cursor-pointer shadow-lg shrink-0 ${
            isLight ? 'border-neutral-200 bg-white hover:border-[#2563EB]' : 'border-white/10 bg-[#111] hover:border-[#4169E1]/60'
          }`}
        >
          <img
            src={src}
            alt={`Still render ${index + 1}`}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      );
    };

    return (
      <section className={`px-4 sm:px-6 md:px-8 py-10 md:py-20 border-t border-b overflow-hidden transition-colors duration-300 ${isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#111] border-white/5'}`}>
        <div className="w-full">
          <p className={`text-xs sm:text-[14px] font-semibold tracking-[0.12em] uppercase mb-2 ${isLight ? 'text-[#2563EB]' : 'text-[#4169E1]'}`}>
            {stillsEyebrow || 'Visual output'}
          </p>
          <h2 className={`text-2xl sm:text-4xl lg:text-[44px] font-medium mb-8 md:mb-12 tracking-tight leading-tight ${isLight ? 'text-neutral-900' : 'text-[#F2F0EB]'}`}>
            {stillsHeading || 'Still Images'}
          </h2>

          {/* Top full row of 4 (spans 100% full width, edge-to-edge, NO space on left or right) */}
          {gridItems.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-5 w-full">
              {gridItems.map((rawSrc, i) => renderStillCard(rawSrc, i))}
            </div>
          )}

          {/* Bottom remaining row of 3 (centered with equal space on left and right) */}
          {remainingItems.length > 0 && (
            <div className={`flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-5 w-full ${gridItems.length > 0 ? 'mt-3 sm:mt-4 md:mt-5' : ''}`}>
              {remainingItems.map((rawSrc, i) => {
                const globalIndex = gridItems.length + i;
                const widthClass = remainingItems.length === 1 && total === 1
                  ? 'w-full max-w-[340px]'
                  : 'w-[calc(50%-6px)] sm:w-[calc(50%-8px)] md:w-[calc((100%-3*20px)/4)]';
                return (
                  <div key={globalIndex} className={widthClass}>
                    {renderStillCard(rawSrc, globalIndex)}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    );
  };

  // Combined / Legacy Gallery (fallback when sectionOrder contains 'gallery')
  const renderGallery = () => {
    const hasOtherCats = galleryCategories && galleryCategories.length > 0;
    const hasLegacyGallery = gallery && gallery.length > 0;
    const currentOrder = sectionOrder || [];
    const rendersIndependently = currentOrder.includes('thumbnails') || currentOrder.includes('stills');

    return (
      <>
        {!rendersIndependently && (
          <>
            {renderThumbnails()}
            {renderStills()}
          </>
        )}
        {hasOtherCats && (
          <section className="bg-[#111] px-4 sm:px-6 md:px-8 py-10 md:py-20 border-t border-b border-white/5 overflow-hidden">
            <div className="w-full flex flex-col gap-6">
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
          </section>
        )}
        {!rendersIndependently && !hasOtherCats && hasLegacyGallery && (
          <div className="w-full rounded-xl overflow-hidden border border-[#222] bg-[#0D0D0D] flex items-center justify-center">
            <img src={gallery[0]} alt={`${title} showcase`} width="1920" height="1080" className="w-full h-auto max-h-[85vh] object-contain" loading="lazy" />
          </div>
        )}
      </>
    );
  };

  // Render Results (Measurable Impact)
  const renderResults = () => {
    const validResults = (results || []).filter(item => (item?.stat && String(item.stat).trim().length > 0) || (item?.label && String(item.label).trim().length > 0));
    if (validResults.length === 0) return null;
    return (
      <section className={`px-4 sm:px-6 md:px-8 py-10 md:py-20 border-t border-b overflow-hidden transition-colors duration-300 ${isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#111] border-white/5'}`}>
        <div className="w-full">
          <div className="mb-8 md:mb-12">
            <p className={`text-xs sm:text-[14px] font-semibold tracking-[0.12em] uppercase mb-2 ${isLight ? 'text-[#2563EB]' : 'text-[#4169E1]'}`}>
              {resultsEyebrow || 'Measurable impact'}
            </p>
            <h2 className={`text-2xl sm:text-4xl lg:text-[44px] font-medium tracking-tight leading-tight ${isLight ? 'text-neutral-900' : 'text-[#F2F0EB]'}`}>
              {resultsHeading || 'Results that moved the business'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {validResults.map((item, i) => (
              <div key={i} className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-center shadow-lg transition-all duration-300 hover:-translate-y-1 border ${isLight ? 'bg-white border-neutral-200' : 'bg-[#1A1A1A] border-white/10'}`}>
                <div className={`text-3xl sm:text-4xl md:text-5xl font-bold leading-none mb-2 ${isLight ? 'text-[#2563EB]' : 'text-[#4169E1]'}`}>{item.stat}</div>
                <div className={`font-semibold text-sm sm:text-base mb-2 ${isLight ? 'text-neutral-900' : 'text-[#F2F0EB]'}`}>{item.label}</div>
                <div className={`text-xs sm:text-sm font-light leading-relaxed ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Render Process Steps (How We Did It)
  const renderProcess = () => {
    const validProcess = (process || []).filter(item => (item?.title && String(item.title).trim().length > 0) || (item?.phase && String(item.phase).trim().length > 0) || (item?.desc && String(item.desc).trim().length > 0));
    if (validProcess.length === 0) return null;
    return (
      <section className={`px-4 sm:px-6 md:px-8 py-10 md:py-20 border-t transition-colors duration-300 ${isLight ? 'bg-white border-neutral-200' : 'bg-[#0D0D0D] border-white/5'}`}>
        <div className="w-full">
          <p className={`text-xs sm:text-[14px] font-semibold tracking-[0.12em] uppercase mb-2 ${isLight ? 'text-[#2563EB]' : 'text-[#4169E1]'}`}>
            {processEyebrow || 'How we did it'}
          </p>
          <h2 className={`text-2xl sm:text-4xl lg:text-[44px] font-medium mb-8 md:mb-12 tracking-tight leading-tight ${isLight ? 'text-neutral-900' : 'text-[#F2F0EB]'}`}>
            {processHeading || 'Our process'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {validProcess.map((item, i) => (
              <div key={i} className={`rounded-2xl p-6 border shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col ${isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#1A1A1A] border-white/10'}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className={`text-2xl sm:text-3xl font-bold ${isLight ? 'text-[#2563EB]' : 'text-[#4169E1]'}`}>{item.step}</span>
                  {item.phase && (
                    <span className={`text-[10px] sm:text-[11px] font-semibold px-2.5 py-0.5 rounded-full uppercase tracking-[0.08em] ${isLight ? 'text-[#2563EB] bg-[#2563EB]/10' : 'text-[#4169E1] bg-[#4169E1]/10'}`}>{item.phase}</span>
                  )}
                </div>
                <h3 className={`text-base sm:text-lg font-semibold mb-2 ${isLight ? 'text-neutral-900' : 'text-[#F2F0EB]'}`}>{item.title}</h3>
                <p className={`text-xs sm:text-sm font-light leading-relaxed flex-grow ${isLight ? 'text-zinc-600' : 'text-zinc-400'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  // Helper to split HTML after the 3rd or 4th H2 section
  const splitContentForMidCta = (html) => {
    if (!html || typeof html !== 'string') return { part1: html, part2: '' };
    const h2Regex = /<h2[\s>]/gi;
    let match;
    const indices = [];
    while ((match = h2Regex.exec(html)) !== null) {
      indices.push(match.index);
    }
    // Target: after 3rd or 4th H2 section (i.e. before 4th or 5th H2)
    let targetIndex = -1;
    if (indices.length >= 4) {
      targetIndex = indices[3]; // Before 4th H2 = after 3rd H2 section
    } else if (indices.length === 3) {
      targetIndex = indices[2]; // Before 3rd H2 = after 2nd H2 section
    } else if (indices.length === 2) {
      targetIndex = indices[1];
    }
    if (targetIndex !== -1) {
      return {
        part1: html.slice(0, targetIndex),
        part2: html.slice(targetIndex),
      };
    }
    return { part1: html, part2: '' };
  };

  // Render HTML Editor Content
  const renderCleanContent = () => {
    if (!cleanContent) return null;
    const contentClasses = `text-sm sm:text-base md:text-lg font-light leading-relaxed text-left w-full ${isLight ? 'text-zinc-700' : 'text-zinc-300'} [&_*]:!max-w-none [&_div]:!max-w-none [&_section]:!max-w-none [&_p]:!max-w-none [&_div]:!w-full [&_section]:!w-full [&_h1]:text-current [&_h2]:text-current [&_h2]:text-xl sm:[&_h2]:text-2xl md:[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:mt-8 [&_h2]:mb-4 [&_h3]:text-current [&_h3]:text-lg sm:[&_h3]:text-xl md:[&_h3]:text-2xl [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_h4]:text-current [&_p]:mb-4 [&_strong]:text-current [&_a]:text-[#2563EB] dark:[&_a]:text-[#4169E1] [&_img]:rounded-xl [&_img]:my-6 [&_img]:max-w-full [&_img]:h-auto [&_blockquote]:border-l-4 [&_blockquote]:border-[#2563EB] dark:[&_blockquote]:border-[#4169E1] [&_blockquote]:pl-4 sm:[&_blockquote]:pl-6 [&_blockquote]:italic [&_blockquote]:my-6 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-4 [&_li]:mb-2`;

    if (showMidArticleCta) {
      const { part1, part2 } = splitContentForMidCta(cleanContent);
      if (part2) {
        return (
          <section className={`px-4 sm:px-6 md:px-8 py-8 md:py-14 transition-colors duration-300 ${isLight ? 'bg-white' : 'bg-[#0D0D0D]'}`}>
            <div
              className={contentClasses}
              dangerouslySetInnerHTML={{ __html: part1 }}
            />
            <div className="my-8 md:my-12">
              {midArticleCtaComponent || <MidArticleCta />}
            </div>
            <div
              className={contentClasses}
              dangerouslySetInnerHTML={{ __html: part2 }}
            />
          </section>
        );
      }
    }

    return (
      <section className={`px-4 sm:px-6 md:px-8 py-8 md:py-14 transition-colors duration-300 ${isLight ? 'bg-white' : 'bg-[#0D0D0D]'}`}>
        <div
          className={contentClasses}
          dangerouslySetInnerHTML={{ __html: cleanContent }}
        />
        {showMidArticleCta && (
          <div className="mt-8 md:mt-12">
            {midArticleCtaComponent || <MidArticleCta />}
          </div>
        )}
      </section>
    );
  };

  const effectiveVideoTabs = React.useMemo(() => {
    // Only accept tabs that actually have a valid, non-empty URL
    const list = Array.isArray(videoTabs)
      ? videoTabs.filter((t) => t && typeof t.url === 'string' && t.url.trim().length > 0)
      : [];

    if (heroVideo && typeof heroVideo === 'string' && heroVideo.trim()) {
      const cleanHero = heroVideo.trim();
      const existingIdx = list.findIndex(
        (t) => t.url && (t.url.trim() === cleanHero || cleanHero.includes(t.url.trim()) || t.url.trim().includes(cleanHero))
      );

      if (existingIdx === -1) {
        const defaultLabel = title
          ? (title.split(/[-:—]/)[0].trim() || 'Main Video')
          : 'Main Video';
        return [
          { label: defaultLabel, url: cleanHero, aspectRatio: heroAspectRatio || 'video' },
          ...list,
        ];
      } else if (existingIdx > 0) {
        const heroTab = list[existingIdx];
        const rest = list.filter((_, idx) => idx !== existingIdx);
        return [heroTab, ...rest];
      }
    }

    return list;
  }, [videoTabs, heroVideo, heroAspectRatio, title]);

  const hasVideoTabs = effectiveVideoTabs.length > 1;
  const activeTabObj = effectiveVideoTabs.length > 0 ? (effectiveVideoTabs[activeVideo] || effectiveVideoTabs[0]) : null;
  const currentVideoUrl = activeTabObj?.url || heroVideo;
  const currentAspectRatio = activeTabObj?.aspectRatio || heroAspectRatio || 'video';

  // Only display ticker words when explicitly provided by the user
  const effectiveTickerWords = React.useMemo(() => {
    if (Array.isArray(tickerWords) && tickerWords.length > 0) return tickerWords.filter(Boolean);
    if (typeof tickerWords === 'string' && tickerWords.trim()) {
      return tickerWords.split(/[,•|✦\n]+/).map((s) => s.trim()).filter(Boolean);
    }
    return [];
  }, [tickerWords]);

  // Ensure enough items in each marquee track so it easily spans beyond any 4K/ultrawide screen (>= 32 items)
  const marqueeItems = React.useMemo(() => {
    if (!effectiveTickerWords.length) return [];
    let items = [...effectiveTickerWords];
    while (items.length < 32) {
      items = [...items, ...effectiveTickerWords];
    }
    return items;
  }, [effectiveTickerWords]);

  const titleFontSizeStyle = React.useMemo(() => {
    const len = Math.max((title || '').trim().length, 1);
    const calculatedVw = Math.min(6, Math.max(1.8, +(84 / (len * 0.58)).toFixed(2)));
    const minRem = Math.min(1.5, Math.max(0.75, +(calculatedVw * 0.28).toFixed(2)));
    const maxRem = Math.min(3.5, Math.max(1.5, +(calculatedVw * 0.65).toFixed(2)));
    return {
      fontSize: `clamp(${minRem}rem, ${calculatedVw}vw, ${maxRem}rem)`,
    };
  }, [title]);

  const renderStyledTitle = (rawTitle) => {
    if (!rawTitle) return '';
    const accentClass = isLight ? 'text-[#2563EB]' : 'text-[#4169E1]';
    const parts = rawTitle.split(/[:—–-]/);
    if (parts.length > 1) {
      return (
        <>
          <span>{parts[0].trim()}</span>{' '}
          <span className={accentClass}>{parts.slice(1).join(' ').trim()}</span>
        </>
      );
    }
    const words = rawTitle.split(' ');
    if (words.length >= 3) {
      const midStart = 1;
      const midEnd = Math.min(words.length - 1, 3);
      return (
        <>
          {words.slice(0, midStart).join(' ')}{' '}
          <span className={accentClass}>{words.slice(midStart, midEnd + 1).join(' ')}</span>{' '}
          {words.slice(midEnd + 1).join(' ')}
        </>
      );
    }
    return (
      <>
        {rawTitle}
        <span className={accentClass}>.</span>
      </>
    );
  };

  // Only display side cards if their text content has been explicitly entered by the user
  const hasLeftColumn = Boolean(heroIntroText && typeof heroIntroText === 'string' && heroIntroText.trim().length > 0);
  const hasRightColumn = Boolean(heroQuoteText && typeof heroQuoteText === 'string' && heroQuoteText.trim().length > 0);
  const leftColumnText = heroIntroText?.trim() || '';
  const rightColTitle = heroReviewTitle?.trim() || (title ? title.split(/[-:—]/)[0].trim() : 'REVIEW');
  const rightColSubtitle = heroReviewSubtitle?.trim() || meta?.find((m) => m.label?.toLowerCase() === 'client' || m.label?.toLowerCase() === 'year' || m.label?.toLowerCase() === 'deliverables')?.value || '';
  const quoteText = heroQuoteText?.trim() || '';
  const quoteAuthor = heroQuoteAuthor?.trim() || meta?.find((m) => m.label?.toLowerCase() === 'client')?.value || 'Elipse Studio';
  const starsCount = Math.min(5, Math.max(1, Number(heroStars || 5)));

  return (
    <div className={`w-full overflow-x-hidden transition-colors duration-300 ${isLight ? 'bg-white text-neutral-900 selection:bg-[#2563EB]/30' : 'bg-[#0D0D0D] text-[#F2F0EB] selection:bg-[#4169E1]/30'} ${hideThemeToggle ? 'hardcoded-article' : ''}`}>

      {/* HERO SECTION — LEAP 2026 STYLE 3-COLUMN */}
      <section className={`relative min-h-screen flex flex-col justify-between px-2.5 sm:px-6 md:px-10 lg:px-14 pt-[75px] sm:pt-[90px] md:pt-[100px] pb-4 sm:pb-6 overflow-hidden transition-colors duration-300 ${isLight ? 'bg-white text-neutral-900' : 'bg-[#0D0D0D] text-[#F2F0EB]'}`}>
        <Header hideThemeToggle={hideThemeToggle} />

        {/* Decorative ✦ top-left (positioned below Header) */}
        <div className={`hidden lg:block absolute top-[95px] sm:top-[110px] lg:top-[125px] left-8 sm:left-12 lg:left-16 ${isLight ? 'text-[#2563EB]' : 'text-[#4169E1]'} text-3xl font-bold select-none pointer-events-none z-10`} aria-hidden="true">
          ✦
        </div>
        {/* Decorative arrow top-right (positioned below Header) */}
        <div className={`hidden lg:block absolute top-[95px] sm:top-[110px] lg:top-[125px] right-8 sm:right-12 lg:right-16 ${isLight ? 'text-[#2563EB]' : 'text-[#4169E1]'} text-lg font-bold select-none pointer-events-none opacity-70 z-10`} aria-hidden="true">
          <svg width="36" height="24" viewBox="0 0 60 40" fill="none">
            <path d="M4 20 Q20 4 40 16 Q52 22 54 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M48 6 L54 10 L50 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </svg>
        </div>

        <div className="max-w-[1600px] mx-auto flex flex-col items-center text-center w-full px-0 sm:px-6 my-auto">

          {/* ── Main Center Headline ── */}
          <h1
            style={titleFontSizeStyle}
            className={`font-bold tracking-tight w-full max-w-full whitespace-nowrap text-center leading-tight mb-2 sm:mb-3 px-1 sm:px-4 ${isLight ? 'text-neutral-900' : 'text-white'}`}
          >
            {renderStyledTitle(title)}
          </h1>

          {/* Subtitle / Subheading */}
          {subtitle && (
            <p className={`text-xs sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-3 sm:mb-5 px-2 ${isLight ? 'text-neutral-600' : 'text-zinc-400'}`}>
              {subtitle}
            </p>
          )}

          {/* Video Tabs Switcher Buttons (Positioned directly below subtitle) */}
          {hasVideoTabs && effectiveVideoTabs.length > 1 && (
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-4 sm:mb-6 z-20">
              {effectiveVideoTabs.map((tab, idx) => (
                <button
                  key={tab.id ?? tab.label ?? idx}
                  type="button"
                  onClick={() => setActiveVideo(idx)}
                  className={`text-xs font-semibold px-4 py-2 sm:px-5 sm:py-2.5 rounded-full border transition-all duration-200 cursor-pointer ${activeVideo === idx
                    ? (isLight ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-lg shadow-[#2563EB]/25' : 'bg-[#4169E1] text-white border-[#4169E1] shadow-lg shadow-[#4169E1]/25')
                    : (isLight ? 'bg-white text-zinc-700 border-zinc-200 hover:border-zinc-400 hover:text-black' : 'bg-[#141414] text-zinc-400 border-zinc-800 hover:border-zinc-600 hover:text-white')
                    }`}
                >
                  {tab.label || `Tab ${idx + 1}`}
                </button>
              ))}
            </div>
          )}

          {/* ── Hero Content: Optional Left Column | Center Media | Optional Right Column ── */}
          <div className={`w-full items-center relative mt-2 sm:mt-4 mb-4 sm:mb-6 ${hasLeftColumn && hasRightColumn
            ? 'grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 xl:gap-8'
            : hasLeftColumn || hasRightColumn
              ? 'grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 xl:gap-8'
              : 'flex flex-col items-center justify-center max-w-[1040px] xl:max-w-[1150px] mx-auto'
            }`}>

            {/* Left Column: Only rendered if explicitly provided */}
            {hasLeftColumn && (
              <div className={`hidden lg:flex ${hasRightColumn ? 'lg:col-span-2' : 'lg:col-span-3'} text-center lg:text-left space-y-3 px-1 sm:px-0 w-full min-w-0 flex-col items-center lg:items-start`}>
                <div className={`w-9 h-9 rounded-full ${isLight ? 'bg-blue-50 border-blue-100 text-[#2563EB]' : 'bg-blue-950/40 border-blue-900/50 text-[#4169E1]'} border flex items-center justify-center text-lg shadow-sm mx-auto lg:mx-0`}>
                  💡
                </div>
                <p className={`text-xs sm:text-[13px] xl:text-sm leading-relaxed ${isLight ? 'text-neutral-600' : 'text-zinc-400'}`}>
                  {leftColumnText}
                </p>
                {ctaUrl ? (
                  <a
                    href={ctaUrl}
                    className={`w-full sm:w-auto px-5 py-2 rounded-full border text-xs font-semibold transition-all shadow-sm cursor-pointer text-center inline-block ${isLight ? 'border-neutral-300 text-neutral-800 hover:bg-neutral-100 hover:border-neutral-900' : 'border-zinc-800 text-zinc-300 hover:bg-white/10 hover:border-white'}`}
                  >
                    {ctaText || 'Explore Insights'}
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={handleStartProject}
                    className={`w-full sm:w-auto px-5 py-2 rounded-full border text-xs font-semibold transition-all shadow-sm cursor-pointer text-center ${isLight ? 'border-neutral-300 text-neutral-800 hover:bg-neutral-100 hover:border-neutral-900' : 'border-zinc-800 text-zinc-300 hover:bg-white/10 hover:border-white'}`}
                  >
                    {ctaText || 'Explore Insights'}
                  </button>
                )}
              </div>
            )}

            {/* Center Column: Media Player Container */}
            <div className={`${hasLeftColumn && hasRightColumn
              ? 'lg:col-span-8'
              : hasLeftColumn || hasRightColumn
                ? 'lg:col-span-9'
                : 'w-full'
              } relative flex flex-col items-center justify-center px-0 sm:px-0 w-full`}>
              {/* Circular backdrop glow */}
              <div className={`absolute w-80 h-80 sm:w-[34rem] sm:h-[34rem] lg:w-[44rem] lg:h-[44rem] ${isLight ? 'bg-neutral-100 border-neutral-200/60' : 'bg-white/[0.03] border-white/5'} rounded-full -z-10 border flex items-center justify-center pointer-events-none`}>
                <span className="absolute bottom-6 text-neutral-400 text-2xl select-none">⚡</span>
              </div>

              {/* Media Card Container (Enlarged for prominent video presentation) */}
              <div className={`relative rounded-2xl overflow-hidden shadow-2xl border-2 sm:border-4 ${isLight ? 'border-white bg-zinc-950' : 'border-zinc-800 bg-black'} z-10 transition-all duration-300 w-full ${currentAspectRatio === 'reel'
                ? 'w-64 h-[22rem] sm:w-[24rem] sm:h-[30rem] lg:w-[26rem] lg:h-[34rem] aspect-[9/16]'
                : currentAspectRatio === 'square'
                  ? 'w-full max-w-[880px] xl:max-w-[980px] h-[260px] xs:h-[295px] sm:h-auto sm:aspect-[16/10] max-h-[480px] sm:max-h-[520px]'
                  : 'w-full max-w-[1040px] xl:max-w-[1150px] h-[260px] xs:h-[295px] sm:h-auto sm:aspect-video'
                }`}>
                {currentVideoUrl ? (
                  isDirectVideo(currentVideoUrl) ? (
                    <video
                      key={currentVideoUrl}
                      src={currentVideoUrl}
                      controls
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <iframe
                      key={currentVideoUrl}
                      src={currentVideoUrl}
                      title={title}
                      frameBorder="0"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  )
                ) : heroImage ? (
                  <img
                    src={heroImage}
                    alt={title}
                    width="1920"
                    height="1080"
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>

              {/* ── Featured CTA Button: Centered directly below the Hero Media ── */}
              {(ctaUrl || (ctaText && ctaText.trim().length > 0)) && (
                <div className="w-full flex items-center justify-center mt-4 sm:mt-5 z-20">
                  {ctaUrl ? (
                    <a
                      href={ctaUrl}
                      target={ctaUrl.startsWith('http') ? '_blank' : undefined}
                      rel={ctaUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`group inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm !text-white transition-all duration-300 no-underline shadow-lg active:scale-95 ${
                        isLight
                          ? 'bg-[#2563EB] hover:bg-[#1D4ED8] shadow-[0_4px_16px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.5)] border border-blue-600/20'
                          : 'bg-gradient-to-r from-[#2563EB] to-[#4169E1] hover:from-[#1D4ED8] hover:to-[#3158D4] shadow-[0_0_20px_rgba(65,105,225,0.6)] hover:shadow-[0_0_30px_rgba(65,105,225,0.9)] border border-blue-400/40'
                      }`}
                    >
                      <FaPaperPlane className="text-[11px] sm:text-xs !text-white fill-white transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" aria-hidden="true" />
                      <span className="!text-white font-bold tracking-wider leading-none">{ctaText || 'View Project'}</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={handleStartProject}
                      className={`group inline-flex items-center gap-2 px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-bold uppercase tracking-wider text-xs sm:text-sm !text-white transition-all duration-300 border-none cursor-pointer shadow-lg active:scale-95 ${
                        isLight
                          ? 'bg-[#2563EB] hover:bg-[#1D4ED8] shadow-[0_4px_16px_rgba(37,99,235,0.35)] hover:shadow-[0_6px_22px_rgba(37,99,235,0.5)] border border-blue-600/20'
                          : 'bg-gradient-to-r from-[#2563EB] to-[#4169E1] hover:from-[#1D4ED8] hover:to-[#3158D4] shadow-[0_0_20px_rgba(65,105,225,0.6)] hover:shadow-[0_0_30px_rgba(65,105,225,0.9)] border border-blue-400/40'
                      }`}
                    >
                      <FaPaperPlane className="text-[11px] sm:text-xs !text-white fill-white transition-transform duration-200 group-hover:translate-x-0.5 shrink-0" aria-hidden="true" />
                      <span className="!text-white font-bold tracking-wider leading-none">{ctaText || 'View Project'}</span>
                    </button>
                  )}
                </div>
              )}

              {/* ── Fixed Editorial Pill Bar (Single-row sleek capsule on all devices) ── */}
              <div className="w-full overflow-x-auto no-scrollbar py-1 px-2.5 mt-3 sm:mt-4 flex items-center justify-start sm:justify-center">
                <div className={`mx-auto inline-flex flex-nowrap items-center justify-center gap-2 sm:gap-3.5 px-3.5 xs:px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-[11px] xs:text-xs sm:text-[13px] font-medium z-20 transition-all duration-300 shrink-0 whitespace-nowrap shadow-md ${isLight
                  ? 'bg-white text-neutral-800 border border-neutral-300'
                  : 'bg-neutral-900 text-white border border-neutral-800 shadow-xl'
                  }`}>
                  <a
                    href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting?month=2026-09"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`font-semibold transition-colors whitespace-nowrap shrink-0 ${isLight ? 'text-[#00a86b] hover:text-[#008f5a]' : 'text-emerald-400 hover:text-emerald-300'
                      }`}
                  >
                    Book a <span className="hidden md:inline">technical </span>scoping call ↗
                  </a>
                  <span className={`h-3.5 w-px shrink-0 ${isLight ? 'bg-neutral-300' : 'bg-neutral-700'}`} aria-hidden="true" />
                  <span className={`whitespace-nowrap shrink-0 ${isLight ? 'text-neutral-700' : 'text-neutral-300'}`}>
                    By Elipse Studio<span className="hidden md:inline"> Editorial Team</span>
                  </span>
                  <span className={`h-3.5 w-px shrink-0 ${isLight ? 'bg-neutral-300' : 'bg-neutral-700'}`} aria-hidden="true" />
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className={`font-semibold transition-colors flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${isLight ? 'text-[#2563EB] hover:text-[#1d4ed8]' : 'text-blue-400 hover:text-blue-300'
                      }`}
                  >
                    {copied ? (
                      <svg className="w-3.5 h-3.5 text-emerald-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                    )}
                    <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Only rendered if explicitly provided */}
            {hasRightColumn && (
              <div className={`hidden lg:flex ${hasLeftColumn ? 'lg:col-span-2' : 'lg:col-span-3'} text-center lg:text-left flex-col items-center lg:items-start justify-center space-y-2 lg:pl-1 px-1 sm:px-0 w-full`}>
                <div className={`flex gap-1 ${isLight ? 'text-[#2563EB]' : 'text-[#4169E1]'} justify-center lg:justify-start text-sm sm:text-base`}>
                  {[...Array(starsCount)].map((_, i) => <span key={i}>★</span>)}
                </div>
                <div className={`text-xl sm:text-2xl font-extrabold tracking-tight leading-none ${isLight ? 'text-neutral-900' : 'text-white'}`}>
                  {rightColTitle}
                </div>
                {rightColSubtitle && (
                  <p className="text-[11px] sm:text-xs text-neutral-500 uppercase tracking-wider font-semibold">
                    {rightColSubtitle}
                  </p>
                )}
                <div className={`mt-2 ${isLight ? 'bg-blue-50 border-blue-100 text-zinc-700' : 'bg-[#141414] border-zinc-800 text-zinc-300'} border p-3.5 rounded-2xl text-center lg:text-left w-full shadow-sm`}>
                  <p className="text-[11px] sm:text-[12px] font-medium leading-snug">
                    &ldquo;{quoteText}&rdquo;
                  </p>
                  {quoteAuthor && (
                    <p className={`text-[10px] sm:text-[11px] font-bold ${isLight ? 'text-[#2563EB]' : 'text-[#4169E1]'} mt-1`}>— {quoteAuthor}</p>
                  )}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* MARQUEE WORDS TICKER SLIDER (Continuous Infinite Seamless Loop - Classic Solid Black Bar) */}
        {effectiveTickerWords.length > 0 && (
          <div
            className="overflow-hidden border-y border-neutral-800/80 py-4 sm:py-5 bg-black text-white mt-10 sm:mt-14 -mx-4 sm:-mx-6 md:-mx-10 lg:-mx-14 pointer-events-none select-none transition-colors duration-300"
          >
            <div className="flex w-max">
              {/* Track 1 */}
              <div
                className="flex shrink-0 items-center space-x-12 animate-marquee-loop pr-12 text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white whitespace-nowrap"
              >
                {marqueeItems.map((word, i) => (
                  <span key={`t1-${i}`} className="inline-flex items-center gap-6 sm:gap-8">
                    <span className="text-[#4169E1]">✦</span>
                    <span className="tracking-wider uppercase font-sans text-white">{word}</span>
                  </span>
                ))}
              </div>
              {/* Track 2 (Identical mirror for seamless infinite continuous loop) */}
              <div
                className="flex shrink-0 items-center space-x-12 animate-marquee-loop pr-12 text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white whitespace-nowrap"
                aria-hidden="true"
              >
                {marqueeItems.map((word, i) => (
                  <span key={`t2-${i}`} className="inline-flex items-center gap-6 sm:gap-8">
                    <span className="text-[#4169E1]">✦</span>
                    <span className="tracking-wider uppercase font-sans text-white">{word}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* DISPATCH SECTIONS ACCORDING TO USER-DEFINED SECTION ORDER */}
      {(sectionOrder || ['storyBlocks', 'thumbnails', 'stills', 'results', 'process', 'content']).map((secKey) => (
        <React.Fragment key={secKey}>
          {secKey === 'storyBlocks' && renderStoryBlocks()}
          {secKey === 'thumbnails' && renderThumbnails()}
          {secKey === 'stills' && renderStills()}
          {secKey === 'gallery' && renderGallery()}
          {secKey === 'results' && (
            <>
              {renderResults()}
              {showMidArticleCta && !cleanContent && (
                <div className={`px-4 sm:px-6 md:px-8 py-4 sm:py-6 transition-colors duration-300 ${isLight ? 'bg-white' : 'bg-[#0D0D0D]'}`}>
                  <div className="w-full">
                    {midArticleCtaComponent || <MidArticleCta />}
                  </div>
                </div>
              )}
            </>
          )}
          {secKey === 'process' && renderProcess()}
          {secKey === 'content' && renderCleanContent()}
        </React.Fragment>
      ))}

      {/* LIGHTBOX MODAL FOR GALLERY */}
      {lightboxImg && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-6 right-6 p-3 bg-zinc-800 hover:bg-zinc-700 text-white rounded-full transition-all"
            title="Close image"
          >
            <FiX size={20} />
          </button>
          <img
            src={lightboxImg}
            alt="Enlarged view"
            className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* EXTRA CONTENT (children) */}
      {children && (
        <section className="px-4 sm:px-6 md:px-8 py-6 md:py-12 bg-[#0D0D0D]">
          <div className="w-full">
            {children}
          </div>
        </section>
      )}

      {/* SMALL BANNER */}
      {smallBanner && (
        <section className="px-4 sm:px-6 md:px-8 py-6 md:py-10 bg-[#0D0D0D]">
          <div className="w-full rounded-xl overflow-hidden border border-[#222] shadow-2xl">
            <img src={smallBanner} alt={title || "Project banner"} width="1200" height="600" className="w-full h-auto object-contain" />
          </div>
        </section>
      )}

      {/* CTA / BOTTOM NAVIGATION */}
      <footer className={`px-4 sm:px-6 md:px-8 py-5 sm:py-6 md:py-8 border-t border-b transition-colors duration-300 ${
        isLight ? 'bg-neutral-50 border-neutral-200' : 'bg-[#0D0D0D] border-white/5'
      }`}>
        <div className="flex items-center justify-between gap-3 w-full">
          <div>
            <button
              className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold px-4 sm:px-5 py-2.5 rounded-full border transition-all duration-200 cursor-pointer active:scale-95 ${
                isLight
                  ? 'border-neutral-300 bg-white text-neutral-800 hover:border-neutral-400 hover:text-black shadow-sm'
                  : 'border-white/10 bg-[#141414] text-zinc-300 hover:border-white/30 hover:text-white shadow-sm'
              }`}
              onClick={() => router.push('/')}
            >
              <FaThLarge aria-hidden="true" className="text-xs" /> All work
            </button>
          </div>

          {/* Right side: 1 button (Next Project) */}
          {nextProject && (
            <div>
              <button
                className="group inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold px-5 sm:px-6 py-2.5 bg-gradient-to-r from-[#2563EB] to-[#4169E1] hover:from-[#1D4ED8] hover:to-[#3158D4] text-white rounded-full shadow-[0_0_15px_rgba(65,105,225,0.4)] hover:shadow-[0_0_20px_rgba(65,105,225,0.6)] transition-all duration-200 border-none cursor-pointer active:scale-95 shrink-0"
                onClick={() => router.push(nextProject.path)}
              >
                <span>Next Project</span>
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
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
