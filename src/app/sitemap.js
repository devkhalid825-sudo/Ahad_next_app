import { SITE_URL } from '@/utils/api';
import { getBlogs } from '@/services/blogService';
import { getProjects, getCaseStudies } from '@/services/projectService';

export default async function sitemap() {
  const staticRoutes = [
    '',
    '/about',
    '/capabilities',
    '/portfolio',
    '/industries',
    '/case-studies',
    '/blog',
    '/contact',
    '/services',
    '/services/architectural-visualization',
    '/services/3d-product-visualization',
    '/services/3d-product-configurators',
    '/services/interactive-web-experiences',
    '/services/vr-development',
    '/services/ar-development',
    '/services/3d-animation',
    '/services/vfx-virtual-production',
    '/services/virtual-showrooms-digital-twins',
    '/services/custom-software-development',
    '/services/website-development',
    '/services/mobile-app-development',
    '/services/creative-services',
    '/services/enterprise-solutions',
    '/services/marketing',
  ];

  const currentDate = new Date().toISOString();

  const staticEntries = staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : route.startsWith('/services') ? 0.8 : 0.7,
  }));

  let blogEntries = [];
  try {
    const blogs = await getBlogs();
    blogEntries = blogs.map((blog) => ({
      url: `${SITE_URL}/blog/${blog.slug}`,
      lastModified: blog.updatedAt || blog.createdAt || currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Sitemap blog generation error:', error);
  }

  let projectEntries = [];
  try {
    const projects = await getProjects();
    projectEntries = projects.map((project) => ({
      url: (() => { const p = project.path || `/project/${project.slug}`; return p.startsWith('http') ? p : `${SITE_URL}${p}`; })(),
      lastModified: project.updatedAt || currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Sitemap project generation error:', error);
  }

  let caseStudyEntries = [];
  try {
    const caseStudies = await getCaseStudies();
    caseStudyEntries = caseStudies.map((cs) => ({
      url: `${SITE_URL}/case-study/${cs.slug}`,
      lastModified: cs.updatedAt || currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    }));
  } catch (error) {
    console.error('Sitemap case study generation error:', error);
  }

  return [...staticEntries, ...blogEntries, ...projectEntries, ...caseStudyEntries];
}
