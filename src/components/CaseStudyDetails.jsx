'use client';

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArticleProgress } from './articles/articleHelpers';
import { FiArrowLeft } from 'react-icons/fi';
import { apiCall, getYoutubeEmbed, SITE_URL, BACKEND_ORIGIN } from '../utils/api';

const absImage = (img) => {
  if (!img) return '';
  if (typeof img === 'object') img = img.url || img.src || '';
  if (typeof img !== 'string') return '';
  if (img.startsWith('http')) return img;
  if (img.startsWith('/uploads/')) return `${BACKEND_ORIGIN}${img}`;
  return img;
};
import AhmedFoodLayout from './AhmedFoodLayout';
import MobileMenu from './MobileMenu';

import { caseStudyEntries } from './projects/projectData';

const CaseStudyDetail = ({ slug, initialData }) => {
  const [cs, setCs] = useState(initialData || null);
  const [nextCs, setNextCs] = useState(null);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (!slug || initialData) return;
    const fetchCaseStudy = async () => {
      setLoading(true);
      setError('');
      try {
        const { data, status } = await apiCall(`/case-studies/by-slug?slug=${slug}`, 'GET');
        if (status === 200 && data) {
          setCs(data);
          const allRes = await apiCall('/case-studies', 'GET');
          if (allRes.status === 200 && Array.isArray(allRes.data)) {
            const sorted = allRes.data.filter(c => c.id);
            const idx = sorted.findIndex(c => c.id === data.id);
            if (idx !== -1) {
              const next = idx < sorted.length - 1 ? sorted[idx + 1] : sorted[0];
              setNextCs(next);
            }
          }
        } else {
          const staticMatch = caseStudyEntries.find(c => c.slug === slug);
          if (staticMatch) {
            setCs({
              title: staticMatch.title,
              content: staticMatch.sections?.[0]?.text || '',
              largeBanner: staticMatch.heroImage,
              smallBanner: staticMatch.heroImage,
              client: staticMatch.meta?.find(m => m.label === 'Client')?.value,
              service: staticMatch.meta?.find(m => m.label === 'Service')?.value,
            });
          } else setError('Case study not found');
        }
      } catch {
        const staticMatch = caseStudyEntries.find(c => c.slug === slug);
        if (staticMatch) {
          setCs({
            title: staticMatch.title,
            content: staticMatch.sections?.[0]?.text || '',
            largeBanner: staticMatch.heroImage,
            smallBanner: staticMatch.heroImage,
          });
        } else setError('Failed to load case study');
      } finally {
        setLoading(false);
      }
    };
    fetchCaseStudy();
  }, [slug]);

  const pageUrl = `${SITE_URL}/case-study/${slug}`;
  const rawDesc = cs?.content ? cs.content.replace(/<[^>]*>/g, '') : '';
  const image = cs?.largeBanner || cs?.smallBanner || `${SITE_URL}/assets/og-image.webp`;

    if (loading) return null;

  if (error || !cs) return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center px-6 gap-6">
      <span className="text-[120px] md:text-[200px] font-black text-white/10 block leading-none">404</span>
      <p className="text-lg text-white/50 font-light -mt-4">{error}</p>
      <Link to="/case-studies" className="flex items-center gap-2 bg-[#4169E1] text-white px-6 py-3 rounded-full text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-[#3158D4] transition-all">
        <FiArrowLeft /> Back to Case Studies
      </Link>
    </div>
  );

  const meta = [
    ...(cs.client ? [{ label: 'Client', value: cs.client }] : []),
    ...(cs.service ? [{ label: 'Service', value: cs.service }] : []),
    ...(cs.category ? [{ label: 'Category', value: cs.category }] : []),
  ];

  const heroImage = absImage(cs.largeBanner);
  const smallBanner = absImage(cs.smallBanner) || undefined;
  const heroVideo = cs.videoUrl ? getYoutubeEmbed(cs.videoUrl) : undefined;

  return (
    <>
      
      <ArticleProgress fromColor="#4169E1" />
      <AhmedFoodLayout
        title={cs.title}
        meta={meta.length > 0 ? meta : undefined}
        heroImage={heroImage}
        heroVideo={heroVideo}
        smallBanner={smallBanner}
        content={cs.content || ''}
        nextProject={nextCs ? { path: `/case-study/${nextCs.slug}`, name: nextCs.title } : undefined}
      />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default CaseStudyDetail;
