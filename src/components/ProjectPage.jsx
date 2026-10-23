'use client';

import React, { useEffect, useState } from "react";
import { notFound } from 'next/navigation';
import CaseStudyLayout from "./projects/CaseStudyLayout";
import AhmedFoodLayout from "./AhmedFoodLayout";
import { OverviewSection, ResultsSection, ProcessSection, GallerySection } from "./projects/projectSections";
import { projectList, caseStudyEntries } from "./projects/projectData";
import { apiCall, getYoutubeEmbed, BACKEND_ORIGIN, toCdnUrl } from "../utils/api";
import { getProjectValueProposition } from "@/constants/projectValueProps";

const allProjects = [...projectList, ...caseStudyEntries];
const projectMap = Object.fromEntries(allProjects.map(p => [p.slug, p]));

const safeJson = (val, fallback) => {
  if (!val) return fallback;
  try { return typeof val === 'string' ? JSON.parse(val) : val; } catch { return fallback; }
};

const SectionRenderer = ({ section }) => {
  switch (section.type) {
    case "overview":
      return <OverviewSection overview={{ heading: section.heading, text: section.text }} challenge={section.challenge} />;
    case "results":
      return <ResultsSection title={section.title} results={section.results} />;
    case "process":
      return <ProcessSection steps={section.steps} />;
    case "gallery":
      return <GallerySection title={section.title} images={section.images} />;
    default:
      return null;
  }
};

// Static hand-authored entries from projectData.js (currently unused, kept for
// content that will never live in the dashboard).
const StaticProjectView = ({ project }) => (
  <CaseStudyLayout
    title={project.title}
    meta={project.meta}
    heroImage={project.heroImage}
    heroIframe={project.heroIframe}
    heroButtons={project.heroButtons}
    nextProject={project.nextProject}
  >
    {project.sections.filter(s => {
      if (s.type === "gallery" && (!s.images || s.images.length === 0)) return false;
      return true;
    }).map((section, i) => (
      <SectionRenderer key={i} section={section} />
    ))}
  </CaseStudyLayout>
);


const DynamicProjectView = ({ data, type = 'project' }) => {
  const isCaseStudy = type === 'case-study';
  const [nextProject, setNextProject] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const listEndpoint = isCaseStudy ? '/case-studies' : '/projects';
    apiCall(listEndpoint, 'GET', null, null, false, { next: { revalidate: 60 } })
      .then(({ data: list, status }) => {
        if (cancelled || status !== 200 || !Array.isArray(list)) return;
        const currentPath = data.path || `/project/${data.slug}`;
        const currentIdx = list.findIndex(p => (p.path || `/project/${p.slug}`) === currentPath);
        if (currentIdx !== -1 && list.length > 1) {
          const next = list[(currentIdx + 1) % list.length];
          setNextProject({
            title: next.title,
            path: next.path || (isCaseStudy ? `/case-study/${next.slug}` : `/project/${next.slug}`),
            image: next.image || next.heroImage || next.largeBanner,
          });
        }
      })
      .catch(() => { });
    return () => { cancelled = true; };
  }, [data, isCaseStudy]);

  const meta = [
    ...(data.client ? [{ label: 'Client', value: data.client }] : []),
    ...(data.service ? [{ label: 'Service', value: data.service }] : (data.category ? [{ label: 'Category', value: data.category }] : [])),
    ...(data.duration ? [{ label: 'Duration', value: data.duration }] : []),
    ...(data.deliverables ? [{ label: 'Deliverables', value: data.deliverables }] : []),
  ];

  const heroImage = toCdnUrl(data.heroImage || data.largeBanner || data.image || undefined);
  const heroVideoUrl = data.heroVideo || data.videoUrl;
  const heroVideo = heroVideoUrl ? getYoutubeEmbed(heroVideoUrl) : undefined;

  const sections = safeJson(data.sections, []);
  const results = safeJson(data.results, []).filter((r) => r.stat || r.label);
  const process = safeJson(data.processSteps || data.process, []).filter((p) => p.phase || p.title);

  // Parse story blocks and sectionOrder from sections or overview/challenge
  const defaultSectionOrder = ['storyBlocks', 'thumbnails', 'stills', 'results', 'process', 'content'];
  let sectionOrder = defaultSectionOrder;
  let storyBlocks = [];

  if (Array.isArray(sections) && sections[0]?.sectionOrder && Array.isArray(sections[0].sectionOrder)) {
    sectionOrder = sections[0].sectionOrder;
  }

  const validSections = Array.isArray(sections) ? sections.filter(s => !s.isMetaOnly && ((s.text && s.text.trim()) || (s.content && s.content.trim()) || s.image)) : [];
  const isStoryBlockArray = validSections.length > 0;

  if (isStoryBlockArray) {
    storyBlocks = validSections.map((s, idx) => ({
      tag: s.tag || (idx === 0 ? 'Overview' : (idx === 1 ? 'The challenge' : `Block ${idx + 1}`)),
      heading: s.heading || (idx === 0 ? data.overviewHeading : data.challengeHeading) || '',
      text: (s.text || s.content || '').trim(),
      image: toCdnUrl(s.image),
      position: s.position || (idx % 2 === 0 ? 'left' : 'right'),
    }));
  } else if (!Array.isArray(sections) || sections.length === 0) {
    // Only fall back to legacy columns if sections array was never defined on this record
    const ovText = (data.overviewText || data.overview || '').trim();
    const chText = (data.challengeText || data.challenge || '').trim();
    if (ovText || chText) {
      if (ovText) {
        storyBlocks.push({
          tag: 'Overview',
          heading: data.overviewHeading || (isCaseStudy ? 'Case study overview' : 'Project overview'),
          text: ovText,
          image: null,
          position: 'left',
        });
      }
      if (chText) {
        storyBlocks.push({
          tag: 'The challenge',
          heading: data.challengeHeading || 'Key challenges',
          text: chText,
          image: null,
          position: 'right',
        });
      }
    }
  }

  // Parse thumbnails and stills from galleryCategories
  const rawGalleryCategories = safeJson(data.galleryCategories, []);
  let galleryThumbnails = [];
  let galleryStills = [];
  const otherGalleryCategories = [];

  if (Array.isArray(rawGalleryCategories)) {
    rawGalleryCategories.forEach((g) => {
      const imgs = (Array.isArray(g.images) ? g.images : String(g.images || '').split(',').map((s) => s.trim()).filter(Boolean)).map(toCdnUrl);
      const nameLower = String(g.name || '').toLowerCase();
      if (g.type === 'thumbnails' || nameLower === 'thumbnails') {
        galleryThumbnails = [...galleryThumbnails, ...imgs];
      } else if (g.type === 'stills' || nameLower === 'still images' || nameLower === 'still renders' || nameLower === 'stills') {
        galleryStills = [...galleryStills, ...imgs];
      } else if (g.name) {
        otherGalleryCategories.push({ name: g.name, images: imgs });
      }
    });
  }

  const rawVideoTabs = safeJson(data.videoTabs, []) || [];
  const secVideoTabs = sections[0]?.videoTabs || [];
  const videoTabs = (rawVideoTabs.length > 0 ? rawVideoTabs : secVideoTabs)
    .filter((t) => t && typeof t.url === 'string' && t.url.trim().length > 0)
    .map((t) => ({
      ...t,
      url: getYoutubeEmbed(t.url) || t.url,
    }));

  const heroAspectRatio = sections[0]?.heroAspectRatio || data.heroAspectRatio || 'video';
  const tickerWords = sections[0]?.tickerWords || data.tickerWords || '';
  const subtitle = sections[0]?.subtitle || data.subtitle || data.metaDescription || getProjectValueProposition({ ...data, slug: data.slug || data.path });

  return (
    <AhmedFoodLayout
      title={data.title}
      subtitle={subtitle}
      meta={meta}
      heroVideo={heroVideo}
      heroImage={heroImage}
      heroAspectRatio={heroAspectRatio}
      tickerWords={tickerWords}
      videoTabs={videoTabs.length > 0 ? videoTabs : undefined}
      overview={isStoryBlockArray ? (data.overviewText || '') : (Array.isArray(sections) && sections.length > 0 ? '' : (data.overviewText || data.overview || ''))}
      overviewHeading={data.overviewHeading || (isCaseStudy ? 'Case study overview' : 'Project overview')}
      challenge={isStoryBlockArray ? (data.challengeText || '') : (Array.isArray(sections) && sections.length > 0 ? '' : (data.challengeText || data.challenge || ''))}
      challengeHeading={data.challengeHeading || 'Key challenges'}
      storyBlocks={storyBlocks}
      galleryThumbnails={galleryThumbnails}
      galleryStills={galleryStills}
      sectionOrder={sectionOrder}
      content={data.content || data.description || ''}
      sections={sections}
      results={results}
      process={process}
      galleryCategories={otherGalleryCategories}
      nextProject={nextProject || undefined}
      ctaUrl={sections[0]?.ctaUrl !== undefined ? (sections[0].ctaUrl || undefined) : (data.ctaUrl || undefined)}
      ctaText={sections[0]?.ctaText !== undefined ? (sections[0].ctaText || undefined) : (data.ctaText || undefined)}
      heroIntroText={sections[0]?.heroIntroText !== undefined ? sections[0].heroIntroText : data.heroIntroText}
      heroStars={sections[0]?.heroStars !== undefined ? sections[0].heroStars : data.heroStars}
      heroReviewTitle={sections[0]?.heroReviewTitle !== undefined ? sections[0].heroReviewTitle : data.heroReviewTitle}
      heroReviewSubtitle={sections[0]?.heroReviewSubtitle !== undefined ? sections[0].heroReviewSubtitle : data.heroReviewSubtitle}
      heroQuoteText={sections[0]?.heroQuoteText !== undefined ? sections[0].heroQuoteText : data.heroQuoteText}
      heroQuoteAuthor={sections[0]?.heroQuoteAuthor !== undefined ? sections[0].heroQuoteAuthor : data.heroQuoteAuthor}
      thumbnailsHeading={sections[0]?.thumbnailsHeading !== undefined ? sections[0].thumbnailsHeading : data.thumbnailsHeading}
      thumbnailsEyebrow={sections[0]?.thumbnailsEyebrow !== undefined ? sections[0].thumbnailsEyebrow : data.thumbnailsEyebrow}
      stillsHeading={sections[0]?.stillsHeading !== undefined ? sections[0].stillsHeading : data.stillsHeading}
      stillsEyebrow={sections[0]?.stillsEyebrow !== undefined ? sections[0].stillsEyebrow : data.stillsEyebrow}
      resultsHeading={sections[0]?.resultsHeading !== undefined ? sections[0].resultsHeading : data.resultsHeading}
      resultsEyebrow={sections[0]?.resultsEyebrow !== undefined ? sections[0].resultsEyebrow : data.resultsEyebrow}
      processHeading={sections[0]?.processHeading !== undefined ? sections[0].processHeading : data.processHeading}
      processEyebrow={sections[0]?.processEyebrow !== undefined ? sections[0].processEyebrow : data.processEyebrow}
      creditsEyebrow={sections[0]?.creditsEyebrow !== undefined ? sections[0].creditsEyebrow : data.creditsEyebrow}
      creditsHeading={sections[0]?.creditsHeading !== undefined ? sections[0].creditsHeading : data.creditsHeading}
      creditsToolsLabel={sections[0]?.creditsToolsLabel !== undefined ? sections[0].creditsToolsLabel : data.creditsToolsLabel}
      creditsTools={sections[0]?.creditsTools !== undefined ? sections[0].creditsTools : data.creditsTools}
      creditsAgency={sections[0]?.creditsAgency !== undefined ? sections[0].creditsAgency : data.creditsAgency}
      faqHeading={sections[0]?.faqHeading !== undefined ? sections[0].faqHeading : data.faqHeading}
      faqItems={sections[0]?.faqItems !== undefined ? sections[0].faqItems : data.faqItems}
      targetKeywords={sections[0]?.targetKeywords !== undefined ? sections[0].targetKeywords : (data.targetKeywords || data.metaKeywords)}
    />
  );
};

const ProjectPage = ({ slug, initialData, type = 'project' }) => {
  const safeSlug = String(slug || '').trim();
  const staticProject = !initialData ? projectMap[safeSlug] : null;

  useEffect(() => { window.scrollTo(0, 0); }, [safeSlug]);

  if (!initialData && !staticProject) { notFound(); return null; }

  return initialData
    ? <DynamicProjectView data={initialData} type={type} />
    : <StaticProjectView project={staticProject} />;
};

export default ProjectPage;
