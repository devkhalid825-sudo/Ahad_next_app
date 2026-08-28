// All projects previously hardcoded here have been migrated to the dashboard
// (backend-driven via /projects and /case-studies APIs). These arrays are the
// static fallback that src/app/project/[slug]/page.jsx and
// src/app/projects_sitemap.xml/route.js check when a slug has no matching
// dashboard entry — populate them again only for content that will never live
// in the dashboard.
export const projectList = [];

export const caseStudyEntries = [];
