'use client';

import UsThemeProvider from './UsThemeProvider';
import UsNav from './UsNav';
import UsAnnouncementBar from './UsAnnouncementBar';
import UsHero from './UsHero';
import UsWaveDivider from './UsWaveDivider';
import UsMarquee from './UsMarquee';
import UsTrustBand from './UsTrustBand';
import UsSectionHead from './UsSectionHead';
import UsCapabilities from './UsCapabilities';
import UsServiceGrid from './UsServiceGrid';
import UsFeatures from './UsFeatures';
import UsWhySplit from './UsWhySplit';
import UsStatsBand from './UsStatsBand';
import UsShowcase from './UsShowcase';
import UsGallery from './UsGallery';
import UsProcess from './UsProcess';
import UsTestimonials from './UsTestimonials';
import UsFaq from './UsFaq';
import UsContact from './UsContact';
import UsCta from './UsCta';
import UsFooter from './UsFooter';
import UsWhatsApp from './UsWhatsApp';

const UsPage = ({ config }) => {
  const {
    navLinks,
    navCta,
    navCtaHref,
    navPhoneBadge,
    announcement,
    hero,
    heroVisual,
    marquee,
    statsBand,
    trustBand,
    capabilities,
    serviceGrid,
    midCta,
    whyUs,
    stats,
    industries,
    showcase,
    gallery,
    process,
    testimonials = true,
    faq,
    contact,
    cta,
  } = config;

  return (
    <UsThemeProvider>
      <UsNav links={navLinks} cta={navCta} ctaHref={navCtaHref} phoneBadge={navPhoneBadge} />

      {announcement && <UsAnnouncementBar>{announcement}</UsAnnouncementBar>}

      <UsHero {...hero} visual={heroVisual} />
      <UsWaveDivider />

      {marquee && marquee.length > 0 && <UsMarquee items={marquee} />}

      {statsBand && statsBand.length > 0 && <UsStatsBand stats={statsBand} />}

      {trustBand && trustBand.length > 0 && <UsTrustBand items={trustBand} />}

      {capabilities && (
        <section id="capabilities">
          <div className="us-container">
            {capabilities.head && (
              <UsSectionHead {...capabilities.head} align="center" />
            )}
            <UsCapabilities items={capabilities.items} />
          </div>
        </section>
      )}

      {serviceGrid && (
        <section id="services" className="us-reveal">
          <div className="us-container">
            {serviceGrid.head && <UsSectionHead {...serviceGrid.head} align="center" />}
            <UsServiceGrid items={serviceGrid.items} />
          </div>
        </section>
      )}

      {midCta && <UsCta {...midCta} />}

      {whyUs && (
        <section id="why" className="us-reveal">
          <div className="us-container">
            {whyUs.head && <UsSectionHead {...whyUs.head} align="center" />}
            <UsWhySplit items={whyUs.items} outcomesLabel={whyUs.outcomesLabel} outcomes={whyUs.outcomes} />
          </div>
        </section>
      )}

      {stats && stats.length > 0 && <UsStatsBand stats={stats} />}

      {industries && (
        <section id="industries" className="us-reveal">
          <div className="us-container">
            {industries.head && <UsSectionHead {...industries.head} align="center" />}
            <UsFeatures items={industries.items} />
          </div>
        </section>
      )}

      {showcase && showcase.length > 0 && (
        <section className="us-reveal">
          <div className="us-container">
            {showcase.map((s, i) => <UsShowcase key={i} {...s} />)}
          </div>
        </section>
      )}

      {gallery && (
        <section className="us-reveal">
          <div className="us-container">
            {gallery.head && <UsSectionHead {...gallery.head} align="center" />}
            <UsGallery items={gallery.items} />
          </div>
        </section>
      )}

      {process && (
        <section className="us-reveal">
          <div className="us-container">
            {process.head && <UsSectionHead {...process.head} align="center" />}
            <UsProcess steps={process.steps} />
          </div>
        </section>
      )}

      {testimonials && <UsTestimonials />}

      {faq && (
        <section id="faq" className="us-reveal">
          <div className="us-container us-faq-container">
            {faq.head && <UsSectionHead {...faq.head} align="center" />}
            <UsFaq items={faq.items} />
          </div>
        </section>
      )}

      <UsContact {...contact} />

      {cta && <UsCta {...cta} />}

      <UsFooter />
      <UsWhatsApp />
    </UsThemeProvider>
  );
};

export default UsPage;
