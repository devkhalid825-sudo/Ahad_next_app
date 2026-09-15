'use client';

import Link from 'next/link';
import { FaCheck } from '@/components/ui/Icons';

const UsHero = ({
  eyebrow,
  title,
  lead,
  actions = true,
  stats = [],
  trust = [],
  visual,
  primaryHref = '/contact',
  primaryLabel = 'Book Project Consultation',
  secondaryLabel = 'Schedule a Call',
  secondaryHref = 'https://calendly.com/bilal-lania-elipsestudio/15-mins-meeting',
}) => {
  const showActions = Array.isArray(actions) ? actions.length > 0 : Boolean(actions);

  return (
    <div className="us-hero">
      <div className="us-container">
        <div className="us-hero-grid">
          <div className="us-hero-content">
            {eyebrow && <span className="us-section-eyebrow">{eyebrow}</span>}
            <h1>{title}</h1>
            {lead && <p className="us-hero-lead">{lead}</p>}
            {showActions && (
              <div className="us-hero-actions">
                <Link href={primaryHref} className="us-btn us-btn-primary">{primaryLabel}</Link>
                <a href={secondaryHref} className="us-btn us-btn-outline" target="_blank" rel="noopener noreferrer">{secondaryLabel}</a>
              </div>
            )}
            {stats.length > 0 && (
              <div className="us-hero-stats">
                {stats.map((s, i) => (
                  <div key={i} className="us-hero-stat"><b>{s.number}</b><span>{s.label}</span></div>
                ))}
              </div>
            )}
            {trust.length > 0 && (
              <ul className="us-hero-trust">
                {trust.map((t, i) => (
                  <li key={i}><span className="us-hero-trust-check"><FaCheck /></span> {t}</li>
                ))}
              </ul>
            )}
          </div>
          {visual && <div className="us-hero-visual">{visual}</div>}
        </div>
      </div>
    </div>
  );
};

export default UsHero;
