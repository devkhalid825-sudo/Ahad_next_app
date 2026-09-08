'use client';

import Link from 'next/link';

const UsCapabilities = ({ items = [] }) => (
  <section id="capabilities">
    <div className="us-container">
      <div className="us-grid-3">
        {items.map((it, i) => (
          <div key={i} className="us-card">
            <div className="us-card-icon">{String(i + 1).padStart(2, '0')}</div>
            <h3>{it.title}</h3>
            <p>{it.desc}</p>
          </div>
        ))}
      </div>
      <div className="us-section-ctas">
        <Link href="/contact" className="us-btn us-btn-primary">Get a Free Estimate</Link>
        <a href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting" className="us-btn us-btn-outline" target="_blank" rel="noopener">Schedule a Call</a>
      </div>
    </div>
  </section>
);

export default UsCapabilities;
