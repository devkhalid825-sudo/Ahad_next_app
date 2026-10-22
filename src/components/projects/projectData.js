// All projects previously hardcoded here have been migrated to the dashboard
// (backend-driven via /projects and /case-studies APIs). These arrays are the
// static fallback that src/app/project/[slug]/page.jsx and
// src/app/projects_sitemap.xml/route.js check when a slug has no matching
// dashboard entry — populate them again only for content that will never live
// in the dashboard.
export const projectList = [
  {
    slug: 'classic-villa',
    title: 'Classic Villa | VR & 3D Visualization',
    meta: [
      { label: 'Category', value: 'Architecture' },
      { label: 'Service', value: '3D Visualization' },
      { label: 'Deliverables', value: 'Neoclassical CGI · Estate Visuals' },
      { label: 'Description', value: 'Intricate neoclassical architectural CGI, exterior colonnades, and opulent European estate rendering for luxury development marketing.' }
    ],
    heroImage: '/assets/About-page/villas.webp',
    nextProject: { path: '/project/villa', name: 'Modern Villa' },
    sections: [
      {
        type: 'overview',
        heading: 'Classical elegance meets photoreal 3D visualization',
        text: 'Intricate classical stone detailing, grand porticos, symmetrical colonnades, and opulent European estate rendering crafted for luxury property marketing.',
        challenge: {
          heading: 'Preserving historical architectural proportion',
          text: 'Capturing the nuanced masonry, friezes, and natural daylighting required high-precision 3D modelling and ray-traced material calibration.'
        }
      },
      {
        type: 'results',
        title: 'Delivering measurable value',
        results: [
          { value: '4K+', title: 'Ultra-High Resolution Stills', desc: 'Photoreal imagery for high-end investor lookbooks and marketing' },
          { value: '100%', title: 'Architectural Fidelity', desc: 'Exact CAD-to-CGI replication of all classical masonry profiles' }
        ]
      },
      {
        type: 'process',
        steps: [
          { step: '01', phase: 'Blueprint', title: 'CAD & Architectural Review', desc: 'Detailed breakdown of elevations, balustrades, and neoclassical proportions.' },
          { step: '02', phase: 'Model', title: 'Parametric 3D Modelling', desc: 'Precision geometry modelling of columns, cornices, and exterior facades.' },
          { step: '03', phase: 'Shading', title: 'Physical Material Calibration', desc: 'Realistic stone, aged limestone, bronze fixtures, and natural vegetation.' },
          { step: '04', phase: 'Render', title: 'Atmospheric Lighting & Composite', desc: 'Golden hour lighting simulation with high-dynamic-range compositing.' }
        ]
      },
      {
        type: 'gallery',
        title: 'Estate Showcase',
        images: ['/assets/About-page/villas.webp']
      }
    ]
  }
];

export const caseStudyEntries = [];

