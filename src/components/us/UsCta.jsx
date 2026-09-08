'use client';

import Link from 'next/link';

const UsCta = ({ title = 'Ready to get started?', body = '', primaryLabel = 'Get a Free Estimate', primaryHref = '/contact', external = false, hideSecondary = false }) => (
  <section className="us-cta-band">
    <div className="us-container">
      <h2>{title}</h2>
      {body && <p>{body}</p>}
      <div className="us-cta-actions">
        {external ? (
          <a href={primaryHref} className="us-btn us-btn-primary" target="_blank" rel="noopener">{primaryLabel}</a>
        ) : (
          <Link href={primaryHref} className="us-btn us-btn-primary">{primaryLabel}</Link>
        )}
        {!hideSecondary && (
          <a href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting" className="us-btn us-btn-outline" target="_blank" rel="noopener">Schedule a Call</a>
        )}
      </div>
    </div>
  </section>
);

export default UsCta;
