'use client';

import React, { useEffect } from "react";
import ProjectArticle from "./ProjectArticle";
import CaseStudyLayout from "./projects/CaseStudyLayout";
import { OverviewSection, ResultsSection, ProcessSection, GallerySection } from "./projects/projectSections";
import { projectList, caseStudyEntries } from "./projects/projectData";

const allProjects = [...projectList, ...caseStudyEntries];
const projectMap = Object.fromEntries(allProjects.map(p => [p.slug, p]));

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

const ProjectPage = ({ slug, initialData }) => {
  const project = projectMap[slug];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!project) return <ProjectArticle slug={slug} initialData={initialData} />;

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
