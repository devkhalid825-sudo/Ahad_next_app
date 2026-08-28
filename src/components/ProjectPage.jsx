'use client';

import React, { useEffect, useState } from "react";
import { notFound } from 'next/navigation';
import CaseStudyLayout from "./projects/CaseStudyLayout";
import AhmedFoodLayout from "./AhmedFoodLayout";
import { OverviewSection, ResultsSection, ProcessSection, GallerySection } from "./projects/projectSections";
import { projectList, caseStudyEntries } from "./projects/projectData";
import { apiCall, getYoutubeEmbed } from "../utils/api";

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

// Dashboard/API-driven project or case study. Mirrors the field mapping that
// ProjectArticle.jsx / CaseStudyDetails.jsx used to render this data with
// (including the legacy per-slot `sections` editor: {content, image, video}),
// since the CMS doesn't always populate the newer structured fields.
const DynamicProjectView = ({ data, type }) => {
  const isCaseStudy = type === 'case-study';
  const [nextProject, setNextProject] = useState(null);

  useEffect(() => {
    if (!data || !data.id) return;
    const listEndpoint = isCaseStudy ? '/case-studies' : '/projects';
    apiCall(listEndpoint, 'GET').then(({ data: list, status }) => {
      if (status === 200 && Array.isArray(list)) {
        const idx = list.findIndex((item) => item.id === data.id);
        if (idx === -1) return;
        const next = idx < list.length - 1 ? list[idx + 1] : list[0];
        if (!next) return;
        const path = isCaseStudy ? `/case-study/${next.slug}` : (next.path || `/project/${next.slug}`);
        setNextProject({ path, name: next.title });
      }
    }).catch(() => {});
  }, [data, isCaseStudy]);

  const meta = [
    ...(data.client ? [{ label: 'Client', value: data.client }] : []),
    ...(data.service ? [{ label: 'Service', value: data.service }] : (data.category ? [{ label: 'Category', value: data.category }] : [])),
    ...(data.duration ? [{ label: 'Duration', value: data.duration }] : []),
    ...(data.deliverables ? [{ label: 'Deliverables', value: data.deliverables }] : []),
  ];

  const heroImage = data.heroImage || data.largeBanner || data.image || undefined;
  const heroVideoUrl = data.heroVideo || data.videoUrl;
  const heroVideo = heroVideoUrl ? getYoutubeEmbed(heroVideoUrl) : undefined;

  const sections = safeJson(data.sections, []);
  const results = safeJson(data.results, []).filter((r) => r.stat || r.label);
  const process = safeJson(data.processSteps || data.process, []).filter((p) => p.phase || p.title);
  const galleryCategories = safeJson(data.galleryCategories, [])
    .filter((g) => g.name)
    .map((g) => ({
      name: g.name,
      images: Array.isArray(g.images) ? g.images : String(g.images || '').split(',').map((s) => s.trim()).filter(Boolean),
    }));
  const videoTabs = safeJson(data.videoTabs, []).filter((t) => t.label || t.url).map((t) => ({
    ...t,
    url: getYoutubeEmbed(t.url) || t.url,
  }));

  return (
    <AhmedFoodLayout
      title={data.title}
      meta={meta}
      heroVideo={heroVideo}
      heroImage={heroImage}
      videoTabs={videoTabs.length > 0 ? videoTabs : undefined}
      overview={data.overviewText || data.overview || ''}
      overviewHeading={data.overviewHeading || (isCaseStudy ? 'Case study overview' : 'Project overview')}
      challenge={data.challengeText || data.challenge || ''}
      challengeHeading={data.challengeHeading || 'Key challenges'}
      content={data.content || data.description || ''}
      sections={sections}
      results={results}
      process={process}
      galleryCategories={galleryCategories}
      nextProject={nextProject || undefined}
      ctaUrl={data.ctaUrl || undefined}
      ctaText={data.ctaText || undefined}
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
