'use client';

import Link from 'next/link';

const UsShowcase = ({ eyebrow, title, body, checklist = [], media, reverse = false }) => {
  return (
    <div className="us-showcase-grid">
      {reverse ? (
        <>
          <div>{media}</div>
          <div className="us-showcase-copy">
            <span className="us-section-eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
            <p>{body}</p>
            <ul className="us-checklist">
              {checklist.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
            <div className="us-section-ctas us-section-ctas--left">
              <Link href="/contact" className="us-btn us-btn-primary">Get a Free Estimate</Link>
              <a href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting" className="us-btn us-btn-outline" target="_blank" rel="noopener">Schedule a Call</a>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="us-showcase-copy">
            <span className="us-section-eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
            <p>{body}</p>
            <ul className="us-checklist">
              {checklist.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
            <div className="us-section-ctas us-section-ctas--left">
              <Link href="/contact" className="us-btn us-btn-primary">Get a Free Estimate</Link>
              <a href="https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting" className="us-btn us-btn-outline" target="_blank" rel="noopener">Schedule a Call</a>
            </div>
          </div>
          <div>{media}</div>
        </>
      )}
    </div>
  );
};

export default UsShowcase;
