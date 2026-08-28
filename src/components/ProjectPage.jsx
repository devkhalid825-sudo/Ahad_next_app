'use client';

import React, { useEffect } from "react";
import { notFound } from 'next/navigation';
import CaseStudyLayout from "./projects/CaseStudyLayout";
import { OverviewSection, ResultsSection, ProcessSection, GallerySection } from "./projects/projectSections";
import { projectList, caseStudyEntries } from "./projects/projectData";
import { getYoutubeEmbed } from "../utils/api";

const allProjects = [...projectList, ...caseStudyEntries];
const projectMap = Object.fromEntries(allProjects.map(p => [p.slug, p]));

const safeJson = (val, fallback) => {
  if (!val) return fallback;
  try { return typeof val === 'string' ? JSON.parse(val) : val; } catch { return fallback; }
};

const stripHtml = (html) => (html ? String(html).replace(/<[^>]*>/g, '').trim() : '');

// Dashboard/API entries (project or case study, saved via the admin CMS) don't come
// pre-shaped as { sections: [...] } like the static entries in projectData.js — they
// come as flat fields (overviewText, results, processSteps, ...). Build the same
// sections shape CaseStudyLayout/SectionRenderer already know how to render.
const normalizeDynamicProject = (data, { type }) => {
  const isCaseStudy = type === 'case-study';

  const meta = [
    ...(data.client ? [{ label: 'Client', value: data.client }] : []),
    ...(data.service ? [{ label: 'Service', value: data.service }] : (data.category ? [{ label: 'Category', value: data.category }] : [])),
    ...(data.duration ? [{ label: 'Duration', value: data.duration }] : []),
    ...(data.deliverables ? [{ label: 'Deliverables', value: data.deliverables }] : []),
  ];

  const heroImage = data.heroImage || data.largeBanner || data.image || undefined;
  const heroVideoUrl = data.heroVideo || data.videoUrl;
  const heroIframe = heroVideoUrl ? getYoutubeEmbed(heroVideoUrl) : undefined;

  const overviewText = data.overviewText || data.overview || stripHtml(data.content || data.description);
  const challengeText = data.challengeText || data.challenge || '';

  const sections = [];

  if (overviewText || challengeText) {
    sections.push({
      type: 'overview',
      heading: data.overviewHeading || (isCaseStudy ? 'Case study overview' : 'Project overview'),
      text: overviewText,
      challenge: {
        heading: data.challengeHeading || 'Key challenges',
        text: challengeText,
      },
    });
  }

  const results = safeJson(data.results, [])
    .filter((r) => r.stat || r.label || r.value || r.title)
    .map((r) => ({ value: r.value || r.stat, title: r.title || r.label, desc: r.desc || '' }));
  if (results.length > 0) {
    sections.push({ type: 'results', title: isCaseStudy ? 'Case study results' : 'Results', results });
  }

  const steps = safeJson(data.processSteps || data.process, []).filter((p) => p.phase || p.title);
  if (steps.length > 0) {
    sections.push({ type: 'process', steps });
  }

  const galleryCategories = safeJson(data.galleryCategories, []).filter((g) => g.name || g.images);
  const images = galleryCategories.flatMap((g) => (
    Array.isArray(g.images) ? g.images : String(g.images || '').split(',').map((s) => s.trim()).filter(Boolean)
  ));
  if (images.length > 0) {
    sections.push({ type: 'gallery', title: 'Gallery', images });
  }

  return {
    title: data.title,
    meta: meta.length > 0 ? meta : undefined,
    heroImage,
    heroIframe,
    heroButtons: undefined,
    nextProject: undefined,
    sections,
  };
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

const ProjectPage = ({ slug, initialData, type = 'project' }) => {
  const safeSlug = String(slug || '').trim();
  const staticProject = projectMap[safeSlug];
  const project = staticProject || (initialData ? normalizeDynamicProject(initialData, { type }) : null);

  useEffect(() => { window.scrollTo(0, 0); }, [safeSlug]);

  if (!project) { notFound(); return null; }

  return (

  <>

      

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
  

  </>

  );
};

export default ProjectPage;
